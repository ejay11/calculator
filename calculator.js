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

const operate =((operator, num1, num2) => {
    if (operator == '+'){
        add(num1, num2);
    }
    else if (operator == '-'){
        subtract (num1, num2);
    }
    else if (operator == 'x'){
        multiply(num1, num2);
    }
    else (operator == '/')
        divide (num1, num2);
    
    })