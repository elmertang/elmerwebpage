/* ═══════════════════════════════════════════════
   ELMER TANG 
   • Project category filtering
   • Sticky nav scroll effect
   • Mobile nav toggle
   • Skill bar animation on scroll
   ═══════════════════════════════════════════════ */

"use strict";

/* ──────────────────────────────────────────────
   1. PROJECT FILTER
   Filters project cards by data-category when
   a filter button is clicked.
──────────────────────────────────────────────── */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selected = btn.dataset.filter; // "all" | "technical" | "digital"

            // Update active button state
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            // Show/hide cards with a fade transition
            projectCards.forEach((card) => {
                const category = card.dataset.category;
                const matches = selected === "all" || category === selected;

                if (matches) {
                    card.classList.remove("hidden");
                    // Small stagger so cards don't all snap in at once
                    card.style.animation = "none";
                    requestAnimationFrame(() => {
                        card.style.animation = "fadeInUp 0.35s ease forwards";
                    });
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}

/* ──────────────────────────────────────────────
   2. STICKY NAV — add shadow on scroll
──────────────────────────────────────────────── */
function initStickyNav() {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 24) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }, { passive: true });
}

/* ──────────────────────────────────────────────
   3. MOBILE NAV TOGGLE
──────────────────────────────────────────────── */
function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    toggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        toggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });
}

/* ──────────────────────────────────────────────
   4. SKILL BAR ANIMATION (Intersection Observer)
   Re-triggers the CSS bar animation when the
   skills section scrolls into view.
──────────────────────────────────────────────── */
function initSkillBars() {
    const bars = document.querySelectorAll(".bar-fill");

    if (!("IntersectionObserver" in window)) return; // graceful fallback

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    // Reset then re-apply to replay the CSS keyframe
                    bar.style.animation = "none";
                    bar.offsetWidth; // force reflow
                    bar.style.animation = "";
                    observer.unobserve(bar);
                }
            });
        },
        { threshold: 0.3 }
    );

    bars.forEach((bar) => observer.observe(bar));
}

/* ──────────────────────────────────────────────
   5. INJECT FADE-IN KEYFRAME (used by filter)
──────────────────────────────────────────────── */
function injectKeyframes() {
    const style = document.createElement("style");
    style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
    document.head.appendChild(style);
}

/* ──────────────────────────────────────────────
   INIT — run everything once DOM is ready
──────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
    injectKeyframes();
    initProjectFilter();
    initStickyNav();
    initMobileNav();
    initSkillBars();
    initModal();
});

/*-──────────────────────────────────────────────-──────────────────────────────────────────────-─────────────────────────── */


/* ──────────────────────────────────────────────
   PROJECT MODAL DATA
   Add your own images and descriptions here
──────────────────────────────────────────────── */
const projectData = {
    "Digital Menu Ordering System": {
        images: ["menu1.jpg", "menu2.jpg", "menu3.jpg", "menu4.jpg", "menu5.jpg", "menu6.jpg"],
        chips: ["UI / UX", "Web App", "Ordering System"],
        desc: `Developed an interactive ordering platform to streamline menu browsing and ordering processes for F&B operations. The system allows customers to browse the full menu digitally, place orders directly from their table, and track order status in real time. Built with a focus on intuitive UX and fast load times to support high-traffic restaurant environments.`
    },
    "Oximeter Monitoring Device": {
        images: ["oxi1.png", "oxi2.png", "oxi3.png", "oxi4.png"],
        chips: ["IoT", "Embedded System", "Sensors"],
        desc: `Built a hardware-based solution to measure real-time heart rate (BPM) and blood oxygen (SpO₂) levels. The device uses a MAX30100 pulse oximeter sensor paired with a microcontroller to collect and display live health metrics. Designed with accuracy and reliability in mind for continuous personal health monitoring.`
    },
    "Malaysia Travel Guide App": {
        images: ["travel1.png", "travel2.png", "travel3.png", "travel4.png"],
        chips: ["Mobile App", "UX Design", "Travel Tech"],
        desc: `Created a localised travel application to help Japanese users navigate Malaysia with ease and confidence. The app features bilingual support, curated attraction guides, local food recommendations, and an offline map mode. Designed with a clean, accessible UI tailored specifically for first-time visitors from Japan.`
    },
    "Virtual Network Lab Setup": {
        images: ["network1.png", "network2.png", "network6.png", "network7.png", "network4.png", "network5.png"],
        chips: ["Networking", "Virtualisation", "Lab Environment"],
        desc: `Designed and built virtual lab environments to practise network configuration, troubleshooting, and CCNA-level concepts. Using tools such as Cisco Packet Tracer and VirtualBox, the lab simulates real-world network topologies including VLANs, routing protocols, and firewall configurations to build hands-on networking skills.`
    },
    "AI-Powered Video Content": {
        images: ["ai3.png","ai1.png", "ai2.png", "ai4.png"],
        chips: ["AI Tools", "Content Creation", "Marketing"],
        desc: `Produced short-form AI-assisted videos for marketing and digital content engagement. Leveraged AI tools for scriptwriting, voiceover generation, and video editing to create compelling social media content at scale. The workflow reduced production time significantly while maintaining consistent brand quality.`
    }
};

