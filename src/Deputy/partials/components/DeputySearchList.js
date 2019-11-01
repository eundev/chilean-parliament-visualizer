import React, { Component } from "react";
import { AutoComplete, Icon, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import "../styles/DeputySearchList.css";
import { deputyService } from "../../../Services/deputyService";

function onSelect(value) {
  console.log("onSelect", value);
}

class DeputySearchList extends Component {
  state = {
    value: "",
    dataSource: [],
    loadingDeputies: true
  };

  onChange = value => {
    this.setState({ value });
  };

  async componentDidMount() {
    const deputies = await deputyService.getAll();
    if (deputies) {
      this.setState({
        deputies: deputies.data,
        dataSource: deputies.data.map(item => {
          return `${item.Nombre} ${item.ApellidoPaterno}`;
        }),
        loadingDeputies: false
      });
    }
  }

  render() {
    const { dataSource, value } = this.state;
    return (
      <div className="deputy-search-wrap">
        {this.state.loadingDeputies ? (
          <Spin spinning={this.state.loadingDeputies}>
            <div style={{ height: 400, width: "100%" }}></div>
          </Spin>
        ) : (
          <>
            {/*

            <AutoComplete
              dataSource={dataSource}
              style={{ width: 200 }}
              onSelect={onSelect}
              placeholder="Buscar"
            >
              <Input
                suffix={
                  <Icon
                    type="search"
                    style={{ color: "white" }}
                    className="certain-category-icon"
                  />
                }
              />
              </AutoComplete>*/}
            <div className="deputy-holder-wrap">
              {this.state.deputies.map((item, i) => (
                <Link to={`/diputado/${item.Id}`}>
                  <div className="deputy-cell" key={i}>
                    <Icon type="user"></Icon>
                    <p>{`${item.Nombre} ${item.ApellidoPaterno}`}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default DeputySearchList;
