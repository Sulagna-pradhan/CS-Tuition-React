import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Base from "./pages/layouts/Base";
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
import ComingSoon from "./pages/ComingSoon";
import Resources from "./pages/Resources";
import InfoPage from "./pages/InfoPage";


import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";


function App() {

  return (
    <Routes>
      {/* public routes for all users */}

        <Route path="" element={<Base />}>
          <Route index path="" element={<Home />} />
          <Route index path="about" element={<AboutUs />} />
          <Route index path="contact" element={<ContactUs />} />
          <Route index path="faq" element={<Faq />} />
          <Route index path="whyus" element={<WhyUs />} />
          <Route index path="team" element={<Team />} />
          <Route index path="gallery" element={<Gallery />} />
          <Route index path="event" element={<Event />} />
          <Route index path="testimonial" element={<Testimonial />} />
          <Route index path="features" element={<Features />}  />
          <Route index path="pdf" element={<PDF />} />
          <Route index path="/pdf/syllabus" element={<Syllabus />} />
          <Route index path="/pdf/pyq" element={<PYQ />} />
          <Route index path="comingsoon" element={<ComingSoon />} />
          <Route index path="resources" element={<Resources />} />
          <Route index path="infopage" element={<InfoPage />} />

          <Route index path="/auth/register" element={<Register />} />
          <Route index path="/auth/login" element={<Login />} />
          <Route index path="/auth/forgotpassword" element={<ForgotPassword />} />




        </Route>

      
    </Routes>
  );
}

export default App;