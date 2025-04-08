import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import {
  faFileAlt,
  faLightbulb,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const WhyChooseExamsPYQ = () => {
  const features = [
    {
      icon: faFileAlt,
      title: "Comprehensive Collection",
      description:
        "Access thousands of previous year question papers across all major exam categories.",
    },
    {
      icon: faLightbulb,
      title: "Detailed Solutions",
      description:
        "Step-by-step solutions to help you understand concepts and improve your problem-solving skills.",
    },
    {
      icon: faMobileAlt,
      title: "Mobile Access",
      description:
        "Study on the go with our mobile-responsive design and offline access options.",
    },
  ];

  return (
    <section className="bg-indigo-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Why Choose ExamsPYQ</h2>
          <p className="mt-4 max-w-2xl text-xl text-indigo-200 mx-auto">
            Features designed to enhance your exam preparation
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-indigo-800 rounded-lg p-6 text-center"
              >
                <div className="bg-indigo-600 inline-flex p-3 rounded-full mx-auto">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    className="text-white text-2xl"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-indigo-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseExamsPYQ;