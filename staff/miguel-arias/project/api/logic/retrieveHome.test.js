import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveHome from './retrieveHome.js'

(async () => {
    try {
        await mongoose.connect(process.env.TEST_MONGODB_URL)

        const home = await retrieveHome('65ce71afd41bf127058a2821')
        console.log('home retrieved', home)

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()