"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faArrowRight,
  faClock,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EventsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("events-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const events = [
    {
      id: 1,
      title: "Annual Science Fair",
      date: "2023-11-15",
      time: "10:00 AM - 3:00 PM",
      location: "Main Campus Auditorium",
      description:
        "Showcase of student science projects with special guest judges from local universities.",
      category: "academic",
      image: "/events/science-fair.jpg",
      price: "Free",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      date: "2023-11-20",
      time: "4:00 PM - 7:00 PM",
      location: "School Classrooms",
      description:
        "Opportunity to discuss your child's progress with their teachers.",
      category: "academic",
      image: "/events/parent-teacher.jpg",
      price: "Free",
    },
    {
      id: 3,
      title: "Music & Arts Festival",
      date: "2023-12-05",
      time: "6:00 PM - 9:00 PM",
      location: "School Grounds",
      description:
        "An evening celebrating our students' musical and artistic talents.",
      category: "cultural",
      image: "/events/arts-festival.jpg",
      price: "$5",
    },
  ];
  const filteredEvents =
    activeFilter === "all"
      ? events
      : events.filter((event) => event.category === activeFilter);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section
      id="events-section"
      className="min-h-screen py-24 bg-gradient-to-br from-[#f2f2f2] via-[#e0e0e0] to-[#d4d4d4] text-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mb-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            <span className="font-medium">Upcoming Events</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our Exciting Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover upcoming academic, cultural, and sports activities at
            Bright Minds.
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {["all", "academic", "cultural", "sports", "workshop"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={fadeItem}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-medium text-gray-800">
                    {event.price}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <div className="flex items-center text-indigo-600 mb-2">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="h-4 w-4 mr-2"
                  />
                  <span className="text-sm font-medium">
                    {formatDate(event.date)}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="h-4 w-4 mr-2 text-gray-500"
                    />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="h-4 w-4 mr-2 text-gray-500"
                    />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <a
                  href={`/events/${event.id}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-medium transition-colors"
                >
                  Register Now
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-2 h-4 w-4"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Events Fallback */}
        {filteredEvents.length === 0 && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-6">
              No events found in this category. Check back later!
            </p>
          </motion.div>
        )}

        {/* CTA */}
        {/*
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mt-20 bg-white rounded-xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Host Your Event With Us
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our facilities are available for educational and community events.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/facilities"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-md text-white font-medium shadow-md"
            >
              View Facilities
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-300 bg-white hover:border-indigo-500 text-gray-700 hover:text-indigo-600 rounded-md font-medium transition-colors shadow-sm"
            >
              <FontAwesomeIcon icon={faTicketAlt} className="mr-2 h-5 w-5" />
              Enquire Now
            </a>
          </div>
        </motion.div>
        */}
      </div>
    </section>
  );
}
