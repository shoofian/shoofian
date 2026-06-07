/**
 * data.js — Supabase Data Manager (v3)
 * Web Profile Guru Informatika
 *
 * ⚙️ KONFIGURASI: Isi SUPABASE_URL dan SUPABASE_ANON_KEY di bawah ini
 *    Dapatkan dari: Supabase Dashboard → Settings → API
 */

'use strict';

// ============================================================
//  ⚙️  KONFIGURASI SUPABASE — WAJIB DIISI
// ============================================================
const SUPABASE_URL      = 'YOUR_SUPABASE_URL';       // contoh: https://abcxyz.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';  // contoh: eyJhbGciOi...
// ============================================================

// Inisialisasi Supabase Client (via CDN)
const { createClient } = window.supabase;
const _sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
});

/* ============================================================
   DB — Central async data manager
   ============================================================ */
const DB = {
  client: _sb,

  /** Cache in-memory agar tidak query berulang di halaman yang sama */
  _cache: {},
  clearCache(key) {
    if (key) delete this._cache[key];
    else this._cache = {};
  },

  /* ---- HELPERS ---- */
  _handle(result, fallback = null) {
    if (result.error) {
      console.error('[DB Error]', result.error.message);
      return fallback;
    }
    return result.data;
  },

  /* ============================================================
     PROFILE
     ============================================================ */
  async getProfile() {
    if (this._cache.profile) return this._cache.profile;
    const result = await this.client.from('profile').select('*').single();
    const data = this._handle(result);
    if (data) this._cache.profile = data;
    return data;
  },

  async setProfile(profileData) {
    this.clearCache('profile');
    const { id, created_at, ...rest } = profileData;
    const result = await this.client.from('profile').update(rest).eq('id', profileData.id || 1);
    return !result.error;
  },

  /* ============================================================
     SCHOOLS
     ============================================================ */
  async getSchools() {
    if (this._cache.schools) return this._cache.schools;
    const result = await this.client.from('schools').select('*').order('order_num');
    const data = this._handle(result, []);
    this._cache.schools = data;
    return data;
  },

  async addSchool(school) {
    this.clearCache('schools');
    const max = (await this.getSchools()).length;
    const result = await this.client.from('schools').insert({ ...school, order_num: max + 1 });
    return !result.error;
  },

  async updateSchool(id, school) {
    this.clearCache('schools');
    const result = await this.client.from('schools').update(school).eq('id', id);
    return !result.error;
  },

  async deleteSchool(id) {
    this.clearCache('schools');
    const result = await this.client.from('schools').delete().eq('id', id);
    return !result.error;
  },

  /* ============================================================
     EXPERIENCES
     ============================================================ */
  async getExperiences() {
    if (this._cache.experiences) return this._cache.experiences;
    const result = await this.client.from('experiences').select('*').order('order_num');
    const data = this._handle(result, []);
    this._cache.experiences = data;
    return data;
  },

  async addExperience(exp) {
    this.clearCache('experiences');
    const max = (await this.getExperiences()).length;
    const result = await this.client.from('experiences').insert({ ...exp, order_num: max + 1 });
    return !result.error;
  },

  async updateExperience(id, exp) {
    this.clearCache('experiences');
    const result = await this.client.from('experiences').update(exp).eq('id', id);
    return !result.error;
  },

  async deleteExperience(id) {
    this.clearCache('experiences');
    const result = await this.client.from('experiences').delete().eq('id', id);
    return !result.error;
  },

  /* ============================================================
     PROJECTS
     ============================================================ */
  async getProjects() {
    if (this._cache.projects) return this._cache.projects;
    const result = await this.client.from('projects').select('*').order('order_num');
    const data = this._handle(result, []);
    this._cache.projects = data;
    return data;
  },

  async addProject(project) {
    this.clearCache('projects');
    const max = (await this.getProjects()).length;
    const result = await this.client.from('projects').insert({ ...project, order_num: max + 1 });
    return !result.error;
  },

  async updateProject(id, project) {
    this.clearCache('projects');
    const { id: _id, created_at, ...rest } = project;
    const result = await this.client.from('projects').update(rest).eq('id', id);
    return !result.error;
  },

  async deleteProject(id) {
    this.clearCache('projects');
    const result = await this.client.from('projects').delete().eq('id', id);
    return !result.error;
  },

  /* ============================================================
     MATERIALS
     ============================================================ */
  async getMaterials() {
    if (this._cache.materials) return this._cache.materials;
    const result = await this.client.from('materials').select('*').order('order_num');
    const data = this._handle(result, []);
    this._cache.materials = data;
    return data;
  },

  async addMaterial(material) {
    this.clearCache('materials');
    const max = (await this.getMaterials()).length;
    const result = await this.client.from('materials').insert({ ...material, order_num: max + 1 });
    return !result.error;
  },

  async updateMaterial(id, material) {
    this.clearCache('materials');
    const { id: _id, created_at, ...rest } = material;
    const result = await this.client.from('materials').update(rest).eq('id', id);
    return !result.error;
  },

  async deleteMaterial(id) {
    this.clearCache('materials');
    const result = await this.client.from('materials').delete().eq('id', id);
    return !result.error;
  },

  /* ============================================================
     AUTH (Supabase Auth — email + password)
     ============================================================ */
  async login(email, password) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    return { success: !error, error: error?.message, session: data?.session };
  },

  async logout() {
    await this.client.auth.signOut();
  },

  async getSession() {
    const { data } = await this.client.auth.getSession();
    return data?.session || null;
  },

  async isAuthenticated() {
    const session = await this.getSession();
    return !!session;
  },

  /* ============================================================
     STORAGE — Upload gambar ke Supabase Storage
     ============================================================ */
  async uploadImage(file) {
    const ext  = file.name.split('.').pop().toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await this.client.storage.from('images').upload(path, file, {
      cacheControl: '3600', upsert: false, contentType: file.type
    });
    if (error) { console.error('[Upload Error]', error.message); return null; }
    const { data } = this.client.storage.from('images').getPublicUrl(path);
    return data.publicUrl;
  },

  /* ============================================================
     REAL-TIME — Subscribe perubahan data
     ============================================================ */
  subscribeToChanges(table, callback) {
    return this.client.channel(`realtime:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
        this.clearCache(table);
        callback(payload);
      })
      .subscribe();
  },
};

/* ============================================================
   CEK KONFIGURASI — Tampilkan peringatan jika belum diisi
   ============================================================ */
if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn(
    '%c⚠️ Supabase belum dikonfigurasi!\n' +
    'Buka js/data.js dan isi SUPABASE_URL & SUPABASE_ANON_KEY\n' +
    'Lihat panduan di SETUP_GUIDE.md',
    'color: orange; font-size: 14px; font-weight: bold;'
  );
}
