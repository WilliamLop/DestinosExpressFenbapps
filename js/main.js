
// Código para la escritura del texto automatico en home
let typed = new Typed('#element-text', {
    strings: ['tu mejor aliado en transporte.', 'eficiente y confiable.', 'rápido y seguro.'],
    typeSpeed: 70,
    loop: true,
});


// JS DE SWIPERS 

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".my-swiper", {
    spaceBetween: 30,
    slidesPerView: 3,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    },
    loop: true, // Habilitar el bucle

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,

        },
        1024: {
            slidesPerView: 3,

        },
    }

});




const removeActiveElements = (selector) => {
    const linksActive = document.querySelectorAll(`.${selector}`);

    if (linksActive.length) {
        linksActive.forEach(linksActive => {
            linksActive.classList.remove(selector);
        });
    }
}

const tabButtons = document.querySelectorAll('.transporte__item');
const buttonPrev = document.querySelector('.button-prev');
const buttonNext = document.querySelector('.button-next');
const transporteContent = document.querySelectorAll('.transporte__content');

// Variable para almacenar el índice del elemento activo
let currentActiveItem = 0;

// Agregar un escuchador de eventos para el evento 'click' en el botón 'buttonPrev'
buttonPrev.addEventListener('click', (e) =>{
    // Prevenir la acción por defecto del evento
    e.preventDefault();
    // Si el índice del elemento activo es mayor que 0
    if (currentActiveItem > 0) {
        // Disminuir el índice del elemento activo en 1
        currentActiveItem--;
    } else {
        // Si no, establecer el índice del elemento activo al último elemento
        currentActiveItem = tabButtons.length - 1;
    }
    // Llamar a la función 'updateActiveItem' para actualizar el elemento activo
    updateActiveItem();
});

// Agregar un escuchador de eventos para el evento 'click' en el botón 'buttonNext'
buttonNext.addEventListener('click', (e) =>{
    // Prevenir la acción por defecto del evento
    e.preventDefault();
    // Si el índice del elemento activo es menor que el índice del último elemento
    if (currentActiveItem < tabButtons.length - 1) {
        // Incrementar el índice del elemento activo en 1
        currentActiveItem++;
    } else {
        // Si no, establecer el índice del elemento activo al primer elemento
        currentActiveItem = 0;
    }
    // Llamar a la función 'updateActiveItem' para actualizar el elemento activo
    updateActiveItem();
});

// Función para actualizar el elemento activo
function updateActiveItem() {
    // Llamar a la función 'removeActiveElements' para eliminar la clase 'features__link--active' de todos los elementos
    removeActiveElements('features__link--active');
    // Llamar a la función 'removeActiveElements' para eliminar la clase 'transporte__article--show' de todos los elementos
    removeActiveElements('transporte__article--show');
    
    // Obtener el número de artículo del elemento activo utilizando su atributo 'data-article'
    const articleNumber = tabButtons[currentActiveItem].getAttribute('data-article');
    // Seleccionar el artículo correspondiente utilizando su número de artículo
    const articleShow = document.querySelector(`.sw:nth-of-type(${articleNumber})`);
    
    // Agregar la clase 'transporte__article--show' al artículo seleccionado para mostrarlo
    articleShow.classList.add('transporte__article--show');
    // Agregar la clase 'features__link--active' al botón correspondiente al elemento activo para resaltarlo
    tabButtons[currentActiveItem].classList.add('features__link--active');
}

// Variable para almacenar el incio del elemento activo
let touchStartX = 0;
// Variable para almacenar el final del elemento activo
let touchEndX = 0;
let isMouseDown = false;


// Escucha el evento touchstart en el objeto documento
// Este evento se activa cuando el usuario empieza a tocar la pantalla
document.addEventListener('touchstart', (e) => {
    // Almacena la coordenada X inicial del evento táctil
    touchStartX = e.changedTouches[0].screenX;
});

