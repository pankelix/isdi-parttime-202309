let display = document.querySelector(".display");
let secondDisplay = document.querySelector(".secondDisplay");
let keys = Array.from(document.getElementsByClassName("key"));
let firstInput = "";
let operand = ""
let secondInput = "";
let result = 0;

const clearAll = () => {
    display.innerText = "";
    secondDisplay.innerText = "";
    firstInput = ""
    secondInput = ""
    result = 0
    document.querySelector(".AC").classList.remove("red-background");
    document.querySelector(".AC").classList.add("key");
}

const clearSome = () => {
    firstInput = ""
    secondInput = ""
    result = 0
}

const clearError = () => {
    if (display.innerText === "ERROR!") {
        clearAll()
    }
}

const calculate = (op, num2) => {
    switch (op) {
        case "/":
            if (num2 === "0") {
                display.innerText = "ERROR!"
                result = 0;
            } else {
                result /= Number(num2)
                firstInput = result
            }
            break
        case "*":
            result *= Number(num2)
            firstInput = result
            break
        case "-":
            result -= Number(num2)
            firstInput = result
            break
        case "+":
            result += Number(num2)
            firstInput = result
            break
        case "=":
            firstInput = result
    }
}

const trimResult = (result) => {
    if (result.toString().length > 14) {
        result = parseFloat(result.toString().slice(0, 13));
    };
    return result;
}

const showResultOnSecondDisplay = () => {
    secondDisplay.innerText = trimResult(result);
}

const showResultOnDisplay = () => {
    display.innerText = trimResult(result)
}

const controlVoids = () => {
    if (firstInput === "") {
        firstInput = Number(display.innerText)
        result = Number(display.innerText)
    } else {
        secondInput = display.innerText
    }
}

keys.map(button => {
    button.addEventListener("click", (e) => {
        if (e.target.innerText === "AC") {
            clearAll()
        }
    })
})

keys.map((button) => {
    button.addEventListener("click", (e) => {
        if (display.innerText === "ERROR!") {
            display.innerText = "ERROR!"
            document.querySelector(".AC").classList.add("red-background");
            document.querySelector(".AC").classList.remove("key");
        } else {
            switch (e.target.innerText) {
                case "AC":
                    break;
                case "%":
                    display.innerText = display.innerText / 100;
                    break;
                case "+/-":
                    display.innerText = - (display.innerText);
                    firstInput = display.innerText
                    result = display.innerText
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "÷":
                    controlVoids()
                    calculate(operand, secondInput)
                    operand = "/"
                    display.innerText = ""
                    showResultOnSecondDisplay()
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "×":
                    controlVoids()
                    calculate(operand, secondInput)
                    operand = "*"
                    display.innerText = ""
                    showResultOnSecondDisplay()
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "-":
                    controlVoids()
                    calculate(operand, secondInput)
                    operand = "-"
                    display.innerText = ""
                    showResultOnSecondDisplay()
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "+":
                    controlVoids()
                    calculate(operand, secondInput)
                    operand = "+"
                    display.innerText = ""
                    showResultOnSecondDisplay()
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "DEL":
                    display.innerText = display.innerText.slice(0, -1);
                    break;
                case "=":
                    controlVoids()
                    calculate(operand, secondInput)
                    operand = "="
                    showResultOnDisplay()
                    secondDisplay.innerText = ""
                    if (secondInput === "0") {
                        display.innerText = "ERROR!"
                    }
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    clearSome()
                    break
                case ".":
                    if (display.innerText.includes(".")) {
                        break
                    } else if (display.innerText === "") {
                        display.innerText = display.innerText + "0."
                        break
                    } else {
                        display.innerText += e.target.innerText
                        break
                    }
                default:
                    if (display.textContent.length < 14) {
                        display.innerText += e.target.innerText;
                    }
            }
        }
    });
});

