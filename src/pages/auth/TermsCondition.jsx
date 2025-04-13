'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faArrowLeft,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
            Legal Documentation
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Terms & Conditions</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Last updated: {new Date().toLocaleDateString()}
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
              href="./register" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to registration
            </a>

            <div className="prose max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h3>
              <p className="mb-6">
                By accessing or using our student portal, you agree to be bound by these Terms. 
                If you disagree with any part, you may not access the service.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. User Responsibilities</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Use the service only for lawful purposes</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Academic Integrity</h3>
              <p className="mb-6">
                All users must adhere to institutional academic integrity policies. 
                Any form of plagiarism or cheating will result in immediate account termination.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Data Privacy</h3>
              <p className="mb-6">
                We collect personal data to provide and improve our services. 
                Your information is protected under our Privacy Policy and will never be sold to third parties.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">5. Service Modifications</h3>
              <p className="mb-6">
                We reserve the right to modify or discontinue the service with or without notice. 
                We shall not be liable for any modification, suspension, or discontinuance.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      By registering, you acknowledge that you have read, understood, 
                      and agree to be bound by these Terms and Conditions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <a
                  href="./register"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  I Understand - Continue Registration
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}