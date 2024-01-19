import mongoose from 'mongoose'

import createPost from './createPost.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        try {
            createPost('658f0f0ff58499e7aacac4f6', 'https://media.istockphoto.com/id/181072765/es/foto/lechuga-aislado.jpg?s=612x612&w=0&k=20&c=7spdLdTK_iyTUdpdp6cjdHkDE9dCkahoTtnOvQYY8mE=', 'what a fresh day', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post created')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))