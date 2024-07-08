const actionPanel = document.getElementById('action-panel');
const loadingPanel = document.getElementById('loading-panel')
const outputPanel = document.getElementById('output-panel');
const textToTranslate = document.getElementById('text-to-translate');
const originalText = document.getElementById('original-text');
const translationText = document.getElementById('translation-text');
const currentCount = document.getElementById('current-count');
const languageRadios = document.getElementsByName('language');
const translateBtn = document.getElementById('translate-btn');
const startOverBtn = document.getElementById('start-over-btn');

textToTranslate.addEventListener('input', () => {
  const currentLength = textToTranslate.value.length;
  currentCount.textContent = `${currentLength}`;
  
  if (currentLength >= 50) {
    currentCount.style.color = 'red';
    translateBtn.disabled = true;
  } else {
    currentCount.style.color = 'black';
    translateBtn.disabled = false;
  }
});

const getSelectedLanguage = () => {
  for (let radio of languageRadios) {
    if (radio.checked) {
      return radio.id; // return the id of the checked radio
    }
  }
  return null; // No language selected
}

const translate = async (text, language) =>{
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
    const isLocalhost = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    const url = isLocalhost
      ? "http://localhost:8080/https://openai-api-worker.jon-hocker.workers.dev/"
      : "https://openai-api-worker.jon-hocker.workers.dev/";
    
		const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });
    const data = await response.json();
    
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error response:', errorMessage);
      console.error('Worker Error:', data.error);
      throw new Error(`Translation failed: ${errorMessage}\nWorker Error: ${data.error}`);
    }
    
    renderTranslation(data.content);
		
	} catch (err) {
    console.error('Error during translation request:', err);
    loadingPanel.innerHTML = 'Unable to translate.<br>Please refresh and try again.';
    loadingPanel.style.textAlign = 'center';
	}
};

const renderTranslation = (output) => {
  loadingPanel.classList.add('hide');
  translationText.value = `${output}`;
  outputPanel.classList.remove('hide');
};

translateBtn.addEventListener('click', () => {
  const selectedLanguage = getSelectedLanguage();
  const text = textToTranslate.value;
  
  if (text && selectedLanguage) {
    loadingPanel.classList.remove('hide');
    actionPanel.classList.add('hide');
    originalText.value = text;
    
    translate(text, selectedLanguage);
  } else {
    alert('Please enter text and select a language.');
  }
});

startOverBtn.addEventListener('click', () => {
  textToTranslate.value = '';
  originalText.value = '';
  translationText.value = '';
  languageRadios.forEach(radio => radio.checked = false);
  
  outputPanel.classList.add('hide');
  actionPanel.classList.remove('hide');
});
