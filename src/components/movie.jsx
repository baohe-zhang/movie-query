import React, { Component } from "react";
import { Link } from "react-router-dom";

class Movie extends Component {
  state = {};

  render() {
    return (
      <div className="movie-poster">
        <Link
          to={{
            pathname: `/details/${this.props.id}`,
            state: { id: `${this.props.id}` }
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w200${this.props.poster_path}`}
          />
        </Link>
      </div>
    );
  }
}

export default Movie;
