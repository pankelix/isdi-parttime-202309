import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import createTemplate from './createTemplate.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')

        await createTemplate('65d79ed33377222a975829fa', 'Limpiar ducha', 3, 'week', ['65d79ed33377222a97582a02', '65d79ed33377222a97582a04'], 15)

        //homeId, name, rooms, periodicityNumber, periodicityRange, points

        console.log('template registered')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()