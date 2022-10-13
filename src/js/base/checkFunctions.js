import {BASE_DELAY} from "../const.js";
export const isStr = (el) => {
    if (typeof el === "string") return true
    else return false
}

export const isNum = (el) => {
    if (typeof el === "number") return true
    else return false
}

export const actionDelay = (el, delay = BASE_DELAY) => {
    if (el && el.tagName) {
        if (el.hasAttribute('actionDelay')) {
            return false
        } else {
            el.setAttribute('actionDelay', '')
            setTimeout(function () {
                el.removeAttribute('actionDelay')
            }, delay)
            return true
        }
    }
}

