/**
 * data.js — Static Data Manager (v5 - Organized Edition)
 * Web Profile Guru Informatika & Quality Assurance Analyst
 *
 * 👤 Pemilik: Wahyu Shofian
 * 📂 Menyimpan seluruh data portofolio & CV secara lokal (Statis).
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
  email: 'wahyushofian@email.com',
  whatsapp: '628123456789',
  location: 'Berau, Kalimantan Timur, Indonesia',
  
  // Sosial Media
  social_github: 'https://github.com/shoofian',
  social_linkedin: 'https://linkedin.com/in/wahyushofian',
  social_youtube: 'https://youtube.com/@WahyuShofian',
  social_instagram: 'https://instagram.com/shoofian',
  social_twitter: 'https://x.com/shoofian',
  
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
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Mengatasi Rasa Tidak Nyaman (Kelompok Lemot)',
    title_en: 'Computational Thinking: Dealing with Discomfort (Kelompok Lemot)',
    desc_id: 'Video presentasi karya siswa SMAN 4 Berau yang menerapkan konsep berpikir komputasional untuk memecahkan masalah rasa tidak nyaman.',
    desc_en: 'A presentation video by SMAN 4 Berau students applying computational thinking concepts to solve the problem of discomfort.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=hXLjh67JsqU',
    github: '#',
    video_url: 'https://www.youtube.com/embed/hXLjh67JsqU',
    order_num: 3
  },
  {
    id: 4,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Mengatasi Siswa Terlambat (Kelompok Yakin Deks)',
    title_en: 'Computational Thinking: Resolving Student Tardiness (Kelompok Yakin Deks)',
    desc_id: 'Video karya siswa yang menganalisis masalah keterlambatan sekolah menggunakan 4 pilar berpikir komputasional.',
    desc_en: 'Student video analyzing school tardiness issues using the 4 pillars of computational thinking.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=GAy63UzV26E',
    github: '#',
    video_url: 'https://www.youtube.com/embed/GAy63UzV26E',
    order_num: 4
  },
  {
    id: 5,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Melindungi Kesehatan Mental (Kelompok Trio Cyber)',
    title_en: 'Computational Thinking: Protecting Mental Health (Kelompok Trio Cyber)',
    desc_id: 'Analisis sistematis mengenai langkah-langkah praktis menjaga kesehatan mental siswa dengan pendekatan dekomposisi dan algoritma.',
    desc_en: 'Systematic analysis of practical steps to maintain student mental health using decomposition and algorithm approaches.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=MoA-w1PsxMs',
    github: '#',
    video_url: 'https://www.youtube.com/embed/MoA-w1PsxMs',
    order_num: 5
  },
  {
    id: 6,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Cara Membuat Cookies (Kelompok Venezia)',
    title_en: 'Computational Thinking: Making Cookies (Kelompok Venezia)',
    desc_id: 'Video penjelasan alur algoritma dan abstraksi dalam proses pembuatan kue kering (cookies) yang efisien.',
    desc_en: 'Video explaining the algorithm flow and abstraction in an efficient cookie-making process.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=G_-CTlIwgQU',
    github: '#',
    video_url: 'https://www.youtube.com/embed/G_-CTlIwgQU',
    order_num: 6
  },
  {
    id: 7,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Cara Membuat Es Kopi Susu (Kelompok Cihuyyy)',
    title_en: 'Computational Thinking: Making Iced Coffee Milk (Kelompok Cihuyyy)',
    desc_id: 'Penerapan pilar berpikir komputasional dalam menyusun langkah-langkah membuat es kopi susu yang nikmat.',
    desc_en: 'Applying the pillars of computational thinking in structuring the steps to make delicious iced coffee milk.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=VFKZIVz9xGk',
    github: '#',
    video_url: 'https://www.youtube.com/embed/VFKZIVz9xGk',
    order_num: 7
  },
  {
    id: 8,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Membuat Iklan Sederhana & Efektif (Sembakungan FC)',
    title_en: 'Computational Thinking: Creating Simple & Effective Ads (Sembakungan FC)',
    desc_id: 'Cara merancang strategi periklanan sederhana yang terstruktur dengan pola berpikir komputasional.',
    desc_en: 'How to design a simple structured advertising strategy using computational thinking patterns.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=GH2fZcYMgsM',
    github: '#',
    video_url: 'https://www.youtube.com/embed/GH2fZcYMgsM',
    order_num: 8
  },
  {
    id: 9,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Persiapan Menghadapi Ujian (Trio Miauw)',
    title_en: 'Computational Thinking: Preparing for Exams (Trio Miauw)',
    desc_id: 'Strategi belajar terstruktur menggunakan metode dekomposisi untuk mempersiapkan diri menghadapi ujian sekolah.',
    desc_en: 'Structured learning strategy using the decomposition method to prepare for school exams.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=YjfNQrZ_9oE',
    github: '#',
    video_url: 'https://www.youtube.com/embed/YjfNQrZ_9oE',
    order_num: 9
  },
  {
    id: 10,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Mengatur Waktu (Kelompok Nebula)',
    title_en: 'Computational Thinking: Time Management (Kelompok Nebula)',
    desc_id: 'Analisis manajemen waktu siswa agar lebih produktif dengan menggunakan prinsip abstraksi dan pengenalan pola.',
    desc_en: 'Analysis of student time management to be more productive using the principles of abstraction and pattern recognition.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=b57FCVPuZsc',
    github: '#',
    video_url: 'https://www.youtube.com/embed/b57FCVPuZsc',
    order_num: 10
  },
  {
    id: 11,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Cara Mengelola Sampah (Kelompok Kodomo)',
    title_en: 'Computational Thinking: Managing Waste (Kelompok Kodomo)',
    desc_id: 'Solusi komputasi untuk memilah dan mengolah sampah rumah tangga di lingkungan sekitar.',
    desc_en: 'Computational solution for sorting and processing household waste in the surrounding environment.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=dvwnOpc7JCY',
    github: '#',
    video_url: 'https://www.youtube.com/embed/dvwnOpc7JCY',
    order_num: 11
  },
  {
    id: 12,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Membuat Cookies yang Efektif (Kelompok Amazone)',
    title_en: 'Computational Thinking: Making Cookies Effectively (Kelompok Amazone)',
    desc_id: 'Video karya siswa tentang optimalisasi resep kue kering (cookies) dengan pendekatan berpikir komputasional.',
    desc_en: 'Student video on optimizing cookie recipes using a computational thinking approach.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=FNsM6sZwARM',
    github: '#',
    video_url: 'https://www.youtube.com/embed/FNsM6sZwARM',
    order_num: 12
  },
  {
    id: 13,
    type: 'student-computational',
    title_id: 'Berpikir Komputasional: Sekolah Adiwiyata (Kelompok Aigo)',
    title_en: 'Computational Thinking: Adiwiyata School (Kelompok Aigo)',
    desc_id: 'Langkah terstruktur untuk mewujudkan sekolah peduli lingkungan (Adiwiyata) dengan memanfaatkan pilar informatika.',
    desc_en: 'Structured steps to realize an eco-friendly school (Adiwiyata) by utilizing the pillars of informatics.',
    category_id: 'Berpikir Komputasional',
    category_en: 'Computational Thinking',
    image: '',
    tags: 'Informatika,Video,Berpikir Komputasional',
    demo: 'https://www.youtube.com/watch?v=A7pMUbVc_Vg',
    github: '#',
    video_url: 'https://www.youtube.com/embed/A7pMUbVc_Vg',
    order_num: 13
  },
  {
    id: 14,
    type: 'student-security',
    title_id: 'Keamanan Siber: Cyber Stalking (Ni Kadek Andini Dwi Putri)',
    title_en: 'Cyber Security: Cyber Stalking (Ni Kadek Andini Dwi Putri)',
    desc_id: 'Video edukasi karya siswa mengenai bahaya Cyber Stalking (penguntitan siber), dampaknya bagi korban, serta cara menghindarinya.',
    desc_en: 'Educational video by students on the dangers of Cyber Stalking, its impact on victims, and how to prevent it.',
    category_id: 'Keamanan Siber',
    category_en: 'Cyber Security',
    image: '',
    tags: 'Informatika,Video,Keamanan Siber',
    demo: 'https://www.youtube.com/watch?v=WQuRPinEpK8',
    github: '#',
    video_url: 'https://www.youtube.com/embed/WQuRPinEpK8',
    order_num: 14
  },
  {
    id: 15,
    type: 'student-security',
    title_id: 'Keamanan Siber: Cyber Hacking (Miftahul Huda)',
    title_en: 'Cyber Security: Cyber Hacking (Miftahul Huda)',
    desc_id: 'Video penjelasan karya siswa mengenai peretasan siber (Cyber Hacking), perbedaan etika peretasan, dan dasar-dasar pertahanan siber.',
    desc_en: 'Student explanatory video on cyber hacking, ethical hacking differences, and basics of cyber defense.',
    category_id: 'Keamanan Siber',
    category_en: 'Cyber Security',
    image: '',
    tags: 'Informatika,Video,Keamanan Siber',
    demo: 'https://www.youtube.com/watch?v=0V49fSqCFuI',
    github: '#',
    video_url: 'https://www.youtube.com/embed/0V49fSqCFuI',
    order_num: 15
  },
  {
    id: 16,
    type: 'student-security',
    title_id: 'Keamanan Siber: Cyber Bullying (Alifazieatun Nasuroh)',
    title_en: 'Cyber Security: Cyber Bullying (Alifazieatun Nasuroh)',
    desc_id: 'Video edukasi karya siswa tentang bahaya perundungan siber (Cyber Bullying) di kalangan remaja dan bagaimana cara menyikapinya.',
    desc_en: 'Student educational video on the dangers of Cyber Bullying among teenagers and how to handle it.',
    category_id: 'Keamanan Siber',
    category_en: 'Cyber Security',
    image: '',
    tags: 'Informatika,Video,Keamanan Siber',
    demo: 'https://www.youtube.com/watch?v=SRnABrun-ns',
    github: '#',
    video_url: 'https://www.youtube.com/embed/SRnABrun-ns',
    order_num: 16
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
  },
  {
    id: 5,
    type: 'video',
    title_id: 'Analisis Data (3): Pengolahan Data',
    title_en: 'Data Analysis (3): Data Processing',
    desc_id: 'Pembelajaran praktis mengenai teknik pengolahan data menggunakan fungsi-fungsi dasar spreadsheet.',
    desc_en: 'Practical learning on data processing techniques using basic spreadsheet functions.',
    subject_id: 'Analisis Data',
    subject_en: 'Data Analysis',
    level: 'SMA / SMK',
    size: 'YouTube',
    updated: '2024',
    url: 'https://www.youtube.com/watch?v=LqUW3MxU0Pc',
    video_url: 'https://www.youtube.com/embed/LqUW3MxU0Pc',
    order_num: 5
  },
  {
    id: 6,
    type: 'video',
    title_id: 'Analisis Data (4): Visualisasi Data',
    title_en: 'Data Analysis (4): Data Visualization',
    desc_id: 'Materi pembuatan grafik dan bagan untuk menyajikan hasil analisis data secara visual dan komunikatif.',
    desc_en: 'Material on creating charts and graphs to present data analysis results visually and communicatively.',
    subject_id: 'Analisis Data',
    subject_en: 'Data Analysis',
    level: 'SMA / SMK',
    size: 'YouTube',
    updated: '2024',
    url: 'https://www.youtube.com/watch?v=kznAt89pSus',
    video_url: 'https://www.youtube.com/embed/kznAt89pSus',
    order_num: 6
  },
  {
    id: 7,
    type: 'video',
    title_id: 'Analisis Data (5): Penarikan Kesimpulan & Tugas',
    title_en: 'Data Analysis (5): Conclusion & Assignment',
    desc_id: 'Panduan menafsirkan data hasil pengolahan untuk menarik kesimpulan serta penjelasan tugas praktek.',
    desc_en: 'Guide to interpreting processed data to draw conclusions, along with practice assignment explanations.',
    subject_id: 'Analisis Data',
    subject_en: 'Data Analysis',
    level: 'SMA / SMK',
    size: 'YouTube',
    updated: '2024',
    url: 'https://www.youtube.com/watch?v=HmGlklA8E3Q',
    video_url: 'https://www.youtube.com/embed/HmGlklA8E3Q',
    order_num: 7
  },
  {
    id: 8,
    type: 'video',
    title_id: 'Analisis Data (6): Solusi Grafik Spreadsheet Tidak Muncul',
    title_en: 'Data Analysis (6): Troubleshooting Invisible Spreadsheet Charts',
    desc_id: 'Tip pemecahan masalah (troubleshooting) saat grafik atau chart tidak terbuat secara benar di Google Sheets.',
    desc_en: 'Troubleshooting tips when charts or graphs do not generate correctly in Google Sheets.',
    subject_id: 'Analisis Data',
    subject_en: 'Data Analysis',
    level: 'SMA / SMK',
    size: 'YouTube',
    updated: '2024',
    url: 'https://www.youtube.com/watch?v=M-bWb_l52_E',
    video_url: 'https://www.youtube.com/embed/M-bWb_l52_E',
    order_num: 8
  },
  {
    id: 9,
    type: 'video',
    title_id: 'Praktek Analisis Data: Pembersihan, Pengolahan & Visualisasi',
    title_en: 'Data Analysis Practice: Cleaning, Processing & Visualization',
    desc_id: 'Studi kasus lengkap praktek analisis data dari pembersihan data kotor, pengolahan, hingga visualisasi akhir.',
    desc_en: 'Complete case study on data analysis practice, from raw data cleaning, processing, to final visualization.',
    subject_id: 'Analisis Data',
    subject_en: 'Data Analysis',
    level: 'SMA / SMK',
    size: 'YouTube',
    updated: '2024',
    url: 'https://www.youtube.com/watch?v=ZNx9tGgm9ec',
    video_url: 'https://www.youtube.com/embed/ZNx9tGgm9ec',
    order_num: 9
  },
  {
    id: 10,
    type: 'video',
    title_id: 'Praktek Analisis Data: Analisis Korelasi',
    title_en: 'Data Analysis Practice: Correlation Analysis',
    desc_id: 'Video tutorial menghitung dan menafsirkan nilai korelasi antar variabel data menggunakan spreadsheet.',
    desc_en: 'Tutorial video on calculating and interpreting correlation values between data variables using spreadsheets.',
    subject_id: 'Analisis Data',
    subject_en: 'Data Analysis',
    level: 'SMA / SMK',
    size: 'YouTube',
    updated: '2024',
    url: 'https://www.youtube.com/watch?v=yUABDtfMHQc',
    video_url: 'https://www.youtube.com/embed/yUABDtfMHQc',
    order_num: 10
  }
];


// ============================================================
//  🎛️ DB IMPLEMENTATION (Mocking Supabase Client API)
// ============================================================

const DB = {
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
