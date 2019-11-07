import React, { Component } from "react";
import { deputyService } from "../../../Services/deputyService";

class DeputyVotes extends Component {
  async componentDidMount() {
    const votes = await deputyService.getVotes(this.props.deputy_id);
    console.log(votes);
  }
  render() {
    return <div></div>;
  }
}

export default DeputyVotes;
