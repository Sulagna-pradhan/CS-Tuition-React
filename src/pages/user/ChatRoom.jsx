import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Ably from "ably";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ablyInstance = useRef(null);
  const channelRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize Ably and join global chat
  useEffect(() => {
    const clientId = `user-${Math.random().toString(36).substring(7)}`;
    const ably = new Ably.Realtime({
      key: "_8LujQ.6_Qnyg:Hq2O50kh4x-UgTee5mOjMaoW9fpjGAT7leUo4b70Bio",
      clientId,
    });
    ablyInstance.current = ably;

    ably.connection.on("connected", () => {
      console.log("Connected to Ably");
      setIsConnected(true);

      // Subscribe to global channel
      channelRef.current = ably.channels.get("global-chat");

      // Subscribe to messages
      channelRef.current.subscribe("message", (msg) => {
        setMessages((prev) => [
          ...prev,
          {
            uid: msg.clientId,
            message: msg.data,
            timestamp: msg.timestamp,
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
      channelRef.current.presence.subscribe(["enter", "leave"], () => {
        channelRef.current.presence.get((err, members) => {
          if (err) {
            console.error("Failed to get presence:", err);
            return;
          }
          setOnlineUsers(members.map((m) => m.clientId));
        });
      });

      // Enter presence
      channelRef.current.presence.enter().catch((err) => {
        console.error("Failed to enter presence:", err);
      });
    });

    ably.connection.on("failed", (err) => {
      console.error("Ably connection failed:", err);
      alert(
        "Failed to connect to Ably. Please check your API key and network."
      );
      setIsConnected(false);
    });

    return () => {
      ably.close();
    };
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !channelRef.current) return;

    try {
      await channelRef.current.publish("message", newMessage);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Failed to send message. Please try again.");
    }
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
    <main className="flex-1 p-6 dark:text-white text-gray-800">
      {/* Page Header */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
        <h2 className="text-2xl font-bold flex items-center">
          <FontAwesomeIcon icon={faComment} className="mr-2 text-indigo-600" />
          Global Chat
        </h2>
        <p className="text-gray-500">Connect with others in real-time.</p>
      </div>

      {/* Chat Interface */}
      <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white">
        {!isConnected && (
          <p className="text-sm text-red-500 mb-4">Connecting to Ably...</p>
        )}
        {isConnected && (
          <div className="flex flex-col">
            {/* Online Users */}
            <div className="mb-4">
              <p className="text-sm font-medium">
                Online Users: {onlineUsers.length}
              </p>
              <p className="text-sm text-gray-500">{onlineUsers.join(", ")}</p>
            </div>
            {/* Typing Indicators */}
            {typingUsers.length > 0 && (
              <p className="text-sm text-gray-500 mb-2">
                {typingUsers.length > 1
                  ? "Multiple people are typing..."
                  : `${typingUsers[0]} is typing...`}
              </p>
            )}
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.uid === ablyInstance.current?.options.clientId
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <p className="text-sm text-gray-500">
                    {msg.uid === ablyInstance.current?.options.clientId
                      ? "You"
                      : msg.uid}{" "}
                    - {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                  <p
                    className={`inline-block px-3 py-1 rounded-lg ${
                      msg.uid === ablyInstance.current?.options.clientId
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
            <div className="mt-4 flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  handleTyping();
                  if (e.key === "Enter") sendMessage();
                }}
                className="flex-1 p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type a message..."
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
    </main>
  );
};

export default ChatRoom;
