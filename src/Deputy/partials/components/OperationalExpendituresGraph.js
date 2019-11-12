import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import createPlotlyComponent from "react-plotly.js/factory";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
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
          }),
        pieData: {
          options: {
            labels: {
              display: false
            }
          },
          labels: ["19-ago", "20-sept", "30-jun"],
          datasets: [
            {
              data: [14000000, 14000000, 4000000],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
          ]
        }
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
        <h2 style={{ marginTop: 50 }}>
          Gastos Operacionales{" "}
          <small>
            cubiertos por el gobierno, en adición a la dieta parlamentaria, la
            cual es alrededor de $6.5 - 7.0MM.
          </small>
        </h2>
        <br />
        <br />
        <Row>
          <Col md={6}>
            <Card>
              <CardHeader>Gastos para Junio, 2018</CardHeader>
              <CardBody>
                <Pie data={this.state.pieData}></Pie>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Gastos para Junio, 2018</CardHeader>
              <CardBody>
                <Pie data={this.state.pieData}></Pie>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Gastos para Junio, 2018</CardHeader>
              <CardBody>
                <Pie data={this.state.pieData}></Pie>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Gastos para Junio, 2018</CardHeader>
              <CardBody>
                <Pie data={this.state.pieData}></Pie>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Gastos para Junio, 2018</CardHeader>
              <CardBody>
                <Pie data={this.state.pieData}></Pie>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Gastos para Junio, 2018</CardHeader>
              <CardBody>
                <Pie data={this.state.pieData}></Pie>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Gastos para Junio, 2018</CardHeader>
              <CardBody>
                <Pie data={this.state.pieData}></Pie>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>Gastos para Junio, 2018</CardHeader>
              <CardBody>
                <Pie data={this.state.pieData}></Pie>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div id="myDiv" style={{ width: "100%", height: "50vh" }}></div>
      </div>
    );
  }
}

export default OperationalExpendituresGraph;
