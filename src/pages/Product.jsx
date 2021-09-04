import React, { Component } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "flag-icon-css/css/flag-icon.min.css";
import { BsPlus, BsDownload, BsFillCaretDownFill } from "react-icons/bs";
import { IoLayersSharp, IoPricetags } from "react-icons/io5";
import { RiWechat2Line, RiBook3Fill } from "react-icons/ri";
import { BiShareAlt } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineWhatsApp } from "react-icons/ai";
import Carousel from "react-elastic-carousel";
import Item from "../components/SliderComponents/slider";
import { Flex, Square } from "../components/SliderComponents/slider";
import collection3 from "../../src/collection-3.jpg";
import collection1 from "../../src/collection-1.png";
import collection4 from "../../src/h-1.png";
import collection5 from "../../src/h-2.png";
import slide1 from "../../src/slide1.jpg";
import slide3 from "../../src/slide3.jpg";
import sm1 from "../../src/sm1.jpg";
import sm2 from "../../src/sm2.jpg";
import sm4 from "../../src/sm4.jpg";
import collection2 from "../../src/collection-2.jpg";

import axios from "axios";
import { GiCube } from "react-icons/gi";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Image, Transformation } from "cloudinary-react";
//
const breakPoints = [{ width: 1200, itemsToShow: 1 }];
class Product extends Component {
 constructor(props) {
  super(props);
  this.state = {
   modals: {
    price_request: false,
   },
   product: null,
   options: null,
   galleries: [],
   activeOption: "",
   product_files: null,
   product_desc_overview: null,
   product_desc_mat: null,
   product_desc_size_: null,
   loading: true,
   product_id: this.props.match.params.id,
   plain_desc_content: false,
   plainOverview: false,
   plainSize: false,
  };
 }

 async componentDidMount() {
  await axios
   .get(
    `https://arch17-apis.herokuapp.com/api/product/${this.state.product_id}`
   )
   .then((products) => {
    this.setState({ product: products.data.product });
    this.setState({ options: products.data.product.options });

    this.setState({ galleries: products.data.product.gallery });
    if (products.data.product.options[0].material_name == null) {
     this.setState({ activeOption: products.data.product.options[1] });
    } else {
     this.setState({ activeOption: products.data.product.options[0] });
    }

    // if (products.data.product.files[0].files_cad_2d == null) {
    if (products.data.product.files) {
     this.setState({ product_files: products.data.product.files[0] });
    } else {
     this.setState({ product_files: products.data.product.files[1] });
    }

    // if (products.data.product.description[0].overview_content) {
    if (products.data.product.description[0]) {
     console.log(
      JSON.parse(products.data.product.description[0].overview_content)
     );
     console.log(
      JSON.parse(products.data.product.description[0].mat_desc_content)
     );
     this.setState({
      product_desc_overview: EditorState.createWithContent(
       convertFromRaw(
        JSON.parse(products.data.product.description[0].overview_content)
       )
      ),

      product_desc_size: EditorState.createWithContent(
       convertFromRaw(
        JSON.parse(products.data.product.description[0].size_content)
       )
      ),
      plainOverview:
       JSON.parse(products.data.product.description[0].overview_content)
        .blocks[0].text.length > 0 ||
       JSON.parse(products.data.product.description[0].overview_content)
        .entityMap,
      product_desc_mat: EditorState.createWithContent(
       convertFromRaw(
        JSON.parse(products.data.product.description[0].mat_desc_content)
       )
      ),
      plain_desc_content:
       JSON.parse(products.data.product.description[0].mat_desc_content)
        .blocks[0].text.length > 0 ||
       JSON.parse(products.data.product.description[0].mat_desc_content)
        .entityMap,
      plainSize:
       JSON.parse(products.data.product.description[0].size_content).blocks[0]
        .text.length > 0 ||
       JSON.parse(products.data.product.description[0].size_content).entityMap,
     });
    }

    console.log(products);
    this.setState({ loading: false });
   })
   .catch((error) => console.log(error));
 }

 updateOption = (index) => {
  console.log(this.state.activeOption);
  this.setState({ activeOption: this.state.options[index] });
  console.log(this.state.activeOption.cover);
 };

