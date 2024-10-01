const screen = document.getElementById('screen');
let currentInput = '';
let previousInput = '';
let operator = '';
let memory = 0;

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (event) => {
        const { value } = event.target;

        if (value === 'C') {
            clearScreen();
        } else if (value === 'CE') {
            clearEntry();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            setOperator(value);
        } else if (value === '√') {
            squareRoot();
        } else if (value === 'x²') {
            square();
        } else if (value === '±') {
            toggleSign();
        } else if (value === 'M+') {
            memoryAdd();
        } else if (value === 'M-') {
            memorySubtract();
        } else if (value === 'MR') {
            memoryRecall();
        } else if (value === 'MC') {
            memoryClear();
        } else {
            updateScreen(value);
        }
    });
});

function clearScreen() {
    currentInput = '';
    previousInput = '';
    operator = '';
    screen.value = '';
}

function clearEntry() {
    currentInput = '';
    screen.value = '';
}

function calculate() {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        const result = eval(`${previousInput} ${operator} ${currentInput}`);
        screen.value = result;
        currentInput = result;
        previousInput = '';
        operator = '';
    }
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function updateScreen(value) {
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    screen.value = currentInput;
}

function squareRoot() {
    if (currentInput !== '') {
        screen.value = Math.sqrt(parseFloat(currentInput));
        currentInput = screen.value;
    }
}

function square() {
    if (currentInput !== '') {
        screen.value = Math.pow(parseFloat(currentInput), 2);
        currentInput = screen.value;
    }
}

function toggleSign() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        screen.value = currentInput;
    }
}

function memoryAdd() {
    if (currentInput !== '') {
        memory += parseFloat(currentInput);
        clearEntry();
    }
}

function memorySubtract() {
    if (currentInput !== '') {
        memory -= parseFloat(currentInput);
        clearEntry();
    }
}

function memoryRecall() {
    screen.value = memory;
    currentInput = memory.toString();
}

function memoryClear() {
    memory = 0;
}
