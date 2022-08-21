import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    id: Joi.optional(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0.01).max(10).label("Rate"),
  };

  async populateGenre() {
    const genres = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    try {
      const movie = await getMovie(movieId);
      this.setState({ data: this.mapViewToModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();
  }

  mapViewToModel(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genreId: movie.genre.id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.replace("/movies");
  };

  render() {
    const { params } = this.props.match;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            "genreId",
            "Genre",
            this.state.genres,
            "id",
            "name"
          )}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderSubmit("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
