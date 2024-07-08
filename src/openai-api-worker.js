import OpenAI from "openai";

const PRODUCTION_URL = 'https://pollyglot-ai-app.netlify.app';
const isProduction = process.env.NODE_ENV === 'production';

const corsHeaders = {
  "Access-Control-Allow-Origin": isProduction ? PRODUCTION_URL : '*',
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env, ctx) {
    console.log("Received request...");
    
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      console.log("Handling CORS preflight request...");
      return new Response(null, { headers: corsHeaders });
    }
    
    // Only process POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: `${request.method} method not allowed.`}), { status: 405, headers: corsHeaders })
    }
    
    const openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      baseURL: 'https://gateway.ai.cloudflare.com/v1/87b962fb2ebf05e41c0827a9d566448e/pollyglot-app/openai',
    });
    
    try {
      const requestBody = await request.text();
      console.log("Received request body...");
      const messages = JSON.parse(requestBody);  // Parse only once
      // const messages = await request.json();
      console.log("Parsed messages...");
      
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.2,
        max_tokens: 256,
      });
      console.log("Received chat completion...");
      
      const response = chatCompletion.choices[0].message;
      return new Response(JSON.stringify(response), { headers: corsHeaders });
    } catch (err) {
      console.error('Error in fetch handler:', err);
      return new Response(JSON.stringify({ error: err.message }), { headers: corsHeaders, status: 500 });
    }
  },
};
