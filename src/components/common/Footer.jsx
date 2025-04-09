import React from 'react';
import { href, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

// Social media icons (same as before)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.352.3-.88.344-1.857.048-1.054.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.881-.3-1.857-.344-1.054-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M23.498 6.186a2.956 2.956 0 0 0-2.08-2.088C19.597 3.5 12 3.5 12 3.5s-7.597 0-9.418.598a2.956 2.956 0 0 0-2.08 2.088A30.3 30.3 0 0 0 0 12a30.3 30.3 0 0 0 .502 5.814 2.956 2.956 0 0 0 2.08 2.088C4.403 20.5 12 20.5 12 20.5s7.597 0 9.418-.598a2.956 2.956 0 0 0 2.08-2.088A30.3 30.3 0 0 0 24 12a30.3 30.3 0 0 0-.502-5.814zM9.75 15.02V8.98l6.25 3.02-6.25 3.02z" />
  </svg>
);


export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-gray-300">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg 
          preserveAspectRatio="none" 
          viewBox="0 0 1200 120" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ width: '100%', height: '40px', transform: 'rotate(180deg)' }}
          className="fill-white dark:fill-slate-900"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto pt-20 pb-16 px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Company Info Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg mr-3">
                <FontAwesomeIcon icon={faGraduationCap} className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">BitLearning</h2>
            </div>
            
            <p className="text-gray-400 max-w-md">
              Empowering students through personalized education site. Our mission is to unlock every student's full potential through innovative teaching methods and personalized attention.
            </p>
            
            {/* Awards & Recognition */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-slate-800/50 px-4 py-2 rounded-full">
                <span className="text-yellow-400 mr-2">★</span>
                <span className="text-xs">High Featured</span>
              </div>
              <div className="flex items-center bg-slate-800/50 px-4 py-2 rounded-full">
                <span className="text-blue-400 mr-2">🏆</span>
                <span className="text-xs">Excellence Performance</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-4 text-white">Connect With Us</h4>
              <div className="flex gap-4">
              <a href="https://www.youtube.com/c/CSwithSANJOY" aria-label="YouTube" className="bg-slate-800 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-400 p-3 rounded-full transition-all duration-300 text-gray-400 hover:text-white">
                  <YouTubeIcon />
                </a>
                <a href="https://www.facebook.com/cswithsanjoy" aria-label="Facebook" className="bg-slate-800 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 text-gray-400 hover:text-white">
                  <FacebookIcon />
                </a>
                <a href="#" aria-label="Twitter" className="bg-slate-800 hover:bg-blue-400 p-3 rounded-full transition-all duration-300 text-gray-400 hover:text-white">
                  <TwitterIcon />
                </a>
                <a href="#" aria-label="Instagram" className="bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 p-3 rounded-full transition-all duration-300 text-gray-400 hover:text-white">
                  <InstagramIcon />
                </a>
                <a href="https://www.linkedin.com/in/sanjoyghoshcs" aria-label="LinkedIn" className="bg-slate-800 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 text-gray-400 hover:text-white">
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>
          
          {/* Links & Contact Section - Middle */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-blue-500/30">Quick Links</h3>
             <ul className="space-y-3">
    <li>
      <a 
        href="/"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>Home</span>
      </a>
    </li>
    <li>
      <a 
        href="/about"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>About</span>
      </a>
    </li>
    <li>
      <a 
        href="/whyus"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>Why Us</span>
      </a>
    </li>
    <li>
      <a 
        href="/team"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>Team</span>
      </a>
    </li>
    <li>
      <a 
        href="/gallery"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>Gallery</span>
      </a>
    </li>
    <li>
      <a 
        href="/faq"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>FAQ</span>
      </a>
    </li>
    <li>
      <a 
        href="/contact"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>Contact</span>
      </a>
    </li>
  </ul>
</div>
            
            {/* Programs */}
            <div>
  <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-blue-500/30">
    External Links
  </h3>
  <ul className="space-y-3">
    <li>
      <a 
        href="https://www.caluniv.ac.in/"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>University Of Calcutta</span>
      </a>
    </li>
    <li>
      <a 
        href="https://www.caluniv.ac.in/student/college.html"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>Affiliated Colleges</span>
      </a>
    </li>
    <li>
      <a 
        href="https://ndl.iitkgp.ac.in/"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>NDLI</span>
      </a>
    </li>
    <li>
      <a 
        href="/comingsoon"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>Student Club</span>
      </a>
    </li>
    <li>
      <a 
        href="/comingsoon"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>Join Community</span>
      </a>
    </li>
    <li>
      <a 
        href="/comingsoon"
        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
      >
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" 
        />
        <span>University Result</span>
      </a>
    </li>
  </ul>
</div>








          </div>
          
          {/* Newsletter & Contact - Right Side */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-blue-500/30">Get In Touch</h3>
              
              {/* Contact Information */}
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-600/20 p-2 rounded-lg mr-3 mt-1">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Our Location</h4>
                    <p className="text-sm text-gray-400 mt-1">123 Education Ave, Learning City, ST 12345</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-600/20 p-2 rounded-lg mr-3 mt-1">
                    <FontAwesomeIcon icon={faPhone} className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Phone Number</h4>
                    <p className="text-sm text-gray-400 mt-1">(123) 456-7890</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-600/20 p-2 rounded-lg mr-3 mt-1">
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Email Address</h4>
                    <p className="text-sm text-gray-400 mt-1">info@brightminds.com</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-600/20 p-2 rounded-lg mr-3 mt-1">
                    <FontAwesomeIcon icon={faClock} className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Working Hours</h4>
                    <p className="text-sm text-gray-400 mt-1">Mon-Fri: 9am-7pm<br />Sat: 10am-3pm</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Newsletter Bar */}
        <div className="mt-16 p-6 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-xl flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-white">Subscribe to our newsletter</h3>
            <p className="text-gray-400 text-sm">Get the latest updates and resources</p>
          </div>
          <div className="w-full md:w-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full md:w-64 px-4 py-3 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
            />
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-r-lg transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Bottom Section & Copyright */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BitLearning. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Page Created By Sulagna Pradhan
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
            <a href="/support" className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300">Support</a>
            <a href="/sitemap" className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-300">Sitemap</a>
          </div>
        </div>
      </div>
      
      {/* Bottom design element */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 h-1.5"></div>
    </footer>
  );
}