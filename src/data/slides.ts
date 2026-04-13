export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  type: 'cover' | 'list' | 'diagram' | 'video' | 'conclusion';
  points?: string[];
  talkingPoint: string;
  videoUrl?: string;
  diagramReady?: boolean;
}

export const slides: SlideData[] = [
  {
    id: 1,
    title: "SEAGMA PRESENCE",
    subtitle: "Sistem Presensi Mobile Terintegrasi\nSAGAMUDA",
    type: 'cover',
    talkingPoint: "Selamat pagi/siang semuanya. Hari ini saya akan mempresentasikan dan mendemokan aplikasi SEAGMA PRESENCE — sistem presensi mobile yang kami bangun khusus untuk kebutuhan operasional perusahaan."
  },
  {
    id: 2,
    title: "Masalah yang Diselesaikan",
    type: 'list',
    points: [
      "Absensi manual mudah dimanipulasi",
      "Titip absen oleh teman",
      "Fake GPS / lokasi palsu",
      "Tidak bisa absen saat offline",
      "Rekap bulanan manual (Excel)",
      "Karyawan lapangan sulit divalidasi"
    ],
    talkingPoint: "Ini adalah masalah-masalah yang sering terjadi pada sistem presensi konvensional. Karyawan bisa titip absen, pakai fake GPS, atau bahkan manipulasi waktu HP. Saat offline, absensi jadi tidak mungkin. Dan rekap bulanan masih harus dikerjakan manual. Aplikasi kami sudah punya solusi untuk semua masalah ini."
  },
  {
    id: 3,
    title: "Arsitektur & Teknologi",
    type: 'diagram',
    points: [
      "Offline-First Architecture",
      "Tech Stack: Flutter, GetX, PocketBase, FCM",
      "Local Storage: Isar DB"
    ],
    talkingPoint: "Aplikasi ini dibangun dengan arsitektur Offline-First. Artinya, semua data disimpan dulu di database lokal HP menggunakan Isar, lalu otomatis dikirim ke server PocketBase saat koneksi tersedia. Jadi karyawan di lokasi tanpa sinyal pun tetap bisa melakukan absensi."
  },
  {
    id: 4,
    title: "Demo: Login",
    type: 'video',
    videoUrl: "04_login.mp4",
    talkingPoint: "Ini adalah tampilan login. Karyawan masuk menggunakan email dan password yang sudah didaftarkan admin. Setelah login berhasil, sistem akan memeriksa apakah perangkat ini sudah terdaftar atau belum. Jika belum, karyawan akan diarahkan ke halaman Onboarding."
  },
  {
    id: 5,
    title: "Demo: Proses Onboarding Baru",
    type: 'video',
    videoUrl: "07_onboarding_step3.mp4",
    talkingPoint: "Karyawan baru melewati 3 tahap otomatis: verifikasi profil, Device Binding (satu akun satu HP), dan simulasi GPS untuk memastikan perangkat siap. Ini menjamin keamanan sejak hari pertama."
  },
  {
    id: 6,
    title: "Demo: Dashboard Karyawan",
    type: 'video',
    videoUrl: "08_home_dashboard.mp4",
    talkingPoint: "Halaman utama menampilkan sapaan dinamis, shift aktif, status kehadiran hari ini, dan diagnostik perangkat real-time (WiFi, GPS, Sync Waktu) untuk menjamin akurasi data."
  },
  {
    id: 7,
    title: "Demo: Presensi & Deteksi Terlambat",
    type: 'video',
    videoUrl: "09_checkin_normal.mp4",
    talkingPoint: "Presensi dilakukan dengan validasi geofencing dan foto selfie. Jika melewati batas toleransi yang diatur admin, sistem otomatis mencatat status 'Terlambat' beserta durasinya."
  },
  {
    id: 8,
    title: "Demo: Checkout + Overtime",
    type: 'video',
    videoUrl: "11_checkout_overtime.mp4",
    talkingPoint: "Saat checkout melebihi jam shift, sistem menawarkan klaim lembur otomatis. Admin bisa mereview bukti lembur sebelum menyetujuinya."
  },
  {
    id: 9,
    title: "Demo: Mode GAMAS (Tugas Luar)",
    type: 'video',
    videoUrl: "12_gamas_mode.mp4",
    talkingPoint: "Untuk tugas luar kantor, ada Mode GAMAS yang mem-bypass radius geofencing namun wajib menyertakan deskripsi tugas dan koordinat GPS untuk audit trail."
  },
  {
    id: 10,
    title: "Demo: Riwayat Kehadiran",
    type: 'video',
    videoUrl: "13_history.mp4",
    talkingPoint: "Karyawan bisa memantau riwayat kehadiran lengkap dengan filter waktu. Status hadir, telat, atau alpa terlihat jelas melalui indikator warna dan emoji."
  },
  {
    id: 11,
    title: "Demo: Pengajuan Izin/Cuti/Sakit",
    type: 'video',
    videoUrl: "14_leave_request.mp4",
    talkingPoint: "Pengajuan izin bisa dilakukan langsung dari aplikasi disertai bukti (seperti foto surat dokter). Status pending akan diupdate secara real-time setelah admin mereview."
  },
  {
    id: 12,
    title: "Demo: Notifikasi & Profil",
    type: 'video',
    videoUrl: "16_profile.mp4",
    talkingPoint: "Karyawan menerima notifikasi otomatis untuk pengingat absen dan pengumuman. Di bagian profil, mereka bisa mengelola data pribadi dan foto profil."
  },
  {
    id: 13,
    title: "PANEL ADMIN / HR",
    type: 'cover',
    subtitle: "Manajemen SDM & Operasional",
    talkingPoint: "Sekarang kita beralih ke sisi admin. Panel ini memberikan kontrol penuh terhadap ekosistem presensi, mulai dari pengelolaan data hingga pelaporan otomatis."
  },
  {
    id: 14,
    title: "Demo: Admin Dashboard",
    type: 'video',
    videoUrl: "18_admin_dashboard.mp4",
    talkingPoint: "Dashboard admin menampilkan ringkasan operasional real-time: total kehadiran, izin pending, hingga daftar karyawan yang alpa hari ini."
  },
  {
    id: 15,
    title: "Demo: Setup (Karyawan, Shift, Lokasi)",
    type: 'video',
    videoUrl: "19_employee_management.mp4",
    talkingPoint: "Admin mengelola seluruh ekosistem di sini: mengatur shift kerja yang fleksibel, memetakan lokasi kantor via Google Maps, dan mengunci Device ID karyawan."
  },
  {
    id: 16,
    title: "Demo: Approval Center",
    type: 'video',
    videoUrl: "22_approval_center.mp4",
    talkingPoint: "Satu tempat untuk memproses semua permintaan: izin, klaim lembur, hingga tugas luar (GAMAS). Admin bisa melakukan approval atau penyesuaian data secara instan."
  },
  {
    id: 17,
    title: "Demo: Live Attend & Broadcast",
    type: 'video',
    videoUrl: "23_live_broadcast.mp4",
    talkingPoint: "Admin bisa memantau pergerakan karyawan secara live dan mengirim pengumuman massal melalui Push Notification terintegrasi Firebase."
  },
  {
    id: 18,
    title: "Demo: Export Laporan PDF",
    type: 'video',
    videoUrl: "24_export_pdf.mp4",
    talkingPoint: "Laporan rekap bulanan bisa ditarik dalam format PDF resmi atau CSV untuk kebutuhan payroll, lengkap dengan detail kehadiran dan lembur."
  },
  {
    id: 19,
    title: "SISTEM KEAMANAN MULTI-LAYER",
    type: 'list',
    points: [
      "Layer 1: Deteksi Root/Jailbreak",
      "Layer 2: Deteksi Fake GPS (Double Lock)",
      "Layer 3: Deteksi Emulator",
      "Layer 4: Deteksi Manipulasi Waktu (NTP)",
      "Bonus: Device Binding (1 Akun = 1 HP)"
    ],
    talkingPoint: "Keamanan adalah prioritas. Kami melindungi data dari manipulasi lokasi, waktu, dan perangkat melalui 4 lapis keamanan otomatis."
  },
  {
    id: 20,
    title: "Demo: Security Violation",
    type: 'video',
    videoUrl: "26_security_violation.mp4",
    talkingPoint: "Sistem akan langsung memblokir akses jika mendeteksi pelanggaran keamanan. Layar pelanggaran tidak bisa dilewati sampai masalah diperbaiki."
  },
  {
    id: 21,
    title: "Skenario Operasional & Human Error",
    type: 'list',
    points: [
      "Lupa Absen: Push reminder otomatis",
      "Internet Mati: Offline-First Architecture",
      "Ganti HP Baru: Admin Reset Device ID",
      "Absen Hari Libur: Validasi Work Days"
    ],
    talkingPoint: "Sistem kami dirancang untuk menangani masalah umum seperti lupa absen atau koneksi internet yang tidak stabil melalui arsitektur offline-first dan sistem reminder."
  },
  {
    id: 22,
    title: "Skenario Keamanan & Fraud Prevention",
    type: 'list',
    points: [
      "Fake GPS: Double Lock Detection",
      "Titip Absen: Device Binding + Selfie Wajib",
      "Manipulasi Jam: Sinkronisasi NTP Server",
      "Luar Radius: Geofencing Metering"
    ],
    talkingPoint: "Untuk pencegahan fraud, kami menggunakan kombinasi penguncian perangkat, deteksi lokasi berlapis, dan sinkronisasi waktu internet yang tidak bisa dimanipulasi user."
  },
  {
    id: 23,
    title: "RINGKASAN KEUNGGULAN",
    type: 'conclusion',
    points: [
      "Offline-First & Auto-Sync",
      "Anti-Fraud 4 Lapis + Device Binding",
      "Manajemen Shift & Lokasi Fleksibel",
      "Approval Center Terpusat",
      "Export Laporan Otomatis"
    ],
    talkingPoint: "Demikian demonstrasi SEAGMA PRESENCE. Sistem yang efisien, aman, dan mempermudah operasional HR Anda. Apakah ada pertanyaan?"
  }
];
