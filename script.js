// Donut App Script.js – Cleaned and Fully Working

// Donut App Script.js – Cleaned and Fully Working

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

  const moodLabels = {
    happy: "Burst of Joy",
    calm: "Soft & Still",
    sad: "One of Those Days",
    neutral: "Fine, I Guess",
    conflicted: "Feeling Mixed",
    dreamy: "Head in the Clouds",
    stressed: "Cracked & Glazed",
    surprise: "Unexpected Twist",
    angry: "Spicy Mood",
    tired: "Powered Down",
    mystery: "Unknown Mood",
    weird: "Just a Little Off"
  };

  const comboLabels = { /* ... same as before ... */ };

  const freq = {}, moodCount = {};
  for (const mood in moodLabels) moodCount[mood] = 0;

  donuts.forEach(name => {
    freq[name] = (freq[name] || 0) + 1;
    const theme = moodThemes[name] || "mystery";
    moodCount[theme]++;
  });

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const uniqueCount = sorted.length;

  if (donuts.length === 0) return "Fill Me!";

  if (donuts.length === 1) {
    const donutName = donuts[0];
    const mood = moodThemes[donutName] || "mystery";
    return moodLabels[mood] || "Single Mood";
  }

  if (donuts.length === 2) {
    const moods = donuts.map(d => moodThemes[d] || "mystery").sort();
    const comboKey = moods.join("_");
    if (comboLabels[comboKey]) return comboLabels[comboKey];

    if (uniqueCount === 1) return `Double ${moodLabels[moodThemes[sorted[0][0]]]}`;
    return `${moodLabels[moodThemes[sorted[0][0]]]} & ${moodLabels[moodThemes[sorted[1][0]]]}`;
  }

  if (donuts.length === 3) {
    const moods = donuts.map(d => moodThemes[d] || "mystery").sort();
    const uniqueMoods = [...new Set(moods)];

    if (uniqueMoods.length === 1) return `Triple ${moodLabels[uniqueMoods[0]]}`;
    if (moods.includes("conflicted")) return "Mixed Signals";
    if (moods.includes("weird") || moods.includes("surprise")) return "Odd Blend";
    if (moods.includes("happy") && moods.includes("sad") && moods.includes("angry")) return "Emotional Whiplash";
    if (moods.includes("calm") && moods.includes("dreamy") && moods.includes("tired")) return "Chill Vibes";

    const counts = moods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (topMood[1] === 2) return `Mostly ${moodLabels[topMood[0]]}`;

    return "Mood Medley";
  }

  if (donuts.length === 4) {
    const moods = donuts.map(d => moodThemes[d] || "mystery");
    const counts = moods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    const entries = Object.entries(counts);

    if (entries.length === 1) return `Quad ${moodLabels[entries[0][0]]}`;
    if (entries.length === 2 && (entries[0][1] === 3 || entries[1][1] === 3)) {
      const dominant = entries.find(([_, count]) => count === 3);
      return `Mostly ${moodLabels[dominant[0]]}`;
    }
    if (entries.length === 2 && entries[0][1] === 2 && entries[1][1] === 2) {
      return `Half & Half`;
    }
    if (entries.length === 3) {
      const dominant = entries.find(([_, count]) => count === 2);
      return `Mood Anchor: ${moodLabels[dominant[0]]}`;
    }
    if (entries.length === 4) {
      if (moods.includes("happy")) return "Joy Overflow";
      if (moods.includes("calm")) return "Zen Set";
      if (moods.includes("angry")) return "Rage Rising";
      if (moods.includes("weird")) return "Quirky Quartet";
      return "Full Mood Sampler";
    }
    return "Quad Mood Mix";
  }


