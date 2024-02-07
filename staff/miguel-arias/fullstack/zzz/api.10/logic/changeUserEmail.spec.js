import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import changeUserEmail from './changeUserEmail.js'
import { User } from '../data/models.js'

import { errors } from 'com'
const { NotFoundError, ContentError } = errors

describe('changeUserEmail', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on correct data', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        return User.create({ name, email, password })
            .then(user => {
                const newEmail = random.email()
                const newEmailConfirm = newEmail

                return changeUserEmail(user.id, newEmail, newEmailConfirm, user.password)
                    .then(() => {
                        return User.findById(user.id)
                            .then(user2 => {
                                expect(user2.email).to.equal(newEmail)
                            })
                    })
            })
    })

    it('fails on non existing user', () => {
        const id = random.id()
        const newEmail = random.email()
        const newEmailConfirm = newEmail
        const password = random.password()

        return changeUserEmail(id, newEmail, newEmailConfirm, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on email and its confirmation not matching', () => {
        const id = random.id()
        const newEmail = random.email()
        const newEmailConfirm = random.email()
        const password = random.password()

        return changeUserEmail(id, newEmail, newEmailConfirm, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('new email and its confirmation do not match')
            })
    })

    it.skip('fails on wrong password', () => {

    })

    after(() => mongoose.disconnect())
})