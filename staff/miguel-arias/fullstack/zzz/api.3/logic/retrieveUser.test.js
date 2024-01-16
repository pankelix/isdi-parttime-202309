const mongoose = require('mongoose')

const retrieveUser = require('./retrieveUser')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            retrieveUser('658e003d92e90fd57c67a684', (error, user) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user retrieved', user)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))