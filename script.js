const emblaNode = document.querySelector('.embla');
const embla = EmblaCarousel(emblaNode, {
  loop: true,
  draggable: true,
  align: 'center',
  slidesToScroll: 1
});

document.querySelectorAll('.donut').forEach(button => {
  button.addEventListener('click', () => {
    const mood = button.innerText;
    alert(`You selected: ${mood}`);
  });
});
