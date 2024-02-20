import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import createTemplate from './createTemplate.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')

        await createTemplate('Limpiar ducha', ['65d4f9f6f620be020216951e', '65d4f9f6f620be0202169521'], 14, 15)
        await createTemplate('Quitar polvo', ['65d4f9f6f620be0202169524', '65d4f9f6f620be020216952e', '65d4f9f6f620be0202169536'], 4, 5)
        await createTemplate('Fregar platos', ['65d4f9f6f620be020216952c'], 1, 2)
        await createTemplate('Recoger hojas', ['65d4f9f6f620be020216952a', '65d4f9f6f620be0202169527'], 28, 15)
        await createTemplate('Cambiar sábanas', ['65d4f9f6f620be0202169532'], 7, 2)
        await createTemplate('Cambiar sábanas', ['65d4f9f6f620be0202169534'], 7, 2)
        await createTemplate('Limpiar horno', ['65d4f9f6f620be020216952c'], 21, 10)

        console.log('template registered')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()