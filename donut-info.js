




  document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');

    toggleButton.addEventListener('click', function () {
      sideMenu.classList.toggle('open');
    });
  });

  document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
      const body = button.nextElementSibling;
      const arrow = button.querySelector('.arrow');

      const isOpen = body.style.display === 'block';

      // Toggle content visibility
      body.style.display = isOpen ? 'none' : 'block';

      // Toggle arrow
      arrow.textContent = isOpen ? '▼' : '▲';
    });
  });