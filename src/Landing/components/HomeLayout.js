import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "../styles/HomeLayout.css";
import DeputySearchList from "../../Deputy/partials/components/DeputySearchList";

const { Header, Content, Footer, Sider } = Layout;
class HomeLayout extends Component {
  render() {
    return (
      <Layout>
        <p>asdasds</p>
        <Sider
          style={{
            height: "100vh",
            position: "fixed",
            left: 0
          }}
          width="280px"
        >
          <img
            className="logo"
            src={require("../../assets/images/voto-parlamentario.png")}
          ></img>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item
              key="1"
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              TODAS LAS VOTACIONES
            </Menu.Item>

            <Menu.Item key="2">NOTICIAS</Menu.Item>
            <Menu.Item key="3">POR PARLAMENTARIOS</Menu.Item>
            <DeputySearchList></DeputySearchList>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 280 }}>
          <Content style={{ padding: 25 }}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default HomeLayout;
