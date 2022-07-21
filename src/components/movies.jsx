import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPageNo: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id != movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNo) => {
    this.setState({ currentPageNo: pageNo });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPageNo: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getLikedItemClass = (movie) => {
    let className = "fa fa-heart";
    if (!movie.liked) className += "-o";
    return className;
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPageNo,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in database.</p>;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id == selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPageNo, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPageNo}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
