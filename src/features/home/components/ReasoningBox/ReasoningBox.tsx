
import React, { useState, useEffect, useRef } from 'react';
import './ReasoningBox.css';
import AIResult from '../AIResult/AIResult';

// Define types locally to avoid import issues
type SearchStep = 'idle' | 'extracting_location' | 'identifying_sites' | 'searching_sites' | 'complete' | 'error';

interface ReasoningLogEntry {
    type: 'prompt' | 'response' | 'info' | 'error';
    step: string;
    content: string;
}

interface SearchResults {
    [site: string]: string[];
}

interface ReasoningBoxProps {
    log: ReasoningLogEntry[];
    step: SearchStep;
    results: SearchResults;
    error: string | null;
    onReset: () => void;
}

const getStepTitle = (step: SearchStep): string => {
    switch (step) {
        case 'extracting_location': return "Thinking: Pinpointing location...";
        case 'identifying_sites': return "Thinking: Identifying relevant websites...";
        case 'searching_sites': return "Working: Searching websites for properties...";
        case 'complete': return "Done: Search complete!";
        case 'error': return "Halted: An error occurred";
        default: return "AI Search Assistant";
    }
};

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 1.25.52 2.37 1.38 3.18S10.25 11 12 11s2.62-.57 3.62-1.32C16.48 8.87 17 7.75 17 6.5A4.5 4.5 0 0 0 12 2z" />
        <path d="M12 11v1.5a4.5 4.5 0 0 0-4.5 4.5c0 1.63.88 3.05 2.16 3.82S12 22 12 22s1-1.18 2.34-1.18c1.34 0 2.16-1.74 2.16-3.82a4.5 4.5 0 0 0-4.5-4.5V11z" />
        <path d="M6.34 7.5a4.5 4.5 0 0 0-2.34 9.16C4 18.82 5 22 5 22s2.5-3.5 2.5-5.5a4.5 4.5 0 0 0-1.16-3Z" />
        <path d="M17.66 7.5a4.5 4.5 0 0 1 2.34 9.16C20 18.82 19 22 19 22s-2.5-3.5-2.5-5.5a4.5 4.5 0 0 1 1.16-3Z" />
    </svg>
);


const ReasoningBox: React.FC<ReasoningBoxProps> = ({ log, step, results, error, onReset }) => {
    const [showProcess, setShowProcess] = useState(true);
    const logEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // When search completes with results or successfully with no results, hide the process.
        if (step === 'complete') {
            setShowProcess(false);
        } else if (step !== 'idle' && step !== 'error') {
            setShowProcess(true);
        }
    }, [step]);

    useEffect(() => {
        if (showProcess) {
            logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [log, showProcess]);

    const isSearching = step === 'extracting_location' || step === 'identifying_sites' || step === 'searching_sites';

    const handleViewProcess = () => {
        setShowProcess(true);
    };

    return (
        <div className="reasoning-box">
            {step === 'complete' && !showProcess ? (
                <AIResult results={results} onViewProcess={handleViewProcess} />
            ) : (
                <>
                    <div className="reasoning-box-header">
                        <BrainIcon />
                        <div>
                            <h3 className="reasoning-box-title">{getStepTitle(step)}</h3>
                            <p className="reasoning-box-subtitle">
                                The AI agent is performing a multi-step search.
                            </p>
                        </div>
                        {step === 'complete' && showProcess && (
                            <button className="hide-process-button" onClick={() => setShowProcess(false)}>Show Results</button>
                        )}
                    </div>

                    <div className="reasoning-log-container">
                        {log.map((entry, index) => (
                            <div key={index} className={`log-entry log-entry-${entry.type}`}>
                                <div className="log-entry-header">
                                    <span className="log-entry-type">{entry.type}</span>
                                    <span className="log-entry-step">{entry.step}</span>
                                </div>
                                <div className="log-entry-content">
                                    <pre>{entry.content}</pre>
                                </div>
                            </div>
                        ))}
                        {isSearching && (
                            <div className="loading-indicator">
                                <div className="spinner"></div>
                                <span>{getStepTitle(step)}</span>
                            </div>
                        )}
                        <div ref={logEndRef} />
                    </div>

                    {error && (
                        <div className="final-error-state">
                            <h4>Search Halted</h4>
                            <p>{error}</p>
                            <button onClick={onReset} className="try-again-button">Try a new search</button>
                        </div>
                    )}

                    {step === 'complete' && Object.values(results).flat().length === 0 && !error && (
                        <div className="final-error-state no-results-found">
                            <h4>No Listings Found</h4>
                            <p>The AI completed its search but couldn't find specific listings. This can happen for very specific queries or less-covered areas. Try broadening your terms.</p>
                            <button onClick={() => setShowProcess(false)} className="try-again-button">View Recommended Sites</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ReasoningBox;