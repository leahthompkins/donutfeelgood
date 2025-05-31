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
    { top: "45%", left: "20%" },
    { top: "45%", left: "45%" },
    { top: "45%", left: "70%" },
    { top: "60%", left: "20%" },
    { top: "60%", left: "45%" },
    { top: "60%", left: "70%" }
  ];

  const overlay = document.querySelector('.donut-grid');
  if (overlay) {
    overlay.innerHTML = ''; // clear previous donuts

    saved.forEach((entry, index) => {
      const donutImage = typeof entry === 'string' ? entry : entry.image;
      const position = donutPositions[index] || { top: "80%", left: "50%" };

      const img = document.createElement('img');
      img.src = donutImage;
      img.alt = `Donut ${index + 1}`;
      img.style.position = 'absolute';
      img.style.top = position.top;
      img.style.left = position.left;
      img.style.transform = 'translate(-50%, -50%)';
      img.style.width = '10vw';
      img.style.maxWidth = '100px';

      overlay.appendChild(img);
    });
  }
});
