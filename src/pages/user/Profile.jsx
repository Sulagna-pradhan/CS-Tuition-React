import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/Config";
import { useOutletContext } from "react-router-dom";

const DashboardProfile = () => {
  const { userData, setUserData } = useOutletContext();
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?ga=GA1.1.1014516846.1736798059&semt=ais_hybrid&w=740"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [issue, setIssue] = useState("");

  const handleSaveProfile = async () => {
    setIsEditing(false);
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        bio: userData.bio,
        collegeName: userData.collegeName,
        contactNumber: userData.contactNumber,
        createdAt: userData.createdAt,
        currentSemester: userData.currentSemester,
        parentName: userData.parentName,
        universityName: userData.universityName,
      });
      console.log("Profile updated in Firestore:", userData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", {
        code: error.code,
        message: error.message,
      });
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSendIssue = () => {
    if (issue.trim()) {
      console.log("Issue reported:", issue);
      alert("Your issue has been reported. We'll get back to you soon!");
      setIssue("");
    } else {
      alert("Please describe your issue before sending.");
    }
  };

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 p-6">
      {/* Profile Header */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

        {/* Profile Details */}
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
              </div>
            )}
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name (Read-Only) */}
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                {userData?.name}
              </p>
            </div>

            {/* Email (Read-Only) */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                {userData?.email}
              </p>
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Contact Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData?.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Enter Contact Number"
                />
              ) : (
                <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                  {userData?.contactNumber}
                </p>
              )}
            </div>

            {/* Parent Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Parent Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData?.parentName}
                  onChange={(e) =>
                    handleInputChange("parentName", e.target.value)
                  }
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Enter Parent Name"
                />
              ) : (
                <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                  {userData?.parentName}
                </p>
              )}
            </div>

            {/* Parent Phone (Read-Only) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Parent Phone
              </label>
              <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                {userData?.parentPhone}
              </p>
            </div>
          </div>

          {/* Academic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* College Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                College Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData?.collegeName}
                  onChange={(e) =>
                    handleInputChange("collegeName", e.target.value)
                  }
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Enter College Name"
                />
              ) : (
                <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                  {userData?.collegeName}
                </p>
              )}
            </div>

            {/* University Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                University Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData?.universityName}
                  onChange={(e) =>
                    handleInputChange("universityName", e.target.value)
                  }
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Enter University Name"
                />
              ) : (
                <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                  {userData?.universityName}
                </p>
              )}
            </div>

            {/* Current Semester */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Semester
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userData?.currentSemester}
                  onChange={(e) =>
                    handleInputChange("currentSemester", e.target.value)
                  }
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Enter Current Semester"
                />
              ) : (
                <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                  {userData?.currentSemester}
                </p>
              )}
            </div>

            {/* Account Created At */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Account Created At
              </label>
              <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                {userData?.createdAt}
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={userData?.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                rows="4"
                placeholder="Enter Bio"
              />
            ) : (
              <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                {userData?.bio}
              </p>
            )}
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() =>
              isEditing ? handleSaveProfile() : setIsEditing(true)
            }
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FontAwesomeIcon
              icon={isEditing ? faSave : faEdit}
              className="mr-2"
            />
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Facing Any Issue? Tell Us Section */}
      <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h3 className="text-xl font-bold mb-4">Facing Any Issue? Tell Us</h3>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          rows="4"
          placeholder="Describe your issue here..."
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSendIssue}
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default DashboardProfile;
