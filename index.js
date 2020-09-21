const express = require('express')

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const { title } = require('process')

const ejs = require('ejs')
app.set('view engine', 'ejs')

const expressSession = require('express-session');
app.use(expressSession({
    secret: 'MobbyPark auth',
    resave: true,
    saveUninitialized: true
}))

app.listen(8080, () =>  {
    console.log("listening on port 8080")
})

global.loggedIn = null

app.use('*', (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

app.use(express.static('public'))

const homePageController = require('./controllers/home')
const loginPageController = require('./controllers/loginPage')
const loginUserController = require('./controllers/loginUser')
const registerPageController = require('./controllers/registerPage')
const storeUserController = require('./controllers/storeUser')
const profilePageController = require('./controllers/profilePage')
const logoutController = require('./controllers/logout')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const editPageController = require('./controllers/editPage')
const editProfileController = require('./controllers/editProfile.js')

const authMiddleWare = require('./middleware/authMiddleWare')

app.get('/', homePageController)

app.get('/auth/register', redirectIfAuthenticated, registerPageController)
app.post('/auth/register', redirectIfAuthenticated, storeUserController)


app.get('/auth/login', redirectIfAuthenticated, loginPageController)
app.post('/auth/login',redirectIfAuthenticated, loginUserController)

app.get('/auth/logout', logoutController)

app.get('/profile', authMiddleWare, profilePageController)
app.get('/profile/edit', authMiddleWare, editPageController)
app.post('/profile/edit', authMiddleWare, editProfileController)
