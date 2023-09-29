import React, { Component } from "react";
import { Container, Modal } from "react-bootstrap";
import {
 Col as AntCol,
 Row as AntRow,
 Spin,
 Button as AntButton,
 Input,
 Checkbox,
 Collapse,
 Modal as AntModal,
} from "antd";
import FloatingList from "./FloatingList";
import { LoadingOutlined } from "@ant-design/icons";
import SuccessModal from "../components/Modals/SuccessModal";
import { AiFillYoutube, AiFillWechat } from "react-icons/ai";
import {
 FaPinterestP,
 FaLinkedinIn,
 FaFacebookF,
 FaVimeoV,
} from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";

import "./HomePage.css";
import { FcGoogle } from "react-icons/fc";
import SaveToCollection from "./../components/Modals/SaveToCollection";
import SaveToBoard from "./../components/Modals/SaveToBoard";

import axios from "axios";
import { API } from "./../utitlties";
import { connect } from "react-redux";
import {
 signupEmailPassword,
 signupFacebook,
 signupGoogle,
 vanillaSigninEmailPassword,
} from "../redux/actions/authActions";
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
  homeLoaded: false,
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

  axios.get(`${API}dashboard/homepage/media`).then((response) => {
   console.log(response);
   const { slides, heros } = response.data;
   this.setState({
    slides,
    heros,
    homeLoaded: true,
   });
  });
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
           {/* <li className="menu-item">
            <a href="#0">Get Inspired</a>
            <div className="floating-list"></div>
           </li> */}
           <li className="menu-item">
            <a href="/products?category=furniture">Furniture</a>
            <FloatingList />
            {/* <div className="floating-list">list2</div> */}
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
         {/* {this.state.products?.length > 0 && ( */}
         <section className="products-container home-head">
          <HomeProducts />
         </section>
        </Container>
       </div>
      </div>
      <div className="lightgray-footer">
       <section className="stores-container text-left home-head">
        <HomeStores />
        {/* <button className="btn d-block mx-auto mt-4 seemore">see all</button> */}
       </section>
      </div>
      <Footer/>
     {/* <div className="wide-view">
     

      <div className="darkgray-footer">
       <div className="px-3 pt-4 container">
        <AntRow gutter={24}>
         <AntCol md={8}>
          <p className="substext">
           Keep Updated with the Latest Design News, Projects and products
          </p>
         </AntCol>
         <AntCol md={10}>
          <Input.Group compact className="mb-4">
           <Input
            rules={[
             {
              required: true,
              message: "Please input your name",
             },
            ]}
            size="large"
            type="email"
            value={this.state.subscribe_email}
            style={{ width: "calc(100% - 200px)" }}
            placeholder="insert your email address"
            onChange={(e) => this.setState({ subscribe_email: e.target.value })}
           />
           <AntButton
            size="large"
            className="subsricbtn"
            type="submit"
            onClick={() =>
             this.subscribe(
              this.state.subscribe_email,
              this.state.subscribe_checked
             )
            }
           >
            {!this.state.subscribing ? (
             "Subscribe"
            ) : (
             <>
              <Spin
               indicator={
                <LoadingOutlined
                 style={{
                  fontSize: 18,
                  margin: "1px 3px 3px 8px",
                  color: "#fff",
                 }}
                 spin
                />
               }
              />
             </>
            )}
           </AntButton>
          </Input.Group>
          <Checkbox
           value="yes"
           style={{ fontSize: ".75rem", color: "#2b2d3a" }}
           onChange={(e) =>
            this.setState({ subscribe_checked: e.target.checked })
           }
          >
           I hereby consent to the processing of my personal data to receive
           offers and commercial communication from ARCH17.COM (Privacy Policy).
          </Checkbox>
         </AntCol>
        </AntRow>
       </div>
      </div>
      <div className="black-footer">
       <div className="px-3 container w-90">
        <AntRow gutter={24}>
         <AntCol md={4} sm={12} xs={12}>
          <div className="footer-links">
           <p>Arch17</p>
           <p>
           <a href="/aboutarch17" className="white">About arch17</a>
           </p>
           <p>
            <a className="white" href="/procurementservice">
             Procurement Service
            </a>
           </p>
           <p><a href="/designaccountintro" className="white">Design club</a></p>
           <p><a href="/arch17com" className="white">arch17.com</a></p>
          </div>
         </AntCol>
         <AntCol md={4} sm={12} xs={12}>
          <div className="footer-links">
           <p>Arch17 Business</p>
           <p>Create New Store</p>
           <p>Add Products</p>
          </div>
         </AntCol>
         <AntCol md={4} sm={12} xs={12}>
          <div className="footer-links">
           <p>Explore</p>
           <p>Products</p>
           <p>Brands</p>
           <p>Magazine</p>
           <p>Designers</p>
          </div>
         </AntCol>
         <AntCol md={4} sm={12} xs={12}>
          <div className="footer-links">
           <p>For Designer</p>
           <p>How to create store on arch17</p>
           <p>How to sell products</p>
           <p>Contact Us</p>
          </div>
         </AntCol>
         <AntCol md={7} sm={24} xs={24}>
          <div>
           <p>Follow Us On</p>
           <AntRow gutter={10} className="footer-social">
            <AntCol >
             <FaFacebookF />
            </AntCol>
            <AntCol >
             <FaLinkedinIn />
            </AntCol>
            <AntCol >
             <FaPinterestP />
            </AntCol>
            <AntCol >
             <FaVimeoV />
            </AntCol>
            <AntCol >
             <AiFillYoutube />
            </AntCol>
            <AntCol >
             <AiFillWechat />
            </AntCol>
           </AntRow>
          </div>
         </AntCol>
        </AntRow>
       </div>
      </div>
      <div className="dark-footer">
       <div className="px-3 container">
        <AntRow className="pt-2">
         <AntCol md={12}>
          <p>
           © 2017-2022, ARCH17 TECHNOLOGY CO., LTD. SZ .
           <span
            style={{
             marginLeft: "5rem",
            }}
           >
            粤ICP备19015731号-1
           </span>
          </p>
         </AntCol>
         <AntCol md={12}>
          <div className="footer-terms">
           <span>Privacy</span>
           <span>Cookies</span>
           <span>Terms and Conditions of Use</span>
          </div>
         </AntCol>
        </AntRow>
       </div>
      </div>
      <div className="home-layer"></div>
     </div>
     <div className="mobile-view">
     <div className="darkgray-footer">
       <div className="px-3 pt-4 container">
        <AntRow gutter={24}>
         <AntCol md={8}>
          <p className="substext">
           Keep Updated with the Latest Design News, Projects and products
          </p>
         </AntCol>
         <AntCol md={10}>
          <Input.Group compact className="mb-4">
           <Input
            rules={[
             {
              required: true,
              message: "Please input your name",
             },
            ]}
            size="large"
            type="email"
            value={this.state.subscribe_email}
            style={{ width: "calc(100% - 200px)" }}
            placeholder="insert your email address"
            onChange={(e) => this.setState({ subscribe_email: e.target.value })}
           />
           <AntButton
            size="large"
            className="subsricbtn"
            type="submit"
            onClick={() =>
             this.subscribe(
              this.state.subscribe_email,
              this.state.subscribe_checked
             )
            }
           >
            {!this.state.subscribing ? (
             "Subscribe"
            ) : (
             <>
              <Spin
               indicator={
                <LoadingOutlined
                 style={{
                  fontSize: 18,
                  margin: "1px 3px 3px 8px",
                  color: "#fff",
                 }}
                 spin
                />
               }
              />
             </>
            )}
           </AntButton>
          </Input.Group>
          <Checkbox
           value="yes"
           style={{ fontSize: ".75rem", color: "#2b2d3a" }}
           onChange={(e) =>
            this.setState({ subscribe_checked: e.target.checked })
           }
          >
           I hereby consent to the processing of my personal data to receive
           offers and commercial communication from ARCH17.COM (Privacy Policy).
          </Checkbox>
         </AntCol>
        </AntRow>
       </div>
      </div>
      <div className="socials-links">
          <p className="social-head">Follow us on</p>
          <AntRow className="text-center" justify={"center"}  >
          <AntCol xs={4} sm={4}  >
             <FaFacebookF />
            </AntCol>
            <AntCol xs={4} sm={4} >
             <FaLinkedinIn />
            </AntCol>
            <AntCol xs={4} sm={4} >
             <FaPinterestP />
            </AntCol>
            <AntCol xs={4} sm={4} >
             <FaVimeoV />
            </AntCol>
            <AntCol xs={4} sm={4} >
             <AiFillYoutube />
            </AntCol>
            <AntCol xs={4} sm={4} >
             <AiFillWechat />
            </AntCol>
          </AntRow>
        </div>
      <div className="black-footer">
      
       <Collapse
       className="footer-collapse"
        expandIconPosition="right"

       >
        <Panel
        header="Arch17"
       >
        <a href="/aboutarch17">
          <p>
        About Arch17
          </p>
        </a>
        <a href="/procurementservice">
          <p>
          Procurement Service
          </p>
        </a>
        <a href="/designaccountintro">
          <p>
          Design club
          </p>
        </a>
        
        <a href="/arch17com">
          <p>arch17.com</p>
        </a>
       </Panel>
       <Panel
        header="Arch17 Business"
       >
        <a href="#">
          <p>
          Create New Store
          </p>
        </a>
        <a href="#">
          <p>
          Add Products
          </p>
        </a>
       
       </Panel>
       <Panel
        header="Explore"
       >
        <a href="#">
          <p>
        Products
          </p>
        </a>
        <a href="#">
          <p>
          Brands
          </p>
        </a>
        <a href="#">
          <p>
          Magazine
          </p>
        </a>
        <a href="#">
          <p>
          Designers
          </p>
        </a>
       
       </Panel>
       <Panel
        header="For Designers"
       >
        <a href="#">
          <p>
          How to create store on arch17?
          </p>
        </a>
        <a href="#">
          <p>
          How to sell products?
          </p>
        </a>
        <a href="#">
          <p>
          Contact Us
          </p>
        </a>
       
       
       </Panel>
       </Collapse>
      </div>
      <div className="dark-footer">
       <div className="px-0 container bg-black">
        <AntRow className="pt-2">
         <AntCol md={12}>
          <p>
           © 2017-2022, ARCH17 TECHNOLOGY CO., LTD. SZ .
           <span
            style={{
             marginLeft: "5rem",
            }}
           >
            粤ICP备19015731号-1
           </span>
          </p>
         </AntCol>
         <AntCol md={12}>
          <div className="footer-terms">
           <span>Privacy</span>
           <span>Cookies</span>
           <span>Terms and Conditions of Use</span>
          </div>
         </AntCol>
        </AntRow>
       </div>
      </div>
     </div> */}
     </div>
     {/* signup/signin modal */}
     <>
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
     </>
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
