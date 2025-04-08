import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faDownload, faArrowRight, faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const FeaturedPapers = () => {
  const featuredPapers = [
    {
      name: "JEE Main 2024",
      category: "Engineering",
      downloads: "23.5K",
      difficulty: "Hard",
      img: "https://cdn.pixabay.com/photo/2018/10/04/07/48/omr-3723132_960_720.jpg",
    },
    {
      name: "NEET 2024",
      category: "Medical",
      downloads: "18.2K",
      difficulty: "Medium",
      img: "https://cdn.pixabay.com/photo/2018/10/04/07/48/omr-3723132_960_720.jpg",
    },
    {
      name: "CBSE Class 12 Physics",
      category: "School",
      downloads: "42.1K",
      difficulty: "Medium",
      img: "https://cdn.pixabay.com/photo/2018/10/04/07/48/omr-3723132_960_720.jpg",
    },
    {
      name: "CAT 2023",
      category: "MBA",
      downloads: "15.8K",
      difficulty: "Hard",
      img: "https://cdn.pixabay.com/photo/2018/10/04/07/48/omr-3723132_960_720.jpg",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                Exams Paper
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
             Featured Papers
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Most popular question papers downloaded by students
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPapers.map((paper, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={paper.img}
                    alt={paper.name}
                    className="h-12 w-12 rounded-lg"
                  />
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      paper.difficulty === "Hard"
                        ? "bg-red-100 text-red-800"
                        : paper.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {paper.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{paper.name}</h3>
                <p className="text-sm text-gray-600">{paper.category}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="text-gray-400 mr-1"
                    />
                    <span className="text-sm text-gray-600">
                      {paper.downloads}
                    </span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    Download{" "}
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            View All Papers{" "}
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPapers;