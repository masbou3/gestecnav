// Initialisation des fonctionnalités
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du loader
    initLoader();
    
    // Initialisation des particules
    initParticles();
    
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
    
    // Initialisation des vidéos automatiques
    initAutoplayVideos();
});

// Loader
function initLoader() {
    const loader = document.querySelector('.loader');
    const progressBar = document.querySelector('.loader-progress');
    
    if (loader && progressBar) {
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
                        // Démarrer les animations après le chargement
                        startPageAnimations();
                    }, 800);
                }, 500);
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    }
}

// Effets de particules
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Taille aléatoire
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Position de départ aléatoire
    particle.style.left = `${Math.random() * 100}vw`;
    
    // Délai d'animation aléatoire
    particle.style.animationDelay = `${Math.random() * 20}s`;
    
    // Durée d'animation aléatoire
    const duration = 15 + Math.random() * 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Opacité aléatoire
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    container.appendChild(particle);
    
    // Supprimer et recréer les particules après l'animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration * 1000);
}

// Variable globale pour la langue courante
let currentLang = localStorage.getItem('gestecnav-lang') || 'fr';

// Changement de langue
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Appliquer la langue sauvegardée au chargement
    applyLanguage(currentLang);
    
    langButtons.forEach(button => {
        // Marquer le bouton actif
        if (button.getAttribute('data-lang') === currentLang) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang !== currentLang) {
                currentLang = lang;
                localStorage.setItem('gestecnav-lang', lang);
                applyLanguage(lang);
                
                // Animation de transition
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Mise à jour des boutons actifs
                langButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function applyLanguage(lang) {
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
    
    // Mise à jour des balises meta pour le référencement
    updateMetaTags(lang);
}

function updateMetaTags(lang) {
    // Mettre à jour le titre de la page si nécessaire
    const pageTitles = {
        'fr': {
            'index': 'GESTECNAV - Innovation au Service des Navires',
            'gestion-technique': 'Gestion Technique et Maintenance - GESTECNAV',
            'expertise-conseil': 'Expertise Maritime - GESTECNAV',
            'solutions-energetiques': 'Transition Énergétique - GESTECNAV',
            'conformite-reglementaire': 'Conformité Réglementaire - GESTECNAV'
        },
        'en': {
            'index': 'GESTECNAV - Innovation Serving Ships',
            'gestion-technique': 'Technical Management and Maintenance - GESTECNAV',
            'expertise-conseil': 'Maritime Expertise - GESTECNAV',
            'solutions-energetiques': 'Energy Transition - GESTECNAV',
            'conformite-reglementaire': 'Regulatory Compliance - GESTECNAV'
        }
    };
    
    // Déterminer la page actuelle
    let currentPage = 'index';
    const path = window.location.pathname;
    if (path.includes('gestion-technique')) currentPage = 'gestion-technique';
    else if (path.includes('expertise-conseil')) currentPage = 'expertise-conseil';
    else if (path.includes('solutions-energetiques')) currentPage = 'solutions-energetiques';
    else if (path.includes('conformite-reglementaire')) currentPage = 'conformite-reglementaire';
    
    // Mettre à jour le titre
    if (pageTitles[lang] && pageTitles[lang][currentPage]) {
        document.title = pageTitles[lang][currentPage];
    }
}

// Navigation
function initNavigation() {
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('nav a');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (nav) {
        // Navigation scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        });
    }
    
    // Clic sur les liens de navigation
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    // Animation de défilement
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Animation de transition
                        this.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            this.style.transform = 'scale(1)';
                        }, 150);
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Fermer le menu mobile si ouvert
                        if (navMenu && navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                        }
                    }
                }
            });
        });
    }
    
    // Menu mobile
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
        });
    }
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
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Éléments à animer
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .statut-item, .about-text, .about-visual, .service-feature, .form-group, .video-feature-card, .video-section, .video-cta-final');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Animations de page complète
function startPageAnimations() {
    // Animation des éléments avec délais progressifs
    const elementsToAnimate = document.querySelectorAll('[data-animate]');
    
    elementsToAnimate.forEach((element, index) => {
        const delay = index * 100;
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    });
    
    // Animation de l'ancre du logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        setInterval(() => {
            logoIcon.style.transform = 'rotate(5deg)';
            setTimeout(() => {
                logoIcon.style.transform = 'rotate(-5deg)';
            }, 1000);
        }, 2000);
    }
}

