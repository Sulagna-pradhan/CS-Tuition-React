import { Link } from "react-router-dom";
import CourseDetail from "../../components/CourseDetail";

const courseData = {
  id: 1,
  title: "Number System",
  description: "Number System in Computer | Introduction",
  image:
    "https://maths.olympiadsuccess.com/assets/images/maths_square/maths_topic_164.jpg",
  videos: "9 Videos",
  semester: "Semester 1",
  hours: "2 Hours",
  lectures: [
    {
      title: "Introduction to Python",
      description: "Learn the basics of Python programming language",
      duration: "15 min",
      videoId: "d1jKlVFiSTQ",
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
