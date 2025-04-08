import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import {
  faRocket,
  faAtom,
  faStethoscope,
  faLaptopCode,
  faChartLine,
  faLandmark,
  faUniversity,
  faGraduationCap,
  faBookOpen,
  faBook,
  faSchool,
  faBuildingColumns,
  faUserGraduate,
  faPencilAlt,
  faChalkboardTeacher,
  faChalkboard,
  faBuilding,
  faGlobe,
  faSearch,
  faArrowRight,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const ExamCategories = () => {
  const examCategories = {
    competitive: [
      { name: "JEE Main", count: 10, icon: faRocket },
      { name: "JEE Advanced", count: 8, icon: faAtom },
      { name: "NEET", count: 12, icon: faStethoscope },
      { name: "GATE", count: 15, icon: faLaptopCode },
      { name: "CAT", count: 7, icon: faChartLine },
      { name: "UPSC", count: 9, icon: faLandmark },
    ],
    university: [
      { name: "Delhi University", count: 14, icon: faUniversity },
      { name: "IIT Bombay", count: 6, icon: faGraduationCap },
      { name: "Anna University", count: 11, icon: faBookOpen },
      { name: "VTU", count: 9, icon: faBook },
      { name: "Mumbai University", count: 8, icon: faSchool },
      { name: "JNTUH", count: 7, icon: faBuildingColumns },
    ],
    school: [
      { name: "CBSE Class 12", count: 20, icon: faUserGraduate },
      { name: "CBSE Class 10", count: 18, icon: faPencilAlt },
      { name: "ICSE Class 12", count: 15, icon: faChalkboardTeacher },
      { name: "ICSE Class 10", count: 16, icon: faChalkboard },
      { name: "State Boards", count: 22, icon: faBuilding },
      { name: "International Boards", count: 8, icon: faGlobe },
    ],
  };

  const [activeTab, setActiveTab] = React.useState("competitive");
  const [searchQuery, setSearchQuery] = React.useState("");

  const getFilteredExams = () => {
    if (!searchQuery) return examCategories[activeTab];
    return examCategories[activeTab].filter((exam) =>
      exam.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              Exams Paper
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Explore Top Exams
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Comprehensive collection of previous year questions for all major exams
          </p>
        </div>

        <div className="mt-8">
          <div className="flex justify-center border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("competitive")}
                className={`border-b-2 py-4 px-1 font-medium text-sm sm:text-base ${
                  activeTab === "competitive"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Competitive Exams
              </button>
              <button
                onClick={() => setActiveTab("university")}
                className={`border-b-2 py-4 px-1 font-medium text-sm sm:text-base ${
                  activeTab === "university"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                University Exams
              </button>
              <button
                onClick={() => setActiveTab("school")}
                className={`border-b-2 py-4 px-1 font-medium text-sm sm:text-base ${
                  activeTab === "school"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                School Exams
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-4 relative max-w-xs mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exams..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredExams().map((exam, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 rounded-lg p-6 flex items-start transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="bg-indigo-100 rounded-lg p-3 mr-4">
                      <FontAwesomeIcon
                        icon={exam.icon}
                        className="text-indigo-600 text-xl"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exam.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exam.count} years of papers available
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        View papers{" "}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="ml-1 text-xs"
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Browse all{" "}
                  {activeTab === "competitive"
                    ? "Competitive"
                    : activeTab === "university"
                    ? "University"
                    : "School"}{" "}
                  Exams
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamCategories;