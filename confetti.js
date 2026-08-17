// Lightweight Pastel Confetti & Sparkle Burst for Kawaii celebrations

export function triggerConfetti() {
  const count = 60;
  const colors = ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#E8DFF5', '#FF9AA2', '#FDE2E4'];
  const shapes = ['🌸', '✨', '💖', '⭐', '🍬', '🎀', '●', '★'];

  const container = document.createElement('div');
  container.className = 'confetti-container';
  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '99999';
  container.style.overflow = 'hidden';
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const isEmoji = Math.random() > 0.5;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    el.style.position = 'absolute';
    el.style.left = `${Math.random() * 100}%`;
    el.style.top = '-20px';
    el.style.fontSize = isEmoji ? `${14 + Math.random() * 16}px` : `${8 + Math.random() * 10}px`;
    el.style.color = color;
    el.style.userSelect = 'none';
    el.textContent = isEmoji ? shape : '●';

    const duration = 2.5 + Math.random() * 2;
    const horizontalDrift = (Math.random() - 0.5) * 200;
    const rotation = Math.random() * 720 - 360;

    el.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${horizontalDrift}px, ${window.innerHeight + 50}px) rotate(${rotation}deg)`, opacity: 0.1 }
    ], {
      duration: duration * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay: Math.random() * 300
    });

    container.appendChild(el);
  }

  setTimeout(() => {
    container.remove();
  }, 5000);
}
