import React from 'react'

export function Movie(props) {
    const m = props.movie
    return (
        <div className="card">
            <img src={m.poster} alt={m.title} />
            <h2>{m.title}</h2>
            <p>{m.plot}</p>
            <ul className="extra">
                <li><strong>{m.rating}</strong> Rating</li>
                <li><strong>{m.votes}</strong> Votes</li>
                <li><button className="primary">Select</button></li>
            </ul>
        </div>
    )
}