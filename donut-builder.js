let baseSplide, glazeSplide, toppingSplide;

document.addEventListener('DOMContentLoaded', function () {
  // Mount all three Splides and store references
  baseSplide = new Splide('#base-carousel', {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    pagination: false,
    arrows: true,
    drag: true,
  }).mount();

  glazeSplide = new Splide('#glaze-carousel', {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    pagination: false,
    arrows: true,
    drag: true,
  }).mount();

  toppingSplide = new Splide('#topping-carousel', {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    pagination: false,
    arrows: true,
    drag: true,
  }).mount();

 // Confirm button: animate and lock
document.getElementById('confirm-button').addEventListener('click', function () {
  const details = document.getElementById('donut-details');

  // Start donut collapse
  document.querySelector('.carousel-container').classList.add('shift-up');

  // Show form and animate in
  details.style.display = 'flex';
  setTimeout(() => {
    details.classList.add('visible');
  }, 300); // Delay to match donut collapse animation

  // Lock carousels
  baseSplide.options = { drag: false, arrows: false };
  glazeSplide.options = { drag: false, arrows: false };
  toppingSplide.options = { drag: false, arrows: false };

  // Toggle buttons
  document.getElementById('confirm-button').style.display = 'none';
  document.getElementById('dice-button').style.display = 'none';
  document.getElementById('edit-button').style.display = 'inline-block';
});

// Edit button: unlock and reset
document.getElementById('edit-button').addEventListener('click', function () {
  const details = document.getElementById('donut-details');

  // Collapse form with transition
  details.classList.remove('visible');
  setTimeout(() => {
    details.style.display = 'none';
  }, 500); // Match transition duration

  // Undo donut collapse
  document.querySelector('.carousel-container').classList.remove('shift-up');

  // Unlock carousels
  baseSplide.options = { drag: true, arrows: true };
  glazeSplide.options = { drag: true, arrows: true };
  toppingSplide.options = { drag: true, arrows: true };

  // Toggle buttons
  document.getElementById('edit-button').style.display = 'none';
  document.getElementById('confirm-button').style.display = 'inline-block';
  document.getElementById('dice-button').style.display = 'inline-block';
});


  // Edit button: revert and unlock
  document.getElementById('edit-button').addEventListener('click', function () {
    document.querySelector('.carousel-container').classList.remove('shift-up');

    baseSplide.options = { drag: true, arrows: true };
    glazeSplide.options = { drag: true, arrows: true };
    toppingSplide.options = { drag: true, arrows: true };

    document.getElementById('edit-button').style.display = 'none';
    document.getElementById('confirm-button').style.display = 'inline-block';
  });

  // Dice button: randomize all 3
  document.getElementById('dice-button').addEventListener('click', function () {
    const baseLength = baseSplide.Components.Slides.getLength();
    const glazeLength = glazeSplide.Components.Slides.getLength();
    const toppingLength = toppingSplide.Components.Slides.getLength();

    const baseIndex = Math.floor(Math.random() * baseLength);
    const glazeIndex = Math.floor(Math.random() * glazeLength);
    const toppingIndex = Math.floor(Math.random() * toppingLength);

    baseSplide.go(baseIndex);
    glazeSplide.go(glazeIndex);
    toppingSplide.go(toppingIndex);
  });
});


