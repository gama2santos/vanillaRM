  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor(centerX, centerY) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.reset();
    }

    reset() {
      this.angle = Math.random() * 2 * Math.PI;
      this.radius = 20 + Math.random() * 80;
      this.size = 2 + Math.random() * 3;
      this.speed = 0.01 + Math.random() * 0.03;
      this.alpha = 0.3 + Math.random() * 0.7;
      this.grow = Math.random() > 0.5 ? 0.05 : -0.05;
    }

    update() {
      this.angle += this.speed;
      this.radius += this.grow;
      if (this.radius < 20 || this.radius > 120) this.grow *= -1;
    }

    draw(ctx) {
      const x = this.centerX + Math.cos(this.angle) * this.radius;
      const y = this.centerY + Math.sin(this.angle) * this.radius;

      // Glow radial
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.size * 3);
      gradient.addColorStop(0, `rgba(138,43,226,${this.alpha})`);
      gradient.addColorStop(0.5, `rgba(0,255,0,${this.alpha / 2})`);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = [];
  const particleCount = 120;

  function initParticles() {
    particles.length = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(centerX, centerY));
    }
  }

  initParticles();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particles.forEach(p => {
      p.centerX = centerX;
      p.centerY = centerY;
      p.update();
      p.draw(ctx);
    });

    requestAnimationFrame(animate);
  }

  animate();