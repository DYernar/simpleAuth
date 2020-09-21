const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost/mobbypark_database', {useNewUrlParser:true, useUnifiedTopology: true})
mongoose.set('useCreateIndex', true)

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true
    },
    secondname: {
        type: String,
        required: true,
    },
    telnum: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User