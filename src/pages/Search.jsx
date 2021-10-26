import React, { Component } from "react";
import axios from "axios";
import * as utility from "../utitlties";

import {
 Row,
 Col,
 Form,
 message,
 Menu,
 Breadcrumb,
 Layout,
 Checkbox,
 Dropdown,
 Button,
 Slider,
} from "antd";
import {
 UserOutlined,
 LaptopOutlined,
 NotificationOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
const { Sider } = Layout;

class Search extends Component {
 constructor(props) {
  super(props);
  this.state = {
   category: "",
   material: "",
   style: "",
   shape: "",
   price: "",
   collapsed: false,
   products: [],
  };
 }
 menu = (
  <Menu onClick={this.handleMenuClick}>
   <Menu.Item key="1" icon={<UserOutlined />}>
    1st menu item
   </Menu.Item>
   <Menu.Item key="2" icon={<UserOutlined />}>
    2nd menu item
   </Menu.Item>
   <Menu.Item key="3" icon={<UserOutlined />}>
    3rd menu item
   </Menu.Item>
  </Menu>
 );
 onCollapse = (collapsed) => {
  console.log(collapsed);
  this.setState({ collapsed });
 };
 handleButtonClick(e) {
  message.info("Click on left button.");
  console.log("click left button", e);
 }
 componentDidMount() {
  axios
   //    .get(`${utility.API}brand/${this.state.brand_id}`)
   .get(`${utility.API}brand/25`)
   .then((response) => {
    console.log(response);
    this.setState({
     products: response.data.store.products,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }
 render() {
  const { collapsed } = this.state;

  return (
   <>
    <div id="search-page">
     <Row span={24}>
      <Col md={6} style={{ background: "" }}>
       <Sider
        // collapsible
        // collapsed={collapsed}
        // onCollapse={this.onCollapse}
        width={"100%"}
        className="site-layout-background"
        style={{ background: "#fff" }}
       >
        <Breadcrumb style={{ margin: "16px 0", background: "#fff" }}>
         <Breadcrumb.Item>Home</Breadcrumb.Item>
         <Breadcrumb.Item>List</Breadcrumb.Item>
         <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Menu
         mode="inline"
         defaultSelectedKeys={["1"]}
         defaultOpenKeys={["sub1"]}
         style={{ height: "100%", borderRight: 0, width: "100%" }}
        >
         <SubMenu key="sub1" icon={<UserOutlined />} title="All Categories">
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
         </SubMenu>
         <SubMenu key="sub2" icon={<LaptopOutlined />} title="Materials">
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
         </SubMenu>
         <SubMenu key="sub3" icon={<NotificationOutlined />} title="Style">
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
         </SubMenu>
         <SubMenu key="price" title="Price">
          <Slider
           marks={
            {
             // 0: "",
             // 50: "",
             // 100: "C",
             // 150: "D",
             // 200: "E",
             // 250: "F",
             // 100000: "",
            }
           }
          />
         </SubMenu>
        </Menu>
       </Sider>
      </Col>
      <Col md={18} className="px-3">
       <Row span={24} style={{ background: "" }}>
        <Col md={12}>
         <div className="checkboxes">
          <Checkbox
           value="Outdoor"
           style={{
            lineHeight: "32px",
            marginRight: "25px",
           }}
          >
           Outdoor
          </Checkbox>
          <Checkbox
           value="kids"
           style={{
            lineHeight: "32px",
            marginRight: "25px",
           }}
          >
           For Kids
          </Checkbox>
          <Checkbox
           value="3d-cad"
           style={{
            lineHeight: "32px",
            marginRight: "25px",
           }}
          >
           3D / Cad
          </Checkbox>
         </div>
        </Col>
        <Col md={12}>
         <div
          style={{
           display: "grid",
           gridTemplateColumns: "100px 100px ",
           justifyContent: "flex-end",
           gridGap: "5px",
          }}
         >
          <Dropdown overlay={this.menu}>
           <Button>Button</Button>
          </Dropdown>
          <Dropdown overlay={this.menu}>
           <Button>Button</Button>
          </Dropdown>
         </div>
        </Col>
       </Row>
       <Row gutter={24} className="my-3">
        {/* <div id="search-products-container"> */}
        {this.state.products?.map((product, index) => {
         return (
          <>
           <Col className="gutter-row" span={6}>
            <a href={`/product/${product.id}`}>
             <div className="product">
              <div
               className="p-img"
               style={{
                // background: `url(${product.options[1]?.cover[0]})`,
                background: `url(${product.identity[0]?.preview_cover})`,
               }}
              ></div>
              {/* <h5 className="product-store">{brand.store.name}</h5> */}
              <p className="product-name">{product.identity[0]?.name}</p>
              <div className="product-price">
               {product.identity[0]?.preview_price ?? (
                <>
                 <span>¥ {product.options[1]?.price}</span>
                </>
               )}
              </div>
             </div>
            </a>
           </Col>
          </>
         );
        })}
        {/* </div> */}
       </Row>
      </Col>
     </Row>
    </div>
   </>
  );
 }
}
export default Search;
