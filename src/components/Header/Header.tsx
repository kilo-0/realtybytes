
import React from 'react';
import './Header.css';
import { BuildingIcon } from '../Icons/BuildingIcon';

interface HeaderProps {
    onNavigate: (page: 'home' | 'listings') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    return (
        <header className="main-header">
            <div className="header-content">
                <div className="logo-container" onClick={() => onNavigate('home')} title="Go to home page">
                    <BuildingIcon />
                    <h1>RealtyBytes</h1>
                </div>
                <nav className="header-nav">
                    <a href="#/listings" onClick={(e) => { e.preventDefault(); onNavigate('listings'); }}>
                        Browse Listings
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;