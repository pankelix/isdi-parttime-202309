function registerUser(name, email, password) {
    var userExists = userExistsByEmail(email)

    if (userExists)
        return false

    createUser(name, email, password)

    return true
}