/* ============================================
   SOMETHING ABOUT LINDA — script.js
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  // ── Scene registry ──────────────────────────────────────
  const scenes = [
    "scene-intro",
    "scene-universe",
    "scene-riddle1",
    "scene-letter1",
    "scene-bird",
    "scene-riddle2",
    "scene-daft",
    "scene-arthur",
    "scene-photos",
    "scene-riddle3",
    "scene-video",
    "scene-proposal"
  ];
  let current = 0;

  function goTo(index) {
    const prev = document.getElementById(scenes[current]);
    const next = document.getElementById(scenes[index]);
    if (prev) prev.classList.remove("active");
    current = index;
    setTimeout(() => {
      if (next) {
        next.classList.add("active");
        onEnterScene(scenes[index]);
      }
    }, 400);
  }

  function onEnterScene(id) {
    switch (id) {
      case "scene-universe":   initSpaceCanvas();    break;
      case "scene-daft":       initDaftCanvas();     break;
      case "scene-proposal":   initConfetti(); spawnTulipShower(); break;
      case "scene-riddle3":    spawnTulipRain();     break;
      case "scene-arthur":     runDialogue();        break;
    }
  }

  // ── Music ────────────────────────────────────────────────
  const music = document.getElementById("bg-music");
  let musicStarted = false;
  function tryMusic() {
    if (!musicStarted) {
      music.volume = 0.35;
      music.play().catch(() => {});
      musicStarted = true;
    }
  }

  // ── SCENE 0: INTRO — starfield + click ──────────────────
  initStarfield();

  document.getElementById("scene-intro").addEventListener("click", () => {
    tryMusic();
    goTo(1);
  });

  function initStarfield() {
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");
    let stars = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        alpha: Math.random()
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += (Math.random() - 0.5) * 0.03;
        s.alpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 210, 230, ${s.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
  }

  // ── SCENE 1: UNIVERSE ───────────────────────────────────
  document.getElementById("btn-u1").addEventListener("click", () => goTo(2));

  function initSpaceCanvas() {
    const canvas = document.getElementById("space-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.2 + 0.02,
        drift: (Math.random() - 0.5) * 0.3
      }));
    }

    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -2) { p.y = canvas.height + 2; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,230,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
  }

  // ── SCENE 2: RIDDLE 1 ───────────────────────────────────
  setupRiddle("riddle1-opts", "r1-ok", "r1-wrong", "btn-r1", 3);

  document.getElementById("btn-r1").addEventListener("click", () => goTo(3));

  // ── SCENE 3: LETTER 1 ───────────────────────────────────
  const env1    = document.getElementById("env1");
  const envFront = env1.querySelector(".envelope-front");
  const paper1  = document.getElementById("letter1-paper");

  env1.addEventListener("click", () => {
    if (paper1.classList.contains("hidden")) {
      envFront.style.display = "none";
      paper1.classList.remove("hidden");
    }
  });

  document.getElementById("btn-l1").addEventListener("click", () => goTo(4));

  // ── SCENE 4: BIRD ───────────────────────────────────────
  document.getElementById("btn-bird").addEventListener("click", () => {
    launchBird();
    setTimeout(() => goTo(5), 1800);
  });

  function launchBird() {
    const wrap = document.getElementById("paper-bird-wrap");
    wrap.style.transition = "transform 1.8s cubic-bezier(0.3,0,0.5,1), opacity 1.8s ease";
    wrap.style.transform  = "translate(60vw, -60vh) scale(0.3) rotate(30deg)";
    wrap.style.opacity    = "0";
  }

  // ── SCENE 5: RIDDLE 2 ───────────────────────────────────
  setupRiddle("riddle2-opts", "r2-ok", "r2-wrong", "btn-r2", 6);

  document.getElementById("btn-r2").addEventListener("click", () => goTo(6));

  // ── SCENE 6: DAFT PUNK ──────────────────────────────────
  document.getElementById("btn-daft").addEventListener("click", () => goTo(7));

  function initDaftCanvas() {
    const canvas = document.getElementById("daft-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.001,
      hue: Math.random() * 80 + 280 // purple-pink
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x = (d.x + d.vx + 1) % 1;
        d.y = (d.y + d.vy + 1) % 1;
        const px = d.x * canvas.width;
        const py = d.y * canvas.height;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue}, 80%, 70%, 0.5)`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
  }

  // ── SCENE 7: ARTHUR DIALOGUE ────────────────────────────
  document.getElementById("btn-arthur").addEventListener("click", () => goTo(8));

  function runDialogue() {
    const ab1 = document.getElementById("ab1");
    const nb1 = document.getElementById("nb1");
    const ab2 = document.getElementById("ab2");
    const nb2 = document.getElementById("nb2");
    const btn = document.getElementById("btn-arthur");

    // Reset visibility
    [nb1, ab2, nb2, btn].forEach(el => el.classList.add("hidden"));
    ab1.classList.remove("hidden");

    setTimeout(() => nb1.classList.remove("hidden"), 2200);
    setTimeout(() => ab2.classList.remove("hidden"), 4500);
    setTimeout(() => nb2.classList.remove("hidden"), 6800);
    setTimeout(() => btn.classList.remove("hidden"), 9000);
  }

  // ── SCENE 8: PHOTOS ─────────────────────────────────────
  document.getElementById("btn-photos").addEventListener("click", () => goTo(9));

  // ── SCENE 9: RIDDLE 3 ───────────────────────────────────
  setupRiddle("riddle3-opts", "r3-ok", "r3-wrong", "btn-r3", 10);

  document.getElementById("btn-r3").addEventListener("click", () => goTo(10));

  function spawnTulipRain() {
    const container = document.getElementById("tulip-rain");
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 18; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "tulip-fall";
        el.textContent = "🌷";
        el.style.left     = Math.random() * 100 + "vw";
        el.style.fontSize = (Math.random() * 1.2 + 0.8) + "rem";
        el.style.opacity  = (Math.random() * 0.4 + 0.3).toString();
        const dur = Math.random() * 4 + 5;
        el.style.animationDuration = dur + "s";
        container.appendChild(el);
        setTimeout(() => el.remove(), dur * 1000);
      }, i * 600);
    }
  }

  // ── SCENE 10: VIDEO ─────────────────────────────────────
  // Show placeholder if no real video file
  const videoEl = document.getElementById("main-video");
  const videoPlaceholder = document.getElementById("video-placeholder");

  videoEl.addEventListener("error", () => {
    videoEl.style.display = "none";
    if (videoPlaceholder) videoPlaceholder.style.display = "flex";
  });

  // If src is placeholder, just show placeholder
  if (!videoEl.src || videoEl.src.includes("tu-video-aqui")) {
    videoEl.style.display = "none";
    if (videoPlaceholder) videoPlaceholder.style.display = "flex";
  }

  document.getElementById("btn-video").addEventListener("click", () => goTo(11));

  // ── SCENE 11: PROPOSAL ──────────────────────────────────
  const btnYes = document.getElementById("btn-yes");
  const btnNo  = document.getElementById("btn-no");
  const responseDiv = document.getElementById("response-yes");

  btnYes.addEventListener("click", () => {
    document.getElementById("proposal-btns").style.display = "none";
    responseDiv.classList.remove("hidden");
    burstConfetti();
    spawnHeartExplosion();
  });

  // "No" button runs away
  btnNo.addEventListener("mouseenter", () => {
    const btn = btnNo;
    const maxX = window.innerWidth  - 100;
    const maxY = window.innerHeight - 50;
    const rx = Math.floor(Math.random() * maxX);
    const ry = Math.floor(Math.random() * maxY);
    btn.style.position = "fixed";
    btn.style.left = rx + "px";
    btn.style.top  = ry + "px";
    btn.style.zIndex = "9999";
    btn.style.transition = "left 0.3s ease, top 0.3s ease";
  });

  // ── CONFETTI ────────────────────────────────────────────
  function initConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  let confettiActive = false;
  function burstConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff69b4","#ffb6d9","#ff1493","#ffc0cb","#ff85c0","#ffffff","#ffd6eb"];
    const particles = Array.from({ length: 120 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 4,
      r: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      gravity: 0.25,
      alpha: 1
    }));

    confettiActive = true;
    function draw() {
      if (!confettiActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.vy += p.gravity;
        p.x  += p.vx;
        p.y  += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.008;
        if (p.alpha > 0) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        ctx.restore();
      });
      if (alive) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

  function spawnTulipShower() {
    const container = document.getElementById("tulip-shower");
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "tulip-fall";
        el.textContent = i % 3 === 0 ? "💗" : "🌷";
        el.style.left     = Math.random() * 100 + "vw";
        el.style.fontSize = (Math.random() * 1.5 + 1) + "rem";
        const dur = Math.random() * 5 + 4;
        el.style.animationDuration = dur + "s";
        container.appendChild(el);
        setTimeout(() => el.remove(), dur * 1000 + 500);
      }, i * 300);
    }
  }

  function spawnHeartExplosion() {
    for (let i = 0; i < 18; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        position:fixed;
        font-size:${Math.random()*1.5+1}rem;
        left:${Math.random()*100}vw;
        top:${Math.random()*40+30}vh;
        pointer-events:none;
        z-index:9998;
        animation: fall-tulip ${Math.random()*3+2}s linear forwards;
      `;
      el.textContent = "💗";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }
  }

  // ── RIDDLE HELPER ────────────────────────────────────────
  function setupRiddle(optsId, okId, wrongId, nextBtnId, nextScene) {
    const opts    = document.getElementById(optsId);
    const okEl    = document.getElementById(okId);
    const wrongEl = document.getElementById(wrongId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!opts) return;

    opts.querySelectorAll(".riddle-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.dataset.correct === "true";
        opts.querySelectorAll(".riddle-opt").forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add("correct");
          okEl.classList.remove("hidden");
          wrongEl.classList.add("hidden");
          setTimeout(() => nextBtn.classList.remove("hidden"), 900);
        } else {
          btn.classList.add("wrong-pick");
          wrongEl.classList.remove("hidden");
          okEl.classList.add("hidden");
          setTimeout(() => {
            opts.querySelectorAll(".riddle-opt").forEach(b => {
              b.disabled = false;
              b.classList.remove("wrong-pick");
            });
            wrongEl.classList.add("hidden");
          }, 1400);
        }
      });
    });
  }

});
