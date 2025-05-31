function showModal(imageSrc, name, mood) {
  const modal = document.getElementById('donutModal');
  document.getElementById('modalImage').src = imageSrc;
  document.getElementById('modalName').textContent = name;
  document.getElementById('modalMood').textContent = `Mood: ${mood}`;
  modal.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('donutGalleryList');
  const clearAllBtn = document.getElementById('clearAll');
  const saved = JSON.parse(localStorage.getItem('donutGallery') || '[]');

  function render() {
    list.innerHTML = '';
    saved.forEach((entry, index) => {
      const li = document.createElement('li');
      const donutName = entry.name || `Donut ${index + 1}`;
      const donutImage = typeof entry === 'string' ? entry : entry.image;

      const img = new Image();
      img.src = donutImage;
      img.alt = donutName;
      img.title = donutName;
      img.style.width = '100px';
      img.style.height = '100px';
      img.style.objectFit = 'contain';

      li.appendChild(img);
      // Name and delete hidden for now
      // li.appendChild(document.createTextNode(` ${donutName} `));
      // const btn = document.createElement('button');
      // btn.textContent = 'Delete';
      // btn.addEventListener('click', () => {
      //   saved.splice(index, 1);
      //   localStorage.setItem('donutGallery', JSON.stringify(saved));
      //   render();
      // });
      // li.appendChild(btn);
      list.appendChild(li);
    });
  }

  clearAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all saved donuts?')) {
      localStorage.removeItem('donutGallery');
      saved.length = 0;
      render();
    }
  });

  render();

  // -------------------------------
  // 🎯 Custom positioned donut overlay
  // -------------------------------
  const donutPositions = [
    { top: "25%", left: "20%" },
    { top: "25%", left: "45%" },
    { top: "25%", left: "70%" },
    { top: "42.5%", left: "20%" },
    { top: "42.5%", left: "45%" },
    { top: "42.5%", left: "70%" },
    { top: "60%", left: "20%" },
    { top: "60%", left: "45%" },
    { top: "60%", left: "70%" }
  ];

  const overlay = document.querySelector('.donut-grid');
if (overlay) {
  overlay.innerHTML = ''; // clear previous donuts

saved.forEach((entry, index) => {
  const donutImage = typeof entry === 'string' ? entry : entry.image;
  const name = entry.name || `Donut ${index + 1}`;
  const mood = entry.mood || "Unknown mood";
  const position = donutPositions[index] || { top: "80%", left: "50%" };

  const img = document.createElement('img');
  img.src = donutImage;
  img.alt = name;
  img.style.position = 'absolute';
  img.style.top = position.top;
  img.style.left = position.left;
  img.style.transform = 'translate(-50%, -50%)';
  img.style.width = '10vw';
  img.style.maxWidth = '100px';
  img.style.cursor = 'pointer';

img.addEventListener('click', () => {
  showModal(donutImage, name, mood);
});

  overlay.appendChild(img);  // ✅ THIS MUST BE INSIDE the loop
});

}

});





// Close modal on click
document.querySelector('.close-button').addEventListener('click', () => {
  document.getElementById('donutModal').classList.add('hidden');
});

