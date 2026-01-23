/* ================= LOGIN BUTTON ================= */
function showMsg() {
  alert("Login functionality will be implemented in the next phase.");
}

/* ================= SMOOTH SCROLL FOR NAV LINKS ================= */
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    if (targetId.startsWith("#")) {
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});

/* ================= HERO BUTTON ACTION ================= */
const heroButtons = document.querySelectorAll("#home button");

heroButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("#subjects").scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* ================= ACTIVE NAV LINK ON SCROLL ================= */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = "#" + section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.style.color = "#e5e7eb";

    if (link.getAttribute("href") === currentSection) {
      link.style.color = "#38bdf8";
    }
  });
});

/* ================= SCROLL REVEAL EFFECT ================= */
const revealElements = document.querySelectorAll("section");

function revealOnScroll() {
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.6s ease";
    } else {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ================= CONSOLE MESSAGE (PROFESSIONAL TOUCH) ================= */
console.log("College Notes Web Portal loaded successfully.");
