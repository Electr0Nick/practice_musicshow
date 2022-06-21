"use strict"

// ---------------------------------------------------------------- screen slider----------------------------------------------------------------
let upBarArrow = document.querySelector(`.navigation__arrow-link_up`);
let downBarArrow = document.querySelector(`.navigation__arrow-link_down`);

let pageSlider = new Swiper(`.swiper`, {
    direction: `vertical`,
    slidesPerView: `auto`,
    speed: 1000,
    parallax: true,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    simulateTouch: false,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    mousewheel: {
        sensitivity: 1,
    },
    navigation: {
        nextEl: `.navigation__arrow-link_down`,
        prevEl: `.navigation__arrow-link_up`,
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
            changeColorArrows(pageSlider, upBarArrow, downBarArrow);
            barNavList[pageSlider.realIndex].classList.add(`active-nav`);
            headerNavList[pageSlider.realIndex].classList.add(`active-nav`);
            footerNavList[pageSlider.realIndex].classList.add(`active-nav`);
        },
    },
});

// ---------------------------------------------------------------- dates mini-slider----------------------------------------------------------------
let dataMiniSlider = new Swiper(`.dates-nav__slider`, {
    wrapperClass: 'dates-nav__wrapper',
    slideClass: 'dates-nav__slide',
    direction: `vertical`,
    nested: true,
    speed: 1000,
    watchOverflow: true,
    simulateTouch: false,
});

// ---------------------------------------------------------------- dates media slider----------------------------------------------------------------
let leftDatesArrow = document.querySelector(`.dates-nav__arrow_left`);
let rightDatesArrow = document.querySelector(`.dates-nav__arrow_right`);

let dataContentSlider = new Swiper(`.dates-slider`, {
    wrapperClass: 'dates-slider__wrapper',
    slideClass: 'dates-slider__slide',
    nested: true,
    speed: 1000,
    spaceBetween: 50,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    navigation: {
        nextEl: `.dates-nav__arrow_right`,
        prevEl: `.dates-nav__arrow_left`,
    },
    controller: {
        control: dataMiniSlider,
    },
    on: {
        slideChange: function () {
            changeColorArrows(dataContentSlider, leftDatesArrow, rightDatesArrow);
        },
    },
});

// ---------------------------------------------------------------- tickets slider----------------------------------------------------------------
let ticketsSlider = new Swiper(`.tickets-slider`, {
    wrapperClass: 'tickets-slider__wrapper',
    slideClass: 'tickets-slider__slide',
    nested: true,
    loop: true,
    speed: 800,
    spaceBetween: 30,
    slidesPerView: `auto`,
    loopedSlides: 3,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// ---------------------------------------------------------------- about slider----------------------------------------------------------------
let aboutSlider = new Swiper(`.about-slider`, {
    wrapperClass: 'about-slider__wrapper',
    slideClass: 'about-slider__slide',
    nested: true,
    loop: true,
    speed: 1000,
    spaceBetween: 50,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    navigation: {
        nextEl: `.about-info__sliderbutton_right`,
        prevEl: `.about-info__sliderbutton_left`,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// ---------------------------------------------------------------- artists background slider----------------------------------------------------------------
let artistsBgSlider = new Swiper(`.back-slider`, {
    wrapperClass: 'back-slider__wrapper',
    slideClass: 'back-slider__slide',
    nested: true,
    watchOverflow: true,
    simulateTouch: false,
    effect: `fade`,
    fadeEffect: {
        crossFade: true,
    },
});

// ---------------------------------------------------------------- artists slider----------------------------------------------------------------
let leftArtistsArrow = document.querySelector(`.artists__slider-button_left`);
let rightArtistsArrow = document.querySelector(`.artists__slider-button_right`);

let artistsSlider = new Swiper(`.artist-slider`, {
    wrapperClass: 'artist-slider__wrapper',
    slideClass: 'artist-slider__slide',
    nested: true,
    speed: 1200,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    navigation: {
        nextEl: `.artists__slider-button_right`,
        prevEl: `.artists__slider-button_left`,
    },
    scrollbar: {
        el: `.swiper-scrollbar`,
        draggable: true,
    },
    controller: {
        control: artistsBgSlider,
    },
    on: {
        slideChange: function () {
            changeColorArrows(artistsSlider, leftArtistsArrow, rightArtistsArrow);
        },
    },
});

// ----------------------------------------------------------------change arrows color function----------------------------------------------------------------
function changeColorArrows(slider, prevArrow, nextArrow) {
    if (slider.realIndex === 0) {
        prevArrow.classList.remove(`activearrow`);
        prevArrow.classList.add(`noactivearrow`);
    } else {
        prevArrow.classList.remove(`noactivearrow`);
        prevArrow.classList.add(`activearrow`);
    }
    if (slider.realIndex === slider.slides.length - 1) {
        nextArrow.classList.remove(`activearrow`);
        nextArrow.classList.add(`noactivearrow`);
    } else {
        nextArrow.classList.remove(`noactivearrow`);
        nextArrow.classList.add(`activearrow`);
    }
}

// ----------------------------------------------------------------navigation bar----------------------------------------------------------------
let barNavList = document.querySelectorAll(`.navigation__link`);
let headerNavList = document.querySelectorAll(`.header-nav__link`);
let footerNavList = document.querySelectorAll(`.footer-nav__link`);

function menuNav(linkArray) {
    if (linkArray.length > 0) { // проверка
        linkArray[pageSlider.realIndex].classList.add(`active-nav`); // добавляем стили для ссылки актуального слайда
        for (let i = 0; i < linkArray.length; i++) { // перебор массива
            const link = linkArray[i];
            link.addEventListener(`click`, function (e) { // вешаем обработчик на каждую ссылку
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
        for (let i = 0; i < linkArrayActive.length; i++) {
            const activelink = linkArrayActive[i];
            activelink.classList.remove(`active-nav`); // убираем стили со ссылки
        }
    }
}
pageSlider.init();

// ----------------------------------------------------------------navigation arrows animation----------------------------------------------------------------
// downBarArrow.addEventListener(`mouseover`, function (e) {
//     if (downBarArrow.classList.contains(`activearrow`)) {
//         let activeSlide = document.querySelector(`.swiper-slide-active`);
//         // activeSlide.style.transform = `translate(20px)`;
//         console.log('bang!');
//         console.log(activeSlide);
//     }
// });


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

// ----------------------------------------------------------------firstscreen & lastscreen arrows----------------------------------------------------------------
let upNavArrow = document.querySelector(`.navbutton_up`);
let downNavArrow = document.querySelector(`.navbutton_down`);
if (downNavArrow) {
    downNavArrow.addEventListener(`click`, function (e) {
        pageSlider.slideTo(pageSlider.realIndex + 1);
        e.preventDefault();
    });
}
if (upNavArrow) {
    upNavArrow.addEventListener(`click`, function (e) {
        pageSlider.slideTo(pageSlider.realIndex - 1);
        e.preventDefault();
    });
}