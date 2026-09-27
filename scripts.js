const toggle = document.querySelector('.theme-switch');
const themes = {
  light: { word: 'sunshine.', intro: 'A brighter outlook, a slower moment.<br>Sometimes all you need is a little light.', label: 'THE GOLDEN HOURS', caption: 'Sun on your face. Nothing to rush.', scene: 'A golden sun above a peaceful green mountain landscape', color: '#f6f3e9', number: '01 / 02' },
  dark: { word: 'moonlight.', intro: 'A quieter world, a softer moment.<br>Let the day go. Stay a little longer.', label: 'THE QUIET HOURS', caption: 'Under the stars. A little room to dream.', scene: 'A crescent moon and stars above a peaceful blue mountain landscape', color: '#171e2a', number: '02 / 02' }
};

function setTheme(theme) {
  const content = themes[theme];
  document.documentElement.dataset.theme = theme;
  toggle.setAttribute('aria-checked', String(theme === 'dark'));
  document.querySelector('#mood-word').textContent = content.word;
  document.querySelector('#intro').innerHTML = content.intro;
  document.querySelector('#scene-time').textContent = content.label;
  document.querySelector('#caption').textContent = content.caption;
  document.querySelector('.landscape').setAttribute('aria-label', content.scene);
  document.querySelector('.scene-number').textContent = content.number;
  document.querySelector('meta[name="theme-color"]').content = content.color;
}

let savedTheme;
try { savedTheme = localStorage.getItem('day-night-theme'); } catch { /* Storage may be unavailable in private browsing. */ }
setTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light');

toggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(theme);
  try { localStorage.setItem('day-night-theme', theme); } catch { /* Switching still works without storage. */ }
});
