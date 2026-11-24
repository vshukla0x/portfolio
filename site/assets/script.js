(() => {
  const buttons = document.querySelectorAll('[data-bt]');
  const home = document.getElementById('img-bt-home');
  const result = document.getElementById('img-bt-result');
  const title = document.getElementById('bt-label');
  const preview = document.getElementById('bt-preview');

  buttons.forEach(button => button.addEventListener('click', () => {
    const isResult = button.dataset.bt === 'result';
    home.hidden = isResult;
    result.hidden = !isResult;
    title.textContent = isResult ? 'A clearer answer.' : 'Find your fit.';
    preview.setAttribute('aria-label', isResult
      ? 'Expand Better Tech results screenshot'
      : 'Expand Better Tech homepage screenshot');
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));

  const dialog = document.getElementById('lightbox');
  const enlarged = document.getElementById('light-image');
  const caption = document.getElementById('light-caption');

  function expand(image, text) {
    // Use the full-size source when enlarging a responsive preview.
    enlarged.src = image.src;
    enlarged.alt = image.alt;
    caption.textContent = text;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      document.body.classList.add('has-lightbox');
    }
  }

  document.querySelectorAll('.phone').forEach(button => {
    button.addEventListener('click', () => {
      expand(document.getElementById(button.dataset.image), button.dataset.caption);
    });
  });
  preview.addEventListener('click', () => {
    expand(result.hidden ? home : result, result.hidden
      ? 'Better Tech / Homepage'
      : 'Better Tech / Recommendation');
  });
  dialog.addEventListener('close', () => document.body.classList.remove('has-lightbox'));
  document.getElementById('light-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
})();

(() => {
  const menu = document.querySelector('.mobile-menu');
  if (!menu) return;
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.open = false;
  }));
  document.addEventListener('click', event => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
})();


const sections = ['work', 'about', 'contact'].map(id => document.getElementById(id));
const links = document.querySelectorAll('nav a[href^="#"]:not(.brand)');
let activeSection = null;
let navigationFrame = 0;

function updateNavigation() {
  navigationFrame = 0;
  let current = '';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 110) current = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    current = 'contact';
  }
  if (current === activeSection) return;
  activeSection = current;
  for (const link of links) {
    if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

function scheduleNavigation() {
  if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
}

window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation);
updateNavigation();


const glow = document.querySelector('.spotlight');
const switchGlow = document.querySelector('.glow-toggle');
const followPointer = matchMedia('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)');
let frame = 0;
let point;
function drawGlow(){
  frame = 0;
  glow.style.setProperty('--glow-x', point.clientX + 'px');
  glow.style.setProperty('--glow-y', point.clientY + 'px');
}
window.addEventListener('pointermove', event => {
  if (glow.hidden || !followPointer.matches || event.pointerType === 'touch') return;
  point = event;
  if (!frame) frame = requestAnimationFrame(drawGlow);
}, {passive:true});
switchGlow.addEventListener('click', () => {
  glow.hidden = !glow.hidden;
  switchGlow.setAttribute('aria-pressed', String(!glow.hidden));
  switchGlow.textContent = glow.hidden ? 'Glow off' : 'Glow on';
});


