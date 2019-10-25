import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../../Landing/components/Homepage";
import IndividualLegislature from "../../Legislations/pages/components/IndividualLegislature";
import Navbar from "./Navbar";
class AppRouter extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route
              path="/votacion/:id"
              component={IndividualLegislature}
            ></Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default AppRouter;
