import { React, useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRobot,
  faPaperPlane,
  faEllipsisVertical,
  faTrash,
  faLightbulb,
  faCopy,
  faMicrophone,
  faKeyboard,
  faImage,
  faCode,
  faFileExport,
  faArrowLeft,
  faInfoCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import Typed from "typed.js";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-sql";

const ComputerScienceAIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your Computer Science assistant. Ask me anything from past papers or technical topics.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [voiceInput, setVoiceInput] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentModel, setCurrentModel] = useState(
    "microsoft/phi-4-reasoning-plus"
  );

  const messagesEndRef = useRef(null);
  const typedRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  const suggestions = [
    "Explain recursion with an example",
    "How do I implement a binary search tree?",
    "Compare sorting algorithms by time complexity",
    "What is dynamic programming?",
    "Explain Big O notation",
  ];

  const availableModels = [
    { id: "microsoft/phi-4-reasoning-plus", name: "Phi-4 Reasoning+" },
    // { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku" },
    // { id: "google/gemma-7b-it", name: "Gemma 7B" },
  ];

  useEffect(() => {
    if (messages.length === 1) {
      const options = {
        strings: [messages[0].content],
        typeSpeed: 30,
        showCursor: false,
      };

      typedRef.current = new Typed("#welcome-message", options);

      return () => {
        if (typedRef.current) {
          typedRef.current.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setVoiceInput(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setVoiceInput(false);
      };
    }
  }, []);

  const scrollToBottom = useCallback((behavior = "auto") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);

    // Scroll to bottom immediately after user sends message
    scrollToBottom("smooth");

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: currentModel,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI assistant for Computer Science students. Explain answers step-by-step with clarity. When appropriate, provide code examples in proper syntax formatting.",
            },
            ...newMessages,
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://youruniversity.edu",
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      // Scroll to bottom after response is received
      setTimeout(() => scrollToBottom("smooth"), 100);
    }
  }, [input, messages, currentModel, scrollToBottom]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm your Computer Science assistant. Ask me anything from past papers or technical topics.",
      },
    ]);
    setIsMenuOpen(false);
    setShowSuggestions(true);
  }, []);

  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (voiceInput) {
      recognitionRef.current.stop();
      setVoiceInput(false);
    } else {
      recognitionRef.current.start();
      setVoiceInput(true);
    }
  }, [voiceInput]);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
  }, []);

  const exportChat = useCallback(() => {
    const chatContent = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n\n");
    const blob = new Blob([chatContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cs-assistant-chat.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  }, [messages]);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file);
      alert("Image upload is not fully implemented yet.");
    }
  }, []);

  const formatMessage = useCallback(
    (content) => {
      if (!content) return "";

      const codeBlockRegex = /```([a-z]*)\n([\s\S]*?)```/g;
      let formattedContent = content;
      let match;
      let lastIndex = 0;
      let result = [];

      while ((match = codeBlockRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          result.push(
            <span key={`text-${lastIndex}`}>
              {content.substring(lastIndex, match.index)}
            </span>
          );
        }

        const language = match[1] || "javascript";
        const code = match[2];

        result.push(
          <div
            key={`code-${match.index}`}
            className="relative my-4 rounded-md overflow-hidden"
          >
            <div className="bg-gray-800 text-gray-300 text-xs px-4 py-1 flex justify-between items-center">
              <span>{language}</span>
              <button
                onClick={() => copyToClipboard(code)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={`Copy ${language} code`}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
            <pre className="p-4 bg-gray-900 overflow-x-auto">
              <code className={`language-${language}`}>{code}</code>
            </pre>
          </div>
        );

        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < content.length) {
        result.push(
          <span key={`text-end`}>{content.substring(lastIndex)}</span>
        );
      }

      return result.length > 0 ? result : content;
    },
    [copyToClipboard]
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex h-screen">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <aside
          className={`hidden md:block w-64 bg-white border-r border-gray-200 transition-all duration-300 ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-xl flex items-center text-gray-800">
              <FontAwesomeIcon
                icon={faRobot}
                className="mr-2 text-indigo-600"
              />
              CS Assistant
            </h2>
          </div>

          <div className="p-4">
            <button
              onClick={clearChat}
              className="w-full mb-4 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
              aria-label="Start new chat"
            >
              New Chat
            </button>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                <FontAwesomeIcon icon={faCode} className="mr-2" />
                AI Model
              </h3>
              <select
                value={currentModel}
                onChange={(e) => setCurrentModel(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white text-gray-700 text-sm p-2"
                aria-label="Select AI model"
              >
                {availableModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="flex items-center text-xs text-gray-500">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
              <span>Powered by OpenRouter</span>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-0 z-40 md:hidden"
            >
              <div
                className="absolute inset-0 bg-gray-600 bg-opacity-75"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              ></div>
              <div className="relative bg-white w-80 max-w-[80%] h-full overflow-y-auto">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-bold text-xl flex items-center text-gray-800">
                    <FontAwesomeIcon
                      icon={faRobot}
                      className="mr-2 text-indigo-600"
                    />
                    CS Assistant
                  </h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close mobile menu"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>

                <div className="p-4">
                  <button
                    onClick={() => {
                      clearChat();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full mb-4 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
                    aria-label="Start new chat"
                  >
                    New Chat
                  </button>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                      <FontAwesomeIcon icon={faCode} className="mr-2" />
                      AI Model
                    </h3>
                    <select
                      value={currentModel}
                      onChange={(e) => setCurrentModel(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white text-gray-700 text-sm p-2"
                      aria-label="Select AI model"
                    >
                      {availableModels.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="h-16 px-4 flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden mr-2 p-2 rounded-md text-gray-500 hover:text-gray-700"
                  aria-label="Open mobile menu"
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>

                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <motion.a
                        href="/"
                        className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Home"
                      >
                        <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                      </motion.a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-400 mx-2">/</span>
                      <span className="text-indigo-600 font-medium flex items-center">
                        <FontAwesomeIcon icon={faRobot} className="mr-2" />
                        AI Assistant
                      </span>
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-500 hover:text-indigo-600 transition-colors duration-300 p-2 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Open options menu"
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </motion.button>

                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                      >
                        <button
                          onClick={clearChat}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 w-full text-left"
                          aria-label="Clear chat"
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Clear Chat
                        </button>
                        <button
                          onClick={exportChat}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 w-full text-left"
                          aria-label="Export chat"
                        >
                          <FontAwesomeIcon
                            icon={faFileExport}
                            className="mr-2"
                          />
                          Export Chat
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          {/* Chat Area */}
          <main
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-xl shadow-sm ${
                      msg.role === "user"
                        ? "bg-white border border-gray-200 ml-12 md:ml-16"
                        : "bg-indigo-50 border border-indigo-100 mr-12 md:mr-16"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`shrink-0 ${
                          msg.role === "user" ? "order-last ml-3" : "mr-3"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="bg-indigo-100 h-8 w-8 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={faRobot}
                              className="text-indigo-600"
                            />
                          </div>
                        ) : (
                          <div className="bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-gray-600"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {msg.role === "assistant" ? "AI Assistant" : "You"}
                        </div>

                        <div className="prose prose-sm max-w-none">
                          {index === 0 ? (
                            <p
                              id="welcome-message"
                              className="text-gray-800"
                            ></p>
                          ) : (
                            <div className="text-gray-800 whitespace-pre-wrap break-words">
                              {formatMessage(msg.content)}
                            </div>
                          )}
                        </div>

                        {msg.role === "assistant" &&
                          msg.content.includes("```") && (
                            <div className="mt-2 flex justify-end">
                              <button
                                onClick={() => copyToClipboard(msg.content)}
                                className="text-xs text-gray-500 hover:text-indigo-600 transition-colors flex items-center"
                                aria-label="Copy response"
                              >
                                <FontAwesomeIcon
                                  icon={faCopy}
                                  className="mr-1"
                                />
                                Copy response
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-indigo-50 shadow-sm max-w-3xl mr-12 md:mr-16 border border-indigo-100"
                >
                  <div className="flex items-start">
                    <div className="bg-indigo-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                      <FontAwesomeIcon
                        icon={faRobot}
                        className="text-indigo-600"
                      />
                    </div>
                    <div className="flex space-x-1 items-center">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-2 h-2 bg-indigo-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.2,
                        }}
                        className="w-2 h-2 bg-indigo-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.4,
                        }}
                        className="w-2 h-2 bg-indigo-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested questions */}
              {showSuggestions && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mx-auto max-w-3xl"
                >
                  <div className="mt-2 mb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                      <FontAwesomeIcon
                        icon={faLightbulb}
                        className="mr-2 text-yellow-500"
                      />
                      Try asking
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInput(suggestion);
                            setShowSuggestions(false);
                            if (textareaRef.current) {
                              textareaRef.current.focus();
                            }
                          }}
                          className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-indigo-50 transition-colors text-sm text-gray-700"
                          aria-label={`Ask: ${suggestion}`}
                        >
                          "{suggestion}"
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </main>

          {/* Input Area */}
          <footer className="bg-white border-t border-gray-200 p-4 sticky bottom-0 w-full">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center">
                <motion.div
                  className="flex-1 relative"
                  whileFocusWithin={{ scale: 1.01 }}
                >
                  <textarea
                    ref={textareaRef}
                    rows="1"
                    placeholder="Ask a CS question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-white text-gray-800"
                    style={{ minHeight: "60px", maxHeight: "200px" }}
                    aria-label="Enter your question"
                  />

                  <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                    <motion.button
                      onClick={toggleVoiceInput}
                      className={`p-2 rounded-lg transition-colors ${
                        voiceInput
                          ? "text-indigo-600"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={
                        voiceInput
                          ? "Switch to keyboard input"
                          : "Use voice input"
                      }
                    >
                      <FontAwesomeIcon
                        icon={voiceInput ? faKeyboard : faMicrophone}
                      />
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        document.getElementById("file-upload").click();
                      }}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Upload image"
                    >
                      <FontAwesomeIcon icon={faImage} />
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </motion.button>

                    <button
                      onClick={handleSend}
                      disabled={loading || !input.trim()}
                      className={`p-2 rounded-lg ${
                        loading || !input.trim()
                          ? "text-gray-400"
                          : "text-white bg-indigo-600 hover:bg-indigo-700"
                      } transition-colors`}
                      aria-label="Send message"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="mt-2 flex flex-col md:flex-row md:justify-between items-start md:items-center text-xs text-gray-500">
                <div className="flex items-center mb-1 md:mb-0">
                  <FontAwesomeIcon icon={faCode} className="mr-1" />
                  <span>
                    Model:{" "}
                    {availableModels.find((m) => m.id === currentModel)?.name ||
                      currentModel}
                  </span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faLightbulb} className="mr-1" />
                  <span>
                    Tip: Ask about algorithms, data structures, or past papers
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ComputerScienceAIAssistant;
