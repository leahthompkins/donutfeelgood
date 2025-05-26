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

      const btn = document.createElement('button');
      btn.textContent = 'Delete';
      btn.addEventListener('click', () => {
        saved.splice(index, 1);
        localStorage.setItem('donutGallery', JSON.stringify(saved));
        render();
      });

      li.appendChild(img);
      li.appendChild(document.createTextNode(` ${donutName} `));
      li.appendChild(btn);
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
});