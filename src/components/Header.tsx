import React, { useState, useEffect } from 'react';
import comp_logo from '../assets/images/logo/comp_logo.png';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateActiveTab = () => {
      setActiveTab(window.location.pathname);
    };

    updateActiveTab();
    window.addEventListener('popstate', updateActiveTab);

    return () => {
      window.removeEventListener('popstate', updateActiveTab);
    };
  }, []);

  const navigateHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const getActiveClass = (tab) =>
    activeTab === tab ? 'text-indigo-600' : 'text-gray-600';

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={navigateHome} className="focus:outline-none">
          <img src={comp_logo} alt="Prega Journey" className="h-10" />
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleNavigate('/video-consult')} className={`hover:text-indigo-600 ${getActiveClass('/video-consult')}`}>Video Consult</button>
          <button onClick={() => handleNavigate('/lab-tests')} className={`hover:text-indigo-600 ${getActiveClass('/lab-tests')}`}>Lab Tests</button>
          <button onClick={() => handleNavigate('/blogs')} className={`hover:text-indigo-600 ${getActiveClass('/blogs')}`}>Blogs</button>
        </nav>

        <div className="hidden md:flex">
          <button onClick={() => handleNavigate('/login')} className="text-gray-600 hover:text-indigo-600">Login</button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <button onClick={() => handleNavigate('/video-consult')} className="block w-full text-left text-gray-600 hover:text-indigo-600">Video Consult</button>
          <button onClick={() => handleNavigate('/lab-tests')} className="block w-full text-left text-gray-600 hover:text-indigo-600">Lab Tests</button>
          <button onClick={() => handleNavigate('/blogs')} className="block w-full text-left text-gray-600 hover:text-indigo-600">Blogs</button>
          <button onClick={() => handleNavigate('/login')} className="block w-full text-left text-gray-600 hover:text-indigo-600">Login</button>
        </div>
      )}
    </header>
  );
};

export default Header;