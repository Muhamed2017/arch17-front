import React, { Component, createRef } from "react";
import Footer from "./../../components/Footer";
import {
 Row,
 Col,
 Carousel,
 Timeline,
 Button,
 Form,
 Input,
 Select,
} from "antd";
import { Modal } from "react-bootstrap";
import HomeStores from "./../../HomePage/HomeStores";
// HomeStores
import qrcode from "./../../../src/qrcode.jpeg";

import SuccessModal from "./../../components/Modals/SuccessModal";
import { API } from "./../../utitlties";
import axios from "axios";
import {
 LeftOutlined,
 RightOutlined,
 DownloadOutlined,
} from "@ant-design/icons";
import "./Procurement.css";
const { Option } = Select;
class Procurement extends Component {
 constructor(props) {
  super(props);
  this.procurementCarousel = createRef();
  this.state = {
   slideIndex: 0,
   sending: false,
   store_or_company: "",
   name: "",
   email: "",
   profession: null,
   message: "",
  };
 }
 onChange = (e) => {
  console.log(e);
  this.setState({
   slideIndex: e,
  });
 };
 next = () => {
  this.procurementCarousel.current.next();
 };
 prev = () => {
  this.procurementCarousel.current.prev();
 };

 sendEmail = () => {
  this.setState({
   sending: true,
  });
  const { store_or_company, name, email, profession, message } = this.state;
  const fd = new FormData();
  fd.append("name", name);
  fd.append("email", email);
  fd.append("profession", profession);
  fd.append("store_or_company", store_or_company);
  fd.append("message", message);
  axios.post(`${API}proceremetmail`, fd).then((response) => {
   console.log(response);
   this.setState(
    {
     sending: false,
     name: "",
     email: "",
     message: "",
     store_or_company: "",
     profession: null,
    },
    () => {
     console.log(this.state);
     SuccessModal(
      <>
       <h2 className="success-head">Thank You</h2>
       <p className="success-msg">
        Your Message has been sent, and our sales team will get in touch with
        you shortly.
       </p>
      </>
     );
    }
   );
  });
 };

