import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Modal } from "react-bootstrap";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdTitle } from "react-icons/md";
import { RiCodeSSlashFill } from "react-icons/ri";
import ProgressBar from "react-bootstrap/ProgressBar";
import { PulseLoader } from "react-spinners/PulseLoader";
import { ADD_PRODUCT_NEXT_TAB } from "../../redux/constants";
import { connect } from "react-redux";
import axios from "axios";

class ProductFiles extends Component {
 galleryObj = [];
 galleryArray = [];
 constructor(props) {
  super(props);

  this.state = {
   modals: {
    overview_ex_modal: false,
    dimension_ex_modal: false,
    material_ex_modal: false,
   },
   index: 0,
   over_view_image: null,
   description_mat_image: null,
   size_imgae: null,
   gallery_video: null,

   overView_url: "",
   description_url: "",
   size_image_url: "",
   gallery_url: "",
   loaded: 0,
   gallery: null,
  };
 }
 uplpoadGalleryFiles = (e) => {
  this.galleryObj.push(e.target.files);
  for (let i = 0; i < this.galleryObj[0].length; i++) {
   this.galleryArray.push(URL.createObjectURL(this.gall[0][i]));
  }
 };
 overviewExample_open = () => {
  this.setState({ overview_ex_modal: true });
 };

 overviewExample_close = () => {
  this.setState({ overview_ex_modal: false });
 };
 componentDidMount() {
  Tabs.defaultProps = {
   selectedIndex: this.state.index,
  };
  console.log(this.state.index);
 }
 onChangeOverview = (e) => {
  if (e.target.files && e.target.files.length > 0) {
   const reader = new FileReader();
   reader.addEventListener(
    "load",
    () => this.setState({ overView_url: reader.result })
    //    console.log(reader.result)
   );
   reader.readAsDataURL(e.target.files[0]);
   this.setState({ over_view_image: e.target.files[0] });
  }
 };

 onChangeGallery = ({ target: { files } }) => {
  console.log(files[0]);
  if (files && files.length > 0) {
   const src = URL.createObjectURL(files[0]);
   this.setState({ gallery_url: src });

   const reader = new FileReader();
   reader.addEventListener("load", () => {
    this.setState({ gallery_video: files[0] });
   });
   reader.readAsDataURL(files[0]);
   this.setState({ gallery_video: files[0] });
  }
  let formData = new FormData();
  formData.append("img[]", files[0]);

  const options = {
   onUploadProgress: (progressEvent) => {
    this.setState({ loaded: 0 });
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    this.setState({ loaded: percent });
    console.log(`${loaded} kb of ${total} | ${percent}%`);

    if (percent < 100) {
     this.setState({ loading_gallery_pecent: percent });
    }
   },
  };
  axios
   .post("http://127.0.0.1:8000/api/upload", formData, options)
   .then((response) => console.log(response))
   .catch((err) => console.log(err));
 };

 onChangeMatDescr = (e) => {
  if (e.target.files && e.target.files.length > 0) {
   const reader = new FileReader();
   reader.addEventListener("load", () =>
    this.setState({ description_url: reader.result })
   );
   reader.readAsDataURL(e.target.files[0]);
   this.setState({ description_mat_image: e.target.files[0] });
  }
 };

 onChangeSizeImg = (e) => {
  if (e.target.files && e.target.files.length > 0) {
   const reader = new FileReader();
   reader.addEventListener("load", () =>
    this.setState({ size_image_url: reader.result })
   );
   reader.readAsDataURL(e.target.files[0]);
   this.setState({ size_imgae: e.target.files[0] });
  }
 };
 handlePostingImages = () => {
  const formData = new FormData();
  formData.append("img[]", this.state.over_view_image);
  formData.append("img[]", this.state.description_mat_image);
  formData.append("img[]", this.state.size_imgae);
  formData.append("gallery[]", this.state.gallery_video);

  axios
   .post("http://127.0.0.1:8000/api/upload", formData)
   .then((response) => {
    console.log(response);
   })
   .catch((error) => console.log(error));
 };

