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

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              From Students, For Students
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We started as a small group of engineering students who struggled to find organized and verified previous year question papers. What began as a small collection for ourselves quickly grew into a mission to help students across India.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Today, our platform houses over 50,000 verified question papers covering all major competitive exams, university tests, and school board examinations. Our team of education experts ensures that every paper is authentic, properly categorized, and includes solutions where possible.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50K+", label: "Verified Papers" },
                { value: "300+", label: "Exams Covered" },
                { value: "5M+", label: "Students Helped" },
                { value: "98%", label: "Accuracy Rate" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                >
                  <div className="text-4xl font-bold text-indigo-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in-up">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_960_720.jpg"
                alt="Our team working together"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating Element */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-xl p-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300 w-64">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600 mr-3">
                  <FontAwesomeIcon icon={faLightbulb} />
                </div>
                <h3 className="font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-sm text-gray-600">
                To make quality education accessible to every student in India regardless of their location or background.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-indigo-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Our Core Values
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              What Drives Us Every Day
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: faCheckCircle,
                color: "red",
                title: "Quality Assurance",
                description:
                  "Every question paper undergoes rigorous verification for authenticity and accuracy before being added to our platform.",
              },
              {
                icon: faGraduationCap,
                color: "yellow",
                title: "Student-Centered",
                description:
                  "We design every feature with students in mind, ensuring our platform is intuitive, accessible, and truly helpful.",
              },
              {
                icon: faChartLine,
                color: "green",
                title: "Continuous Improvement",
                description:
                  "We constantly update our question bank and enhance platform features based on student feedback and educational trends.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <div className={`h-2 bg-${value.color}-500`}></div>
                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-${value.color}-100 flex items-center justify-center mb-4`}
                  >
                    <FontAwesomeIcon
                      icon={value.icon}
                      className={`text-${value.color}-500 text-xl`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Meet the Experts Behind Our Platform
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Our diverse team combines educational expertise with technical excellence to create the best exam preparation platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Rajesh Kumar",
              position: "Founder & CEO",
              image: "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_640.jpg",
            },
            {
              name: "Priya Sharma",
              position: "Education Director",
              image: "https://cdn.pixabay.com/photo/2018/04/06/19/39/woman-3296954_640.jpg",
            },
            {
              name: "Amit Patel",
              position: "CTO",
              image: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_640.jpg",
            },
            {
              name: "Sneha Singh",
              position: "Content Manager",
              image: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_640.jpg",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                <p className="text-indigo-600">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Ace Your Exams?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-indigo-100 mb-8">
              Join thousands of students who are already benefiting from our comprehensive question paper repository.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg hover:from-yellow-500 hover:to-yellow-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </a>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            fill="#f9fafb"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />
      
      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default AboutUsPage;