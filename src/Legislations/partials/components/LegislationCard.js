import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/LegislationCard.css";

let colors = ["#8451ff", "#ff516a", "#5198ff", "#5156ff", "#ff6c50"];
class LegislationCard extends Component {
  render() {
    const item = this.props.info;
    return (
      <Link to={`/votacion/${item.Id}`}>
        <div className="legislation-card">
          <div
            className="legislation-description"
            style={{ backgroundColor: colors[this.props.index % 5] }}
          >
            <div
              className="legislation-text-floater"
              style={{
                alignItems: item.Nombre.length > 60 ? "justify" : "center"
              }}
            >
              <p id="legislation-card-description-text">{item.Nombre}</p>
            </div>
          </div>
          <div className="legislation-info">
            <p id="tipo"></p>
            <p id="resultado"></p>
            <p id="fecha"></p>
          </div>
        </div>
      </Link>
    );
  }
}

export default LegislationCard;
