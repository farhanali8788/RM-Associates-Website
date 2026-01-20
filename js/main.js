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

/* ================= HERO SLIDER ================= */
/* ================= TESTING PROCESS SLIDER ================= */
function initProcessSlider() {
  const track = document.querySelector(".process-track");
  const slides = document.querySelectorAll(".process-slide");
  const nextBtn = document.querySelector(".process-btn.next");
  const prevBtn = document.querySelector(".process-btn.prev");
  const progress = document.querySelector(".process-progress span");

  if (!track || slides.length === 0) return;

  let index = 0;

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + 30; // 30 is the gap/margin
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

/* ================= TESTIMONIAL SLIDER ================= */
function initTestimonialSlider() {
  const track = document.querySelector(".ts-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const nextBtn = document.querySelector(".ts-btn.next");
  const prevBtn = document.querySelector(".ts-btn.prev");

  if (!track || cards.length === 0) return;

  let index = 0;

  function move() {
    const cardWidth = cards[0].offsetWidth + 20; // 20 is the gap
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

/* ================= FAQ ================= */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    document.querySelectorAll(".faq-item").forEach((faq) => {
      if (faq !== item) faq.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

/* ================= COUNTERS ================= */
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

window.addEventListener("scroll", () => {
  const section = document.querySelector(".stats-section");
  if (!section) return;

  if (section.getBoundingClientRect().top < window.innerHeight - 150) {
    startCount();
  }
});

/* ================= SERVICES CAROUSEL SAFE ================= */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  if (!track) return; // FIX

  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dotsBox = document.querySelector(".carousel-dots");

  const originals = [...track.children];
  originals.forEach((c) => track.appendChild(c.cloneNode(true)));

  let index = 0,
    autoTimer;
  const DELAY = 2000;
  const cards = [...track.children];

  const cardW = () => {
    const s = getComputedStyle(cards[0]);
    return cards[0].offsetWidth + parseFloat(s.marginRight);
  };

  function move(anim = true) {
    track.style.transition = anim ? "0.45s ease" : "none";
    track.style.transform = `translateX(-${index * cardW()}px)`;
  }

  function nextSlide() {
    index++;
    move();
    if (index >= originals.length * 2) {
      setTimeout(() => {
        index %= originals.length;
        move(false);
      }, 390);
    }
  }

  function prevSlide() {
    index--;
    move();
    if (index < 0) {
      setTimeout(() => {
        index = originals.length - 1;
        move(false);
      }, 390);
    }
  }

  function startAuto() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => {
      nextSlide();
      startAuto();
    }, DELAY);
  }

  next.onclick = () => {
    nextSlide();
    startAuto();
  };

  prev.onclick = () => {
    prevSlide();
    startAuto();
  };

  window.onresize = () => move(false);
});

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  includeHTML(() => {
    fixNavbarLinks();
    fixFooterLinks();
    setFooterYear();
    initProcessSlider();
    initTestimonialSlider();
  });
});
