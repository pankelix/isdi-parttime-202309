document.getElementById("register").style.display = "none"
document.getElementById("home").style.display = "none"

//storage
var users = [{ name: "miguel", email: "prueba@hotmail.com", password: "1234" }]

//register
var loginView = document.getElementById("login")
var loginToRegisterLink = loginView.querySelector("a")
var registerView = document.getElementById("register")
var registerToLoginLink = registerView.querySelector("a")
var registerForm = registerView.querySelector("form")
var loginForm = loginView.querySelector("form")

loginToRegisterLink.onclick = function (event) {
    event.preventDefault()
    loginView.style.display = "none"
    registerView.style.display = "block"
}

registerToLoginLink.onclick = function (event) {
    event.preventDefault()
    registerView.style.display = "none"
    loginView.style.display = "block"
}

registerForm.onsubmit = function (event) {
    event.preventDefault()
    nameInput = registerForm.querySelector("#name")
    emailInput = registerForm.querySelector("#email")
    passwordInput = registerForm.querySelector("#password")

    var name = nameInput.value
    var email = emailInput.value
    var password = passwordInput.value

    var user = {}
    user.name = name
    user.email = email
    user.password = password

    //comprobar email
    if (users.some(() => user.email === email)) {
        alert("Email already in use")
    } else {
        users.push(user)
        nameInput.value = ""
        emailInput.value = ""
        passwordInput.value = ""

        document.getElementById("home").style.display = "block"
        document.getElementById("register").style.display = "none"

        document.getElementById("home").querySelector("h2").innerText = `Welcome, ${name}.`
    }
}

loginForm.onsubmit = function (event) {
    event.preventDefault()
    emailInput = loginForm.querySelector("#email")
    passwordInput = loginForm.querySelector("#password")

    var email = emailInput.value
    var password = passwordInput.value
    var name

    var emailExists = (element, index) => {
        name = users[index].name
        return element.email === email && element.password === password
    }
    if (users.some(emailExists)) {
        document.getElementById("home").style.display = "block"
        document.getElementById("login").style.display = "none"
        document.getElementById("home").querySelector("h2").innerText = `Welcome back, ${name}.`
        //como coño saco el name?
        emailInput.value = ""
        passwordInput.value = ""
    } else {
        alert("Sorry. This username does not exist in our database.")
    }
}