// Reveal on Scroll Animation
window.addEventListener("scroll", () => {
  let reveals = document.querySelectorAll(".reveal");

  reveals.forEach((section) => {
    let windowHeight = window.innerHeight;
    let elementTop = section.getBoundingClientRect().top;
    let visible = 120;

    if (elementTop < windowHeight - visible) {
      section.classList.add("active");
    }
  });
});
