import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Movie from "./movie";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  genres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Drama: 18,
    Fantasy: 14,
    History: 36
  };

  updateGenre(e, genre) {
    this.getMoviesByGenre(this.genres[genre]);
  }

  getMoviesByGenre = query => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${query}&api_key=cfe422613b250f702980a3bbf9e90716`
      )
      .then(res =>
        this.setState({
          movies: res.data.results
        })
      );
  };

  getPopularMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716"
      )
      .then(res => {
        this.setState({
          movies: res.data.results
        });
      });
  };

  componentDidMount() {
    this.getPopularMovies();
  }

  render() {
    return (
      <div className="gallery-container">
        <div className="switch-bar">
          <Link to={{ pathname: "search" }} className="badge m-2 badge-primary">
            Search
          </Link>
          <Link to={{ pathname: "/" }} className="badge m-2 badge-primary">
            Gallery
          </Link>
        </div>

        <div className="genres-bar">
          {Object.keys(this.genres).map(genre => (
            <button
              key={genre}
              onClick={e => this.updateGenre(e, genre)}
              className="btn m-1 btn-info btn"
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="movies-container">
          {this.state.movies.map(movie => (
            <Movie {...movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
