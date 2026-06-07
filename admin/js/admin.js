/**
 * admin.js — Admin Panel Logic v3 (Supabase-powered, async)
 * CRUD untuk Projects, Materials, Profile, Schools, Experiences, Contact
 */

'use strict';

/* ================================================
   AUTH GUARD (async)
   ================================================ */
(async () => {
  const session = await DB.getSession();
  if (!session) { window.location.href = 'index.html'; }
})();

/* ================================================
   HELPERS
   ================================================ */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* ================================================
   TOAST NOTIFICATION
   ================================================ */
function showToast(message, type = 'success') {
  const container = $('#toast-container');
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* ================================================
   CONFIRM DIALOG
   ================================================ */
let _confirmCallback = null;

function showConfirm(title, desc, onConfirm) {
  $('#confirm-title').textContent = title;
  $('#confirm-desc').textContent  = desc;
  _confirmCallback = onConfirm;
  $('#confirm-overlay').classList.add('open');
}

function closeConfirm() {
  $('#confirm-overlay').classList.remove('open');
  _confirmCallback = null;
}

/* ================================================
   LOADING OVERLAY (per-section)
   ================================================ */
function showLoading(container) {
  if (container) container.innerHTML =
    '<div style="text-align:center;padding:3rem;color:var(--text-muted);">⏳ Memuat data...</div>';
}

/* ================================================
   SIDEBAR NAVIGATION
   ================================================ */
let currentSection = 'overview';

function initSidebar() {
  $$('.sidebar-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.section);
      closeMobileSidebar();
    });
  });

  $('#logout-btn').addEventListener('click', () => {
    showConfirm('Keluar dari Admin?', 'Sesi Anda akan diakhiri.', async () => {
      await DB.logout();
      window.location.href = 'index.html';
    });
  });

  $('#admin-hamburger')?.addEventListener('click', toggleMobileSidebar);
  $('#sidebar-overlay')?.addEventListener('click', closeMobileSidebar);
}

function navigateTo(section) {
  currentSection = section;
  $$('.admin-section').forEach(s => s.classList.remove('active'));
  $(`#section-${section}`)?.classList.add('active');
  $$('.sidebar-item').forEach(i => i.classList.remove('active'));
  $(`.sidebar-item[data-section="${section}"]`)?.classList.add('active');
  $('#topbar-title').textContent = {
    overview: '📊 Overview', projects: '🗂️ Manajemen Proyek',
    materials: '📚 Manajemen Materi Ajar', profile: '👤 Edit Profil',
    contact: '📬 Informasi Kontak', settings: '⚙️ Pengaturan'
  }[section] || section;

  const loaders = {
    overview: loadOverview, projects: loadProjects,
    materials: loadMaterials, profile: loadProfile,
    contact: loadContact, settings: loadSettings,
  };
  loaders[section]?.();
}

function toggleMobileSidebar() {
  $('#admin-sidebar').classList.toggle('open');
  $('#sidebar-overlay').classList.toggle('show');
}
function closeMobileSidebar() {
  $('#admin-sidebar').classList.remove('open');
  $('#sidebar-overlay').classList.remove('show');
}

/* ================================================
   OVERVIEW
   ================================================ */
async function loadOverview() {
  try {
    const [projects, materials, schools] = await Promise.all([
      DB.getProjects(), DB.getMaterials(), DB.getSchools()
    ]);
    $('#stat-projects').textContent  = projects.length;
    $('#stat-mine').textContent      = projects.filter(p => p.type === 'mine').length;
    $('#stat-students').textContent  = projects.filter(p => p.type === 'student').length;
    $('#stat-materials').textContent = materials.length;
    $('#stat-schools').textContent   = schools.length;

    const recentList = $('#recent-list');
    if (recentList) {
      const recent = [...projects.slice(-3), ...materials.slice(-3)];
      recentList.innerHTML = recent.length
        ? recent.map(item => `<tr>
            <td><div class="table-title">${item.title_id || ''}</div></td>
            <td><span class="type-badge ${item.type === 'mine' ? 'badge-mine' : item.type === 'student' ? 'badge-student' : `badge-${item.type}`}">${item.type}</span></td>
          </tr>`).join('')
        : '<tr><td colspan="2" class="empty-state"><div class="empty-icon">📭</div><p>Belum ada data</p></td></tr>';
    }
  } catch (err) {
    console.error('loadOverview:', err);
    showToast('Gagal memuat data overview', 'error');
  }
}

