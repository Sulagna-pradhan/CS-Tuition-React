import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faCode } from "@fortawesome/free-solid-svg-icons";

const CCompilerPage = () => {
  return (
    <div className="bg-gray-50 overflow-hidden min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-18">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a
                href="/tools/learning"
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faBackward} className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <a
                href="/c-compiler"
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 cursor-pointer"
                aria-current="page"
              >
                C Compiler
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FontAwesomeIcon icon={faCode} className="mr-3 text-indigo-600" />
            Online C Compiler
          </h1>

          <div className="grid grid-cols-1">
            {/* Compiler Section */}
            <div className="flex flex-col">
              <p className="text-gray-600 mb-4">
                Write, compile, and run your C code directly in the browser
                using the embedded compiler below.
              </p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <iframe
                  frameBorder="0"
                  height="450px"
                  src="https://onecompiler.com/embed/c?availableLanguages=false&hideLanguageSelection=true&hideTitle=true"
                  width="100%"
                  title="Online C Compiler"
                ></iframe>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Use the compiler to test your C code instantly. No installation
                required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCompilerPage;
