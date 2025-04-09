import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Toaster } from "react-hot-toast";

function Base() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default Base;