/* ================================================
   PROJECTS CRUD
   ================================================ */
async function loadProjects() {
  const tbody = $('#projects-table-body');
  if (!tbody) return;
  showLoading(tbody.parentElement);
  try {
    const projects = await DB.getProjects();
    const tableWrap = tbody.closest('.table-wrap');
    tableWrap.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'admin-table';
    table.innerHTML = `<thead><tr><th>Proyek</th><th>Kategori</th><th>Tipe</th><th>Aksi</th></tr></thead>
      <tbody id="projects-table-body">${
        projects.length ? projects.map(p => `
          <tr data-id="${p.id}">
            <td>
              <div style="display:flex;align-items:center;gap:0.75rem;">
                ${p.image ? `<img src="${p.image}" class="table-thumb" onerror="this.style.display='none'">` : `<div class="table-thumb-placeholder">🖼️</div>`}
                <div>
                  <div class="table-title">${p.title_id || ''}</div>
                  <div class="table-sub">${p.title_en || ''}</div>
                </div>
              </div>
            </td>
            <td>${p.category_id || ''}</td>
            <td><span class="type-badge ${p.type === 'mine' ? 'badge-mine' : 'badge-student'}">${p.type === 'mine' ? '👨‍💻 Proyek Saya' : '👨‍🎓 Karya Siswa'}</span></td>
            <td><div class="action-btns">
              <button class="btn-edit"   onclick="openProjectModal(${p.id})" title="Edit">✏️</button>
              <button class="btn-delete" onclick="deleteProject(${p.id})"   title="Hapus">🗑️</button>
            </div></td>
          </tr>`).join('')
        : `<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">🗂️</div><p>Belum ada proyek. Klik "+ Tambah Proyek"</p></div></td></tr>`
      }</tbody>`;
    tableWrap.appendChild(table);
  } catch (err) { console.error('loadProjects:', err); showToast('Gagal memuat proyek', 'error'); }
}

let _editingProjectId = null;

async function openProjectModal(id = null) {
  _editingProjectId = id;
  const modal = $('#project-modal'), form = $('#project-form');

  if (id) {
    const projects = await DB.getProjects();
    const proj = projects.find(p => p.id == id);
    if (!proj) return;
    $('#project-modal-title').textContent = 'Edit Proyek';
    form['proj-title-id'].value    = proj.title_id    || '';
    form['proj-title-en'].value    = proj.title_en    || '';
    form['proj-desc-id'].value     = proj.desc_id     || '';
    form['proj-desc-en'].value     = proj.desc_en     || '';
    form['proj-cat-id'].value      = proj.category_id || '';
    form['proj-cat-en'].value      = proj.category_en || '';
    form['proj-type'].value        = proj.type        || 'mine';
    form['proj-tags'].value        = proj.tags        || '';
    form['proj-image-url'].value   = proj.image       || '';
    form['proj-demo'].value        = proj.demo        || '';
    form['proj-github'].value      = proj.github      || '';
    updateProjImgPreview(proj.image);
  } else {
    $('#project-modal-title').textContent = 'Tambah Proyek Baru';
    form.reset();
    updateProjImgPreview(null);
  }
  modal.classList.add('open');
}

function closeProjectModal() { $('#project-modal').classList.remove('open'); _editingProjectId = null; }

function updateProjImgPreview(src) {
  const preview = $('#proj-img-preview');
  if (!preview) return;
  preview.innerHTML = src
    ? `<img src="${src}" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.innerHTML='<span class=\\'image-preview-icon\\'>🖼️</span><span class=\\'image-preview-label\\'>Preview gambar</span>'">`
    : `<span class="image-preview-icon">🖼️</span><span class="image-preview-label">Preview gambar</span>`;
}

