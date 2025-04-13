'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilePdf,
  faBookOpen,
  faSearch,
  faTools,
  faCheckCircle,
  faArrowRight,
  faExclamationTriangle,
  faTimes,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

export default function PDFResourcesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPopup, setShowPopup] = useState(true)
  const [canClosePopup, setCanClosePopup] = useState(false)
  const [countdown, setCountdown] = useState(6)

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

    const section = document.getElementById('pdf-resources-page')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  // Countdown timer and popup closing logic
  useEffect(() => {
    if (!showPopup) return
    
    let timer = null
    
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else {
      setCanClosePopup(true)
    }
    
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [countdown, showPopup])

  const handleClosePopup = () => {
    if (canClosePopup) {
      setShowPopup(false)
    }
  }

  const resources = [
    {
      title: "CU Exam Syllabus",
      description: "Download complete syllabus for all courses with subject-wise breakdown",
      icon: faFilePdf,
      color: "bg-indigo-600 hover:bg-indigo-500",
      href: "/pdf/syllabus"
    },
    {
      title: "CU Previous Year Questions",
      description: "Access previous 5 years question papers with solutions",
      icon: faBookOpen,
      color: "bg-blue-600 hover:bg-blue-500",
      href: "/pdf/pyq"
    },
    {
      title: "Digital Library",
      description: "Browse our collection of 1000+ academic books and research papers",
      icon: faSearch,
      color: "bg-purple-600 hover:bg-purple-500",
      href: "/comingsoon"
    },
    {
      title: "PDF Tools",
      description: "Merge, split, compress PDFs and other useful utilities",
      icon: faTools,
      color: "bg-teal-600 hover:bg-teal-500",
      href: "/comingsoon"
    }
  ]

  return (
    <main
      id="pdf-resources-page"
      className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900 relative"
    >
      {/* Popup Notice */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={handleClosePopup}
            ></div>
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative z-10"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Important Notice</h3>
                </div>
                <button 
                  onClick={handleClosePopup}
                  className={`text-gray-400 ${canClosePopup ? 'hover:text-gray-600' : 'cursor-not-allowed opacity-50'} transition-colors`}
                  disabled={!canClosePopup}
                >
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                </button>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-1 mb-6">
                <p className="text-gray-700 leading-relaxed">
                We are currently providing PDF resources — including exam syllabus and previous year question papers — for <span className="font-semibold">only undergraduate students of the Department of Computer Science, Calcutta University</span>. However, you can still explore our Digital Library & PDF Tools for more study materials.
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                {!canClosePopup ? (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                    <span>You can close in {countdown} seconds</span>
                  </div>
                ) : (
                  <div></div>
                )}
                
                <button
                  onClick={handleClosePopup}
                  className={`px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    canClosePopup 
                      ? 'hover:bg-indigo-500' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!canClosePopup}
                >
                  <span>Got it</span>
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            PDF Resources
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Academic Resources Center</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Access all essential study materials in one convenient location.
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <a
                href={resource.href}
                className={`block h-full p-6 rounded-2xl shadow-xl ${resource.color} text-white transition-all transform hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div className="flex flex-col items-center text-center h-full space-y-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm shadow-md">
                    <FontAwesomeIcon icon={resource.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold">{resource.title}</h3>
                  <p className="text-white/90 text-sm">{resource.description}</p>
                  <div className="mt-auto flex items-center gap-2 text-sm font-medium">
                    <span>Explore now</span>
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            <span>New resources added weekly - Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}