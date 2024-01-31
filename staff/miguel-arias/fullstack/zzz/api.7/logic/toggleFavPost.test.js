import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import toggleFavPost from './toggleFavPost.js'

//manual caca

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => {
        try {
            toggleFavPost('658f397b09527317a285ddfe', '658e003d92e90fd57c67a684')
                .then(() => console.log('post fav toggled'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))