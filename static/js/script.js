// Function to handle Speech-to-Text (STT)
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('user_text').value = transcript; // Set the speech as input
    };

    recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
    };

    recognition.onspeechend = () => {
        recognition.stop(); // Stop listening after speech ends
    };
}

// Function to handle Text-to-Speech (TTS)
function speakText(text, lang = 'en-US') {
    const utterance = new SpeechSynthesisUtterance(text);
    const availableVoices = window.speechSynthesis.getVoices();

    // Find a voice that matches the desired language
    const voice = availableVoices.find(v => v.lang.startsWith(lang)) || availableVoices[0];

    // Set the voice and language
    utterance.voice = voice;
    utterance.lang = lang;

    // Speak the text
    window.speechSynthesis.speak(utterance);
}

// Event listener for the "Speak Input" button
document.getElementById('speakInput').addEventListener('click', function() {
    const userInput = document.getElementById('user_text').value;
    speakText(userInput); // Speak the text the user entered
});

// Event listener for the "Speak Output" button
document.getElementById('speakOutput').addEventListener('click', function() {
    const translationOutput = document.getElementById('translation-text').textContent;
    const targetLang = document.getElementById('target_language').value.toLowerCase();
    speakText(translationOutput, targetLang); // Speak the translation output in the target language
});

// Event listener for the "Listen to Input" button (Speech-to-Text)
document.getElementById('startListening').addEventListener('click', function() {
    startListening(); // Start Speech-to-Text
});

// Ensure voices are loaded before using them (on some browsers, voices may load asynchronously)
window.speechSynthesis.onvoiceschanged = function() {
    console.log('Voices loaded');
};
