/* =========================================================
   Wiliane Santos · Nutricionista
   ========================================================= */

/* ---- Dados editáveis ---- */
const CONFIG = {
  whatsapp: "https://wa.me/message/M722J2E4X3CCK1",
  instagram: "https://www.instagram.com/nutriwilisantos/",
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);

$$("[data-wa]").forEach((a) => (a.href = CONFIG.whatsapp));
$$('a[href*="instagram.com"]').forEach((a) => (a.href = CONFIG.instagram));
const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

/* =========================================================
   DENTE-DE-LEÃO · construção do SVG
   Cabeça em (150,170) no viewBox 300×520; caule até (150,515).
   ========================================================= */
const NS = "http://www.w3.org/2000/svg";
const HEAD = { x: 150, y: 170 };
const BASE = { x: 150, y: 515 };
const PUFF = "M0 0 C -9 -4 -13 -12 -11 -18 C -6 -14 6 -14 11 -18 C 13 -12 9 -4 0 0 Z";

function svgEl(tag, attrs, parent) {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(n);
  return n;
}

function buildDandelion(svg, { count = 34, len = 80, face = true } = {}) {
  svgEl("path", { class: "dl-leaf", d: "M148 506 C 110 498, 84 462, 90 432 C 118 442, 140 474, 148 506 Z" }, svg);
  svgEl("path", { class: "dl-leaf", d: "M152 494 C 188 488, 212 456, 208 430 C 182 438, 160 464, 152 494 Z" }, svg);
  const plant = svgEl("g", { class: "dl-plant" }, svg);
  svgEl("path", { class: "dl-stem", d: `M${BASE.x} ${BASE.y} C 144 420, 160 300, ${HEAD.x} ${HEAD.y + 24}` }, plant);

  const seeds = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * 360 + rand(-3, 3);
    const L = len + rand(-7, 7);
    const g = svgEl("g", { class: "dl-seed", transform: `rotate(${a} ${HEAD.x} ${HEAD.y})` }, plant);
    const fly = svgEl("g", { class: "dl-seed-fly" }, g);
    const inner = svgEl("g", { class: "dl-seed-in" }, fly);
    svgEl("line", { class: "dl-fil", x1: HEAD.x, y1: HEAD.y - 22, x2: HEAD.x, y2: HEAD.y - L }, inner);
    const tip = svgEl("g", { transform: `translate(${HEAD.x} ${HEAD.y - L})` }, inner);
    svgEl("path", { class: "dl-puff", d: PUFF }, tip);
    svgEl("circle", { class: "dl-tip", r: 1.8 }, tip);
    seeds.push({ g, fly, a, L, gone: false, wob: rand(0.6, 1.4) });
  }

  if (face) {
    const f = svgEl("g", { class: "dl-face" }, plant);
    svgEl("circle", { class: "dl-face-bg", cx: HEAD.x, cy: HEAD.y, r: 26 }, f);
    svgEl("ellipse", { class: "dl-blush", cx: 134, cy: 178, rx: 4.6, ry: 2.8 }, f);
    svgEl("ellipse", { class: "dl-blush", cx: 166, cy: 178, rx: 4.6, ry: 2.8 }, f);
    for (const ex of [141, 159]) {
      svgEl("circle", { class: "dl-eye", cx: ex, cy: 168, r: 3.3 }, f);
      svgEl("circle", { class: "dl-eye-hi", cx: ex + 1, cy: 166.8, r: 1.1 }, f);
    }
    svgEl("path", { class: "dl-mouth", d: "M144.5 177 Q150 182.5 155.5 177" }, f);
    svgEl("circle", { class: "dl-mouth-o", cx: 150, cy: 179.5, r: 3.4 }, f);
  }
  return { svg, plant, seeds };
}

function blinker(svg) {
  if (reduceMotion) return;
  const blink = () => {
    svg.classList.add("is-blinking");
    setTimeout(() => svg.classList.remove("is-blinking"), 130);
    setTimeout(blink, rand(2600, 5200));
  };
  setTimeout(blink, rand(1500, 3000));
}

/* =========================================================
   ABERTURA · as sementes brotam de 0 a 100% e são sopradas
   ========================================================= */
