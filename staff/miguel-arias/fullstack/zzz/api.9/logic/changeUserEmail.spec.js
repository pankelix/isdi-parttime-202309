import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import changeUserEmail from './changeUserEmail.js'
import { User } from '../data/models.js'

import { errors } from 'com'
const { NotFoundError } = errors

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
                const newEmailConfirm = email

                return changeUserEmail(user.id, newEmail, newEmailConfirm, user.password)
                    .then(() => {
                        return User.findOne({ newEmail: user.email })
                            .then(user => {
                                expect(user).to.exist
                                expect(user.email).to.equal(email)
                            })
                    })
            })
    })

    it.skip('fails on non existing user', () => {
        const id = random.id()
        const image = random.image()
        const text = random.text()

        return changeUserEmail(id, image, text)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    after(() => mongoose.disconnect())
})