import mongoose from 'mongoose'
import { expect } from 'chai'

import random from './helpers/random.js'
import retrieveTasks from './retrieveTasks.js'
import { Home, Task, Template } from '../data/models.js'
import { errors } from 'com'
const { NotFoundError } = errors

describe('retrieveTasks', () => {
    before(async () => await mongoose.connect('mongodb://127.0.0.1:27017/spec'))

    beforeEach(() => Promise.all([Home.deleteMany(), Template.deleteMany(), Task.deleteMany()]))

    it('succeeds on existing home and task', async () => {
        const home = await Home.create({ name: random.name(), email: random.email(), password: random.password() })

        const homeId = home._id.toString()

        const name = random.name()

        const template = await Template.create({ home: homeId, name: name, rooms: [random.id(), random.id()], periodicity: 2 })

        const templateId = template._id.toString()

        const task = await Task.create({ home: homeId, template: templateId })

        const retrievedTasks = await retrieveTasks(homeId, 0)
        debugger
        expect(retrievedTasks.length).to.equal(3)
        expect(retrievedTasks).to.deep.equal(retrievedTasks.sort((a, b) => a.date - b.date))
        expect(retrievedTasks[0].home.toString()).to.equal(homeId)
        expect(retrievedTasks[0].template._id.toString()).to.equal(templateId)
        expect(retrievedTasks[0]._id).to.be.undefined
        expect(retrievedTasks[0].assignee).to.be.undefined
        expect(retrievedTasks[0].done).to.be.false
        expect(retrievedTasks[0].delay).to.equal(0)
        expect(retrievedTasks[0].oldId).to.be.undefined
    })

    it('fails on non-existing home', async () => {
        try {
            await retrieveTasks(random.id())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('home not found')
        }
    })

    after(async () => await mongoose.disconnect())
})