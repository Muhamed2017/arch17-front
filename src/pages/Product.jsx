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
 Modal as AntModal,
} from "antd";
// import { FilePdfFilled, FilePptFilled } from "@ant-design/icons";
import pptxgen from "pptxgenjs";
import { FaFilePdf } from "react-icons/fa";
import { RiFilePpt2Fill } from "react-icons/ri";

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
// import MetaTags from "react-meta-tags";

import { SiGoogledrive, SiBaidu } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineDropbox } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { FiPhoneCall } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import "flag-icon-css/css/flag-icon.min.css";
import { BsPlus, BsDownload, BsFillCaretDownFill } from "react-icons/bs";
import { IoLayersSharp, IoPricetags } from "react-icons/io5";
import { RiWechat2Line, RiBook3Fill } from "react-icons/ri";
import { BiShareAlt } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineWhatsApp } from "react-icons/ai";
import Carousel from "react-elastic-carousel";
import Item from "../components/SliderComponents/slider";
import { Flex, Square } from "../components/SliderComponents/slider";

import axios from "axios";
import { GiCube } from "react-icons/gi";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import HashLoader from "react-spinners/HashLoader";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery, Item as SwipItem } from "react-photoswipe-gallery";
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
import SaveToCollection from "./../components/Modals/SaveToCollection";

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
  this.state = {
   modals: {
    price_request: false,
   },
   signinPassword: "",
   signingEmail: "",
   acive_index: 0,
   collections: [],
   signupEmail: "",
   signupPassword: "",
   ppt_downloaing: false,
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
   loading: true,
   signingIn: false,
   product_id: this.props.match.params.id,
   plain_desc_content: false,
   plainOverview: false,
   plainSize: false,
   slider: false,
   request_modal_type: "",
   pdf_files: [],
   sliderImgs: [],
   files_modal: false,
   wechatqr_modal: false,
   activeFile: null,
   authModal: false,
   visible: false,
   mainHeight: 0,
   mainWidth: 0,
   thumbsDims: [],
   overviewDescExist: false,
   materialDescExist: false,
   sizeDescExist: false,
  };
 }

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
 product_id = this.props.match.params.id;
 shareMedia = this.state?.sliderImgs[0].original;
 shareQoute = this.state?.product.identity[0].name;
 downloadMenu = (
  <Menu style={{ padding: "0" }}>
   <Menu.Item className="mb-1" key="0" onClick={() => this.generatePPT()}>
    <RiFilePpt2Fill style={{ fontSize: "1.5rem", color: "rgb(250,15,0)" }} />
   </Menu.Item>
   <Menu.Item key="1">
    <a
     href={`${API}test-pdf/${this.product_id}`}
     target="_blank"
     rel="noreferrer"
    >
     <FaFilePdf style={{ fontSize: "1.5rem", color: "rgb(202,67,37)" }} />
    </a>
   </Menu.Item>
  </Menu>
 );
 menu = (
  <Menu>
   <Menu.Item key="1">
    <FacebookShareButton
     url="https://www.arch17test.live/product/155"
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
    x: 0.25 + index * 0.9,
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
   x: 0.23,
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
   x: 2.7,
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
   bold: true,
  };

  pptx
   .writeFile({ fileName: "Arch17_Cat.pptx" })
   .then((fileName) => {
    console.log(`created file: ${fileName}`);
   })
   .catch((err) => {
    console.log(`Error: ${err} happened`);
   });
 };

 async componentDidMount() {
  this.loadThumbsForPpt(this.state.sliderImgs);
  await axios
   .get(`${API}product/${this.state.product_id}`)
   .then((products) => {
    this.setState({ product: products.data.product });
    this.setState({ options: products.data.product.options });
    this.setState({
     //  files: products.data.product.files,
     files: products.data.product.files.filter((f) => {
      return f.file_type !== "PDF";
     }),
     pdf_files: products.data.product.files.filter((f) => {
      return f.file_type === "PDF";
     }),
    });
    this.setState({ collections: products.data.collections });
    this.setState({ galleries: products.data.product.gallery });
    this.setState({ activeOption: products.data.product.options[0] });
    console.log(products.data.product.options[0].covers);

    products.data.product.options[0].covers?.map((cover, index) => {
     if (cover.src) {
      this.setState({
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
      });
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
        .blocks[0].text?.length > 0 ||
       JSON.parse(products.data.product.description[0].overview_content).blocks
        ?.length > 1 ||
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
       JSON.parse(products.data.product.description[0].mat_desc_content).blocks
        ?.length > 1 ||
       JSON.parse(products.data.product.description[0].mat_desc_content)
        .entityMap,
      plainSize:
       JSON.parse(products.data.product.description[0].size_content).blocks[0]
        .text.length > 0 ||
       JSON.parse(products.data.product.description[0].size_content).blocks
        ?.length > 1 ||
       JSON.parse(products.data.product.description[0].size_content).entityMap,
     });
    }

    console.log(products);
    this.setState({ loading: false });
    if (this.props.location.state?.request_price) {
     this.request_open("Price Info");
    }
   })
   .catch((error) => console.log(error));
 }

 updateOption = (index) => {
  console.log(this.state);
  this.setState({
   activeOption: this.state.options[index],
   acive_index: index,
  });
  let acviteCovers = [];
  this.state.options[index].covers.map((cover) => {
   if (cover.src) {
    acviteCovers.push({
     original: cover.src,
     thumbnail: cover.src,
     thumbnailClass: "custom-thumb",
     thumbnailWidth: "50",
     thumbnailHeight: "50",
    });
   }
  });
  this.setState({
   sliderImgs: acviteCovers,
  });
  console.log(this.state.activeOption.cover);
 };

 saveToCollection = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
  } else {
   this.setState({
    save_to_collection_modal: true,
   });
  }
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
     <div id="product-page" className="bg-white py-2">
      <Container fluid>
       <Row className="justify-content-md-center">
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
               item.src !== null && (
                <Item key={index}>
                 <div
                  className="item-background"
                  style={{ backgroundImage: `url(${item.src})` }}
                 ></div>
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
             full
             items={this.state.sliderImgs}
            />
           </>
          )}
         </div>
         <Collapse
          expandIconPosition="right"
          defaultActiveKey={[
           "overview",
           //  "collections",
           //  "material",
           //  "dimensions",
           //  "gallery",
           //  "files",
           //  "tags",
           //  "similars",
          ]}
          onChange={this.callback}
          bordered
         >
          {Object.keys(this.state.plainOverview).length > 0 ? (
           <>
            <Panel header="Overview" key="overview">
             <div className="overview-text">
              {this.state.product_desc_overview && (
               <>
                <p>
                 <Editor
                  editorState={this.state.product_desc_overview}
                  wrapperClassName="rich-editor demo-wrapper"
                  editorClassName="demo-editor cs-editor"
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
           </>
          ) : (
           <>
            {this.state.plainOverview === true && (
             <>
              <Panel header="Overview" key="overview">
               <div className="overview-text">
                {this.state.product_desc_overview && (
                 <>
                  <p>
                   <Editor
                    editorState={this.state.product_desc_overview}
                    wrapperClassName="rich-editor demo-wrapper"
                    editorClassName="demo-editor cs-editor"
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
             </>
            )}
           </>
          )}

          {Object.keys(this.state.plain_desc_content).length > 0 ? (
           <>
            <Panel key="material" header="Materials">
             {this.state.product_desc_mat && (
              <>
               <p>
                <Editor
                 editorState={this.state.product_desc_mat}
                 wrapperClassName="rich-editor demo-wrapper"
                 editorClassName="demo-editor cs-editor"
                 readOnly
                 toolbar={{
                  options: [],
                 }}
                />
               </p>
              </>
             )}
            </Panel>
           </>
          ) : (
           <>
            {this.state.plain_desc_content === true && (
             <>
              <Panel key="material" header="Materials">
               {this.state.product_desc_mat && (
                <>
                 <p>
                  <Editor
                   editorState={this.state.product_desc_mat}
                   wrapperClassName="rich-editor demo-wrapper"
                   editorClassName="demo-editor cs-editor"
                   readOnly
                   toolbar={{
                    options: [],
                   }}
                  />
                 </p>
                </>
               )}
              </Panel>
             </>
            )}
           </>
          )}

          {Object.keys(this.state.plainSize).length > 0 ? (
           <>
            <Panel key="dimensions" header="Dimensions">
             {this.state.product_desc_size && (
              <>
               <p>
                <Editor
                 editorState={this.state.product_desc_size}
                 wrapperClassName="rich-editor demo-wrapper"
                 editorClassName="demo-editor cs-editor"
                 readOnly
                 toolbar={{
                  options: [],
                 }}
                />
               </p>
              </>
             )}
            </Panel>
           </>
          ) : (
           <>
            {this.state.plainSize === true && (
             <>
              <Panel key="dimensions" header="Dimensions">
               {this.state.product_desc_size && (
                <>
                 <p>
                  <Editor
                   editorState={this.state.product_desc_size}
                   wrapperClassName="rich-editor demo-wrapper"
                   editorClassName="demo-editor cs-editor"
                   readOnly
                   toolbar={{
                    options: [],
                   }}
                  />
                 </p>
                </>
               )}
              </Panel>
             </>
            )}
           </>
          )}

          {this.state.files.length > 0 && (
           <>
            <Panel header="Cad & 3D Files" key="files">
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
           </>
          )}
          {this.state.pdf_files.length > 0 && (
           <>
            <Panel header="PDF Catalogues" key="pdf">
             {this.props.isLoggedIn && (
              <>
               {this.state.pdf_files.map((file, index) => {
                return (
                 <>
                  <button
                   className="product-boxs"
                   onClick={() => this.openFileModal(file)}
                  >
                   <div className="pdf-box">
                    <hr className="w-50 m-auto mt-3" />
                    <p className="pdf-title">{file.file_name}</p>
                   </div>
                   {/* <p>{file.file_name}</p> */}
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
               {this.state.pdf_files.map((file, index) => {
                return (
                 <>
                  <button
                   className="product-boxs"
                   onClick={this.openAuthenticationModal}
                  >
                   <div className="pdf-box">{/* {file.file_type} */}</div>
                   <p>{file.file_name}</p>
                  </button>
                 </>
                );
               })}
              </>
             )}
            </Panel>
           </>
          )}
          {this.state.galleries.length > 0 && (
           <>
            <Panel header="Gallery" key="gallery" forceRender>
             <AntRow gutter={10}>
              <Gallery
               shareButton={false}
               options={{
                bgOpacity: 1,
                counterEl: false,
                zoomEl: false,
                fullscreenEl: false,
                captionEl: true,
                barsSize: { top: 50, bottom: "auto" },

                addCaptionHTMLFn: function (item, captionEl, isFake) {
                 if (!item.title) {
                  captionEl.children[0].innerHTML = "";
                  return false;
                 }
                 captionEl.children[0].innerHTML = item.title;
                 return item;
                },
               }}
              >
               {this.state.product.gallery?.map((g, index) => {
                const length = this.state.product.gallery.length;
                const { innerHeight } = window;
                return (
                 <AntCol
                  className="gallery-cover mb-4"
                  span={6}
                  style={{
                   display: "grid",
                   alignItems: "center",
                  }}
                 >
                  <SwipItem
                   original={g.desc_gallery_files}
                   thumbnail={g.desc_gallery_files}
                   title={`${index + 1} Of ${length}`}
                   height={innerHeight}
                  >
                   {({ ref, open }) => (
                    <div
                     onClick={open}
                     ref={ref}
                     className="product-gallery"
                     style={{
                      backgroundImage: `url(${g.desc_gallery_files})`,
                     }}
                    ></div>
                   )}
                  </SwipItem>
                 </AntCol>
                );
               })}
              </Gallery>
             </AntRow>
            </Panel>
           </>
          )}
          <Panel header="Product Tags" key="tags">
           <div className="product-tags-boxs">
            {this.state.product.identity[0].places_tags?.map((tag, index) => {
             return <div key={index}>{tag}</div>;
            })}
           </div>
          </Panel>
          {Object.values(this.state.product?.similar).length > 0 && (
           <>
            <Panel
             header={`Similar Prodycts by ${this.state?.product?.stores?.name}`}
             key="similars"
             forceRender
            >
             <div className="similar-products">
              {/* <div className="inner-body"> */}
              <AntRow gutter={24} className="my-3">
               {Object.values(this.state.product?.similar)?.map(
                (product, index) => {
                 if (product.preview_cover && index < 3) {
                  return (
                   <>
                    <AntCol
                     className="gutter-row mb-4"
                     lg={8}
                     md={8}
                     sm={12}
                     xs={24}
                    >
                     <a href={`/product/${product.id}`}>
                      <div className="product">
                       <div
                        className="p-img"
                        style={{
                         background: `url(${product.preview_cover})`,
                        }}
                       >
                        <div className="prlayer"></div>

                        <button
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
                         Save
                        </button>
                        {product.file.length > 0 ? (
                         <>
                          <div className="actns-btn file-btn cad">CAD</div>
                          <div className="actns-btn file-btn threeD">3D</div>
                         </>
                        ) : (
                         ""
                        )}
                       </div>
                       <a href={`/brand/${product.store_name.store_id}`}>
                        <h5 className="product-store">
                         {product.store_name.store_name}
                        </h5>
                       </a>
                       <p className="product-name">{product.name}</p>
                       <div className="product-price">
                        {product.preview_price && product.preview_price > 0 ? (
                         <>
                          <span>¥ {product.preview_price}</span>
                         </>
                        ) : (
                         ""
                        )}
                       </div>
                      </div>
                     </a>
                    </AntCol>
                   </>
                  );
                 }
                }
               )}
               <AntCol md={24}>
                {Object.values(this.state.product?.similar).length > 3 && (
                 <>
                  <a
                   className="underline"
                   href={`/types/${
                    Object.values(this.state.product?.similar)[0].store_id
                   }/${Object.values(this.state.product?.similar)[0].kind}`}
                   style={{
                    maxWidth: "350px",
                    padding: "15px 5px",
                    fontSize: ".85rem",
                    display: "block",
                    margin: "auto",
                    textAlign: "center",
                    minWidth: "auto",
                    width: "auto",
                   }}
                  >
                   {`
                  SEE ${
                   Object.values(this.state.product?.similar)[0].kind
                  } MORE 
                  ${
                   Object.values(this.state.product?.similar)[0].store_name
                    .store_name
                  }
                `}
                  </a>
                 </>
                )}
               </AntCol>
              </AntRow>
             </div>
            </Panel>
           </>
          )}
          {this.state.collections.length > 0 && (
           <>
            <Panel key="collections" header="Collections" forceRender>
             <div className="store-collection product-tabs">
              <Container fluid>
               <Row md={{ span: 12 }}>
                {this.state.collections.map((collection, index) => {
                 return (
                  <>
                   <Col lg={4} sm={6} xs={12} className="collection-col">
                    <div className="collection-box">
                     <div
                      className="rect rect-0"
                      style={{
                       backgroundImage: `url(${collection.products.products_info.pics[0]})`,
                      }}
                     ></div>
                     <div
                      className="rect rect-1"
                      style={{
                       backgroundImage: `url(${collection.products.products_info.pics[1]})`,
                      }}
                     ></div>
                     <div
                      className="rect rect-2"
                      style={{
                       backgroundImage: `url(${collection.products.products_info.pics[2]})`,
                      }}
                     ></div>
                    </div>
                    <div className="collection-text">
                     <h5>{collection.collection_name}</h5>
                     <p>{collection.products.count} Products</p>
                    </div>
                   </Col>
                  </>
                 );
                })}
               </Row>
              </Container>
             </div>
            </Panel>
           </>
          )}
         </Collapse>
        </Col>
        <Col md={{ span: 4 }} className="p-3">
         <div className="right-side p-3">
          {this.props.isLoggedIn &&
           this.state.product?.stores?.user_id === this.props?.uid && (
            <>
             <a
              href={`/edit-product/${this.state.product_id}`}
              className="cs-link"
             >
              <p>Edit</p>
             </a>
            </>
           )}

          <div className="right-row get-icons">
           <BsPlus onClick={() => this.saveToCollection()} />
           <Dropdown overlay={this.downloadMenu} placement="topLeft">
            <AntButton
             style={{
              border: "none",
              background: "transparent",
              verticalAlign: "middle",
              padding: "4px 5px",
             }}
            >
             <BsDownload
              className="cs-link"
              style={{ fontSize: "1.1rem", fontWeight: "700" }}
             />
            </AntButton>
           </Dropdown>

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
             {/* 100,000 */}
             <BiShareAlt className="cs-link" />
            </AntButton>
           </Dropdown>
          </div>
          <div className="right-row product-info ">
           <div className="store-name">
            <a
             href={`/brand/${this.state.product.stores.id}`}
             className="cs-link"
            >
             {this.state?.product?.stores?.name}
            </a>
           </div>
           <div className="product-name">
            {this.state.product.identity[0].name}
           </div>

           <div className="design-by">
            Design By. <span style={{ fontWeight: "600" }}>Muhamed Mahdy</span>
           </div>
           <div
            className="product-country"
            onClick={() => {
             console.log(this.state);
             console.log(
              convertFromRaw(
               JSON.parse(this.state.product.description[0].overview_content)
              )
             );
            }}
           >
            Made in
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
          {this.state.activeOption.code &&
          this.state.activeOption.code !== "null" &&
          this.state.activeOption.code.length > 0 ? (
           <>
            <div className="right-row">
             <span>Code</span>
             <div className="options" id="codes">
              {this.state.options?.map((option, index) => {
               if (option.code && option.code !== "null") {
                return (
                 <button
                  onClick={() => this.updateOption(index)}
                  className={
                   this.state.acive_index === index ? "active-option-btn" : ""
                  }
                 >
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
          {this.state.activeOption.size.l > 0 &&
          this.state.activeOption.size.h > 0 &&
          this.state.activeOption.size.w > 0 ? (
           <>
            <div className="right-row ">
             <span>Size</span>

             <div id="sizes" className="options">
              {this.state.options?.map((option, index) => {
               if (option.size?.l + option.size?.w + option.size.h > 0) {
                return (
                 <button
                  onClick={() => this.updateOption(index)}
                  className={
                   this.state.acive_index === index ? "active-option-btn" : ""
                  }
                 >
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
          {this.state.activeOption.quantity.length > 0 ? (
           <>
            <div className="right-row ">
             <span>CBM</span>

             <div id="sizes" className="options">
              {this.state.options?.map((option, index) => {
               if (option.quantity.length > 0) {
                return (
                 <button
                  onClick={() => this.updateOption(index)}
                  className={
                   this.state.acive_index === index
                    ? "active-option-btn cpm"
                    : "cpm"
                  }
                 >
                  {`${option.quantity}`}
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
          {this.state.activeOption.material.name &&
           this.state.activeOption.material.image &&
           this.state.activeOption.material.name !== "null" && (
            <>
             <div className="right-row ">
              <span>Material</span>
              <div id="materials" className="options">
               {this.state.options?.map((option, index) => {
                if (option.material.name && option.material.name !== "null") {
                 return (
                  <>
                   <button>
                    <button
                     onClick={() => this.updateOption(index)}
                     className={
                      this.state.acive_index === index
                       ? "active-option-btn"
                       : ""
                     }
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
               })}
              </div>
             </div>
            </>
           )}
          <div className="right-row ">
           <button
            id="shop-now"
            className="action-btn"
            onClick={() => this.request_open("Purchase")}
           >
            <span className="btn-icons">
             <AiOutlineShoppingCart />
            </span>
            Shop Now / Request Price Info
           </button>
          </div>
          <div className="right-row ">
           <ul id="shop-upps">
            <li>
             - <span>Customizable / Made-to-order</span>
            </li>
            <li>
             - <span>Estimated delivery in 4 to 8 weeks</span>
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
           <button
            className="save-btn action-btn bg-white"
            onClick={() => this.saveToCollection()}
           >
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
           <button className="bg-white action-btn">
            <span className="btn-icons">
             <FiPhoneCall />
            </span>
            {/* Message us Via Phone */}
            <span style={{ color: "#000", fontSize: ".9rem" }}>
             +86 185 7599 9560
            </span>
           </button>
           {/* <div className="reach-us">
            <span>Reach Us by phone, Phone Number</span> +86 185 7599 9560
           </div> */}
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
        type={this.state.request_modal_type}
       />
      </AntModal>

      <AntModal
       title={this.state.save_to_collection_modal}
       width={700}
       className="request-modal"
       visible={this.state.save_to_collection_modal}
       //  destroyOnClose
       footer={false}
       closeIcon={
        <>
         <div
          onClick={() => this.setState({ save_to_collection_modal: false })}
         >
          X
         </div>
        </>
       }
       okButtonProps={{ hidden: true }}
       cancelButtonProps={{ hidden: true }}
       requestType={this.state.request_modal_type}
      >
       <SaveToCollection
        product={this.state.product}
        cover={this.state.sliderImgs[0].original}
        name={this.state.product.identity[0].name}
        store={this.state.product.stores.name}
        type={this.state.request_modal_type}
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
  uid: state.regularUser?.info?.uid,
  requesting: state.addProduct.requesting,
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
