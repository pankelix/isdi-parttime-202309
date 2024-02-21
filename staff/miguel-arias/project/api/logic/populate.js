import mongoose from 'mongoose'
import registerHome from './registerHome.js'
import registerProfile from './registerProfile.js'
import createRoom from './createRoom.js'
import createTemplate from './createTemplate.js'
import createTask from './createTask.js'

import { Home, Room, Profile, Template, Task } from '../data/models.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')
        /* await Home.deleteMany()
        await Room.deleteMany()
        await Profile.deleteMany()
        await Template.deleteMany()
        await Task.deleteMany() */

        //Home
        let mansion
        let casoplon
        let casita
        let pisito
        try {
            mansion = await registerHome('Man Sion', 'man@sion.com', '123123123')
            casoplon = await registerHome('Ca Soplon', 'ca@soplon.com', '123123123')
            casita = await registerHome('Ca Sita', 'ca@sita.com', '123123123')
            pisito = await registerHome('Pi sito', 'pi@sito.com', '123123123')
        } catch (error) {
            console.log(error)
        }

        //Room
        let kidsBathroom
        let adultsBathroom
        let livingRoom
        let terrace
        let yard
        let kitchen
        let diningRoom
        let hall
        let kidsBedroom
        let adultsBedroom
        let office
        try {
            kidsBathroom = await createRoom('kids-bathroom', mansion.id)
            adultsBathroom = await createRoom('adults-bathroom', mansion.id)
            livingRoom = await createRoom('living-room', mansion.id)
            terrace = await createRoom('terrace', mansion.id)
            yard = await createRoom('yard', mansion.id)
            kitchen = await createRoom('kitchen', mansion.id)
            diningRoom = await createRoom('dining-room', mansion.id)
            hall = await createRoom('hall', mansion.id)
            kidsBedroom = await createRoom('kids-bedroom', mansion.id)
            adultsBedroom = await createRoom('adults-bedroom', mansion.id)
            office = await createRoom('office', mansion.id)
        } catch (error) {
            console.log(error)
        }

        //Profile
        let peter
        let wendy
        let michael
        let john
        try {
            peter = await registerProfile('Peter Pan', '1234', 'green', 'admin', mansion.id)
            wendy = await registerProfile('Wendy Darling', '1234', 'blue', 'admin', mansion.id)
            michael = await registerProfile('Michael Darling', '1234', 'white', mansion.id)
            john = await registerProfile('John Darling', '1234', 'pink', mansion.id)
        } catch (error) {
            console.log(error)
        }

        //Template
        let cleanShower
        let dust
        let doDishes
        let lawnRaking
        let changeSheets
        let changeSheets2
        let cleanOven
        try {
            cleanShower = await createTemplate('clean-shower', [kidsBathroom.id, adultsBathroom.id], 14, 15)
            dust = await createTemplate('dust', [livingRoom.id, hall.id, office.id], 4, 5)
            doDishes = await createTemplate('do-dishes', [kitchen.id], 1, 2)
            lawnRaking = await createTemplate('lawn-raking', [terrace.id, yard.id], 28, 15)
            changeSheets = await createTemplate('change-sheets', [kidsBedroom.id], 7, 2)
            changeSheets2 = await createTemplate('change-sheets', [adultsBedroom.id], 7, 2)
            cleanOven = await createTemplate('clean-oven', [kitchen.id], 21, 10)
        } catch (error) {
            console.log(error)
        }

        //Task

        await createTask(cleanShower.id, peter.id)
        await createTask(dust.id, wendy.id)
        await createTask(doDishes.id, michael.id)
        await createTask(lawnRaking.id, john.id)
        await createTask(changeSheets.id, michael.id)
        await createTask(changeSheets2.id, peter.id)
        await createTask(cleanOven.id, wendy.id)

        console.log('database populated')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()