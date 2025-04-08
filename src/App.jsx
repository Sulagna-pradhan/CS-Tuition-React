import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Base from "./pages/layouts/Base";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import CareerWithUs from "./pages/Career_With_Us";
import Faq from "./pages/Faq";

import BrowseExam from "./pages/BrowseExam";


function App() {

  return (
    <Routes>
      {/* public routes for all users */}

        <Route path="" element={<Base />}>
          <Route index path="" element={<Home />} />
          <Route index path="about" element={<AboutUs />} />
          <Route index path="contact" element={<ContactUs />} />
          <Route index path="careerwithus" element={<CareerWithUs />} />
          <Route index path="faq" element={<Faq />} />
          <Route index path="browseexam" element={<BrowseExam />} />

        </Route>

      
    </Routes>
  );
}

export default App;