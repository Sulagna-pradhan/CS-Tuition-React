'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLightbulb,
  faRocket,
  faTools,
  faLaptopCode,
  faUserCheck,
  faBook,
  faGlobe,
  faBrain
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

export default function InfoPage() {
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

    const section = document.getElementById('info-page')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  const features = [
    {
      icon: faTools,
      title: 'Productivity Tools',
      description: 'Access sticky notes, to-do lists, and QR generators for better efficiency.',
      href: '/tools/productivity'
    },
    {
      icon: faBook,
      title: 'Learning Resources',
      description: 'Digital library, study planners, and syllabus materials.',
      href: '/tools/learning'
    },
    {
      icon: faLaptopCode,
      title: 'Development Tools',
      description: 'Tools for web developers to streamline their projects.',
      href: '/tools/development'
    },
    {
      icon: faGlobe,
      title: 'Entertainment & Media',
      description: 'Music player, media tools, and more for relaxation.',
      href: '/tools/entertainment'
    }
  ]

  const domains = [
    {
      icon: faBrain,
      title: 'AI / ML',
      href: '/domains/ai-ml'
    },
    {
      icon: faLaptopCode,
      title: 'Web Software',
      href: '/domains/web-software'
    },
    {
      icon: faBook,
      title: 'Doc Site',
      href: '/domains/doc-site'
    },
    {
      icon: faGlobe,
      title: 'API',
      href: '/domains/api'
    },
    {
      icon: faLightbulb,
      title: 'Physics Simulation',
      href: '/domains/physics-simulation'
    },
    {
      icon: faTools,
      title: 'Utility Tools',
      href: '/domains/utility-tools'
    }
  ]

  return (
    <main
      id="info-page"
      className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              Info Center
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Aim & Vision</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">
              We aim to empower students and developers by providing seamless access to powerful tools and
              academic resources—all in one place.
            </p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </motion.div>
        </div>

        {/* Features */}
        <section className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl font-semibold text-center mb-10"
          >
            Key Features
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.a
                key={feature.title}
                href={feature.href}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition block hover:bg-indigo-50"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <FontAwesomeIcon icon={feature.icon} className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Research Domains */}
        <section className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl font-semibold text-center mb-10"
          >
            Our Core Research Domains
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain, index) => (
              <motion.a
                key={domain.title}
                href={domain.href}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-xl transition block hover:bg-indigo-50"
              >
                <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <FontAwesomeIcon icon={domain.icon} className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg">{domain.title}</h4>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Registration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6">Join our community and start exploring the tools built for you!</p>
          <a
            href="/auth/signup"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-full shadow hover:bg-indigo-700 transition"
          >
            <FontAwesomeIcon icon={faUserCheck} className="mr-2" />
            Register Now
          </a>
        </motion.div>
      </div>
    </main>
  )
}
