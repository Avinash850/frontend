import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

const App = () => {
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const renderPage = () => {
        const path = route.split('/');
        
        if (path[0] === '#') {
            switch (path[1]) {
                case 'search':
                    if (path[2] && path[3]) {
                        return <SearchResultsPage location={path[2]} specialty={path[3]} />;
                    }
                    break;
                case 'doctor':
                    if (path[2]) {
                        return <DoctorProfilePage slug={path[2]} />;
                    }
                    break;
                case 'doctors':
                    return <DoctorsPage />;
                case 'terms':
                    return <TermsPage />;
                case 'privacy':
                    return <PrivacyPolicyPage />;
                case '':
                default:
                    return <HomePage />;
            }
        }
        return <HomePage />;
    };

    return (
        <Layout>
            {renderPage()}
        </Layout>
    );
};

export default App;
