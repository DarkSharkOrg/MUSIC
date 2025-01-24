document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.querySelector('#mode');
    const phone = document.querySelector('.phone');
    const playPauseBtn = document.querySelector('#play-pause-btn');
    const playIcon = document.querySelector('#play-icon');
    const progressBar = document.querySelector('#progress-bar');
    const currentTimeEl = document.querySelector('#current-time');
    const totalTimeEl = document.querySelector('#total-time');
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    const audio = document.querySelector('#audio');

    // Songs array with title, artist, and audio file
    const songs = [
        {
            title: 'SUMMER',
            artist: 'Band ft. Song Artist',
            src: 'song1.mp3'
        },
        {
            title: 'WINTER',
            artist: 'Another Band',
            src: 'song2.mp3'
        },
        {
            title: 'SPRING',
            artist: 'Cool Artist',
            src: 'song3.mp3'
        }
    ];

    let currentSongIndex = 0;

    // Load the first song
    function loadSong(index) {
        const song = songs[index];
        document.querySelector('.song-title').innerText = song.title;
        document.querySelector('.artist').innerText = song.artist;
        audio.src = song.src;
        audio.load();  // Load the new song
        progressBar.value = 0;
        updateTime();
        if (!audio.paused) {
            audio.play();
        }
    }

    // Play/Pause functionality
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playIcon.classList.replace('fa-play', 'fa-pause');
        } else {
            audio.pause();
            playIcon.classList.replace('fa-pause', 'fa-play');
        }
    }

    // Play/Pause functionality on button click
    playPauseBtn.addEventListener('click', togglePlayPause);

    // Play/Pause functionality on Spacebar
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {  // Spacebar key
            e.preventDefault();  // Prevent page scroll on spacebar press
            togglePlayPause();
        }
    });

    // Update progress bar and time
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;
            currentTimeEl.innerText = formatTime(audio.currentTime);
            totalTimeEl.innerText = formatTime(audio.duration);
        }
    });

    // Seek functionality
    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    function updateTime() {
        currentTimeEl.innerText = '0:00';
        totalTimeEl.innerText = audio.duration ? formatTime(audio.duration) : '0:00';
    }

    // Next song
    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    });

    // Previous song
    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    });

    // Toggle Theme (Dark/Light)
    modeToggle.addEventListener('click', () => {
        phone.classList.toggle('dark');
        phone.classList.toggle('light');
        const icon = document.querySelector('#toggleDark');
        if (phone.classList.contains('dark')) {
            icon.classList.replace('bi-moon', 'bi-sun');
        } else {
            icon.classList.replace('bi-sun', 'bi-moon');
        }
    });

    // Load the first song initially
    loadSong(currentSongIndex);
});
