let howManyNumbers = 0
let givenNumbers = []
const calculationResults = []

const welcomeGuest = () => {
    alert("Bienvenido a la calculadora ISDI Coders.")
}

const askHowManyNumbers = () => {
    let howManyNumbers = 0
    howManyNumbers = parseInt(prompt("¿Cuántos números quieres calcular?"))
    if (howManyNumbers === 0) {
        alert("Por favor, mínimo tiene que haber 1 número para realizar cálculos.")
        askHowManyNumbers()
    } else if (howManyNumbers === 1) {
        doSquareRoot()
    } else if (howManyNumbers >= 2) {
        pushNumbers()
    }
}

const doSquareRoot = () => {
    let onlyNumber = prompt("Escribe un número para descubrir su raiz cuadrada.")
    squareFirstNumber = Math.sqrt(onlyNumber)
    alert(`El resultado de la raiz cuadrada de ${onlyNumber} es ${Number(squareFirstNumber.toFixed(3))}`)
    repeatCalculation()
}

const pushNumbers = () => {
    givenNumbers = []
    alert(howManyNumbers)
    for (let i = 0; i < howManyNumbers; i++) {
        let numberToBePushed = prompt("Escribe el número")
        givenNumbers.push(numberToBePushed)
    }
    alert(`Números pusheados:
${JSON.stringify(givenNumbers)}`)
}

const doMath = (...numbers) => {
    const mathAddition = (...numbers) => {
        let addition = (parseFloat(firstNumber) + parseFloat(secondNumber))
        return addition
    }

    const mathSubstraction = (...numbers) => {
        let substraction = (parseFloat(firstNumber) - parseFloat(secondNumber))
        return substraction
    }

    const mathMultiplication = (...numbers) => {
        let multiplication = (parseFloat(firstNumber) * parseFloat(secondNumber))
        return multiplication
    }

    const mathDivision = (...numbers) => {
        let division = (parseFloat(firstNumber) / parseFloat(secondNumber))
        return division
    }
    results.push(addition, substraction, multiplication, division)


    repeatCalculation()
    repeatCalculation()
}

const showResults = () => {
    for (let i = 0; i < results.length; i++) {
        alert(`El resultado de la suma de esos valores es: ${results[i]}
        El resultado de la resta de esos valores es: ${Number(mathSubstraction(firstNumber, secondNumber).toFixed(3))}
        El resultado de la multiplicación de esos valores es: ${Number(mathMultiplication(firstNumber, secondNumber).toFixed(3))}
        El resultado de la división de esos valores es: ${Number(mathDivision(firstNumber, secondNumber).toFixed(3))}`)
    }

}
const repeatCalculation = () => {
    let i = confirm("¿Quieres hacer otro calculo?")
    if (i === true) {
        askHowManyNumbers()
    } else {
        exitProgram()
    }
}



const calculator = () => {
    welcomeGuest()
    askHowManyNumbers()
    showResults()
}

calculator()