export const fetchGeminiActivity = async (stressLevel, energyLevel, location) => {
    // Check if API key is provided
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Explicit system prompt constraints
    const prompt = `You are a helpful wellbeing assistant. The user has a stress level of ${stressLevel} out of 100 and an energy level of ${energyLevel} out of 100, and is currently in this environment: '${location}'. 
Suggest exactly ONE simple, actionable 5-minute activity for them to do right now to decompress.
RULES:
1. The activity MUST NOT be journaling, writing, meditation, or breathing exercises.
2. It MUST be something they can do immediately in their current environment (${location}) within 5 minutes.
3. If their energy is low (${energyLevel} < 30), suggest very passive or seated activities. If their energy is high, suggest something more physical.
4. Keep the response to 1-2 short, comforting sentences. Do not use markdown or lists. Just the instruction.`;

    if (apiKey) {
        try {
            // Direct fetch to bypass SDK version issues
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Gemini Direct API Error Data:", errorData);
                throw new Error(`HTTP ${response.status} - ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();

            // Extract text from the Gemini API response structure
            const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (generatedText) {
                return generatedText.trim();
            } else {
                throw new Error("Invalid response format from API");
            }

        } catch (error) {
            console.error("Gemini API Error details:", error);
            // Fallthrough to dummy logic on error
        }
    } else {
        console.warn("VITE_GEMINI_API_KEY is not set. Using fallback activity.");
        alert("VITE_GEMINI_API_KEY is missing or undefined in the browser!");
    }

    // Fallback logic if no API key or API fails
    return `Take a 5-minute screen break by finding a textured object nearby in your ${location}—like a piece of fabric or a detailed surface—and spend a few minutes purely observing its physical details.`;
};
