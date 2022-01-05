import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import {
 Row as AntRow,
 Col as AntCol,
 Input,
 Button as AntButton,
 Image,
 Collapse,
 Menu,
 Dropdown,
 //  Form,
 //  Space,
 Modal as AntModal,
} from "antd";

import pptxgen from "pptxgenjs";

import {
 FacebookShareButton,
 LinkedinShareButton,
 TwitterShareButton,
 PinterestShareButton,
 TumblrShareButton,
 EmailShareButton,
 PinterestIcon,
 FacebookIcon,
 LinkedinIcon,
 TwitterIcon,
 TumblrIcon,
 EmailIcon,
} from "react-share";
import MetaTags from "react-meta-tags";

import { SiGoogledrive, SiBaidu } from "react-icons/si";
import { GrOnedrive } from "react-icons/gr";
import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineDropbox } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
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
// import wechaticon from "../../src/wechaticon.png";
import axios from "axios";
import { GiCube } from "react-icons/gi";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import HashLoader from "react-spinners/HashLoader";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

import { Gallery, Item as SwipItem } from "react-photoswipe-gallery";

// import { Image, Transformation } from "cloudinary-react";
import ImageGallery from "react-image-gallery";
import "antd/dist/antd.css";

import "react-image-gallery/styles/css/image-gallery.css";
import {
 vanillaSigninEmailPassword,
 signupFacebook,
 signupGoogle,
 signupEmailPassword,
} from "../redux/actions/authActions";
import { API } from "./../utitlties";
import { connect } from "react-redux";
import qrcode from "../../src/qrcode.jpeg";
import PriceRequestModal from "./../components/Modals/PriceRequestModal";
import {
 closeProductRequestAction,
 openProductRequestAction,
} from "./../redux/actions/addProductActions";
const breakPoints = [{ width: 1200, itemsToShow: 1 }];
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class Product extends Component {
 constructor(props) {
  super(props);
  // let shareUrl = `https://www.arch17test.live/product/${this.props.match.params.id}`;
  this.state = {
   modals: {
    price_request: false,
   },
   signinPassword: "",
   signingEmail: "",
   signupEmail: "",
   signupPassword: "",
   signupFname: "",
   signupLname: "",
   authFace: "",
   product: null,
   options: null,
   galleries: [],
   activeOption: "",
   product_files: null,
   product_desc_overview: null,
   product_desc_mat: null,
   product_desc_size_: null,
   //  shareUrl: `https://www.arch17test.live/product/${this.props.match.params.id}`,
   loading: true,
   signingIn: false,
   product_id: this.props.match.params.id,
   plain_desc_content: false,
   plainOverview: false,
   plainSize: false,
   slider: false,

   request_modal_type: "",
   slides: [
    {
     original: "https://picsum.photos/id/1018/1000/600/",
     thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
     original: "https://picsum.photos/id/1015/1000/600/",
     thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
     original: "https://picsum.photos/id/1019/1000/600/",
     thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
   ],
   sliderImgs: [],
   files_modal: false,
   wechatqr_modal: false,
   activeFile: null,
   authModal: false,
   visible: false,
   mainHeight: 0,
   mainWidth: 0,
   thumbsDims: [],
  };
 }
 success = () => {
  AntModal.success({
   content: "some messages...some messages...",
  });
 };
 loadThumbsForPpt = (imgs) => {
  imgs.map((img) => {
   img.src = img.original;
   img.onload = () => {
    this.setState({
     dims: [...this.state.thumbsDims, { width: img.width, height: img.height }],
    });
   };
  });
 };
 loadImage = (imageUrl) => {
  const img = document.createElement("img");
  img.src = imageUrl;
  img.onload = () => {
   this.setState({ mainWidth: img.width, mainHeight: img.height });
   console.log(`${img.width} ${img.height}`);
  };
 };
 shareUrl = `https://www.arch17test.live/product/155`;
 shareMedia = this.state?.sliderImgs[0].original;
 shareQoute = this.state?.product.identity[0].name;
 menu = (
  <Menu>
   <Menu.Item key="1">
    <FacebookShareButton
     url="https://www.arch17test.live/product/155"
     //  url="https://www.archiproducts.com/en/products/molteni-c/paul-corner-sofa_246892"
     hashtag={"#Arch17"}
    >
     <FacebookIcon size={25} />
    </FacebookShareButton>
   </Menu.Item>
   <Menu.Item key="2">
    <LinkedinShareButton url={this.shareUrl} title="Share">
     <LinkedinIcon size={25} />
    </LinkedinShareButton>
   </Menu.Item>
   <Menu.Item key="3">
    <PinterestShareButton
     url={this.shareUrl}
     title="Share"
     media="https://res.cloudinary.com/azharuniversity/image/upload/v1639859531/ewhbtrqgav8xxoobzbyo.jpg"
    >
     <PinterestIcon size={25} />
    </PinterestShareButton>
   </Menu.Item>
   <Menu.Item key="4">
    <TwitterShareButton url={this.shareUrl} title="Share">
     <TwitterIcon size={25} />
    </TwitterShareButton>
   </Menu.Item>
   <Menu.Item key="5">
    <TumblrShareButton
     url={this.shareUrl}
     title="Share"
     tags={["Arch17", "Arch155"]}
     caption="Arch17 Product Name with skneknekn"
    >
     <TumblrIcon size={25} />
    </TumblrShareButton>
   </Menu.Item>
   <Menu.Item key="6">
    <EmailShareButton
     url={this.shareUrl}
     title="Share"
     tags={["Arch17", "Arch155"]}
     caption="Arch17 Product Name with skneknekn"
    >
     <EmailIcon size={25} />
    </EmailShareButton>
   </Menu.Item>
  </Menu>
 );
 flipToRegiseterFace = () => {
  this.setState({ authFace: "register-face" });
  console.log(this.state.authFace);
 };
 flipToSigninFace = () => {
  this.setState({ authFace: "signin-face" });
  console.log(this.state.authFace);
 };
 openFileModal = (activeFile) => {
  console.log(activeFile);
  this.setState({ activeFile }, () => {
   this.setState({ files_modal: true });
  });
 };
 openAuthenticationModal = () => {
  console.log("open login / register Modal");
  this.setState({ authModal: true });
 };

 handleSigningIn = (email, password) => {
  this.setState({ signingIn: !this.props.isLoggedIn });
  this.props.dispatchRegularSignin(email, password);
 };
 handleRegularSignup = (fname, lname, email, password) => {
  this.props.dispatchRegularSignup(fname, lname, email, password, "regular");
  // console.log(props.isLoggedIn);
 };

 callback = (key) => {
  console.log(key);
 };
 generatePPT = () => {
  // 1. Create a new Presentation
  let pptx = new pptxgen();
  pptx.author = "Arch17";
  pptx.company = "Arch17 Brand";
  pptx.revision = "15";
  pptx.subject = "Product Cat";
  pptx.title = "Product AAA";
  pptx.defineLayout({ name: "A4", width: 10.85, height: 7.5 });
  // Set presentation to use new layout
  pptx.layout = "A4";

  // 2. Add a Slide
  let slide = pptx.addSlide();
  slide.addText("Source 制 作: www.arch17.com", {
   x: 1.9,
   y: 0.2,
   w: 8.8,
   h: 0.5,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "right",
   color: "A8A8A8",
   fontSize: 11,
   bold: true,
  });
  slide.addText("FF&E SPECIFICATIONS", {
   x: 0.2,
   y: 0.2,
   w: 2.5,
   h: 0.5,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "left",
   color: "A8A8A8",
   fontSize: 11,
   bold: true,
  });

  slide.addShape(pptx.ShapeType.line, {
   line: { color: "000000" },
   x: "2.5%",
   y: 0.63,
   w: "95%",
   h: 0,
  });

  let arrTabRows1 = [
   [
    {
     text: "Area 来源",
     options: {
      valign: "center",
      align: "left",
      fontFace: "Arial",
      bold: true,
     },
    },

    {
     text: "",
     options: { valign: "center", align: "left", fontFace: "Arial" },
    },
    {
     text: "Code 来源",
     options: {
      valign: "center",
      align: "left",
      fontFace: "Arial",
      bold: true,
     },
    },
    {
     //  text: "01",
     text: "",
     options: { valign: "center", align: "left", fontFace: "Arial" },
    },
    {
     text: "Type 类型",
     options: {
      valign: "center",
      align: "left",
      fontFace: "Arial",
      bold: true,
     },
    },
    {
     //  text: "Reseption Desk",
     text: this.state.product?.identity[0]?.kind,
     options: { valign: "center", align: "left", fontFace: "Arial" },
    },
    {
     text: "Quantity",
     options: {
      valign: "center",
      align: "left",
      fontFace: "Arial",
      bold: true,
     },
    },
    {
     text: "",
     options: { valign: "center", align: "left", fontFace: "Arial" },
    },
   ],
   [
    {
     text: "Name 来源",
     options: { valign: "middle", align: "left", bold: true },
    },
    {
     //  text: "LUNA SOFA (2 Seats)",
     text: this.state?.product?.identity[0].name,
     options: { valign: "middle", align: "left" },
    },
    { text: "Model", options: { valign: "middle", align: "left", bold: true } },
    {
     text: this.state.options[0]?.code ?? "-",
     options: { valign: "middle", align: "left" },
    },
    {
     text: "Brand 制作商",
     options: { valign: "middle", align: "left", bold: true },
    },
    {
     text: this.state?.product?.stores?.name,
     options: { valign: "middle", align: "left" },
    },
    {
     text: "Source Link 源码链接",
     options: { valign: "middle", align: "left", bold: true },
    },
    {
     text: `https://www.arch17test.live/${this.state.product_id}`,
     options: { valign: "middle", align: "left" },
    },
   ],
  ];
  slide.addTable(arrTabRows1, {
   x: "2.5%",
   y: 0.7,
   w: "95%",
   rowH: 0.4,
   colW: [1, 1.5, 1, 1.5, 1, 1.5, 1, 1.9],
   fill: { color: "FFFFFF" },
   fontSize: 7,
   color: "000000",
   border: { pt: ".5", color: "000000" },
  });

  slide.addImage({
   path: this.state.sliderImgs[0].original,
   x: "2.5%",
   y: 1.6,
   h: 4.7,
   w: (4.5 * this.state.mainWidth) / this.state.mainHeight,
   sizing: {
    type: "crop",
    w: 5.9,
    h: 4.7,
   },
  });

  slide.addText("SPECIFICATIONS 制作商", {
   y: 1.6,
   x: 6.2,
   h: 0.4,
   w: 2.2,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "left",
   color: "000000",
   bold: true,
   fontSize: 12,
   fontFace: "Arial",
  });
  slide.addShape(pptx.ShapeType.line, {
   line: { color: "000000" },
   x: 6.3,
   y: 2,
   w: 2.7,
   h: 0,
  });
  slide.addText("Add description here", {
   x: 6.2,
   y: 2.1,
   w: 4.3,
   h: 1.1,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "left",
   color: "000000",
   valign: "top",
   line: { width: "1", color: "F6F6F6" },
   fontSize: 11,
  });
  slide.addText("Material 制作商", {
   x: 6.2,
   y: 3.4,
   w: 2,
   h: 0.4,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "left",
   color: "000000",
   bold: true,
   fontSize: 12,
   fontFace: "Arial",
  });
  slide.addShape(pptx.ShapeType.line, {
   line: { color: "000000" },
   x: 6.3,
   y: 3.7,
   w: 2.7,
   h: 0,
  });
  slide.addText("Add Material here", {
   x: 6.2,
   y: 3.8,
   w: 4.3,
   h: 1.1,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "left",
   color: "000000",
   valign: "top",
   line: { width: "1", color: "F6F6F6" },
   fontSize: 11,
  });
  slide.addText("Dimensions 制作商", {
   x: 6.2,
   y: 5.2,
   w: 2,
   h: 0.4,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "left",
   color: "000000",
   bold: true,
   fontSize: 12,
   fontFace: "Arial",
  });
  slide.addShape(pptx.ShapeType.line, {
   line: { color: "000000" },
   x: 6.3,
   y: 5.7,
   w: 2.7,
   h: 0,
  });
  slide.addText("Add Dimensions here", {
   x: 6.2,
   y: 5.8,
   w: 4.3,
   h: 1.1,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "left",
   color: "000000",
   valign: "top",
   line: { width: "1", color: "F6F6F6" },
   fontSize: 11,
  });
  this.state.sliderImgs.map((item, index) => {
   slide.addImage({
    path: item.original,
    x: 0.2 + index * 0.9,
    // y: 2.7 + (5.2 * this.state.mainHeight) / this.state.mainWidth,
    // h: 2.5,
    w: 0.8,
    y: 6.5,
    h: 0.5,
   });
  });
  slide.addShape(pptx.ShapeType.line, {
   line: { color: "000000" },
   x: "2.5%",
   y: "94.8%",
   w: "95%",
   h: 0,
  });
  slide.addImage({
   path:
    "https://res.cloudinary.com/drmbnxne8/image/upload/v1641121373/WhatsApp_Image_2022-01-02_at_12.50.10_PM_c0skb0.jpg",
   x: "85%",
   y: "95.4%",
   w: 0.8,
   h: 0.254,
  });
  slide.addText("Email 制 作: sales@arch17.co", {
   x: "2.5%",
   y: "95.2%",
   w: 2.7,
   h: 0.3,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "left",
   color: "A8A8A8",
   fontSize: 11,
   bold: true,
  });
  slide.addText("Phone 制 作: 008618575999560", {
   x: 3,
   y: "95.2%",
   w: 3.5,
   h: 0.3,
   shape: pptx.ShapeType.rect,
   fill: { color: "FFFFFF" },
   align: "left",
   color: "A8A8A8",
   fontSize: 11,
   bold: true,
  });
  slide.slideNumber = {
   x: "95%",
   y: "95.2%",
   fontSize: 10.5,
   //  color: "000",
   bold: true,
  };

  // slide.addTable(rows, { x: 0.5, y: 1.0, w: 9.0, color: "363636" });

  pptx.writeFile({ fileName: "Arch17_Cat.pptx" }).then((fileName) => {
   console.log(`created file: ${fileName}`);
  });
 };

 async componentDidMount() {
  console.log(this.state.activeOption);
  console.log(this.state.plainOverview);
  console.log(this.state.product_desc_overview);
  this.loadThumbsForPpt(this.state.sliderImgs);
  console.log(this.props.isLoggedIn);
  await axios
   .get(`${API}product/${this.state.product_id}`)
   .then((products) => {
    this.setState({ product: products.data.product });
    this.setState({ options: products.data.product.options });
    this.setState({ files: products.data.product.files });
    this.setState({ galleries: products.data.product.gallery });
    this.setState({ activeOption: products.data.product.options[0] });
    console.log(products.data.product.options[0].covers);
    products.data.product.options[0].covers?.map((cover, index) => {
     if (cover.src) {
      this.setState(
       {
        sliderImgs: [
         ...this.state.sliderImgs,
         {
          original: cover.src,
          thumbnail: cover.src,
          thumbnailClass: "custom-thumb",
          thumbnailWidth: "50",
          thumbnailHeight: "50",
         },
        ],
       },
       () => {
        console.log(this.state.sliderImgs);
       }
      );
     }
    });
    this.loadImage(products.data.product.options[0].covers[0].src);
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

 request_open = (type) => {
  this.setState(
   {
    request_modal_type: `Request ${type}`,
   },
   () => {
    this.props.dispatchRequestOpen();
   }
  );
 };
 price_request_close = () => {
  this.setState({ price_request: false });
 };

 render() {
  const loading = this.state.loading;
  if (!loading) {
   return (
    <React.Fragment>
     <MetaTags>
      <title>Arch17 | {this.state.product.identity[0].name}</title>
      {/* <meta name="description" content={this.state.product.identity[0].name} /> */}
      <meta name="description" content="Arch17 Furniture Platform" />
      <meta property="og:title" content={this.state.product.identity[0].name} />
      <meta
       property="og:image"
       content="https://res.cloudinary.com/azharuniversity/image/upload/v1639859531/ewhbtrqgav8xxoobzbyo.jpg"
      />
     </MetaTags>
     <div id="product-page" className="bg-white">
      <Container fluid>
       <Row className="justify-content-md-center p-md-5">
        <Col md={{ span: 8 }} className="p-0">
         <div id="swiper" style={{ position: "relative" }}>
          {this.state.slider && (
           <>
            <Carousel
             style={{ backgroundColor: "transparent" }}
             breakPoints={breakPoints}
             renderPagination={({ pages, activePage, onClick }) => {
              return (
               <Flex
                direction="row"
                className="swiper-squares"
                style={{
                 gridTemplateColumns: "repeat(auto-fit, 90px)",
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
             {this.state.activeOption?.covers?.map((item, index) => {
              return (
               item.src !== "" &&
               item.src != null && (
                <Item key={index}>
                 {/* <img
               className="product-slider-img"
               src={item}
               alt="option cover"
               draggable="false"
              /> */}
                 <div
                  className="item-background"
                  style={{ backgroundImage: `url(${item.src})` }}
                 >
                  {/* <img
                className="product-slider-img"
                src={item}
                alt="option cover"
                draggable="false"
               /> */}
                 </div>
                </Item>
               )
              );
             })}
            </Carousel>
           </>
          )}
          {!this.state.slider && (
           <>
            <ImageGallery
             showPlayButton={false}
             items={this.state.sliderImgs}
            />
           </>
          )}
         </div>
         {false && (
          <>
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
              Product Can be used at
              <span className="accordion-icon">
               <BsPlus />
              </span>
             </Accordion.Toggle>
             <Accordion.Collapse eventKey="2">
              <Card.Body>
               <div className="product-tags-boxs">
                {this.state.product.identity[0].places_tags?.map(
                 (tag, index) => {
                  return <div key={index}>{tag}</div>;
                 }
                )}
               </div>
              </Card.Body>
             </Accordion.Collapse>
            </Card>
            <Card>
             <Accordion.Toggle as={Card.Header} eventKey="3">
              Product Downloadable Files
              <span className="accordion-icon">
               <BsPlus />
              </span>
             </Accordion.Toggle>
             <Accordion.Collapse eventKey="3">
              <Card.Body>
               {this.props.isLoggedIn && (
                <>
                 {this.state.files.map((file, index) => {
                  return (
                   <>
                    <button
                     className="product-boxs"
                     onClick={() => this.openFileModal(file)}
                    >
                     <div className="file-box">{file.file_type}</div>
                     <p>{file.file_name}</p>
                     <span
                      className="link-bold"
                      style={{
                       fontSize: ".75rem",
                       marginLeft: "-13px",
                      }}
                     >
                      {file.software}
                     </span>
                    </button>
                   </>
                  );
                 })}
                </>
               )}
               {!this.props.isLoggedIn && (
                <>
                 {this.state.files.map((file, index) => {
                  return (
                   <>
                    <button
                     className="product-boxs"
                     onClick={this.openAuthenticationModal}
                    >
                     <div className="file-box">{file.file_type}</div>
                     <p>{file.file_name}</p>
                     <span
                      className="link-bold"
                      style={{
                       fontSize: ".75rem",
                       marginLeft: "-13px",
                      }}
                     >
                      {file.software}
                     </span>
                    </button>
                   </>
                  );
                 })}
                </>
               )}
              </Card.Body>
             </Accordion.Collapse>
            </Card>
            <Card>
             <Accordion.Toggle as={Card.Header} eventKey="9">
              Similar Products by grado
              <span className="accordion-icon">
               <BsPlus />
              </span>
             </Accordion.Toggle>
             <Accordion.Collapse eventKey="9">
              <Card.Body>
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
          </>
         )}
         <Collapse
          expandIconPosition="right"
          // ghost
          defaultActiveKey={["1"]}
          onChange={this.callback}
          bordered
         >
          <Panel header="Overview" key="1">
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
          </Panel>
          <Panel key="10" header="Materials">
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
          </Panel>
          <Panel key="9" header="Dimensions">
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
          </Panel>
          <Panel header="Product Can be used at" key="2">
           <div className="product-tags-boxs">
            {this.state.product.identity[0].places_tags?.map((tag, index) => {
             return <div key={index}>{tag}</div>;
            })}
           </div>
          </Panel>
          <Panel header="Cad & 3D Files" key="3">
           {this.props.isLoggedIn && (
            <>
             {this.state.files.map((file, index) => {
              return (
               <>
                <button
                 className="product-boxs"
                 onClick={() => this.openFileModal(file)}
                >
                 <div className="file-box">{file.file_type}</div>
                 <p>{file.file_name}</p>
                 <span
                  className="link-bold"
                  style={{
                   fontSize: ".75rem",
                   marginLeft: "-13px",
                  }}
                 >
                  {file.software}
                 </span>
                </button>
               </>
              );
             })}
            </>
           )}
           {!this.props.isLoggedIn && (
            <>
             {this.state.files.map((file, index) => {
              return (
               <>
                <button
                 className="product-boxs"
                 onClick={this.openAuthenticationModal}
                >
                 <div className="file-box">{file.file_type}</div>
                 <p>{file.file_name}</p>
                </button>
               </>
              );
             })}
            </>
           )}
          </Panel>
          <Panel header="Gallery" key="4">
           {/* <div className="product-tags-boxs galleries-box"> */}
           <AntRow gutter={10}>
            {/* {this.state.product.gallery?.map((g, index) => {
             return (
              <AntCol span={6}>
              
               <Image
                preview={{ visible: false }}
                // width={180}
                height={115}
                src={g.desc_gallery_files}
                onClick={() => this.setState({ visible: true })}
               />
              </AntCol>
             );
            })} */}
            <Gallery>
             {this.state.product.gallery?.map((g, index) => {
              return (
               <AntCol
                className="gallery-cover"
                span={6}
                style={{
                 display: "grid",
                 alignItems: "center",
                }}
               >
                <SwipItem
                 original={g.desc_gallery_files}
                 thumbnail={g.desc_gallery_files}
                 width={1180}
                 height={730}
                 style={{}}
                >
                 {({ ref, open }) => (
                  <img
                   ref={ref}
                   onClick={open}
                   src={g.desc_gallery_files}
                   alt=""
                   //  width={100}
                   //  height={100}
                  />
                 )}
                </SwipItem>
               </AntCol>
              );
             })}
             {/* <SwipItem
              original="https://placekitten.com/1024/768?image=1"
              thumbnail="https://placekitten.com/80/60?image=1"
              width="1024"
              height="768"
             >
              {({ ref, open }) => (
               <img
                ref={ref}
                onClick={open}
                src="https://placekitten.com/80/60?image=1"
               />
              )}
             </SwipItem>
             <SwipItem
              original="https://placekitten.com/1024/768?image=2"
              thumbnail="https://placekitten.com/80/60?image=2"
              width="1024"
              height="768"
             >
              {({ ref, open }) => (
               <img
                ref={ref}
                onClick={open}
                src="https://placekitten.com/80/60?image=2"
               />
              )}
             </SwipItem> */}
            </Gallery>
           </AntRow>
           {/* </div> */}
          </Panel>
          <Panel header="Similar Products by Grado" key="5">
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
          </Panel>
          <Panel key="6" header="Collections">
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
          </Panel>
         </Collapse>
         ,
        </Col>
        <Col md={{ span: 4 }} className="p-3">
         <div className="right-side p-3">
          {this.props.isLoggedIn && (
           <>
            <a href={`/edit-product/${this.state.product_id}`}>
             <p>Edit</p>
            </a>
           </>
          )}
          <div className="right-row get-icons">
           <BsPlus onClick={this.generatePPT} />
           <div style={{ verticalAlign: "middle" }}>
            <a href={`${API}test-pdf/${this.state.product_id}`}>
             <BsDownload />
            </a>
           </div>
           <Dropdown overlay={this.menu}>
            <AntButton
             style={{
              border: "none",
              background: "transparent",
              verticalAlign: "middle",
              fontSize: "16px",
              padding: "4px 5px",
             }}
            >
             <BiShareAlt />
            </AntButton>
           </Dropdown>
          </div>
          <div className="right-row product-info ">
           <div className="store-name">{this.state?.product?.stores?.name}</div>
           {/* <div className="product-name">I3 Office System & Work Station</div> */}
           <div className="product-name">
            {this.state.product.identity[0].name}
           </div>

           <div className="design-by">
            Design By. <span style={{ fontWeight: "600" }}>Muhamed Mahdy</span>
           </div>
           <div className="product-country">
            Made in{" "}
            <span style={{ fontWeight: "600" }}>
             {/* { this.state.product.identity[0].country} */} China
            </span>
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
               if (option.material_name && option.code != "n") {
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
              {this.state.options?.map((option, index) => {
               if (option.material_name && option.size?.w != null) {
                return (
                 <button onClick={() => this.updateOption(index)}>
                  {`${option.size.l} X ${option.size.w} X ${option.size.h}`}
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
               <>
                <button>
                 <button
                  onClick={() => this.updateOption(index)}
                  style={{
                   backgroundImage: `url(${option.material_image})`,
                   backgroundSize: "cover",
                   backgroundRepeat: "no-repeat",
                   backgroundPosition: "center",
                   width: "100%",
                   height: "100%",
                  }}
                 >
                  {/* {option.material_name} */}
                 </button>
                 <div>{option.material_name}</div>
                </button>
               </>
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
            <button
             className="action-btn"
             onClick={() => this.request_open("Price Info")}
            >
             <span className="btn-icons">
              <IoPricetags />
             </span>
             Request Customize Quote
            </button>
            <button
             className="action-btn"
             onClick={() => this.request_open("Material Sample")}
            >
             <span className="btn-icons">
              <IoLayersSharp />
             </span>
             Request Material Sample
            </button>
            <button
             className="action-btn"
             onClick={() => this.request_open("Cad/ 3D Files")}
            >
             <span className="btn-icons">
              <GiCube />
             </span>
             Request Cad/ 3D Files
            </button>
            <button
             className="action-btn"
             onClick={() => this.request_open("Catalogue")}
            >
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
            <a href="https://wa.link/1hqgdx" target="_blank" rel="noreferrer">
             <span className="btn-icons">
              <AiOutlineWhatsApp />
             </span>
             Message us Via WhatsApp
            </a>
           </button>
           <button
            className="bg-white action-btn"
            onClick={() => {
             this.setState({ wechatqr_modal: true });
            }}
           >
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
              onChange={(e) =>
               this.setState({ signinPassword: e.target.value })
              }
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
              onChange={(e) =>
               this.setState({ signupPassword: e.target.value })
              }
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
     </>

     <>
      <AntModal
       title={this.state.request_modal_type}
       width={650}
       className="request-modal"
       type={this.state.request_tyoe}
       visible={this.props.requesting}
       destroyOnClose
       footer={false}
       closeIcon={
        <>
         <div onClick={this.props.dispatchRequestClose}>X</div>
        </>
       }
       okButtonProps={{ hidden: true }}
       cancelButtonProps={{ hidden: true }}
       requestType={this.state.request_modal_type}
      >
       <PriceRequestModal
        product={this.state.product}
        cover={this.state.sliderImgs[0].original}
        name={this.state.product.identity[0].name}
        store={this.state.product.stores.name}
       />
      </AntModal>
     </>

     {/* files modal */}
     <>
      <Modal
       id="price-request-modal"
       className="upload-file-modal"
       size="md"
       centered
       show={this.state.files_modal}
       onHide={() => {
        this.setState({ files_modal: false });
       }}
       aria-labelledby="example-modal-sizes-title-lg"
      >
       <Modal.Body>
        <div className="modal-wrapper" style={{ padding: "10px", margin: "" }}>
         {this.state.activeFile?.onedrive && (
          <>
           <AntRow gutter={16} className="mb-3">
            <AntCol>
             <p
              style={{
               fontSize: "1.2rem",
               fontWeight: "bold",
               fontFamily: "Roboto",
              }}
             >
              Download Product Files
             </p>
            </AntCol>
           </AntRow>

           <AntRow gutter={16} className="mb-3 mt-3">
            <AntCol className="gutter-row" span={12}>
             <AntButton
              type="primary"
              className="drivebtn"
              icon={<SiGoogledrive />}
              style={{ width: "100%" }}
              size="large"
             >
              OneDrive
              <a
               href={this.state.activeFile?.onedrive}
               target="_blank"
               rel="noreferrer"
              >
               <BiLinkExternal />
              </a>
             </AntButton>
            </AntCol>
            <AntCol className="gutter-row" span={12}>
             <AntButton
              type="primary"
              style={{ width: "100%" }}
              size="large"
              className="drivebtn"
              icon={<SiGoogledrive />}
             >
              Google Drive
              <a
               href={this.state.activeFile?.ggldrive}
               target="_blank"
               rel="noreferrer"
              >
               <BiLinkExternal />
              </a>
             </AntButton>
            </AntCol>
           </AntRow>
          </>
         )}
         <AntRow gutter={16} className="mb-3">
          <AntCol className="gutter-row" span={12}>
           <AntButton
            type="primary"
            style={{ width: "100%" }}
            icon={<AiOutlineDropbox />}
            size="large"
            className="drivebtn"
           >
            Dropbox
           </AntButton>
          </AntCol>
          <AntCol className="gutter-row" span={12}>
           <AntButton
            type="primary"
            style={{ width: "100%" }}
            icon={<SiBaidu />}
            size="large"
            className="drivebtn"
           >
            Baidu Drive
           </AntButton>
          </AntCol>
         </AntRow>
         <AntRow gutter={16} className="my-4">
          <AntCol>
           <p className="gray-text">
            If you found difficulty downloading or using the downloaded files
            please contact us by e-mail help@Arch17.co or WhatsApp/WeChat: 0086
            185 7599 9560.
           </p>
          </AntCol>
         </AntRow>
        </div>
       </Modal.Body>
      </Modal>

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

      <div style={{ display: "none" }}>
       <Image.PreviewGroup
        preview={{
         visible: this.state.visible,
         onVisibleChange: (vis) => this.setState({ visible: vis }),
        }}
       >
        {this.state.product.gallery?.map((g, index) => {
         return <Image src={g.desc_gallery_files} />;
        })}
       </Image.PreviewGroup>
      </div>
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
const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignup: (fname, lname, email, password, method) =>
  dispatch(signupEmailPassword(fname, lname, email, password, method)),
 dispatchRegularSignin: (email, password) =>
  dispatch(vanillaSigninEmailPassword(email, password)),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
 dispatchRequestOpen: () => dispatch(openProductRequestAction()),
 dispatchRequestClose: () => dispatch(closeProductRequestAction()),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  requesting: state.addProduct.requesting,
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
