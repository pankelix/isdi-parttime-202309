import mongoose from 'mongoose'

const { Schema, model, ObjectId } = mongoose

const home = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    rooms: [{
        type: String
    }]
})

const room = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    home: {
        type: ObjectId,
        ref: 'home'
    }
})

const profile = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pincode: {
        type: String,
        required: true,
        length: 4
    },
    color: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    home: {
        type: ObjectId,
        ref: 'home'
    }
})

const template = new Schema({
    name: {
        type: String,
        required: true
    },
    rooms: [{
        type: ObjectId,
        ref: 'room'
    }],
    periodicity: {
        type: Number
    },
    points: {
        type: Number
    }
})

const task = new Schema({
    template: {
        type: ObjectId,
        ref: 'template'
    },
    assignee: {
        type: ObjectId,
        ref: 'profile'
    },
    done: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const Home = model('Home', home)
const Room = model('Room', room)
const Profile = model('Profile', profile)
const Template = model('Template', template)
const Task = model('Task', task)

export {
    Home, Room, Profile, Template, Task
}