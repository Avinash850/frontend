import React from 'react';

const Header = () => {
  const navigateHome = () => {
    window.location.hash = '#/';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <button onClick={navigateHome} className="focus:outline-none" aria-label="Go to Homepage">
            <img src="https://pregajourney.com/wp-content/uploads/2024/08/logo.png" alt="Prega Journey Logo" className="h-10" />
          </button>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#/doctors" className="text-gray-600 hover:text-indigo-600">Find Doctors</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600">Video Consult</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600">Lab Tests</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600">Pharmacy</a>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-indigo-600">Login / Signup</a>
        </div>
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;