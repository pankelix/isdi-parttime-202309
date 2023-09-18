flightsCheap = []
let minCost = 0
let maxBudget = 0
let newFrom = ""
let newTo = ""
let newCost = ""
let newLayover = ""
let isAdmin = ""
let userName = ""
const layoverTrue = "realiza escala."
const layoverFalse = "no realiza ninguna escala."
let totalCost = 0

const flights = [
    { id: 00, to: "New York", from: "Barcelona", cost: 700, layover: false },
    { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, layover: true },
    { id: 02, to: "Paris", from: "Barcelona", cost: 210, layover: false },
    { id: 03, to: "Roma", from: "Barcelona", cost: 150, layover: false },
    { id: 04, to: "London", from: "Madrid", cost: 200, layover: false },
    { id: 05, to: "Madrid", from: "Barcelona", cost: 90, layover: false },
    { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, layover: true },
    { id: 07, to: "Shangai", from: "Barcelona", cost: 800, layover: true },
    { id: 08, to: "Sydney", from: "Barcelona", cost: 150, layover: true },
    { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, layover: false },
];

const askUserName = () => {
    userName = userName + prompt("Bienvenido a ISDI Coders Airlines, por favor díganos su nombre de usuario.");
    if (userName === "") {
        askUserName()
    }
    return userName
}

const actualFlights = () => {
    alert("Vamos a imprimir en consola los vuelos disponibles actualmente.")
    console.log(`Bienvenido ${userName}. Aquí tiene los vuelos disponibles.`)
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].layover === false) {
            console.log(`
ID ${i + 1}: El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ y ${layoverFalse}`)
        } else {
            console.log(`
ID ${i + 1}: El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ y ${layoverTrue}`)
        }
    }
    console.log("_______________________________________________________________________________________________________________________")
}

const showFlightInfo = () => {
    alert("Ahora vamos a darle algunos datos sobre los vuelos.")
    for (let i = 0; i < flights.length; i++) {
        totalCost = totalCost + flights[i].cost

    }

    const averagePrice = totalCost / flights.length

    console.log(`1 - El precio medio de nuestros vuelos para el día de hoy es de ${averagePrice}€.`)
    console.log("_______________________________________________________________________________________________________________________")

    let layoverCount = 0

    for (let i = 0; i < flights.length; i++) {
        if (flights[i].layover === true) {
            layoverCount = layoverCount + 1
        }
    }

    console.log(`2 - En el dia de hoy, ${layoverCount} vuelos realizan escalas.`)
    console.log("_______________________________________________________________________________________________________________________")

    const lastFlights = flights.slice(-5)

    console.log("3 - Los 5 últimos vuelos del día son:")
    for (let i = 0; i < lastFlights.length; i++) {
        console.log(`${lastFlights[i].from} a ${lastFlights[i].to}`)
    }
    console.log("_______________________________________________________________________________________________________________________")
}

const askIsAdmin = () => {
    isAdmin = ""
    let i = prompt("¿Eres (A)dministrador, (U)suario o quieres (S)alir?").toUpperCase()
    switch (i) {
        case "A":
            userIsAdmin()
            break
        case "U":
            userIsUser()
            break
        case "S":
            exitProgram()
            break
        default:
            alert("Por favor, introduce un valor válido")
            askIsAdmin()
    }
}

const getNewFrom = () => {
    newFrom = ""
    newFrom = prompt(`Creando el vuelo ${flights[flights.length - 1].id + 1}. ¿Cuál es el origen?`)
    if (newFrom === "") {
        alert("Lo siento, no pueden introducirse respuestas en blanco.")
        getNewFrom()
    }
}

const getNewTo = () => {
    newTo = ""
    newTo = prompt(`Creando el vuelo ${flights[flights.length - 1].id + 1}. ¿Cuál es el destino?`)
    if (newTo === "") {
        alert("Lo siento, no pueden introducirse respuestas en blanco.")
        getNewTo()
    }
}

