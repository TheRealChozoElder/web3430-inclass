import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { MovieContex } from './MovieList'

export default function MovieForm() {
    let { movies, setMovie } = useContext(MovieContex)
    let { mid } = useParams()

    let movie = mid ? movies.find(m => m.id == mid) : {}
    let [id, setId] = useState(movie.id)
    let [title, setTitle] = useState(movie.title)
    let [year, setYear] = useState(movie.year)
    let [rated, setRated] = useState(movie.rated)
    let [genre, setGenre] = useState(movie.genre)
    let [plot, setPlot] = useState(movie.plot)
    let [poster, setPoster] = useState(movie.poster)
    let [rating, setRating] = useState(movie.rating)
    let [votes, setVotes] = useState(movie.votes)
    let [imdbID, setImdbid] = useState(movie.imdbID)

    const history = useHistory()
    const submit = e => {
        e.preventDefault();
    }
    return (
        <>
            <form onSubmit={submit}>
                <h1>Adding/Editing a movie</h1>

                <div className='field'>
                    <label htmlFor='id'>ID</label>
                    <div className='control'>
                        <input type='number' min='0' name='id' value={id} onChange={e => setId(e.target.value)} />
                        <p className='help'>ID is required</p>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='title'>Title</label>
                    <div className='control'>
                        <input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
                        <p className='help'>Title is required</p>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='year'>Year</label>
                    <div className='control'>
                        <input type='number' min ='0' max='9999'name='year' value={year} onChange={e => setYear(e.target.value)} />
                        <p className='help'>Year is required</p>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='rated'>Rated</label>
                    <div className='control'>
                        <input type='text' name='rated' value={rated} onChange={e => setRated(e.target.value)} />
                        <p className='help'>Rating is required, ratings are G, PG, PG-13, R, and NC17</p>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='genre'>Genre</label>
                    <div className='control'>
                        <input type='text' name='genre' value={genre} onChange={e => setGenre(e.target.value)} />
                        <p className='help'>Genre is required, separate multiple genres with a comma(,)</p>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='plot'>Plot</label>
                    <div className='control'>
                        <textarea type='text' name='plot' value={plot} onChange={e => setPlot(e.target.value)}></textarea>
                        <p className='help'>Plot is required</p>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='poster'>Poster</label>
                    <div className='control'>
                        <input type='url' name='poster' value={poster} onChange={e => setPoster(e.target.value)} />
                        <p className='help'>Poster is required, please use a URL</p>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='rating'>User Rating</label>
                    <div className='control'>
                        <input type='text' name='rating' value={rating} onChange={e => setRating(e.target.value)} />
                        <p className='help'>User Rating is required, scale is 1-10</p>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='votes'>Votes</label>
                    <div className='control'>
                        <input type='number' min='0' name='votes' value={votes} onChange={e => setVotes(e.target.value)} />
                        <p className='help'>Number of votes is required</p>
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='imdbID'>IMDB ID</label>
                    <div className='control'>
                        <input type='text' name='imdbID' value={imdbID} onChange={e => setImdbid(e.target.value)} />
                        <p className='help'>IMDB.com ID is required</p>
                    </div>
                </div>

                <div className='field'>
                    <label></label>
                    <div className='control'>
                        <button className='primary'>Subit</button>
                        <button className='primary' onClick={() => history.push('/movies')}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}