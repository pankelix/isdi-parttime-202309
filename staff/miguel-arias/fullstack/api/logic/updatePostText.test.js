const mongoose = require('mongoose')

const updatePostText = require('./updatePostText')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            updatePostText('658956f7eed889536efe91d7', '65895deeeed889536efe91dd', '123', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('text updated')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))