import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { MovieContext } from './MovieList'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as yup from 'yup'
toast.configure()

export function VHelp({ message }) {
    return <p className='help'>{message}</p>
}

const validationSchema = yup.object({
    // id: yup.number().required("ID is required"),
    title: yup.string().required("Title is required"),
    year: yup.number().required("Year is required and between 1900 and current year").min(1900).max(new Date().getFullYear()),
    rated: yup.string().required("Rating is required, ratings are G, PG, PG-13, R, and NC17"),
    genre: yup.string().required("Genre is required, separate multiple genres with a comma(,)"),
    plot: yup.string().required("Plot is required"),
    poster: yup.string().url().required("Poster is required, please use a URL"),
    rating: yup.number().required("User Rating is required, scale is 1-10 with 10 being the best").min(0).max(10),
    votes: yup.number().required("Number of votes is required").min(0),
    imdbID: yup.string().required("IMDB.com ID is required"),
    releaseDate: yup.date().required()

})
export default function MovieForm() {
    let { movies, setMovies, authenticated, setAuthenticated } = useContext(MovieContext)
    let { mid } = useParams()

    if(!authenticated){
        document.location = '/signin'
        return<></>
    }

    let movie = mid ? movies.find(m => m.id == mid) : {}
    let is_new = mid === undefined
    let { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
        initialValues: is_new ? {
            // id: "",
            title: "",
            year: new Date().getFullYear(),
            rated: "",
            genre: "",
            plot: "",
            poster: "",
            rating: "",
            votes: "",
            imdbID: "",
            releaseDate: ""
        } : { ...movie },

        validationSchema,

        onSubmit(values) {
            fetch(`/api/movies${is_new ? '' : '/' + movie.id}`, {
                method: is_new ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }).then(() => {
                toast('Successfully submitted', {
                    onClose: () => {
                        document.location = "/movies"
                    }
                })
            }).catch((error) => {
                toast('Failed to submit', {
                    onClose: () => {
                        document.location = "/movies"
                    }
                })
            })
        }
    })

    const history = useHistory()

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Adding/Editing a movie</h1>

                {/* <div className='field'>
                    <label htmlFor='id'>ID</label>
                    <div className='control'>
                        <input type='text' name='id' value={values.id} onChange={handleChange} />
                        <VHelp message={errors.id} />
                    </div>
                </div> */}

                <div className='field'>
                    <label htmlFor='title'>Title</label>
                    <div className='control'>
                        <input type='text' name='title' value={values.title} onChange={handleChange} />
                        <VHelp message={errors.title} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='releaseDate'>Release Date</label>
                    <div className='control'>
                        <DatePicker name='releaseDate' selected={values.releaseDate} onChange={date => setFieldValue('releaseDate', date)} />
                        <VHelp message={errors.releaseDate} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='year'>Year</label>
                    <div className='control'>
                        <input type='text' name='year' value={values.year} onChange={handleChange} />
                        <VHelp message={errors.year} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='rated'>Rated</label>
                    <div className='control'>
                        <input type='text' name='rated' value={values.rated} onChange={handleChange} />
                        <VHelp message={errors.rated} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='genre'>Genre</label>
                    <div className='control'>
                        <input type='text' name='genre' value={values.genre} onChange={handleChange} />
                        <VHelp message={errors.genre} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='plot'>Plot</label>
                    <div className='control'>
                        <textarea type='textarea' name='plot' value={values.plot} onChange={handleChange}></textarea>
                        <VHelp message={errors.plot} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='poster'>Poster</label>
                    <div className='control'>
                        <input type='url' name='poster' value={values.poster} onChange={handleChange} />
                        <VHelp message={errors.poster} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='rating'>User Rating</label>
                    <div className='control'>
                        <input type='text' name='rating' value={values.rating} onChange={handleChange} />
                        <VHelp message={errors.rating} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='votes'>Votes</label>
                    <div className='control'>
                        <input type='text' name='votes' value={values.votes} onChange={handleChange} />
                        <VHelp message={errors.votes} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='imdbID'>IMDB ID</label>
                    <div className='control'>
                        <input type='text' name='imdbID' value={values.imdbID} onChange={handleChange} />
                        <VHelp message={errors.imdbID} />
                    </div>
                </div>

                <div className='field'>
                    <label></label>
                    <div className='control'>
                        <button className='primary' type='submit'>Submit</button>
                        <button className='primary' onClick={() => history.push('/movies')}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}