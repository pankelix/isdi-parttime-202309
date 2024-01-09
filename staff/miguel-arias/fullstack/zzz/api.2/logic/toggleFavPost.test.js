const toggleFavPost = require('./toggleFavPost')

try {
    toggleFavPost("2l9olwt97f80", "57m97a366js0", error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('post fav toggled')
    })
} catch (error) {
    console.error(error)
}