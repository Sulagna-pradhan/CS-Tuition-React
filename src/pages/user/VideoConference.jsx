import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
  faDesktop,
  faComment,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
// Import Peer from peerjs
import Peer from "peerjs";

const VideoConference = () => {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [peers, setPeers] = useState({});
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const localVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const localStreamRef = useRef(null);
  const messagesEndRef = useRef(null);
  const connectionsRef = useRef({});

  // Initialize PeerJS and media stream
  useEffect(() => {
    const peer = new Peer({
      host: "peerjs-server.herokuapp.com",
      secure: true,
      path: "/",
    });

    peerInstance.current = peer;

    peer.on("open", (id) => {
      console.log("My peer ID:", id);
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    return () => {
      peer.destroy();
    };
  }, []);

  // Initialize local media stream
  const initLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Failed to get local stream", err);
    }
  };

  // Join room
  const joinRoom = async () => {
    if (!roomId) {
      alert("Please enter a Room ID");
      return;
    }

    await initLocalStream();
    setJoined(true);

    const peer = peerInstance.current;

    // Handle incoming calls
    peer.on("call", (call) => {
      call.answer(localStreamRef.current);

      call.on("stream", (remoteStream) => {
        setPeers((prev) => ({
          ...prev,
          [call.peer]: {
            stream: remoteStream,
            name: `User ${call.peer.slice(0, 5)}`,
          },
        }));
      });

      call.on("close", () => {
        setPeers((prev) => {
          const newPeers = { ...prev };
          delete newPeers[call.peer];
          return newPeers;
        });
      });
    });

    // Connect to the room (peer ID = room ID)
    const call = peer.call(roomId, localStreamRef.current);

    call.on("stream", (remoteStream) => {
      setPeers((prev) => ({
        ...prev,
        [roomId]: {
          stream: remoteStream,
          name: "Host",
        },
      }));
    });

    call.on("close", () => {
      setPeers((prev) => {
        const newPeers = { ...prev };
        delete newPeers[roomId];
        return newPeers;
      });
    });

    // Data connection for chat
    const conn = peer.connect(roomId);
    connectionsRef.current[roomId] = conn;

    conn.on("data", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          uid: roomId,
          message: data,
          timestamp: new Date().toISOString(),
        },
      ]);
    });
  };

  // Leave room
  const leaveRoom = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    Object.values(connectionsRef.current).forEach((conn) => conn.close());
    connectionsRef.current = {};

    setPeers({});
    setJoined(false);
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  };

  // Toggle audio with speech detection
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);

        // Auto-unmute when speaking (simplified version)
        if (audioTrack.enabled) {
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(
            localStreamRef.current
          );
          microphone.connect(analyser);

          const checkSpeaking = () => {
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            const sum = dataArray.reduce((a, b) => a + b, 0);

            if (sum > 1000 && !audioTrack.enabled) {
              // Threshold for speech detection
              audioTrack.enabled = true;
              setAudioEnabled(true);
            } else {
              requestAnimationFrame(checkSpeaking);
            }
          };

          checkSpeaking();
        }
      }
    }
  };

  // Share screen
  const shareScreen = async () => {
    try {
      if (isScreenSharing) {
        // Stop screen sharing
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        replaceStream(stream);
        setIsScreenSharing(false);
      } else {
        // Start screen sharing
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        replaceStream(stream);
        setIsScreenSharing(true);

        // Handle when user stops sharing
        stream.getVideoTracks()[0].onended = () => {
          shareScreen();
        };
      }
    } catch (err) {
      console.error("Screen sharing error:", err);
    }
  };

  // Replace local stream and update peers
  const replaceStream = (newStream) => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    localStreamRef.current = newStream;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = newStream;
    }

    // Update all peers with new stream
    Object.keys(connectionsRef.current).forEach((peerId) => {
      const call = peerInstance.current.call(peerId, newStream);
      call.on("stream", (remoteStream) => {
        setPeers((prev) => ({
          ...prev,
          [peerId]: {
            ...prev[peerId],
            stream: remoteStream,
          },
        }));
      });
    });
  };

  // Send chat message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      uid: peerInstance.current.id,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, messageData]);

    // Send to all connected peers
    Object.values(connectionsRef.current).forEach((conn) => {
      conn.send(newMessage);
    });

    setNewMessage("");
  };

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 p-6">
      {/* Page Header */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h2 className="text-2xl font-bold flex items-center">
          <FontAwesomeIcon icon={faVideo} className="mr-2 text-indigo-600" />
          Video Conference
        </h2>
        <p className="text-gray-500">
          Join a video conference room to connect with others.
        </p>
      </div>

      {/* Join Room */}
      {!joined && (
        <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4">Join a Room</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Room ID</label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                placeholder="Enter Room ID"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={joinRoom}
                className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Join Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conference Room */}
      {joined && (
        <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4">Room: {roomId}</h3>
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Video Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Local Video */}
                <div className="relative">
                  <video
                    ref={localVideoRef}
                    muted
                    autoPlay
                    className="w-full h-64 object-cover rounded-lg border dark:border-gray-600"
                  />
                  <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                    You
                  </p>
                </div>
                {/* Remote Videos */}
                {Object.entries(peers).map(([peerId, peerData]) => (
                  <div key={peerId} className="relative">
                    <video
                      autoPlay
                      className="w-full h-64 object-cover rounded-lg border dark:border-gray-600"
                      ref={(video) => {
                        if (video) video.srcObject = peerData.stream;
                      }}
                    />
                    <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                      {peerData.name}
                    </p>
                  </div>
                ))}
              </div>
              {/* Controls */}
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4">
                <button
                  onClick={toggleVideo}
                  className={`px-6 py-2 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    videoEnabled
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={videoEnabled ? faVideoSlash : faVideo}
                    className="mr-2"
                  />
                  {videoEnabled ? "Stop Video" : "Start Video"}
                </button>
                <button
                  onClick={toggleAudio}
                  className={`px-6 py-2 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    audioEnabled
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={audioEnabled ? faMicrophoneSlash : faMicrophone}
                    className="mr-2"
                  />
                  {audioEnabled ? "Mute Audio" : "Unmute Audio"}
                </button>
                <button
                  onClick={shareScreen}
                  className={`px-6 py-2 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    isScreenSharing
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  <FontAwesomeIcon icon={faDesktop} className="mr-2" />
                  {isScreenSharing ? "Stop Sharing" : "Share Screen"}
                </button>
                <button
                  onClick={leaveRoom}
                  className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Leave Room
                </button>
              </div>
            </div>
            {/* Chat */}
            <div className="w-full md:w-80 mt-6 md:mt-0">
              <h4 className="text-lg font-bold mb-2 flex items-center">
                <FontAwesomeIcon
                  icon={faComment}
                  className="mr-2 text-indigo-600"
                />
                Chat
              </h4>
              <div className="h-64 overflow-y-auto p-4 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      msg.uid === peerInstance.current?.id
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    <p className="text-sm text-gray-500">
                      {msg.uid === peerInstance.current?.id
                        ? "You"
                        : peers[msg.uid]?.name || "Unknown"}{" "}
                      - {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                    <p
                      className={`inline-block px-3 py-1 rounded-lg ${
                        msg.uid === peerInstance.current?.id
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
              <div className="mt-4 flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default VideoConference;
