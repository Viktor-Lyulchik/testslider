const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;
let index = 0;
let startX = 0;
let isDragging = false;

// Функція визначення, скільки фото видно одночасно
function getSlidesPerView() {
  if (window.innerWidth >= 1280) return 3; // Десктоп (без свайпу)
  if (window.innerWidth >= 768) return 2; // Планшет (2 фото)
  return 1; // Мобільний (1 фото)
}

// Оновлення положення слайдів
function updateSlidePosition() {
  const slidesPerView = getSlidesPerView();
  const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
  index = Math.max(0, Math.min(index, maxIndex)); // Обмежуємо index
  slides.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;
}

// Переміщення слайдів
function moveSlide(direction) {
  if (window.innerWidth >= 1280) return; // Вимикаємо свайп на десктопі
  index += direction;
  updateSlidePosition();
}

// Обробка свайпів
slides.addEventListener('touchstart', e => {
  if (window.innerWidth >= 1280) return;
  startX = e.touches[0].clientX;
  isDragging = true;
});

slides.addEventListener('touchmove', e => {
  if (!isDragging || window.innerWidth >= 1280) return;
  let moveX = e.touches[0].clientX;
  let diff = startX - moveX;

  if (Math.abs(diff) > 50) {
    // Мінімальна відстань для свайпу
    moveSlide(diff > 0 ? 1 : -1);
    isDragging = false;
  }
});

slides.addEventListener('touchend', () => {
  isDragging = false;
});

// Перевіряємо розмір екрану при завантаженні
window.addEventListener('resize', updateSlidePosition);
updateSlidePosition();