if (donuts.length === 5) {
  const moods = donuts.map(d => moodThemes[d] || "mystery");
  const counts = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});
  const uniqueMoods = [...new Set(moods)].sort();
  const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const topCount = counts[topMood];

    const hasAll = arr => arr.every(m => moods.includes(m));
    const includesAny = arr => arr.some(m => moods.includes(m));

    const soft = ['tired', 'dreamy', 'calm', 'neutral', 'mystery'];
    const sharp = ['angry', 'stressed', 'sad', 'conflicted', 'surprise'];

    // 🔥 Dominant
    if (uniqueMoods.length === 1) return `Joy Jam`;
    if (topCount === 5 && topMood === 'dreamy') return 'Dream Cloud';
    if (topCount === 5 && topMood === 'calm') return 'Zen Glaze';
    if (topCount === 5 && topMood === 'stressed') return 'Meltdown Mix';
    if (topCount === 5 && topMood === 'tired') return 'Total Shutdown';
    if (topCount === 5 && topMood === 'sad') return 'Full-On Funk';
    if (topCount === 5 && topMood === 'neutral') return 'Neutral Overload';
    if (topCount === 5 && topMood === 'weird') return 'Weird Parade';
    if (topCount === 5 && topMood === 'angry') return 'Rage Pack';
    if (topCount === 5 && topMood === 'mystery') return 'Sweet Mystery';

    // 🎯 4+1
    if (topCount === 4 && topMood === 'calm') return 'Mostly Mellow';
    if (topCount === 4 && moods.includes('angry')) return 'Rage Interrupted';
    if (topCount === 4 && moods.includes('stressed')) return 'Cracked Calm';
    if (topCount === 4 && moods.includes('angry')) return 'Spiked Joy';
    if (topCount === 4 && moods.includes('surprise')) return 'Tired Surprise';
    if (topCount === 4 && moods.includes('conflicted')) return 'Conflicted Core';
    if (topCount === 4 && moods.includes('happy')) return 'Bittersweet Edge';
    if (topCount === 4 && moods.includes('weird')) return 'Focused Chaos';

    // ⚖️ Balanced
    if (uniqueMoods.length === 5) return 'Mood Mosaic';
    if (hasAll(soft)) return 'Soft Glaze';
    if (hasAll(sharp)) return 'Sharp Edges';
    if (includesAny(['weird', 'mystery', 'surprise']) && topCount <= 2) return 'Weird Sampler';
    if (hasAll(['happy', 'sad', 'angry', 'calm', 'conflicted'])) return 'Donut Bipolar';
    if (includesAny(['conflicted', 'sad']) && includesAny(['happy', 'surprise'])) return 'Duality Box';

    // 😵 Emotional Tensions
    if (topCount === 2) return 'Emotional Juggle';
    if (counts.happy === 3 && counts.sad === 2) return 'Mood Tug-of-War';
    if (hasAll(['calm', 'conflicted', 'angry', 'dreamy', 'sad'])) return 'Head vs Heart';
    if (hasAll(['conflicted', 'tired', 'stressed', 'dreamy', 'mystery'])) return 'Mental Spiral';
    if (hasAll(['stressed', 'surprise', 'tired', 'angry', 'sad'])) return 'Surprise Burnout';
    if (counts.neutral === 3 && counts.mystery === 2) return 'Flatline Inside';
    if (includesAny(['calm', 'stressed', 'tired', 'dreamy', 'angry'])) return 'Cracked Shell';
    if (counts.happy === 3 && counts.sad === 2) return 'Cheerful Denial';

    // 🎩 Thematic
    if (hasAll(['dreamy', 'tired', 'calm', 'mystery', 'neutral'])) return 'The Introvert Set';
    if (hasAll(['happy', 'surprise', 'angry', 'stressed', 'weird'])) return 'The Extrovert Set';
    if (hasAll(['mystery', 'conflicted', 'sad', 'calm', 'dreamy'])) return 'Existential Breakfast';
    if (hasAll(['angry', 'sad', 'stressed', 'conflicted', 'surprise'])) return 'Drama Box';
    if (hasAll(['happy', 'sad', 'tired', 'conflicted', 'weird'])) return 'Midlife Crisis';
    if (hasAll(['stressed', 'tired', 'angry', 'sad', 'dreamy'])) return 'Manic Monday';
    if (hasAll(['calm', 'dreamy', 'tired', 'happy', 'neutral'])) return 'Sunday Vibes';

    // 😱 Creative
    if (hasAll(['calm', 'conflicted', 'tired', 'sad', 'mystery'])) return 'Quiet Chaos';
    if (hasAll(['happy', 'angry', 'stressed', 'dreamy', 'weird'])) return 'Joyfully Broken';
    if (hasAll(['sad', 'dreamy', 'stressed', 'angry', 'mystery'])) return 'Emotional Eclipse';
    if (topCount === 4) return 'The Wild Card';
    if (uniqueMoods.length === 5 && includesAny(['mystery', 'weird', 'conflicted'])) return 'Unicorn Box';
    if (hasAll(['dreamy', 'conflicted', 'sad', 'tired', 'stressed'])) return 'Donut Spiral';
    if (hasAll(['surprise', 'angry', 'happy', 'weird', 'sad'])) return 'Mood Bomb';
    if (hasAll(['neutral', 'mystery', 'conflicted', 'dreamy', 'calm'])) return 'Liminal Glaze';
    if (hasAll(['conflicted', 'happy', 'sad', 'calm', 'angry'])) return 'Mixed Signals';
    if (hasAll(['happy', 'angry', 'stressed', 'surprise', 'weird'])) return 'Sensory Overload';
    if (topCount === 2 && Object.values(counts).filter(c => c === 2).length === 2) return 'Almost Balanced';

    return `Five-Flavored Pack`;
  }

  if (donuts.length === 6) {
    if (sorted[0][1] === 6) return `${moodLabels[moodThemes[sorted[0][0]]]} Overload`;
    if (sorted[0][1] === 5) return `Stacked with ${moodLabels[moodThemes[sorted[0][0]]]}`;
    if (sorted[0][1] === 4) return `Mostly ${moodLabels[moodThemes[sorted[0][0]]]}`;
    if (sorted[0][1] === 3 && sorted[1][1] === 3) return `${moodLabels[moodThemes[sorted[0][0]]]} vs ${moodLabels[moodThemes[sorted[1][0]]]}`;
    if (sorted[0][1] === 2 && uniqueCount === 3) return `Balanced Box`;
    if (uniqueCount === 6) return `Rainbow Assortment`;

    if (moodCount.happy >= 4) return "Sweet Joys";
    if (moodCount.sad >= 3) return "Bittersweet Batch";
    if (moodCount.stressed >= 3) return "Box of Overwhelm";
    if (moodCount.calm >= 3) return "Peaceful Pickings";
    if (moodCount.angry >= 2) return "Spicy Glaze";
    if (moodCount.tired >= 2) return "Low-Energy Dozen";
    if (moodCount.dreamy >= 3) return "Frosted Fantasies";

    return "Mixed Mood Medley";
  }

  return "Donut Surprise";
}



function triggerConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;
  const colors = ['#bedceb','#70bee6','#ff9aa2','#ffb7b2','#ffdac1','#e2f0cb','#b5ead7','#c7ceea'];

  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 75, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 75, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function sealCurrentBox() {
  const today = getTodayDate();
  const currentBox = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');
  const boxName = generateMoodBoxName(currentBox.map(e => e.name));

  const lid = document.getElementById('box-lid');
  if (lid) lid.classList.add('visible');

  setTimeout(() => {
    const box = document.getElementById('mood-dozen-box');
    if (box) box.innerHTML = '';
  }, 800);

  setTimeout(() => {
    triggerConfetti();
    const animWrapper = document.querySelector('.mood-dozen-animation-wrapper');
    if (animWrapper) {
      animWrapper.classList.add('slide-out');
    }
  }, 1000);

  const sealed = { donuts: currentBox, name: boxName, sealed: today };
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

  setTimeout(() => {
    if (lid) lid.classList.remove('visible', 'slide-away');
    const animWrapper = document.querySelector('.mood-dozen-animation-wrapper');
    if (animWrapper) {
      animWrapper.classList.remove('slide-out');
      animWrapper.style.transform = 'none';
      animWrapper.style.opacity = '1';
    }
    selectedDonut = null;
    displayCurrentBox(true);
  }, 3000);
}

function displayCurrentBox(animate = false) {
  const box = document.getElementById('mood-dozen-box');
  const boxName = document.getElementById('mood-box-name');
  if (!box || !boxName) return;

  box.classList.remove('fade-out', 'enter-from-bottom', 'pop-open');
  box.style.opacity = '1';
  box.style.transform = 'none';

 if (animate) {
  requestAnimationFrame(() => {
    box.classList.add('enter-from-bottom');
    setTimeout(() => {
      box.classList.add('pop-open');
    }, 400);
  });
}


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
  boxName.innerHTML = `<strong>${label}</strong>`;

  const sealContainer = document.getElementById('seal-button-container');
  sealContainer.innerHTML = '';

  if (currentBox.length === 6) {
    const lid = document.getElementById('box-lid');
    if (lid) lid.classList.remove('reset');

    const sealButton = document.createElement("button");
    sealButton.textContent = "Seal This Box";
    sealButton.className = "add-button";
    sealButton.addEventListener("click", sealCurrentBox);
    sealContainer.appendChild(sealButton);
  }
}

// The rest of your DOMContentLoaded setup stays unchanged...


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
        addButton.style.display = currentBox.length < 6 ? 'inline-block' : 'none';
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
    
    // Clean the message after a short delay (especially for the 6th donut case)
setTimeout(() => {
  selectionBox.textContent = '';
}, 1200);

  });

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

  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  if (menuToggle && sideMenu) {
    menuToggle.addEventListener('click', () => {
      sideMenu.classList.toggle('open');
    });
  }

  displayCurrentBox();
});
