import mongoose from 'mongoose'
import { expect } from 'chai'

import authenticateUser from './authenticateUser.js'
import { SystemError, NotFoundError, CredentialsError } from './errors.js'
import { User } from '../data/models.js'

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on correct credentials', () => {
        return User.create({ name: 'Le Chuga', email: 'le@chuga.com', password: '123123123' })
            .then(user => {
                return authenticateUser('le@chuga.com', '123123123')
                    .then(userId => {
                        expect(userId).to.be.a('string')
                        expect(userId).to.have.lengthOf(24)
                        expect(userId).to.equal(user.id)
                    })
            })
    })

    if ('fails on wrong email', () => {
        return authenticateUser('le@chuga.com', '123123123')
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

        after(() => mongoose.disconnect())
})