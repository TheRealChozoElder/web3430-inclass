import React from "react";

export default function StarRating(props) {
  const onRate = props.onRate
  
  return (
    <>
      {movies.map((m, i) => {
        return <Movie key={m.id} movie={m} onRate={
          () => {
            movies[i].rates = movies[i].rates< Math.floor(rating / 2) - 1 ? "maroon"  : "gray"
            setMovies(movies.map(m => m))
          }
        } />
      })}
    </>
  )
}