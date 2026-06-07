/* ===============================================
   MAIN JAVASCRIPT — v3 (Supabase-powered, async)
   Web Profile Profesional — Guru Informatika
   =============================================== */

'use strict';

/* ------------------------------------------------
   CONFIG
   ------------------------------------------------ */
const CONFIG = {
  typingStrings: [
    'Informatika Teacher & Educator 👨‍🏫',
    'Web Developer & Tech Enthusiast 💻',
    'S1 Teknik Informatika Graduate 🎓',
    'Mentor & Content Creator 🎬',
    'Code. Teach. Inspire. ✨'
  ],
  typingSpeed: 80, eraseSpeed: 40, pauseBetween: 2000,
};

/* ------------------------------------------------
   LANGUAGE (Bilingual)
   ------------------------------------------------ */
const LANG = {
  id: {
    nav: { home:'Beranda', about:'Tentang', projects:'Portofolio', materials:'Materi Ajar', contact:'Kontak' },
    hero: {
      badge:'Tersedia untuk Kolaborasi', desc:'Bersemangat dalam mendidik generasi digital masa depan.',
      cta1:'Lihat Portofolio', cta2:'Hubungi Saya',
    },
    projects: { filterAll:'Semua', filterMine:'Proyek Saya', filterStudent:'Karya Siswa' },
    materials: { filterAll:'Semua', filterPdf:'PDF', filterSlide:'Slide', filterVideo:'Video' },
  },
  en: {
    nav: { home:'Home', about:'About', projects:'Portfolio', materials:'Materials', contact:'Contact' },
    hero: {
      badge:'Available for Collaboration', desc:'Passionate about educating the next generation of digital innovators.',
      cta1:'View Portfolio', cta2:'Contact Me',
    },
    projects: { filterAll:'All', filterMine:'My Projects', filterStudent:'Student Works' },
    materials: { filterAll:'All', filterPdf:'PDF', filterSlide:'Slide', filterVideo:'Video' },
  }
};

/* ------------------------------------------------
   STATE
   ------------------------------------------------ */
let currentLang          = 'id';
let currentProjectFilter = 'all';
let currentMaterialFilter= 'all';
let isMenuOpen           = false;
let _cachedProjects      = [];
let _cachedMaterials     = [];

/* ------------------------------------------------
   HELPERS
   ------------------------------------------------ */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
function t(key) {
  const keys = key.split('.');
  let v = LANG[currentLang];
  for (const k of keys) { v = v?.[k]; }
  return v || key;
}

/* ------------------------------------------------
   PAGE LOADER
   ------------------------------------------------ */
function showLoader() {
  const loader = $('#page-loader');
  if (loader) loader.style.display = 'flex';
}
function hideLoader() {
  const loader = $('#page-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 400);
  }
}

/* ------------------------------------------------
   APPLY PROFILE DATA → DOM
   ------------------------------------------------ */
async function applyProfileToPage() {
  const p = await DB.getProfile();
  if (!p) return;

  $$('.profile-name').forEach(el => el.textContent = p.name || '');
  $$('.profile-tagline').forEach(el => el.textContent = p.tagline || '');

  // Stats
  const sv = $$('.hero-stat-value');
  if (sv[0]) { sv[0].dataset.target = p.stat_years;    sv[0].textContent = (p.stat_years   || 0) + '+'; }
  if (sv[1]) { sv[1].dataset.target = p.stat_students; sv[1].textContent = (p.stat_students|| 0) + '+'; }
  if (sv[2]) { sv[2].dataset.target = p.stat_projects; sv[2].textContent = (p.stat_projects|| 0) + '+'; }

  // Bio
  const bio1 = $('#bio-text-1');
  const bio2 = $('#bio-text-2');
  if (bio1) bio1.innerHTML = (currentLang === 'id' ? p.bio_id  : p.bio_en)  || '';
  if (bio2) bio2.innerHTML = (currentLang === 'id' ? p.bio2_id : p.bio2_en) || '';

  // Avatar
  const avatar = $('#profile-img');
  if (avatar && p.avatar) { avatar.src = p.avatar; avatar.style.display = 'block'; }

  // Badge
  const badge = $('#hero-badge-text');
  if (badge) badge.textContent = (currentLang === 'id' ? p.badge_id : p.badge_en) || '';

  // Contact
  const emailEl = $('#contact-email');
  if (emailEl && p.email) {
    emailEl.href = 'mailto:' + p.email;
    const v = emailEl.querySelector('.contact-item-value');
    if (v) v.textContent = p.email;
  }
  const waEl = $('#contact-wa');
  if (waEl && p.whatsapp) {
    waEl.href = 'https://wa.me/' + p.whatsapp;
    const v = waEl.querySelector('.contact-item-value');
    if (v) v.textContent = '+' + p.whatsapp;
  }
  const locEl = $('#contact-location');
  if (locEl && p.location) {
    const v = locEl.querySelector('.contact-item-value');
    if (v) v.textContent = p.location;
  }

  // Social
  if (p.social_github)    { const el = $('#social-github');    if(el) el.href = p.social_github; }
  if (p.social_linkedin)  { const el = $('#social-linkedin');  if(el) el.href = p.social_linkedin; }
  if (p.social_youtube)   { const el = $('#social-youtube');   if(el) el.href = p.social_youtube; }
  if (p.social_instagram) { const el = $('#social-instagram'); if(el) el.href = p.social_instagram; }

  // Footer name
  const fn = $('#footer-name');
  if (fn) fn.textContent = p.name || '';

  // Skills
  const skills = typeof p.skills === 'string' ? JSON.parse(p.skills) : (p.skills || []);
  renderSkills(skills);
}

