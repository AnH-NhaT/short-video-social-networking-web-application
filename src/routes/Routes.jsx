import React from "react";

import { Route, Switch } from "react-router-dom";
import Home from "../pages/client/Home";
import Profile from "../pages/client/profile";
import Welcome from "../pages/client/Welcome";

const Routes = () => {
  return (
    <Switch>
      {/* -----------------Home--------------------- */}
      <Route path="/" exact component={Welcome} />
      <Route path="/dashboard" exact component={Home} />
      <Route path="/profile/:id" exact component={Profile} />
      <Route path="/profile" exact component={Profile} />
     
    </Switch>
  );
};

export default Routes;
