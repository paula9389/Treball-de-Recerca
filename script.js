console.log("La web del TDR està en marxa!");

document.addEventListener('DOMContentLoaded', function() {
  // 1. Cargar el menú.html dentro del contenedor
  fetch('menu.html')
    .then(response => response.text())
    .then(data => {
      // ————————————————
      // CAMBIO #1: Asegúrate de que en tu HTML principal existía:
      // <div id="menu-container"></div>
      // Aquí obtenemos ese contenedor para volcarle el menú.
      const menuContainer = document.getElementById('menu-container');
      menuContainer.innerHTML = data;
      // ————————————————

      // 2. Una vez inyectado el fragmento de menu.html, localizamos
      //    el botón y el <div> del menú usando las clases/IDs REALES que tienes.

      // ————————————————
      // CAMBIO #2: Antes estabas usando `getElementById('hamburger')`
      //            y `getElementById('menu')`, pero en tu menu.html el botón
      //            es <button class="menu-toggle">…</button> y el menú es
      //            <div id="hamburgerMenu" class="menu">…</div>.
      //            Por eso los buscas así:

      const menuToggle       = menuContainer.querySelector('.menu-toggle');   // botón (<button class="menu-toggle">)
      const menuDesplegable  = menuContainer.querySelector('#hamburgerMenu'); // <div id="hamburgerMenu" class="menu">

      // Ahora sí van a encontrarse correctamente, porque coinciden con tu HTML.
      // ————————————————

      if (menuToggle && menuDesplegable) {
        // 3. Al hacer clic en el botón, alternamos la clase "open" en el <div class="menu">:
        menuToggle.addEventListener('click', function(event) {
          event.stopPropagation();              // Evita que el clic “viaje” al document y cierre el menú inmediatamente
          menuDesplegable.classList.toggle('open');
        });

        // 4. Opcional: cerrar el menú si el usuario clica fuera de él o del propio botón
        document.addEventListener('click', function(e) {
          if (!menuDesplegable.contains(e.target) && !menuToggle.contains(e.target)) {
            menuDesplegable.classList.remove('open');
          }
        });
      }
      // ————————————————

    })
    .catch(error => {
      console.error('Error cargando el menú:', error);
    });
});
