// Custom scripts

// Smooth Scroll
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
// RUNNING STRING
let textElements = document.querySelectorAll(".running__string-item");
let container = document.querySelector(".running__string");

textElements.forEach((textElement) => {
  let clonedTextElement = textElement.cloneNode(true);
  container.appendChild(clonedTextElement);
});

let position = 0;
let moveAmount = 1;

function scrollText() {
  let containerWidth = container.offsetWidth;
  for (let i = 0; i < textElements.length; i++) {
    textElements[i].style.transform = `translateX(-${position}px`;
  }

  position += moveAmount;
  if (position > containerWidth) {
    position = 0;
  }
}

setInterval(scrollText, 10);

// STEPS SLIDER
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".steps__items__slide");
const totalSlides = slides.length;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotContainer = document.querySelector(".pagination");
const dots = Array.from({ length: totalSlides }, (_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => currentSlide(index));
  dotContainer.insertBefore(dot, nextBtn);
  return dot;
});

function showSlide() {
  slides.forEach((slide, index) => {
    if (index === currentSlideIndex) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });

  dots.forEach((dot, index) => {
    if (index === currentSlideIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  prevBtn.disabled = currentSlideIndex === 0;
  nextBtn.disabled = currentSlideIndex === totalSlides - 1;
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide();
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  showSlide();
}

function currentSlide(n) {
  currentSlideIndex = n;
  showSlide();
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

showSlide();

// MEMBERS SLIDER
let autoSlide = setInterval(() => {
  nextSlideSecond();
}, 4000);

const slidesSecond = document.querySelectorAll(".members__slide");
const slider = document.querySelector(".members__slider");
const prevArrow = document.querySelector(".arrow.prev");
const nextArrow = document.querySelector(".arrow.next");
const counter = document.querySelector(".counter");

let slideIndex = 0;
let totalSlidesSecond = slidesSecond.length;
let slidesToShow = 3;

function showSlideSecond(index, count) {
  let currentPage = Math.ceil((index + 1) / count);
  let totalPages = Math.ceil(totalSlidesSecond / count);
  counter.textContent = `${currentPage}/${totalPages}`;

  slidesSecond.forEach(slide => {
    slide.classList.remove('slide-enter', 'slide-leave');
  });

  for (let i = 0; i < totalSlidesSecond; i++) {
    if (i >= index && i < index + count) {
      slidesSecond[i].classList.add('slide-leave');
      slidesSecond[i].style.display = "block";
    } else {
      slidesSecond[i].classList.add('slide-enter');
      slidesSecond[i].style.display = "none";
    }
  }
}

function nextSlideSecond() {
  if (slideIndex + slidesToShow < totalSlidesSecond) {
    slideIndex += slidesToShow;
  } else {
    slideIndex = 0;
  }
  showSlideSecond(slideIndex, slidesToShow);
}

function prevSlideSecond() {
  if (slideIndex - slidesToShow >= 0) {
    slideIndex -= slidesToShow;
  } else {
    slideIndex = Math.floor(totalSlidesSecond / slidesToShow) * slidesToShow;
  }
  showSlideSecond(slideIndex, slidesToShow);
}

prevArrow.addEventListener("click", () => {
  clearInterval(autoSlide);
  prevSlideSecond();
});

nextArrow.addEventListener("click", () => {
  clearInterval(autoSlide);
  nextSlideSecond();
});

function updateSlidesToShow() {
  if (window.innerWidth >= 1024) {
    slidesToShow = 3;
  } else if (window.innerWidth >= 768) {
    slidesToShow = 2;
  } else {
    slidesToShow = 1;
  }
  showSlideSecond(slideIndex, slidesToShow);
}

window.addEventListener("load", updateSlidesToShow);
window.addEventListener("resize", updateSlidesToShow);

showSlideSecond(slideIndex, slidesToShow);

