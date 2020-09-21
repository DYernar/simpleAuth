const bcrypt = require('bcrypt')
const User = require("../models/UserModel")

module.exports = (req, res) => {
    const {email, password} = req.body
    User.findOne({email: email}, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user.id
                    res.redirect('/')
                } else {
                    req.session.validationErrors = ['incorrect password']
                    user.password = ""
                    req.session.user = user
                    res.redirect('/auth/login')
                }
            })
        } else {
            req.session.validationErrors = ['user with such email is not found!']
            req.body.password = ""
            req.session.user = req.body
            res.redirect('/auth/login')
        }
    })
}