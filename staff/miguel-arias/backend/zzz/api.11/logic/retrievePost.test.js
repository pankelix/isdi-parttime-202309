const mongoose = require('mongoose')

const retrievePost = require('./retrievePost')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            retrievePost('658dfaabe0de27c6ce263632', (error, post) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post retrieved', post)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))