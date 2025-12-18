// --- Mobile menu toggle & Interaction ---
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileToolsBtn = document.getElementById('mobileToolsBtn');
const mobileToolsDropdown = document.getElementById('mobileToolsDropdown');
const mobileToolsIcon = document.getElementById('mobileToolsIcon');

navToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    mobileMenu.classList.toggle('hidden');
});

if (mobileToolsBtn) {
    mobileToolsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileToolsDropdown.classList.toggle('hidden');
        mobileToolsIcon.classList.toggle('rotate-180');
    });
}

document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden') && 
        !mobileMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        
        mobileMenu.classList.add('hidden');
        
        mobileToolsDropdown.classList.add('hidden');
        mobileToolsIcon.classList.remove('rotate-180');
    }
});

// --- End Mobile menu section ---


// Reveal on scroll using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('show');
// once shown, unobserve for performance
io.unobserve(entry.target);
}
});
}, { threshold: 0.12 });
reveals.forEach(r => io.observe(r));


// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
a.addEventListener('click', (e) => {
const href = a.getAttribute('href');
if (href.startsWith('#')) {
e.preventDefault();
const el = document.querySelector(href);
if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
// close mobile menu if open
if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
}
});
});


// Contact form handler (demo) — replace with real integration
function handleContact(){
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const message = document.getElementById('message').value;
alert(`Cảm ơn ${name}! (demo) — Email: ${email}\nNội dung: ${message}`);
document.getElementById('contactForm').reset();
}


// celebration button — light confetti using canvas-confetti if available
document.getElementById('celebrate').addEventListener('click', () => {
if (window.confetti) {
confetti({ particleCount: 50, spread: 60 });
} else {
alert('🎉 Chúc mừng! (confetti không tải được)');
}
});


// footer year
document.getElementById('year').innerText = new Date().getFullYear();