// Gestion des vidéos automatiques avec effets avancés
function initAutoplayVideos() {
    const videoWrappers = document.querySelectorAll('.autoplay-video');
    
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        
        if (!video) return;
        
        // Configuration de la vidéo pour lecture automatique
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Lecture automatique avec gestion d'erreurs
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Lecture automatique empêchée:', error);
                // Afficher un bouton de lecture manuel si nécessaire
                showFallbackPlayButton(wrapper, video);
            });
        }
        
        // Effets d'interaction avancés
        initVideoInteractions(wrapper, video);
    });
}

function initVideoInteractions(wrapper, video) {
    let isHovering = false;
    let scaleTimeout;
    
    // Effet de survol avec agrandissement
    wrapper.addEventListener('mouseenter', function() {
        isHovering = true;
        clearTimeout(scaleTimeout);
        
        // Effet d'agrandissement progressif
        scaleTimeout = setTimeout(() => {
            if (isHovering) {
                this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(2deg) scale(1.05)';
                video.style.filter = 'brightness(1) contrast(1.2)';
            }
        }, 100);
    });
    
    wrapper.addEventListener('mouseleave', function() {
        isHovering = false;
        clearTimeout(scaleTimeout);
        
        // Retour à l'état normal
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        video.style.filter = 'brightness(0.9) contrast(1.1)';
    });
    
    // Clic pour mettre en pause/lecture
    wrapper.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
    
    // Gestion des erreurs de vidéo
    video.addEventListener('error', function() {
        console.error('Erreur de chargement de la vidéo:', this.src);
        showVideoError(wrapper);
    });
    
    // Indicateur de chargement
    video.addEventListener('waiting', function() {
        wrapper.classList.add('loading');
    });
    
    video.addEventListener('canplay', function() {
        wrapper.classList.remove('loading');
    });
}

function showFallbackPlayButton(wrapper, video) {
    const playButton = document.createElement('button');
    playButton.className = 'video-fallback-play';
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    playButton.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--gradient-accent);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    playButton.addEventListener('click', function() {
        video.play();
        this.style.display = 'none';
    });
    
    wrapper.appendChild(playButton);
}

function showVideoError(wrapper) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'video-error';
    errorMessage.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>Video non disponible</span>
    `;
    errorMessage.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        z-index: 10;
    `;
    
    wrapper.appendChild(errorMessage);
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
                showNotification(currentLang === 'fr' ? "Merci de remplir tous les champs." : "Please fill in all fields.", 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button');
            const textSpan = submitBtn.querySelector('span');
            const originalText = textSpan.textContent;
            textSpan.textContent = currentLang === 'fr' ? "Envoi..." : "Sending...";
            submitBtn.disabled = true;

            // Animation du bouton
            submitBtn.style.transform = 'scale(0.95)';

            // Données dynamiques à envoyer à EmailJS
            const params = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                date: new Date().toLocaleString(),
                site: "Site GESTECNAV",
                language: currentLang
            };

            // Envoi via EmailJS
            emailjs.send("service_idsjzva", "template_0mtwnmd", params)
                .then(() => {
                    textSpan.textContent = currentLang === 'fr' ? "✅ Message envoyé !" : "✅ Message sent!";
                    submitBtn.style.background = 'linear-gradient(135deg, #00cc66 0%, #00ff99 100%)';
                    showNotification(currentLang === 'fr' ? "Message envoyé avec succès !" : "Message sent successfully!", 'success');
                    
                    setTimeout(() => {
                        textSpan.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.transform = 'scale(1)';
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 2500);
                })
                .catch((error) => {
                    console.error("Erreur d'envoi :", error);
                    textSpan.textContent = currentLang === 'fr' ? "❌ Erreur" : "❌ Error";
                    submitBtn.style.background = 'linear-gradient(135deg, #cc0000 0%, #ff3333 100%)';
                    showNotification(currentLang === 'fr' ? "Erreur d'envoi. Vérifiez la configuration EmailJS." : "Sending error. Check EmailJS configuration.", 'error');
                    
                    setTimeout(() => {
                        textSpan.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.transform = 'scale(1)';
                        submitBtn.style.background = '';
                    }, 2500);
                });
        });
    }
}

// Notification système
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles de notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00cc66 0%, #00ff99 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #cc0000 0%, #ff3333 100%)';
    } else {
        notification.style.background = 'var(--gradient-accent)';
    }
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animation de sortie
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Compteur de statistiques avec animation améliorée
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
                
                // Animation du conteneur
                entry.target.closest('.stat-item').style.transform = 'translateY(-10px) scale(1.05)';
                setTimeout(() => {
                    entry.target.closest('.stat-item').style.transform = 'translateY(-5px) scale(1.02)';
                }, 2000);
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
            const value = Math.floor(progress * (end - start) + start);
            
            // Formatage avec séparateurs de milliers
            obj.innerHTML = value.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Gestion du défilement fluide entre les sections
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialiser le défilement fluide
initSmoothScrolling();