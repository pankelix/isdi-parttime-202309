var users = [
    {
        name: 'Wendy Darling',
        email: 'wendy@darling.com',
        password: '123123123',
    },
    {
        name: 'Peter Pan',
        email: 'peter@pan.com',
        password: '123123123',
    },
]

var userLogged = [

]

function createUser(name, email, password) {
    var user = {}

    user.name = name
    user.email = email
    user.password = password

    users.push(user)
}

function loginUser(email) {
    var user = findUserByEmail(email)
    userLogged.push(user)
}

function findUserByEmail(email) {
    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            return user
        }
    }

    return null
}

function logOutUser() {
    userLogged.splice(0, 1)
}

function changeName(user, name) {
    document.getElementById('profile-name').innerText = 'Your name: ' + name
    user.name = name
}

function changeEmail(user, email) {
    document.getElementById('profile-email').innerText = 'Your email: ' + email
    user.email = email
}

function changePassword(user, password, confirmPassword) {
    checkPassword(password, confirmPassword)
    
    user.password = password
}