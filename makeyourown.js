function initSplide(selector, images) {
  const root = document.querySelector(selector);

  // Inject valid Splide HTML structure
  root.innerHTML = `
    <div class="splide__track">
      <ul class="splide__list">
        ${images.map(src => `<li class="splide__slide"><img src="${src}" alt="donut part" /></li>`).join('')}
      </ul>
    </div>
  `;

  // Initialize Splide on that element
  new Splide(selector, {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    pagination: false,
    arrows: false,
    drag: true,
    autoWidth: false,
  }).mount();
}

// Replace with actual paths to your donut layer images
const baseImages = ['assets/base1.png', 'assets/base2.png','assets/base3.png'];
const glazeImages = ['assets/glaze1.png','assets/glaze2.png', 'assets/glaze3.png'];
const toppingImages = ['images/pink.jpg', 'images/pistachio.png', 'images/powdered.png'];

document.addEventListener('DOMContentLoaded', () => {
  initSplide('#base-carousel', baseImages);
  initSplide('#glaze-carousel', glazeImages);
  initSplide('#topping-carousel', toppingImages);
});
