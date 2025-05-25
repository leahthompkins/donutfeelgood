// Donut App Script.js – Cleaned and Fully Working

let selectedDonut = null;

function displayCurrentBox() {
  const box = document.getElementById('mood-dozen-box');
  const boxName = document.getElementById('mood-box-name');
  if (!box || !boxName) return;

  const currentBox = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');
  box.innerHTML = '';

  for (let i = 0; i < 6; i++) {
    const slot = document.createElement('div');
    slot.classList.add('donut-slot');

    if (currentBox[i]) {
      const img = new Image();
      img.src = findImagePath(currentBox[i].name);
      img.alt = currentBox[i].name;
      img.title = `${currentBox[i].name} – ${currentBox[i].date}`;
      img.classList.add('dozen-donut');
      slot.appendChild(img);
    }

    box.appendChild(slot);
  }

  boxName.innerHTML = `Half Dozen Mood Mix: <strong>Box #1</strong>`;
}


function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function findImagePath(donutName) {
  const imageMap = {
    "Pink Sprinkly Donut": "pink-removebg-preview.png",
    "Party Powdered": "rainbow-removebg-preview.png",
    "Anxious Almond": "almond-removebg-preview.png",
    "Peaceful Pistachiot": "pistachio-removebg-preview.png",
    "Moody Chocolate": "chocolate-removebg-preview.png",
    "Cruller": "cruller-removebg-preview.png",
    "Vanilla Vibes": "vanilla-removebg-preview.png",
    "Complex": "baconmaple-removebg-preview.png",
    "Happy Glaze": "glazed-removebg-preview.png",
    "Creamy Daydream": "creme-removebg-preview.png",
    "Overwhelmed Oreo": "orea-removebg-preview.png",
    "Mellow Maple 🍁": "maple-removebg-preview.png",
    "Jelly Filled": "jelly-removebg-preview.png",
    "Powdered Mess": "powdered-removebg-preview.png",
    "Angry Apple": "apple-removebg-preview.png",
    "Sleepy Sugar": "beignet-removebg-preview.png",
    "Twist": "twist-removebg-preview.png",
    "Luscious Lemon": "lemon-removebg-preview.png",
    "Blueberry": "blueberry-removebg-preview.png"
  };
  return `images/${imageMap[donutName] || 'placeholder.png'}`;
}

// --- Combined DOMContentLoaded Block with Saved Donut Support ---
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-to-today');
  const selectionBox = document.getElementById('donut-selection');
  const list = document.getElementById('donutList');

  // 1. Load saved donuts FIRST
  const saved = JSON.parse(localStorage.getItem('donutGallery') || '[]');
  saved.forEach((dataURL, index) => {
    if (!dataURL.startsWith('data:image')) return;

    const li = document.createElement('li');
    li.className = 'splide__slide';

    const img = new Image();
    img.src = dataURL;
    img.alt = `Saved Donut ${index + 1}`;
    img.title = `Saved Donut ${index + 1}`;
    img.className = 'donut-image';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.objectFit = 'contain';

    img.addEventListener('click', () => {
      console.log(`Clicked saved donut ${index + 1}`);
    });

    li.appendChild(img);
    list.appendChild(li);
  });

  // 2. Mount Splide AFTER loading all slides
  const slides = document.querySelectorAll('#donut-carousel .splide__slide');
  const randomStartIndex = Math.floor(Math.random() * slides.length);

  const splide = new Splide('#donut-carousel', {
    type: 'loop',
    perPage: 5,
    perMove: 1,
    gap: '1rem',
    start: randomStartIndex,
    focus: 'center',
    breakpoints: {
      768: { perPage: 3.5 },
      480: { perPage: 3.5 }
    }
  });
  splide.mount();

  // 3. Handle donut selection
  document.querySelectorAll('.donut-image').forEach(img => {
    img.addEventListener('click', () => {
      const donutName = img.alt || 'Unknown Donut';
      const currentBox = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');

      if (selectedDonut === donutName) {
        selectedDonut = null;
        selectionBox.textContent = '';
        addButton.style.display = 'none';
      } else {
        selectedDonut = donutName;
        selectionBox.textContent = donutName;
        addButton.style.display = currentBox.length < 6 ? 'inline-block' : 'none';
      }
    });
  });

  // 4. Add donut to today's box
  addButton.addEventListener('click', () => {
    if (!selectedDonut) return;

    const today = getTodayDate();
    let currentBox = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');
    currentBox.push({ name: selectedDonut, date: today });
    localStorage.setItem('donutMoodCurrent', JSON.stringify(currentBox));

    selectionBox.textContent = `✅ ${selectedDonut} added!`;
    selectedDonut = null;
    addButton.style.display = 'none';

    displayCurrentBox();

    setTimeout(() => {
      selectionBox.textContent = '';
    }, 1200);
  });

  // 5. Menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  if (menuToggle && sideMenu) {
    menuToggle.addEventListener('click', () => {
      sideMenu.classList.toggle('open');
    });
  }

  // 6. Show current dozen box
displayCurrentBox();


});



