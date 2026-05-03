/* ═══════════════════════════════════════════════
   ELMER TANG — PORTFOLIO JAVASCRIPT
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
});