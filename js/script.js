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
            menuSlider();
        },
        slideChange: function () {
            setTimeout(hideNav, 1100)
            menuSliderRemove();
            navList[pageSlider.realIndex].classList.add(`active`);
        },
    },
});

// ----------------------------------------------------------------hide navigation----------------------------------------------------------------
let navBlock = document.querySelector(`.navigation`);
function hideNav() {
    if (navBlock) {
        if (pageSlider.realIndex === 0 || pageSlider.realIndex === (pageSlider.slides.length - 1)) {
            navBlock.classList.remove(`active`);
        } else {
            navBlock.classList.add(`active`);
        }
    }
}

// ----------------------------------------------------------------main navigation----------------------------------------------------------------
let navList = document.querySelectorAll(`.navigation__link`); // находим все навигационные ссылки
function menuSlider() {
    if (navList.length > 0) { // проверка
        navList[pageSlider.realIndex].classList.add(`active`); // добавляем стили для ссылки актуального слайда
        for(let i = 0; i < navList.length; i++) { // перебор массива
            const navLink = navList[i];
            navLink.addEventListener(`click`, function(e) { // вешаем обработчик на каждую ссылку
                menuSliderRemove(); // убираем стили с предыдущей ссылки
                pageSlider.slideTo(i, 1000);  // переходим на новый слайд
                navLink.classList.add(`active`); // добавляем стили для ссылки нового слайда
                e.preventDefault(); // убираем действие ссылки по умолчанию
            });
        }
    }
}
function menuSliderRemove() { // функция для очистки стиля ссылки
    let navLinkActive = document.querySelector(`.navigation__link.active`); // находим ссылку со ститями
    if (navLinkActive) {
        navLinkActive.classList.remove(`active`); // убираем стили со ссылки
    }
}
pageSlider.init();

// ----------------------------------------------------------------nav arrows----------------------------------------------------------------
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