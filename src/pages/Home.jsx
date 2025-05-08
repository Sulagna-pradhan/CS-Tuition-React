import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";

import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Loader from "../components/general/Loader";
import GoToTopButton from "../components/general/GoToTopButton";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Show Loader while isLoading is true */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Hero Section */}
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <Testimonials />
          <Newsletter />
          <GoToTopButton />
        </>
      )}
    </div>
  );
};

export default Home;
