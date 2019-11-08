import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter } from "reactstrap";
import { Tooltip } from "antd";
import moment from "moment";
import "../styles/LegislationCard.css";

let colors = ["#8451ff", "#ff516a", "#5198ff", "#5156ff", "#ff6c50"];
class LegislationCard extends Component {
  render() {
    const item = this.props.info;
    const colors = {
      Aprobado: "green",
      Rechazado: "orange",
      Unánime: "yellow"
    };
    const result = this.props.info.Votaciones.VotacionProyectoLey.Resultado[
      "#text"
    ];
    let color = colors[result];
    return (
      <Tooltip title={result}>
        <Link to={`/votacion/${item.Id}`}>
          <div className="legislation-card">
            <Card
              data-background="color"
              data-color={color}
              style={{ height: "100%" }}
            >
              <CardBody>
                <span className="category-social pull-right">
                  <i className="fa fa-quote-right"></i>
                </span>
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
        </Link>
      </Tooltip>
    );
  }
}

export default LegislationCard;
