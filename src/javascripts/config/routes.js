import express from 'express'

import { contactPage, aboutPage, indexPage } from '../controllers/index'
import { contactAPI } from '../controllers/contacts'
import { allMoviesAPI } from '../controllers/movies'

let router = express.Router()

export function configureRoutes(app) {
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/movies*', indexPage)
    router.get('/api/movies', allMoviesAPI)
    router.post('/api/contact', contactAPI)

    app.use('/', router)
}