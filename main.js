document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const navBtns = document.querySelectorAll('.nav-btn');
    const navMobileBtns = document.querySelectorAll('.nav-mobile-btn');
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const cards = document.querySelectorAll('.card[data-navigate]');

    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        navBtns.forEach(btn => btn.classList.remove('active'));
        navMobileBtns.forEach(btn => btn.classList.remove('active'));
        
        document.querySelectorAll(`[data-page="${pageId}"]`).forEach(btn => {
            btn.classList.add('active');
        });
        
        navMobile.classList.remove('open');
        window.scrollTo(0, 0);
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageId = btn.getAttribute('data-page');
            showPage(pageId);
        });
    });

    navMobileBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageId = btn.getAttribute('data-page');
            showPage(pageId);
        });
    });

    menuToggle.addEventListener('click', () => {
        navMobile.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (navMobile.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const pageId = card.getAttribute('data-navigate');
            showPage(pageId);
        });
    });
});
