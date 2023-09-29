import React, { Component } from "react";
import { connect } from "react-redux";
import "../../src/App.css";
import "../../src/pages/css/Collection.css";
import axios from "axios";

import { Row, Col, Spin } from "antd";
import { API } from "./../utitlties";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

class DesignerProducts extends Component {
 constructor(props) {
  super(props);
  this.state = {
   save_to_collection_modal: false,
   to_save_cover: null,
   to_save_productId: null,
   removing: false,
   collection_name: "",
   shareUrl: `https://www.arch17test.live/usercollection/${this.props.match.params.id}`,
   designer: {
    id: this.props.match.params.id,
   },
   authModal: false,
   brand: null,
   products: [],
   followers: [],
   visible: false,
   editing: false,
   deleting: false,
   deleted: false,
   fetched: false,
   company: null,
   share_modal: false,
   copied: false,
  };
 }

 handleCopy = async (text) => {
  if ("clipboard" in navigator) {
   return await navigator.clipboard.writeText(text);
  } else {
   return document.execCommand("copy", true, text);
  }
 };
 componentDidMount() {
  console.log(this.props.uid);
  console.log(window.location.pathname);
  if (window.location.pathname.includes("/designerproducts/")) {
   axios
    .get(`${API}designerproducts/${this.props.match.params.id}`)
    .then((response) => {
     console.log(response);
     this.setState((state) => ({
      designer: response.data.designer,
      products: response.data.products,
      fetched: true,
     }));
    });
  }
  if (window.location.pathname.includes("/companyproducts/")) {
   axios
    .get(`${API}companyproducts/${this.props.match.params.id}`)
    .then((response) => {
     console.log(response);
     this.setState((state) => ({
      company: response.data.company,
      products: response.data.products,
      fetched: true,
     }));
    });
  }
 }

 render() {
  if (!this.state.fetched)
   return (
    <>
     <Spin
      size="large"
      indicator={
       <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
      }
      style={{ position: "absolute", top: "40%", right: "50%" }}
     />
    </>
   );
  return (
   <>
    <div id="collection-page">
     <div className="head-container">
      <p className="col-name pt-5">
       Designed By
       {this.state.company ? (
        <a href={`/company/${this.state.company?.id}`}>
         <span className="px-2 pr-5">{this.state.company?.name}</span>
        </a>
       ) : (
        <a href={`/user/${this.state.designer?.uid}`}>
         <span className="px-2 pr-5">{this.state.designer?.displayName}</span>
        </a>
       )}
      </p>
     </div>

     <>
      <div className="products">
       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} className="py-5">
        {this.state.products.length > 0 ? (
         <>
          {this.state.products.map((product, index) => {
           return (
            <Col className="gutter-row mb-3" md={6}>
             <a href={`/product/${product.id}`}>
              <div className="product">
               <div
                className="p-img"
                style={{
                 background: `url(${product?.identity[0].preview_cover})`,
                }}
               >
                <div className="prlayer"></div>

                {product?.files?.length > 0 ? (
                 <>
                  <div className="actns-btn file-btn cad">CAD</div>
                  <div className="actns-btn file-btn threeD">3D</div>
                 </>
                ) : (
                 ""
                )}
               </div>
               <h5 className="product-store">{product.stores?.name}</h5>
               <p className="product-name">{product?.identity[0].name}</p>
               <div className="product-price">
                {product.identity[0].preview_price &&
                product.identity[0].preview_price > 0 ? (
                 <>
                  <span>¥ {product.identity[0].preview_price}</span>
                 </>
                ) : (
                 <>
                  <Link
                   to={{
                    pathname: `/product/${product?.identity[0].product_id}`,
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
         </>
        ) : (
         <>
          <p className="indicator">
           You Don't have any products in the collection
          </p>
         </>
        )}
       </Row>
      </div>
     </>
    </div>
   </>
  );
 }
}
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
 };
};
export default connect(mapStateToProps, null)(DesignerProducts);
