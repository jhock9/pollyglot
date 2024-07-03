require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { text, language } = JSON.parse(event.body);

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

    return {
      statusCode: 200,
      body: JSON.stringify({ translation: response.choices[0].message.content }),
    };
  } catch (err) {
    console.error('Error during translation:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
