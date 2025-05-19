function displayDonutHistory() {
  let history = JSON.parse(localStorage.getItem('donutMoodHistory') || '[]');
  if (!history.length) return;

  const container = document.getElementById('history-container');
  container.innerHTML = '';

  const stack = document.createElement('div');
  stack.className = 'receipt-stack';

  history.slice(0, 5).forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'donut-receipt';
    div.dataset.index = index;

    const counts = {};
    entry.donuts.forEach(d => {
      counts[d.name] = (counts[d.name] || 0) + 1;
    });

    const donutList = Object.entries(counts).map(
      ([name, count]) => `<tr><td>${name}</td><td style="text-align:right;">x${count}</td></tr>`
    ).join('');

    div.innerHTML = `
      <div class="receipt-content">
        <h3>Donut Mood Receipt</h3>
        <p><strong>Box Name:</strong> ${entry.name}</p>
        <p><strong>Date:</strong> ${entry.sealed}</p>
        <table class="donut-table">
          <thead>
            <tr><th>Description</th><th style="text-align:right;">Qty</th></tr>
          </thead>
          <tbody>${donutList}</tbody>
        </table>
        <p><strong>Total Donuts:</strong> ${entry.donuts.length}</p>
      </div>
    `;

    stack.appendChild(div);
  });

  container.appendChild(stack);

  // Swipe/Click interaction
  stack.addEventListener('click', () => {
    const first = stack.firstElementChild;
    if (!first) return;

    first.style.transform = 'translateX(350px) rotate(5deg)';
    first.style.opacity = '0';

    setTimeout(() => {
      stack.appendChild(first); // Move to end
      resetStackTransforms(stack);
    }, 400);
  });
}

function resetStackTransforms(stack) {
  const cards = stack.querySelectorAll('.donut-receipt');
  cards.forEach((card, i) => {
    card.style.transform = '';
    card.style.opacity = '1';
    card.style.zIndex = `${cards.length - i}`;
  });
}


document.addEventListener('DOMContentLoaded', displayDonutHistory);

localStorage.setItem('donutMoodHistory', JSON.stringify([
  {
    "name": "Mood Mosaic",
    "sealed": "2025-05-19",
    "donuts": [
      { "name": "Sleepy Sugar", "date": "2025-05-19" },
      { "name": "Jelly Filled", "date": "2025-05-19" },
      { "name": "Angry Apple", "date": "2025-05-19" },
      { "name": "Creamy Daydream", "date": "2025-05-19" },
      { "name": "Peaceful Pistachiot", "date": "2025-05-19" },
      { "name": "Cruller", "date": "2025-05-19" }
    ]
  },
  {
    "name": "Odd Blend",
    "sealed": "2025-05-18",
    "donuts": [
      { "name": "Happy Glaze", "date": "2025-05-18" },
      { "name": "Overwhelmed Oreo", "date": "2025-05-18" },
      { "name": "Moody Chocolate", "date": "2025-05-18" },
      { "name": "Cruller", "date": "2025-05-18" },
      { "name": "Angry Apple", "date": "2025-05-18" },
      { "name": "Peaceful Pistachiot", "date": "2025-05-18" }
    ]
  },
  {
    "name": "Joy Jam",
    "sealed": "2025-05-17",
    "donuts": [
      { "name": "Mellow Maple 🍁", "date": "2025-05-17" },
      { "name": "Twist", "date": "2025-05-17" },
      { "name": "Sleepy Sugar", "date": "2025-05-17" },
      { "name": "Happy Glaze", "date": "2025-05-17" },
      { "name": "Creamy Daydream", "date": "2025-05-17" },
      { "name": "Jelly Filled", "date": "2025-05-17" }
    ]
  },
  {
    "name": "Head in the Clouds",
    "sealed": "2025-05-16",
    "donuts": [
      { "name": "Cruller", "date": "2025-05-16" },
      { "name": "Cruller", "date": "2025-05-16" },
      { "name": "Complex", "date": "2025-05-16" },
      { "name": "Twist", "date": "2025-05-16" },
      { "name": "Jelly Filled", "date": "2025-05-16" },
      { "name": "Peaceful Pistachiot", "date": "2025-05-16" }
    ]
  },
  {
    "name": "Dream Cloud",
    "sealed": "2025-05-15",
    "donuts": [
      { "name": "Moody Chocolate", "date": "2025-05-15" },
      { "name": "Moody Chocolate", "date": "2025-05-15" },
      { "name": "Happy Glaze", "date": "2025-05-15" },
      { "name": "Angry Apple", "date": "2025-05-15" },
      { "name": "Sleepy Sugar", "date": "2025-05-15" },
      { "name": "Creamy Daydream", "date": "2025-05-15" }
    ]
  }
  // (You can duplicate more blocks to reach 10 if needed.)
]));
