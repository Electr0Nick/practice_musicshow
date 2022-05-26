"use strict"

document.addEventListener(`keydown`, function (e) {
    if (e.key === `ArrowUp`) {
        window.scrollBy(0, -window.innerHeight);
    }
    if (e.key === `ArrowDown`) {
        window.scrollBy(0, window.innerHeight);
    }
});