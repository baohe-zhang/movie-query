import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieListView from "./movieListView";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      query: "",
      placeholder: "Search Movie",
      sortValue: "popularity",
      sortOrder: "desc"
    };
  }

  updateSortOrder(e, sortOrder) {
    this.setState({
      sortOrder
    });
    this.getMoviesByQuery();
  }

  updateSortValue(e, sortValue) {
    this.setState({
      sortValue
    });
    this.getMoviesByQuery();
  }

  updateQuery(e, query) {
    this.setState({
      query
    });
    this.getMoviesByQuery();
  }

  getMoviesByQuery = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${
          this.state.query
        }&api_key=cfe422613b250f702980a3bbf9e90716`
      )
      .then(res =>
        this.setState({
          movies: res.data.results.sort(
            function(a, b) {
              if (this.state.sortValue === "popularity") {
                return this.state.sortOrder === "asc"
                  ? a.popularity - b.popularity
                  : b.popularity - a.popularity;
              } else {
                return this.state.sortOrder === "asc"
                  ? new Date(a.release_date) - new Date(b.release_date)
                  : new Date(b.release_date) - new Date(a.release_date);
              }
            }.bind(this)
          )
        })
      );
  };

  render() {
    return (
      <div className="search-container">
        <div className="switch-bar">
          <Link to={{ pathname: "search" }} className="badge m-2 badge-primary">
            Search
          </Link>
          <Link to={{ pathname: "/" }} className="badge m-2 badge-primary">
            Gallery
          </Link>
        </div>

        <div className="search-block">
          <input
            type="search"
            value={this.state.query}
            onChange={e => this.updateQuery(e, e.target.value)}
            placeholder={this.state.placeholder}
            className="search-bar"
          />

          <label>
            <b>Sort by</b>&nbsp;
            <select
              value={this.state.sortValue}
              onChange={e => this.updateSortValue(e, e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="release_date">Release Date</option>
            </select>
          </label>

          <label>
            <b>Order</b>&nbsp;&nbsp;
            <select
              value={this.state.sortOrder}
              onChange={e => this.updateSortOrder(e, e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
        </div>

        <div className="movies-list-container">
          {this.state.movies.map(movie => (
            <MovieListView {...movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
