module.exports = (req, res) => {
    res.render('login', {errors: req.session.validationErrors, user: req.session.user})
}