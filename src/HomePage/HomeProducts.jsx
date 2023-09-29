import React, { Component } from "react";
import { Row, Col } from "antd";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../utitlties";
import AuthModalContent from "./../components/AuthModalContent";
import SaveToCollection from "./../components/Modals/SaveToCollection";
import { Modal as AntModal } from "antd";
import { connect } from "react-redux";
class HomeProducts extends Component {
 constructor(props) {
  super(props);
  this.state = {
   products: [],
   save_to_collection_modal: false,
   authModal: false,
   to_save_cover: "",
   to_save_productId: null,
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
 componentDidMount() {
  axios.get(`${API}dashboard/homepage/products`).then((response) => {
   console.log(response);
   const { products } = response.data;
   this.setState({
    products,
   });
  });
 }
 render() {
  return (
   <>
    <h2 className="right-home-text home-heading mt-3">
     <span className="compressed bold-compressed">products</span>
    </h2>
    <p className="right-home-text">Explore products, get CAD / 3D files</p>
    <div className="innertab py-5">
     <section id="home-products">
      <Row className="mt-3" gutter={24}>
       {this.state.products?.map((product, index) => {
        return (
          <Col key={index} className="gutter-row mb-3" md={6} sm={12} xs={12}>
           <div className="product">
            <a href={`/product/${product?.id}`}>
             <div
              className="p-img"
              style={{
               background: `url(${product?.identity[0]?.preview_cover})`,
              }}
             >
              <div className="prlayer"></div>
              <div
               className="actns-btn svbtn"
               onClick={(e) => {
                e.preventDefault();
                this.setState(
                 {
                  to_save_cover: product.identity[0]?.preview_cover,
                  to_save_productId: product?.identity[0],
                 },
                 () => {
                  this.saveToCollection();
                 }
                );
               }}
              >
               Save +
              </div>
              {product?.identity[0]?.file?.length > 0 ? (
               <>
                <div className="actns-btn file-btn cad">
                  <p>CAD</p>
                </div>
                <div className="actns-btn file-btn threeD"><p>3D</p></div>
               </>
              ) : (
               ""
              )}
             </div>
            </a>

            <h5 className="product-store">
             <a href={`/brand/${product?.store_id}`}>
              {product?.identity[0]?.store_name?.store_name}
             </a>
            </h5>
            {product?.identity[0]?.name?.length < 40 ? (
             <p className="product-name">{product?.identity[0]?.name}</p>
            ) : (
             <p className="product-name">{`${product?.identity[0]?.name?.slice(
              0,
              35
             )}...`}</p>
            )}
            <div className="product-price">
             {product?.identity[0]?.preview_price &&
             product?.identity[0]?.preview_price > 0 ? (
              <>
               <span>¥ {product?.identity[0]?.preview_price}</span>
              </>
             ) : (
              <Link
               to={{
                pathname: `/product/${product?.identity[0]?.product_id}`,
                state: {
                 request_price: true,
                },
               }}
              >
               REQUEST PRICE INFO
              </Link>
             )}
            </div>
           </div>
          </Col>
        );
       })}
      </Row>
      <Row>
       <a
        href="/categories"
        className="btn mt-4 seemore"
        style={{ paddingTop: "17px !important" }}
       >
        See More Products
       </a>
      </Row>
     </section>
    </div>
    <Modal
     size="lg"
     className="auth-modal"
     show={this.state.authModal && !this.props.isLoggedIn}
     onHide={() => this.setState({ authModal: false })}
     aria-labelledby="example-modal-sizes-title-lg"
     centered
    >
     <Modal.Body>
      <AuthModalContent />
     </Modal.Body>
    </Modal>

    <Modal
     size="lg"
     className="auth-modal"
     show={this.state.authModal && !this.props.isLoggedIn}
     onHide={() => this.setState({ authModal: false })}
     aria-labelledby="example-modal-sizes-title-lg"
     centered
    >
     <Modal.Body>
      <AuthModalContent />
     </Modal.Body>
    </Modal>
    <AntModal
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
    </AntModal>
   </>
  );
 }
}

// export default HomeProducts;

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
 };
};
export default connect(mapStateToProps, null)(HomeProducts);