async function saveProject() {
  const form = $('#project-form');
  const data = {
    title_id:    form['proj-title-id'].value.trim(),
    title_en:    form['proj-title-en'].value.trim(),
    desc_id:     form['proj-desc-id'].value.trim(),
    desc_en:     form['proj-desc-en'].value.trim(),
    category_id: form['proj-cat-id'].value.trim(),
    category_en: form['proj-cat-en'].value.trim(),
    type:        form['proj-type'].value,
    tags:        form['proj-tags'].value.trim(),
    demo:        form['proj-demo'].value.trim() || '#',
    github:      form['proj-github'].value.trim() || '#',
  };
  if (!data.title_id) { showToast('Judul (Indonesia) wajib diisi!', 'error'); return; }

  const btn = $('#project-save-btn');
  btn.textContent = '⏳ Menyimpan...'; btn.disabled = true;

  try {
    // Image: file upload OR URL
    const fileInput = $('#proj-image-file');
    if (fileInput?.files[0]) {
      const url = await DB.uploadImage(fileInput.files[0]);
      if (url) data.image = url;
      else showToast('Upload gambar gagal, menggunakan URL saja.', 'info');
    }
    if (!data.image) data.image = form['proj-image-url'].value.trim() || '';

    let success;
    if (_editingProjectId) {
      success = await DB.updateProject(_editingProjectId, data);
      if (success) showToast('Proyek berhasil diperbarui! ✅');
    } else {
      success = await DB.addProject(data);
      if (success) showToast('Proyek baru berhasil ditambahkan! ✅');
    }
    if (!success) throw new Error('Operasi gagal');
    closeProjectModal();
    await loadProjects();
  } catch (err) {
    console.error('saveProject:', err);
    showToast('Gagal menyimpan proyek: ' + err.message, 'error');
  } finally {
    btn.textContent = '💾 Simpan Proyek'; btn.disabled = false;
  }
}

async function deleteProject(id) {
  const projects = await DB.getProjects();
  const proj = projects.find(p => p.id == id);
  showConfirm('Hapus Proyek?', `"${proj?.title_id || 'Proyek ini'}" akan dihapus permanen.`,
    async () => {
      const ok = await DB.deleteProject(id);
      if (ok) { showToast('Proyek berhasil dihapus.', 'info'); await loadProjects(); }
      else showToast('Gagal menghapus proyek.', 'error');
    }
  );
}

/* ================================================
   MATERIALS CRUD
   ================================================ */
