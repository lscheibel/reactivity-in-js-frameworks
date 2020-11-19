import {animationPlayer} from '../intro-to-get-set'

const animation = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(45deg) scale(2)' },
]

const element = document.getElementById('elToAnimate')
const animationController = animationPlayer(element, animation)

const extendedController = new Proxy(animationController, {
    get(target, prop, receiver) {
        // Todo
    },
    set(target, prop, value) {
        // Todo
    }
})

window.myXC = extendedController