/*
let display = document.querySelector(".display");
let secondDisplay = document.querySelector(".secondDisplay");
let keys = Array.from(document.getElementsByClassName("key"));
let firstInput = "";
let operand = ""
let secondInput = "";
let result = 0;

const clearAll = () => {
    display.innerText = "";
    secondDisplay.innerText = "";
    firstInput = ""
    secondInput = ""
    result = 0
    document.querySelector(".AC").classList.remove("red-background");
    document.querySelector(".AC").classList.add("key");
}

const clearSome = () => {
    firstInput = ""
    secondInput = ""
    result = 0
}

const clearError = () => {
    if (display.innerText === "ERROR!") {
        clearAll()
    }
}

const calculate = (op, num2) => {
    switch (op) {
        case "/":
            if (num2 === "0") {
                display.innerText = "ERROR!"
                result = 0;
            } else {
                result /= Number(num2)
                firstInput = result
            }
            break
        case "*":
            result *= Number(num2)
            firstInput = result
            break
        case "-":
            result -= Number(num2)
            firstInput = result
            break
        case "+":
            result += Number(num2)
            firstInput = result
            break
    }
}

const trimResult = (result) => {
    if (result.toString().length > 14) {
        result = parseFloat(result.toString().slice(0, 13));
    };
    return result;
}

const showResultOnSecondDisplay = () => {
    secondDisplay.innerText = trimResult(result);
}

const showResultOnDisplay = () => {
    display.innerText = trimResult(result)
}

const controlVoids = () => {
    if (firstInput === "") {
        firstInput = Number(display.innerText)
        result = Number(display.innerText)
    } else {
        secondInput = display.innerText
    }
}

keys.map(button => {
    button.addEventListener("click", (e) => {
        if (e.target.innerText === "AC") {
            clearAll()
        }
    })
})

keys.map((button) => {
    button.addEventListener("click", (e) => {
        if (display.innerText === "ERROR!") {
            display.innerText = "ERROR!"
            document.querySelector(".AC").classList.add("red-background");
            document.querySelector(".AC").classList.remove("key");
        } else {
            switch (e.target.innerText) {
                case "AC":
                    break;
                case "%":
                    display.innerText = display.innerText / 100;
                    break;
                case "+/-":
                    display.innerText = - (display.innerText);
                    firstInput = display.innerText
                    result = display.innerText
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "÷":
                    controlVoids()
                    calculate(operand, secondInput)
                    operand = "/"
                    display.innerText = ""
                    showResultOnSecondDisplay()
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "×":
                    controlVoids()
                    calculate(operand, secondInput)
                    operand = "*"
                    display.innerText = ""
                    showResultOnSecondDisplay()
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "-":
                    controlVoids()
                    calculate(operand, secondInput)
                    operand = "-"
                    display.innerText = ""
                    showResultOnSecondDisplay()
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "+":
                    controlVoids()
                    calculate(operand, secondInput)
                    operand = "+"
                    display.innerText = ""
                    showResultOnSecondDisplay()
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    break;
                case "DEL":
                    display.innerText = display.innerText.slice(0, -1);
                    break;
                case "=":
                    controlVoids()
                    calculate(operand, secondInput)
                    showResultOnDisplay()
                    secondDisplay.innerText = ""
                    if (secondInput === "0") {
                        display.innerText = "ERROR!"
                    }
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    clearSome()
                    break
                case ".":
                    if (display.innerText.includes(".")) {
                        break
                    } else if (display.innerText === "") {
                        display.innerText = display.innerText + "0."
                        break
                    } else {
                        display.innerText += e.target.innerText
                        break
                    }
                default:
                    if (display.textContent.length < 14) {
                        display.innerText += e.target.innerText;
                    }
            }
        }
    });
});
*/

