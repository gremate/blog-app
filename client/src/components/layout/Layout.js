import '../../styles/layout/layout.scss';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="page-container">
            <Header />
            <div className="route-content">
                {children}
            </div>
            <Footer />
        </div>
    );
}
