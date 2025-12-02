import { useState } from 'react';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import ReasoningBox from '../ReasoningBox/ReasoningBox';
import './HomePage.css';
import { getCompletion } from '../../../../services/openRouterService';
import { useSearchContext } from '../../../../context/SearchContext';
import type { SearchResult } from '../../../../context/SearchContext';

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
import { LOCATION_EXTRACTION_SYSTEM_PROMPT, SITE_IDENTIFICATION_SYSTEM_PROMPT, getPropertySearchSystemPrompt } from '../../../../config/systemPrompt';

interface HomePageProps {
    onSearch: () => void;
}

type Preference = 'schools' | 'restaurants' | 'shopping' | 'gym' | 'beaches' | 'mountains' | 'nightlife';

const PREFERENCE_OPTIONS: { id: Preference; emoji: string; label: string }[] = [
    { id: 'schools', emoji: '🏫', label: 'Schools' },
    { id: 'restaurants', emoji: '🍽️', label: 'Restaurants' },
    { id: 'shopping', emoji: '🛍️', label: 'Shopping' },
    { id: 'gym', emoji: '🏋️', label: 'Gym Access' },
    { id: 'beaches', emoji: '🌊', label: 'Beaches' },
    { id: 'mountains', emoji: '⛰️', label: 'Mountains' },
    { id: 'nightlife', emoji: '🍸', label: 'Nightlife' },
];

interface LocationResponse {
    city?: string;
    state?: string;
    country?: string;
    error?: string;
    message?: string;
}

