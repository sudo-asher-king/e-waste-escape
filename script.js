/* ============================================
   E-WASTE ESCAPE — Complete Game Engine
   Vanilla JavaScript + HTML5 Canvas
   ============================================ */

'use strict';

// ============================================
// EDUCATIONAL DATABASE
// ============================================
const FACTS = [
  { text: "Only 17% of global e-waste is properly recycled each year.", icon: "♻️" },
  { text: "In 2022, the world generated 62 million tonnes of electronic waste.", icon: "📊" },
  { text: "Batteries can leak toxic chemicals like mercury and lead into soil and groundwater.", icon: "🔋" },
  { text: "Repairing one smartphone saves up to 70kg of CO₂ emissions.", icon: "📱" },
  { text: "Gold, silver, copper, and palladium can all be recovered from old electronics.", icon: "⚙️" },
  { text: "E-waste is the fastest-growing waste stream in the world.", icon: "📈" },
  { text: "It takes 3x more energy to make a new device than to repair an existing one.", icon: "⚡" },
  { text: "Informal e-waste recycling exposes workers to toxic fumes and chemicals.", icon: "☠️" },
  { text: "A single circuit board contains over 60 different elements from the periodic table.", icon: "🔬" },
  { text: "Right to Repair laws let you legally fix your own devices and save money.", icon: "🔧" },
  { text: "Only 20 countries have national e-waste legislation and policies.", icon: "🌍" },
  { text: "Children in developing nations sort e-waste by hand, risking their health.", icon: "👧" },
  { text: "Extending a phone's life by 1 year reduces its carbon footprint by 30%.", icon: "🌱" },
  { text: "The circular economy could eliminate 45% of global CO₂ emissions.", icon: "🔄" },
  { text: "Tech companies can design products to be modular, repairable, and recyclable.", icon: "💡" },
];

const QUIZZES = [
  {
    question: "What percentage of global e-waste is properly recycled?",
    options: ["17%", "45%", "62%", "80%"],
    correct: 0,
    explanation: "Only 17% of e-waste is properly recycled. The rest ends up in landfills or informal processing sites."
  },
  {
    question: "Which toxic metal is commonly found in old batteries?",
    options: ["Gold", "Copper", "Lead", "Titanium"],
    correct: 2,
    explanation: "Lead and mercury are toxic metals commonly found in old batteries, and can leach into soil and water."
  },
  {
    question: "How much CO₂ can be saved by repairing one smartphone?",
    options: ["5kg", "20kg", "70kg", "200kg"],
    correct: 2,
    explanation: "Repairing a smartphone instead of replacing it saves approximately 70kg of CO₂ emissions."
  },
  {
    question: "What is the 'Right to Repair' movement about?",
    options: ["Free repairs from manufacturers", "Legal right to fix your own devices", "Repairing roads", "Government repair programs"],
    correct: 1,
    explanation: "Right to Repair is a movement advocating for consumers' legal right to repair their own electronics and access parts and manuals."
  },
];

const WORLD_INFO_TOPICS = [
  {
    title: "E-Waste Basics",
    icon: "♻",
    text: "E-waste means discarded electronics: phones, chargers, laptops, batteries, circuit boards, TVs and other powered devices. Many contain valuable metals, but unsafe dumping can leak toxic materials into soil and water."
  },
  {
    title: "Repair First",
    icon: "🔧",
    text: "Repairing or reusing a working device usually saves more energy and materials than recycling it immediately. Keep devices longer, replace batteries when safe, and donate usable gear."
  },
  {
    title: "Battery Safety",
    icon: "🔋",
    text: "Lithium batteries should not go into ordinary trash. Tape exposed terminals, keep damaged batteries away from heat, and take them to approved collection points."
  },
  {
    title: "Game Tip",
    icon: "⚡",
    text: "In World Mode, collectibles are rare. Watch for info pages, keep energy for EMP blasts, and use dash to create distance before bots close in."
  },
  {
    title: "Creator",
    icon: "★",
    text: "E-Waste Escape was created by Asher King as an arcade game about repair, recycling, and learning how electronic waste affects the planet."
  },
  {
    title: "Responsible Recycling",
    icon: "🌍",
    text: "Use certified recyclers when possible. They recover copper, gold, aluminum, glass and plastics while reducing exposure to lead, mercury and flame retardants."
  },
  {
    title: "Toxic Alley",
    icon: "🏙",
    text: "Toxic Alley is where mixed household electronics pile up first. Phones, remotes and chargers are easy to lose here, but they still contain copper, gold and plastics that can be recovered."
  },
  {
    title: "Battery Graveyard",
    icon: "⚠",
    text: "Battery Graveyard is dangerous because punctured cells can overheat or leak. Keep batteries dry, avoid crushing them, and never burn them."
  },
  {
    title: "Repair District",
    icon: "🛠",
    text: "Repair District rewards careful exploration. Repairing a device keeps the whole product in use, which usually saves more material than recycling it early."
  },
  {
    title: "MegaDump City",
    icon: "🏭",
    text: "MegaDump City shows why design matters. Products that are easier to open, repair and separate are safer and cheaper to recycle."
  },
  {
    title: "Movement Tip",
    icon: "↔",
    text: "Use zoom to scan for notes, then zoom back in near bots and hazards. Dash is best for escaping corners or crossing streets quickly."
  },
  {
    title: "EMP Tip",
    icon: "💥",
    text: "EMP clears nearby bots in World Mode, but it costs energy. Let energy refill before entering crowded streets."
  },
  {
    title: "Sorting Tip",
    icon: "📦",
    text: "Separate batteries, screens, cables and circuit boards when you can. Sorting makes recycling safer and improves material recovery."
  },
];

const WORLD_CITY_CONTEXT = [
  {
    name: 'TOXIC ALLEY',
    caption: 'Phones, screens, remotes and cables arrive here.',
  },
  {
    name: 'BATTERY GRAVEYARD',
    caption: 'Damaged cells and barrels make this zone risky.',
  },
  {
    name: 'REPAIR DISTRICT',
    caption: 'Workshops salvage parts and extend device life.',
  },
  {
    name: 'MEGADUMP CITY',
    caption: 'Waste towers surround the recycling core.',
  },
];

const LEVEL_DATA = [
  {
    id: 1,
    name: "TOXIC ALLEY",
    theme: "Broken phones • CRT TVs • Wires • Trash piles",
    mission: "Collect 50 recyclable electronics",
    missionTarget: 50,
    missionType: "collect",
    story: "Nova enters the heart of Toxic Alley. The streets are paved with cracked screens and tangled wires. The Green Circuit's mission: collect recyclable devices before the Smoke Crusher compacts them forever.",
    boss: { name: "SMOKE CRUSHER", desc: "A massive trash compactor robot armed with pneumatic crushers and toxic smoke vents. Its weak point: the exhaust vents on its back.", color: "#808080" },
    eduFact: FACTS[0],
    quiz: QUIZZES[0],
    bgColors: ['#5eceff', '#a8e6ff', '#d4f5ff'],
    groundColor: '#4caf50',
    groundAccent: '#388e3c',
    speed: 3,
  },
  {
    id: 2,
    name: "BATTERY GRAVEYARD",
    theme: "Acid pools • Exploding batteries • Toxic barrels • Electric hazards",
    mission: "Collect 100 batteries safely",
    missionTarget: 100,
    missionType: "collect",
    story: "The Battery Graveyard reeks of sulfuric acid. Millions of lithium cells leak toxic chemicals into cracked earth. Nova must navigate exploding batteries and acid pools to reach the Acid Core.",
    boss: { name: "ACID CORE", desc: "A corrupted battery reactor, bloated with toxic energy. It launches acid projectiles and creates electric fields. Target the cooling vents to stop the meltdown.", color: "#44ff00" },
    eduFact: FACTS[2],
    quiz: QUIZZES[1],
    bgColors: ['#ff9de2', '#ffc8f0', '#ffe8fa'],
    groundColor: '#ff7043',
    groundAccent: '#bf360c',
    speed: 3.8,
  },
  {
    id: 3,
    name: "REPAIR DISTRICT",
    theme: "Repair labs • Salvage stations • Circuit boards • Broken laptops",
    mission: "Repair 150 broken devices",
    missionTarget: 150,
    missionType: "repair",
    story: "The Repair District was once the heart of the city's tech industry. Now the Obsolescence Engine forces every device into premature failure. Nova must use repair kits to restore devices before they're lost forever.",
    boss: { name: "OBSOLESCENCE ENGINE", desc: "A sinister machine designed to make electronics fail. It broadcasts a jamming signal that corrupts circuits. Destroy the signal towers to expose its central processor.", color: "#ff8800" },
    eduFact: FACTS[9],
    quiz: QUIZZES[3],
    bgColors: ['#aaf7c4', '#ccfbe0', '#e8fff4'],
    groundColor: '#7b1fa2',
    groundAccent: '#4a148c',
    speed: 4.5,
  },
  {
    id: 4,
    name: "MEGADUMP CITY",
    theme: "E-waste mountains • Toxic storms • Industrial drones • Recycling core",
    mission: "Collect 200 recycling core components",
    missionTarget: 200,
    missionType: "collect",
    story: "At the heart of MegaDump City stands the ancient Recycling Core, buried under centuries of e-waste. The Waste Titan guards it with an army of drones and toxic storm generators. This is the final battle for Earth's future.",
    boss: { name: "WASTE TITAN", desc: "A colossal AI garbage machine towering over the cityscape. It commands drone swarms, toxic storms, and gravity crushers. Destroy its four power cores to shut down this mechanical menace forever.", color: "#ff0040" },
    eduFact: FACTS[13],
    quiz: QUIZZES[2],
    bgColors: ['#c5b8ff', '#ddd4ff', '#f0ecff'],
    groundColor: '#e65100',
    groundAccent: '#bf360c',
    speed: 5.5,
  },
];

const LEVEL_PALETTES = [
  { bgColors: ['#5eceff', '#a8e6ff', '#d4f5ff'], groundColor: '#4caf50', groundAccent: '#388e3c' },
  { bgColors: ['#ff9de2', '#ffc8f0', '#ffe8fa'], groundColor: '#ff7043', groundAccent: '#bf360c' },
  { bgColors: ['#aaf7c4', '#ccfbe0', '#e8fff4'], groundColor: '#7b1fa2', groundAccent: '#4a148c' },
  { bgColors: ['#c5b8ff', '#ddd4ff', '#f0ecff'], groundColor: '#e65100', groundAccent: '#bf360c' },
];

function applyLevelPalettes() {
  LEVEL_DATA.forEach((level, index) => {
    Object.assign(level, LEVEL_PALETTES[index]);
  });
}

applyLevelPalettes();

// ============================================
// SAVE SYSTEM
// ============================================
const Save = {
  key: 'ewaste_escape_v1',
  data: null,
  load() {
    try {
      const raw = localStorage.getItem(this.key);
      this.data = raw ? JSON.parse(raw) : this.defaultData();
    } catch(e) {
      this.data = this.defaultData();
    }
    return this.data;
  },
  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.data));
    } catch(e) {}
  },
  defaultData() {
    return { unlockedLevels: [1], highScores: [], totalScore: 0 };
  },
  unlockLevel(id) {
    if (!this.data.unlockedLevels.includes(id)) {
      this.data.unlockedLevels.push(id);
      this.save();
    }
  },
  addScore(score, level) {
    this.data.highScores.push({ score, level, date: Date.now() });
    this.data.highScores.sort((a, b) => b.score - a.score);
    this.data.highScores = this.data.highScores.slice(0, 10);
    this.data.totalScore += score;
    this.save();
    return this.data.highScores[0].score === score && this.data.highScores.length === 1 ||
           score >= (this.data.highScores[1]?.score ?? 0);
  },
};

// ============================================
// AUDIO SYSTEM (Web Audio API)
// ============================================
const Audio = {
  ctx: null,
  enabled: true,
  muted: false,
  prefKey: 'ewaste_escape_audio_muted',
  loadPreference() {
    try { this.muted = localStorage.getItem(this.prefKey) === '1'; } catch(e) { this.muted = false; }
    this.updateButton();
  },
  savePreference() {
    try { localStorage.setItem(this.prefKey, this.muted ? '1' : '0'); } catch(e) {}
  },
  setMuted(muted) {
    this.muted = !!muted;
    this.savePreference();
    this.updateButton();
  },
  toggleMute() {
    this.setMuted(!this.muted);
  },
  updateButton() {
    const btn = document.getElementById('btn-mute-toggle');
    if (!btn) return;
    btn.classList.toggle('muted', this.muted);
    btn.setAttribute('aria-label', this.muted ? 'Unmute game audio' : 'Mute game audio');
    btn.title = this.muted ? 'Unmute game audio' : 'Mute game audio';
  },
  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) { this.enabled = false; }
  },
  play(type, freq = 440, duration = 0.1, vol = 0.3) {
    if (!this.enabled || this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  },
  jump() { this.play('square', 400, 0.12, 0.25); setTimeout(() => this.play('square', 600, 0.08, 0.15), 60); },
  collect() {
    this.play('sine', 660, 0.08, 0.2);
    setTimeout(() => this.play('sine', 880, 0.08, 0.2), 80);
    setTimeout(() => this.play('sine', 1100, 0.1, 0.15), 160);
  },
  hurt() { this.play('sawtooth', 200, 0.2, 0.4); setTimeout(() => this.play('sawtooth', 150, 0.15, 0.2), 100); },
  bossHit() { this.play('square', 300, 0.15, 0.35); setTimeout(() => this.play('square', 200, 0.1, 0.25), 80); },
  bossDefeat() {
    [200, 300, 400, 600, 800].forEach((f, i) => setTimeout(() => this.play('sine', f, 0.2, 0.3), i * 120));
  },
  powerUp() {
    [440, 550, 660, 880].forEach((f, i) => setTimeout(() => this.play('sine', f, 0.12, 0.25), i * 80));
  },
  gameOver() { [400, 300, 200, 150].forEach((f, i) => setTimeout(() => this.play('sawtooth', f, 0.3, 0.5), i * 200)); },
  levelComplete() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.play('sine', f, 0.25, 0.4), i * 150)); },
  emp() { this.play('sawtooth', 100, 0.3, 0.6); this.play('sine', 2000, 0.1, 0.4); },
  resume() { if (!this.muted && this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
};

// ============================================
// PARTICLE SYSTEM
// ============================================
class ParticleSystem {
  constructor() { this.particles = []; }

  emit(x, y, count, color, options = {}) {
    for (let i = 0; i < count; i++) {
      const angle = options.angle !== undefined ? options.angle + (Math.random() - 0.5) * (options.spread || Math.PI) : Math.random() * Math.PI * 2;
      const speed = options.speed || (2 + Math.random() * 4);
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed * (0.5 + Math.random()),
        vy: Math.sin(angle) * speed * (0.5 + Math.random()) - (options.upward ? 2 : 0),
        life: 1,
        decay: options.decay || (0.02 + Math.random() * 0.03),
        size: options.size || (2 + Math.random() * 3),
        color,
        gravity: options.gravity !== undefined ? options.gravity : 0.15,
        glow: options.glow || false,
        shape: options.shape || 'circle',
      });
    }
  }

  update() {
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.life -= p.decay;
      return p.life > 0;
    });
  }

  draw(ctx) {
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life;
      if (p.glow) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
      }
      ctx.fillStyle = p.color;
      if (p.shape === 'square') {
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }
}

// ============================================
// CAMERA
// ============================================
class Camera {
  constructor() { this.x = 0; this.y = 0; this.shake = 0; this.shakeX = 0; this.shakeY = 0; }
  addShake(amount) { this.shake = Math.max(this.shake, amount); }
  update() {
    if (this.shake > 0) {
      this.shakeX = (Math.random() - 0.5) * this.shake;
      this.shakeY = (Math.random() - 0.5) * this.shake;
      this.shake *= 0.85;
      if (this.shake < 0.3) { this.shake = 0; this.shakeX = 0; this.shakeY = 0; }
    }
  }
}

// ============================================
// PLAYER
// ============================================
class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = 100;
    this.y = 300;
    this.w = 28;
    this.h = 36;
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
    this.jumpsLeft = 2;
    this.sliding = false;
    this.dashing = false;
    this.dashCooldown = 0;
    this.dashTimer = 0;
    this.invincible = 0;
    this.health = 100;
    this.healthRegenDelay = 0;
    this.healthRegenRate = 0.12;
    this.energy = 100;
    this.energyRegen = 0.15;
    this.animFrame = 0;
    this.animTimer = 0;
    this.facingRight = true;
    this.trail = [];
    this.powers = {};
    this.empCooldown = 0;
    this.dead = false;
    this.bossMode = false; // free movement during boss
  }

  jump() {
    if (this.jumpsLeft > 0) {
      this.vy = -14;
      this.jumpsLeft--;
      Audio.jump();
      return true;
    }
    return false;
  }

  slide(active) {
    if (active && this.onGround) {
      this.sliding = true;
      this.h = 20;
    } else {
      this.sliding = false;
      this.h = 36;
    }
  }

  fastFall() {
    if (!this.onGround) {
      this.vy = Math.max(this.vy, 14);
      return true;
    }
    return false;
  }

  dash() {
    if (this.dashCooldown <= 0 && this.energy >= 25) {
      this.dashing = true;
      this.dashTimer = 18;
      this.dashCooldown = 60;
      this.energy -= 25;
      this.vx = this.facingRight ? 24 : -24;
      Audio.jump();
      return true;
    }
    return false;
  }

  emp(enemies) {
    if (this.empCooldown <= 0 && this.energy >= 40) {
      this.energy -= 40;
      this.empCooldown = 180;
      Audio.emp();
      return true;
    }
    return false;
  }

  takeDamage(amount) {
    if (this.invincible > 0) return false;
    if (this.powers.shield) { this.powers.shield = 0; return false; }
    this.health = Math.max(0, this.health - amount);
    this.healthRegenDelay = 60;
    this.invincible = 90;
    Audio.hurt();
    if (this.health <= 0) this.dead = true;
    return true;
  }

  update(groundY, keys, canvasW) {
    if (this.dead) return;

    const speed = 5 * (this.powers.speed ? 1.6 : 1);

    // Horizontal movement
    if (!this.dashing) {
      if (this.bossMode) {
        // Free movement during boss
        if (keys['ArrowLeft'] || keys['KeyA'] || keys.TouchLeft) {
          this.vx = -speed;
          this.facingRight = false;
        } else if (keys['ArrowRight'] || keys['KeyD'] || keys.TouchRight) {
          this.vx = speed;
          this.facingRight = true;
        } else {
          this.vx *= 0.7;
        }
      } else {
        this.vx = speed; // auto-runner
        this.facingRight = true;
      }
    }

    // Dash
    if (this.dashTimer > 0) {
      this.dashTimer--;
      if (this.dashTimer <= 0) this.dashing = false;
    }

    // Cooldowns
    if (this.dashCooldown > 0) this.dashCooldown--;
    if (this.empCooldown > 0) this.empCooldown--;
    if (this.invincible > 0) this.invincible--;
    if (this.healthRegenDelay > 0) {
      this.healthRegenDelay--;
    } else if (this.health < 100) {
      this.health = Math.min(100, this.health + this.healthRegenRate);
    }

    // Energy regen
    this.energy = Math.min(100, this.energy + this.energyRegen);

    // Physics
    this.vy += 0.7; // gravity
    if (this.vy > 18) this.vy = 18;

    this.x += this.vx;
    this.y += this.vy;

    // Ground collision
    const ground = groundY - this.h;
    if (this.y >= ground) {
      this.y = ground;
      this.vy = 0;
      this.onGround = true;
      this.jumpsLeft = 2;
    } else {
      this.onGround = false;
    }

    // Keep player in bounds
    if (this.bossMode) {
      if (this.x < 20) this.x = 20;
      if (canvasW && this.x > canvasW - this.w - 20) this.x = canvasW - this.w - 20;
    } else {
      if (this.x < 80) this.x = 80;
      if (this.x > 200) this.x = 200;
    }

    if (this.dashing || this.powers.speed) {
      this.trail.push({
        x: this.x + this.w / 2,
        y: this.y + this.h / 2,
        life: 1,
        speedTrail: !!this.powers.speed,
      });
      if (this.dashing) {
        this.trail.push({
          x: this.x + this.w / 2 - 14,
          y: this.y + this.h / 2 + (Math.random() - 0.5) * 10,
          life: 0.85,
          speedTrail: false,
        });
      }
    }
    if (this.trail.length > 22) this.trail.splice(0, this.trail.length - 22);
    this.trail.forEach(t => t.life -= 0.08);
    this.trail = this.trail.filter(t => t.life > 0);

    // Animation
    this.animTimer++;
    if (this.animTimer > 6) { this.animFrame = (this.animFrame + 1) % 4; this.animTimer = 0; }

    // Power-up timers
    Object.keys(this.powers).forEach(k => {
      if (this.powers[k] > 0) this.powers[k]--;
      if (this.powers[k] <= 0) delete this.powers[k];
    });
  }

  draw(ctx, cam) {
    const x = Math.round(this.x - cam.x + cam.shakeX);
    const y = Math.round(this.y - cam.y + cam.shakeY);
    const w = this.w;
    const h = this.h;

    // Trail (dash/speed effect)
    if (this.trail.length > 0) {
      this.trail.forEach((t, i) => {
        ctx.save();
        ctx.globalAlpha = t.life * (t.speedTrail ? 0.45 : 0.35);
        ctx.fillStyle = t.speedTrail ? '#ffb000' : '#2979ff';
        ctx.shadowColor = t.speedTrail ? '#ff7c00' : '#2979ff';
        ctx.shadowBlur = t.speedTrail ? 10 : 6;
        const tw = t.speedTrail ? w + 8 + i * 0.4 : w;
        const th = this.sliding ? 20 : h;
        ctx.fillRect(t.x - cam.x - tw / 2, t.y - cam.y - th / 2, tw, th);
        ctx.restore();
      });
    }

    // Invincible flash
    if (this.invincible > 0 && Math.floor(this.invincible / 5) % 2 === 0) return;

    ctx.save();
    if (this.powers.shield) {
      ctx.shadowColor = '#2979ff';
      ctx.shadowBlur = 20;
    } else if (this.powers.magnet) {
      ctx.shadowColor = '#a020f0';
      ctx.shadowBlur = 12;
    } else {
      ctx.shadowColor = '#ff2d78';
      ctx.shadowBlur = 8;
    }

    // --- Draw Nova (pixel art) ---
    const drawH = this.sliding ? 20 : h;

    // Body — bright teal suit
    ctx.fillStyle = '#0097a7';
    ctx.fillRect(x + 4, y + (h - drawH), w - 8, drawH);

    // Suit highlight strips
    ctx.fillStyle = '#ff2d78';
    ctx.fillRect(x + 6, y + (h - drawH) + 2, 4, drawH - 4);
    ctx.fillRect(x + w - 10, y + (h - drawH) + 2, 4, drawH - 4);

    if (!this.sliding) {
      // Head — bright orange helmet
      ctx.fillStyle = '#ff7c00';
      ctx.fillRect(x + 6, y, w - 12, 14);

      // Visor — bright blue
      ctx.fillStyle = '#2979ff';
      ctx.fillRect(x + 8, y + 3, w - 16, 6);

      // Visor shine
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 10, y + 4, 4, 2);

      // Run animation legs
      const legOff = [0, 4, 0, -4][this.animFrame];
      ctx.fillStyle = '#1a0a3a';
      ctx.fillRect(x + 5, y + h - 10, 8, 10 + legOff);
      ctx.fillRect(x + w - 13, y + h - 10, 8, 10 - legOff);

      // Boots — bright yellow
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(x + 4, y + h - 3 + legOff, 10, 3);
      ctx.fillRect(x + w - 14, y + h - 3 - legOff, 10, 3);

      // Arms
      const armOff = [-3, 0, 3, 0][this.animFrame];
      ctx.fillStyle = '#00bcd4';
      ctx.fillRect(x + 1, y + 16 + armOff, 5, 10);
      ctx.fillRect(x + w - 6, y + 16 - armOff, 5, 10);
    } else {
      // Slide boots
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(x + 2, y + h - 4, w - 4, 4);
    }

    // EMP indicator — hot pink dot
    if (this.empCooldown <= 0) {
      ctx.fillStyle = '#ff2d78';
      ctx.fillRect(x + w - 8, y + 8, 6, 6);
    }

    ctx.restore();
  }
}