/*
let display = document.querySelector(".display");
let secondDisplay = document.querySelector(".secondDisplay");
let keys = Array.from(document.getElementsByClassName("key"));
let firstInput = "";
let operand = ""
let secondInput = "";
let result = 0;

const calculate = (num1, op, num2) => {
    switch (op) {
        case "/":
            if (num2 === "") {
                return;
            }
            if (num2 === "0") {
                display.innerText = "ERROR!"
                result = 0;
            } else {
                result /= Number(num2)
                firstInput = result
            }
            break
        case "*":
            if (num2 === "") {
                return;
            } else {
                result *= Number(num2)
                firstInput = result
            };
            break
        case "-":
            if (num2 === "") {
                result = result - Number(num1) - Number(num2);
            } else {
                result -= Number(num2)
                firstInput = result
            }
            break
        case "+":
            if (num2 === "") {
                result = Number(num1) + Number(num2);
            } else {
                result += Number(num2)
                firstInput = result
            }
            break
    }
}

keys.map((button) => {
    button.addEventListener("click", (e) => {
        switch (e.target.innerText) {
            case "AC":
                display.innerText = "";
                secondDisplay.innerText = "";
                firstInput = ""
                secondInput = ""
                result = 0
                break;
            case "%":
                if (display.innerText === "ERROR!") {
                    display.innerText = "ERROR!"
                } else {
                    display.innerText = display.innerText / 100;
                }
                break;
            case "+/-":
                if (display.innerText === "ERROR!") {
                    display.innerText = "ERROR!"
                } else {
                    display.innerText = - (display.innerText);
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                }
                break;
            case "÷":
                if (display.innerText === "ERROR!") {
                    display.innerText = "ERROR!"
                } else {
                    if (firstInput === "") {
                        firstInput = Number(display.innerText)
                        result = Number(display.innerText)
                    } else {
                        secondInput = display.innerText
                    }
                    calculate(firstInput, operand, secondInput)
                    operand = "/"
                    display.innerText = ""
                    secondDisplay.innerText = result
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                }
                break;
            case "×":
                if (display.innerText === "ERROR!") {
                    display.innerText = "ERROR!"
                } else {
                    if (firstInput === "") {
                        firstInput = Number(display.innerText)
                        result = Number(display.innerText)
                    } else {
                        secondInput = display.innerText
                    }
                    calculate(firstInput, operand, secondInput)
                    operand = "*"
                    display.innerText = ""
                    secondDisplay.innerText = result
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                }
                break;
            case "-":
                if (display.innerText === "ERROR!") {
                    display.innerText = "ERROR!"
                } else {
                    if (firstInput === "") {
                        firstInput = Number(display.innerText)
                        result = Number(display.innerText)
                    } else {
                        secondInput = display.innerText
                    }
                    calculate(firstInput, operand, secondInput)
                    operand = "-"
                    display.innerText = ""
                    secondDisplay.innerText = result
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                }
                break;
            case "+":
                if (display.innerText === "ERROR!") {
                    display.innerText = "ERROR!"
                } else {
                    if (firstInput === "") {
                        firstInput = Number(display.innerText)
                        result = Number(display.innerText)
                    } else {
                        secondInput = display.innerText
                    }
                    calculate(firstInput, operand, secondInput)
                    operand = "+"
                    display.innerText = ""
                    secondDisplay.innerText = result
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                }
                break;
            case "DEL":
                if (display.innerText === "ERROR!") {
                    display.innerText = "ERROR!"
                } else {
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
            case "=":
                if (display.innerText === "ERROR!") {
                    display.innerText = "ERROR!"
                } else {
                    if (firstInput === "") {
                        firstInput = display.innerText
                    } else {
                        secondInput = display.innerText
                    }
                    calculate(firstInput, operand, secondInput)
                    display.innerText = result
                    secondDisplay.innerText = ""
                    if (secondInput === "0") {
                        console.log("si")
                        display.innerText = "ERROR!"
                    }
                    console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                    firstInput = ""
                    secondInput = ""
                    result = 0
                }
                break
            default:
                if (display.innerText === "ERROR!") {
                    display.innerText = "ERROR!"
                } else {
                    display.innerText += e.target.innerText;
                }
        }
    });
});
*/

/*
let display = document.querySelector(".display");
let secondDisplay = document.querySelector(".secondDisplay");
let keys = Array.from(document.getElementsByClassName("key"));
let input = "";
let result = 0;
let operand = "";
let step = 1;

const divideInput = (input, currentNumber) => {
    if (input === "0") {
        display.innerText = "ERROR!";
        currentNumber = 0;
        return;
    } else {
        if (step === 1) {
            step = 2
            return
        } else if (step === 2){
            currentNumber /= Number(input)
        }
        return currentNumber;
    }
}

const multiplyInput = (input, currentNumber) => {
    if (step === 1) {
        step = 2
        currentNumber = input
    } else if (step === 2) {
        currentNumber *= Number(input);
    }
    return currentNumber;
    
}

const substractInput = (input, currentNumber) => {
    if (step === 1) {
        step = 2
        currentNumber = input
    } else if (step === 2) {
        currentNumber -= Number(input);
    }
    return Number(currentNumber);
    
}

const addInput = (input, currentNumber) => {
    if (step === 1) {
        step = 2
        currentNumber = currentNumber + Number(input);
    } else if (step === 2) {
        currentNumber += Number(input);
    }
    return currentNumber;
}

const equalInput = (op) => {
    switch (op) {
        case ("/"):
            result = divideInput(display.innerText, result)
            break
        case ("*"):
            result = multiplyInput(display.innerText, result)
            break
        case ("-"):
            result = substractInput(display.innerText, result)
            break
        case ("+"):
            result = addInput(display.innerText, result)
            break
    }
    return result;
}

const clearAll = () => {
    display.innerText = "";
    secondDisplay.innerText = "";
    input = ""
    result = 0
    step = 1
}

const clearError = () => {
    if (display.innerText === "ERROR!") {
        clearAll()
    }
}

const changeDisplay = () => {
    display.innerText = ""
    secondDisplay.innerText = result
}

keys.map((button) => {
    button.addEventListener("click", (e) => {
        clearError()
        switch (e.target.innerText) {
            case "AC":
                clearAll()
                break;
            case "%":
                display.innerText = display.innerText / 100;
                break;
            case "+/-":
                display.innerText = - (display.innerText);
                result = display.innerText
                break;
            case "÷":
                //operand = "/"
                result = divideInput(display.innerText, input, result)
                changeDisplay()
                break;
            case "×":
                //operand = "*"
                result = multiplyInput(display.innerText, input, result)
                changeDisplay()
                break;
            case "-":
                //operand = "-"
                result = substractInput(display.innerText, input, result)
                console.log(input, result)
                changeDisplay()
                break;
            case "+":
                //operand = "+"
                result = addInput(display.innerText, input, result)
                console.log(input, result)
                changeDisplay()
                break;
            case "DEL":
                display.innerText = display.innerText.slice(0, -1);
                break;
            case "=":
                result = equalInput(operand)
                changeDisplay()
                //clearAll()
                break
            default:
                display.innerText += e.target.innerText;

        }
    });
});
*/

