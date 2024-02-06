import session from "./session"

function isUserLoggedIn() {
    return !!session.token
    // la doble negación convierte algo en booleano
    // !algo => false !!algo = !false = true
    // !null => true !!nul = !true = false
}

export default isUserLoggedIn