const switchLanguage = (language) => {
    document.querySelectorAll('article').forEach(articleEl => {
        articleEl.style.display = articleEl.lang === language ? 'block' : 'none'
    });

    enableAudioControls(language);
};

const enableLanguageControls = () => {
    const languageSelectEl = document.querySelector('#language-select');

    languageSelectEl.onchange = (event) => {
        switchLanguage(event.target.value);
    }

    switchLanguage(languageSelectEl.value);
}

enableLanguageControls();
