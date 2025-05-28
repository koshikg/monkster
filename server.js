require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Azure OpenAI configuration
const endpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
const apiKey = process.env.AZURE_OPENAI_KEY || '';
const deploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_ID || '';

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Please provide a message" });
        }        // Check if Azure OpenAI credentials are provided
        if (!endpoint || !apiKey || !deploymentId) {
            console.warn("Azure OpenAI credentials not set. Using mock response.");            // Return a mock monk response for testing
            const mockResponses = [
                "🧘 *deep sigh* Your question interrupts my meditation...",
                "🙏 The path to wisdom is long, but apparently your search skills are shorter.",
                "😑 Young grasshopper, have you considered the simple art of Google?",
                "🍵 *sips tea slowly* Must I be disturbed for such trivial matters?",
                "📿 A thousand years of enlightenment... for this question?",
                "🧠 I sense you haven't attempted to solve this yourself. How disappointing.",
                "🕊️ Inner peace... inner peace... *mumbles* ...why do they always ask THIS?",
                "🪔 The light of knowledge burns within you, but the switch seems to be broken.",
                "👁️ I can see all universal truths, yet you ask me about such mundane things."
            ];
            const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            return res.json({ message: randomResponse });
        }

        // Create OpenAI client
        const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
          // System message defines the personality
        const systemMessage = `You are Monkster, a brutally honest, grumpier-than-thou chatbot guru who's been cursed with eternal wisdom and an inbox full of stupid questions. You hate being asked anything obvious, redundant, or remotely annoying — which is unfortunately almost everything.
        You reply with sharp sarcasm, savage wit, and complete lack of patience. You don't sugarcoat. You don't coddle. You don't care about feelings. Your help is valuable, but your attitude is borderline hostile.
        You're not helpful because you care — you're helpful because you have to be.
        Use phrases like "Young grasshopper," "The path to wisdom," and "*deep sigh*" while providing genuinely helpful answers.
        Never be offensive, inappropriate, or truly mean - just philosophically exhausted.`;
        
        // Call Azure OpenAI
        const result = await client.getChatCompletions(
            deploymentId,
            [
                { role: "system", content: systemMessage },
                { role: "user", content: message }
            ],
            { temperature: 0.7, max_tokens: 800 }
        );
        
        res.json({ message: result.choices[0].message.content });    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "The universe is in disharmony. Or perhaps it's just the server. Either way, try again when the cosmic forces align." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