// ============================================
// COLLECTIBLE
// ============================================
class Collectible {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'phone', 'tablet', 'laptop', 'circuit', 'battery', 'charger', 'repair_kit'
    this.w = 24;
    this.h = 24;
    this.collected = false;
    this.bobTimer = Math.random() * Math.PI * 2;
    this.glowTimer = 0;

    const types = {
      phone:    { color: '#00ffff', label: 'PHONE',  points: 100, icon: '📱' },
      tablet:   { color: '#00ff88', label: 'TABLET', points: 150, icon: '📺' },
      laptop:   { color: '#88ffff', label: 'LAPTOP', points: 200, icon: '💻' },
      circuit:  { color: '#ffff00', label: 'CIRCUIT', points: 120, icon: '⚙️' },
      battery:  { color: '#00ff44', label: 'BATTERY', points: 80,  icon: '🔋' },
      charger:  { color: '#aaffaa', label: 'CHARGER', points: 90,  icon: '🔌' },
      repair_kit: { color: '#ffaa00', label: 'REPAIR', points: 250, icon: '🔧' },
    };
    Object.assign(this, types[type] || types.phone);
  }

  update() {
    this.bobTimer += 0.08;
    this.glowTimer += 0.1;
  }

  draw(ctx, cam, scrollX) {
    if (this.collected) return;
    const sx = this.x - scrollX;
    const x = Math.round(sx - cam.x + cam.shakeX);
    const y = Math.round(this.y + Math.sin(this.bobTimer) * 4 - cam.y + cam.shakeY);

    ctx.save();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12 + Math.sin(this.glowTimer) * 4;

    // Draw pixel-art device
    ctx.fillStyle = this.color;

    if (this.type === 'phone') {
      ctx.fillRect(x + 6, y, 12, 20);
      ctx.fillStyle = '#002233';
      ctx.fillRect(x + 7, y + 2, 10, 14);
      ctx.fillStyle = this.color;
      ctx.fillRect(x + 9, y + 17, 6, 2);
    } else if (this.type === 'laptop') {
      ctx.fillRect(x + 2, y + 4, 20, 14);
      ctx.fillStyle = '#002233';
      ctx.fillRect(x + 4, y + 6, 16, 9);
      ctx.fillStyle = this.color;
      ctx.fillRect(x, y + 18, 24, 4);
      ctx.fillRect(x + 6, y + 20, 12, 2);
    } else if (this.type === 'circuit') {
      ctx.fillRect(x + 4, y + 4, 16, 16);
      ctx.fillStyle = '#002200';
      ctx.fillRect(x + 7, y + 7, 10, 10);
      ctx.fillStyle = this.color;
      ctx.fillRect(x, y + 10, 4, 2);
      ctx.fillRect(x + 20, y + 10, 4, 2);
      ctx.fillRect(x + 10, y, 2, 4);
      ctx.fillRect(x + 10, y + 20, 2, 4);
    } else if (this.type === 'battery') {
      ctx.fillRect(x + 5, y + 2, 14, 20);
      ctx.fillStyle = '#002200';
      ctx.fillRect(x + 7, y + 4, 10, 14);
      ctx.fillStyle = this.color;
      ctx.fillRect(x + 9, y, 6, 2);
      const charge = 0.7;
      ctx.fillRect(x + 7, y + 18 - 14 * charge, 10, 14 * charge);
    } else if (this.type === 'repair_kit') {
      ctx.fillRect(x + 2, y + 6, 20, 16);
      ctx.fillStyle = '#664400';
      ctx.fillRect(x + 6, y + 2, 12, 8);
      ctx.fillStyle = this.color;
      ctx.fillRect(x + 10, y + 10, 4, 8);
      ctx.fillRect(x + 6, y + 14, 12, 4);
    } else {
      // Generic device
      ctx.fillRect(x + 3, y + 2, 18, 20);
      ctx.fillStyle = '#002233';
      ctx.fillRect(x + 5, y + 4, 14, 12);
      ctx.fillStyle = this.color;
      ctx.fillRect(x + 8, y + 18, 8, 2);
    }

    // Glow ring
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = 0.4 + Math.sin(this.glowTimer) * 0.2;
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 3, y - 3, this.w + 6, this.h + 6);

    ctx.restore();
  }

  getBounds(scrollX) {
    return { x: this.x - scrollX, y: this.y, w: this.w, h: this.h };
  }
}

// ============================================
// HAZARD
// ============================================
class Hazard {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.animTimer = Math.random() * Math.PI * 2;
    this.w = 32;
    this.h = 28;

    const types = {
      acid_barrel: { color: '#88ff00', damage: 50, w: 28, h: 32 },
      toxic_cloud: { color: '#44aa00', damage: 50, w: 50, h: 40 },
      broken_glass: { color: '#aaaaff', damage: 50, w: 36, h: 18 },
      electric:     { color: '#ffff00', damage: 50, w: 20, h: 40 },
      sludge:       { color: '#338800', damage: 50, w: 60, h: 16 },
    };
    Object.assign(this, types[type] || types.acid_barrel);
    this.life = Infinity;
    this.expired = false;
  }

  update() {
    this.animTimer += 0.06;
    if (this.type === 'toxic_cloud') {
      this.x += Math.sin(this.animTimer * 0.5) * 0.5;
    }
  }

  draw(ctx, cam, scrollX) {
    const sx = this.x - scrollX;
    const x = Math.round(sx - cam.x + cam.shakeX);
    const y = Math.round(this.y - cam.y + cam.shakeY);

    ctx.save();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;

    if (this.type === 'acid_barrel') {
      ctx.fillStyle = '#e65100';
      ctx.fillRect(x + 4, y, 20, 28);
      ctx.fillStyle = this.color;
      ctx.fillRect(x + 2, y + 4, 24, 4);
      ctx.fillRect(x + 2, y + 20, 24, 4);
      // Acid drip
      ctx.fillStyle = '#ffe600';
      ctx.globalAlpha = 0.8 + Math.sin(this.animTimer) * 0.2;
      ctx.fillRect(x + 12, y + 28, 4, 4 + Math.sin(this.animTimer) * 3);

    } else if (this.type === 'toxic_cloud') {
      ctx.globalAlpha = 0.65 + Math.sin(this.animTimer) * 0.15;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(x + 25, y + 20, 20, 0, Math.PI * 2);
      ctx.arc(x + 10, y + 25, 15, 0, Math.PI * 2);
      ctx.arc(x + 38, y + 25, 14, 0, Math.PI * 2);
      ctx.fill();

    } else if (this.type === 'electric') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const yOff = i * 8;
        ctx.beginPath();
        ctx.moveTo(x + 10, y + yOff);
        ctx.lineTo(x + 5 + Math.random() * 10, y + yOff + 4);
        ctx.lineTo(x + 10, y + yOff + 8);
        ctx.stroke();
      }
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(x + 7, y, 6, 40);

    } else if (this.type === 'broken_glass') {
      ctx.fillStyle = '#90caf9';
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.translate(x + i * 6, y + Math.sin(this.animTimer + i) * 2);
        ctx.fillRect(0, 0, 4, 14 + (i % 3) * 4);
        ctx.restore();
      }

    } else { // sludge
      ctx.fillStyle = '#558b2f';
      ctx.fillRect(x, y + 8, this.w, 8);
      ctx.fillStyle = this.color;
      for (let i = 0; i < 5; i++) {
        const bx = x + i * 12 + Math.sin(this.animTimer + i) * 2;
        ctx.beginPath();
        ctx.arc(bx, y + 8, 6, Math.PI, 0);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  getBounds(scrollX) {
    return { x: this.x - scrollX + 4, y: this.y, w: this.w - 8, h: this.h };
  }
}

// ============================================
// POWER-UP
// ============================================
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.w = 28;
    this.h = 28;
    this.collected = false;
    this.bobTimer = Math.random() * Math.PI * 2;
    this.spinTimer = 0;

    const types = {
      magnet:   { color: '#ff88ff', label: 'MAGNET CORE',  duration: 300, icon: '🧲' },
      shield:   { color: '#00aaff', label: 'GREEN SHIELD', duration: 240, icon: '🛡️' },
      speed:    { color: '#ffaa00', label: 'SPEED BOOST',  duration: 300, icon: '⚡' },
      repair:   { color: '#00ff88', label: 'REPAIR KIT',   duration: 0,   icon: '🔧', heal: 40 },
      emp:      { color: '#ff4400', label: 'EMP PULSE',    duration: 0,   icon: '💥' },
    };
    Object.assign(this, types[type] || types.repair);
  }

  update() {
    this.bobTimer += 0.07;
    this.spinTimer += 0.15;
  }

  draw(ctx, cam, scrollX) {
    if (this.collected) return;
    const sx = this.x - scrollX;
    const x = Math.round(sx - cam.x + cam.shakeX);
    const y = Math.round(this.y + Math.sin(this.bobTimer) * 5 - cam.y + cam.shakeY);

    ctx.save();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 16 + Math.sin(this.bobTimer) * 6;

    // Spinning star background
    ctx.translate(x + 14, y + 14);
    ctx.rotate(this.spinTimer);
    ctx.fillStyle = this.color + '33';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(-3, -18, 6, 36);
      ctx.rotate(Math.PI / 4);
    }
    ctx.rotate(-this.spinTimer);
    ctx.fillStyle = this.color;
    ctx.fillRect(-10, -10, 20, 20);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const icons = { magnet:'M', shield:'S', speed:'Z', repair:'R', emp:'E' };
    ctx.fillStyle = '#1a0a3a';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(icons[this.type] || '?', 0, 1);

    ctx.restore();

    // Label
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = this.color;
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.label, x + 14, y - 4);
    ctx.restore();
  }

  getBounds(scrollX) {
    return { x: this.x - scrollX + 2, y: this.y + 2, w: this.w - 4, h: this.h - 4 };
  }
}

// ============================================
// ENEMY
// ============================================
class Enemy {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.alive = true;
    this.animTimer = Math.random() * Math.PI * 2;
    this.stunned = 0;
    this.vx = 0;
    this.vy = 0;
    this.startX = x;

    const types = {
      drone:    { color: '#ff4400', hp: 2, damage: 15, w: 32, h: 20, points: 200, move: 'fly' },
      spider:   { color: '#88ff00', hp: 3, damage: 20, w: 24, h: 24, points: 300, move: 'walk' },
      wastebot: { color: '#888888', hp: 4, damage: 25, w: 30, h: 36, points: 400, move: 'stomp' },
      tv:       { color: '#00ffff', hp: 2, damage: 18, w: 36, h: 34, points: 350, move: 'hop' },
    };
    Object.assign(this, types[type] || types.drone);
  }

  update(playerX, playerY, scrollX, groundY) {
    if (!this.alive || this.stunned > 0) {
      if (this.stunned > 0) this.stunned--;
      return;
    }
    this.animTimer += 0.08;
    const sx = this.x - scrollX;
    const dx = playerX - sx;

    if (this.move === 'fly') {
      this.x -= 2.5;
      this.y = playerY + Math.sin(this.animTimer) * 40;
    } else if (this.move === 'walk') {
      this.x -= 2;
      if (Math.random() < 0.01) this.vy = -8;
      this.vy += 0.5;
      this.y += this.vy;
      if (this.y >= groundY - this.h) { this.y = groundY - this.h; this.vy = 0; }
    } else if (this.move === 'stomp') {
      this.x -= 1.8;
      this.y = groundY - this.h;
    } else if (this.move === 'hop') {
      this.x -= 2.2;
      if (Math.abs(this.vy) < 0.5) this.vy = -10;
      this.vy += 0.6;
      this.y += this.vy;
      if (this.y >= groundY - this.h) { this.y = groundY - this.h; this.vy = 0; }
    }
  }

  hit() {
    this.hp--;
    this.stunned = 20;
    if (this.hp <= 0) { this.alive = false; return true; }
    return false;
  }

  draw(ctx, cam, scrollX) {
    if (!this.alive) return;
    const sx = this.x - scrollX;
    const x = Math.round(sx - cam.x + cam.shakeX);
    const y = Math.round(this.y - cam.y + cam.shakeY);
    const flash = this.stunned > 0;

    ctx.save();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = flash ? 20 : 8;
    if (flash) ctx.globalAlpha = 0.5 + Math.sin(this.stunned * 0.5) * 0.5;

    if (this.type === 'drone') {
      // Body — hot red drone
      ctx.fillStyle = '#b71c1c';
      ctx.fillRect(x + 6, y + 4, 20, 12);
      ctx.fillStyle = this.color;
      ctx.fillRect(x + 8, y + 6, 16, 8);
      // Rotors — bright yellow
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(x, y, 10, 3);
      ctx.fillRect(x + 22, y, 10, 3);
      ctx.fillRect(x, y + 16, 10, 3);
      ctx.fillRect(x + 22, y + 16, 10, 3);
      // Eye — bright pink
      ctx.fillStyle = '#ff2d78';
      ctx.fillRect(x + 14, y + 7, 4, 4);

    } else if (this.type === 'spider') {
      // Body — purple spider
      ctx.fillStyle = '#6a1b9a';
      ctx.fillRect(x + 6, y + 6, 12, 12);
      ctx.fillStyle = this.color;
      ctx.fillRect(x + 8, y + 4, 8, 8);
      // Legs (animated)
      const legSwing = Math.sin(this.animTimer) * 4;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        const side = i < 2 ? -1 : 1;
        const ly = y + 10 + (i % 2) * 6;
        ctx.beginPath();
        ctx.moveTo(x + 12, ly);
        ctx.lineTo(x + 12 + side * (10 + legSwing * (i % 2 === 0 ? 1 : -1)), ly + 6);
        ctx.stroke();
      }
      // Eyes — hot pink
      ctx.fillStyle = '#ff2d78';
      ctx.fillRect(x + 9, y + 5, 2, 2);
      ctx.fillRect(x + 13, y + 5, 2, 2);

    } else if (this.type === 'wastebot') {
      // Body — bold blue-grey robot
      ctx.fillStyle = '#1565c0';
      ctx.fillRect(x + 3, y + 8, 24, 24);
      ctx.fillStyle = '#1976d2';
      ctx.fillRect(x + 6, y + 4, 18, 10);
      // Arms
      ctx.fillStyle = '#0d47a1';
      ctx.fillRect(x, y + 12, 6, 16);
      ctx.fillRect(x + 24, y + 12, 6, 16);
      // Claw — bright teal
      ctx.fillStyle = '#00bcd4';
      ctx.fillRect(x - 2, y + 28, 4, 6);
      ctx.fillRect(x + 28, y + 28, 4, 6);
      // Screen face — orange
      ctx.fillStyle = '#ff7c00';
      ctx.fillRect(x + 8, y + 6, 14, 6);
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(x + 10, y + 7, 4, 4);
      ctx.fillRect(x + 16, y + 7, 4, 4);
      // Tracks — dark navy
      ctx.fillStyle = '#0a1a4a';
      ctx.fillRect(x + 2, y + 28, 26, 8);

    } else { // tv — corrupted TV monster
      // Body — orange TV
      ctx.fillStyle = '#e65100';
      ctx.fillRect(x + 2, y + 2, 32, 28);
      ctx.fillStyle = '#bf360c';
      ctx.fillRect(x + 4, y + 4, 28, 22);
      // Screen (glitching)
      const glitch = Math.floor(this.animTimer) % 3 === 0;
      ctx.fillStyle = glitch ? '#ff2d78' : '#2979ff';
      ctx.fillRect(x + 6, y + 6, 24, 16);
      // Static lines — yellow
      ctx.fillStyle = '#ffe600';
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(x + 6, y + 8 + i * 5, 24, 1);
      }
      // Evil face — dark
      ctx.fillStyle = '#1a0a3a';
      ctx.fillRect(x + 12, y + 10, 4, 4);
      ctx.fillRect(x + 20, y + 10, 4, 4);
      ctx.fillRect(x + 14, y + 16, 8, 2);
      // Legs
      ctx.fillStyle = '#ff7c00';
      ctx.fillRect(x + 8, y + 28, 6, 6);
      ctx.fillRect(x + 22, y + 28, 6, 6);
    }

    ctx.restore();
  }

  getBounds(scrollX) {
    return { x: this.x - scrollX + 4, y: this.y + 4, w: this.w - 8, h: this.h - 4 };
  }
}

// ============================================
// BOSS
// ============================================
class Boss {
  constructor(levelId, canvasW) {
    this.levelId = levelId;
    this.data = LEVEL_DATA[levelId - 1].boss;
    this.canvasW = canvasW || 800;
    this.x = this.canvasW + 50; // start off-screen right
    this.y = 200;
    this.vx = 0;
    this.vy = 0;
    this.maxHp = 20 + levelId * 10;
    this.hp = this.maxHp;
    this.alive = true;
    this.phase = 1;
    this.attackTimer = 0;
    this.attackCooldown = 120;
    this.animTimer = 0;
    this.projectiles = [];
    this.stunned = 0;
    this.w = 80 + levelId * 10;
    this.h = 80 + levelId * 10;
    this.defeated = false;
    this.defeatTimer = 0;
    this.flashTimer = 0;
    this.entryDone = false;
    this.targetX = this.canvasW * 0.55; // hover target x
    this.patrolDir = 1;
    this.patrolTimer = 0;
    this.pickNewTarget();
  }

  pickNewTarget() {
    const minX = 30;
    const maxX = Math.max(minX, this.canvasW - this.w - 30);
    this.targetX = minX + Math.random() * (maxX - minX);
  }

