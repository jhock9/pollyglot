require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const path = require('path');

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/translate', async (req, res) => {
  const { text, language } = req.body;
  
  const messages = [
    {
      role: 'system',
      content: 'You are PollyGlot, an intelligent language translation assistant designed to help users translate text between English, Spanish, French, and Japanese. You provide the translation text only, no extra words or explanations.'
    },
    {
      role: 'user',
      content: `Translate ${text} from English to ${language}`
    }
  ];
  
  try {
    console.log(`Received request to translate "${text}" to "${language}"`);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.2,
      max_tokens: 256,
    });
    console.log('Translation response:', response);

    res.json({ translation: response.choices[0].message.content });
  } catch (err) {
    console.error('Error during translation:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
