import React, { Component } from "react";

class MovieForm extends Component {
  handleSave = () => {
    this.props.history.replace("/movies");
  };

  render() {
    const { params } = this.props.match;
    return (
      <div className="container">
        <h1>Movie Form {params.id}</h1>
        <button
          onClick={this.handleSave}
          type="button"
          className="btn btn-primary btn-sm"
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
