import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faPlay,
  faPause,
  faDownload,
  faMicrophone,
  faHistory,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";

//lamejs for MP3 encoding
import lamejs from "lamejs";

const TextToSpeechPage = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [theme, setTheme] = useState("light");
  const [history, setHistory] = useState([]);
  const [highlightedWord, setHighlightedWord] = useState(null);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const audioContextRef = useRef(null);
  const destinationRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Load voices, theme, and history
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synthRef.current.getVoices();
      if (availableVoices.length === 0) {
        toast.error("No voices available. Try a different browser.", {
          style: {
            background: theme === "light" ? "#fff" : "#1f2937",
            color: theme === "light" ? "#1f2937" : "#f3f4f6",
          },
        });
        console.warn("No voices available");
        return;
      }
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]);
    };
    loadVoices();
    synthRef.current.onvoiceschanged = loadVoices;

    const savedTheme = localStorage.getItem("bitlearning-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;

    const savedHistory = localStorage.getItem("bitlearning-tts-history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    return () => {
      synthRef.current.onvoiceschanged = null;
    };
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("bitlearning-tts-history", JSON.stringify(history));
  }, [history]);

  // Initialize audio context for recording
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      destinationRef.current =
        audioContextRef.current.createMediaStreamDestination();
      mediaRecorderRef.current = new MediaRecorder(
        destinationRef.current.stream
      );
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const wavBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        convertWavToMp3(wavBlob);
      };
    }
  };

  // Convert WAV to MP3 using lamejs
  const convertWavToMp3 = (wavBlob) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
        const mp3Encoder = new lamejs.Mp3Encoder(
          1,
          audioBuffer.sampleRate,
          128
        );
        const samples = audioBuffer.getChannelData(0);
        const sampleBlockSize = 1152;
        let mp3Data = [];

        for (let i = 0; i < samples.length; i += sampleBlockSize) {
          const sampleChunk = samples.subarray(i, i + sampleBlockSize);
          const mp3buf = mp3Encoder.encodeBuffer(
            Float32Array.from(sampleChunk).map((x) => x * 32767)
          );
          if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
          }
        }
        const mp3buf = mp3Encoder.flush();
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }

        const mp3Blob = new Blob(mp3Data, { type: "audio/mp3" });
        const url = URL.createObjectURL(mp3Blob);
        setHistory((prev) => [
          {
            id: Date.now(),
            text: text.slice(0, 50) + (text.length > 50 ? "..." : ""),
            date: new Date().toLocaleString(),
            url,
          },
          ...prev.slice(0, 9),
        ]);
        downloadAudio(url, text);
      });
    };
    reader.readAsArrayBuffer(wavBlob);
  };

  // Speak text
  const speak = () => {
    if (!text.trim()) {
      toast.error("Please enter some text", {
        style: {
          background: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#1f2937" : "#f3f4f6",
        },
      });
      return;
    }
    if (!selectedVoice) {
      toast.error("No voice selected. Please try again.", {
        style: {
          background: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#1f2937" : "#f3f4f6",
        },
      });
      return;
    }
    if (isSpeaking) {
      synthRef.current.cancel();
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    }

    initAudioContext();
    mediaRecorderRef.current.start();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = speed;
    utterance.pitch = pitch;

    // Highlight words as spoken
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        const words = text.split(" ");
        const charIndex = event.charIndex;
        let currentLength = 0;
        for (let i = 0; i < words.length; i++) {
          if (
            charIndex >= currentLength &&
            charIndex < currentLength + words[i].length
          ) {
            setHighlightedWord(i);
            break;
          }
          currentLength += words[i].length + 1;
        }
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setHighlightedWord(null);
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      toast.success("Speech completed", {
        style: {
          background: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#1f2937" : "#f3f4f6",
        },
      });
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      setHighlightedWord(null);
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      toast.error(`Speech error: ${event.error}`, {
        style: {
          background: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#1f2937" : "#f3f4f6",
        },
      });
      console.error("Speech error:", event.error);
    };

    try {
      synthRef.current.speak(utterance);
      utteranceRef.current = utterance;
      setIsSpeaking(true);
      toast.success("Speaking started!", {
        style: {
          background: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#1f2937" : "#f3f4f6",
        },
      });
    } catch (error) {
      toast.error("Failed to start speech. Try a different browser.", {
        style: {
          background: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#1f2937" : "#f3f4f6",
        },
      });
      console.error("Speech failed:", error);
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    }
  };

  // Pause/resume speech
  const togglePause = () => {
    if (isSpeaking) {
      synthRef.current.pause();
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.pause();
      }
      setIsSpeaking(false);
      toast.info("Speech paused", {
        style: {
          background: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#1f2937" : "#f3f4f6",
        },
      });
    } else if (synthRef.current.paused) {
      synthRef.current.resume();
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.resume();
      }
      setIsSpeaking(true);
      toast.info("Speech resumed", {
        style: {
          background: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#1f2937" : "#f3f4f6",
        },
      });
    }
  };

  // Download audio
  const downloadAudio = (url, text) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `tts-${text.slice(0, 20).replace(/[^a-zA-Z0-9]/g, "")}.mp3`;
    a.click();
    toast.success("Audio downloaded!", {
      style: {
        background: theme === "light" ? "#fff" : "#1f2937",
        color: theme === "light" ? "#1f2937" : "#f3f4f6",
      },
    });
  };

  // Play history item
  const playHistoryItem = (url) => {
    const audio = new Audio(url);
    audio.play();
    toast.success("Playing history item", {
      style: {
        background: theme === "light" ? "#fff" : "#1f2937",
        color: theme === "light" ? "#1f2937" : "#f3f4f6",
      },
    });
  };

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("bitlearning-theme", newTheme);
    toast.success(`Switched to ${newTheme} theme`, {
      style: {
        background: newTheme === "light" ? "#fff" : "#1f2937",
        color: newTheme === "light" ? "#1f2937" : "#f3f4f6",
      },
    });
  };

  // Waveform visualizer
  const Waveform = () => (
    <div className="flex items-center justify-center h-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`w-1 mx-0.5 rounded animate-waveform ${
            theme === "light" ? "bg-indigo-600" : "bg-indigo-400"
          }`}
          style={{
            height: isSpeaking ? `${10 + Math.random() * 20}px` : "10px",
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );

  return (
    <div
      className={`min-h-screen overflow-hidden font-poppins ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
      }`}
    >
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-18">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a
                href="/tools/productivity"
                className={`${
                  theme === "light" ? "text-gray-500" : "text-gray-300"
                } hover:text-indigo-600 transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={faBackward} className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </a>
            </li>
            <li className="flex items-center">
              <span
                className={`mx-2 ${
                  theme === "light" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                /
              </span>
              <a
                href="/text-to-speech"
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300"
                aria-current="page"
              >
                Text to Speech
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`${
            theme === "light"
              ? "bg-white/90 border-gray-100"
              : "bg-gray-800/90 border-gray-700"
          } backdrop-blur-sm rounded-xl shadow-lg p-6 border animate-fade-in`}
        >
          <div className="flex justify-between items-center mb-6">
            <h1
              className={`text-4xl font-bold ${
                theme === "light" ? "text-gray-800" : "text-gray-100"
              } flex items-center font-inter tracking-tight`}
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                className="mr-3 text-indigo-600 animate-spin-slow"
              />
              Text to Speech
            </h1>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transform transition-transform duration-300 hover:scale-110 ${
                theme === "light" ? "bg-gray-100" : "bg-gray-700"
              } hover:bg-indigo-200`}
            >
              <FontAwesomeIcon
                icon={theme === "light" ? faMoon : faSun}
                className="text-indigo-600"
              />
            </button>
          </div>

          {/* Text Input and Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div
                className={`p-4 rounded-lg mb-4 ${
                  theme === "light" ? "bg-indigo-50/50" : "bg-gray-700/50"
                } border ${
                  theme === "light" ? "border-indigo-100" : "border-gray-600"
                } animate-slide-in`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    theme === "light" ? "text-gray-800" : "text-gray-100"
                  } font-inter tracking-tight`}
                >
                  Enter Text to Speak
                </h3>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste your text here..."
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 min-h-[150px] ${
                    theme === "light"
                      ? "bg-white border-gray-300"
                      : "bg-gray-800 border-gray-600 text-gray-100"
                  }`}
                />
                <div className="mt-4">
                  <Waveform />
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={speak}
                    disabled={isSpeaking || !selectedVoice}
                    className={`flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-indigo-200 transform hover:scale-105 ${
                      isSpeaking || !selectedVoice
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                    Speak
                  </button>
                  <button
                    onClick={togglePause}
                    disabled={!isSpeaking && !synthRef.current.paused}
                    className={`flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-yellow-200 transform hover:scale-105 ${
                      !isSpeaking && !synthRef.current.paused
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faPause} className="mr-2" />
                    {synthRef.current.paused ? "Resume" : "Pause"}
                  </button>
                </div>
              </div>

              {/* Voice Controls */}
              <div
                className={`p-4 rounded-lg ${
                  theme === "light" ? "bg-indigo-50/50" : "bg-gray-700/50"
                } border ${
                  theme === "light" ? "border-indigo-100" : "border-gray-600"
                } animate-slide-in`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    theme === "light" ? "text-gray-800" : "text-gray-100"
                  } font-inter tracking-tight`}
                >
                  Voice Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      } mb-1`}
                    >
                      Voice
                    </label>
                    <select
                      value={selectedVoice ? selectedVoice.name : ""}
                      onChange={(e) => {
                        const voice = voices.find(
                          (v) => v.name === e.target.value
                        );
                        setSelectedVoice(voice);
                      }}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        theme === "light"
                          ? "bg-white border-gray-300"
                          : "bg-gray-800 border-gray-600 text-gray-100"
                      }`}
                    >
                      {voices.length === 0 ? (
                        <option value="">No voices available</option>
                      ) : (
                        voices.map((voice) => (
                          <option key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      } mb-1`}
                    >
                      Speed ({speed.toFixed(1)}x)
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      } mb-1`}
                    >
                      Pitch ({pitch.toFixed(1)})
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={pitch}
                      onChange={(e) => setPitch(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text Preview and History */}
            <div>
              <div
                className={`p-4 rounded-lg mb-4 ${
                  theme === "light" ? "bg-indigo-50/50" : "bg-gray-700/50"
                } border ${
                  theme === "light" ? "border-indigo-100" : "border-gray-600"
                } animate-slide-in`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    theme === "light" ? "text-gray-800" : "text-gray-100"
                  } font-inter tracking-tight`}
                >
                  Text Preview
                </h3>
                <div
                  className={`p-3 rounded-lg min-h-[150px] ${
                    theme === "light" ? "bg-white" : "bg-gray-800"
                  } border ${
                    theme === "light" ? "border-gray-200" : "border-gray-600"
                  }`}
                >
                  {text ? (
                    text.split(" ").map((word, index) => (
                      <span
                        key={index}
                        className={`transition-all duration-200 ${
                          highlightedWord === index
                            ? "bg-indigo-600 text-white px-1 rounded"
                            : theme === "light"
                            ? "text-gray-800"
                            : "text-gray-100"
                        }`}
                      >
                        {word}{" "}
                      </span>
                    ))
                  ) : (
                    <span
                      className={`${
                        theme === "light" ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      No text entered
                    </span>
                  )}
                </div>
              </div>

              {/* History */}
              <div
                className={`p-4 rounded-lg ${
                  theme === "light" ? "bg-indigo-50/50" : "bg-gray-700/50"
                } border ${
                  theme === "light" ? "border-indigo-100" : "border-gray-600"
                } animate-slide-in`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    theme === "light" ? "text-gray-800" : "text-gray-100"
                  } font-inter tracking-tight`}
                >
                  Speech History
                </h3>
                {history.length === 0 ? (
                  <div
                    className={`text-center py-4 ${
                      theme === "light" ? "text-gray-500" : "text-gray-400"
                    } ${
                      theme === "light" ? "bg-gray-50/50" : "bg-gray-600/50"
                    } rounded-lg`}
                  >
                    No speech history yet
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center p-3 border rounded-lg transition-all duration-200 transform hover:scale-102 ${
                          theme === "light"
                            ? "bg-white border-gray-200 shadow-sm hover:shadow-md"
                            : "bg-gray-800 border-gray-600 shadow-sm hover:shadow-lg"
                        }`}
                      >
                        <div className="flex-grow">
                          <div
                            className={`text-base font-medium ${
                              theme === "light"
                                ? "text-gray-800"
                                : "text-gray-100"
                            } font-inter truncate`}
                          >
                            {item.text}
                          </div>
                          <div
                            className={`text-xs ${
                              theme === "light"
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          >
                            {item.date}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-3">
                          <button
                            onClick={() => playHistoryItem(item.url)}
                            className="text-indigo-600 hover:text-indigo-800 transform hover:scale-110 transition-all"
                          >
                            <FontAwesomeIcon icon={faPlay} />
                          </button>
                          <button
                            onClick={() => downloadAudio(item.url, item.text)}
                            className="text-green-600 hover:text-green-800 transform hover:scale-110 transition-all"
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default TextToSpeechPage;
