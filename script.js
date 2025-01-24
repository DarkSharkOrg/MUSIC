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
    const videoContainer = document.querySelector('.video-container');
    const backgroundVideo = document.querySelector('.background-video');

    // Songs array with title, artist, and audio file
    const songs = [
        { title: 'BAIXO', artist: 'xxanteria', src: 'song1.mp3', video: 'A1.mp4' },
        { title: 'Slide da Treme Melódica v2', artist: 'DJ FNK, Polaris Band', src: 'song2.mp3', video: 'A2.mp4' },
        { title: 'RISADA CHUCK 01', artist: '-Prey', src: 'song3.mp3', video: 'A3.mp4' },
        { title: 'BLUE HORIZON FUNK - SLOWED', artist: 'NXGHT!, DJ ANXVAR, DJ ZAP', src: 'song4.mp3', video: 'A1.mp4' },
        { title: 'YUM YUM - Slowed', artist: 'LXNGVX, Mc Gw', src: 'song5.mp3', video: 'A2.mp4' },
        { title: 'Ashi Ashi', artist: '6YNTHMANE, RXDXVIL', src: 'song6.mp3', video: 'A3.mp4' },
        { title: 'The Automotivo Infernal 1.0 - Purple - Slowed', artist: 'MRL, Mc Gw', src: 'song7.mp3', video: 'A1.mp4' },
        { title: 'New Funk Song', artist: 'DJ Fresh', src: 'song8.mp3', video: 'A2.mp4' } // New song added
    ];

    let currentSongIndex = 0;

    // Load the first song and video
    function loadSong(index) {
        const song = songs[index];
        document.querySelector('.song-title').innerText = song.title;
        document.querySelector('.artist').innerText = song.artist;
        audio.src = song.src;
        backgroundVideo.src = song.video;
        audio.load();
        backgroundVideo.load();
        progressBar.value = 0;
        updateTime();
    }

    // Play/Pause functionality
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playIcon.classList.replace('fa-play', 'fa-pause');
            backgroundVideo.play();  // Play video along with audio
        } else {
            audio.pause();
            playIcon.classList.replace('fa-pause', 'fa-play');
            backgroundVideo.pause();  // Pause video along with audio
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
        audio.play();
        backgroundVideo.play();
        playIcon.classList.replace('fa-play', 'fa-pause');  // Update the play/pause icon
    });

    // Previous song
    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        audio.play();
        backgroundVideo.play();
        playIcon.classList.replace('fa-play', 'fa-pause');  // Update the play/pause icon
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

    // Event listener for when the audio ends
    audio.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;  // Move to the next song
        loadSong(currentSongIndex);
        audio.play();  // Automatically play the next song
        backgroundVideo.play();  // Automatically play the video for the next song
        playIcon.classList.replace('fa-play', 'fa-pause');  // Ensure play/pause icon is updated
    });

    // Load the first song initially
    loadSong(currentSongIndex);
});
