/**
 * data.js — Static Data Manager (v4 - Static Edition)
 * Web Profile Guru Informatika & Quality Assurance Analyst
 *
 * 👤 Pemilik: Wahyu Shofian
 * 📂 Menyimpan seluruh data portofolio & CV secara lokal (Statis).
 *    Untuk mengubah konten website, Anda cukup memperbarui data di dalam file ini.
 */

'use strict';

// ============================================================
//  💾 DATA PORTFOLIO & CV (WAHYU SHOFIAN)
// ============================================================

const STATIC_PROFILE = {
  id: 1,
  name: 'Wahyu Shofian',
  tagline: 'Data & Software Enthusiast | Informatics Educator | Quality Assurance Analyst',
  
  // Biografi (Bilingual)
  bio_id: 'Saya adalah antusias data dan perangkat lunak yang memiliki pengalaman profesional di bidang pendidikan, jaminan kualitas perangkat lunak (Quality Assurance), dan pengembangan aplikasi seluler. Terampil dalam mengolah data menjadi informasi yang berharga serta memastikan keandalan sistem perangkat lunak.',
  bio_en: 'Results-driven data and software enthusiast with professional experience in education, software quality assurance, and mobile application development. Skilled in transforming data into actionable insights and ensuring software reliability through structured testing and analysis.',
  
  bio2_id: 'Memiliki kecintaan mendalam untuk membangun solusi digital yang berdampak nyata serta menumbuhkan pemikiran logis berbasis teknologi melalui pendidikan komputer dan informatika.',
  bio2_en: 'Passionate about building impactful digital solutions and fostering logical, technology-driven thinking through education.',
  
  avatar: 'assets/img/profile-avatar.png',
  
  // Statistik
  stat_years: 5,      // Tahun pengalaman gabungan
  stat_students: 500,  // Estimasi siswa terdidik
  stat_projects: 15,   // Jumlah proyek selesai
  
  badge_id: 'Tersedia untuk Kolaborasi',
  badge_en: 'Available for Collaboration',
  
  // Kontak
  city: 'Berau',
  email: 'wahyushofian@email.com', // Silakan ganti dengan email asli Anda
  whatsapp: '628123456789',        // Silakan ganti dengan nomor WA asli Anda
  location: 'Berau, Kalimantan Timur, Indonesia',
  
  // Sosial Media
  social_github: 'https://github.com/shoofian',
  social_linkedin: 'https://linkedin.com/in/shoofian', // Silakan ganti dengan username asli LinkedIn Anda jika berbeda
  social_youtube: '#',
  social_instagram: '#',
  
  // Daftar Keahlian (Skills)
  skills: [
    { icon: '🐍', name: 'Python' },
    { icon: '💻', name: 'C++' },
    { icon: '📊', name: 'Data Analysis' },
    { icon: '📈', name: 'Data Visualization' },
    { icon: '🤖', name: 'Machine Learning' },
    { icon: '🔍', name: 'Manual Testing' },
    { icon: '🐛', name: 'Bug Reporting' },
    { icon: '🖥️', name: 'System Monitoring' },
    { icon: '👨‍🏫', name: 'Informatics Education' },
    { icon: '🔀', name: 'Algorithm Design' },
    { icon: '📱', name: 'Android Studio' },
    { icon: '🔧', name: 'Testing Tools' }
  ]
};

const STATIC_SCHOOLS = [
  {
    id: 1,
    icon: '🏫',
    name: 'SMAN 4 Berau',
    detail: 'Informatika · Kelas X, XI, XII',
    status: 'Aktif',
    order_num: 1
  },
  {
    id: 2,
    icon: '🏢',
    name: 'Memofy Studio',
    detail: 'System Quality Assurance Analyst',
    status: 'Aktif',
    order_num: 2
  },
  {
    id: 3,
    icon: '🎓',
    name: 'Universitas Ahmad Dahlan',
    detail: 'Asisten Praktikum Pemrograman Mobile',
    status: 'Alumni',
    order_num: 3
  }
];

const STATIC_EXPERIENCES = [
  {
    id: 1,
    icon: '👨‍🏫',
    period: 'Februari 2022 – Sekarang',
    title: 'Informatics Teacher',
    place: 'SMAN 4 Berau · Berau, Kalimantan Timur',
    order_num: 1
  },
  {
    id: 2,
    icon: '🔍',
    period: 'September 2020 – Sekarang',
    title: 'System Quality Assurance Analyst',
    place: 'Memofy Studio',
    order_num: 2
  },
  {
    id: 3,
    icon: '📱',
    period: 'Desember 2019 – Juli 2021',
    title: 'Freelance Mobile Application Developer',
    place: 'Pengembangan Aplikasi Android Edukasi',
    order_num: 3
  },
  {
    id: 4,
    icon: '🎓',
    period: 'September 2019 – Januari 2020',
    title: 'Mobile Programming Practicum Assistant',
    place: 'Universitas Ahmad Dahlan · Yogyakarta',
    order_num: 4
  }
];

