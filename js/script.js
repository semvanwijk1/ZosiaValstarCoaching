document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'header-placeholder');
    loadComponent('footer', 'footer-placeholder');
    initAnimations();
    
    // Header effect op scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('site-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

async function loadComponent(name, id) {
    try {
        const response = await fetch(`components/${name}.html`);
        const data = await response.text();
        document.getElementById(id).innerHTML = data;
        if(name === 'header') initMobileMenu();
    } catch (err) { console.error(err); }
}

function initAnimations() {
    // We kijken naar verschillende reveal types
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom').forEach(el => observer.observe(el));
}

function initMobileMenu() {
    const burger = document.getElementById('hamburger');
    const nav = document.getElementById('nav-links');
    if(burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }
}