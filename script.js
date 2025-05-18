let selectedDonut = null;

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function findImagePath(donutName) {
  const imageMap = {
    "Pink Sprinkly Donut": "pink-removebg-preview.png",
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
    "??": "powdered-removebg-preview.png",
    "Angry Apple": "apple-removebg-preview.png",
    "Sleepy Sugar": "beignet-removebg-preview.png",
    "Twist": "twist-removebg-preview.png"
  };
  return `images/${imageMap[donutName] || 'placeholder.png'}`;
}

function generateMoodBoxName(donuts) {
  const moodThemes = {
    "Pink Sprinkly Donut": "happy",
    "Peaceful Pistachiot": "calm",
    "Moody Chocolate": "sad",
    "Cruller": "neutral",
    "Vanilla Vibes": "calm",
    "Complex": "conflicted",
    "Happy Glaze": "happy",
    "Creamy Daydream": "dreamy",
    "Overwhelmed Oreo": "stressed",
    "Mellow Maple 🍁": "calm",
    "Jelly Filled": "surprise",
    "??": "mystery",
    "Angry Apple": "angry",
    "Sleepy Sugar": "tired",
    "Twist": "weird"
  };

  const freq = {}, moodCount = {};
  for (const mood in moodThemes) moodCount[moodThemes[mood]] = 0;

  donuts.forEach(name => {
    freq[name] = (freq[name] || 0) + 1;
    const theme = moodThemes[name] || "mystery";
    moodCount[theme]++;
  });

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return "Empty Box";

  const [topDonut, count] = sorted[0];
  if (donuts.length === 1) return `${topDonut} Vibes`;
  if (donuts.length === 2 && sorted.length === 1) return `Double ${topDonut}`;
  if (donuts.length === 2 && sorted.length === 2) return `Split Start: ${sorted[0][0]} & ${sorted[1][0]}`;
  if (count === 6) return `${topDonut} Overload`;
  if (count === 5) return `Stacked with ${topDonut}`;
  if (count === 4) return `Mostly ${topDonut}`;
  if (count === 3 && sorted.length === 2) return `Split Between ${sorted[0][0]} & ${sorted[1][0]}`;
  if (count === 2 && sorted.length === 3) return `Balanced Box`;
  if (sorted.length === 6) return `Rainbow Assortment`;

  if (moodCount.happy >= 4) return "Sweet Joys";
  if (moodCount.sad >= 3) return "Bittersweet Batch";
  if (moodCount.stressed >= 3) return "Box of Overwhelm";
  if (moodCount.calm >= 3) return "Peaceful Pickings";
  if (moodCount.angry >= 2) return "Spicy Glaze Warning";
  if (moodCount.tired >= 2) return "Low-Energy Dozen";
  if (moodCount.dreamy >= 3) return "Floating in Frosting";

  return "Mixed Mood Medley";
}

function triggerConfetti() {
  const duration = 5000;
  const end = Date.now() + duration;
  const colors = ['#ff9aa2', '#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 75,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 75,
      origin: { x: 1 },
      colors: colors
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}function sealCurrentBox() {
  const today = getTodayDate();
  const currentBox = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');
  const boxName = generateMoodBoxName(currentBox.map(e => e.name));
  

  // 🎉 Show the lid first
  const lid = document.getElementById('box-lid');
  if (lid) lid.classList.add('visible');

  // 🎉 Confetti
  triggerConfetti();


  // ✅ Save sealed box
  const sealed = {
    donuts: currentBox,
    name: boxName,
    sealed: today
  };

  let sealedBoxes = [];
  try {
    const stored = localStorage.getItem('donutMoodHistory');
    sealedBoxes = Array.isArray(JSON.parse(stored)) ? JSON.parse(stored) : [];
  } catch {
    sealedBoxes = [];
  }

  sealedBoxes.unshift(sealed);
  localStorage.setItem('donutMoodHistory', JSON.stringify(sealedBoxes));
  localStorage.removeItem('donutMoodCurrent');

  // ⏱ Delay before reload
  setTimeout(() => {
    if (lid) lid.classList.remove('visible');
    location.reload();
  }, 3000); // ✅ actually  3 seconds now
}


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
      const img = document.createElement('img');
      img.src = findImagePath(currentBox[i].name);
      img.alt = currentBox[i].name;
      img.title = `${currentBox[i].name}\n${currentBox[i].date}`;
      img.classList.add('dozen-donut');
      slot.appendChild(img);
    }
    box.appendChild(slot);
  }

  const label = generateMoodBoxName(currentBox.map(e => e.name));
  boxName.innerHTML = `Today’s Mix: <strong>${label}</strong>`;

const sealContainer = document.getElementById('seal-button-container');
sealContainer.innerHTML = ''; // clear it every time

if (currentBox.length === 6) {
  const sealButton = document.createElement("button");
  sealButton.textContent = "Seal This Box";
  sealButton.className = "add-button";
  sealButton.addEventListener("click", sealCurrentBox);
  sealContainer.appendChild(sealButton);
}
}

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-to-today');
  const selectionBox = document.getElementById('donut-selection');

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

  if (currentBox.length < 6) {
    addButton.style.display = 'inline-block';
  } else {
    addButton.style.display = 'none'; // Don't show if box is full
  }
}
    });
  });

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
  });

  const splide = new Splide('#donut-carousel', {
    type: 'loop',
    perPage: 5,
    perMove: 1,
    gap: '1rem',
    focus: 'center',
    breakpoints: {
      768: { perPage: 3.5 },
      480: { perPage: 3.5 }
    }
  });
  splide.mount();

  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  if (menuToggle && sideMenu) {
    menuToggle.addEventListener('click', () => {
      sideMenu.classList.toggle('open');
    });
  }

  displayCurrentBox();
});
