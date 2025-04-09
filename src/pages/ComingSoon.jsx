'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-gray-900 px-6 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            🚀 Something Awesome is Coming Soon
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            We're working on a new experience just for you. Stay tuned and be the first to know!
          </p>
        </div>

        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <div className="flex items-center bg-white/10 rounded-lg overflow-hidden w-full">
            <span className="px-3 text-indigo-300">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-3 py-2 w-full placeholder-gray-300 text-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition-all duration-300 text-white font-medium"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            Notify Me
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-8">
          We respect your inbox. No spam, ever.
        </p>
      </motion.div>
    </div>
  )
}
