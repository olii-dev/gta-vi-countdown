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

// Track previous values so we only flash the units that actually changed
let prev = { days: null, hours: null, minutes: null, seconds: null };

function setUnit(unit, value) {
  if (prev[unit] === value) return; // no change, no flash
  el[unit].textContent = value;
  prev[unit] = value;
  // Re-trigger the tick pulse animation
  el[unit].classList.remove('tick');
  void el[unit].offsetWidth; // force reflow
  el[unit].classList.add('tick');
}

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

  setUnit('days',    pad3(days));
  setUnit('hours',   pad(hours));
  setUnit('minutes', pad(minutes));
  setUnit('seconds', pad(seconds));
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
