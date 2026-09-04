const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

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
