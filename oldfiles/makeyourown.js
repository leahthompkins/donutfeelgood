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
document.getElementById('finalize-donut').addEventListener('click', () => {
  // Add collapse class to all donut layers
  ['#base-carousel', '#glaze-carousel', '#topping-carousel'].forEach(id => {
    const el = document.querySelector(id);
    if (el) el.classList.add('collapse');
  });

  // Optionally fade out other buttons (like dice, finalize)
  document.getElementById('randomize-donut')?.classList.add('fade-out');
  document.getElementById('finalize-donut')?.classList.add('fade-out');

  // Then reveal name + mood inputs after a short delay
  setTimeout(() => {
    document.querySelector('.donut-metadata-form')?.classList.add('visible');
  }, 700);
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
  }, 2000);

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
