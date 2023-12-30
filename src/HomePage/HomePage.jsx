import React, { Component } from "react";
import { Container, Modal } from "react-bootstrap";
import {
 Spin,
 Collapse,
 Modal as AntModal,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SuccessModal from "../components/Modals/SuccessModal";


import "./HomePage.css";
import axios from "axios";
import { API } from "./../utitlties";
import { connect } from "react-redux";
import HomeSlider from "./HomeSlider";
import HeroSection from "./HeroSection";
import HomeProjects from "./HomeProjects";
import HomeProducts from "./HomeProducts";
import HomeStores from "./HomeStores";
import AuthModalContent from "../components/AuthModalContent";
import Footer from "../components/Footer";

const { Panel } = Collapse;
class HomePage extends Component {
 state = {
  products: [],
  fetching: false,
  projects_types: {},
  recent_projects: [],
  // homeLoaded: false,
  homeLoaded: true,
  stores: [],
  authModal: false,
  subscribe_email: "",
  subscribing: false,
  subscribe_checked: false,
  to_save_productId: null,
  to_save_cover: "",
  save_to_collection_modal: false,
  to_save_project_cover: "",
  to_save_projectId: null,
  save_to_board_modal: false,
  slides: [],
  heros: [],
 };

 toggleCreteStore = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
  } else {
   return;
  }
 };

 subscribe = (email, checked) => {
  this.setState({
   subscribing: true,
  });
  console.log(email);
  console.log(checked);
  const fd = new FormData();
  fd.append("email", email);
  fd.append("proccessing_personal_data_approval", checked ? "yes" : "no");
  axios
   .post(`${API}subscribe`, fd)
   .then((response) => {
    this.setState({
     subscribing: false,
     subscribe_email: "",
    });
    SuccessModal(
     <>
      <h2 className="success-head">Subscribed</h2>
      <p className="success-msg">Thank you for subscribtion</p>
     </>
    );
    console.log(response);
   })
   .catch((error) => {
    this.setState({
     subscribing: false,
     subscribe_email: "",
    });
    console.log(error);
   });
 };



 componentDidMount() {
  console.log(this.props.homepage);
  this.setState({ fetching: true });

  // axios.get(`${API}dashboard/homepage/media`).then((response) => {
  //  console.log(response);
  //  const { slides, heros } = response.data;
  //  this.setState({
  //   slides,
  //   heros,
  //   homeLoaded: true,
  //  });
  // });
 }
 render() {
  if (this.state.homeLoaded) {
   return (
    <React.Fragment>
     <div id="homepage">
      <div className="bg-gray">
       <div id="sec-nav">
        <div className="inner">
         <nav className="menu">
          <ol className="px-0">
           <li className="menu-item">
            <a href="/products?category=furniture">Furniture</a>
           </li>
           <li className="menu-item">
            <a href="products?category=lighting">Lighting</a>
            <div className="floating-list">list3</div>
           </li>
           <li className="menu-item">
            <a href="/products?category=decore">Decore</a>
            <div className="floating-list">list4</div>
           </li>
           <li className="menu-item">
            <a href="/products?category=kitchen">Kitchen</a>
           </li>
           <li className="menu-item">
            <a href="/products?category=bathroom">Bathroom</a>
           </li>
           <li className="menu-item">
            <a href="/products?category=wellness">Wellness</a>
           </li>
           <li className="menu-item">
            <a href="/products?category=finishes">Finishes</a>
           </li>
           <li className="menu-item">
            <a href="/products?category=construction">Construction</a>
           </li>
           <li className="menu-item">
            <a href="/brands">Brands</a>
           </li>
           <li className="menu-item">
            <a href="/design-selected">
             <span className="compressed bold-compressed">design</span>
             <span className="compressed light-compressed">selected</span>
            </a>
           </li>
          </ol>
         </nav>
         <a className="arch-link" href="/brandcreate">
          <span>Publish your Products</span>
         </a>
        </div>
       </div>
       <section className="slider-section">
        <HomeSlider slides={this.state.slides} />
       </section>
       <div className="w-100 m-auto">
        <Container className="mt-5 px-0">
         <section className="w-100 home-heading-2 text-center home-head">
          <h2>
           Hot solutions by brands and designers inspires you to design and
           build
          </h2>
          <p>
           Source Ideas for your projects, explore products catalogues, get CAD
           / 3D files and shop design products
          </p>
          {!this.props.isLoggedIn && (
           <>
            <button
             className="btn arch17-btn mt-3"
             onClick={this.toggleCreteStore}
            >
             JOIN NOW
            </button>
           </>
          )}
         </section>
         <section className="media-section mt-5">
          <HeroSection heros={this.state.heros} />
         </section>
        </Container>
       </div>
      </div>
      <div
       style={{
        backgroundColor: "#fff",
       }}
      >
       <section className="project-contaienr text-center bg-white mt-5 pt-4 home-head">
        <HomeProjects />
       </section>
      </div>
      <div className="bg-white">
       <div className="w-100 home-page m-auto ">
        <Container className="px-0">
         <section className="products-container home-head">
          <HomeProducts />
         </section>
        </Container>
       </div>
      </div>
      <div className="lightgray-footer">
       <section className="stores-container text-left home-head">
        <HomeStores />
       </section>
      </div>
      <Footer/>
     </div>

     {/* signup/signin modal */}
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
    </React.Fragment>
   );
  } else {
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
  }
 }
}

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
  homepage: state.regularUser?.homepage,
 };
};
export default connect(mapStateToProps, null)(HomePage);
