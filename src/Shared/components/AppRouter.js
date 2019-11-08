import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../../Landing/components/Homepage";
import IndividualLegislature from "../../Legislations/pages/components/IndividualLegislature";
import HomeLayout from "../../Landing/components/HomeLayout";
import DeputyProfile from "../../Deputy/pages/components/DeputyProfile";
import LandingPage from "../../Landing/components/LandingPage";
import TwitterRedesign from "../../Deputy/pages/components/TwitterRedesign";
import SearchWithSidebar from "../../Deputy/pages/components/SearchWithSidebar";
function renderWithLayout(Component, Layout, props) {
  return (
    <Layout {...props}>
      \<Component {...props}></Component>
    </Layout>
  );
}
function AppRouter(props) {
  return (
    <>
      <Router>
        {/*<Navbar />*/}
        <Switch>
          {/*
           <Route
            exact
            path="/"
            render={props => {
              return renderWithLayout(Homepage, HomeLayout, props);
            }}
          ></Route>
           */}
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/diputado/:id" component={TwitterRedesign}></Route>
          <Route exact path="/diputados" component={SearchWithSidebar}></Route>
          <Route
            exact
            path="/votacion/:id"
            render={props => {
              return renderWithLayout(IndividualLegislature, HomeLayout, props);
            }}
          ></Route>
          {/*
          
          <Route
            exact
            path="/diputado/:id"
            render={props => {
              return renderWithLayout(DeputyProfile, HomeLayout, props);
            }}
          ></Route>
          */}
        </Switch>
      </Router>
    </>
  );
}

export default AppRouter;
