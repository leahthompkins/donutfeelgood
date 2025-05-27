// mood.js — display sealed boxes with stored names

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

function findImagePath(donutName) {
  return `images/${imageMap[donutName] || 'placeholder.png'}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('sealed-mood-boxes');
  const boxes = JSON.parse(localStorage.getItem('donutMoodSealed') || '[]');

  if (boxes.length === 0) {
    container.innerHTML = "<p>No sealed boxes yet.</p>";
    return;
  }

  boxes
    .slice()
    .reverse()
    .forEach((box, index) => {
      const section = document.createElement('section');
      section.classList.add('sealed-box');

      const title = document.createElement('h3');
      title.textContent = `Box ${boxes.length - index}: ${box.name || 'Unnamed Box'}`;
      section.appendChild(title);

      const row = document.createElement('div');
      row.classList.add('sealed-donuts');

      box.donuts.forEach(entry => {
        const img = document.createElement('img');
        img.src = findImagePath(entry.name);
        img.alt = entry.name;
        img.title = `${entry.name} - ${entry.date}`;
        img.classList.add('dozen-donut');
        row.appendChild(img);
      });

      section.appendChild(row);
      container.appendChild(section);
    });
});
