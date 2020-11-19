let currentContext;

const observable = (_value) => {
    let value = _value;

    let subscribers = [];

    return function() {
        // setter
        if (arguments.length) {
            value = arguments[0]

            const subsToNotify = subscribers
            subscribers = []
            subsToNotify.forEach(sub => sub())

            // getter
        } else {
            if (currentContext) {
                subscribers.push(currentContext)
            }

            return value;
        }
    }
}

const computed = (fn) => {
    let value;

    function execute() {
        const outerContext = currentContext;
        currentContext = execute;
        value = fn();
        currentContext = outerContext;
    }

    // Initialize all dependencies by running the function once
    execute();

    // We need to wrap value in a getter because, when the execute function gets called again,
    // it will update the value but wherever we used "computed" we still have the old value.
    return () => value;
}

const effect = (fn) => {
    function execute() {
        const outerContext = currentContext;
        currentContext = execute;
        fn();
        currentContext = outerContext;
    }

    // Initialize all dependencies by running the function once
    execute();
}

const counter = observable(0)

setInterval(() => counter(counter() + 1), 1000)

effect(() => console.log(counter()))

const counterTimesTwo = computed(() => counter() * 2)

setTimeout(() => console.log(counterTimesTwo()), 4 * 1000)