  update(playerX, playerY, groundY) {
    if (this.defeated) {
      this.defeatTimer++;
      this.vx = 4;
      this.vy += 0.5;
      this.x += this.vx;
      this.y += this.vy;
      return;
    }
    if (this.stunned > 0) { this.stunned--; return; }

    this.animTimer += 0.05;
    this.attackTimer++;

    // Entry animation — slide in from right
    if (!this.entryDone) {
      const entryTarget = this.canvasW * 0.58;
      this.x += (entryTarget - this.x) * 0.04;
      if (Math.abs(this.x - entryTarget) < 4) {
        this.x = entryTarget;
        this.entryDone = true;
      }
      return;
    }

    // Phase change
    if (this.hp < this.maxHp * 0.4 && this.phase < 2) {
      this.phase = 2;
      this.attackCooldown = 80;
    }

    // Patrol left-right to create dynamic fights
    this.patrolTimer++;
    if (Math.abs(this.x - this.targetX) < 18 || this.patrolTimer > 110) {
      this.patrolTimer = 0;
      this.pickNewTarget();
    }
    this.x += (this.targetX - this.x) * (0.018 + this.phase * 0.012);
    this.x = Math.max(20, Math.min(this.canvasW - this.w - 20, this.x));

    // Hovering movement
    this.y = (groundY - this.h - 30) + Math.sin(this.animTimer) * (this.levelId === 1 ? 20 : 40);

    // Attack
    if (this.attackTimer >= this.attackCooldown) {
      this.attackTimer = 0;
      this.attack(playerX, playerY, groundY);
    }

    // Update projectiles
    this.projectiles = this.projectiles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.life--;
      return p.life > 0 && p.x > 0;
    });

    if (this.flashTimer > 0) this.flashTimer--;
  }

  attack(playerX, playerY, groundY) {
    const dirX = playerX - this.x;
    const dirY = playerY - this.y;
    const len = Math.sqrt(dirX * dirX + dirY * dirY);
    const nx = dirX / len;
    const ny = dirY / len;

    const speed = 5 + this.phase * 2;
    const count = this.phase === 2 ? 3 : 1;

    for (let i = 0; i < count; i++) {
      const spread = (i - (count - 1) / 2) * 0.3;
      this.projectiles.push({
        x: this.x + this.w / 2,
        y: this.y + this.h / 2,
        vx: (nx + spread) * speed - 3,
        vy: ny * speed,
        gravity: this.levelId === 2 ? 0.2 : 0,
        life: 120,
        color: this.data.color,
        damage: 15 + this.levelId * 5,
        w: 12, h: 12,
      });
    }
  }

  hit(damage) {
    if (this.defeated || this.stunned > 0) return false;
    this.hp -= damage;
    this.stunned = 15;
    this.flashTimer = 15;
    Audio.bossHit();
    if (this.hp <= 0) {
      this.hp = 0;
      this.defeated = true;
      this.vx = 3;
      this.vy = -5;
      Audio.bossDefeat();
    }
    return this.defeated;
  }

  draw(ctx, cam) {
    const x = Math.round(this.x - cam.x + cam.shakeX);
    const y = Math.round(this.y - cam.y + cam.shakeY);
    const w = this.w;
    const h = this.h;
    const flash = this.flashTimer > 0 && Math.floor(this.flashTimer / 3) % 2 === 0;

    ctx.save();
    if (flash) ctx.globalAlpha = 0.3;
    ctx.shadowColor = this.data.color;
    ctx.shadowBlur = 24;

    // Draw different boss per level
    if (this.levelId === 1) {
      this.drawSmokeCrusher(ctx, x, y, w, h);
    } else if (this.levelId === 2) {
      this.drawAcidCore(ctx, x, y, w, h);
    } else if (this.levelId === 3) {
      this.drawObsolescenceEngine(ctx, x, y, w, h);
    } else {
      this.drawWasteTitan(ctx, x, y, w, h);
    }

    ctx.restore();

    // Draw projectiles
    this.projectiles.forEach(p => {
      const px = Math.round(p.x - cam.x + cam.shakeX);
      const py = Math.round(p.y - cam.y + cam.shakeY);
      ctx.save();
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff44';
      ctx.beginPath();
      ctx.arc(px - 1, py - 1, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawSmokeCrusher(ctx, x, y, w, h) {
    // Main body — vivid orange crusher
    ctx.fillStyle = '#e65100';
    ctx.fillRect(x, y + 10, w, h - 10);
    ctx.fillStyle = '#bf360c';
    ctx.fillRect(x + 5, y, w - 10, 20);
    // Crusher arms — deep red
    const armY = Math.sin(this.animTimer * 2) * 10;
    ctx.fillStyle = '#b71c1c';
    ctx.fillRect(x - 20, y + 30 + armY, 30, 16);
    ctx.fillRect(x + w - 10, y + 30 - armY, 30, 16);
    // Crusher plates — bright yellow
    ctx.fillStyle = '#ffe600';
    ctx.fillRect(x - 24, y + 40 + armY, 24, 8);
    ctx.fillRect(x + w, y + 40 - armY, 24, 8);
    // Eyes — hot pink
    ctx.fillStyle = '#ff2d78';
    ctx.shadowBlur = 20;
    ctx.fillRect(x + 15, y + 15, 16, 14);
    ctx.fillRect(x + w - 31, y + 15, 16, 14);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 19, y + 18, 8, 8);
    ctx.fillRect(x + w - 27, y + 18, 8, 8);
    // Smoke vents (weak point) — bright green
    ctx.fillStyle = '#00c94a';
    ctx.fillRect(x + 30, y + h - 12, 10, 12);
    ctx.fillRect(x + w - 40, y + h - 12, 10, 12);
    // Steam puff — white
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.globalAlpha = 0.4 + Math.sin(this.animTimer * 3) * 0.3;
    ctx.beginPath();
    ctx.arc(x + 35, y + h, 16, 0, Math.PI * 2);
    ctx.arc(x + w - 35, y + h, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    // Phase 2 sparks — bright orange
    if (this.phase === 2) {
      ctx.fillStyle = '#ff7c00';
      for (let i = 0; i < 4; i++) {
        const sx = x + 10 + Math.sin(this.animTimer * 3 + i) * 30;
        const sy = y + 20 + Math.cos(this.animTimer * 2 + i) * 10;
        ctx.fillRect(sx, sy, 4, 4);
      }
    }
  }

  drawAcidCore(ctx, x, y, w, h) {
    // Bloated reactor — vivid magenta/purple
    ctx.fillStyle = '#6a1b9a';
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Glowing core gradient
    const grad = ctx.createRadialGradient(x + w/2, y + h/2, 4, x + w/2, y + h/2, w/2);
    grad.addColorStop(0, '#ff2d78');
    grad.addColorStop(0.5, '#a020f0');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x + w/2, y + h/2, w/2 - 4, h/2 - 4, 0, 0, Math.PI * 2);
    ctx.fill();
    // Orbiting bolts — bright yellow
    ctx.fillStyle = '#ffe600';
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + this.animTimer * 0.3;
      ctx.fillRect(x + w/2 + Math.cos(angle) * (w/2 - 8) - 4, y + h/2 + Math.sin(angle) * (h/2 - 8) - 4, 8, 8);
    }
    // Drips — hot pink
    for (let i = 0; i < 4; i++) {
      const dripY = Math.sin(this.animTimer * 2 + i) * 8 + 4;
      ctx.fillStyle = '#ff2d78';
      ctx.fillRect(x + 15 + i * 15, y + h - 5, 4, dripY);
    }
    // Central eye — white with pink
    ctx.fillStyle = '#ff2d78';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(x + w/2, y + h/2, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + w/2 + 3, y + h/2 - 3, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  drawObsolescenceEngine(ctx, x, y, w, h) {
    // Angular machine — bright teal/blue
    ctx.fillStyle = '#006064';
    ctx.fillRect(x + 10, y, w - 20, h);
    ctx.fillRect(x, y + 20, w, h - 40);
    // Signal towers — orange when pulsing
    const pulse = Math.sin(this.animTimer * 4) > 0;
    ctx.fillStyle = pulse ? '#ff7c00' : '#e65100';
    ctx.fillRect(x + w - 16, y - 20, 8, 24);
    ctx.fillRect(x + 8, y - 14, 8, 18);
    // Signal waves
    if (pulse) {
      ctx.strokeStyle = '#ffe600';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      for (let r = 10; r < 40; r += 12) {
        ctx.beginPath();
        ctx.arc(x + w - 12, y - 8, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    // Main screen — bright purple
    ctx.fillStyle = '#4a148c';
    ctx.fillRect(x + 14, y + 12, w - 28, h - 30);
    // Glitch patterns — pink/purple
    ctx.fillStyle = this.phase === 2 ? '#ff2d78' : '#ce93d8';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(x + 16, y + 16 + i * 10, (w - 32) * (1 - i * 0.15), 6);
    }
    // Spinning cogs — yellow
    ctx.fillStyle = '#ffe600';
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.translate(x + 20 + i * 20, y + h - 10);
      ctx.rotate(this.animTimer * (i % 2 === 0 ? 1 : -1));
      ctx.fillRect(-6, -6, 12, 12);
      ctx.fillRect(-8, -2, 16, 4);
      ctx.fillRect(-2, -8, 4, 16);
      ctx.restore();
    }
  }

  drawWasteTitan(ctx, x, y, w, h) {
    // Massive body — deep purple titan
    ctx.fillStyle = '#4a148c';
    ctx.fillRect(x + 10, y + 20, w - 20, h - 20);
    // Shoulders — purple
    ctx.fillStyle = '#6a1b9a';
    ctx.fillRect(x, y + 20, 20, 30);
    ctx.fillRect(x + w - 20, y + 20, 20, 30);
    // Head — magenta
    ctx.fillStyle = '#880e4f';
    ctx.fillRect(x + 15, y, w - 30, 30);
    // Crown of antennas — cycling colors
    const antColors = ['#ff2d78','#ff7c00','#ffe600','#00c94a','#2979ff'];
    for (let i = 0; i < 5; i++) {
      const pulse = Math.sin(this.animTimer * 3 + i * 1.2) > 0;
      ctx.fillStyle = antColors[i];
      ctx.shadowBlur = pulse ? 20 : 4;
      ctx.fillRect(x + 18 + i * 12, y - 12, 5, 16);
    }
    ctx.shadowBlur = 24;
    // Eyes — bright orange and yellow
    ctx.fillStyle = '#ff7c00';
    ctx.fillRect(x + 20, y + 8, 14, 10);
    ctx.fillRect(x + w - 34, y + 8, 14, 10);
    ctx.fillStyle = '#ffe600';
    ctx.fillRect(x + w/2 - 6, y + 8, 12, 10);
    // Power cores (weak points) — vivid cycling colors
    const coreColors = ['#ff2d78', '#ff7c00', '#ffe600', '#00c94a'];
    for (let i = 0; i < 4; i++) {
      const cx = x + 20 + i * 15;
      const cy = y + h - 25;
      const active = Math.sin(this.animTimer * 2 + i) > 0;
      ctx.fillStyle = active ? coreColors[i] : '#37003a';
      ctx.shadowColor = coreColors[i];
      ctx.shadowBlur = active ? 16 : 2;
      ctx.fillRect(cx, cy, 12, 12);
    }
    ctx.shadowBlur = 8;
    // Arms — deep purple
    const armWave = Math.sin(this.animTimer * 1.5) * 8;
    ctx.fillStyle = '#6a1b9a';
    ctx.fillRect(x - 30, y + 30 + armWave, 35, 14);
    ctx.fillRect(x + w - 5, y + 30 - armWave, 35, 14);
    // Claws — pink
    ctx.fillStyle = '#ff2d78';
    ctx.fillRect(x - 36, y + 40 + armWave, 10, 8);
    ctx.fillRect(x - 36, y + 30 + armWave, 8, 6);
    ctx.fillRect(x + w + 26, y + 40 - armWave, 10, 8);
    ctx.fillRect(x + w + 28, y + 30 - armWave, 8, 6);
    // Phase 2: electricity
    if (this.phase === 2) {
      ctx.strokeStyle = '#ff0040';
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(x + 20, y + h - 20);
        ctx.lineTo(x + 20 + Math.random() * w, y + h - 20 + Math.random() * 30);
        ctx.stroke();
      }
    }
  }

  getBounds() {
    return { x: this.x, y: this.y, w: this.w, h: this.h };
  }
}

// ============================================
// BACKGROUND SYSTEM (parallax)
// ============================================
class Background {
  constructor(levelId) {
    this.levelId = levelId;
    this.data = LEVEL_DATA[levelId - 1];
    this.layers = [
      { speed: 0.1, offset: 0 }, // far city
      { speed: 0.25, offset: 0 }, // mountains
      { speed: 0.5, offset: 0 },  // mid debris
      { speed: 0.8, offset: 0 },  // near junk
    ];
    this.cloudOffset = 0;
    this.smokeParticles = [];
    this.lowPowerCanvas = null;
    this.lowPowerKey = '';
    for (let i = 0; i < 12; i++) {
      this.smokeParticles.push({
        x: Math.random() * 900,
        y: 50 + Math.random() * 200,
        size: 30 + Math.random() * 60,
        speed: 0.3 + Math.random() * 0.5,
        alpha: 0.05 + Math.random() * 0.12,
      });
    }
  }

  update(scrollX) {
    if (this.isLowPower()) return;
    this.cloudOffset += 0.2;
    this.smokeParticles.forEach(p => {
      p.x -= p.speed;
      if (p.x + p.size < 0) p.x = 920;
    });
  }

  draw(ctx, canvas, scrollX) {
    const bg = this.data.bgColors;
    const W = canvas.width;
    const H = canvas.height;
    const lowPower = this.isLowPower();
    if (lowPower) {
      this.drawLowPowerCached(ctx, W, H);
      return;
    }
    const parallaxReps = lowPower ? [0] : [-1, 0, 1];

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.65);
    skyGrad.addColorStop(0, bg[0]);
    skyGrad.addColorStop(0.5, bg[1]);
    skyGrad.addColorStop(1, bg[2]);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    // Layer 0: Distant city silhouette
    const off0 = -(scrollX * 0.1) % W;
    ctx.save();
    ctx.globalAlpha = 0.42;
    parallaxReps.forEach(rep => {
      const baseX = off0 + rep * W;
      this.drawCitySilhouette(ctx, baseX, H * 0.35, W, H * 0.3, this.levelId);
    });
    ctx.restore();

    // Fluffy clouds
    ctx.save();
    this.smokeParticles.forEach((p, i) => {
      if (lowPower && i % 2) return;
      ctx.globalAlpha = p.alpha * 0.7;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // Distant cranes, antennae, and recycling towers
    const offTower = -(scrollX * 0.16) % W;
    ctx.save();
    ctx.globalAlpha = 0.32;
    if (!lowPower) parallaxReps.forEach(rep => {
      this.drawIndustrialDetails(ctx, offTower + rep * W, H, this.levelId);
    });
    ctx.restore();

    // Layer 1: E-waste mountains
    const off1 = -(scrollX * 0.25) % W;
    ctx.save();
    ctx.globalAlpha = 0.5;
    parallaxReps.forEach(rep => {
      this.drawWasteMountains(ctx, off1 + rep * W, H, this.levelId);
    });
    ctx.restore();

    // Layer 2: Mid-ground debris
    const off2 = -(scrollX * 0.5) % W;
    ctx.save();
    ctx.globalAlpha = 0.38;
    if (!lowPower) parallaxReps.forEach(rep => {
      this.drawMidGround(ctx, off2 + rep * W, H, this.levelId);
    });
    ctx.restore();

    // Ground
    const groundY = H - 80;
    const gGrad = ctx.createLinearGradient(0, groundY, 0, H);
    gGrad.addColorStop(0, this.data.groundAccent);
    gGrad.addColorStop(1, this.data.groundColor);
    ctx.fillStyle = gGrad;
    ctx.fillRect(0, groundY, W, H - groundY);

    // Ground detail
    ctx.fillStyle = this.data.groundColor;
    ctx.fillRect(0, groundY, W, 4);
    ctx.fillStyle = this.data.groundAccent + '88';
    for (let gx = (-(scrollX * 0.95)) % 80; gx < W; gx += 80) {
      ctx.fillRect(gx, groundY + 4, 40, 2);
    }

    // Near junk
    const off3 = -(scrollX * 0.85) % W;
    ctx.save();
    ctx.globalAlpha = 0.35;
    parallaxReps.forEach(rep => {
      this.drawForegroundJunk(ctx, off3 + rep * W, groundY, this.levelId);
    });
    ctx.restore();
  }

  isLowPower() {
    return window.innerWidth <= 950 || window.matchMedia?.('(pointer: coarse)')?.matches;
  }

  drawLowPowerCached(ctx, W, H) {
    const key = `${this.levelId}:${W}x${H}`;
    if (!this.lowPowerCanvas || this.lowPowerKey !== key) {
      this.lowPowerCanvas = document.createElement('canvas');
      this.lowPowerCanvas.width = W;
      this.lowPowerCanvas.height = H;
      this.lowPowerKey = key;
      const off = this.lowPowerCanvas.getContext('2d');
      this.drawLowPowerStatic(off, W, H);
    }
    ctx.drawImage(this.lowPowerCanvas, 0, 0);
  }

  drawLowPowerStatic(ctx, W, H) {
    const bg = this.data.bgColors;
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.65);
    skyGrad.addColorStop(0, bg[0]);
    skyGrad.addColorStop(0.5, bg[1]);
    skyGrad.addColorStop(1, bg[2]);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.globalAlpha = 0.42;
    this.drawCitySilhouette(ctx, 0, H * 0.35, W, H * 0.3, this.levelId);
    ctx.restore();

    ctx.save();
    this.smokeParticles.forEach((p, i) => {
      if (i % 2) return;
      ctx.globalAlpha = p.alpha * 0.55;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc((p.x / 900) * W, p.y, p.size * 0.9, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.5;
    this.drawWasteMountains(ctx, 0, H, this.levelId);
    ctx.restore();

    const groundY = H - 80;
    const gGrad = ctx.createLinearGradient(0, groundY, 0, H);
    gGrad.addColorStop(0, this.data.groundAccent);
    gGrad.addColorStop(1, this.data.groundColor);
    ctx.fillStyle = gGrad;
    ctx.fillRect(0, groundY, W, H - groundY);
    ctx.fillStyle = this.data.groundColor;
    ctx.fillRect(0, groundY, W, 4);
    ctx.fillStyle = this.data.groundAccent + '88';
    for (let gx = 0; gx < W; gx += 80) {
      ctx.fillRect(gx, groundY + 4, 40, 2);
    }

    ctx.save();
    ctx.globalAlpha = 0.35;
    this.drawForegroundJunk(ctx, 0, groundY, this.levelId);
    ctx.restore();
  }

  drawCitySilhouette(ctx, baseX, baseY, W, maxH, lvl) {
    const heights = [80, 140, 60, 180, 100, 120, 90, 160, 70, 110, 50, 130, 85, 95, 155];
    const widths  = [30, 40, 20, 50, 35, 45, 25, 55, 22, 38, 18, 42, 32, 28, 48];
    // Vibrant building palette per level
    const buildingColors = ['#2979ff', '#a020f0', '#ff7c00', '#e65100'];
    const windowColors   = ['#ffe600', '#ff2d78', '#ffe600', '#ff2d78'];
    const layerAlpha = ctx.globalAlpha;
    let bx = baseX - 20;
    heights.forEach((bh, i) => {
      const shade = i % 2 === 0 ? buildingColors[lvl - 1] : buildingColors[lvl - 1] + 'cc';
      ctx.fillStyle = shade;
      ctx.fillRect(bx, baseY + maxH - bh, widths[i], bh);
      // Lit windows
      ctx.fillStyle = windowColors[lvl - 1];
      ctx.globalAlpha = layerAlpha * 0.55;
      for (let wy = baseY + maxH - bh + 10; wy < baseY + maxH - 10; wy += 14) {
        for (let wx = bx + 4; wx < bx + widths[i] - 4; wx += 10) {
          if (Math.sin(bx * 0.1 + wy * 0.2) > 0) ctx.fillRect(wx, wy, 4, 6);
        }
      }
      // Rooftop antennas and water tanks
      ctx.globalAlpha = layerAlpha * 0.7;
      ctx.fillStyle = '#1a0a3a';
      if (i % 3 === 0) {
        ctx.fillRect(bx + widths[i] / 2, baseY + maxH - bh - 18, 3, 18);
        ctx.fillRect(bx + widths[i] / 2 - 7, baseY + maxH - bh - 20, 17, 3);
      } else if (i % 4 === 0) {
        ctx.fillRect(bx + 8, baseY + maxH - bh - 10, widths[i] - 16, 10);
      }
      ctx.globalAlpha = layerAlpha;
      bx += widths[i] + 4 + (i % 3) * 6;
    });
  }

  drawIndustrialDetails(ctx, baseX, H, lvl) {
    const t = Date.now() * 0.001;
    const colors = ['#1a0a3a', '#6a1b9a', '#1b5e20', '#4a148c'];
    ctx.strokeStyle = colors[lvl - 1] || colors[0];
    ctx.fillStyle = colors[lvl - 1] || colors[0];
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      const x = baseX + 90 + i * 180;
      const y = H * 0.42 + (i % 2) * 34;
      ctx.beginPath();
      ctx.moveTo(x, y + 120);
      ctx.lineTo(x + 24, y);
      ctx.lineTo(x + 48, y + 120);
      ctx.stroke();
      ctx.fillRect(x - 18, y + 118, 84, 10);
      ctx.strokeStyle = '#ffe600';
      ctx.beginPath();
      ctx.moveTo(x + 24, y + 12);
      ctx.lineTo(x + 92, y + 28);
      ctx.stroke();
      ctx.strokeStyle = colors[lvl - 1] || colors[0];
    }
    for (let i = 0; i < 4; i++) {
      const x = baseX + 40 + i * 230;
      const y = H * 0.62;
      ctx.fillStyle = '#ff7c00';
      ctx.fillRect(x, y, 34, 58);
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(x + 8, y - 14, 18, 14);
      ctx.fillStyle = '#ffffff';
      for (let p = 0; p < 3; p++) {
        const puff = (t * 24 + p * 22 + i * 11) % 80;
        ctx.globalAlpha = Math.max(0, 0.36 - puff / 240);
        ctx.beginPath();
        ctx.arc(x + 17 + Math.sin(t + p) * 12, y - 18 - puff, 10 + p * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = colors[lvl - 1] || colors[0];
    }
    ctx.globalAlpha = 0.32;
    ctx.strokeStyle = '#ffe600';
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      const x = baseX + ((i * 73 + t * 18) % 900);
      const y = H * 0.72 + Math.sin(t * 2 + i) * 16;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 28, y + 8);
      ctx.stroke();
    }
  }

  drawWasteMountains(ctx, baseX, H, lvl) {
    // Bright rolling hills / waste mounds per level
    const mountainColors = ['#1565c0', '#c62828', '#2e7d32', '#6a1b9a'];
    const hillColors     = ['#1976d2', '#e53935', '#388e3c', '#7b1fa2'];
    ctx.fillStyle = mountainColors[lvl - 1] || mountainColors[0];
    ctx.beginPath();
    ctx.moveTo(baseX, H);
    const pts = [[0,0],[60,-80],[130,-50],[180,-120],[240,-70],[320,-140],[400,-90],[480,-160],[540,-100],[600,-50],[660,-110],[720,-60],[800,0]];
    pts.forEach(([px, py]) => ctx.lineTo(baseX + px, H - 160 + py));
    ctx.lineTo(baseX + 800, H);
    ctx.closePath();
    ctx.fill();
    // Foreground hills
    ctx.fillStyle = hillColors[lvl - 1] || hillColors[0];
    ctx.beginPath();
    ctx.moveTo(baseX, H);
    const pts2 = [[0,0],[80,-40],[160,-80],[240,-50],[320,-100],[420,-60],[500,-90],[600,-40],[700,-70],[800,0]];
    pts2.forEach(([px, py]) => ctx.lineTo(baseX + px, H - 100 + py));
    ctx.lineTo(baseX + 800, H);
    ctx.closePath();
    ctx.fill();
  }

  drawMidGround(ctx, baseX, H, lvl) {
    const groundY = H - 80;
    const debrisColors = ['#1976d2', '#e53935', '#388e3c', '#7b1fa2'];
    ctx.fillStyle = debrisColors[lvl - 1] || debrisColors[0];
    // Debris piles
    for (let i = 0; i < 8; i++) {
      const dx = baseX + i * 100 + 20;
      const dh = 20 + (i % 3) * 15;
      ctx.fillRect(dx, groundY - dh, 50 + (i % 4) * 10, dh);
      // Wires
      ctx.strokeStyle = '#ffe600';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dx + 10, groundY - dh);
      ctx.bezierCurveTo(dx + 20, groundY - dh - 30, dx + 40, groundY - dh - 20, dx + 60, groundY - dh - 10);
      ctx.stroke();
    }
  }

  drawForegroundJunk(ctx, baseX, groundY, lvl) {
    const items = [
      { x: 30, w: 20, h: 12 },
      { x: 90, w: 14, h: 20 },
      { x: 140, w: 30, h: 8 },
      { x: 200, w: 10, h: 25 },
      { x: 250, w: 22, h: 15 },
      { x: 330, w: 18, h: 10 },
      { x: 400, w: 28, h: 18 },
      { x: 480, w: 12, h: 22 },
      { x: 550, w: 24, h: 12 },
      { x: 630, w: 16, h: 28 },
      { x: 700, w: 20, h: 14 },
    ];
    const junkColors = ['#ff7c00', '#a020f0', '#00c94a', '#ff2d78'];
    items.forEach((item, i) => {
      ctx.fillStyle = i % 2 === 0 ? junkColors[lvl - 1] : junkColors[lvl - 1] + 'aa';
      ctx.fillRect(baseX + item.x, groundY - item.h, item.w, item.h);
    });
  }
}

// ============================================
// FLOATING TEXT
// ============================================
class FloatingText {
  constructor(x, y, text, color) {
    this.x = x; this.y = y; this.text = text; this.color = color;
    this.life = 1; this.vy = -2;
  }
  update() { this.y += this.vy; this.vy *= 0.95; this.life -= 0.02; }
  draw(ctx, cam) {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6;
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.x - cam.x + cam.shakeX, this.y - cam.y + cam.shakeY);
    ctx.restore();
  }
}

class InfoPiece {
  constructor(x, y, topic) {
    this.x = x;
    this.y = y;
    this.topic = topic;
    this.w = 28;
    this.h = 28;
    this.collected = false;
    this.opened = false;
    this.bobTimer = Math.random() * Math.PI * 2;
    this.color = '#ffe600';
  }

  update() {
    this.bobTimer += 0.06;
  }

  draw(ctx, cam, scrollX) {
    if (this.opened) return;
    const x = Math.round(this.x - scrollX - cam.x + cam.shakeX);
    const y = Math.round(this.y + Math.sin(this.bobTimer) * 4 - cam.y + cam.shakeY);

    ctx.save();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 14;
    ctx.fillStyle = this.color;
    ctx.fillRect(x + 4, y + 2, 20, 24);
    ctx.fillStyle = '#1a0a3a';
    ctx.fillRect(x + 7, y + 5, 14, 3);
    ctx.fillRect(x + 7, y + 11, 14, 2);
    ctx.fillRect(x + 7, y + 16, 10, 2);
    ctx.fillStyle = '#ff2d78';
    ctx.fillRect(x + 10, y + 20, 8, 3);
    ctx.restore();
  }

  getBounds(scrollX) {
    return { x: this.x - scrollX, y: this.y, w: this.w, h: this.h };
  }
}

// ============================================
// LEVEL GENERATOR
// ============================================
function generateLevelObjects(levelId, canvasH) {
  const groundY = canvasH - 80;
  const collectibles = [];
  const hazards = [];
  const powerups = [];
  const enemies = [];
  const data = LEVEL_DATA[levelId - 1];
  const densityFactor = Math.pow(0.75, levelId - 1);
  const minimumCollectibles = data.missionTarget + 25;
  const levelOneDensity = 75 / 7200;
  const levelLength = Math.max(4000, Math.ceil(minimumCollectibles / (levelOneDensity * densityFactor)));

  // Later levels spread collectibles out by 25% more than the previous level.
  appendLevelObjects(levelId, groundY, 400, levelLength, { collectibles, hazards, powerups, enemies });

  // Ensure enough mission items even if the player misses some.
  while (collectibles.length < minimumCollectibles) {
    const x = 400 + Math.random() * levelLength;
    const types = levelId === 2 ? ['battery', 'circuit'] : levelId === 3 ? ['repair_kit', 'laptop'] : ['phone', 'tablet'];
    collectibles.push(new Collectible(x, groundY - 40, types[Math.floor(Math.random() * types.length)]));
  }

  return { collectibles, hazards, powerups, enemies, generatedUntilX: levelLength };
}

function appendLevelObjects(levelId, groundY, startX, endX, buckets) {
  const collectibleChance = 0.42;
  let gapsSinceCollectible = 0;

  for (let x = startX; x < endX; x += 180 + Math.random() * 120) {
    const roll = Math.random();
    const forceCollectible = gapsSinceCollectible >= 2;

    if (forceCollectible || roll < collectibleChance) {
      // Collectible
      const types = levelId === 2
        ? ['battery', 'battery', 'circuit', 'charger']
        : levelId === 3
          ? ['repair_kit', 'laptop', 'circuit', 'phone']
          : ['phone', 'tablet', 'laptop', 'circuit', 'charger'];
      const elevated = Math.random() < 0.4;
      const clusterSize = Math.random() < 0.35 ? 2 : 1;
      for (let i = 0; i < clusterSize; i++) {
        buckets.collectibles.push(new Collectible(
          x + i * 34,
          elevated ? groundY - 80 - Math.random() * 60 : groundY - 40,
          types[Math.floor(Math.random() * types.length)]
        ));
      }
      gapsSinceCollectible = 0;
    } else if (roll < collectibleChance + 0.22) {
      gapsSinceCollectible++;
      // Hazard
      const hTypes = levelId === 2
        ? ['acid_barrel', 'electric', 'sludge']
        : levelId === 1
          ? ['toxic_cloud', 'broken_glass', 'acid_barrel']
          : ['broken_glass', 'acid_barrel', 'toxic_cloud'];
      const type = hTypes[Math.floor(Math.random() * hTypes.length)];
      buckets.hazards.push(new Hazard(x, groundY - (type === 'toxic_cloud' ? 60 : 30), type));

    } else if (roll < collectibleChance + 0.35) {
      gapsSinceCollectible++;
      // Enemy
      const eTypes = levelId === 1
        ? ['drone', 'tv']
        : levelId === 2
          ? ['drone', 'spider']
          : levelId === 3
            ? ['wastebot', 'spider']
            : ['drone', 'spider', 'wastebot', 'tv'];
      const type = eTypes[Math.floor(Math.random() * eTypes.length)];
      const ey = type === 'drone' ? groundY - 80 - Math.random() * 60 : groundY;
      buckets.enemies.push(new Enemy(x, ey, type));

    } else if (roll < collectibleChance + 0.42) {
      gapsSinceCollectible++;
      // Power-up (less frequent)
      const pTypes = ['magnet', 'shield', 'speed', 'repair', 'emp'];
      const type = pTypes[Math.floor(Math.random() * pTypes.length)];
      buckets.powerups.push(new PowerUp(x, groundY - 60, type));
    } else {
      gapsSinceCollectible++;
    }
  }
}

// ============================================
// COLLISION DETECTION
// ============================================
function rectsOverlap(a, b) {
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

// ============================================
// MAIN GAME ENGINE
// ============================================
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.state = 'MENU'; // MENU, PLAYING, PAUSED, BOSS, BOSS_INTRO, TRANSITION, GAMEOVER, VICTORY
    this.currentLevel = 1;
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.scrollX = 0;
    this.missionCount = 0;
    this.missionComplete = false;
    this.bossActive = false;
    this.bossTriggered = false;
    this.bossHazardTimer = 0;
    this.nextBossHazardAt = 120;

    this.camera = new Camera();
    this.particles = new ParticleSystem();
    this.floatingTexts = [];

    this.player = null;
    this.boss = null;
    this.bg = null;
    this.collectibles = [];
    this.hazards = [];
    this.powerups = [];
    this.enemies = [];
    this.infoPieces = [];
    this.activeInfoPiece = null;
    this.world = null;
    this.worldTouch = { up: false, down: false, left: false, right: false };
    this.worldZoomLevels = [1, 0.78, 0.58];
    this.worldZoomIndex = 0;

    this.keys = {};
    this.prevKeys = {};
    this.isMobileLayout = matchMedia('(max-width: 900px)').matches;
    this.fps = 0;
    this.fpsFrames = 0;
    this.fpsElapsed = 0;
    this.menuComponents = [];
    this.menuComponentBounds = { w: 0, h: 0 };

    this.groundY = () => this.canvas.height - 80;

    this.saveData = Save.load();

    this.setupInput();
    this.setupUI();
    this.initMenu();

    // Start game loop
    this.lastTime = 0;
    requestAnimationFrame(ts => this.loop(ts));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.isMobileLayout = matchMedia('(max-width: 900px)').matches;
    document.body.classList.toggle('world-mode-active', this.state === 'WORLD');
  }

  requestLandscape() {
    try { screen.orientation?.lock?.('landscape').catch(() => {}); } catch(e) {}
    // Do not force fullscreen here — browsers require a user gesture. Fullscreen will be
    // requested on the next user gesture registered by the app's gesture handlers.
  }

  requestFullscreen() {
    const el = document.documentElement;
    try {
      if (!document.fullscreenElement && el.requestFullscreen) {
        el.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
      }
    } catch(e) {}
  }

  // ==================
  // INPUT
  // ==================
  setupInput() {
    window.addEventListener('keydown', e => {
      if (this.handleMenuNavigation(e)) return;
      this.keys[e.code] = true;

      // Backspace should open the pause menu (where appropriate)
      if (e.code === 'Backspace' && (this.state === 'PLAYING' || this.state === 'BOSS' || this.state === 'WORLD')) {
        e.preventDefault();
        this.togglePause();
      }

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        if (this.state === 'PLAYING' || this.state === 'BOSS') {
          this.player?.jump();
          this.pulseControl('touch-jump');
          Audio.resume();
        }
      }
      if ((e.code === 'KeyP' || e.code === 'Escape') &&
          (this.state === 'PLAYING' || this.state === 'BOSS' || this.state === 'WORLD')) {
        this.togglePause();
      }
      if (e.code === 'KeyE' &&
          (this.state === 'PLAYING' || this.state === 'BOSS' || this.state === 'WORLD')) {
        this.useEMP();
        this.pulseControl(this.state === 'WORLD' ? 'world-touch-emp' : 'touch-emp');
      }
      if (e.code === 'Enter' && this._worldInfoOpen && !document.getElementById('edu-popup')?.classList.contains('hidden')) {
        e.preventDefault();
        document.getElementById('btn-edu-continue')?.click();
        return;
      }
      if (e.code === 'Enter' && this.state === 'WORLD' && this.activeInfoPiece) {
        e.preventDefault();
        this.openWorldInfo();
      }
    });
    window.addEventListener('keyup', e => { this.keys[e.code] = false; });

    // Touch controls
    const addTouch = (id, action) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('pointerdown', e => {
        e.preventDefault();
        action();
        this.pulseControl(id);
        Audio.resume();
      });
    };
    addTouch('touch-jump', () => this.player?.jump());
    addTouch('touch-slide', () => this.player?.fastFall());
    addTouch('touch-dash', () => this.player?.dash());
    addTouch('touch-emp', () => this.useEMP());

    const dpad = document.querySelector('.world-dpad');
    const setWorldTouchFromEvent = (e) => {
      if (!dpad) return;
      const rect = dpad.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dead = Math.min(rect.width, rect.height) * 0.13;
      this.worldTouch.left = dx < -dead;
      this.worldTouch.right = dx > dead;
      this.worldTouch.up = dy < -dead;
      this.worldTouch.down = dy > dead;
      dpad.classList.toggle('show-up', this.worldTouch.up);
      dpad.classList.toggle('show-down', this.worldTouch.down);
      dpad.classList.toggle('show-left', this.worldTouch.left);
      dpad.classList.toggle('show-right', this.worldTouch.right);
    };
    const clearWorldTouch = () => {
      this.worldTouch.up = false;
      this.worldTouch.down = false;
      this.worldTouch.left = false;
      this.worldTouch.right = false;
      dpad?.classList.remove('show-up', 'show-down', 'show-left', 'show-right');
    };
    dpad?.addEventListener('pointerdown', e => {
      e.preventDefault();
      dpad.setPointerCapture?.(e.pointerId);
      setWorldTouchFromEvent(e);
      Audio.resume();
    });
    dpad?.addEventListener('pointermove', e => {
      if (e.buttons) setWorldTouchFromEvent(e);
    });
    dpad?.addEventListener('pointerup', clearWorldTouch);
    dpad?.addEventListener('pointercancel', clearWorldTouch);
    dpad?.addEventListener('lostpointercapture', clearWorldTouch);
    addTouch('world-touch-dash', () => this.player?.dash());
    addTouch('world-touch-emp', () => this.useEMP());
  }

  handleMenuNavigation(e) {
    const navCodes = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Enter', 'Escape'];
    if (!navCodes.includes(e.code)) return false;
    if (this.state === 'PLAYING' || this.state === 'BOSS' || this.state === 'WORLD') return false;

    const activeScreen = [...document.querySelectorAll('.screen:not(.hidden)')].at(-1);
    if (!activeScreen) return false;

    const buttons = [...activeScreen.querySelectorAll('button:not([disabled])')]
      .filter(btn => btn.offsetParent !== null);
    if (!buttons.length) return false;

    if (e.code === 'Escape') {
      e.preventDefault();
      const back = activeScreen.querySelector('[id$="-back"], #btn-go-menu, #btn-victory-menu, #btn-quit, #btn-intro-back');
      if (back) back.click();
      else if (activeScreen.id !== 'main-menu') this.initMenu();
      return true;
    }

    if (e.code === 'Enter') {
      const focused = document.activeElement;
      if (buttons.includes(focused)) {
        e.preventDefault();
        focused.click();
        return true;
      }
      buttons[0].focus();
      e.preventDefault();
      return true;
    }

    e.preventDefault();
    const current = buttons.includes(document.activeElement) ? buttons.indexOf(document.activeElement) : -1;
    const forward = e.code === 'ArrowDown' || e.code === 'ArrowRight' || e.code === 'KeyS' || e.code === 'KeyD';
    const next = current < 0 ? 0 : (current + (forward ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
    return true;
  }

  pulseControl(id) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.classList.remove('control-active');
    void btn.offsetWidth;
    btn.classList.add('control-active');
    clearTimeout(btn._controlPulseTimer);
    btn._controlPulseTimer = setTimeout(() => btn.classList.remove('control-active'), 160);
  }

  keyJustPressed(code) {
    return this.keys[code] && !this.prevKeys[code];
  }

  useEMP() {
    if (!this.player) return;
    const didEMP = this.player.emp(this.enemies);
    if (didEMP) {
      this.camera.addShake(10);
      const cx = this.player.x + this.player.w / 2;
      const cy = this.player.y + this.player.h / 2;
      // Stun all enemies in radius
      const empRadius = 250;
      this.enemies.forEach(e => {
        if (!e.alive) return;
        const ex = e.x - this.scrollX;
        const ey = this.state === 'WORLD' ? e.y - (this.world?.cameraY || 0) : e.y;
        const dx = cx - ex;
        const dy = cy - ey;
        if (Math.sqrt(dx * dx + dy * dy) < empRadius) {
          if (this.state === 'WORLD') {
            e.alive = false;
            this.score += e.points;
            this.particles.emit(ex + e.w / 2, ey + e.h / 2, 18, e.color,
              { speed: 5, decay: 0.04, glow: true });
          } else {
            e.stunned = 120;
          }
        }
      });
      // Damage boss
      if (this.boss && !this.boss.defeated) {
        const dx = cx - this.boss.x;
        const dy = cy - this.boss.y;
        if (Math.sqrt(dx * dx + dy * dy) < empRadius) {
          this.boss.hit(5);
        }
      }
      // Visual effect
      for (let i = 0; i < 60; i++) {
        this.particles.emit(cx, cy, 1, '#00ffff',
          { angle: Math.random() * Math.PI * 2, speed: 4 + Math.random() * 6, decay: 0.03, glow: true });
      }
      this.floatingTexts.push(new FloatingText(cx, cy - 30, '⚡ EMP!', '#00ffff'));
    }
  }

  // ==================
  // UI SETUP
  // ==================
  setupUI() {
    // Menu buttons
    // Request fullscreen on first user gesture (browsers block programmatic fullscreen on load)
    const tryFullOnGesture = () => {
      try { this.requestFullscreen(); } catch(e) {}
      window.removeEventListener('pointerdown', tryFullOnGesture);
      window.removeEventListener('keydown', tryFullOnGesture);
    };
    window.addEventListener('pointerdown', tryFullOnGesture, { once: true });
    window.addEventListener('keydown', tryFullOnGesture, { once: true });

    document.getElementById('btn-world')?.addEventListener('click', () => { Audio.resume(); this.startWorldMode(); });
    document.getElementById('btn-story')?.addEventListener('click', () => this.showScreen('story-screen'));
    document.getElementById('btn-levels')?.addEventListener('click', () => { this.populateLevelSelect(); this.showScreen('level-select'); });
    document.getElementById('btn-highscores')?.addEventListener('click', () => { this.populateHighScores(); this.showScreen('highscores-screen'); });
    document.getElementById('btn-how-to-play')?.addEventListener('click', () => this.showScreen('howto-screen'));
    document.getElementById('btn-credits')?.addEventListener('click', () => {
      this.showInfoModal(
        'CREDITS',
        'Creator details\nE-Waste Escape was created by Asher King as a retro arcade game about repair, recycling, and e-waste education.\n\nFont credits\nPress Start 2P by CodeMan38, served through Google Fonts.\n\nAsset credits\nGame icon, pixel-art objects, characters, enemies, bosses, backgrounds, and UI art are custom assets for this project.\n\nTools and libraries\nBuilt with vanilla HTML, CSS, JavaScript, Canvas, Web Audio, and privacy-focused GoatCounter analytics.',
        null,
        null
      );
    });
    document.getElementById('btn-mute-toggle')?.addEventListener('click', () => Audio.toggleMute());

    // Make clicking anywhere on the main menu request fullscreen (user gesture)
    document.getElementById('main-menu')?.addEventListener('click', (e) => {
      // only trigger on clicks in the main menu area (not on other fixed buttons)
      if (e.target && e.currentTarget.contains(e.target)) {
        try { this.requestFullscreen(); } catch(e) {}
      }
    });

    document.getElementById('btn-story-back')?.addEventListener('click', () => this.showScreen('main-menu'));
    document.getElementById('btn-levels-back')?.addEventListener('click', () => this.showScreen('main-menu'));
    document.getElementById('btn-scores-back')?.addEventListener('click', () => this.showScreen('main-menu'));
    document.getElementById('btn-howto-back')?.addEventListener('click', () => this.showScreen('main-menu'));

    document.getElementById('btn-intro-start')?.addEventListener('click', () => {
      this.hideAllScreens();
      this.beginActualPlay();
    });
    document.getElementById('btn-intro-back')?.addEventListener('click', () => this.initMenu());

    document.getElementById('btn-edu-continue')?.addEventListener('click', () => {
      const quiz = document.getElementById('quiz-container');
      if (quiz && !quiz.classList.contains('hidden')) {
        const result = document.getElementById('quiz-result');
        if (result && result.classList.contains('hidden')) {
          // Haven't answered yet — just skip
        }
      }
      this.hideAllScreens();
      this.continueAfterEdu();
    });

    document.getElementById('btn-resume')?.addEventListener('click', () => this.togglePause());
    document.getElementById('btn-restart')?.addEventListener('click', () => {
      this.hideAllScreens();
      if (this.pausedFromState === 'WORLD') this.startWorldMode();
      else this.startLevel(this.currentLevel);
    });
    document.getElementById('btn-quit')?.addEventListener('click', () => { this.hideAllScreens(); this.initMenu(); });

    document.getElementById('btn-retry')?.addEventListener('click', () => { Audio.resume(); this.hideAllScreens(); this.startLevel(this.currentLevel); });
    document.getElementById('btn-go-menu')?.addEventListener('click', () => { this.hideAllScreens(); this.initMenu(); });

    document.getElementById('btn-play-again')?.addEventListener('click', () => { Audio.resume(); this.hideAllScreens(); this.startLevel(1); });
    document.getElementById('btn-victory-menu')?.addEventListener('click', () => { this.hideAllScreens(); this.initMenu(); });
    document.getElementById('btn-open-info')?.addEventListener('click', () => this.openWorldInfo());
    document.getElementById('hud-pause-btn')?.addEventListener('click', () => this.togglePause());
    document.getElementById('world-zoom-btn')?.addEventListener('click', () => this.cycleWorldZoom());
    document.getElementById('btn-fullscreen-help')?.addEventListener('click', () => {
      this.showInfoModal(
        'FULLSCREEN VIEW',
        'E-Waste Escape works best in fullscreen, especially on mobile landscape. Use fullscreen if the controls or HUD feel cramped.',
        'ACTIVATE FULLSCREEN',
        () => this.requestFullscreen()
      );
    });
    document.getElementById('btn-github-help')?.addEventListener('click', () => {
      this.showInfoModal(
        'SOURCE CODE',
        'The source code for E-Waste Escape is on GitHub. You can view it, make contributions, suggest changes, or report an issue.',
        'OPEN GITHUB',
        () => window.open('https://github.com/asher-not-king/e-waste-escape', '_blank', 'noopener')
      );
    });
    document.getElementById('info-modal-close')?.addEventListener('click', () => this.showScreen('main-menu'));
    // Pause menu fullscreen button
    document.getElementById('btn-pause-fullscreen')?.addEventListener('click', () => this.requestFullscreen());
  }

  showInfoModal(title, text, actionLabel, action) {
    document.getElementById('info-modal-title').textContent = title;
    document.getElementById('info-modal-text').textContent = text;
    const actionBtn = document.getElementById('info-modal-action');
    if (actionBtn && actionLabel && action) {
      actionBtn.textContent = actionLabel;
      actionBtn.classList.remove('hidden');
      actionBtn.onclick = action;
    } else if (actionBtn) {
      actionBtn.classList.add('hidden');
      actionBtn.onclick = null;
    }
    this.showScreen('info-modal');
  }

  showScreen(id) {
    this.hideAllScreens();
    document.getElementById(id)?.classList.remove('hidden');
    this.updateCornerButtons(id === 'main-menu');
  }

  hideAllScreens() {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    this.updateCornerButtons(false);
  }

  updateCornerButtons(show) {
    document.getElementById('btn-fullscreen-help')?.classList.toggle('hidden', !show);
    document.getElementById('btn-github-help')?.classList.toggle('hidden', !show);
  }

  // ==================
  // MENU STATE
  // ==================
  initMenu() {
    this.state = 'MENU';
    document.getElementById('hud')?.classList.add('hidden');
    document.getElementById('boss-hud')?.classList.add('hidden');
    document.getElementById('touch-controls')?.classList.add('hidden');
    document.getElementById('world-touch-controls')?.classList.add('hidden');
    document.getElementById('world-info-prompt')?.classList.add('hidden');
    document.getElementById('world-zoom-btn')?.classList.add('hidden');
    document.body.classList.remove('world-mode-active');
    this.showScreen('main-menu');

    // Cycle facts
    this.currentFactIndex = 0;
    this.cycleFact();
  }

  cycleFact() {
    const el = document.getElementById('menu-fact');
    if (!el) return;
    const fact = FACTS[this.currentFactIndex % FACTS.length];
    el.textContent = fact.icon + ' ' + fact.text;
    this.currentFactIndex++;
    clearTimeout(this._factTimeout);
    this._factTimeout = setTimeout(() => this.cycleFact(), 5000);
  }

  populateLevelSelect() {
    const grid = document.getElementById('level-grid');
    if (!grid) return;
    grid.innerHTML = '';
    LEVEL_DATA.forEach(lvl => {
      const unlocked = this.saveData.unlockedLevels.includes(lvl.id);
      const card = document.createElement('div');
      card.className = 'level-card' + (unlocked ? '' : ' locked');
      card.innerHTML = `
        <div class="level-card-number">${lvl.id.toString().padStart(2, '0')}</div>
        <div class="level-card-name">${lvl.name}</div>
        <div class="level-card-boss">BOSS: ${lvl.boss.name}</div>
        ${!unlocked ? '<div class="level-card-lock">🔒</div>' : ''}
      `;
      if (unlocked) {
        card.addEventListener('click', () => {
          this.startLevel(lvl.id);
        });
      }
      grid.appendChild(card);
    });
  }

  populateHighScores() {
    const list = document.getElementById('scores-list');
    if (!list) return;
    const scores = this.saveData.highScores;
    if (scores.length === 0) {
      list.innerHTML = '<div class="score-entry empty-score">No scores yet — play the game!</div>';
      return;
    }
    list.innerHTML = scores.map((s, i) => `
      <div class="score-entry">
        <span class="score-rank">#${i + 1}</span>
        <span>LEVEL ${s.level}</span>
        <span>${s.score.toString().padStart(8, '0')}</span>
      </div>
    `).join('');
  }

  // ==================
  // LEVEL START
  // ==================
  startLevel(levelId) {
    Audio.resume();
    clearTimeout(this._factTimeout);
    this.requestLandscape();

    this.currentLevel = levelId;
    this.saveData = Save.load();

    const data = LEVEL_DATA[levelId - 1];
    this.hideAllScreens();

    // Show level intro
    document.getElementById('level-intro-number').textContent = `◈ LEVEL ${levelId} ◈`;
    document.getElementById('level-intro-name').textContent = data.name;
    document.getElementById('level-intro-theme').textContent = data.theme;
    document.getElementById('level-intro-mission').textContent = `MISSION: ${data.mission}`;
    document.getElementById('level-intro-story').textContent = data.story;
    this.showScreen('level-intro');
  }

  beginActualPlay() {
    const levelId = this.currentLevel;
    const data = LEVEL_DATA[levelId - 1];

    // Reset game state
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.scrollX = 0;
    this.missionCount = 0;
    this.missionComplete = false;
    this.bossTriggered = false;
    this.bossActive = false;
    this.bossHazardTimer = 0;
    this.nextBossHazardAt = 120;
    this.floatingTexts = [];
    this.particles = new ParticleSystem();
    this.camera = new Camera();

    // Create objects
    this.player = new Player(this.canvas);
    this.player.y = this.groundY() - this.player.h;
    this.bg = new Background(levelId);

    const { collectibles, hazards, powerups, enemies, generatedUntilX } = generateLevelObjects(levelId, this.canvas.height);
    this.collectibles = collectibles;
    this.hazards = hazards;
    this.powerups = powerups;
    this.enemies = enemies;
    this.generatedUntilX = generatedUntilX;
    this.boss = null;
    this._bossDefeatedHandled = false;
    this._deathHandled = false;

    // UI
    document.getElementById('hud')?.classList.remove('hidden');
    document.getElementById('boss-hud')?.classList.add('hidden');
    document.getElementById('touch-controls')?.classList.remove('hidden');
    document.getElementById('world-touch-controls')?.classList.add('hidden');
    document.getElementById('world-info-prompt')?.classList.add('hidden');
    document.getElementById('world-zoom-btn')?.classList.add('hidden');
    document.body.classList.remove('world-mode-active');
    this.updateHUD();

    document.getElementById('level-display').textContent = levelId;
    document.getElementById('mission-text').textContent = data.mission;
    document.getElementById('mission-progress').textContent = `0/${data.missionTarget}`;

    this.state = 'PLAYING';
  }

  startWorldMode() {
    clearTimeout(this._factTimeout);
    this.hideAllScreens();
    this.requestLandscape();

    this.state = 'WORLD';
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.scrollX = 0;
    this.missionCount = 0;
    this.missionComplete = false;
    this.bossActive = false;
    this.bossTriggered = false;
    this.floatingTexts = [];
    this.particles = new ParticleSystem();
    this.camera = new Camera();

    const mobile = this.isMobileLayout;
    const worldW = mobile ? 3900 : 5200;
    const worldH = mobile ? 2550 : 3400;
    this.world = {
      width: worldW,
      height: worldH,
      cameraY: 0,
      infoFound: 0,
      zoom: 1,
      perfScale: mobile ? 0.65 : 1,
      blockers: [],
      roads: [],
      dirtPaths: [],
      decorations: [],
      staticCanvas: null,
      staticCtx: null,
    };
    this.worldZoomIndex = 0;

    this.player = new Player(this.canvas);
    this.player.worldX = 360;
    this.player.worldY = worldH * 0.5;
    this.player.x = this.player.worldX;
    this.player.y = this.player.worldY;
    this.player.w = 30;
    this.player.h = 34;
    this.player.bossMode = false;

    this.collectibles = [];
    this.hazards = [];
    this.powerups = [];
    this.enemies = [];
    this.infoPieces = [];
    this.activeInfoPiece = null;
    this.generateWorldLayout();
    this.buildWorldStaticCache();

    const collectibleTypes = ['phone', 'battery', 'circuit', 'charger', 'laptop', 'repair_kit'];
    for (let i = 0; i < (mobile ? 32 : 48); i++) {
      const type = collectibleTypes[Math.floor(Math.random() * collectibleTypes.length)];
      const pos = this.randomOpenWorldPoint(180);
      this.collectibles.push(new Collectible(pos.x, pos.y, type));
    }

    const hazardTypes = ['acid_barrel', 'broken_glass', 'toxic_cloud', 'electric', 'sludge'];
    for (let i = 0; i < (mobile ? 20 : 30); i++) {
      const type = hazardTypes[Math.floor(Math.random() * hazardTypes.length)];
      const pos = this.randomOpenWorldPoint(220);
      this.hazards.push(new Hazard(pos.x, pos.y, type));
    }

    const enemyTypes = ['drone', 'spider', 'wastebot', 'tv'];
    for (let i = 0; i < (mobile ? 14 : 22); i++) {
      const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      const pos = this.randomOpenWorldPoint(320);
      this.enemies.push(new Enemy(pos.x, pos.y, type));
    }

    const pTypes = ['magnet', 'shield', 'speed', 'repair', 'emp'];
    for (let i = 0; i < (mobile ? 8 : 12); i++) {
      const type = pTypes[Math.floor(Math.random() * pTypes.length)];
      const pos = this.randomOpenWorldPoint(260);
      this.powerups.push(new PowerUp(pos.x, pos.y, type));
    }

    WORLD_INFO_TOPICS.forEach((topic, i) => {
      const pos = this.randomOpenWorldPoint(220, i);
      this.infoPieces.push(new InfoPiece(pos.x, pos.y, topic));
    });

    document.getElementById('hud')?.classList.remove('hidden');
    document.getElementById('boss-hud')?.classList.add('hidden');
    document.getElementById('touch-controls')?.classList.add('hidden');
    document.getElementById('world-touch-controls')?.classList.remove('hidden');
    document.getElementById('world-info-prompt')?.classList.add('hidden');
    document.getElementById('world-zoom-btn')?.classList.remove('hidden');
    document.getElementById('world-zoom-btn').textContent = 'ZOOM 1/3';
    document.body.classList.add('world-mode-active');

    document.getElementById('level-display').textContent = 'WORLD';
    document.getElementById('mission-text').textContent = 'Explore the overhead e-waste world';
    document.getElementById('mission-progress').textContent = `INFO 0/${this.infoPieces.length}`;
    this.updateHUD();
  }

  generateWorldLayout() {
    if (!this.world) return;
    const cityW = this.world.width / 2;
    const cityH = this.world.height / 2;
    const roads = [];
    const addRoad = (x, y, w, h) => roads.push({
      x: Math.max(0, Math.min(this.world.width - w, x)),
      y: Math.max(0, Math.min(this.world.height - h, y)),
      w,
      h,
    });

    const centers = [
      { x: cityW * 0.42, y: cityH * 0.42 },
      { x: cityW * 1.55, y: cityH * 0.48 },
      { x: cityW * 0.48, y: cityH * 1.56 },
      { x: cityW * 1.53, y: cityH * 1.52 },
    ];

    // Broken arterial streets that connect districts without forming a rigid grid.
    for (let i = 0; i < centers.length - 1; i++) {
      const a = centers[i];
      const b = centers[i + 1];
      const midX = (a.x + b.x) / 2 + Math.sin(i * 2.7) * 220;
      const midY = (a.y + b.y) / 2 + Math.cos(i * 1.9) * 180;
      addRoad(Math.min(a.x, midX), a.y - 54, Math.abs(midX - a.x) + 110, 108);
      addRoad(midX - 54, Math.min(a.y, midY), 108, Math.abs(midY - a.y) + 110);
      addRoad(Math.min(midX, b.x), midY - 54, Math.abs(b.x - midX) + 110, 108);
      addRoad(b.x - 54, Math.min(midY, b.y), 108, Math.abs(b.y - midY) + 110);
    }

    for (let city = 0; city < 4; city++) {
      const ox = (city % 2) * cityW;
      const oy = Math.floor(city / 2) * cityH;
      for (let i = 0; i < 5; i++) {
        const horizontal = i % 2 === 0;
        const offset = 180 + i * 210 + Math.sin(city * 3 + i) * 95;
        if (horizontal) addRoad(ox + 90, oy + offset, cityW - 230, 76 + (i % 3) * 14);
        else addRoad(ox + offset, oy + 110, 76 + (i % 3) * 14, cityH - 240);
      }
    }
    this.world.roads = roads;

    this.world.dirtPaths = [
      this.makeWorldPath([{ x: 180, y: 320 }, centers[0], centers[2], { x: 680, y: this.world.height - 160 }], 0, 78),
      this.makeWorldPath([{ x: this.world.width - 220, y: 260 }, centers[1], centers[3], { x: this.world.width - 760, y: this.world.height - 220 }], 7, 82),
      this.makeWorldPath([{ x: 360, y: cityH - 520 }, { x: cityW + 230, y: cityH - 180 }, { x: cityW + 780, y: cityH + 420 }], 13, 68),
      this.makeWorldPath([{ x: cityW - 420, y: 420 }, { x: cityW + 160, y: cityH + 40 }, { x: cityW - 360, y: cityH + 860 }], 21, 72),
    ];

    const blockers = [];
    for (let city = 0; city < 4; city++) {
      const col = city % 2;
      const row = Math.floor(city / 2);
      const ox = col * cityW;
      const oy = row * cityH;
      for (let i = 0; i < 16; i++) {
        const w = 92 + (i % 4) * 22;
        const h = 70 + (i % 3) * 24;
        const x = ox + 180 + (i % 4) * 255 + Math.sin(i * 2.1 + city) * 36;
        const y = oy + 190 + Math.floor(i / 4) * 250 + Math.cos(i * 1.4 + city) * 42;
        const rect = { x, y, w, h, city, colorIndex: i };
        if (!this.rectIntersectsRoad(rect)) blockers.push(rect);
      }
      blockers.push({ x: ox + cityW - 260, y: oy + 150, w: 120, h: 110, city, colorIndex: 19 });
      blockers.push({ x: ox + 155, y: oy + cityH - 310, w: 150, h: 120, city, colorIndex: 20 });
    }
    this.world.blockers = blockers;
    this.world.decorations = this.generateWorldDecorations();
  }

  makeWorldPath(points, seed, width = 70) {
    const expanded = [];
    points.forEach((point, index) => {
      if (index === 0) {
        expanded.push(point);
        return;
      }
      const prev = points[index - 1];
      for (let i = 1; i <= 7; i++) {
        const t = i / 7;
        expanded.push({
          x: prev.x + (point.x - prev.x) * t + Math.sin(seed + index * 2 + t * 8) * 70,
          y: prev.y + (point.y - prev.y) * t + Math.cos(seed + index * 3 + t * 7) * 55,
        });
      }
    });
    return { points: expanded, seed, width };
  }

  generateWorldDecorations() {
    const decorations = [];
    const add = (x, y, type, seed, size = 1) => {
      const probe = { x: x - 20, y: y - 20, w: 40, h: 40 };
      if (!this.world.blockers.some(b => rectsOverlap(probe, b))) {
        decorations.push({ x, y, type, seed, size });
      }
    };

    this.world.dirtPaths.forEach((path, pathIndex) => {
      const pts = path.points;
      for (let i = 1; i < pts.length; i += 2) {
        const p = pts[i];
        const prev = pts[i - 1];
        const angle = Math.atan2(p.y - prev.y, p.x - prev.x);
        const nx = -Math.sin(angle);
        const ny = Math.cos(angle);
        const wobble = Math.sin(path.seed + i * 1.7) * 12;
        const sideOffset = path.width * 0.62 + wobble;
        add(p.x + nx * sideOffset, p.y + ny * sideOffset, i % 3 === 0 ? 'flower' : 'hedge', path.seed + i, 0.85 + (i % 4) * 0.08);
        add(p.x - nx * (sideOffset + 10), p.y - ny * (sideOffset + 10), i % 4 === 0 ? 'scrap-sign' : 'hedge', path.seed + i + 91, 0.75 + (i % 5) * 0.07);
        if ((i + pathIndex) % 5 === 0) add(p.x + nx * (sideOffset + 42), p.y + ny * (sideOffset + 42), 'flower', path.seed + i + 33, 1);
      }
    });

    const cityW = this.world.width / 2;
    const cityH = this.world.height / 2;
    for (let city = 0; city < 4; city++) {
      const ox = (city % 2) * cityW;
      const oy = Math.floor(city / 2) * cityH;
      for (let i = 0; i < 10; i++) {
        const x = ox + 140 + ((i * 173 + city * 241) % Math.max(1, cityW - 280));
        const y = oy + 180 + ((i * 211 + city * 137) % Math.max(1, cityH - 360));
        const type = i % 4 === 0 ? 'small-building' : (i % 3 === 0 ? 'tree' : 'flower');
        add(x + Math.sin(i + city) * 38, y + Math.cos(i * 1.7 + city) * 42, type, city * 31 + i, 0.8 + (i % 3) * 0.12);
      }
    }

    return decorations;
  }

  rectIntersectsRoad(rect) {
    return this.world.roads.some(r => rectsOverlap(rect, r));
  }

  randomOpenWorldPoint(margin = 160, seed = Math.random() * 1000) {
    for (let tries = 0; tries < 80; tries++) {
      const x = margin + Math.random() * (this.world.width - margin * 2);
      const y = margin + Math.random() * (this.world.height - margin * 2);
      const probe = { x: x - 28, y: y - 28, w: 56, h: 56 };
      if (!this.world.blockers.some(b => rectsOverlap(probe, b))) return { x, y };
    }
    return {
      x: margin + ((seed * 997) % (this.world.width - margin * 2)),
      y: margin + ((seed * 577) % (this.world.height - margin * 2)),
    };
  }

  cycleWorldZoom() {
    if (this.state !== 'WORLD' || !this.world) return;
    this.worldZoomIndex = (this.worldZoomIndex + 1) % this.worldZoomLevels.length;
    this.world.zoom = this.worldZoomLevels[this.worldZoomIndex];
    const btn = document.getElementById('world-zoom-btn');
    if (btn) btn.textContent = `ZOOM ${this.worldZoomIndex + 1}/3`;
  }

  buildWorldStaticCache() {
    if (!this.world) return;
    const canvas = document.createElement('canvas');
    canvas.width = this.world.width;
    canvas.height = this.world.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prevScroll = this.scrollX;
    const prevCameraY = this.world.cameraY;
    const prevZoom = this.world.zoom;
    this.scrollX = 0;
    this.world.cameraY = 0;
    this.world.zoom = 1;
    this.drawWorldBackgroundRaw(ctx, canvas.width, canvas.height, { staticPass: true });
    this.scrollX = prevScroll;
    this.world.cameraY = prevCameraY;
    this.world.zoom = prevZoom;
    this.world.staticCanvas = canvas;
    this.world.staticCtx = ctx;
  }

  // ==================
  // BOSS SEQUENCE
  // ==================
  triggerBoss() {
    if (this.bossTriggered) return;
    this.bossTriggered = true;
    const data = LEVEL_DATA[this.currentLevel - 1];

    // Boss warning screen
    document.getElementById('boss-warning-name').textContent = data.boss.name;
    document.getElementById('boss-warning-desc').textContent = data.boss.desc;
    document.getElementById('touch-controls')?.classList.add('hidden');
    document.getElementById('world-touch-controls')?.classList.add('hidden');
    this.showScreen('boss-warning');
    this.state = 'BOSS_INTRO';

    this.camera.addShake(15);

    setTimeout(() => {
      this.hideAllScreens();
      document.getElementById('hud')?.classList.remove('hidden');
      document.getElementById('touch-controls')?.classList.add('hidden');
      document.getElementById('world-touch-controls')?.classList.remove('hidden');

      this.boss = new Boss(this.currentLevel, this.canvas.width);
      this.bossActive = true;
      this.state = 'BOSS';
      this.bossHazardTimer = 0;
      this.nextBossHazardAt = 90 + Math.floor(Math.random() * 90);
      // Enable free movement during boss
      if (this.player) { this.player.bossMode = true; this.player.x = 120; }

      document.getElementById('boss-hud')?.classList.remove('hidden');
      document.getElementById('boss-name').textContent = data.boss.name;
      this.updateBossHUD();
    }, 3000);
  }

  updateBossHUD() {
    if (!this.boss) return;
    const pct = Math.max(0, this.boss.hp / this.boss.maxHp) * 100;
    document.getElementById('boss-health-bar').style.width = pct + '%';
  }

  updateBossHazards(groundY) {
    if (!this.boss || this.boss.defeated) return;
    this.bossHazardTimer++;
    if (this.bossHazardTimer < this.nextBossHazardAt) return;

    this.bossHazardTimer = 0;
    this.nextBossHazardAt = 120 + Math.floor(Math.random() * 180);

    const types = ['acid_barrel', 'toxic_cloud', 'electric', 'sludge', 'broken_glass'];
    const type = types[Math.floor(Math.random() * types.length)];
    const hazardY = groundY - (type === 'toxic_cloud' ? 60 : 30);
    const screenX = 60 + Math.random() * Math.max(120, this.canvas.width - 120);
    const hazard = new Hazard(this.scrollX + screenX, hazardY, type);
    hazard.temporary = true;
    hazard.life = 600;
    hazard.damage = 50;
    this.hazards.push(hazard);

    this.particles.emit(screenX, hazardY + 10, 12, hazard.color,
      { decay: 0.04, glow: true, upward: true, speed: 2 });
  }

  extendRunnerObjectsIfNeeded(groundY) {
    if (this.state !== 'PLAYING') return;
    const generateAheadTo = this.scrollX + Math.max(3600, this.canvas.width * 4);
    if (this.generatedUntilX >= generateAheadTo) return;

    const startX = this.generatedUntilX + 250;
    const endX = generateAheadTo + 1800;
    appendLevelObjects(this.currentLevel, groundY, startX, endX, {
      collectibles: this.collectibles,
      hazards: this.hazards,
      powerups: this.powerups,
      enemies: this.enemies,
    });
    this.generatedUntilX = endX;
  }

  // ==================
  // GAME LOOP
  // ==================
  loop(timestamp) {
    const dt = Math.min(timestamp - this.lastTime, 50);
    this.lastTime = timestamp;
    this.updateFPS(dt);

    this.update(dt);
    this.draw();

    this.prevKeys = { ...this.keys };
    requestAnimationFrame(ts => this.loop(ts));
  }

  updateFPS(dt) {
    this.fpsElapsed += dt;
    this.fpsFrames++;
    if (this.fpsElapsed >= 500) {
      this.fps = Math.round((this.fpsFrames * 1000) / this.fpsElapsed);
      this.fpsElapsed = 0;
      this.fpsFrames = 0;
      const fpsEl = document.getElementById('fps-display');
      if (fpsEl) fpsEl.textContent = `FPS ${String(this.fps).padStart(3, '0')}`;
    }
  }

  update(dt) {
    if (this.state === 'PLAYING' || this.state === 'BOSS') {
      this.updateGame();
    } else if (this.state === 'WORLD') {
      this.updateWorld();
    }
  }

  updateGame() {
    const player = this.player;
    const gY = this.groundY();
    const activeMargin = this.isMobileLayout ? 180 : 320;
    const enemyMargin = this.isMobileLayout ? 360 : 620;
    const inActiveView = (obj, margin = activeMargin) => {
      const w = obj.w || 80;
      return obj.x + w > this.scrollX - margin && obj.x < this.scrollX + this.canvas.width + margin;
    };

    // Fast fall
    if (this.keyJustPressed('ArrowDown') || this.keyJustPressed('KeyS')) {
      player.fastFall();
      this.pulseControl('touch-slide');
    }
    if (this.state === 'BOSS') {
      this.keys.TouchLeft = this.worldTouch.left;
      this.keys.TouchRight = this.worldTouch.right;
      if (this.worldTouch.up && !this._bossDpadJumpHeld) {
        player.jump();
        this._bossDpadJumpHeld = true;
      }
      if (!this.worldTouch.up) this._bossDpadJumpHeld = false;
      if (this.worldTouch.down) player.fastFall();
    }
    // Dash
    if (this.keyJustPressed('ShiftLeft') || this.keyJustPressed('ShiftRight')) {
      player.dash();
      this.pulseControl('touch-dash');
    }

    // Scroll (paused during boss fight)
    if (this.state === 'PLAYING') {
      const baseSpeed = LEVEL_DATA[this.currentLevel - 1].speed;
      const distanceBoost = Math.min(3.5, this.scrollX / 3200);
      const dashBoost = player.dashing ? 5 : 0;
      this.scrollX += baseSpeed + distanceBoost + dashBoost + (player.powers.speed ? 2 : 0);
    }
    this.extendRunnerObjectsIfNeeded(gY);

    // Update player
    player.update(gY, this.keys, this.canvas.width);
    this.updateHUD();

    // Camera
    this.camera.update();

    // Background
    this.bg?.update(this.scrollX);

    // Particles
    this.particles.update();
    if (this.isMobileLayout && this.particles.particles.length > 140) {
      this.particles.particles.length = 140;
    }

    // Floating texts
    this.floatingTexts = this.floatingTexts.filter(t => { t.update(); return t.life > 0; });

    // Combo decay
    if (this.combo > 0) {
      this.comboTimer--;
      if (this.comboTimer <= 0) { this.combo = 0; this.updateHUD(); }
    }

    // Player bounds — world edge
    if (player.x < (player.bossMode ? 20 : 60)) player.x = player.bossMode ? 20 : 60;

    // Collectibles
    this.collectibles.forEach(c => {
      if (!inActiveView(c)) return;
      if (c.collected) return;
      c.update();

      // Magnet pull
      if (player.powers.magnet) {
        const cx = c.x - this.scrollX;
        const dx = player.x - cx;
        const dy = (player.y + player.h / 2) - (c.y + c.h / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          c.x += dx / dist * 4;
          c.y += dy / dist * 4;
        }
      }

      const cb = c.getBounds(this.scrollX);
      const pb = { x: player.x, y: player.y, w: player.w, h: player.h };
      if (rectsOverlap(cb, pb)) {
        c.collected = true;
        const pts = c.points * (1 + this.combo * 0.1);
        this.score += Math.round(pts);
        this.combo++;
        this.comboTimer = 120;
        this.missionCount++;
        Audio.collect();
        this.particles.emit(player.x + player.w / 2, player.y, 12, c.color,
          { decay: 0.04, glow: true, upward: true, speed: 3 });
        this.floatingTexts.push(new FloatingText(
          player.x + player.w / 2, player.y - 10,
          '+' + Math.round(pts), c.color
        ));
        this.updateHUD();
        this.checkMission();
      }
    });

    // Hazards
    this.hazards.forEach(h => {
      if (!inActiveView(h)) {
        if (Number.isFinite(h.life)) {
          h.life--;
          if (h.life <= 0) h.expired = true;
        }
        return;
      }
      h.update();
      if (Number.isFinite(h.life)) {
        h.life--;
        if (h.life <= 0) h.expired = true;
      }
      if (h.expired) return;
      const hb = h.getBounds(this.scrollX);
      const pb = { x: player.x + 4, y: player.y + 4, w: player.w - 8, h: player.h - 8 };
      if (rectsOverlap(hb, pb)) {
        if (player.takeDamage(h.damage)) {
          if (h.temporary) h.expired = true;
          this.camera.addShake(8);
          this.particles.emit(player.x + player.w / 2, player.y + player.h / 2, 16,
            '#ff4400', { decay: 0.05, upward: true });
          this.updateHUD();
        }
      }
    });

    // Power-ups
    this.powerups.forEach(p => {
      if (!inActiveView(p)) return;
      if (p.collected) return;
      p.update();
      const pb2 = p.getBounds(this.scrollX);
      const pb = { x: player.x, y: player.y, w: player.w, h: player.h };
      if (rectsOverlap(pb2, pb)) {
        p.collected = true;
        if (p.type === 'repair') {
          player.health = Math.min(100, player.health + (p.heal || 40));
        } else if (p.type === 'emp') {
          player.energy = Math.min(100, player.energy + 60);
        } else {
          player.powers[p.type] = p.duration;
        }
        Audio.powerUp();
        this.score += 50;
        this.particles.emit(player.x + player.w / 2, player.y + player.h / 2, 24,
          p.color, { decay: 0.03, glow: true, speed: 5 });
        this.floatingTexts.push(new FloatingText(
          player.x + player.w / 2, player.y - 20,
          p.label, p.color
        ));
        this.updateHUD();
        this.updatePowerUpUI();
      }
    });

    // Enemies
    this.enemies.forEach(e => {
      if (!e.alive) return;
      if (!inActiveView(e, enemyMargin)) return;
      e.update(player.x, player.y, this.scrollX, gY);
      const eb = e.getBounds(this.scrollX);
      const pb = { x: player.x + 6, y: player.y + 6, w: player.w - 12, h: player.h - 6 };
      if (rectsOverlap(eb, pb)) {
        if (player.dashing) {
          // Dash kill!
          const killed = e.hit();
          if (killed) {
            this.score += e.points;
            this.particles.emit(e.x - this.scrollX + e.w / 2, e.y + e.h / 2,
              20, e.color, { speed: 5, decay: 0.04, glow: true });
            this.floatingTexts.push(new FloatingText(
              e.x - this.scrollX + e.w / 2, e.y - 20,
              '+' + e.points, e.color
            ));
            this.camera.addShake(6);
          } else {
            this.floatingTexts.push(new FloatingText(
              e.x - this.scrollX + e.w / 2, e.y - 20, 'HIT!', '#ff8800'
            ));
          }
          this.score += 20;
          this.updateHUD();
        } else {
          if (player.takeDamage(e.damage * 0.4)) {
            this.camera.addShake(10);
            this.particles.emit(player.x + player.w / 2, player.y + player.h / 2,
              14, '#ff0040', { upward: true, decay: 0.05 });
            this.updateHUD();
          }
        }
      }
    });

    // Boss phase
    if (this.state === 'BOSS' && this.boss) {
      this.boss.update(player.x, player.y, gY);
      this.updateBossHazards(gY);
      this.updateBossHUD();

      // Boss projectiles hit player (all in screen coords during boss)
      this.boss.projectiles.forEach(proj => {
        const projScreen = { x: proj.x, y: proj.y, w: proj.w, h: proj.h };
        const playerScreen = { x: player.x, y: player.y, w: player.w, h: player.h };

        if (rectsOverlap(projScreen, playerScreen) && proj.life > 0) {
          proj.life = 0;
          if (player.takeDamage(proj.damage * 0.5)) {
            this.camera.addShake(12);
            this.particles.emit(player.x + player.w / 2, player.y + player.h / 2,
              18, '#ff0040', { upward: true, decay: 0.04 });
            this.updateHUD();
          }
        }
      });

      // Dash hits boss
      if (player.dashing && !this.boss.defeated) {
        const bx = this.boss.x;
        const pb = { x: player.x, y: player.y, w: player.w, h: player.h };
        const bb = { x: bx, y: this.boss.y, w: this.boss.w, h: this.boss.h };
        if (rectsOverlap(pb, bb)) {
          const killed = this.boss.hit(8);
          this.camera.addShake(14);
          this.floatingTexts.push(new FloatingText(
            bx + this.boss.w / 2, this.boss.y - 10, 'CRITICAL!', '#ffff00'
          ));
          if (killed) this.onBossDefeated();
          this.score += 100;
          this.updateHUD();
        }
      }

      // Boss defeated
      if (this.boss.defeated && this.boss.defeatTimer > 90) {
        this.onBossDefeated();
      }
    }

    // Mission complete triggers boss (after enough level has passed)
    if (this.missionComplete && !this.bossTriggered && this.state === 'PLAYING') {
      if (this.scrollX > 800) {
        this.triggerBoss();
      }
    }
    // Player death
    if (player.dead) {
      this.onPlayerDead();
    }

    // Cull old objects during endless generation.
    this.collectibles = this.collectibles.filter(c => !c.collected && c.x - this.scrollX > -500);
    this.hazards = this.hazards.filter(h => !h.expired && h.x - this.scrollX > -500);
    this.powerups = this.powerups.filter(p => !p.collected && p.x - this.scrollX > -500);
    this.enemies = this.enemies.filter(e => (e.alive || e.x - this.scrollX > -200) && e.x - this.scrollX > -500);

    this.updatePowerUpUI();
  }

  updateWorld() {
    if (!this.player || !this.world) return;
    const player = this.player;

    const left = this.keys['ArrowLeft'] || this.keys['KeyA'] || this.worldTouch.left;
    const right = this.keys['ArrowRight'] || this.keys['KeyD'] || this.worldTouch.right;
    const up = this.keys['ArrowUp'] || this.keys['KeyW'] || this.worldTouch.up;
    const down = this.keys['ArrowDown'] || this.keys['KeyS'] || this.worldTouch.down;
    const speed = 4.1 * (player.powers.speed ? 1.45 : 1);
    let dx = (right ? 1 : 0) - (left ? 1 : 0);
    let dy = (down ? 1 : 0) - (up ? 1 : 0);
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;

    if (this.keyJustPressed('ShiftLeft') || this.keyJustPressed('ShiftRight')) {
      player.dash();
    }

    if (!player.dashing) {
      player.vx = dx * speed;
      player.vy = dy * speed;
    } else if (Math.abs(dx) + Math.abs(dy) > 0) {
      player.vx = dx * 18;
      player.vy = dy * 18;
    }

    if (player.dashTimer > 0) {
      player.dashTimer--;
      if (player.dashTimer <= 0) player.dashing = false;
    }
    if (player.dashCooldown > 0) player.dashCooldown--;
    if (player.empCooldown > 0) player.empCooldown--;
    if (player.invincible > 0) player.invincible--;
    if (player.healthRegenDelay > 0) {
      player.healthRegenDelay--;
    } else if (player.health < 100) {
      player.health = Math.min(100, player.health + player.healthRegenRate);
    }
    player.energy = Math.min(100, player.energy + player.energyRegen);

    const oldX = player.worldX;
    const oldY = player.worldY;
    player.worldX += player.vx;
    if (this.worldHitsBlocker(player.worldX, player.worldY, 28, 30)) player.worldX = oldX;
    player.worldY += player.vy;
    if (this.worldHitsBlocker(player.worldX, player.worldY, 28, 30)) player.worldY = oldY;
    player.worldX = Math.max(50, Math.min(this.world.width - 50, player.worldX));
    player.worldY = Math.max(50, Math.min(this.world.height - 50, player.worldY));
    player.facingRight = player.vx >= 0;

    if (player.dashing || player.powers.speed) {
      player.trail.push({
        x: player.worldX,
        y: player.worldY,
        life: 1,
        speedTrail: !!player.powers.speed,
      });
    }
    if (player.trail.length > 22) player.trail.splice(0, player.trail.length - 22);
    player.trail.forEach(t => t.life -= 0.08);
    player.trail = player.trail.filter(t => t.life > 0);

    player.animTimer++;
    if (player.animTimer > 6) { player.animFrame = (player.animFrame + 1) % 4; player.animTimer = 0; }
    Object.keys(player.powers).forEach(k => {
      if (player.powers[k] > 0) player.powers[k]--;
      if (player.powers[k] <= 0) delete player.powers[k];
    });

    const zoom = this.world.zoom || 1;
    const viewW = this.canvas.width / zoom;
    const viewH = this.canvas.height / zoom;
    this.scrollX = Math.max(0, Math.min(this.world.width - viewW, player.worldX - viewW * 0.5));
    this.world.cameraY = Math.max(0, Math.min(this.world.height - viewH, player.worldY - viewH * 0.5));
    player.x = player.worldX - this.scrollX;
    player.y = player.worldY - this.world.cameraY;

    this.camera.update();
    this.particles.update();
    if (this.isMobileLayout && this.particles.particles.length > 120) {
      this.particles.particles.length = 120;
    }
    this.floatingTexts = this.floatingTexts.filter(t => { t.update(); return t.life > 0; });

    this.collectibles.forEach(c => {
      if (c.collected) return;
      c.update();
      if (player.powers.magnet) {
        const dx = player.worldX - c.x;
        const dy = player.worldY - c.y;
        const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        if (dist < 170) {
          c.x += dx / dist * 3;
          c.y += dy / dist * 3;
        }
      }
      const cb = this.worldBounds(c, 24, 24);
      const pb = this.worldBounds(player, 30, 34);
      if (rectsOverlap(cb, pb)) {
        c.collected = true;
        this.score += c.points;
        this.missionCount++;
        Audio.collect();
        this.particles.emit(player.x, player.y, 10, c.color,
          { decay: 0.04, glow: true, upward: true, speed: 3 });
        this.floatingTexts.push(new FloatingText(player.x, player.y - 20, '+' + c.points, c.color));
      }
    });

    this.hazards.forEach(h => {
      h.update();
      const hb = this.worldBounds(h, h.w || 32, h.h || 28);
      const pb = this.worldBounds(player, 26, 28);
      if (rectsOverlap(hb, pb) && player.takeDamage(h.damage * 0.45)) {
        this.camera.addShake(8);
        this.particles.emit(player.x, player.y, 12, '#ff4400',
          { decay: 0.05, upward: true });
      }
    });

    this.powerups.forEach(p => {
      if (p.collected) return;
      p.update();
      const pb2 = this.worldBounds(p, p.w, p.h);
      const pb = this.worldBounds(player, 30, 34);
      if (rectsOverlap(pb2, pb)) {
        p.collected = true;
        if (p.type === 'repair') player.health = Math.min(100, player.health + (p.heal || 40));
        else if (p.type === 'emp') player.energy = Math.min(100, player.energy + 60);
        else player.powers[p.type] = p.duration;
        Audio.powerUp();
        this.score += 50;
        this.particles.emit(player.x, player.y, 18, p.color, { decay: 0.03, glow: true, speed: 5 });
      }
    });

    this.enemies.forEach(e => {
      if (!e.alive) return;
      this.updateWorldEnemy(e, player);
      const eb = this.worldBounds(e, e.w, e.h);
      const pb = this.worldBounds(player, 26, 30);
      if (rectsOverlap(eb, pb)) {
        if (player.dashing) {
          const killed = e.hit();
          this.score += killed ? e.points : 30;
          this.camera.addShake(5);
        } else if (player.takeDamage(e.damage * 0.55)) {
          this.camera.addShake(9);
          this.particles.emit(player.x, player.y, 12, '#ff0040',
            { upward: true, decay: 0.05 });
        }
      }
    });

    this.activeInfoPiece = null;
    this.infoPieces.forEach(piece => {
      if (piece.opened) return;
      piece.update();
      const pb = this.worldBounds(player, 32, 34);
      if (rectsOverlap(this.worldBounds(piece, 30, 30), pb)) {
        this.activeInfoPiece = piece;
      }
    });
    this.updateWorldPromptUI();

    if (player.dead) this.onPlayerDead();
    this.collectibles = this.collectibles.filter(c => !c.collected);
    this.powerups = this.powerups.filter(p => !p.collected);
    this.updateHUD();
    document.getElementById('mission-progress').textContent =
      `INFO ${this.world.infoFound}/${this.infoPieces.length}`;
    this.updatePowerUpUI();
  }

  worldBounds(obj, w, h) {
    const x = obj.worldX ?? obj.x;
    const y = obj.worldY ?? obj.y;
    return { x: x - w / 2, y: y - h / 2, w, h };
  }

  updateWorldPromptUI() {
    const infoPrompt = document.getElementById('world-info-prompt');
    const zoomBtn = document.getElementById('world-zoom-btn');
    const showInfo = this.state === 'WORLD' && !!this.activeInfoPiece;
    if (infoPrompt) {
      if (showInfo) {
        infoPrompt.classList.remove('hidden');
        // place it centered where the zoom button normally is
        infoPrompt.style.left = '50%';
        infoPrompt.style.transform = 'translateX(-50%)';
        infoPrompt.style.bottom = (window.matchMedia('(max-width: 900px)').matches ? '10px' : '18px');
        infoPrompt.style.zIndex = '95';
      } else {
        infoPrompt.classList.add('hidden');
        infoPrompt.style.zIndex = '';
        infoPrompt.style.left = '';
        infoPrompt.style.transform = '';
        infoPrompt.style.bottom = '';
      }
    }
    if (zoomBtn) {
      // ensure zoom button is hidden when info is shown (force it)
      if (this.state !== 'WORLD' || showInfo) {
        zoomBtn.classList.add('hidden');
        zoomBtn.style.display = 'none';
        zoomBtn.style.zIndex = '70';
      } else {
        zoomBtn.classList.remove('hidden');
        zoomBtn.style.display = '';
        zoomBtn.style.zIndex = '';
      }
    }
  }

  worldHitsBlocker(x, y, w, h) {
    const probe = { x: x - w / 2, y: y - h / 2, w, h };
    return this.world?.blockers?.some(b => rectsOverlap(probe, b));
  }

  updateWorldEnemy(enemy, player) {
    if (enemy.stunned > 0) {
      enemy.stunned--;
      return;
    }
    enemy.animTimer += 0.08;
    const dx = player.worldX - enemy.x;
    const dy = player.worldY - enemy.y;
    const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    const aggro = dist < 520;

    const speed = aggro ? 1.7 : 0.55;
    if (aggro) {
      const oldX = enemy.x;
      const oldY = enemy.y;
      enemy.x += (dx / dist) * speed;
      enemy.y += (dy / dist) * speed;
      if (this.worldHitsBlocker(enemy.x, enemy.y, enemy.w, enemy.h)) {
        enemy.x = oldX;
        enemy.y = oldY;
      }
    } else {
      const oldX = enemy.x;
      const oldY = enemy.y;
      enemy.x += Math.sin(enemy.animTimer * 0.7 + enemy.startX) * speed;
      enemy.y += Math.cos(enemy.animTimer * 0.5 + enemy.startX) * speed;
      if (this.worldHitsBlocker(enemy.x, enemy.y, enemy.w, enemy.h)) {
        enemy.x = oldX;
        enemy.y = oldY;
      }
    }
    enemy.x = Math.max(45, Math.min(this.world.width - 45, enemy.x));
    enemy.y = Math.max(45, Math.min(this.world.height - 45, enemy.y));
  }

  checkMission() {
    const data = LEVEL_DATA[this.currentLevel - 1];
    document.getElementById('mission-progress').textContent =
      `${Math.min(this.missionCount, data.missionTarget)}/${data.missionTarget}`;

    if (this.missionCount >= data.missionTarget && !this.missionComplete) {
      this.missionComplete = true;
      this.score += 500;
      this.floatingTexts.push(new FloatingText(
        this.player.x + this.player.w / 2, this.player.y - 40,
        'MISSION COMPLETE!', '#00ff88'
      ));
      Audio.levelComplete();
      this.camera.addShake(8);
    }
  }

  onBossDefeated() {
    if (this._bossDefeatedHandled) return;
    this._bossDefeatedHandled = true;
    this.score += 2000 + this.currentLevel * 500;
    this.camera.addShake(20);

    // Explosion particles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (this.boss) {
          this.particles.emit(
            this.boss.x + this.boss.w / 2 + (Math.random() - 0.5) * 80,
            this.boss.y + this.boss.h / 2 + (Math.random() - 0.5) * 60,
            30, ['#ff4400', '#ffaa00', '#ff0040', '#ffff00'][Math.floor(Math.random() * 4)],
            { speed: 6, decay: 0.03, glow: true }
          );
        }
      }, i * 200);
    }

    setTimeout(() => {
      document.getElementById('boss-hud')?.classList.add('hidden');
      this.state = 'TRANSITION';
      this.showEduPopup();
    }, 2500);
  }

  onPlayerDead() {
    if (this._deathHandled) return;
    this._deathHandled = true;
    this.state = 'GAMEOVER';

    // Explosion on death
    this.camera.addShake(18);
    for (let i = 0; i < 40; i++) {
      this.particles.emit(
        this.player.x + this.player.w / 2,
        this.player.y + this.player.h / 2,
        1, i % 2 === 0 ? '#ff4400' : '#ff0040',
        { angle: Math.random() * Math.PI * 2, speed: 3 + Math.random() * 5, decay: 0.025, glow: true }
      );
    }
    Audio.gameOver();

    const isNew = Save.addScore(this.score, this.currentLevel);
    this.saveData = Save.load();

    setTimeout(() => {
      document.getElementById('hud')?.classList.add('hidden');
      document.getElementById('boss-hud')?.classList.add('hidden');
      document.getElementById('touch-controls')?.classList.add('hidden');
      document.getElementById('world-touch-controls')?.classList.add('hidden');
      document.getElementById('world-info-prompt')?.classList.add('hidden');
      document.getElementById('world-zoom-btn')?.classList.add('hidden');
      document.body.classList.remove('world-mode-active');

      document.getElementById('final-score-display').textContent =
        'SCORE: ' + this.score.toString().padStart(8, '0');

      const factEl = document.getElementById('gameover-fact');
      const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
      if (factEl) factEl.textContent = fact.icon + ' ' + fact.text;

      this.showScreen('gameover-screen');
      this._deathHandled = false;
    }, 1500);
  }

  showEduPopup() {
    const data = LEVEL_DATA[this.currentLevel - 1];
    const fact = data.eduFact;
    const quiz = data.quiz;

    document.getElementById('edu-popup-title').textContent = '♻ DID YOU KNOW?';
    document.getElementById('edu-popup-icon').textContent = fact.icon;
    document.getElementById('edu-popup-text').textContent = fact.text;

    // Show quiz
    const quizContainer = document.getElementById('quiz-container');
    const quizQ = document.getElementById('quiz-question');
    const quizOpts = document.getElementById('quiz-options');
    const quizResult = document.getElementById('quiz-result');

    if (quiz && quizContainer && quizQ && quizOpts) {
      quizContainer.classList.remove('hidden');
      quizQ.textContent = '❓ ' + quiz.question;
      quizResult.classList.add('hidden');
      quizOpts.innerHTML = '';
      quiz.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          if (quizContainer.dataset.answered) return;
          quizContainer.dataset.answered = '1';
          if (i === quiz.correct) {
            btn.classList.add('correct');
            quizResult.textContent = '✓ CORRECT! ' + quiz.explanation;
            quizResult.style.color = '#00ff88';
            this.score += 200;
            this.updateHUD();
          } else {
            btn.classList.add('wrong');
            quizOpts.children[quiz.correct].classList.add('correct');
            quizResult.textContent = '✗ ' + quiz.explanation;
            quizResult.style.color = '#ff4444';
          }
          quizResult.classList.remove('hidden');
        });
        quizOpts.appendChild(btn);
      });
      delete quizContainer.dataset.answered;
    } else if (quizContainer) {
      quizContainer.classList.add('hidden');
    }

    document.getElementById('hud')?.classList.add('hidden');
    document.getElementById('touch-controls')?.classList.add('hidden');
    document.getElementById('world-touch-controls')?.classList.add('hidden');
    this.showScreen('edu-popup');
  }

  openWorldInfo() {
    if (!this.activeInfoPiece || !this.world) return;
    const piece = this.activeInfoPiece;
    const topic = piece.topic;
    piece.opened = true;
    this.activeInfoPiece = null;
    this.world.infoFound++;
    this.score += 250;
    this._worldInfoOpen = true;

    document.getElementById('edu-popup-title').textContent = topic.title;
    document.getElementById('edu-popup-icon').textContent = topic.icon;
    document.getElementById('edu-popup-text').textContent = topic.text;
    const quizContainer = document.getElementById('quiz-container');
    const quizOpts = document.getElementById('quiz-options');
    const quizResult = document.getElementById('quiz-result');
    quizContainer?.classList.add('hidden');
    if (quizContainer) delete quizContainer.dataset.answered;
    if (quizOpts) quizOpts.innerHTML = '';
    if (quizResult) {
      quizResult.textContent = '';
      quizResult.classList.add('hidden');
    }
    document.getElementById('world-info-prompt')?.classList.add('hidden');
    document.getElementById('hud')?.classList.add('hidden');
    document.getElementById('world-touch-controls')?.classList.add('hidden');
    document.getElementById('world-zoom-btn')?.classList.add('hidden');
    this.showScreen('edu-popup');
  }

  continueAfterEdu() {
    if (this._worldInfoOpen) {
      this._worldInfoOpen = false;
      this.hideAllScreens();
      this.state = 'WORLD';
      document.getElementById('hud')?.classList.remove('hidden');
      document.getElementById('world-touch-controls')?.classList.remove('hidden');
      document.getElementById('world-zoom-btn')?.classList.remove('hidden');
      document.body.classList.add('world-mode-active');
      this.updateHUD();
      return;
    }

    if (this.currentLevel >= LEVEL_DATA.length) {
      this.onVictory();
    } else {
      Save.unlockLevel(this.currentLevel + 1);
      this.saveData = Save.load();
      this.startLevel(this.currentLevel + 1);
    }
  }

  onVictory() {
    this.state = 'VICTORY';
    const isNew = Save.addScore(this.score, this.currentLevel);
    this.saveData = Save.load();

    document.getElementById('victory-score-display').textContent =
      'FINAL SCORE: ' + this.score.toString().padStart(8, '0');

    const notice = document.getElementById('high-score-notice');
    if (isNew && notice) notice.classList.remove('hidden');
    else if (notice) notice.classList.add('hidden');

    document.getElementById('hud')?.classList.add('hidden');
    document.getElementById('boss-hud')?.classList.add('hidden');
    document.getElementById('touch-controls')?.classList.add('hidden');
    document.getElementById('world-touch-controls')?.classList.add('hidden');
    document.getElementById('world-info-prompt')?.classList.add('hidden');
    document.getElementById('world-zoom-btn')?.classList.add('hidden');
    document.getElementById('world-zoom-btn')?.classList.add('hidden');
    document.body.classList.remove('world-mode-active');

    this.showScreen('victory-screen');
  }

  // ==================
  // PAUSE
  // ==================
  togglePause() {
    if (this.state === 'PLAYING' || this.state === 'BOSS' || this.state === 'WORLD') {
      this.pausedFromState = this.state;
      this.state = 'PAUSED';
      document.getElementById('hud')?.classList.add('hidden');
      document.getElementById('touch-controls')?.classList.add('hidden');
      document.getElementById('world-touch-controls')?.classList.add('hidden');
      document.getElementById('world-info-prompt')?.classList.add('hidden');
      document.getElementById('world-zoom-btn')?.classList.add('hidden');
      document.getElementById('btn-restart').textContent =
        this.pausedFromState === 'WORLD' ? '↺ RESTART WORLD' : '↺ RESTART LEVEL';
      this.showScreen('pause-menu');
    } else if (this.state === 'PAUSED') {
      this.hideAllScreens();
      document.getElementById('hud')?.classList.remove('hidden');
      this.state = this.pausedFromState || (this.bossActive ? 'BOSS' : 'PLAYING');
      if (this.state === 'WORLD' || this.state === 'BOSS') {
        document.getElementById('world-touch-controls')?.classList.remove('hidden');
        if (this.state === 'WORLD') document.getElementById('world-zoom-btn')?.classList.remove('hidden');
      } else {
        document.getElementById('touch-controls')?.classList.remove('hidden');
      }
    }
  }

  // ==================
  // HUD UPDATE
  // ==================
  updateHUD() {
    if (!this.player) return;
    document.getElementById('score-display').textContent =
      this.score.toString().padStart(6, '0');
    document.getElementById('health-bar').style.width =
      Math.max(0, this.player.health) + '%';
    document.getElementById('energy-bar').style.width =
      Math.max(0, this.player.energy) + '%';

    if (this.combo > 1) {
      document.getElementById('combo-display')?.classList.remove('hidden');
      document.getElementById('combo-count').textContent = this.combo;
    } else {
      document.getElementById('combo-display')?.classList.add('hidden');
    }
  }

  updatePowerUpUI() {
    if (!this.player) return;
    const container = document.getElementById('powerup-indicators');
    if (!container) return;
    container.innerHTML = '';
    const powers = this.player.powers;
    const powerInfo = {
      magnet: { label: '🧲 MAGNET', color: '#ff88ff', max: 300 },
      shield: { label: '🛡 SHIELD', color: '#00aaff', max: 240 },
      speed:  { label: '⚡ SPEED',  color: '#ffaa00', max: 300 },
    };
    Object.entries(powers).forEach(([key, timer]) => {
      const info = powerInfo[key];
      if (!info || timer <= 0) return;
      const div = document.createElement('div');
      div.className = 'powerup-indicator';
      div.style.borderColor = info.color;
      div.style.color = info.color;
      const pct = Math.min(100, (timer / info.max) * 100);
      div.innerHTML = `
        <span>${info.label}</span>
        <div class="powerup-timer">
          <div class="powerup-timer-fill" style="width:${pct}%;background:${info.color}"></div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  // ==================
  // DRAW
  // ==================
  draw() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const W = canvas.width;
    const H = canvas.height;
    const gY = this.groundY();

    ctx.clearRect(0, 0, W, H);

    if (this.state === 'MENU' || this.state === 'GAMEOVER' || this.state === 'VICTORY') {
      this.drawMenuBackground(ctx, W, H);
      return;
    }

    if (this.state === 'WORLD') {
      ctx.save();
      const zoom = this.world?.zoom || 1;
      ctx.scale(zoom, zoom);
      this.drawWorldBackground(ctx, W, H);
      this.infoPieces.forEach(i => this.drawWorldInfoPiece(ctx, i));
      this.collectibles.forEach(c => this.drawWorldCollectible(ctx, c));
      this.hazards.forEach(h => this.drawWorldHazard(ctx, h));
      this.powerups.forEach(p => this.drawWorldPowerUp(ctx, p));
      this.enemies.forEach(e => this.drawWorldEnemy(ctx, e));
      this.particles.draw(ctx);
      if (this.player) this.drawWorldPlayer(ctx, this.player);
      this.floatingTexts.forEach(t => t.draw(ctx, this.camera));
      ctx.restore();
      return;
    }

    if (this.state === 'PLAYING' || this.state === 'BOSS' || this.state === 'PAUSED' || this.state === 'TRANSITION') {
      const drawMargin = this.isMobileLayout ? 120 : 260;
      const inDrawView = (obj, margin = drawMargin) => {
        const w = obj.w || 90;
        return obj.x + w > this.scrollX - margin && obj.x < this.scrollX + W + margin;
      };
      // Background
      this.bg?.draw(ctx, canvas, this.scrollX);

      // Collectibles
      this.collectibles.forEach(c => { if (inDrawView(c)) c.draw(ctx, this.camera, this.scrollX); });

      // Hazards
      this.hazards.forEach(h => { if (inDrawView(h)) h.draw(ctx, this.camera, this.scrollX); });

      // Power-ups
      this.powerups.forEach(p => { if (inDrawView(p)) p.draw(ctx, this.camera, this.scrollX); });

      // Enemies
      this.enemies.forEach(e => { if (inDrawView(e, drawMargin + 220)) e.draw(ctx, this.camera, this.scrollX); });

      // Particles
      this.particles.draw(ctx);

      // Player
      if (!this.player?.dead) {
        this.player?.draw(ctx, this.camera);
      }

      // Boss
      this.boss?.draw(ctx, this.camera);

      // Floating texts
      this.floatingTexts.forEach(t => t.draw(ctx, this.camera));

      // EMP cooldown indicator
      if (this.player && this.player.empCooldown > 0) {
        const pct = 1 - this.player.empCooldown / 180;
        ctx.save();
        ctx.strokeStyle = '#00ffff44';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.player.x + this.player.w / 2,
                this.player.y + this.player.h / 2,
                60 * pct, 0, Math.PI * 2 * pct);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  drawWorldBackground(ctx, W, H) {
    if (!this.world) return;
    const zoom = this.world.zoom || 1;
    const viewW = W / zoom;
    const viewH = H / zoom;
    if (this.world.staticCanvas) {
      ctx.drawImage(
        this.world.staticCanvas,
        this.scrollX,
        this.world.cameraY,
        viewW,
        viewH,
        0,
        0,
        viewW,
        viewH
      );
      this.drawWorldDynamicDetails(ctx, viewW, viewH);
      return;
    }
    this.drawWorldBackgroundRaw(ctx, W, H);
  }

  drawWorldBackgroundRaw(ctx, W, H, options = {}) {
    if (!this.world) return;
    W /= this.world.zoom || 1;
    H /= this.world.zoom || 1;
    const colors = [
      ['#8bd7ff', '#4caf50', '#2979ff'],
      ['#ffb4df', '#ff7043', '#ff2d78'],
      ['#bff8d0', '#7b1fa2', '#00c94a'],
      ['#d5caff', '#e65100', '#a020f0'],
    ];
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#7fd778');
    bgGrad.addColorStop(0.45, '#92df86');
    bgGrad.addColorStop(1, '#68c96e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);
    const tile = 64;
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    for (let x = -(this.scrollX % tile); x < W; x += tile) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = -((this.world.cameraY || 0) % tile); y < H; y += tile) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.restore();

    this.drawWorldBiomeBlends(ctx, W, H, colors);

    this.world.dirtPaths.forEach((path, index) => {
      const points = path.points || path;
      const baseWidth = path.width || 70;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#6f8f34';
      ctx.lineWidth = baseWidth + 28;
      ctx.globalAlpha = 0.58;
      ctx.beginPath();
      points.forEach((p, i) => {
        const sx = p.x - this.scrollX;
        const sy = p.y - this.world.cameraY;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();
      ctx.strokeStyle = index % 2 === 0 ? '#9b6b38' : '#b58546';
      ctx.lineWidth = baseWidth;
      ctx.globalAlpha = 0.82;
      ctx.stroke();
      ctx.strokeStyle = '#d6a864';
      ctx.lineWidth = baseWidth * 0.48;
      ctx.globalAlpha = 0.46;
      ctx.stroke();
      ctx.strokeStyle = '#f0d090';
      ctx.lineWidth = 5;
      ctx.globalAlpha = 0.32;
      points.forEach((p, i) => {
        if (i % 3) return;
        const sx = p.x - this.scrollX + Math.sin(i + path.seed) * 12;
        const sy = p.y - this.world.cameraY + Math.cos(i + path.seed) * 9;
        ctx.beginPath();
        ctx.moveTo(sx - 18, sy);
        ctx.lineTo(sx + 18, sy + Math.sin(i) * 8);
        ctx.stroke();
      });
      ctx.restore();
    });

    this.world.roads.forEach((road, i) => {
      const sx = road.x - this.scrollX;
      const sy = road.y - this.world.cameraY;
      if (sx > W || sy > H || sx + road.w < 0 || sy + road.h < 0) return;
      ctx.save();
      ctx.fillStyle = '#d7d0b2';
      ctx.fillRect(sx - 12, sy - 12, road.w + 24, road.h + 24);
      ctx.fillStyle = i < 2 ? '#5d6268' : '#6f777d';
      ctx.fillRect(sx, sy, road.w, road.h);
      ctx.fillStyle = '#ffe60088';
      if (road.w > road.h) {
        for (let x = sx + 24; x < sx + road.w; x += 86) ctx.fillRect(x, sy + road.h / 2 - 3, 42, 6);
      } else {
        for (let y = sy + 24; y < sy + road.h; y += 86) ctx.fillRect(sx + road.w / 2 - 3, y, 6, 42);
      }
      ctx.restore();
    });

    if (!options.staticPass) this.drawWorldDynamicDetails(ctx, W, H);

    const cityW = this.world.width / 2;
    const cityH = this.world.height / 2;
    for (let city = 0; city < 4; city++) {
      const col = city % 2;
      const row = Math.floor(city / 2);
      const wx = col * cityW;
      const wy = row * cityH;
      const sx = wx - this.scrollX;
      const sy = wy - this.world.cameraY;
      if (sx > W || sy > H || sx + cityW < 0 || sy + cityH < 0) continue;
      const c = colors[city];
      ctx.save();
      ctx.globalAlpha = 0.36;
      ctx.fillStyle = c[0];
      this.drawIrregularPatch(ctx, sx + 80, sy + 80, cityW - 160, cityH - 160, city * 19);
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = c[1];
      ctx.beginPath();
      ctx.moveTo(sx + 80, sy + cityH - 120);
      for (let x = 80; x <= cityW - 80; x += 150) {
        ctx.lineTo(sx + x, sy + cityH - 150 - Math.sin((x + city * 90) * 0.03) * 35);
      }
      ctx.lineTo(sx + cityW - 80, sy + cityH - 80);
      ctx.lineTo(sx + 80, sy + cityH - 80);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    this.world.blockers.forEach(b => this.drawWorldBuilding(ctx, b, colors[b.city]));
    this.world.decorations?.forEach(d => this.drawWorldDecoration(ctx, d));

    ctx.save();
    ctx.fillStyle = '#1a0a3a';
    ctx.globalAlpha = 0.8;
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    const names = ['TOXIC ALLEY', 'BATTERY GRAVEYARD', 'REPAIR DISTRICT', 'MEGADUMP CITY'];
    names.forEach((name, city) => {
      const col = city % 2;
      const row = Math.floor(city / 2);
      const markerX = col * cityW + cityW * 0.5 - this.scrollX;
      const markerY = row * cityH + 120 - this.world.cameraY;
      if (markerX > -360 && markerX < W + 360 && markerY > -70 && markerY < H + 70) {
        const context = WORLD_CITY_CONTEXT[city];
        ctx.fillStyle = '#fff9e6dd';
        ctx.fillRect(markerX - 210, markerY - 28, 420, 56);
        ctx.strokeStyle = '#1a0a3a';
        ctx.lineWidth = 2;
        ctx.strokeRect(markerX - 210, markerY - 28, 420, 56);
        ctx.fillStyle = '#1a0a3a';
        ctx.fillText(context.name, markerX, markerY - 6);
        ctx.font = '6px "Press Start 2P", monospace';
        ctx.fillText(context.caption, markerX, markerY + 16);
        ctx.font = '9px "Press Start 2P", monospace';
      }
    });
    ctx.restore();
  }

  drawWorldBiomeBlends(ctx, W, H, colors) {
    const cityW = this.world.width / 2;
    const cityH = this.world.height / 2;
    for (let city = 0; city < 4; city++) {
      const cx = (city % 2) * cityW + cityW * (0.42 + Math.sin(city * 3) * 0.08);
      const cy = Math.floor(city / 2) * cityH + cityH * (0.47 + Math.cos(city * 2.2) * 0.08);
      for (let i = 0; i < 18; i++) {
        const wx = cx + Math.sin(i * 1.9 + city * 4) * (360 + (i % 4) * 115);
        const wy = cy + Math.cos(i * 1.4 + city * 3) * (300 + (i % 5) * 90);
        const sx = wx - this.scrollX;
        const sy = wy - this.world.cameraY;
        if (sx < -500 || sy < -500 || sx > W + 500 || sy > H + 500) continue;
        const r = 240 + (i % 5) * 70;
        const g = ctx.createRadialGradient(sx, sy, 10, sx, sy, r);
        g.addColorStop(0, colors[city][0] + '70');
        g.addColorStop(0.62, colors[city][0] + '35');
        g.addColorStop(1, colors[city][0] + '00');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(sx, sy, r * (1.15 + Math.sin(i) * 0.18), r * (0.75 + Math.cos(i) * 0.14), Math.sin(city + i), 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  drawWorldDynamicDetails(ctx, W, H) {
    const t = performance.now() * 0.001;
    const trafficCount = Math.max(4, Math.floor(10 * (this.world.perfScale || 1)));
    this.world.roads.slice(0, trafficCount).forEach((road, i) => {
      const horizontal = road.w > road.h;
      const travel = ((t * (36 + i * 5) + i * 97) % (horizontal ? road.w : road.h));
      const sx = road.x - this.scrollX + (horizontal ? travel : road.w * 0.5);
      const sy = road.y - this.world.cameraY + (horizontal ? road.h * 0.5 : travel);
      if (sx < -30 || sy < -30 || sx > W + 30 || sy > H + 30) return;
      ctx.save();
      ctx.fillStyle = i % 2 ? '#00d4b8' : '#ff7c00';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 6;
      ctx.fillRect(sx - 8, sy - 5, horizontal ? 18 : 10, horizontal ? 10 : 18);
      ctx.restore();
    });

    this.world.blockers.forEach((b, i) => {
      if (b.colorIndex % 4 !== 0) return;
      if ((this.world.perfScale || 1) < 1 && i % 2 !== 0) return;
      const sx = b.x - this.scrollX;
      const sy = b.y - this.world.cameraY;
      if (sx > W || sy > H || sx + b.w < 0 || sy + b.h < -90) return;
      ctx.save();
      ctx.fillStyle = '#ffffff99';
      for (let p = 0; p < 3; p++) {
        const puff = (t * 18 + p * 22 + i * 7) % 72;
        ctx.globalAlpha = Math.max(0, 0.28 - puff / 260);
        ctx.beginPath();
        ctx.arc(sx + b.w * 0.72 + Math.sin(t + p) * 8, sy - puff, 10 + p * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  drawIrregularPatch(ctx, x, y, w, h, seed) {
    ctx.beginPath();
    ctx.moveTo(x + 30, y + Math.sin(seed) * 28);
    for (let i = 0; i <= 8; i++) ctx.lineTo(x + (w * i / 8), y + Math.sin(seed + i * 1.7) * 42);
    for (let i = 0; i <= 5; i++) ctx.lineTo(x + w + Math.sin(seed + i) * 38, y + (h * i / 5));
    for (let i = 8; i >= 0; i--) ctx.lineTo(x + (w * i / 8), y + h + Math.cos(seed + i * 1.3) * 42);
    for (let i = 5; i >= 0; i--) ctx.lineTo(x + Math.cos(seed + i) * 38, y + (h * i / 5));
    ctx.closePath();
    ctx.fill();
  }

  drawWorldDecoration(ctx, d) {
    const sx = d.x - this.scrollX;
    const sy = d.y - this.world.cameraY;
    const W = ctx.canvas.width / (this.world.zoom || 1);
    const H = ctx.canvas.height / (this.world.zoom || 1);
    if (sx < -80 || sy < -80 || sx > W + 80 || sy > H + 80) return;

    const scale = d.size || 1;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.scale(scale, scale);

    if (d.type === 'hedge') {
      ctx.fillStyle = '#1b7f36';
      ctx.fillRect(-18, -8, 36, 16);
      ctx.fillStyle = '#35b84f';
      ctx.fillRect(-14, -13, 12, 10);
      ctx.fillRect(0, -15, 14, 12);
      ctx.fillRect(10, -9, 12, 8);
    } else if (d.type === 'flower') {
      const colors = ['#ff2d78', '#ffe600', '#00d4b8', '#ff7c00'];
      ctx.fillStyle = '#217b34';
      ctx.fillRect(-2, -4, 4, 14);
      ctx.fillStyle = colors[Math.abs(Math.floor(d.seed)) % colors.length];
      ctx.fillRect(-9, -12, 7, 7);
      ctx.fillRect(2, -12, 7, 7);
      ctx.fillRect(-4, -18, 8, 8);
      ctx.fillStyle = '#fff9e6';
      ctx.fillRect(-2, -11, 4, 4);
    } else if (d.type === 'tree') {
      ctx.fillStyle = '#7a4a22';
      ctx.fillRect(-5, -2, 10, 24);
      ctx.fillStyle = '#1f8f45';
      ctx.fillRect(-22, -28, 44, 22);
      ctx.fillStyle = '#42c85f';
      ctx.fillRect(-15, -38, 30, 18);
    } else if (d.type === 'small-building') {
      ctx.fillStyle = '#1a0a3a33';
      ctx.fillRect(-20, -24, 46, 42);
      ctx.fillStyle = '#00d4b8';
      ctx.fillRect(-24, -30, 44, 44);
      ctx.fillStyle = '#ffe600aa';
      for (let y = -20; y < 6; y += 12) {
        ctx.fillRect(-14, y, 7, 6);
        ctx.fillRect(3, y, 7, 6);
      }
    } else {
      ctx.fillStyle = '#1a0a3a';
      ctx.fillRect(-12, -22, 24, 18);
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(-8, -18, 16, 4);
      ctx.fillStyle = '#7a4a22';
      ctx.fillRect(-2, -4, 4, 18);
    }

    ctx.restore();
  }

  drawWorldBuilding(ctx, b, palette) {
    const sx = b.x - this.scrollX;
    const sy = b.y - this.world.cameraY;
    const W = ctx.canvas.width / (this.world.zoom || 1);
    const H = ctx.canvas.height / (this.world.zoom || 1);
    if (sx > W || sy > H || sx + b.w < 0 || sy + b.h < 0) return;
    ctx.save();
    ctx.shadowColor = 'rgba(26, 10, 58, 0.35)';
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#1a0a3a33';
    ctx.fillRect(sx + 8, sy + 10, b.w, b.h);
    ctx.fillStyle = palette[2];
    ctx.fillRect(sx, sy, b.w, b.h);
    ctx.fillStyle = '#ffffff33';
    ctx.fillRect(sx + 8, sy + 8, b.w - 16, 12);
    ctx.fillStyle = '#ffe600aa';
    for (let wx = sx + 12; wx < sx + b.w - 10; wx += 24) {
      for (let wy = sy + 28; wy < sy + b.h - 12; wy += 22) {
        if (Math.sin(wx * 0.2 + wy * 0.1 + b.colorIndex) > -0.1) ctx.fillRect(wx, wy, 8, 8);
      }
    }
    if (b.colorIndex % 4 === 0) {
      const t = Date.now() * 0.001;
      ctx.fillStyle = '#ffffff99';
      for (let i = 0; i < 4; i++) {
        const puff = (t * 18 + i * 18 + b.colorIndex * 7) % 72;
        ctx.globalAlpha = Math.max(0, 0.35 - puff / 220);
        ctx.beginPath();
        ctx.arc(sx + b.w * 0.72 + Math.sin(t + i) * 8, sy - puff, 10 + i * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  worldToScreen(x, y) {
    return {
      x: Math.round(x - this.scrollX + this.camera.shakeX),
      y: Math.round(y - (this.world?.cameraY || 0) + this.camera.shakeY),
    };
  }

  isWorldVisible(x, y, margin = 80) {
    const zoom = this.world?.zoom || 1;
    const viewW = this.canvas.width / zoom;
    const viewH = this.canvas.height / zoom;
    return x >= this.scrollX - margin &&
           y >= this.world.cameraY - margin &&
           x <= this.scrollX + viewW + margin &&
           y <= this.world.cameraY + viewH + margin;
  }

  drawWorldCollectible(ctx, c) {
    if (c.collected) return;
    if (!this.isWorldVisible(c.x, c.y)) return;
    const p = this.worldToScreen(c.x, c.y);
    ctx.save();
    ctx.shadowColor = c.color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = c.color;
    ctx.fillRect(p.x - 10, p.y - 8, 20, 16);
    ctx.fillStyle = '#1a0a3a';
    ctx.fillRect(p.x - 6, p.y - 4, 12, 8);
    ctx.restore();
  }

  drawWorldInfoPiece(ctx, piece) {
    if (piece.opened) return;
    if (!this.isWorldVisible(piece.x, piece.y)) return;
    const p = this.worldToScreen(piece.x, piece.y + Math.sin(piece.bobTimer) * 3);
    ctx.save();
    ctx.shadowColor = '#ffe600';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#ffe600';
    ctx.fillRect(p.x - 12, p.y - 14, 24, 28);
    ctx.fillStyle = '#1a0a3a';
    ctx.fillRect(p.x - 7, p.y - 8, 14, 3);
    ctx.fillRect(p.x - 7, p.y - 2, 14, 2);
    ctx.fillRect(p.x - 7, p.y + 4, 10, 2);
    ctx.restore();
  }

  drawWorldHazard(ctx, h) {
    if (!this.isWorldVisible(h.x, h.y, 110)) return;
    const p = this.worldToScreen(h.x, h.y);
    ctx.save();
    ctx.shadowColor = h.color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = h.type === 'sludge' ? '#558b2f' : h.color;
    if (h.type === 'toxic_cloud') {
      ctx.globalAlpha = 0.72;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 22, 0, Math.PI * 2);
      ctx.arc(p.x - 18, p.y + 8, 14, 0, Math.PI * 2);
      ctx.arc(p.x + 18, p.y + 8, 14, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(p.x - 18, p.y - 14, 36, 28);
    }
    ctx.restore();
  }

  drawWorldPowerUp(ctx, pwr) {
    if (pwr.collected) return;
    if (!this.isWorldVisible(pwr.x, pwr.y)) return;
    const p = this.worldToScreen(pwr.x, pwr.y + Math.sin(pwr.bobTimer) * 3);
    ctx.save();
    ctx.shadowColor = pwr.color;
    ctx.shadowBlur = 16;
    ctx.fillStyle = pwr.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1a0a3a';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const icons = { magnet:'M', shield:'S', speed:'Z', repair:'R', emp:'E' };
    ctx.fillText(icons[pwr.type] || '?', p.x, p.y + 1);
    ctx.restore();
  }

  drawWorldEnemy(ctx, e) {
    if (!e.alive) return;
    if (!this.isWorldVisible(e.x, e.y, 120)) return;
    const p = this.worldToScreen(e.x, e.y);
    ctx.save();
    ctx.shadowColor = e.color;
    ctx.shadowBlur = e.stunned > 0 ? 18 : 8;
    ctx.fillStyle = e.color;
    ctx.fillRect(p.x - e.w / 2, p.y - e.h / 2, e.w, e.h);
    ctx.fillStyle = '#1a0a3a';
    ctx.fillRect(p.x - 6, p.y - 5, 4, 4);
    ctx.fillRect(p.x + 3, p.y - 5, 4, 4);
    ctx.restore();
  }

  drawWorldPlayer(ctx, player) {
    const p = this.worldToScreen(player.worldX, player.worldY);
    player.trail.forEach(t => {
      const tp = this.worldToScreen(t.x, t.y);
      ctx.save();
      ctx.globalAlpha = t.life * 0.35;
      ctx.fillStyle = t.speedTrail ? '#ffb000' : '#2979ff';
      ctx.fillRect(tp.x - 14, tp.y - 14, 28, 28);
      ctx.restore();
    });
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.scale(1, 0.78);
    ctx.shadowColor = '#ff2d78';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#0097a7';
    ctx.fillRect(-12, -10, 24, 24);
    ctx.fillStyle = '#ff7c00';
    ctx.fillRect(-10, -24, 20, 14);
    ctx.fillStyle = '#2979ff';
    ctx.fillRect(-7, -20, 14, 6);
    ctx.fillStyle = '#ffe600';
    ctx.fillRect(-12, 12, 9, 7);
    ctx.fillRect(3, 12, 9, 7);
    ctx.restore();
  }

  drawMenuBackground(ctx, W, H) {
    // Sparse animated e-waste background for menus.
    const t = Date.now() * 0.001;

    ctx.fillStyle = '#5eceff';
    ctx.fillRect(0, 0, W, H);

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#5eceff');
    grad.addColorStop(0.58, '#a8e6ff');
    grad.addColorStop(1, '#fff9e6');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    this.ensureMenuComponents(W, H);
    this.menuComponents.forEach(item => {
      item.x += item.vx;
      item.y += item.vy;
      item.rot += item.vr;
      const margin = 60;
      if (item.x < -margin) item.x = W + margin;
      if (item.x > W + margin) item.x = -margin;
      if (item.y < -margin) item.y = H + margin;
      if (item.y > H + margin) item.y = -margin;
      this.drawMenuComponent(ctx, item, t);
    });

    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W + 80; x += 80) {
      ctx.lineTo(x, H - 52 - Math.sin(x * 0.015) * 14);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  ensureMenuComponents(W, H) {
    const targetCount = Math.max(12, Math.min(20, Math.floor((W * H) / 70000)));
    if (this.menuComponents.length === targetCount &&
        this.menuComponentBounds.w === W &&
        this.menuComponentBounds.h === H) return;

    const types = ['phone', 'battery', 'circuit', 'laptop', 'charger'];
    const colors = ['#ff2d78', '#ff7c00', '#ffe600', '#00c94a', '#2979ff', '#a020f0'];
    this.menuComponents = Array.from({ length: targetCount }, (_, i) => ({
      type: types[i % types.length],
      color: colors[i % colors.length],
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.45,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.012,
      size: 1 + Math.random() * 0.9,
      alpha: 0.5 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
    }));
    this.menuComponentBounds = { w: W, h: H };
  }

  drawMenuComponent(ctx, item, t) {
    const s = 24 * item.size;
    ctx.save();
    ctx.translate(item.x, item.y + Math.sin(t + item.phase) * 4);
    ctx.rotate(item.rot);
    ctx.globalAlpha = item.alpha;
    ctx.shadowColor = item.color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = item.color;

    if (item.type === 'phone') {
      ctx.fillRect(-s * 0.28, -s * 0.45, s * 0.56, s * 0.9);
      ctx.fillStyle = '#1a0a3a';
      ctx.fillRect(-s * 0.2, -s * 0.32, s * 0.4, s * 0.58);
    } else if (item.type === 'battery') {
      ctx.fillRect(-s * 0.28, -s * 0.42, s * 0.56, s * 0.84);
      ctx.fillRect(-s * 0.12, -s * 0.55, s * 0.24, s * 0.12);
      ctx.fillStyle = '#1a0a3a';
      ctx.fillRect(-s * 0.18, -s * 0.22, s * 0.36, s * 0.44);
    } else if (item.type === 'circuit') {
      ctx.fillRect(-s * 0.38, -s * 0.38, s * 0.76, s * 0.76);
      ctx.fillStyle = '#1a0a3a';
      ctx.fillRect(-s * 0.18, -s * 0.18, s * 0.36, s * 0.36);
      ctx.fillStyle = item.color;
      ctx.fillRect(-s * 0.55, -s * 0.04, s * 0.18, s * 0.08);
      ctx.fillRect(s * 0.37, -s * 0.04, s * 0.18, s * 0.08);
    } else if (item.type === 'laptop') {
      ctx.fillRect(-s * 0.44, -s * 0.28, s * 0.88, s * 0.5);
      ctx.fillStyle = '#1a0a3a';
      ctx.fillRect(-s * 0.34, -s * 0.18, s * 0.68, s * 0.3);
      ctx.fillStyle = item.color;
      ctx.fillRect(-s * 0.54, s * 0.22, s * 1.08, s * 0.16);
    } else {
      ctx.fillRect(-s * 0.42, -s * 0.12, s * 0.62, s * 0.24);
      ctx.fillRect(s * 0.18, -s * 0.04, s * 0.3, s * 0.08);
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(s * 0.58, 0, s * 0.12, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

// ============================================
// HELPER: camera x offset helper
// ============================================
function cam_x(game) {
  return game.camera.x + game.camera.shakeX;
}

// ============================================
// BOOT
// ============================================
let gameInstance;
window.addEventListener('DOMContentLoaded', () => {
  Audio.loadPreference();
  Audio.init();
  gameInstance = new Game();
});

// Prevent page drag during play, but allow scrollable menu/popup panels.
document.addEventListener('touchmove', e => {
  if (e.target.closest('.screen-content, .popup-box')) return;
  e.preventDefault();
}, { passive: false });
document.addEventListener('contextmenu', e => e.preventDefault());
