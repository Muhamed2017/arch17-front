import React, { Component } from "react";
import { connect } from "react-redux";

import "../../src/App.css";
import "../../src/pages/css/Collection.css";
import axios from "axios";
import { auth } from "../firebase";
import { LoadingOutlined } from "@ant-design/icons";

import { Row, Col, Modal, Tooltip, Spin } from "antd";
import { API } from "./../utitlties";
import SaveToCollection from "./../components/Modals/SaveToCollection";
import { IoIosCheckbox } from "react-icons/io";
import { Link } from "react-router-dom";
import {
 IoInformationCircleSharp,
 IoLocationSharp,
 IoEarthSharp,
} from "react-icons/io5";
import { AiTwotoneEye } from "react-icons/ai";
class Collection extends Component {
 constructor(props) {
  super(props);
  this.state = {
   save_to_collection_modal: false,
   to_save_cover: null,
   to_save_productId: null,
   collection: {
    id: this.props.match.params.id,
    name: "",
    count: "",
    store_name: "",
    store_id: "",
   },
   authModal: false,
   brand: null,
   products: [],
   followers: [],
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
 handleFollow = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
   console.log("SSSSS");
  } else {
   this.setState({ follow_loading: true });
   const fd = new FormData();
   fd.append("user_id", this.props.uid);
   axios
    .post(`${API}brand/follow/${this.state.brand.id}`, fd)
    .then((response) => {
     console.log(response);
     this.setState({
      followers: response.data.message.followers,
      follow_loading: false,
     });
    });
  }
 };
 handleUnfollowStore = async () => {
  this.setState({ follow_loading: true });
  const fd = new FormData();
  fd.append("user_id", this.props.uid);
  await axios
   .post(`${API}brand/unfollow/${this.state.brand.id}`, fd)
   .then((response) => {
    console.log(response);

    this.setState({
     follow_loading: false,
     followers: response.data.message.followers,
    });
   });
 };
 componentDidMount() {
  axios.get(`${API}col/${this.state.collection.id}`).then((response) => {
   console.log(response);
   this.setState((state) => ({
    products: response.data.products,
    brand: response.data.products[0].stores,
    followers: response.data.store.followers,
    collection: {
     ...state.collection,
     name: response.data.collection.collection_name,
     count: response.data.collection.products.count,
     store_name: response.data.collection?.products?.products_info?.store,
     store_id: "",
    },
   }));
  });
 }
 StoreCard = (props) => {
  return (
   <>
    <div className="store-card">
     <Row span={24} gutter={12}>
      <Col md={10}>
       {props.logo && props.logo.length > 10 ? (
        <img src={props.logo} alt="" />
       ) : (
        <div className="nlogo">{props.name[0]}</div>
       )}
      </Col>
      <Col md={14}>
       <h2 className="mb-4">{props.name}</h2>
       <p>
        <IoInformationCircleSharp />
        {props.type}
       </p>
       {props?.location.city && props.location.city.length > 0 && (
        <p>
         <IoLocationSharp />
         {props.location.country} ,{props.location?.city}
        </p>
       )}

       <p>
        <IoIosCheckbox />
        {this.state.followers.length} Followers
       </p>
      </Col>
     </Row>
     <Row span={24} className="my-4" gutter={8}>
      <Col md={9}>
       {this.state.followers.includes(this.props.uid) &&
       this.props.isLoggedIn ? (
        <>
         <button className="flow" onClick={this.handleUnfollowStore}>
          {this.state.follow_loading ? (
           <>
            <Spin
             size="large"
             indicator={
              <LoadingOutlined
               style={{ fontSize: "15px", color: "#fff" }}
               spin
              />
             }
            />
           </>
          ) : (
           "Following"
          )}
         </button>
        </>
       ) : (
        <>
         <button className="nflow" onClick={this.handleFollow}>
          {this.state.follow_loading ? (
           <Spin
            size="large"
            indicator={
             <LoadingOutlined
              style={{ fontSize: "15px", color: "#fff" }}
              spin
             />
            }
           />
          ) : (
           "Follow"
          )}
         </button>
        </>
       )}
      </Col>
      <Col md={9}>
       <a className="btn" href={`/brand/${this.state.brand?.id}`}>
        View
       </a>
      </Col>
      <Col md={6}>
       {props.website && props.website.length > 0 && (
        <a href={props.website} target="_blank" rel="noreferrer">
         <button style={{ fontSize: "1.3rem" }}>
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
  return (
   <>
    <div id="collection-page">
     <div className="head-container">
      <p className="name">{this.state.collection.name}</p>
      <p className="creator">
       Products by
       <a href={`/brand/${this.state.brand?.id}`}>
        <Tooltip
         overlayInnerStyle={{
          height: 250,
          minWidth: 420,
         }}
         title={
          <this.StoreCard
           name={this.state.collection.store_name.slice(0, 18)}
           logo={this.state.brand?.logo}
           id={this.state.brand?.id}
           website={this.state.brand?.official_website}
           type={this.state.brand?.type}
           location={{
            country: this.state.brand?.country,
            city: this.state.brand?.city,
           }}
           followers={10}
          />
         }
         color={"#18191a"}
         placement="rightTop"
        >
         <span> {this.state.collection.store_name}</span>
        </Tooltip>
       </a>
      </p>
     </div>
     <>
      <div className="products">
       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} className="py-5">
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
              <div
               className="actns-btn svbtn"
               onClick={(e) => {
                e.preventDefault();
                this.setState(
                 {
                  to_save_cover: product?.identity[0].preview_cover,
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
       </Row>
      </div>
     </>
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
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
 };
};
export default connect(mapStateToProps, null)(Collection);
