const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const dropdowns = document.querySelectorAll(".dropdown");
const revealItems = document.querySelectorAll(".reveal");

const setHeaderState = () => {
  header.dataset.elevated = window.scrollY > 12 ? "true" : "false";
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

const closeDropdowns = (exceptDropdown) => {
  dropdowns.forEach((dropdown) => {
    if (dropdown === exceptDropdown) return;
    dropdown.classList.remove("is-open");
    dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
  });
};

dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = dropdown.classList.contains("is-open");

    closeDropdowns(dropdown);
    dropdown.classList.toggle("is-open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    closeDropdowns();
  });
});

document.addEventListener("click", (event) => {
  if (!mainNav.contains(event.target)) {
    closeDropdowns();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDropdowns();
    navToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }
});

document.querySelectorAll("img[data-fallback]").forEach((image) => {
  image.addEventListener("error", () => {
    const fallbackType = image.dataset.fallback;
    const parent = image.closest("figure, .logo-frame, .footer-brand, .product-card figure");

    if (!parent) return;

    if (fallbackType === "logo") {
      parent.classList.add("logo-missing");
      return;
    }

    parent.classList.add("has-fallback");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
