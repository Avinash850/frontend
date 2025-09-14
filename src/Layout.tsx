import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = ({ children }) => (
    <div className="antialiased text-slate-800">
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;
