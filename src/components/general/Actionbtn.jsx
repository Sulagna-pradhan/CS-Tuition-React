import React, { useState, useRef, useEffect } from "react";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 300,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const fabRef = useRef(null);
  const audioRef = useRef(null);

  // Only show button after delay, don't autoplay sound
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // No automatic sound play here
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 50),
        y: Math.min(prev.y, window.innerHeight - 50),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;

    const rect = fabRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add/remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Toggle options when clicking the main button
  const toggleOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      // Play sound when user interacts with the button
      if (audioRef.current && !isOpen) {
        audioRef.current.volume = 0.3;
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play still prevented:", e));
      }
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      <audio ref={audioRef} src="/ring.mp3" preload="auto" />

      <div
        ref={fabRef}
        className="fixed z-50 select-none transition-all duration-300 ease-in-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? "grabbing" : "grab",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.5)",
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Main Button */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 relative transition-all duration-300 ease-in-out ${
            isDragging ? "bg-gray-600" : "bg-purple-700 hover:bg-purple-600"
          }`}
          onClick={toggleOptions}
          style={{
            transform: isDragging
              ? "none"
              : isOpen
              ? "scale(1)"
              : "hover:scale(1.1)",
          }}
        >
          <span
            className="text-white text-2xl font-bold transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(135deg)" : "rotate(0deg)" }}
          >
            +
          </span>
        </div>

        {/* Option 1: Chat with AI */}
        <a
          href="/ai"
          className="absolute top-0 left-0 w-11 h-11 rounded-full flex items-center justify-center shadow-md bg-green-500 transition-all duration-300"
          style={{
            transform: isOpen ? "translateY(-55px)" : "translateY(0)",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
            zIndex: 5,
          }}
          onClick={() => setIsOpen(false)}
        >
          <span className="text-xl">💬</span>
          <span
            className="absolute right-12 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100"
            style={{ opacity: 0, transition: "opacity 0.2s" }}
          >
            Chat with AI
          </span>
        </a>

        {/* Option 2: Let's Code */}
        <a
          href="/tools/learning"
          className="absolute top-0 left-0 w-11 h-11 rounded-full flex items-center justify-center shadow-md bg-blue-500 transition-all duration-300"
          style={{
            transform: isOpen ? "translateY(-110px)" : "translateY(0)",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
            zIndex: 5,
          }}
          onClick={() => setIsOpen(false)}
        >
          <span className="text-xl">💻</span>
          <span
            className="absolute right-12 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100"
            style={{ opacity: 0, transition: "opacity 0.2s" }}
          >
            Let's Code
          </span>
        </a>

        {/* Option 3: Settings */}
        <a
          href="/settings"
          className="absolute top-0 left-0 w-11 h-11 rounded-full flex items-center justify-center shadow-md bg-orange-500 transition-all duration-300"
          style={{
            transform: isOpen ? "translateY(-165px)" : "translateY(0)",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
            zIndex: 5,
          }}
          onClick={() => setIsOpen(false)}
        >
          <span className="text-xl">⚙️</span>
          <span
            className="absolute right-12 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100"
            style={{ opacity: 0, transition: "opacity 0.2s" }}
          >
            Settings
          </span>
        </a>
      </div>
    </div>
  );
};

export default FloatingActionButton;
