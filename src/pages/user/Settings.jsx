import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faKey,
  faExclamationTriangle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  updatePassword,
} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/Config";

const SettingsPage = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const reauthenticate = async (password) => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      console.log("Re-authentication successful");
      return true;
    } catch (error) {
      console.error("Re-authentication error:", {
        code: error.code,
        message: error.message,
      });
      alert("Incorrect current password. Please try again.");
      return false;
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      alert("Please enter your current password to delete your account.");
      return;
    }

    const isReauthenticated = await reauthenticate(deletePassword);
    if (!isReauthenticated) return;

    try {
      const user = auth.currentUser;
      const userDocRef = doc(db, "users", user.uid);
      await deleteDoc(userDocRef);
      console.log("User document deleted from Firestore");
      await deleteUser(user);
      console.log("User account deleted from Firebase Auth");
      alert("Your account has been deleted successfully.");
      setShowDeleteConfirmation(false);
      setDeletePassword("");
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Error deleting account:", {
        code: error.code,
        message: error.message,
      });
      alert("Failed to delete account. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (!currentPassword.trim()) {
      alert("Please enter your current password.");
      return;
    }
    if (!newPassword.trim() || !confirmPassword.trim()) {
      alert("Please enter and confirm your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters long.");
      return;
    }

    const isReauthenticated = await reauthenticate(currentPassword);
    if (!isReauthenticated) return;

    try {
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      console.log("Password updated successfully");
      alert("Your password has been reset successfully.");
      setShowResetPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error resetting password:", {
        code: error.code,
        message: error.message,
      });
      if (error.code === "auth/weak-password") {
        alert("New password is too weak. Please choose a stronger password.");
      } else {
        alert("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 p-6">
      {/* Page Header */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Delete Account Section */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-600" />
              Delete Account
            </h3>
            <p className="text-gray-500">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Account
          </button>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 w-full max-w-md">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="mr-2 text-red-600"
                />
                Confirm Account Deletion
              </h3>
              <p className="text-gray-500 mb-4">
                Are you sure you want to delete your account? This action cannot
                be undone. Please enter your current password to confirm.
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                placeholder="Current Password"
              />
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowDeleteConfirmation(false);
                    setDeletePassword("");
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset Password Section */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faKey} className="mr-2 text-indigo-600" />
              Reset Password
            </h3>
            <p className="text-gray-500">
              Change your password to keep your account secure.
            </p>
          </div>
          <button
            onClick={() => setShowResetPassword(true)}
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </div>

        {/* Reset Password Modal */}
        {showResetPassword && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 w-full max-w-md">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faKey}
                  className="mr-2 text-indigo-600"
                />
                Reset Password
              </h3>
              <div className="space-y-4">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Current Password"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="New Password"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Confirm New Password"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowResetPassword(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default SettingsPage;
