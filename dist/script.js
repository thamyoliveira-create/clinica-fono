const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionFrame = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const updateDepth = () => {
  motionFrame = 0;
  if (motionQuery.matches) return;

  const scrollY = window.scrollY;
  const heroProgress = clamp(scrollY / Math.max(window.innerHeight * 1.15, 1), 0, 1);
  document.documentElement.style.setProperty("--scroll-y", String(scrollY));
  document.documentElement.style.setProperty("--scroll-progress", heroProgress.toFixed(3));

  document.querySelectorAll(".approach-visual, .care-grid, .quote-inner").forEach((element) => {
    const rect = element.getBoundingClientRect();
    const progress = clamp((window.innerHeight * 0.82 - rect.top) / (window.innerHeight * 0.95), 0, 1);
    element.style.setProperty("--section-progress", progress.toFixed(3));
  });
};

const requestDepthUpdate = () => {
  if (motionFrame) return;
  motionFrame = window.requestAnimationFrame(updateDepth);
};

updateDepth();
window.addEventListener("scroll", requestDepthUpdate, { passive: true });
window.addEventListener("resize", requestDepthUpdate, { passive: true });
motionQuery.addEventListener?.("change", requestDepthUpdate);

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const closeMobileMenu = () => {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  mobileNav.hidden = true;
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mobileNav.hidden = isOpen;
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-list details").forEach((otherItem) => {
      if (otherItem !== item) otherItem.removeAttribute("open");
    });
  });
});

document.querySelector("[data-year]")?.replaceChildren(String(new Date().getFullYear()));

const demoForm = document.querySelector("[data-demo-form]");
const formStatus = document.querySelector("[data-form-status]");

demoForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = new FormData(demoForm).get("nome")?.toString().trim() || "você";
  formStatus.textContent = `Obrigada, ${name}. Este formulário está pronto para ser conectado ao WhatsApp ou à agenda da clínica.`;
  demoForm.reset();
});
