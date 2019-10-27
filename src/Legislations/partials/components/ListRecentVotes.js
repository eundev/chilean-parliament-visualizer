import React, { Component } from "react";
import axios from "axios";
import { Spin, Card } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/ListRecentVotes.css";
import LegislationCard from "./LegislationCard";

var parser = require("fast-xml-parser");
var he = require("he");

const QUERY_LINK =
  "https://cors-anywhere.herokuapp.com/http://opendata.camara.cl/camaradiputados/WServices/WSLegislativo.asmx/retornarVotacionesXAnno?prmAnno=2019";

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

class ListRecentVotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingRecentData: true
    };
  }
  async componentDidMount() {
    const response = await axios.get(QUERY_LINK);
    let xmlData = response.data;

    var tObj = parser.getTraversalObj(xmlData, options);
    var jsonObj = parser.convertToJson(tObj, options);
    this.setState({
      loadingRecentData: false,
      votings: jsonObj.VotacionesColeccion.Votacion.filter(item => {
        return item.Tipo === "Proyecto de Ley";
      })
    });
    {
      /* 
        <>votings FIELDS<>
        1. Descripcion
        2. Fecha
        3. Id
        4. Quorum
        5. Resultado
        6. Tipo
        7. TotalAbstencion
        8. TotalDispensado
        9. TotalNo
        10. TotalSi
    */
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
        {this.state.votings.map((item, i) => (
          <LegislationCard info={item} index={i}></LegislationCard>
        ))}
      </div>
    );
  }
}

export default ListRecentVotes;
