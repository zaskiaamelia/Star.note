// ============================================================
// 📝 KONFIGURASI — EDIT BAGIAN INI SESUAI KEINGINANMU
// ============================================================

// Email kamu — pesan dari user akan dikirim ke sini
// Ganti ini:
const CREATOR_EMAIL = "zaskiaamelia833@gmail.com";
const notesData = [
    {
        day: 1,
        title: "Day 1 ✨",
        content: "Welcome to Star Notes! Ini bintang pertama!. Semoga hari ini lebih baik dari hari kemarin ya, kak!. 🌟"
    },
    {
        day: 2,
        title: "Day 2 🦁",
        content: "asikk, day 2 buka notesnya nih. kamu kok ga buka roblox lagi sih?! ayo mabar, aku ada rekomen map."
    },
    {
        day: 3,
        title: "Day 3 😊",
        content: "I hope beautiful things happen to you and when they do, i hope you can believe that you are worthy of every single one of them."
    },
    {
        day: 4,
        title: "Day 4 🌙",
        content: "Semoga apa yang udah hilang digantikan sama yang lebih gacorrrrr angjay gurinjay"
    },
    {
        day: 5,
        title: "Day 5 💎",
        content: "P P APAHHHH. Pohon pisang daunnya layu, bisa dijadikan pupuk di sawah, saat abang bilang i laph yu, ku cuma bisa bilang, cius miapah 😦"
    },
    {
        day: 6,
        title: "Day 6 🌈",
        content: "Makin hari makin imut, kukira siapa, ternyata akyuhhh."
    },
    {
        day: 7,
        title: "Day 7 🙏",
        content: "Jeruk nipis jeruk mandarin, hai manis lagi ngapain? jangan lupa makan kakk! semoga apa yang dimakan selalu enak dan nasinya selalu hangat!"
    },
    {
        day: 8,
        title: "Day 8 🤝",
        content: "Duh bahas apa lagi ya, gantian deh kamu aja yang kirim note ke aku."
    },
    {
        day: 9,
        title: "Day 9 🌀",
        content: "Wih udah day 9 aja nihhh. Kak, kalau kamu cape jangan lupa istirahat, kalau butuh cerita juga aku bisa jadi pendengar kok. Tapi jangan tengah malam juga! kamu tuh kebiasan jam 24.00 atau kalau ga dini hari chatnya 🤬🫵🏻"
    },
    {
        day: 10,
        title: "Day 10 🌟",
        content: "Yah, udah day 10 nih, last but not least. Aku mau bilang, mau sejahat apapun dunia dan semsta ke kamu, please don't be hurt and blaming yourself. Segala masalah, musibah, dan kehilangan it's not on your control, itu semua bukan kamu yang mengendalikan. jangan salahin diri kamu sendiri ya, kak. Mending aku aja yang nyalahin kamuu. mff alay, baru pertama kali hidup."
    }
];

// ============================================================
// 🔧 STATE MANAGEMENT
// ============================================================

function getToday() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getOpenedData() {
    const data = localStorage.getItem('starNotes_opened');
    return data ? JSON.parse(data) : null;
}

function saveOpenedData(date, noteDay) {
    localStorage.setItem('starNotes_opened', JSON.stringify({
        date: date,
        noteDay: noteDay
    }));
}

function getVisitCount() {
    const count = localStorage.getItem('starNotes_visitCount');
    return count ? parseInt(count) : 0;
}

function incrementVisitCount() {
    const count = getVisitCount() + 1;
    localStorage.setItem('starNotes_visitCount', count.toString());
    return count;
}

function hasOpenedToday() {
    const opened = getOpenedData();
    return opened && opened.date === getToday();
}

function getOpenedNoteDay() {
    const opened = getOpenedData();
    return opened && opened.date === getToday() ? opened.noteDay : null;
}

// ============================================================
// 📄 PAGE NAVIGATION
// ============================================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Jika masuk ke note page, render stars
    if (pageId === 'notePage') {
        renderStars();
        updateDateDisplay();
    }
}

// ============================================================
// ⭐ RENDER STARS
// ============================================================

function renderStars() {
    const container = document.getElementById('starsRow');
    container.innerHTML = '';

    const todayOpened = hasOpenedToday();
    const openedNoteDay = getOpenedNoteDay();
    const totalNotes = notesData.length;

    // SVG gradient definitions
    const svgDefs = `
        <defs>
            <linearGradient id="starGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#f6d365"/>
                <stop offset="100%" style="stop-color:#fda085"/>
            </linearGradient>
            <linearGradient id="starGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#a18cd1"/>
                <stop offset="100%" style="stop-color:#fbc2eb"/>
            </linearGradient>
            <linearGradient id="starGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff9a9e"/>
                <stop offset="100%" style="stop-color:#fecfef"/>
            </linearGradient>
            <linearGradient id="starGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#fcb69f"/>
                <stop offset="100%" style="stop-color:#ff9a9e"/>
            </linearGradient>
            <linearGradient id="starGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#89f7fe"/>
                <stop offset="100%" style="stop-color:#66a6ff"/>
            </linearGradient>
        </defs>
    `;

    const starSVG = (gradClass) => `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            ${svgDefs}
            <polygon class="${gradClass}"
                points="50,5 63,35 95,38 72,60 78,92 50,76 22,92 28,60 5,38 37,35"
                stroke="rgba(255,255,255,0.3)"
                stroke-width="1.5"
            />
        </svg>
    `;

    notesData.forEach((note, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'star-wrapper';

        // Assign sway animation
        const swayClass = `sway-${(index % 5) + 1}`;
        wrapper.classList.add(swayClass);

        // Check state
        const isLocked = todayOpened && openedNoteDay !== note.day;
        const isOpened = todayOpened && openedNoteDay === note.day;

        if (isLocked) {
            wrapper.classList.add('locked');
        } else if (isOpened) {
            wrapper.classList.add('opened');
        }

        // Star color rotation
        const gradClass = `star-color-${(index % 5) + 1}`;

        const dayLabel = note.day <= 7
            ? ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'][note.day - 1]
            : `Hari ke-${note.day}`;

        wrapper.innerHTML = `
            <div class="star-string"></div>
            <div class="star-shape">
                ${starSVG(gradClass)}
                <span class="star-number">${note.day}</span>
            </div>
            <span class="star-label">${isOpened ? '✨ Dibuka' : isLocked ? '🔒' : dayLabel}</span>
        `;

        // Click handler
        if (!isLocked) {
            wrapper.addEventListener('click', () => {
                if (!todayOpened) {
                    // First time opening today
                    saveOpenedData(getToday(), note.day);
                    incrementVisitCount();
                    openNoteModal(note);
                    renderStars(); // Re-render to update states
                } else if (isOpened) {
                    // Already opened this note today, show again
                    openNoteModal(note);
                }
            });
        }

        container.appendChild(wrapper);
    });

    // Update status message
    updateNoteStatus();
}

