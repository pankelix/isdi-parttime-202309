import mongoose from 'mongoose'

import toggleFavPost from './toggleFavPost.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        try {
            toggleFavPost('658f397b09527317a285ddfe', '658e003d92e90fd57c67a684', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post fav toggled')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))