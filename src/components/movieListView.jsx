import React, { Component } from "react";
import { Link } from "react-router-dom";

class MovieListView extends Component {
  state = {};

  render() {
    return (
      <div className="movie-list-view-container">
        <Link
          to={{
            pathname: `/details/${this.props.id}`,
            state: { id: `${this.props.id}` }
          }}
        >
          <div className="movie-poster-small">
            <img
              src={`https://image.tmdb.org/t/p/w200${this.props.poster_path}`}
            />
          </div>
        </Link>

        <div className="movie-text">
          <h4>{this.props.title}</h4>
          <p>Popularity: {this.props.popularity}</p>
          <p>Release Date: {this.props.release_date}</p>
          <p>{this.props.overview}</p>
        </div>
      </div>
    );
  }
}

export default MovieListView;
