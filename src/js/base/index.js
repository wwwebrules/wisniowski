import './window.js'

import {WR, BASE_DURATION, BODY, PAGE} from "../const.js";
import {isNum, isStr} from "./checkFunctions.js";
import "wicg-inert"
import '@scss/modules/focusEffect.scss'

/*actions ==================*/
const actionsOptions = new class options {
    constructor() {
        this.moduleName = 'actions',
        this.messages = {
            noCondition:`[${this.moduleName}] not pass the condition`,
            done: `[${this.moduleName}] action done`,
            noTag:`[${this.moduleName}] element is not tag`
        }
    }

    classCondition(elements, className, delay = 0) {
        if (elements && elements.length > 0 && isStr(className) && isNum(delay)) return true
        else return false
    }

    attrCondition(elements, attr, attr_value = ' ', delay = 0) {
        if (elements && elements.length > 0 && isStr(attr) && isStr(attr_value) && isNum(delay)) return true
        else return false
    }

    hiddenCondition(elements, delay = 0) {
        if (elements && elements.length > 0 && isNum(delay)) return true
        else return false
    }

    slideCondition(element, duration, delay) {
        if (element && element.tagName && isNum(duration) && isNum(duration)) return true
        else return false
    }
}
export const classActions = {
    add(elements, className, delay = 0) {
        if (actionsOptions.classCondition(elements, className, delay)) {
            window.setTimeout(() => {
                [...elements].forEach((element) => {
                    if (element.tagName) element.classList.add(className), console.log(actionsOptions.messages.done)
                    else console.log(actionsOptions.messages.noTag)
                })
            }, delay)
        } else console.log(actionsOptions.messages.noCondition)
    },
    remove(elements, className, delay = 0) {
        if (actionsOptions.classCondition(elements, className, delay)) {
            window.setTimeout(() => {
                [...elements].forEach((element) => {
                    if (element.tagName) element.classList.remove(className), console.log(actionsOptions.messages.done)
                    else console.log(actionsOptions.messages.noTag)
                })
            }, delay)
        } else console.log(actionsOptions.messages.noCondition)
    },
    toggle(elements, className, delay = 0) {
        if (actionsOptions.classCondition(elements, className, delay)) {
            window.setTimeout(() => {
                [...elements].forEach((element) => {
                    if (element.tagName) element.classList.toggle(className), console.log(actionsOptions.messages.done)
                    else console.log(actionsOptions.messages.noTag)
                })
            }, delay)
        } else console.log(actionsOptions.messages.noCondition)
    },
    has(elements, className) {
        if (actionsOptions.classCondition(elements, className)) {
            return [...elements].every((element) => {
                if (element.tagName) return element.classList.contains(className)
                else console.log(actionsOptions.messages.noTag)
            })
        } else console.log(actionsOptions.messages.noCondition)
    },
}
export const attrActions = {
    set(elements, attrName, attrValue, delay = 0) {
        if (actionsOptions.attrCondition(elements, attrName, attrValue, delay)) {
            window.setTimeout(() => {
                [...elements].forEach((element) => {
                    if (element.tagName) element.setAttribute(attrName, attrValue), console.log(actionsOptions.messages.done)
                    else console.log(actionsOptions.messages.noTag)
                })
                return actionsOptions.messages.noCondition
            }, delay)
        } else console.log(actionsOptions.messages.noCondition)
    },
    remove(elements, attrName, delay = 0) {
        if (actionsOptions.attrCondition(elements, attrName, ' ', delay)) {
            window.setTimeout(() => {
                [...elements].forEach((element) => {
                    if (element.tagName) element.removeAttribute(attrName), console.log(actionsOptions.messages.done)
                    else console.log(actionsOptions.messages.noTag)
                })
            }, delay)
        } else console.log(actionsOptions.messages.noCondition)
    },
    toggle(elements, attrName, delay = 0) {
        if (actionsOptions.attrCondition(elements, attrName, ' ', delay)) {
            window.setTimeout(() => {
                [...elements].forEach((element) => {
                    if (element.tagName) {
                        if (element.hasAttribute(attrName)) element.removeAttribute(attrName)
                        else element.setAttribute(attrName, '')
                        console.log(actionsOptions.messages.done)
                    } else console.log(actionsOptions.messages.noTag)
                })
            }, delay)
        } else console.log(actionsOptions.messages.noCondition)
    },
    has(elements, attrName) {
        if (actionsOptions.attrCondition(elements, attrName)) {
            return [...elements].every((element) => {
                if (element.tagName) return element.hasAttribute(attrName)
                else console.log(actionsOptions.messages.noTag)
            })
        } else console.log(actionsOptions.messages.noCondition)
    },
}
export const hiddenActions = {
    add(elements, delay = 0) {
        if (actionsOptions.hiddenCondition(elements, delay)) {
            window.setTimeout(() => {
                [...elements].forEach((element) => {
                    if (element.tagName) element.hidden = true
                    else console.log(actionsOptions.messages.noTag)
                })
            }, delay)
        } else console.log(actionsOptions.messages.noCondition)
    },
    remove(elements, delay = 0) {
        if (actionsOptions.hiddenCondition(elements, delay)) {
            window.setTimeout(() => {
                [...elements].forEach((element) => {
                    if (element.tagName) element.hidden = false
                    else console.log(actionsOptions.messages.noTag)
                })
                return actionsOptions.messages.noCondition
            }, delay)
        } else console.log(actionsOptions.messages.noCondition)
    },
    toggle(elements, delay = 0) {
        if (actionsOptions.hiddenCondition(elements, delay)) {
            window.setTimeout(() => {
                [...elements].forEach((element) => {
                    if (element.tagName) {
                        if (element.hidden = true) element.hidden = false
                        else element.hidden = true
                    } else console.log(actionsOptions.messages.noTag)
                })
            }, delay)
        } else console.log(actionsOptions.messages.noCondition)
    },
    has(elements) {
        if (actionsOptions.hiddenCondition(elements)) {
            return [...elements].every((element) => {
                if (element.tagName) return element.hidden
                else console.log(actionsOptions.messages.noTag)
            })
        } else console.log(actionsOptions.messages.noCondition)
    },
}
export const slide = {
    up(element, duration = BASE_DURATION, delay = 0) {
        if (actionsOptions.slideCondition(element, duration, delay)) {
            window.setTimeout(() => {
                element.style.transitionProperty = 'height, margin, padding';
                element.style.transitionDuration = duration + 'ms';
                element.style.height = element.offsetHeight + 'px';
                element.offsetHeight;
                element.style.overflow = 'hidden';
                element.style.height = 0;
                element.style.paddingTop = 0;
                element.style.paddingBottom = 0;
                element.style.marginTop = 0;
                element.style.marginBottom = 0;
                window.setTimeout(() => {
                    element.hidden = true
                    element.style.removeProperty('height');
                    element.style.removeProperty('padding-top');
                    element.style.removeProperty('padding-bottom');
                    element.style.removeProperty('margin-top');
                    element.style.removeProperty('margin-bottom');
                    element.style.removeProperty('overflow');
                    element.style.removeProperty('transition-duration');
                    element.style.removeProperty('transition-property');
                    //alert("!");
                }, duration);
            }, delay);
        } else console.log(actionsOptions.messages.noCondition)
    },
    down(element, duration = BASE_DURATION, delay = 0) {
        if (actionsOptions.slideCondition(element, duration, delay)) {
            window.setTimeout(() => {
                element.hidden = false
                let height = element.offsetHeight;
                element.style.overflow = 'hidden';
                element.style.height = 0;
                element.style.paddingTop = 0;
                element.style.paddingBottom = 0;
                element.style.marginTop = 0;
                element.style.marginBottom = 0;
                element.offsetHeight;
                element.style.transitionProperty = "height, margin, padding";
                element.style.transitionDuration = duration + 'ms';
                element.style.height = height + 'px';
                element.style.removeProperty('padding-top');
                element.style.removeProperty('padding-bottom');
                element.style.removeProperty('margin-top');
                element.style.removeProperty('margin-bottom');
                window.setTimeout(() => {
                    element.style.removeProperty('height');
                    element.style.removeProperty('overflow');
                    element.style.removeProperty('transition-duration');
                    element.style.removeProperty('transition-property');
                }, duration);
            }, delay);
        } else console.log(actionsOptions.messages.noCondition)
    },
    toggle(element, duration = BASE_DURATION, delay = 0) {
        if (element.hidden == true) this.down(element, duration, delay)
        else this.up(element, duration, delay)
    }
}
/*actions ==================*/

