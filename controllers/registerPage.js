module.exports = (req, res) => {
    res.render('register', {errors: req.session.validationErrors, user: req.session.user})
}