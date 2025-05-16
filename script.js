const donutButtons = document.querySelectorAll('.donut');
donutButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.innerText;
    alert(`You selected: ${mood}`);
  });
});

const emblaNode = document.querySelector('.embla');
const embla = EmblaCarousel(emblaNode, {
  loop: true,
  align: 'center',
  draggable: true,
  slidesToScroll: 1
});
