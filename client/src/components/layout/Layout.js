import '../../styles/layout/layout.scss';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Loader from './Loader';

export default function Layout({ children }) {
    return (
        <div className="page-container">
            <Loader />
            <Header />
            <div className="route-content">
                {children}
            </div>
            <Footer />
        </div>
    );
}
