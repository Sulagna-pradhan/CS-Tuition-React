'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

export default function WhyUsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    const section = document.getElementById('why-us-page')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  return (
    <main
      id="why-us-page"
      className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Discover Tools
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Discover the values and practices that make us the preferred choice for thousands of learners.
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">We're Committed to Your Growth</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you're a beginner or aiming for mastery, our unique blend of expert guidance, interactive sessions, and modern techniques will help you thrive.
            </p>

            <ul className="space-y-4 mb-8 text-gray-800">
              {[
                'Expert Mentors & Trainers',
                'Engaging & Practical Learning',
                'Guaranteed Skill Improvement',
              ].map((text, index) => (
                <li key={index} className="flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-indigo-600 mr-3" />
                  {text}
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-md text-white font-medium"
            >
              Get Started
            </a>
          </motion.div>

          {/* Image Block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-full"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-300">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/22/17/28/stack-of-books-1001655_1280.jpg"
                alt="Why Us"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="absolute bottom-6 left-6 bg-white/90 border border-indigo-600 p-4 rounded-xl shadow-lg backdrop-blur-sm max-w-[280px]">
              <h4 className="text-lg font-semibold text-gray-900">The Right Choice for You</h4>
              <p className="text-sm text-gray-700 mt-2">
                Join a community built on trust, quality, and impactful results.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
