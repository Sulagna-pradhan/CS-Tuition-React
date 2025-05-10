import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faPlus,
  faTrash,
  faEdit,
  faSave,
  faTimes,
  faCalendarAlt,
  faTags,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";

const EventCalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [eventInput, setEventInput] = useState("");
  const [eventCategory, setEventCategory] = useState("general");
  const [eventPriority, setEventPriority] = useState("medium");
  const [editingEventId, setEditingEventId] = useState(null);
  const [editEventText, setEditEventText] = useState("");
  const [theme, setTheme] = useState("light");
  const [jumpDate, setJumpDate] = useState("");
  const [jumpYear, setJumpYear] = useState(currentYear);

  // Load events and theme from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem("bitlearning-events");
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    const savedTheme = localStorage.getItem("bitlearning-theme") || "light";
    setTheme(savedTheme);
  }, []);

  // Save events and theme to localStorage
  useEffect(() => {
    localStorage.setItem("bitlearning-events", JSON.stringify(events));
    localStorage.setItem("bitlearning-theme", theme);
    document.documentElement.className = theme;
  }, [events, theme]);

  // Calendar generation
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
  const today = new Date();

  const generateCalendar = () => {
    const days = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const weeks = [];
    let week = Array(firstDay).fill(null);
    for (let day = 1; day <= days; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0)
      weeks.push([...week, ...Array(7 - week.length).fill(null)]);
    return weeks;
  };

  // Event handling
  const addEvent = () => {
    if (!eventInput.trim()) {
      toast.error("Please enter an event");
      return;
    }
    const newEvent = {
      id: Date.now(),
      text: eventInput,
      date: selectedDate.toISOString().split("T")[0],
      category: eventCategory,
      priority: eventPriority,
      createdAt: new Date().toISOString(),
    };
    setEvents([...events, newEvent]);
    setEventInput("");
    setEventCategory("general");
    setEventPriority("medium");
    toast.success("Event added!", {
      style: {
        background: theme === "light" ? "#fff" : "#1f2937",
        color: theme === "light" ? "#1f2937" : "#f3f4f6",
      },
    });
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.success("Event deleted", {
      style: {
        background: theme === "light" ? "#fff" : "#1f2937",
        color: theme === "light" ? "#1f2937" : "#f3f4f6",
      },
    });
  };

  const startEditingEvent = (id, text) => {
    setEditingEventId(id);
    setEditEventText(text);
  };

  const saveEditEvent = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, text: editEventText } : event
      )
    );
    setEditingEventId(null);
    toast.success("Event updated!", {
      style: {
        background: theme === "light" ? "#fff" : "#1f2937",
        color: theme === "light" ? "#1f2937" : "#f3f4f6",
      },
    });
  };

  const cancelEdit = () => {
    setEditingEventId(null);
  };

  // Navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleJumpDate = () => {
    if (jumpDate) {
      const newDate = new Date(jumpDate);
      if (!isNaN(newDate)) {
        setSelectedDate(newDate);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
        setJumpDate("");
        toast.success("Jumped to date!", {
          style: {
            background: theme === "light" ? "#fff" : "#1f2937",
            color: theme === "light" ? "#1f2937" : "#f3f4f6",
          },
        });
      } else {
        toast.error("Invalid date");
      }
    }
  };

  const handleJumpYear = (e) => {
    const year = parseInt(e.target.value);
    if (year >= 1900 && year <= 2100) {
      setCurrentYear(year);
      setJumpYear(year);
      toast.success(`Jumped to ${year}!`, {
        style: {
          background: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#1f2937" : "#f3f4f6",
        },
      });
    } else {
      toast.error("Year must be between 1900 and 2100");
    }
  };

  // Helpers
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-500";
      case "medium":
        return "text-yellow-500 bg-yellow-500";
      case "low":
        return "text-green-500 bg-green-500";
      default:
        return "text-gray-500 bg-gray-500";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "work":
        return "bg-blue-200 text-blue-700 animate-pulse";
      case "personal":
        return "bg-green-200 text-green-700 animate-pulse";
      case "meeting":
        return "bg-purple-200 text-purple-700 animate-pulse";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getEventsForDate = (date) =>
    events.filter((event) => event.date === date.toISOString().split("T")[0]);

  // Theme toggle
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Generate years for dropdown (current year ± 50 years)
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  return (
    <div
      className={`min-h-screen overflow-hidden font-poppins ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
      }`}
    >
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-18">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a
                href="/tools/productivity"
                className={`${
                  theme === "light" ? "text-gray-500" : "text-gray-300"
                } hover:text-indigo-600 transition-colors duration-300`}
              >
                <FontAwesomeIcon icon={faBackward} className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </a>
            </li>
            <li className="flex items-center">
              <span
                className={`mx-2 ${
                  theme === "light" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                /
              </span>
              <a
                href="/calendar"
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300"
                aria-current="page"
              >
                Event Calendar
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`${
            theme === "light"
              ? "bg-white/90 border-gray-100"
              : "bg-gray-800/90 border-gray-700"
          } backdrop-blur-sm rounded-xl shadow-lg p-6 border animate-fade-in`}
        >
          <div className="flex justify-between items-center mb-6">
            <h1
              className={`text-4xl font-bold ${
                theme === "light" ? "text-gray-800" : "text-gray-100"
              } flex items-center font-inter tracking-tight`}
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-3 text-indigo-600 animate-spin-slow"
              />
              Event Calendar
            </h1>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transform transition-transform duration-300 hover:scale-110 ${
                theme === "light" ? "bg-gray-100" : "bg-gray-700"
              } hover:bg-indigo-200`}
            >
              <FontAwesomeIcon
                icon={theme === "light" ? faMoon : faSun}
                className="text-indigo-600"
              />
            </button>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div
                className={`p-4 rounded-lg ${
                  theme === "light" ? "bg-indigo-50/50" : "bg-gray-700/50"
                } border ${
                  theme === "light" ? "border-indigo-100" : "border-gray-600"
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevMonth}
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
                    >
                      Prev
                    </button>
                    <h2
                      className={`text-2xl font-semibold ${
                        theme === "light" ? "text-gray-800" : "text-gray-100"
                      } font-inter`}
                    >
                      {new Date(currentYear, currentMonth).toLocaleString(
                        "default",
                        { month: "long", year: "numeric" }
                      )}
                    </h2>
                    <button
                      onClick={nextMonth}
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={jumpDate}
                      onChange={(e) => setJumpDate(e.target.value)}
                      className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === "light"
                          ? "bg-white border-gray-300"
                          : "bg-gray-800 border-gray-600 text-gray-100"
                      }`}
                      onKeyPress={(e) => e.key === "Enter" && handleJumpDate()}
                    />
                    <select
                      value={jumpYear}
                      onChange={handleJumpYear}
                      className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === "light"
                          ? "bg-white border-gray-300"
                          : "bg-gray-800 border-gray-600 text-gray-100"
                      }`}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className={`font-medium text-sm uppercase tracking-wide ${
                          theme === "light" ? "text-gray-600" : "text-gray-300"
                        } font-inter`}
                      >
                        {day}
                      </div>
                    )
                  )}
                  {generateCalendar().map((week, i) =>
                    week.map((day, j) => {
                      const date = day
                        ? new Date(currentYear, currentMonth, day)
                        : null;
                      const isToday =
                        date && date.toDateString() === today.toDateString();
                      const isSelected =
                        date &&
                        selectedDate.toDateString() === date.toDateString();
                      const hasEvents =
                        date && getEventsForDate(date).length > 0;
                      return (
                        <div
                          key={`${i}-${j}`}
                          className={`p-2 h-24 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                            day
                              ? isSelected
                                ? "bg-indigo-600 text-white shadow-md"
                                : isToday
                                ? "bg-indigo-200 text-indigo-800"
                                : theme === "light"
                                ? "bg-white hover:bg-indigo-100"
                                : "bg-gray-800 hover:bg-gray-700"
                              : "bg-transparent"
                          } ${
                            hasEvents && !isSelected
                              ? "border-2 border-indigo-400 animate-pulse"
                              : ""
                          }`}
                          onClick={() => day && setSelectedDate(date)}
                        >
                          {day && (
                            <>
                              <div
                                className={`text-lg font-semibold ${
                                  theme === "light"
                                    ? "text-gray-800"
                                    : "text-gray-100"
                                } ${isSelected ? "text-white" : ""} ${
                                  isToday ? "text-indigo-800" : ""
                                }`}
                              >
                                {day}
                              </div>
                              {hasEvents && (
                                <div className="text-xs mt-1">
                                  {getEventsForDate(date)
                                    .slice(0, 2)
                                    .map((event) => (
                                      <div
                                        key={event.id}
                                        className={`truncate text-xs ${
                                          theme === "light"
                                            ? "text-gray-600"
                                            : "text-gray-300"
                                        }`}
                                        title={event.text}
                                      >
                                        • {event.text}
                                      </div>
                                    ))}
                                  {getEventsForDate(date).length > 2 && (
                                    <div
                                      className={`text-xs ${
                                        theme === "light"
                                          ? "text-gray-600"
                                          : "text-gray-300"
                                      }`}
                                    >
                                      ...
                                    </div>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Event Form and List */}
            <div>
              <div
                className={`p-4 rounded-lg mb-4 ${
                  theme === "light" ? "bg-indigo-50/50" : "bg-gray-700/50"
                } border ${
                  theme === "light" ? "border-indigo-100" : "border-gray-600"
                } animate-slide-in`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    theme === "light" ? "text-gray-800" : "text-gray-100"
                  } font-inter tracking-tight`}
                >
                  Add Event for{" "}
                  {selectedDate.toLocaleDateString("default", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={eventInput}
                    onChange={(e) => setEventInput(e.target.value)}
                    placeholder="Enter event..."
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                      theme === "light"
                        ? "bg-white border-gray-300"
                        : "bg-gray-800 border-gray-600 text-gray-100"
                    }`}
                    onKeyPress={(e) => e.key === "Enter" && addEvent()}
                  />
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faTags}
                      className={`mr-2 ${
                        theme === "light" ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <select
                      value={eventCategory}
                      onChange={(e) => setEventCategory(e.target.value)}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        theme === "light"
                          ? "bg-white border-gray-300"
                          : "bg-gray-800 border-gray-600 text-gray-100"
                      }`}
                    >
                      <option value="general">General</option>
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className={`mr-2 ${
                        theme === "light" ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <select
                      value={eventPriority}
                      onChange={(e) => setEventPriority(e.target.value)}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        theme === "light"
                          ? "bg-white border-gray-300"
                          : "bg-gray-800 border-gray-600 text-gray-100"
                      }`}
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                  <button
                    onClick={addEvent}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-indigo-200 transform hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Event
                  </button>
                </div>
              </div>

              {/* Event List */}
              <div
                className={`p-4 rounded-lg ${
                  theme === "light" ? "bg-indigo-50/50" : "bg-gray-700/50"
                } border ${
                  theme === "light" ? "border-indigo-100" : "border-gray-600"
                } animate-slide-in`}
              >
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    theme === "light" ? "text-gray-800" : "text-gray-100"
                  } font-inter tracking-tight`}
                >
                  Events for{" "}
                  {selectedDate.toLocaleDateString("default", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                {getEventsForDate(selectedDate).length === 0 ? (
                  <div
                    className={`text-center py-4 ${
                      theme === "light" ? "text-gray-500" : "text-gray-400"
                    } ${
                      theme === "light" ? "bg-gray-50/50" : "bg-gray-600/50"
                    } rounded-lg`}
                  >
                    No events for this date
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div
                        key={event.id}
                        className={`flex items-center p-3 border rounded-lg transition-all duration-200 transform hover:scale-102 ${
                          theme === "light"
                            ? "bg-white border-gray-200 shadow-sm hover:shadow-md"
                            : "bg-gray-800 border-gray-600 shadow-sm hover:shadow-lg"
                        }`}
                      >
                        {editingEventId === event.id ? (
                          <div className="flex-grow flex items-center">
                            <input
                              type="text"
                              value={editEventText}
                              onChange={(e) => setEditEventText(e.target.value)}
                              className={`flex-grow px-3 py-1 border-b-2 border-indigo-500 focus:outline-none transition-all duration-200 ${
                                theme === "light"
                                  ? "bg-transparent"
                                  : "bg-gray-800 text-gray-100"
                              }`}
                              autoFocus
                            />
                            <button
                              onClick={() => saveEditEvent(event.id)}
                              className="ml-2 text-green-600 hover:text-green-800 transform hover:scale-110 transition-all"
                            >
                              <FontAwesomeIcon icon={faSave} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="ml-2 text-red-600 hover:text-red-800 transform hover:scale-110 transition-all"
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex-grow">
                            <div
                              className={`text-base font-medium ${
                                theme === "light"
                                  ? "text-gray-800"
                                  : "text-gray-100"
                              } font-inter`}
                            >
                              {event.text}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span
                                className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(
                                  event.category
                                )}`}
                              >
                                <FontAwesomeIcon
                                  icon={faTags}
                                  className="mr-1"
                                />
                                {event.category}
                              </span>
                              <span
                                className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(
                                  event.priority
                                )} bg-opacity-20`}
                              >
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-1"
                                />
                                {event.priority}
                              </span>
                            </div>
                          </div>
                        )}
                        {editingEventId !== event.id && (
                          <div className="flex space-x-2 ml-3">
                            <button
                              onClick={() =>
                                startEditingEvent(event.id, event.text)
                              }
                              className="text-indigo-600 hover:text-indigo-800 transform hover:scale-110 transition-all"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              onClick={() => deleteEvent(event.id)}
                              className="text-red-600 hover:text-red-800 transform hover:scale-110 transition-all"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default EventCalendarPage;
