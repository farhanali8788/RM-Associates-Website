/* ================= HTML INCLUDE ================= */
function includeHTML(callback) {
  const elements = document.querySelectorAll("[include-html]");
  let remaining = elements.length;

  if (remaining === 0 && callback) callback();

  elements.forEach((el) => {
    const file = el.getAttribute("include-html");

    fetch(file)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load: ${file}`);
        }
        return res.text();
      })
      .then((data) => {
        el.innerHTML = data;
        el.removeAttribute("include-html");

        remaining--;
        if (remaining === 0 && callback) callback();
      })
      .catch((err) => {
        console.error(err);
        el.innerHTML = "Include failed.";
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
  const dotsBox = document.querySelector(".carousel-dots");

  const originals = [...track.children];
  originals.forEach((c) => track.appendChild(c.cloneNode(true)));

  let index = 0,
    autoTimer;
  const DELAY = 2000;
  const cards = [...track.children];

  /* width */
  const cardW = () => {
    const s = getComputedStyle(cards[0]);
    return cards[0].offsetWidth + parseFloat(s.marginRight);
  };

  /* move */
  function move(anim = true) {
    track.style.transition = anim ? "0.45s ease" : "none";
    track.style.transform = `translateX(-${index * cardW()}px)`;
  }

  /* next */
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

  /* prev */
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

  /* autoplay */
  function startAuto() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => {
      nextSlide();
      startAuto();
    }, DELAY);
  }
  function stopAuto() {
    clearTimeout(autoTimer);
  }

  /* arrows */
  next.onclick = () => {
    stopAuto();
    nextSlide();
    startAuto();
  };
  prev.onclick = () => {
    stopAuto();
    prevSlide();
    startAuto();
  };

  /* dots */
  originals.forEach((_, i) => {
    const d = document.createElement("span");
    d.onclick = () => {
      stopAuto();
      index = i;
      move();
      startAuto();
    };
    dotsBox.appendChild(d);
  });

  function updateDots() {
    dotsBox
      .querySelectorAll("span")
      .forEach((d, i) =>
        d.classList.toggle("active", i === index % originals.length),
      );
  }

  /* drag */
  let startX = 0,
    dragging = false,
    prevX = 0;

  function pos(e) {
    return e.touches ? e.touches[0].clientX : e.pageX;
  }

  function start(e) {
    dragging = true;
    startX = pos(e);
    prevX = -index * cardW();
    track.style.transition = "none";
  }
  function moveDrag(e) {
    if (!dragging) return;
    track.style.transform = `translateX(${prevX + pos(e) - startX}px)`;
  }
  function end() {
    dragging = false;
    const diff =
      parseInt(track.style.transform.replace(/[^-0-9]/g, "")) - prevX;
    diff < -80 ? nextSlide() : diff > 80 ? prevSlide() : move();
  }

  /* events */
  track.ontransitionend = updateDots;

  ["touchstart", "mousedown"].forEach((e) => track.addEventListener(e, start));
  ["touchmove", "mousemove"].forEach((e) =>
    track.addEventListener(e, moveDrag),
  );
  ["touchend", "mouseup", "mouseleave"].forEach((e) =>
    track.addEventListener(e, end),
  );

  window.onresize = () => move(false);
});

// CTA MODAL POPUP
const openBtn = document.getElementById("openModal");
const modal = document.getElementById("quoteModal");
const closeBtn = document.getElementById("closeModal");

openBtn.onclick = () => modal.classList.add("active");
closeBtn.onclick = () => modal.classList.remove("active");

window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
};

// EMAIL_JS
(function () {
  // replace with real key
})();

document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs
    .sendForm(
      "YOUR_SERVICE_ID", // replace
      "YOUR_TEMPLATE_ID", // replace
      this,
    )
    .then(
      function () {
        alert("Message sent successfully!");
        document.getElementById("quoteForm").reset();
      },
      function (error) {
        alert("Failed to send message. Try again!");
        console.log(error);
      },
    );
});

// individual services images slider
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sliderContainer").forEach((sliderContainer) => {
    const slider = sliderContainer.querySelector(".slider");
    let slides = [...slider.querySelectorAll(".slide")];
    const nextBtn = sliderContainer.querySelector(".next");
    const prevBtn = sliderContainer.querySelector(".prev");
    const dotsContainer = sliderContainer.querySelector(".dots");

    let currentIndex = 1;
    let isAnimating = false;

    /* CLONE FIRST & LAST */
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    slides = [...slider.querySelectorAll(".slide")];
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    /* CREATE DOTS */
    slides.forEach((slide, index) => {
      if (index === 0 || index === slides.length - 1) return;

      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === currentIndex) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    });

    const allDots = [...dotsContainer.querySelectorAll(".dot")];

    function updateDots() {
      allDots.forEach((dot) => dot.classList.remove("active"));

      if (currentIndex === 0) {
        allDots[allDots.length - 1].classList.add("active");
      } else if (currentIndex === slides.length - 1) {
        allDots[0].classList.add("active");
      } else {
        allDots[currentIndex - 1].classList.add("active");
      }
    }

    function updateSlide() {
      slider.style.transition = "0.5s";
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();

      setTimeout(() => {
        if (currentIndex >= slides.length - 1) {
          slider.style.transition = "none";
          currentIndex = 1;
          slider.style.transform = `translateX(-100%)`;
        }

        if (currentIndex <= 0) {
          slider.style.transition = "none";
          currentIndex = slides.length - 2;
          slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
      }, 500);
    }

    function nextSlide() {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex++;
      updateSlide();
      setTimeout(() => (isAnimating = false), 500);
    }

    function prevSlide() {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex--;
      updateSlide();
      setTimeout(() => (isAnimating = false), 500);
    }

    function goToSlide(index) {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex = index + 1;
      updateSlide();
      setTimeout(() => (isAnimating = false), 500);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    allDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });
  });
});

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  includeHTML(() => {
    // 🔥 RUN AFTER HEADER LOADS
    emailjs.init("YOUR_PUBLIC_KEY");
    move(false);
    startAuto();
    setFooterYear();
  });
});