(function loader() {
  const root = $("#loader");
  const num = $("#loaderNum");
  const label = $("#loaderLabel");
  const flower = buildDandelion($("#loaderFlower"), { count: 30, len: 78 });
  flower.seeds.forEach((s) => s.g.classList.add("is-gone"));
  blinker(flower.svg);

  let firstVisit = true;
  try {
    firstVisit = !sessionStorage.getItem("ws-visit");
    sessionStorage.setItem("ws-visit", "1");
  } catch (e) {}
  const minTime = reduceMotion ? 300 : firstVisit ? 2600 : 1300;

  let loaded = 0;
  const tasks = [];
  const heroImg = $(".cutout img");
  tasks.push(heroImg.complete ? Promise.resolve() : new Promise((r) => {
    heroImg.addEventListener("load", r, { once: true });
    heroImg.addEventListener("error", r, { once: true });
  }));
  if (document.fonts) tasks.push(document.fonts.ready);
  tasks.forEach((p) => p.then(() => loaded++));
  const hardStop = performance.now() + 6000;

  const labels = [[0, "brotando"], [35, "crescendo"], [75, "quase lá"], [100, "sopra!"]];
  const start = performance.now();
  let shown = 0;

  function frame(now) {
    const timeP = clamp((now - start) / minTime, 0, 1);
    const realP = now > hardStop ? 1 : (loaded + 0.15) / (tasks.length + 0.15);
    const target = Math.min(timeP, realP) * 100;
    shown = target >= 99.6 ? 100 : lerp(shown, target, 0.12);
    const p = Math.round(shown);
    num.textContent = p;
    const visible = Math.ceil((shown / 100) * flower.seeds.length);
    flower.seeds.forEach((s, i) => s.g.classList.toggle("is-gone", i >= visible));
    for (const [t, l] of labels) if (p >= t) label.textContent = l;
    if (p < 100) requestAnimationFrame(frame);
    else setTimeout(blow, reduceMotion ? 0 : 250);
  }
  requestAnimationFrame(frame);

  function blow() {
    flower.svg.classList.add("is-surprised");
    // cada semente sai para a direita e para cima; o deslocamento é
    // convertido para o referencial já girado de cada semente
    flower.seeds.forEach((s, i) => {
      const gx = rand(260, 620), gy = rand(-380, -60);
      const r = (-s.a * Math.PI) / 180;
      s.fly.style.setProperty("--fx", `${gx * Math.cos(r) - gy * Math.sin(r)}px`);
      s.fly.style.setProperty("--fy", `${gx * Math.sin(r) + gy * Math.cos(r)}px`);
      s.fly.style.setProperty("--fr", `${rand(-50, 50)}deg`);
      s.fly.style.setProperty("--fd", `${(i % 10) * 25 + rand(0, 80)}ms`);
    });
    root.classList.add("is-blown");
    const t = reduceMotion ? 0 : 700;
    setTimeout(() => {
      root.classList.add("is-done");
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
    }, t);
    setTimeout(() => root.classList.add("is-gone"), t + 800);
  }
})();

/* =========================================================
   HERO · dente-de-leão interativo
   - o mouse por perto é vento: a flor se inclina e as sementes tremem
   - passar rápido arranca sementes; clique/toque sopra um punhado
   - quando sobra pouco, ele rebrota
   ========================================================= */
