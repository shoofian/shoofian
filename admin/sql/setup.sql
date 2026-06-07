-- ================================================================
-- SUPABASE SETUP SCRIPT — Web Profile Guru Informatika
-- Jalankan script ini di: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- ----------------------------------------------------------------
-- 1. TABEL: profile
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profile (
  id            SERIAL PRIMARY KEY,
  name          TEXT    DEFAULT '[Nama Anda]',
  tagline       TEXT    DEFAULT 'Guru Informatika & Developer',
  bio_id        TEXT    DEFAULT 'Saya adalah seorang lulusan Teknik Informatika yang kini berdedikasi penuh sebagai Guru Informatika di beberapa sekolah.',
  bio_en        TEXT    DEFAULT 'I am a graduate of Informatics Engineering now dedicated as an Informatics teacher at several schools.',
  bio2_id       TEXT    DEFAULT 'Selain mengajar, saya aktif mengembangkan proyek teknologi dan membimbing siswa untuk menciptakan karya-karya digital yang inovatif.',
  bio2_en       TEXT    DEFAULT 'Besides teaching, I actively develop technology projects and mentor students to create innovative digital works.',
  avatar        TEXT    DEFAULT '',
  stat_years    INTEGER DEFAULT 5,
  stat_students INTEGER DEFAULT 500,
  stat_projects INTEGER DEFAULT 30,
  badge_id      TEXT    DEFAULT 'Tersedia untuk Kolaborasi',
  badge_en      TEXT    DEFAULT 'Available for Collaboration',
  city          TEXT    DEFAULT '[Kota Anda]',
  email         TEXT    DEFAULT 'nama@email.com',
  whatsapp      TEXT    DEFAULT '628123456789',
  location      TEXT    DEFAULT '[Kota Anda], Indonesia',
  social_github    TEXT DEFAULT '#',
  social_linkedin  TEXT DEFAULT '#',
  social_youtube   TEXT DEFAULT '#',
  social_instagram TEXT DEFAULT '#',
  skills        JSONB   DEFAULT '[
    {"icon":"🐍","name":"Python"},
    {"icon":"🌐","name":"HTML/CSS"},
    {"icon":"⚡","name":"JavaScript"},
    {"icon":"🐘","name":"PHP"},
    {"icon":"🗄️","name":"MySQL"},
    {"icon":"🤖","name":"AI/ML"},
    {"icon":"📱","name":"Android"},
    {"icon":"🎨","name":"UI/UX"},
    {"icon":"🔧","name":"Git"},
    {"icon":"🖥️","name":"Linux"},
    {"icon":"📊","name":"Data Science"},
    {"icon":"☁️","name":"Cloud"}
  ]'::jsonb
);

-- ----------------------------------------------------------------
-- 2. TABEL: schools
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.schools (
  id        SERIAL PRIMARY KEY,
  icon      TEXT    DEFAULT '🏫',
  name      TEXT    NOT NULL,
  detail    TEXT    DEFAULT '',
  status    TEXT    DEFAULT 'Aktif',
  order_num INTEGER DEFAULT 0
);

-- ----------------------------------------------------------------
-- 3. TABEL: experiences
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experiences (
  id        SERIAL PRIMARY KEY,
  icon      TEXT    DEFAULT '📅',
  period    TEXT    DEFAULT '',
  title     TEXT    NOT NULL,
  place     TEXT    DEFAULT '',
  order_num INTEGER DEFAULT 0
);

