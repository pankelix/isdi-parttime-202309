function registerUser(name, email, password) {
    validateText(name, 'name')
    validateText(email, 'email')
    validateText(password, 'password')

    var user = findUserByEmail(email)

    if (user)
        throw new Error('user already exists')

    createUser(name, email, password)
}

function authenticateUser(email, password) {
    validateText(email, 'email')
    validateText(password, 'password')

    var user = findUserByEmail(email)

    if (!user || user.password !== password)
        throw new Error('wrong credentials')
}

function retrieveUser(email) {
    validateText(email, 'email')

    var user = findUserByEmail(email)

    if (!user)
        throw new Error('user not found')

    return user
}

function changeUserPassword(email, password, confirmPassword) {
    validateText(email, 'email')
    validateText(password, 'password')
    validateText(confirmPassword, 'confirm password')
    validatePasswordsMatch(password, confirmPassword)
    var user = findUserByEmail(email)
    //TODO pedir contraseña antigua y validarla
    
    user.password = password
}