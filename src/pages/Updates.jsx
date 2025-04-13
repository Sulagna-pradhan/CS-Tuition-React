'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faBell,
  faCheckCircle,
  faClock,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function UpdateNotifications() {
  const updates = {
    current: [
      {
        title: "Enhanced Dashboard",
        description: "New analytics widgets with semester-wise performance tracking",
        date: "Released June 2023"
      },
      {
        title: "Mobile Notifications",
        description: "Get instant alerts for new grades, assignments, and announcements",
        date: "Released May 2023"
      },
      {
        title: "Document Upload",
        description: "Submit assignments directly through the portal with auto-formatting",
        date: "Released April 2023"
      }
    ],
    upcoming: [
      {
        title: "AI Study Assistant",
        description: "Coming soon - Personalized learning recommendations and quiz generator",
        eta: "Q3 2023"
      },
      {
        title: "Collaboration Spaces",
        description: "Virtual study rooms with real-time document editing (in development)",
        eta: "Q4 2023"
      },
      {
        title: "Skill Badges",
        description: "Earn verifiable credentials for extracurricular achievements",
        eta: "Early 2024"
      }
    ]
  };

  return (
    <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Platform Updates
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">What's New</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Discover recent improvements and coming soon features
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Container */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8">
            <a 
              href="/" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Home
            </a>

            {/* Current Features Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Recently Launched</h3>
              </div>

              <div className="space-y-6">
                {updates.current.map((update, index) => (
                  <motion.div 
                    key={`current-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
                        <FontAwesomeIcon icon={faRocket} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{update.title}</h4>
                        <p className="text-gray-600 mt-1">{update.description}</p>
                        <div className="mt-3 text-sm text-gray-500">
                          {update.date}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Features Section */}
            <div>
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <FontAwesomeIcon icon={faClock} className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Coming Soon</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {updates.upcoming.map((update, index) => (
                  <motion.div
                    key={`upcoming-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 text-indigo-400 flex items-center justify-center mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{update.title}</h4>
                        <p className="text-gray-600 mt-1">{update.description}</p>
                        <div className="mt-3 text-sm text-indigo-600 font-medium">
                          Estimated: {update.eta}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Feedback CTA */}
            <div className="mt-12 bg-indigo-50 rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-indigo-800 mb-2">Have suggestions?</h4>
              <p className="text-gray-600 mb-4">We'd love to hear what features you'd like to see next!</p>
              <a
                href="/feedback"
                className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Share Your Ideas
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}