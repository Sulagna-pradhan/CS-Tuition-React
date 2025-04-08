import React from "react";

const Newsletter = () => {
  return (
    <section className="bg-gradient-to-br from-gray-100 via-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Stay Updated</h2>
          <p className="mt-4 text-lg text-gray-600">
            Subscribe to our newsletter to receive the latest exam updates and
            study resources
          </p>
          <div className="mt-8 sm:flex justify-center">
            <div className="flex-1 min-w-0 mb-4 sm:mb-0 sm:mr-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
