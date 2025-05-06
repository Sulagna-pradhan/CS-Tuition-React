"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faSearch,
  faChevronLeft,
  faChevronRight,
  faEye,
  faDownload,
  faTimesCircle,
  faCheckCircle,
  faLaptopCode,
  faBookOpen,
  faLaughSquint,
  faSpinner,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function DigitalLibraryPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [openLibraryBooks, setOpenLibraryBooks] = useState([]);
  const [openLibraryLoading, setOpenLibraryLoading] = useState(false);
  const [searchSource, setSearchSource] = useState("local");
  const [openLibrarySearchTerm, setOpenLibrarySearchTerm] = useState("");
  const [selectedOpenLibraryBook, setSelectedOpenLibraryBook] = useState(null);

  const booksPerPage = 20;

  // Fetch books from Open Library with improved error handling
  const fetchOpenLibraryBooks = async (query) => {
    if (!query || query.trim() === "") {
      setOpenLibraryBooks([]);
      return;
    }

    try {
      setOpenLibraryLoading(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}&limit=20`
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      if (data?.docs?.length > 0) {
        const formattedBooks = data.docs
          .filter((book) => book.title && book.key)
          .map((book) => {
            const coverId = book.cover_i;
            const coverUrl = coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
              : "/placeholder-book.jpg";

            const authorName =
              book.author_name?.join?.(", ") || "Unknown Author";
            const publishYear = book.first_publish_year || "Unknown";

            return {
              id: book.key,
              olid: book.key.replace("/works/", ""),
              title: book.title,
              author: authorName,
              cover: coverUrl,
              year: publishYear,
              category: "openLibrary",
              source: "openLibrary",
              openLibraryUrl: `https://openlibrary.org${book.key}`,
            };
          });

        setOpenLibraryBooks(formattedBooks);
      } else {
        setOpenLibraryBooks([]);
      }
    } catch (error) {
      console.error("Error fetching from Open Library:", error);
      setOpenLibraryBooks([]);
    } finally {
      setOpenLibraryLoading(false);
    }
  };

  // Debounced Open Library search
  useEffect(() => {
    if (searchSource === "openLibrary") {
      const delay = setTimeout(() => {
        fetchOpenLibraryBooks(openLibrarySearchTerm);
      }, 500);

      return () => clearTimeout(delay);
    }
  }, [openLibrarySearchTerm, searchSource]);

  // Load local books and set up intersection observer
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      // Sample local book data
      const booksData = [
        {
          id: 1,
          title: "Computer System Architecture",
          author: "M. Morris Mano",
          cover: "https://archive.org/services/img/isbn_9788131700709",
          category: "study",
          viewLink:
            "https://archive.org/details/isbn_9788131700709/mode/2up?view=theater",
          downloadLink: "",
          forCS: true,
          source: "local",
        },
        {
          id: 2,
          title: "Morris M Mano Digital Design (3r Book)",
          author: "M. Morris Mano",
          cover:
            "https://archive.org/services/img/m.-morris-mano-morris-m-mano-digital-design-3r-book-zz.org",
          category: "study",
          viewLink:
            "https://archive.org/details/m.-morris-mano-morris-m-mano-digital-design-3r-book-zz.org/mode/2up?view=theater",
          downloadLink:
            "https://ia800504.us.archive.org/15/items/m.-morris-mano-morris-m-mano-digital-design-3r-book-zz.org/[M._Morris_Mano,_Morris_M_Mano]_Digital_Design_(3r(BookZZ.org).pdf",
          forCS: true,
          source: "local",
        },
        {
          id: 3,
          title:
            "Digital Design 5th Edition M Morris Mano And Michael D Ciletti",
          author: "M. Morris Mano",
          cover:
            "https://archive.org/services/img/digital-design-5th-edition-m-morris-mano-and-michael-d-ciletti",
          category: "study",
          viewLink:
            "https://archive.org/details/digital-design-5th-edition-m-morris-mano-and-michael-d-ciletti/mode/2up?view=theater",
          downloadLink:
            "https://ia800505.us.archive.org/25/items/digital-design-5th-edition-m-morris-mano-and-michael-d-ciletti/Digital%20Design%205th%20Edition%20-%20M%20Morris%20Mano%20and%20Michael%20D%20Ciletti.pdf",
          forCS: true,
          source: "local",
        },
        {
          id: 5,
          title: "Dynamic HTML",
          author: "Powers, Shelley",
          cover:
            "https://accsserver.netlify.app/images/images/html%20books/dynamichtml00powe.jpg",
          category: "study",
          viewLink:
            "https://archive.org/details/dynamichtml00powe/mode/2up?view=theater",
          downloadLink: "",
          forCS: true,
          source: "local",
        },
        {
          id: 6,
          title: "HTML",
          author: "Lovinfosse, Jean-Pierre",
          cover:
            "https://accsserver.netlify.app/images/images/html%20books/html0000lovi.jpg",
          category: "study",
          viewLink:
            "https://archive.org/details/html0000lovi/mode/2up?view=theater",
          downloadLink: "",
          forCS: true,
          source: "local",
        },
        {
          id: 7,
          title: "HTML",
          author: "Whitehead, Paul, 1965-; MaranGraphics Inc",
          cover:
            "https://accsserver.netlify.app/images/images/html%20books/html00paul.jpg",
          category: "study",
          viewLink:
            "https://archive.org/details/html00paul/mode/2up?view=theater",
          downloadLink: "",
          forCS: true,
          source: "local",
        },
        {
          id: 8,
          title: "HTML",
          author: "Schwarte, Joachim",
          cover:
            "https://accsserver.netlify.app/images/images/html%20books/html0000schw.jpg",
          category: "study",
          viewLink:
            "https://archive.org/details/html0000schw/mode/2up?view=theater",
          downloadLink: "",
          forCS: true,
          source: "local",
        },
        {
          id: 9,
          title: "HTML",
          author: "Wenz, Christian",
          cover:
            "https://accsserver.netlify.app/images/images/html%20books/html0000wenz.jpg",
          category: "study",
          viewLink:
            "https://archive.org/details/html0000wenz/page/n9/mode/2up?view=theater",
          downloadLink: "",
          forCS: true,
          source: "local",
        },
        {
          id: 10,
          title: "HTML",
          author: "Werle, Rainer",
          cover:
            "https://accsserver.netlify.app/images/images/html%20books/html0000werl.jpg",
          category: "study",
          viewLink:
            "https://archive.org/details/html0000werl/mode/2up?view=theater",
          downloadLink: "",
          forCS: true,
          source: "local",
        },
        {
          id: 11,
          title: "HTML 4.0 made simple",
          author: "McBride, Peter K",
          cover:
            "https://accsserver.netlify.app/images/images/html%20books/html40madesimple0000mcbr.jpg",
          category: "study",
          viewLink:
            "https://archive.org/details/html40madesimple0000mcbr/mode/2up?view=theater",
          downloadLink: "",
          forCS: true,
          source: "local",
        },
      ];

      setBooks(booksData);
      setLoading(false);
    };

    fetchBooks();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("digital-library-page");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Filter books based on current source and criteria
  const getDisplayBooks = () => {
    if (searchSource === "local") {
      return books.filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
          activeFilter === "all" ||
          (activeFilter === "cs" && book.forCS) ||
          activeFilter === book.category;

        return matchesSearch && matchesFilter;
      });
    }
    return openLibraryBooks;
  };

  const filteredBooks = getDisplayBooks();

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookClick = (book) => {
    book.source === "openLibrary"
      ? setSelectedOpenLibraryBook(book)
      : setSelectedBook(book);
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
    setSelectedOpenLibraryBook(null);
  };

  const handleSourceChange = (source) => {
    setSearchSource(source);
    setCurrentPage(1);
    setSearchTerm("");
    setOpenLibrarySearchTerm("");
  };

  const handleSearch = () => {
    if (searchSource === "openLibrary") {
      fetchOpenLibraryBooks(openLibrarySearchTerm);
    }
    setCurrentPage(1);
  };

  const filters = [
    { id: "all", name: "All Books", icon: faBook },
    { id: "study", name: "Study Books", icon: faBookOpen },
    { id: "story", name: "Story Books", icon: faBook },
    { id: "comic", name: "Comics", icon: faLaughSquint },
    { id: "cs", name: "CS Students", icon: faLaptopCode },
  ];

  // Handle book actions
  const handleBookAction = (e, url, actionType) => {
    e.preventDefault();
    console.log(`${actionType} book:`, url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main
      id="digital-library-page"
      className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faBook} className="mr-2" />
            Digital Library
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Explore Our Collection
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Browse through thousands of books, research papers, and academic
            resources.
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Source Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-sm mx-auto mb-6"
        >
          <div className="bg-white shadow-md rounded-xl p-1 flex">
            <button
              onClick={() => handleSourceChange("local")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                searchSource === "local"
                  ? "bg-indigo-600 text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              Our Collection
            </button>
            <button
              onClick={() => handleSourceChange("openLibrary")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                searchSource === "openLibrary"
                  ? "bg-indigo-600 text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              Open Library
            </button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 rounded-xl shadow-md border-0 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900"
                placeholder={
                  searchSource === "local"
                    ? "Search our collection by title or author..."
                    : "Search Open Library by title, author, or subject..."
                }
                value={
                  searchSource === "local" ? searchTerm : openLibrarySearchTerm
                }
                onChange={(e) =>
                  searchSource === "local"
                    ? setSearchTerm(e.target.value)
                    : setOpenLibrarySearchTerm(e.target.value)
                }
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-4 bg-indigo-600 text-white rounded-xl font-medium shadow-md hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faSearch} />
              <span>Search</span>
            </button>
          </div>
        </motion.div>

        {/* Filters - Only for local collection */}
        {searchSource === "local" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setCurrentPage(1);
                }}
                className={`px-5 py-3 rounded-full font-medium shadow transition-all flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={filter.icon} />
                <span>{filter.name}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Books Grid */}
        {loading || (searchSource === "openLibrary" && openLibraryLoading) ? (
          <div className="flex flex-col justify-center items-center h-64">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-4xl text-indigo-600 mb-4"
            />
            <p className="text-gray-600">Loading books...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold mb-2">No books found</h3>
            <p className="text-gray-600">
              {searchSource === "local"
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Try searching for a book title, author, or subject in Open Library."}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {currentBooks.map((book, index) => (
              <motion.div
                key={book.id || book.olid}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                onClick={() => handleBookClick(book)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="relative pb-[140%]">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-book.jpg";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-1">
                    {book.author}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {filteredBooks.length > booksPerPage && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === pageNumber
                        ? "bg-indigo-600 text-white font-medium"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="px-2">...</span>
              )}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === totalPages
                      ? "bg-indigo-600 text-white font-medium"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
              </button>
            </nav>
          </div>
        )}

        {/* Last Updated Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            <span>
              Library updated weekly - Last updated:{" "}
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Book Popup Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClosePopup}
            ></div>
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative z-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="h-6 w-6" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 bg-gray-100">
                  <img
                    src={selectedBook.cover}
                    alt={selectedBook.title}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-book.jpg";
                    }}
                  />
                </div>
                <div className="p-6 w-full md:w-2/3">
                  <h3 className="text-xl font-bold mb-4">
                    {selectedBook.title}
                  </h3>
                  <p className="text-gray-700 mb-2">{selectedBook.author}</p>

                  <div className="flex flex-col gap-4 mt-8">
                    <a
                      href={selectedBook.viewLink}
                      onClick={(e) =>
                        handleBookAction(e, selectedBook.viewLink, "view")
                      }
                      className="px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium transition-colors hover:bg-indigo-500 flex items-center justify-center gap-2"
                    >
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                      <span>View Book</span>
                    </a>
                    <a
                      href={selectedBook.downloadLink}
                      onClick={(e) =>
                        handleBookAction(
                          e,
                          selectedBook.downloadLink,
                          "download"
                        )
                      }
                      className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors hover:bg-gray-300 flex items-center justify-center gap-2"
                    >
                      <FontAwesomeIcon icon={faDownload} className="h-4 w-4" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open Library Book Modal */}
      <AnimatePresence>
        {selectedOpenLibraryBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClosePopup}
            ></div>
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative z-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-10"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="h-6 w-6" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 bg-gray-100">
                  <img
                    src={selectedOpenLibraryBook.cover}
                    alt={selectedOpenLibraryBook.title}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-book.jpg";
                    }}
                  />
                </div>
                <div className="p-6 w-full md:w-2/3">
                  <h3 className="text-xl font-bold mb-4">
                    {selectedOpenLibraryBook.title}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    {selectedOpenLibraryBook.author}
                  </p>
                  {selectedOpenLibraryBook.year && (
                    <p className="text-gray-600 text-sm mb-4">
                      First published: {selectedOpenLibraryBook.year}
                    </p>
                  )}

                  <div className="flex flex-col gap-4 mt-4">
                    <a
                      href={selectedOpenLibraryBook.openLibraryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium transition-colors hover:bg-indigo-500 flex items-center justify-center gap-2"
                    >
                      <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="h-4 w-4"
                      />
                      <span>View on Open Library</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
