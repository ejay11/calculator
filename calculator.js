// --CALCULATOR MATH FUNCTIONS--
/*
<Eric>: Delete these comments after you read them.
*/

/*
<Eric>:  This is great! Putting all your functions at the top!
Nice use of fat-arrow functions!
*/
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

/*
<Eric>: Later, in our 3rd iteration, we'll learn to do something even cooler.
For now, in our first iteration, is there a way to use a "switch" statement,
instead of if/else?

https://www.w3schools.com/js/js_switch.asp

 */
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

const calculateDisplay = () => {
    /*
    <Eric>: in JS, it's important to scope your variables!
    The line below should be:

    ```
    const display = operate(operator, num1, num2);
    ```

    Default to `const` when declaring your variables.

    By using `const`, we  tell Javascript two things:

    1. This variable `display` is not a "global" variable. It will only be used
    within the scope of this function!
    2. This variable `display` will only ever be assigned a value ONCE.
    (otherwise, we would have declared it with `let` instead of `const`.)

    https://alligator.io/js/var-let-const/
     */
    display = operate(operator, num1, num2);

    /*
    <Eric>:
    1. Instead of using `.innerHTML` here, you could be even safer and use
    `.innerText`. You could probably just do a straight replacement everywhere
    in your code(?) InnerText ensures you'll never grab any HTML that might be
    in that element - Just the unformatted text content.

    https://betterprogramming.pub/whats-best-innertext-vs-innerhtml-vs-textcontent-903ebc43a3fc

    2. So, as you get better at JS, you'll start to notice where you're
    repeating yourself. Part of this function is a repeat.

    ```
    document.querySelector('#display')
    ```

    ### What IF?

    We seem to want to reference that element on the page - a lot.
    Also, every time we do a `querySelector`, we make js parse through the
    DOM to find the element. We really only need to find it once - it's not
    going anywhere.

    So, could we assign the value of this element to a global variable  at the
    top of the script?

    ```
    let displayElem = document.querySelector('#display')
    ```

    Which would then mean that in this function (and any other function that
    references the #display elem, you can simply then do this:

    ```
    displayElem.innerText = display;
    ```
     */
    document.querySelector('#display').innerHTML = display;

}
//--SAVING INPUT AND DISPLAY FUNCTIONS--

let num1 = '';
let num2 = '';
let answer = '';
let operator = [];

const saveNum1 = ((buttonName) => {
    //display.push(buttonName.target.innerHTML);
    num1 += buttonName.target.innerHTML;

    /*
    <Eric>: Hmmm. this looks familiar... I wonder if we can simplify this
    with the suggestion I made above?
     */
    document.querySelector('#display').innerHTML = num1;
    num1 = parseFloat(num1);
    return num1;
})

const operatorPush = (buttonPushed) => {
    if (num1 !== '' && num2 == '') {
        buttons.forEach((button) => {
            button.removeEventListener('click', saveNum1)
        });
        operator = buttonPushed.target.id;
        console.log(typeof operator);
        buttons.forEach((button) => {
            button.addEventListener('click', saveNum2)
        });
    } else if (num1 !== '' && num2 !== '') {
        num1 = operate(operator, num1, num2);
        operator = buttonPushed.target.id;
        console.log(num1);
        num2 = '';
    } else
        document.querySelector('#display').innerHTML = 'ERROR';
    return operator;
}

const saveNum2 = ((buttonName) => {
    num2 += buttonName.target.innerHTML;
    document.querySelector('#display').innerHTML = num2;
    num2 = parseFloat(num2);
    return num2
})

const startOver = () => {
    num1 = '';
    operator = '';
    num2 = '';
    document.querySelector('#display').innerHTML = '0';
    buttons.forEach((button) => {
        button.removeEventListener('click', saveNum2)
    });
    buttons.forEach((button) => {
        button.addEventListener('click', saveNum1)
    });
    return num1, operator, num2;
}

//--BUTTON EVENT LISTENERS--
let buttons = document.getElementsByClassName('calc-btn');
buttons = Array.from(buttons);
buttons.forEach((button) => {
    button.addEventListener('click', saveNum1)
});

let operators = document.getElementsByClassName('operator');
operators = Array.from(operators);
operators.forEach((operator) => {
    operator.addEventListener('click', operatorPush)
});

let calculate = document.getElementById('calculate');
calculate.addEventListener("click", calculateDisplay);

let clearButton = document.getElementById('clear');
clearButton.addEventListener("click", startOver);