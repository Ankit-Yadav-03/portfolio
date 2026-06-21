// Highlight the current section in the nav as the user scrolls.
// Deliberately minimal — no scroll-triggered fade animations on every section.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

const setActive = () => {
  let current = "home";
  const scrollPos = window.scrollY + window.innerHeight * 0.3;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.style.color = link.getAttribute("href") === `#${current}` ? "var(--accent)" : "";
  });
};

window.addEventListener("scroll", setActive, { passive: true });
setActive();
