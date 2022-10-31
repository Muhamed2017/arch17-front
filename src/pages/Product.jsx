import React, { Component, createRef } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { HiFolderDownload } from "react-icons/hi";
import "./product.css";
import ReactPlayer from "react-player";
import { Helmet } from "react-helmet";
import ClipLoader from "react-spinners/ClipLoader";
import { IoWarning } from "react-icons/io5";

import { regionNames } from "./../redux/constants";
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
 Tabs,
 Select,
} from "antd";
import pptxgen from "pptxgenjs";
import { FaFilePdf } from "react-icons/fa";
import { RiFilePpt2Fill } from "react-icons/ri";
import { GrOnedrive } from "react-icons/gr";

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

import { SiGoogledrive, SiBaidu } from "react-icons/si";
import { AiOutlineDropbox } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { FiPhoneCall } from "react-icons/fi";
import { GoMail } from "react-icons/go";
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
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/dist/styles.css";
import Captions from "yet-another-react-lightbox/dist/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/dist/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/dist/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/dist/plugins/thumbnails";
import Video from "yet-another-react-lightbox/dist/plugins/video";
import Zoom from "yet-another-react-lightbox/dist/plugins/zoom";
import "yet-another-react-lightbox/dist/plugins/captions/captions.css";
import "yet-another-react-lightbox/dist/plugins/thumbnails/thumbnails.css";
import axios from "axios";
import { GiCube } from "react-icons/gi";
import { convertFromRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import Footer from "../components/Footer";
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
import { Redirect } from "react-router-dom";

import {
 closeProductRequestAction,
 openProductRequestAction,
} from "./../redux/actions/addProductActions";

const breakPoints = [{ width: 1200, itemsToShow: 1 }];
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;

class Product extends Component {
 constructor(props) {
  super(props);
  this.sliderRef = createRef();

  this.state = {
   modals: {
    price_request: false,
   },
   delete_product_modal: false,
   deletingProduct: false,
   isDeleted: false,
   active_tab_wide: "overview-wide",
   active_tab_mobile: "overview-mobile",
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
   videos: [],
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
   gallery_index: -1,
   galleryIndex: 0,
   gallery_slides: [],
   advancedExampleOpen: false,
   activeSlide: 0,
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
 // async function getUrFromService(): Promise<string> {
 //   await new Promise((resolve) => setTimeout(resolve, 1000));
 //   return "https://via.placeholder.com/150";
 // }

 //  getUrlForShare = async () => {
 //   await Promise.resolve("https://via.placeholder.com/150");
 //  };

 //  myPromise = new Promise((resolve, reject) => {
 //   return setTimeout(() => {
 //    resolve("https://via.placeholder.com/150");
 //   }, 300);
 //  });

 getUrFromService = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "https://via.placeholder.com/150";
 };

 loadImage = (imageUrl) => {
  const img = document.createElement("img");
  img.src = imageUrl;
  img.onload = () => {
   this.setState({ mainWidth: img.width, mainHeight: img.height });
   console.log(`${img.width} ${img.height}`);
  };
 };
 shareUrl = `https://www.arch17.com/product/${this.props.match.params.id}`;
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
     url={this.shareUrl}
     quote={"SEMATRIC"}
     hashtag="#Furniture"
     description={"aiueo"}
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
    <TwitterShareButton
     hashtags={["Arch17", "Furnitre"]}
     url={this.shareUrl}
     title="Share"
    >
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
  // this.props.dispatchRegularSignup(fname, lname, email, password, "regular");
  this.props.dispatchRegularSignup(fname, lname, email, password, "firebase");
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
    this.setState({
     loading: false,
     product: products.data.product,
     galleries: products.data.product.gallery?.filter((g) => {
      return g.desc_gallery_files !== null;
     }),
     gallery_slides: products.data.product.gallery?.map((g) => {
      if (
       g?.desc_gallery_files &&
       g?.desc_gallery_files[0] &&
       g.desc_gallery_files[0] !== "null"
      ) {
       return { src: g?.desc_gallery_files[0], alt: "" };
      }
     }),
     srcsss: products.data.product.gallery?.map((g) => {
      if (g.desc_gallery_files) {
       return g?.desc_gallery_files[0];
      }
     }),
    });
    this.setState({ options: products.data.product.options });
    this.setState({
     files: products.data.product.files.filter((f) => {
      return f.file_type !== "PDF";
     }),
     pdf_files: products.data.product.files.filter((f) => {
      return f.file_type === "PDF";
     }),
     //  videos: products.data.product?.gallery[0]?.desc_gallery_files?.filter(
     //   (g) => {
     //    return !g.includes("cloudinary");
     //   }
     //  ),
     videos: products.data.product?.vidoes,
    });
    this.setState({ collections: products.data.collections });
    // this.setState({ galleries: products.data.product.gallery });
    this.setState({ activeOption: products.data.product?.options[0] });
    console.log(products.data.product.options[0]?.covers);

    products.data.product.options[0]?.covers?.map((cover, index) => {
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
    this.loadImage(products.data.product.options[0]?.covers[0]?.src);

    if (products.data.product.description[0]) {
     this.setState({
      product_desc_overview:
       products.data.product.description[0].overview_content,
      product_desc_size: products.data.product.description[0].size_content,
      product_desc_mat: products.data.product.description[0].mat_desc_content,
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
   activeSlide: 0,
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
  // console.log(this.state.activeOption.cover);
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

 gotoStep = (index) => {
  this.sliderRef.current.slideToIndex(index);
  this.setState({
   activeSlide: index,
  });
 };

 updateOptionOnSelect = (value) => {
  const index = this.state.options?.findIndex((e) => {
   return e.id === value;
  });
  console.log(index);
  const covers = this.state.options[index]?.covers?.filter((cover) => {
   return cover.src && cover.src !== "null";
  });
  this.setState({
   activeSlide: 0,
   activeOption: this.state.options[index],
   sliderImgs: covers?.map((cover) => {
    return {
     original: cover.src,
     thumbnail: cover.src,
     thumbnailClass: "custom-thumb",
     thumbnailWidth: "50",
     thumbnailHeight: "50",
    };
   }),
  });
 };
 openDeleteModal = () => {
  this.setState({
   delete_product_modal: true,
  });
 };
 handleDeleteSubmit = () => {
  this.setState({
   deletingProduct: true,
  });
  axios
   .post(`${API}product/delete/${this.state.product?.id}`)
   .then((response) => {
    console.log(response);
    this.setState({
     deletingProduct: false,
     isDeleted: true,
    });
   })
   .catch((err) => {
    console.log(err);
    this.setState({
     deletingProduct: false,
     isDeleted: false,
    });
   });
 };

 render() {
  const loading = this.state.loading;
  if (!loading) {
   return (
    <React.Fragment>
     <div id="product-page" className="bg-white py-2">
      <Helmet>
       <meta charSet="utf-8" />
       <meta
        property="og:url"
        content={`https://www.arch17.com/product/${this.state.product?.id}}`}
       />
       <link
        rel="canonical"
        href={`https://www.arch17.com/product/${this.state.product?.id}`}
       />
       <title>
        {`${this.state.product?.identity[0]?.name} | ${this.state.product?.identity[0]?.kind}`}
       </title>
      </Helmet>
      <Container fluid className="sized-container">
       <div className="only-wide">
        <Row className="justify-content-md-center">
         <Col
          md={{ span: 8 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
          className="p-0"
         >
          <div id="swiper" style={{ position: "relative" }}>
           {!this.state.slider && (
            <>
             <ImageGallery
              showBullets={true}
              full
              ref={this.sliderRef}
              thumbnailPosition="bottom"
              showThumbnails={false}
              items={this.state.sliderImgs}
             />
            </>
           )}
           <div className="custom-slide-thumbs">
            {this.state.sliderImgs?.map((slide, index) => {
             return (
              <div
               className={
                this.state.activeSlide === index ? "active-slide" : ""
               }
               onClick={() => this.gotoStep(index)}
               style={{
                backgroundImage: `url("${slide.original}")`,
               }}
              ></div>
             );
            })}
           </div>
          </div>
          <Tabs
           onTabClick={(key) => this.setState({ active_tab_wide: key })}
           // activeKey="overview-wide"
           activeKey={this.state.active_tab_wide}
           className="mb-5"
          >
           {this.state.product_desc_overview?.length > 5 ? (
            <TabPane tab="Overview" key="overview-wide" forceRender>
             <div className="overview-text">
              {this.state.product_desc_overview && (
               <CKEditor
                disabled={true}
                config={{
                 isReadOnly: true,
                 toolbar: [],
                }}
                editor={ClassicEditor}
                data={this.state.product_desc_overview}
               />
              )}
             </div>
            </TabPane>
           ) : (
            <></>
           )}

           {this.state.product_desc_mat?.length > 5 ? (
            <>
             <TabPane tab="Materials" key="material" forceRender>
              {this.state.product_desc_mat && (
               <CKEditor
                disabled={true}
                config={{
                 isReadOnly: true,
                 toolbar: [],
                }}
                editor={ClassicEditor}
                data={this.state.product_desc_mat}
               />
              )}
             </TabPane>
            </>
           ) : (
            <></>
           )}
           {this.state.product_desc_size?.length > 5 ? (
            <>
             <TabPane key="dimensions" tab="Dimensions" forceRender>
              {this.state.product_desc_size && (
               <CKEditor
                disabled={true}
                config={{
                 isReadOnly: true,
                 toolbar: [],
                }}
                editor={ClassicEditor}
                data={this.state.product_desc_size}
               />
              )}
             </TabPane>
            </>
           ) : (
            <></>
           )}
           {this.state.galleries?.length > 0 && (
            <>
             <TabPane tab="Gallery" key="gallery">
              <AntRow gutter={10} span={24} className="px-2">
               {this.state.gallery_slides?.map((g, index) => {
                return (
                 <AntCol
                  onClick={() => {
                   this.setState({
                    advancedExampleOpen: true,
                    galleryIndex: index,
                   });
                  }}
                  className="gallery-cover mb-4"
                  md={6}
                  sm={8}
                  xs={8}
                  style={{
                   display: "grid",
                   alignItems: "center",
                  }}
                 >
                  <div
                   className="product-gallery"
                   style={{
                    backgroundImage: `url("${g?.src}")`,
                   }}
                  ></div>
                 </AntCol>
                );
               })}
              </AntRow>
             </TabPane>
             {this.state.videos?.length > 0 && (
              <>
               <TabPane key="videos" tab="Videos">
                <AntRow span={24} gutter={16}>
                 {this.state.videos.map((g, index) => {
                  return (
                   <AntCol
                    md={6}
                    sm={12}
                    xs={24}
                    className="gallery-cover mb-3"
                   >
                    <ReactPlayer url={g?.src} width={"100%"} height={"100%"} />
                   </AntCol>
                  );
                 })}
                </AntRow>
               </TabPane>
              </>
             )}
            </>
           )}
           {this.state.files?.length > 0 && (
            <>
             <TabPane tab="Cad & 3D Files" key="files">
              {this.props.isLoggedIn && (
               <>
                {this.state.files.map((file, index) => {
                 return (
                  <>
                   <button
                    className="product-boxs"
                    onClick={() => this.openFileModal(file)}
                   >
                    <div className="file-box">
                     <HiFolderDownload />
                    </div>
                    <p className="mb-0">{file.file_name}</p>
                    <p className="mb-0"> {file.file_type}</p>
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
                    <div className="file-box">
                     <HiFolderDownload />
                    </div>
                    <p className="mb-0">{file.file_name}</p>
                    <p className="mb-0"> {file.file_type}</p>
                   </button>
                  </>
                 );
                })}
               </>
              )}
             </TabPane>
            </>
           )}
           {this.state.pdf_files?.length > 0 && (
            <>
             <TabPane tab="PDF Catalogues" key="pdf">
              {this.props.isLoggedIn && (
               <>
                <AntRow span={24} gutter={36} className="px-3">
                 {this.state.pdf_files.map((file, index) => {
                  return (
                   <>
                    <AntCol md={6} sm={12} xs={12}>
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
                    </AntCol>
                   </>
                  );
                 })}
                </AntRow>
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
                    <div className="pdf-box"></div>
                    <p>{file.file_name}</p>
                   </button>
                  </>
                 );
                })}
               </>
              )}
             </TabPane>
            </>
           )}
           {this.state.collections?.length > 0 && (
            <>
             <TabPane key="collections" tab="Collections" forceRender>
              <div className="store-collection product-tabs">
               <Container fluid>
                <Row md={{ span: 12 }} xs={{ span: 12 }} className="px-3">
                 {this.state.collections.map((collection, index) => {
                  return (
                   <>
                    <Col lg={4} sm={6} xs={12} className="collection-col">
                     <a href={`/collection/${collection?.id}`}>
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
                     </a>
                    </Col>
                   </>
                  );
                 })}
                </Row>
               </Container>
              </div>
             </TabPane>
            </>
           )}
          </Tabs>

          <Collapse
           expandIconPosition="right"
           defaultActiveKey={["tags", "similars"]}
           onChange={this.callback}
           bordered
          >
           <Panel header="Product Tags" key="tags">
            <div className="product-tags-boxs">
             {this.state.product.identity[0].places_tags?.map((tag, index) => {
              return <div key={index}>{tag}</div>;
             })}
            </div>
           </Panel>
           {Object.values(this.state.product?.similar)?.length > 0 && (
            <>
             <Panel
              header={`Similar Prodycts by ${this.state?.product?.stores?.name}`}
              key="similars"
              forceRender
             >
              <div className="similar-products">
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
                         {product.file?.length > 0 ? (
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
                 {Object.values(this.state.product?.similar)?.length > 3 && (
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
          </Collapse>
         </Col>
         <Col
          md={{ span: 4 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
          className="p-3"
         >
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
              <p onClick={this.openDeleteModal}>delete</p>
             </>
            )}

           <div className="right-row get-icons">
            <BsPlus onClick={() => this.saveToCollection()} />
            <Dropdown overlay={this.downloadMenu} placement="topLeft">
             <AntButton
              style={{
               border: "none",
               background: "transparent",
               verticalAlign: "baseline",
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
             {this.state.product.identity[0]?.name}
            </div>

            {this.state.product?.designers?.length +
             this.state.product?.companies?.length >
             0 && (
             <>
              <div className="design-by px-2">
               Design By.
               <>
                {this.state.product.designers?.map((d, index) => {
                 return (
                  <AntRow span={24} gutter={10} className="my-3">
                   <AntCol
                    md={12}
                    className="mb-0"
                    sm={24}
                    xs={24}
                    key={index}
                    style={{ fontWeight: "600" }}
                   >
                    <a href={`/user/${d?.uid}`}>{d?.displayName}</a>
                   </AntCol>
                  </AntRow>
                 );
                })}
                {this.state.product?.companies?.length > 0 && (
                 <>
                  {this.state.product?.companies?.map((company, index) => {
                   return (
                    <AntRow span={24} gutter={10} className="my-3">
                     <AntCol
                      md={24}
                      className="mb-0"
                      sm={24}
                      xs={24}
                      key={index}
                      style={{ fontWeight: "600" }}
                     >
                      <a href={`/company/${company?.id}`}>{company?.name}</a>
                     </AntCol>
                    </AntRow>
                   );
                  })}
                 </>
                )}
               </>
              </div>
             </>
            )}
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
             <span style={{ fontWeight: "600" }} className="px-1">
              {regionNames
               .of(this.state.product?.identity[0]?.country)
               .replace(/mainland/gi, "")}
             </span>
            </div>
           </div>
           {this.state.activeOption.price ? (
            <>
             <div className="right-row product-price">
              <span style={{ fontWeight: "600", fontSize: "13px" }}>Price</span>
              <div className="price-value">
               ¥ {this.state.activeOption?.price}
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
           this.state.activeOption?.code !== "null" &&
           this.state.activeOption?.code.length > 0 ? (
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
           {this.state.activeOption?.size?.l > 0 &&
           this.state.activeOption?.size?.h > 0 &&
           this.state.activeOption?.size?.w > 0 ? (
            <>
             <div className="right-row ">
              <span>Size</span>

              <div id="sizes" className="options">
               {this.state.options?.map((option, index) => {
                if (option.size?.l + option.size?.w + option.size?.h > 0) {
                 return (
                  <button
                   onClick={() => this.updateOption(index)}
                   className={
                    this.state.acive_index === index ? "active-option-btn" : ""
                   }
                  >
                   {`${option.size?.l} X ${option.size?.w} X ${option.size?.h}`}
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
           {this.state.activeOption?.quantity?.length > 0 &&
           this.state.activeOption?.quantity !== "null" ? (
            <>
             <div className="right-row">
              <span>Package Size</span>

              <div id="cpm" className="options">
               {this.state.options?.map((option, index) => {
                if (
                 option?.quantity &&
                 option?.quantity !== "null" &&
                 option?.quantity?.length > 0
                ) {
                 return <button className="cpm">{`${option.quantity}`}</button>;
                }
               })}
              </div>
             </div>
            </>
           ) : (
            ""
           )}
           {this.state.activeOption?.material?.name &&
            this.state.activeOption?.material?.image &&
            this.state.activeOption?.material?.name !== "null" && (
             <>
              <div className="right-row ">
               <span>Material</span>
               <div id="materials" className="options">
                {this.state.options?.map((option, index) => {
                 if (
                  option.material?.name &&
                  option.material?.name !== "null"
                 ) {
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
            <button
             //  onClick={}
             className="bg-white action-btn"
            >
             <span className="btn-icons">
              <FiPhoneCall />
             </span>
             {/* Message us Via Phone */}
             <span style={{ color: "#000", fontSize: ".9rem" }}>
              +86 185 7599 9560
             </span>
            </button>
           </div>
          </div>
         </Col>
        </Row>
       </div>

       <div className="only-mobile">
        <Row className="justify-content-md-center p-0">
         <Col
          md={{ span: 8 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
          className="p-0"
         >
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
              showBullets={true}
              full
              thumbnailPosition="bottom"
              showThumbnails={false}
              items={this.state.sliderImgs}
             />
            </>
           )}
           <div className="custom-slide-thumbs">
            {this.state.sliderImgs?.map((slide, index) => {
             return (
              <div
               // className={this.state.step===index? "active-slide"}
               onClick={() => this.gotoStep(index)}
               style={{
                backgroundImage: `url("${slide.original}")`,
               }}
              ></div>
             );
            })}
           </div>
          </div>
         </Col>
         <Col
          md={{ span: 4 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
          className="p-0"
         >
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

           {this.state.product?.designers?.length > 0 && (
            <>
             Design By.
             <div className="design-by ml-2">
              <>
               {this.state.product.designers?.map((d, index) => {
                return (
                 <AntRow span={24} gutter={10} className="my-3">
                  <AntCol
                   md={24}
                   className="mb-0"
                   sm={24}
                   xs={24}
                   key={index}
                   style={{ fontWeight: "600" }}
                  >
                   <a href={`/user/${d?.uid}`}>{d?.displayName}</a>
                  </AntCol>
                 </AntRow>
                );
               })}
              </>
             </div>
            </>
           )}
           <button
            onClick={() => this.saveToCollection()}
            className="sv-mobile"
           >
            +
           </button>
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
            <span style={{ fontWeight: "600" }} className="px-1">
             {regionNames
              .of(this.state.product?.identity[0]?.country)
              .replace(/mainland/gi, "")}
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
          <div className="right-side">
           {this.state.activeOption?.code &&
            this.state.activeOption?.code !== "null" && (
             <div className="codes-options">
              <p className="label-select mb-1">CODES</p>
              <Select
               style={{ width: "100%" }}
               size="large"
               className="select-codes"
               optionLabelProp="label"
               value={this.state.activeOption?.id}
               onChange={(e) => {
                console.log(e);
                this.updateOptionOnSelect(e);
               }}
              >
               {this.state.options?.map((option, index) => {
                return (
                 <>
                  {option?.code && option?.code !== "null" && (
                   <Option value={option?.id} label={option?.code}>
                    <p>{option?.code}</p>
                   </Option>
                  )}
                 </>
                );
               })}
              </Select>
             </div>
            )}

           {this.state.activeOption.size?.l > 0 &&
           this.state.activeOption.size?.h > 0 &&
           this.state.activeOption.size?.w > 0 ? (
            <>
             <div className="right-row ">
              <div>
               <p className="label-select mb-1">Size</p>
               <Select
                style={{ width: "100%" }}
                showArrow={true}
                placeholder=""
                size="large"
                value={this.state.activeOption?.id}
                onChange={(e) => {
                 console.log(e);
                 this.updateOptionOnSelect(e);
                }}
                onSelect={(e) => console.log(e)}
                optionLabelProp="label"
               >
                {this.state.options?.map((option, index) => {
                 if (option.size?.l + option.size?.w + option.size?.h > 0) {
                  return (
                   <Option
                    value={option?.id}
                    label={`${option.size?.l} L  ${option.size?.w} W  ${option.size?.h} H`}
                   >
                    <div className="demo-option-label-item">
                     {`${option.size?.l} L  ${option.size?.w} W  ${option.size?.h} H`}
                    </div>
                   </Option>
                  );
                 }
                })}
               </Select>
              </div>
             </div>
            </>
           ) : (
            ""
           )}
           {this.state.activeOption?.material?.name &&
            this.state.activeOption?.material?.name !== "null" &&
            this.state.activeOption?.material?.image !== "null" &&
            this.state.activeOption?.material?.image && (
             <div className="materials-options mt-3">
              <p className="label-select mb-1">MATERIALS</p>
              <Select
               style={{ width: "100%" }}
               size="large"
               value={this.state.activeOption?.id}
               onChange={(e) => {
                console.log(e);
                this.updateOptionOnSelect(e);
               }}
               className="select-material"
               optionLabelProp="label"
              >
               {this.state.options?.map((option, index) => {
                return (
                 <>
                  {option.material?.name && option.material?.name !== "null" && (
                   <Option value={option?.id} label={option.material?.name}>
                    <div
                     className="material-option"
                     style={{
                      backgroundImage: `url(${option.material?.image})`,
                     }}
                    ></div>
                    <p>{option?.material?.name}</p>
                   </Option>
                  )}
                 </>
                );
               })}
              </Select>
             </div>
            )}
           {this.state.activeOption?.quantity &&
            this.state.activeOption?.quantity !== "null" && (
             <div className="materials-options mt-3">
              <p className="label-select mb-1">Package Size</p>
              <Select
               style={{ width: "100%" }}
               size="large"
               className="select-material"
               optionLabelProp="label"
               value={this.state.activeOption?.id}
               onChange={(e) => {
                console.log(e);
                this.updateOptionOnSelect(e);
               }}
              >
               {this.state.options?.map((option, index) => {
                return (
                 <>
                  {option?.quantity && option?.quantity !== "null" && (
                   <Option value={option?.id} label={option?.quantity}>
                    <p>{option?.quantity}</p>
                   </Option>
                  )}
                 </>
                );
               })}
              </Select>
             </div>
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
            <button
             className="save-btn action-btn bg-white"
             onClick={() => this.saveToCollection()}
            >
             <span className="btn-icons">
              <BsPlus />
             </span>
             Save To Collection
            </button>
           </div>

           <div className="right-row">
            <p className="bold mb-1">Need to Order / More Information</p>
            <p className="">Please Contact us</p>
            <div className="chats">
             <div className="socialbtn mail">
              <button>
               <GoMail />
              </button>
              <p>Email</p>
             </div>
             <div className="socialbtn phone">
              <button>
               <FiPhoneCall />
               <p>Phone</p>
              </button>
             </div>
             <div className="socialbtn whattsapp">
              {/* <button> */}
              <a href="https://wa.link/1hqgdx" target="_blank" rel="noreferrer">
               <AiOutlineWhatsApp />
              </a>
              {/* </button> */}
              <p>WhatsApp</p>
             </div>
             <div className="socialbtn wechat">
              <button
               onClick={() => {
                this.setState({ wechatqr_modal: true });
               }}
              >
               <RiWechat2Line />
              </button>
              <p>WeChat</p>
             </div>
            </div>
           </div>
          </div>
          <Tabs
           onTabClick={(key) => this.setState({ active_tab_mobile: key })}
           // activeKey="overview-wide"
           activeKey={this.state.active_tab_mobile}
           // activeKey="overview"

           className="mb-5"
          >
           {this.state.product_desc_overview?.length > 5 ? (
            <TabPane tab="Overview" key="overview-mobile">
             <div className="overview-text">
              {this.state.product_desc_overview && (
               <CKEditor
                disabled={true}
                config={{
                 isReadOnly: true,
                 toolbar: [],
                }}
                editor={ClassicEditor}
                data={this.state.product_desc_overview}
               />
              )}
             </div>
            </TabPane>
           ) : (
            <></>
           )}

           {this.state.product_desc_mat?.length > 5 ? (
            <TabPane tab="Materials" key="material">
             {this.state.product_desc_mat && (
              <CKEditor
               disabled={true}
               config={{
                isReadOnly: true,
                toolbar: [],
               }}
               editor={ClassicEditor}
               data={this.state.product_desc_mat}
              />
             )}
            </TabPane>
           ) : (
            <></>
           )}
           {this.state.product_desc_size?.length > 5 ? (
            <TabPane key="dimensions" tab="Dimensions">
             {this.state.product_desc_size && (
              <CKEditor
               disabled={true}
               config={{
                isReadOnly: true,
                toolbar: [],
               }}
               editor={ClassicEditor}
               data={this.state.product_desc_size}
              />
             )}
            </TabPane>
           ) : (
            <></>
           )}
           {this.state.gallery_slides?.length > 0 && (
            <>
             <TabPane tab="Gallery" key="gallery" forceRender>
              <AntRow gutter={10} span={24} className="px-2">
               {this.state.gallery_slides?.map((g, index) => {
                return (
                 <AntCol
                  onClick={() => {
                   this.setState({
                    advancedExampleOpen: true,
                    galleryIndex: index,
                   });
                  }}
                  className="gallery-cover mb-4"
                  md={6}
                  sm={8}
                  xs={8}
                  style={{
                   display: "grid",
                   alignItems: "center",
                  }}
                 >
                  <div
                   className="product-gallery"
                   style={{
                    backgroundImage: `url("${g?.src}")`,
                   }}
                  ></div>
                 </AntCol>
                );
               })}
              </AntRow>
             </TabPane>
             {this.state.videos?.length > 0 && (
              <>
               <TabPane key="videos" tab="Videos">
                <AntRow>
                 {this.state.videos.map((g, index) => {
                  return (
                   <AntCol span={6} className="gallery-cover">
                    <div className="product-gallery">
                     <ReactPlayer url={g} width={"100%"} height={"100%"} />
                    </div>
                   </AntCol>
                  );
                 })}
                </AntRow>
               </TabPane>
              </>
             )}
            </>
           )}

           {this.state.collections?.length > 0 && (
            <>
             <TabPane key="collections" tab="Collections" forceRender>
              <div className="store-collection product-tabs">
               <Container fluid>
                <Row md={{ span: 12 }} xs={{ span: 12 }} className="px-3">
                 {this.state.collections.map((collection, index) => {
                  return (
                   <>
                    <Col lg={4} sm={6} xs={6} className="collection-col">
                     <a href={`/collection/${collection?.id}`}>
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
                     </a>
                    </Col>
                   </>
                  );
                 })}
                </Row>
               </Container>
              </div>
             </TabPane>
            </>
           )}
          </Tabs>

          <Collapse
           expandIconPosition="right"
           defaultActiveKey={["tags", "similars"]}
           onChange={this.callback}
           bordered
          >
           {Object.values(this.state.product?.similar)?.length > 0 && (
            <>
             <Panel
              header={`Similar Prodycts by ${this.state?.product?.stores?.name}`}
              key="similars"
              forceRender
             >
              <div className="similar-products">
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
                      xs={12}
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
                         {product.file?.length > 0 ? (
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
                 {Object.values(this.state.product?.similar)?.length > 3 && (
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
                  }`}
                   </a>
                  </>
                 )}
                </AntCol>
               </AntRow>
              </div>
             </Panel>
            </>
           )}
          </Collapse>
         </Col>
        </Row>
       </div>
      </Container>

      <FacebookShareButton
       url={`https://www.arch17.com/product/${571}`}
       quote={"SEMATRIC"}
       hashtag="#Furniture"
       description={"aiueo"}
      >
       <FacebookIcon size={25} />
      </FacebookShareButton>
     </div>
     <Lightbox
      animation={{
       fade: "fade-in 700",
       swipe: false,
      }}
      open={this.state.advancedExampleOpen}
      index={this.state.galleryIndex}
      close={() => this.setState({ advancedExampleOpen: false })}
      slides={this.state.gallery_slides}
      plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
     />

     <Footer />

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

     {/* delete product modal */}
     <Modal
      show={this.state.delete_product_modal}
      onHide={() => {
       this.setState({
        delete_product_modal: false,
       });
      }}
      closeButton
      keyboard={false}
      size="md"
     >
      <Modal.Body>
       <div className="modal-wrapper" style={{ padding: "15px", margin: "" }}>
        <Row as={Row} style={{ margin: "0px 0" }}>
         <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>Delete Product</p>
         <Col md={8}></Col>
        </Row>
        <Row as={Row} style={{ margin: "30px 0" }}>
         <Col md={12}>
          <div
           className="warning-danger"
           style={{
            background: "#fbe9e7",
            padding: "15px",
            color: "#E41E15",
           }}
          >
           <span
            style={{
             display: "inline-block",
             fontSize: "2.5rem",
             verticalAlign: "center",
             padding: "0 10px",
            }}
           >
            <IoWarning />
           </span>
           <p
            style={{
             color: "#c62828",
             fontWeight: "600",
             width: "80%",
             fontSize: ".9rem",
             display: "inline-block",
            }}
           >
            Are your sure that you want delete the{" "}
            <span style={{ textDecoration: "underline" }}>
             {this.state.product?.identity[0]?.name}
            </span>
           </p>
          </div>
         </Col>
        </Row>

        <Button
         variant="danger"
         onClick={this.handleDeleteSubmit}
         type="submit"
         style={{
          textAlign: "right",
          background: "#E41E15",
          display: "block",
          float: "right",
          marginRight: "12px",
         }}
        >
         {this.state.deletingProduct && !this.state.isDeleted ? (
          <>
           <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
          </>
         ) : (
          <>Delete</>
         )}
        </Button>
       </div>
      </Modal.Body>
     </Modal>

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
        cover={this.state.sliderImgs[0]?.original}
        name={this.state.product.identity[0]?.name}
        store={this.state.product?.stores?.name}
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
        cover={this.state.sliderImgs[0]?.original}
        name={this.state.product?.identity[0]?.name}
        store={this.state.product?.stores?.name}
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
            {this.state.activeFile?.onedrive &&
             this.state.activeFile?.onedrive?.length > 7 && (
              <AntCol className="gutter-row mb-3" span={12}>
               <a
                href={this.state.activeFile?.onedrive}
                target="_blank"
                rel="noreferrer"
                className="drivebtn"
               >
                <AntButton
                 type="primary"
                 className="drivebtn"
                 icon={<GrOnedrive />}
                 style={{ width: "100%" }}
                 size="large"
                >
                 OneDrive
                </AntButton>
               </a>
              </AntCol>
             )}

            {this.state.activeFile?.ggldrive &&
             this.state.activeFile?.ggldrive?.length > 7 && (
              <AntCol className="gutter-row mb-3" span={12}>
               <a
                href={this.state.activeFile?.ggldrive}
                target="_blank"
                rel="noreferrer"
                className="drivebtn"
               >
                <AntButton
                 type="primary"
                 className="drivebtn"
                 icon={<SiGoogledrive />}
                 style={{ width: "100%" }}
                 size="large"
                >
                 Google Drive
                </AntButton>
               </a>
              </AntCol>
             )}

            {this.state.activeFile?.dropbox &&
             this.state.activeFile?.dropbox?.length > 7 && (
              <AntCol className="gutter-row mb-3" span={12}>
               <a
                href={this.state.activeFile?.dropbox}
                target="_blank"
                rel="noreferrer"
                className="drivebtn"
               >
                <AntButton
                 type="primary"
                 className="drivebtn"
                 icon={<AiOutlineDropbox />}
                 style={{ width: "100%" }}
                 size="large"
                >
                 Dropbox
                </AntButton>
               </a>
              </AntCol>
             )}

            {this.state.activeFile?.baidu &&
             this.state.activeFile?.baidu?.length > 7 && (
              <AntCol className="gutter-row mb-3" span={12}>
               <a
                href={this.state.activeFile?.baidu}
                target="_blank"
                rel="noreferrer"
                className="drivebtn"
               >
                <AntButton
                 type="primary"
                 className="drivebtn"
                 icon={<SiBaidu />}
                 style={{ width: "100%" }}
                 size="large"
                >
                 Baidu
                </AntButton>
               </a>
              </AntCol>
             )}
           </AntRow>
          </>
         )}

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

     {this.state.isDeleted && (
      <Redirect to={`/brand/${this.state.product.stores.id}`} />
     )}
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
