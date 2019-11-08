import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Media,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import moment from "moment";
import { PacmanLoader } from "react-spinners";
import { deputyService } from "../../../Services/deputyService";
import { Tag } from "antd";

class DeputyVotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      votes: []
    };
  }
  async componentDidMount() {
    const votes = await deputyService.getVotes(this.props.deputy_id);
    this.setState({
      votes: votes.data,
      loading: false
    });
  }
  render() {
    return this.state.loading ? (
      <center>
        <div>
          <PacmanLoader></PacmanLoader>
        </div>
      </center>
    ) : (
      this.state.votes.map((item, i) => (
        <Media key={i}>
          <Media body>
            <Tag
              color={
                item.Votos.Voto.OpcionVoto["#text"] === "Afirmativo"
                  ? "green"
                  : item.Votos.Voto.OpcionVoto["#text"] === "En Contra"
                  ? "red"
                  : "gray"
              }
            >
              <strong className="mr-1">
                {item.Votos.Voto.OpcionVoto["#text"]}
              </strong>
            </Tag>
            <Media heading tag="h5">
              <small>{moment(item.Fecha).calendar()}</small>
            </Media>
            <p>
              Aqui es donde iria la descripcion de cada voto.
              <a
                className="link-danger"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                #ANTIdiaRy
              </a>{" "}
              at{" "}
              <a
                className="link-info"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                {`http://smarturl.it/AntidiaRyTW`}
              </a>
            </p>
            <div className="media-footer">
              <small>Resultado final: {item.Resultado["#text"]}</small>
            </div>
          </Media>
        </Media>
      ))
    );
  }
}

export default DeputyVotes;
