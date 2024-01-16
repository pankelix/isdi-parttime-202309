const mongoose = require('mongoose')

const changeUserPassword = require('./changeUserPassword')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            changeUserPassword('658f0f0ff58499e7aacac4f6', '123123123', '345345345', '345345345', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('password changed')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))