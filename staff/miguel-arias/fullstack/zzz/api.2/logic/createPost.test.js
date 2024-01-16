const createPost = require ('./createPost')

try {
    createPost("5yr11xtj15w0", 'https://media.istockphoto.com/id/181072765/es/foto/lechuga-aislado.jpg?s=612x612&w=0&k=20&c=7spdLdTK_iyTUdpdp6cjdHkDE9dCkahoTtnOvQYY8mE=', 'what a fresh day', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('created')
    })
} catch (error) {
    console.error(error)
}