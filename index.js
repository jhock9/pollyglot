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

const translate = async (text, language) => {
  try {
    const response = await fetch('/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, language }),
    });
    
    if (!response.ok) {
      throw new Error('Translation failed');
    }
    
    const data = await response.json();
    renderTranslation(data.translation);
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
