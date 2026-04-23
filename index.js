/* ── Hamburger menu toggle ───────────────────────────────── */
const burger = document.querySelector(".nav-burger");
const mobileMenu = document.querySelector(".mobile-menu");

burger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  burger.classList.toggle("is-open", isOpen);
  burger.setAttribute("aria-expanded", isOpen);
  mobileMenu.setAttribute("aria-hidden", !isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });
});

/* ── Navbar: solid background on scroll ──────────────────── */
const nav = document.querySelector(".site-nav");

window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 60);
  },
  { passive: true },
);

/* ── Hero parallax ───────────────────────────────────────────── */
const heroPhoto = document.querySelector(".hero-photo");

window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    if (y >= window.innerHeight) return;
    if (heroPhoto)
      heroPhoto.style.transform = `translateY(${y * 0.12}px) scale(1.04)`;
  },
  { passive: true },
);

/* ── Scroll-triggered reveal (IntersectionObserver) ─────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);

document.querySelectorAll("[data-animate], [data-stagger]").forEach((el) => {
  revealObserver.observe(el);
});

/* ── Active nav link highlight on scroll ────────────────── */
const sections = document.querySelectorAll("section[id], footer[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((a) => {
        a.style.opacity = a.getAttribute("href") === `#${id}` ? "1" : "0.6";
      });
    });
  },
  { threshold: 0.4 },
);

sections.forEach((s) => sectionObserver.observe(s));

/* ── Smooth CTA button hover pulse ──────────────────────── */
document.querySelectorAll(".btn-gradient, .btn-nav").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 8px 32px rgba(255,78,0,0.35)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "";
  });
});

/* ── Phase card tilt on hover ────────────────────────────── */
document.querySelectorAll(".phase-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-8px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ── Milestone timeline: line draw on scroll ─────────────── */
const timeline = document.querySelector(".timeline");
if (timeline) {
  const lineObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        timeline.style.setProperty("--line-scale", "1");
        lineObserver.disconnect();
      }
    },
    { threshold: 0.05 },
  );
  lineObserver.observe(timeline);
}

/* ── Accordion functionality ─────────────────────────────── */
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.closest(".accordion-item");
    const content = accordionItem.querySelector(".accordion-content");
    const isExpanded = header.getAttribute("aria-expanded") === "true";

    // Close all other accordions
    document.querySelectorAll(".accordion-item").forEach((item) => {
      if (item !== accordionItem) {
        const otherHeader = item.querySelector(".accordion-header");
        const otherContent = item.querySelector(".accordion-content");
        otherHeader.setAttribute("aria-expanded", "false");
        item.removeAttribute("data-expanded");
        otherContent.style.maxHeight = "0px";
      }
    });

    // Toggle current accordion
    if (isExpanded) {
      header.setAttribute("aria-expanded", "false");
      accordionItem.removeAttribute("data-expanded");
      content.style.maxHeight = "0px";
    } else {
      header.setAttribute("aria-expanded", "true");
      accordionItem.setAttribute("data-expanded", "true");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
