import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faGraduationCap, 
  faArrowRight, 
  faBell, 
  faChevronDown,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Pages',
      href: '/pages',
      dropdown: [
        { name: 'Gallery', href: '/gallery' },
        { name: 'Team', href: '/team' },
        { name: 'Events', href: '/event' },
        { name: 'Testimonials', href: '/testimonial' },
        { name: 'FAQ', href: '/faq' },
      ]
    },
    {
      name: 'Features',
      href: '/features',
      dropdown: [
        { 
          name: 'PDF Tools', 
          href: '/features/pdf',
          subDropdown: [
            { name: 'PDF Merger', href: '/features/pdf/merger' },
            { name: 'PDF Splitter', href: '/features/pdf/splitter' },
            { name: 'PDF to Word', href: '/features/pdf/to-word' },
            { name: 'PDF Compressor', href: '/features/pdf/compressor' },
          ]
        },
        { 
          name: 'Productivity Tools', 
          href: '/features/productivity',
          subDropdown: [
            { name: 'Task Manager', href: '/features/productivity/tasks' },
            { name: 'Note Taking', href: '/features/productivity/notes' },
            { name: 'Calendar', href: '/features/productivity/calendar' },
            { name: 'Focus Timer', href: '/features/productivity/pomodoro' },
          ]
        },
        { 
          name: 'Academic Tools', 
          href: '/features/academic',
          subDropdown: [
            { name: 'Citation Generator', href: '/features/academic/citations' },
            { name: 'Plagiarism Checker', href: '/features/academic/plagiarism' },
            { name: 'Flash Cards', href: '/features/academic/flashcards' },
            { name: 'Study Planner', href: '/features/academic/planner' },
          ]
        },
        { 
          name: 'Dev Tools', 
          href: '/features/dev',
          subDropdown: [
            { name: 'Code Formatter', href: '/features/dev/formatter' },
            { name: 'JSON Validator', href: '/features/dev/json' },
            { name: 'Color Picker', href: '/features/dev/colors' },
            { name: 'Regex Tester', href: '/features/dev/regex' },
          ]
        },
        { name: 'Sticky Notes', href: '/features/sticky-notes' },
        { name: 'QR Code Generator', href: '/features/qr' },
        { name: 'Search System', href: '/features/search' }
      ]
    },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Handle mouse events for desktop dropdowns
  const handleMouseEnter = (linkName, subMenuName = null) => {
    setActiveDropdown(linkName);
    setActiveSubDropdown(subMenuName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  // Handle mobile dropdown clicks
  const toggleMobileDropdown = (linkName) => {
    setActiveDropdown(activeDropdown === linkName ? null : linkName);
    setActiveSubDropdown(null);
  };

  const toggleMobileSubDropdown = (e, subMenuName) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSubDropdown(activeSubDropdown === subMenuName ? null : subMenuName);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white/80 backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo with tagline */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faGraduationCap} 
                className="h-9 w-9 text-indigo-600 group-hover:text-indigo-700 transition-all duration-300" 
              />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
              </span>
            </div>
            <div className="transition-all duration-300">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">BitLearning</h1>
              <p className="text-xs text-gray-500 hidden sm:block group-hover:text-indigo-600 transition-colors">Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={link.href}
                  className={`px-4 py-2 font-medium text-sm rounded-lg transition-all flex items-center ${
                    activeDropdown === link.name
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                  {link.dropdown && (
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`ml-1 h-4 w-4 transition-transform ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute left-0 mt-1 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                    <div className="py-1">
                      {link.dropdown.map((item) => (
                        <div 
                          key={item.name}
                          className="relative group"
                          onMouseEnter={() => item.subDropdown && handleMouseEnter(link.name, item.name)}
                        >
                          <Link
                            to={item.href}
                            className={`flex justify-between items-center px-4 py-2 text-sm ${
                              activeSubDropdown === item.name
                                ? 'text-indigo-600 bg-indigo-50'
                                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                            }`}
                          >
                            {item.name}
                            {item.subDropdown && (
                              <FontAwesomeIcon 
                                icon={faChevronRight} 
                                className={`ml-1 h-3 w-3 transition-transform ${
                                  activeSubDropdown === item.name ? 'rotate-90' : ''
                                }`} 
                              />
                            )}
                          </Link>

                          {/* Sub-dropdown Menu */}
                          {item.subDropdown && activeSubDropdown === item.name && (
                            <div className="absolute left-full top-0 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                              <div className="py-1">
                                {item.subDropdown.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Divider and CTA Button */}
            <div className="ml-4 pl-4 border-l border-gray-200 flex items-center">
              <Link to="./auth/register" className="group flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                <span>Register</span>
              </Link>

              {/* Notification Bell */}
              <button className="ml-3 relative p-2 text-gray-500 hover:text-indigo-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl rounded-b-lg pb-4 mt-2 border-t border-gray-100 animate-fadeDown">
            <nav className="flex flex-col space-y-1 px-4 pt-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.href}
                    className="flex justify-between items-center px-4 py-3 text-gray-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-gray-50"
                    onClick={(e) => {
                      if (link.dropdown) {
                        e.preventDefault();
                        toggleMobileDropdown(link.name);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    {link.name}
                    {link.dropdown && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`h-4 w-4 transition-transform ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* Mobile Dropdown */}
                  {link.dropdown && activeDropdown === link.name && (
                    <div className="pl-4 py-2 space-y-1 bg-gray-50 rounded-lg mt-1 mb-2">
                      {link.dropdown.map((item) => (
                        <div key={item.name}>
                          <Link
                            to={item.href}
                            className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg"
                            onClick={(e) => {
                              if (item.subDropdown) {
                                toggleMobileSubDropdown(e, item.name);
                              } else {
                                setMobileMenuOpen(false);
                              }
                            }}
                          >
                            {item.name}
                            {item.subDropdown && (
                              <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`h-3 w-3 transition-transform ${
                                  activeSubDropdown === item.name ? 'rotate-180' : ''
                                }`}
                              />
                            )}
                          </Link>

                          {/* Mobile Sub-Dropdown */}
                          {item.subDropdown && activeSubDropdown === item.name && (
                            <div className="pl-4 py-1 space-y-1 bg-gray-100 rounded-lg mt-1 mb-1">
                              {item.subDropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="block px-4 py-2 text-xs text-gray-700 hover:text-indigo-600 hover:bg-gray-200 rounded-lg"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="px-4 pt-3">
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 w-full shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}