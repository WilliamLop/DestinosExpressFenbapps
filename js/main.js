AOS.init();
// Código para la escritura del texto automatico en home
let typed = new Typed('#element-text', {
    strings: ['Tú mejor aliado en transporte', 'Eficiente y confiable', 'Rápido y seguro'],
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
const ContainerVehiculos = document.querySelector('.swiper--touch');

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
    removeActiveElements('transporte__item--active');
    
    // Obtener el número de artículo del elemento activo utilizando su atributo 'data-article'
    const articleNumber = tabButtons[currentActiveItem].getAttribute('data-article');
    // Seleccionar el artículo correspondiente utilizando su número de artículo
    const articleShow = document.querySelector(`.sw:nth-of-type(${articleNumber})`);
    
    // Agregar la clase 'transporte__article--show' al artículo seleccionado para mostrarlo
    articleShow.classList.add('transporte__article--show');
    // Agregar la clase 'features__link--active' al botón correspondiente al elemento activo para resaltarlo
    tabButtons[currentActiveItem].classList.add('features__link--active');
    tabButtons[currentActiveItem].classList.add('transporte__item--active');
}

// Variable para almacenar el incio del elemento activo
let touchStartX = 0;
// Variable para almacenar el final del elemento activo
let touchEndX = 0;
let isMouseDown = false;


// Escucha el evento touchstart en el objeto documento
// Este evento se activa cuando el usuario empieza a tocar la pantalla
ContainerVehiculos.addEventListener('touchstart', (e) => {
    // Almacena la coordenada X inicial del evento táctil
    touchStartX = e.changedTouches[0].screenX;
});

// Escucha el evento touchend en el objeto documento
// Este evento se activa cuando el usuario deja de tocar la pantalla
ContainerVehiculos.addEventListener('touchend', (e) => {
      // Almacena la coordenada X final del evento táctil
    touchEndX = e.changedTouches[0].screenX;
    // Llama a la función handleSwipe para manejar el gesto de deslizamiento
    handleSwipe();
});


// Escucha el evento mousedown en el objeto documento
// Este evento se activa cuando el usuario pulsa el botón del ratón
ContainerVehiculos.addEventListener('mousedown', (e) => {
    // Establece la variable isMouseDown a true para indicar que el botón del ratón se mantiene pulsado en ese momento
    isMouseDown = true;
    // Almacena la coordenada X inicial del evento del ratón
    touchStartX = e.screenX;
});


// Escucha el evento mouseup en el objeto documento
// Este evento se activa cuando el usuario suelta el botón del ratón
ContainerVehiculos.addEventListener('mouseup', (e) => {
    // Establece la variable isMouseDown a false para indicar que el botón del ratón ya no se mantiene pulsado
    isMouseDown = false;
    // Almacena la coordenada X final del evento del ratón
    touchEndX = e.screenX;
    // Llama a la función handleSwipe para manejar el gesto de deslizamiento
    handleSwipe();
});

// Escucha el evento mousemove en el objeto documento
// Este evento se activa cuando el usuario mueve el cursor del ratón
ContainerVehiculos.addEventListener('mousemove', (e) => {
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
        // if(!tabLink.classList.contains('features__link--active')){

            const articleNumber = tabLink.getAttribute('data-article');

            const articleShow = document.querySelector(`.sw:nth-of-type(${articleNumber})`);

            removeActiveElements('features__link--active');
            removeActiveElements('transporte__article--show');
            removeActiveElements('transporte__item--active');

            articleShow.classList.add('transporte__article--show');
            tabLink.classList.add('features__link--active');
            tabLink.classList.add('transporte__item--active');

            // Actualizar el valor de la variable 'currentActiveItem' con el índice del elemento activo
        
            currentActiveItem = index;
        // }
    });

      // Add mouseover event listener
    tabLink.addEventListener('mouseover', (e) => {
        e.preventDefault();
        // Remove active classes from all elements
        removeActiveElements('features__link--active');
        removeActiveElements('transporte__item--active');
        // Add active classes to the hovered element
        tabLink.classList.add('features__link--active');
        tabLink.classList.add('transporte__item--active');
    });
    // Add mouseout event listener
    tabLink.addEventListener('mouseout', (e) => {
        e.preventDefault();
        // Remove active classes from all elements
        removeActiveElements('features__link--active');
        removeActiveElements('transporte__item--active');
        // Add active classes back to the current active item
        const currentTabLink = tabButtons[currentActiveItem];
        currentTabLink.classList.add('features__link--active');
        currentTabLink.classList.add('transporte__item--active');
    });

    
    
});


