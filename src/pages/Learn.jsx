"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  faSearch,
  faPlayCircle,
  faCalendarAlt,
  faUserGraduate,
  faBookOpen,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const courses = [
  {
    id: 1,
    title: "Number System",
    description:
      "Introduction basic of number system in computer science and application. Here we are discuss two types of number system",
    image: "https://img.youtube.com/vi/d1jKlVFiSTQ/maxresdefault.jpg",
    videos: "9 Videos",
    semester: "Semester 1",
    hours: "2 Hours",
    category: "Computer Architecture",
    progress: 0,
    href: "/course/programming",
  },
  {
    id: 2,
    title: "Operating System",
    description:
      "Here we are introducing new playlist operating system in this seris we are going to discuss the entire syllabus of operating system",
    image: "https://img.youtube.com/vi/2p-jIkKscq8/maxresdefault.jpg",
    videos: "3 Videos",
    semester: "Semester 4",
    hours: "40 minutes",
    category: "Computer Science",
    progress: 0,
    href: "/course/dsa",
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    description:
      "Build responsive websites using HTML, CSS, and JavaScript. Get hands-on with modern web technologies.",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    videos: "18 Videos",
    semester: "Semester 1",
    hours: "30 Hours",
    category: "Web Development",
    progress: 0,
    href: "/course/web-development",
  },
  {
    id: 4,
    title: "Database Management Systems",
    description:
      "Learn to design and implement efficient databases using SQL and NoSQL technologies.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    videos: "26 Videos",
    semester: "Semester 3",
    hours: "45 Hours",
    category: "Database",
    progress: 0,
    href: "/course/database",
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    description:
      "Introduction to machine learning concepts and algorithms with practical Python implementations.",
    image:
      "https://images.unsplash.com/photo-1504639725599-04d0679d14a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    videos: "36 Videos",
    semester: "Semester 4",
    hours: "60 Hours",
    category: "AI/ML",
    progress: 0,
    href: "/course/machine-learning",
  },
  {
    id: 6,
    title: "Mobile App Development",
    description:
      "Build cross-platform mobile applications using React Native framework.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    videos: "30 Videos",
    semester: "Semester 3",
    hours: "50 Hours",
    category: "Mobile Development",
    progress: 0,
    href: "/course/mobile-development",
  },
];

const semesters = [
  "All Semesters",
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
];

const categories = [
  "All Categories",
  "Computer Architecture",
  "Web Development",
  "Computer Science",
  "Database",
  "AI/ML",
  "Mobile Development",
];

export default function LearningPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All Semesters");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester =
      selectedSemester === "All Semesters" ||
      course.semester === selectedSemester;
    const matchesCategory =
      selectedCategory === "All Categories" ||
      course.category === selectedCategory;

    return matchesSearch && matchesSemester && matchesCategory;
  });

  return (
    <section className="min-h-screen py-24 bg-gradient-to-br from-[#f2f2f2] via-[#e0e0e0] to-[#d4d4d4] text-gray-900">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 px-6 py-2 rounded-full mb-6 shadow-lg"
          >
            <FontAwesomeIcon icon={faBookOpen} className="mr-3 w-5 h-5" />
            <span className="font-medium text-lg">Explore Our Courses</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Start <span className="text-blue-600">Learning</span> With{" "}
            <span className="text-green-600">Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Discover comprehensive courses designed to unlock your potential and
            accelerate your growth.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-24 h-1.5 bg-indigo-600 mx-auto mt-6 rounded-full"
          ></motion.div>
        </div>

        {/* Search and Filter Section - Now directly on the page background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-indigo-500 text-lg"
                />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-gray-700 placeholder-gray-400 transition-all shadow-lg"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Semester Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-indigo-500 text-lg"
                />
              </div>
              <select
                className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-gray-700 appearance-none transition-all shadow-lg"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="text-indigo-500 text-lg"
                />
              </div>
              <select
                className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-gray-700 appearance-none transition-all shadow-lg"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100"
              >
                {/* Course Image */}
                <div className="relative h-56 w-full group overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="inline-block bg-indigo-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-5">{course.description}</p>

                  {/* Course Meta */}
                  <div className="mt-auto pt-5 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex flex-col items-center">
                        <FontAwesomeIcon
                          icon={faVideo}
                          className="mb-1 text-indigo-600 w-5 h-5"
                        />
                        <span className="text-center font-medium">
                          {course.videos}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="mb-1 text-indigo-600 w-5 h-5"
                        />
                        <span className="text-center font-medium">
                          {course.semester}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <FontAwesomeIcon
                          icon={faPlayCircle}
                          className="mb-1 text-indigo-600 w-5 h-5"
                        />
                        <span className="text-center font-medium">
                          {course.hours}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <a href={course.href} className="block">
                    <button className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-medium">
                      Start Learning
                    </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-xl"
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-indigo-600 text-2xl"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSemester("All Semesters");
                  setSelectedCategory("All Categories");
                }}
                className="px-6 py-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors duration-300 font-medium"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
