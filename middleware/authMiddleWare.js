const User = require('../models/UserModel')

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            console.log('unauthorized!')
            return res.redirect('/')
        } 
        next()
    })
}