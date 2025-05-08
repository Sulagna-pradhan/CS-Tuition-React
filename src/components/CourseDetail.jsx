"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  faPlay,
  faClock,
  faVideo,
  faUserGraduate,
  faArrowLeft,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseDetail = ({ course }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [completedLectures, setCompletedLectures] = useState([]);

  // Load completed lectures from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`course-${course.id}-progress`);
    if (savedProgress) {
      setCompletedLectures(JSON.parse(savedProgress));
    }
  }, [course.id]);

  // Save completed lectures to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      `course-${course.id}-progress`,
      JSON.stringify(completedLectures)
    );
  }, [completedLectures, course.id]);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeVideoModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const toggleLectureComplete = (lectureId) => {
    setCompletedLectures((prev) =>
      prev.includes(lectureId)
        ? prev.filter((id) => id !== lectureId)
        : [...prev, lectureId]
    );
  };

  // Calculate progress percentage
  const progress = course.lectures
    ? Math.round((completedLectures.length / course.lectures.length) * 100)
    : 0;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Hero Section - Full viewport height */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center mt-19"
          style={{ backgroundImage: `url(${course.image})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent" />

        {/* Content */}
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center pb-10 pt-20">
          {/* Back Button */}
          <a
            href="/learn"
            className="absolute top-6 left-4 md:left-0 flex items-center text-white hover:text-indigo-300 transition-colors z-10 pt-16"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            <span>Back to Courses</span>
          </a>

          {/* Course Title and Info */}
          <div className="max-w-3xl mt-16">
            {" "}
            {/* Added mt-16 to prevent overlap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-200 mb-8">{course.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                  <FontAwesomeIcon icon={faVideo} className="mr-2" />
                  <span>{course.videos}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  <span>{course.hours}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                  <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
                  <span>{course.semester}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => openVideoModal(course.lectures[0])}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center transition-colors shadow-lg hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faPlay} className="mr-3 text-lg" />
                Start Learning
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Course progress</span>
                <span className="text-indigo-600 font-medium">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {completedLectures.length}/{course.lectures?.length || 0}{" "}
              completed
            </div>
          </div>
        </div>
      </div>

      {/* Lectures Section */}
      <main className="container mx-auto px-4 py-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Course Lectures</h2>
          <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Lecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {course.lectures.map((lecture, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              {/* Lecture Thumbnail */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${lecture.videoId}/maxresdefault.jpg`}
                  alt={lecture.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm font-medium">
                        Lecture {index + 1}
                      </span>
                      <span className="bg-black/40 text-white text-xs px-2 py-1 rounded-full">
                        {lecture.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-full opacity-90 hover:opacity-100 transition-all shadow-lg"
                  onClick={() => openVideoModal(lecture)}
                >
                  <FontAwesomeIcon icon={faPlay} className="text-xl" />
                </button>
              </div>

              {/* Lecture Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{lecture.title}</h3>
                <p className="text-gray-600 mb-5 text-sm">
                  {lecture.description}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openVideoModal(lecture)}
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all flex items-center text-sm"
                  >
                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                    Watch Now
                  </button>

                  <button
                    onClick={() => toggleLectureComplete(index)}
                    className={`flex items-center ${
                      completedLectures.includes(index)
                        ? "text-green-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className={`text-lg mr-2 ${
                        completedLectures.includes(index)
                          ? "text-green-500"
                          : "text-gray-300 hover:text-gray-400"
                      }`}
                    />
                    <span className="text-sm">
                      {completedLectures.includes(index)
                        ? "Completed"
                        : "Complete"}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl overflow-hidden relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-md transition-all"
              aria-label="Close video"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>

            {/* Video Container */}
            <div className="relative pt-[56.25%] w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-4">
                  {selectedVideo.duration}
                </span>
              </div>
              <p className="text-gray-600">{selectedVideo.description}</p>

              {/* Mark Complete Button */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    const lectureIndex = course.lectures.findIndex(
                      (l) => l.videoId === selectedVideo.videoId
                    );
                    if (lectureIndex !== -1) {
                      toggleLectureComplete(lectureIndex);
                    }
                  }}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    completedLectures.includes(
                      course.lectures.findIndex(
                        (l) => l.videoId === selectedVideo.videoId
                      )
                    )
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`mr-2 ${
                      completedLectures.includes(
                        course.lectures.findIndex(
                          (l) => l.videoId === selectedVideo.videoId
                        )
                      )
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  {completedLectures.includes(
                    course.lectures.findIndex(
                      (l) => l.videoId === selectedVideo.videoId
                    )
                  )
                    ? "Lecture Completed"
                    : "Mark as Complete"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
