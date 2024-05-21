const songs = [
    { src: "https://youtu.be/q3uCZewPLi8", answer: "Toxic" },
    { src: "https://youtu.be/C-u5WLJ9Yk4", answer: "Baby one more time" },
	{ src: "https://youtu.be/q3uCZewPLi8", answer: "Antoine Daniel" },
    // Ajoutez plus de chansons ici
];

let player;
let currentSongIndex = 0;
let score = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '200',
        width: '300',
        videoId: '',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    loadSong(currentSongIndex);
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        // Action à effectuer lorsque la vidéo se termine
    }
}

const playButton = document.getElementById('playButton');
const answerInput = document.getElementById('answerInput');
const submitAnswerButton = document.getElementById('submitAnswer');
const scoreValue = document.getElementById('scoreValue');
const resultDiv = document.getElementById('result');

function loadSong(index) {
    if (index >= songs.length) {
        resultDiv.innerHTML = `<p>Félicitations ! Vous avez terminé le jeu avec un score de ${score}.</p>`;
        document.getElementById('game').style.display = 'none';
        return;
    }
    const videoId = new URL(songs[index].src).searchParams.get('v');
    player.cueVideoById(videoId);
}

playButton.addEventListener('click', () => {
    player.playVideo();
});

submitAnswerButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = songs[currentSongIndex].answer.toLowerCase();
    if (userAnswer === correctAnswer) {
        score++;
        scoreValue.textContent = score;
        resultDiv.innerHTML = '<p>Bonne réponse !</p>';
    } else {
        resultDiv.innerHTML = `<p>Mauvaise réponse. La réponse correcte était "${songs[currentSongIndex].answer}".</p>`;
    }
    answerInput.value = '';
    currentSongIndex++;
    loadSong(currentSongIndex);
});

