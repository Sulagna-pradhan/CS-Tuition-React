import { Link } from "react-router-dom";
import CourseDetail from "../../components/CourseDetail";

const courseData = {
  id: 1,
  title: "Introduction to Programming",
  description:
    "Learn the fundamentals of programming with Python. Perfect for beginners looking to start their coding journey.",
  image:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  videos: "24 Videos",
  hours: "40 Hours",
  semester: "Semester 1",
  lectures: [
    {
      title: "Introduction to Python",
      description: "Learn the basics of Python programming language",
      duration: "15 min",
      videoId: "",
    },
    {
      title: "Variables and Data Types",
      description: "Understanding variables and different data types in Python",
      duration: "22 min",
      videoId: "",
    },
  ],
};

const ProgrammingCourse = () => {
  return <CourseDetail course={courseData} />;
};

export default ProgrammingCourse;
