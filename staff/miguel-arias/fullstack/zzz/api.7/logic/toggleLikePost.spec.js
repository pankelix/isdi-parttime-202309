import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'

import random from './helpers/random.js'
import toggleLikePost from './toggleLikePost.js'
import { Post, User } from '../data/models.js'

import { errors } from 'com'
const { NotFoundError } = errors

describe('toggleLikePost', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and post', () => {
        
        return Promise.all([
            User.create({ name: random.name(), email: random.email(), password: random.password() }),
            User.create({ name: random.name(), email: random.email(), password: random.password() })
        ])
            .then(([user1, user2]) => {
                return Promise.all([
                    Post.create({ author: user1.id, image: random.image(), text: random.text() }),
                    Post.create({ author: user1.id, image: random.image(), text: random.text() }),
                    Post.create({ author: user2.id, image: random.image(), text: random.text() })
                ])
                    .then(([post1, post2, post3]) => {
                        return toggleLikePost(user1.id, post3.id)
                            .then(value => {
                                expect(value).to.be.undefined

                                return Post.findById(post3.id)
                                    .then(post3 => {
                                        const userIdExists = post3.likes.some(userObjectId => userObjectId.toString() === user1.id)

                                        expect(userIdExists).to.be.true
                                    })
                            })
                            .then(() => {
                                return toggleLikePost(user1.id, post3.id)
                                    .then(value => {
                                        expect(value).to.be.undefined

                                        return Post.findById(post3.id)
                                            .then(post3 => {
                                                const userIdExists = post3.likes.some(userObjectId => userObjectId.toString() === user1.id)

                                                expect(userIdExists).to.be.false
                                            })
                                    })
                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        return Post.create({ author: random.id(), image: random.image(), text: random.text() })
            .then(post => {
                return toggleLikePost(random.id(), post.id)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            })
    })


    it('fails on non-existing post', () => {
        return User.create({ name: random.name(), email: random.email(), password: random.password() })
            .then(user => {
                return toggleLikePost(user.id, random.id())
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('post not found')
                    })
            })
    })

    after(() => mongoose.disconnect())
})