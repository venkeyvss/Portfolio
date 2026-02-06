/* ========================================
   VENKATESH RAJA - PORTFOLIO SCRIPTS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    Theme.init();
    Navigation.init();
    Typewriter.init();
    ScrollEffects.init();
    Cursor.init();
    Stats.init();
    SkillBars.init();
    ExperienceTabs.init();
    ContactForm.init();
    Particles.init();
    InteractiveCodeRunner.init();


    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
    });
});

/* ===== PRELOADER ===== */
const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 2200);
        });

        // Fallback
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 4000);
    }
};

/* ===== THEME ===== */
const Theme = {
    init() {
        const btn = document.getElementById('themeBtn');
        const icon = document.getElementById('themeIcon');
        const saved = localStorage.getItem('portfolio-theme') || 'dark';

        document.documentElement.setAttribute('data-theme', saved);
        this.updateIcon(icon, saved);

        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('portfolio-theme', next);
            this.updateIcon(icon, next);
        });
    },

    updateIcon(icon, theme) {
        icon.className = theme === 'dark' ? 'ri-moon-fill' : 'ri-sun-fill';
    }
};

/* ===== NAVIGATION ===== */
const Navigation = {
    init() {
        const header = document.getElementById('header');
        const toggle = document.getElementById('navToggle');
        const menu = document.getElementById('navMenu');
        const links = document.querySelectorAll('.nav-link');

        // Sticky header
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        });

        // Mobile toggle
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });

        // Nav links
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const offset = header.offsetHeight + 10;
                    const top = target.offsetTop - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Scroll spy
        this.scrollSpy(links);
    },

    scrollSpy(links) {
        const sections = document.querySelectorAll('.section[id]');

        const observe = () => {
            const scrollY = window.scrollY + 150;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollY >= top && scrollY < top + height) {
                    links.forEach(l => l.classList.remove('active'));
                    const active = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (active) active.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', observe);
        observe();
    }
};

/* ===== TYPEWRITER ===== */
const Typewriter = {
    init() {
        const el = document.getElementById('roleTyped');
        if (!el) return;

        const words = [
            'scalable web apps.',
            'AI-powered systems.',
            'trading platforms.',
            'React.js interfaces.',
            'Spring Boot APIs.',
            'ML pipelines.',
            'production-grade solutions.'
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const current = words[wordIndex];
            let speed;

            if (isDeleting) {
                el.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                speed = 30;
            } else {
                el.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                speed = 80;
            }

            if (!isDeleting && charIndex === current.length) {
                speed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }

            setTimeout(type, speed);
        };

        setTimeout(type, 1500);
    }
};

/* ===== SCROLL EFFECTS ===== */
const ScrollEffects = {
    init() {
        // Progress bar
        const progressBar = document.getElementById('scrollProgress');

        window.addEventListener('scroll', () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / total) * 100;
            if (progressBar) progressBar.style.width = progress + '%';
        });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = document.getElementById('header').offsetHeight + 10;
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

/* ===== CUSTOM CURSOR ===== */
const Cursor = {
    init() {
        if (window.innerWidth <= 768) return;

        const outer = document.getElementById('cursorOuter');
        const inner = document.getElementById('cursorInner');
        if (!outer || !inner) return;

        let mouseX = 0, mouseY = 0;
        let outerX = 0, outerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            inner.style.left = mouseX + 'px';
            inner.style.top = mouseY + 'px';
        });

        const animate = () => {
            outerX += (mouseX - outerX) * 0.12;
            outerY += (mouseY - outerY) * 0.12;
            outer.style.left = outerX + 'px';
            outer.style.top = outerY + 'px';
            requestAnimationFrame(animate);
        };
        animate();

        // Hover effects
        const hoverTargets = document.querySelectorAll(
            'a, button, .btn, .project-card, .skill-category, .cert-card, .contact-info-card, .exp-tab, .info-item, .nav-toggle'
        );

        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }
};

/* ===== STAT COUNTER ===== */
const Stats = {
    init() {
        const stats = document.querySelectorAll('.stat-value');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(entry.target.dataset.target);
                    this.animate(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    },

    animate(el, target) {
        const duration = 2000;
        const start = performance.now();
        const isDecimal = target % 1 !== 0;

        const update = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            const current = target * ease;

            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }
};

/* ===== SKILL BARS ===== */
const SkillBars = {
    init() {
        const fills = document.querySelectorAll('.skill-fill');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.dataset.width;
                    entry.target.style.width = width + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        fills.forEach(fill => observer.observe(fill));
    }
};

/* ===== EXPERIENCE TABS ===== */
const ExperienceTabs = {
    init() {
        const tabs = document.querySelectorAll('.exp-tab');
        const contents = document.querySelectorAll('.exp-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
};

/* ===== CONTACT FORM ===== */
const ContactForm = {
    init() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = document.getElementById('submitBtn');
            btn.classList.add('loading');
            btn.disabled = true;

            // Simulate send - Replace with EmailJS or backend
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.classList.add('success');

                this.showToast('Message sent successfully! 🎉');
                form.reset();

                setTimeout(() => {
                    btn.classList.remove('success');
                    btn.disabled = false;
                }, 3000);
            }, 2000);
        });
    },

    showToast(message) {
        const toast = document.getElementById('toast');
        const msg = document.getElementById('toastMsg');
        if (msg) msg.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }
};

