// Carry the chosen atmosphere into the secret gallery.
let secretTheme = 'light';
try {
  if (localStorage.getItem('day-night-theme') === 'dark') secretTheme = 'dark';
} catch { /* The gallery also works when storage is unavailable. */ }
document.documentElement.dataset.theme = secretTheme;
document.querySelector('meta[name="theme-color"]').content =
  secretTheme === 'dark' ? '#171e2a' : '#f6f3e9';
