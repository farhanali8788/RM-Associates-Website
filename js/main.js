/* ================= HTML INCLUDE ================= */
function includeHTML(callback) {
  const elements = document.querySelectorAll("[include-html]");
  let remaining = elements.length;

  if (remaining === 0 && callback) callback();

  elements.forEach((el) => {
    const file = el.getAttribute("include-html");

    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.text();
      })
      .then((data) => {
        el.innerHTML = data;
        el.removeAttribute("include-html");

        remaining--;
        if (remaining === 0 && callback) callback();
      })
      .catch(() => {
        el.innerHTML = "Include failed.";
      });
  });
}

/* ================= NAVBAR LINKS ================= */
function fixNavbarLinks() {
  const isServicePage = location.pathname.includes("/services/");
  const base = isServicePage ? "../" : "./";

  const set = (id, path) => {
    const el = document.getElementById(id);
    if (el) el.href = base + path;
  };

  // DESKTOP
  set("navHome", "index.html");
  set("navHome2", "index.html");
  set("navAbout", "about.html");
  set("navServices", "services/index.html");
  set("navProjects", "projects.html");
  set("navContact", "contacts.html");

  set("navHighway", "services/highway-testing.html");
  set("navBitumen", "services/bitumen-testing.html");
  set("navNdt", "services/ndt-testing.html");
  set("navPileLoadTest", "services/pile-load-testing.html");
  set("navConcreteTesting", "services/concrete-testing.html");
  set("navProjectManagement", "services/project-management.html");
  set("navSoilInvestigation", "services/soil-investigation.html");
  set("navStructuralDesign", "services/structural-design.html");
  set("navStructuralStability", "services/structural-stability.html");
  set("navSurvey", "services/survey.html");

  // MOBILE
  set("mbnavHome2", "index.html");
  set("mbnavAbout", "about.html");
  set("mbnavServices", "services/index.html");
  set("mbnavProjects", "projects.html");
  set("mbnavContact", "contacts.html");

  set("mbnavHighway", "services/highway-testing.html");
  set("mbnavBitumen", "services/bitumen-testing.html");
  set("mbnavNdt", "services/ndt-testing.html");
  set("mbnavPileLoadTest", "services/pile-load-testing.html");
  set("mbnavConcreteTesting", "services/concrete-testing.html");
  set("mbnavProjectManagement", "services/project-management.html");
  set("mbnavSoilInvestigation", "services/soil-investigation.html");
  set("mbnavStructuralDesign", "services/structural-design.html");
  set("mbnavStructuralStability", "services/structural-stability.html");
  set("mbnavSurvey", "services/survey.html");
}

/* ================= FOOTER LINKS ================= */
function fixFooterLinks() {
  const isServicePage = location.pathname.includes("/services/");
  const base = isServicePage ? "../" : "./";

  const set = (id, path) => {
    const el = document.getElementById(id);
    if (el) el.href = base + path;
  };

  set("ftAbout", "about.html");
  set("ftServices", "services/index.html");
  set("ftProjects", "projects.html");
  set("ftContact", "contacts.html");
}

/* ================= FOOTER YEAR ================= */
function setFooterYear() {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();
}

/* ================= HERO SLIDER (Home Page) ================= */
function initHeroSlider() {
  const heroSection = document.querySelector(".hero-slider");
  if (!heroSection) return;

  const slides = heroSection.querySelectorAll(".slide");
  const dots = heroSection.querySelectorAll(".dot");
  const nextBtn = heroSection.querySelector(".next");
  const prevBtn = heroSection.querySelector(".prev");
  let heroIndex = 0;

  function showSlide(n) {
    heroIndex = (n + slides.length) % slides.length;
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));

    slides[heroIndex].classList.add("active");
    dots[heroIndex].classList.add("active");

    // Trigger animation
    const content = slides[heroIndex].querySelector(".hero-content");
    if (content) {
      content.classList.remove("animate");
      void content.offsetWidth; // Trigger reflow
      content.classList.add("animate");
    }
  }

  if (nextBtn) nextBtn.onclick = () => showSlide(heroIndex + 1);
  if (prevBtn) prevBtn.onclick = () => showSlide(heroIndex - 1);

  // Global function for the onclick="goSlide(n)" in your HTML dots
  window.goSlide = (n) => showSlide(n);

  setInterval(() => showSlide(heroIndex + 1), 6000);
}

