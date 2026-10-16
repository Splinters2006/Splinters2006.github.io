'use strict';

document.querySelectorAll('[data-link]').forEach((link) => {
  const destination = window.METWO_PROFILE?.[link.dataset.link];
  if (destination && new URL(destination).protocol === 'https:') link.href = destination;
});
document.getElementById('year').textContent = new Date().getFullYear();

const toast = document.getElementById('toast');
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
}

const shareDialog = document.getElementById('share-dialog');
const shareUrl = document.getElementById('share-url');
function getPageUrl() {
  const url = new URL(window.location.href);
  url.hash = '';
  return url;
}
document.getElementById('share-button').addEventListener('click', async () => {
  const url = getPageUrl();
  const data = { title: 'MetwoVT — Le petit labo', text: 'Une dose de jeu, une pincée de chaos. Retrouve MetwoVT !', url: url.href };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
  } catch (error) {
    if (error.name === 'AbortError') return;
  }
  try {
    await navigator.clipboard.writeText(data.url);
    notify('Lien copié ! Le labo t’attend. ♡');
  } catch {
    shareUrl.value = data.url;
    shareDialog.showModal();
    shareUrl.focus();
    shareUrl.select();
  }
});
document.getElementById('select-url').addEventListener('click', () => {
  shareUrl.focus();
  shareUrl.select();
  shareUrl.setSelectionRange(0, shareUrl.value.length);
});
const qrDialog = document.getElementById('mobile-qr-dialog');
const qrContainer = document.getElementById('mobile-qr-code');
const qrPageUrl = document.getElementById('qr-page-url');
const qrError = document.getElementById('qr-error');
document.getElementById('mobile-qr-button').addEventListener('click', () => {
  const url = getPageUrl();
  qrPageUrl.href = url.href;
  qrPageUrl.textContent = url.host + url.pathname + url.search;
  qrContainer.replaceChildren();
  qrContainer.hidden = false;
  qrError.hidden = true;
  try {
    new QRCode(qrContainer, {
      text: url.href,
      width: 224,
      height: 224,
      colorDark: '#4b302d',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
    qrContainer.removeAttribute('title');
    qrContainer.querySelectorAll('img').forEach(image => { image.alt = ''; });
  } catch {
    qrContainer.hidden = true;
    qrError.hidden = false;
  }
  qrDialog.showModal();
});
[shareDialog, qrDialog].forEach(dialog => {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});
