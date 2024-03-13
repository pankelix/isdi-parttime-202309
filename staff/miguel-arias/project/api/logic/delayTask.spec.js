import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'

import { addDay } from '@formkit/tempo'

import random from './helpers/random.js'
import delayTask from './delayTask.js'
import { Profile, Template, Task } from '../data/models.js'

import { errors } from 'com'
const { NotFoundError, PermissionError } = errors
debugger
describe('delayTask', () => {
    before(() => mongoose.connect('mongodb://127.0.0.1:27017/spec'))

    beforeEach(() => Promise.all([Profile.deleteMany(), Task.deleteMany()]))

    it.skip('succeeds on existing profile and template', async () => {
        const profile = await Profile.create({ home: random.id(), name: random.name(), pincode: random.pincode() })

        const profileId = profile._id.toString()

        const template = await Template.create({ home: random.id(), name: random.name(), rooms: [random.id(), random.id()] })

        const templateId = template._id.toString()

        const task = await Task.create({ home: random.id(), template: templateId, assignee: random.id() })

        const taskId = task._id.toString()
        debugger
        expect(task.date).to.equal(new Date())
        expect(task.delay).to.equal(0)

        const date = (addDay(new Date(), 1))

        await delayTask(profileId, taskId, date)

        const taskFound = await Template.findById(templateId)

        expect(taskFound.date).to.equal(date)
        expect(taskFound.delay).to.equal(1)
    })

    it('fails on non existing profile', async () => {
        try {
            await delayTask(random.id(), random.id())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('profile not found')
        }
    })

    it('fails on non existing task', async () => {
        const profile = await Profile.create({ home: random.id(), name: random.name(), pincode: random.pincode(), role: 'admin' })

        const profileId = profile._id.toString()

        try {
            await delayTask(profileId, random.id())
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('task not found')
        }

    })

    after(async () => await mongoose.disconnect())
})