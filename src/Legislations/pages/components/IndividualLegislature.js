import React, { Component } from "react";
import { Spin, Card } from "antd";
import axios from "axios";
import moment from "moment";
import { Doughnut } from "react-chartjs-2";

import "../styles/IndividualLegislature.css";
import { projectService } from "../../../Services/projectService";

var parser = require("fast-xml-parser");
var he = require("he");

var options = {
  attributeNamePrefix: "@_",
  attrNodeName: "attr", //default is 'false'
  textNodeName: "#text",
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  localeRange: "", //To support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  attrValueProcessor: (val, attrName) =>
    he.decode(val, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"]
};

class IndividualLegislature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      loadingLegislation: true
    };
  }

  /*
  async componentDidMount() {
    const QUERY_LINK = `https://cors-anywhere.herokuapp.com/http://opendata.camara.cl/camaradiputados/WServices/WSLegislativo.asmx/retornarVotacionDetalle?prmVotacionId=${this.props.match.params.id}`;
    const response = await axios.get(QUERY_LINK);
    let xmlData = response.data;

    var tObj = parser.getTraversalObj(xmlData, options);
    var jsonObj = parser.convertToJson(tObj, options);
    this.setState({
      loadingLegislation: false,
      legislation: jsonObj.Votacion,
      diputados: jsonObj.Votacion.Votos.Voto.map(item => {
        return {
          name: `${item.Diputado.Nombre} ${item.Diputado.ApellidoPaterno} ${item.Diputado.ApellidoMaterno}`,
          img: `https://www.camara.cl/img.aspx?prmid=g${item.Diputado.Id}`,
          decision: item.OpcionVoto
        };
      }),
      pieData: {
        radius: 10,
        labels: ["En Contra", "Afirmativo", "Abstención", "Dispensado"],
        datasets: [
          {
            data: [
              jsonObj.Votacion.Votos.Voto.filter(item => {
                return item.OpcionVoto === "En Contra";
              }).length,
              jsonObj.Votacion.Votos.Voto.filter(item => {
                return item.OpcionVoto === "Afirmativo";
              }).length,
              jsonObj.Votacion.Votos.Voto.filter(item => {
                return item.OpcionVoto === "Abstención";
              }).length,
              jsonObj.Votacion.Votos.Voto.filter(item => {
                return item.OpcionVoto === "Dispensado";
              }).length
            ],
            backgroundColor: ["#cf2a1e", "#0136a2", "gold", "gray"]
          }
        ]
      }
    });
  
      /* 
        <>votos FIELDS<>
        1. Diputado
          2. ApellidoMaterno
          3. ApellidoPaterno
          4. Id
          5. Nombre
        6. OpcionVoto
    */
  async componentDidMount() {
    const project = await projectService.getById(this.props.match.params.id);
  }
  render() {
    return this.state.loadingLegislation ? (
      <Spin tip="Loading legislation...">
        <div style={{ width: "100%", height: "100vh" }}></div>
      </Spin>
    ) : (
      <>
        <div className="individual-legislature-wrapper">
          <Card>
            <div className="individual-legislature-context">
              <h1>Votación #: {this.state.id}</h1>
              <h3>{moment(this.state.legislation.Fecha).format("L")}</h3>
              <p>{this.state.legislation.Descripcion}</p>
              <p>Tipo: {this.state.legislation.Tipo}</p>
              <p>Id: {this.state.legislation.Id}</p>
              <p>
                No <strong>{this.state.legislation.TotalNo}</strong>
              </p>
              <p>
                Si <strong>{this.state.legislation.TotalSi}</strong>
              </p>
              <p>
                Abstencion{" "}
                <strong>{this.state.legislation.TotalAbstencion}</strong>
              </p>
              <p>
                Dispensado{" "}
                <strong>{this.state.legislation.TotalDispensado}</strong>
              </p>
              <p>
                Resultado:{" "}
                <strong>
                  {this.state.legislation.Resultado === "Aprobado" ? (
                    <span style={{ color: "green" }}>Aprobado</span>
                  ) : (
                    <span style={{ color: "red" }}>Rechazado</span>
                  )}
                </strong>
              </p>
            </div>{" "}
          </Card>

          <Card title="División Contextual">
            <div className="individual-legislature-chart">
              <Doughnut
                data={this.state.pieData}
                cutoutPercentage="5"
                height="200px"
              />
            </div>{" "}
          </Card>
        </div>

        <div className="legislature-diputados-wrap">
          <div className="legislature-vote-segment">
            <Card title="Aprobado">
              {" "}
              {this.state.diputados
                .filter(item => {
                  return item.decision === "Afirmativo";
                })
                .map(item => (
                  <p id="deputy-decision-cell">
                    <img src={item.img} height="25px"></img> {item.name}
                  </p>
                ))}
            </Card>
          </div>
          <div className="legislature-vote-segment">
            <Card title="En Contra">
              {this.state.diputados
                .filter(item => {
                  return item.decision === "En Contra";
                })
                .map(item => (
                  <p id="deputy-decision-cell">
                    <img src={item.img} height="25px"></img> {item.name}
                  </p>
                ))}
            </Card>
          </div>
          <div className="legislature-vote-segment">
            <Card title="Abstención">
              {this.state.diputados
                .filter(item => {
                  return item.decision === "Abstención";
                })
                .map(item => (
                  <p id="deputy-decision-cell">
                    <img src={item.img} height="25px"></img> {item.name}
                  </p>
                ))}
            </Card>
          </div>
          <div className="legislature-vote-segment">
            <Card title="Dispensado">
              {this.state.diputados
                .filter(item => {
                  return item.decision === "Dispensado";
                })
                .map(item => (
                  <p id="deputy-decision-cell">
                    <img src={item.img} height="25px"></img> {item.name}
                  </p>
                ))}
            </Card>
          </div>
        </div>
      </>
    );
  }
}

export default IndividualLegislature;
