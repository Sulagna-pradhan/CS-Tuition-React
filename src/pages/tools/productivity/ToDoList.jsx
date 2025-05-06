import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faTrash,
  faCheck,
  faEdit,
  faSave,
  faTimes,
  faStar,
  faCalendarAlt,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [tag, setTag] = useState("");

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("bitlearning-todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("bitlearning-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!inputValue.trim()) {
      toast.error("Please enter a task");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      priority,
      dueDate,
      tag,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
    setPriority("medium");
    setDueDate("");
    setTag("");
    toast.success("Task added!");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task deleted");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
    toast.success("Task updated!");
  };

  // Added the missing cancelEdit function
  const cancelEdit = () => {
    setEditingId(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getFilteredTodos = () => {
    const today = new Date().toISOString().split("T")[0];
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "high":
        return todos.filter((todo) => todo.priority === "high");
      case "today":
        return todos.filter((todo) => todo.dueDate === today);
      default:
        return todos;
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
    toast.success("Completed tasks cleared");
  };

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f5f7ff 0%, #f8fafc 50%, #f0f5ff 100%)",
      }}
    >
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a
                href="/"
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <a
                href="/todo"
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300"
                aria-current="page"
              >
                To-Do List
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FontAwesomeIcon icon={faCheck} className="mr-3 text-indigo-600" />
            My Tasks
            <span className="ml-auto text-sm font-medium bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
              {todos.filter((todo) => !todo.completed).length} pending
            </span>
          </h1>

          {/* Add Task Form */}
          <div className="mb-8 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
            <div className="flex flex-col md:flex-row gap-3 mb-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <button
                onClick={addTodo}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-indigo-200"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Task
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faStar} className="mr-2 text-gray-500" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="mr-2 text-gray-500"
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faTags} className="mr-2 text-gray-500" />
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Add tag..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                filter === "all"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                filter === "active"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active ({todos.filter((t) => !t.completed).length})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                filter === "completed"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Completed ({todos.filter((t) => t.completed).length})
            </button>
            <button
              onClick={() => setFilter("high")}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                filter === "high"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              High Priority ({todos.filter((t) => t.priority === "high").length}
              )
            </button>
            <button
              onClick={() => setFilter("today")}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                filter === "today"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Due Today
            </button>
            {todos.some((t) => t.completed) && (
              <button
                onClick={clearCompleted}
                className="ml-auto px-3 py-1 rounded-lg text-sm bg-red-100 text-red-600 hover:bg-red-200 transition-all"
              >
                Clear Completed
              </button>
            )}
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {getFilteredTodos().length === 0 ? (
              <div className="text-center py-8 text-gray-500 bg-gray-50/50 rounded-lg">
                {filter === "all"
                  ? "No tasks yet. Add one above!"
                  : filter === "completed"
                  ? "No completed tasks"
                  : filter === "active"
                  ? "No active tasks - great job!"
                  : filter === "high"
                  ? "No high priority tasks"
                  : "No tasks due today"}
              </div>
            ) : (
              getFilteredTodos().map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center p-4 border rounded-lg transition-all duration-200 ${
                    todo.completed
                      ? "bg-gray-50/50 border-gray-200"
                      : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center transition-all ${
                      todo.completed
                        ? "bg-green-500 text-white shadow-inner"
                        : "border-2 border-gray-300 hover:border-indigo-400"
                    }`}
                  >
                    {todo.completed && (
                      <FontAwesomeIcon icon={faCheck} className="text-xs" />
                    )}
                  </button>

                  {editingId === todo.id ? (
                    <div className="flex-grow flex items-center">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-grow px-3 py-1 border-b-2 border-indigo-500 focus:outline-none bg-transparent"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex-grow">
                      <div
                        className={`${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.text}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {todo.priority && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                              todo.priority
                            )} bg-opacity-20 ${
                              todo.priority === "high"
                                ? "bg-red-500"
                                : todo.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          >
                            <FontAwesomeIcon icon={faStar} className="mr-1" />
                            {todo.priority}
                          </span>
                        )}
                        {todo.dueDate && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="mr-1"
                            />
                            {new Date(todo.dueDate).toLocaleDateString()}
                          </span>
                        )}
                        {todo.tag && (
                          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600">
                            <FontAwesomeIcon icon={faTags} className="mr-1" />
                            {todo.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {editingId !== todo.id && (
                    <div className="flex space-x-2 ml-3">
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default TodoPage;
