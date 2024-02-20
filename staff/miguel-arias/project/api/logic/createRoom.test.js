import mongoose from 'mongoose'
import createRoom from './createRoom.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')

        await createRoom('baño-niños', '65ce71afd41bf127058a2821')
        await createRoom('baño-adultos', '65ce71afd41bf127058a2821')
        await createRoom('salon', '65ce71afd41bf127058a2821')
        await createRoom('terraza', '65ce71afd41bf127058a2821')
        await createRoom('patio', '65ce71afd41bf127058a2821')
        await createRoom('cocina', '65ce71afd41bf127058a2821')
        await createRoom('comedor', '65ce71afd41bf127058a2821')
        await createRoom('hall', '65ce71afd41bf127058a2821')
        await createRoom('dormitorio-niños', '65ce71afd41bf127058a2821')
        await createRoom('dormitorio-adultos', '65ce71afd41bf127058a2821')
        await createRoom('despacho', '65ce71afd41bf127058a2821')

        console.log('room created')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()