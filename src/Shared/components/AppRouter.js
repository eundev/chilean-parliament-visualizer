import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../../Landing/components/Homepage";
import IndividualLegislature from "../../Legislations/pages/components/IndividualLegislature";
import Navbar from "./Navbar";
import HomeLayout from "../../Landing/components/HomeLayout";
import DeputyProfile from "../../Deputy/pages/components/DeputyProfile";

function renderWithLayout(Component, Layout, props) {
  return (
    <Layout {...props}>
      <Component {...props}></Component>
    </Layout>
  );
}
function AppRouter(props) {
  return (
    <>
      <Router>
        {/*<Navbar />*/}
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return renderWithLayout(Homepage, HomeLayout, props);
            }}
          ></Route>
          <Route
            path="/votacion/:id"
            render={props => {
              return renderWithLayout(IndividualLegislature, HomeLayout, props);
            }}
          ></Route>
          <Route
            path="/diputado/:id"
            render={props => {
              return renderWithLayout(DeputyProfile, HomeLayout, props);
            }}
          ></Route>
        </Switch>
      </Router>
    </>
  );
}

export default AppRouter;
