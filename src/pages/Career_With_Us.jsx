import React from "react";
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

const CareersPage = () => {
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
                href="/careers"
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 cursor-pointer"
                aria-current="page"
              >
                Careers
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Join Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Build the Future of Education with Us
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            We're on a mission to make quality education accessible to everyone. If you're passionate about innovation and making a difference, we'd love to have you on board.
          </p>
        </div>
      </div>

      {/* Job Openings Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Current Job Openings
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Explore our available positions and find the perfect fit for your skills and aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Software Engineer",
                type: "Full-time",
                location: "Remote",
                description: "We're looking for a talented software engineer to help us build and scale our platform.",
              },
              {
                title: "Content Writer",
                type: "Part-time",
                location: "Hybrid",
                description: "Join our content team to create engaging and educational materials for students.",
              },
              {
                title: "Product Manager",
                type: "Full-time",
                location: "On-site",
                description: "Lead the development of new features and ensure our product meets user needs.",
              },
              {
                title: "UX/UI Designer",
                type: "Contract",
                location: "Remote",
                description: "Design intuitive and user-friendly interfaces for our platform.",
              },
              {
                title: "Data Analyst",
                type: "Full-time",
                location: "On-site",
                description: "Analyze user data to provide insights and drive decision-making.",
              },
              {
                title: "Customer Support Specialist",
                type: "Full-time",
                location: "Remote",
                description: "Help our users get the most out of our platform with exceptional support.",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{job.description}</p>
                  <a
                    href="#apply"
                    className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Apply Now
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-indigo-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Work With Us?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              We offer a supportive and innovative environment where you can grow and thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: faUsers,
                title: "Collaborative Culture",
                description: "Work with a team of passionate and talented individuals.",
              },
              {
                icon: faLightbulb,
                title: "Innovative Projects",
                description: "Be part of cutting-edge projects that make a real impact.",
              },
              {
                icon: faChartLine,
                title: "Career Growth",
                description: "We invest in your development and help you achieve your goals.",
              },
              {
                icon: faCheckCircle,
                title: "Work-Life Balance",
                description: "Enjoy flexible hours and remote work options.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={benefit.icon} className="text-indigo-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;