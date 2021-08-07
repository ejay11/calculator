


/*
OOOOOOHHH fancy. Looky here - it's an auto-invoking function whose return values
will be an "object literal"! WTF? Why would we do this?

In short, scoping. This keeps all our variables (except `calculator`), from
being in the global scope of the page. If index.html adds more scripts besides
this one, there is less chance that we will have a variable conflict!

There's TONS to explain here, but it's pretty awesome.
 */
const MyCalculator = (() => {

  const newNumParts = [] // collects digits/decimals from user input
  let operator = null; // the latest operator
  let subtotal = null; // the running subtotal

  /*
  --ALL MATH FUNCTIONS--
  These will be used later in this script.
  */
  const MATH_FUNCS = {
    add: () => subtotal + getNewNum(),
    subtract: () => subtotal - getNewNum(),
    multiply: () => subtotal * getNewNum(),
    divide: () => subtotal / getNewNum()
  }

  /*
  Next, we grab all the elements off the screen using `querySelector` and
  `querySelectorAll`.
  https://www.w3schools.com/jsref/met_document_queryselector.asp

  Then we assign the elements we find to a `const` variable; we won't be
  re-assigning them again. Now the variables are sitting there, ready for us
  to use and re-use them; there's no need to search the DOM again for the
  elements more than once!
  */
  const calcButton = document.querySelector('#calculate');
  const clearButton = document.querySelector('#clear');
  const operatorElems = document.querySelectorAll('.operator');
  const buttonElems = document.querySelectorAll('.calc-btn');
  const displayElem = document.querySelector('#display');

  // Retrieve/parse the number from the collected newNumParts
  const getNewNum = () => {
    return parseFloat(newNumParts.join(''))
  }

  const clearNumParts = () => {
    newNumParts.length = 0  // this clears the array. Dumb way to do it, I know.
  }

  /*
    Actually does the magic of keeping a running subtotal
    1. choose the right math function, based on the latest operator.
    2. check that the subtotal is present and the new num is present as well
    3. run that function, or if the operator isn't there, return an error.

  */
  const setSubtotal = () => {
    const newNum = getNewNum()

    if (subtotal === null) {
      subtotal = newNum;
      clearNumParts();
      return
    }

    if (isNaN(newNum)) return // newNumParts is likely empty!

    const mathFunc = MATH_FUNCS[operator]
    if (!mathFunc) return 'ERROR!';

    subtotal = mathFunc();
    clearNumParts();
  }

  // Only job is to set the display to the `val`. simple!
  const setDisplay = (val) => {
    displayElem.innerText = val;
  }

  // Find the value. Set the display to that value!
  const displayCalculation = () => {
    setSubtotal();
    setDisplay(subtotal);
  }

  /*
    Sets the operator value.
    But also, at the time the operator is pressed
  */
  const setOperator = (event) => {
    setSubtotal()
    operator = event.target.id;
  }

  // Clear the display. Clear the subtotal.
  const startOver = () => {
    newNumParts.length = 0;
    subtotal = null;
    operator = null;
    setDisplay(0);
  }

  // Show the number pressed.
  const collectNumParts = (event) => {
    const part = event.target.innerText;
    newNumParts.push(part);
    setDisplay(getNewNum())
  }

  /*
    We're doing all the things that need to happen at the beginning of the
    script. This function will be called in index.html once the DOM is loaded.
  */
  const init = () => {
    console.log("initializing...")
    console.log("[initializing] adding event listeners...")
    calcButton.addEventListener("click", displayCalculation);
    clearButton.addEventListener("click", startOver);
    operatorElems.forEach((operator) => {
      operator.addEventListener('click', setOperator)
    });
    buttonElems.forEach((button) => {
      button.addEventListener('click', collectNumParts)
    });
  }

  return {init}
})();
// ^^^^ This is the auto-invoking part of this function.





