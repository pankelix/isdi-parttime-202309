let firstNumber = 0
let secondNumber = 0
let firstNumberEmpty = false
let secondNumberEmpty = false

const welcomeGuest = () => {
    alert("Bienvenido a la calculadora ISDI Coders.")
}

const askFirstNumber = () => {
    firstNumber = 0
    firstNumberEmpty = false
    firstNumber = firstNumber + prompt("Por favor, inserta el primer número")
    if (firstNumber === "0") {
        firstNumberEmpty = true
    }
    firstNumber = Number(firstNumber)
    if (isNaN(firstNumber)) {
        alert("Por favor, inserta un número válido.")
        firstNumber = 0
        askFirstNumber()
    }
    return firstNumber
}

const askSecondNumber = () => {
    secondNumber = 0
    secondNumberEmpty = false
    secondNumber = secondNumber + prompt("Por favor, inserta el segundo número")
    if (secondNumber === "0") {
        secondNumberEmpty = true
    }
    secondNumber = Number(secondNumber)
    if (isNaN(secondNumber)) {
        alert("Por favor, inserta un número válido.")
        secondNumber = 0
        askSecondNumber()
    }
    return secondNumber
}

const calculations = () => {
    askFirstNumber()
    askSecondNumber()
    if (firstNumberEmpty === false && secondNumberEmpty === false) {
        doMath()
    } else if (firstNumberEmpty === false && secondNumberEmpty === true) {
        doSquareFirstNumber()
    } else if (firstNumberEmpty === true && secondNumberEmpty === false) {
        doSquareSecondNumber()
    } else if (firstNumberEmpty === true && secondNumberEmpty === true) {
        alertError()
    }

}

const doMath = () => {
    const mathAddition = (firstNumber, secondNumber) => {
        let addition = (parseFloat(firstNumber) + parseFloat(secondNumber))
        return addition
    }

    const mathSubstraction = (firstNumber, secondNumber) => {
        let substraction = (parseFloat(firstNumber) - parseFloat(secondNumber))
        return substraction
    }

    const mathMultiplication = (firstNumber, secondNumber) => {
        let multiplication = (parseFloat(firstNumber) * parseFloat(secondNumber))
        return multiplication
    }

    const mathDivision = (firstNumber, secondNumber) => {
        let division = (parseFloat(firstNumber) / parseFloat(secondNumber))
        return division
    }
    alert(`El resultado de la suma de esos valores es: ${Number(mathAddition(firstNumber, secondNumber).toFixed(3))}
    El resultado de la resta de esos valores es: ${Number(mathSubstraction(firstNumber, secondNumber).toFixed(3))}
    El resultado de la multiplicación de esos valores es: ${Number(mathMultiplication(firstNumber, secondNumber).toFixed(3))}
    El resultado de la división de esos valores es: ${Number(mathDivision(firstNumber, secondNumber).toFixed(3))}`)

    repeatCalculation()
}

const doSquareFirstNumber = () => {
    let squareFirstNumber = Math.sqrt(firstNumber)
    alert(`El resultado de la raiz cuadrada de ${firstNumber} es ${Number(squareFirstNumber.toFixed(3))}`)
    repeatCalculation()
}

const doSquareSecondNumber = () => {
    let squareSecondNumber = Math.sqrt(secondNumber)
    alert(`El resultado de la raiz cuadrada de ${secondNumber} es ${Number(squareSecondNumber.toFixed(3))}`)
    repeatCalculation()
}

const alertError = () => {
    firstNumber = 0
    secondNumber = 0
    alert("Por favor, introduce al menos un número.")
    calculations()
}

const repeatCalculation = () => {
    let i = confirm("¿Quieres hacer otro calculo?")
    if (i === true) {
        calculations()
    } else {
        exitProgram()
    }
}

const exitProgram = () => {
    alert("Muchas gracias por usar la calculadora de ISDI Coders.")
}

welcomeGuest()
calculations()