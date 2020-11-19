import S from 's-js'

window.S = S

const data = S.data('I am data')
const value = S.value('I am value')

S(() => console.log(data()))
S(() => console.log(value()))

data('changedData')
value('changedValue')

console.info('Changed everything!')

data('changedData')
value('changedValue')

const name = S.value('World')
const counter = S.data(0)

setInterval(() => counter(counter() + 1), 1000)

const root = document.getElementById('root')


// <h2>Hello {name()}</h2>
const h2 = document.createElement('h2')
const h2_text1 = document.createTextNode('Hello ')
const h2_text2 = document.createTextNode('')
S(() => h2_text2.nodeValue = name())

h2.appendChild(h2_text1)
h2.appendChild(h2_text2)

// <p>Counter is {counter()}</p>
const p = document.createElement('p')
const p_text1 = document.createTextNode('Counter is ')
const p_text2 = document.createTextNode('')
S(() => p_text2.nodeValue = counter())

p.appendChild(p_text1)
p.appendChild(p_text2)

root.appendChild(h2)
root.appendChild(p)

window.sName = name
