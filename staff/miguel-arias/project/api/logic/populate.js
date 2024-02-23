import mongoose from 'mongoose'
import registerHome from './registerHome.js'
import registerProfile from './registerProfile.js'
import createRoom from './createRoom.js'
import createTemplate from './createTemplate.js'
import createTask from './createTask.js'

import { Home, Room, Profile, Template, Task } from '../data/models.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/project')
        await Home.deleteMany()
        await Room.deleteMany()
        await Profile.deleteMany()
        await Template.deleteMany()
        await Task.deleteMany()

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
            debugger
            kidsBathroom = await createRoom(mansion.id, 'kids-bathroom')
            adultsBathroom = await createRoom(mansion.id, 'adults-bathroom')
            livingRoom = await createRoom(mansion.id, 'living-room')
            terrace = await createRoom(mansion.id, 'terrace')
            yard = await createRoom(mansion.id, 'yard')
            kitchen = await createRoom(mansion.id, 'kitchen')
            diningRoom = await createRoom(mansion.id, 'dining-room')
            hall = await createRoom(mansion.id, 'hall')
            kidsBedroom = await createRoom(mansion.id, 'kids-bedroom')
            adultsBedroom = await createRoom(mansion.id, 'adults-bedroom')
            office = await createRoom(mansion.id, 'office')
        } catch (error) {
            console.log(error)
        }

        //Profile
        let peter
        let wendy
        let michael
        let john
        try {
            peter = await registerProfile(mansion.id, 'Peter Pan', '1234', 'green', 'admin')
            wendy = await registerProfile(mansion.id, 'Wendy Darling', '1234', 'blue', 'admin')
            michael = await registerProfile(mansion.id, 'Michael Darling', '1234', 'white')
            john = await registerProfile(mansion.id, 'John Darling', '1234', 'pink')
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
            cleanShower = await createTemplate(mansion.id, 'clean-shower', [kidsBathroom.id, adultsBathroom.id], 14, 15)
            dust = await createTemplate(mansion.id, 'dust', [livingRoom.id, hall.id, office.id], 4, 5)
            doDishes = await createTemplate(mansion.id, 'do-dishes', [kitchen.id], 1, 2)
            lawnRaking = await createTemplate(mansion.id, 'lawn-raking', [terrace.id, yard.id], 28, 15)
            changeSheets = await createTemplate(mansion.id, 'change-sheets', [kidsBedroom.id], 7, 2)
            changeSheets2 = await createTemplate(mansion.id, 'change-sheets', [adultsBedroom.id], 7, 2)
            cleanOven = await createTemplate(mansion.id, 'clean-oven', [kitchen.id], 21, 10)
        } catch (error) {
            console.log(error)
        }

        //Task

        await createTask(mansion.id, cleanShower.id, peter.id)
        await createTask(mansion.id, dust.id, wendy.id)
        await createTask(mansion.id, doDishes.id, michael.id)
        await createTask(mansion.id, lawnRaking.id, john.id)
        await createTask(mansion.id, changeSheets.id, michael.id)
        await createTask(mansion.id, changeSheets2.id, peter.id)
        await createTask(mansion.id, cleanOven.id, wendy.id)

        console.log('database populated')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()