'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap,
  faFileLines,
  faWandMagicSparkles,
  faCalendarDays,
  faUsers,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Information',
    icon: faGraduationCap,
    description: 'All essential academic and institutional info in one place.',
    link: '/infopage',
  },
  {
    title: 'PDF Assets',
    icon: faFileLines,
    description: 'Download study materials, guides, and important documents.',
    link: '/pdf',
  },
  {
    title: 'Resources & Features',
    icon: faWandMagicSparkles,
    description: 'Explore tools and digital features to enhance learning.',
    link: '/resources',
  },
  {
    title: 'Events',
    icon: faCalendarDays,
    description: 'Stay updated with upcoming seminars, workshops & fests.',
    link: '/event',
  },
  {
    title: 'Students Club',
    icon: faUsers,
    description: 'Join clubs, showcase talents, and collaborate with peers.',
    link: '#',
  },
  {
    title: 'Ex-Students Network',
    icon: faShareNodes,
    description: 'Reconnect with alumni and grow your professional network.',
    link: '#',
  },
]

export default function FeaturesSection() {
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

    const section = document.getElementById('features-section')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section
      id="features-section"
      className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 font-medium shadow mb-4">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-2" />
            Discover Tools
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Explore Our Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A powerful suite of tools, services, and networks to support every student’s journey.
          </p>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
        >
          {features.map((feature, index) => (
            <motion.a
              href={feature.link}
              key={index}
              className="block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-indigo-800/30 transition-all duration-300 group hover:bg-gray-800 text-center flex flex-col items-center"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-indigo-600/10 border border-indigo-600 rounded-full mb-4">
                <FontAwesomeIcon icon={feature.icon} className="text-indigo-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
