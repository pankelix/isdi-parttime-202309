import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import toggleLikePost from './toggleLikePost.js'

//test manual caca

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => {
        try {
            toggleLikePost('658e003d92e90fd57c67a684', '658f397b09527317a285ddfe')
                .then(() => console.log('post like toggled'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))