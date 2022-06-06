"use strict"

// ----------------------------------------------------------------slider----------------------------------------------------------------
let pageSlider = new Swiper(`.swiper`, {
    direction: `vertical`,
    slidesPerView: `auto`,
    speed: 1000,
    parallax: true,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    mousewheel: {
        sensitivity: 1,
    },
    navigation: {
        nextEl: `.navigation__arrow_down`,
        prevEl: `.navigation__arrow_up`,
    },
    init: false,
    on: {
        init: function () {
            menuNav(barNavList);
            menuNav(headerNavList);
            menuNav(footerNavList);
        },
        slideChange: function () {
            setTimeout(hideNav, 1100);
            menuNavRemove();
            removeBarArrows()
            barNavList[pageSlider.realIndex].classList.add(`active-nav`);
            headerNavList[pageSlider.realIndex].classList.add(`active-nav`);
            footerNavList[pageSlider.realIndex].classList.add(`active-nav`);
        },
    },
});

// ----------------------------------------------------------------hide navigation bar----------------------------------------------------------------
let navBlock = document.querySelector(`.navigation`);
function hideNav() {
    if (navBlock) {
        if (pageSlider.realIndex === 0 || pageSlider.realIndex === (pageSlider.slides.length - 1)) {
            navBlock.classList.remove(`active-bar`);
        } else {
            navBlock.classList.add(`active-bar`);
        }
    }
}

// ----------------------------------------------------------------navigation----------------------------------------------------------------
let barNavList = document.querySelectorAll(`.navigation__link`);
let headerNavList = document.querySelectorAll(`.header-nav__link`);
let footerNavList = document.querySelectorAll(`.footer-nav__link`);

function menuNav(linkArray) {
    if (linkArray.length > 0) { // проверка
        linkArray[pageSlider.realIndex].classList.add(`active-nav`); // добавляем стили для ссылки актуального слайда
        for(let i = 0; i < linkArray.length; i++) { // перебор массива
            const link = linkArray[i];
            link.addEventListener(`click`, function(e) { // вешаем обработчик на каждую ссылку
                menuNavRemove(); // убираем стили с предыдущей ссылки
                pageSlider.slideTo(i, 1000);  // переходим на новый слайд
                link.classList.add(`active-nav`); // добавляем стили для ссылки нового слайда
                e.preventDefault(); // убираем действие ссылки по умолчанию
            });
        }
    }
}
function menuNavRemove() { // функция для очистки стиля ссылки
    let linkArrayActive = document.querySelectorAll(`.active-nav`);// находим ссылку со ститями
    if (linkArrayActive.length > 0) {
        for(let i = 0; i < linkArrayActive.length; i++) {
            const activelink = linkArrayActive[i];
            activelink.classList.remove(`active-nav`); // убираем стили со ссылки
        }
    }
}
pageSlider.init();

// ----------------------------------------------------------------navigation bar arrows----------------------------------------------------------------
let upBarArrow = document.querySelector(`.navigation__arrow_up`);
let downBarArrow = document.querySelector(`.navigation__arrow_down`);

function removeBarArrows() {
    if (upBarArrow) {
        if (pageSlider.realIndex === 0) {
            upBarArrow.classList.add(`hide-arrow`);
        } else {
            upBarArrow.classList.remove(`hide-arrow`);
        }
    }
    if (downBarArrow) {
        if (pageSlider.realIndex === pageSlider.slides.length - 1) {
            downBarArrow.classList.add(`hide-arrow`);
        } else {
            downBarArrow.classList.remove(`hide-arrow`);
        }
    }
}


// ----------------------------------------------------------------firstscreen & lastscreen arrows----------------------------------------------------------------
let downArrow = document.querySelector(`.navbutton_down`);
let upArrow = document.querySelector(`.navbutton_up`);
if (downArrow) {
    downArrow.addEventListener(`click`, function (e) {
        pageSlider.slideTo(pageSlider.realIndex + 1);
        e.preventDefault();
    });
}
if (upArrow) {
    upArrow.addEventListener(`click`, function (e) {
        pageSlider.slideTo(pageSlider.realIndex - 1);
        e.preventDefault();
    });
}