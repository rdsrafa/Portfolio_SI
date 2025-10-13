document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const navBtns = document.querySelectorAll('.nav-btn');
    const navMobileBtns = document.querySelectorAll('.nav-mobile-btn');
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const cards = document.querySelectorAll('.card[data-page]');
    const contactForm = document.getElementById('contactForm');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Afficher/masquer le bouton scroll to top
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Fonction pour afficher une page
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Mettre à jour les boutons actifs
            navBtns.forEach(btn => btn.classList.remove('active'));
            navMobileBtns.forEach(btn => btn.classList.remove('active'));
            
            document.querySelectorAll(`[data-page="${pageId}"]`).forEach(btn => {
                btn.classList.add('active');
            });
            
            // Fermer le menu mobile
            navMobile.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Scroll vers le haut
            window.scrollTo(0, 0);
        }
    }

    // Événements des boutons de navigation desktop
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageId = btn.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Événements des boutons de navigation mobile
    navMobileBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageId = btn.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Menu mobile toggle
    menuToggle.addEventListener('click', () => {
        navMobile.classList.toggle('open');
        const isOpen = navMobile.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        const icon = menuToggle.querySelector('i');
        if (isOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Navigation par cartes
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const pageId = card.getAttribute('data-page');
            showPage(pageId);
        });
        
        // Accessibilité - permettre la navigation au clavier
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const pageId = card.getAttribute('data-page');
                showPage(pageId);
            }
        });
    });

    // Validation et envoi du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Réinitialiser les messages d'erreur
            document.getElementById('nameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('messageError').textContent = '';
            document.getElementById('successMessage').textContent = '';
            
            // Validation du nom
            if (name === '') {
                document.getElementById('nameError').textContent = 'Le nom est requis';
                isValid = false;
            }
            
            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                document.getElementById('emailError').textContent = 'L\'email est requis';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'L\'email n\'est pas valide';
                isValid = false;
            }
            
            // Validation du message
            if (message === '') {
                document.getElementById('messageError').textContent = 'Le message est requis';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('messageError').textContent = 'Le message doit contenir au moins 10 caractères';
                isValid = false;
            }
            
            if (isValid) {
                // Message de succès (sans envoi réel)
                const successMsg = document.getElementById('successMessage');
                successMsg.textContent = '✓ Message envoyé avec succès ! Merci de votre message.';
                successMsg.style.display = 'block';
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Cacher le message après 5 secondes
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }
        });
    }
});