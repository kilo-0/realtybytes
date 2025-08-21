import React from 'react';
import './AIResult.css';
import { GlobeIcon } from '../../../../components/Icons/GlobeIcon';

// Define SearchResults locally to avoid import issues
interface SearchResults {
    [site: string]: string[];
}

interface AIResultProps {
    results: SearchResults;
    onViewProcess: () => void;
}

const AIResult: React.FC<AIResultProps> = ({ results, onViewProcess }) => {
    const totalFound = Object.values(results).flat().length;
    const placeholderImage = "https://placehold.co/600x400/0077b6/FFF/png?text=View+Property";

    const getHost = (url: string) => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return '';
        }
    }

    return (
        <div className="ai-result">
            <div className="ai-result-header">
                <GlobeIcon />
                <div className="ai-result-header-text">
                    <h2>AI Search Complete</h2>
                    <p>
                        {totalFound > 0
                            ? `I found ${totalFound} properties across ${Object.keys(results).length} site(s) for you.`
                            : "I couldn't find specific listings, but the sites below are your best starting point."}
                    </p>
                </div>
            </div>

            {totalFound > 0 ? (
                <div className="ai-result-sites-container">
                    {Object.entries(results).map(([site, urls]) => (
                        urls.length > 0 && (
                            <section key={site} className="ai-site-section">
                                <h3 className="ai-site-title">
                                    <a href={`https://${site}`} target="_blank" rel="noopener noreferrer">
                                        Results from {site}
                                    </a>
                                </h3>
                                <div className="ai-property-grid">
                                    {urls.map((url, index) => (
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="ai-property-card" key={index}>
                                            <div className="ai-property-card-thumbnail">
                                                <img src={placeholderImage} alt="Property placeholder" loading="lazy" />
                                            </div>
                                            <div className="ai-property-card-info">
                                                <p>{getHost(url)}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )
                    ))}
                </div>
            ) : (
                <div className="no-results-container">
                    <p className="no-results-message">
                        While the AI couldn't pinpoint exact listings, it identified these top-tier sites for your search area. Explore them directly for the best results.
                    </p>
                    <div className="ai-property-grid">
                        {Object.keys(results).map((site) => (
                            <a href={`https://${site}`} target="_blank" rel="noopener noreferrer" className="ai-property-card site-only" key={site}>
                                <div className="ai-property-card-thumbnail">
                                    <img src={placeholderImage} alt="Website placeholder" loading="lazy" />
                                </div>
                                <div className="ai-property-card-info">
                                    <p>Visit {site}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <div className="ai-result-footer">
                <button onClick={onViewProcess} className="view-process-button">
                    View AI Search Process
                </button>
            </div>
        </div>
    );
};

export default AIResult;