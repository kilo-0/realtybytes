import React from 'react';
import { mockListings } from '../../data/mockListings';
import PropertyCard from '../PropertyCard/PropertyCard';
import { useFavorites } from '../../hooks/useFavorites';
import './PropertyGrid.css';

const PropertyGrid: React.FC = () => {
    const { favorites, toggleFavorite, isLoading } = useFavorites();

    if (isLoading) {
        return <div>Loading properties...</div>;
    }

    return (
        <div className="property-grid">
            {mockListings.map((listing) => (
                <PropertyCard
                    key={listing.id}
                    listing={listing}
                    isFavorite={favorites.has(listing.id)}
                    onToggleFavorite={toggleFavorite}
                />
            ))}
        </div>
    );
};

export default PropertyGrid;