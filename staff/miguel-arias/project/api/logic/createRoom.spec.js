import mongoose from 'mongoose'
import { expect } from 'chai'

import random from './helpers/random.js'
import createRoom from './createRoom.js'
import { Home, Room } from "../data/models.js"

describe('createRoom', async () => {
    before(async () => await mongoose.connect('mongodb://127.0.0.1:27017/test'))

    beforeEach(async () => await Room.deleteMany())

    it('succeeds on correct data', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        await Home.create({ name, email, password })

        let home = await Home.findOne({ name: name }).lean()

        const roomName = random.name()
        const homeId = home._id.toString()

        await createRoom(roomName, homeId)

        const room = await Room.findOne({ name: roomName })
        const home2 = await Home.findOne({ name: name }).lean()

        expect(room).to.exist
        expect(room.name).to.equal(roomName)
        expect(room.home._id.toString()).to.equal(homeId)

        expect(home2.rooms.length).to.equal(1)

        expect(home2.rooms[0].toString()).to.include(room._id.toString())

        /* const room = await Room.find({ _id: { $in: home.rooms }}) */
    })

    after(async () => await mongoose.disconnect())
})