import React, { useEffect } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import { connect } from "react-redux";
import Auth from "./components/Auth/Auth";

import * as actions from "./store/actions/index";

const App = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <LandingPage />
    </div>
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