async function loadMaterials() {
  const tableArea = $('#materials-table-area');
  if (!tableArea) return;
  showLoading(tableArea);
  try {
    const materials = await DB.getMaterials();
    const iconMap = { pdf:'📄', slide:'🖥️', video:'🎬' };
    tableArea.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'admin-table';
    table.innerHTML = `<thead><tr><th>Materi</th><th>Tipe</th><th>Tahun</th><th>Aksi</th></tr></thead>
      <tbody id="materials-table-body">${
        materials.length ? materials.map(m => `
          <tr data-id="${m.id}">
            <td>
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <div class="table-thumb-placeholder">${iconMap[m.type] || '📁'}</div>
                <div>
                  <div class="table-title">${m.title_id || ''}</div>
                  <div class="table-sub">${m.subject_id || ''} · ${m.level || ''}</div>
                </div>
              </div>
            </td>
            <td><span class="type-badge badge-${m.type}">${(m.type||'').toUpperCase()}</span></td>
            <td>${m.updated || '—'}</td>
            <td><div class="action-btns">
              <button class="btn-edit"   onclick="openMaterialModal(${m.id})" title="Edit">✏️</button>
              <button class="btn-delete" onclick="deleteMaterial(${m.id})"   title="Hapus">🗑️</button>
            </div></td>
          </tr>`).join('')
        : `<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">📚</div><p>Belum ada materi.</p></div></td></tr>`
      }</tbody>`;
    tableArea.appendChild(table);
  } catch (err) { console.error('loadMaterials:', err); showToast('Gagal memuat materi', 'error'); }
}

let _editingMaterialId = null;

async function openMaterialModal(id = null) {
  _editingMaterialId = id;
  const modal = $('#material-modal'), form = $('#material-form');

  if (id) {
    const materials = await DB.getMaterials();
    const mat = materials.find(m => m.id == id);
    if (!mat) return;
    $('#material-modal-title').textContent = 'Edit Materi';
    form['mat-title-id'].value   = mat.title_id   || '';
    form['mat-title-en'].value   = mat.title_en   || '';
    form['mat-desc-id'].value    = mat.desc_id    || '';
    form['mat-desc-en'].value    = mat.desc_en    || '';
    form['mat-subject-id'].value = mat.subject_id || '';
    form['mat-subject-en'].value = mat.subject_en || '';
    form['mat-type'].value       = mat.type       || 'pdf';
    form['mat-level'].value      = mat.level      || '';
    form['mat-size'].value       = mat.size       || '';
    form['mat-updated'].value    = mat.updated    || '';
    form['mat-url'].value        = mat.url        || '';
    form['mat-video-url'].value  = mat.video_url  || '';
    toggleVideoField(mat.type);
  } else {
    $('#material-modal-title').textContent = 'Tambah Materi Baru';
    form.reset();
    toggleVideoField('pdf');
  }
  modal.classList.add('open');
}

function toggleVideoField(type) {
  const vg = $('#video-url-group');
  if (vg) vg.style.display = type === 'video' ? 'block' : 'none';
}

function closeMaterialModal() { $('#material-modal').classList.remove('open'); _editingMaterialId = null; }

async function saveMaterial() {
  const form = $('#material-form');
  const data = {
    title_id:   form['mat-title-id'].value.trim(),
    title_en:   form['mat-title-en'].value.trim(),
    desc_id:    form['mat-desc-id'].value.trim(),
    desc_en:    form['mat-desc-en'].value.trim(),
    subject_id: form['mat-subject-id'].value.trim(),
    subject_en: form['mat-subject-en'].value.trim(),
    type:       form['mat-type'].value,
    level:      form['mat-level'].value.trim(),
    size:       form['mat-size'].value.trim(),
    updated:    form['mat-updated'].value.trim(),
    url:        form['mat-url'].value.trim() || '#',
    video_url:  form['mat-video-url'].value.trim(),
  };
  if (!data.title_id) { showToast('Judul wajib diisi!', 'error'); return; }

  // Auto-convert YouTube URL to embed
  if (data.video_url) {
    data.video_url = data.video_url
      .replace(/watch\?v=/, 'embed/')
      .replace(/youtu\.be\//, 'www.youtube.com/embed/')
      .replace(/youtube\.com\/shorts\//, 'youtube.com/embed/');
    if (!data.video_url.includes('/embed/')) {
      const match = data.video_url.match(/[?&]v=([^&]+)/);
      if (match) data.video_url = `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  const btn = $('#material-save-btn');
  btn.textContent = '⏳ Menyimpan...'; btn.disabled = true;

  try {
    let success;
    if (_editingMaterialId) {
      success = await DB.updateMaterial(_editingMaterialId, data);
      if (success) showToast('Materi berhasil diperbarui! ✅');
    } else {
      success = await DB.addMaterial(data);
      if (success) showToast('Materi baru berhasil ditambahkan! ✅');
    }
    if (!success) throw new Error('Operasi gagal');
    closeMaterialModal();
    await loadMaterials();
  } catch (err) {
    console.error('saveMaterial:', err);
    showToast('Gagal menyimpan materi: ' + err.message, 'error');
  } finally {
    btn.textContent = '💾 Simpan Materi'; btn.disabled = false;
  }
}

async function deleteMaterial(id) {
  const materials = await DB.getMaterials();
  const mat = materials.find(m => m.id == id);
  showConfirm('Hapus Materi?', `"${mat?.title_id || 'Materi ini'}" akan dihapus permanen.`,
    async () => {
      const ok = await DB.deleteMaterial(id);
      if (ok) { showToast('Materi berhasil dihapus.', 'info'); await loadMaterials(); }
      else showToast('Gagal menghapus materi.', 'error');
    }
  );
}

/* ================================================
   PROFILE
   ================================================ */
