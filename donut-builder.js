
let baseSplide, glazeSplide, toppingSplide;
let currentShape = null;

const glazeOptions = {
  round: [
    "assets/glaze1.png",
    "assets/glaze2.png",
    "assets/glaze3.png",
        "assets/glaze4.png",
    "assets/glaze5.png",
        "assets/glaze6.png"
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
    "assets/bar-topping3.png",
    "assets/bar-topping4.png"
    ]
    
    
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
  
  const nameInput = document.getElementById('donut-name');
const charCount = document.getElementById('char-count');

nameInput.addEventListener('input', () => {
  const length = nameInput.value.length;
  charCount.textContent = `${length} / 20`;

  if (length > 20) {
    charCount.style.color = 'red';
  } else if (length > 16) {
    charCount.style.color = 'orange';
  } else {
    charCount.style.color = '#666';
  }
});

  
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

function flattenDonutToCanvas() {
  const canvas = document.getElementById('donutCanvas'); // Reuse existing canvas
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const getCurrentImage = (splideInstance) => {
    const slide = splideInstance.Components.Slides.getAt(splideInstance.index);
    return slide ? slide.slide.querySelector('img') : null;
  };

  const baseImg = getCurrentImage(baseSplide);
  const glazeImg = getCurrentImage(glazeSplide);
  const toppingImg = getCurrentImage(toppingSplide);

  [baseImg, glazeImg, toppingImg].forEach(img => {
    if (img) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });

  return canvas;
}

function saveDonutToLocalStorage() {
  const canvas = flattenDonutToCanvas();
  const dataURL = canvas.toDataURL(); // PNG Base64

  const nameInput = document.getElementById('donut-name');
  const typeInput = document.getElementById('donut-type');

  const donutName = nameInput.value.trim();
  const donutMood = typeInput.value;

  // ❌ Require both name and mood
  if (!donutName || !donutMood) {
    alert("Please enter a donut name and select a mood before saving.");
    return;
  }
  
    // ❌ Enforce max character limit for name
  if (donutName.length > 20) {
    alert("Donut name must be 20 characters or fewer.");
    return;
  }
  
  const donutData = {
    name: donutName,
    mood: donutMood,
    image: dataURL,
    date: new Date().toISOString()
  };

  // Save to gallery
const existing = JSON.parse(localStorage.getItem('donutGallery') || '[]');

// Add new donut to the front
existing.unshift(donutData);

// Keep only the most recent 10
const trimmed = existing.slice(0, 10);

// Save it back
localStorage.setItem('donutGallery', JSON.stringify(trimmed));

  // Hide form and button
  nameInput.style.display = 'none';
  typeInput.style.display = 'none';

  // Replace Save button with a "Saved!" message
  const wrapper = document.getElementById('save-wrapper');
  wrapper.innerHTML = `<span style="font-weight: bold; color: green;">Saved "${donutName}"!</span>`;
}


const saveButton = document.getElementById('saveDonut');
const warning = document.getElementById('save-warning');
const existing = JSON.parse(localStorage.getItem('donutGallery') || '[]');

if (existing.length >= 10) {
  saveButton.style.display = 'none';
  warning.style.display = 'block';
} else {
  saveButton.style.display = 'inline-block';
  warning.style.display = 'none';
  saveButton.addEventListener('click', saveDonutToLocalStorage);
}