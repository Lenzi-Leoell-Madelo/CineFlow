document.addEventListener("DOMContentLoaded", function() {
    loadUI();
});

async function loadUI() {
    try {
        const components = [
            { id: 'sidebar-target', path: 'includes/sidebar.html' },
            { id: 'topbar-target', path: 'includes/topbar.html' },
            { id: 'navbar-target', path: 'includes/navbar.html' }
        ];

        for (const comp of components) {
            const resp = await fetch(comp.path);
            if (resp.ok) {
                const html = await resp.text();
                const target = document.getElementById(comp.id);
                if (target) {
                    target.innerHTML = html;
                }
            }
        }
        // Small delay to ensure DOM is rendered before highlighting
        setTimeout(highlightActiveLink, 50);
    } catch (error) {
        console.error("Error loading UI components:", error);
    }
}

function highlightActiveLink() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'dashboard.html';
    
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}