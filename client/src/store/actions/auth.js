import axios from "axios";

import * as actionTypes from "./actionTypes";


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, username, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    username: username,
    email
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup, username = null) => {
  return (dispatch) => {
    console.log(isSignup);
    dispatch(authStart());
    let authData = {
      email: email,
      password: password,
      username: username,
    };
    if (!isSignup)
      authData = {
        email: email,
        password: password,
      };
    let url = "http://localhost:5000/api/users/signup";
    if (!isSignup) {
      url = "http://localhost:5000/api/users/login";
    }
    console.log(url);
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        dispatch(authSuccess(response.data.token, response.data._id));
        dispatch(
          authSuccess(
            response.data.token,
            response.data._id,
            response.data.username,
            response.data.email
          )
        );
        dispatch(checkAuthTimeout(3600));
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const setAuthRedirectedPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        dispatch(authSuccess(token, userId, username, email));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
