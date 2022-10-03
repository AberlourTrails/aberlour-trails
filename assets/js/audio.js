const HAVE_CURRENT_DATA = 2;

const enableControls = () => {
    const playButtonEl = document.querySelector('#play-button');
    const audioEl = document.querySelector('audio');

    const updatePlayButton = () => {
        if (audioEl.paused) {
            playButtonEl.innerHTML = '▶';
        } else {
            playButtonEl.innerHTML = '❚❚';
        }
    };

    const handleAudioEvent = (_e) => {
        updatePlayButton();
    };
    updatePlayButton();

    ['canplay', 'canplaythrough', 'ended', 'loadstart', 'pause', 'play'].forEach((e) => {
        audioEl.addEventListener(e, handleAudioEvent);
    })

    audioEl.addEventListener('canplay', handleAudioEvent);
    audioEl.addEventListener('ended', handleAudioEvent);
    audioEl.addEventListener('loadeddata', handleAudioEvent);
    audioEl.addEventListener('loadedmetadata', handleAudioEvent);
    audioEl.addEventListener('loadstart', handleAudioEvent);
    audioEl.addEventListener('pause', handleAudioEvent);
    audioEl.addEventListener('play', handleAudioEvent);

    playButtonEl.addEventListener('click', (_e) => {
        if (audioEl.paused) {
            audioEl.play();
        } else {
            audioEl.pause();
        }
    });

    document.querySelector('#media-controls').style.display = 'flex';
};

enableControls();
