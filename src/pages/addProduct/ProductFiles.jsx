import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdTitle } from "react-icons/md";
import { RiCodeSSlashFill } from "react-icons/ri";
import ProgressBar from "react-bootstrap/ProgressBar";
// import { PulseLoader } from "react-spinners/PulseLoader";
// import { ADD_PRODUCT_NEXT_TAB } from "../../redux/constants";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { connect } from "react-redux";
import axios from "axios";

import {
 nextTab,
 productDescription,
} from "../../redux/actions/addProductActions";
import ClipLoader from "react-spinners/ClipLoader";
class ProductFiles extends Component {
 galleriyFiles = [];
 //  overviewsFiles = [];
 //  descriptionFiles = [];
 //  dimensionsFiles = [];

 overs = [];
 constructor(props) {
  super(props);
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
   overViewEditorState: EditorState.createEmpty(),
   materialDesceditorState: EditorState.createEmpty(),
   sizeDescEditorState: EditorState.createEmpty(),
  };
 }

 fd = new FormData();
 overviewExample_open = () => {
  this.setState({ overview_ex_modal: true });
 };
 embedModal_open = () => {
  this.setState({ embed_modal: true });
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
  this.setState({ product_id: this.props.id });
  console.log(this.state.index);
  console.log();
 }
 //  fd = new FormData();

 //  onChangeOverview = ({ target: { files } }) => {
 //   const reader = new FileReader();

 //   if (files && files.length > 0) {
 //    this.fd.append("desc_overview_img[]", files[0]);
 //    const overview_src = URL.createObjectURL(files[0]);
 //    this.overviewsFiles.push(overview_src);
 //    console.log(this.overviewsFiles);
 //    this.setState({ overviews: this.overviewsFiles });

 //    reader.addEventListener("load", () => {
 //     //  this.overs.push(files[0]);
 //     this.setState({ o_image: files[0] });
 //    });
 //   }
 //  };

 //  onChangeSizeImg = ({ target: { files } }) => {
 //   const reader = new FileReader();

 //   if (files && files.length > 0) {
 //    this.fd.append("desc_dimension_img[]", files[0]);

 //    const size_img_src = URL.createObjectURL(files[0]);
 //    this.dimensionsFiles.push(size_img_src);
 //    console.log(this.dimensionsFiles);
 //    this.setState({ dimensions: this.dimensionsFiles });

 //    reader.addEventListener("load", () => {
 //     //  this.overs.push(files[0]);
 //     // this.setState({ o_image: files[0] });
 //    });
 //   }
 //  };

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
   .post(
    `https://arch17-apis.herokuapp.com/api/desc/${this.state.product_id}`,
    formData,
    options
   )
   .then((response) => console.log(response))
   .catch((err) => console.log(err));
 };

 //  onChangeMatDescr = ({ target: { files } }) => {
 // const reader = new FileReader();

 //   if (files && files.length > 0) {
 //    this.fd.append("desc_mat_desc_img[]", files[0]);
 //    const desc_src = URL.createObjectURL(files[0]);
 //    this.descriptionFiles.push(desc_src);
 //    console.log(this.descriptionFiles);
 //    this.setState({ descriptions: this.descriptionFiles });
 //    reader.addEventListener("load", () => {});
 //   }
 //  };

 uploadSizeCallback = (file) => {
  return new Promise((resolve, reject) => {
   const formData = new FormData();
   formData.append("img[]", file);
   axios
    .post(
     `https://arch17-apis.herokuapp.com/api/upload/${this.props.id}`,

     formData
    )
    .then((response) => {
     resolve({
      data: { link: response.data.img[response.data.lastIndex].file_url },
     });
     console.log(response.data);
    })
    .catch((err) => {
     console.log(err);
     reject(err);
    });
  });
 };
 handleNextStep = (e) => {
  // this.props.dispatchDescriptionStep(this.fd, this.state.product_id);
  // console.log(this.state.overViewEditorState);
  this.setState({ loading: true });
  const formDataOverview = new FormData();
  const formDataDesc = new FormData();
  formDataOverview.append(
   "overview_content",
   JSON.stringify(
    convertToRaw(this.state.overViewEditorState.getCurrentContent())
   )
  );
  formDataDesc.append(
   "size_content",
   JSON.stringify(
    convertToRaw(this.state.sizeDescEditorState.getCurrentContent())
   )
  );
  formDataDesc.append(
   "mat_desc_content",
   JSON.stringify(
    convertToRaw(this.state.materialDesceditorState.getCurrentContent())
   )
  );
  axios
   .post(
    `https://arch17-apis.herokuapp.com/api/overviewContnet/${this.state.product_id}`,
    formDataOverview
   )
   .then((response) => {
    this.setState({ loading: false });
    this.props.dispatchNextStep();
    axios
     .post(
      `https://arch17-apis.herokuapp.com/api/descContent/${this.state.product_id}`,
      formDataDesc
     )
     .then("Descriotion has been added ");
   })
   .catch((error) => console.log(error));
 };

 handleGotoStep = (step) => {
  console.log(this.props);
 };

 onEditorStateOverviewChange = (overViewEditorState) => {
  this.setState({
   overViewEditorState,
  });
  console.log(convertToRaw(this.state.overViewEditorState.getCurrentContent()));
 };

 onEditorStateMaterialChange = (materialDesceditorState) => {
  this.setState({
   materialDesceditorState,
  });
  console.log(
   convertToRaw(this.state.materialDesceditorState.getCurrentContent())
  );
 };

 onEditorStateSizeChange = (sizeDescEditorState) => {
  this.setState({
   sizeDescEditorState,
  });
 };
 render() {
  return (
   <div id="product-files-step">
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
       {/* <button
     className="save-product-step-btn"
     style={{ position: "relative", top: "10px" }}
     onClick={this.submitSizeContent}
    >
     Save
    </button> */}
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
          <div style={{ position: "relative" }}>
           <video
            key={index}
            type="video/mp4"
            style={{
             display: "block",
             position: "relative",
            }}
           >
            <source src={file} type="video/mp4" />
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
            }}
           />
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
          value={""}
          // onChange={this.setMaterialName}
         />
        </Col>
       </Form.Row>
       <Button
        variant="danger"
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
