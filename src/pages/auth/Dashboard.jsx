import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartLine,
  faBell,
  faCog,
  faSignOutAlt,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 font-bold text-xl text-indigo-600">Dashboard</div>
        <ul className="space-y-4 p-6 text-gray-700">
          <li className="hover:text-indigo-600 flex items-center gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faUser} /> Profile
          </li>
          <li className="hover:text-indigo-600 flex items-center gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faChartLine} /> Analytics
          </li>
          <li className="hover:text-indigo-600 flex items-center gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faTasks} /> Tasks
          </li>
          <li className="hover:text-indigo-600 flex items-center gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faBell} /> Notifications
          </li>
          <li className="hover:text-indigo-600 flex items-center gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faCog} /> Settings
          </li>
          <li className="hover:text-red-600 flex items-center gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-600 font-medium">John Doe</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Profile Views
            </h2>
            <p className="text-3xl font-bold text-indigo-600">1,284</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Tasks Completed
            </h2>
            <p className="text-3xl font-bold text-green-600">76%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Notifications
            </h2>
            <p className="text-3xl font-bold text-red-500">9</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul className="bg-white rounded-xl shadow divide-y divide-gray-100">
            <li className="p-4 hover:bg-gray-50">
              ✅ Completed task "UI Review"
            </li>
            <li className="p-4 hover:bg-gray-50">
              🔔 New comment on your post
            </li>
            <li className="p-4 hover:bg-gray-50">👤 Profile updated</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
