document.addEventListener('DOMContentLoaded', () => {
  const splide = new Splide('#donut-carousel', {
    type: 'loop',
    perPage: 5,
    perMove: 1,
    gap: '1rem',
    focus: 'center',
    breakpoints: {
      768: {
        perPage: 3.5,
      },
      480: {
        perPage: 3.5,
        perMove: 1,
      }
    }
  });

  splide.mount();

 const selectionBox = document.getElementById('donut-selection');
  const addButton = document.getElementById('add-to-today');

  document.querySelectorAll('.donut-image').forEach(img => {
    img.addEventListener('click', () => {
      const donutName = img.alt || 'Unknown Donut';
      selectedDonut = donutName;
      selectionBox.textContent = `You selected: ${donutName}`;
      addButton.style.display = 'inline-block';
    });
  });

  addButton.addEventListener('click', () => {
    if (!selectedDonut) return;

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const history = JSON.parse(localStorage.getItem('donutMoodHistory') || '{}');

    if (!history[today]) {
      history[today] = [];
    }

    history[today].push(selectedDonut);
    localStorage.setItem('donutMoodHistory', JSON.stringify(history));

    selectionBox.textContent = `✅ ${selectedDonut} added to ${today}`;
    addButton.style.display = 'none';
  });
});
