const User = require("../models/UserModel")
const path = require('path')

module.exports = (req, res) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(req.body.email).toLowerCase())) {
        req.session.validationErrors  = ['invalid email']
        return res.redirect('/auth/register')
    }
    User.create(req.body, (error, user) => {
        req.session.validationErrors = []
        req.session.user = {}
        if (error) {
            if (error.name == 'MongoError' && error.code == 11000) {
                req.session.validationErrors = ['email already exists']
                res.redirect('/auth/register')
            } else if (error.name = 'ValidationError') {
                if (req.body.email == "" ) {
                    req.session.validationErrors = ['email is required']
                }
    
                if (req.body.password == "" ) {
                    req.session.validationErrors.push('password is required')
                }
    
                if (req.body.firstname == "") {
                    req.session.validationErrors.push('firstname is required!')
                }
    
                if (req.body.secondname == "") {
                    req.session.validationErrors.push('secondname is required!')
                }
                if (req.body.telnum == "") {
                    req.session.validationErrors.push('telnum is required!')
                }
                req.session.user = req.body
                return res.redirect('/auth/register')
            }
        }
         else {
            res.redirect('/')
        }
    })
}