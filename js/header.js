

// MENU PARA ABRIR
const navHeaderContent = document.querySelector('.nav__header--content');
const navHeader = document.querySelector('.nav__header');
const btnMenu = document.querySelector('.box__model');
const btnMenuIcon = document.querySelector('.box__model--icon');

console.log(navHeaderContent);


btnMenu.addEventListener('click', () => {

    navHeader.classList.toggle('nav__header--active');

    if (navHeader.classList.contains('nav__header--active')) {
        btnMenuIcon.setAttribute('src', './images/icon-close-menu.svg');
        navHeaderContent.classList.add('nav__header--contentBg');
    } else {
        btnMenuIcon.setAttribute('src', './images/icon-hamburger.svg');
        navHeaderContent.classList.remove('nav__header--contentBg');
    }
});

// DROPDOWN LISTA 
const navLinkDrop = document.querySelector('#item__drop');
const LinkDrop = document.querySelector('#link__drop');
const iconArrow = document.querySelector('#arrow');
const dropdowmList = document.querySelector('.dropdown__list');

// Funcion para agregar clases al dropdown y mostarlo

function showDropdown() {
    dropdowmList.classList.add('dropdown__list--show');
    iconArrow.classList.add('rotate--arrow');
}


// Funcion para remover clases al dropdown 
function hideDropdown() {
    dropdowmList.classList.remove('dropdown__list--show');
    iconArrow.classList.remove('rotate--arrow');
}


navLinkDrop.addEventListener('mouseenter', () => {
    showDropdown();
});

navLinkDrop.addEventListener('mouseleave', () => {
    setTimeout(() => {
        if (!dropdowmList.matches(':hover')) {
            hideDropdown();
        }
    }, 300);

});

dropdowmList.addEventListener('mouseenter', () => {
    showDropdown();
});

dropdowmList.addEventListener('mouseleave', () => {
    hideDropdown();
});

navLinkDrop.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav__link')) {
        if (dropdowmList.classList.contains('dropdown__list--show')) {
            hideDropdown();
        } else {
            showDropdown();
        }
    }
});



// Abrir Modal 

const btnModalShow = document.querySelector('#reservaForm');
const divModalContent = document.querySelector('.modal__content--reserva');
const divModalContainer = document.querySelector('.modal__container--reserva');
const btnModalShow2 = document.querySelector('#lineaForm');
const divModalContent2 = document.querySelector('.modal__content--linea');
const divModalContainer2 = document.querySelector('.modal__container--linea');
const btncloseModal = document.querySelector('.close__modal');
const btncloseModal2 = document.querySelector('.close__modal--honesta');

// Creo funcion para abrir modal
function showModal() {

    btnModalShow.addEventListener('click', () => {
        divModalContainer.classList.add('modal__container--show');
        divModalContent.classList.add('modal__content--show');
        btnMenu.classList.add('close__modal--prevent');
    });
    btnModalShow2.addEventListener('click', () => {
        divModalContainer2.classList.add('modal__container--show');
        divModalContent2.classList.add('modal__content--show');
        btnMenu.classList.add('close__modal--prevent');
    });
}

// Creo funcion para cerrar modal
function hideModal() {
    divModalContent.classList.add('modal__content--hide');
    btnMenu.classList.remove('close__modal--prevent');
    divModalContent2.classList.add('modal__content--hide');
    setTimeout(() => {
        divModalContainer.classList.remove('modal__container--show');
        divModalContent.classList.remove('modal__content--show', 'modal__content--hide');
        divModalContainer2.classList.remove('modal__container--show');
        divModalContent2.classList.remove('modal__content--show', 'modal__content--hide');
    }, 280);

}



showModal();

btncloseModal.addEventListener('click', () => {
    hideModal();
});
btncloseModal2.addEventListener('click', () => {
    hideModal();
});


// Abrir Modal cardBack

// const cardBackContainer = document.querySelector('.back--reservacion-container');
// const cardBackContent = document.querySelector('.back--reservacion-content');
const btnSalirCard = document.querySelectorAll('#btn--salir-card');
const cardBackContainer = document.querySelectorAll('.card__back--container');
const btnSolicitudCard = document.querySelectorAll('#btn-solicitud');
const cardBackContainer2 = document.querySelector('.back--linea-container');
const cardBackContent = document.querySelectorAll('.card__back--content');
// const btnSalirCard2 = document.querySelectorAll('#btn--salir-card');

console.log(cardBackContainer2);

console.log(cardBackContent);
console.log(btnSolicitudCard);




// Creo funcion para abrir cardBack

function resertForm() {
    const fromContainer = document.querySelectorAll('.form__modal');

    fromContainer.forEach((form) => {
        form.reset();
    });
}



// FUNCION  PARA RECORRER LOS MODALES Y MOSTRAR LAS CARD

const form = document.querySelectorAll('.form__modal');
function showCardModal() {

    // Agrego controladores de eventos a cada boton
    btnSolicitudCard.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            // Validacion de formularios
            form.forEach((formContent, fromIndex) => {
                if(fromIndex === index){
                    if(formContent.checkValidity()) {
                        e.preventDefault();
                        cardBackContainer.forEach((modal, modalIndex) => {
                            if (index === modalIndex) {
                                modal.classList.add('card__back--container-show');
    
                            } else {
                                modal.classList.remove('card__back--container-show');
                            }
                        });
                        cardBackContent.forEach((modalCotnent, modalContentIndex) => {
                            if (index === modalContentIndex) {
                                modalCotnent.classList.add('card__back__content--show');
                            } else {
                                modalCotnent.classList.remove('card__back__content--show');
                            }
                        });
                    }else{
                        formContent.reportValidity();
                    }
                }
            });
        });
    });

    // Boton para volver al from 
    btnSalirCard.forEach((btnSalir, index) => {
        btnSalir.addEventListener('click', () => {
            cardBackContainer.forEach((container, containerIndex) => {

                if (index === containerIndex) {
                    console.log('Si entra');
                    setTimeout(() => {
                        container.classList.remove('card__back--container-show');

                        // Mover el enfoque al inicio del formulario
                        form[containerIndex].scrollIntoView({ behavior: 'smooth', block: 'start'});

                    }, 300);
                }
            });
            resertForm();
        });
    });

}

// LLamado de funcion Mostrar modales
showCardModal();

