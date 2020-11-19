import {animationPlayer} from '../intro-to-get-set'

const animation = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(45deg) scale(2)' },
]

const element = document.getElementById('elToAnimate')
const animationController = animationPlayer(element, animation)

const extendedController = new Proxy(animationController, {
    get(target, prop, receiver) {

        if (prop === 'finished') {
            return target.finished || new Promise((resolve) => {
                const prevListener = target.controller.onfinish
                target.controller.onfinish = () => {
                    prevListener()
                    resolve()
                }
            })
        }

        if (prop === 'toggle') {
            return function toggle() {
                target.state === 'playing' ? target.pause() : target.play()
            }
        }

        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {

        if (prop === 'state') {
            switch (value) {
                case 'paused': {
                    target.pause()
                    break
                }
                case 'playing': {
                    target.play()
                    break
                }
                case 'finished':
                case 'idle': {
                    target.pause() // target.stop()
                }
            }

            return
        }

        target[prop] = value
    }
})

window.myXC = extendedController
