import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBook,
  faCog,
  faSignOutAlt,
  faTimes,
  faBookmark,
  faVideo,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Config";

const Sidebar = ({ userData, isSidebarOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        toggleSidebar();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  // Handle navigation link clicks - close sidebar
  const handleLinkClick = () => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout error:", {
        code: error.code,
        message: error.message,
      });
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={`w-64 rounded-xl shadow-lg p-6 transform transition-all duration-300 fixed md:relative z-40 h-screen md:h-auto overflow-y-auto 
        ${
          isSidebarOpen ? "left-0" : "-left-64"
        } md:left-0 md:block dark:bg-gray-800 border dark:border-gray-700 bg-white`}
    >
      {/* Close Button for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 p-2 rounded-full focus:outline-none text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      >
        <FontAwesomeIcon icon={faTimes} className="text-xl" />
      </button>

      {/* User Info */}
      <div className="flex flex-col items-center mb-8 mt-2">
        <img
          src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?ga=GA1.1.1014516846.1736798059&semt=ais_hybrid&w=740"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-indigo-500 mb-4 object-cover"
        />
        <h3 className="font-bold text-xl dark:text-white text-gray-800">
          {userData?.name || "User"}
        </h3>
        <p className="text-gray-500 text-sm">
          {userData?.contactNumber || "unknown number"}
        </p>
      </div>

      {/* Sidebar Links */}
      <nav className="space-y-1">
        <Link
          to=""
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faHome} className="mr-3 text-indigo-500" />
          Home
        </Link>

        {/* Payment Status */}
        <Link
          to="payment"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faBook} className="mr-3 text-indigo-500" />
          Payment Status
        </Link>

        {/* Lets Chat */}
        <Link
          to="chatroom"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faComment} className="mr-3 text-indigo-500" />
          Lets Chat
        </Link>

        {/* Video Conference */}
        <Link
          to="videoconference"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faVideo} className="mr-3 text-indigo-500" />
          Lets Meet
        </Link>

        {/* Profile */}
        <Link
          to="profile"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faUser} className="mr-3 text-indigo-500" />
          Profile
        </Link>

        {/* Settings */}
        <Link
          to="settings"
          className="flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
          onClick={handleLinkClick}
        >
          <FontAwesomeIcon icon={faCog} className="mr-3 text-indigo-500" />
          Settings
        </Link>

        <div className="pt-6 mt-6 border-t border-gray-200">
          <button
            className="w-full text-left flex items-center py-3 px-4 rounded-lg dark:text-white hover:dark:bg-gray-700 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium"
            onClick={() => {
              handleLinkClick();
              handleLogout();
            }}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="mr-3 text-indigo-500"
            />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
