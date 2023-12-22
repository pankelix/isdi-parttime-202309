const retrievePosts = require('./retrievePosts')

try {
    retrievePosts("amhkljhnhc4", (error, user) => {
        if (error) {
            console.error(error)

            return
        }

        console.log('retrieved', user)
    })
} catch (error) {
    console.error(error)
}