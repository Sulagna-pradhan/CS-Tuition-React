"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  faArrowRight,
  faMagnifyingGlassPlus,
  faImage,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GallerySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
    const section = document.getElementById("gallery-section");
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const galleryImages = [
    {
      src: "https://cdn.pixabay.com/photo/2025/03/15/14/21/abstract-9472319_1280.png",
      alt: "Students in classroom",
      category: "classroom",
    },
    {
      src: "https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_1280.jpg",
      alt: "Annual science fair",
      category: "events",
    },
    {
      src: "https://cdn.pixabay.com/photo/2025/02/11/21/33/kingfisher-9399869_1280.jpg",
      alt: "Group study session",
      category: "classroom",
    },
    {
      src: "https://cdn.pixabay.com/photo/2023/12/29/18/23/daisy-8476666_1280.jpg",
      alt: "Science lab experiment",
      category: "facilities",
    },
    {
      src: "https://cdn.pixabay.com/photo/2025/01/31/20/09/sunflower-9373246_1280.jpg",
      alt: "Sports day competition",
      category: "events",
    },
    {
      src: "https://cdn.pixabay.com/photo/2025/01/27/19/49/grasshopper-9363974_1280.jpg",
      alt: "School library",
      category: "facilities",
    },
    {
      src: "https://cdn.pixabay.com/photo/2024/02/24/17/37/lemons-8594421_1280.jpg",
      alt: "Interactive learning",
      category: "classroom",
    },
    {
      src: "https://cdn.pixabay.com/photo/2022/09/17/21/18/butterfly-7461850_1280.jpg",
      alt: "Graduation ceremony",
      category: "events",
    },
  ];

  const openImageModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      id="gallery-section"
      className="min-h-screen py-24 bg-gradient-to-br from-[#f2f2f2] via-[#e0e0e0] to-[#d4d4d4] text-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mb-4">
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            <span className="font-medium">Our Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Captured <span className="text-green-600">Memories</span> &
            <span className="text-orange-500"> Milestones</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore moments from our classrooms, picnic, and many more.
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <button
                  onClick={() => openImageModal(image)}
                  className="self-end bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition"
                  aria-label="Enlarge image"
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassPlus}
                    className="text-gray-800 h-5 w-5"
                  />
                </button>
                <div className="text-white mt-3">
                  <p className="text-lg font-semibold">{image.alt}</p>
                  <span className="bg-indigo-600 text-xs px-3 py-1 mt-1 inline-block rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mt-20 bg-white rounded-xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            See More
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Schedule a visit to experience our learning environment firsthand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/visit"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-md text-white font-medium shadow-md"
            >
              Book a Tour
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/virtual-tour"
              className="inline-flex items-center px-6 py-3 border border-gray-300 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 rounded-md font-medium transition-colors shadow-sm"
            >
              Take Virtual Tour
            </a>
          </div>
        </motion.div>
        */}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeImageModal}
            className="absolute top-6 right-6 text-white hover:text-indigo-300 transition"
          >
            <FontAwesomeIcon icon={faXmark} className="h-8 w-8" />
          </button>

          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col">
            <div className="relative flex-grow overflow-hidden rounded-lg">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 text-center text-white">
              <p className="text-xl font-medium">{selectedImage.alt}</p>
              <p className="text-indigo-300 mt-1">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
