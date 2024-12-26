import React, { useEffect, useState } from "react";
import TMDB from "../API";
import ActorItem from "./ActorItem";

const ActorList = ({ type, id }) => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const actorData = await TMDB.getActors(type, id); // Fetch actors from TMDB API
        if (actorData.length === 0) {
          setError("No actors found");
        } else {
          setActors(actorData);
        }
      } catch (err) {
        setError("Error fetching actors");
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, [type, id]);

  if (loading) return <p>Loading actors...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Cast</h2>
      {actors.length === 0 ? (
        <p>No actors found</p>
      ) : (
        <div>
          {actors.map((actor) => (
            <ActorItem key={actor.id} actor={actor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActorList;
