document.addEventListener('DOMContentLoaded', () => {
    // Laad componenten
    loadComponent('header', 'header-placeholder');
    loadComponent('footer', 'footer-placeholder');
    
    // Initialiseer animaties
    initAnimations();
    
    // Cookie check
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            const banner = document.getElementById('cookie-banner');
            if(banner) banner.style.display = 'flex';
        }, 2000);
    }
});

async function loadComponent(name, id) {
    try {
        const response = await fetch(`components/${name}.html`);
        const data = await response.text();
        document.getElementById(id).innerHTML = data;
        if(name === 'header') initMobileMenu();
    } catch (err) {
        console.error(`Fout bij laden van ${name}:`, err);
    }
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
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

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}