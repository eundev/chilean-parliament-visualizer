import React from "react";
import { Spin, Card } from "antd";
// reactstrap components
import { Link } from "react-router-dom";
import { Badge, Button, Media, Container, Row, Col } from "reactstrap";
import axios from "axios";
// core components
import "./Legislation.css";
import MultiDropdownNavbar from "../../../Navbars/MultiDropdownNavbar.js";
import { projectService } from "../../../Services/projectService.js";
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

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      loading: true
    };
  }
  async componentDidMount() {
    const project = await projectService.getById(this.props.match.params.id);
    const QUERY_LINK = `https://cors-anywhere.herokuapp.com/http://opendata.camara.cl/camaradiputados/WServices/WSLegislativo.asmx/retornarVotacionDetalle?prmVotacionId=${this.props.match.params.id}`;
    const response = await axios.get(QUERY_LINK);
    let xmlData = response.data;

    var tObj = parser.getTraversalObj(xmlData, options);
    var jsonObj = parser.convertToJson(tObj, options);

    if (project) {
      this.setState({
        project: project.data,
        diputados: jsonObj.Votacion.Votos.Voto.map(item => {
          return {
            name: `${item.Diputado.Nombre} ${item.Diputado.ApellidoPaterno} ${item.Diputado.ApellidoMaterno}`,
            img: `https://www.camara.cl/img.aspx?prmid=g${item.Diputado.Id}`,
            decision: item.OpcionVoto,
            Id: item.Diputado.Id
          };
        }),
        loading: false
      });
    }
  }
  render() {
    return this.state.loading ? (
      <Spin tip="cargando...">
        <div style={{ width: "100%", height: "100vh" }}></div>
      </Spin>
    ) : (
      <>
        <MultiDropdownNavbar></MultiDropdownNavbar>
        <div className="wrapper">
          <div className="main">
            <div className="section section-white">
              <Container>
                <Row>
                  <Col className="ml-auto mr-auto title">
                    <h2>{this.state.project.Nombre}</h2>
                    <h3 className="title">
                      <small>
                        <strong>Creado por</strong> <br />
                        {this.state.project.Autores
                          ? `${this.state.project.Autores.ParlamentarioAutor.map(
                              item => {
                                return ` ${item.Diputado.Nombre} ${item.Diputado.ApellidoPaterno} ${item.Diputado.ApellidoMaterno}`;
                              }
                            )}`
                          : null}
                      </small>
                    </h3>
                  </Col>
                </Row>
                <div style={{ display: "flex" }}>
                  <div className="legislature-vote-segment">
                    <center>
                      <h3>
                        <strong>Votos a favor</strong>
                        <div
                          id="number-indicator"
                          style={{ backgroundColor: "green" }}
                        >
                          <p>
                            {
                              this.state.diputados.filter(item => {
                                return item.decision === "Afirmativo";
                              }).length
                            }
                          </p>
                        </div>
                      </h3>
                    </center>
                    <br />
                    {this.state.diputados
                      .filter(item => {
                        return item.decision === "Afirmativo";
                      })
                      .map(item => (
                        <Link to={`/diputado/${item.Id}`}>
                          <p id="deputy-decision-cell">
                            <img
                              src={item.img}
                              height="25px"
                              style={{ marginRight: "20px" }}
                            ></img>{" "}
                            {item.name}
                          </p>
                        </Link>
                      ))}
                  </div>
                  <div className="legislature-vote-segment">
                    <center>
                      <h3>
                        <strong>En Contra</strong>
                        <div
                          id="number-indicator"
                          style={{ backgroundColor: "darkred" }}
                        >
                          <p>
                            {
                              this.state.diputados.filter(item => {
                                return item.decision === "En Contra";
                              }).length
                            }
                          </p>
                        </div>
                      </h3>
                    </center>
                    <br />
                    {this.state.diputados
                      .filter(item => {
                        return item.decision === "En Contra";
                      })
                      .map(item => (
                        <Link to={`/diputado/${item.Id}`}>
                          <p id="deputy-decision-cell">
                            <img
                              src={item.img}
                              height="25px"
                              style={{ marginRight: "20px" }}
                            ></img>{" "}
                            {item.name}
                          </p>
                        </Link>
                      ))}
                  </div>
                  <div className="legislature-vote-segment">
                    <center>
                      <h3>
                        <strong>Abstención</strong>
                        <div
                          id="number-indicator"
                          style={{ backgroundColor: "orange" }}
                        >
                          <p>
                            {
                              this.state.diputados.filter(item => {
                                return item.decision === "Abstención";
                              }).length
                            }
                          </p>
                        </div>
                      </h3>
                    </center>
                    <br />
                    {this.state.diputados
                      .filter(item => {
                        return item.decision === "Abstención";
                      })
                      .map(item => (
                        <Link to={`/diputado/${item.Id}`}>
                          <p id="deputy-decision-cell">
                            <img
                              src={item.img}
                              height="25px"
                              style={{ marginRight: "20px" }}
                            ></img>{" "}
                            {item.name}
                          </p>
                        </Link>
                      ))}
                  </div>
                  <div className="legislature-vote-segment">
                    <center>
                      <h3>
                        <strong>Dispensado</strong>
                        <div
                          id="number-indicator"
                          style={{ backgroundColor: "gray" }}
                        >
                          <p>
                            {
                              this.state.diputados.filter(item => {
                                return item.decision === "Dispensado ";
                              }).length
                            }
                          </p>
                        </div>
                      </h3>
                    </center>
                    <br />
                    {this.state.diputados
                      .filter(item => {
                        return item.decision === "Dispensado";
                      })
                      .map(item => (
                        <Link to={`/diputado/${item.Id}`}>
                          <p id="deputy-decision-cell">
                            <img
                              src={item.img}
                              height="25px"
                              style={{ marginRight: "20px" }}
                            ></img>{" "}
                            {item.name}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BlogPost;
