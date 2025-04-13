'use client'

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faArrowLeft,
  faCheckCircle,
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // setError('Email not found'); // Uncomment to simulate error
    }, 1500);
  };

  return (
    <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Password Recovery
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Reset Your Password</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Enter your email to receive a password reset link
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form Container */}
        <motion.div 
          className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Email Sent!</h3>
                <p className="text-gray-600">
                  We've sent password reset instructions to <span className="font-medium">{email}</span>. 
                  Please check your inbox.
                </p>
                <a
                  href="./login"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Back to Login
                </a>
              </motion.div>
            ) : (
              <>
                <a 
                  href="./login" 
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Back to login
                </a>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md"
                  >
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 mr-3" />
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your registered email"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                  Remember your password?{' '}
                  <a href="./login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login here
                  </a>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}