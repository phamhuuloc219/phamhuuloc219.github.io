// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));


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