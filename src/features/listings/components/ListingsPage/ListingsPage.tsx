import { useSearchContext } from '../../../../context/SearchContext';
import PropertyGrid from '../PropertyGrid/PropertyGrid';
import { mockListings } from '../../data/mockListings';
import './ListingsPage.css';

const ListingsPage: React.FC = () => {
    const { searchResults, apiListings, searchQuery, clearSearch } = useSearchContext();

    // Priority: API data > URL results > mock data
    const hasApiData = apiListings.length > 0;
    const hasUrlResults = searchResults.length > 0;

    const displayData = hasApiData
        ? apiListings
        : hasUrlResults
        ? searchResults
        : mockListings;

    const dataSource = hasApiData ? 'api' : hasUrlResults ? 'urls' : 'mock';

    return (
        <div className="listings-page">
            <div className="listings-page-header">
                <h1>
                    {hasApiData && `${apiListings.length} Properties in ${searchQuery}`}
                    {!hasApiData && hasUrlResults && `${searchResults.length} Properties Found`}
                    {!hasApiData && !hasUrlResults && 'Browse Property Listings'}
                </h1>
                <p>
                    {hasApiData && 'Real-time property data from RentCast API'}
                    {!hasApiData && hasUrlResults && 'Click links to view property details'}
                    {!hasApiData && !hasUrlResults && 'Explore featured properties or use AI search to find listings tailored to your specific needs.'}
                </p>
                {(hasApiData || hasUrlResults) && (
                    <button onClick={clearSearch} className="clear-search-btn">
                        Clear Search & View Featured Listings
                    </button>
                )}
            </div>
            <PropertyGrid
                listings={displayData}
                isSearchResults={dataSource === 'urls'}
            />
        </div>
    );
};

export default ListingsPage;