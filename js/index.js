// Initial State of the app

const initialState = [
    {
        id: 0,
        value: 0,
        incrementBy: 1,
        decrementBy: 1
    },
]

// Aaction identifires

const INCREMENT = 'increment'
const DECREMENT = 'decrement'
const ADD_COUNTER = 'add-counter'
const RESET = 'reset'


// Action creators

const increment = (id) => {
    return {
        type: INCREMENT,
        payload: id
    }
}

const decrement = (id) => {
    return {
        type: DECREMENT,
        payload: id
    }
}

const reset = () => {
    return {
        type: RESET
    }
}

const addCounter = () => {
    return {
        type: ADD_COUNTER
    }
}

// creating unique counter ID

function nextCounterId(counters) {
    const maxId = counters.reduce((maxId, counter) => Math.max(maxId, counter.id), -1)

    return maxId + 1
}

// reducers

function counterReducer(state = initialState, action) {

    if (action.type === ADD_COUNTER) {
        return [
            ...state,
            {
                id: nextCounterId(state),
                value: 0,
                incrementBy: Math.floor(Math.random() * 10) + 1,
                decrementBy: Math.floor(Math.random() * 10) + 1
            }
        ]
    }
    if (action.type === RESET) {
        return state.map(counter => ({
            ...counter,
            value: 0
        }))
    }
    if (action.type === INCREMENT) {
        const id = action.payload
        return state.map(counter => {
            if(counter.id === id){
                return {
                    ...counter,
                    value: counter.value + counter.incrementBy
                }
            }
            return {
                ...counter,
            }
        })
    }
    if (action.type === DECREMENT) {
        const id = action.payload
        return state.map(counter => {
            if(counter.id === id){
                return {
                    ...counter,
                    value: counter.value - counter.incrementBy
                }
            }
            return {
                ...counter,
            }
        })
    }

    return state
}


// redux store
const store = Redux.createStore(counterReducer)


/// select dom elements

const allCounters = document.getElementById('all-counters')
const addNewCounter = document.getElementById('add-counter')
const resetCounter = document.getElementById('reset')


// renderer
const render = () => {
    const state = store.getState()
    let countersMarkup = ''

    state.forEach(counter => {
        countersMarkup += `<div class="counter">
        <p class="h1">${counter.value}</p>
        <div class="counter-form d-flex gap-2">
            <button class="btn btn-lg btn-primary" onClick={decrementCount(${counter.id})}>Decrement</button>
            <button class="btn btn-lg btn-primary" onClick={incrementCount(${counter.id})}>Increment</button>
        </div>
    </div>`
    })

    allCounters.innerHTML = countersMarkup
}

// update UI in the start
render()

// subscribing to the UI elements
store.subscribe(render)


// event listeners

addNewCounter.addEventListener('click', () => {
    store.dispatch(addCounter())
})

resetCounter.addEventListener('click', () => {
    store.dispatch(reset())
})


// INcrement Handler
function incrementCount(id){
    store.dispatch(increment(id))
}

// Decrement Handler
function decrementCount(id){
    store.dispatch(decrement(id))
}


