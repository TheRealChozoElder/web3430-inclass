import { connect } from './src/javascripts/config/db/connect'
import { Movie } from './src/javascripts/models/movie'

connect("mongodb://localhost:27017/topmovies")

Movie.find().exec((err, movies) => {
    if (err) {
        console.log(err)
    } else {
        console.log(movies)
    }
})

Movie.findOne({ title: "The Godfather" }).exec((err, movie) => {
    if (err) {
        console.log(err)
        return
    }
    movie.reviews.push({
        comment: "This is a test comment",
        posted_at: new Date()
    })

    movie.save(err => {
        if (err) {
            console.log('Unable to save')
        } else {
            console.log("Movies successfully saved")
        }
    })
})