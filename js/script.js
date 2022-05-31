"use strict"

let pageSlider = new Swiper(`main`, {
    direction: 'vertical',
    slidesPerView: 'auto',
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    mousewheel: {
        sensitivity: 1,
    },
    // кнопки переключения слайдов
    navigation: {
        nextEl: `.navigation__arrow_down`,
        prevEl: `.navigation__arrow_up`,
    },
    speed: 1000,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    init: false,
    on: {
        init: function () {
            menuSlider();
        },
        slideCange: function () {
            menuSliderREmove();
            navList[pageSlider.realIndex].classList.add('.active');
        },
    }
});

let navList = document.querySelectorAll('.navigation__link'); 
function menuSlider() {
    if (navList.length > 0) {
        navList[pageSlider.realIndex].classList.add('.active');
        for(let i = 0; i < navList.length; i++) {
            const navLink = navList[i];
            navLink.addEventListener('click', function(e) {
                menuSliderREmove();
                pageSlider.slideTo(i, 1000);
                navLink.classList.add('.active');
                e.preventDefault();
            });
        }
    }
}
function menuSliderREmove() {
    let navLinkActive = document.querySelector('.navigation__link.active');
    if (navLinkActive) {
        navLinkActive.classList.remove('.active');
    }
}
pageSlider.init();