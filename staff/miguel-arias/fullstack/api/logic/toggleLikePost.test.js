const toggleLikePost = require('./toggleLikePost')

try {
    toggleLikePost("2l9olwt97f80", "57m97a366js0", error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('post like toggled')
    })
} catch (error) {
    console.error(error)
}