function renderSkills(skills) {
  const grid = $('#skills-grid');
  if (!grid || !Array.isArray(skills)) return;
  grid.innerHTML = skills.map(s => `
    <div class="skill-chip">
      <span class="skill-icon">${s.icon || '⚡'}</span>
      <span class="skill-name">${s.name || ''}</span>
    </div>`).join('');
}

/* ------------------------------------------------
   SCHOOLS & EXPERIENCES
   ------------------------------------------------ */
async function renderSchools() {
  const container = $('#schools-container');
  if (!container) return;
  const schools = await DB.getSchools();
  container.innerHTML = schools.length ? schools.map(s => `
    <article class="school-card">
      <div class="school-icon">${s.icon || '🏫'}</div>
      <div class="school-info">
        <div class="school-name">${s.name}</div>
        <div class="school-detail">${s.detail || ''}</div>
      </div>
      <span class="school-badge">${s.status || 'Aktif'}</span>
    </article>`).join('') : '<p style="color:var(--color-text-muted);padding:1rem;">Belum ada data sekolah.</p>';
}

async function renderExperiences() {
  const container = $('#experiences-container');
  if (!container) return;
  const exps = await DB.getExperiences();
  container.innerHTML = exps.map(e => `
    <div class="timeline-item">
      <div class="timeline-dot">${e.icon || '📅'}</div>
      <div class="timeline-content">
        <div class="timeline-period">${e.period || ''}</div>
        <div class="timeline-title">${e.title}</div>
        <div class="timeline-place">${e.place || ''}</div>
      </div>
    </div>`).join('');
}

/* ------------------------------------------------
   PARTICLE CANVAS (HERO)
   ------------------------------------------------ */
function initParticles() {
  const canvas = $('#hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [], animId;
  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4; this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? `rgba(108,99,255,${this.opacity})` : `rgba(0,212,255,${this.opacity * 0.7})`;
    }
    update() {
      this.x += this.speedX; this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); }
  }
  function initList() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 120);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath(); ctx.strokeStyle = `rgba(108,99,255,${0.08*(1-d/100)})`;
          ctx.lineWidth = 0.5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
        }
      }
    }
  }
  function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); drawLines(); animId = requestAnimationFrame(animate); }
  resize(); initList(); animate();
  window.addEventListener('resize', () => { cancelAnimationFrame(animId); resize(); initList(); animate(); });
}

/* ------------------------------------------------
   TYPING ANIMATION
   ------------------------------------------------ */
function initTyping() {
  const el = $('#typing-text');
  if (!el) return;
  let si = 0, ci = 0, del = false;
  function type() {
    const cur = CONFIG.typingStrings[si];
    el.textContent = del ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
    del ? ci-- : ci++;
    let sp = del ? CONFIG.eraseSpeed : CONFIG.typingSpeed;
    if (!del && ci === cur.length) { sp = CONFIG.pauseBetween; del = true; }
    else if (del && ci === 0) { del = false; si = (si + 1) % CONFIG.typingStrings.length; }
    setTimeout(type, sp);
  }
  setTimeout(type, 800);
}

/* ------------------------------------------------
   COUNTER ANIMATION
   ------------------------------------------------ */
function animateCounter(el, target, suffix = '') {
  const dur = 1500, t0 = performance.now();
  function up(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(up);
  }
  requestAnimationFrame(up);
}

