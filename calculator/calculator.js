// Query selectors
const calculatorDisplay = document.querySelector(".disp");
const numberButtons = document.querySelectorAll(".num");
const operandButtons = document.querySelectorAll(".operand");
const ACButton = document.querySelector(".AC");

// Initialize variable
let splitExpression;

// Loop through the numbered buttons
numberButtons.forEach(number => {
    if (calculatorDisplay.firstElementChild.textContent.length == 13) {
        return;
    }
    // If clicked, display the number on the calculator display
    number.addEventListener("click", ()=> {
        calculatorDisplay.firstElementChild.textContent += number.textContent;

        // Split up the string by +, -, *, /
        splitExpression = calculatorDisplay.firstElementChild.textContent.split(/(\+|-|\*|\/)/);
        
        // If the first character is negative, make sure that the first number gets the negative
        if (splitExpression[0] == "" & splitExpression[1] == "-") {
            splitExpression = splitExpression.slice(2);
            splitExpression.splice(0, 1, (-1 * parseFloat(splitExpression[0])));
        
        }
        // console.log(splitExpression);
    })
});

// Loop through each possible operator
operandButtons.forEach(operator => {
    if (calculatorDisplay.firstElementChild.textContent.length == 13) {
        return;
    }
    // On clicked, display the operator on the calculator screen
    operator.addEventListener("click", ()=> {
        calculatorDisplay.firstElementChild.textContent += operator.textContent;

        // console.log(calculatorDisplay.firstElementChild.textContent);
    })
});

// Clear display
ACButton.addEventListener("click", ()=> {
    calculatorDisplay.firstElementChild.textContent = "";
})

/**
 * @function compute performs the expression calculation. Start with division, then multiplication, then addition /subtraction
 * @param {array} expression 
 * 
 */
function compute(expression) {

// Make a copy of the expression
let copy = expression;
// Declare and init an empty array for divisions
let divisions = []

// Indexer
let i = 1;

    // Loop through the expression array
    while (i < expression.length) {
        // If we see a division operator
        if (expression[i] == "/") {
            // Divide the numbers before and after the operator and push it into an array
            divisions.push(parseFloat(expression[i-1]) / parseFloat(expression[i+1]));
            // Grab the rest of the array and concatenate it with the new divisions array
            divisions = divisions.concat(expression.slice(i+2, expression.length));
            // Recursion: repeat until no more division operators are present
            return compute(divisions);
        }
        // If there's not a division operator, just concatenate the number and operator to the divisons array
        else {
            divisions = divisions.concat(expression.slice(i-1, i+1));
        }
        i += 2;
    }
    // Then, pass in the array with all the division calculations done into the multipliy function
    return multiply(copy);
}

/**
 * @function multipy performs the multipication calculation
 * @param {array} expression 
 * 
 */
function multiply(expression) {
    let copy = expression;
    let multiplications = []

    let i = 1;

    while (i < expression.length) {
        // If the operator is *, multipy the element before and after it, and push it into an array
        if (expression[i] == "*") {
            multiplications.push(parseFloat(expression[i-1]) * parseFloat(expression[i+1]));
            
            // Get the rest of the elements in the array, concatenate it with the new multiplications array
            multiplications = multiplications.concat(expression.slice(i+2, expression.length));

            // Recursively pass the multiplications array until no more * are present
            return multiply(multiplications);
        }
        // Else if there's not a multiplication operator, just concatenate the number and operator to the multiplications array
        else {
            multiplications = multiplications.concat(expression.slice(i-1, i+1));
        }
        i += 2;
    }

    // Pass in the array with divisions and multiplications calculations complete into the AddSubtract function, which performs the final calculations
    // e.g ["1", "*", "2", "\", "3", "+", "4", "-", "5"] -> 
    //     ["1", "*", ".66", "+", "4", "-", "5"] ->
    //     [".66", "+", "4", "-", "5"] is passed into AddSubtract
    return AddSubtract(copy);
}

/**
 * @function AddSubtract performs the addition and subtraction caluclations
 * @param {array} expression 
 * 
 */
function AddSubtract(expression) {
    // Let the initial sum be the first value in the array
    let sum = parseFloat(expression[0]);

    let i = 1;

    while (i < expression.length) {
        // Add and subtract elements to the sum
        if (expression[i] == "+") {
            sum += parseFloat(expression[i+1]);
        }
        else if (expression[i] == "-") {
            sum += parseFloat(-1 * expression[i+1]);
        }

        // Gets each operator in array
        i += 2;
    }

    // If calculation fails, print "Syntax Error"
    if (isNaN(sum)) {
        calculatorDisplay.firstElementChild.textContent = "Syntax Error"
    }
    // Otherwise, print out the result
    else {
        calculatorDisplay.firstElementChild.textContent = sum.toFixed(3);
    }
}
