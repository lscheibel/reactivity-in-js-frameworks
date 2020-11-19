export const animationPlayer = (node, animation) => {
    let state = 'paused'
    let controller = node.animate(animation, {
        duration: 10 * 1000,
    })
    controller.pause()

    controller.onfinish = () => {
        state = 'finished'
    }

    const play = () => {
        if (state !== 'playing') {
            controller.play()
            state = 'playing'
        }
    }

    const pause = () => {
        if (state === 'playing') {
            controller.pause()
            state = 'paused'
        }
    }

    return {
        stateStatic: state,

        get state() {
            return state
        },

        currentTimeStatic: controller.currentTime,

        get currentTime() {
            return controller.currentTime
        },

        finishedStatic: state === 'finished',

        get finished() {
            return state === 'finished'
        },

        play,
        pause,
        controller,
    }
}

const animation = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(45deg) scale(2)' },
]

const element = document.getElementById('elToAnimate')
const animationController = animationPlayer(element, animation)

window.myAC = animationController
