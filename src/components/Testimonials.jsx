import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "JEE Aspirant",
      content:
        "Exams PYQ helped me understand exam patterns better. Got AIR 112 in JEE Main!",
      img: "https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_640.jpg",
    },
    {
      name: "Rahul Verma",
      role: "NEET Topper",
      content:
        "Practicing with previous papers from this site was key to my success. Highly recommended!",
      img: "https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_640.jpg",
    },
    {
      name: "Ananya Patel",
      role: "Teacher",
      content:
        "I recommend this site to all my students. The organized collection makes teaching easy.",
      img: "https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703_640.jpg",
    },
    {
      name: "Vikram Singh",
      role: "UPSC Aspirant",
      content:
        "This platform provided me with the best resources for my UPSC preparation. A must-use for every aspirant!",
      img: "https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_640.jpg",
    },
    {
      name: "Sanya Kapoor",
      role: "GATE Qualifier",
      content:
        "Solving past year papers from this site was a game-changer. Cleared GATE with top ranks!",
      img: "https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703_640.jpg",
    },
    {
      name: "Amit Das",
      role: "MBA Student",
      content:
        "I used PYQs for my CAT exam and secured admission in a top B-school. Very useful platform!",
      img: "https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562_640.jpg",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
          <FontAwesomeIcon icon={faQuoteLeft} className="mr-2" />
            Student Voices
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What Our Student Say
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Success stories from students who used our platform
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 relative"
              >
                <div className="absolute -top-4 left-4">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    className="text-4xl text-indigo-200"
                  />
                </div>
                <p className="text-gray-600 mb-6 mt-3">{testimonial.content}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;