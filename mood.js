// mood.js

document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('mood-dozen-box');
  const boxName = document.getElementById('mood-box-name');

  const history = JSON.parse(localStorage.getItem('donutMoodHistory') || '{}');
  const entries = [];

  // Flatten and sort donut entries by date (newest first)
  Object.keys(history)
    .sort((a, b) => new Date(b) - new Date(a))
    .forEach(date => {
      history[date].forEach(donut => {
        entries.push({ date, donut });
      });
    });

  const moodDozen = entries.slice(0, 12);

  // Fill the donut box
  moodDozen.forEach(entry => {
    const img = document.createElement('img');
    img.src = findImagePath(entry.donut);
    img.alt = entry.donut;
    img.title = `${entry.donut} \n${entry.date}`;
    img.classList.add('dozen-donut');
    box.appendChild(img);
  });

  // Generate a fun box name based on contents
  const boxLabel = generateMoodBoxName(moodDozen.map(e => e.donut));
  boxName.innerHTML = `Today’s Mix: <strong>${boxLabel}</strong>`;
});

function findImagePath(donutName) {
  // Basic matching logic, update as needed
  const slug = donutName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `images/${slug}.png`;
}

function generateMoodBoxName(donuts) {
  const flavors = donuts.reduce((acc, name) => {
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(flavors).sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) return "Empty Box";

  const [topDonut, count] = sorted[0];

  if (count >= 6) return `Mostly ${topDonut}`;
  if (sorted.length >= 5) return "Chaotic Cravings";
  if (sorted.length === 1) return `${topDonut} Frenzy`;
  if (sorted.length === 2) return `Split Feelings: ${sorted[0][0]} & ${sorted[1][0]}`;

  return `Mixed Mood Medley`;
}
