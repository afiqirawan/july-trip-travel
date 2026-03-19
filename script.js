// 1. DATA GUDANG (Simpan semua info pulau di sini)
const daftarTrip = {
    'pari': {
        nama: 'Pulau Pari Heritage',
        badge: 'Best Seller',
        harga: '375.000',
        gambar: 'image/kartu2.png',
        fasilitas: ['Tiket Kapal PP', 'Homestay AC', 'Makan 3x', 'Alat Snorkeling', 'Sepeda Santai', 'Dokumentasi Underwater'],
        itinerary: {
            day1: [
                { jam: '07.00', kegiatan: 'Kumpul di Dermaga Muara Angke' },
                { jam: '10.30', kegiatan: 'Check-in Homestay & Makan Siang' },
                { jam: '13.00', kegiatan: 'Snorkeling & Foto Underwater' }
            ],
            day2: [
                { jam: '05.30', kegiatan: 'Sunrise di Pantai Bintang' },
                { jam: '08.00', kegiatan: 'Sarapan & Bersepeda' },
                { jam: '12.00', kegiatan: 'Kapal pulang ke Jakarta' }
            ]
        }
    },
    'harapan': {
        nama: 'Pulau Harapan Adventure',
        badge: 'Favorite',
        harga: '450.000',
        gambar: 'image/harapan2.jpg',
        fasilitas: ['Tiket Kapal PP', 'Homestay AC', 'Makan 3x', 'Kapal Jelajah Pulau', 'Alat Snorkeling', 'Guide Lokal'],
        itinerary: {
            day1: [
                { jam: '07.00', kegiatan: 'Kumpul di Dermaga' },
                { jam: '13.00', kegiatan: 'Jelajah Pulau Bira & Bulat' }
            ],
            day2: [
                { jam: '08.00', kegiatan: 'Snorkeling Time' },
                { jam: '11.00', kegiatan: 'Persiapan Pulang' }
            ]
        }
    },
    'private-harapan-speedboat': {
        nama: 'Premium Trip Pulau Harapan',
        badge: 'Speedboat Express',
        harga: '850.000',
        gambar: 'image/kartu5.png',
        fasilitas: [
            'Speedboat Marina Ancol PP (1.5 Jam)',
            'VIP Homestay AC Terbaik',
            'Makan Prasmanan Menu Spesial',
            'Island Hopping Eksklusif',
            'Alat Snorkeling Lengkap',
            'Dokumentasi iPhone & Drone',
            'Bonus 1 Pulau Ekstra',
            'Tour Guide Profesional'
        ],
        itinerary: {
            day1: [
                { jam: '07.30', kegiatan: 'Kumpul di Dermaga 16 Marina Ancol' },
                { jam: '08.00', kegiatan: 'Speedboat berangkat menuju Pulau Harapan' },
                { jam: '09.30', kegiatan: 'Tiba, Welcome Drink & Check-in VIP' },
                { jam: '13.00', kegiatan: 'Snorkeling & Foto Drone (P. Kayu Angin)' },
                { jam: '16.30', kegiatan: 'Hunting Sunset di Pulau Bulat' }
            ],
            day2: [
                { jam: '05.30', kegiatan: 'Sunrise di Dermaga Harapan' },
                { jam: '08.00', kegiatan: 'Sarapan & Jelajah Pulau Ekstra' },
                { jam: '10.30', kegiatan: 'Kembali ke Homestay & Packing' },
                { jam: '14.00', kegiatan: 'Speedboat kembali ke Marina Ancol' }
            ]
        }
    }
};

let tripTerpilih = null;

// 2. FUNGSI BUKA MODAL
function openModal(id) {
    const data = daftarTrip[id];
    if (!data) return;

    tripTerpilih = data; // Simpan sementara data yg diklik

    // Isi konten dasar ke ID yang ada di HTML lo
    document.getElementById('modal-title').innerText = data.nama;
    document.getElementById('modal-badge').innerText = data.badge;
    document.getElementById('modal-img').src = data.gambar;
    
    // Jika ada elemen harga di modal, isi juga
    const priceElem = document.getElementById('modal-price');
    if(priceElem) priceElem.innerText = data.harga;

    // Isi Fasilitas (Looping biar rapi)
    const listFasilitas = document.getElementById('modal-facilities');
    listFasilitas.innerHTML = '';
    data.fasilitas.forEach(f => {
        listFasilitas.innerHTML += `<li class="flex items-center gap-2"><span>✅</span> ${f}</li>`;
    });

    // Default tampilin Itinerary Day 1
    switchDay(1);

    // Munculkan Modal (Hapus class hidden)
    const modal = document.getElementById('modal-detail');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Kunci scroll body biar ga balapan
    document.body.style.overflow = 'hidden';
}

