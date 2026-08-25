/* ─── Scroll Reveal ─── */

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}


/* ─── Active Navigation ─── */

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];

const setActiveSection = () => {
  if (!sections.length || !navLinks.length) return;

  const scrollPoint = window.scrollY + window.innerHeight * 0.3;

  let current = sections[0].id;

  for (const section of sections) {
    if (scrollPoint >= section.offsetTop) {
      current = section.id;
    } else {
      break;
    }
  }

  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;

    link.classList.toggle("active", active);

    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

let scrollTicking = false;

window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;

    scrollTicking = true;

    requestAnimationFrame(() => {
      setActiveSection();
      updateScrollProgress();
      scrollTicking = false;
    });
  },
  { passive: true }
);


/* ─── Smooth Navigation ─── */

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });

    history.replaceState(null, "", link.getAttribute("href"));
  });
});


/* ─── Scroll Progress ─── */

const updateScrollProgress = () => {
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollHeight > 0
      ? (window.scrollY / scrollHeight) * 100
      : 0;

  document.documentElement.style.setProperty(
    "--scroll-progress",
    `${progress}%`
  );
};


/* ─── Terminal Interaction ─── */

const terminal = document.querySelector(".terminal");

if (terminal && !prefersReducedMotion) {
  terminal.addEventListener("pointermove", (event) => {
    const rect = terminal.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    terminal.style.setProperty("--mouse-x", `${x * 4}px`);
    terminal.style.setProperty("--mouse-y", `${y * 4}px`);
  });

  terminal.addEventListener("pointerleave", () => {
    terminal.style.setProperty("--mouse-x", "0px");
    terminal.style.setProperty("--mouse-y", "0px");
  });
}


/* ─── Initialization ─── */

window.addEventListener("load", () => {
  setActiveSection();
  updateScrollProgress();
});
