"use strict"

// ---------------------------------------------------------------- screen slider----------------------------------------------------------------
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
            removeBarArrows();
            barNavList[pageSlider.realIndex].classList.add(`active-nav`);
            headerNavList[pageSlider.realIndex].classList.add(`active-nav`);
            footerNavList[pageSlider.realIndex].classList.add(`active-nav`);
        },
    },
});

// ---------------------------------------------------------------- dates mini-slider----------------------------------------------------------------
let dataMiniSlider = new Swiper (`.dates-nav__slider`, {
    wrapperClass: 'dates-nav__wrapper',
    slideClass: 'dates-nav__slide',
    direction: `vertical`,
    nested: true,
    speed: 1000,
    watchOverflow: true,
    simulateTouch: false,
});

// ---------------------------------------------------------------- dates media slider----------------------------------------------------------------
let dataContentSlider = new Swiper (`.dates-slider`, {
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
            changeColorArrows();
        },
    },
});

// ---------------------------------------------------------------- about slider----------------------------------------------------------------
let aboutSlider = new Swiper (`.about-slider`, {
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
    // scrollbar: {
    //     el: `.swiper-scrollbar`,
    //     draggable: true,
    //     dragSize: `auto`,
    // },
    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
    },
});

// ----------------------------------------------------------------navigation bar----------------------------------------------------------------
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
let upBarArrow = document.querySelector(`.navigation__arrow-link_up`);
let downBarArrow = document.querySelector(`.navigation__arrow-link_down`);

function removeBarArrows() {
    if (upBarArrow) {
        if (pageSlider.realIndex === 0) {
            upBarArrow.style.color = `#d3d3d3`;
            upBarArrow.style.cursor = `default`;
        } else {
            upBarArrow.style.color = `#a9a9a9`;
            upBarArrow.style.cursor = `pointer`;
        }
    }
    if (downBarArrow) {
        if (pageSlider.realIndex === pageSlider.slides.length - 1) {
            downBarArrow.style.color = `#d3d3d3`;
            downBarArrow.style.cursor = `default`;
        } else {
            downBarArrow.style.color = `#a9a9a9`;
            downBarArrow.style.cursor = `pointer`;
        }
    }
}

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

// ----------------------------------------------------------------dates slider arrows----------------------------------------------------------------
let leftDatesArrow = document.querySelector(`.dates-nav__arrow_left`);
let rightDatesArrow = document.querySelector(`.dates-nav__arrow_right`);

function changeColor(element, clr) {
    element.style.color = clr;
}

function changeColorArrows() {
    if (leftDatesArrow) {
        if (dataContentSlider.realIndex === 0) {
            leftDatesArrow.style.color = `#d3d3d3`;
            leftDatesArrow.style.cursor = `default`;
        } else {
            leftDatesArrow.style.color = `#a9a9a9`;
            leftDatesArrow.style.cursor = `pointer`;
        }
    }
    if (rightDatesArrow) {
        if (dataContentSlider.realIndex === dataContentSlider.slides.length - 1) {
            rightDatesArrow.style.color = `#d3d3d3`;
            rightDatesArrow.style.cursor = `default`;
        } else {
            rightDatesArrow.style.color = `#a9a9a9`;
            rightDatesArrow.style.cursor = `pointer`;
        }
    }
}