import React, { Component } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { BsPlus, BsDownload, BsFillCaretDownFill } from "react-icons/bs";
import { IoLayersSharp, IoPricetags, IoCube } from "react-icons/io5";
import { RiWechat2Line, RiBook3Fill } from "react-icons/ri";
import { BiShareAlt } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineWhatsApp } from "react-icons/ai";
import Carousel from "react-elastic-carousel";
import Item from "../components/SliderComponents/slider";
import { Flex, Square } from "../components/SliderComponents/slider";
import slide1 from "../../src/slide1.jpg";
import axios from "axios";
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
   activeOption: "",
   product_files: null,
   loading: true,
   product_id: this.props.match.params.id,
   // id: this.props.params.match.id,
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

    if (products.data.product.options[0].material_name == null) {
     this.setState({ activeOption: products.data.product.options[1] });
    } else {
     this.setState({ activeOption: products.data.product.options[0] });
    }

    this.setState({ product_files: products.data.product.files[0] });
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
         <div id="swiper">
          <Carousel
           breakPoints={breakPoints}
           renderPagination={({ pages, activePage, onClick }) => {
            return (
             <Flex direction="row">
              {pages.map((page) => {
               const isActivePage = activePage === page;
               return (
                <Square
                 key={page}
                 onClick={() => onClick(page)}
                 active={isActivePage}
                 className="thumb"
                >
                 <img src={slide1} alt="" />
                </Square>
               );
              })}
             </Flex>
            );
           }}
          >
           {this.state.activeOption.cover?.map((item, index) => {
            return (
             <Item key={index}>
              <img src={item} alt="option cover" />
             </Item>
            );
           })}
          </Carousel>
         </div>
         <Accordion className="p-4 product-page-accordian">
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="0">
            Description{" "}
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
           </Accordion.Collapse>
          </Card>
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="1">
            Product Can be used at{" "}
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
           </Accordion.Collapse>
          </Card>
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="2">
            Cad & 3D Files
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="2">
            <Card.Body>
             <div
              style={{
               display: "inlile-grid",
               gridTemplateColumns: "80px 80px 80px",
               width: "120px",
              }}
             >
              {this.state.product_files?.files_cad_2d?.map((file, index) => {
               return (
                <div
                 className="file-box"
                 style={{ width: "80px", height: "80px", background: "red" }}
                ></div>
               );
              })}
             </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>

          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="3">
            Catalogues{" "}
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="3">
            <Card.Body>Hello! I'm another body</Card.Body>
           </Accordion.Collapse>
          </Card>
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="4">
            Similar Products by grado
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="4">
            <Card.Body>Hello! I'm another body</Card.Body>
           </Accordion.Collapse>
          </Card>
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="5">
            Collection{" "}
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="5">
            <Card.Body>Hello! I'm another body</Card.Body>
           </Accordion.Collapse>
          </Card>
          <Card>
           <Accordion.Toggle as={Card.Header} eventKey="6">
            Projects & inspirations by grado{" "}
            <span className="accordion-icon">
             <BsPlus />
            </span>
           </Accordion.Toggle>
           <Accordion.Collapse eventKey="6">
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
           <div className="product-name">{this.state.product.kind}</div>

           <div className="design-by">
            Design By. <span>Muhamed Mahdy</span>
           </div>
           <div className="product-country">
            Made in <span>China</span>
           </div>
          </div>
          <div className="right-row product-price">
           <span>Price</span>
           <div className="price-value">
            ¥ 5500.00
            <span>
             Change Currency <BsFillCaretDownFill />
            </span>
           </div>
           <div className="info-message">
            The price is average, may change up or down depends on the
            Requirements, Quantity and Material or Size customization.
           </div>
          </div>
          <div className="right-row ">
           <span>Size</span>
           <div id="sizes" className="options">
            {/* <button>1500 x 700 x 500</button>
           <button>1200 x 400 x 200</button> */}
            {this.state.options?.map((option, index) => {
             if (option.material_name) {
              return (
               <button onClick={() => this.updateOption(index)}>
                {option.size}
               </button>
              );
             }
            })}
           </div>
          </div>
          <div className="right-row ">
           <span>Material</span>
           <div id="materials" className="options">
            {this.state.options?.map((option, index) => {
             if (option.material_name) {
              return (
               <button onClick={() => this.updateOption(index)}>
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
              <IoCube />
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
   return <></>;
  }
 }
}
export default Product;
