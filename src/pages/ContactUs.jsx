import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faPaperPlane,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const ContactUsPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen overflow-hidden">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a
                href="/"
                className="text-gray-500 hover:text-indigo-600 transition-all duration-300 flex items-center"
              >
                <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <a
                href="/contact"
                className="text-indigo-700 font-semibold hover:text-indigo-900 transition-all duration-300"
                aria-current="page"
              >
                Contact Us
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow-md mb-4">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Get in Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            We'd Love to Hear From You
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Whether you have a question, feedback, or just want to say hello, feel free to reach out. Our team is here to help!
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 transition hover:shadow-lg">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="johndoe@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm"
                  required
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {[ 
                  { icon: faMapMarkerAlt, title: "Our Office", content: "123 Education Street, Knowledge City, India - 123456" },
                  { icon: faPhoneAlt, title: "Phone", content: "+91 123 456 7890\n+91 987 654 3210" },
                  { icon: faEnvelope, title: "Email", content: "support@example.com\ninfo@example.com" }
                ].map(({ icon, title, content }, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 mr-4">
                      <FontAwesomeIcon icon={icon} className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.366269835946!2d77.2270223150825!3d28.62873998242036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1632912345678!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
