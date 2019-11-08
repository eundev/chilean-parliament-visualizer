import React, { useEffect, useState } from "react";
import "../styles/AllDeputies.css";
// reactstrap components
import {
  Button,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import { AutoComplete, Icon, Input } from "antd";
import { withRouter, Link } from "react-router-dom";
// core components
import FooterWhite from "../../../Footers/FooterWhite.js";
import MultiDropdownNavbar from "../../../Navbars/MultiDropdownNavbar.js";
import { deputyService } from "../../../Services/deputyService.js";

function SearchWithSidebar(props) {
  const [deputies, setDeputies] = useState([]);
  const [deputyDict, setDeputyDict] = useState({});
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const deputyResults = await deputyService.getAll();
      if (deputyResults) {
        setDeputies(deputyResults.data);
        setLoading(false);
        console.log(loading);
      } else {
        alert(deputyResults);
      }
    };
    fetchData();
  }, []);

  return loading ? null : (
    <>
      <MultiDropdownNavbar />
      <div className="wrapper">
        <div className="main">
          <div className="section section-white section-search">
            <Container>
              <br />
              <br />
              <br />
              <center>
                <h1>Todos los diputados</h1>
              </center>
              <br />
              <Row>
                <Col className="ml-auto mr-auto text-center" md="6" xs="12">
                  {/*
                  <Form
                    className="form-inline search-form"
                    role="search"
                    style={{ width: "300px !important" }}
                  >
                    <InputGroup
                      className="no-border"
                      style={{ width: "300px !important" }}
                    >
                      <AutoComplete
                        style={{ width: "300px !important" }}
                        dataSource={deputies
                          .map(item => {
                            return `${item.Nombre} ${item.ApellidoPaterno} ${item.ApellidoMaterno}`;
                          })
                          .sort(function(a, b) {
                            if (a < b) {
                              return -1;
                            }
                            if (a > b) {
                              return 1;
                            }
                            return 0;
                          })}
                        filterOption={(inputValue, option) =>
                          option.props.children
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onSelect={inputValue => {
                          window.scroll(0, 0);
                          props.history.push(`/diputado/${inputValue}`);
                        }}
                        onChange={inputValue => {
                          setValue(inputValue);
                        }}
                      >
                        <Input
                          prefix={
                            <Icon
                              type="search"
                              className="certain-category-icon"
                            />
                          }
                          placeholder="Búsqueda por nombre..."
                          style={{ width: "300px !important" }}
                        />
                      </AutoComplete>
                    </InputGroup>
                  </Form>
                   */}

                  <br />
                  <br />
                  <ul className="list-unstyled follows">
                    {deputies.map((item, i) => (
                      <>
                        <Link to={`/diputado/${item.Id}`}>
                          <li key={i} id="hoverable " className="hover-bg-ws">
                            <Row>
                              <Col md="2" xs="3">
                                <img
                                  alt={`${item.Nombre} ${item.ApellidoPaterno} ${item.ApellidoMaterno}`}
                                  className="img-circle img-no-padding img-responsive"
                                  src={`https://www.camara.cl/img.aspx?prmid=g${item.Id}`}
                                />
                              </Col>
                              <Col className="description" md="10" xs="9">
                                <h5 style={{ textAlign: "left" }}>
                                  {item.Nombre} {item.ApellidoPaterno}{" "}
                                  {item.ApellidoMaterno} <br />
                                  <small>Partido Político</small>
                                </h5>
                              </Col>
                            </Row>
                          </li>
                        </Link>
                        <br />
                      </>
                    ))}
                  </ul>
                  <div className="text-missing">
                    <h5 className="text-muted">
                      If you are not finding who you’re looking for try using an
                      email address.
                    </h5>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <FooterWhite />
    </>
  );
}

export default withRouter(SearchWithSidebar);
