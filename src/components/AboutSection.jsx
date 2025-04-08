'use client'

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUserTie, } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

export default function AboutSection() {
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

    const section = document.getElementById('about-section')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  const animationProps = {
    initial: { opacity: 0, y: 40 },
    animate: isVisible ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
  }

  return (
    <section
      id="about-section"
      className="min-h-screen pt-16 pb-24 bg-gradient-to-br from-[#f2f2f2] via-[#e0e0e0] to-[#d4d4d4] text-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow-md mb-4">
          <FontAwesomeIcon icon={faUserTie} className="mr-2" />
            Empowering Minds
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            About Us
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Get to know our journey, values, and how we're shaping the future of education.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div {...animationProps}>
            <h3 className="text-3xl font-semibold mb-4 text-gray-900">
              Empowering Students Since 2010
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Bright Minds Tuition, we believe education is more than just books —
              it's about confidence, character, and future-readiness. With expert educators
              and tailored guidance, we help every student unlock their full potential.
            </p>

            <ul className="space-y-4 mb-8 text-gray-800">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                15+ Years of Excellence
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                5000+ Students Empowered
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                Personalized Coaching & Mentorship
              </li>
            </ul>

            <a
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-5 w-5" />
            </a>
          </motion.div>

          {/* Image with Info Card */}
          <motion.div {...animationProps} className="relative w-full">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-300 transition hover:shadow-lg">
              <img
                src="https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_960_720.jpg"
                alt="Our Institute"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="absolute bottom-6 left-6 bg-white/90 border border-indigo-600 p-4 rounded-xl shadow-lg backdrop-blur-sm max-w-[280px]">
              <h4 className="text-lg font-semibold text-gray-900">
                Why Students Trust Us?
              </h4>
              <p className="text-sm text-gray-700 mt-2">
                Because we care, mentor, and deliver results. Our success rate speaks volumes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
