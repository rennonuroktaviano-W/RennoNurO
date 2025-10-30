// Candlestick Background Animation - Full Screen
function createCandlesticks() {
  const bgAnimation = document.querySelector('.bg-animation');
  if (!bgAnimation) return;

  const candlesContainer = document.createElement('div');
  candlesContainer.className = 'candlesticks-container';
  candlesContainer.style.cssText = `
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: visible;
    pointer-events: none;
    z-index: 1;
  `;

  // Function to create a single candlestick
  function createCandle() {
    const candle = document.createElement('div');
    const isGreen = Math.random() > 0.5;
    const bodyHeight = Math.random() * 80 + 30;
    const wickTopHeight = Math.random() * 20 + 5;
    const wickBottomHeight = Math.random() * 20 + 5;
    const startPosition = Math.random() * 100;
    const startTop = Math.random() * 100; // Changed to use full height
    const animationDuration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;

    candle.style.cssText = `
      position: fixed;
      left: ${startPosition}%;
      top: ${startTop}%;
      width: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0;
      animation: candleAppear ${animationDuration}s ease-in-out ${delay}s;
      z-index: 1;
    `;

    // Top wick
    const wickTop = document.createElement('div');
    wickTop.style.cssText = `
      width: 2px;
      height: ${wickTopHeight}px;
      background: ${isGreen ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)'};
      margin-bottom: 0;
    `;

    // Candle body
    const body = document.createElement('div');
    body.style.cssText = `
      width: 100%;
      height: ${bodyHeight}px;
      background: ${isGreen ? 
        'linear-gradient(180deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.5))' : 
        'linear-gradient(180deg, rgba(239, 68, 68, 0.8), rgba(239, 68, 68, 0.5))'};
      box-shadow: 0 0 15px ${isGreen ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)'};
      border: 1px solid ${isGreen ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
      animation: candleFlicker ${animationDuration * 0.5}s ease-in-out infinite;
    `;

    // Bottom wick
    const wickBottom = document.createElement('div');
    wickBottom.style.cssText = `
      width: 2px;
      height: ${wickBottomHeight}px;
      background: ${isGreen ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)'};
      margin-top: 0;
    `;

    candle.appendChild(wickTop);
    candle.appendChild(body);
    candle.appendChild(wickBottom);

    return candle;
  }

  // Create initial candles across full screen
  function spawnCandles() {
    const numCandles = window.innerWidth < 768 ? 12 : 25; // More candles for full coverage
    for (let i = 0; i < numCandles; i++) {
      setTimeout(() => {
        const candle = createCandle();
        candlesContainer.appendChild(candle);
        
        setTimeout(() => {
          candle.remove();
        }, 7000);
      }, i * 200); // Faster spawn rate
    }
  }

  spawnCandles();
  setInterval(spawnCandles, 3500); // More frequent spawning

  document.body.appendChild(candlesContainer);

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes candleAppear {
      0% {
        opacity: 0;
        transform: translateY(20px) scale(0.8);
      }
      20% {
        opacity: 0.8;
        transform: translateY(0) scale(1);
      }
      80% {
        opacity: 0.8;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-20px) scale(0.8);
      }
    }

    @keyframes candleFlicker {
      0%, 100% {
        opacity: 0.8;
        filter: brightness(1);
      }
      25% {
        opacity: 0.6;
        filter: brightness(0.9);
      }
      50% {
        opacity: 1;
        filter: brightness(1.1);
      }
      75% {
        opacity: 0.7;
        filter: brightness(0.95);
      }
    }
  `;
  document.head.appendChild(style);
}

// Smooth Scroll Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Button Click Effect for Join Discord
const joinBtn = document.querySelector('.join-discord');
if (joinBtn) {
  joinBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    window.open('https://discord.gg/N9PQ5AYH', '_blank');
  });

  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
}

// Intersection Observer for Animation on Scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe feature boxes
document.querySelectorAll('.feature-box').forEach((box, index) => {
  box.style.opacity = '0';
  box.style.transform = 'translateY(50px)';
  box.style.transition = `all 0.6s ease ${index * 0.2}s`;
  observer.observe(box);
});

// Observe roadmap steps
document.querySelectorAll('.step-vertikal').forEach((step) => {
  observer.observe(step);
});

// Mouse Glow Effect on Boxes
document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('mousemove', (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    box.style.setProperty('--mouse-x', x + 'px');
    box.style.setProperty('--mouse-y', y + 'px');
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createCandlesticks();
  
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});