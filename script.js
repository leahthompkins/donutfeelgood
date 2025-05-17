
// script.js (for index.html)

let selectedDonut = null;

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function findImagePath(donutName) {
  const imageMap = {
    "Pink Sprinkly Donut": "pink.jpg",
    "Peaceful Pistachiot": "pistachio.png",
    "Moody Chocolate": "chocolate.jpg",
    "Cruller": "cruller.png",
    "Vanilla Vibes": "vanilla.png",
    "Complex": "baconmaple.png",
    "Happy Glaze": "glazed.png",
    "Creamy Daydream": "creme.png",
    "Overwhelmed Oreo": "orea.png",
    "Mellow Maple 🍁": "maple.png",
    "Jelly Filled": "jelly.png",
    "??": "powdered.png",
    "Angry Apple": "apple.png",
    "Sleepy Sugar": "beignet.png",
    "Twist": "twist.png"
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

  const freq = {}, moodCount = {
    happy: 0, sad: 0, calm: 0, angry: 0, stressed: 0,
    dreamy: 0, tired: 0, conflicted: 0, surprise: 0,
    mystery: 0, neutral: 0, weird: 0
  };

  donuts.forEach(name => {
    freq[name] = (freq[name] || 0) + 1;
    const theme = moodThemes[name] || 'mystery';
    moodCount[theme]++;
  });

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return "Empty Box";

  const [topDonut, count] = sorted[0];

  // Handle special small-box cases
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

function updateCurrentBox(donutName) {
  const today = getTodayDate();
  let currentBox = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');

// TEMPORARY TESTING: Allow more than one donut per day
currentBox.push({ date: today, name: donutName });

/*
// ORIGINAL (Use this later to limit to one per day)
const existingIndex = currentBox.findIndex(e => e.date === today);
if (existingIndex >= 0) {
  currentBox[existingIndex].name = donutName;
} else {
  currentBox.push({ date: today, name: donutName });
}
*/

  if (currentBox.length > 6) {
    const sealedBoxes = JSON.parse(localStorage.getItem('donutMoodHistory') || '[]');
    sealedBoxes.unshift({
      donuts: [...currentBox],
      name: generateMoodBoxName(currentBox.map(e => e.name)),
      sealed: today
    });
    localStorage.setItem('donutMoodHistory', JSON.stringify(sealedBoxes));
    localStorage.removeItem('donutMoodCurrent');
  } else {
    localStorage.setItem('donutMoodCurrent', JSON.stringify(currentBox));
  }
}

function displayCurrentBox() {
  const box = document.getElementById('mood-dozen-box');
  const boxName = document.getElementById('mood-box-name');

  if (!box || !boxName) return;

  const currentBox = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');
  if (currentBox.length === 0) {
    box.innerHTML = '<p>No donuts added yet.</p>';
    boxName.innerHTML = "Today’s Mix: <strong>Nothing yet!</strong>";
    return;
  }

  currentBox.forEach(entry => {
    const img = document.createElement('img');
    img.src = findImagePath(entry.name);
    img.alt = entry.name;
    img.title = `${entry.name} \n${entry.date}`;
    img.classList.add('dozen-donut');
    box.appendChild(img);
  });

  const label = generateMoodBoxName(currentBox.map(e => e.name));
  boxName.innerHTML = `Today’s Mix: <strong>${label}</strong>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-to-today');
  const selectionBox = document.getElementById('donut-selection');

  document.querySelectorAll('.donut-image').forEach(img => {
    img.addEventListener('click', () => {
      const donutName = img.alt || 'Unknown Donut';
      if (selectedDonut === donutName) {
        selectedDonut = null;
        selectionBox.textContent = '';
        addButton.style.display = 'none';
      } else {
        selectedDonut = donutName;
        selectionBox.textContent = donutName;
        addButton.style.display = 'inline-block';
      }
    });
  });

  addButton.addEventListener('click', () => {
    if (!selectedDonut) return;
    updateCurrentBox(selectedDonut);
    selectionBox.textContent = `✅ ${selectedDonut} added!`;
    setTimeout(() => location.reload(), 1000);
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