 render() {
  return (
   <>
    <div id="sec-nav" className="proc">
     <div className="inner">
      <nav className="menu">
       <ol className="px-0">
        <li className="menu-item">
         <a href="#sec-head">Overview</a>
         <div className="floating-list">list2</div>
        </li>
        <li className="menu-item">
         <a href="#products-grid">Products catalogues</a>
         <div className="floating-list">list3</div>
        </li>
        <li className="menu-item">
         <a href="#features">Service Features</a>
         <div className="floating-list">list4</div>
        </li>
        <li className="menu-item">
         <a href="#procurement-slider">Cases Overview</a>
        </li>
        <li className="menu-item">
         <a href="#procurement-timeline">Work Timeline</a>
        </li>
       </ol>
      </nav>
      <a className="arch-link" href="#start-project">
       <span>Start new project</span>
      </a>
     </div>
    </div>
    <div className="procurement-wrapper">
     <div id="procurement" className="bg-white">
      <div className="hepl-container">
       <section id="pagehead" className="py-5 text-center">
        <Row span={24} justify="center">
         <Col md={12}>
          <h5 className="main-head mb-0">
           Procurement<span>service</span>
          </h5>
          <p className="main-desc">Source, quote and purchase Design product</p>
          <p className="w-300 w-90 m-auto my-4 fs-15">
           Sourcing architecture products from the finest manufacturers in china
           is made easier and faster with Arch17. From Furniture, Decor and Rug
           to Materials, Lighting and construction products. We offer you a
           comprehensive procurement service from product sousing, purchasing,
           and shipping.
          </p>
          <Row
           span={24}
           gutter={{ lg: 10, md: 10, sm: 12, xs: 12 }}
           className="btns"
           justify="center"
          >
           <Col md={8} sm={10} xs={10}>
            <a href="#start-project">
             <div className="bg-black py-2 px-0 radius-5">
              Start New Project
             </div>
            </a>
           </Col>
           <Col md={8} sm={12} xs={14}>
            <a
             rel="noreferrer"
             target="_blank"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
            >
             <div className="py-2 px-0 decorated">
              Download full introduction
             </div>
            </a>
           </Col>
          </Row>
         </Col>
        </Row>
       </section>
       <section id="sec-head">
        <div className="wide-view">
        <Row span={24} justify="space-between">
         <Col
          md={{ span: 12, order: 1 }}
          sm={{ span: 24, order: 1 }}
          xs={{ span: 24, order: 1 }}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591857/Search_products_copy_ngjxbf.png')",
            width: "450px",
            height: "450px",
           }}
          ></div>
         </Col>
         <Col
          md={{ span: 12, order: 2 }}
          sm={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
         >
          <p className="side-head">
           Comprehensive Design & Purchasing service.
          </p>
          <p className="side-p w-80 mb-4 block fs-15">
           We offer design companies and customers around the world a
           comprehensive service from products sourcing, procurement and manage
           delivery.
          </p>
          <p className="side-p w-80">
           Our mission is to optimize the work flow for the architecture
           projects from the creative phases to production and logistics
           management ensuring the products quality and best prices.
          </p>
         </Col>
        </Row>
        </div>
        <div className="mobile-view">
        <Row span={24} justify="space-between">
          <Col md={12} xs={24} sm={24}>
          <p className="side-head">
           Comprehensive Design & Purchasing service.
          </p></Col>
         <Col
          md={{ span: 12, order: 1 }}
          sm={{ span: 24, order: 1 }}
          xs={{ span: 24, order: 1 }}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591857/Search_products_copy_ngjxbf.png')",
            width: "450px",
            height: "450px",
           }}
          ></div>
         </Col>
         <Col
          md={{ span: 12, order: 2 }}
          sm={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
         >
         
          <p className="side-p w-80 mb-4 block fs-15">
           We offer design companies and customers around the world a
           comprehensive service from products sourcing, procurement and manage
           delivery.
          </p>
          <p className="side-p w-80">
           Our mission is to optimize the work flow for the architecture
           projects from the creative phases to production and logistics
           management ensuring the products quality and best prices.
          </p>
         </Col>
        </Row>
        </div>
       </section>
       <section className="lightgray-bg">
        <Row justify="center">
         <Col md={15}>
          <p className="bold sec-head fs-15">
           Arch17 backed with a team of designers, logistics and experts in the
           industry, and we are ready to deliver different level of creative and
           procurement services for designers and end client between them and
           you can choose where you need our support
          </p>
         </Col>
        </Row>
        <Row span={24} justify="center" className="text-center mt-5">
         <Col md={8}>
          <div className="section-box">
           <img
            className="box-icon"
            src="https://res.cloudinary.com/azharuniversity/image/upload/v1671591664/Group_836_wvgkat.png"
            alt="product sourcing"
           />

           <p className="bold">Products sourcing</p>
           <p className="fs-15">
            You have a ready design. We can help you or your designer source
            design products for your projects, and create FF&E specification,
            and keep it on time and budget.
           </p>
          </div>
         </Col>
         <Col md={8}>
          <div className="section-box">
           <img
            className="box-icon"
            src="https://res.cloudinary.com/azharuniversity/image/upload/v1671591664/Group_841_mspza5.png"
            alt="Interior Styling"
           />
           <p className="bold">Interior Styling</p>
           <p color="#6c6c6c" className="fs-15">
            From decorative accessories to rug and window-dressing, our creative
            team can help you to create a great space according to your style.
           </p>
          </div>
         </Col>
         <Col md={8}>
          <div className="section-box">
           <img
            className="box-icon"
            src="https://res.cloudinary.com/azharuniversity/image/upload/v1671591664/Group_845_xlelq3.png"
            alt="Design services"
           />
           <p className="bold">Design services</p>
           <p className="fs-15">
            You have an empty space and start from scratch. Our team can put
            together product options and create floor plans for your projects.
           </p>
          </div>
         </Col>
         <Col md={8}>
          <div className="section-box">
           <img
            className="box-icon"
            src="https://res.cloudinary.com/azharuniversity/image/upload/v1671598299/Rectangle_533_lzubzh.png"
            alt="Accessories and OS&E Package"
           />
           <p className="bold">Accessories and OS&E Package</p>
           <p className="fs-15">
            From Appliances, to Cutlery, Kitchenware, and Bathroom Accessories
            Arch17 can offers a package according to your OS&E budget for home,
            office, and hotel.
           </p>
          </div>
         </Col>
         <Col md={8}>
          <div className="section-box">
           <img
            className="box-icon"
            src="https://res.cloudinary.com/azharuniversity/image/upload/v1671591664/Group_851_fymqke.png"
            alt="Consolidated delivery"
           />
           <p className="bold">Consolidated delivery</p>
           <p className="fs-15">
            With best shipping prices, We’ll consolidate orders from multiple
            suppliers and deliver when required.
           </p>
          </div>
         </Col>
         <Col md={8}>
          <div className="section-box">
           <img
            src="https://res.cloudinary.com/azharuniversity/image/upload/v1671591664/Group_855_vqfpaq.png"
            alt="Installation"
            className="box-icon"
           />
           <p className="bold">Installation</p>
           <p className="fs-15">
            Our project managers will communicate with local installation
            workers and supervise them to install all products on site.
           </p>
          </div>
         </Col>
        </Row>
       </section>
       <section>
       <div className="wide-view">
       <Row span={24} gutter={10} justify="center" align="stretch">
         <Col md={12}>
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671594993/05_copy_hm6lgg.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col md={12}>
          <p className="bold side-head">
           Reach reliable High-quality design brands with affordable prices in
           china.
          </p>
          <p className="side-p w-80 mb-4 block fs-15">
           Instead of going online and struggling to communicate with Chinese
           suppliers, we made it easier for the designers to find and order
           design products, furniture, lighting and materials from China. All
           the brands on Arch17 are vetted and only high quality and original
           design products are listed.
          </p>
          <ul className="w-500">
           <li>Unique Designs</li>
           <li>Fine Materials</li>
           <li>Affordable Prices</li>
          </ul>
         </Col>
         <Col md={16} className="text-center">
          <p className="bold side-head w-100">Authorized seller</p>
          <p className="side-p w-100 block fs-15">
           Arch17 is authorized seller and legal representative of over 300 high
           quality architecture products manufacturers and brands in china from
           furniture decoration and construction materials.
          </p>
         </Col>
         <Col md={24} className="mb-3">
          <HomeStores />
         </Col>
        </Row>
       </div>
       <div className="mobile-view">
       <Row span={24} gutter={10} justify="center" align="stretch">
<Col xs={24} sm={24}>
<p className="bold side-head">
           Reach reliable High-quality design brands with affordable prices in
           china.
          </p>
</Col>
         <Col md={12} xs={24} sm={24}>
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671594993/05_copy_hm6lgg.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col md={12} xs={24} sm={24} className="mb-5">
        
          <p className="side-p w-80 mb-4 block fs-15">
           Instead of going online and struggling to communicate with Chinese
           suppliers, we made it easier for the designers to find and order
           design products, furniture, lighting and materials from China. All
           the brands on Arch17 are vetted and only high quality and original
           design products are listed.
          </p>
          <ul className="w-500">
           <li>Unique Designs</li>
           <li>Fine Materials</li>
           <li>Affordable Prices</li>
          </ul>
         </Col>
         <Col md={16} className="text-center" >
          <p className="bold side-head w-100">Authorized seller</p>
          <p className="side-p w-100 block fs-15">
           Arch17 is authorized seller and legal representative of over 300 high
           quality architecture products manufacturers and brands in china from
           furniture decoration and construction materials.
          </p>
         </Col>
         <Col md={24} className="mb-3 top-52">
          <HomeStores />
         </Col>
        </Row>
       </div>
       </section>
       <section id="products-grid" className="lightgray-bg">
        <h5 className="bold text-center">
         Comprehensive product sourcing & procurement.
        </h5>
        <p className="text-center w-50 mx-auto block second-p">
         Acrh17 offer architecture products from multi brands and manufacturer,
         furniture, lighting, decor, finishes materials and more.
        </p>
        <div id="inner-grid" className="mt-5 only-wide">
         <Row className="center mb-30" gutter={30}>
          <Col flex={1 / 5} sm={{ span: 12 }} xs={{ span: 12 }}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url(https://res.cloudinary.com/azharuniversity/image/upload/v1671591675/Group_871_hgyj01.png)",
            }}
           >
            <p className="image-text">Living Furniture</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5} sm={{ span: 12 }} xs={{ span: 12 }}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591674/Group_880_r1kzyr.png')",
            }}
           >
            <p className="image-text">Contract Furniture</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5} sm={{ span: 12 }} xs={{ span: 12 }}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591667/Group_890_drpwxt.png')",
            }}
           >
            <p className="image-text">Office Furniture</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5} sm={{ span: 12 }} xs={{ span: 12 }}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591675/Group_904_w5cqmj.png')",
            }}
           >
            <p className="image-text">Decor</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={{ span: 12 }} xs={{ span: 12 }} flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591687/Group_897_xzosw6.png')",
            }}
           >
            <p className="image-text">Outdoor Furniture</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
         </Row>
         <Row className="center mb-30" gutter={30}>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591690/Group_912_okdqfp.png')",
            }}
           >
            <p className="image-text">Rug</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591695/Group_918_uibybq.png')",
            }}
           >
            <p className="image-text">Carpet Tiles</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591697/Group_925_sprkjn.png')",
            }}
           >
            <p className="image-text">Curtains</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591711/Group_959_blhyae.png')",
            }}
           >
            <p className="image-text">Architecture Lighting</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591722/Group_968_gcknlr.png')",
            }}
           >
            <p className="image-text">Decoration Lighting</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
         </Row>
         <Row className="center mb-30" gutter={30}>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591710/Group_950_y2os5r.png')",
            }}
           >
            <p className="image-text">Acoustic Panels</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591713/Group_941_rwkymh.png')",
            }}
           >
            <p className="image-text">PVC Flooring</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591700/Group_931_ws75nz.png')",
            }}
           >
            <p className="image-text">Ceramic & Porcelain Tiles</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591723/Group_987_hovx5j.png')",
            }}
           >
            <p className="image-text">Bathroom</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col flex={1 / 5}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591721/Group_977_sy9ru1.png')",
            }}
           >
            <p className="image-text">Kitchen</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
         </Row>
        </div>
        <div id="inner-grid" className="mt-5 only-mobile">
         <Row className="center mb-30" gutter={12}>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url(https://res.cloudinary.com/azharuniversity/image/upload/v1671591675/Group_871_hgyj01.png)",
            }}
           >
            <p className="image-text">Living Furniture</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591674/Group_880_r1kzyr.png')",
            }}
           >
            <p className="image-text">Contract Furniture</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591667/Group_890_drpwxt.png')",
            }}
           >
            <p className="image-text">Office Furniture</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591675/Group_904_w5cqmj.png')",
            }}
           >
            <p className="image-text">Decor</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591687/Group_897_xzosw6.png')",
            }}
           >
            <p className="image-text">Outdoor Furniture</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591690/Group_912_okdqfp.png')",
            }}
           >
            <p className="image-text">Rug</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591695/Group_918_uibybq.png')",
            }}
           >
            <p className="image-text">Carpet Tiles</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591697/Group_925_sprkjn.png')",
            }}
           >
            <p className="image-text">Curtains</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591711/Group_959_blhyae.png')",
            }}
           >
            <p className="image-text">Architecture Lighting</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591722/Group_968_gcknlr.png')",
            }}
           >
            <p className="image-text">Decoration Lighting</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591710/Group_950_y2os5r.png')",
            }}
           >
            <p className="image-text">Acoustic Panels</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591713/Group_941_rwkymh.png')",
            }}
           >
            <p className="image-text">PVC Flooring</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591700/Group_931_ws75nz.png')",
            }}
           >
            <p className="image-text">Ceramic & Porcelain Tiles</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591723/Group_987_hovx5j.png')",
            }}
           >
            <p className="image-text">Bathroom</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
          <Col sm={12} xs={12}>
           <div
            className="grid-box"
            style={{
             backgroundImage:
              "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591721/Group_977_sy9ru1.png')",
            }}
           >
            <p className="image-text">Kitchen</p>
            <a
             className="downloadcloud"
             href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
             rel="noreferrer"
             target="_blank"
            >
             <DownloadOutlined />
            </a>
           </div>
          </Col>
         </Row>
        </div>
        <p className="bold underline dwnld text-center">
         <a
          rel="noreferrer"
          target="_blank"
          href="https://u.pcloud.link/publink/show?code=kZqgjeVZvU5MWHj3bx5cFHGtQ8ooGYM8fujV"
         >
          Download complete catalogues
         </a>
        </p>
       </section>
       <section>
        <div className="wide-view">
        <Row span={24}>
         <Col
          md={{ span: 12, order: 1 }}
          xs={24}
          sm={24}
         >
          <p className="bold side-head">
           Need to customize products according to your design, We got you
           covered
          </p>
          <p className="side-p w-80 fs-15">
           If you need to customize furniture or lighting products we will help
           you to manufacture your designs carefully according to your
           specifications, Design, Size and materials. Our team will take care
           of everything from Quotation, specifications to production ensuring
           the production alignment with your requirements before delivery.
          </p>
         </Col>
         <Col
          md={{ span: 12, order: 2 }}
          xs={24}
          sm={24}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591773/Group_1128_qrywfj.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col
          md={{ span: 12, order: 3 }}
          xs={24}
          sm={24}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591752/Group_1129_afmu3e.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col
          md={{ span: 12, order: 4 }}
          xs={24}
          sm={24}
          // sm={{ span: 24, order: 4 }}
          // xs={{ span: 24, order: 4 }}
         >
          <p className="bold side-head">Kitchen Design & Manufactry</p>
          <p className="side-p w-80 fs-15">
           We help you to design and Manufactory kitchen With the finest
           materials and accessories, rugs materials and hardware per your
           choice from world best brands Half, Bloom Request Kitchen Quote
          </p>
         </Col>
        </Row>
        </div>
        <div className="mobile-view">
        <Row span={24}>
         <Col
          md={{ span: 12, order: 1 }}
          xs={24}
          sm={24}
         >
          <p className="bold side-head">
           Need to customize products according to your design, We got you
           covered
          </p>
          
         </Col>
         <Col
          md={{ span: 12, order: 2 }}
          xs={24}
          sm={24}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591773/Group_1128_qrywfj.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col sm={24} xs={24} className="mb-5">
         <p className="side-p w-80 fs-15">
           If you need to customize furniture or lighting products we will help
           you to manufacture your designs carefully according to your
           specifications, Design, Size and materials. Our team will take care
           of everything from Quotation, specifications to production ensuring
           the production alignment with your requirements before delivery.
          </p>
         </Col>
         </Row>
         <Row className="my-4">
         <Col
          md={{ span: 12, order: 3 }}
          sm={{ span: 24, order: 3 }}
          xs={{ span: 24, order: 3 }}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591752/Group_1129_afmu3e.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col xs={24} sm={24}>
         <p className="bold side-head">Kitchen Design & Manufactry</p>
         </Col>
         <Col
          md={{ span: 12, order: 4 }}
          sm={{ span: 24, order: 4 }}
          xs={{ span: 24, order: 4 }}
         >
          <p className="side-p w-80 fs-15">
           We help you to design and Manufactory kitchen With the finest
           materials and accessories, rugs materials and hardware per your
           choice from world best brands Half, Bloom Request Kitchen Quote
          </p>
         </Col>
        </Row>
        </div>
       </section>
       <section id="features">
        <h5 className="text-center">Service Features</h5>
        <p className="text-center w-50 mx-auto mb-5 block second-p fs-15">
         Arch17 offer a reliable service covers all your needs before and after
         sellInsuring Production and delivery quality and best prices
        </p>
        <div className="wide-view">
        <Row span={24} className="mt-4 pt-5">
         <Col
          md={{ span: 12, order: 1 }}
          sm={{ span: 24, order: 1 }}
          xs={{ span: 24, order: 1 }}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591837/Mask_Group_20_scze9x.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col
          md={{ span: 12, order: 2 }}
          sm={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
         >
          <p className="bold side-head">Pricing policy</p>
          <p className="side-p w-80 block fs-15">
           As arch17 authorized seller of the manufacturers and brands. It allow
           us to offer the exact factory price without add-on, Moreover since we
           could provide products from multi brands we have the capability to
           offer special prices for an inter project.
          </p>
         </Col>

         <Col
          md={{ span: 12, order: 3 }}
          sm={{ span: 24, order: 4 }}
          xs={{ span: 24, order: 4 }}
         >
          <p className="bold side-head">Budget engineering</p>
          <p className="side-p w-80 block fs-15">
           You have a set budget for your project. Let our team find the best
           high-quality items and negotiate prices with multi-brands for you
           keeping the inter project within your budget.
          </p>
         </Col>
         <Col
          md={{ span: 12, order: 4 }}
          sm={{ span: 24, order: 3 }}
          xs={{ span: 24, order: 3 }}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591842/Group_1137_hgtopr.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col
          md={{ span: 12, order: 5 }}
          sm={{ span: 24, order: 5 }}
          xs={{ span: 24, order: 5 }}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591823/Group_1136_istmbe.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col
          md={{ span: 12, order: 6 }}
          sm={{ span: 24, order: 6 }}
          xs={{ span: 24, order: 6 }}
         >
          <p className="bold side-head">Quality Control</p>
          <p className="side-p w-80 block fs-15">
           Our team follow up with the multi manufacturing within and after the
           production to ensure the products quality and the alignment with the
           designers/clients, specification and before packaging we provide a
           full inspection for all the products with photos and videos and after
           the client confirmation, we follow up with products packaging to
           ensure the safe delivery.
          </p>
         </Col>
         <Col
          md={{ span: 12, order: 7 }}
          sm={{ span: 24, order: 8 }}
          xs={{ span: 24, order: 8 }}
         >
          <p className="bold side-head">One Book of warranty</p>
          <p className="side-p w-80 block fs-15">
           Weather you are buying single item or buying from multi-manufactory
           for an inter project arch17 offer you one book or warranty for all
           the items and arch17 will be always your one point of contact to
           communicate with all the manufactories.
          </p>
         </Col>
         <Col
          md={{ span: 12, order: 8 }}
          sm={{ span: 24, order: 7 }}
          xs={{ span: 24, order: 7 }}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591823/Group_1138_rcg2r0.png')",
            width: "450px",
            height: "450px",
           }}
          ></div>
         </Col>
        </Row>
        </div>
        <div className="mobile-view">
        <Row span={24} className="mt-4 pt-5">
        <p className="bold side-head">Pricing policy</p>

         <Col
      
          md={12}
          xs={24}
          sm={24}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591837/Mask_Group_20_scze9x.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col
        md={12}
        xs={24}
        sm={24}
        className="mb-5"
         >
          <p className="side-p w-80 block fs-15">
           As arch17 authorized seller of the manufacturers and brands. It allow
           us to offer the exact factory price without add-on, Moreover since we
           could provide products from multi brands we have the capability to
           offer special prices for an inter project.
          </p>
         </Col>

         <p className="bold side-head">Budget engineering</p>
         <Col
         md={12}
         xs={24}
         sm={24}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591842/Group_1137_hgtopr.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col
          md={12}
          xs={24}
          sm={24}
        className="mb-5"

         >
          <p className="side-p w-80 block fs-15">
           You have a set budget for your project. Let our team find the best
           high-quality items and negotiate prices with multi-brands for you
           keeping the inter project within your budget.
          </p>
         </Col>
        
         <p className="bold side-head">Quality Control</p>

         <Col
          md={12}
          xs={24}
          sm={24}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591823/Group_1136_istmbe.png')",
            width: "450px",
            height: "450px",
            //    background: "#00F",
           }}
          ></div>
         </Col>
         <Col
          md={12}
          xs={24}
          sm={24}
        className="mb-5"

         >
          <p className="side-p w-80 block fs-15">
           Our team follow up with the multi manufacturing within and after the
           production to ensure the products quality and the alignment with the
           designers/clients, specification and before packaging we provide a
           full inspection for all the products with photos and videos and after
           the client confirmation, we follow up with products packaging to
           ensure the safe delivery.
          </p>
         </Col>
         <p className="bold side-head">One Book of warranty</p>
         <Col
         md={12}
         xs={24}
         sm={24}
         >
          <div
           className="side-image"
           style={{
            backgroundImage:
             "url('https://res.cloudinary.com/azharuniversity/image/upload/v1671591823/Group_1138_rcg2r0.png')",
            width: "450px",
            height: "450px",
           }}
          ></div>
         </Col>
         <Col
         md={12}
         xs={24}
         sm={24}
        className="mb-5"

         >
          <p className="side-p w-80 block fs-15">
           Weather you are buying single item or buying from multi-manufactory
           for an inter project arch17 offer you one book or warranty for all
           the items and arch17 will be always your one point of contact to
           communicate with all the manufactories.
          </p>
         </Col>
         
        </Row>
        </div>
       </section>
       <section id="procurement-slider">
        <p className="bold text-center fs-2">Cases Overview</p>
        <Carousel
         ref={this.procurementCarousel}
         autoplay
         afterChange={this.onChange}
         dots={false}
        >
         <div className="slide text-center">
          <div
           className="slide-img"
           style={{
            backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1671605701/Screen_Shot_2022-05-29_at_11.04.54_tvvapr.png")`,
           }}
          ></div>
          <p className="bold"> Hospitality </p>
          <p> Pokaren Hotel . Guangzhou . Furniture by lightspace</p>
         </div>
         <div className="slide">
          <div
           className="slide-img"
           style={{
            backgroundImage: `url('https://res.cloudinary.com/azharuniversity/image/upload/v1671605586/Screen_Shot_2022-05-29_at_11.05.00_jgkf9h.png')`,
           }}
          ></div>
          <p className="bold"> Office </p>
          <p> 1984 JIANG DPD . Guangzhou . Furniture by grado</p>
         </div>
         <div className="slide">
          <div
           className="slide-img"
           style={{
            backgroundImage: `url('https://res.cloudinary.com/azharuniversity/image/upload/v1671605706/Screen_Shot_2022-05-29_at_11.05.12_aogg82.png')`,
           }}
          ></div>
          <p className="bold"> Office </p>
          <p> sceoo . Beijing . Furniture by lightspace</p>
         </div>
         <div className="slide">
          <div
           className="slide-img"
           style={{
            backgroundImage: `url('https://res.cloudinary.com/azharuniversity/image/upload/v1671605712/Screen_Shot_2022-05-29_at_11.05.20_fkmdcw.png')`,
           }}
          ></div>
          <p className="bold"> Co-work space </p>
          <p>Dream Plus . Hangzhou . Furniture by grado</p>{" "}
         </div>
         <div className="slide">
          <div
           className="slide-img"
           style={{
            backgroundImage: `url('https://res.cloudinary.com/azharuniversity/image/upload/v1671605591/Screen_Shot_2022-05-29_at_11.05.24_ag0vw4.png')`,
           }}
          ></div>
          <p className="bold"> Store </p>
          <p>Septemper Art . Guangzhou . Furniture by lightspace</p>{" "}
         </div>
         <div className="slide">
          <div
           className="slide-img"
           style={{
            backgroundImage: `url('https://res.cloudinary.com/azharuniversity/image/upload/v1671609752/Screen_Shot_2022-05-29_at_11.05.30_soxu5g.png')`,
           }}
          ></div>
          <p className="bold"> Store </p>
          <p>Curiel . Qingdao . Furniture by grado</p>{" "}
         </div>
         <div className="slide">
          <div
           className="slide-img"
           style={{
            backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1671605651/Screen_Shot_2022-05-29_at_11.05.47_fiappq.png")`,
           }}
          ></div>
          <p className="bold"> Educational </p>
          <p>University of Oscar Oxford . Furniture by grado</p>{" "}
         </div>
         <div className="slide">
          <div
           className="slide-img"
           style={{
            backgroundImage: `url("https://res.cloudinary.com/azharuniversity/image/upload/v1671610150/Screen_Shot_2022-05-29_at_11.05.53_ivyd9r.png")`,
           }}
          ></div>
          <p className="bold"> Cafe & Restaurant </p>
          <p>Starbucks Reserve Hotel . Shanghai . Furniture by grado</p>{" "}
         </div>
        </Carousel>
        <p className="w-100 block text-center bold mt-4">
         {this.state.slideIndex + 1} / 8
        </p>
        <button className="next" onClick={this.next}>
         <RightOutlined />
        </button>
        <button className="previuos" onClick={this.prev}>
         <LeftOutlined />
        </button>
       </section>
       <section id="procurement-timeline" className="lightgray-bg">
        <h5 className="bold text-center main">Work Timeline</h5>
        <p className="text-center w-50 mx-auto block second-p fw-300">
         Realize interior design project from sourcing, production to delivery
         in maximum 6 Weeks
        </p>
        <Timeline mode="alternate" className="mt-5">
         <Timeline.Item dot={<div className="timelinedot"></div>}>
          <p className="bold">Receive your Request</p>
          <p className="">
           Communicate with our team through the platform contact channels to
           provide us your project info and requirements
          </p>
         </Timeline.Item>
         <Timeline.Item dot={<div className="timelinedot"></div>}>
          <p className="bold">Source & Quotation 5 Days</p>
          <p className="">
           Communicate with our team through the platform contact channels to
           provide us your project info and requirements
          </p>
         </Timeline.Item>
         <Timeline.Item dot={<div className="timelinedot"></div>}>
          <p className="bold">Prepare & Send Materials Samples 3 - 5 days</p>
          <p className="">
           Prepare the material samples and create a design mood board based on
           the materials and products images
          </p>
         </Timeline.Item>
         <Timeline.Item dot={<div className="timelinedot"></div>}>
          <p className="bold">Production 5 - 30 days</p>
          <p className="">
           After paying the 50% deposit, the brands will start to produce the
           products based on your requirements. In case you choose products in
           stock, it will take up to 5 days only.
          </p>
         </Timeline.Item>
         <Timeline.Item dot={<div className="timelinedot"></div>}>
          <p className="bold">Products Inspection 3 days</p>
          <p className="">
           Our team will inspect the details of the product and send images and
           video for the final product to let designers confirm before delivery
          </p>
         </Timeline.Item>
         <Timeline.Item dot={<div className="timelinedot"></div>}>
          <p className="bold">Collect and Deliver 2 days</p>
          <p className="">
           Collect the products from multi companies and brands and prepare them
           for shipping FOB, CIF, Door to Door depends on your required shipping
           methods.
          </p>
         </Timeline.Item>
        </Timeline>
       </section>
       <section id="start-project">
        <p className="fs-3 bold head">Need start a new project or more</p>
        <p className="fs-3 bold head">
         informations? Get in touch with our team
        </p>
        <p className="desc my-4 mb-5">
         Contact us via live chat,{" "}
         <span className="fw-400 decorated pointer">
          <a href="https://wa.link/1hqgdx" target="_blank" rel="noreferrer">
           WhatsApp
          </a>
          ,{" "}
          <span
           onClick={() => {
            this.setState({ wechatqr_modal: true });
           }}
          >
           WeChat
          </span>
         </span>
         , Phone: +86 185 7599 9560 or fill out the form and we will get back to
         you as soon as possible.
        </p>
        <div className="form-wrapper">
         <Form size="large">
          <Row
           gutter={{ lg: 12, md: 12, sm: 0, xs: 0 }}
           style={{
            rowGap: "0 !important",
            gridRowGap: "0 !important",
           }}
          >
           <Col md={12} sm={24} xs={24}>
            <Form.Item
             // name="name"
             rules={[
              {
               required: true,
               message: "Name is required!",
              },
             ]}
            >
             <Input
              placeholder="Name"
              onChange={(e) => {
               console.log(e.target.value);
               this.setState({ name: e.target.value });
              }}
              value={this.state.name}
             />
            </Form.Item>
           </Col>
           <Col md={12} sm={24} xs={24}>
            <Form.Item
             // name="email"
             rules={[
              {
               required: true,
               type: "email",
               message: "Email is required!",
              },
             ]}
            >
             <Input
              value={this.state.email}
              placeholder="E-mail"
              onChange={(e) => {
               console.log(e.target.value);

               this.setState({ email: e.target.value });
              }}
             />
            </Form.Item>
           </Col>
          </Row>
          <Row gutter={12}>
           <Col md={12} sm={24} xs={24}>
            <Form.Item>
             <Select
              onChange={(profession) => {
               this.setState({
                profession,
               });
              }}
              value={this.state.profession}
              placeholder="Profession"
              style={{
               width: "100%",
              }}
             >
              <Option value="Engineer">Engineer</Option>
              <Option value="Designer">Designer</Option>
              <Option value="Archetict">Archetict</Option>
              <Option value="Interior Designer">Interior Designer</Option>
              <Option value="">Other</Option>
             </Select>
            </Form.Item>
           </Col>
           <Col md={12} sm={24} xs={24}>
            <Form.Item>
             <Input
              onChange={(e) =>
               this.setState({ store_or_company: e.target.value })
              }
              value={this.state.store_or_company}
              placeholder="Company / Studio Name"
             />
            </Form.Item>
           </Col>
          </Row>
          <Row span={24}>
           <Col md={24} sm={24} xs={24}>
            <Form.Item
             style={{ width: "100%" }}
             // name="message"
             rules={[
              {
               required: true,
               message: "Please Type your message!",
              },
             ]}
            >
             <Input.TextArea
              onChange={(e) => {
               this.setState({
                message: e.target.value,
               });
              }}
              value={this.state.message}
              placeholder="Your message"
              rows={5}
             />
            </Form.Item>
           </Col>
          </Row>
          <Row justify="end">
           <Col>
            <Form.Item>
             <Button
              onClick={this.sendEmail}
              type="primary"
              //  htmlType="submit"
              color="#000"
              loading={this.state.sending}
              style={{
               backgroundColor: "#000",
               outline: "none",
               border: "none",
               padding: "0 25px",
               borderRadius: "3px",
              }}
             >
              Send
             </Button>
            </Form.Item>
           </Col>
          </Row>
         </Form>
        </div>
       </section>
      </div>
     </div>
    </div>
    <Footer />


    <Modal
     id="wechatqrcodemodal"
     size="sm"
     centered
     show={this.state.wechatqr_modal}
     onHide={() => {
      this.setState({ wechatqr_modal: false });
     }}
     aria-labelledby="example-modal-sizes-title-lg"
    >
     <Modal.Body>
      <div className="scan-wrapper">
       <div className="contact-box">
        <h6>Arch17</h6>
        <p>Official Wechat Contact</p>
        <div className="qrimgwrapper">
         <img src={qrcode} alt="scan to get touch via WeChat" />
        </div>
        <p style={{ fontSize: ".75rem" }}>
         Scan this code using WeChat, to get to direct contact with Arch17 on
         WeChat
        </p>
       </div>
      </div>
     </Modal.Body>
    </Modal>
   </>
  );
 }
}

// Need to start a new project or, more
// Informations? Get in touch with our team.

// Contact us via live chat, WhatsApp, WeChat, Phone: +86 185 7599 9560 or fill out the form and we will get back to you as soon as possible.
export default Procurement;