/* ------------------------------------------------
   SCROLL REVEAL
   ------------------------------------------------ */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.hero-stat-value[data-target]').forEach(counter => {
          animateCounter(counter, parseInt(counter.dataset.target), counter.dataset.suffix || '');
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  $$('.reveal').forEach(el => obs.observe(el));
}

/* ------------------------------------------------
   NAVBAR
   ------------------------------------------------ */
function initNavbar() {
  const navbar = $('#navbar'), ham = $('#nav-hamburger'), mob = $('#nav-mobile');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink(); updateScrollTopBtn();
  });
  ham?.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen; mob.classList.toggle('open', isMenuOpen);
    const spans = ham.querySelectorAll('span');
    if (isMenuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
  $$('.nav-link').forEach(link => link.addEventListener('click', () => {
    if (!isMenuOpen) return;
    isMenuOpen = false; mob.classList.remove('open');
    ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

function updateActiveLink() {
  const pos = window.scrollY + 100;
  $$('section[id]').forEach(section => {
    const link = $(`.nav-link[href="#${section.id}"]`);
    if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
      $$('.nav-link').forEach(l => l.classList.remove('active'));
      link?.classList.add('active');
    }
  });
}

/* ------------------------------------------------
   LANGUAGE TOGGLE
   ------------------------------------------------ */
function initLangToggle() {
  $$('.lang-btn').forEach(btn => btn.addEventListener('click', async () => {
    if (btn.dataset.lang === currentLang) return;
    currentLang = btn.dataset.lang;
    $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
    await applyProfileToPage();
    await renderProjects();
    await renderMaterials();
  }));
}

/* ------------------------------------------------
   PROJECTS (async, Supabase)
   ------------------------------------------------ */
async function renderProjects() {
  const grid = $('#projects-grid');
  if (!grid) return;
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--color-text-muted);">⏳ Memuat proyek...</div>';

  _cachedProjects = await DB.getProjects();
  grid.innerHTML = '';

  if (!_cachedProjects.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--color-text-muted);">Belum ada proyek.</div>';
    return;
  }

  _cachedProjects.forEach((proj, i) => {
    const isHidden = currentProjectFilter !== 'all' && proj.type !== currentProjectFilter;
    const card = document.createElement('div');
    card.className = `project-card reveal reveal-delay-${(i % 3) + 1}${isHidden ? ' hidden' : ''}`;
    card.dataset.type = proj.type; card.dataset.id = proj.id;

    const badgeClass = proj.type === 'mine' ? 'badge-mine' : 'badge-student';
    const badgeText  = proj.type === 'mine'
      ? (currentLang === 'id' ? 'Proyek Saya' : 'My Project')
      : (currentLang === 'id' ? 'Karya Siswa' : 'Student Work');

    const tagsArr = (proj.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    const isStudent = proj.type === 'student';
    const tags = tagsArr.map(tag => `<span class="tag ${isStudent ? 'tag-cyan' : ''}">${tag}</span>`).join('');

    const title = currentLang === 'id' ? proj.title_id : (proj.title_en || proj.title_id);
    const desc  = currentLang === 'id' ? proj.desc_id  : (proj.desc_en  || proj.desc_id);
    const cat   = currentLang === 'id' ? proj.category_id : (proj.category_en || proj.category_id);

    card.innerHTML = `
      <div class="project-thumbnail">
        <img src="${proj.image || 'assets/img/proj-1.png'}" alt="${title}" loading="lazy" onerror="this.src='assets/img/proj-1.png'">
        <span class="project-type-badge ${badgeClass}">${badgeText}</span>
        <div class="project-overlay">
          <button class="overlay-btn">👁️ ${currentLang === 'id' ? 'Detail' : 'View Detail'}</button>
        </div>
      </div>
      <div class="project-info">
        <div class="project-category">${cat || ''}</div>
        <h3 class="project-title">${title || ''}</h3>
        <p class="project-desc">${desc || ''}</p>
        <div class="project-tags">${tags}</div>
      </div>`;

    card.addEventListener('click', () => openProjectModal(proj));
    grid.appendChild(card);
  });

  $$('#projects-grid .reveal').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    obs.observe(el);
  });
}

function initProjectFilters() {
  $$('.project-filter-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.project-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentProjectFilter = btn.dataset.filter;
    $$('.project-card').forEach(card => {
      const show = currentProjectFilter === 'all' || card.dataset.type === currentProjectFilter;
      card.classList.toggle('hidden', !show);
      if (show) requestAnimationFrame(() => card.classList.add('visible'));
    });
  }));
}

/* ------------------------------------------------
   MATERIALS (async, Supabase)
   ------------------------------------------------ */