-- ----------------------------------------------------------------
-- 4. TABEL: projects
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id          SERIAL PRIMARY KEY,
  type        TEXT    DEFAULT 'mine' CHECK (type IN ('mine','student')),
  title_id    TEXT    NOT NULL,
  title_en    TEXT    DEFAULT '',
  desc_id     TEXT    DEFAULT '',
  desc_en     TEXT    DEFAULT '',
  category_id TEXT    DEFAULT '',
  category_en TEXT    DEFAULT '',
  image       TEXT    DEFAULT '',
  tags        TEXT    DEFAULT '',
  demo        TEXT    DEFAULT '#',
  github      TEXT    DEFAULT '#',
  order_num   INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- 5. TABEL: materials
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.materials (
  id          SERIAL PRIMARY KEY,
  type        TEXT    DEFAULT 'pdf' CHECK (type IN ('pdf','slide','video')),
  title_id    TEXT    NOT NULL,
  title_en    TEXT    DEFAULT '',
  desc_id     TEXT    DEFAULT '',
  desc_en     TEXT    DEFAULT '',
  subject_id  TEXT    DEFAULT '',
  subject_en  TEXT    DEFAULT '',
  level       TEXT    DEFAULT '',
  size        TEXT    DEFAULT '',
  updated     TEXT    DEFAULT '',
  url         TEXT    DEFAULT '#',
  video_url   TEXT    DEFAULT '',
  order_num   INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================================
ALTER TABLE public.profile     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials   ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- 7. RLS POLICIES — Public READ, Authenticated WRITE
-- ================================================================

-- profile
CREATE POLICY "profile_public_read"  ON public.profile FOR SELECT USING (true);
CREATE POLICY "profile_auth_update"  ON public.profile FOR UPDATE USING (auth.role() = 'authenticated');

-- schools
CREATE POLICY "schools_public_read"  ON public.schools FOR SELECT USING (true);
CREATE POLICY "schools_auth_insert"  ON public.schools FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "schools_auth_update"  ON public.schools FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "schools_auth_delete"  ON public.schools FOR DELETE USING (auth.role() = 'authenticated');

-- experiences
CREATE POLICY "exp_public_read"  ON public.experiences FOR SELECT USING (true);
CREATE POLICY "exp_auth_insert"  ON public.experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "exp_auth_update"  ON public.experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "exp_auth_delete"  ON public.experiences FOR DELETE USING (auth.role() = 'authenticated');

-- projects
CREATE POLICY "proj_public_read"  ON public.projects FOR SELECT USING (true);
CREATE POLICY "proj_auth_insert"  ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "proj_auth_update"  ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "proj_auth_delete"  ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

-- materials
CREATE POLICY "mat_public_read"  ON public.materials FOR SELECT USING (true);
CREATE POLICY "mat_auth_insert"  ON public.materials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "mat_auth_update"  ON public.materials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "mat_auth_delete"  ON public.materials FOR DELETE USING (auth.role() = 'authenticated');

-- ================================================================
-- 8. SUPABASE STORAGE — Bucket untuk gambar
-- ================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "images_auth_upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "images_auth_update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "images_auth_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- ================================================================
-- 9. INSERT DATA DEFAULT
-- ================================================================

-- Profile (1 baris)
INSERT INTO public.profile (id, name, tagline, bio_id, bio_en, bio2_id, bio2_en,
  stat_years, stat_students, stat_projects, badge_id, badge_en,
  city, email, whatsapp, location)
VALUES (
  1,
  '[Nama Anda]',
  'Guru Informatika & Developer',
  'Saya adalah seorang lulusan Teknik Informatika yang kini berdedikasi penuh sebagai Guru Informatika di beberapa sekolah. Dengan semangat yang tinggi, saya percaya bahwa teknologi adalah kunci untuk membuka pintu peluang masa depan setiap siswa.',
  'I am a graduate of Informatics Engineering now dedicated as an Informatics teacher at several schools. I believe that technology is the key to unlocking the future, and my mission is to help students open that door.',
  'Selain mengajar, saya aktif mengembangkan proyek teknologi dan membimbing siswa untuk menciptakan karya-karya digital yang inovatif.',
  'Besides teaching, I actively develop technology projects and mentor students to create innovative digital works.',
  5, 500, 30,
  'Tersedia untuk Kolaborasi',
  'Available for Collaboration',
  '[Kota Anda]',
  'nama@email.com',
  '628123456789',
  '[Kota Anda], Indonesia'
) ON CONFLICT (id) DO NOTHING;

-- Schools
INSERT INTO public.schools (icon, name, detail, status, order_num) VALUES
  ('🏛️', 'SMA Negeri 1 [Kota Anda]', 'Informatika · Kelas X, XI, XII', 'Aktif', 1),
  ('🏭', 'SMK Teknologi [Nama SMK]',  'RPL & TKJ · Pemrograman Web',   'Aktif', 2),
  ('🏫', 'SMP Negeri [Nama SMP]',     'Informatika · Kelas VII–IX',    'Aktif', 3)
ON CONFLICT DO NOTHING;

-- Experiences
INSERT INTO public.experiences (icon, period, title, place, order_num) VALUES
  ('🎓', '2018 – 2022',    'S1 Teknik Informatika',     '[Nama Universitas Anda]',    1),
  ('👨‍🏫', '2022 – Sekarang', 'Guru Informatika',          'SMA, SMK & SMP · [Kota]',    2),
  ('💻', '2020 – Sekarang', 'Freelance Web Developer',   'Proyek Web & Aplikasi',       3)
ON CONFLICT DO NOTHING;

-- Projects
INSERT INTO public.projects (type, title_id, title_en, desc_id, desc_en, category_id, category_en, image, tags, demo, github, order_num) VALUES
  ('mine',    'Sistem Manajemen Nilai Siswa',  'Student Grade Management System',
   'Aplikasi web full-stack untuk manajemen nilai dan kehadiran siswa dengan dashboard interaktif dan laporan otomatis.',
   'A full-stack web app for managing student grades and attendance with an interactive dashboard and automated reports.',
   'Web Development', 'Web Development',
   'assets/img/proj-1.png', 'PHP,MySQL,Bootstrap,JavaScript', '#', '#', 1),

  ('student', 'Aplikasi Jadwal Pelajaran',     'Class Schedule App',
   'Aplikasi Android untuk manajemen jadwal pelajaran yang dibuat oleh siswa kelas XI RPL. Dilengkapi notifikasi reminder.',
   'An Android app for managing class schedules, created by 11th grade RPL students. Features reminder notifications.',
   'Aplikasi Mobile', 'Mobile App',
   'assets/img/proj-2.png', 'Android Studio,Java,SQLite', '#', '#', 2),

  ('student', 'Game Belajar Python',           'Python Learning Game',
   'Game edukasi berbasis web yang mengajarkan konsep dasar pemrograman Python dengan cara yang menyenangkan.',
   'A web-based educational game that teaches basic Python programming concepts in an engaging and fun way.',
   'Game Edukasi', 'Educational Game',
   'assets/img/proj-3.png', 'HTML,CSS,JavaScript', '#', '#', 3),

  ('mine',    'Platform E-Learning Sekolah',   'School E-Learning Platform',
   'Platform pembelajaran daring yang dikembangkan untuk mendukung kegiatan belajar mengajar jarak jauh di sekolah.',
   'An online learning platform developed to support remote teaching and learning activities at school.',
   'Media Pembelajaran', 'Learning Media',
   'assets/img/proj-1.png', 'Laravel,Vue.js,MySQL,REST API', '#', '#', 4),

  ('student', 'Website Portofolio Siswa',      'Student Portfolio Website',
   'Kumpulan website portofolio yang dibuat siswa kelas XII sebagai project akhir tahun. Desain kreatif dan responsif.',
   'A collection of portfolio websites created by 12th grade students as their year-end project.',
   'Web Design', 'Web Design',
   'assets/img/proj-2.png', 'HTML,CSS,JavaScript', '#', '#', 5),

  ('mine',    'Analisis Data Ujian Nasional',  'National Exam Data Analysis',
   'Visualisasi dan analisis data hasil ujian untuk membantu identifikasi area yang perlu perhatian lebih dalam pembelajaran.',
   'Visualization and analysis of exam results to help identify areas that need more attention in the learning process.',
   'Data Science', 'Data Science',
   'assets/img/proj-3.png', 'Python,Pandas,Matplotlib,Jupyter', '#', '#', 6)
ON CONFLICT DO NOTHING;

-- Materials
INSERT INTO public.materials (type, title_id, title_en, desc_id, desc_en, subject_id, subject_en, level, size, updated, url, video_url, order_num) VALUES
  ('pdf',   'Modul Pengantar Algoritma & Pemrograman',  'Introduction to Algorithms & Programming Module',
   'Modul lengkap untuk pemula yang mencakup konsep dasar algoritma, flowchart, dan pengenalan bahasa pemrograman.',
   'A complete beginner module covering basic algorithm concepts, flowcharts, and introduction to programming languages.',
   'Pemrograman Dasar', 'Basic Programming', 'SMA/SMK', '2.4 MB', '2024', '#', '', 1),

  ('slide', 'Slide: Berpikir Komputasional',             'Slides: Computational Thinking',
   'Presentasi interaktif tentang berpikir komputasional: dekomposisi, pengenalan pola, abstraksi, dan algoritma.',
   'Interactive presentation on computational thinking: decomposition, pattern recognition, abstraction, and algorithms.',
   'Informatika', 'Informatics', 'SMP/SMA', '8.1 MB', '2024', '#', '', 2),

  ('video', 'Tutorial: HTML & CSS untuk Pemula',         'Tutorial: HTML & CSS for Beginners',
   'Video tutorial komprehensif tentang dasar-dasar HTML dan CSS untuk membuat halaman web pertama Anda.',
   'A comprehensive video tutorial on the basics of HTML and CSS to create your very first web page.',
   'Pemrograman Web', 'Web Programming', 'SMK', 'YouTube', '2023',
   '#', 'https://www.youtube.com/embed/qz0aGYrrlhU', 3),

  ('pdf',   'Materi: Pengenalan Jaringan Komputer',      'Module: Introduction to Computer Networks',
   'Materi lengkap tentang konsep jaringan komputer, topologi, protokol TCP/IP, dan perangkat jaringan.',
   'Comprehensive material on computer network concepts, topologies, TCP/IP protocol, and network devices.',
   'Jaringan Komputer', 'Computer Networks', 'SMK TKJ', '3.7 MB', '2024', '#', '', 4),

  ('slide', 'Slide: Pengenalan Basis Data & SQL',        'Slides: Introduction to Database & SQL',
   'Slide pembelajaran tentang konsep basis data relasional, Entity Relationship Diagram, dan query SQL dasar.',
   'Learning slides on relational database concepts, Entity Relationship Diagrams, and basic SQL queries.',
   'Basis Data', 'Database', 'SMK RPL', '5.2 MB', '2024', '#', '', 5),

  ('video', 'Video: Belajar Python dari Nol',            'Video: Learning Python from Scratch',
   'Seri video pembelajaran Python dari dasar hingga mahir, mencakup struktur data, OOP, dan project sederhana.',
   'A Python learning video series from basics to advanced, covering data structures, OOP, and simple projects.',
   'Python', 'Python', 'SMA/SMK', 'YouTube Playlist', '2023',
   '#', 'https://www.youtube.com/embed/_uQrJ0TkZlc', 6)
ON CONFLICT DO NOTHING;

-- ================================================================
-- SELESAI! Kembali ke aplikasi dan isi SUPABASE_URL & SUPABASE_ANON_KEY
-- di file js/data.js
-- ================================================================
