import React from 'react'

function ActorItem({actor, onRemove}) {
  return (
    <div>
      <h3>{actor.name}</h3>
      <p>Movies: {actor.movies.join(", ")} </p>
      <button onClick={onRemove}></button>
    </div>
  )
}

export default ActorItem
