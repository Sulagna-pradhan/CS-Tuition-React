import CourseDetail from "../../components/CourseDetail";

const courseData = {
  id: 2,
  title: "Data Structures & Algorithms",
  description: "Master essential data structures and algorithms.",
  image:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  videos: "32 Videos",
  hours: "50 Hours",
  semester: "Semester 2",
  lectures: [
    {
      title: "Introduction to DSA",
      description: "Learn basic concepts",
      duration: "20 min",
      videoId: "abc123",
    },
  ],
};

const DSACourse = () => {
  return <CourseDetail course={courseData} />;
};

export default DSACourse;