async function renderMaterials() {
  const grid = $('#materials-grid');
  if (!grid) return;
  grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--color-text-muted);">⏳ Memuat materi...</div>';

  _cachedMaterials = await DB.getMaterials();
  grid.innerHTML = '';

  if (!_cachedMaterials.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--color-text-muted);">Belum ada materi.</div>';
    return;
  }

  const iconMap = { pdf:'📄', slide:'🖥️', video:'🎬' };
  const typeColorMap = { pdf:'type-pdf', slide:'type-slide', video:'type-video' };
  const iconBgMap   = { pdf:'icon-pdf', slide:'icon-slide', video:'icon-video' };
  const typeLabel   = { pdf:'PDF', slide: currentLang === 'id' ? 'Presentasi' : 'Slide', video:'Video' };

  _cachedMaterials.forEach((mat, i) => {
    const isHidden = currentMaterialFilter !== 'all' && mat.type !== currentMaterialFilter;
    const card = document.createElement('div');
    card.className = `material-card reveal reveal-delay-${(i % 3) + 1}${isHidden ? ' hidden' : ''}`;
    card.dataset.type = mat.type; card.dataset.id = mat.id;

    const title   = currentLang === 'id' ? mat.title_id   : (mat.title_en   || mat.title_id);
    const desc    = currentLang === 'id' ? mat.desc_id    : (mat.desc_en    || mat.desc_id);
    const subject = currentLang === 'id' ? mat.subject_id : (mat.subject_en || mat.subject_id);
    const previewBtn = `<button class="btn btn-ghost btn-sm mat-preview-btn" data-id="${mat.id}">
      ${mat.type === 'video' ? '▶' : '👁️'} ${mat.type === 'video' ? (currentLang === 'id' ? 'Putar' : 'Play') : 'Preview'}
    </button>`;

    card.innerHTML = `
      <div class="material-header">
        <div class="material-icon-wrap ${iconBgMap[mat.type]}">${iconMap[mat.type]}</div>
        <div class="material-meta">
          <div class="material-type ${typeColorMap[mat.type]}">${typeLabel[mat.type]}</div>
          <div class="material-subject">${subject || ''}</div>
        </div>
      </div>
      <div class="material-body">
        <h3 class="material-title">${title || ''}</h3>
        <p class="material-desc">${desc || ''}</p>
        <div class="material-info">
          <span>🏫 ${mat.level || ''}</span>
          <span>📦 ${mat.size || ''}</span>
          <span>📅 ${mat.updated || ''}</span>
        </div>
        <div class="material-actions">
          ${previewBtn}
          <a href="${mat.url || '#'}" class="btn btn-primary btn-sm" target="_blank">
            ${mat.type === 'video' ? (currentLang === 'id' ? '🔗 Buka' : '🔗 Open') : (currentLang === 'id' ? '⬇️ Unduh' : '⬇️ Download')}
          </a>
        </div>
      </div>`;

    grid.appendChild(card);
  });

  $$('.mat-preview-btn').forEach(btn => btn.addEventListener('click', () => {
    const id  = parseInt(btn.dataset.id);
    const mat = _cachedMaterials.find(m => m.id == id);
    if (mat) openMaterialModal(mat);
  }));

  $$('#materials-grid .reveal').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    obs.observe(el);
  });
}

function initMaterialFilters() {
  $$('.material-filter-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.material-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMaterialFilter = btn.dataset.filter;
    $$('.material-card').forEach(card => {
      const show = currentMaterialFilter === 'all' || card.dataset.type === currentMaterialFilter;
      card.classList.toggle('hidden', !show);
      if (show) requestAnimationFrame(() => card.classList.add('visible'));
    });
  }));
}

/* ------------------------------------------------
   MODALS
   ------------------------------------------------ */
