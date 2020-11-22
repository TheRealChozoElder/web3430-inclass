import { Movie } from '../models/movie'

export const allMoviesAPI = (req, res, next) => {
    Movie.find().select('-reviews').exec((err, movies) => {
        if (err) {
            res.json({ success: false, message: "Querry failed" })
            res.end()
        } else {
            res.write(JSON.stringify(movies))
            res.end()
        }
    })
}

export const oneMovieAPI = (req, res, next) => {
    Movie.find({ _id: req.params.id }).select('-reviews').exec((err, movie) => {
        if (err) {
            res.json({ success: false, message: "Querry failed" })
            res.end()
        } else {
            res.write(JSON.stringify(movie))
            res.end()
        }
    })
}

export const createMovieAPI = (req, res, next) => {
    let movie = new Movie(req.body)
    movie.added_at = new Date()
    movie.updated_at = new Date()
    movie.save(err => {
        if (err) {
            res.json({ success: false, message: "Movie failed to save" })
            res.end()
        } else {
            res.end()
        }
    })
}

export const updateMovieAPI = (req, res, next) => {
    Movie.findOne({ _id: req.params.id }).select('-reviews').exec((err, movie) => {
        if (err) {
            res.json({ success: false, message: "Update failed" })
            res.end()
        } else {
            Object.assign(movie, req.body)
            movie.updated_at = new Date()
            movie.save(err => {
                if (err) {
                    res.json({ success: false, message: "Movie failed to update" })
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}

export const deleteMovieAPI = (req, res, next) => {
    Movie.findOne({ _id: req.params.id }).select('-reviews').exec((err, movie) => {
        if (err) {
            res.json({ success: false, message: "Delete failed" })
            res.end()
        } else {
            Movie.findByIdAndDelete(req.params.id, err => {
                if (err) {
                    res.json({ success: false, message: "Movie failed to delete" })
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}