document.addEventListener('DOMContentLoaded', () => {
  const splide = new Splide('#donut-carousel', {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    gap: '1rem',
    focus: 'center',
    breakpoints: {
      768: {
        perPage: 2,
      },
      480: {
        perPage: 1.5,
      }
    }
  });

  splide.mount();

  document.querySelectorAll('.donut').forEach(button => {
    button.addEventListener('click', () => {
      const mood = button.innerText;
      alert(`You selected: ${mood}`);
    });
  });
});