(() => {
  const toggle = document.getElementById('sound-toggle');
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const pointerSounds = matchMedia('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)');
  let audio;
  let enabled = false;
  let lastPointer = null;
  let lastClickTime = -Infinity;
  const activeClicks = new Set();

  if (!AudioContextClass) {
    toggle.textContent = 'Sound unavailable';
    toggle.title = 'Interface audio is unavailable in this browser';
    toggle.disabled = true;
    return;
  }

  function createAudio() {
    const context = new AudioContextClass({ latencyHint: 'interactive' });
    const master = context.createGain();
    master.gain.value = 0.6;
    master.connect(context.destination);

    // One reusable, filtered noise source gives movement a soft brushed texture.
    const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const samples = noiseBuffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;
    const highpass = context.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 450;
    const lowpass = context.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 1300;
    lowpass.Q.value = 0.5;
    const panner = context.createStereoPanner();
    const movement = context.createGain();
    movement.gain.value = 0;
    source.connect(highpass).connect(lowpass).connect(panner).connect(movement).connect(master);
    source.start();
    return { context, master, noiseBuffer, lowpass, panner, movement };
  }

  function updateToggle() {
    toggle.textContent = enabled ? 'Sound on' : 'Sound off';
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.title = enabled ? 'Mute cursor and click sounds' : 'Enable cursor and click sounds';
  }

  function hushMovement() {
    lastPointer = null;
    if (!audio) return;
    const now = audio.context.currentTime;
    audio.movement.gain.cancelScheduledValues(now);
    audio.movement.gain.setTargetAtTime(0, now, 0.025);
  }

  function playClick() {
    if (!enabled || document.hidden || audio.context.state !== 'running') return;
    const now = audio.context.currentTime;
    if (now - lastClickTime < 0.06) return;
    lastClickTime = now;

    // A short falling sine and a tiny filtered tap avoid a sharp digital beep.
    const tone = audio.context.createOscillator();
    const volume = audio.context.createGain();
    tone.type = 'sine';
    tone.frequency.setValueAtTime(620, now);
    tone.frequency.exponentialRampToValueAtTime(270, now + 0.045);
    volume.gain.setValueAtTime(0, now);
    volume.gain.linearRampToValueAtTime(0.095, now + 0.003);
    volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
    tone.connect(volume).connect(audio.master);
    activeClicks.add(tone);
    tone.start(now);
    tone.stop(now + 0.08);
    tone.onended = () => {
      activeClicks.delete(tone);
      tone.disconnect();
      volume.disconnect();
    };

    const tap = audio.context.createBufferSource();
    const filter = audio.context.createBiquadFilter();
    const tapVolume = audio.context.createGain();
    tap.buffer = audio.noiseBuffer;
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 0.7;
    tapVolume.gain.setValueAtTime(0, now);
    tapVolume.gain.linearRampToValueAtTime(0.04, now + 0.002);
    tapVolume.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
    tap.connect(filter).connect(tapVolume).connect(audio.master);
    activeClicks.add(tap);
    tap.start(now);
    tap.stop(now + 0.025);
    tap.onended = () => {
      activeClicks.delete(tap);
      tap.disconnect();
      filter.disconnect();
      tapVolume.disconnect();
    };
  }

  toggle.addEventListener('click', async () => {
    toggle.disabled = true;
    toggle.setAttribute('aria-busy', 'true');
    try {
      if (enabled) {
        enabled = false;
        hushMovement();
        for (const voice of activeClicks) {
          voice.stop();
          voice.disconnect();
        }
        activeClicks.clear();
        await audio.context.suspend();
        audio.movement.gain.cancelScheduledValues(audio.context.currentTime);
        audio.movement.gain.setValueAtTime(0, audio.context.currentTime);
      } else {
        if (!audio) audio = createAudio();
        await audio.context.resume();
        enabled = audio.context.state === 'running';
        updateToggle();
        playClick();
      }
      updateToggle();
    } catch (error) {
      enabled = false;
      hushMovement();
      updateToggle();
      toggle.textContent = 'Retry sound';
      toggle.title = 'Audio could not start. Click to try again.';
    } finally {
      toggle.disabled = false;
      toggle.removeAttribute('aria-busy');
    }
  });

  // Native click events also cover keyboard activation and taps on phones.
  document.addEventListener('click', event => {
    const control = event.target.closest('a, button, summary');
    if (control && control !== toggle && !control.disabled) playClick();
  }, true);

  window.addEventListener('pointermove', event => {
    if (!enabled || !pointerSounds.matches || event.pointerType !== 'mouse' || document.hidden || audio.context.state !== 'running') return;
    const current = { x: event.clientX, y: event.clientY, time: event.timeStamp };
    const previous = lastPointer;
    lastPointer = current;
    if (!previous) return;
    const elapsed = current.time - previous.time;
    if (elapsed <= 0 || elapsed > 150) return;
    const distance = Math.hypot(current.x - previous.x, current.y - previous.y);
    const speed = Math.min(1, distance / elapsed / 1.2);
    if (speed < 0.05) return;
    const now = audio.context.currentTime;
    const gain = audio.movement.gain;
    gain.cancelScheduledValues(now);
    gain.setTargetAtTime(speed * 0.045, now, 0.035);
    gain.setTargetAtTime(0, now + 0.07, 0.03);
    audio.lowpass.frequency.setTargetAtTime(1000 + speed * 1200, now, 0.05);
    audio.panner.pan.setTargetAtTime((current.x / innerWidth - 0.5) * 1.2, now, 0.05);
  }, { passive: true });

  document.documentElement.addEventListener('pointerleave', hushMovement);
  window.addEventListener('pointerdown', hushMovement, { passive: true });
  window.addEventListener('blur', hushMovement);
  document.addEventListener('visibilitychange', hushMovement);
  pointerSounds.addEventListener('change', hushMovement);
})();
