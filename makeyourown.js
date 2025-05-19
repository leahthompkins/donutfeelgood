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

  // Initialize and return Splide instance
  const splide = new Splide(selector, {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    pagination: false,
    arrows: false,
    drag: true,
    autoWidth: false,
  
  });

  splide.mount();
  return splide;
}

// Replace with actual paths to your donut layer images
const baseImages = ['assets/base1.png', 'assets/base2.png', 'assets/base3.png'];
const glazeImages = ['assets/glaze1.png', 'assets/glaze2.png', 'assets/glaze3.png'];
const toppingImages = ['assets/topping1.png', 'assets/topping2.png', 'assets/topping3.png','assets/topping4.png' ];

let baseSplide, glazeSplide, toppingSplide;

document.addEventListener('DOMContentLoaded', () => {
  baseSplide = initSplide('#base-carousel', baseImages);
  glazeSplide = initSplide('#glaze-carousel', glazeImages);
  toppingSplide = initSplide('#topping-carousel', toppingImages);

  // Fade instructions after 5 seconds
  setTimeout(() => {
    const el = document.querySelector('.donut-instructions');
    if (el) el.style.opacity = '0';
  }, 5000);

  // 🎲 Randomizer
  const randomBtn = document.getElementById('randomize-donut');
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      function randomize(splide) {
        const slides = splide.Components.Slides.get().length;
        const index = Math.floor(Math.random() * slides);
        splide.go(index);
      }

      randomize(baseSplide);
      randomize(glazeSplide);
      randomize(toppingSplide);
    });
  }
});
