import type { SearchResult } from '../../../../context/SearchContext';
import './SearchResultCard.css';

interface SearchResultCardProps {
    result: SearchResult;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
    const placeholderImage = "https://placehold.co/600x400/0077b6/ffffff/png?text=View+Property";
    const hostname = new URL(result.url).hostname.replace('www.', '');

    return (
        <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="search-result-card-link"
        >
            <article className="property-card search-result-card">
                <div className="property-card-image">
                    <img src={placeholderImage} alt="Property listing" />
                    <div className="property-card-badge">External Link</div>
                </div>
                <div className="property-card-content">
                    <h3 className="property-card-title">Property on {result.site}</h3>
                    <p className="property-card-location">
                        Click to view details on {hostname}
                    </p>
                    <div className="property-card-url">
                        <span>🔗 {hostname}</span>
                    </div>
                </div>
            </article>
        </a>
    );
};

export default SearchResultCard;
