/**
 * UNFOLD 2026 — Dynamic Dark Background with Yellowish Responsive Physics
 * Features: Deep Dark Canvas (#090D16), Glowing Volt Yellow Mouse Spotlight, Flowing Wave Mesh & Particle Constellation
 */

(function () {
  let canvas, ctx;
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 260 };
  let waveTime = 0;
  let floatingNodes = [];

  function init() {
    canvas = document.getElementById('interactive-bg');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'interactive-bg';
      document.body.prepend(canvas);
    }

    ctx = canvas.getContext('2d');
    resize();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    createParticles();
    createFloatingNodes();
    animate();
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
    createFloatingNodes();
  }

  function onMouseMove(e) {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
    }
  }

  function onMouseLeave() {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 7000), 140);

    for (let i = 0; i < count; i++) {
      const isVolt = Math.random() < 0.75;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: isVolt ? Math.random() * 3.5 + 2 : Math.random() * 2 + 1,
        color: isVolt ? 'rgba(234, 239, 0, ' : 'rgba(255, 255, 255, ',
        baseAlpha: isVolt ? Math.random() * 0.8 + 0.35 : Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.04 + 0.015,
        pulseAngle: Math.random() * Math.PI * 2,
        shape: Math.random() < 0.3 ? 'square' : 'circle'
      });
    }
  }

  function createFloatingNodes() {
    floatingNodes = [];
    for (let i = 0; i < 7; i++) {
      floatingNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 200 + 130,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        angle: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? 'rgba(234, 239, 0, 0.18)' : 'rgba(255, 255, 255, 0.05)'
      });
    }
  }

  function drawWaveMesh() {
    waveTime += 0.02;
    ctx.save();
    ctx.strokeStyle = 'rgba(234, 239, 0, 0.18)';
    ctx.lineWidth = 1.5;

    for (let y = 50; y < height; y += 120) {
      ctx.beginPath();
      for (let x = 0; x < width; x += 25) {
        let dy = Math.sin(x * 0.008 + waveTime + y * 0.01) * 22;
        if (x === 0) {
          ctx.moveTo(x, y + dy);
        } else {
          ctx.lineTo(x, y + dy);
        }
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function animate() {
    mouse.x += (mouse.targetX - mouse.x) * 0.15;
    mouse.y += (mouse.targetY - mouse.y) * 0.15;

    ctx.clearRect(0, 0, width, height);

    // Deep Obsidian Dark Space Backdrop Background (#090D16)
    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, width, height);

    // 1. High-Energy Volt Yellow Mouse Spotlight Glow
    if (mouse.x > 0 && mouse.y > 0) {
      let spotGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 1.6);
      spotGrad.addColorStop(0, 'rgba(234, 239, 0, 0.4)');
      spotGrad.addColorStop(0.4, 'rgba(234, 239, 0, 0.15)');
      spotGrad.addColorStop(1, 'rgba(9, 13, 22, 0)');

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Flowing Yellowish Wave Mesh Lines
    drawWaveMesh();

    // 3. Floating Glow Orbs
    for (let node of floatingNodes) {
      node.angle += 0.008;
      node.x += Math.sin(node.angle) * node.vx;
      node.y += Math.cos(node.angle) * node.vy;

      if (node.x < -100) node.x = width + 100;
      if (node.x > width + 100) node.x = -100;
      if (node.y < -100) node.y = height + 100;
      if (node.y > height + 100) node.y = -100;

      let grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r);
      grad.addColorStop(0, node.color);
      grad.addColorStop(1, 'rgba(9, 13, 22, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Yellowish Responsive Particles & Constellation Connection Rays
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      p.pulseAngle += p.pulseSpeed;
      let alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.25;
      alpha = Math.max(0.25, Math.min(0.95, alpha));

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse Attraction & Repulsion Physics
      let dx = mouse.x - p.x;
      let dy = mouse.y - p.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        let force = (mouse.radius - dist) / mouse.radius;
        let angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * force * 7.5;
        p.y -= Math.sin(angle) * force * 7.5;
      }

      // Draw Particle
      ctx.beginPath();
      if (p.shape === 'square') {
        ctx.rect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
      } else {
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = p.color + alpha + ')';
      ctx.shadowColor = 'rgba(234, 239, 0, 0.85)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Constellation Network Lines between particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let pDx = p.x - p2.x;
        let pDy = p.y - p2.y;
        let pDist = Math.sqrt(pDx * pDx + pDy * pDy);

        if (pDist < 140) {
          let lineAlpha = (1 - pDist / 140) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(234, 239, 0, ${lineAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      // Glowing Connector Rays directly to Cursor Position
      if (dist < mouse.radius) {
        let mouseLineAlpha = (1 - dist / mouse.radius) * 0.75;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(234, 239, 0, ${mouseLineAlpha})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
    }

    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
