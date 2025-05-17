let selectedDonut = null;

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
  const dateToggle = document.getElementById('date-picker-toggle');
  const showDatePicker = document.getElementById('show-date-picker');
  const datePickerArea = document.getElementById('date-picker-area');
  const dateInput = document.getElementById('mood-date');
  const addToDateBtn = document.getElementById('add-to-date');

  document.querySelectorAll('.donut-image').forEach(img => {
    img.addEventListener('click', () => {
      const donutName = img.alt || 'Unknown Donut';

      if (selectedDonut === donutName) {
        // Unselect
        selectedDonut = null;
        selectionBox.textContent = '';
        addButton.style.display = 'none';
        dateToggle.style.display = 'none';
        datePickerArea.style.display = 'none';
      } else {
        // Select
        selectedDonut = donutName;
        selectionBox.textContent = `${donutName}`;
        addButton.style.display = 'inline-block';
        dateToggle.style.display = 'block';
        datePickerArea.style.display = 'none';
      }
    });
  });

  showDatePicker.addEventListener('click', () => {
    dateToggle.style.display = 'none';
    datePickerArea.style.display = 'block';
  });

 addButton.addEventListener('click', () => {
  if (!selectedDonut) return;

  const today = new Date().toISOString().split('T')[0];
  const history = JSON.parse(localStorage.getItem('donutMoodHistory') || '{}');

  if (!history[today]) {
    history[today] = [];
  }

  history[today].push(selectedDonut);
  localStorage.setItem('donutMoodHistory', JSON.stringify(history));

  selectionBox.textContent = `✅ ${selectedDonut} added to ${today}`;
  selectionBox.classList.add('fade-out');
  selectionBox.classList.remove('hidden');

  setTimeout(() => selectionBox.classList.add('hidden'), 2000);
  setTimeout(() => {
    selectionBox.textContent = '';
    selectionBox.classList.remove('fade-out', 'hidden');
  }, 3000);

  addButton.style.display = 'none';
  dateToggle.style.display = 'none';
  datePickerArea.style.display = 'none';
});


  addToDateBtn.addEventListener('click', () => {
    if (!selectedDonut) return;

    const chosenDate = dateInput.value;
    if (!chosenDate) {
      alert("Please select a date first.");
      return;
    }

    const history = JSON.parse(localStorage.getItem('donutMoodHistory') || '{}');

    if (!history[chosenDate]) {
      history[chosenDate] = [];
    }

    history[chosenDate].push(selectedDonut);
    localStorage.setItem('donutMoodHistory', JSON.stringify(history));

    selectionBox.textContent = `✅ ${selectedDonut} added to ${chosenDate}`;
    selectionBox.classList.add('fade-out');
    selectionBox.classList.remove('hidden');

    setTimeout(() => {
      selectionBox.classList.add('hidden');
    }, 2000);

    setTimeout(() => {
      selectionBox.textContent = '';
      selectionBox.classList.remove('fade-out', 'hidden');
    }, 3000);

    addButton.style.display = 'none';
    dateToggle.style.display = 'none';
    datePickerArea.style.display = 'none';

   
  });
});




const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

