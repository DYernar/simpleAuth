const User = require("../models/UserModel")

module.exports = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/')
    } 
    next()
}