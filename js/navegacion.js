// Obtener todos los elementos de navegación
const navLinks = document.querySelectorAll('.nav__link--page');

// Función para eliminar la clase activa de todos los elementos de navegación
const removeActiveElements2 = (selector) => {
    const linksActive = document.querySelectorAll(`.${selector}`);

    if (linksActive.length) {
        linksActive.forEach(linksActive => {
            linksActive.classList.remove(selector);
        });
    }
}

// Agregar evento de clic a los elementos de navegación para actualizar la clase activa
navLinks.forEach((itemNav) => {
    itemNav.addEventListener('click', (e) => {
        if (!itemNav.classList.contains('item-pages-active')) {
            removeActiveElements2('item-pages-active');
            itemNav.classList.add('item-pages-active');
        }
    });
});
