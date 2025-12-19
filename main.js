const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(r => io.observe(r));


document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        const href = target.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const el = document.querySelector(href);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        }
    }
});


const celebrateBtn = document.getElementById('celebrate');
if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
        if (window.confetti) {
            confetti({ particleCount: 50, spread: 60 });
        } else {
            alert('🎉 Chúc mừng!');
        }
    });
}