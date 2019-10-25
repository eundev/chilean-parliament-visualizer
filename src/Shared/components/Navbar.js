import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div style={{ padding: "25px 50px" }}>
        <Link to="/">Todas las Votaciones</Link>
      </div>
    );
  }
}

export default Navbar;
