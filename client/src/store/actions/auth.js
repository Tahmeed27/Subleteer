import axios from "axios";

import * as actionTypes from "./actionTypes";
//@TODO
//add username in state
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    username: username
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

export const auth = (email, password, isSignup, username=null) => {
  return (dispatch) => {
    console.log(isSignup);
    dispatch(authStart());
    let authData = {
      email: email,
      password: password,
      username: username
    }
    if (!isSignup) ( 
      authData = {
      email: email,
      password: password,
    });
    let url = "http://localhost:5000/api/users/signup";
    if (!isSignup) {
      url = "http://localhost:5000/api/users/login";
    }
    console.log(url);
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        // localStorage.setItem(response.data.idToken);
        localStorage.setItem("tokenId", "token");
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.user._id);
        // dispatch(authSuccess(response.data.idToken, response.data._id));
        dispatch(authSuccess(response.data.user.token, response.data.user_id, response.data.user.username));
        dispatch(checkAuthTimeout(3600));
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.user.error));
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
        const userId = localStorage.geItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
