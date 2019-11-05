import React, { Component } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);
class OperationalExpendituresGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }
  async componentDidMount() {
    try {
      await this.setState({
        labels: this.props.gastos.dates,
        category: Object.keys(this.props.gastos).slice(0, -1),
        monto_gastos: Object.keys(this.props.gastos)
          .slice(0, -1)
          .map(key => {
            return this.props.gastos[key];
          })
      });
      let data = this.state.category.map((item, i) => {
        return {
          x: this.state.labels,
          y: this.state.monto_gastos[i],
          name: this.state.category[i],
          type: "bar"
        };
      });
      console.log(data);
      var layout = { barmode: "stack", showlegend: false };
      Plotly.newPlot("myDiv", data, layout);
    } catch (e) {
      this.setState({
        hasError: true
      });
    }
  }
  render() {
    return this.state.hasError ? (
      <div>
        <p>No hay información de los gastos de este/a diputad@</p>
      </div>
    ) : (
      <div id="myDiv" style={{ width: "100%", height: "100vh" }}></div>
    );
  }
}

export default OperationalExpendituresGraph;
