let target = null

class Dep {
    constructor () {
        this.subscribers = new Set()
    }

    depend() {
       target && this.subscribers.add(target)
    }

    notify() {
        this.subscribers.forEach(sub => sub())
    }
}

const watch = (context) => {
    target = context
    context()
    target = null
}

const Reactive = (config) => {
    let thisProxy;
    const dataDependencies = new Map()
    const internalComputedValues = {};

    const dataProxy = new Proxy(config.data, {
        get(target, prop) {
            const dep = dataDependencies.get(prop)

            if (!dep) {
                dataDependencies.set(prop, new Dep())
            }

            dataDependencies.get(prop).depend()
            return target[prop]
        },
        set(target, prop, value) {
            const prevValue = target[prop];

            target[prop] = value
            const dep = dataDependencies.get(prop)

            if (!dep) {
                dataDependencies.set(prop, new Dep())
            } else {
                dep.notify()
            }

            if (config.watch.hasOwnProperty(prop)) {
                config.watch[prop].call(thisProxy, value, prevValue)
            }

            return true
        }
    })

    const methodProxy = new Proxy(config.methods, {
        get(target, prop) {
            return target[prop].bind(thisProxy)
        }
    })

    thisProxy = new Proxy({}, {
        get(target, prop) {
            if (internalComputedValues.hasOwnProperty(prop)) {
                return internalComputedValues[prop]
            }

            if (config.methods.hasOwnProperty(prop)) {
                return methodProxy[prop]
            }

            return dataProxy[prop]
        },
        set(target, prop, value) {
            return dataProxy[prop] = value
        }
    })

    Object.entries(config.computed).forEach(([key, getter]) => {
        watch(() => {
            const prevValue = internalComputedValues[key]
            const value = getter.call(thisProxy)

            internalComputedValues[key] = value

            if (config.watch.hasOwnProperty(key)) {
                config.watch[key].call(thisProxy, value, prevValue)
            }
        })
    })

    return thisProxy
}

const root = document.getElementById('root')

const data = Reactive({
    data: {
        firstName: 'Tyler',
        lastName: 'Oakly',
    },
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        },
        template() {
            // Other computeds are not reactive here, eg. this.fullName
            return `<h1>Hey there 👋 my name is ${this.firstName} ${this.lastName}</h1>`
        }
    },
    methods: {
        printSomething() {
            console.log('Somethigng yo')
        },
        handleInputChange(value) {
            console.log(value)
            this.firstName = value
        }
    },
    watch: {
        fullName() { // Explicit dependency
            console.log(this.firstName, this.lastName)
        },
        template() {
            root.innerHTML = this.template
        }
    }
})

window.myData = data
