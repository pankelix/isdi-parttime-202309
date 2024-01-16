const mongoose = require ('mongoose')

const registerUser = require ('./registerUser')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            registerUser('Le Chuga', 'le@chuga.com', '123123123', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user registered')
            })
        } catch (error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))