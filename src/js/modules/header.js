import {HEADER} from "../const.js";

export function scrolled() {
    window.addEventListener('scroll', () => {
        const marquee  = document.querySelector('.marquee-header')
        if (window.pageYOffset > marquee.offsetHeight) {
            HEADER.classList.add("scrolled");
        } else {
            HEADER.classList.remove("scrolled");
        }
    })
}
