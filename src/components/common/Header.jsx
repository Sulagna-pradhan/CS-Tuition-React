import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faGraduationCap, 
  faArrowRight, 
  faBell, 
  faChevronDown 
} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
        { name: 'Events', href: '/event' },
        { name: 'Testimonials', href: '/testimonials' },
      ]
    },
    {
      name: 'Features',
      href: '/features',
      dropdown: [
        { name: 'Sticky Notes', href: '/features/sticky-notes' },
        { name: 'QR Code Generator', href: '/features/qr' },
        { name: 'Search System', href: '/features/search' }
      ]
    },
    { name: 'Contact Us', href: '/contact' },
  ];

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
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">Bright Minds</h1>
              <p className="text-xs text-gray-500 hidden sm:block group-hover:text-indigo-600 transition-colors">Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
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
                  <div className="absolute left-0 mt-1 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Divider and CTA Button */}
            <div className="ml-4 pl-4 border-l border-gray-200 flex items-center">
              <Link to="/login" className="group flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                <span>Login</span>
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
                    onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                  >
                    {link.name}
                    {link.dropdown && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`h-4 w-4 transition-transform ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === link.name ? null : link.name);
                        }}
                      />
                    )}
                  </Link>

                  {/* Mobile Dropdown */}
                  {link.dropdown && activeDropdown === link.name && (
                    <div className="pl-4 py-2 space-y-1 bg-gray-50 rounded-lg mt-1 mb-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
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