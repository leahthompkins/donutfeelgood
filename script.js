// Handle button click
const donutButtons = document.querySelectorAll('.donut');
donutButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.innerText;
    alert(`You selected: ${mood}`);
  });
});

// Initialize Embla Carousel
const embla = EmblaCarousel(emblaNode, {
  loop: true,
  align: 'center',
  slidesToScroll: 1,
  draggable: true   // 👈 ensure this is set
});
