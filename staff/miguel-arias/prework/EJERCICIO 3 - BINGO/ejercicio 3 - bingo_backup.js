let userName = ""
let numbers = []
let bomboNumbers = []
let points = 115
let turns = 0
let userPoints = 0
let ranking = []
let numberBombo = 0
let usedNumbers = []
let lastNumber = 0
let lineSinged = false
let cardLength = 15
ranked = false

const welcome = () => {
    userName = prompt("Bienvenido al Bingo de ISDI Coders. ¿Cuál es tu nombre?", "")
    if (userName === "" || userName === null) {
        userName = "stranger"
    }
    userName = userName.toUpperCase()
}

const rules = () => {
    alert(`De acuerdo ${userName}, esto va así: Empiezas con 115 puntos y a cada turno perderás 1, la puntuación máxima que puedes conseguir son 100 puntos.`)
}

const fillBombo = () => {
    for (let i = 1; i <= 100; i++)
        bomboNumbers.push(i)
    bomboNumbers.sort((a, b) => { return a - b; })
}

const generateNumbers = (numbers) => {
    let newNumber = Math.floor(Math.random() * 101);
    if (newNumber === 0) {
        generateCard()
    } else if (!numbers.includes(newNumber)) {
        numbers.push(newNumber)
    }
}

const restartCard = () => {
    numbers.splice(0, numbers.length)
}

const restartBombo = () => {
    bomboNumbers.splice(0, bomboNumbers.length)
}

const generateCard = () => {
    while (numbers.length < cardLength) {
        generateNumbers(numbers);
    }
    numbers.sort((a, b) => { return a - b; })
    alert("Imprimiendo números en la consola.")
    console.log(`${numbers[0]} , ${numbers[1]} , ${numbers[2]} , ${numbers[3]} , ${numbers[4]}`)
    console.log(`${numbers[5]} , ${numbers[6]} , ${numbers[7]} , ${numbers[8]} , ${numbers[9]}`)
    console.log(`${numbers[10]} , ${numbers[11]} , ${numbers[12]} , ${numbers[13]} , ${numbers[14]}`)
    console.log("________________________")
    let confirmation = confirm("Acepta para usar este cartón o cancela para recibir uno nuevo.")
    if (confirmation === false) {
        restartCard()
        generateCard()
    } else {
        alert("Este es tu cartón. ¡Empieza el juego!")
    }
}

const singLine = () => {
    console.log("¡LÍNEA!")
}

const newTurn = () => {
    let i = confirm("¿Quieres empezar un nuevo turno?")
    if (i === true) {
        getNumberFromBombo()
        compareNumber()
    } else {
        exitGame()
    }
}

const getNumberFromBombo = () => {
    let i = Math.floor(Math.random() * bomboNumbers.length)
    lastNumber = bomboNumbers[i]
    bomboNumbers.splice(i, 1)
}

const putMarkOnCard = () => {
    for (let i = 0; i < numbers.length; i++) {
        if (lastNumber === numbers[i]) {
            numbers.splice(i, 1, "X")
        }
    }
}

const singBingo = () => {
    console.log("¡BINGO!")
    countPoints()
}

const checkIfMarked = (currentValue) => currentValue === "X";

const compareNumber = () => {
    console.log(`Turno: ${turns} - Quedan ${bomboNumbers.length} números en el bombo.`)
    console.log(`Ha salido el número ${lastNumber}.`)
    if (numbers.includes(lastNumber)) {
        console.log("¡El número coincide! Tachando número")
        putMarkOnCard()
        console.log(`${numbers[0]} , ${numbers[1]} , ${numbers[2]} , ${numbers[3]} , ${numbers[4]}`)
        console.log(`${numbers[5]} , ${numbers[6]} , ${numbers[7]} , ${numbers[8]} , ${numbers[9]}`)
        console.log(`${numbers[10]} , ${numbers[11]} , ${numbers[12]} , ${numbers[13]} , ${numbers[14]}`)
        console.log("__________________________")
        console.log("__________________________")
        if (lineSinged === false) {
            if (numbers.slice(0, 5).every(checkIfMarked)) {
                singLine()
                lineSinged = true
            } else if (numbers.slice(5, 10).every(checkIfMarked)) {
                singLine()
                lineSinged = true
            } else if (numbers.slice(10, 15).every(checkIfMarked)) {
                singLine()
                lineSinged = true
            }
        }

        if (numbers.every(checkIfMarked)) {
            singBingo()
        } else {
            countTurn()
            newTurn()
        }

    } else {
        console.log("El número no coincide. Sacando otro número")
        console.log(`${numbers[0]} , ${numbers[1]} , ${numbers[2]} , ${numbers[3]} , ${numbers[4]}`)
        console.log(`${numbers[5]} , ${numbers[6]} , ${numbers[7]} , ${numbers[8]} , ${numbers[9]}`)
        console.log(`${numbers[10]} , ${numbers[11]} , ${numbers[12]} , ${numbers[13]} , ${numbers[14]}`)
        console.log("__________________________")
        console.log("__________________________")
        countTurn()
        newTurn()
    }
}

const countTurn = () => {
    turns = turns + 1
    return turns
}

const countPoints = () => {
    userPoints = 0
    userPoints = points - turns
    console.log(`Has hecho ${userPoints} puntos.`)
    insertUserInRanking()
}

const insertUserInRanking = () => {
    ranking.push({ name: userName, points: userPoints },)
    ranking.sort((a, b) => b.points - a.points)
    showRanking()
}

const showRanking = () => {
    console.log(`Así queda el ranking de puntos:`)
    for (i = 0; i < ranking.length; i++) {
        console.log(`
${i + 1}: ${ranking[i].name}...........${ranking[i].points}`)
    }
    playAgain()
}

const exitGame = () => {
    alert("¡Muchas gracias por jugar al Bingo de ISDI Coders!")
}

const playAgain = () => {
    let i = confirm("¿Quieres volver a jugar?")
    if (i === true) {
        restartCard()
        restartBombo()
        turns = 0
        lineSinged = false
        bingo()
    } else {
        exitGame()
    }
}

const bingo = () => {
    welcome()
    rules()
    fillBombo()
    generateCard()
    newTurn()
}

bingo()