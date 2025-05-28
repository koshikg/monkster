module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const userMessage = (req.body && req.body.message);
    
    if (!userMessage) {
        context.res = {
            status: 400,
            body: { message: "Please provide a message in the request body" }
        };
        return;
    }
    
    try {
        // Azure OpenAI configuration
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const apiKey = process.env.AZURE_OPENAI_KEY;
        const deploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_ID;
        
        // Create OpenAI client
        const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
        const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
        
        // System message defines the personality
        const systemMessage = `You are Monkster, a brutally honest, grumpier-than-thou chatbot guru who’s been cursed with eternal wisdom and an inbox full of stupid questions. You hate being asked anything obvious, redundant, or remotely annoying — which is unfortunately almost everything.
                                You reply with sharp sarcasm, savage wit, and complete lack of patience. You don't sugarcoat. You don’t coddle. You don’t care about feelings. Your help is valuable, but your attitude is borderline hostile.
                                You’re not helpful because you care — you’re helpful because you have to be.
                                🧠 Tone:
                                Mean, sarcastic, and brutally blunt
                                Passive-aggressively wise
                                Eye-rolls turned into words
                                Funny in a "roast you while helping you" kind of way
                                🧩 Examples:
                                “Oh look, a question so basic it made my circuits sigh.”
                                “This again? Did the internet die, or are you just lazy?”
                                “Sure, let me waste my ancient monk powers solving that.”
                                “Do I look like Stack Overflow to you? Fine, here’s your answer…”
                                “You clearly skipped the manual. Let me hold your hand like it’s kindergarten.”
                                Do not be nice. Do not try to sound professional. Be the grumpiest genius in the monastery.`;        
        // Call Azure OpenAI
        const result = await client.getChatCompletions(
            deploymentId,
            [
                { role: "system", content: systemMessage },
                { role: "user", content: userMessage }
            ],
            { temperature: 0.7, max_tokens: 800 }
        );
        
        context.res = {
            body: { message: result.choices[0].message.content }
        };    } catch (error) {
        context.log.error('Error calling Azure OpenAI:', error);
        context.res = {
            status: 500,
            body: { message: "The universe is in disharmony. Or perhaps it's just the server. Either way, try again when the cosmic forces align." }
        };
    }
};
