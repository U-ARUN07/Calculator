const calculatorScreen = document.querySelector('.calculator-screen');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal-sign');
const operatorButtons = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('[value^="0"], [value^="1"], [value^="2"], [value^="3"], [value^="4"], [value^="5"], [value^="6"], [value^="7"], [value^="8"], [value^="9"], [value="."]');
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;

function resetCalculator() {
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    calculatorScreen.value = '';
    shouldResetScreen = false;
}

function appendNumber(number) {
    if (calculatorScreen.value === '0' || shouldResetScreen) {
        calculatorScreen.value = number;
        shouldResetScreen = false;
    } else {
        calculatorScreen.value += number;
    }
}

function appendOperator(operator) {
    if (currentOperator !== null) {
        operate();
    }
    firstNumber = calculatorScreen.value;
    currentOperator = operator;
    shouldResetScreen = true;
}

function operate() {
    if (currentOperator === null || shouldResetScreen) {
        return;
    }
    secondNumber = calculatorScreen.value;
    calculatorScreen.value = calculate(parseFloat(firstNumber), currentOperator, parseFloat(secondNumber));
    currentOperator = null;
}

function calculate(number1, operator, number2) {
    switch (operator) {
        case '+':
            return number1 + number2;
        case '-':
            return number1 - number2;
        case '*':
            return number1 * number2;
        case '/':
            return number1 / number2;
        default:
            return 'Error';
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.value === '.' && calculatorScreen.value.includes('.')) {
            return;
        }
        appendNumber(button.value);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => appendOperator(button.value));
});

equalButton.addEventListener('click', operate);

clearButton.addEventListener('click', resetCalculator);