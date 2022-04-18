import React, { Component, Suspense } from "react";
import { Container, Carousel, Row, Col, Modal } from "react-bootstrap";

import {
 Col as AntCol,
 Row as AntRow,
 Spin,
 Button as AntButton,
 Input,
 Checkbox,
 Modal as AntModal,
 Tabs,
} from "antd";
import { Link } from "react-router-dom";
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

import { Img } from "react-image";
import "./HomePage.css";
import { FcGoogle } from "react-icons/fc";
import s1 from "./../images/HomePage/HomePageSlides/s1.jpg";
import s2 from "./../images/HomePage/HomePageSlides/s2.jpg";
import s3 from "./../images/HomePage/HomePageSlides/s3.jpg";
import s4 from "./../images/HomePage/HomePageSlides/s4.jpg";
import s5 from "./../images/HomePage/HomePageSlides/s5.jpg";
import prev from "./../images/HomePage/HomePageSlides/previos.png";
import next from "./../images/HomePage/HomePageSlides/next.png";
import mediaSectionImg1 from "./../images/HomePage/MediaSection/main-01.jpg";
import mediaSectionImg2 from "./../images/HomePage/MediaSection/main-02.jpg";
import m3 from "./../images/HomePage/MediaSection/m3.jpg";
import m4 from "./../images/HomePage/MediaSection/m4.jpg";
import m5 from "./../images/HomePage/MediaSection/m5.jpg";
import designClubLogo from "./../images/HomePage/MediaSection/designclub.svg";
import image_placeholder from "./../images/HomePage/media_2.jpg";
import media_3 from "./../images/HomePage/media_3.jpg";
import media_4 from "./../images/HomePage/media_4.png";
import main_3 from "./../images/HomePage/MediaSection/main-03.jpg";
import main_4 from "./../images/HomePage/MediaSection/main-04.jpg";
import ProjectBox from "./../Project/ProjectsContainer/ProjectBox/ProjectBox";
import grado from "./../images/HomePage/storesSection/grado.jpg";
import storelogo from "./../images/HomePage/storesSection/storelogo.jpg";
import scene from "./../images/HomePage/storesSection/scene.jpg";
import viaform from "./../images/HomePage/storesSection/viaform.jpg";
import { generateKey } from "./../static/utility";
import SaveToCollection from "./../components/Modals/SaveToCollection";

import axios from "axios";
import { API } from "./../utitlties";
import { connect } from "react-redux";
import {
 signupEmailPassword,
 signupFacebook,
 signupGoogle,
 vanillaSigninEmailPassword,
} from "../redux/actions/authActions";
const { TabPane } = Tabs;

class HomePage extends Component {
 state = {
  products: [],
  fetching: false,
  projects_types: {},
  recent_projects: [],
  sliderData: [
   {
    // image: slide1,
    image: s1,
    heading: "The Mix Screen",
    description:
     "expressive feature whilst maintaining a simple and elegant look overall.",
    link: "",
   },
   {
    // image: slide2,
    image: s2,
    heading: "The Mix Screen",
    description:
     "expressive feature whilst maintaining a simple and elegant look overall.",
    link: "",
   },
   {
    // image: slide3,
    image: s3,
    heading: "The Mix Screen",
    description:
     "expressive feature whilst maintaining a simple and elegant look overall.",
    link: "",
   },
   {
    image: s4,
    heading: "The Mix Screen",
    description:
     "expressive feature whilst maintaining a simple and elegant look overall.",
    link: "",
   },
   {
    image: s5,
    heading: "The Mix Screen",
    description:
     "expressive feature whilst maintaining a simple and elegant look overall.",
    link: "",
   },
  ],
  stores: [
   { id: generateKey("store"), logo: grado },
   { id: generateKey("store"), logo: storelogo },
   { id: generateKey("store"), logo: scene },
   { id: generateKey("store"), logo: viaform },
   { id: generateKey("store"), logo: grado },
   { id: generateKey("store"), logo: storelogo },
   { id: generateKey("store"), logo: scene },
   { id: generateKey("store"), logo: viaform },
   { id: generateKey("store"), logo: grado },
   { id: generateKey("store"), logo: storelogo },
   { id: generateKey("store"), logo: scene },
   { id: generateKey("store"), logo: viaform },
   { id: generateKey("store"), logo: grado },
   { id: generateKey("store"), logo: storelogo },
   { id: generateKey("store"), logo: scene },
   { id: generateKey("store"), logo: viaform },
  ],
  authModal: false,
  authFace: "",
  signingEmail: "",
  signinPassword: "",
  signupFname: "",
  signupLname: "",
  signupPassword: "",
  signupEmail: "",
  subscribe_email: "",
  subscribing: false,
  subscribe_checked: false,
  to_save_productId: null,
  to_save_cover: "",
  save_to_collection_modal: false,
 };

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

