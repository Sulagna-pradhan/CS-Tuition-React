'use client'

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentAlt,
  faPaperPlane,
  faCheckCircle,
  faLightbulb,
  faBug,
  faStar,
  faArrowLeft,
  faSmile,
  faFrown,
  faMeh
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('experience'); // Changed default to experience
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [experienceRating, setExperienceRating] = useState(null);
  const [experienceComment, setExperienceComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setMessage('');
      setExperienceRating(null);
      setExperienceComment('');
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                Your feedback has been received. We appreciate you helping us improve.
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faCommentAlt} className="mr-2" />
            Share Your Thoughts
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">We Value Your Feedback</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Help us improve your experience with our platform
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Feedback Form Container */}
        <motion.div 
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Feedback Type Selector - Experience moved to first position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Feedback Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'experience', icon: faCommentAlt, label: 'Your Experience' },
                    { value: 'suggestion', icon: faLightbulb, label: 'Suggestion' },
                    { value: 'bug', icon: faBug, label: 'Bug Report' },
                    { value: 'feature', icon: faStar, label: 'Feature' }
                  ].map((type) => (
                    <motion.button
                      key={type.value}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                        feedbackType === type.value
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => setFeedbackType(type.value)}
                    >
                      <FontAwesomeIcon 
                        icon={type.icon} 
                        className={`h-5 w-5 mb-1 ${
                          feedbackType === type.value ? 'text-indigo-600' : 'text-gray-500'
                        }`} 
                      />
                      <span className="text-xs md:text-sm font-medium">{type.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Experience Rating (now shown by default) */}
              {feedbackType === 'experience' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How would you rate your overall experience?
                    </label>
                    <div className="flex justify-center space-x-4">
                      {[
                        { value: 'poor', icon: faFrown, label: 'Poor', color: 'text-red-500' },
                        { value: 'average', icon: faMeh, label: 'Average', color: 'text-yellow-500' },
                        { value: 'good', icon: faSmile, label: 'Good', color: 'text-green-500' }
                      ].map((rating) => (
                        <motion.button
                          key={rating.value}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex flex-col items-center p-3 rounded-full ${
                            experienceRating === rating.value
                              ? 'bg-gray-100'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setExperienceRating(rating.value)}
                        >
                          <FontAwesomeIcon 
                            icon={rating.icon} 
                            className={`h-8 w-8 ${rating.color} ${
                              experienceRating === rating.value ? 'opacity-100' : 'opacity-60'
                            }`} 
                          />
                          <span className="text-xs mt-1 text-gray-600">{rating.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="experience-comment" className="block text-sm font-medium text-gray-700 mb-1">
                      Any additional comments? (optional)
                    </label>
                    <textarea
                      id="experience-comment"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="What did you like or dislike about your experience?"
                      value={experienceComment}
                      onChange={(e) => setExperienceComment(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Message Field (shown for other feedback types) */}
              {feedbackType !== 'experience' && (
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your {feedbackType === 'suggestion' ? 'suggestion' : feedbackType === 'bug' ? 'bug report' : 'feature idea'}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={`Tell us about your ${
                      feedbackType === 'suggestion' ? 'suggestion...' : 
                      feedbackType === 'bug' ? 'bug (please include steps to reproduce)...' : 
                      'feature request...'
                    }`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Optional Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email (optional - if you'd like a response)
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || (feedbackType !== 'experience' && !message)}
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${
                    isSubmitting || (feedbackType !== 'experience' && !message) ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Submit Feedback
                      <FontAwesomeIcon icon={faPaperPlane} className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">How we use your feedback:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Your experience ratings help us measure satisfaction</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>All suggestions are reviewed weekly by our team</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Bug reports are prioritized based on severity</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Popular feature requests may appear in future updates</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}