// 3. FUNGSI GANTI HARI (ITINERARY)
function switchDay(hari) {
    if (!tripTerpilih) return;
    
    const container = document.getElementById('modal-itinerary');
    const jadwal = hari === 1 ? tripTerpilih.itinerary.day1 : tripTerpilih.itinerary.day2;
    
    // Update Style Tombol (Biar ketauan mana yg aktif)
    const btn1 = document.getElementById('btn-day1');
    const btn2 = document.getElementById('btn-day2');
    
    if(hari === 1) {
        btn1.classList.add('bg-orange-500', 'text-white');
        btn2.classList.remove('bg-orange-500', 'text-white');
    } else {
        btn2.classList.add('bg-orange-500', 'text-white');
        btn1.classList.remove('bg-orange-500', 'text-white');
    }

    // Render Jadwal
    container.innerHTML = '';
    jadwal.forEach(item => {
        container.innerHTML += `
            <div class="relative pl-2">
                <div class="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-white border-4 border-orange-500"></div>
                <p class="text-[10px] font-black text-orange-500 uppercase mb-0.5">${item.jam} WIB</p>
                <p class="text-slate-700 text-sm font-bold leading-tight">${item.kegiatan}</p>
            </div>
        `;
    });
}

// 4. FUNGSI TUTUP MODAL
function closeModal() {
    const modal = document.getElementById('modal-detail');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto'; // Aktifkan scroll lagi
}

// Tambahan: Nutup modal kalau klik area luar (background hitam)
window.onclick = function(event) {
    const modal = document.getElementById('modal-detail');
    if (event.target == modal) {
        closeModal();
    }
}


//POP UP JADWAL 
// --- FUNGSI KHUSUS MODAL JADWAL ---

function openJadwal() {
    const modalJadwal = document.getElementById('modal-jadwal');
    const contentJadwal = document.getElementById('modal-content');
    
    modalJadwal.classList.remove('hidden');
    modalJadwal.classList.add('flex');
    
    // Animasi sedikit biar smooth
    setTimeout(() => {
        contentJadwal.classList.remove('scale-95');
        contentJadwal.classList.add('scale-100');
    }, 10);

    document.body.style.overflow = 'hidden'; // Kunci scroll background
}

function closeJadwal() {
    const modalJadwal = document.getElementById('modal-jadwal');
    const contentJadwal = document.getElementById('modal-content');
    
    contentJadwal.classList.remove('scale-100');
    contentJadwal.classList.add('scale-95');
    
    setTimeout(() => {
        modalJadwal.classList.add('hidden');
        modalJadwal.classList.remove('flex');
        document.body.style.overflow = 'auto'; // Aktifkan scroll lagi
    }, 200);
}

// Tutup modal jadwal kalau user klik di area hitam/blur
document.getElementById('modal-jadwal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeJadwal();
    }
});

// whatsapp.js - Khusus buat ngurusin kirim pesan ke WA

function updateWALinkWithDate(event) {
    // 1. Ambil elemen-elemen yang dibutuhin
    const titleElem = document.getElementById('modal-title');
    const dateElem = document.getElementById('booking-date');
    const priceElem = document.getElementById('modal-price');

    // 2. Ambil value-nya (dengan fallback kalau data kosong)
    const tripName = titleElem ? titleElem.innerText : "Trip";
    const bookingDate = dateElem ? dateElem.value : "";
    const tripPrice = priceElem ? priceElem.innerText : "Cek Harga";
    
    // --- KONFIGURASI ADMIN ---
    const phone = "6281225147256"; 
    // -------------------------

    // 3. Validasi: Jika tanggal kosong, stop di sini.
    if (!bookingDate) {
        alert("Waduh, tanggalnya belum dipilih nih! Pilih dulu ya biar Admin bisa cek slot. 😊");
        if (event) event.preventDefault(); 
        return false;
    }

    // 4. Rakit pesan otomatis (Format rapi pakai Bold di WA)
    const message = `Halo Admin July Trip! 👋%0A%0ASaya mau tanya ketersediaan slot untuk:%0A📍 *Paket:* ${tripName}%0A📅 *Rencana Tanggal:* ${bookingDate}%0A💰 *Harga:* Rp ${tripPrice}%0A%0AApakah masih tersedia? Terima kasih!`;

    // 5. EKSEKUSI: Buka WhatsApp langsung di tab baru
    const waURL = `https://wa.me/${phone}?text=${message}`;
    window.open(waURL, '_blank');

    // Optional: Mencegah link standar berjalan kalau lo pakai tag <a>
    if (event) event.preventDefault();
}