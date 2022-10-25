let runningTotal = 0
let buffer = "0"
let previousoperator

const screen = document.querySelector('.screen')

function buttonClick(Value) {
    if (isNaN(Value)) {
        handleSymbol(Value)
    } else {
        handleNumber(Value)
    }
    screen.innerText = buffer
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0'
            runningTotal = 0
            break
        case '=':
            if (previousoperator === null) {
                return
            }
            flushOperation(parseInt(buffer))
            previousoperator = null
            buffer = runningTotal
            runningTotal = 0
            break
        case '←':
            if (buffer.length === 1) {
                buffer = '0'
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break
        case '+':
        case '−':
        case 'x':
        case '÷':
            handleMath(symbol)
            break
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return
    }
    const intBuffer = parseInt(buffer)
    if (runningTotal === 0) {
        runningTotal = intBuffer
    } else {
        flushOperation(intBuffer)
    }
    previousoperator = symbol
    buffer = '0'
}

function flushOperation(intBuffer) {
    if (previousoperator === '+') {
        runningTotal += intBuffer
    } else if (previousoperator === '−') {
        runningTotal -= intBuffer
    } else if (previousoperator === 'x') {
        runningTotal *= intBuffer
    } else if (previousoperator === '÷') {
        runningTotal /= intBuffer
    }
}

function handleNumber(numberstring) {
    if (buffer === '0') {
        buffer = numberstring
    } else {
        buffer += numberstring
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText)
    })
}

init()