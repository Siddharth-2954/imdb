const VITE_TMDB_API_KEY = import.meta.env.VITE_VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const TRENDING_BASE_URL = `${API_BASE_URL}/trending/all/day?api_key=${VITE_TMDB_API_KEY}`;
const SEARCH_BASE_URL = `${API_BASE_URL}/search/multi?api_key=${VITE_TMDB_API_KEY}&language=en-US`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const TMDB = {
  // Fetches movies and TV shows (with optional search term)
  getMoviesAndTV: async (page, searchTerm = "") => {
    const resp = await fetch(
      searchTerm
        ? `${SEARCH_BASE_URL}&query=${searchTerm}&page=${page}`
        : `${TRENDING_BASE_URL}&page=${page}`
    );
    const titles = await resp.json();

    titles.results = titles.results
      .filter((res) => res.media_type !== "person")
      .map((title) => ({
        ...title,
        backdrop_path: title.backdrop_path
          ? IMAGE_BASE_URL + "/w1280" + title.backdrop_path
          : null,
        poster_path: title.poster_path
          ? IMAGE_BASE_URL + "/w342" + title.poster_path
          : null,
        title: title.media_type === "movie" ? title.title : title.name,
      }));

    return titles;
  },

  // Fetches details of a specific title (movie or TV show)
  getTitle: async (type, id) => {
    const resp = await fetch(`${API_BASE_URL}/${type}/${id}?api_key=${VITE_TMDB_API_KEY}`);
    const title = await resp.json();

    if (title) {
      return {
        ...title,
        backdrop_path: title.backdrop_path
          ? IMAGE_BASE_URL + "/w1280" + title.backdrop_path
          : null,
        poster_path: title.poster_path
          ? IMAGE_BASE_URL + "/w500" + title.poster_path
          : null,
        name: type === "movie" ? title.title : title.name,
        runtime: title.runtime !== undefined ? title.runtime : title.episode_run_time[0],
        release_date: title.release_date ? title.release_date : title.first_air_date,
      };
    }
    return null;
  },

  // Fetches a list of actors for a specific title (movie or TV show)
  getActors: async (type, id) => {
    const resp = await fetch(
      `${API_BASE_URL}/${type}/${id}/credits?api_key=${VITE_TMDB_API_KEY}`
    );
    const credits = await resp.json();
    let actors = [];

    if (credits && credits.cast) {
      actors = credits.cast.map((actor) => ({
        ...actor,
        profile_path: actor.profile_path
          ? IMAGE_BASE_URL + "/w185" + actor.profile_path
          : null,
      }));
    }

    return actors;
  },

  // Fetches detailed info about a specific actor
  getActor: async (id) => {
    const respData = await fetch(`${API_BASE_URL}/person/${id}?api_key=${VITE_TMDB_API_KEY}`);
    const respLinks = await fetch(
      `${API_BASE_URL}/person/${id}/external_ids?api_key=${VITE_TMDB_API_KEY}`
    );

    const actorData = await respData.json();
    const actorLinks = await respLinks.json();

    return {
      links: {
        imdb: actorLinks.imdb_id
          ? "http://imdb.com/name/" + actorLinks.imdb_id
          : null,
        twitter: actorLinks.twitter_id
          ? "http://twitter.com/" + actorLinks.twitter_id
          : null,
        instagram: actorLinks.instagram_id
          ? "http://instagram.com/" + actorLinks.instagram_id
          : null,
        facebook: actorLinks.facebook_id
          ? "http://facebook.com/" + actorLinks.facebook_id
          : null,
      },
      data: {
        ...actorData,
        profile_path: actorData.profile_path
          ? IMAGE_BASE_URL + "/h632" + actorData.profile_path
          : null,
      },
    };
  },
};

export default TMDB;