const HomePage: React.FC<HomePageProps> = () => {
    const searchContext = useSearchContext();
    const [query, setQuery] = useState('');
    const [preferences, setPreferences] = useState<Set<Preference>>(new Set());

    const [searchStep, setSearchStep] = useState<SearchStep>('idle');
    const [reasoningLog, setReasoningLog] = useState<ReasoningLogEntry[]>([]);
    const [searchResults, setSearchResults] = useState<SearchResults>({});
    const [searchError, setSearchError] = useState<string | null>(null);

    const togglePreference = (preference: Preference) => {
        setPreferences(prev => {
            const newPrefs = new Set(prev);
            if (newPrefs.has(preference)) {
                newPrefs.delete(preference);
            } else {
                newPrefs.add(preference);
            }
            return newPrefs;
        });
    };

    const addLog = (entry: Omit<ReasoningLogEntry, 'content'> & { content: string | object }) => {
        const contentString = typeof entry.content === 'string' ? entry.content : JSON.stringify(entry.content, null, 2);
        setReasoningLog(prev => [...prev, { ...entry, content: contentString }]);
    };

    const parseJsonAiResponse = <T,>(responseText: string, step: string): T | null => {
        try {
            const cleanedText = responseText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
            const parsed = JSON.parse(cleanedText);

            // This is now more generic, specific error handling will be done in handleSearch
            if (parsed.error) {
                setSearchError(parsed.message || "An unspecified error occurred in the AI response.");
                setSearchStep('error');
                addLog({ type: 'error', step, content: parsed.message });
                return parsed as T; // Return the parsed object so the caller can see the error type
            }
            return parsed as T;
        } catch (e) {
            const errorMsg = "The AI returned a response that wasn't in the expected format. Please try rephrasing your search.";
            console.error("JSON Parsing Error:", e, "Raw Text:", responseText);
            setSearchError(errorMsg);
            setSearchStep('error');
            addLog({ type: 'error', step, content: `${errorMsg}\n\nRaw AI Response:\n${responseText}` });
            return null;
        }
    };


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        setReasoningLog([]);
        setSearchResults({});
        setSearchError(null);

        const promptParts = [];
        if (query.trim()) {
            promptParts.push(query.trim());
        }
        const selectedPreferences = Array.from(preferences);
        if (selectedPreferences.length > 0) {
            promptParts.push(`with a focus on proximity to good ${selectedPreferences.join(', ')}`);
        }
        const fullUserQuery = promptParts.length > 0 ? promptParts.join(' ') : 'a nice property';

        try {
            // --- Step 1: Extract Location ---
            setSearchStep('extracting_location');
            const locationStep = 'Step 1: Extract Location';
            addLog({ type: 'info', step: locationStep, content: `Analyzing query to determine location...` });
            addLog({ type: 'prompt', step: locationStep, content: { system: LOCATION_EXTRACTION_SYSTEM_PROMPT, user: fullUserQuery } });

            const locationResponse = await getCompletion(fullUserQuery, LOCATION_EXTRACTION_SYSTEM_PROMPT);
            const locationResponseContent = locationResponse.choices[0].message.content;
            addLog({ type: 'response', step: locationStep, content: locationResponseContent });

            const parsedLocation = parseJsonAiResponse<LocationResponse>(locationResponseContent, locationStep);

            if (!parsedLocation || parsedLocation.error === 'location_not_found' || !parsedLocation.city) {
                // Error state is already set by parseJsonAiResponse if needed.
                return;
            }

            // --- Step 2: Identify Websites ---
            setSearchStep('identifying_sites');
            const siteIdStep = 'Step 2: Identify Websites';
            const locationString = [parsedLocation.city, parsedLocation.state, parsedLocation.country].filter(Boolean).join(', ');
            const siteIdQuery = `Real estate listings in ${locationString}`;

            addLog({ type: 'info', step: siteIdStep, content: `Found location: ${locationString}. Now finding the best real estate sites...` });
            addLog({ type: 'prompt', step: siteIdStep, content: { system: SITE_IDENTIFICATION_SYSTEM_PROMPT, user: siteIdQuery } });

            const siteResponse = await getCompletion(siteIdQuery, SITE_IDENTIFICATION_SYSTEM_PROMPT);
            const siteResponseContent = siteResponse.choices[0].message.content;
            addLog({ type: 'response', step: siteIdStep, content: siteResponseContent });

            const parsedSites = parseJsonAiResponse<{ sites: string[] }>(siteResponseContent, siteIdStep);

            if (!parsedSites || !parsedSites.sites || parsedSites.sites.length === 0) {
                if (!searchError) {
                    const errorMsg = "The AI couldn't identify relevant websites. This can happen for very specific or unsupported locations. Please try a broader search.";
                    setSearchError(errorMsg);
                    setSearchStep('error');
                    addLog({ type: 'error', step: siteIdStep, content: errorMsg });
                }
                return;
            }

            // --- Step 3: Search Each Website ---
            const sitesToSearch = parsedSites.sites;
            setSearchStep('searching_sites');
            const allResults: SearchResults = {};

            for (const site of sitesToSearch) {
                const searchSiteStep = `Step 3: Searching ${site}`;
                const searchPrompt = getPropertySearchSystemPrompt(site);

                addLog({ type: 'info', step: searchSiteStep, content: `Now searching for properties on ${site} based on your detailed query...` });
                addLog({ type: 'prompt', step: searchSiteStep, content: { system: searchPrompt, user: fullUserQuery } });

                const propertyResponse = await getCompletion(fullUserQuery, searchPrompt);
                const propertyResponseContent = propertyResponse.choices[0].message.content;
                addLog({ type: 'response', step: searchSiteStep, content: propertyResponseContent });

                const parsedUrls = parseJsonAiResponse<{ urls: string[] }>(propertyResponseContent, searchSiteStep);

                if (parsedUrls && parsedUrls.urls) { // Allow empty arrays
                    allResults[site] = parsedUrls.urls;
                }
            }

            // Flatten results into array of SearchResult objects
            const flatResults: SearchResult[] = Object.entries(allResults).flatMap(
                ([site, urls]) => urls.map(url => ({ url, site }))
            );

            // Save to context for ListingsPage
            searchContext.setSearchResults(flatResults);
            searchContext.setSearchQuery(fullUserQuery);

            setSearchResults(allResults);
            setSearchStep('complete');
            addLog({ type: 'info', step: "Step 4: Complete", content: `Search finished! Found ${Object.values(allResults).flat().length} properties across ${Object.keys(allResults).length} sites.` });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
            setSearchError(errorMessage);
            setSearchStep('error');
            addLog({ type: 'error', step: "Critical Failure", content: errorMessage });
        }
    };

    const isSearching = searchStep === 'extracting_location' || searchStep === 'identifying_sites' || searchStep === 'searching_sites';

    return (
        <div className="home-page">
            <h1 className="home-page-title">Your AI Home Search</h1>
            <p className="home-page-subtitle">
                Describe your ideal home, and our live-search AI assistant will browse the web to find properties for you. This agentic search process is inspired by recent advances in LLM reasoning. 
            </p>

            <div className="home-search-container">
                <SearchBar
                    query={query}
                    onQueryChange={setQuery}
                    onSearch={handleSearch}
                    placeholder="e.g., 'a spacious house with a garden near Austin, Texas'"
                    className="home-page-search-bar"
                    isLoading={isSearching}
                />
            </div>

            <div className="emoji-toggles-container">
                {PREFERENCE_OPTIONS.map(({ id, emoji, label }) => (
                    <button
                        key={id}
                        className={`emoji-toggle-button ${preferences.has(id) ? 'selected' : ''}`}
                        onClick={() => togglePreference(id)}
                        aria-pressed={preferences.has(id)}
                        disabled={isSearching}
                    >
                        <span className="emoji-char">{emoji}</span>
                        {label}
                    </button>
                ))}
            </div>

            {searchStep !== 'idle' && (
                <div className="reasoning-box-container">
                    <ReasoningBox
                        log={reasoningLog}
                        step={searchStep}
                        results={searchResults}
                        error={searchError}
                        onReset={() => setSearchStep('idle')}
                    />
                </div>
            )}
        </div>
    );
};

export default HomePage;