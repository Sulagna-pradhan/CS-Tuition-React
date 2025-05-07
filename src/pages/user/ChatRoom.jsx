import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faReply } from "@fortawesome/free-solid-svg-icons";
import Ably from "ably";

const ChatRoom = () => {
  const [userName, setUserName] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const ablyInstance = useRef(null);
  const channelRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Join chat
  const joinChat = () => {
    if (!userName.trim()) {
      alert("Please enter your name.");
      return;
    }

    const ably = new Ably.Realtime({
      key: "_8LujQ.6_Qnyg:Hq2O50kh4x-UgTee5mOjMaoW9fpjGAT7leUo4b70Bio",
      clientId: userName,
    });
    ablyInstance.current = ably;

    ably.connection.on("connected", () => {
      console.log("Connected to Ably");
      setIsConnected(true);

      channelRef.current = ably.channels.get("global-chat");

      // Fetch message history
      channelRef.current.history({ limit: 100 }, (err, result) => {
        if (err) {
          console.error("Failed to fetch history:", err);
          return;
        }
        const historyMessages = result.items
          .filter((msg) => msg.name === "message")
          .map((msg) => ({
            uid: msg.clientId,
            message: msg.data,
            timestamp: msg.timestamp,
            replyTo: msg.data.replyTo || null,
          }));
        setMessages(historyMessages.reverse());
      });

      // Subscribe to messages
      channelRef.current.subscribe("message", (msg) => {
        setMessages((prev) => [
          ...prev,
          {
            uid: msg.clientId,
            message: msg.data,
            timestamp: msg.timestamp,
            replyTo: msg.data.replyTo || null,
          },
        ]);
      });

      // Subscribe to typing indicators
      channelRef.current.subscribe("typing", (msg) => {
        setTypingUsers((prev) => {
          if (msg.data.isTyping) {
            return [...new Set([...prev, msg.clientId])];
          }
          return prev.filter((id) => id !== msg.clientId);
        });
      });

      // Handle presence
      channelRef.current.presence.subscribe(
        ["enter", "leave", "update"],
        () => {
          channelRef.current.presence.get((err, members) => {
            if (err) {
              console.error("Failed to get presence:", err);
              return;
            }
            setOnlineUsers(members ? members.map((m) => m.clientId) : []);
          });
        }
      );

      // Enter presence
      channelRef.current.presence.enter().catch((err) => {
        console.error("Failed to enter presence:", err);
      });

      setIsJoined(true);
    });

    ably.connection.on("failed", (err) => {
      console.error("Ably connection failed:", err);
      alert(
        "Failed to connect to Ably. Please check your API key and network."
      );
      setIsConnected(false);
    });
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !channelRef.current) return;

    try {
      const messageData = {
        text: newMessage,
        replyTo: replyTo
          ? { uid: replyTo.uid, timestamp: replyTo.timestamp }
          : null,
      };
      await channelRef.current.publish("message", messageData);
      setNewMessage("");
      setReplyTo(null);
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Failed to send message. Please try again.");
    }
  };

  // Handle reply
  const handleReply = (msg) => {
    setNewMessage(`@${msg.uid}: `);
    setReplyTo(msg);
  };

  // Handle typing
  const handleTyping = async () => {
    if (!channelRef.current) return;

    try {
      await channelRef.current.publish("typing", { isTyping: true });
      setTimeout(async () => {
        await channelRef.current.publish("typing", { isTyping: false });
      }, 5000);
    } catch (err) {
      console.error("Failed to send typing indicator:", err);
    }
  };

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex-1 p-4 sm:p-6 dark:text-white text-gray-800">
      {/* Page Header */}
      <div className="rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center">
          <FontAwesomeIcon icon={faComment} className="mr-2 text-indigo-600" />
          Global Chat
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Connect with others in real-time.
        </p>
      </div>

      {/* Name Input */}
      {!isJoined && (
        <div className="rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Enter Your Name</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={joinChat}
                className="px-4 sm:px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Join Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {isJoined && (
        <div className="rounded-xl shadow-lg p-4 sm:p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
          {!isConnected && (
            <p className="text-sm text-red-500 mb-4">Connecting to Ably...</p>
          )}
          {isConnected && (
            <div className="flex flex-col space-y-4">
              {/* Online Users */}
              <div>
                <p className="text-sm font-medium">
                  Online Users: {onlineUsers.length}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {onlineUsers.join(", ")}
                </p>
              </div>
              {/* Typing Indicators */}
              {typingUsers.length > 0 && (
                <p className="text-sm text-gray-500">
                  {typingUsers.length > 1
                    ? "Multiple people are typing..."
                    : `${typingUsers[0]} is typing...`}
                </p>
              )}
              {/* Messages */}
              <div className="h-64 sm:h-96 overflow-y-auto p-4 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      msg.uid === userName ? "text-right" : "text-left"
                    } ${
                      msg.replyTo
                        ? "ml-4 sm:ml-6 border-l-2 border-indigo-500 pl-2"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {msg.uid === userName ? "You" : msg.uid} -{" "}
                        {new Date(msg.timestamp).toLocaleTimeString()}
                        {msg.replyTo && (
                          <span className="text-xs text-gray-400 ml-2">
                            (Replying to {msg.replyTo.uid})
                          </span>
                        )}
                      </p>
                      <button
                        onClick={() => handleReply(msg)}
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        <FontAwesomeIcon icon={faReply} className="mr-1" />
                        Reply
                      </button>
                    </div>
                    <p
                      className={`inline-block px-3 py-1 rounded-lg ${
                        msg.uid === userName
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 dark:bg-gray-600 dark:text-white"
                      }`}
                    >
                      {msg.message}
                    </p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              {/* Message Input */}
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    handleTyping();
                    if (e.key === "Enter") sendMessage();
                  }}
                  className="flex-1 p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={
                    replyTo
                      ? `Replying to ${replyTo.uid}...`
                      : "Type a message..."
                  }
                  disabled={!isConnected}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  disabled={!isConnected}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ChatRoom;