/* ──────────────────────────────────────────────
   MODAL LOGIC
──────────────────────────────────────────────── */
function initModal() {
    const overlay = document.getElementById("modalOverlay");
    const closeBtn = document.getElementById("modalClose");
    const slidesWrap = document.getElementById("modalSlides");
    const dotsWrap = document.getElementById("modalDots");
    const titleEl = document.getElementById("modalTitle");
    const chipsEl = document.getElementById("modalChips");
    const descEl = document.getElementById("modalDesc");
    const prevBtn = document.getElementById("modalPrev");
    const nextBtn = document.getElementById("modalNext");

    let currentSlide = 0;
    let totalSlides = 0;

    function goTo(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        slidesWrap.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll(".modal-dot").forEach((d, i) => {
            d.classList.toggle("active", i === currentSlide);
        });
    }

    function openModal(title) {
        const data = projectData[title];
        if (!data) return;

        // title & description
        titleEl.textContent = title;
        descEl.textContent = data.desc;

        // chips
        chipsEl.innerHTML = data.chips
            .map(c => `<span class="modal-chip">${c}</span>`)
            .join("");

        // slides
        slidesWrap.innerHTML = data.images
            .map(src => `
        <div class="modal-slide">
          <img src="${src}" alt="${title}" />
        </div>`)
            .join("");

        // dots
        totalSlides = data.images.length;
        dotsWrap.innerHTML = data.images
            .map((_, i) => `<button class="modal-dot${i === 0 ? " active" : ""}" data-index="${i}"></button>`)
            .join("");

        dotsWrap.querySelectorAll(".modal-dot").forEach(dot => {
            dot.addEventListener("click", () => goTo(Number(dot.dataset.index)));
        });

        currentSlide = 0;
        slidesWrap.style.transform = "translateX(0)";
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    // attach "View Details" links
    document.querySelectorAll(".card-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const card = link.closest(".project-card");
            const title = card.querySelector(".card-title").textContent.trim();
            openModal(title);
        });
    });

    // arrows
    prevBtn.addEventListener("click", () => goTo(currentSlide - 1));
    nextBtn.addEventListener("click", () => goTo(currentSlide + 1));

    // close
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    // keyboard
    document.addEventListener("keydown", (e) => {
        if (!overlay.classList.contains("open")) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") goTo(currentSlide - 1);
        if (e.key === "ArrowRight") goTo(currentSlide + 1);
    });

    // touch swipe
    let touchStartX = 0;
    slidesWrap.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    slidesWrap.addEventListener("touchend", (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(currentSlide + (diff > 0 ? 1 : -1));
    }, { passive: true });
}
