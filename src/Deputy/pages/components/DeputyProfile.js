import React, { Component } from "react";
import "../styles/DeputyProfile.css";
import { deputyService } from "../../../Services/deputyService";

class DeputyProfile extends Component {
  async componentDidMount() {
    const deputy = await deputyService.getById(this.props.match.params.id);
  }
  render() {
    return <div></div>;
  }
}

export default DeputyProfile;
