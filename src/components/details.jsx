import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.location.state.id
        }?api_key=cfe422613b250f702980a3bbf9e90716`
      )
      .then(res => {
        this.setState({
          movie: res.data
        });
      });
  }

  render() {
    return (
      <div className="detail-container">
        <div>
          <Link
            to={{ pathname: "/search" }}
            className="badge m-2 badge-primary"
          >
            Search
          </Link>
          <Link to={{ pathname: "/" }} className="badge m-2 badge-primary">
            Gallery
          </Link>
        </div>

        <div className="movie-detail">
          <img
            src={`https://image.tmdb.org/t/p/w200${
              this.state.movie.poster_path
            }`}
          />
          <h2>{this.state.movie.title}</h2>
          <p>{this.state.movie.release_date}</p>
          <p>Vote: {this.state.movie.vote_average}</p>
          <p>{this.state.movie.overview}</p>
        </div>

        <div>
          <Link
            to={{
              pathname: `/detail/${this.state.movie.id - 1}`,
              state: {
                id: `${this.state.movie.id - 1}`
              }
            }}
            className="badge m-2 badge-primary"
          >
            Prev
          </Link>
          <Link
            to={{
              pathname: `/detail/${this.state.movie.id + 1}`,
              state: {
                id: `${this.state.movie.id + 1}`
              }
            }}
            className="badge m-2 badge-primary"
          >
            Next
          </Link>
        </div>
      </div>
    );
  }
}

export default Details;
