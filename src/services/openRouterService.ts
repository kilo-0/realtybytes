import { OPENROUTER_API_KEY } from '../config/secrets';

// Define AIResponse locally to avoid import issues
interface AIResponse {
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

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// The model can be switched to any compatible model on OpenRouter.
// qwen/qwen-turbo:online has web search capabilities.
// See available models: https://openrouter.ai/docs#models
export const AI_MODEL = "qwen/qwen-turbo:online";

export const getCompletion = async (userPrompt: string, systemPrompt: string): Promise<AIResponse> => {
    const headers = {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // Required by OpenRouter to identify the application.
        // See: https://openrouter.ai/docs#header-fields
        "HTTP-Referer": "https://realtybytes.dev",
        "X-Title": "RealtyBytes AI Search"
    };

    const body = JSON.stringify({
        model: AI_MODEL,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenRouter API Error:", errorData);
            let errorMessage = errorData.error?.message || `API request failed with status ${response.status}`;
            if (errorMessage.includes("not found") || errorMessage.includes("does not exist")) {
                errorMessage = `The model '${AI_MODEL}' could not be found or you may not have access. Please check the model name in openRouterService.ts.`;
            }
            throw new Error(errorMessage);
        }

        return await response.json();

    } catch (error) {
        console.error("Network or fetch error:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to connect to AI service: ${error.message}`);
        }
        throw new Error("An unknown error occurred while contacting the AI service.");
    }
};