// Escucha el evento touchend en el objeto documento
// Este evento se activa cuando el usuario deja de tocar la pantalla
document.addEventListener('touchend', (e) => {
      // Almacena la coordenada X final del evento táctil
    touchEndX = e.changedTouches[0].screenX;
    // Llama a la función handleSwipe para manejar el gesto de deslizamiento
    handleSwipe();
});


// Escucha el evento mousedown en el objeto documento
// Este evento se activa cuando el usuario pulsa el botón del ratón
document.addEventListener('mousedown', (e) => {
    // Establece la variable isMouseDown a true para indicar que el botón del ratón se mantiene pulsado en ese momento
    isMouseDown = true;
    // Almacena la coordenada X inicial del evento del ratón
    touchStartX = e.screenX;
});


// Escucha el evento mouseup en el objeto documento
// Este evento se activa cuando el usuario suelta el botón del ratón
document.addEventListener('mouseup', (e) => {
    // Establece la variable isMouseDown a false para indicar que el botón del ratón ya no se mantiene pulsado
    isMouseDown = false;
    // Almacena la coordenada X final del evento del ratón
    touchEndX = e.screenX;
    // Llama a la función handleSwipe para manejar el gesto de deslizamiento
    handleSwipe();
});

// Escucha el evento mousemove en el objeto documento
// Este evento se activa cuando el usuario mueve el cursor del ratón
document.addEventListener('mousemove', (e) => {
    // Comprueba si el botón del ratón se mantiene pulsado
    if (isMouseDown) {
         // Si lo es, actualiza la coordenada X final del evento del ratón
        touchEndX = e.screenX;
    }
});


//Funcion handle para recorrer los items
function handleSwipe() {

    // variable swipeThreshold para especificar la distancia mínima que debe recorrer un swipe 
    const swipeThreshold = 50;

    // agrego una condición para comprobar si la diferencia absoluta entre las coordenadas X inicial y final es mayor que este umbral. 
    // Si lo es, activamos la función swipe
    if (Math.abs(touchEndX - touchStartX) > swipeThreshold) {
        if (touchEndX < touchStartX) {
            // swipe left, go to next item
            if (currentActiveItem < tabButtons.length - 1) {
                currentActiveItem++;
            } else {
                currentActiveItem = 0;
            }
        } else {
            // swipe right, go to previous item
            if (currentActiveItem > 0) {
                currentActiveItem--;
            } else {
                currentActiveItem = tabButtons.length - 1;
            }
        }
        updateActiveItem();
    }
    // Si no lo es, no hacemos nada.
}

// Evento para cambiar manuelmente bottones de vechiculos
tabButtons.forEach((tabLink, index) => {
    tabLink.addEventListener('click',  (e) => {
        e.preventDefault();
        if(!tabLink.classList.contains('features__link--active')){

            const articleNumber = tabLink.getAttribute('data-article');

            const articleShow = document.querySelector(`.sw:nth-of-type(${articleNumber})`);

            removeActiveElements('features__link--active');
            removeActiveElements('transporte__article--show');

            articleShow.classList.add('transporte__article--show');
            tabLink.classList.add('features__link--active');

            // Actualizar el valor de la variable 'currentActiveItem' con el índice del elemento activo
            currentActiveItem = index;

        }
    });
});


// CODIGO EN PRUEBA

const linkTiposVehiculos = document.querySelectorAll('.vehiculo__item--change');
const imgTiposVehiculos = document.querySelectorAll('.img__camioneta');
const imgChange = document.getElementById('imgChange');


console.log(imgTiposVehiculos);

linkTiposVehiculos.forEach((tipoVehiculo, index) => {
    tipoVehiculo.addEventListener('click', (e) => {
        e.preventDefault();
        if(!tipoVehiculo.classList.contains('vehiculo__item--active')){
            removeActiveElements('vehiculo__item--active');
            tipoVehiculo.classList.add('vehiculo__item--active');
        }

        imgTiposVehiculos.forEach((imgTipo, imgIndex) => {
            if(imgIndex === index){
                removeActiveElements('img-camioneta-show');
                imgTipo.classList.add('img-camioneta-show');
            }
        });
    });
});