(function heroFlower() {
  const hero = $("#inicio");
  const svg = $("#heroFlower");
  const layer = $("#seedLayer");
  const btn = $("#blowBtn");
  const f = buildDandelion(svg, { count: 36, len: 82 });
  blinker(svg);

  const flyers = [];
  const mouse = { x: 0, y: 0, vx: 0, vy: 0, t: 0, near: 0, dx: 0 };
  let ang = 0, angV = 0, t = 0, running = false, raf = 0, regrowing = false, surpriseT = 0;

  function geometry() {
    const r = svg.getBoundingClientRect();
    const hr = hero.getBoundingClientRect();
    const s = r.width / 300;
    return { s, cx: r.left + HEAD.x * s - hr.left, cy: r.top + HEAD.y * s - hr.top, hr };
  }

  function surprise() {
    svg.classList.add("is-surprised");
    clearTimeout(surpriseT);
    surpriseT = setTimeout(() => svg.classList.remove("is-surprised"), 750);
  }

  function detach(seed, vx, vy) {
    if (seed.gone) return;
    const { s, cx, cy } = geometry();
    const a = ((seed.a + ang) * Math.PI) / 180;
    const x = cx + Math.sin(a) * seed.L * s;
    const y = cy - Math.cos(a) * seed.L * s;
    seed.gone = true;
    seed.g.classList.add("is-gone");
    if (reduceMotion) return;
    const el = document.createElement("div");
    el.className = "flyer";
    el.innerHTML = `<svg viewBox="-14 -24 28 46" aria-hidden="true"><line class="dl-fil" x1="0" y1="-2" x2="0" y2="20" style="stroke:#8E4129"/><g><path class="dl-puff" d="${PUFF}" style="fill:#FFF8EE;stroke:#8E4129"/><circle r="1.8" style="fill:#8E4129"/></g></svg>`;
    const size = clamp(s * 1.05, 0.7, 1.3);
    el.style.width = `${26 * size}px`;
    el.style.height = `${40 * size}px`;
    layer.appendChild(el);
    flyers.push({ el, x, y, vx, vy, rot: seed.a, ph: rand(0, 6.28), life: 0 });
  }

  function alive() { return f.seeds.filter((s) => !s.gone); }

  function checkRegrow() {
    if (regrowing || alive().length > f.seeds.length * 0.3) return;
    regrowing = true;
    setTimeout(() => {
      f.seeds.forEach((s, i) => setTimeout(() => {
        s.gone = false;
        s.g.classList.remove("is-gone");
      }, i * 35));
      setTimeout(() => (regrowing = false), f.seeds.length * 35 + 400);
    }, 1300);
  }

  function puff() {
    surprise();
    const list = alive().sort(() => Math.random() - 0.5).slice(0, 8);
    list.forEach((sd) => {
      const a = ((sd.a + ang) * Math.PI) / 180;
      detach(sd, Math.sin(a) * rand(1.4, 2.6) + 1.2, -Math.cos(a) * rand(1.2, 2.2) - 0.6);
    });
    angV += 2.5;
    checkRegrow();
  }
  btn.addEventListener("click", puff);

  hero.addEventListener("pointermove", (e) => {
    const now = performance.now();
    const { s, cx, cy, hr } = geometry();
    const x = e.clientX - hr.left, y = e.clientY - hr.top;
    const dt = Math.max(1, now - mouse.t);
    mouse.vx = (x - mouse.x) / dt;
    mouse.vy = (y - mouse.y) / dt;
    mouse.x = x; mouse.y = y; mouse.t = now;

    const R = 170 * s;
    const d = Math.hypot(x - cx, y - cy);
    mouse.near = clamp(1 - d / (R * 1.6), 0, 1);
    mouse.dx = x - cx;

    const speed = Math.hypot(mouse.vx, mouse.vy);
    if (d < R && speed > 0.45) {
      // arranca as sementes mais perto do cursor
      const k = speed > 1.4 ? 3 : speed > 0.8 ? 2 : 1;
      const list = alive().map((sd) => {
        const a = ((sd.a + ang) * Math.PI) / 180;
        return { sd, dist: Math.hypot(cx + Math.sin(a) * sd.L * s - x, cy - Math.cos(a) * sd.L * s - y) };
      }).filter((o) => o.dist < 46 * s + 20).sort((a, b) => a.dist - b.dist).slice(0, k);
      if (list.length) {
        surprise();
        list.forEach(({ sd }) => detach(sd, clamp(mouse.vx * 9, -7, 7) + 0.6, clamp(mouse.vy * 9, -7, 4) - 0.8));
        checkRegrow();
      }
    }
  });
  hero.addEventListener("pointerleave", () => (mouse.near = 0));

  function step() {
    t += 1 / 60;
    // vento: a flor se afasta do cursor, com mola
    let target = Math.sin(t * 0.9) * 1.6;
    if (mouse.near) target += -Math.sign(mouse.dx || 1) * mouse.near * 9 + clamp(mouse.vx * 6, -6, 6) * mouse.near;
    angV += (target - ang) * 0.05;
    angV *= 0.9;
    ang += angV;
    f.plant.setAttribute("transform", `rotate(${ang.toFixed(2)} ${BASE.x} ${BASE.y})`);
    f.seeds.forEach((sd, i) => {
      const w = Math.sin(t * 3 + i) * (0.6 + mouse.near * 3) * sd.wob + angV * 1.5;
      sd.g.setAttribute("transform", `rotate(${(sd.a + w).toFixed(2)} ${HEAD.x} ${HEAD.y})`);
    });

    for (let i = flyers.length - 1; i >= 0; i--) {
      const p = flyers[i];
      p.life++;
      p.vx = p.vx * 0.975 + 0.035;          // brisa para a direita
      p.vy = Math.max(p.vy * 0.975 - 0.012, -1.4); // sobe devagar
      p.x += p.vx + Math.sin(t * 2 + p.ph) * 0.45;
      p.y += p.vy;
      p.rot = lerp(p.rot, Math.sin(t * 1.6 + p.ph) * 22 + p.vx * 5, 0.06);
      const op = p.life > 240 ? clamp(1 - (p.life - 240) / 90, 0, 1) : 1;
      p.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -20%) rotate(${p.rot.toFixed(1)}deg)`;
      p.el.style.opacity = op;
      if (op <= 0 || p.y < -60 || p.x > hero.clientWidth + 60) {
        p.el.remove();
        flyers.splice(i, 1);
      }
    }
    if (running) raf = requestAnimationFrame(step);
  }

  function play() { if (!running && !reduceMotion) { running = true; raf = requestAnimationFrame(step); } }
  function pause() { running = false; cancelAnimationFrame(raf); }
  new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause())).observe(hero);
})();

/* CTA final: versão miniatura, só decorativa */
buildDandelion($("#finalFlower"), { count: 26, len: 80 });

/* =========================================================
   TOPO + MENU
   ========================================================= */
(function nav() {
  const top = $("#top");
  const nav = $("#nav");
  const btn = $("#menuBtn");
  const links = $$(".nav__list a");
  const sections = links.map((a) => $(a.getAttribute("href")));
  const desktop = window.matchMedia("(min-width: 960px)");

  function onScroll() {
    top.classList.toggle("is-solid", window.scrollY > 20);
    let current = -1;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
    links.forEach((a, i) => (i === current ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector(".sr-only").textContent = open ? "Fechar menu" : "Abrir menu";
    document.body.style.overflow = open ? "hidden" : "";
    if (open) links[0].focus();
  }
  btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => { if (!desktop.matches) setOpen(false); }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); btn.focus(); }
  });
  desktop.addEventListener("change", () => setOpen(false));
})();

/* =========================================================
   O ciclo: a volta que não sai do lugar
   ========================================================= */
(function loop() {
  const trace = $("#loopTrace");
  const dot = $("#loopDot");
  const stepEl = $("#loopStep");
  const textEl = $("#loopText");
  const panel = $(".loop__center");
  const tabs = $$(".stop");
  const total = trace.getTotalLength();
  const anchors = [[240, 36], [444, 150], [240, 264], [36, 150]];

  const fracs = anchors.map(([ax, ay]) => {
    let best = 0, bd = Infinity;
    for (let i = 0; i <= 400; i++) {
      const p = trace.getPointAtLength((i / 400) * total);
      const d = Math.hypot(p.x - ax, p.y - ay);
      if (d < bd) { bd = d; best = i / 400; }
    }
    return best;
  });

  panel.id = "loopPanel";
  panel.setAttribute("role", "tabpanel");
  tabs.forEach((tb, k) => { tb.setAttribute("aria-controls", "loopPanel"); tb.tabIndex = k === 0 ? 0 : -1; });

  let pos = fracs[0], index = 0, anim = 0;
  function place(fr) {
    const p = trace.getPointAtLength((((fr % 1) + 1) % 1) * total);
    dot.setAttribute("cx", p.x);
    dot.setAttribute("cy", p.y);
    trace.style.strokeDashoffset = String(-(fr * 100 - 11));
  }
  place(pos);

  function go(i, focus) {
    index = i;
    tabs.forEach((tb, k) => { tb.setAttribute("aria-selected", String(k === i)); tb.tabIndex = k === i ? 0 : -1; });
    if (focus) tabs[i].focus();
    stepEl.textContent = tabs[i].textContent;
    textEl.textContent = tabs[i].dataset.t;
    let to = fracs[i];
    while (to <= pos) to += 1;
    const from = pos, t0 = performance.now(), dur = reduceMotion ? 1 : 900;
    cancelAnimationFrame(anim);
    const tick = (now) => {
      const k = clamp((now - t0) / dur, 0, 1);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      pos = from + (to - from) * e;
      place(pos);
      if (k < 1) anim = requestAnimationFrame(tick);
      else pos %= 1;
    };
    anim = requestAnimationFrame(tick);
  }

  let auto = null, touched = false;
  tabs.forEach((tb, i) => {
    tb.addEventListener("click", () => { touched = true; stopAuto(); go(i); });
    tb.addEventListener("keydown", (e) => {
      const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (k) { e.preventDefault(); touched = true; stopAuto(); go((index + k + 4) % 4, true); }
    });
  });
  function startAuto() { if (!touched && !reduceMotion && !auto) auto = setInterval(() => go((index + 1) % 4), 3400); }
  function stopAuto() { clearInterval(auto); auto = null; }
  new IntersectionObserver(([e]) => (e.isIntersecting ? startAuto() : stopAuto()), { threshold: 0.4 }).observe($("#loop"));
})();

/* =========================================================
   Revelação no scroll + rota desenhada
   ========================================================= */
(function reveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
  $$("[data-reveal]").forEach((el) => io.observe(el));

  const route = $(".route");
  const path = $("#routePath");
  if (!route || !path) return;
  if (reduceMotion) { path.style.setProperty("--route", 0); return; }
  const onScroll = () => {
    const r = route.getBoundingClientRect();
    const p = clamp((innerHeight * 0.9 - r.top) / (innerHeight * 0.5), 0, 1);
    path.style.setProperty("--route", String(100 - p * 100));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