 price_request_open = () => {
  this.setState({ price_request: true });
 };

 price_request_close = () => {
  this.setState({ price_request: false });
 };

 render() {
  const loading = this.state.loading;
  if (!loading) {
   return (
    <React.Fragment>
     <div id="product-page" className="bg-white">
      <Container fluid>
       <Row className="justify-content-md-center p-md-5">
        <Col md={{ span: 8 }} className="p-0">
         <div id="swiper" style={{ position: "relative" }}>
          <Carousel
           style={{ backgroundColor: "transparent" }}
           breakPoints={breakPoints}
           renderPagination={({ pages, activePage, onClick }) => {
            return (
             <Flex
              direction="row"
              className="swiper-squares"
              style={{
               gridTemplateColumns: "repeat(6, 90px)",
               justifyContent: "center",
               margin: 0,
               width: "90%",
              }}
             >
              {pages.map((page, index) => {
               const isActivePage = activePage === page;
               return (
                <Square
                 key={page}
                 onClick={() => onClick(page)}
                 active={isActivePage}
                 className="thumb"
                 style={{
                  backgroundImage: `url(${this.state.activeOption.cover[index]})`,
                  backgroundOrigin: "inherit",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  border: "none",
                  width: "80px",
                 }}
                ></Square>
               );
              })}
             </Flex>
            );
           }}
          >
           {this.state.activeOption.cover?.map((item, index) => {
            return (
             <Item key={index}>
              {/* <img
               className="product-slider-img"
               src={item}
               alt="option cover"
               draggable="false"
              /> */}
              <div
               className="item-background"
               style={{ backgroundImage: `url(${item})` }}
              >
               {/* <img
                className="product-slider-img"
                src={item}
                alt="option cover"
                draggable="false"
               /> */}
              </div>
             </Item>
            );
           })}
          </Carousel>
         </div>
         <Accordion className="p-4 product-page-accordian">
          {this.state.plainOverview ? (
           <>
            <Card>
             <Accordion.Toggle as={Card.Header} eventKey="0">
              Overview
              <span className="accordion-icon">
               <BsPlus />
              </span>
             </Accordion.Toggle>
             <Accordion.Collapse eventKey="0">
              <Card.Body>
               <div className="overview-text">
                {this.state.product_desc_overview && (
                 <>
                  <p>
                   <Editor
                    editorState={this.state.product_desc_overview}
                    wrapperClassName="rich-editor demo-wrapper"
                    editorClassName="demo-editor"
                    readOnly
                    toolbar={{
                     options: [],
                    }}
                   />
                  </p>
                 </>
                )}
               </div>
              </Card.Body>
             </Accordion.Collapse>
            </Card>
           </>
          ) : (
           ""
          )}
          <Card>
           {/* <Accordion.Toggle as={Card.Header} eventKey="1">
            Description
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="1">
            <Card.Body>
             {this.state.product_desc_mat && (
              <>
               <p>
                <Editor
                 editorState={this.state.product_desc_mat}
                 wrapperClassName="rich-editor demo-wrapper"
                 editorClassName="demo-editor"
                 readOnly
                 toolbar={{
                  options: [],
                 }}
                />
               </p>
              </>
             )}
            </Card.Body>
           </Accordion.Collapse> */}
           {this.state.plain_desc_content ? (
            <>
             <Accordion.Toggle as={Card.Header} eventKey="1">
              Description
              <span className="accordion-icon">
               <BsPlus />
              </span>
             </Accordion.Toggle>
             <Accordion.Collapse eventKey="1">
              <Card.Body>
               {this.state.product_desc_mat && (
                <>
                 <p>
                  <Editor
                   editorState={this.state.product_desc_mat}
                   wrapperClassName="rich-editor demo-wrapper"
                   editorClassName="demo-editor"
                   readOnly
                   toolbar={{
                    options: [],
                   }}
                  />
                 </p>
                </>
               )}
              </Card.Body>
             </Accordion.Collapse>
            </>
           ) : (
            ""
           )}
          </Card>
          {this.state.plainSize ? (
           <>
            <Card>
             <Accordion.Toggle as={Card.Header} eventKey="5">
              Dimensions
              <span className="accordion-icon">
               <BsPlus />
              </span>
             </Accordion.Toggle>
             <Accordion.Collapse eventKey="5">
              <Card.Body>
               size descriopin html
               {this.state.product_desc_size && (
                <>
                 <p>
                  <Editor
                   editorState={this.state.product_desc_size}
                   wrapperClassName="rich-editor demo-wrapper"
                   editorClassName="demo-editor"
                   readOnly
                   toolbar={{
                    options: [],
                   }}
                  />
                 </p>
                </>
               )}
              </Card.Body>
             </Accordion.Collapse>
            </Card>
           </>
          ) : (
           ""
          )}
          {this.state.galleries?.length > 0 ? (
           <>
            <Card>
             <Accordion.Toggle as={Card.Header} eventKey="12">
              Galleries
              <span className="accordion-icon">
               <BsPlus />
              </span>
             </Accordion.Toggle>
             <Accordion.Collapse eventKey="12">
              <Card.Body>
               <div className="product-tags-boxs galleries-box">
                {this.state.product.gallery?.map((g, index) => {
                 return (
                  <div
                   key={index}
                   style={{
                    background: "#fff",
                    backgroundImage: `url(${g.desc_gallery_files})`,
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                   }}
                  >
                   {/* <img src={g.desc_gallery_files} alt="" /> */}
                  </div>
                 );
                })}
               </div>
              </Card.Body>
             </Accordion.Collapse>
            </Card>
           </>
          ) : (
           ""
          )}
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="2">
            Product Can be used at{" "}
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="2">
            <Card.Body>
             <div className="product-tags-boxs">
              {this.state.product.identity[0].places_tags?.map((tag, index) => {
               return <div key={index}>{tag}</div>;
              })}
             </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
          {this.state.product_files?.files_cad_2d[0]?.length > 0 ||
          this.state.product_files?.files_3d[0]?.length > 0 ? (
           <>
            <Card>
             <Accordion.Toggle as={Card.Header} eventKey="3">
              Cad & 3D Files
              <span className="accordion-icon">
               <BsPlus />
              </span>
             </Accordion.Toggle>
             <Accordion.Collapse eventKey="3">
              <Card.Body>
               <div className="product-collabse-content">
                {this.state.product_files?.files_cad_2d?.map((file, index) => {
                 return (
                  <>
                   <a
                    href={file}
                    download="arch17.dwg"
                    className="product-boxs"
                   >
                    <div className="file-box">
                     <GiCube />
                    </div>
                    <p>Download File</p>
                   </a>
                  </>
                 );
                })}
                {this.state.product_files?.files_3d?.map((file, index) => {
                 return (
                  <a href={file} className="product-boxs">
                   <div className="file-box">
                    <GiCube />
                   </div>
                   <p>Download File</p>
                  </a>
                 );
                })}
               </div>
              </Card.Body>
             </Accordion.Collapse>
            </Card>
           </>
          ) : (
           ""
          )}
          {/* <Card>
           <Accordion.Toggle as={Card.Header} eventKey="3">
            Cad & 3D Files
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="3">
            <Card.Body>
             <div className="product-collabse-content">
              {this.state.product_files?.files_cad_2d?.map((file, index) => {
               return (
                <>
                 <a href={file} download="arch17.dwg" className="product-boxs">
                  <div className="file-box">
                   <GiCube />
                  </div>
                  <p>Download File</p>
                 </a>
                </>
               );
              })}
              {this.state.product_files?.files_3d?.map((file, index) => {
               return (
                <a href={file} className="product-boxs">
                 <div className="file-box">
                  <GiCube />
                 </div>
                 <p>Download File</p>
                </a>
               );
              })}
             </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card> */}

          {/* <Card>
           <Accordion.Toggle as={Card.Header} eventKey="4">
            Catalogues{" "}
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="4">
            <Card.Body>
             <div className="product-cats-boxs">
              {this.state.product.files[0]?.files_pdf_cats?.map(
               (pdf, index) => {
                return (
                 <a
                  key={index}
                  href={pdf}
                  target="_plank"
                  className="cataloge-box"
                 >
                  <Image
                   cloudName="azharuniversity"
                   publicId={pdf.slice(0, -3) + "png"}
                  >
                   <Transformation page="1" />
                  </Image>
                  <p>Download File</p>
                 </a>
                );
               }
              )}
             </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card> */}
          {this.state.product.files[0]?.files_pdf_cats.length > 0 ? (
           <>
            <Card>
             <Accordion.Toggle as={Card.Header} eventKey="4">
              Catalogues{" "}
              <span className="accordion-icon">
               <BsPlus />
              </span>
             </Accordion.Toggle>
             <Accordion.Collapse eventKey="4">
              <Card.Body>
               <div className="product-cats-boxs">
                {this.state.product.files[0]?.files_pdf_cats?.map(
                 (pdf, index) => {
                  return (
                   <a
                    key={index}
                    href={pdf}
                    target="_plank"
                    className="cataloge-box"
                   >
                    <Image
                     cloudName="azharuniversity"
                     publicId={pdf.slice(0, -3) + "png"}
                    >
                     <Transformation page="1" />
                    </Image>
                    <p>Download File</p>
                   </a>
                  );
                 }
                )}
               </div>
              </Card.Body>
             </Accordion.Collapse>
            </Card>
           </>
          ) : (
           ""
          )}
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="9">
            Similar Products by grado
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="9">
            <Card.Body>
             {/* size descriopin html
             {this.state.product_desc_size && (
              <>
               <p>
                <Editor
                 editorState={this.state.product_desc_size}
                 wrapperClassName="rich-editor demo-wrapper"
                 editorClassName="demo-editor"
                 readOnly
                 toolbar={{
                  options: [],
                 }}
                />
               </p>
              </>
             )} */}
             <div className="similar-products">
              <div className="inner-body">
               <div className="product-box">
                <div className="product-img">
                 <img src={sm1} alt="" />
                </div>
                <h5 className="product-store">Kelly Wearstler</h5>
                <p className="product-name">ENZO Meeting Room Table</p>
                <div className="product-price">
                 <span>¥ 1395.00</span>
                </div>
               </div>
               <div className="product-box">
                <div className="product-img">
                 <img src={sm2} alt="" />
                </div>
                <h5 className="product-store">Kelly Wearstler</h5>
                <p className="product-name">ENZO Meeting Room Table</p>
                <div className="product-price">
                 {/* <span>¥ 1395.00</span> */}
                </div>
               </div>
               <div className="product-box">
                <div className="product-img">
                 <img src={slide3} alt="" />
                </div>
                <h5 className="product-store">Kelly Wearstler</h5>
                <p className="product-name">ENZO Meeting Room Table</p>
                <div className="product-price">
                 <span>¥ 1395.00</span>
                </div>
               </div>
               <div className="product-box">
                <div className="product-img">
                 <img src={sm4} alt="" />
                </div>
                <h5 className="product-store">Kelly Wearstler</h5>
                <p className="product-name">ENZO Meeting Room Table</p>
                <div className="product-price">
                 <span>¥ 1395.00</span>
                </div>
               </div>
              </div>
             </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="6">
            Collection{" "}
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="6">
            <Card.Body>
             <div className="store-collection product-tabs">
              <Container fluid>
               <Row md={{ span: 12 }}>
                <Col lg={4} sm={6} xs={12} className="collection-col">
                 <div className="collection-box">
                  <div
                   className="rect rect-0"
                   style={{ backgroundImage: `url(${collection1})` }}
                  ></div>
                  <div
                   className="rect rect-1"
                   style={{ backgroundImage: `url(${collection2})` }}
                  ></div>
                  <div
                   className="rect rect-2"
                   style={{ backgroundImage: `url(${collection3})` }}
                  ></div>
                 </div>
                 <div className="collection-text">
                  <h5>Modern</h5>
                  <p>NO Products</p>
                 </div>
                </Col>
                <Col lg={4} sm={6} xs={12} className="collection-col">
                 <div className="collection-box">
                  <div
                   className="rect rect-0"
                   style={{ backgroundImage: `url(${collection5})` }}
                  ></div>
                  <div
                   className="rect rect-1"
                   style={{ backgroundImage: `url(${collection4})` }}
                  ></div>
                  <div
                   className="rect rect-2"
                   style={{ backgroundImage: `url(${collection2})` }}
                  ></div>
                 </div>
                 <div className="collection-text">
                  <h5>Classic</h5>
                  <p>NO Topics . Created By Grado</p>
                 </div>
                </Col>
                <Col lg={4} sm={6} xs={12} className="collection-col">
                 <div className="collection-box">
                  <div className="rect rect-0"></div>
                  <div className="rect rect-1"></div>
                  <div className="rect rect-2"></div>
                 </div>
                 <div className="collection-text">
                  <h5>Oriental</h5>
                  <p>5 Products</p>
                 </div>
                </Col>
               </Row>
              </Container>
             </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="7">
            Projects & inspirations by grado{" "}
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="7">
            <Card.Body>Hello! I'm another body</Card.Body>
           </Accordion.Collapse>
          </Card>
         </Accordion>
        </Col>
        <Col md={{ span: 4 }} className="p-3">
         <div className="right-side p-3">
          <div className="right-row get-icons">
           <BsPlus />
           <BsDownload />
           <BiShareAlt />
          </div>
          <div className="right-row product-info ">
           <div className="store-name">Grado</div>
           {/* <div className="product-name">I3 Office System & Work Station</div> */}
           <div className="product-name">
            {this.state.product.identity[0].name}
           </div>

           <div className="design-by">
            Design By. <span style={{ fontWeight: "600" }}>Muhamed Mahdy</span>
           </div>
           <div className="product-country">
            Made in <span>{this.state.product.identity[0].country}</span>
            <span
             style={{ margin: "0 8px", fontSize: ".85rem" }}
             className={
              "flag-icon" +
              ` flag-icon-${this.state.product.identity[0].country.toLowerCase()}`
             }
            ></span>
           </div>
          </div>
          {this.state.activeOption.price ? (
           <>
            <div className="right-row product-price">
             <span style={{ fontWeight: "600", fontSize: "13px" }}>Price</span>
             <div className="price-value">
              {/* ¥ 5500.00 */}¥ {this.state.activeOption?.price}
              <span>
               Change Currency <BsFillCaretDownFill />
              </span>
             </div>
             <div className="info-message">
              The price is average, may change up or down depends on the
              Requirements, Quantity and Material or Size customization.
             </div>
            </div>
           </>
          ) : (
           ""
          )}
          {this.state.activeOption.code ? (
           <>
            <div className="right-row">
             <span>Code</span>
             <div className="options" id="codes">
              {this.state.options?.map((option, index) => {
               if (option.material_name && option.code[0] != "n") {
                return (
                 <button onClick={() => this.updateOption(index)}>
                  {option.code}
                 </button>
                );
               }
              })}
             </div>
            </div>
           </>
          ) : (
           ""
          )}
          {this.state.activeOption.size ? (
           <>
            <div className="right-row ">
             <span>Size</span>

             <div id="sizes" className="options">
              {/* <button>1500 x 700 x 500</button>
           <button>1200 x 400 x 200</button> */}
              {this.state.options?.map((option, index) => {
               if (option.material_name && option.size[0] != "n") {
                return (
                 <button onClick={() => this.updateOption(index)}>
                  {option.size}
                 </button>
                );
               }
              })}
             </div>
            </div>
           </>
          ) : (
           ""
          )}

          <div className="right-row ">
           <span>Material</span>
           <div id="materials" className="options">
            {this.state.options?.map((option, index) => {
             if (option.material_name) {
              return (
               <button
                onClick={() => this.updateOption(index)}
                style={{
                 backgroundImage: `url(${option.material_image})`,
                 backgroundSize: "contain",
                 backgroundPosition: "center",
                }}
               >
                {option.material_name}
               </button>
              );
             }
             // return <button key={index}>{option.material_name}</button>;
            })}
           </div>
          </div>
          <div className="right-row ">
           <button
            id="shop-now"
            className="action-btn"
            onClick={() => this.updateOption(1)}
           >
            <span className="btn-icons">
             <AiOutlineShoppingCart />
            </span>
            Shop Now
           </button>
          </div>
          <div className="right-row ">
           <ul id="shop-upps">
            <li>
             - <span>Available.</span>
            </li>
            <li>
             - <span>Customizable / Made-to-order</span>
            </li>
            <li>
             - <span>Estimated delivery in 4 to 8 weeks</span>
            </li>
            <li>
             -{" "}
             <span>
              Delivery fee is free to certain countries, Learn More..
             </span>
            </li>
           </ul>
          </div>
          <div className="right-row">
           <div className="request-btns">
            <button className="action-btn" onClick={this.price_request_open}>
             <span className="btn-icons">
              <IoPricetags />
             </span>
             Request Customize Quote
            </button>
            <button className="action-btn">
             <span className="btn-icons">
              <IoLayersSharp />
             </span>
             Request Material Sample
            </button>
            <button className="action-btn">
             <span className="btn-icons">
              <GiCube />
             </span>
             Request Cad/ 3D Files
            </button>
            <button className="action-btn">
             <span className="btn-icons">
              <RiBook3Fill />
             </span>
             Request Catalogue
            </button>
           </div>
          </div>
          <div className="right-row">
           <button className="save-btn action-btn bg-white">
            <span className="btn-icons">
             <BsPlus />
            </span>{" "}
            Save To Collection
           </button>
          </div>
          <div className="right-row">
           <p className="need-info">
            <span>Need more informations,</span> Please chat with us now from
            the chat icon on the bottom left or message us through Whats App /
            WeChat or e-mail us at sales@arch17.com
           </p>
          </div>
          <div className="right-row chat-btns">
           <button className="bg-white action-btn">
            <span className="btn-icons">
             <AiOutlineWhatsApp />
            </span>
            Message us Via WhatsApp
           </button>
           <button className="bg-white action-btn">
            <span className="btn-icons">
             <RiWechat2Line />
            </span>
            Message us Via WeChat
           </button>
           <div className="reach-us">
            <span>Reach Us by phone, Phone Number</span> +86 185 7599 9560
           </div>
          </div>
         </div>
        </Col>
       </Row>
      </Container>
     </div>

     <>
      <Modal
       id="price-request-modal"
       className="arch-wide-modal product-modal"
       size="lg"
       show={this.state.price_request}
       onHide={() => this.price_request_close()}
       aria-labelledby="example-modal-sizes-title-lg"
      >
       <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
         Request Price Info
        </Modal.Title>
       </Modal.Header>
       <Modal.Body>
        <Container>
         <Row>
          <Col xs={12} md={5}>
           <div className="product-price-img">
            <img alt="product" src={slide1} />
           </div>
          </Col>
          <Col xs={12} md={7}>
           {/* .col-xs-6 .col-md-4 */}
           <Form.Row>
            <Form.Group as={Col} md={6} controlId="formGridState">
             <Form.Label>Size</Form.Label>
             <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
             </Form.Control>
            </Form.Group>
           </Form.Row>
           <Form.Row>
            <Form.Group as={Col} md={6} controlId="formGridState">
             <Form.Label>Material</Form.Label>
             <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
             </Form.Control>
            </Form.Group>
           </Form.Row>
           <Form.Row>
            <Form.Group as={Col} md={6} controlId="formGridState">
             <Form.Label>Quantity</Form.Label>
             <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
             </Form.Control>
            </Form.Group>
           </Form.Row>
           <Form.Row>
            <Form.Group as={Col} md={6} controlId="formGridState">
             <Form.Label>Shipping to</Form.Label>
             <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
             </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridState">
             <Form.Label>
              <span> .</span>
             </Form.Label>
             <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
             </Form.Control>
            </Form.Group>
           </Form.Row>
          </Col>
         </Row>

         <Row>
          <Col md={12}>Add Comment</Col>
         </Row>
         <Row>
          <Col md={12}>GC DC code</Col>
         </Row>
         <Row>
          <Col md={12}>Sent Button</Col>
         </Row>
        </Container>
       </Modal.Body>
      </Modal>
     </>
    </React.Fragment>
   );
  } else {
   return (
    <>
     <div className="page-loading-svg">
      <svg className="" viewBox="0 0 1320 300">
       <text x="50%" y="50%" dy=".35em" text-anchor="middle">
        Arch17
       </text>
      </svg>
     </div>
    </>
   );
  }
 }
}
export default Product;
