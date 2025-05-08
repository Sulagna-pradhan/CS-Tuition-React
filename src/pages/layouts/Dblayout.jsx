import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "../../components/dashboard/DbHeader";
import Sidebar from "../../components/dashboard/DbSidebar";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";

function getCreatedAt(currentUser) {
  if (
    currentUser?.metadata?.createdAt &&
    !isNaN(currentUser.metadata.createdAt)
  ) {
    const d = new Date(parseInt(currentUser.metadata.createdAt, 10));
    return d.toLocaleDateString();
  }
  return "";
}

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    collegeName: "",
    contactNumber: "",
    createdAt: "",
    currentSemester: "",
    parentName: "",
    parentPhone: "",
    universityName: "",
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              name: data.name,
              email: data.email,
              bio: data.bio,
              collegeName: data.collegeName,
              contactNumber: data.contactNumber,
              createdAt: data.createdAt || getCreatedAt(currentUser),
              currentSemester: data.currentSemester,
              parentName: data.parentName,
              parentPhone: data.parentPhone,
              universityName: data.universityName,
            });
          } else {
            console.log("No user document found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", {
            code: error.code,
            message: error.message,
          });
        }
      }
    };

    fetchUserData();
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={
        "min-h-screen flex flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300"
      }
    >
      {/* Header */}
      <Header
        userData={userData}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8 flex">
        {/* Sidebar */}
        <Sidebar
          userData={userData}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <Outlet context={{ userData, setUserData }} />
      </div>
    </div>
  );
};

export default Dashboard;
