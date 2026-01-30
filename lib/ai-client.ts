import Together from "together-ai";

export type AIClientOptions = {
    model: string;
    chatId?: string;
};

/**
 * Get the appropriate AI client based on the model prefix
 * - groq/* models use Groq API
 * - All other models use OpenRouter API
 */
export function getAIClient(options: AIClientOptions): Together {
    const { model, chatId } = options;

    let clientOptions: ConstructorParameters<typeof Together>[0] = {};

    if (model.startsWith("groq/")) {
        // Use Groq API
        clientOptions = {
            baseURL: "https://api.groq.com/openai/v1",
            apiKey: process.env.GROQ_API_KEY,
        };
    } else if (model.startsWith("google/")) {
        // Use Google AI Studio API (Gemini)
        clientOptions = {
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
            apiKey: process.env.GOOGLE_API_KEY,
        };
    } else {
        // Use OpenRouter API (default)
        clientOptions = {
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
        };
    }

    // Add Helicone observability if configured
    if (process.env.HELICONE_API_KEY && chatId) {
        clientOptions.baseURL = "https://together.helicone.ai/v1";
        clientOptions.defaultHeaders = {
            "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
            "Helicone-Property-appname": "LlamaCoder",
            "Helicone-Session-Id": chatId,
            "Helicone-Session-Name": "LlamaCoder Chat",
        };
    }

    return new Together(clientOptions);
}

/**
 * Get the actual model name to send to the API
 * Strips the provider prefix for Groq and Google models
 */
export function getModelName(model: string): string {
    if (model.startsWith("groq/")) {
        return model.replace("groq/", "");
    }
    if (model.startsWith("google/")) {
        return model.replace("google/", "");
    }
    return model;
}

/**
 * Get a fast model for utility tasks (title generation, example matching)
 * Uses Groq if available for speed, otherwise falls back to OpenRouter
 */
export function getFastUtilityClient(): { client: Together; model: string } {
    if (process.env.GROQ_API_KEY) {
        return {
            client: new Together({
                baseURL: "https://api.groq.com/openai/v1",
                apiKey: process.env.GROQ_API_KEY,
            }),
            model: "llama-3.1-8b-instant",
        };
    }

    return {
        client: new Together({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
        }),
        model: "meta-llama/llama-3.1-8b-instruct",
    };
}
