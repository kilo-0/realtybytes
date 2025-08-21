import React from 'react';
import Carousel from '../../../../components/Carousel/Carousel';
import { HeartIcon } from '../../../../components/Icons/HeartIcon';
import './PropertyCard.css';

// Define Listing locally to avoid import issues
interface Listing {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    url: string;
    type: string;
    area: number;
}

interface PropertyCardProps {
    listing: Listing;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);
};

const PropertyCard: React.FC<PropertyCardProps> = ({ listing, isFavorite, onToggleFavorite }) => {

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(listing.id);
    };

    return (
        <a href={listing.url} target="_blank" rel="noopener noreferrer" className="property-card-link">
            <article className="property-card">
                <Carousel images={listing.images} title={listing.title} />
                <div className="property-card-content">
                    <div className="property-card-header">
                        <span className="property-card-price">{formatPrice(listing.price)}</span>
                        <button
                            className="favorite-button"
                            onClick={handleFavoriteClick}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <HeartIcon isFavorite={isFavorite} />
                        </button>
                    </div>

                    <h3 className="property-card-title">{listing.title}</h3>
                    <p className="property-card-location">{listing.location}</p>

                    <div className="property-card-details">
                        <span>Type: <span className="property-card-spec">{listing.type}</span></span>
                        <span>Area: <span className="property-card-spec">{listing.area} m�</span></span>
                    </div>
                </div>
            </article>
        </a>
    );
};

export default PropertyCard;