const mongoose = require ('mongoose')

const toggleFavPost = require ('./toggleFavPost')

mongoose.connect('mongodb://127.0.0.1:27017/test')
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