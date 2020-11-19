export const animationPlayer = (node, animation) => {
    // Todo
}

const animation = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(45deg) scale(2)' },
]

const element = document.getElementById('elToAnimate')
const animationController = animationPlayer(element, animation)

window.myAC = animationController
