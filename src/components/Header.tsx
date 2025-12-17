import React, { useState, useEffect } from 'react';
import comp_logo from '../assets/images/logo/comp_logo.png';

const Header = () => {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const updateActiveTab = () => {
      const currentHash = window.location.hash;
      setActiveTab(currentHash);
    };

    // Initialize active tab on page load
    updateActiveTab();

    // Listen for changes in the URL hash
    window.addEventListener('hashchange', updateActiveTab);

    return () => {
      // Clean up event listener when component is unmounted
      window.removeEventListener('hashchange', updateActiveTab);
    };
  }, []);

  const navigateHome = () => {
    window.location.hash = 'http://localhost:5173/';
  };

  const getActiveClass = (tab) => {
    return activeTab === tab ? 'text-indigo-600' : 'text-gray-600';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <button onClick={navigateHome} className="focus:outline-none" aria-label="Go to Homepage">
            <img src={comp_logo} alt="Prega Journey" className="h-10" />
          </button>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {/* <a href="#/doctors" className={`hover:text-indigo-600 ${getActiveClass('#/doctors')}`}>Find Doctors</a> */}
          <a href="#/video-consult" className={`hover:text-indigo-600 ${getActiveClass('#/video-consult')}`}>Video Consult</a>
          <a href="#/lab-tests" className={`hover:text-indigo-600 ${getActiveClass('#/lab-tests')}`}>Lab Tests</a>
          <a href="#/blogs" className={`hover:text-indigo-600 ${getActiveClass('#/blogs')}`}>Blogs</a>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#/login" className="text-gray-600 hover:text-indigo-600">Login</a>
        </div>
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;