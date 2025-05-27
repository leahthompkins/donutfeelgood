// Donut App Script.js – Cleaned and Fully Working

// Donut App Script.js – Cleaned and Fully Working

let selectedDonut = null;

  window.moodThemes = {
    "Pink Sprinkly Donut": "happy",
    "Party Powdered": "happy",
    "Peaceful Pistachiot": "calm",
    "Moody Chocolate": "sad",
    "Anxious Almond": "stressed",
    "Cruller": "neutral",
    "Vanilla Vibes": "calm",
    "Complex": "conflicted",
    "Happy Glaze": "happy",
    "Creamy Daydream": "dreamy",
    "Overwhelmed Oreo": "stressed",
    "Mellow Maple 🍁": "calm",
    "Jelly Filled": "surprise",
    "Powdered Mess": "stressed",
    "Angry Apple": "angry",
    "Sleepy Sugar": "tired",
    "Twist": "conflicted"
  };

  window.moodLabels = {
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
    "Twist": "twist-removebg-preview.png"
  };
  return `images/${imageMap[donutName] || 'placeholder.png'}`;
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
  const boxName = generateMoodBoxName(currentBox);
  document.body.classList.add("no-scroll");  // ⛔ prevent scrolling during animation

  const lid = document.getElementById('box-lid');
  if (lid) {
    console.log("✅ Found lid element");
    lid.classList.add('visible');
  } else {
    console.warn("❌ Could not find lid element");
  }

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

  // ✅ Strip out base64 before saving to history
  const donutsNoImages = currentBox.map(d => ({
    name: d.name,
    mood: d.mood,
    date: d.date
  }));

  const sealed = {
    donuts: donutsNoImages,
    name: boxName,
    sealed: today
  };

  let sealedBoxes;
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
    document.body.classList.remove("no-scroll");
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
  const donut = currentBox[i];
  const img = document.createElement('img');

  // ✅ Use base64 image if it exists, otherwise fallback to named path
img.src =
  donut.image && donut.image.startsWith('data:image')
    ? donut.image
    : findImagePath(donut.name);

  img.alt = donut.name;
  img.title = `${donut.name}\n${donut.date}`;
  img.classList.add('dozen-donut');
  slot.appendChild(img);
}

  box.appendChild(slot); // ✅ THIS WAS MISSING
}



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
  
    const label = generateMoodBoxName(currentBox);
  console.log("🔠 Final label rendered on box:", label);
  boxName.innerHTML = `<strong>${label}</strong>`;
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
        selectedDonut = {
  name: donutName,
  date: getTodayDate(),
  image: findImagePath(donutName)
  
};
        selectionBox.textContent = donutName;
        addButton.style.display = currentBox.length < 6 ? 'inline-block' : 'none';
      }
    });
  });

  addButton.addEventListener('click', () => {
    if (!selectedDonut) return;

    const today = getTodayDate();
    let currentBox = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');
    currentBox.push(selectedDonut);
    localStorage.setItem('donutMoodCurrent', JSON.stringify(currentBox));

    selectionBox.textContent = `✅ ${selectedDonut.name} added!`;
    selectedDonut = null;
    addButton.style.display = 'none';

  
    displayCurrentBox();
    
    // Clean the message after a short delay (especially for the 6th donut case)
setTimeout(() => {
  selectionBox.textContent = '';
}, 1200);

  });



const list = document.getElementById('donutList');
const saved = JSON.parse(localStorage.getItem('donutGallery') || '[]');

saved.forEach((entry, index) => {
  const donutName = entry.name || `Saved Donut ${index + 1}`;
  const donutImage = typeof entry === 'string' ? entry : entry.image;

  if (!donutImage) return;

  const li = document.createElement('li');
  li.className = 'splide__slide';

  const img = new Image();
  img.src = donutImage;
  img.alt = donutName;
  img.title = `${donutName} – ${entry.date || 'Unknown date'}`;
  img.className = 'donut-image';
  img.style.width = '100%';
  img.style.height = 'auto';
  img.style.objectFit = 'contain';

  // ✅ Attach click handler here
  img.addEventListener('click', () => {
    const currentBox = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');


    selectedDonut = {
      name: donutName,
      date: getTodayDate(),
      image: donutImage,
      
      mood: entry.mood || moodThemes[donutName] || "mystery"
    };

    selectionBox.textContent = selectedDonut.name;
    addButton.style.display = currentBox.length < 6 ? 'inline-block' : 'none';
  });

  li.appendChild(img);
  list.appendChild(li);
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


 