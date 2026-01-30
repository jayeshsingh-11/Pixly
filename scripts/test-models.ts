// Test script to check which models work
// Run with: npx tsx scripts/test-models.ts

import Together from "together-ai";

async function testGroq() {
    console.log("\n=== Testing Groq API ===");
    const client = new Together({
        baseURL: "https://api.groq.com/openai/v1",
        apiKey: process.env.GROQ_API_KEY,
    });

    const models = [
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
        "mixtral-8x7b-32768",
        "gemma2-9b-it",
    ];

    for (const model of models) {
        try {
            const res = await client.chat.completions.create({
                model,
                messages: [{ role: "user", content: "Say hi" }],
                max_tokens: 10,
            });
            console.log(`✅ ${model}: ${res.choices[0].message?.content}`);
        } catch (e: any) {
            console.log(`❌ ${model}: ${e.message}`);
        }
    }
}

async function testGoogle() {
    console.log("\n=== Testing Google AI Studio ===");
    const client = new Together({
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const models = [
        "gemini-2.0-flash-exp",
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro",
    ];

    for (const model of models) {
        try {
            const res = await client.chat.completions.create({
                model,
                messages: [{ role: "user", content: "Say hi" }],
                max_tokens: 10,
            });
            console.log(`✅ ${model}: ${res.choices[0].message?.content}`);
        } catch (e: any) {
            console.log(`❌ ${model}: ${e.message}`);
        }
    }
}

async function main() {
    console.log("Testing AI APIs...\n");
    await testGroq();
    await testGoogle();
}

main();
