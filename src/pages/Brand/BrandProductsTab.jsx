import React, { Component } from "react";
// import React, { Component } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col, Spin, Select } from "antd";
// import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
// import en from "world_countries_lists/data/countries/en/world.json";

import "../../src/pages/Brand.css";
import axios from "axios";
import * as utility from "../utitlties";
// import { connect } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
// import { Form, Button } from "react-bootstrap";
// import blank from "../../src/blank.jpg";
// import { auth } from "../firebase";
// import toast, { Toaster } from "react-hot-toast";
// import { IoEarthSharp, IoShareSocial } from "react-icons/io5";
// import { API } from "./../utitlties";
// import ReactFlagsSelect from "react-flags-select";
import { Link } from "react-router-dom";
// import {
//  vanillaSigninEmailPassword,
//  signupFacebook,
//  signupGoogle,
//  signupEmailPassword,
// } from "../redux/actions/authActions";
// import { toast as toastifing, Flip } from "react-toastify";
// import { Modal } from "react-bootstrap";
// import ClipLoader from "react-spinners/ClipLoader";
// import Cropper from "react-cropper";
// import { IoMdCloudUpload } from "react-icons/io";
// import HashLoader from "react-spinners/HashLoader";
// import { IoIosMail } from "react-icons/io";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
// import imageCompression from "browser-image-compression";
// import * as constants from "./addProduct/ProductClassifications";
// import TypesSection from "./Brand/TypesSection";
// import CollectionsSection from "./Brand/CollectionsSection";
// import SearchUsersModal from "../components/Modals/TransferBrand/SearchUsersModal";
class BrandProductsTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   selectedTypes: [],
   selectedCategory: "",
   selectedKind: "",
   addedKinds: [],
   addedCategories: [],
   addedTypes: [],
   filter: false,
   productLoading: true,
  };
 }

 componentDidMount() {
  axios
   .get(`${utility.API}store-products/${this.state.brand_id}`)

   .then((response) => {
    const { products } = response.data;
    this.setState({
     products,
     addedKinds: [],
     productLoading: false,
     addedCategories: products?.map((product) => {
      return product?.category;
     }),
     addedTypes: products?.map((product) => {
      return product?.type;
     }),
    });
   });
 }
 render() {
  const categories = [...new Set(this.state.addedCategories)];
  const types = this.state.addedTypes?.flat(1);
  let types_unique = [];

  return (
   <>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="py-5">
     <Col className="gutter-row" span={5}>
      <Select
       size="large"
       value={this.state.selectedCategory}
       onChange={this.handleCategoryChange}
       style={{ width: "100%" }}
      >
       <Select.Option key="All" value="">
        All
       </Select.Option>
       {categories.map((item) => (
        <Select.Option key={item} value={item}>
         {item}
        </Select.Option>
       ))}
      </Select>
     </Col>

     <Col className="gutter-row" span={5}>
      {this.state.selectedCategory.length > 0 && (
       <>
        <Select
         showSearch
         size="large"
         aria-placeholder={`All ${this.state.selectedCategory}`}
         value={this.state.selectedKind}
         onChange={this.handleKindChange}
         style={{ width: "100%" }}
        >
         <Select.Option key="All" value="">
          All
         </Select.Option>
         {this.state.types.map((item) => (
          <Select.Option key={item.id} value={item.name}>
           {item.name}
          </Select.Option>
         ))}
        </Select>
       </>
      )}
     </Col>

     <Col className="gutter-row" span={5}>
      {this.state.selectedKind.length > 0 &&
       this.state.selectedCategory.length > 0 && (
        <>
         <Select
          showSearch
          size="large"
          value={this.state.selectedTypes}
          onChange={this.handleTypeChange}
          style={{ width: "100%" }}
         >
          <Select.Option key="All" value="">
           All
          </Select.Option>
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
        </>
       )}
     </Col>

     <Col className="gutter-row" md={9}>
      <p className="count">
       <span>{this.state.products.length}</span> Products
      </p>
     </Col>
    </Row>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="py-5">
     {this.state.isOwner && this.props.isLoggedIn && (
      <>
       <Col className="gutter-row" span={6}>
        <a href={`/add-product/${this.state.brand_id}`} className="arch-link">
         <div className="product">
          <div className="p-img" style={{ opacity: "0.03" }}></div>
          <div className="plus-icon">
           <AiOutlinePlus />
           Add Product
          </div>
         </div>
        </a>
       </Col>
      </>
     )}

     {this.state.productLoading && (
      <>
       <Spin
        size="large"
        indicator={
         <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
        }
        style={{
         position: "absolute",
         top: "20%",
         right: "35%",

         minHeight: 400,
        }}
       />
      </>
     )}
     {!this.state.productLoading && (
      <>
       {this.state.products?.map((product, index) => {
        if (!this.state.filter) {
         return (
          <>
           {product?.preview_cover &&
            product?.preview_cover !== "null" &&
            product?.preview_cover?.length > 5 && (
             <Col className="gutter-row" span={6}>
              <a href={`/product/${product.id}`}>
               <div className="product">
                <div
                 className="p-img"
                 style={{
                  background: `url(${product?.preview_cover})`,
                 }}
                >
                 <div className="prlayer"></div>
                 {product?.product_file_kind === "yes" ? (
                  <>
                   <div className="actns-btn file-btn cad">CAD</div>
                   <div className="actns-btn file-btn threeD">3D</div>
                  </>
                 ) : (
                  ""
                 )}
                </div>
                <h5 className="product-store">{this.props.store.name}</h5>
                <p className="product-name">{product?.name}</p>
                <div className="product-price">
                 {product?.preview_price && product?.preview_price > 0 ? (
                  <>
                   <span>¥ {product?.preview_price}</span>
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
            )}
          </>
         );
        } else {
         return (
          <>
           <Col className="gutter-row" span={6}>
            <a href={`/product/${product.product_id}`}>
             <div className="product">
              <div
               className="p-img"
               style={{
                background: `url(${product.preview_cover})`,
               }}
              ></div>
              <h5 className="product-store">{this.props.store.name}</h5>
              <p className="product-name">{product.name}</p>
              <div className="product-price">
               {product.preview_price ?? (
                <>
                 <span>¥ {product.preview_price}</span>
                </>
               )}
              </div>
             </div>
            </a>
           </Col>
          </>
         );
        }
       })}
      </>
     )}
    </Row>
   </>
  );
 }
}

export default BrandProductsTab;
