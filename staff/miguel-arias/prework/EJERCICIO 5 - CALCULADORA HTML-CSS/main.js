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