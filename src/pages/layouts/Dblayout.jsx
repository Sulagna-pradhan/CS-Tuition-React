import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "../../components/dashboard/DbHeader";
import Sidebar from "../../components/dashboard/DbSidebar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/Config";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated:", user.uid);
      } else {
        console.log("No user authenticated, redirecting to login");
        window.location.href = "/auth/login";
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className={
        "min-h-screen flex flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300"
      }
    >
      {/* Header */}
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8 flex">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
