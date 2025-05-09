"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function Resources() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("resources-page");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const tools = [
    {
      title: "Online C Compiler",
      description:
        "Write, compile, and run code instantly in multiple programming languages.",
      image:
        "https://cdn.pixabay.com/photo/2018/02/27/17/40/programming-3186084_640.png",
      href: "/tools/learning/c",
      buttonText: "View Now",
    },
  ];

  return (
    <main
      id="resources-page"
      className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Tools & Resources
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Explore Our Learning Tools
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Carefully curated tools to boost your productivity and learning
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Cards Grid - Updated to show 4 cards per row on large screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex"
            >
              <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full w-full border border-gray-100 hover:border-indigo-100">
                {/* Image container */}
                <div className="relative pt-[56.25%] overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://bitlearning.vercel.app/assets/image/resources/academic.webp";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow items-center text-center">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    {tool.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {tool.description}
                  </p>
                  <div className="mt-auto">
                    <a
                      href={tool.href}
                      className="inline-flex items-center justify-center text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                    >
                      {tool.buttonText}
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