async function loadProfile() {
  try {
    const p = await DB.getProfile();
    if (!p) return;
    const form = $('#profile-form');
    if (!form) return;
    form['prof-name'].value       = p.name          || '';
    form['prof-tagline'].value    = p.tagline        || '';
    form['prof-bio-id'].value     = p.bio_id         || '';
    form['prof-bio-en'].value     = p.bio_en         || '';
    form['prof-bio2-id'].value    = p.bio2_id        || '';
    form['prof-bio2-en'].value    = p.bio2_en        || '';
    form['prof-stat-years'].value = p.stat_years     || 0;
    form['prof-stat-stu'].value   = p.stat_students  || 0;
    form['prof-stat-proj'].value  = p.stat_projects  || 0;
    form['prof-badge-id'].value   = p.badge_id       || '';
    form['prof-badge-en'].value   = p.badge_en       || '';
    form['prof-avatar-url'].value = p.avatar         || '';
    updateAvatarPreview(p.avatar);

    const skills = typeof p.skills === 'string' ? JSON.parse(p.skills || '[]') : (p.skills || []);
    renderSkillsEditor(skills);
    await loadSchoolsEditor();
    await loadExperiencesEditor();
  } catch (err) { console.error('loadProfile:', err); showToast('Gagal memuat profil', 'error'); }
}

function updateAvatarPreview(src) {
  const el = $('#avatar-preview-img');
  if (el) { el.src = src || ''; el.style.display = src ? 'block' : 'none'; }
}

async function saveProfile() {
  const form = $('#profile-form');
  const btn = $('#profile-save-btn');
  btn.textContent = '⏳ Menyimpan...'; btn.disabled = true;

  try {
    const p = await DB.getProfile();
    const skills = collectSkills();

    // Avatar: file upload or URL
    let avatarUrl = form['prof-avatar-url'].value.trim() || p?.avatar || '';
    const fileInput = $('#avatar-file-input');
    if (fileInput?.files[0]) {
      const uploaded = await DB.uploadImage(fileInput.files[0]);
      if (uploaded) avatarUrl = uploaded;
    }

    const data = {
      id: p?.id || 1,
      name:          form['prof-name'].value.trim(),
      tagline:       form['prof-tagline'].value.trim(),
      bio_id:        form['prof-bio-id'].value.trim(),
      bio_en:        form['prof-bio-en'].value.trim(),
      bio2_id:       form['prof-bio2-id'].value.trim(),
      bio2_en:       form['prof-bio2-en'].value.trim(),
      stat_years:    parseInt(form['prof-stat-years'].value) || 0,
      stat_students: parseInt(form['prof-stat-stu'].value)   || 0,
      stat_projects: parseInt(form['prof-stat-proj'].value)  || 0,
      badge_id:      form['prof-badge-id'].value.trim(),
      badge_en:      form['prof-badge-en'].value.trim(),
      avatar:        avatarUrl,
      skills:        skills,
    };

    const ok = await DB.setProfile(data);
    if (ok) showToast('Profil berhasil disimpan! ✅');
    else throw new Error('Update gagal');
  } catch (err) {
    console.error('saveProfile:', err);
    showToast('Gagal menyimpan profil: ' + err.message, 'error');
  } finally {
    btn.textContent = '💾 Simpan Profil'; btn.disabled = false;
  }
}

/* Skills editor */
function renderSkillsEditor(skills) {
  const container = $('#skills-editor');
  if (!container) return;
  container.innerHTML = skills.map((s, i) => `
    <div class="skill-row" data-index="${i}">
      <input type="text" class="skill-emoji-input" value="${s.icon || '⚡'}" maxlength="4" placeholder="🔧">
      <input type="text" class="skill-name-input" value="${s.name || ''}" placeholder="Nama skill">
      <button type="button" class="btn-delete skill-delete" onclick="removeSkill(${i})">✕</button>
    </div>`).join('');
}

function addSkill() { renderSkillsEditor([...collectSkills(), { icon: '⚡', name: 'Skill Baru' }]); }
function removeSkill(idx) { const s = collectSkills(); s.splice(idx, 1); renderSkillsEditor(s); }
function collectSkills() {
  return Array.from($$('#skills-editor .skill-row')).map(r => ({
    icon: r.querySelector('.skill-emoji-input').value.trim() || '⚡',
    name: r.querySelector('.skill-name-input').value.trim()  || 'Skill',
  }));
}

