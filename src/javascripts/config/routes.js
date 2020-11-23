import express from 'express'

import { contactPage, aboutPage, indexPage } from '../controllers/index'
import { contactAPI } from '../controllers/contacts'
import { allMoviesAPI, oneMovieAPI, createMovieAPI, updateMovieAPI, deleteMovieAPI } from '../controllers/movies'
import { registerUserAPI, signUserInAPI } from '../controllers/users'
import { jwt } from 'jsonwebtoken'

let router = express.Router()

function isSignedIn(req) {
    try {
        jwt.verify(req.headers.authorization.split(' ')[1], APP_SECRET)
        return true
    } catch (err) {
        try {
            jwt.verify(req.cookies.token, APP_SECRET)
            return true
        } catch (err) {
            return false
        }
    }
}

export function configureRoutes(app) {
    app.all('*', (req, res, next) => {
        app.locals.signedIn = isSignedIn(req)
        next()
    })
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)

    router.get('/movies*', indexPage)
    router.get('/register', indexPage)
    router.get('/signin', indexPage)

    router.get('/api/movies', allMoviesAPI)
    router.get('/api/movies/:id', oneMovieAPI)
    router.post('/api/movies', createMovieAPI)
    router.put('/api/movies/:id', updateMovieAPI)
    router.delete('/api/movies/:id', deleteMovieAPI)

    router.post('/api/register', registerUserAPI)
    router.post('/api/signin', signUserInAPI)

    router.post('/api/contact', contactAPI)

    app.use('/', router)
}