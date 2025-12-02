import { useSearchContext } from '../../../../context/SearchContext';
import PropertyGrid from '../PropertyGrid/PropertyGrid';
import { mockListings } from '../../data/mockListings';
import './ListingsPage.css';

const ListingsPage: React.FC = () => {
    const { searchResults, searchQuery, clearSearch } = useSearchContext();
    const hasSearchResults = searchResults.length > 0;

    // Determine what to display
    const displayData = hasSearchResults ? searchResults : mockListings;
    const isShowingSearchResults = hasSearchResults;

    return (
        <div className="listings-page">
            <div className="listings-page-header">
                <h1>
                    {isShowingSearchResults
                        ? `Search Results: ${searchQuery}`
                        : 'Browse Property Listings'}
                </h1>
                <p>
                    {isShowingSearchResults
                        ? `Found ${searchResults.length} properties`
                        : 'Explore featured properties or use AI search to find listings tailored to your specific needs.'}
                </p>
                {isShowingSearchResults && (
                    <button
                        onClick={clearSearch}
                        className="clear-search-btn"
                    >
                        Clear Search Results
                    </button>
                )}
            </div>
            <PropertyGrid
                listings={displayData}
                isSearchResults={isShowingSearchResults}
            />
        </div>
    );
};

export default ListingsPage;