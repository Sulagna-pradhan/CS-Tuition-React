import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faChevronUp, faChevronDown, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const FAQ = () => {
  const [faqItems, setFaqItems] = useState([
    {
      question: "How do I download question papers?",
      answer:
        "Simply create a free account, browse to your desired exam category, select the paper you want, and click the download button.",
      open: false,
    },
    {
      question: "Are solutions available for all papers?",
      answer:
        "Most papers come with detailed solutions. Papers without solutions are clearly marked.",
      open: false,
    },
    {
      question: "How often are new papers added?",
      answer:
        "We update our database immediately after new exams are conducted, typically within 1-2 weeks.",
      open: false,
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, we have Android and iOS apps available for download with offline access to papers.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, open: !item.open } : item
      )
    );
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">


<div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
              Frequently Asked Questions
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Got Questions? We've Got Answers
            </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Find answers to common questions about our platform
          </p>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full py-4 text-left"
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                <FontAwesomeIcon
                  icon={item.open ? faChevronUp : faChevronDown}
                  className="text-gray-500"
                />
              </button>
              <div
                className={`pb-4 pr-4 ${item.open ? "block" : "hidden"}`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;