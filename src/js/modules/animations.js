import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);
export const scrollAnimation = () => {
    gsap.utils.toArray('.scroll-animation').forEach((el, index) => {
        let scrollAnimationTl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "30px bottom",
                toggleActions: "play none none none",
                // markers: true,
                // scrub: true
            },
        })
        scrollAnimationTl
            .fromTo(el, {opacity: 0}, {
                opacity: 1,
                duration: .5,
                delay: 0,
            })
    })
}

