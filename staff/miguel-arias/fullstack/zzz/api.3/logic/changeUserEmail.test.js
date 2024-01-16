const mongoose = require('mongoose')

const changeUserEmail = require('./changeUserEmail')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            changeUserEmail('658f0f0ff58499e7aacac4f6', "ma@zorca3.com", "ma@zorca3.com", "123123123", error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('email changed')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))