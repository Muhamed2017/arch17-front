import React, { Component } from "react";
import { Row, Col, Carousel } from "antd";
import "./addProject/Porject.css";
import project from "./../../src/project.png";
import content from "./../../src/content.png";
import designer from "./../../src/designer.png";
import brand from "./../../src/brand.png";
import p1 from "./../../src/p1.png";
import p2 from "./../../src/p2.png";
import p3 from "./../../src/p3.png";
import p4 from "./../../src/p4.png";
import p5 from "./../../src/p5.png";
import axios from "axios";
import p6 from "./../../src/p6.png";
import { IoIosMail } from "react-icons/io";

import {
 FaPinterestP,
 FaFacebookF,
 FaVimeoV,
 FaTwitter,
 FaThumbsUp,
} from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { API } from "./../utitlties";
import { Link } from "react-router-dom";
class Project extends Component {
 constructor(props) {
  super(props);
  this.state = {
   products: [],
  };
 }
 brandSlideChange = (a, b, c) => {
  console.log(a, b, c);
 };
 componentDidMount() {
  axios
   .get(`${API}home/products`)
   .then((response) => {
    console.log(response);
    this.setState({
     products: response.data.products,
     fetching: false,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }
 render() {
  return (
   <>
    <div id="project-page">
     <section id="cover">
      <Row>
       <Col>
        <div className="project-cover">
         <img src={project} alt="" />
        </div>
       </Col>
      </Row>
     </section>
     <section id="project-main">
      <Row span={24} gutter={20}>
       <Col md={1}>
        <div className="socials">
         <div>
          <FaFacebookF />
         </div>
         <div>
          <FaTwitter />
         </div>
         <div>
          <FaPinterestP />
         </div>
         <div>
          <FaVimeoV />
         </div>

         <div>
          <FaThumbsUp />
         </div>
         <div>
          <AiOutlinePlus />
         </div>
        </div>
       </Col>
       <Col md={15} className="shifted-top">
        <div className="project-content">
         <h6>Secrets of Office Green Plants by grado design</h6>
         <p className="location">China, Hangzhou | 2020 455</p>

         <div className="editor-state my-3">
          <p className="pb-5 pt-2 black">
           Office space serves as a powerful tool to boost engagement, fuel
           innovation and drive production. But what is an optimal office space
           like? Grado believes it is able to help partners of industries yield
           more space design inspirations through systematic methodology.
          </p>
          <img src={content} alt="" />
          <p className="pb-5 pt-2 black">
           Office space serves as a powerful tool to boost engagement, fuel
           innovation and drive production. But what is an optimal office space
           like? Grado believes it is able to help partners of industries yield
           more space design inspirations through systematic met
          </p>
         </div>
        </div>
       </Col>
       <Col md={8}>
        <div className="project-right-side">
         <div className="designers p-3">
          <Row gutter={10} className="my-4">
           <Col md={7}>
            <img src={designer} alt="" />
           </Col>
           <Col md={17}>
            <p className="name">Designer Name</p>
            <p className="title">Designer Title</p>
            <div className="des-btns">
             <button>
              <IoIosMail />
             </button>
             <button>
              <AiOutlinePlus /> Follow
             </button>
            </div>
           </Col>
          </Row>
          <Row gutter={10} className="my-4">
           <Col md={7}>
            <img src={designer} alt="" />
           </Col>
           <Col md={17}>
            <p className="name">Designer Name</p>
            <p className="title">Designer Title</p>
            <div className="des-btns">
             <button>
              <IoIosMail />
             </button>
             <button>
              <AiOutlinePlus /> Follow
             </button>
            </div>
           </Col>
          </Row>
          <p className="text-right bold p-3 ">See More</p>
         </div>
         <div className="brands p-4">
          <p>Products by</p>
          <Carousel
           afterChange={this.brandSlideChange}
           autoplay
           effect="scrollx"
          >
           <div>
            <div className="brand">
             <Row gutter={10} className="my-4">
              <Col md={7}>
               <img src={brand} alt="" />
              </Col>
              <Col md={17}>
               <p className="name">Designer Name</p>
               <p className="title">Designer Title</p>
               <div className="des-btns">
                <button>
                 <IoIosMail />
                </button>
                <button>
                 <AiOutlinePlus /> Follow
                </button>
               </div>
              </Col>
             </Row>
             <Row gutter={20}>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p1})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p2})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p3})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p4})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p5})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p6})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
             </Row>
            </div>
           </div>
           <div>
            <div className="brand">
             <Row gutter={10} className="my-4">
              <Col md={7}>
               <img src={brand} alt="" />
              </Col>
              <Col md={17}>
               <p className="name">Designer Name</p>
               <p className="title">Designer Title</p>
               <div className="des-btns">
                <button>
                 <IoIosMail />
                </button>
                <button>
                 <AiOutlinePlus /> Follow
                </button>
               </div>
              </Col>
             </Row>
             <Row gutter={20}>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p1})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p2})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p3})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p4})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p5})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p6})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
             </Row>
            </div>
           </div>
           <div>
            <div className="brand">
             <Row gutter={10} className="my-4">
              <Col md={7}>
               <img src={brand} alt="" />
              </Col>
              <Col md={17}>
               <p className="name">Designer Name</p>
               <p className="title">Designer Title</p>
               <div className="des-btns">
                <button>
                 <IoIosMail />
                </button>
                <button>
                 <AiOutlinePlus /> Follow
                </button>
               </div>
              </Col>
             </Row>
             <Row gutter={20}>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p1})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p2})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p3})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p4})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p5})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p6})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
             </Row>
            </div>
           </div>
           <div>
            <div className="brand">
             <Row gutter={10} className="my-4">
              <Col md={7}>
               <img src={brand} alt="" />
              </Col>
              <Col md={17}>
               <p className="name">Designer Name</p>
               <p className="title">Designer Title</p>
               <div className="des-btns">
                <button>
                 <IoIosMail />
                </button>
                <button>
                 <AiOutlinePlus /> Follow
                </button>
               </div>
              </Col>
             </Row>
             <Row gutter={20}>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p1})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p2})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p3})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p4})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p5})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
              <Col md={8} className="mb-3">
               <div
                className="p-box"
                style={{
                 backgroundImage: `url(${p6})`,
                }}
               >
                <div className="sky"></div>
               </div>
              </Col>
             </Row>
            </div>
           </div>
          </Carousel>
         </div>
        </div>
       </Col>
      </Row>
     </section>
    </div>
    <section id="product-tags">
     <div className="products">
      <p className="py-2 mb-5 head">Products Used in this project …</p>
      {this.state.products?.map((product, index) => {
       return (
        <>
         <Row>
          <Col className="gutter-row mb-3" md={6}>
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

            <div className="lower-info">
             <h5 className="product-store">{product.store_name.store_name}</h5>

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
           </div>
          </Col>
         </Row>
        </>
       );
      })}
      <p className="text-right block w-100 red">See More</p>
     </div>
    </section>
   </>
  );
 }
}

export default Project;