/* Schools editor */
async function loadSchoolsEditor() {
  const tbody = $('#schools-table-body');
  if (!tbody) return;
  try {
    const schools = await DB.getSchools();
    tbody.innerHTML = schools.map(s => `
      <tr>
        <td>${s.icon || '🏫'}</td>
        <td><div class="table-title">${s.name}</div><div class="table-sub">${s.detail || ''}</div></td>
        <td>${s.status || 'Aktif'}</td>
        <td><div class="action-btns">
          <button class="btn-edit"   onclick="openSchoolModal(${s.id})" title="Edit">✏️</button>
          <button class="btn-delete" onclick="deleteSchool(${s.id})"   title="Hapus">🗑️</button>
        </div></td>
      </tr>`).join('') || '<tr><td colspan="4"><div class="empty-state"><p>Belum ada sekolah</p></div></td></tr>';
  } catch (err) { console.error('loadSchoolsEditor:', err); }
}

let _editingSchoolId = null;

async function openSchoolModal(id = null) {
  _editingSchoolId = id;
  const form = $('#school-form');
  if (id) {
    const schools = await DB.getSchools();
    const s = schools.find(s => s.id == id);
    if (!s) return;
    $('#school-modal-title').textContent = 'Edit Sekolah';
    form['school-icon'].value   = s.icon   || '🏫';
    form['school-name'].value   = s.name   || '';
    form['school-detail'].value = s.detail || '';
    form['school-status'].value = s.status || 'Aktif';
  } else {
    $('#school-modal-title').textContent = 'Tambah Sekolah';
    form.reset(); form['school-icon'].value = '🏫'; form['school-status'].value = 'Aktif';
  }
  $('#school-modal').classList.add('open');
}

function closeSchoolModal() { $('#school-modal').classList.remove('open'); _editingSchoolId = null; }

async function saveSchool() {
  const form = $('#school-form');
  const data = {
    icon:   form['school-icon'].value.trim()   || '🏫',
    name:   form['school-name'].value.trim(),
    detail: form['school-detail'].value.trim(),
    status: form['school-status'].value.trim() || 'Aktif',
  };
  if (!data.name) { showToast('Nama sekolah wajib diisi!', 'error'); return; }
  const ok = _editingSchoolId ? await DB.updateSchool(_editingSchoolId, data) : await DB.addSchool(data);
  if (ok) { showToast(_editingSchoolId ? 'Sekolah diperbarui! ✅' : 'Sekolah ditambahkan! ✅'); closeSchoolModal(); await loadSchoolsEditor(); }
  else showToast('Gagal menyimpan sekolah.', 'error');
}

async function deleteSchool(id) {
  const schools = await DB.getSchools();
  const s = schools.find(s => s.id == id);
  showConfirm('Hapus Sekolah?', `"${s?.name}" akan dihapus.`,
    async () => { const ok = await DB.deleteSchool(id); if (ok) { showToast('Sekolah dihapus.', 'info'); await loadSchoolsEditor(); } });
}

/* Experiences editor */
async function loadExperiencesEditor() {
  const tbody = $('#experiences-table-body');
  if (!tbody) return;
  try {
    const exps = await DB.getExperiences();
    tbody.innerHTML = exps.map(e => `
      <tr>
        <td>${e.icon || '📅'}</td>
        <td><div class="table-title">${e.title}</div><div class="table-sub">${e.period || ''} · ${e.place || ''}</div></td>
        <td><div class="action-btns">
          <button class="btn-edit"   onclick="openExpModal(${e.id})" title="Edit">✏️</button>
          <button class="btn-delete" onclick="deleteExp(${e.id})"   title="Hapus">🗑️</button>
        </div></td>
      </tr>`).join('') || '<tr><td colspan="3"><div class="empty-state"><p>Belum ada pengalaman</p></div></td></tr>';
  } catch (err) { console.error('loadExperiencesEditor:', err); }
}

let _editingExpId = null;

