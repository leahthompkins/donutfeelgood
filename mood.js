// mood.js (active mood box in-progress view)

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

function findImagePath(donutName) {
  return `images/${imageMap[donutName] || 'placeholder.png'}`;
}

function generateMoodBoxName(donuts) {
  const freq = {};
  const moodCount = {
    happy: 0, sad: 0, calm: 0, angry: 0, stressed: 0,
    dreamy: 0, tired: 0, conflicted: 0, surprise: 0,
    mystery: 0, neutral: 0, weird: 0,
  };

  donuts.forEach(name => {
    freq[name] = (freq[name] || 0) + 1;
    const theme = moodThemes[name] || 'mystery';
    moodCount[theme]++;
  });

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return "Empty Box";

  const [topDonut, count] = sorted[0];

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

// Show current box in progress

document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('mood-dozen-box');
  const boxName = document.getElementById('mood-box-name');

  const current = JSON.parse(localStorage.getItem('donutMoodCurrent') || '[]');
  const today = new Date().toISOString().split('T')[0];

  if (current.length === 0) {
    box.innerHTML = '<p>No donuts added yet.</p>';
    boxName.innerHTML = "Today’s Mix: <strong>Nothing yet!</strong>";
    return;
  }

  current.forEach((entry, i) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('donut-wrapper');

    const img = document.createElement('img');
    img.src = findImagePath(entry.name);
    img.alt = entry.name;
    img.title = `${entry.name}\n${entry.date}`;
    img.classList.add('dozen-donut');

    if (entry.date === today) {
      const del = document.createElement('button');
      del.textContent = '❌';
      del.className = 'delete-donut';
      del.onclick = () => {
        const updated = current.filter((_, idx) => idx !== i);
        localStorage.setItem('donutMoodCurrent', JSON.stringify(updated));
        location.reload();
      };
      wrapper.appendChild(del);
    }

    wrapper.appendChild(img);
    box.appendChild(wrapper);
  });

  const label = generateMoodBoxName(current.map(e => e.name));
  boxName.innerHTML = `Today’s Mix: <strong>${label}</strong>`;
});
