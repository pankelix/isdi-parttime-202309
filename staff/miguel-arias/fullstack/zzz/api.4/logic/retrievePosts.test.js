import mongoose from 'mongoose'

import retrievePosts from './retrievePosts.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        try {
            retrievePosts('658f0f0ff58499e7aacac4f6', (error, posts) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('retrieved posts', posts)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

    