function openProjectModal(proj) {
  const overlay = $('#modal-overlay'), title = $('#modal-title'), body = $('#modal-body');
  if (!overlay) return;
  const projTitle = currentLang === 'id' ? proj.title_id : (proj.title_en || proj.title_id);
  const projDesc  = currentLang === 'id' ? proj.desc_id  : (proj.desc_en  || proj.desc_id);
  const isStudent = proj.type === 'student';
  const tagsArr   = (proj.tags || '').split(',').map(t => t.trim()).filter(Boolean);
  const tags = tagsArr.map(tag => `<span class="tag ${isStudent ? 'tag-cyan' : ''}">${tag}</span>`).join('');
  title.textContent = projTitle;
  body.innerHTML = `
    <img src="${proj.image || 'assets/img/proj-1.png'}" alt="${projTitle}" class="modal-img" onerror="this.style.display='none'">
    <p class="modal-desc">${projDesc || ''}</p>
    <div class="modal-tags">${tags}</div>
    <div class="modal-actions">
      <a href="${proj.demo || '#'}" class="btn btn-primary" target="_blank">🌐 ${currentLang === 'id' ? 'Lihat Demo' : 'View Demo'}</a>
      <a href="${proj.github || '#'}" class="btn btn-outline" target="_blank">💻 GitHub</a>
    </div>`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openMaterialModal(mat) {
  const overlay = $('#modal-overlay'), title = $('#modal-title'), body = $('#modal-body');
  if (!overlay) return;
  const matTitle = currentLang === 'id' ? mat.title_id : (mat.title_en || mat.title_id);
  const matDesc  = currentLang === 'id' ? mat.desc_id  : (mat.desc_en  || mat.desc_id);
  const videoUrl = mat.video_url || '';
  title.textContent = matTitle;
  let contentHtml = '';
  if (mat.type === 'video' && videoUrl) {
    contentHtml = `<div class="video-embed-wrapper" style="border-radius:12px;overflow:hidden;margin-bottom:1.5rem;">
      <iframe src="${videoUrl}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>`;
  } else if (mat.type === 'pdf') {
    contentHtml = `<div style="background:rgba(255,96,96,0.08);border:1px solid rgba(255,96,96,0.2);border-radius:12px;padding:1.5rem;text-align:center;margin-bottom:1.5rem;">
      <div style="font-size:3rem;margin-bottom:0.5rem;">📄</div>
      <div style="font-weight:700;">${matTitle}</div>
      <div style="font-size:0.85rem;color:var(--color-text-muted);">${mat.size || ''}</div>
    </div>`;
  } else {
    contentHtml = `<div style="background:rgba(255,165,0,0.08);border:1px solid rgba(255,165,0,0.2);border-radius:12px;padding:1.5rem;text-align:center;margin-bottom:1.5rem;">
      <div style="font-size:3rem;margin-bottom:0.5rem;">🖥️</div>
      <div style="font-weight:700;">${matTitle}</div>
      <div style="font-size:0.85rem;color:var(--color-text-muted);">${mat.size || ''}</div>
    </div>`;
  }
  body.innerHTML = `${contentHtml}
    <p class="modal-desc">${matDesc || ''}</p>
    <div class="material-info" style="margin-bottom:1.5rem;">
      <span>🏫 ${mat.level || ''}</span><span>📦 ${mat.size || ''}</span><span>📅 ${mat.updated || ''}</span>
    </div>
    <div class="modal-actions">
      <a href="${mat.url || '#'}" class="btn btn-primary" target="_blank">
        ${mat.type === 'video' ? (currentLang === 'id' ? '🔗 Buka di YouTube' : '🔗 Open on YouTube') : (currentLang === 'id' ? '⬇️ Unduh' : '⬇️ Download')}
      </a>
    </div>`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = $('#modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  overlay.querySelectorAll('iframe').forEach(f => { const s = f.src; f.src = ''; setTimeout(() => f.src = s, 100); });
}

function initModals() {
  $('#modal-close')?.addEventListener('click', closeModal);
  $('#modal-overlay')?.addEventListener('click', e => { if (e.target === $('#modal-overlay')) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ------------------------------------------------
   CONTACT FORM
   ------------------------------------------------ */
function initContactForm() {
  const form = $('#contact-form'), success = $('#form-success');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit-btn');
    btn.textContent = currentLang === 'id' ? '⏳ Mengirim...' : '⏳ Sending...';
    btn.disabled = true;
    setTimeout(() => { form.style.display = 'none'; success?.classList.add('show'); }, 1500);
  });
}

/* ------------------------------------------------
   SCROLL TO TOP
   ------------------------------------------------ */
function updateScrollTopBtn() {
  $('#scroll-top-btn')?.classList.toggle('visible', window.scrollY > 400);
}

/* ------------------------------------------------
   INIT — async main entry point
   ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', async () => {
  showLoader();

  try {
    // Non-data inits first (fast)
    initParticles();
    initTyping();
    initNavbar();
    initLangToggle();
    initModals();
    initContactForm();
    $('#scroll-top-btn')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Fetch & render all data from Supabase
    await Promise.all([
      applyProfileToPage(),
      renderSchools(),
      renderExperiences(),
    ]);

    await renderProjects();
    initProjectFilters();
    await renderMaterials();
    initMaterialFilters();
    initScrollReveal();

  } catch (err) {
    console.error('Gagal memuat data:', err);
  } finally {
    hideLoader();
  }
});
