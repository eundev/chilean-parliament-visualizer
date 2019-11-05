import React, { Component } from "react";
import "../styles/BiographicalData.css";

class BiographicalData extends Component {
  render() {
    let deputy = this.props.deputy;
    /*
      ApellidoMaterno: "Rojas"
ApellidoPaterno: "Alarcón"
FechaNacimiento: "1945-10-15T03:00:00"
Id: "1008"
Militancias: {Militancia: {FechaInicio: "2018-03-11T00:00:00", FechaTermino: "2022-03-10T23:59:59"}}
Nombre: "Florcita"
Sexo: {@Valor: "1", #text: "Masculino"}
gastos: {,…}
*/
    return (
      <div className="biographical-card-data">
        <div style={{ marginRight: 30 }}>
          <img src={`https://www.camara.cl/img.aspx?prmid=g${deputy.Id}`}></img>
        </div>
        <div>
          <p id="deputy-name">
            {deputy.Nombre} {deputy.ApellidoPaterno} {deputy.ApellidoMaterno}
          </p>
          <p>{deputy.Sexo["#text"]}</p>
        </div>
      </div>
    );
  }
}

export default BiographicalData;