/*
let display = document.querySelector(".display");
let display2 = document.querySelector(".display2");
let keys = Array.from(document.getElementsByClassName("key"));
let firstInput = "";
let operand = ""
let secondInput = "";
let result = 0;

const calculate = (num1, op, num2) => {
    switch (op) {
        case "/":
            if (num2 === "") {
                return;
            } else {
                result /= Number(num2)
                firstInput = result
            }
            break
        case "*":
            if (num2 === "") {
                return;
            } else {
                result *= Number(num2)
                firstInput = result
            };
            break
        case "-":
            if (num2 === "") {
                result = result - Number(num1) - Number(num2);
            } else {
                result -= Number(num2)
                firstInput = result
            }
            break
        case "+":
            if (num2 === "") {
                result = Number(num1) + Number(num2);
            } else {
                result += Number(num2)
                firstInput = result
            }
            break
    }
}

keys.map((button) => {
    button.addEventListener("click", (e) => {
        switch (e.target.innerText) {
            case "AC":
                display.innerText = "";
                display2.innerText = "";
                firstInput = ""
                secondInput = ""
                result = 0
                break;
            case "%":
                display.innerText = display.innerText / 100;
                break;
            case "+/-":
                display.innerText = - (display.innerText);
                console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                break;
            case "÷":
                if (firstInput === "") {
                    firstInput = Number(display.innerText)
                    result = Number(display.innerText)
                } else {
                    secondInput = display.innerText
                }
                calculate(firstInput, operand, secondInput)
                operand = "/"
                display.innerText = ""
                display2.innerText = result
                console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                break;
            case "×":
                if (firstInput === "") {
                    firstInput = Number(display.innerText)
                    result = Number(display.innerText)
                } else {
                    secondInput = display.innerText
                }
                calculate(firstInput, operand, secondInput)
                operand = "*"
                display.innerText = ""
                display2.innerText = result
                console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                break;
            case "-":
                if (firstInput === "") {
                    firstInput = Number(display.innerText)
                    result = Number(display.innerText)
                } else {
                    secondInput = display.innerText
                }
                calculate(firstInput, operand, secondInput)
                operand = "-"
                display.innerText = ""
                display2.innerText = result
                console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                break;
            case "+":
                if (firstInput === "") {
                    firstInput = Number(display.innerText)
                    result = Number(display.innerText)
                } else {
                    secondInput = display.innerText
                }
                calculate(firstInput, operand, secondInput)
                operand = "+"
                display.innerText = ""
                display2.innerText = result
                console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                break;
            case "DEL":
                display.innerText = display.innerText.slice(0, -1);
                break;
            case "=":
                if (firstInput === "") {
                    firstInput = display.innerText
                } else {
                    secondInput = display.innerText
                }
                calculate(firstInput, operand, secondInput)
                display.innerText = result
                display2.innerText = ""
                if (result === "Infinity") {
                    console.log("si")
                    display.innerText = "ERROR!"
                }
                console.log(`${display.innerText} / ${firstInput} / ${operand} / ${secondInput} / ${result}`)
                firstInput = ""
                secondInput = ""
                result = 0
                break
            default:
                display.innerText += e.target.innerText;
        }
    });
});
*/

/*
let displayBottom = document.querySelector(".display-bottom");
let displayTop = document.querySelector(".display-top")
let keys = Array.from(document.getElementsByClassName("key"));
let result = 0;

keys.map((button) => {
    button.addEventListener("click", (e) => {
        switch (e.target.innerText) {
            case "AC":
                displayBottom.innerText = "";
                break;
            case "DEL":
                displayBottom.innerText = displayBottom.innerText.slice(0, -1);
                break;
            case "+":
                displayTop.innerText = displayBottom.innerText;
                result += Number(displayTop.innerText)
                displayTop.innerText = result
                displayBottom.innerText = ""
                console.log(result)
                break;
            case "=":
                result += Number(displayBottom.innerText)
                displayBottom.innerText = result
                console.log(result)
                break
            default:
                displayBottom.innerText += e.target.innerText;
        }
    });
});
*/