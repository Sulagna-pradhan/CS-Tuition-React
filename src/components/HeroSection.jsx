import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faStar,
  faStarHalfAlt,
  faChartLine,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-500 relative overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="particles-js" id="particles-js"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
             <div class="inline-block px-4 py-1 rounded-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm mb-4 transform hover:scale-105 transition-transform duration-300">
                <span class="text-sm font-medium flex items-center text-black">
                 <span class="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                 India's Largest PYQ Platform
               </span>
             </div>


            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Ace Your Exams with{" "}
              <span className="text-yellow-300 relative">
                Previous Year Papers
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300 opacity-50 rounded"></span>
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-indigo-100 max-w-xl">
              Access 50,000+ verified question papers spanning competitive,
              university, and school exams – all organized in one powerful
              platform.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              <div className="flex-1 min-w-0 sm:min-w-[240px]">
                <div className="relative rounded-xl overflow-hidden shadow-lg group">
                  <input
                    type="text"
                    placeholder="Search your exam (JEE, NEET, CBSE...)"
                    className="block w-full pl-5 pr-12 py-3 sm:py-4 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg border-0 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-yellow-300 rounded-xl transition-all duration-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <button className="p-2 bg-indigo-600 rounded-lg shadow-md group-hover:bg-indigo-700 transition-colors duration-300">
                      <FontAwesomeIcon icon={faSearch} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>

              <button className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg hover:from-yellow-500 hover:to-yellow-600 hover:shadow-xl transition-all duration-300 min-w-[160px] transform hover:translate-y-[-2px]">
                Get Started
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 group-hover:ml-3 transition-all duration-300"
                />
              </button>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0">
              <div className="flex -space-x-3">
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white transform hover:scale-110 transition-transform duration-300"
                  src="https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_640.jpg"
                  alt="User"
                />
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white transform hover:scale-110 transition-transform duration-300"
                  src="https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_640.jpg"
                  alt="User"
                />
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white transform hover:scale-110 transition-transform duration-300"
                  src="https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703_640.jpg"
                  alt="User"
                />
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white transform hover:scale-110 transition-transform duration-300"
                  src="https://cdn.pixabay.com/photo/2016/03/27/16/54/face-1283106_640.jpg"
                  alt="User"
                />
              </div>
              <div className="ml-0 sm:ml-4">
                <div className="font-semibold text-lg sm:text-xl">50,000+</div>
                <div className="text-indigo-200 text-xs sm:text-sm">
                  Students trust us
                </div>
              </div>

              <div className="ml-0 sm:ml-6 pl-0 sm:pl-6 border-l-0 sm:border-l border-indigo-400 border-opacity-30">
                <div className="flex items-center">
                  <div className="text-yellow-300">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                  </div>
                  <span className="ml-2 text-lg sm:text-xl font-semibold">
                    4.8/5
                  </span>
                </div>
                <div className="text-indigo-200 text-xs sm:text-sm">
                  Based on 12K+ reviews
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative mt-8 md:mt-0">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white border-opacity-20 transform rotate-1 hover:rotate-0 transition-transform duration-500 group">
              <img
                src="https://cdn.pixabay.com/photo/2018/10/04/07/48/omr-3723132_960_720.jpg"
                alt="Students excelling in exams"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-20"></div>
            </div>

            {/* Floating Card 1: Stats */}
            <div className="absolute top-6 right-2 sm:right-0 bg-white rounded-xl shadow-xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300 w-36 sm:w-48 backdrop-filter backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                  Success Rate
                </h3>
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-green-500"
                />
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-4/5 relative">
                  <div className="absolute inset-0 animate-pulse opacity-70"></div>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs sm:text-sm">
                <span className="text-gray-500">Previous</span>
                <span className="font-semibold text-green-600">
                  +87% improvement
                </span>
              </div>
            </div>

            {/* Floating Card 2: Exam Counter */}
            <div className="absolute left-2 sm:-left-6 -bottom-4 bg-gradient-to-r from-indigo-800 to-blue-800 text-white rounded-xl shadow-xl p-3 sm:p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300 z-10">
              <div className="flex items-center">
                <div className="p-1 sm:p-2 bg-indigo-600 rounded-lg mr-2 sm:mr-3">
                  <FontAwesomeIcon icon={faBookOpen} className="text-xs sm:text-sm" />
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold">5,000+</div>
                  <div className="text-xs text-indigo-200">Exam papers</div>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs gap-1">
                <span className="bg-indigo-600 px-1 sm:px-2 py-1 rounded">JEE</span>
                <span className="bg-indigo-600 px-1 sm:px-2 py-1 rounded">NEET</span>
                <span className="bg-indigo-600 px-1 sm:px-2 py-1 rounded">UPSC</span>
                <span className="bg-indigo-600 px-1 sm:px-2 py-1 rounded">+50</span>
              </div>
            </div>

            {/* New: Floating Achievement Badge */}
            <div className="hidden md:block absolute top-1/2 right-4 transform translate-y-[-50%] rotate-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 rounded-full p-2 shadow-lg">
              <div className="rounded-full border-2 border-dashed border-gray-900 p-2">
                <div className="text-center">
                  <div className="text-xs font-bold">VERIFIED</div>
                  <div className="text-xs">QUALITY</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Logos */}
        <div className="mt-12 md:mt-16 lg:mt-20 border-t border-indigo-400 border-opacity-30 pt-6 sm:pt-8">
          <p className="text-center text-white text-opacity-80 text-xs sm:text-sm mb-4">
            TRUSTED BY TOP INSTITUTIONS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-80">
            <div className="h-6 sm:h-8 w-auto filter brightness-0 invert hover:opacity-75 transition-opacity duration-300">
              <img
                src="https://cdn.pixabay.com/photo/2023/03/06/13/58/logo-7833521_640.png"
                alt="Institution logo"
                className="h-full"
              />
            </div>
            <div className="h-6 sm:h-8 w-auto filter brightness-0 invert hover:opacity-75 transition-opacity duration-300">
              <img
                src="https://cdn.pixabay.com/photo/2023/03/06/13/56/icon-7833512_640.png"
                alt="Institution logo"
                className="h-full"
              />
            </div>
            <div className="h-6 sm:h-8 w-auto filter brightness-0 invert hover:opacity-75 transition-opacity duration-300">
              <img
                src="https://cdn.pixabay.com/photo/2015/05/19/07/44/browser-773215_640.png"
                alt="Institution logo"
                className="h-full"
              />
            </div>
            <div className="h-6 sm:h-8 w-auto filter brightness-0 invert hover:opacity-75 transition-opacity duration-300">
              <img
                src="https://cdn.pixabay.com/photo/2016/09/28/09/33/circular-saw-1700037_640.png"
                alt="Institution logo"
                className="h-full"
              />
            </div>
            <div className="h-6 sm:h-8 w-auto filter brightness-0 invert hover:opacity-75 transition-opacity duration-300">
              <img
                src="https://cdn.pixabay.com/photo/2023/03/06/13/58/icon-7833522_640.png"
                alt="Institution logo"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          fill="#f9fafb"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;