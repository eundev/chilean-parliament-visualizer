import React, { Component } from "react";
import { Spin } from "antd";
import "../styles/ListRecentVotes.css";
import LegislationCard from "./LegislationCard";
import { projectService } from "../../../Services/projectService";

class ListRecentVotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingRecentData: true
    };
  }
  async componentDidMount() {
    const proj = await projectService.getAll();
    if (proj) {
      this.setState({
        votings: proj.data.slice(0, 20),
        loadingRecentData: false
      });
    }
  }

  render() {
    return this.state.loadingRecentData ? (
      <Spin tip="Cargando recientes...">
        <div style={{ width: "100%", height: "100vh" }}></div>
      </Spin>
    ) : (
      <div className="list-recent-votes-wrapper">
        <h1 style={{ marginBottom: 20, marginLeft: 10 }}>Últimas Votaciones</h1>
        {this.state.votings.map((item, i) => {
          return (
            <LegislationCard info={item} index={i} key={i}></LegislationCard>
          );
        })}
      </div>
    );
  }
}

export default ListRecentVotes;
