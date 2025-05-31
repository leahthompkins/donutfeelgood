function displayDonutHistory() {
  const history = JSON.parse(localStorage.getItem('donutMoodHistory') || '[]');
  const container = document.getElementById('history-container');
  container.innerHTML = '';

  if (!history.length) {
    container.innerHTML = `<p class="no-receipts-msg">No donut mood receipts yet 🍩</p>`;
    return;
  }

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

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-receipt-btn';
    deleteBtn.textContent = '🗑 Delete';
    deleteBtn.onclick = () => deleteReceipt(index);
    div.appendChild(deleteBtn);

    stack.appendChild(div);
  });

  container.appendChild(stack);

stack.addEventListener('click', () => {
  const firstReceipt = stack.querySelector('.donut-receipt');
  if (!firstReceipt) return;

  firstReceipt.style.transform = 'translateX(350px) rotate(5deg)';
  firstReceipt.style.opacity = '0';

  setTimeout(() => {
    stack.appendChild(firstReceipt);
    resetStackTransforms(stack);
  }, 400);
});

  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear-all-btn';
  clearBtn.textContent = '🧼 Clear All Receipts';
  clearBtn.onclick = clearAllReceipts;
  stack.appendChild(clearBtn);
}


function resetStackTransforms(stack) {
  const cards = stack.querySelectorAll('.donut-receipt');
  cards.forEach((card, i) => {
    card.style.transform = '';
    card.style.opacity = '1';
    card.style.zIndex = `${cards.length - i}`;
  });
}



/*localStorage.setItem('donutMoodHistory', JSON.stringify([
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
*/

function generateMoodChart() {
    const history = JSON.parse(localStorage.getItem('donutMoodHistory') || '[]');
      const moodCounts = {};
  if (!history.length) {
  const chartCanvas = document.getElementById('moodChart');
  if (chartCanvas) {
    chartCanvas.style.display = 'none';
  }
  return;
}

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




  history.forEach(entry => {
    entry.donuts.forEach(d => {
      const mood = moodThemes[d.name] || "mystery";
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });
    
  });

  const labels = Object.keys(moodCounts);
  const data = Object.values(moodCounts);

  const ctx = document.getElementById('moodChart').getContext('2d');
  
  Chart.defaults.font.family = 'Fredoka';
new Chart(ctx, {
  type: 'radar',
  data: {
    labels,
    datasets: [{
      label: 'Mood Frequency',
      data,
      fill: true,
      backgroundColor: 'rgba(112, 190, 230, 0.2)',
      borderColor: 'rgba(60, 168, 222, 1)',
      pointBackgroundColor: 'rgba(60, 168, 222, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(60, 168, 222, 1)'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: 'Patrick Hand',
            size: 14
          },
          color: '#444'
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            family: 'Patrick Hand',
            size: 14
          },
          color: '#333'
        },
        ticks: {
          display: false  // hides the radial axis numbers for a cleaner look
        }
      }
    }
  }
});

}



document.addEventListener('DOMContentLoaded', () => {
  // Initialize with sample data if empty
     const stored = JSON.parse(localStorage.getItem('donutMoodHistory') || '[]');
   /* if (!stored.length) {
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
      }
      // Add more if needed
    ]));
  }*/

  displayDonutHistory();
  generateMoodChart();
});


function deleteReceipt(index) {
  let history = JSON.parse(localStorage.getItem('donutMoodHistory') || '[]');
  history.splice(index, 1);
  localStorage.setItem('donutMoodHistory', JSON.stringify(history));
  displayDonutHistory();  // Refresh UI
  generateMoodChart();    // Update chart
}

function clearAllReceipts() {
  if (confirm("Are you sure you want to delete all donut mood receipts?")) {
    localStorage.removeItem('donutMoodHistory');
    displayDonutHistory();
    generateMoodChart();
  }
}


