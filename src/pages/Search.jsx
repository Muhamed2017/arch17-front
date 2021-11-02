import React, { Component } from "react";
import axios from "axios";
import * as utility from "../utitlties";
import {
 kind_options,
 furniture_styles,
} from "./addProduct/ProductClassifications";
import {
 Row,
 Col,
 Form,
 Menu,
 Breadcrumb,
 Layout,
 Select,
 Checkbox,
 Dropdown,
 Button,
 Spin,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { API } from "./../utitlties";
const { SubMenu } = Menu;
const { Sider } = Layout;
const { Option } = Select;
class Search extends Component {
 constructor(props) {
  super(props);
  this.state = {
   categories: [],
   materials: [],
   styles: [],
   shapes: [],
   price: [],
   types: [],
   collapsed: false,
   products: [],
   fetching: false,
   selectedKindTitle: "Furniture",
   selectedKindOptions: [],
   selectedStyleOptions: [],
   kidsChecked: false,
   outdoorChecked: true,
   productFileKind: false,
  };
 }
 onTest = () => {
  axios
   .get("https://jsonplaceholder.typicode.com/posts")
   .then((response) => console.log(response));
 };
 menu = (
  <Menu onClick={this.handleMenuClick}>
   <Menu.Item key="1">1st menu item</Menu.Item>
   <Menu.Item key="2" icon={<UserOutlined />}>
    2nd menu item
   </Menu.Item>
   <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
 );
 onItemClick = () => {
  console.log(this.state.categories);
 };
 fetchProducts = () => {
  this.setState({ fetching: true });

  axios
   .get(
    `${API}search?filter[category]=${this.state.categories}
    &filter[type]=${this.state.types}
    &filter[style]=${this.state.styles}
    &filter[is_for_kids]=${this.state.kidsChecked ? "yes" : ""}
    &filter[is_outdoor]=${this.state.outdoorChecked ? "yes" : ""}`
   )
   .then((response) => {
    console.log(response);
    this.setState({ products: response.data.products, fetching: false });
   });
 };
 onCollapse = (collapsed) => {
  console.log(collapsed);
  this.setState({ collapsed });
 };
 onCategoriesSelect = (items) => {
  this.setState(
   { categories: items.selectedKeys, selectedKindTitle: `${items.key}` },
   () => {
    this.fetchProducts();
   }
  );
  if (items.key === "furniture") {
   this.setState({
    selectedKindOptions: kind_options,
    selectedStyleOptions: furniture_styles,
   });
  } else if (items.key === "Lighting") {
   this.setState({
    selectedKindOptions: [],
    selectedStyleOptions: [],
   });
  }
 };
 onMaterialsSelect = (items) => {
  this.setState({ materials: items.selectedKeys });
  this.fetchProducts();
 };
 onStylesSelect = (items) => {
  this.setState({ styles: items.selectedKeys });
  this.fetchProducts();
 };

 handleButtonClick = () => {
  console.log(this.state);
 };

 componentDidMount() {
  axios
   .get(`${API}search?filter[category]=${this.state.categories}`)
   .then((response) => {
    console.log(response);
    this.setState({
     products: response.data.products,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }
 onFilterChange = (values) => {
  console.log(values.value);
 };
 render() {
  return (
   <>
    <div id="search-page">
     <Row span={24} style={{ position: "relative" }}>
      <Col md={6} style={{ background: "" }}>
       <Sider
        // collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width={"100%"}
        className="site-layout-background"
        style={{ background: "#fff" }}
       >
        <Breadcrumb style={{ margin: "16px 0", background: "#fff" }}>
         <Breadcrumb.Item>{this.state.selectedKindTitle}</Breadcrumb.Item>
         <Breadcrumb.Item>List</Breadcrumb.Item>
         <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Form onFieldsChange={this.onFilterChange}>
         <Menu
          mode="inline"
          // multiple={true}
          onSelect={this.onCategoriesSelect}
          onDeselect={this.onCategoriesSelect}
          defaultOpenKeys={["categories"]}
          style={{ height: "100%", borderRight: 0, width: "100%" }}
         >
          <SubMenu
           key="categories"
           title="All Categories"
           //  onItemClick={this.onItemClick}
           onTitleClick={this.onItemClick}
          >
           <Menu.Item key="furniture">Furniture</Menu.Item>
           <Menu.Item key="Lighting">Lighting</Menu.Item>
           <Menu.Item key="Decore">Decore</Menu.Item>
           <Menu.Item key="Kitchen">Kitchen</Menu.Item>
           <Menu.Item key="Wellness">Wellness</Menu.Item>
           <Menu.Item key="Finishes">Finishes</Menu.Item>
           <Menu.Item key="Materials">Materials</Menu.Item>
           <Menu.Item key="Construction">Construction Products</Menu.Item>
          </SubMenu>
         </Menu>
         <Menu
          mode="inline"
          multiple={true}
          onSelect={this.onKindSelect}
          onDeselect={this.onKindSelect}
         >
          <SubMenu key="kinds" title={"All " + this.state.selectedKindTitle}>
           {this.state.selectedKindOptions.map((option, index) => {
            return (
             <>
              <Menu.Item key={option.value}>{option.value}</Menu.Item>
             </>
            );
           })}
          </SubMenu>
         </Menu>
         <Menu
          mode="inline"
          multiple={true}
          onSelect={this.onMaterialsSelect}
          onDeselect={this.onMaterialsSelect}
         >
          <SubMenu key="materials" title="Materials">
           <Menu.Item onSelect={() => this.onTest} key="Velvet">
            Velvet
           </Menu.Item>
           <Menu.Item key="Fabric">Fabric</Menu.Item>
           <Menu.Item key="Synthetic fiber">Synthetic fiber</Menu.Item>
           <Menu.Item key="Polyester">Polyester</Menu.Item>
           <Menu.Item key="Dacron®">Dacron®</Menu.Item>
           <Menu.Item key="Microfiber">Microfiber</Menu.Item>
           <Menu.Item key="Polyester">Polyester</Menu.Item>
           <Menu.Item key="Janus-fiber®">Janus-fiber®</Menu.Item>
           <Menu.Item key="Sunbrella®">Sunbrella®</Menu.Item>
           <Menu.Item key="Textilene">Textilene</Menu.Item>
           {/* <Menu.Item key="Polyester">Polyester</Menu.Item> */}
           {/* <Menu.Item key="Polyester">Polyester</Menu.Item> */}
          </SubMenu>
         </Menu>
         {this.state.selectedStyleOptions.length > 0 && (
          <>
           <Menu
            mode="inline"
            multiple={true}
            onSelect={this.onStylesSelect}
            onDeselect={this.onStylesSelect}
           >
            <SubMenu key="styles" title="Style">
             {this.state.selectedStyleOptions.map((style, index) => {
              return (
               <>
                <Menu.Item key={style.value}>{style.value}</Menu.Item>;
               </>
              );
             })}
            </SubMenu>
            {/* <SubMenu key="price" title="Price">
           <Slider marks={{}} />
          </SubMenu> */}
           </Menu>
          </>
         )}
        </Form>
       </Sider>
      </Col>
      <Col md={18} className="px-3">
       <Row span={24} style={{ background: "" }}>
        <Col md={12}>
         <div className="checkboxes">
          <Checkbox
           //  value={this.state.outdoorChecked}
           onChange={(e) => {
            this.setState(
             {
              outdoorChecked: e.target.checked,
             },
             () => {
              this.fetchProducts();
             }
            );
           }}
           style={{
            lineHeight: "32px",
            marginRight: "25px",
            borderRadius: "25px",
            padding: "0px 15px",
            border: "0.5px solid #EAEAEA",
           }}
          >
           Outdoor
          </Checkbox>
          <Checkbox
           //  value="yes"
           onChange={(e) => {
            this.setState(
             {
              kidsChecked: e.target.checked,
             },
             () => {
              this.fetchProducts();
             }
            );
           }}
           style={{
            lineHeight: "32px",
            marginRight: "25px",
            borderRadius: "25px",
            padding: "0px 15px",
            border: "0.5px solid #EAEAEA",
           }}
          >
           For Kids
          </Checkbox>
          <Checkbox
           value="3d-cad"
           style={{
            lineHeight: "32px",
            marginRight: "25px",
            borderRadius: "25px",
            padding: "0px 15px",
            border: "0.5px solid #EAEAEA",
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
           <Button style={{ border: "none", boxShadow: "none" }}>
            Room /Space
           </Button>
          </Dropdown>
          <Dropdown overlay={this.menu}>
           <Button style={{ border: "none", boxShadow: "none" }}>
            Sort By
           </Button>
          </Dropdown>
         </div>
        </Col>
       </Row>
       <Row gutter={24} className="my-3">
        {this.state.fetching && (
         <>
          {" "}
          <Spin
           size="large"
           style={{ position: "absolute", top: "50%", right: "50%" }}
          />
         </>
        )}
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
                // background: `url(${product.identity[0]?.preview_cover})`,
                background: `url(${product.preview_cover})`,
               }}
              ></div>
              {/* <h5 className="product-store">{brand.store.name}</h5> */}
              {/* <p className="product-name">{product.identity[0]?.name}</p> */}
              <p className="product-name">{product.name}</p>
              <div className="product-price">
               {product.preview_price ? (
                <>
                 <span>¥ {product.preview_price}</span>
                </>
               ) : (
                ""
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
