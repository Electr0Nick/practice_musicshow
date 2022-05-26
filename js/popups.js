const popupOpenLinks = document.querySelectorAll(`.popup-link`);
const popupCloseLinks = document.querySelectorAll(`.popup-close`);
const body = document.querySelector(`body`);
const fixedObject = document.querySelectorAll(`.fixed-object`);
let unlock = true;
const timeout = 300;
if (popupOpenLinks.length > 0) {
    for (let i = 0; i < popupOpenLinks.length; i++) {
        const openLink = popupOpenLinks[i];
        openLink.addEventListener(`click`, function (e) {
            const popName = openLink.getAttribute('href').replace(`#`, ``);
            const curentPopup = document.getElementById(popName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}
if (popupCloseLinks.length > 0) {
    for (let i = 0; i < popupCloseLinks.length; i++) {
        const closeLink = popupCloseLinks[i];
        closeLink.addEventListener(`click`, function (e) {
            popupClose(closeLink.closest(`.popup`));
            e.preventDefault();
        });
    }
}
document.addEventListener(`keydown`, function (e) {
    if (e.key === `Escape`) {
        const activePopup = document.querySelector(`.popup.open`);
        popupClose(activePopup);
    }
});
function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const activePopup = document.querySelector(`.popup.open`);
        if (activePopup) {
            popupClose(activePopup, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add(`open`);
        curentPopup.addEventListener(`click`, function (e) {
            if (!e.target.closest(`.popup__content`)) {
                popupClose(e.target.closest(`.popup`));
            }
        });
    }
}
function popupClose(activePopup, doUnlock = true) {
    if (unlock) {
        activePopup.classList.remove(`open`);
        if (doUnlock) {
            bodyUnlock();
        }
    }
}
function bodyLock() {
    const scrollWidth = window.innerWidth - document.querySelector(`.wrapper`).offsetWidth + `px`;
    if (fixedObject.length > 0) {
        for (let i = 0; i < fixedObject.length; i++) {
            const fixObj = fixedObject[i];
            fixObj.style.paddingRight = scrollWidth;
        }
    }
    body.style.paddingRight = scrollWidth;
    body.classList.add(`lock`);
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnlock() {
    setTimeout(function () {
        if (fixedObject.length > 0) {
            for (let i = 0; i < fixedObject.length; i++) {
                const fixObj = fixedObject[i];
                fixObj.style.paddingRight = `0px`;
            }
        }
        body.style.paddingRight = `0px`;
        body.classList.remove(`lock`);
    }, timeout);
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();