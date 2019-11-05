import React, { Component } from "react";
import "../styles/DeputyProposedProjects.css";
import { projectService } from "../../../Services/projectService";
import LegislationCard from "../../../Legislations/partials/components/LegislationCard";

class DeputyProposedProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }

  async componentDidMount() {
    const projects = await projectService.getByAuthor(this.props.deputy_id);
    console.log(projects);
    if (projects) {
      this.setState({
        projects: projects.data,
        loadingData: false
      });
    }
  }

  render() {
    return this.state.loadingData ? null : (
      <div>
        <h1 style={{ marginTop: 40, marginBottom: 20 }}>
          Proyectos Propuestos{" "}
        </h1>
        {this.state.projects.map((item, i) => {
          return (
            <LegislationCard key={i} info={item} index={i}></LegislationCard>
          );
        })}
      </div>
    );
  }
}

export default DeputyProposedProjects;
