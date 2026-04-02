/* ============================================================
   SOMETHING ABOUT LINDA v2 — script.js
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ── SCENES ──────────────────────────────────────────── */
  const SCENES = ["s0","s1","s2","s3","s4","s5","s6","s7","s8","s8b","s9","s10","s11","s11b","s12","s13","s14","s15"];
  let cur = 0;

  function goTo(idx) {
    const prev = document.getElementById(SCENES[cur]);
    if (prev) prev.classList.remove("active");
    cur = idx;
    setTimeout(() => {
      const next = document.getElementById(SCENES[cur]);
      if (next) {
        next.classList.add("active");
        onEnter(SCENES[cur]);
      }
    }, 500);
  }

  function onEnter(id) {
    const fns = {
      "s1":   initSpaceCanvas,
      "s4":   initBirdScene,
      "s5":   initSeraphineScene,
      "s7":   initDaftCanvas,
      "s8":   runDialogue,
      "s8b":  initCookingGame,
      "s11b": initFoxScene,
      "s12":  animatePolaroids,
      "s15":  () => { initConfettiCanvas(); spawnTulipShower(); initDayCounter(); }
    };
    if (fns[id]) fns[id]();
  }

  /* ── MUSIC ───────────────────────────────────────────── */
  const music = document.getElementById("bg-music");
  let musicOn = false;
  function tryMusic() {
    if (!musicOn) { music.volume = 0.32; music.play().catch(()=>{}); musicOn = true; }
  }

  /* ══════════════════════════════════════════════════════
     SCENE 0 — INTRO
  ══════════════════════════════════════════════════════ */
  initStarfield();
  document.getElementById("vinyl-big").addEventListener("click", () => {
    tryMusic();
    goTo(1);
  });

  function initStarfield() {
    const cv = document.getElementById("c-stars");
    const cx = cv.getContext("2d");
    let stars = [];
    const resize = () => {
      cv.width = innerWidth; cv.height = innerHeight;
      stars = Array.from({length:200}, () => ({
        x: Math.random()*cv.width, y: Math.random()*cv.height,
        r: Math.random()*1.4+.3, a: Math.random(), s: Math.random()*.25+.03
      }));
    };
    const draw = () => {
      cx.clearRect(0,0,cv.width,cv.height);
      stars.forEach(s => {
        s.a += (Math.random()-.5)*.025;
        s.a = Math.max(.05, Math.min(1,s.a));
        cx.beginPath(); cx.arc(s.x,s.y,s.r,0,Math.PI*2);
        cx.fillStyle = `rgba(255,210,230,${s.a})`; cx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize",resize); draw();
  }

  /* ══════════════════════════════════════════════════════
     SCENE 1 — UNIVERSE
  ══════════════════════════════════════════════════════ */
  document.getElementById("btn-s1").addEventListener("click", () => goTo(2));

  function initSpaceCanvas() {
    const cv = document.getElementById("c-space"); if (!cv) return;
    const cx = cv.getContext("2d");
    const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
    const pts = Array.from({length:130}, () => ({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.0008, vy:(Math.random()-.5)*.0008,
      a:Math.random()*.7+.2, r:Math.random()*.9+.2
    }));
    const draw = () => {
      cx.clearRect(0,0,cv.width,cv.height);
      pts.forEach(p => {
        p.x=(p.x+p.vx+1)%1; p.y=(p.y+p.vy+1)%1;
        cx.beginPath(); cx.arc(p.x*cv.width,p.y*cv.height,p.r,0,Math.PI*2);
        cx.fillStyle=`rgba(255,200,230,${p.a})`; cx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize",resize); draw();
  }

  /* ══════════════════════════════════════════════════════
     SCENE 2 — RIDDLE 1
  ══════════════════════════════════════════════════════ */
  setupRiddle("r1-opts","r1-pos","r1-neg","btn-s2");
  document.getElementById("btn-s2").addEventListener("click", () => goTo(3));

  /* ══════════════════════════════════════════════════════
     SCENE 3 — LETTER 1
  ══════════════════════════════════════════════════════ */
  setupEnvelope("env-s3","env-s3-cover","env-s3-letter");
  document.getElementById("btn-s3").addEventListener("click", () => goTo(4));

  /* ══════════════════════════════════════════════════════
     SCENE 4 — BIRD + NEW PLANET
  ══════════════════════════════════════════════════════ */
  function initBirdScene() {
    const birdScene   = document.getElementById("bird-scene");
    const birdSVG     = document.getElementById("paper-bird");
    const birdPrompt  = document.getElementById("bird-prompt");
    const birdSub     = document.getElementById("bird-sub");
    const birdBtn     = document.getElementById("btn-bird-go");
    const newPlanet   = document.getElementById("new-planet-scene");

    // Reset state
    birdSVG.style.transform = "";
    birdSVG.style.opacity   = "1";
    birdSVG.style.transition = "";
    birdScene.classList.remove("hidden");
    newPlanet.classList.add("hidden");

    // Show sub-text and button after delay
    setTimeout(() => birdSub.classList.remove("hidden"), 1800);
    setTimeout(() => birdBtn.classList.remove("hidden"), 2800);

    // Sky canvas
    initBirdSkyCanvas();
  }

  document.getElementById("btn-bird-go").addEventListener("click", () => {
    const birdSVG   = document.getElementById("paper-bird");
    const birdScene = document.getElementById("bird-scene");
    const newPlanet = document.getElementById("new-planet-scene");

    // Bird flies across the screen
    birdSVG.style.transition = "transform 2s cubic-bezier(.3,0,.4,1), opacity 2s ease";
    birdSVG.style.transform  = "translate(55vw,-65vh) scale(0.2) rotate(25deg)";
    birdSVG.style.opacity    = "0.1";

    setTimeout(() => {
      birdScene.classList.add("hidden");
      newPlanet.classList.remove("hidden");
      initNewPlanetCanvas();
    }, 1800);
  });

  document.getElementById("btn-s4").addEventListener("click", () => goTo(5));

  function initBirdSkyCanvas() {
    const cv = document.getElementById("c-bird-sky"); if (!cv) return;
    const cx = cv.getContext("2d");
    const resize = () => { cv.width=innerWidth; cv.height=innerHeight; };
    const pts = Array.from({length:80},()=>({
      x:Math.random()*100, y:Math.random()*100,
      r:Math.random()*1.5+.5, a:Math.random()*.8+.2
    }));
    const draw = () => {
      cx.clearRect(0,0,cv.width,cv.height);
      pts.forEach(p => {
        p.a += (Math.random()-.5)*.02; p.a=Math.max(.1,Math.min(.9,p.a));
        cx.beginPath(); cx.arc(p.x/100*cv.width, p.y/100*cv.height, p.r,0,Math.PI*2);
        cx.fillStyle=`rgba(255,180,230,${p.a})`; cx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize",resize); draw();
  }

  function initNewPlanetCanvas() {
    const cv = document.getElementById("c-new-planet"); if (!cv) return;
    const cx = cv.getContext("2d");
    const resize = () => { cv.width=innerWidth; cv.height=innerHeight; };
    const pts = Array.from({length:120},()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.0006, vy:(Math.random()-.5)*.0006,
      a:Math.random()*.7+.2, r:Math.random()*.9+.2,
      hue:Math.random()*60+270
    }));
    const draw = () => {
      cx.clearRect(0,0,cv.width,cv.height);
      pts.forEach(p => {
        p.x=(p.x+p.vx+1)%1; p.y=(p.y+p.vy+1)%1;
        cx.beginPath(); cx.arc(p.x*cv.width,p.y*cv.height,p.r,0,Math.PI*2);
        cx.fillStyle=`hsla(${p.hue},80%,80%,${p.a})`; cx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize",resize); draw();
  }

  /* ══════════════════════════════════════════════════════
     SCENE 5 — SERAPHINE
  ══════════════════════════════════════════════════════ */
  document.getElementById("btn-s5").addEventListener("click", () => goTo(6));

  function initSeraphineScene() {
    spawnSeraphineElements();
    initSeraCanvas();
  }

  function spawnSeraphineElements() {
    // Petals
    const petalCont = document.getElementById("sera-petals");
    if (!petalCont) return;
    petalCont.innerHTML = "";
    const emojis = ["🌸","🌷","✨","💜","🎵"];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "petal";
        el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        el.style.left = Math.random()*100 + "%";
        el.style.top  = "-40px";
        const rot = (Math.random()-0.5)*720;
        el.style.setProperty("--pr", rot+"deg");
        const dur = Math.random()*4+4;
        el.style.animationDuration = dur+"s";
        petalCont.appendChild(el);
        setTimeout(()=>el.remove(), dur*1000+200);
      }, i*400);
    }

    // Musical notes
    const noteCont = document.getElementById("sera-notes");
    if (!noteCont) return;
    noteCont.innerHTML = "";
    const notes = ["♪","♫","🎵","♩"];
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.style.cssText = `
          position:absolute; font-size:${Math.random()*.8+.8}rem;
          left:${Math.random()*80+10}%;
          top:${Math.random()*80+10}%;
          pointer-events:none;
          --nx: ${(Math.random()-0.5)*120}px;
          --ny: ${-(Math.random()*80+40)}px;
          animation: note-fly 2s ease forwards;
        `;
        el.textContent = notes[Math.floor(Math.random()*notes.length)];
        noteCont.appendChild(el);
        setTimeout(()=>el.remove(),2100);
      }, i*500);
    }
  }

  function initSeraCanvas() {
    const cv = document.getElementById("c-sera"); if (!cv) return;
    const cx = cv.getContext("2d");
    const resize = () => { cv.width=innerWidth; cv.height=innerHeight; };
    const pts = Array.from({length:80},()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.0007, vy:(Math.random()-.5)*.0007,
      hue:Math.random()*60+240, a:.4+Math.random()*.5, r:.5+Math.random()*1.2
    }));
    const draw = () => {
      cx.clearRect(0,0,cv.width,cv.height);
      pts.forEach(p => {
        p.x=(p.x+p.vx+1)%1; p.y=(p.y+p.vy+1)%1;
        cx.beginPath(); cx.arc(p.x*cv.width,p.y*cv.height,p.r,0,Math.PI*2);
        cx.fillStyle=`hsla(${p.hue},70%,80%,${p.a})`; cx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize",resize); draw();
  }

  /* ══════════════════════════════════════════════════════
     SCENE 6 — RIDDLE 2
  ══════════════════════════════════════════════════════ */
  setupRiddle("r2-opts","r2-pos","r2-neg","btn-s6");
  document.getElementById("btn-s6").addEventListener("click", () => goTo(7));

  /* ══════════════════════════════════════════════════════
     SCENE 7 — DAFT PUNK
  ══════════════════════════════════════════════════════ */
  document.getElementById("btn-s7").addEventListener("click", () => goTo(8));

  function initDaftCanvas() {
    const cv = document.getElementById("c-daft"); if (!cv) return;
    const cx = cv.getContext("2d");
    const resize = () => { cv.width=innerWidth; cv.height=innerHeight; };
    const pts = Array.from({length:60},()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-.5)*.001, vy:(Math.random()-.5)*.001,
      hue:Math.random()*80+280, r:1+Math.random()*1.5
    }));
    const draw = () => {
      cx.clearRect(0,0,cv.width,cv.height);
      pts.forEach(p => {
        p.x=(p.x+p.vx+1)%1; p.y=(p.y+p.vy+1)%1;
        cx.beginPath(); cx.arc(p.x*cv.width,p.y*cv.height,p.r,0,Math.PI*2);
        cx.fillStyle=`hsla(${p.hue},80%,70%,.45)`; cx.fill();
      });
      requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize",resize); draw();
  }

  /* ══════════════════════════════════════════════════════
     SCENE 8 — ARTHUR DIALOGUE
  ══════════════════════════════════════════════════════ */
  document.getElementById("btn-s8").addEventListener("click", () => goTo(9)); // → cooking game (s8b)
  // btn-s8 actually now goes to s8b (cooking game) - updated below

  function runDialogue() {
    const ids = ["d1","d2","d3","d4","d5"];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.classList.add("hidden"); }
    });
    document.getElementById("btn-s8").classList.add("hidden");

    // Typewriter effect per bubble
    function typewriterBubble(id, delay) {
      setTimeout(() => {
        const row = document.getElementById(id);
        if (!row) return;
        row.classList.remove("hidden");
        const bubble = row.querySelector(".bubble");
        if (!bubble) return;
        const original = bubble.innerHTML;
        bubble.innerHTML = "";
        bubble.style.minHeight = "3em";
        let i = 0;
        const chars = original;
        // Strip HTML for typewriter, then restore
        const txt = chars.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
        const interval = setInterval(() => {
          bubble.textContent = txt.slice(0, i);
          i++;
          if (i > txt.length) { clearInterval(interval); bubble.innerHTML = original; }
        }, 28);
      }, delay);
    }

    typewriterBubble("d1", 300);
    typewriterBubble("d2", 2800);
    typewriterBubble("d3", 5300);
    typewriterBubble("d4", 7800);
    setTimeout(() => {
      const d5 = document.getElementById("d5");
      if (d5) d5.classList.remove("hidden");
    }, 10200);
    setTimeout(() => document.getElementById("btn-s8").classList.remove("hidden"), 11500);
  }

  // → Arthur then cooking game
  function initCookingGame() {
    const steps = [
      { label: "Elige tu base", opts: ["🌽 Masa de maíz","🍝 Pasta fresca","🍚 Arroz jazmín"], correct: 0, msg: "¡La masa de maíz es el alma de México! 🌽" },
      { label: "Elige tu chile", opts: ["🌶️ Chile ancho","🫑 Pimiento verde","🧅 Cebolla morada"], correct: 0, msg: "El chile ancho le da profundidad al sabor. ¡Perfecto! 🌶️" },
      { label: "El toque final", opts: ["🍋 Limón y cilantro","🧄 Ajo y mantequilla","🍅 Tomate y albahaca"], correct: 0, msg: "¡Limón y cilantro! El acabado más mexicano del mundo. 💚" }
    ];

    let stepIdx = 0;
    const container = document.getElementById("cooking-step");
    const resultDiv = document.getElementById("cooking-result");
    const btnNext   = document.getElementById("btn-s8b");

    function renderStep() {
      if (!container) return;
      const s = steps[stepIdx];
      container.innerHTML = `
        <p class="cook-label">${s.label}</p>
        <div class="cook-opts">
          ${s.opts.map((o,i) => `<button class="cook-opt" data-idx="${i}">${o}</button>`).join("")}
        </div>
        <p class="cook-fb hidden" id="cook-fb"></p>
      `;
      container.querySelectorAll(".cook-opt").forEach(btn => {
        btn.addEventListener("click", () => {
          const chosen = parseInt(btn.dataset.idx);
          container.querySelectorAll(".cook-opt").forEach(b => b.disabled = true);
          const fb = container.querySelector("#cook-fb");
          if (chosen === s.correct) {
            btn.classList.add("cook-correct");
            fb.textContent = s.msg;
            fb.classList.remove("hidden","cook-fb-wrong");
            fb.classList.add("cook-fb-right");
          } else {
            btn.classList.add("cook-wrong");
            const correctBtn = container.querySelectorAll(".cook-opt")[s.correct];
            correctBtn.classList.add("cook-correct");
            fb.textContent = "¡Casi! Pero Linda eligiría otra. 😄";
            fb.classList.remove("hidden","cook-fb-right");
            fb.classList.add("cook-fb-wrong");
          }
          fb.classList.remove("hidden");
          setTimeout(() => {
            stepIdx++;
            if (stepIdx < steps.length) {
              renderStep();
            } else {
              container.classList.add("hidden");
              if (resultDiv) resultDiv.classList.remove("hidden");
              setTimeout(() => { if (btnNext) btnNext.classList.remove("hidden"); }, 1000);
            }
          }, 1600);
        });
      });
    }
    stepIdx = 0;
    if (container) { container.classList.remove("hidden"); container.innerHTML=""; }
    if (resultDiv) resultDiv.classList.add("hidden");
    if (btnNext) btnNext.classList.add("hidden");
    renderStep();
  }
  document.getElementById("btn-s8b").addEventListener("click", () => goTo(10)); // → gastronomy

  /* ══════════════════════════════════════════════════════
     SCENE 9 — GASTRONOMY (index 10)
  ══════════════════════════════════════════════════════ */
  document.getElementById("btn-s9").addEventListener("click", () => goTo(11)); // → letter 2

  /* ══════════════════════════════════════════════════════
     SCENE 10 — LETTER 2
  ══════════════════════════════════════════════════════ */
  setupEnvelope("env-s10","env-s10-cover","env-s10-letter");
  document.getElementById("btn-s10").addEventListener("click", () => goTo(12)); // → riddle 3

  /* ══════════════════════════════════════════════════════
     SCENE 11 — RIDDLE 3
  ══════════════════════════════════════════════════════ */
  setupRiddle("r3-opts","r3-pos","r3-neg","btn-s11");
  document.getElementById("btn-s11").addEventListener("click", () => goTo(13)); // → fox scene

  /* ══════════════════════════════════════════════════════
     SCENE 11b — FOX SCENE
  ══════════════════════════════════════════════════════ */
  function initFoxScene() {
    const lines = document.querySelectorAll(".fox-line");
    lines.forEach(l => { l.style.opacity = "0"; l.style.animation = "none"; });
    const btn = document.getElementById("btn-s11b");
    if (btn) btn.classList.add("hidden");

    lines.forEach((l, i) => {
      setTimeout(() => {
        l.style.animation = `fadeUp 1s ease forwards`;
        l.style.opacity = "";
      }, i * 1400 + 400);
    });
    setTimeout(() => { if (btn) btn.classList.remove("hidden"); }, lines.length * 1400 + 600);
  }
  document.getElementById("btn-s11b").addEventListener("click", () => goTo(14)); // → photos

  /* ══════════════════════════════════════════════════════
     SCENE 12 — PHOTOS WITH LETTER MODAL (index 14)
  ══════════════════════════════════════════════════════ */
  /*
    ─────────────────────────────────────────────────────────
    PHOTO DATA — personaliza cada entrada:
      img:     ruta a tu foto (ej: "fotos/foto1.jpg") o "" para placeholder
      tag:     título de la carta
      body:    texto de la carta para esa foto
    ─────────────────────────────────────────────────────────
  */
  const PHOTO_DATA = {
    p1: {
      img: "",
      tag: "✦ Carta — El momento que más recuerdo",
      body: "[ Escribe aquí lo que esta foto significa para ti, qué pasó ese día, por qué la guardas y qué sientes cada vez que la ves. ]"
    },
    p2: {
      img: "",
      tag: "✦ Carta — Tu risa",
      body: "[ Escribe aquí por qué esta foto captura algo que amas de ella. ]"
    },
    p3: {
      img: "",
      tag: "✦ Carta — Lo que admiro aquí",
      body: "[ Tu historia para esta foto. ]"
    },
    p4: {
      img: "",
      tag: "✦ Carta — Un momento tuyo favorito",
      body: "[ Tu historia para esta foto. ]"
    },
    p5: {
      img: "",
      tag: "✦ Carta — Lo que ella no sabe",
      body: "[ Tu historia para esta foto. ]"
    },
    p6: {
      img: "",
      tag: "✦ Carta — Promesa",
      body: "[ Tu historia para esta foto. ]"
    }
  };

  function animatePolaroids() {
    document.querySelectorAll(".polaroid").forEach((el, i) => {
      el.style.opacity = "0";
      el.style.animation = `fadeUp .7s ease forwards`;
      el.style.animationDelay = (i * 0.18) + "s";
    });
  }

  const modal    = document.getElementById("photo-modal");
  const overlay  = document.getElementById("pm-overlay");
  const pmImg    = document.getElementById("pm-img");
  const pmTag    = document.getElementById("pm-tag");
  const pmBody   = document.getElementById("pm-body");
  const pmClose  = document.getElementById("pm-close");

  document.getElementById("polaroid-grid").addEventListener("click", e => {
    const pol = e.target.closest(".polaroid");
    if (!pol) return;
    const id   = pol.dataset.id;
    const data = PHOTO_DATA[id];
    if (!data) return;

    // Set image
    pmImg.innerHTML = "";
    if (data.img) {
      const img = document.createElement("img");
      img.src = data.img;
      img.alt = "foto";
      pmImg.classList.remove("placeholder-lg");
      pmImg.appendChild(img);
    } else {
      pmImg.classList.add("placeholder-lg");
      pmImg.innerHTML = "<span>📷</span>";
    }

    pmTag.textContent  = data.tag;
    pmBody.textContent = data.body;
    modal.classList.remove("hidden");
  });

  pmClose.addEventListener("click", () => modal.classList.add("hidden"));
  overlay.addEventListener("click", () => modal.classList.add("hidden"));

  document.getElementById("btn-s12").addEventListener("click", () => goTo(15)); // → secret message

  /* ══════════════════════════════════════════════════════
     SCENE 13 — SECRET MESSAGE ENVELOPES (index 15)
  ══════════════════════════════════════════════════════ */
  const secretEnvs   = document.querySelectorAll(".secret-env");
  const revealDiv    = document.getElementById("secret-reveal");
  const srMsg        = document.getElementById("sr-msg");
  const btnS13       = document.getElementById("btn-s13");
  let openedWords    = [];

  secretEnvs.forEach(env => {
    env.addEventListener("click", () => {
      const front = env.querySelector(".se-front");
      const back  = env.querySelector(".se-back");
      const word  = env.dataset.word;
      const order = parseInt(env.dataset.order);

      if (back.classList.contains("hidden")) {
        front.classList.add("hidden");
        back.classList.remove("hidden");

        // Record word in order
        openedWords[order-1] = word;

        // Check if all opened
        const totalEnvs = secretEnvs.length;
        const allOpen   = Array.from(secretEnvs).every(e => !e.querySelector(".se-back").classList.contains("hidden"));

        if (allOpen) {
          const msg = openedWords.filter(Boolean).join(" ");
          srMsg.textContent = msg;
          setTimeout(() => {
            revealDiv.classList.remove("hidden");
            setTimeout(() => btnS13.classList.remove("hidden"), 1200);
          }, 600);
        }
      }
    });
  });

  document.getElementById("btn-s13").addEventListener("click", () => goTo(16)); // → video

  /* ══════════════════════════════════════════════════════
     SCENE 14 — VIDEO (index 16)
  ══════════════════════════════════════════════════════ */
  const videoEl = document.getElementById("main-video");
  const videoPh = document.getElementById("video-ph");

  videoEl.addEventListener("error", () => {
    videoEl.style.display = "none";
    if (videoPh) videoPh.style.display = "flex";
  });
  if (!videoEl.currentSrc || videoEl.currentSrc.includes("tu-video-aqui")) {
    videoEl.style.display = "none";
    if (videoPh) videoPh.style.display = "flex";
  }

  document.getElementById("btn-s14").addEventListener("click", () => goTo(17)); // → proposal

  /* ══════════════════════════════════════════════════════
     SCENE 15 — PROPOSAL (index 17)
  ══════════════════════════════════════════════════════ */
  // Day counter — set YOUR start date here (YYYY, MM-1, DD)
  const START_DATE = new Date(2024, 10, 1); // Nov 1, 2024 — cámbiala
  function initDayCounter() {
    const el = document.getElementById("day-counter-num");
    if (!el) return;
    const days = Math.floor((Date.now() - START_DATE.getTime()) / 86400000);
    let count = 0;
    const timer = setInterval(() => {
      count += Math.ceil((days - count) / 8);
      el.textContent = count;
      if (count >= days) { el.textContent = days; clearInterval(timer); }
    }, 40);
  }

  document.getElementById("btn-yes").addEventListener("click", () => {
    document.getElementById("prop-btns").style.display = "none";
    document.getElementById("prop-response").classList.remove("hidden");
    burstConfetti();
    spawnHearts();
    // Keep tulip shower going
  });

  // "No" button runs away from cursor
  const btnNo = document.getElementById("btn-no");
  btnNo.addEventListener("mouseenter", runAway);
  btnNo.addEventListener("touchstart", runAway, {passive:true});

  function runAway() {
    const maxX = innerWidth  - 120;
    const maxY = innerHeight - 60;
    const nx   = Math.floor(Math.random() * maxX);
    const ny   = Math.floor(Math.random() * maxY);
    btnNo.style.left = nx + "px";
    btnNo.style.top  = ny + "px";
  }
  // Initialize button position
  btnNo.style.left = "60%";
  btnNo.style.top  = "72%";

  /* ── CONFETTI ──────────────────────────────────────── */
  function initConfettiCanvas() {
    const cv = document.getElementById("c-confetti");
    if (!cv) return;
    cv.width = innerWidth; cv.height = innerHeight;
  }

  function burstConfetti() {
    const cv  = document.getElementById("c-confetti"); if (!cv) return;
    const cx  = cv.getContext("2d");
    cv.width  = innerWidth; cv.height = innerHeight;
    const colors = ["#ff69b4","#ffb6d9","#ff1493","#ffc0cb","#ff85c0","#fff","#ffd6eb","#c060ff"];
    const pts = Array.from({length:150}, () => ({
      x:cv.width/2, y:cv.height*.6,
      vx:(Math.random()-.5)*16, vy:(Math.random()-.5)*14-5,
      r:Math.random()*8+3,
      color:colors[Math.floor(Math.random()*colors.length)],
      rot:Math.random()*Math.PI*2, rs:(Math.random()-.5)*.18,
      g:.28, a:1
    }));

    function draw() {
      cx.clearRect(0,0,cv.width,cv.height);
      let alive = false;
      pts.forEach(p => {
        p.vy+=p.g; p.x+=p.vx; p.y+=p.vy; p.rot+=p.rs; p.a-=.007;
        if (p.a>0) alive=true;
        cx.save(); cx.translate(p.x,p.y); cx.rotate(p.rot);
        cx.globalAlpha=Math.max(0,p.a); cx.fillStyle=p.color;
        cx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2); cx.restore();
      });
      if (alive) requestAnimationFrame(draw);
    }
    draw();
  }

  function spawnTulipShower() {
    const cont = document.getElementById("tulip-shower"); if (!cont) return;
    cont.innerHTML = "";
    for (let i=0; i<35; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "tulip-fall";
        el.textContent = i%3===0 ? "💗" : "🌷";
        el.style.left = Math.random()*100+"vw";
        el.style.fontSize = (Math.random()*1.4+.9)+"rem";
        const dur = Math.random()*5+4;
        el.style.animationDuration = dur+"s";
        cont.appendChild(el);
        setTimeout(()=>el.remove(), dur*1000+300);
      }, i*280);
    }
  }

  function spawnHearts() {
    for (let i=0; i<22; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        position:fixed;
        font-size:${Math.random()*1.5+.9}rem;
        left:${Math.random()*100}vw;
        top:${Math.random()*50+20}vh;
        pointer-events:none; z-index:9998;
        animation: fall-tulip ${Math.random()*3+2}s linear forwards;
      `;
      el.textContent = "💗";
      document.body.appendChild(el);
      setTimeout(()=>el.remove(), 5000);
    }
  }

  /* ══════════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════════ */
  function setupRiddle(optsId, posId, negId, btnId) {
    const opts  = document.getElementById(optsId);
    const posEl = document.getElementById(posId);
    const negEl = document.getElementById(negId);
    const btn   = document.getElementById(btnId);
    if (!opts) return;

    opts.querySelectorAll(".r-opt").forEach(b => {
      b.addEventListener("click", () => {
        const ok = b.dataset.ok === "true";
        opts.querySelectorAll(".r-opt").forEach(x => x.disabled=true);
        if (ok) {
          b.classList.add("correct");
          posEl.classList.remove("hidden");
          negEl.classList.add("hidden");
          setTimeout(()=>btn.classList.remove("hidden"), 900);
        } else {
          b.classList.add("wrong-pick");
          negEl.classList.remove("hidden");
          posEl.classList.add("hidden");
          setTimeout(()=>{
            opts.querySelectorAll(".r-opt").forEach(x=>{ x.disabled=false; x.classList.remove("wrong-pick"); });
            negEl.classList.add("hidden");
          },1400);
        }
      });
    });
  }

  function setupEnvelope(wrapId, coverId, letterId) {
    const wrap   = document.getElementById(wrapId);
    const cover  = document.getElementById(coverId);
    const letter = document.getElementById(letterId);
    if (!wrap) return;
    wrap.addEventListener("click", () => {
      if (wrap.dataset.opened === "false") {
        wrap.dataset.opened = "true";
        cover.style.animation = "fadeUp .4s ease reverse forwards";
        setTimeout(()=>{
          cover.classList.add("hidden");
          letter.classList.remove("hidden");
        }, 350);
      }
    });
  }

  /* ══════════════════════════════════════════════════════
     EASTER EGG — day counter click
  ══════════════════════════════════════════════════════ */
  const easterModal   = document.getElementById("easter-modal");
  const easterOverlay = document.getElementById("easter-overlay");
  const easterClose   = document.getElementById("easter-close");
  const dcNum         = document.getElementById("day-counter-num");

  if (dcNum) {
    dcNum.addEventListener("click", () => {
      if (easterModal) easterModal.classList.remove("hidden");
    });
  }
  if (easterClose) easterClose.addEventListener("click", () => easterModal.classList.add("hidden"));
  if (easterOverlay) easterOverlay.addEventListener("click", () => easterModal.classList.add("hidden"));

}); // end DOMContentLoaded
