import React, { Component } from "react";
import { Row, Col, Carousel, Spin } from "antd";
import "./addProject/Porject.css";
import project from "./../../src/project.png";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { IoIosMail } from "react-icons/io";
import { LoadingOutlined } from "@ant-design/icons";

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
   content_state: null,
   project_id: this.props.match.params.id,
   project: {
    name: null,
    country: null,
    city: null,
    year: null,
   },
   designers: [],
   brands: [],
   similars: [],
   fetched: false,
  };
 }
 brandSlideChange = (a, b, c) => {
  // console.log(a, b, c);
 };
 componentDidMount() {
  axios
   .get(`${API}project/${this.state.project_id}`)

   .then((response) => {
    console.log(response.data);
    this.setState({
     fetched: true,
     project: response.data.project,
     products: response.data.products_tags,
     content_state: EditorState.createWithContent(
      convertFromRaw(JSON.parse(response.data.project.content))
     ),
     brands: response.data.brands,
     designers: response.data.designers,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }
 render() {
  if (!this.state.fetched)
   return (
    <>
     <>
      <Spin
       size="large"
       indicator={
        <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
       }
       style={{ position: "absolute", top: "40%", right: "50%" }}
      />
     </>
    </>
   );
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
         <h6>{this.state.project?.name}</h6>

         <p className="location">{`${this.state.project?.country} ${this.state.project?.city} | ${this.state.project?.year} | 455`}</p>

         <div className="editor-state my-3">
          {this.state.content_state && (
           <>
            <Editor
             editorState={this.state.content_state}
             wrapperClassName="rich-editor demo-wrapper"
             editorClassName="demo-editor cs-editor"
             readOnly
             toolbar={{
              options: [],
             }}
            />
           </>
          )}
         </div>
        </div>
       </Col>
       <Col md={8}>
        <div className="project-right-side">
         <div className="designers p-3">
          <p className="via">Designed by</p>

          {this.state.designers?.map((d) => {
           return (
            <Row gutter={50} className="my-4" align="middle">
             <Col md={8}>
              <div
               className="brand-slide-logo"
               style={{
                backgroundImage: `url(${d.avatar})`,
               }}
              >
               {d.avatar && d.avatar?.length > 10 ? (
                ""
               ) : (
                <p>{d.displayName[0]}</p>
               )}
              </div>
             </Col>
             <Col md={16}>
              <p className="name">{d.displayName}</p>
              <p className="title">{d.professions[0]}</p>
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
           );
          })}
          {this.state.designers?.length > 2 && (
           <p className="text-right bold p-3 ">See More</p>
          )}
         </div>
         <div className="brands p-4">
          <p className="via">Products by</p>
          <Carousel
           afterChange={this.brandSlideChange}
           autoplay
           effect="scrollx"
          >
           {this.state.brands?.map((brand) => {
            return (
             <>
              <div>
               <div className="brand">
                <Row gutter={20} className="my-4 mb-5" align="middle">
                 <Col md={9}>
                  <div
                   className="brand-slide-logo"
                   style={{
                    backgroundImage: `url(${brand.logo})`,
                   }}
                  >
                   {brand.logo && brand.logo?.length > 10 ? (
                    <></>
                   ) : (
                    <p>{brand.name[0]}</p>
                   )}
                  </div>
                 </Col>
                 <Col md={15}>
                  <p className="name">{brand.name}</p>
                  <p className="title">
                   {`${brand.type} | ${brand.country}`}{" "}
                   {brand.city ? `, ${brand.city}` : ""}
                  </p>
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
                <Row span={24} gutter={20}>
                 {brand?.products?.map((p) => {
                  return (
                   <Col md={8} className="mb-3">
                    <div
                     className="p-box"
                     style={{
                      backgroundImage: `url(${p.identity[0].preview_cover})`,
                     }}
                    >
                     <div className="sky"></div>
                    </div>
                   </Col>
                  );
                 })}
                </Row>
                {brand?.products?.length > 6 && (
                 <p className="text-right bold p-3 ">See More</p>
                )}
               </div>
              </div>
             </>
            );
           })}
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
      <Row span={24} gutter={30}>
       {this.state.products?.map((product, index) => {
        return (
         <>
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
         </>
        );
       })}
      </Row>

      {this.state.products?.length > 4 && (
       <p className="text-right block w-100 red">See More</p>
      )}
     </div>
    </section>
   </>
  );
 }
}

export default Project;
