
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>RealtyBytes</h3>
                    <p>&copy; 2024 RealtyBytes. All rights reserved.</p>
                    <p>Your AI-powered copilot for finding the perfect home.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#/">Home</a></li>
                        <li><a href="#/">About Us</a></li>
                        <li><a href="#/">Contact</a></li>
                        <li><a href="#/">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Data Sources & Inspiration</h4>
                    <p>Our AI guides you to leading real estate portals worldwide, such as <a href="https://www.zillow.com/browse/homes/" target="_blank" rel="noopener noreferrer">[zillow.com]</a>.</p>
                    <p>Inspired by AI-driven platforms like <a href="https://buyproperty.com/en" target="_blank" rel="noopener noreferrer">BuyProperty.com</a> and neighborhood analysis tools like <a href="https://www.hoodpicker.com/" target="_blank" rel="noopener noreferrer">Hoodpicker</a>.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;