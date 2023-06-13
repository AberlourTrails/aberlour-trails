const HAVE_CURRENT_DATA = 2;

const enableAudioControls = (language) => {
    document.querySelectorAll('audio').forEach(audioEl => {
        audioEl.pause();
        audioEl.currentTime = 0;
    });

    const audioEl = document.querySelector(`audio[lang=${language}]`);
    let playButtonEl = document.querySelector('#play-button');

    if (audioEl === null) {
        if (playButtonEl !== null) {
            playButtonEl.remove();
        }
        return;
    } else if (audioEl !== null && playButtonEl === null) {
        playButtonEl = document.createElement('button');
        playButtonEl.id = 'play-button';
        document.querySelector('#media-controls .control-strip').appendChild(playButtonEl);
    }

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

    playButtonEl.onclick = (_e) => {
        if (audioEl.paused) {
            audioEl.play();
        } else {
            audioEl.pause();
        }
    };
};
