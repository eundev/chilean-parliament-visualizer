/*eslint-disable*/
import React, { Component } from "react";

// reactstrap components
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
import { Pie } from "react-chartjs-2";
import { PacmanLoader } from "react-spinners";
import { Spin } from "antd";
// core components
import ColorNavbar from "../../../Navbars/ColorNavbar.js";
import TwitterRedesignHeader from "../../../Headers/TwitterRedesignHeader.js";
import FooterWhite from "../../../Footers/FooterWhite.js";
import MultiDropdownNavbar from "../../../Navbars/MultiDropdownNavbar.js";
import OperationalExpendituresGraph from "../../partials/components/OperationalExpendituresGraph.js";
import { deputyService } from "../../../Services/deputyService.js";
import DeputyVotes from "../../partials/components/DeputyVotes.js";
import moment from "moment";

class TwitterRedesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      loadingInfo: true,
      fechas: []
    };
    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
    const deputy = await deputyService.getById(this.props.match.params.id);
    if (deputy) {
      this.setState({
        deputy: deputy.data,
        loadingInfo: false,
        fechas: deputy.data.Militancias.Militancia.map(item => {
          return `${moment(item.FechaInicio).format("YYYY")}-${moment(
            item.FechaTermino
          ).format("YYYY")}`;
        })
      });
    }
  }

  toggle(input) {
    this.setState({
      activeTab: input
    });
  }

  render() {
    const { activeTab } = this.state;
    const { deputy } = this.state;
    return this.state.loadingInfo ? (
      <Spin tip="Cargando info...">
        <div style={{ height: "100vh", width: "100%" }}></div>
      </Spin>
    ) : (
      <div>
        <>
          <MultiDropdownNavbar></MultiDropdownNavbar>
          <div className="wrapper" style={{ paddingTop: 200 }}>
            <div className="section-white-gray">
              <Container>
                <Row className="owner">
                  <Col className="ml-auto mr-auto text-center" xs="12">
                    <div className="avatar">
                      <img
                        alt="..."
                        className="img-circle img-responsive"
                        src={`https://www.camara.cl/img.aspx?prmid=g${deputy.Id}`}
                      />
                    </div>
                    <div className="name">
                      <h4>
                        {`${deputy.Nombre} ${deputy.ApellidoPaterno} ${deputy.ApellidoMaterno}`}
                        <br />
                        <small>
                          {deputy.Militancias.Militancia[0].Partido.Nombre}
                        </small>
                      </h4>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="ml-auto mr-auto text-center" md="6">
                    <div className="description-details">
                      <ul className="list-unstyled">
                        <li>
                          <i className="fa fa-map-marker mr-1" />
                          Las Condes
                        </li>
                        <li>
                          <i className="fa fa-link mr-1" />
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            votoparlamentario.cl
                          </a>
                        </li>
                        <li>
                          <i className="fa fa-calendar mr-1" />
                          {this.state.fechas.map(item => {
                            return <p>{item}</p>;
                          })}
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <div className="profile-tabs">
                  <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                      <Nav id="tabs" role="tablist" tabs>
                        <NavItem>
                          <NavLink
                            className={activeTab === "1" ? "active" : ""}
                            onClick={() => {
                              this.toggle("1");
                            }}
                          >
                            Gastos
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === "2" ? "active" : ""}
                            onClick={() => {
                              this.toggle("2");
                            }}
                          >
                            Votos y Propuestas
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            className={activeTab === "3" ? "active" : ""}
                            onClick={() => {
                              this.toggle("3");
                            }}
                          >
                            Media
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </div>
                  <TabContent activeTab={activeTab}>
                    {/*
                     */}
                    <TabPane tabId="2" id="tweets">
                      <Row>
                        <Col md="8">
                          <h1>Votaciones</h1>
                          <div className="tweets">
                            {this.state.loadingInfo ? (
                              <center>
                                <div>
                                  <PacmanLoader></PacmanLoader>
                                </div>
                              </center>
                            ) : (
                              <DeputyVotes
                                deputy_id={this.props.match.params.id}
                              ></DeputyVotes>
                            )}
                            <br />
                            <div className="text-center">
                              <Button
                                className="btn-round"
                                color="info"
                                outline
                              >
                                Cargar más votaciones
                              </Button>
                            </div>
                          </div>
                        </Col>
                        <Col md="4" sm="6">
                          <Card className="card-with-shadow">
                            <CardBody>
                              <CardTitle tag="h5">
                                Who to follow ·{" "}
                                <small>
                                  <a
                                    className="link-info"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    View all
                                  </a>
                                </small>
                              </CardTitle>
                              <div className="accounts-suggestion">
                                <ul className="list-unstyled">
                                  <li className="account">
                                    <Row>
                                      <Col md="3">
                                        <div className="avatar">
                                          <img
                                            alt="..."
                                            className="img-circle img-no-padding img-responsive"
                                            src={require("../../../assets/img/chet_faker_1.jpg")}
                                          />
                                        </div>
                                      </Col>
                                      <Col
                                        className="description-section"
                                        md="7"
                                      >
                                        <span>
                                          Chet Faker{" "}
                                          <a
                                            className="text-muted"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                          >
                                            @chetfaker
                                          </a>
                                        </span>
                                        <br />
                                        <span className="text-muted">
                                          <small>
                                            Followed by{" "}
                                            <a
                                              className="link-info"
                                              href="#pablo"
                                              onClick={e => e.preventDefault()}
                                            >
                                              @banks
                                            </a>{" "}
                                            and{" "}
                                            <a
                                              className="link-info"
                                              href="#pablo"
                                              onClick={e => e.preventDefault()}
                                            >
                                              @rihanna
                                            </a>
                                          </small>
                                        </span>
                                      </Col>
                                      <Col className="follow" md="2">
                                        <Button
                                          className="btn-just-icon"
                                          color="info"
                                          outline
                                          size="sm"
                                        >
                                          <i className="fa fa-plus" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </li>
                                  <li className="account">
                                    <Row>
                                      <Col md="3">
                                        <div className="avatar">
                                          <img
                                            alt="..."
                                            className="img-circle img-no-padding img-responsive"
                                            src={require("../../../assets/img/placeholder.jpg")}
                                          />
                                        </div>
                                      </Col>
                                      <Col
                                        className="description-section"
                                        md="7"
                                      >
                                        <span>
                                          John Green{" "}
                                          <a
                                            className="text-muted"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                          >
                                            @johngreen
                                          </a>
                                        </span>
                                        <br />
                                        <span className="text-muted">
                                          <small>
                                            Followed by{" "}
                                            <a
                                              className="link-info"
                                              href="#pablo"
                                              onClick={e => e.preventDefault()}
                                            >
                                              @rihanna
                                            </a>
                                          </small>
                                        </span>
                                      </Col>
                                      <Col className="follow" md="2">
                                        <Button
                                          className="btn-just-icon"
                                          color="info"
                                          outline
                                          size="sm"
                                        >
                                          <i className="fa fa-plus" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </li>
                                  <li className="account">
                                    <Row>
                                      <Col md="3">
                                        <div className="avatar">
                                          <img
                                            alt="..."
                                            className="img-circle img-no-padding img-responsive"
                                            src={require("../../../assets/img/drake.jpg")}
                                          />
                                        </div>
                                      </Col>
                                      <Col
                                        className="description-section"
                                        md="7"
                                      >
                                        <span>
                                          Drake{" "}
                                          <a
                                            className="text-muted"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                          >
                                            @drake
                                          </a>
                                        </span>
                                        <br />
                                        <span className="text-muted">
                                          <small>
                                            Followed by{" "}
                                            <a
                                              className="link-info"
                                              href="#pablo"
                                              onClick={e => e.preventDefault()}
                                            >
                                              @chetfaker
                                            </a>
                                          </small>
                                        </span>
                                      </Col>
                                      <Col className="follow" md="2">
                                        <Button
                                          className="btn-just-icon"
                                          color="info"
                                          outline
                                          size="sm"
                                        >
                                          <i className="fa fa-plus" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </li>
                                </ul>
                              </div>
                            </CardBody>
                          </Card>
                          {/* end card */}
                          <Card className="card-with-shadow">
                            <CardBody>
                              <CardTitle tag="h5">
                                Trends ·{" "}
                                <small>
                                  <a
                                    className="link-info"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Change
                                  </a>
                                </small>
                              </CardTitle>
                              <div className="hashtag-suggestions">
                                <ul className="list-unstyled">
                                  <li>
                                    <a
                                      className="link-danger"
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      #JeSuisToujoursCharlie
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      Oculus Rift
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="link-danger"
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      #CarenAndLarryAreNotReal
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="link-danger"
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      #Twitter10k
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      EXCLUSIVE MOVE WITHINGTON
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      London
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#pablo"
                                      onClick={e => e.preventDefault()}
                                    >
                                      DJ Khaled Snapchat
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </CardBody>
                          </Card>
                          {/* end card */}
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="1" id="connections" role="tabpanel">
                      {this.state.loadingInfo ? (
                        <center>
                          <div style={{ left: "50%" }}>
                            <PacmanLoader></PacmanLoader>
                          </div>
                        </center>
                      ) : (
                        <OperationalExpendituresGraph
                          gastos={this.state.deputy.gastos}
                        ></OperationalExpendituresGraph>
                      )}
                    </TabPane>
                    <TabPane tabId="3" id="media" role="tabpanel" />
                  </TabContent>
                </div>
              </Container>
            </div>
          </div>
          <FooterWhite />
        </>
      </div>
    );
  }
}

export default TwitterRedesign;
