import React, { Component } from "react";
import { connect } from "react-redux";

import "../../src/App.css";
import "../../src/pages/css/Collection.css";
import axios from "axios";
// import { auth } from "../firebase";
import { Redirect } from "react-router";

import { LoadingOutlined, EditFilled } from "@ant-design/icons";

import {
 Row,
 Col,
 Modal,
 //  Tooltip,
 Drawer,
 Spin,
 Button,
 Input,
 Checkbox,
} from "antd";
import { API } from "./../utitlties";
import SaveToCollection from "./../components/Modals/SaveToCollection";
import { IoIosCheckbox } from "react-icons/io";
import { Link } from "react-router-dom";
import {
 IoInformationCircleSharp,
 IoLocationSharp,
 IoEarthSharp,
} from "react-icons/io5";
class Collection extends Component {
 constructor(props) {
  super(props);
  this.state = {
   save_to_collection_modal: false,
   to_save_cover: null,
   visible: false,
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
   editing: false,
   deleted: false,
   deleting: false,
   name: "",
   loading: true,
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
  axios.get(`${API}col-product/${this.state.collection.id}`).then((response) => {
    console.log(response);
    this.setState((state) => ({
     products: response.data.products,
     loading: false,
     
    }));
   });
  axios.get(`${API}col/${this.state.collection.id}`).then((response) => {
   console.log(response);
   this.setState((state) => ({
    // products: response.data.products,
    // loading: false,
    brand: response.data.store[0],
    name: response.data.collection.collection_name,
    followers: response.data.store?.followers,
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

 handleEditCollection = () => {
  const fd = new FormData();
  fd.append("collection_name", this.state.name);
  this.setState({
   editing: true,
  });
  axios
   .post(`${API}brandcollection/update/${this.state.collection.id}`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     visible: false,
     editing: false,
    });
   })

   .catch((err) => {
    console.log(err);
   });
 };

 StoreCard = (props) => {
  return (
   <>
    <div className="store-card">
     <Row span={24} gutter={12}>
      <Col md={10}>
       {props.logo && props.logo?.length > 10 ? (
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
       {props?.location.city && props.location.city?.length > 0 && (
        <p>
         <IoLocationSharp />
         {props.location.country} ,{props.location?.city}
        </p>
       )}

       <p>
        <IoIosCheckbox />
        {this.state.followers?.length} Followers
       </p>
      </Col>
     </Row>
     <Row span={24} className="my-4" gutter={8}>
      <Col md={9}>
       {this.state.followers?.includes(this.props.uid) &&
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
       {props.website && props.website?.length > 0 && (
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

 handleDeleteCollection = () => {
  this.setState({
   deleting: true,
  });
  axios
   .post(`${API}brandcollection/delete/${this.state.collection?.id}`)
   .then((response) => {
    console.log(response);
    this.setState({
     deleting: false,
     deleted: true,
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };
 handleRemoveFromCollection = (product_id, collection_id) => {
  this.setState({
   removing: true,
  });
  const fd = new FormData();
  fd.append("product_id", product_id);
  fd.append("collection_id", collection_id);
  axios
   .post(`${API}rmcol`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     removing: false,
     products: this.state.products.filter((p) => {
      return p.id !== product_id;
     }),
    });
   })
   .catch((err) => {});
 };

 render() {
  if (this.state.deleted)
   return <Redirect to={`/brand/${this.state.brand.id}`} />;
  return (
   <>
    {!this.state.loading ? (
     <>
      <div id="collection-page">
       <div className="head-container">
        <div className="head-wrapper">
         <p className="name">{this.state.name}</p>
         <p className="creator">
          Products by
          <a href={`/brand/${this.state.brand?.id}`} className="bold px-2">
           {this.state.brand?.name}
          </a>
         </p>
         {this.state.brand?.user_id === this.props.uid && (
          <EditFilled onClick={() => this.setState({ visible: true })} />
         )}
         {this.props.uid === this.state.brand?.user_id && (
          <>
           <p className="delete-p" onClick={this.handleDeleteCollection}>
            {this.state.deleting ? (
             <>
              <Spin
               size="large"
               indicator={
                <LoadingOutlined
                 style={{ fontSize: "15px", color: "#000" }}
                 spin
                />
               }
              />
             </>
            ) : (
             "Delete Collection"
            )}
           </p>
          </>
         )}
        </div>
       </div>
       <>
        <div className="products">
         <Row gutter={{ xs: 12, sm: 16, md: 24, lg: 24 }} className="py-5">
          {this.state.products.map((product, index) => {
           return (
            <Col className="gutter-row mb-3" lg={6} md={6} xs={12} sm={12}>
             <a href={`/product/${product.id}`}>
              <div className="product">
               <div
                className="p-img"
                style={{
                 background: `url(${product?.preview_cover})`,
                }}
               >
                <div className="prlayer"></div>
                {this.state.brand?.user_id === this.props.uid ? (
                 <>
                  <div
                   className="actns-btn svbtn"
                   style={{
                    background: "red",
                    color: "#fff",
                    border: "none",
                    minHeight: "29px",
                    textAlign: "center",
                    fontSize: ".8rem",
                    fontWeight: "600",
                    width: "80px",
                   }}
                   onClick={(e) => {
                    e.preventDefault();
                    this.handleRemoveFromCollection(
                     product.product_id,
                     this.state.collection?.id
                    );
                   }}
                  >
                   {this.state.removing ? (
                    <>
                     <Spin
                      size="large"
                      indicator={
                       <LoadingOutlined
                        style={{ fontSize: "20px", color: "#000" }}
                        spin
                       />
                      }
                     />
                    </>
                   ) : (
                    "REMOVE -"
                   )}
                  </div>
                 </>
                ) : (
                 <>
                  <div
                   className="actns-btn svbtn"
                   onClick={(e) => {
                    e.preventDefault();
                    this.setState(
                     {
                      to_save_cover: product?.preview_cover,
                      to_save_productId: {id:product.product_id},
                     },
                     () => {
                      this.saveToCollection();
                     }
                    );
                   }}
                  >
                   Save +
                  </div>
                 </>
                )}
                {product?.files?.length > 0 ? (
                 <>
                  <div className="actns-btn file-btn cad">CAD</div>
                  <div className="actns-btn file-btn threeD">3D</div>
                 </>
                ) : (
                 ""
                )}
               </div>
               {/* <h5 className="product-store">{product.stores?.name}</h5> */}
               <p className="product-name">{product?.name}</p>
               <div className="product-price">
                {product?.preview_price &&
                product?.preview_price > 0 ? (
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
        <div onClick={() => this.setState({ save_to_collection_modal: false })}>
         X
        </div>
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
      <Drawer
       title="Edit Collection"
       placement={"left"}
       width={350}
       onClose={() => this.setState({ visible: false })}
       visible={this.state.visible}
      >
       <Input
        value={this.state.name}
        size="large"
        style={{ width: "100%", margin: "10px auto" }}
        placeholder={`Rename Collection`}
        onChange={(e) => this.setState({ name: e.target.value })}
       />
       <Checkbox
        onChange={(e) => {
         this.setState({ Ispublic: e.target.checked });
        }}
       >
        Visible
       </Checkbox>

       <Row className="mt-5" justify="right">
        <Col>
         <Button onClick={this.handleEditCollection}>
          {this.state.editing ? (
           <>
            <Spin
             size="large"
             indicator={
              <LoadingOutlined
               style={{ fontSize: "15px", color: "#000" }}
               spin
              />
             }
            />
           </>
          ) : (
           "Save"
          )}
         </Button>
        </Col>
       </Row>
      </Drawer>
     </>
    ) : (
     <>
      <Spin
       size="large"
       indicator={
        <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
       }
       style={{ position: "absolute", top: "40%", right: "50%" }}
      />
     </>
    )}
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
