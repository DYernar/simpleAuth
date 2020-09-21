const User = require('../models/UserModel')
const path = require('path')

module.exports = (req, res) => {
    User.findByIdAndUpdate(req.session.userId, req.body, (error, user) => {
        if (error) {
            console.log("some error" ,err)
        }
        res.redirect('/profile')
    })
}