import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import { deleteMovie } from "../services/fakeMovieService";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPageNo: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ _id: "", name: "All Genres" }, ...getGenres()],
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    deleteMovie(movie._id);
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
    this.setState({ selectedGenre: genre, currentPageNo: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPageNo: 1,
    });
  };

  getLikedItemClass = (movie) => {
    let className = "fa fa-heart";
    if (!movie.liked) className += "-o";
    return className;
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPageNo,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredMovies = allMovies;

    if (searchQuery)
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(
        (m) => m.genre._id === selectedGenre._id
      );

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPageNo, pageSize);
    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPageNo, genres, selectedGenre, sortColumn } =
      this.state;

    if (count === 0) return <p>There are no movies in database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: "10px" }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
