import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faUsers,
  faLightbulb,
  faChartLine,
  faGraduationCap,
  faCheckCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import AboutSection from "../components/AboutSection";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a
                href="/"
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <a
                href="/about"
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 cursor-pointer"
                aria-current="page"
              >
                About Us
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* About Us Section */}
      <AboutSection />

      {/* Testimonials Section */}
      <Testimonials />
      
    </div>
  );
};

export default AboutUsPage;