/*bodyLock ==================*/
export const bodyLock = {
    moduleName: 'bodyLock',
    status: false, add: (delay = 0) => {
        if (isNum(delay)) {
            window.setTimeout(() => {
                // HEADER.style.paddingRight = window.innerWidth - WR.offsetWidth + 'px';
                PAGE.inert = true
                BODY.style.paddingRight = window.innerWidth - WR.offsetWidth + 'px';
                BODY.classList.add('lock')
                bodyLock.status = true;
                console.log(`[${bodyLock.moduleName}] add `);
            }, delay)
        }
    }, remove: (delay = 0) => {
        if (isNum(delay)) {
            window.setTimeout(() => {
                // HEADER.style.paddingRight = '0px';
                PAGE.inert = false
                BODY.style.paddingRight = '0px';
                BODY.classList.remove('lock')
                bodyLock.status = false;
                console.log(`[${bodyLock.moduleName}] remove `);
            }, delay)
        }
    }, toggle: (delay) => {
        if (bodyLock.status) {
            bodyLock.remove(delay)
        } else {
            bodyLock.add(delay)
        }
    }
}
/*bodyLock ==================*/

/*focusEffect ==================*/
export const focusEffect = {
    add(delay = 0) {
        if (isNum(delay)) {
            window.setTimeout(() => {
                BODY.classList.add('focus-effect')
            }, delay)
        }
    },
    remove(delay = 0) {
        if (isNum(delay)) {
            window.setTimeout(() => {
                BODY.classList.remove('focus-effect')
            }, delay)
        }
    },
    toggle(delay = 0) {
        if (isNum(delay)) {
            window.setTimeout(() => {
                BODY.classList.toggle('focus-effect')
            }, delay)
        }
    }
}
/*focusEffect ==================*/
