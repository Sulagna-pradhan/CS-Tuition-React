import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import GoToTopButton from "../components/general/GoToTopButton";
import Actionbtn from "../components/general/Actionbtn";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <Testimonials />
      <Newsletter />
      <GoToTopButton />
      <Actionbtn />
    </div>
  );
};

export default Home;
