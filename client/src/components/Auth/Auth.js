import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";
//@TODO
//write the Input component
//redirect user to home page when authenticated
//handle errors visually
//make a button component
const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Username",
      },
    },
  });

  const { authRedirectPath, onSetAuthRedirectPath } = props;
  const [isSignup, setIsSignUp] = useState(true);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      }),
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  };
  const switchModeHandler = () => {
    setIsSignUp(!isSignup);
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, username, isSignup) =>
      dispatch(actions.auth(email, password, username, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectedPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
