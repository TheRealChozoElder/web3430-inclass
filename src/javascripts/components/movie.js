import React from 'react'
import { FaThumbsUp, FaStar } from 'react-icons/fa'

export default function Movie(props) {
    const onLike = props.onLike
    const onRate = props.onRate
    const m = props.movie
    return (
        <div className="card">
            <img src={m.poster} alt={m.title} />
            <h2>{m.title}</h2>
            <p>{m.plot}</p>
            <ul className="extra">
                <li><FaStar color="maroon" onClick={onRate} /> <strong>{m.rating}</strong> Rating</li>
                <li><strong>{m.votes}</strong> Votes</li>
                <li><FaThumbsUp color="maroon" onClick={onLike} /> <small>{m.likes ? m.likes : 0}</small></li>
            </ul>
        </div>
    )
}