// Cambio de tipo de vehiculo 

const linkTiposVehiculos = document.querySelectorAll('.vehiculo__item--change');
const imgTiposVehiculos = document.querySelectorAll('.img__camioneta');
const imgChange = document.getElementById('imgChange');


linkTiposVehiculos.forEach((tipoVehiculo, index) => {
    tipoVehiculo.addEventListener('click', (e) => {
        e.preventDefault();
            removeActiveElements('vehiculo__item--show');
            tipoVehiculo.classList.add('vehiculo__item--show');
            currentActiveItem = index;        // }

        imgTiposVehiculos.forEach((imgTipo, imgIndex) => {
            if(imgIndex === index){
                removeActiveElements('img-camioneta-show');
                imgTipo.classList.add('img-camioneta-show');
            }
        });
    });
      // Add mouseover event listener
    tipoVehiculo.addEventListener('mouseover', (e) => {
        e.preventDefault();
        // Remove active classes from all elements
        removeActiveElements('vehiculo__item--show');
        tipoVehiculo.classList.add('vehiculo__item--show');
    });
    // Add mouseout event listener
    tipoVehiculo.addEventListener('mouseout', (e) => {
        e.preventDefault();
        // Remove active classes from all elements
        removeActiveElements('vehiculo__item--show');
        // Add active classes back to the current active item
        const currenttipoVehiculo = linkTiposVehiculos[currentActiveItem];
        currenttipoVehiculo.classList.add('vehiculo__item--show');
    });
});


const imgMensajeria = document.querySelectorAll('.mensajeria__img');


let currentIndex = 0;
let currentIndex2 = 0;
const maxIndex = linkTiposVehiculos.length;
const maxIndexImgs = imgMensajeria.length;

// setInterval(() => {
    removeActiveElements('vehiculo__item--show');
    linkTiposVehiculos[currentIndex].classList.add('vehiculo__item--show');

    removeActiveElements('img-camioneta-show');
    imgTiposVehiculos[currentIndex].classList.add('img-camioneta-show');

    currentIndex = (currentIndex + 1) % maxIndex;
// });


setInterval(() => {
    removeActiveElements('mensajeria__img--show');
    imgMensajeria[currentIndex2].classList.add('mensajeria__img--show');

    currentIndex2 = (currentIndex2 + 1) % maxIndexImgs;
}, 4000);


const btnCotizarCard = document.getElementById('btn-cotizar');
const linkCotizar = document.querySelector('.btn-cotizar--link');
const btnSrCard = document.querySelector('.btn--salir-card');
const cotizarCard = document.querySelector('.cotizar__container');
const cotizarContainerCard = document.querySelector('.cotizar__content--card');
const form2 = document.querySelector('.from__cotizar');

function resertForm2() {
    const fromContainer = document.querySelector('.from__cotizar');
    fromContainer.reset();
}

linkCotizar.addEventListener('click', (e) => {
    e.preventDefault();
    form2.scrollIntoView({ behavior: 'smooth'});
});


btnCotizarCard.addEventListener('click', (e) => {
    if(form2.checkValidity()) {
        e.preventDefault();
        cotizarCard.classList.add('cotizar__container--show');
        cotizarCard.classList.add('nav__header--contentBg');
        form2.classList.add('filters');
        cotizarContainerCard.classList.add('cotizar__content--card-show');
    }
});
btnSrCard.addEventListener('click', (e) => {
    e.preventDefault();
    cotizarCard.classList.remove('cotizar__container--show');
    cotizarCard.classList.remove('nav__header--contentBg');
    form2.classList.remove('filters');
    cotizarContainerCard.classList.remove('cotizar__content--card-show');
    resertForm2();

});


// CAMBIAR EL COLOR DE LAS REDES AL HACER HOVER


const redes = document.querySelectorAll('.info__redes--img');

redes.forEach(imgs => {
    imgs.addEventListener('mouseover', (e) =>{
        const imgType = imgs.getAttribute('alt').split('-')[1];
        imgs.setAttribute('src', `./images/icon-${imgType}-yellow.svg`);
    });
    imgs.addEventListener('mouseout', (e) =>{
        const imgType = imgs.getAttribute('alt').split('-')[1];
        imgs.setAttribute('src', `./images/icon-${imgType}.svg`);
    });
});



// console.log(nameInput);

