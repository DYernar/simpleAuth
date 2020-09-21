const User = require('../models/UserModel')

module.exports = (req, res) => {
    User.findById(req.session.userId, (error, user) => {
        user.password = ""
        res.render('profile', {user: user})
    })
}