// MENU PARA ABRIR
const navHeaderContent = document.querySelector('.nav__header--content');
const header = document.querySelector('.header');
const navHeader = document.querySelector('.nav__header');
const btnMenu = document.querySelector('.box__model');
const btnMenuIcon = document.querySelector('.box__model--icon');
const figureLogo = document.querySelector('.figure__logo');
const main = document.querySelector('.main');

let ubicacionPrincipal = pageYOffset;

//  Página se desplace hasta el inicio cuando se actualice
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Evento para abrir el menu mobile
btnMenu.addEventListener('click', () => {

    navHeader.classList.toggle('nav__header--active');

    if (navHeader.classList.contains('nav__header--active')) {
        btnMenuIcon.setAttribute('src', './images/icon-close-menu.svg');
        navHeaderContent.classList.add('nav__header--contentBg');
        // figureLogo.classList.add('filters');
        figureLogo.classList.add('displayNone');
        main.classList.add('filters');
        document.body.classList.add('modal-open');
    } else {
        btnMenuIcon.setAttribute('src', './images/icon-hamburger.svg');
        navHeaderContent.classList.remove('nav__header--contentBg');
        figureLogo.classList.remove('displayNone');
        main.classList.remove('filters');
        document.body.classList.remove('modal-open');
    }
});

// Menú interactivo al cambiar de posicion en scroll

window.addEventListener('scroll', (e) => {
    e.preventDefault();
    const desplazamientoActual = window.pageYOffset;
    if (ubicacionPrincipal >= desplazamientoActual) {
        this.document.getElementsByClassName("header")[0].style.top = '0px';

        if (ubicacionPrincipal <= 10) {
            this.document.getElementsByClassName("header")[0].style.backgroundColor = 'transparent';
        }
    } else {
        this.document.getElementsByClassName("header")[0].style.top = '-200px';
        this.document.getElementsByClassName("header")[0].style.backgroundColor = '#0a100d';
    }

    ubicacionPrincipal = desplazamientoActual;
});


const imgServices = document.querySelectorAll('.icon__services');



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
    LinkDrop.style.color = 'orange';

});

navLinkDrop.addEventListener('mouseleave', () => {
    setTimeout(() => {
        if (!dropdowmList.matches(':hover')) {
            hideDropdown();
            LinkDrop.style.color = '#fffffe';
        }
    }, 300);

});


dropdowmList.addEventListener('mouseenter', () => {
    showDropdown();
    LinkDrop.style.color = '#a7a9be';
});

dropdowmList.addEventListener('mouseleave', () => {
    hideDropdown();
    LinkDrop.style.color = '#fffffe';
});

navLinkDrop.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        if (dropdowmList.classList.contains('dropdown__list--show')) {
            hideDropdown();
            LinkDrop.style.color = '#fffffe';
        } else {
            showDropdown();
            LinkDrop.style.color = '#ff8906';
        }
    }
});

// Creo funcion para abrir modal
const btnModalShow = document.querySelector('#reservaForm');
const btncloseModal = document.querySelector('.close__modal');
const openModal = document.querySelectorAll('.open-modal');
const openModalContainer = document.querySelectorAll('.modal__container');
const openModalContent = document.querySelectorAll('.modal__content');
const closeModal = document.querySelectorAll('.close__modal');

function showModal() {

    openModal.forEach((modalOpen, modalIndex) => {
        modalOpen.addEventListener('click', () => {
            console.log(modalIndex);
            openModalContainer.forEach((containerOpen, containerIndex) => {
                if (containerIndex === modalIndex) {
                    containerOpen.classList.add('modal__container--show');
                    btnMenu.classList.add('close__modal--prevent');
                    navHeaderContent.classList.add('filters');
                    main.classList.add('blur');

                }
            });
            openModalContent.forEach((contentOpen, contentIndex) => {
                if (contentIndex === modalIndex) {
                    contentOpen.classList.add('modal__content--show');
                }
            });
            document.body.classList.add('modal-open');


        });
    });


    closeModal.forEach((modalCierre, modalIndex) => {
        modalCierre.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(modalIndex + 'cerrar');

            openModalContainer.forEach((containerOpen, containerIndex) => {
                if (containerIndex === modalIndex) {

                    containerOpen.classList.add('modal__container--hide');
                    btnMenu.classList.remove('close__modal--prevent');
                    // figureLogo.classList.remove('filters');
                    navHeaderContent.classList.remove('filters');

                    navHeaderContent.classList.remove('nav__header--contentBg');

                    main.classList.remove('blur');



                    setTimeout(() => {
                        containerOpen.classList.remove('modal__container--show');
                    }, 360);
                    if (window.innerWidth >= 768) {
                        document.body.classList.remove('modal-open');
                    }
                }
            });
            openModalContent.forEach((contentOpen, contentIndex) => {
                if (contentIndex === modalIndex) {
                    setTimeout(() => {
                        contentOpen.classList.remove('modal__content--show');
                    }, 120);
                }
            });
            if (window.innerWidth >= 768) {
                document.body.classList.remove('modal-open');
            }


        });

    });

}
// Funcion para abrir modales
showModal();

// Abrir Modal cardBack
const btnSalirCard = document.querySelectorAll('#btn--salir-card');
const cardBackContainer = document.querySelectorAll('.card__back--container');
const btnSolicitudCard = document.querySelectorAll('#btn-solicitud');
const cardBackContent = document.querySelectorAll('.card__back--content');


// Creo funcion para abrir cardBack

function resertForm() {
    const fromContainer = document.querySelectorAll('.form__modal');

    fromContainer.forEach((form) => {
        form.reset();
    });
}

const formBack = document.querySelector('.form__modal');
const nameInputs = document.querySelectorAll('input[name="name"]');

nameInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        let nameValue = input.value;
        let spanElements = document.querySelectorAll('.name__tile');

        spanElements.forEach((spanElement) => {
            spanElement.textContent = nameValue + "!";
        });
    });
});

console.log(nameInputs);

// FUNCION  PARA RECORRER LOS MODALES Y MOSTRAR LAS CARD

const form = document.querySelectorAll('.form__modal');

function showCardModal() {

    // Agrego controladores de eventos a cada boton
    btnSolicitudCard.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            // Validacion de formularios
            form.forEach((formContent, fromIndex) => {
                if (fromIndex === index) {
                    if (formContent.checkValidity()) {
                        e.preventDefault();
                        cardBackContainer.forEach((modal, modalIndex) => {
                            if (index === modalIndex) {
                                modal.classList.add('card__back--container-show');

                                openModalContainer.forEach(modalOp => {
                                    modalOp.classList.add('filters');
                                });
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
                    } else {
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
                        form[containerIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });

                    }, 300);
                }
            });
            resertForm();
            openModalContainer.forEach(modalCl => {
                modalCl.classList.remove('filters');
            });

        });
    });

}

// LLamado de funcion Mostrar modales
showCardModal();


const navItem = document.querySelectorAll('.nav__item');

navItem.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {

    });
});


// resize del menu

window.addEventListener('resize', () => {
    if (window.innerWidth >= 718) {
        const isMenuActive = document.querySelector('.nav__header--active');

        if (isMenuActive) {
            navHeader.classList.remove('nav__header--active');
            btnMenuIcon.setAttribute('src', './images/icon-hamburger.svg');
            main.classList.remove('blur');
            main.classList.remove('filters');
            figureLogo.classList.remove('filters');
            navHeaderContent.classList.remove('filters');
            navHeaderContent.classList.remove('nav__header--contentBg');
            figureLogo.classList.remove('displayNone');
            document.body.classList.remove('modal-open');
        }
    }
});

