const mongoose = require ('mongoose')

const authenticateUser = require ('./authenticateUser')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            authenticateUser('le@chuga.com', '123123123', (error, userId) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user authenticated', userId)
            })
        } catch (error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))