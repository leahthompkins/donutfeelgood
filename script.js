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
      }
    }
  });

  splide.mount();

 document.querySelectorAll('.donut-image').forEach(img => {
  img.addEventListener('click', () => {
    alert(`You selected: ${img.alt}`);
    });
  });
});
