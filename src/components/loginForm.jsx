import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: result } = await login(data.username, data.password);
      localStorage.setItem("access", result.access);
      localStorage.setItem("refresh", result.refresh);
      window.location = "/";
    } catch (ex) {
      if (ex.response && [400, 401].includes(ex.response.status)) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.username;
        errors.password = ex.response.data.password;
        if (ex.response.data.detail) errors.username = ex.response.data.detail;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSubmit("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