async function openExpModal(id = null) {
  _editingExpId = id;
  const form = $('#exp-form');
  if (id) {
    const exps = await DB.getExperiences();
    const e = exps.find(e => e.id == id);
    if (!e) return;
    $('#exp-modal-title').textContent = 'Edit Pengalaman';
    form['exp-icon'].value   = e.icon   || '📅';
    form['exp-period'].value = e.period || '';
    form['exp-title'].value  = e.title  || '';
    form['exp-place'].value  = e.place  || '';
  } else {
    $('#exp-modal-title').textContent = 'Tambah Pengalaman';
    form.reset(); form['exp-icon'].value = '📅';
  }
  $('#exp-modal').classList.add('open');
}

function closeExpModal() { $('#exp-modal').classList.remove('open'); _editingExpId = null; }

async function saveExp() {
  const form = $('#exp-form');
  const data = {
    icon:   form['exp-icon'].value.trim()   || '📅',
    period: form['exp-period'].value.trim(),
    title:  form['exp-title'].value.trim(),
    place:  form['exp-place'].value.trim(),
  };
  if (!data.title) { showToast('Judul pengalaman wajib diisi!', 'error'); return; }
  const ok = _editingExpId ? await DB.updateExperience(_editingExpId, data) : await DB.addExperience(data);
  if (ok) { showToast(_editingExpId ? 'Pengalaman diperbarui! ✅' : 'Pengalaman ditambahkan! ✅'); closeExpModal(); await loadExperiencesEditor(); }
  else showToast('Gagal menyimpan pengalaman.', 'error');
}

async function deleteExp(id) {
  const exps = await DB.getExperiences();
  const e = exps.find(e => e.id == id);
  showConfirm('Hapus Pengalaman?', `"${e?.title}" akan dihapus.`,
    async () => { const ok = await DB.deleteExperience(id); if (ok) { showToast('Pengalaman dihapus.', 'info'); await loadExperiencesEditor(); } });
}

/* ================================================
   CONTACT
   ================================================ */
async function loadContact() {
  try {
    const p = await DB.getProfile();
    const form = $('#contact-form-admin');
    if (!form || !p) return;
    form['con-email'].value     = p.email            || '';
    form['con-whatsapp'].value  = p.whatsapp         || '';
    form['con-location'].value  = p.location         || '';
    form['con-github'].value    = p.social_github    || '';
    form['con-linkedin'].value  = p.social_linkedin  || '';
    form['con-youtube'].value   = p.social_youtube   || '';
    form['con-instagram'].value = p.social_instagram || '';
  } catch (err) { console.error('loadContact:', err); }
}

async function saveContact() {
  const form = $('#contact-form-admin');
  const btn  = $('#contact-save-btn');
  btn.textContent = '⏳ Menyimpan...'; btn.disabled = true;
  try {
    const p = await DB.getProfile();
    const ok = await DB.setProfile({
      ...p,
      email:            form['con-email'].value.trim(),
      whatsapp:         form['con-whatsapp'].value.trim(),
      location:         form['con-location'].value.trim(),
      social_github:    form['con-github'].value.trim(),
      social_linkedin:  form['con-linkedin'].value.trim(),
      social_youtube:   form['con-youtube'].value.trim(),
      social_instagram: form['con-instagram'].value.trim(),
    });
    if (ok) showToast('Kontak disimpan! ✅');
    else throw new Error('Gagal');
  } catch (err) { showToast('Gagal menyimpan kontak: ' + err.message, 'error'); }
  finally { btn.textContent = '💾 Simpan'; btn.disabled = false; }
}

/* ================================================
   SETTINGS
   ================================================ */
async function loadSettings() {
  // Settings hanya ubah password Supabase
  // Username = email Supabase (tidak bisa diubah dari sini)
  const session = await DB.getSession();
  const emailEl = $('#current-user-email');
  if (emailEl && session?.user?.email) emailEl.textContent = session.user.email;
}

