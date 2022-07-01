"use strict"
const wrapper = document.querySelector(`.wrapper`);

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
    preloadImages: false,
    lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
    },
    init: false,
    on: {
        init: function () {
            menuNav(barNavList);
            menuNav(headerNavList);
            menuNav(footerNavList);
            addFreeMode();
        },
        slideChange: function () {
            setTimeout(hideNav, 1100);
            menuNavRemove();
            changeColorArrows(pageSlider, upBarArrow, downBarArrow);
            barNavList[pageSlider.realIndex].classList.add(`active-nav`);
            headerNavList[pageSlider.realIndex].classList.add(`active-nav`);
            footerNavList[pageSlider.realIndex].classList.add(`active-nav`);
            playAnimation();
        },
        slideChangeTransitionEnd: function () {
            removeAnimation();
            addStaticFlag();
            playAnimation();
        },
        resize: function () {
            addFreeMode();
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
    preloadImages: false,
    lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
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
    preloadImages: false,
    lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
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
function changeColorArrows(slider, prevArrow, nextArrow) { // функция присваивает классы стрелкам слайдеров (активен или нет)
    // кнопка назад
    if (slider.realIndex === 0) { // если первый слайд
        prevArrow.classList.remove(`activearrow`);
        prevArrow.classList.add(`noactivearrow`);
    } else {
        prevArrow.classList.remove(`noactivearrow`);
        prevArrow.classList.add(`activearrow`);
    }
    // кнопка вперёд
    if (slider.realIndex === slider.slides.length - 1) { // если последний слайд
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
let mainSlider = document.querySelector(`.swiper`);

function arrowMovePage(arrow, direction) { // функция немного сдвигает страницу при наведении курсора на стрелку
    // если направление вверх
    if (direction === `up`) {
        arrow.addEventListener(`mouseover`, function (e) { // вешаем обработчик (при наведении мыши)
            if (arrow.classList.contains(`activearrow`)) { // проверка активна ли стрелка
                mainSlider.style.transform = `translateY(20px)`; // сдвигаем страницу вверх
            }
        });
        // если направление вниз
    } else if (direction === `down`) {
        arrow.addEventListener(`mouseover`, function (e) {
            if (arrow.classList.contains(`activearrow`)) {
                mainSlider.style.transform = `translateY(-20px)`; // сдвигаем страницу вниз
            }
        });
    }
    // вешаем обработчик (при отведении мыши)
    arrow.addEventListener(`mouseout`, function (e) {
        mainSlider.style.transform = `translateY(0)`; // убираем сдвиг страницы
    });
}

arrowMovePage(downBarArrow, `down`); // вешаем анимацию сдвига страницы при наведении курсора на стрелку
arrowMovePage(upBarArrow, `up`); // вешаем анимацию сдвига страницы при наведении курсора на стрелку


// ----------------------------------------------------------------hide navigation bar----------------------------------------------------------------
let navBlock = document.querySelector(`.navigation`);

function hideNav() { // функция присваивает класс панели навигации (активен или нет)
    if (navBlock) { // проверка
        if (pageSlider.realIndex === 0 || pageSlider.realIndex === (pageSlider.slides.length - 1)) { // если активен 1 или последний слайд
            navBlock.classList.remove(`active-bar`); // убрать класс, сделает не активным
        } else { // иначе
            navBlock.classList.add(`active-bar`); // добавить класс, сделает активным
        }
    }
}

// ----------------------------------------------------------------firstscreen & lastscreen arrows----------------------------------------------------------------
let upNavArrow = document.querySelector(`.navbutton_up`);
let downNavArrow = document.querySelector(`.navbutton_down`);

if (downNavArrow) { // проверка
    downNavArrow.addEventListener(`click`, function (e) { // вешаем обработчик по клику
        pageSlider.slideTo(pageSlider.realIndex + 1); // переместиться на следующий слайд
        e.preventDefault(); // убрать стандартные параметры ссылки
    });
}
if (upNavArrow) {
    upNavArrow.addEventListener(`click`, function (e) {
        pageSlider.slideTo(pageSlider.realIndex - 1); // переместиться на предыдущий слайд
        e.preventDefault();
    });
}

arrowMovePage(downNavArrow, `down`); // вешаем анимацию сдвига страницы при наведении курсора на стрелку
arrowMovePage(upNavArrow, `up`); // вешаем анимацию сдвига страницы при наведении курсора на стрелку

// ----------------------------------------------------------------shange slide animation----------------------------------------------------------------
let pagesArray = document.querySelectorAll(`.swiper-slide`);

function playAnimation() { // функция присваивает класс элементам, анимируемым при смене слайдов
    let activeSlide = pagesArray[pageSlider.realIndex]; // находим активный в данный момент слайд
    let animObjectsArray = activeSlide.querySelectorAll(`.animate`); // находим элементы слайда, которые должны анимироваться
    if (animObjectsArray.length > 0) { // проверка
        for (let i = 0; i < animObjectsArray.length; i++) { // перебор всех элементов
            const animObject = animObjectsArray[i];
            animObject.classList.add(`active`); // присваиваем класс
        }
    }
}
function removeAnimation() { // функция убирает класс у активных элементов с флагом
    let activeAnimObjectsArray = document.querySelectorAll(`.animate.active.static-flag`); // поиск всех активных элементов с флагом
    if (activeAnimObjectsArray.length > 0) { // проверка
        for (let i = 0; i < activeAnimObjectsArray.length; i++) { // перебор всех элементов 
            const activeAnimObject = activeAnimObjectsArray[i];
            activeAnimObject.classList.remove(`active`); // убираем класс
            activeAnimObject.classList.remove(`static-flag`); // убираем класс
        }
    }
}
function addStaticFlag() { // функция ставит флаг на активный элемент после полного перехода на активный слайд
    let activeAnimObjectsArray = document.querySelectorAll(`.animate.active`); // находим все активные элементы
    if (activeAnimObjectsArray.length > 0) { // проверка
        for (let i = 0; i < activeAnimObjectsArray.length; i++) { // перебор всех элементов 
            const activeAnimObject = activeAnimObjectsArray[i];
            activeAnimObject.classList.add(`static-flag`); // присваиваем класс
        }
    }
}

// как это работает:

// при инициации перехода на актуальный слайд:
// --- все анимированные элементы актуального слайда становятся активными (получают класс active)
// ------ зачем? Анимированные элементы начинают анимироваться

// после полного перехода на актуальный слайд:
// --- все анимированные элементы любого предыдущего слайда (помечены флагом) теряют активность (класс active) и теряют флаг (класс static-flag)
// ------ зачем? Анимированные элементы любого предыдущего слайда возвращаются в изначальное положение, пользователь этого не видит
// --- все анимированные активные элементы получают флаг (класс static-flag)
// ------ зачем? Чтобы подготовиться к переходу на следующий слайд. Флаг нужен чтобы временно отделить элементы актуального слайда (без флага) от элементов предыдущего слайда (с флагом)
// --- все анимированные элементы актуального слайда становятся активными (получают класс active)
// ------ зачем? Это дублирование самой первой функции (дублирование спасает, если пользователь быстро прыгает со слайда на слайд, не давая осуществить полный переход на слайд)


// ----------------------------------------------------------------disable swiper----------------------------------------------------------------

function addFreeMode() {
    const minWidthForSwiper = 1024;
    const maxWidthForSwiper = 2048;
    // if (wrapper.classList.contains(`freeMode`)) {
    //     wrapper.classList.remove(`freeMode`);
    //     pageSlider.params.freeMode = false;
    //     console.log(`removeFreeMode`);
    // }
    if (window.innerWidth < minWidthForSwiper || window.innerWidth > maxWidthForSwiper) {
        // wrapper.classList.add(`freeMode`);
        pageSlider.params.freeMode = true;
        console.log(`addFreeMode`);
    }
}