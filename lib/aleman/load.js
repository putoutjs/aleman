document.addEventListener('DOMContentLoaded', function load(event) {
    const loader = document.querySelector('[data-name="aleman"]');
    const el = document.createElement('script');
    
    el.src = loader.dataset.main;
    el.type = 'module';
    
    document.body.appendChild(el);
    document.removeEventListener('DOMContentLoaded', load);
});
