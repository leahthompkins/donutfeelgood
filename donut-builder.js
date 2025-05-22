
let baseSplide, glazeSplide, toppingSplide;
let currentShape = null;

const glazeOptions = {
  round: [
    "assets/glaze1.png",
    "assets/glaze2.png",
    "assets/glaze3.png"
  ],
  long: [
    "assets/bar-glaze1.png",
    "assets/bar-glaze2.png",
    "assets/bar-glaze3.png"
  ]
};

const toppingOptions = {
  round: [
    "assets/topping1.png",
    "assets/topping2.png",
    "assets/topping3.png",
    "assets/topping4.png"
  ],
  long: [
    "assets/bar-topping1.png",
    "assets/bar-topping2.png",
    "assets/bar-topping3.png"  ]
};

function rebuildCarousel(id, images, currentIndex) {
  const list = document.querySelector(`#${id} .splide__list`);
  list.innerHTML = "";

  images.forEach(src => {
    const li = document.createElement("li");
    li.classList.add("splide__slide");
    li.innerHTML = `<img src="${src}" alt="">`;
    list.appendChild(li);
  });

  const newSplide = new Splide(`#${id}`, {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    pagination: false,
    arrows: true,
    drag: true,
  });

  newSplide.mount();
  newSplide.go(currentIndex);
  return newSplide;
}

document.addEventListener('DOMContentLoaded', function () {
  baseSplide = new Splide('#base-carousel', {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    pagination: false,
    arrows: true,
    drag: true,
  }).mount();

  glazeSplide = new Splide('#glaze-carousel', {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    pagination: false,
    arrows: true,
    drag: true,
  }).mount();

  toppingSplide = new Splide('#topping-carousel', {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    pagination: false,
    arrows: true,
    drag: true,
  }).mount();

  document.getElementById('confirm-button').addEventListener('click', function () {
    const details = document.getElementById('donut-details');
    document.querySelector('.carousel-container').classList.add('shift-up');
    details.style.display = 'flex';
    setTimeout(() => details.classList.add('visible'), 300);

    baseSplide.options = { drag: false, arrows: false };
    glazeSplide.options = { drag: false, arrows: false };
    toppingSplide.options = { drag: false, arrows: false };

    document.getElementById('confirm-button').style.display = 'none';
    document.getElementById('dice-button').style.display = 'none';
    document.getElementById('edit-button').style.display = 'inline-block';
  });

  document.getElementById('edit-button').addEventListener('click', function () {
    const details = document.getElementById('donut-details');
    details.classList.remove('visible');
    setTimeout(() => details.style.display = 'none', 500);

    document.querySelector('.carousel-container').classList.remove('shift-up');

    baseSplide.options = { drag: true, arrows: true };
    glazeSplide.options = { drag: true, arrows: true };
    toppingSplide.options = { drag: true, arrows: true };

    document.getElementById('edit-button').style.display = 'none';
    document.getElementById('confirm-button').style.display = 'inline-block';
    document.getElementById('dice-button').style.display = 'inline-block';
  });

  document.getElementById('dice-button').addEventListener('click', function () {
    const baseIndex = Math.floor(Math.random() * baseSplide.length);
    const glazeIndex = Math.floor(Math.random() * glazeSplide.length);
    const toppingIndex = Math.floor(Math.random() * toppingSplide.length);

    baseSplide.go(baseIndex);
    glazeSplide.go(glazeIndex);
    toppingSplide.go(toppingIndex);
  });

  baseSplide.on('moved', function (newIndex) {
    const slide = baseSplide.Components.Slides.getAt(newIndex).slide;
    const shape = slide.dataset.shape || 'round';

    if (shape !== currentShape) {
      currentShape = shape;

      const glazeIndex = glazeSplide.index;
      const toppingIndex = toppingSplide.index;

      glazeSplide.destroy();
      toppingSplide.destroy();

      glazeSplide = rebuildCarousel("glaze-carousel", glazeOptions[shape], glazeIndex);
      toppingSplide = rebuildCarousel("topping-carousel", toppingOptions[shape], toppingIndex);
    }
  });
});
