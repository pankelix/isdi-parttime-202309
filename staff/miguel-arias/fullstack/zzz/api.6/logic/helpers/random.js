import mongoose from 'mongoose'

function name() {
    return `name-${Math.random()}`
}
function email() {
    return `email-${Math.random()}@mail.com`
}
function password() {
    return `password-${Math.random()}`
}

const { ObjectId } = mongoose.Types

function id() {
    return new ObjectId().toString()
}

function image() {
    return `image-${Math.random()}`
}

function text() {
    return `text-${Math.random()}`
}

const random = {
    name,
    email,
    password,
    id,
    image,
    text
}

export default random