
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
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
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

    if(linksActive.length){
        linksActive.forEach(linksActive =>{
            linksActive.classList.remove(selector);
        });
    }
}



// JS SECCION TRANSPORTE

const tabButtons = document.querySelectorAll('.transporte__item');


tabButtons.forEach((tabLink, index) => {
    tabLink.addEventListener('click',  (e) => {
        e.preventDefault();
        if(!tabLink.classList.contains('features__link--active')){

            const articleNumber = tabLink.getAttribute('data-article');

            const articleShow = document.querySelector
            (`.transporte__content:nth-of-type(${articleNumber})`);

            removeActiveElements('features__link--active');
            removeActiveElements('transporte__article--show');

            articleShow.classList.add('transporte__article--show');
            tabLink.classList.add('features__link--active');
        }
    });

});


console.log(tabButtons);