async function saveSettings() {
  const form = $('#settings-form');
  const newPass = form['set-new-password'].value;
  const confirm = form['set-confirm-password'].value;
  if (!newPass) { showToast('Password baru wajib diisi!', 'error'); return; }
  if (newPass.length < 6) { showToast('Password minimal 6 karakter!', 'error'); return; }
  if (newPass !== confirm) { showToast('Konfirmasi password tidak cocok!', 'error'); return; }

  const btn = $('#settings-save-btn');
  btn.textContent = '⏳ Menyimpan...'; btn.disabled = true;

  try {
    const { error } = await DB.client.auth.updateUser({ password: newPass });
    if (error) throw error;
    showToast('Password berhasil diperbarui! ✅');
    form.reset();
  } catch (err) {
    showToast('Gagal mengubah password: ' + (err.message || err), 'error');
  } finally {
    btn.textContent = '💾 Simpan Pengaturan'; btn.disabled = false;
  }
}

/* ================================================
   INIT
   ================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  // Auth guard (async check)
  const session = await DB.getSession();
  if (!session) { window.location.href = 'index.html'; return; }

  // Show email in sidebar
  const userNameEl = $('.sidebar-user-name');
  if (userNameEl && session.user?.email) {
    userNameEl.textContent = session.user.email.split('@')[0];
    userNameEl.title = session.user.email;
  }

  initSidebar();
  navigateTo('overview');

  // Confirm dialog buttons
  $('#confirm-yes-btn')?.addEventListener('click', () => { _confirmCallback?.(); closeConfirm(); });
  $('#confirm-no-btn')?.addEventListener('click', closeConfirm);

  // Project modal
  $('#add-project-btn')?.addEventListener('click', () => openProjectModal());
  $('#project-modal-close')?.addEventListener('click', closeProjectModal);
  $('#project-modal-cancel')?.addEventListener('click', closeProjectModal);
  $('#project-save-btn')?.addEventListener('click', saveProject);
  $('#proj-image-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) { const r = new FileReader(); r.onload = ev => updateProjImgPreview(ev.target.result); r.readAsDataURL(file); }
  });
  document.getElementById('proj-image-url')?.addEventListener('input', e => updateProjImgPreview(e.target.value.trim() || null));

  // Material modal
  $('#add-material-btn')?.addEventListener('click', () => openMaterialModal());
  $('#material-modal-close')?.addEventListener('click', closeMaterialModal);
  $('#material-modal-cancel')?.addEventListener('click', closeMaterialModal);
  $('#material-save-btn')?.addEventListener('click', saveMaterial);
  document.getElementById('mat-type')?.addEventListener('change', e => toggleVideoField(e.target.value));

  // Profile
  $('#profile-save-btn')?.addEventListener('click', saveProfile);
  $('#add-skill-btn')?.addEventListener('click', addSkill);
  $('#avatar-file-input')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) { const r = new FileReader(); r.onload = ev => updateAvatarPreview(ev.target.result); r.readAsDataURL(file); }
  });
  document.getElementById('prof-avatar-url')?.addEventListener('input', e => updateAvatarPreview(e.target.value.trim()));

  // School
  $('#add-school-btn')?.addEventListener('click', () => openSchoolModal());
  $('#school-modal-close')?.addEventListener('click', closeSchoolModal);
  $('#school-modal-cancel')?.addEventListener('click', closeSchoolModal);
  $('#school-save-btn')?.addEventListener('click', saveSchool);

  // Experience
  $('#add-exp-btn')?.addEventListener('click', () => openExpModal());
  $('#exp-modal-close')?.addEventListener('click', closeExpModal);
  $('#exp-modal-cancel')?.addEventListener('click', closeExpModal);
  $('#exp-save-btn')?.addEventListener('click', saveExp);

  // Contact
  $('#contact-save-btn')?.addEventListener('click', saveContact);

  // Settings
  $('#settings-save-btn')?.addEventListener('click', saveSettings);

  // Close modals on background click
  $$('.modal-overlay').forEach(o => o.addEventListener('click', e => {
    if (e.target === o) { o.classList.remove('open'); _editingProjectId = _editingMaterialId = _editingSchoolId = _editingExpId = null; }
  }));

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { $$('.modal-overlay.open').forEach(o => o.classList.remove('open')); closeConfirm(); }
  });
});
