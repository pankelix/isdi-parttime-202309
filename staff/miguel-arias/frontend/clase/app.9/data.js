var users = [
    {
        name: 'Wendy Darling',
        email: 'wendy@darling.com',
        password: '123123123'
    },
    {
        name: 'Peter Pan',
        email: 'peter@pan.com',
        password: '123123123'
    }
]

var posts = [
    {
        author: 'peter@pan.com',
        image: 'https://m.media-amazon.com/images/M/MV5BMzIwMzUyYTUtMjQ3My00NDc3LWIyZjQtOGUzNDJmNTFlNWUxXkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_FMjpg_UX1000_.jpg',
        text: 'my granpa!'
    },
    {
        author: 'wendy@darling.com',
        image: 'https://ih1.redbubble.net/image.2230349250.8377/pp,840x830-pad,1000x1000,f8f8f8.jpg',
        text: 'my sweety!'
    },
    {
        author: 'peter@pan.com',
        image: 'https://m.media-amazon.com/images/I/71JZegDmwbL.jpg',
        text: 'i love ü baby'
    }
]

function createUser(name, email, password) {
    var user = {}

    user.name = name
    user.email = email
    user.password = password

    users.push(user)
}

function findUserByEmail(email) {
    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email)
            return user
    }

    return null
}