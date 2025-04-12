'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPlay, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
      const parallaxElements = document.querySelectorAll('.parallax')
      parallaxElements.forEach(elem => {
        const speed = elem.getAttribute('data-speed')
        const x = (window.innerWidth - e.pageX * speed) / 100
        const y = (window.innerHeight - e.pageY * speed) / 100
        elem.style.transform = `translateX(${x}px) translateY(${y}px)`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  }

  const slideUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.3 }
  }

  const slideIn = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.6 }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, delay: 0.9 }
  }

  const float = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-20 min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Parallax circles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-900 rounded-full opacity-20 blur-3xl parallax" data-speed="2"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-indigo-900 rounded-full opacity-20 blur-3xl parallax" data-speed="3"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-purple-900 rounded-full opacity-20 blur-3xl parallax" data-speed="1.5"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          <div className="pt-4 sm:pt-6 md:pt-8 lg:pt-0">
            <motion.div {...fadeIn} className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-900 text-indigo-200">
                <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-400"></span>
                Now Enrolling For Year 2025
              </span>
            </motion.div>

            <motion.h1 {...slideUp} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 leading-tight">
              Unlock Your Learning Potential By Smart Education
            </motion.h1>

            <motion.p {...slideIn} className="text-lg text-gray-300 mb-8 max-w-lg">
              Join our community of passionate students and experienced educator. Discover our features designed to help you excel in today's competitive world.
            </motion.p>

            <motion.div {...slideIn} className="flex flex-wrap gap-4 mb-8">
              <a href="/features" className="group flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 text-white rounded-lg font-medium shadow-lg shadow-indigo-900/40 transition-all hover:shadow-xl hover:shadow-indigo-900/60">
                Explore Features
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </a>

              <a href="/about" className="flex items-center px-6 py-3 border border-gray-700 hover:border-indigo-400 text-gray-300 hover:text-indigo-300 rounded-lg font-medium transition-colors">
                <FontAwesomeIcon icon={faPlay} className="mr-2 h-5 w-5" />
                Watch Video
              </a>
            </motion.div>

            <motion.div {...scaleIn} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
              {['Certified Teachers', '100+ Courses', 'Lifetime Access'].map((text, i) => (
                <div key={i} className="flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-400 mr-2" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side Image & Floating Boxes */}
          <div className="relative hidden lg:block">
            <motion.div {...scaleIn} className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/40">
                <img 
                  src="https://cdn.pixabay.com/photo/2016/03/17/23/07/abstract-1264071_1280.png" 
                  alt="Students learning" 
                  className="w-full h-auto object-cover"
                />

                <motion.div {...float} className="absolute left-4 top-24 bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">JD</div>
                      <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">AM</div>
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">TS</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-200">500+ Students</div>
                      <div className="text-xs text-gray-400">Joined this year</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div {...float} className="absolute right-4 bottom-24 bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 mr-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-200">90% Success Rate</div>
                      <div className="text-xs text-gray-400">In final examinations</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute -bottom-5 -right-5 h-24 w-24 bg-yellow-600 rounded-full opacity-30 blur-sm z-0"></div>
              <div className="absolute -top-3 -left-3 h-16 w-16 bg-blue-600 rounded-full opacity-30 blur-sm z-0"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}