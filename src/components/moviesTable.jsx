import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  state = {
    columns: [
      {
        path: "title",
        label: "Title",
        content: (movie) => (
          <Link to={"/movies/" + movie.id}>{movie.title}</Link>
        ),
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: (movie) => (
          <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        ),
      },
    ],
  };

  componentDidMount() {
    const { user } = this.props;
    const columns = [...this.state.columns];
    const deleteCol = {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          type="button"
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    };
    if (user) columns.push(deleteCol);
    this.setState({ columns });
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.state.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
