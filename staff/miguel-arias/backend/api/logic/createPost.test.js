const mongoose = require('mongoose')

const createPost = require('./createPost')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            createPost('658f0f0ff58499e7aacac4f6', 'https://media.istockphoto.com/id/181072765/es/foto/lechuga-aislado.jpg?s=612x612&w=0&k=20&c=7spdLdTK_iyTUdpdp6cjdHkDE9dCkahoTtnOvQYY8mE=', 'what a fresh day', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('created')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))