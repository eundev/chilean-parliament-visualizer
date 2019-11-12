import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Col } from "reactstrap";
import { Tooltip } from "antd";
import moment from "moment";
import "../styles/LegislationCard.css";

let colors = ["#8451ff", "#ff516a", "#5198ff", "#5156ff", "#ff6c50"];
class LegislationCard extends Component {
  render() {
    const item = this.props.info;
    const colors = {
      Aprobado: "#9bd888",
      Rechazado: "orange",
      Unánime: "9bd888"
    };
    const result = this.props.info.Votaciones.VotacionProyectoLey.Resultado[
      "#text"
    ];
    /*
          <div className="legislation-card">
            <Card style={{ height: "100%" }}>
              <CardBody className="card-body-desc">
                <div className="clearfix"></div>
                <p className="card-description" style={{ fontWeight: 600 }}>
                  {item.Nombre}
                </p>
              </CardBody>
              <CardFooter>
                <p style={{ fontWeight: 800, fontSize: 18 }}>
                  {moment(item.Votaciones.VotacionProyectoLey.Fecha).format(
                    "ll"
                  )}
                </p>
              </CardFooter>
            </Card>
          </div>
           */
    let color = colors[result];
    return (
      <Col md={4} sm={6} xs={12} lg={3}>
        <Link to={`/votacion/${item.Id}`}>
          <div className="card card-blog">
            <div className="card-image">
              <img
                className="img"
                src={require("../../../assets/img/camara.jpg")}
              />
            </div>
            <div className="card-body text-center">
              <h5 className="card-title">
                {moment(item.Votaciones.VotacionProyectoLey.Fecha).format("ll")}
              </h5>
              <div className="card-description">{item.Nombre}</div>
              <div className="card-footer">
                <span
                  className="btn  btn-round"
                  style={{ backgroundColor: color, border: "none" }}
                >
                  {result}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Col>
    );
  }
}

export default LegislationCard;
