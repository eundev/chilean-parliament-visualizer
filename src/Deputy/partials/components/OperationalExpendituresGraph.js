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
      console.log(this.props.gastos);
      await this.setState({
        labels: this.props.gastos.dates,
        category: Object.keys(this.props.gastos).slice(0, -1),
        monto_gastos: Object.keys(this.props.gastos)
          .slice(0, -1)
          .map(key => {
            return this.props.gastos[key];
          })
      });
      console.log(this.state.monto_gastos);
      console.log("CATEGORIES");
      console.log(this.state.category);
      console.log(this.state.labels);
      let data = this.state.category.map((item, i) => {
        return {
          x: this.state.labels,
          y: this.state.monto_gastos[i],
          name: item,
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
      <div>
        <h1 style={{ marginTop: 40, marginBottom: 20 }}>
          Gastos Operacionales por Mes
        </h1>
        <div id="myDiv" style={{ width: "100%", height: "50vh" }}></div>
      </div>
    );
  }
}

export default OperationalExpendituresGraph;
