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
   //   li.appendChild(document.createTextNode(` ${donutName} `));
    //  li.appendChild(btn);
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

const grid = document.querySelector(".donut-grid");

const donutImg = document.createElement("img");
donutImg.src = "assets/my-donut.png";
donutImg.alt = "Donut Mood";
grid.appendChild(donutImg);



// Example donut sources (use your actual donut data here)
const donutImages = [
  "assets/donut1.png",
  "assets/donut2.png",
  "assets/donut3.png",
  "assets/donut4.png",
  "assets/donut5.png",
  "assets/donut6.png"
];

donutImages.forEach(src => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "Donut";
  grid.appendChild(img);
});


const gallery = document.getElementById("donutGalleryList");
gallery.innerHTML = "";

storedDonuts.forEach(src => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "Donut";
  gallery.appendChild(img);
});

