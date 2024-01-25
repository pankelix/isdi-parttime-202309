import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'

import random from './helpers/random.js'
import deletePost from './deletePost.js'
import { Post, User } from '../data/models.js'
import { NotFoundError } from './errors.js'

describe('deletePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST))

    /* beforeEach(() => User.deleteMany().then(() => Post.deleteMany())) // in series, para cuando necesitas que primero acabe una porque está relacionada con la otra */
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()])) // in paralell, para cuando no están relacionadas una con la otra

    it('succeeds on existing user and post', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const image = random.image()
        const text = random.text()

        return User.create({ name, email, password })
            .then(user => {
                return Post.create({ author: user.id, image, text })
                    .then(post => {
                        expect(post).to.exist
                        expect(post.image).to.equal(image)
                        expect(post.text).to.equal(text)

                        return deletePost(user.id, post.id)
                            .then(value => {
                                expect(value).to.be.undefined

                                return Post.findById(post.id)
                                    .then(post => {
                                        expect(post).to.be.null
                                    })
                            })
                    })
            })
    })

    it('fails on non existing user', () => {
        const id = random.id()
        const image = random.image()
        const text = random.text()

        return Post.create({ author: id, image, text })
            .then(post => {
                return deletePost(id, post.id)
                    .then(post => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            })
    })

    it('fails on non existing post', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const id = random.id()

        return User.create({ name, email, password })
            .then(user => {
                return deletePost(user.id, id)
                    .then(post => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('post not found')
                    })
            })
    })

    after(() => mongoose.disconnect())
})