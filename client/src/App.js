import React, { useEffect } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import { connect } from "react-redux";
import Auth from "./components/Auth/Auth";
import Results from "./components/pages/Results/Results";
import AddListings from "./components/pages/AddListings/AddListings"
import ProfilePage from './components/pages/Profile/Profile';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import UpdateListings from "./components/pages/UpdateListings/UpdateListings"
import ListingPage from './components/pages/ListingPage/ListingPage';

import * as actions from "./store/actions/index";
// import ListingPage from "./components/pages/ListingPage/ListingPage";

const App = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);


  let routes = (
    <Switch>
      <Route
        path="/login"
        render={(props) => <Auth {...props} isSignUp={false} />}
      />
      <Route
        path="/signup"
        render={(props) => <Auth {...props} isSignUp={true} />}
      />
      <Route path="/results" render={(props) => <Results {...props} />} />

      <Route
        path="/addlisting"
        render={(props) => <AddListings {...props} />}
      />

      <Route
        path="/viewListing"
        render={(props) => <ListingPage {...props} />}
      />

      <Route
        path="/updatelisting"
        render={(props) => <UpdateListings {...props} />}
      />
      
      <Route path="/" exact component={LandingPage} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route
        path="/results"
        render={(props) => <Results {...props} />}
        exact
        />
        <Route
          path="/login"
          render={(props) => <Auth {...props} isSignUp={false} />}
        />
        <Route
          path="/signup"
          render={(props) => <Auth {...props} isSignUp={true} />}
        />
        <Route
          path="/viewListing"
          render={(props) => <ListingPage {...props} />}
        />
        <Route
          path="/addlisting"
          render={(props) => <AddListings {...props} />}
          exact
        />
        <Route
          path="/profile"
          component={ProfilePage}
          exact
        />
        <Route
          path="/updatelisting"
          render={(props) => <UpdateListings {...props} />}
        />
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    );
  }

  let theme = createMuiTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#e16d14",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">{routes}</div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.token !== null };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
