
// MENU PARA ABRIR
const navHeaderContent = document.querySelector('.nav__header--content');
const navHeader = document.querySelector('.nav__header');
const btnMenu = document.querySelector('.box__model');
const btnMenuIcon = document.querySelector('.box__model--icon');

console.log(navHeaderContent);


btnMenu.addEventListener('click', () =>{

    navHeader.classList.toggle('nav__header--active');

    if(navHeader.classList.contains('nav__header--active')){
        btnMenuIcon.setAttribute('src', './images/icon-close-menu.svg');
        navHeaderContent.classList.add('nav__header--contentBg');
    }else{
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

function showDropdown(){
    dropdowmList.classList.add('dropdown__list--show');
    iconArrow.classList.add('rotate--arrow');
}

// Funcion para remover clases al dropdown 
function hideDropdown(){
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
function showModal(){
    divModalContainer.classList.add('modal__container--show');
    divModalContent.classList.add('modal__content--show');
}

function hideModal(){
    divModalContent.classList.add('modal__content--hide');
    setTimeout(() => {
        divModalContainer.classList.remove('modal__container--show');
        divModalContent.classList.remove('modal__content--show', 'modal__content--hide');
    }, 400);
}

function showModal2(){
    divModalContainer2.classList.add('modal__container--show');
    divModalContent2.classList.add('modal__content--show');
    
}
function hideModal2(){
    divModalContent2.classList.add('modal__content--hide');
    setTimeout(() => {
        divModalContainer2.classList.remove('modal__container--show');
        divModalContent2.classList.remove('modal__content--show', 'modal__content--hide');
    }, 400);
}


btnModalShow.addEventListener('click', () => {
    showModal();
});
btncloseModal.addEventListener('click', () => {
    hideModal() ;   
});
btnModalShow2.addEventListener('click', () => {
    showModal2();
});
btncloseModal2.addEventListener('click', () => {
    hideModal2();
});




