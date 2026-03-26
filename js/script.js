document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'header-placeholder');
    loadComponent('footer', 'footer-placeholder');
    initAnimations();
});

async function loadComponent(name, id) {
    try {
        const res = await fetch(`components/${name}.html`);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
        if(name === 'header') initMobileMenu();
    } catch (err) { console.error(err); }
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 500);
}

function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('nav-overlay');
    const links = document.querySelectorAll('.mobile-nav-links a');

    if (btn && overlay) {
        btn.addEventListener('click', () => {
            btn.classList.toggle('open');
            overlay.classList.toggle('open');
            document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : 'auto';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                btn.classList.remove('open');
                overlay.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }
}