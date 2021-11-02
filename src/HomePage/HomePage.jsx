import React, { Component, Suspense } from "react";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import { Col as antCol, Row as antRow } from "antd";
import { Img } from "react-image";
import "./HomePage.css";
import slide1 from "./../images/HomePage/HomePageSlides/slider-1.jpg";
import slide2 from "./../images/HomePage/HomePageSlides/slider-2.jpg";
import slide3 from "./../images/HomePage/HomePageSlides/slider-3.jpg";
import slide4 from "./../images/HomePage/HomePageSlides/slider-4.jpg";
import prev from "./../images/HomePage/HomePageSlides/previos.png";
import next from "./../images/HomePage/HomePageSlides/next.png";
import mediaSectionImg1 from "./../images/HomePage/MediaSection/main-01.jpg";
import mediaSectionImg2 from "./../images/HomePage/MediaSection/main-02.jpg";
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

class HomePage extends Component {
 state = {
  sliderData: [
   {
    image: slide1,
    heading: "The Mix Screen",
    description:
     "expressive feature whilst maintaining a simple and elegant look overall.",
    link: "",
   },
   {
    image: slide2,
    heading: "The Mix Screen",
    description:
     "expressive feature whilst maintaining a simple and elegant look overall.",
    link: "",
   },
   {
    image: slide3,
    heading: "The Mix Screen",
    description:
     "expressive feature whilst maintaining a simple and elegant look overall.",
    link: "",
   },
   {
    image: slide4,
    heading: "The Mix Screen",
    description:
     "expressive feature whilst maintaining a simple and elegant look overall.",
    link: "",
   },
   {
    image: slide1,
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
 };
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
    <div className="w-100 home-page m-auto ">
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
     <Container className="mt-5 px-0">
      <section className="w-100 home-heading-2 text-center">
       <h2>
        Hot solutions by brands and designers inspires you to design and build
       </h2>
       <p>
        Source Ideas for your projects, explore products catalogues, get CAD /
        3D files and shop design products
       </p>
       <button className="btn arch17-btn mt-3">JOIN NOW</button>
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
           Join Now &gt;{" "}
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
         <div className="media-item-desc text-left px-2">
          <h3 className="media-item-desc-heading">Upholstered Lounge Chair</h3>
          <p
           className="text-left w-100 m-0 d-block mg-p"
           style={{
            padding: "0 12px",
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
            src={image_placeholder}
            key={image_placeholder}
            loader={<p> loading images from supsencd </p>}
            unloader={<button> failed </button>}
            className="img-fluid media-section-item-img"
           />
          </Suspense>
         </div>
         <div className="media-item-desc text-left px-2">
          <h3 className="media-item-desc-heading text-white">
           Create breakout
          </h3>
          <p
           className="text-left w-100 m-0 d-block media-item-desc-desc text-white mg-p"
           style={{
            padding: "0 12px",
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
            src={media_4}
            key={media_4}
            loader={<p> loading images from supsencd </p>}
            unloader={<button> failed </button>}
            className="img-fluid media-section-item-img"
           />
          </Suspense>
         </div>
         <div className="media-item-desc text-left  px-2 ">
          <h3
           className="media-item-desc-heading text-white"
           style={{ fontSize: "28px" }}
          >
           Create breakout
          </h3>
          <p
           className="text-left w-100 text-white m-0 d-block media-item-desc-desc"
           style={{
            padding: "0 12px",
            textAlign: "left",
            fontSize: "1.01rem !important",
            color: "#000",
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
            src={media_3}
            key={media_3}
            loader={<p> loading images from supsencd </p>}
            unloader={<button> failed </button>}
            className="img-fluid media-section-item-img"
           />
          </Suspense>
         </div>
         <div className="media-item-desc text-left px-2 ">
          <h3
           className="media-item-desc-heading text-white"
           style={{ fontSize: "28px" }}
          >
           Create breakout area
          </h3>
          <p
           className="text-left w-100 text-white m-0 d-block media-item-desc-desc"
           style={{
            padding: "0 12px",
            textAlign: "left",
            fontSize: "1.01rem !important",
            color: "#000",
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
            src={main_3}
            key={main_3}
            loader={<p> loading images from supsencd </p>}
            unloader={<button> failed </button>}
            className="img-fluid media-section-item-img"
           />
          </Suspense>
         </div>
         <div className="media-item-desc text-left px-2 ">
          <h3 className="media-item-desc-heading text-white">
           Create breakout area
          </h3>
          <p
           className="text-left w-100 m-0 d-block media-item-desc-desc text-white mg-p"
           style={{
            padding: "0 12px",
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
         <div className="media-item-desc text-left px-2">
          <h3 className="media-item-desc-heading">Coffee & Side table</h3>
          <p
           className="text-left w-75 m-0 d-block media-item-desc-desc"
           style={{
            padding: "0 12px",
            textAlign: "left",
            fontSize: "1.01rem !important",
            color: "#000",
           }}
          >
           You can go for a simple table with space for remote controls and cups
           of coffee.
          </p>
         </div>
        </div>
       </div>
      </section>
      <div>
       <section className="project-contaienr text-center bg-white mt-5 pt-4">
        <h2 className="home-center">Magazine</h2>
        <h3 className="home-center mb-5">
         Explore Design Projects, News & trends
        </h3>
        <div className="project-filters-tab justify-content-center my-4 none-mobile">
         <p className="mx-2 px-2">Recent</p>
         <p className="mx-2 px-2">Architecture</p>
         <p className="mx-2 px-2">Interior Design</p>
         <p className="mx-2 px-2">Product Design</p>
         <p className="mx-2 px-2">Design blogs</p>
        </div>
        <Row>
         <Col
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          className="h-100 px-2 my-3 "
          key={generateKey("project")}
         >
          <ProjectBox imgUrl="https://www.arch17.com/data/projects/320/cover/img/cover.jpg" />
         </Col>
         <Col
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          className="h-100 px-2 my-3 "
          key={generateKey("project")}
         >
          <ProjectBox imgUrl="https://www.arch17.com/data/projects/325/cover/img/cover.jpg" />
         </Col>
         <Col
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          className="h-100 px-2 my-3 "
          key={generateKey("project")}
         >
          <ProjectBox imgUrl="https://www.arch17.com/data/projects/330/cover/img/cover.jpg" />
         </Col>
         <Col
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          className="h-100 px-2 my-3 "
          key={generateKey("project")}
         >
          <ProjectBox imgUrl="https://www.arch17.com/data/projects/321/cover/img/cover.jpg" />
         </Col>
         <Col
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          className="h-100 px-2 my-3 "
          key={generateKey("project")}
         >
          <ProjectBox imgUrl="https://www.arch17.com/data/projects/319/cover/img/cover.jpg" />
         </Col>
         <Col
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          className="h-100 px-2 my-3 "
          key={generateKey("project")}
         >
          <ProjectBox imgUrl="https://www.arch17.com/data/projects/315/cover/img/cover.jpg" />
         </Col>
        </Row>
        <button className="btn mt-4">Go to Magazine</button>
       </section>
      </div>
      <section className="stores-container bg-white text-left pb-5">
       <h2 className="px-3">Brands & Stores</h2>
       <h3 className="px-3">Explore catalogues by brands</h3>
       <div className="stores-items">{Stores}</div>
       <button className="btn d-block mx-auto mt-4">see all</button>
      </section>
      <section className="products-container">
       {/* <Col className="gutter-row" span={6}> */}
       {/* <a href={`/product/${product.id}`}> */}
       {/* <a href="#"> */}
       {/* <div className="product">
          <div
           className="p-img"
           style={
            {
             // background: `url(${product.options[1]?.cover[0]})`,
             // background: `url(${product.identity[0]?.preview_cover})`,
             // background: `url(${product.preview_cover})`,
            }
           }
          ></div> */}
       {/* <h5 className="product-store">{brand.store.name}</h5> */}
       {/* <p className="product-name">{product.identity[0]?.name}</p> */}
       {/* <p className="product-name">Name</p> */}
       {/* <div className="product-price"> */}
       {/* <span>¥ 55</span> */}
       {/* </div> */}
       {/* </div> */}
       {/* </a> */}
       {/* </Col> */}

       <h2>Products</h2>
       <h3>Explore products, get CAD / 3D files</h3>
       <div className="stores-items">{Stores}</div>
       <button className="btn d-block mx-auto mt-4">See More Products</button>
      </section>
     </Container>
    </div>
   </React.Fragment>
  );
 }
}
export default HomePage;
