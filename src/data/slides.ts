export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  label?: 'LIVE' | 'SCREENSHOT';
  type: 'cover' | 'list' | 'diagram' | 'demo' | 'conclusion';
  points?: string[];
  talkingPoint: string;
  imageUrl?: string;
  imageUrls?: string[];
  diagramReady?: boolean;
}

export const slides: SlideData[] = [
  {
    id: 1,
    title: "SEAGMA PRESENCE",
    subtitle: "Sistem Presensi Mobile Terintegrasi\nSAGAMUDA",
    type: 'cover',
    talkingPoint: "Selamat pagi semuanya. Hari ini saya akan mendemokan SEAGMA PRESENCE—sistem presensi mobile yang fokus pada kecepatan, keamanan, dan kemudahan HR."
  },
  {
    id: 2,
    title: "Masalah yang Diselesaikan",
    type: 'list',
    points: [
      "Absensi manual mudah dimanipulasi: Catatan daftar hadir di kertas atau mesin kuno sangat gampang diubah jamnya tanpa ada bukti foto aktual.",
      "Titip absen oleh teman: Celah klasik di mana karyawan bisa menitipkan ID card atau menyuruh rekannya untuk memalsukan kehadiran.",
      "Fake GPS & Lokasi Palsu: Karyawan nakal memakai aplikasi pengubah koordinat (mock location) seolah sudah di site padahal belum.",
      "Tidak bisa absen saat offline: Sistem lama sering lumpuh atau gagal merekam data jika karyawan ditugaskan di pedalaman tanpa sinyal.",
      "Rekap bulanan manual (Excel): Tim HR membuang ratusan jam setiap bulan hanya untuk mengkroscek tumpukan data mentah secara manual.",
      "Karyawan lapangan sulit divalidasi: Kurangnya pengawasan visual untuk memastikan posisi dan kondisi real karyawan secara presisi."
    ],
    talkingPoint: "Absensi manual itu sangat rentan dari kecurangan seperti titip absen hingga penggunaan aplikasi pemalsu lokasi atau Fake GPS. Di sisi lain, ada juga kendala teknis di mana karyawan di pelosok site tidak bisa absen karena blank spot sinyal. Belum lagi di akhir bulan tim HR harus stres merekap data berjam-jam secara manual pakai Excel. Inilah sederet masalah fatal yang akan disingkirkan sepenuhnya oleh Seagma Presence."
  },
  {
    id: 3,
    title: "Arsitektur & Teknologi",
    type: 'diagram',
    points: [
      "Offline-First: Absen tetap jalan meski tanpa sinyal (Isar Database).",
      "Auto-Sync: Data sinkron otomatis saat internet kembali aktif.",
      "Secure: Validasi NTP Time, Anti Fake GPS, dan Device Binding."
    ],
    talkingPoint: "Arsitektur offline-first menjamin karyawan tetap bisa absen di lokasi terpencil. Data tersimpan di HP dan tersinkronisasi otomatis saat mendapat sinyal."
  },
  {
    id: 4,
    title: "Onboarding & Setup",
    subtitle: "Langkah awal penggunaan aplikasi",
    label: 'SCREENSHOT',
    type: 'demo',
    imageUrls: ["foto/1.png", "foto/2.png", "foto/3.png"],
    talkingPoint: "Onboarding & Setup adalah proses wajib pertama kali bagi karyawan untuk mendaftarkan wajah dan perangkat keras mereka ke dalam sistem. Fungsinya sebagai lapisan fondasi keamanan utama (Device Binding); mengunci akun karyawan secara permanen ke satu HP spesifik sehingga mustahil untuk dipalsukan atau dilogin melalui HP lain."
  },
  {
    id: 5,
    title: "Demo Utama Karyawan",
    subtitle: "Fitur harian operasional",
    label: 'LIVE',
    type: 'list',
    points: [
      "Proses Presensi & Foto Selfie: Karyawan absen dengan verifikasi wajah/biometrik dan validasi kordinat.",
      "Riwayat Kehadiran Lengkap: Memeriksa jejak jam masuk dan jam pulang secara transparan setiap hari.",
      "Pengaturan Profil: Mengelola data personal, mereset password, dan cek shift kerja via aplikasi.",
      "Security Violation (Fake GPS): Demo saat sistem memblokir presensi karena mendeteksi penggunaan Fake GPS."
    ],
    talkingPoint: "Sekarang mari kita lihat langsung aplikasinya secara live. Saya akan menunjukkan Dashboard, cara melakukan presensi dengan geofencing, dan bagaimana sistem mendeteksi kecurangan."
  },
  {
    id: 6,
    title: "Skenario Khusus User",
    subtitle: "Lembur, Izin, dan Tugas Luar",
    label: 'SCREENSHOT',
    type: 'demo',
    imageUrls: ["foto/gamas.png", "foto/izin.png", "foto/lembur 1.png", "foto/lembur 2.png"],
    talkingPoint: "Pengajuan Izin, Lembur, dan Tugas Luar (GAMAS) dilakukan langsung dari aplikasi. Untuk perizinan (misal sakit/cuti), karyawan mengisi rentang tanggal dan mengunggah foto bukti seperti surat dokter. Untuk Lembur, saat jadwal pulang tiba, sistem akan memunculkan menu konfirmasi apakah ingin checkout atau lanjut lembur. Jika memilih lembur, karyawan wajib mengisi form klaim yang mewajibkan unggah foto bukti pekerjaan beserta deskripsi laporannya. Proses serupa berlaku untuk Tugas Luar (GAMAS), di mana sistem akan melacak lokasi dinas dan mewajibkan pelaporan foto aktual di lapangan. Seluruh pengajuan ini akan otomatis masuk ke panel Approval untuk ditinjau oleh HR."
  },
  {
    id: 7,
    title: "PANEL ADMIN / HR",
    type: 'cover',
    subtitle: "Kendali Penuh Manajemen SDM",
    talkingPoint: "Sekarang kita beralih ke sisi admin. Di sini semua data dikelola, dipantau, dan divalidasi oleh departemen HR."
  },
  {
    id: 8,
    title: "Demo Kontrol & Pelaporan",
    subtitle: "Pusat Kendali & Monitoring Live",
    label: 'LIVE',
    type: 'list',
    points: [
      "Dashboard Ringkasan Operasional: Memantau ringkasan statistik kehadiran, keterlambatan, dan status harian secara real-time.",
      "Setup Master (Karyawan, Shift, Lokasi): Mengatur data inti perusahaan, jadwal kerja fleksibel, dan radius geofencing/lokasi site.",
      "Approval Center (Izin & Lembur): Memproses persetujuan atau penolakan pengajuan cuti, sakit, hingga klaim lembur.",
      "Koreksi Absen: Fitur perbaikan status kehadiran akibat human error (misal: user salah klik/telat checkout saat lembur, atau kesalahan klik admin saat memproses pengajuan).",
      "Ekspor Laporan Rekap (PDF/Excel): Men-generate rekapan data kehadiran bulanan secara otomatis siap cetak atau olah (payroll)."
    ],
    talkingPoint: "Mari kita buka Dashboard Admin secara live. Saya akan tunjukkan cara mengatur shift, memantau pergerakan karyawan secara real-time, dan menarik laporan PDF hanya dalam hitungan detik."
  },
  {
    id: 9,
    title: "Skenario Fraud Prevention",
    type: 'list',
    points: [
      "Layer 1 (Deteksi Root & Jailbreak): Memblokir akses aplikasi dari perangkat yang sistem keamanan bawaannya telah diretas atau dimodifikasi.",
      "Layer 2 (Deteksi Fake GPS & Mock Loc): Secara langsung memutus proses presensi jika terdeteksi penggunaan aplikasi pemalsu kordinat lokasi.",
      "Layer 3 (Deteksi Emulator PC): Mencegah kecurangan instalasi jarak jauh dengan memblokir absen yang dilakukan melalui simulasi Android di komputer.",
      "Layer 4 (Sinkronisasi Waktu NTP): Memvalidasi waktu presensi ke jaringan server pusat sehingga mengubah jam HP secara manual tidak akan memanipulasi data."
    ],
    talkingPoint: "Kami sangat serius soal keamanan. Ada 4 lapis proteksi yang memastikan data yang masuk adalah valid dan jujur."
  },
  {
    id: 10,
    title: "RINGKASAN KEUNGGULAN",
    type: 'conclusion',
    points: [
      "Offline-First & Auto-Sync: Presensi tetap aman tanpa sinyal seluler dan data otomatis sinkron ke server saat koneksi pulih.",
      "Anti-Fraud 4 Lapis + Device Binding: Memblokir pemalsuan lokasi, memanipulasi waktu, serta mencegah absensi melalui perangkat lain.",
      "Manajemen Shift & Lokasi Fleksibel: Mendukung sistem geofencing multi-lokasi yang dinamis sesuai jadwal dan area dinas karyawan.",
      "Approval Center Terpusat: Memudahkan HR memantau dan memproses seluruh pengajuan izin, cuti, serta lembur dalam satu antarmuka.",
      "Export Laporan Otomatis: Memproduksi rekapan data yang komprehensif dan siap diunduh (PDF/Excel) untuk keperluan perhitungan payroll."
    ],
    talkingPoint: "SEAGMA PRESENCE adalah solusi lengkap untuk presensi modern yang efisien dan aman."
  },
  {
    id: 11,
    title: "TERIMA KASIH",
    subtitle: "Ada Pertanyaan?",
    type: 'cover',
    talkingPoint: "Terima kasih atas waktu dan perhatiannya. Silakan jika ada sesi tanya jawab dari penonton."
  }
];