/* ===== PARTICLES ===== */
const Particles = {
    init() {
        let count = 0;
        const max = 15;

        const create = () => {
            if (count >= max) return;

            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (Math.random() * 4 + 4) + 's';
            p.style.width = (Math.random() * 3 + 1) + 'px';
            p.style.height = p.style.width;
            document.body.appendChild(p);
            count++;

            setTimeout(() => {
                p.remove();
                count--;
            }, 8000);
        };

        setInterval(create, 600);
    }
};



/* ===== INTERACTIVE CODE RUNNER ===== */
const InteractiveCodeRunner = {
  // Code Templates
  templates: {
    python: {
      title: 'developer.py',
      code: `<span class="code-keyword">class</span> <span class="code-class">Developer</span>:
    <span class="code-keyword">def</span> <span class="code-func">__init__</span>(self):
        self.name = <span class="code-string">"Venkatesh Raja"</span>
        self.role = <span class="code-string">"Full Stack Dev"</span>
        self.stack = [<span class="code-string">"React"</span>, <span class="code-string">"Python"</span>, <span class="code-string">"Spring"</span>]
    
    <span class="code-keyword">def</span> <span class="code-func">build</span>(self):
        <span class="code-keyword">return</span> <span class="code-string">"AI-Solutions"</span> <span class="code-cursor-blink">|</span>`,
      output: '"AI-Solutions"'
    },
    java: {
      title: 'Developer.java',
      code: `<span class="code-keyword">public class</span> <span class="code-class">Developer</span> {
    <span class="code-keyword">String</span> name = <span class="code-string">"Venkatesh Raja"</span>;
    <span class="code-keyword">String</span> role = <span class="code-string">"Full Stack Dev"</span>;
    
    <span class="code-keyword">public String</span> <span class="code-func">build</span>() {
        <span class="code-keyword">return</span> <span class="code-string">"Scalable Enterprise Apps"</span>; <span class="code-cursor-blink">|</span>
    }
}`,
      output: '"Scalable Enterprise Apps"'
    }
  },

  currentLang: 'python',

  init() {
    const runBtn = document.getElementById('runCodeBtn');
    const outputContainer = document.getElementById('codeOutput');
    const codeBody = document.querySelector('.code-body code');
    const codeTitle = document.querySelector('.code-title');
    const tabs = document.querySelectorAll('.code-tab');

    if (!runBtn || !outputContainer || !codeBody) return;

    // Clone button to remove old listeners
    const newBtn = runBtn.cloneNode(true);
    runBtn.parentNode.replaceChild(newBtn, runBtn);
    
    // Tab Event Listeners
    if(tabs.length) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const lang = tab.dataset.lang;
                if (lang === this.currentLang) return; // No change

                // Update Active Tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Switch Content logic
                this.currentLang = lang;
                const template = this.templates[lang];
                
                // Fade out code
                codeBody.style.opacity = '0';
                setTimeout(() => {
                    codeBody.innerHTML = template.code;
                    codeTitle.textContent = template.title;
                    codeBody.style.opacity = '1';
                    
                    // Reset Output if visible
                    if (outputContainer.classList.contains('visible')) {
                        outputContainer.classList.remove('visible');
                        const outputText = outputContainer.querySelector('.output-text');
                        if (outputText) outputText.innerHTML = '';
                        newBtn.innerHTML = '<i class="ri-play-fill"></i> Run';
                        newBtn.classList.remove('running');
                    }
                }, 200);
            });
        });
    }

    // Run Logic
    newBtn.addEventListener('click', () => {
      const outputText = outputContainer.querySelector('.output-text');
      if (!outputText) return;

      if (newBtn.classList.contains('running')) return;

      // Start Run
      newBtn.classList.add('running');
      newBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Compiling...';
      outputContainer.classList.add('visible');
      outputText.innerHTML = '<span class="loading-dots">Compiling ' + (this.currentLang === 'java' ? 'classes' : 'modules') + '</span>';
      outputText.className = 'output-text'; 

      setTimeout(() => {
        outputText.innerHTML = 'Build Success! Executing...';
        
        setTimeout(() => {
            newBtn.innerHTML = '<i class="ri-check-line"></i> Running';
            
            // Dynamic Result from Template
            const result = this.templates[this.currentLang].output;
            
            outputText.innerHTML = '';
            outputText.classList.add('success');
            
            let i = 0;
            const typeWriter = setInterval(() => {
                outputText.textContent += result.charAt(i);
                i++;
                if (i >= result.length) {
                    clearInterval(typeWriter);
                    setTimeout(() => {
                        newBtn.classList.remove('running');
                        newBtn.innerHTML = '<i class="ri-play-fill"></i> Run Again';
                    }, 1000);
                }
            }, 50);
            
        }, 800);

      }, 1500); 
    });
  }
};
