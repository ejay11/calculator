// --CALCULATOR MATH FUNCTIONS--

const add = ((num1, num2) => {
    return num1 + num2;
});

const subtract = ((num1, num2) => {
    return num1 - num2;
});

const multiply = ((num1, num2) => {
    return num1 * num2;
});

const divide = ((num1, num2) => {
    return num1 / num2;
});

const operate = ((operator, num1, num2) => {
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == 'x') {
        return multiply(num1, num2);
    } else(operator == '/')
    return divide(num1, num2);

})
//--CALCULATOR DISPLAY FUNCTIONS--

const displayText = ((buttonClicked) => {
    let value = buttonClicked;
    document.getElementById(display).innerHTML = value;

})

const sayHello =(() => {
    console.log("working")
    alert ('Hello');
})
let buttons = document.getElementsByClassName('calc-btn');
buttons = Array.from(buttons);
buttons.forEach((button) => {button.addEventListener('click', sayHello)});