 toggleCreteStore = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
  } else {
   return;
  }
 };

 handleSigningIn = (email, password) => {
  this.setState({ signingIn: !this.props.isLoggedIn });
  this.props.dispatchRegularSignin(email, password);
 };
 handleRegularSignup = (fname, lname, email, password) => {
  // this.props.dispatchRegularSignup(fname, lname, email, password, "regular");
  this.props.dispatchRegularSignup(fname, lname, email, password, "firebase");
 };
 flipToRegiseterFace = () => {
  this.setState({ authFace: "register-face" });
  console.log(this.state.authFace);
 };
 flipToSigninFace = () => {
  this.setState({ authFace: "signin-face" });
  console.log(this.state.authFace);
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
  this.setState({ fetching: true });
  axios
   .get(`${API}home/data`)
   .then((response) => {
    console.log(response);
    this.setState({
     products: response.data.products,
     fetching: false,
     recent_projects: response.data.recent_projects,
     projects_types: response.data.projects_types,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }
 render() {
  const Sildes = this.state.sliderData.map((slide, index) => {
   return (
    <Carousel.Item key={index} className="home-slide-item">
     <div
      className="home-slide-image"
      style={{ backgroundImage: "url(" + slide.image + ")" }}
     ></div>
     <Carousel.Caption>
      <h3>{slide.heading}</h3>
      <p>{slide.description}</p>
      <button className="btn px-4 py-1 text-white"> Shop Now </button>
     </Carousel.Caption>
    </Carousel.Item>
   );
  });
  const Stores = this.state.stores.map((store, idnex) => {
   return (
    <div
     className="store-logo border text-center"
     style={{
      backgroundImage: "url(" + store.logo + ") ",
     }}
     keys={idnex}
    ></div>
   );
  });
  return (
   <React.Fragment>
    <div className="bg-gray">
     <div id="sec-nav">
      <div className="inner">
       <nav className="menu">
        <ol>
         <li className="menu-item">
          <a href="#0">Get Inspired</a>
         </li>
         <li className="menu-item">
          <a href="#0">Furniture</a>
         </li>
         <li className="menu-item">
          <a href="#0">Living Room</a>
         </li>
         <li className="menu-item">
          <a href="#0">Bedroom</a>
         </li>
         <li className="menu-item">
          <a href="#0">Office</a>
         </li>
         <li className="menu-item">
          <a href="#0">Hotel</a>
         </li>
         <li className="menu-item">
          <a href="#0">Outdoor</a>
         </li>
         <li className="menu-item">
          <a href="#0">Events</a>
         </li>
         <li className="menu-item">
          <a href="#0">Fair</a>
         </li>
         <li className="menu-item">
          <a href="#0">Brands</a>
         </li>
         <li className="menu-item">
          <a href="#0">Magazine</a>
         </li>
        </ol>
       </nav>
       <a className="arch-link" href="/brandcreate">
        <span>Publish your Products</span>
       </a>
      </div>
     </div>
     <section className="slider-section">
      <Carousel
       className="home-page-slider"
       fade={true}
       slide={false}
       prevIcon={<img src={prev} alt={prev} width="26" height="26" />}
       nextIcon={<img src={next} alt={next} width="26" height="26" />}
      >
       {Sildes}
      </Carousel>
     </section>
     <div className="w-100 m-auto">
      <Container className="mt-5 px-0">
       <section className="w-100 home-heading-2 text-center home-head">
        <h2>
         Hot solutions by brands and designers inspires you to design and build
        </h2>
        <p>
         Source Ideas for your projects, explore products catalogues, get CAD /
         3D files and shop design products
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
        <div>
         <div className="media-section-item">
          <Suspense fallback={<p> loading images from supsencd </p>}>
           <Img
            src={mediaSectionImg1}
            key={mediaSectionImg1}
            loader={<p> loading images from supsencd </p>}
            unloader={<button> failed </button>}
            className="img-fluid media-section-item-img"
           />
          </Suspense>
          <div className="media-item-desc">
           <Suspense fallback={<p> loading images from supsencd </p>}>
            <Img
             src={designClubLogo}
             key={designClubLogo}
             loader={<p> loading images from supsencd </p>}
             unloader={<button> failed </button>}
             className="img-fluid"
            />
           </Suspense>
           <p className="text-white">
            For architect & designers join 17 designers club and get the best of
            arch17
           </p>
           <button className="btn px-4 py-1 border-white text-white rounded-lg my-2">
            {" "}
            Join Now &gt;
           </button>
           <span> Why Join </span>
          </div>
         </div>
        </div>
        <div>
         <div className="media-section-item">
          <div>
           <Suspense fallback={<p> loading images from supsencd </p>}>
            <Img
             src={mediaSectionImg2}
             key={mediaSectionImg2}
             loader={<p> loading images from supsencd </p>}
             unloader={<button> failed </button>}
             className="img-fluid media-section-item-img"
            />
           </Suspense>
          </div>
          <div
           className="media-item-desc text-left px-2"
           style={{
            textShadow: "unset",
           }}
          >
           <h3 className="media-item-desc-heading">Upholstered Lounge Chair</h3>
           <p
            className="text-left w-100 m-0 d-block mg-p"
            style={{
             //  padding: "0 12px",
             textAlign: "left",
             fontSize: "1.01rem !important",
             color: "#000",
            }}
           >
            With full foam and cinched to give a comfortable Cushion look and
            feel.
           </p>
          </div>
         </div>
        </div>
        <div>
         <div className="media-section-item">
          <div>
           <Suspense fallback={<p> loading images from supsencd </p>}>
            <Img
             //  src={image_placeholder}
             src={m3}
             key={image_placeholder}
             loader={<p> loading images from supsencd </p>}
             unloader={<button> failed </button>}
             className="img-fluid media-section-item-img"
            />
           </Suspense>
          </div>
          <div className="media-item-desc text-left pl-3 pt-3">
           <h3 className="media-item-desc-heading text-white">
            Create breakout
           </h3>
           <p
            className="text-left w-100 m-0 d-block media-item-desc-desc text-white mg-p"
            style={{
             //  padding: "0 12px",
             textAlign: "left",
             fontSize: "1.01rem !important",
             color: "#000",
             fontWeight: "300 !important",
            }}
           >
            For informal meeting, lounging, dining, a space to relax and take a
            break from the office
           </p>
          </div>
         </div>
        </div>
        <div>
         <div className="media-section-item">
          <div>
           <Suspense fallback={<p> loading images from supsencd </p>}>
            <Img
             //  src={media_4}
             src={m4}
             key={media_4}
             loader={<p> loading images from supsencd </p>}
             unloader={<button> failed </button>}
             className="img-fluid media-section-item-img"
            />
           </Suspense>
          </div>
          <div className="media-item-desc text-left  pl-3 pt-3 ">
           <h3
            className="media-item-desc-heading text-white"
            // style={{ fontSize: "28px" }}
           >
            Create breakout
           </h3>
           <p
            className="text-left w-100 text-white m-0 d-block media-item-desc-desc"
            style={{
             //  padding: "0 12px",
             textAlign: "left",
             fontSize: "1.01rem !important",
             color: "#000",
            }}
           >
            For informal meeting, lounging, dining, a space to relax and take a
            break
           </p>
          </div>
         </div>
        </div>
        <div>
         <div className="media-section-item">
          <div>
           <Suspense fallback={<p> loading images from supsencd </p>}>
            <Img
             //  src={media_3}
             src={m5}
             key={media_3}
             loader={<p> loading images from supsencd </p>}
             unloader={<button> failed </button>}
             className="img-fluid media-section-item-img"
            />
           </Suspense>
          </div>
          <div className="media-item-desc text-left pl-3 pt-3 ">
           <h3
            className="media-item-desc-heading text-white"
            // style={{ fontSize: "24px", textShadow: "0px 3px 6px #00000029" }}
           >
            Outdoor Sofa
           </h3>
           <p
            className="text-left w-100 text-white m-0 d-block media-item-desc-desc"
            style={{
             //  padding: "0 12px",
             textAlign: "left",
             fontSize: "1.01rem !important",
             color: "#000",
            }}
           >
            For informal meeting, lounging, dining, a space to relax and take a
            break
           </p>
          </div>
         </div>
        </div>
        <div>
         <div className="media-section-item">
          <div>
           <Suspense fallback={<p> loading images from supsencd </p>}>
            <Img
             src={main_3}
             key={main_3}
             loader={<p> loading images from supsencd </p>}
             unloader={<button> failed </button>}
             className="img-fluid media-section-item-img"
            />
           </Suspense>
          </div>
          <div className="media-item-desc text-left pl-3 pt-3 ">
           <h3 className="media-item-desc-heading text-white">
            Create breakout area
           </h3>
           <p
            className="text-left w-100 m-0 d-block media-item-desc-desc text-white mg-p"
            style={{
             //  padding: "0 12px",
             textAlign: "left",
             fontSize: "1.01rem !important",
             color: "#000",
            }}
           >
            With full foam and cinched to give a comfortable Cushion look and
            feel.
           </p>
          </div>
         </div>
        </div>
        <div>
         <div className="media-section-item">
          <div>
           <Suspense fallback={<p> loading images from supsencd </p>}>
            <Img
             src={main_4}
             key={main_4}
             loader={<p> loading images from supsencd </p>}
             unloader={<button> failed </button>}
             className="img-fluid media-section-item-img"
            />
           </Suspense>
          </div>
          <div className="media-item-desc text-left pl-3 pt-3">
           <h3 className="media-item-desc-heading">Coffee & Side table</h3>
           <p
            className="text-left w-75 m-0 d-block media-item-desc-desc"
            style={{
             //  padding: "0 12px",
             textAlign: "left",
             fontSize: "1.01rem !important",
             color: "#000",
            }}
           >
            You can go for a simple table with space for remote controls and
            cups of coffee.
           </p>
          </div>
         </div>
        </div>
       </section>
      </Container>
     </div>
    </div>
    <div className="bg-white">
     <div className="w-100 home-page m-auto ">
      <Container className="mt-5 px-0">
       <section className="products-container home-head">
        <h2>Products</h2>
        <p>Explore products, get CAD / 3D files</p>
        <Tabs defaultActiveKey="recent_products" centered onChange={() => {}}>
         <TabPane tab="Recent" key="recent_products">
          <div className="innertab py-5">
           <section id="home-products">
            <AntRow gutter={24} className="mt-3">
             {this.state.fetching && (
              <>
               <Spin
                size="large"
                style={{ position: "absolute", top: "50%", right: "50%" }}
               />
              </>
             )}
             {this.state.products?.map((product, index) => {
              return (
               <>
                <AntCol className="gutter-row mb-3" md={6}>
                 <div className="product">
                  <a href={`/product/${product.id}`}>
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
                    {product.file.length > 0 ? (
                     <>
                      <div className="actns-btn file-btn cad">CAD</div>
                      <div className="actns-btn file-btn threeD">3D</div>
                     </>
                    ) : (
                     ""
                    )}
                   </div>
                  </a>

                  <h5 className="product-store">
                   {product.store_name.store_name}
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
                       pathname: `/product/${product.product_id}`,
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
                </AntCol>
               </>
              );
             })}
            </AntRow>
            <AntRow>
             <a
              href="/products "
              className="btn mt-4 seemore mb-5"
              style={{ paddingTop: "17px !important" }}
             >
              See More Products
             </a>
            </AntRow>
           </section>
          </div>
         </TabPane>
         <TabPane tab="Furniture" key="furniture">
          <div className="innertab py-5">
           <section id="home-products">
            <AntRow gutter={24} className="mt-3">
             {this.state.fetching && (
              <>
               <Spin
                size="large"
                style={{ position: "absolute", top: "50%", right: "50%" }}
               />
              </>
             )}
             {this.state.products?.map((product, index) => {
              return (
               <>
                <AntCol className="gutter-row mb-3" md={6}>
                 <div className="product">
                  <a href={`/product/${product.id}`}>
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
                    {product.file.length > 0 ? (
                     <>
                      <div className="actns-btn file-btn cad">CAD</div>
                      <div className="actns-btn file-btn threeD">3D</div>
                     </>
                    ) : (
                     ""
                    )}
                   </div>
                  </a>

                  <h5 className="product-store">
                   {product.store_name.store_name}
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
                       pathname: `/product/${product.product_id}`,
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
                </AntCol>
               </>
              );
             })}
            </AntRow>
            <AntRow>
             <a
              href="/products "
              className="btn mt-4 seemore mb-5"
              style={{ paddingTop: "17px !important" }}
             >
              See More Products
             </a>
            </AntRow>
           </section>
          </div>
         </TabPane>
         <TabPane tab="Lighting" key="lighting">
          <div className="innertab py-5">
           <section id="home-products">
            <AntRow gutter={24} className="mt-3">
             {this.state.fetching && (
              <>
               <Spin
                size="large"
                style={{ position: "absolute", top: "50%", right: "50%" }}
               />
              </>
             )}
             {this.state.products?.map((product, index) => {
              return (
               <>
                <AntCol className="gutter-row mb-3" md={6}>
                 <div className="product">
                  <a href={`/product/${product.id}`}>
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
                    {product.file.length > 0 ? (
                     <>
                      <div className="actns-btn file-btn cad">CAD</div>
                      <div className="actns-btn file-btn threeD">3D</div>
                     </>
                    ) : (
                     ""
                    )}
                   </div>
                  </a>

                  <h5 className="product-store">
                   {product.store_name.store_name}
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
                       pathname: `/product/${product.product_id}`,
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
                </AntCol>
               </>
              );
             })}
            </AntRow>
            <AntRow>
             <a
              href="/products "
              className="btn mt-4 seemore mb-5"
              style={{ paddingTop: "17px !important" }}
             >
              See More Products
             </a>
            </AntRow>
           </section>
          </div>
         </TabPane>
         <TabPane tab="Decore" key="decore">
          <div className="innertab py-5">
           <section id="home-products">
            <AntRow gutter={24} className="mt-3">
             {this.state.fetching && (
              <>
               <Spin
                size="large"
                style={{ position: "absolute", top: "50%", right: "50%" }}
               />
              </>
             )}
             {this.state.products?.map((product, index) => {
              return (
               <>
                <AntCol className="gutter-row mb-3" md={6}>
                 <div className="product">
                  <a href={`/product/${product.id}`}>
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
                    {product.file.length > 0 ? (
                     <>
                      <div className="actns-btn file-btn cad">CAD</div>
                      <div className="actns-btn file-btn threeD">3D</div>
                     </>
                    ) : (
                     ""
                    )}
                   </div>
                  </a>

                  <h5 className="product-store">
                   {product.store_name.store_name}
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
                       pathname: `/product/${product.product_id}`,
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
                </AntCol>
               </>
              );
             })}
            </AntRow>
            <AntRow>
             <a
              href="/products "
              className="btn mt-4 seemore mb-5"
              style={{ paddingTop: "17px !important" }}
             >
              See More Products
             </a>
            </AntRow>
           </section>
          </div>
         </TabPane>
         <TabPane tab="Finishes" key="finishes">
          <div className="innertab py-5">
           <section id="home-products">
            <AntRow gutter={24} className="mt-3">
             {this.state.fetching && (
              <>
               <Spin
                size="large"
                style={{ position: "absolute", top: "50%", right: "50%" }}
               />
              </>
             )}
             {this.state.products?.map((product, index) => {
              return (
               <>
                <AntCol className="gutter-row mb-3" md={6}>
                 <div className="product">
                  <a href={`/product/${product.id}`}>
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
                    {product.file.length > 0 ? (
                     <>
                      <div className="actns-btn file-btn cad">CAD</div>
                      <div className="actns-btn file-btn threeD">3D</div>
                     </>
                    ) : (
                     ""
                    )}
                   </div>
                  </a>

                  <h5 className="product-store">
                   {product.store_name.store_name}
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
                       pathname: `/product/${product.product_id}`,
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
                </AntCol>
               </>
              );
             })}
            </AntRow>
            <AntRow>
             <a
              href="/products "
              className="btn mt-4 seemore mb-5"
              style={{ paddingTop: "17px !important" }}
             >
              See More Products
             </a>
            </AntRow>
           </section>
          </div>
         </TabPane>
        </Tabs>
       </section>

       <div>
        <section className="project-contaienr text-center bg-white mt-5 pt-4 home-head">
         <h2 className="home-center">Magazine</h2>
         <p className="mb-4">Explore Design Projects, News & trends</p>

         <Tabs defaultActiveKey="recent" centered onChange={() => {}}>
          <TabPane tab="Recent" key="recent">
           <div className="innertab py-5">
            <AntRow span={24} gutter={24}>
             {Object.values(this.state.recent_projects)?.map((p, index) => {
              return (
               <>
                <AntCol xs={24} sm={12} md={8} className="mb-4" key={index}>
                 <a href={`/project/${p.id}`} className="box-link">
                  <div className="project-col bg-white">
                   <div
                    className="project-image"
                    style={{
                     backgroundImage: `url(${p.cover})`,
                    }}
                   ></div>
                   <div className="info p-3 left">
                    <p className="project-name left">{p.name}</p>

                    <div className="project-cover-footer">
                     <p>
                      {p.kind?.map((k) => {
                       return <span className="px-1">{k}</span>;
                      })}
                     </p>
                     <hr className="my-1 w-20" />
                     <p>
                      <span className="px-1">{p.type}</span>
                     </p>
                    </div>
                   </div>
                  </div>
                 </a>
                </AntCol>
               </>
              );
             })}
            </AntRow>
            <AntRow>
             <a
              href="/magazine "
              className="btn mt-5 seemore mb-5"
              style={{ paddingTop: "17px !important" }}
             >
              Magazine
             </a>
            </AntRow>
           </div>
          </TabPane>
          <TabPane tab="Architecture" key="2">
           <div className="innertab py-5">
            <AntRow span={24} gutter={24}>
             {this.state.projects_types?.Architecture?.map((p, index) => {
              return (
               <AntCol xs={24} sm={12} md={8} className="mb-4" key={index}>
                <a href={`/project/${p.id}`} className="box-link">
                 <div className="project-col bg-white">
                  <div
                   className="project-image"
                   style={{
                    backgroundImage: `url(${p.cover})`,
                   }}
                  ></div>
                  <div className="info p-3 left">
                   <p className="project-name">{p.name}</p>

                   <div className="project-cover-footer">
                    <p className="m-0">{p.kind}</p>
                    <hr className="my-1 w-20" />
                    <p className="m-0">{p.type}</p>
                   </div>
                  </div>
                 </div>
                </a>
               </AntCol>
              );
             })}
            </AntRow>
           </div>
          </TabPane>
          <TabPane tab="Interior Design" key="3">
           <div className="innertab py-5">
            <AntRow span={24} gutter={24}>
             {this.state.projects_types["Interior Design"]?.map((p, index) => {
              return (
               <AntCol xs={24} sm={12} md={8} className="mb-4" key={index}>
                <a href={`/project/${p.id}`} className="box-link">
                 <div className="project-col bg-white">
                  <div
                   className="project-image"
                   style={{
                    backgroundImage: `url(${p.cover})`,
                   }}
                  ></div>
                  <div className="info p-3 left">
                   <p className="project-name">{p.name}</p>

                   <div className="project-cover-footer">
                    <p className="m-0">{p.kind}</p>
                    <hr className="my-1 w-20" />
                    <p className="m-0">{p.type}</p>
                   </div>
                  </div>
                 </div>
                </a>
               </AntCol>
              );
             })}
            </AntRow>
           </div>
          </TabPane>
          <TabPane tab="Product Design" key="4">
           <div className="innertab py-5">
            <AntRow span={24} gutter={24}>
             {this.state.projects_types["Product Design"]?.map((p, index) => {
              return (
               <AntCol xs={24} sm={12} md={8} className="mb-4" key={index}>
                <a href={`/project/${p.id}`} className="box-link">
                 <div className="project-col bg-white">
                  <div
                   className="project-image"
                   style={{
                    backgroundImage: `url(${p.cover})`,
                   }}
                  ></div>
                  <div className="info p-3 left">
                   <p className="project-name">{p.name}</p>
                   <div className="project-cover-footer">
                    <p className="m-0">{p.kind}</p>
                    <hr className="my-1 w-20" />
                    <p className="m-0">{p.type}</p>
                   </div>
                  </div>
                 </div>
                </a>
               </AntCol>
              );
             })}
            </AntRow>
           </div>
          </TabPane>
          <TabPane tab="Design blogs" key="5">
           <div className="innertab py-5">
            <AntRow span={24} gutter={24}>
             {this.state.projects_types["Blog"]?.map((p, index) => {
              return (
               <AntCol xs={24} sm={12} md={8} className="mb-4" key={index}>
                <a href={`/project/${p.id}`} className="box-link">
                 <div className="project-col bg-white">
                  <div
                   className="project-image"
                   style={{
                    backgroundImage: `url(${p.cover})`,
                   }}
                  ></div>
                  <div className="info p-3 left">
                   <p className="project-name">{p.name}</p>
                   <div className="project-cover-footer">
                    <p className="m-0">{p.kind}</p>
                    <hr className="my-1 w-20" />
                    <p className="m-0">{p.type}</p>
                   </div>
                  </div>
                 </div>
                </a>
               </AntCol>
              );
             })}
            </AntRow>
           </div>
          </TabPane>
         </Tabs>
        </section>
       </div>
      </Container>
     </div>
    </div>

    <div className="lightgray-footer">
     <section className="stores-container text-left pb-5 home-head">
      <h2 className="px-3">Brands & Stores</h2>
      <p className="px-3">Explore catalogues by brands</p>
      <div className="stores-items">{Stores}</div>
      <button className="btn d-block mx-auto mt-4 seemore">see all</button>
     </section>
    </div>
    <div className="darkgray-footer">
     <div className="px-0 pt-4 container">
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
     <div className="px-0 container">
      <AntRow gutter={24}>
       <AntCol md={4}>
        <div className="footer-links">
         <p>Arch17</p>
         <p>About arch17</p>
         <p>17 Roomcraft</p>
         <p>Join our team</p>
        </div>
       </AntCol>
       <AntCol md={4}>
        <div className="footer-links">
         <p>Arch17 Business</p>
         <p>Create New Store</p>
         <p>Add Products</p>
         <p>Pricing</p>
        </div>
       </AntCol>
       <AntCol md={4}>
        <div className="footer-links">
         <p>Explore</p>
         <p>Furniture</p>
         <p>Projects & News</p>
        </div>
       </AntCol>
       <AntCol md={5}>
        <div className="footer-links">
         <p>Let Us Help</p>
         <p>How to create store on arch17</p>
         <p>How to add products</p>
         <p>Contact Us</p>
        </div>
       </AntCol>
       <AntCol md={7}>
        <div>
         <p>Follow Us On</p>
         <AntRow gutter={10} className="footer-social">
          <AntCol id="fb">
           <FaFacebookF />
          </AntCol>
          <AntCol id="linkdin">
           <FaLinkedinIn />
          </AntCol>
          <AntCol id="pinterest">
           <FaPinterestP />
          </AntCol>
          <AntCol id="vimo">
           <FaVimeoV />
          </AntCol>
          <AntCol id="ytb">
           <AiFillYoutube />
          </AntCol>
          <AntCol id="wechat">
           <AiFillWechat />
          </AntCol>
         </AntRow>
        </div>
       </AntCol>
      </AntRow>
     </div>
    </div>
    <div className="dark-footer">
     <div className="px-0 container">
      <AntRow className="pt-2">
       <AntCol md={8}>
        <p>© 2017-2019, ARCH17 TECHNOLOGY CO., LTD. SZ </p>
       </AntCol>
      </AntRow>
     </div>
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
       <div className={`flip-box`}>
        <div className={`flip-box-inner ${this.state.authFace}`}>
         <div className="flip-box-front p-5">
          <h2 className="auth-modal-head">Sign in</h2>
          <AntRow gutter>
           <AntCol span={24} className="gutter-row my-1">
            <AntButton
             className="w-100 f-auth-modal"
             size="large"
             onClick={() => {
              this.props.dispatchFacebookSignup();
              this.setState({ authModal: false });
             }}
            >
             <div className="auth-btn-cntr">
              <div className="auth-icon" style={{ color: "#1256ad" }}>
               <FaFacebookF />
              </div>
              <p>Login with Facebook</p>
             </div>
            </AntButton>
           </AntCol>
          </AntRow>
          <AntRow className="gutter-row my-1">
           <AntCol span={24}>
            <AntButton
             className="w-100 g-auth-modal"
             size="large"
             onClick={() => {
              this.props.dispatchGoogleSignup();
              this.setState({ authModal: false });
             }}
            >
             <div className="auth-btn-cntr">
              <div className="auth-icon">
               <FcGoogle />
              </div>
              <p>Login with Google</p>
             </div>
            </AntButton>
           </AntCol>
          </AntRow>
          <div className="form-separator"></div>
          <AntRow className="gutter-row mb-2">
           <AntCol span={24} style={{ background: "" }}>
            <Input
             placeholder="email"
             size="large"
             onChange={(e) => this.setState({ signingEmail: e.target.value })}
            />
           </AntCol>
          </AntRow>
          <AntRow className="gutter-row">
           <AntCol span={24} style={{ background: "" }}>
            <Input
             placeholder="password"
             size="large"
             type="password"
             onChange={(e) => this.setState({ signinPassword: e.target.value })}
            />
           </AntCol>
          </AntRow>
          <AntRow>
           <AntCol span={24}>
            <AntButton
             size="large"
             className="w-100 r-auth-modal"
             onClick={() => {
              this.handleSigningIn(
               this.state.signingEmail,
               this.state.signinPassword
              );
             }}
            >
             {this.state.signingIn && !this.props.isLoggedIn ? (
              <>
               <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
              </>
             ) : (
              <>Login</>
             )}
             {/* Login */}
            </AntButton>
           </AntCol>
           <AntCol span={24}>
            <div className="w-100 link-bold">forget your password?</div>
           </AntCol>
          </AntRow>
          <AntRow>
           <AntCol span={24}>
            <div className="auth-modal-footer">
             Don't have an account yet?
             <span
              className="link-bold black"
              onClick={this.flipToRegiseterFace}
             >
              Subscribe
             </span>
            </div>
           </AntCol>
          </AntRow>
         </div>
         <div className={`flip-box-back p-5 ${this.state.authFace}`}>
          {/* <h2>JOIN ARCH17</h2> */}
          <h2 className="auth-modal-head">Sign up</h2>
          <AntRow gutter>
           <AntCol span={24} className="gutter-row my-1">
            <AntButton
             className="w-100 f-auth-modal"
             size="large"
             onClick={() => {
              this.props.dispatchFacebookSignup();
              this.setState({ authModal: false });
             }}
            >
             <div className="auth-btn-cntr">
              <div className="auth-icon" style={{ color: "#1256ad" }}>
               <FaFacebookF />
              </div>
              <p>Signup with Facebook</p>
             </div>
            </AntButton>
           </AntCol>
          </AntRow>
          <AntRow className="gutter-row my-1">
           <AntCol span={24}>
            <AntButton
             className="w-100 g-auth-modal"
             size="large"
             onClick={() => {
              this.props.dispatchGoogleSignup();
              this.setState({ authModal: false });
             }}
            >
             <div className="auth-btn-cntr">
              <div className="auth-icon">
               <FcGoogle />
              </div>
              <p>Signup with Google</p>
             </div>
            </AntButton>
           </AntCol>
          </AntRow>
          <div className="form-separator"></div>
          <AntRow gutter={16} span={24} className="gutter-row mb-2">
           <AntCol span={12}>
            <Input
             placeholder="First Name"
             size="large"
             // value={this.state.signupFname}
             onChange={(e) => this.setState({ signupFname: e.target.value })}
            />
           </AntCol>
           <AntCol span={12} style={{ background: "" }}>
            <Input
             placeholder="Last name"
             size="large"
             onChange={(e) => this.setState({ signupLname: e.target.value })}
            />
           </AntCol>
          </AntRow>
          <AntRow className="gutter-row mb-2">
           <AntCol span={24} style={{ background: "" }}>
            <Input
             placeholder="email"
             size="large"
             onChange={(e) => this.setState({ signupEmail: e.target.value })}
            />
           </AntCol>
          </AntRow>
          <AntRow className="gutter-row">
           <AntCol span={24} style={{ background: "" }}>
            <Input
             placeholder="password"
             size="large"
             type="password"
             onChange={(e) => this.setState({ signupPassword: e.target.value })}
            />
           </AntCol>
          </AntRow>
          <AntRow>
           <AntCol span={24}>
            <AntButton
             size="large"
             className="w-100 r-auth-modal"
             onClick={() => {
              this.handleRegularSignup(
               this.state.signupFname,
               this.state.signupLname,
               this.state.signupEmail,
               this.state.signupPassword
              );
             }}
            >
             Create an Account
            </AntButton>
           </AntCol>
          </AntRow>
          <AntRow>
           <AntCol span={24}>
            <div className="auth-modal-footer">
             Already have an account?
             <span className="link-bold black" onClick={this.flipToSigninFace}>
              Login
             </span>
            </div>
           </AntCol>
          </AntRow>
          {/* <AntButton onClick={this.flipToSigninFace}>Join</AntButton> */}
         </div>
        </div>
       </div>
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
   </React.Fragment>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignup: (fname, lname, email, password, method) =>
  dispatch(signupEmailPassword(fname, lname, email, password, method)),
 dispatchRegularSignin: (email, password) =>
  dispatch(vanillaSigninEmailPassword(email, password)),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
