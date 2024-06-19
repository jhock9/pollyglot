<h1 align="center">AI Translator App</h1>

<p align="center">
  <img src="screenshots/france-q.png" width="225" height="450">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="screenshots/france-r.png" width="225" height="450">
</p>

This translation web application allows users to input text and translate it into multiple languages using OpenAI's translation capabilities. The application is designed to help bridge language barriers, making it easier to communicate across different languages.

## Features
- **Text Translation**: Translate text from English to multiple languages (Spanish, French, Japanese).
- **Interactive UI**: User-friendly interface to input text and select languages.

## Technologies Used
- HTML, CSS, JavaScript
- Node.js and Express
- OpenAI API (gpt-3.5-turbo, tts-1)
- Vite.js

## Installation Instructions

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- OpenAI API key

### Steps
1. Clone the repository
3. Install dependencies: `npm install`
4. Add `OPENAI_API_KEY`as environment variable
5. Start the server

## Usage
1. **Input Text**: Enter the text you want to translate in the provided text box.
2. **Select Language**: Choose the target language for translation.
3. **Translate**: Click the "Translate" button to get the translated text.
4. **View Translation**: The translated text will be displayed in the output area.

## Future Enhancements
- **Deploy on Netlify**: Deploy the application to Netlify for easier access and sharing.
- **More Languages**: Expand the application to support translation into additional languages beyond the current set.
- **Text-to-Speech**: Implement text-to-speech functionality to read translations aloud using OpenAI's TTS API.
- **Voice Input**: Add the ability for users to input text via voice using OpenAI's Whisper API.
- **Improved UI**: Enhance the user interface for better user experience and accessibility.

## Contributing
Contributions are welcome! Please follow these guidelines:
- Fork the repository.
- Create a new branch: `git checkout -b feature/new-feature`
- Make your changes and commit them: `git commit -m 'Add new feature'`
- Push to the branch: `git push origin feature/new-feature`
- Submit a pull request.

## License
This project is part of [Scrimba](https://v2.scrimba.com/)'s [AI Engineering Course](https://v2.scrimba.com/the-ai-engineer-path-c02v)