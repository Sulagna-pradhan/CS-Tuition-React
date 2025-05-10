import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/Config";

// Layouts
import Base from "./pages/layouts/Base";
import Dblayout from "./pages/layouts/Dblayout";

// Public Routes
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Faq from "./pages/Faq";
import WhyUs from "./pages/WhyUs";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Event from "./pages/Event";
import Testimonial from "./pages/Testimonial";
import Features from "./pages/Features";
import PDF from "./pages/PDF";
import Syllabus from "./pages/pdf/Syllabus";
import PYQ from "./pages/pdf/PYQ";
import Library from "./pages/pdf/Library";
import ComingSoon from "./pages/ComingSoon";
import Resources from "./pages/Resources";
import InfoPage from "./pages/InfoPage";
import Updates from "./pages/Updates";
import FeedBack from "./pages/FeedBack";
import Learn from "./pages/Learn";

import Programming from "./pages/course/Programming";
import Dsa from "./pages/course/Dsa";

import Productivity from "./pages/tools/Productivity";
import QrCode from "./pages/tools/productivity/QrCode";
import ToDoList from "./pages/tools/productivity/ToDoList";

import Learning from "./pages/tools/Learning";
import C from "./pages/tools/learning/C";
import Java from "./pages/tools/learning/Java";
import Python from "./pages/tools/learning/Python";
import Javascript from "./pages/tools/learning/Javascript";
import Cpp from "./pages/tools/learning/Cpp";
import NumberSystem from "./pages/tools/learning/NumberSystem";

import Ai from "./pages/Ai";

// Authentication Routes
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import TermsCondition from "./pages/auth/TermsCondition";

// Protected Dashboard Routes
import DbHome from "./pages/user/DbHome";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import Payment from "./pages/user/Payment";
import VideoConference from "./pages/user/VideoConference";
import ChatRoom from "./pages/user/ChatRoom";
import DbLoader from "./components/dashboard/DbLoader";
import { useAuth } from "./context/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <DbLoader />;
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public routes under Base layout */}
      <Route path="/" element={<Base />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="faq" element={<Faq />} />
        <Route path="whyus" element={<WhyUs />} />
        <Route path="team" element={<Team />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="event" element={<Event />} />
        <Route path="testimonial" element={<Testimonial />} />
        <Route path="features" element={<Features />} />
        <Route path="pdf" element={<PDF />} />
        <Route path="pdf/syllabus" element={<Syllabus />} />
        <Route path="pdf/pyq" element={<PYQ />} />
        <Route path="pdf/library" element={<Library />} />
        <Route path="comingsoon" element={<ComingSoon />} />
        <Route path="resources" element={<Resources />} />
        <Route path="infopage" element={<InfoPage />} />
        <Route path="updates" element={<Updates />} />
        <Route path="feedback" element={<FeedBack />} />
        <Route path="learn" element={<Learn />} />

        <Route path="course/programming" element={<Programming />} />
        <Route path="course/dsa" element={<Dsa />} />

        {/* Productivity */}
        <Route path="tools/productivity" element={<Productivity />} />
        <Route path="tools/productivity/qrcode" element={<QrCode />} />
        <Route path="tools/productivity/todolist" element={<ToDoList />} />

        {/* Learning Tools */}
        <Route path="tools/learning" element={<Learning />} />
        <Route path="tools/learning/c" element={<C />} />
        <Route path="tools/learning/java" element={<Java />} />
        <Route path="tools/learning/python" element={<Python />} />
        <Route path="tools/learning/javascript" element={<Javascript />} />
        <Route path="tools/learning/cpp" element={<Cpp />} />
        <Route path="tools/learning/number-system" element={<NumberSystem />} />

        {/* Authentication routes */}
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="auth/termscondition" element={<TermsCondition />} />
      </Route>

      <Route>
        <Route path="ai" element={<Ai />} />
      </Route>

      {/* Protected dashboard routes under Dblayout */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <Dblayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DbHome />} />
        <Route path="dbhome" element={<DbHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="payment" element={<Payment />} />
        <Route path="videoconference" element={<VideoConference />} />
        <Route path="chatroom" element={<ChatRoom />} />
      </Route>
    </Routes>
  );
}

export default App;
