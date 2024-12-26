import React, { useEffect, useState } from "react";
import TMDB from "../API";  // Ensure the path is correct
import ActorList from "./ActorList";  // Import ActorList

const MovieDetails = ({ type, id }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await TMDB.getTitle(type, id);
      setMovie(data);
    };
    fetchMovieDetails();
  }, [type, id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.name}</h1>
      <img src={movie.poster_path} alt={movie.name} />
      <p>{movie.runtime} minutes</p>
      <p>{movie.release_date}</p>

      {/* Add ActorList to show the actors */}
      <ActorList type={type} id={id} />
    </div>
  );
};

export default MovieDetails;