 handleNextStep = (e) => {
  this.props.dispatch({ type: ADD_PRODUCT_NEXT_TAB });
  console.log("updated");
 };

 handleGotoStep = (step) => {
  // this.props.dispatch({ type: GO_TO_TAB_STEP, payload: step });
 };
 render() {
  return (
   <div id="product-files-step">
    <button
     className="save-product-step-btn"
     style={{ top: "-110px", height: "20px" }}
     onClick={this.handleNextStep}
    >
     {this.props.loading ? (
      <PulseLoader
       style={{ height: "20px" }}
       color="#ffffff"
       loading={this.props.loading}
       size={10}
      />
     ) : (
      "Save & Continue"
     )}
    </button>
    {/* <Tabs> */}
    <Tabs
     onSelect={(index) => this.setState({ index })}
     selectedIndex={this.state.index}
    >
     <div id="tabs-wrapper">
      <TabList>
       <Tab>Overview *</Tab>
       <Tab>Material Description</Tab>
       <Tab>Dimensions</Tab>
       <Tab>Photo Gallery</Tab>
       <span className="learn-more">Learn how to add description</span>
      </TabList>
     </div>

     <TabPanel>
      <div className="tab-form-content" style={{ position: "relative" }}>
       <div
        style={{
         position: "absolute",
         top: "-80px",
         left: 0,
         width: "180px",
        }}
       >
        <img
         src={this.state.overView_url}
         alt=""
         style={{
          display: "block",
          width: "100%",
         }}
        />
       </div>
       <div className="tab-head">
        <h2>Add Your Product Overview</h2>
        <div className="tip">
         Tip. Add your products concept or general description{" "}
         <span onClick={this.overviewExample_open}>See example</span>
        </div>
        <div className="bold-tip">
         You can add in English and Chinese or one language
        </div>
        <div className="file-icons-tabs">
         <span className="red-bg" style={{ position: "relative" }}>
          <FaCloudUploadAlt className="m-auto" />
          <input
           type="file"
           accept="image/*"
           onChange={this.onChangeOverview}
           style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            width: "50px",
           }}
          />
         </span>
         <span className="gray-bg" onClick={this.handlePostingImages}>
          <MdTitle className="m-auto" />
         </span>
         <span className="gray-bg">
          <RiCodeSSlashFill className="m-auto" />
         </span>
        </div>
       </div>
      </div>

      {/* overview modal */}

      <>
       <Modal
        show={this.state.overview_ex_modal}
        onHide={this.overviewExample_close}
        // backdrop="static"
        className="example-modals"
        keyboard={false}
       >
        <Modal.Header closeButton>
         <Modal.Title>
          Overview
          <span className="lower">
           <span> CLOUD Sofa</span> By Grado
          </span>
         </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {/* <Carousel>
          <Item>
           <div className="slide-content">
            Home projects the true character of its owner.‎ However one looks
            like outside, he expects himself to be surrounded by the realest and
            most comfortable environment when he comes back home.‎ Just like
            everyone has his or her own personality, home space also has its
            characteristics in line with its owner.‎ The unique shape of Cloud
            Sofa, though used in any space, is a bright spot that should not be
            ignored, yet its soft and perceptual curve and natural and poetic
            form, on the other hand, help avoid incompatibility, allowing it to
            perfectly blend itself into the overall home environment.‎
           </div>
           <div className="slide-content">
            大的座椅靠背和柔软的枕头立即传达出此款扶手椅的两个主要特征：欢迎和隐密。凹形，慷慨环抱的形状营造出一个独一无二的私人空间。它的垫子线条简洁又柔软，正如邀请您体验在它内所带来的放松氛围。Big
            Data
            （意为：大数据）显示了风格、输入和形状的多种影响，它们之间相互沟通，而结果正是一个出色产品的诞生
           </div>
           <div className="slide-image">
            <img src={slide4} alt="" />
           </div>
          </Item>
          <Item>
           <h2>Slide one </h2>
          </Item>
          <Item>
           <h2>Slide one </h2>
          </Item>
         </Carousel> */}
        </Modal.Body>
       </Modal>
      </>

