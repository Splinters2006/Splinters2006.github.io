const toggle = document.querySelector('.theme-switch');
const heart = document.querySelector('.secret-trigger');
let heartClicks = [];

heart.addEventListener('click', () => {
  const now = performance.now();
  heartClicks = heartClicks.filter(time => now - time <= 2000);
  heartClicks.push(now);
  if (heartClicks.length >= 5) {
    heartClicks = [];
    window.location.assign('secret.html');
  }
});

const themes = {
  light: { word: 'sunshine.', intro: 'A brighter outlook, a slower moment.<br>Sometimes all you need is a little light.', color: '#f6f3e9' },
  dark: { word: 'moonlight.', intro: 'A quieter world, a softer moment.<br>Let the day go. Stay a little longer.', color: '#171e2a' }
};

function setTheme(theme) {
  const content = themes[theme];
  document.documentElement.dataset.theme = theme;
  toggle.setAttribute('aria-checked', String(theme === 'dark'));
  document.querySelector('#mood-word').textContent = content.word;
  document.querySelector('#intro').innerHTML = content.intro;
  document.querySelector('meta[name="theme-color"]').content = content.color;
  updatePetsPlaceholder();
}

function updatePetsPlaceholder() {
  const theme = document.documentElement.dataset.theme;
  const hasPictures = [...document.querySelectorAll('#pets .picture-card')]
    .some(card => card.dataset.galleryTheme === theme && !card.hidden);
  document.querySelector('.pets-placeholder').hidden = hasPictures;
}

let savedTheme;
try { savedTheme = localStorage.getItem('day-night-theme'); } catch { /* Storage may be unavailable in private browsing. */ }
setTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light');

toggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(theme);
  try { localStorage.setItem('day-night-theme', theme); } catch { /* Switching still works without storage. */ }
});
// =======================================================
// MUSIC PLAYER
// First 3 = night mode
// Last 3  = sun mode
// =======================================================

const MUSIC_TRACKS = [
  // NIGHT
  { file: "Buriki No Dance.flac", theme: "dark" },
  { file: "PLASTIC! (EVERYBODY HATES US NOW!).flac", theme: "dark" }, // exact filename!
  { file: "Thanatosis.flac", theme: "dark" },

  // SUN
  { file: "The Architect.flac", theme: "light" },
  { file: "The One Reborn.flac", theme: "light" },
  { file: "Us and Them.flac", theme: "light" }
];

const musicAudio = document.querySelector("#music-audio");
// Default volume: 50%
if (musicAudio) {
  musicAudio.volume = 0.1;
}
const musicPlaylist = document.querySelector("#music-playlist");
const musicTitle = document.querySelector("#track-title");
const musicStatus = document.querySelector("#music-status");
const previousTrackButton = document.querySelector("#previous-track");
const nextTrackButton = document.querySelector("#next-track");

let currentMusicTracks = [];
let currentTrackIndex = 0;


// -------------------------------------------------------
// GET CURRENT THEME
// -------------------------------------------------------

function getCurrentMusicTheme() {
  return document.documentElement.dataset.theme === "dark"
    ? "dark"
    : "light";
}


// -------------------------------------------------------
// GET TRACKS FOR CURRENT THEME
// -------------------------------------------------------

function getTracksForCurrentTheme() {
  const theme = getCurrentMusicTheme();

  return MUSIC_TRACKS
    .filter(track => track.theme === theme)
    .map(track => ({
      ...track,

      title: track.file
        .replace(/\.(flac|mp3)$/i, "")
        .replace(/[-_]+/g, " "),

      url: `assets/music/${encodeURIComponent(track.file)}`
    }));
}


// -------------------------------------------------------
// LOAD TRACK
// -------------------------------------------------------

function loadTrack(index, play = false) {
  if (!currentMusicTracks.length) return;

  if (index < 0) {
    index = currentMusicTracks.length - 1;
  }

  if (index >= currentMusicTracks.length) {
    index = 0;
  }

  currentTrackIndex = index;

  const track = currentMusicTracks[index];

  musicAudio.src = track.url;
  musicTitle.textContent = track.title;

  musicStatus.textContent =
    `${index + 1} / ${currentMusicTracks.length}`;

  updateMusicPlaylist();

  if (play) {
    musicAudio.play().catch(error => {
      console.error("Could not play audio:", error);
    });
  }
}


// -------------------------------------------------------
// UPDATE PLAYLIST
// -------------------------------------------------------

function updateMusicPlaylist() {
  if (!musicPlaylist) return;

  musicPlaylist.innerHTML = "";

  currentMusicTracks.forEach((track, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = track.title;

    if (index === currentTrackIndex) {
      button.classList.add("active");
      button.setAttribute("aria-current", "true");
    }

    button.addEventListener("click", () => {
      loadTrack(index, true);
    });

    item.appendChild(button);
    musicPlaylist.appendChild(item);
  });

  musicPlaylist.hidden = false;
}


// -------------------------------------------------------
// SWITCH PLAYLIST WHEN THEME CHANGES
// -------------------------------------------------------

function updateMusicForTheme() {
  const wasPlaying =
    musicAudio &&
    !musicAudio.paused &&
    !musicAudio.ended;

  currentMusicTracks = getTracksForCurrentTheme();
  currentTrackIndex = 0;

  if (!currentMusicTracks.length) {
    musicAudio.removeAttribute("src");
    musicAudio.load();

    musicTitle.textContent = "No music available.";
    musicStatus.textContent = "";

    if (musicPlaylist) {
      musicPlaylist.innerHTML = "";
      musicPlaylist.hidden = true;
    }

    return;
  }

  previousTrackButton.disabled =
    currentMusicTracks.length <= 1;

  nextTrackButton.disabled =
    currentMusicTracks.length <= 1;

  loadTrack(0, wasPlaying);
}


// -------------------------------------------------------
// BUTTONS
// -------------------------------------------------------

previousTrackButton?.addEventListener("click", () => {
  loadTrack(currentTrackIndex - 1, true);
});

nextTrackButton?.addEventListener("click", () => {
  loadTrack(currentTrackIndex + 1, true);
});

musicAudio?.addEventListener("ended", () => {
  loadTrack(currentTrackIndex + 1, true);
});


// -------------------------------------------------------
// WATCH FOR SUN / NIGHT MODE CHANGES
// -------------------------------------------------------

const themeObserver = new MutationObserver(() => {
  updateMusicForTheme();
});

themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"]
});


// Initial playlist
updateMusicForTheme();
