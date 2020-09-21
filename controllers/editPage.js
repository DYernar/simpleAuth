const User = require('../models/UserModel')


module.exports = (req, res) => {
    User.findById(req.session.userId, (error, user)=>{
        res.render('edit', {user: user})
    })
}