      {/* end of overview modal */}
     </TabPanel>
     <TabPanel>
      <div className="tab-form-content">
       <div
        style={{
         position: "absolute",
         top: "-80px",
         left: 0,
         width: "180px",
        }}
       >
        <img
         src={this.state.description_url}
         alt=""
         style={{
          display: "block",
          width: "100%",
         }}
        />
       </div>
       <div className="tab-head">
        <h2>Add Material Description</h2>
        <div className="tip">
         Add the product’s materials specifications, Wood, leather, fabrics,
         etc,. <span>See Example</span>
        </div>
        <div className="bold-tip">
         You can skip if informations not available
        </div>
        {/* <div className='bolder-tip'></div> */}
        <div className="file-icons-tabs">
         <span className="red-bg" style={{ position: "relative" }}>
          <FaCloudUploadAlt className="m-auto" />
          <input
           type="file"
           accept="image/*"
           onChange={this.onChangeMatDescr}
           style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            width: "50px",
           }}
          />
         </span>
         <span className="gray-bg">
          <MdTitle className="m-auto" />
         </span>
         <span className="gray-bg">
          <RiCodeSSlashFill className="m-auto" />
         </span>
        </div>
       </div>
      </div>
     </TabPanel>
     <TabPanel>
      <div className="tab-form-content" style={{ position: "relative" }}>
       <div
        style={{
         position: "absolute",
         top: "-80px",
         left: 0,
         width: "180px",
        }}
       >
        <img
         src={this.state.size_image_url}
         alt=""
         style={{
          display: "block",
          width: "100%",
         }}
        />
       </div>
       <div className="tab-head">
        <h2>Add Size Description</h2>
        <div className="tip">
         Add a picture of the size <span>See Example</span>
        </div>
        <div className="bold-tip">
         You can skip if informations not available
        </div>
        <div className="file-icons-tabs">
         <span className="red-bg" style={{ position: "relative" }}>
          <FaCloudUploadAlt className="m-auto" />
          <input
           type="file"
           accept="image/*"
           onChange={this.onChangeSizeImg}
           style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            width: "50px",
           }}
          />
         </span>
         <span className="gray-bg">
          <MdTitle className="m-auto" />
         </span>
         <span className="gray-bg">
          <RiCodeSSlashFill className="m-auto" />
         </span>
        </div>
       </div>
      </div>
     </TabPanel>
     <TabPanel>
      <div
       className="tab-form-content"
       style={{ position: "relative" }}
       id="gallery"
      >
       <div
        style={{
         position: "absolute",
         top: "-80px",
         left: 0,
         width: "180px",
        }}
       >
        <video
         key={this.state.gallery_url}
         type="video/mp4"
         ref={this.state.video}
         style={{
          display: "block",
          width: "100%",
          position: "relative",
         }}
        >
         <source src={this.state.gallery_url} type="video/mp4" />
        </video>
        <ProgressBar
         now={this.state.loaded}
         variant="danger"
         style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          height: "100%",
          opacity: ".3",
          //   left: "25%",
         }}
        />
       </div>
       <div className="tab-head">
        <h2>Add products’s Gallery photos / videos</h2>
        <div className="tip">
         You can add photos or embed videos from YouTube, Vimeo, DailyMotion,
         Tencent Video (QQ), Youku, iQiyi
        </div>
        <div className="bold-tip">
         You can skip if informations not available
        </div>
        <div className="file-icons-tabs" style={{ position: "relative" }}>
         <span className="red-bg" style={{ position: "relative" }}>
          <FaCloudUploadAlt className="m-auto" />
          <input
           type="file"
           accept="video/*"
           onChange={this.onChangeGallery}
           style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            width: "50px",
           }}
          />
         </span>
         {/* <span className='gray-bg'><MdTitle/></span> */}
         <span className="gray-bg">
          <RiCodeSSlashFill className="m-auto" />
         </span>
        </div>
       </div>
      </div>
     </TabPanel>
     <TabPanel></TabPanel>
    </Tabs>
   </div>
  );
 }
}
const mapStateToProps = (state) => ({ OptionsPrice: state.optionsPrice });
export default connect(mapStateToProps)(ProductFiles);
