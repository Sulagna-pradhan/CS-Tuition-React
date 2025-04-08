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



        </Route>

      
    </Routes>
  );
}

export default App;