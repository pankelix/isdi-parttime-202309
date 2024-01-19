import mongoose from 'mongoose'

import toggleLikePost from './toggleLikePost.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost('658e003d92e90fd57c67a684', '658f397b09527317a285ddfe', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post like toggled')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))