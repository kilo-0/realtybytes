import PropertyCard from '../PropertyCard/PropertyCard';
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import { useFavorites } from '../../hooks/useFavorites';
import type { Listing } from '../../types';
import type { SearchResult } from '../../../../context/SearchContext';
import './PropertyGrid.css';

interface PropertyGridProps {
    listings: (Listing | SearchResult)[];
    isSearchResults?: boolean;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
    listings,
    isSearchResults = false
}) => {
    const { favorites, toggleFavorite, isLoading } = useFavorites();

    if (isLoading) {
        return <div>Loading properties...</div>;
    }

    return (
        <div className="property-grid">
            {listings.map((item, index) => {
                // Check if item is a SearchResult (has 'url' and 'site' properties)
                if (isSearchResults && 'url' in item && 'site' in item) {
                    return <SearchResultCard key={index} result={item as SearchResult} />;
                } else {
                    // Regular Listing
                    const listing = item as Listing;
                    return (
                        <PropertyCard
                            key={listing.id}
                            listing={listing}
                            isFavorite={favorites.has(listing.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    );
                }
            })}
        </div>
    );
};

export default PropertyGrid;