import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdTitle } from "react-icons/md";
import { RiCodeSSlashFill } from "react-icons/ri";
import ProgressBar from "react-bootstrap/ProgressBar";
// import { PulseLoader } from "react-spinners/PulseLoader";
// import { ADD_PRODUCT_NEXT_TAB } from "../../redux/constants";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { connect } from "react-redux";
import axios from "axios";

import {
 nextTab,
 productDescription,
} from "../../redux/actions/addProductActions";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "./../../utitlties";
class ProductFiles extends Component {
 galleriyFiles = [];
 embed_urls = [];
 //  loaded = [];

 constructor(props) {
  super(props);
  console.log(this.props);

  this.state = {
   modals: {
    overview_ex_modal: false,
    dimension_ex_modal: false,
    material_ex_modal: false,
    embed_modal: false,
   },
   index: 0,
   over_view_image: null,
   description_mat_image: null,
   size_imgae: null,
   description_url: "",
   size_image_url: "",
   loaded: 0,
   gallery: null,
   galleries: [],
   overviews: [],
   descriptions: [],
   dimensions: [],
   overviews_files: [],
   loading: false,
   product_id: null,
   overViewEditorState: this.props.edit
    ? EditorState.createWithContent(
       convertFromRaw(JSON.parse(this.props?.description?.overview_content))
      )
    : EditorState.createEmpty(),
   materialDesceditorState: this.props.edit
    ? EditorState.createWithContent(
       convertFromRaw(JSON.parse(this.props?.description?.mat_desc_content))
      )
    : EditorState.createEmpty(),
   sizeDescEditorState: this.props.edit
    ? EditorState.createWithContent(
       convertFromRaw(JSON.parse(this.props?.description?.size_content))
      )
    : EditorState.createEmpty(),
   overviewLength: 0,
   sizeLength: 0,
   materialLength: 0,
   skip_modal: false,
   desc_id: "",
   embed_url: "",
  };
 }

 fd = new FormData();
 overviewExample_open = () => {
  this.setState({ overview_ex_modal: true });
 };
 embedModal_open = () => {
  this.setState({ embed_modal: true });
 };
 skip_modal_close = () => {
  this.setState({ skip_modal: false });
 };
 embedModal_close = () => {
  this.setState({ embed_modal: false });
 };
 overviewExample_close = () => {
  this.setState({ overview_ex_modal: false });
 };
 componentDidMount() {
  Tabs.defaultProps = {
   selectedIndex: this.state.index,
  };
  // const overViewEditorState = EditorState.createWithContent(
  //  convertFromRaw(JSON.parse(this.props?.description?.overview_content))
  // );
  // const materialDesceditorState = EditorState.createWithContent(
  //  convertFromRaw(JSON.parse(this.props?.description?.mat_desc_content))
  // );
  // const sizeDescEditorState = EditorState.createWithContent(
  //  convertFromRaw(JSON.parse(this.props?.description?.size_content))
  // );
  this.setState({
   product_id: this.props.id,
   //  overViewEditorState,
   //  sizeDescEditorState,
   //  materialDesceditorState,
  });
  console.log(this.state.index);
 }

 onChangeEmbedUrl = (e) => {
  this.setState({ embed_url: e.target.value });
 };
 addEmbedBox = () => {
  this.embed_urls.push(this.state.embed_url);
 };

