import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ExamCategories from "../components/ExamCategories";
import FeaturedPapers from "../components/FeaturedPapers";
import RecentlyAdded from "../components/RecentlyAdded";
import WhyChooseExamsPYQ from "../components/WhyChooseExamsPYQ";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Newsletter from "../components/Newsletter";
import Loader from "../components/general/Loader";
import GoToTopButton from "../components/general/GoToTopButton";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
          <ExamCategories />
          <FeaturedPapers />
          <RecentlyAdded />
          <WhyChooseExamsPYQ />
          <Testimonials />
          <FAQ />
          <Newsletter />
          <GoToTopButton />
        </>
      )}
    </div>
  );
};

export default Home;