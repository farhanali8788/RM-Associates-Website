/* ================= HTML INCLUDE ================= */
function includeHTML(callback) {
  const elements = document.querySelectorAll("[include-html]");
  let remaining = elements.length;

  if (remaining === 0 && callback) callback();

  elements.forEach((el) => {
    const file = el.getAttribute("include-html");

    fetch(file)
      .then((res) => res.text())
      .then((data) => {
        el.innerHTML = data;
        el.removeAttribute("include-html");

        remaining--;
        if (remaining === 0 && callback) callback();
      });
  });
}

/* FOOTER YEAR */
function setFooterYear() {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();
}
/* HERO SLIDER */

let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let index = 0;

function showSlide() {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  slides[index].classList.add("active");
  slides[index].querySelector(".hero-content").classList.add("animate");
  dots[index].classList.add("active");
}

function next() {
  index = (index + 1) % slides.length;
  showSlide();
}

function prev() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide();
}

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn && prevBtn && slides.length) {
  nextBtn.onclick = next;
  prevBtn.onclick = prev;
  setInterval(next, 6000);
}
function goSlide(i) {
  index = i;
  showSlide();
}

/* PROCESS SLIDER */

let processSlides = document.querySelectorAll(".process-slide");
let processIndex = 0;
let progressBar = document.querySelector(".process-progress span");

function showProcessSlide() {
  const track = document.querySelector(".process-track");
  track.style.transform = `translateX(-${processIndex * 100}%)`;

  /* update progress */
  let percent = ((processIndex + 1) / processSlides.length) * 100;
  progressBar.style.width = percent + "%";
}

function nextProcess() {
  processIndex = (processIndex + 1) % processSlides.length;
  showProcessSlide();
}

function prevProcess() {
  processIndex =
    (processIndex - 1 + processSlides.length) % processSlides.length;
  showProcessSlide();
}

const processNextBtn = document.querySelector(".process-btn.next");
const processPrevBtn = document.querySelector(".process-btn.prev");

if (processNextBtn && processPrevBtn && processSlides.length) {
  processNextBtn.onclick = nextProcess;
  processPrevBtn.onclick = prevProcess;

  setInterval(nextProcess, 6000);
}

/* TESTIMONIAL SLIDER */

let testimonialSlides = document.querySelectorAll(".testimonial-card");
let testimonialIndex = 0;
let testimonialTrack = document.querySelector(".ts-track");

function showTestimonial() {
  let slideWidth = testimonialSlides[0].offsetWidth;
  testimonialTrack.style.transform = `translateX(-${
    testimonialIndex * slideWidth
  }px)`;
}

function nextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
  showTestimonial();
}

function prevTestimonial() {
  testimonialIndex =
    (testimonialIndex - 1 + testimonialSlides.length) %
    testimonialSlides.length;
  showTestimonial();
}

const testimonialNextBtn = document.querySelector(".ts-btn.next");
const testimonialPrevBtn = document.querySelector(".ts-btn.prev");

if (testimonialNextBtn && testimonialPrevBtn && testimonialSlides.length) {
  testimonialNextBtn.onclick = nextTestimonial;
  testimonialPrevBtn.onclick = prevTestimonial;

  /* AUTO SLIDE */
  setInterval(nextTestimonial, 5000);
}

// FAQ SECTION
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    document.querySelectorAll(".faq-item").forEach((faq) => {
      if (faq !== item) {
        faq.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

// ABOUT DATA COUNTER
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

  const pos = section.getBoundingClientRect().top;
  if (pos < window.innerHeight - 150) {
    startCount();
  }
});

// SERVICES CARDS
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dotsContainer = document.querySelector(".carousel-dots");

  const originalCards = Array.from(track.children);

  /* DUPLICATE FOR LOOP */
  originalCards.forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });

  const cards = Array.from(track.children);
  let index = 0;

  function cardWidth() {
    const style = getComputedStyle(cards[0]);
    return cards[0].offsetWidth + parseFloat(style.marginRight);
  }

  function update(animate = true) {
    track.style.transition = animate ? "transform 0.45s ease" : "none";
    track.style.transform = `translateX(-${index * cardWidth()}px)`;
  }

  /* NEXT */
  function nextSlide() {
    index++;
    update(true);

    if (index >= originalCards.length * 2) {
      setTimeout(() => {
        track.style.transition = "none";
        index = index % originalCards.length;
        update(false);
      }, 450);
    }
  }

  /* PREV */
  function prevSlide() {
    index--;
    update(true);

    if (index < 0) {
      setTimeout(() => {
        track.style.transition = "none";
        index = originalCards.length - 1;
        update(false);
      }, 450);
    }
  }

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  /* DOTS */
  originalCards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      index = i;
      update(true);
    });
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    const dots = dotsContainer.querySelectorAll("span");
    dots.forEach((d) => d.classList.remove("active"));
    dots[index % originalCards.length].classList.add("active");
  }

  track.addEventListener("transitionend", updateDots);
});

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  includeHTML(() => {
    // 🔥 RUN AFTER HEADER LOADS
    update(false);
    setFooterYear();
  });
});
