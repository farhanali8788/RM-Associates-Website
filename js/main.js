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
setInterval(next, 6000);

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

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  includeHTML(() => {
    // 🔥 RUN AFTER HEADER LOADS

    setFooterYear();
  });
});
