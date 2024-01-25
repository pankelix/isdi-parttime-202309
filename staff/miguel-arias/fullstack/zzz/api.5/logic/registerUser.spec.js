import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'

import random from './helpers/random.js'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'
import { DuplicityError } from './errors.js'

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on correct credentials', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        return registerUser(name, email, password)
            .then(() => {
                return User.findOne({ email })
                    .then(user => {
                        expect(user).to.exist
                        expect(user.name).to.equal(name)
                        expect(user.email).to.equal(email)
                        expect(user.password).to.equal(password)
                    })
            })
    })

    it('fails on already existing user', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        return User.create({ name, email, password })
            .then(() => {
                return registerUser(name, email, password)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceOf(DuplicityError)
                        expect(error.message).to.equal('user already exists')
                    })
            })
    })

    after(() => mongoose.disconnect())
})