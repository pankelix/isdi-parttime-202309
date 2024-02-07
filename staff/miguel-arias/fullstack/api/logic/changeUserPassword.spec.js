import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import changeUserPassword from './changeUserPassword.js'
import { User } from '../data/models.js'

import { errors } from 'com'
const { NotFoundError, ContentError } = errors

describe('changeUserPassword', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on correct data', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        return User.create({ name, email, password })
            .then(user => {
                const newPassword = random.password()
                const newPasswordConfirm = newPassword

                return changeUserPassword(user.id, newPassword, newPasswordConfirm, user.password)
                    .then(() => {
                        return User.findById(user.id)
                            .then(user2 => {
                                expect(user2.password).to.equal(newPassword)
                            })
                    })
            })
    })

    it('fails on non existing user', () => {
        const id = random.id()
        const newPassword = random.password()
        const newPasswordConfirm = newPassword
        const password = random.password()

        return changeUserPassword(id, newPassword, newPasswordConfirm, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on password and its confirmation not matching', () => {
        const id = random.id()
        const newPassword = random.password()
        const newPasswordConfirm = random.password()
        const password = random.password()

        return changeUserPassword(id, newPassword, newPasswordConfirm, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('new password and its confirmation do not match')
            })
    })

    it.skip('fails on wrong password', () => {

    })

    after(() => mongoose.disconnect())
})