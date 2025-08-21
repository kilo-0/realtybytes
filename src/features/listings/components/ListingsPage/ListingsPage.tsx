
import React from 'react';
import PropertyGrid from '../PropertyGrid/PropertyGrid';
import './ListingsPage.css';

const ListingsPage: React.FC = () => {
    return (
        <div className="listings-page">
            <div className="listings-page-header">
                <h1>Browse Property Listings</h1>
                <p>Explore a selection of featured properties. Use our AI search to find listings tailored to your specific needs.</p>
            </div>
            <PropertyGrid />
        </div>
    );
};

export default ListingsPage;