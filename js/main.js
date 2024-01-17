const add = function (a, b) {
    return a + b;
}
const subtract = function (a, b) {
    return a - b;
}
const multiply = function (a, b) {
    return a * b;
}
const divide = function (a, b) {
    if (b === 0) {
        return "U dumb";
    }
    return a / b;
}


function operate(num1, operator, num2) {

    switch (operator) {
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);

        case '*':
            return multiply(num1, num2);

        case '/':
            return divide(num1, num2);

        default:

            return "invalid operator";
    }
}

let displayValue = "";
let operator = "";
let firstOperand = "";


function updateDisplay() {
    const displayElement = document.querySelector('.display');
    displayElement.textContent = displayValue;
    if (displayValue.length > 7) {
        displayElement.textContent = displayValue.substring(0, 7);
    }
}

function appendDigit(digit) {
    if (displayValue === "0") {
        displayValue = digit.toString();
    } else {
        displayValue += digit.toString();
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += ".";
        updateDisplay();
    }
}

function inputPercentage(num) {
    displayValue = (num / 100).toString();
    updateDisplay();
}

function inputSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}

function setOperator(op) {
    operator = op;
    firstOperand = displayValue;
    updateDisplay();
    displayValue = "0";
}

function calculateResult() {
    if (firstOperand != "" && operator !== "") {
        const result = operate(parseFloat(firstOperand), operator, parseFloat(displayValue));
        if (Math.abs(result) >= 1e7) {
            displayValue = result.toExponential(6);
        } else {
            displayValue = result.toString();
        }
        firstOperand = "";
        operator = ""
        updateDisplay();
    }
}

function clearDisplay() {
    displayValue = "0";
    operator = "";
    firstOperand = "";
    updateDisplay();
}

document.querySelector('#equal').addEventListener('click', () => {
    calculateResult();
});

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        if (buttonText >= '0' && buttonText <= '9') {
            appendDigit(Number(buttonText));
        } else if (buttonText === '.') {
            appendDecimal();
        } else if (buttonText === 'AC') {
            clearDisplay();
        } else if (buttonText === '%') {
            inputPercentage(Number(displayValue));
        }else if (buttonText === '+/-') {
            inputSign(Number(displayValue));
        }
         else {
            calculateResult();
            setOperator(buttonText);
        }
    });
});