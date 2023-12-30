import React, { Component } from "react";
import { connect } from "react-redux";

import "../../src/App.css";
import "../../src/pages/css/Type.css";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

import { Row, Col, Modal, Tooltip, Select, Spin } from "antd";

import { Link } from "react-router-dom";
import { API } from "./../utitlties";
import SaveToCollection from "./../components/Modals/SaveToCollection";
import { IoIosCheckbox } from "react-icons/io";
import {
 IoInformationCircleSharp,
 IoLocationSharp,
 IoEarthSharp,
} from "react-icons/io5";
import { AiTwotoneEye } from "react-icons/ai";
class Type extends Component {
 constructor(props) {
  super(props);
  this.state = {
   save_to_collection_modal: false,
   to_save_cover: null,
   to_save_productId: null,
   brand_id: this.props.match.params.store_id,
   type_name: this.props.match.params.type_name,
   collection: {
    id: this.props.match.params.store_id,
    name: "",
    count: "",
    store_name: "",
    store_id: "",
   },
   authModal: false,
   brand: null,
   products: [],
   selectedTypes: "",
   addedTypes: [],
   productsLoading: true,
  };
 }

 saveToCollection = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
   console.log("SSSSS");
  } else {
   this.setState({
    save_to_collection_modal: true,
   });
  }
 };
 handleFilterChange = () => {
  this.setState({ productsLoading: true });
  axios
   .get(
    `${API}brandtypefilter/${this.state.brand_id}?filter[kind]=${this.state.type_name}&filter[type]=${this.state.selectedTypes}`
   )
   .then((response) => {
    console.log(response);
    this.setState((state) => ({
     productsLoading: false,
     products: response.data.products.data,
     brand: response.data.products.data[0].store_name,
     addedTypes:
      this.state.addedTypes.length < 1
       ? response.data.products?.data.map((product) => {
          return product.type;
         })
       : this.state.addedTypes,
    }));
   });
 };
 handleTypeChange = (selectedTypes) => {
  this.setState({ selectedTypes }, () => {
   this.handleFilterChange();
  });
 };
 componentDidMount() {
  console.log(this.props.match.params.type_name);
  this.handleFilterChange();
 }
 StoreCard = (props) => {
  return (
   <>
    <div className="store-card">
     <Row span={24} gutter={12}>
      <Col md={10}>
       <img src={props.logo} alt="" />
      </Col>
      <Col md={14}>
       <h2 className="mb-4">{props.name}</h2>
       <p>
        <IoInformationCircleSharp />
        {/* Brand */}
        {props.type}
       </p>
       <p>
        <IoLocationSharp />
        {props.location?.city}
       </p>
       <p>
        <IoIosCheckbox />
        120 Followers
       </p>
      </Col>
     </Row>
     <Row span={24} className="my-3" gutter={8}>
      <Col md={10}>
       <button>
        <IoIosCheckbox /> Following
       </button>
      </Col>
      <Col md={10}>
       <button>
        <AiTwotoneEye />
        View
       </button>
      </Col>
      <Col md={4}>
       {props.website && props.website.length > 0 && (
        <a href={props.website} target="_blank" rel="noreferrer">
         <button>
          <IoEarthSharp />
         </button>
        </a>
       )}
      </Col>
     </Row>
    </div>
   </>
  );
 };
 render() {
  const types = this.state.addedTypes?.flat(1);
  let types_unique = [];

  return (
   <>
    <div id="collection-page">
     <div className="head-container">
      <p className="name">{this.state.type_name}</p>
      <p className="creator">
       Products by
       <a href={`/brand/${this.state.brand?.store_id}`} className="">
        {/* <Tooltip
         overlayInnerStyle={{
          height: 250,
          minWidth: 420,
         }}
         title={
          <this.StoreCard
           name={this.state.brand?.store_name.slice(0, 18)}
           logo={this.state.brand?.logo}
           id={this.state.brand?.id}
           website={this.state.brand?.official_website}
           type={this.state.brand?.type}
           location={{
            country: null,
            city: this.state.brand?.city,
           }}
           followers={10}
          />
         }
         color={"#18191a"}
         placement="rightTop"
        > */}
        <span> {this.state.brand?.store_name}</span>
        {/* </Tooltip> */}
       </a>
      </p>
     </div>
     {this.state.productsLoading && (
      <Spin
       size="large"
       indicator={
        <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
       }
       style={{
        position: "absolute",
        top: "60%",
        left: "50%",

        minHeight: 400,
       }}
      />
     )}
     <div
      className="products"
      style={{ position: "relative", minHeight: 1000 }}
     >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="my-4">
       <Col className="gutter-row" span={6}>
        <Select
         showSearch
         size="large"
         value={this.state.selectedTypes}
         onChange={this.handleTypeChange}
         style={{ width: "100%" }}
        >
         {/* {types.map((item) => {
          return (
           <Select.Option key={item.value} value={item.value}>
            {item.value}
           </Select.Option>
          );
         })} */}
         {types.map((item) => {
          if (!types_unique.includes(item.value)) {
           types_unique.push(item.value);
           return (
            <Select.Option key={item.value} value={item.value}>
             {item.value}
            </Select.Option>
           );
          }
         })}
        </Select>
       </Col>

       <Col className="gutter-row" md={18}>
        <p className="count">
         <span>{this.state.products.length}</span> Products
        </p>
       </Col>
      </Row>
      {!this.state.productsLoading && (
       <>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} className="mt-5">
         {this.state.products.map((product, index) => {
          return (
           <Col className="gutter-row mb-3" md={6}>
            <a href={`/product/${product.id}`}>
             <div className="product">
              <div
               className="p-img"
               style={{
                background: `url(${product.preview_cover})`,
               }}
              >
               <div className="prlayer"></div>

               <div
                className="actns-btn svbtn"
                onClick={(e) => {
                 e.preventDefault();
                 this.setState(
                  {
                   to_save_cover: product.preview_cover,
                   to_save_productId: product,
                  },
                  () => {
                   this.saveToCollection();
                  }
                 );
                }}
               >
                Save +
               </div>
               {product?.file?.length > 0 ? (
                <>
                 <div className="actns-btn file-btn cad">CAD</div>
                 <div className="actns-btn file-btn threeD">3D</div>
                </>
               ) : (
                ""
               )}
              </div>
              <h5 className="product-store">
               {product.store_name?.store_name}
              </h5>
              <p className="product-name">{product.name}</p>
              <div className="product-price">
               {product.preview_price && product.preview_price > 0 ? (
                <>
                 <span>¥ {product.preview_price}</span>
                </>
               ) : (
                <>
                 <Link
                  to={{
                   pathname: `/product/${product?.product_id}`,
                   state: {
                    request_price: true,
                   },
                  }}
                 >
                  REQUEST PRICE INFO
                 </Link>
                </>
               )}
              </div>
             </div>
            </a>
           </Col>
          );
         })}
        </Row>
       </>
      )}
     </div>
    </div>
    <Modal
     title={this.state.save_to_collection_modal}
     width={700}
     className="request-modal"
     visible={this.state.save_to_collection_modal}
     destroyOnClose={true}
     footer={false}
     closeIcon={
      <>
       <div onClick={() => this.setState({ save_to_collection_modal: false })}>
        X
       </div>
      </>
     }
     okButtonProps={{ hidden: true }}
     cancelButtonProps={{ hidden: true }}
     requestType={this.state.request_modal_type}
    >
     <SaveToCollection
      cover={this.state.to_save_cover}
      product={this.state.to_save_productId}
     />
    </Modal>
   </>
  );
 }
}
// export default Collection;
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
 };
};
export default connect(mapStateToProps, null)(Type);