const getNewCost = () => {
    newCost = ""
    newCost = prompt(`Creando el vuelo ${flights[flights.length - 1].id + 1}. ¿Cuál es el precio?`)
    if (newCost === "") {
        alert("Lo siento, no pueden introducirse respuestas en blanco.")
        getNewCost()
    }
}

const getNewLayover = () => {
    newLayover = ""
    newLayover = confirm(`Creando el vuelo ${flights[flights.length - 1].id + 1}. ¿Tiene escalas? Acepte para SI | Cancele para NO`)
}

const pushFlight = () => {
    flights.push({ id: flights[flights.length - 1].id, to: newTo, from: newFrom, cost: newCost, layover: newLayover })
    flights[flights.length - 1].id++
}

const anotherFlight = () => {
    actualFlights()
    let i = confirm("¿Quieres crear otro vuelo?")
    if (i === true && flights[flights.length - 1].id < 15) {
        createFlight()
    } else if (flights[flights.length - 1].id === 15) {
        alert("Lo siento, no es posible crear más de 15 vuelos.")
    } else if (i === false) {
        anotherOperation()
    }
}

const createFlight = () => {
    minCost = 0
    newFrom = ""
    newTo = ""
    newCost = ""
    newLayover = ""
    getNewFrom()
    getNewTo()
    getNewCost()
    getNewLayover()
    pushFlight()
    anotherFlight()
}

const deleteFlight = () => {
    let deletedFlight = prompt(`¿Qué vuelo deseas borrar? Introduce el ID`)
    flights.splice(deletedFlight - 1, 1)
    alert(`El vuelo con ID ${deletedFlight} ha sido eliminado`)
    actualFlights()
    anotherOperation()
}

const anotherOperation = () => {
    i = confirm("¿Quiere realizar otra consulta?")
    if (i === true) {
        askIsAdmin()
    } else {
        exitProgram()
    }
}

const userIsAdmin = () => {
    i = confirm("¿Quiere crear o eliminar un vuelo? Acepte para CREAR | Cancele para ELIMINAR")
    if (i === true) {
        actualFlights()
        createFlight()
    } else {
        deleteFlight()
    }
}

const pushCheapFlights = () => {
    for (i = 0; i < flights.length; i++) {
        if (flights[i].cost < maxBudget) {
            flightsCheap.push({ id: flights[i].id, to: flights[i].to, from: flights[i].from, cost: flights[i].cost, layover: flights[i].layover })
        }
    }
}

const compareCheapFlights = () => {
    minCost = 0
    for (i = 0; i < flightsCheap.length; i++) {
        minCost = Math.min(flightsCheap[i].cost)
        if (maxBudget >= minCost) {
            alert(`Estos vuelos son para ti:
            ${flightsCheap[i].from} a ${flightsCheap[i].to} por ${flightsCheap[i].cost}€`)
        }
    }
}

const alertNoCheapFlights = () => {
    minCost = 0
    for (i = 0; i < flights.length; i++) {
        minCost = Math.min(flights[i].cost)
        alert(minCost)
    }
    if (maxBudget < minCost) {
        alert("Lo siento, no tenemos más vuelos con un coste menor del de ese presupuesto.")
    }
    userIsUser()
}

const userIsUser = () => {
    minCost = 0
    maxBudget = 0
    flightsCheap = []
    maxBudget = prompt("¿Cual es tu presupuesto máximo para el vuelo?")
    if (maxBudget === null || maxBudget === "") {
        alert("Por favor, introduce un valor válido")
        userIsUser()
    } else if (maxBudget < 90) {
        alert("Lo siento, no tenemos más vuelos con un coste menor del de ese presupuesto.")
        anotherOperation()
    }
    else {
        pushCheapFlights()
        compareCheapFlights()
        anotherOperation()
    }
}

const exitProgram = () => {
    alert("Muchas gracias por usar la aerolínea de ISDI CODERS, esperamos verle pronto.")
}

const advancedInteractions = () => {
    askUserName()
    actualFlights()
    showFlightInfo()
    askIsAdmin()
}

advancedInteractions()