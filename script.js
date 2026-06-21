const RELEASE_DATE = new Date('2026-11-19T00:00:00').getTime();

const el = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  countdown: document.querySelector('.countdown'),
  released: document.getElementById('released'),
};

const pad = (n) => String(n).padStart(2, '0');
const pad3 = (n) => String(n).padStart(3, '0');

function tick() {
  const now = Date.now();
  const diff = RELEASE_DATE - now;

  if (diff <= 0) {
    showReleased();
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  el.days.textContent    = pad3(days);
  el.hours.textContent   = pad(hours);
  el.minutes.textContent = pad(minutes);
  el.seconds.textContent = pad(seconds);
}

function showReleased() {
  el.days.textContent = '00';
  el.hours.textContent = '00';
  el.minutes.textContent = '00';
  el.seconds.textContent = '00';

  if (el.released && el.released.classList.contains('hidden')) {
    el.released.classList.remove('hidden');
  }
}

tick();
setInterval(tick, 1000);