 onChangeGallery = ({ target: { files } }) => {
  if (files && files.length > 0) {
   const src = URL.createObjectURL(files[0]);
   this.galleriyFiles.push(src);
   this.setState({ gallery_url: src });
   this.setState({ galleries: this.galleriyFiles });
   console.log(this.galleriyFiles);
   const reader = new FileReader();
   reader.addEventListener("load", () => {
    this.setState({ gallery_video: files[0] });
   });
   reader.readAsDataURL(files[0]);
   this.setState({ gallery_video: files[0] });
  }

  let formData = new FormData();
  formData.append("desc_gallery_files[]", files[0]);

  const options = {
   onUploadProgress: (progressEvent) => {
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
   .post(`${API}desc/${this.state.product_id}`, formData, options)
   .then((response) => {
    console.log(response);
   })
   .catch((err) => console.log(err));
 };

 skip = () => {
  this.props.dispatchNextStep();
 };

 uploadSizeCallback = (file) => {
  return new Promise((resolve, reject) => {
   const formData = new FormData();
   formData.append("img[]", file);
   formData.append("desc_id", this.state.desc_id);
   axios
    .post(`${API}upload/${this.props.id}`, formData)
    .then((response) => {
     resolve({
      data: { link: response.data.img[response.data.lastIndex].file_url },
     });
     console.log(response.data);
     this.setState({ desc_id: response.data.product_desc.description[0].id });
    })
    .catch((err) => {
     console.log(err);
     reject(err);
    });
  });
 };
 handleNextStep = (e) => {
  if (
   this.state.sizeLength +
    this.state.materialLength +
    this.state.overviewLength <
   1
  ) {
   this.setState({ skip_modal: true });
   return;
  } else {
   this.setState({ loading: true });
   const formDataOverview = new FormData();
   formDataOverview.append(
    "overview_content",
    JSON.stringify(
     convertToRaw(this.state.overViewEditorState.getCurrentContent())
    )
   );
   formDataOverview.append(
    "size_content",
    JSON.stringify(
     convertToRaw(this.state.sizeDescEditorState.getCurrentContent())
    )
   );
   formDataOverview.append(
    "mat_desc_content",
    JSON.stringify(
     convertToRaw(this.state.materialDesceditorState.getCurrentContent())
    )
   );
   formDataOverview.append("desc_id", this.state.desc_id);
   axios
    .post(`${API}overviewContnet/${this.state.product_id}`, formDataOverview)
    .then((response) => {
     this.setState({ loading: false });
     this.props.dispatchNextStep();
    })
    .catch((error) => console.log(error));
  }
 };

 handleGotoStep = (step) => {
  console.log(this.props);
 };

 onEditorStateOverviewChange = (overViewEditorState) => {
  this.setState({
   overViewEditorState,
   overviewLength: convertToRaw(
    this.state.overViewEditorState.getCurrentContent()
   ).blocks[0].text.length,
  });
 };

 onEditorStateMaterialChange = (materialDesceditorState) => {
  this.setState({
   materialDesceditorState,
   materialLength: convertToRaw(
    this.state.materialDesceditorState.getCurrentContent()
   ).blocks[0].text.length,
  });
  // console.log( convertToRaw(this.state.materialDesceditorState.getCurrentContent()));
 };

 onEditorStateSizeChange = (sizeDescEditorState) => {
  this.setState({
   sizeDescEditorState,
   sizeLength: convertToRaw(this.state.sizeDescEditorState.getCurrentContent())
    .blocks[0].text.length,
  });
 };
 render() {
  return (
   <div id="product-files-step">
    <button className="product-skip-btn" onClick={this.skip}>
     Skip
    </button>
    <button
     className="save-product-step-btn"
     style={{
      top: "-110px",
      height: "20px",
      color: "#fff",
      background: this.state.loading ? "#B4B4B4" : "#E41E15",
     }}
     onClick={this.handleNextStep}
    >
     {this.state.loading ? (
      <>
       {" "}
       <ClipLoader
        style={{ height: "20px" }}
        color="#ffffff"
        loading={this.state.loading}
        size={20}
       />
      </>
     ) : (
      "Save & Continue"
     )}
    </button>

    <Tabs
     forceRenderTabPanel={true}
     onSelect={(index) => this.setState({ index })}
     selectedIndex={this.state.index}
    >
     <div id="tabs-desc-wrapper">
      <TabList>
       <Tab>Overview *</Tab>
       <Tab>Material Description</Tab>
       <Tab>Dimensions</Tab>
       <Tab>Photo Gallery</Tab>
       <span className="learn-more">Learn how to add description</span>
      </TabList>
     </div>

     <TabPanel forceRender>
      <>
       <div className="text-editor">
        <Editor
         editorState={this.state.overViewEditorState}
         wrapperClassName="rich-editor demo-wrapper"
         editorClassName="demo-editor"
         onEditorStateChange={this.onEditorStateOverviewChange}
         placeholder="Add Your Product Description Overview "
         toolbar={{
          image: {
           uploadEnabled: true,
           urlEnabled: true,
           uploadCallback: this.uploadSizeCallback,
           previewImage: true,
           alignmentEnabled: "LEFT",
           inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
           alt: { present: false, mandatory: false },
           defaultSize: {
            height: "auto",
            width: "400",
           },
          },
         }}
        />
       </div>
       {/* <button
        className="save-product-step-btn"
        style={{ position: "relative", top: "10px" }}
        onClick={this.submitOverviewContent}
       >
        Save
       </button> */}
      </>

      {/* <Overview id={this.state.product_id} /> */}

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
     <TabPanel forceRender>
      {/* <MaterialDescription id={this.state.product_id} /> */}
      <>
       <div className="text-editor">
        <Editor
         editorState={this.state.materialDesceditorState}
         wrapperClassName="rich-editor demo-wrapper"
         editorClassName="demo-editor"
         onEditorStateChange={this.onEditorStateMaterialChange}
         placeholder="Add Your Product Mateial Description "
         toolbar={{
          image: {
           uploadEnabled: true,
           urlEnabled: true,
           uploadCallback: this.uploadSizeCallback,
           previewImage: true,
           alignmentEnabled: "LEFT",
           inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
           alt: { present: false, mandatory: false },
           defaultSize: {
            height: "auto",
            width: "400",
           },
          },
         }}
        />
       </div>
       {/* <button
     className="save-product-step-btn"
     style={{ position: "relative", top: "10px" }}
     onClick={this.submitDescriptionContent}
    >
     Save
    </button> */}
      </>
     </TabPanel>
     <TabPanel forceRender>
      {/* <SizeDescription id={this.state.product_id} /> */}
      <>
       <div className="text-editor">
        <Editor
         editorState={this.state.sizeDescEditorState}
         wrapperClassName="rich-editor demo-wrapper"
         editorClassName="demo-editor"
         onEditorStateChange={this.onEditorStateSizeChange}
         placeholder="Add Your Product Size Description"
         toolbar={{
          //   options: ["image", "colorPicker"],
          image: {
           uploadEnabled: true,
           urlEnabled: true,
           uploadCallback: this.uploadSizeCallback,
           previewImage: true,
           alignmentEnabled: "LEFT",
           inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
           alt: { present: false, mandatory: false },
           defaultSize: {
            height: "auto",
            width: "400",
           },
          },
         }}
        />
       </div>
      </>
     </TabPanel>
     <TabPanel forceRender>
      <div
       className="tab-form-content"
       style={{ position: "relative" }}
       id="gallery"
      >
       <div className="files-previews">
        {this.state.galleries?.map((file, index) => {
         return (
          <div style={{ position: "relative" }} key={index}>
           <img src={file} alt="" />
          </div>
         );
        })}
        <ProgressBar
         now={this.state.loaded}
         style={{
          background: "#000",
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          maxWidth: "130px",
          height: "100%",
          opacity: this.state.loaded < 100 ? ".3" : "0",
          left: `${155 * this.state.galleries.length - 155}px`,
          display: this.state.loaded >= 100 ? "none" : "",
         }}
        />
        {this.embed_urls?.map((url, index) => {
         return (
          <div style={{ position: "relative" }} key={index}>
           {/* <iframe src={url} alt="" title="embeded" /> */}
           <iframe
            width="130"
            // height="315"
            src={url}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
           ></iframe>
          </div>
         );
        })}
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
           accept="image/*"
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
          <RiCodeSSlashFill className="m-auto" onClick={this.embedModal_open} />
         </span>
        </div>
       </div>
      </div>
     </TabPanel>
     <TabPanel forceRender></TabPanel>
    </Tabs>
    <Modal
     id="price-request-modal"
     className="arch-wide-modal product-modal pics-modal"
     size="md"
     show={this.state.skip_modal}
     onHide={this.skip_modal_close}
     aria-labelledby="example-modal-sizes-title-lg"
    >
     <Modal.Header closeButton></Modal.Header>
     <Modal.Body>
      <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
       <h6>Skip Modal</h6>

       <Button
        variant="danger"
        type="submit"
        onClick={() => {
         this.props.dispatchNextStep();
         this.setState({ skip_modal: false });
        }}
        style={{
         textAlign: "right",
         background: "#E41E15",
         display: "block",
         float: "right",
         marginRight: "12px",
        }}
       >
        Skip
       </Button>
      </div>
     </Modal.Body>
    </Modal>
    <Modal
     id="price-request-modal"
     className="arch-wide-modal product-modal pics-modal"
     size="md"
     show={this.state.embed_modal}
     onHide={this.embedModal_close}
     aria-labelledby="example-modal-sizes-title-lg"
    >
     <Modal.Header closeButton></Modal.Header>
     <Modal.Body>
      <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
       <h6>Media Embed</h6>
       <Form.Row as={Row} style={{ margin: "20px 0" }}>
        <Form.Label column md={2}>
         URL
        </Form.Label>
        <Col md={10}>
         <Form.Control
          placeholder="Video URL"
          // value={""}
          onChange={this.onChangeEmbedUrl}
         />
        </Col>
       </Form.Row>
       <Button
        variant="danger"
        onClick={() => {
         this.addEmbedBox();
         this.setState({ embed_modal: false });
        }}
        type="submit"
        style={{
         textAlign: "right",
         background: "#E41E15",
         display: "block",
         float: "right",
         marginRight: "12px",
        }}
       >
        {/* {this.displayButtonText(this.state.size_modal_edit)} */}
        Embed
       </Button>
      </div>
     </Modal.Body>
    </Modal>
   </div>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 dispatchDescriptionStep: (data, id) => dispatch(productDescription(data, id)),
 dispatchNextStep: () => dispatch(nextTab()),
});
const mapStateToProps = (state) => ({
 loading: state.addProduct.loading,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductFiles);