function updateNoteStatus() {
    const statusEl = document.getElementById('noteStatus');
    const todayOpened = hasOpenedToday();
    const openedNoteDay = getOpenedNoteDay();

    if (todayOpened) {
        const note = notesData.find(n => n.day === openedNoteDay);
        statusEl.innerHTML = `
            <div class="status-msg opened">
                ✨ Note hari ini sudah dibuka: "${note ? note.title : 'Note'}"
            </div>
        `;
    } else {
        statusEl.innerHTML = `
            <div class="status-msg locked">
                🌟 Pilih satu bintang untuk dibuka hari ini
            </div>
        `;
    }
}

// ============================================================
// 📖 NOTE MODAL
// ============================================================

function openNoteModal(note) {
    const modal = document.getElementById('noteModal');
    document.getElementById('noteModalTitle').textContent = note.title;
    document.getElementById('noteModalContent').textContent = note.content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNoteModal() {
    const modal = document.getElementById('noteModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('noteModal');
    if (e.target === modal) {
        closeNoteModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeNoteModal();
    }
});

// ============================================================
// 📅 DATE DISPLAY
// ============================================================

function updateDateDisplay() {
    const dateEl = document.getElementById('currentDate');
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    dateEl.textContent = now.toLocaleDateString('id-ID', options);
}

// ============================================================
// 💌 SEND MESSAGE (FIXED: Menggunakan Formsubmit AJAX)
// ============================================================

async function sendMessage(event) {
    event.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('messageSubject').value.trim();
    const body = document.getElementById('messageBody').value.trim();
    const statusEl = document.getElementById('messageStatus');
    const sendBtn = document.getElementById('sendBtn');

    if (!name || !email || !subject || !body) {
        statusEl.textContent = '⚠️ Mohon isi semua field ya!';
        statusEl.style.color = '#ff6b6b';
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = '⏳ Mengirim...';
    statusEl.textContent = '';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('_subject', `[Star Notes] ${subject}`); // ⚠️ Pakai underscore
    formData.append('message', body);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    try {
        const response = await fetch(`https://formsubmit.co/ajax/${CREATOR_EMAIL}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' // ✅ HEADER WAJIB INI
            }
        });

        const data = await response.json();

        if (data.success) {
            statusEl.textContent = '✅ Pesan berhasil dikirim! Terima kasih 💌';
            statusEl.style.color = '#fff';
            document.getElementById('messageForm').reset();
        } else {
            throw new Error(data.message || 'Gagal mengirim');
        }
    } catch (error) {
        console.error('Formsubmit Error:', error);
        statusEl.textContent = '❌ Gagal mengirim. Cek koneksi atau coba lagi.';
        statusEl.style.color = '#ff6b6b';
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = '✉️ Kirim Pesan';
    }
}

// ============================================================
// 🌅 SHARE GREETING
// ============================================================

function shareGreeting() {
    const greetingText = "Selamat Pagi! ☀️ Setiap pagi adalah hadiah baru. Tarik napas dalam-dalam, dan nikmati hari ini. 🌻 — dari Star Notes ✦";

    if (navigator.share) {
        navigator.share({
            title: 'Selamat Pagi! ☀️',
            text: greetingText
        }).catch(() => {
            fallbackCopy(greetingText);
        });
    } else {
        fallbackCopy(greetingText);
    }
}

function fallbackCopy(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Ucapan disalin ke clipboard! Paste di mana saja.');
    }).catch(() => {
        // Final fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        alert('✅ Ucapan disalin ke clipboard!');
    });
}

// ============================================================
// ✨ PARTICLES
// ============================================================

function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 20;
        const isStar = Math.random() > 0.5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        if (isStar) {
            particle.style.background = 'none';
            particle.style.color = 'rgba(255, 255, 255, 0.6)';
            particle.style.fontSize = `${size * 2}px`;
            particle.style.lineHeight = '1';
            particle.textContent = '✦';
        } else {
            const colors = [
                'rgba(255, 255, 255, 0.6)',
                'rgba(253, 160, 133, 0.5)',
                'rgba(246, 211, 101, 0.5)',
                'rgba(161, 140, 209, 0.4)'
            ];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        }

        container.appendChild(particle);
    }
}

// ============================================================
// 🚀 INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    updateDateDisplay();

    // Check if already opened today
    const todayOpened = hasOpenedToday();
    if (todayOpened) {
        console.log('Note hari ini sudah dibuka:', getOpenedNoteDay());
    }
});