const STATIC_PROJECTS = [
  {
    id: 1,
    type: 'mine',
    title_id: 'Aplikasi Media Pembelajaran Interaktif (Android)',
    title_en: 'Interactive Learning Media App (Android)',
    desc_id: 'Aplikasi mobile berbasis Android untuk mendukung pembelajaran interaktif siswa, dikembangkan menggunakan Android Studio.',
    desc_en: 'An Android-based mobile application to support interactive student learning, developed using Android Studio.',
    category_id: 'Aplikasi Mobile',
    category_en: 'Mobile Application',
    image: 'assets/img/proj-2.png',
    tags: 'Android Studio,Java,SQLite,Educational',
    demo: '#',
    github: 'https://github.com/shoofian',
    order_num: 1
  },
  {
    id: 2,
    type: 'mine',
    title_id: 'Visualisasi & Analisis Data Nilai Siswa',
    title_en: 'Student Grades Visualization & Analysis',
    desc_id: 'Proyek analisis data hasil belajar siswa menggunakan Python untuk mengidentifikasi area pemahaman materi dan meningkatkan efektivitas pengajaran.',
    desc_en: 'A data analysis project on student learning outcomes using Python to identify key area comprehension and improve teaching effectiveness.',
    category_id: 'Analisis Data',
    category_en: 'Data Analysis',
    image: 'assets/img/proj-3.png',
    tags: 'Python,Pandas,Matplotlib,Data Analytics',
    demo: '#',
    github: 'https://github.com/shoofian',
    order_num: 2
  },
  {
    id: 3,
    type: 'student',
    title_id: 'Website Portofolio Digital Kelas XI',
    title_en: 'Digital Portfolio Website of 11th Grade Students',
    desc_id: 'Kumpulan portofolio digital berbasis web responsif yang dirancang oleh siswa-siswi kelas XI dalam mata pelajaran Informatika menggunakan HTML, CSS, dan JavaScript dasar.',
    desc_en: 'A collection of responsive web-based digital portfolios designed by 11th-grade students in Informatics class using basic HTML, CSS, and JavaScript.',
    category_id: 'Karya Siswa',
    category_en: 'Student Work',
    image: 'assets/img/proj-1.png',
    tags: 'HTML,CSS,JavaScript,Responsive Design',
    demo: '#',
    github: 'https://github.com/shoofian',
    order_num: 3
  }
];

const STATIC_MATERIALS = [
  {
    id: 1,
    type: 'pdf',
    title_id: 'Modul Praktis Pemrograman Python untuk Pemula',
    title_en: 'Practical Python Programming Module for Beginners',
    desc_id: 'Modul pengantar pemrograman Python dasar yang diajarkan pada kelas X Informatika SMAN 4 Berau, mencakup sintaks, logika, dan struktur data sederhana.',
    desc_en: 'An introductory Python programming module taught in 10th-grade Informatics class at SMAN 4 Berau, covering syntax, logic, and simple data structures.',
    subject_id: 'Pemrograman Dasar',
    subject_en: 'Basic Programming',
    level: 'SMA Kelas X',
    size: '2.5 MB',
    updated: '2024',
    url: '#',
    video_url: '',
    order_num: 1
  },
  {
    id: 2,
    type: 'slide',
    title_id: 'Slide Presentasi: Konsep Berpikir Komputasional',
    title_en: 'Computational Thinking Concept Slides',
    desc_id: 'Slide presentasi interaktif mengenai 4 pilar berpikir komputasional: Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma.',
    desc_en: 'Interactive presentation slides about the 4 pillars of computational thinking: Decomposition, Pattern Recognition, Abstraction, and Algorithm Design.',
    subject_id: 'Informatika',
    subject_en: 'Informatics',
    level: 'SMP / SMA',
    size: '4.8 MB',
    updated: '2024',
    url: '#',
    video_url: '',
    order_num: 2
  },
  {
    id: 3,
    type: 'video',
    title_id: 'Video Tutorial: Logika Pemrograman & Flowchart',
    title_en: 'Video Tutorial: Programming Logic & Flowcharts',
    desc_id: 'Video pembelajaran interaktif yang menjelaskan logika komputer, alur program menggunakan diagram alir (flowchart), dan penerapannya.',
    desc_en: 'Interactive learning video explaining computer logic, program flow using flowcharts, and its applications.',
    subject_id: 'Logika Komputer',
    subject_en: 'Computer Logic',
    level: 'Umum / SMA',
    size: 'YouTube',
    updated: '2023',
    url: '#',
    video_url: 'https://www.youtube.com/embed/qz0aGYrrlhU',
    order_num: 3
  },
  {
    id: 4,
    type: 'pdf',
    title_id: 'Panduan Dasar Manual Testing & Pelaporan Bug',
    title_en: 'Basic Manual Testing & Bug Reporting Guide',
    desc_id: 'Materi dasar penjaminan kualitas perangkat lunak (QA) tentang cara merancang skenario uji (test cases) dan menulis laporan bug yang informatif.',
    desc_en: 'Software Quality Assurance (QA) basics material on designing test scenarios (test cases) and writing informative bug reports.',
    subject_id: 'Quality Assurance',
    subject_en: 'Quality Assurance',
    level: 'Umum / Pemula',
    size: '1.8 MB',
    updated: '2024',
    url: '#',
    video_url: '',
    order_num: 4
  }
];


// ============================================================
//  🎛️ DB IMPLEMENTATION (Mocking Supabase Client API)
// ============================================================

const DB = {
  // Mocking client to avoid breaks
  client: {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      signInWithPassword: async () => ({ error: { message: 'Mode Statis Aktif' } }),
      signOut: async () => {}
    }
  },

  async getProfile() {
    return STATIC_PROFILE;
  },

  async getSchools() {
    return STATIC_SCHOOLS;
  },

  async getExperiences() {
    return STATIC_EXPERIENCES;
  },

  async getProjects() {
    return STATIC_PROJECTS;
  },

  async getMaterials() {
    return STATIC_MATERIALS;
  },

  // Auth functions return neutral/disabled states
  async login() {
    return { success: false, error: 'Database dinamis (Supabase) dinonaktifkan di edisi statis ini.' };
  },
  async logout() {},
  async getSession() { return null; },
  async isAuthenticated() { return false; },
  async uploadImage() { return null; },
  subscribeToChanges() {
    return { unsubscribe: () => {} };
  }
};
