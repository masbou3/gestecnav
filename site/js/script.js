// Initialisation des fonctionnalités
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du loader
    initLoader();
    
    // Initialisation du changement de langue
    initLanguageSwitcher();
    
    // Initialisation de la navigation
    initNavigation();
    
    // Initialisation des animations
    initAnimations();
    
    // Initialisation du formulaire de contact
    initContactForm();
    
    // Initialisation du compteur de statistiques
    initStatsCounter();
});

// Loader
function initLoader() {
    const loader = document.querySelector('.loader');
    const progressBar = document.querySelector('.loader-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Animation de fin de chargement
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 200);
}

// Changement de langue
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'fr';
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang !== currentLang) {
                currentLang = lang;
                updateLanguage(lang);
                
                // Mise à jour des boutons actifs
                langButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    function updateLanguage(lang) {
        // Mise à jour des textes avec attributs data-fr et data-en
        document.querySelectorAll('[data-fr]').forEach(element => {
            if (element.hasAttribute('data-fr-placeholder')) {
                element.placeholder = lang === 'fr' 
                    ? element.getAttribute('data-fr-placeholder') 
                    : element.getAttribute('data-en-placeholder');
            } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = lang === 'fr' 
                    ? element.getAttribute('data-fr') 
                    : element.getAttribute('data-en');
            } else {
                element.textContent = lang === 'fr' 
                    ? element.getAttribute('data-fr') 
                    : element.getAttribute('data-en');
            }
        });
    }
}

// Navigation
function initNavigation() {
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('nav a');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    // Navigation scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
    
    // Clic sur les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Animation de défilement
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Menu mobile
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Animations au défilement
function initAnimations() {
    // Observer pour les animations d'apparition
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Éléments à animer
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .statut-item, .about-text, .about-visual');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Formulaire de contact (envoi réel via EmailJS)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form') || document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Récupération des champs dynamiques
            const name = contactForm.querySelector('input[name="name"]')?.value.trim();
            const email = contactForm.querySelector('input[name="email"]')?.value.trim();
            const subject = contactForm.querySelector('input[name="subject"]')?.value.trim();
            const message = contactForm.querySelector('textarea[name="message"]')?.value.trim();

            // Vérification des champs
            if (!name || !email || !subject || !message) {
                alert("Merci de remplir tous les champs.");
                return;
            }

            const submitBtn = contactForm.querySelector('button');
            const textSpan = submitBtn.querySelector('span');
            const originalText = textSpan.textContent;
            textSpan.textContent = "Envoi...";
            submitBtn.disabled = true;

            // Données dynamiques à envoyer à EmailJS
            const params = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                date: new Date().toLocaleString(),
                site: "Site GESTECNAV"
            };

            // Envoi via EmailJS
            emailjs.send("service_idsjzva", "template_0mtwnmd", params)
                .then(() => {
                    textSpan.textContent = "✅ Message envoyé avec succès !";
                    setTimeout(() => {
                        textSpan.textContent = originalText;
                        submitBtn.disabled = false;
                        contactForm.reset();
                    }, 2500);
                })
                .catch((error) => {
                    console.error("Erreur d’envoi :", error);
                    alert("❌ Erreur d’envoi. Vérifie la configuration EmailJS.");
                    textSpan.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}



// Compteur de statistiques
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Variable globale pour la langue courante
let currentLang = 'fr';