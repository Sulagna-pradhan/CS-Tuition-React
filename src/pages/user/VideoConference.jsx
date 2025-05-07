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
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/Config";
import Peer from "peerjs";

const VideoConference = () => {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [peers, setPeers] = useState({});
  const [streams, setStreams] = useState({});
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const localVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const localStreamRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Fetch user data and initialize PeerJS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User authenticated:", user.uid);
        setUserId(user.uid);
        // Fetch user name from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const { firstName, lastName } = userDoc.data();
          setUserName(`${firstName} ${lastName}`);
        } else {
          console.log("User document not found");
          window.location.href = "/auth/login";
        }
      } else {
        console.log("No user authenticated, redirecting to login");
        window.location.href = "/auth/login";
      }
    });

    return () => unsubscribe();
  }, []);

  // Initialize PeerJS and media stream
  useEffect(() => {
    if (!userId) return;

    const peer = new Peer(userId, {
      host: "0.peerjs.com",
      port: 443,
      path: "/",
      secure: true,
    });
    peerInstance.current = peer;

    peer.on("open", (id) => {
      console.log("PeerJS ID:", id);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Failed to get media stream:", err);
      });

    peer.on("call", (call) => {
      call.answer(localStreamRef.current);
      call.on("stream", (remoteStream) => {
        setStreams((prev) => ({ ...prev, [call.peer]: remoteStream }));
        setPeers((prev) => ({
          ...prev,
          [call.peer]: { call, name: prev[call.peer]?.name || "Unknown" },
        }));
      });
      call.on("close", () => {
        setStreams((prev) => {
          const newStreams = { ...prev };
          delete newStreams[call.peer];
          return newStreams;
        });
        setPeers((prev) => {
          const newPeers = { ...prev };
          delete newPeers[call.peer];
          return newPeers;
        });
      });
    });

    peer.on("connection", (conn) => {
      conn.on("data", async (data) => {
        if (data.type === "name") {
          setPeers((prev) => ({
            ...prev,
            [conn.peer]: { ...prev[conn.peer], name: data.name },
          }));
        } else if (data.type === "chat") {
          setMessages((prev) => [
            ...prev,
            {
              uid: conn.peer,
              message: data.message,
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      });
      conn.on("open", () => {
        conn.send({ type: "name", name: userName });
      });
    });

    return () => {
      peer.destroy();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [userId, userName]);

  // Join room
  const joinRoom = async () => {
    if (!roomId) {
      alert("Please enter a Room ID");
      return;
    }
    setJoined(true);

    // Fetch existing peers in the room (simulated via Firestore or signaling)
    const q = query(collection(db, "chat"), where("roomId", "==", roomId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomPeers = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.uid !== userId && !peers[data.uid]) {
          roomPeers.push(data.uid);
        }
      });

      roomPeers.forEach((peerId) => {
        const call = peerInstance.current.call(peerId, localStreamRef.current);
        call.on("stream", (remoteStream) => {
          setStreams((prev) => ({ ...prev, [peerId]: remoteStream }));
        });
        call.on("close", () => {
          setStreams((prev) => {
            const newStreams = { ...prev };
            delete newStreams[peerId];
            return newStreams;
          });
        });

        const conn = peerInstance.current.connect(peerId);
        conn.on("open", () => {
          conn.send({ type: "name", name: userName });
        });
        conn.on("data", (data) => {
          if (data.type === "name") {
            setPeers((prev) => ({
              ...prev,
              [peerId]: { call, name: data.name },
            }));
          } else if (data.type === "chat") {
            setMessages((prev) => [
              ...prev,
              {
                uid: peerId,
                message: data.message,
                timestamp: new Date().toISOString(),
              },
            ]);
          }
        });

        setPeers((prev) => ({
          ...prev,
          [peerId]: { call, name: "Unknown" },
        }));
      });
    });

    // Fetch chat history
    const chatQuery = query(
      collection(db, "chat"),
      where("roomId", "==", roomId),
      orderBy("timestamp", "asc")
    );
    onSnapshot(chatQuery, (snapshot) => {
      const chatMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(chatMessages);
    });

    return () => unsubscribe();
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoEnabled(videoTrack.enabled);
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setAudioEnabled(audioTrack.enabled);
    }
  };

  // Share screen
  const shareScreen = async () => {
    if (isScreenSharing) {
      // Stop screen sharing
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
      }
      setIsScreenSharing(false);
      setVideoEnabled(true);
      // Update all peers
      Object.values(peers).forEach(({ call }) => {
        const sender = call.peerConnection
          .getSenders()
          .find((s) => s.track.kind === "video");
        sender.replaceTrack(stream.getVideoTracks()[0]);
      });
    } else {
      // Start screen sharing
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play();
        }
        setIsScreenSharing(true);
        setVideoEnabled(true);
        // Update all peers
        Object.values(peers).forEach(({ call }) => {
          const sender = call.peerConnection
            .getSenders()
            .find((s) => s.track.kind === "video");
          sender.replaceTrack(stream.getVideoTracks()[0]);
        });
        // Stop screen sharing when user stops
        stream.getVideoTracks()[0].onended = () => shareScreen();
      } catch (err) {
        console.error("Failed to share screen:", err);
      }
    }
  };

  // Send chat message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      roomId,
      uid: userId,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "chat"), messageData);
      Object.keys(peers).forEach((peerId) => {
        const conn = peerInstance.current.connect(peerId);
        conn.on("open", () => {
          conn.send({ type: "chat", message: newMessage });
        });
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
                    {userName} (You)
                  </p>
                </div>
                {/* Remote Videos */}
                {Object.entries(streams).map(([peerId, stream]) => (
                  <div key={peerId} className="relative">
                    <video
                      autoPlay
                      className="w-full h-64 object-cover rounded-lg border dark:border-gray-600"
                      ref={(video) => {
                        if (video) video.srcObject = stream;
                      }}
                    />
                    <p className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                      {peers[peerId]?.name || "Unknown"}
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
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <FontAwesomeIcon icon={faDesktop} className="mr-2" />
                  {isScreenSharing ? "Stop Sharing" : "Share Screen"}
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
                      msg.uid === userId ? "text-right" : "text-left"
                    }`}
                  >
                    <p className="text-sm text-gray-500">
                      {msg.uid === userId
                        ? "You"
                        : peers[msg.uid]?.name || "Unknown"}{" "}
                      - {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                    <p
                      className={`inline-block px-3 py-1 rounded-lg ${
                        msg.uid === userId
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
