let numbers = []

const welcomeGuest = () => {
    alert("Bienvenido a la calculadora ISDI Coders.")
}

const askNumbers = () => {
    let i = parseFloat(prompt("Introduce un número"))
    if (typeof i === "number") {
        numbers.push(i)
    } else {
        alert("Por favor, introduce solo números.")
        askNumbers()
    }
    anotherNumber()
}

const getAddition = (numbers) => {
    let result = 0
    for (let i = 0; i < numbers.length; i++) {
        result += numbers[i]
    }
    return result
}

const getSubstraction = (numbers) => {
    let result = numbers[0]
    for (let i = 1; i < numbers.length; i++) {
        result -= numbers[i]
    }
    return result
}

const getMultiplication = (numbers) => {
    let result = 1
    for (let i = 0; i < numbers.length; i++) {
        result *= numbers[i]
    }
    return result
}

const getDivision = (numbers) => {
    let result = numbers[0]
    for (let i = 1; i < numbers.length; i++) {
        result /= numbers[i]
    }
    return result
}

const getSquareRoot = (numbers) => {
    let result = Math.sqrt(numbers[0])
    return result
}

const calculateNumbers = () => {
    if (numbers.length === 1) {
        alert("Al introducir solo 1 número, se mostrará la raiz cuadrada del mismo.")
        alert("Imprimiendo resultados en consola")
        console.log(`La raiz cuadrada de ${numbers[0]} es: ${getSquareRoot(numbers).toFixed(3)}`)
        console.log("________________________________________________________")
        exitProgram()
    } else {
        alert("Imprimiendo resultados en consola")
        console.log(`El resultado de la suma de ${numbers} es: ${Number(getAddition(numbers).toFixed(3))}`)
        console.log(`El resultado de la resta de ${numbers} es: ${Number(getSubstraction(numbers).toFixed(3))}`)
        console.log(`El resultado de la multiplicación de ${numbers} es: ${Number(getMultiplication(numbers).toFixed(3))}`)
        console.log(`El resultado de la división de ${numbers} es: ${Number(getDivision(numbers).toFixed(3))}`)
        console.log("________________________________________________________")
        exitProgram()
    }
}

const exitProgram = () => {
    i = confirm("¿Quiere realizar otro cálculo?") // quiero vaciar numbers, para eso un for con un .pop para ir eliminando el último cada vez
    if (i === true) {
        for (j = 0; j < numbers.length; j++) {
            numbers[j].pop
        }
        alert(numbers)
        askNumbers()
    } else {
        alert("Muchas gracias por utilizar la calculadora de ISDI Coders. ¡Que tenga un buen día!")
    }
}

const anotherNumber = () => {
    if (numbers.length === 0) {
        alert("No hay ningún número introducido por ahora")
        askNumbers()
    } else {
        alert(`Los números introducidos hasta ahora son: ${numbers}`)
        let i = prompt("¿Quieres (A)ñadir otro número, (E)liminar el último introducido, (C)alcular o (S)alir?").toUpperCase()
        switch (i) {
            case "A":
                askNumbers()
                break
            case "E":
                numbers.pop()
                alert("Último número eliminado")
                anotherNumber()
                break
            case "C":
                calculateNumbers()
                break
            case "S":
                exitProgram()
                break
            default:
                alert("Por favor, introduce un valor válido")
                anotherNumber()
        }
    }

}

const calculator = () => {
    welcomeGuest()
    askNumbers()
}

calculator()