/* ================= TESTING PROCESS SLIDER (Home Page) ================= */
function initProcessSlider() {
  const track = document.querySelector(".process-track");
  const slides = document.querySelectorAll(".process-slide");
  const nextBtn = document.querySelector(".process-btn.next");
  const prevBtn = document.querySelector(".process-btn.prev");
  const progress = document.querySelector(".process-progress span");

  if (!track || slides.length === 0) return;

  let index = 0;

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 0; // 30 is the gap/margin
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // Update progress bar width
    const progressWidth = ((index + 1) / slides.length) * 100;
    if (progress) progress.style.width = `${progressWidth}%`;
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      if (index < slides.length - 1) {
        index++;
        updateSlider();
      } else {
        index = 0; // Loop back to start
        updateSlider();
      }
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (index > 0) {
        index--;
        updateSlider();
      }
    };
  }

  // Initialize progress bar
  updateSlider();
}

/* ================= TESTIMONIAL SLIDER (Home Page) ================= */
function initTestimonialSlider() {
  const track = document.querySelector(".ts-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const nextBtn = document.querySelector(".ts-btn.next");
  const prevBtn = document.querySelector(".ts-btn.prev");

  if (!track || cards.length === 0) return;

  let index = 0;

  function move() {
    const cardWidth = cards[0].offsetWidth + 0; // 20 is the gap
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      index = (index + 1) % cards.length;
      move();
    };
  }

  if (prevBtn) {
    prevBtn.onclick = () => {
      index = (index - 1 + cards.length) % cards.length;
      move();
    };
  }
}

/* ================= FAQ (Home Page) ================= */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    document.querySelectorAll(".faq-item").forEach((faq) => {
      if (faq !== item) faq.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

/* ================= COUNTERS (About Page) ================= */
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

const startCount = () => {
  if (counterStarted) return;
  counterStarted = true;

  counters.forEach((counter) => {
    const target = +counter.dataset.target;
    let count = 0;
    const speed = target / 90;

    const update = () => {
      if (count < target) {
        count += speed;
        counter.innerText = Math.ceil(count) + "+";
        setTimeout(update, 25);
      } else {
        counter.innerText = target + "+";
      }
    };
    update();
  });
};

/* ================= Scroll (Services Pages) ================= */
window.addEventListener("scroll", () => {
  const section = document.querySelector(".stats-section"); // SINGLE element
  if (!section) return;

  const top = section.getBoundingClientRect().top;

  if (top < window.innerHeight - 150) {
    startCount();
  }
});

/* ================= SERVICES Individual Images  ================= */
function servicesSlider() {
  document.querySelectorAll(".sliderContainer").forEach((container) => {
    const slider = container.querySelector(".slider");
    const slides = container.querySelectorAll(".slide");
    const prev = container.querySelector(".prev");
    const next = container.querySelector(".next");
    const dotsBox = container.querySelector(".dots");

    if (!slider || !prev || !next || !dotsBox) return; // safety check

    let index = 0;
    dotsBox.innerHTML = "";

    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dotsBox.appendChild(dot);

      dot.addEventListener("click", () => {
        index = i;
        update();
      });
    });

    const dots = dotsBox.querySelectorAll(".dot");

    function update() {
      slider.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d) => d.classList.remove("active"));
      dots[index].classList.add("active");
    }

    next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      update();
    });

    prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });
  });
}
document.addEventListener("DOMContentLoaded", servicesSlider);

// get quote fixed button button
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("quoteModal");

// Open modal
openModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("active");
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Close when clicking outside modal
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  includeHTML(() => {
    fixNavbarLinks();
    fixFooterLinks();
    setFooterYear();
    initHeroSlider();
    initProcessSlider();
    initTestimonialSlider();
    servicesSlider();
  });
});
