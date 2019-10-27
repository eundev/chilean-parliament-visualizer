import React, { Component } from "react";
import { AutoComplete, Icon, Input } from "antd";
import "../styles/DeputySearchList.css";

function onSelect(value) {
  console.log("onSelect", value);
}

class DeputySearchList extends Component {
  state = {
    value: "",
    dataSource: []
  };

  onSearch = searchText => {
    this.setState({
      dataSource: !searchText
        ? []
        : [searchText, searchText.repeat(2), searchText.repeat(3)]
    });
  };

  onChange = value => {
    this.setState({ value });
  };

  render() {
    const { dataSource, value } = this.state;
    return (
      <div className="deputy-search-wrap">
        <AutoComplete
          dataSource={dataSource}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={this.onSearch}
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
        </AutoComplete>

        <div className="deputy-holder-wrap">
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Felipe Ward</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Giorgio Jackson</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Pedro Browne</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Daniella Cicardini</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Camila Flores</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Felipe Kast</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Antonio Kast</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
          <div className="deputy-cell">
            <Icon type="user"></Icon>
            <p>Gabriel Boric</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DeputySearchList;
