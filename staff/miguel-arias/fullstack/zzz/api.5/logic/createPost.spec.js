import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import createPost from './createPost.js'
import { Post, User } from '../data/models.js'
import { NotFoundError } from './errors.js'

describe('createPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST))

    beforeEach(() => Post.deleteMany())

    it('succeeds on existing user', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        return User.create({ name, email, password })
            .then(user => {
                const image = random.image()
                const text = random.text()

                return createPost(user.id, image, text)
                    .then(value => {
                        expect(value).to.be.undefined

                        return Post.findOne({ author: user.id })
                            .then(post => {
                                expect(post).to.exist
                                expect(post.image).to.equal(image)
                                expect(post.text).to.equal(text)
                            })
                    })
            })
    })

    it('fails on non existing user', () => {
        const id = random.id()
        const image = random.image()
        const text = random.text()

        return createPost(id, image, text)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    after(() => mongoose.disconnect())
})