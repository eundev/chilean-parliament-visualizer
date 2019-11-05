import React, { Component } from "react";
import "../styles/DeputyProfile.css";
import { deputyService } from "../../../Services/deputyService";
import OperationalExpendituresGraph from "../../partials/components/OperationalExpendituresGraph";
import { RingLoader } from "react-spinners";

class DeputyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingInfo: true
    };
  }
  async componentDidMount() {
    const deputy = await deputyService.getById(this.props.match.params.id);
    if (deputy) {
      this.setState({
        deputy: deputy.data,
        loadingInfo: false
      });
    }
  }
  render() {
    try {
      return this.state.loadingInfo ? (
        <RingLoader>
          <div style={{ height: "100vh", width: "100%" }}></div>
        </RingLoader>
      ) : (
        <div>
          <OperationalExpendituresGraph
            gastos={this.state.deputy.gastos}
          ></OperationalExpendituresGraph>
        </div>
      );
    } catch (e) {
      return <p>No se pudo cargar la pagina</p>;
    }
  }
}

export default DeputyProfile;
