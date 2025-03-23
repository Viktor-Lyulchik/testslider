const slides = document.querySelector('.slides');
let index = 0;
let startX = 0;
let isDragging = false;

// Визначаємо, скільки фото має бути на екрані
function getSlidesPerView() {
  if (window.innerWidth >= 1280) return 3; // Десктоп (без свайпу)
  if (window.innerWidth >= 768) return 2; // Планшет (2 фото)
  return 1; // Мобільний (1 фото)
}

// Переміщення слайдів
function moveSlide(direction) {
  if (window.innerWidth >= 1280) return; // Вимикаємо свайп для десктопа
  const totalSlides = slides.children.length;
  const slidesPerView = getSlidesPerView();
  const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;

  index = Math.max(0, Math.min(index + direction, maxIndex));
  slides.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;
}

// Обробка свайпів
slides.addEventListener('touchstart', e => {
  if (window.innerWidth >= 1280) return;
  startX = e.touches[0].clientX;
  isDragging = true;
});

slides.addEventListener('touchmove', e => {
  if (!isDragging || window.innerWidth >= 1024) return;
  let moveX = e.touches[0].clientX;
  let diff = startX - moveX;

  if (Math.abs(diff) > 50) {
    moveSlide(diff > 0 ? 1 : -1);
    isDragging = false;
  }
});

slides.addEventListener('touchend', () => {
  isDragging = false;
});
