import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faBriefcase,
  faUserTie,
  faMapMarkerAlt,
  faPencilRuler,
} from "@fortawesome/free-solid-svg-icons";

const BrowseExamsPage = () => {
  const examCategories = {
    competitive: {
      engineering: [
        { name: "JEE Main – Joint Entrance Examination (for NITs, IIITs, CFTIs)", count: 10, icon: faRocket },
        { name: "JEE Advanced – For admission to IITs", count: 8, icon: faAtom },
        { name: "BITSAT – BITS Pilani Admission Test", count: 12, icon: faUniversity },
        { name: "VITEEE – VIT Engineering Entrance Exam", count: 9, icon: faBuildingColumns },
        { name: "SRMJEEE – SRM University Engineering Entrance", count: 7, icon: faSchool },
        { name: "WBJEE – West Bengal Joint Entrance Examination", count: 11, icon: faMapMarkerAlt },
        { name: "COMEDK UGET – Karnataka Engineering Entrance", count: 10, icon: faBook },
        { name: "KIITEE – KIIT Engineering Entrance Exam", count: 6, icon: faGraduationCap },
        { name: "AMUEEE – Aligarh Muslim University Engineering Entrance", count: 5, icon: faUniversity },
        { name: "NATA – National Aptitude Test in Architecture", count: 8, icon: faPencilRuler },
      ],
      medical: [
        { name: "NEET", count: 12, icon: faStethoscope },
        { name: "AIIMS", count: 7, icon: faStethoscope },
      ],
      law: [
        { name: "CLAT", count: 5, icon: faLandmark },
        { name: "AILET", count: 4, icon: faLandmark },
      ],
      management: [
        { name: "CAT", count: 7, icon: faChartLine },
        { name: "XAT", count: 6, icon: faChartLine },
      ],
      civilServices: [
        { name: "UPSC Civil Services", count: 9, icon: faLandmark },
        { name: "State PSC Exams", count: 8, icon: faLandmark },
      ],
      defence: [
        { name: "NDA", count: 6, icon: faBuilding },
        { name: "CDS", count: 5, icon: faBuilding },
      ],
      teaching: [
        { name: "CTET", count: 10, icon: faChalkboardTeacher },
        { name: "UGC NET", count: 8, icon: faChalkboardTeacher },
      ],
      others: [
        { name: "NATA", count: 5, icon: faPencilAlt },
        { name: "NID", count: 4, icon: faPencilAlt },
      ],
    },
    govt: {
      civilServices: [
        { name: "UPSC Civil Services", count: 15, icon: faLandmark },
        { name: "State PSC Exams", count: 12, icon: faLandmark },
      ],
      banking: [
        { name: "IBPS PO", count: 8, icon: faUserTie },
        { name: "SBI PO", count: 7, icon: faUserTie },
      ],
      railways: [
        { name: "RRB NTPC", count: 12, icon: faBuilding },
        { name: "RRB Group D", count: 10, icon: faBuilding },
      ],
      defence: [
        { name: "NDA", count: 6, icon: faBuilding },
        { name: "CDS", count: 5, icon: faBuilding },
      ],
      ssc: [
        { name: "SSC CGL", count: 10, icon: faBriefcase },
        { name: "SSC CHSL", count: 7, icon: faBriefcase },
      ],
      police: [
        { name: "UP Police", count: 8, icon: faUserTie },
        { name: "Delhi Police", count: 6, icon: faUserTie },
      ],
      teaching: [
        { name: "CTET", count: 10, icon: faChalkboardTeacher },
        { name: "UGC NET", count: 8, icon: faChalkboardTeacher },
      ],
      psu: [
        { name: "ONGC", count: 5, icon: faBuilding },
        { name: "BHEL", count: 4, icon: faBuilding },
      ],
      insurance: [
        { name: "LIC AAO", count: 6, icon: faUserTie },
        { name: "NIACL AO", count: 5, icon: faUserTie },
      ],
    },
    university: {
      north: [
        { name: "Delhi University", count: 14, icon: faUniversity },
        { name: "Punjab University", count: 8, icon: faUniversity },
      ],
      south: [
        { name: "Anna University", count: 11, icon: faBookOpen },
        { name: "University of Madras", count: 9, icon: faBookOpen },
      ],
      west: [
        { name: "Mumbai University", count: 8, icon: faSchool },
        { name: "University of Pune", count: 7, icon: faSchool },
      ],
      east: [
        { name: "University of Calcutta", count: 10, icon: faBuildingColumns },
        { name: "Jadavpur University", count: 8, icon: faBuildingColumns },
      ],
    },
    school: {
      national: [
        { name: "CBSE (Central Board of Secondary Education)", count: 20, icon: faUserGraduate },
        { name: "CISCE (Council for the Indian School Certificate Examinations)", count: 18, icon: faPencilAlt },
        { name: "NIOS (National Institute of Open Schooling)", count: 15, icon: faChalkboardTeacher },
      ],
      international: [
        { name: "IB (International Baccalaureate)", count: 10, icon: faGlobe },
        { name: "CAIE (Cambridge Assessment International Education)", count: 8, icon: faGlobe },
        { name: "Edexcel (Pearson Edexcel)", count: 7, icon: faGlobe },
      ],
      state: [
        { name: "UPMSP (Uttar Pradesh Madhyamik Shiksha Parishad)", count: 12, icon: faBuilding },
        { name: "HPBOSE (Himachal Pradesh Board of School Education)", count: 9, icon: faBuilding },
        { name: "JKBOSE (Jammu & Kashmir Board of School Education)", count: 8, icon: faBuilding },
      ],
      open: [
        { name: "NIOS (National Institute of Open Schooling)", count: 15, icon: faChalkboard },
        { name: "RSOS (Rajasthan State Open School)", count: 10, icon: faChalkboard },
        { name: "MP State Open School (MPSOS)", count: 7, icon: faChalkboard },
      ],
    },
  };

  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("all");

  // Combine all exams into a single array
  const allExams = [
    ...Object.values(examCategories.competitive).flat().map((exam) => ({ ...exam, category: "competitive" })),
    ...Object.values(examCategories.govt).flat().map((exam) => ({ ...exam, category: "govt" })),
    ...Object.values(examCategories.university).flat().map((exam) => ({ ...exam, category: "university" })),
    ...Object.values(examCategories.school).flat().map((exam) => ({ ...exam, category: "school" })),
  ];

  // Filter exams based on search query and active filter
  const getFilteredExams = () => {
    let filteredExams = allExams;

    // Apply search filter
    if (searchQuery) {
      filteredExams = filteredExams.filter((exam) =>
        exam.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== "all") {
      filteredExams = filteredExams.filter((exam) => exam.category === activeFilter);
    }

    return filteredExams;
  };

  // Render subsections for Competitive Exams
  const renderCompetitiveSubsections = () => {
    return (
      <div className="space-y-8">
        {/* Engineering & Architecture */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Engineering & Architecture</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.competitive.engineering.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Medical */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Medical</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.competitive.medical.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Law */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Law</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.competitive.law.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Management */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Management</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.competitive.management.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Civil Services & Government Jobs */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Civil Services & Government Jobs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.competitive.civilServices.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Defence & Armed Forces */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Defence & Armed Forces</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.competitive.defence.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Teaching & Education */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Teaching & Education</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.competitive.teaching.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Others */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Others</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.competitive.others.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render subsections for Govt Exams
  const renderGovtSubsections = () => {
    return (
      <div className="space-y-8">
        {/* Civil Services & Administrative Jobs */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Civil Services & Administrative Jobs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.govt.civilServices.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Banking & Finance Sector */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Banking & Finance Sector</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.govt.banking.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Railways Sector */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Railways Sector</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.govt.railways.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Defence & Armed Forces */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Defence & Armed Forces</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.govt.defence.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Staff Selection Commission (SSC) Exams */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Staff Selection Commission (SSC) Exams</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.govt.ssc.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Police & Paramilitary Forces */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Police & Paramilitary Forces</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.govt.police.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Teaching & Education Sector */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Teaching & Education Sector</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.govt.teaching.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Public Sector Undertakings (PSU) Jobs */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Public Sector Undertakings (PSU) Jobs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.govt.psu.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Insurance Sector */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Insurance Sector</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.govt.insurance.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render subsections for Universities
  const renderUniversitySubsections = () => {
    return (
      <div className="space-y-8">
        {/* Northern India */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Northern India</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.university.north.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Southern India */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Southern India</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.university.south.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Western India */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Western India</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.university.west.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Eastern India */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Eastern India</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.university.east.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render subsections for School Boards
  const renderSchoolBoardSubsections = () => {
    return (
      <div className="space-y-8">
        {/* National School Boards */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">National School Boards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.school.national.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* International School Boards */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">International School Boards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.school.international.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* State School Boards */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">State School Boards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.school.state.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>

        {/* Open Schooling Boards */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Open Schooling Boards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {examCategories.school.open.map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Exam Card Component
  const ExamCard = ({ exam }) => (
    <div className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 sm:p-6 flex items-start transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md">
      <div className="bg-indigo-100 rounded-lg p-2 sm:p-3 mr-4">
        <FontAwesomeIcon icon={exam.icon} className="text-indigo-600 text-lg sm:text-xl" />
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{exam.name}</h3>
        <p className="text-sm text-gray-600">{exam.count} years of papers available</p>
        <a
          href="#"
          className="inline-flex items-center mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          View papers <FontAwesomeIcon icon={faArrowRight} className="ml-1 text-xs" />
        </a>
      </div>
    </div>
  );

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
            Browse Exams
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Explore All Exams
          </h2>
          <p className="mt-2 sm:mt-4 max-w-2xl text-base sm:text-lg text-gray-600 mx-auto">
            Comprehensive collection of previous year questions for all major exams
          </p>
        </div>

        {/* Search Box */}
        <div className="mt-6 sm:mt-8 mb-4 sm:mb-6 relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exams..."
            className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
              activeFilter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Exams
          </button>
          <button
            onClick={() => setActiveFilter("competitive")}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
              activeFilter === "competitive"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Competitive Exams
          </button>
          <button
            onClick={() => setActiveFilter("govt")}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
              activeFilter === "govt"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Govt Exams
          </button>
          <button
            onClick={() => setActiveFilter("university")}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
              activeFilter === "university"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Universities
          </button>
          <button
            onClick={() => setActiveFilter("school")}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
              activeFilter === "school"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            School Boards
          </button>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-200 mb-6 sm:mb-8"></div>

        {/* Exam Grid */}
        {activeFilter === "competitive" ? (
          renderCompetitiveSubsections()
        ) : activeFilter === "govt" ? (
          renderGovtSubsections()
        ) : activeFilter === "university" ? (
          renderUniversitySubsections()
        ) : activeFilter === "school" ? (
          renderSchoolBoardSubsections()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {getFilteredExams().map((exam, index) => (
              <ExamCard key={index} exam={exam} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseExamsPage;