// Handle button click
const donutButtons = document.querySelectorAll('.donut');
donutButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.innerText;
    alert(`You selected: ${mood}`);
  });
});

// Initialize Embla Carousel
const emblaNode = document.querySelector('.embla');
const embla = EmblaCarousel(emblaNode, {
  loop: true,
  align: 'center',
  slidesToScroll: 1
});
