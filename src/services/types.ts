export interface AIResponse {
    id: string;
    model: string;
    choices: Array<{
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }>;
    usage?: {
        total_tokens: number;
    }
}

// New types for our agentic search
export type SearchStep = 'idle' | 'extracting_location' | 'identifying_sites' | 'searching_sites' | 'complete' | 'error';

export interface ReasoningLogEntry {
    type: 'prompt' | 'response' | 'info' | 'error';
    step: string; // e.g., "Step 1: Identify Websites", "Searching zillow.com"
    content: string;
}

// Export SearchResults as interface instead of type alias
export interface SearchResults {
    [site: string]: string[];
}