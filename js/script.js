document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'header-placeholder');
    loadComponent('footer', 'footer-placeholder');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    // Wacht even tot componenten geladen zijn voor de observer
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 500);
});

async function loadComponent(name, id) {
    const res = await fetch(`components/${name}.html`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}