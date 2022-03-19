import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiCodeSSlashFill } from "react-icons/ri";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import axios from "axios";
import { Progress } from "antd";
import {
 nextTab,
 productDescription,
} from "../../redux/actions/addProductActions";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "./../../utitlties";
class ProductFiles extends Component {
 //  galleriyFiles = [];
 embed_urls = [];

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
   gelleries: this.props.edit ? this.props.galleries : [],
   overviews: [],
   descriptions: [],
   dimensions: [],
   overviews_files: [],
   loading: false,
   product_id: null,
   stateChanged: false,
   overViewEditorState:
    this.props?.edit && this.props.description
     ? EditorState?.createWithContent(
        convertFromRaw(JSON.parse(this.props?.description?.overview_content))
       )
     : EditorState?.createEmpty(),
   materialDesceditorState:
    this.props?.edit && this.props.description
     ? EditorState?.createWithContent(
        convertFromRaw(JSON.parse(this.props?.description?.mat_desc_content))
       )
     : EditorState?.createEmpty(),
   sizeDescEditorState:
    this.props.edit && this.props.description
     ? EditorState?.createWithContent(
        convertFromRaw(JSON.parse(this.props?.description?.size_content))
       )
     : EditorState?.createEmpty(),
   overviewLength: 0,
   sizeLength: 0,
   materialLength: 0,
   skip_modal: false,
   desc_id: "",
   embed_url: "",
   startLoading: false,
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
  // console.log(this.state.galleries);
  this.setState({
   gelleries: this.props.edit ? this.props.galleries : [],
  });
  Tabs.defaultProps = {
   selectedIndex: this.state.index,
  };
  this.setState({
   product_id: this.props.id,
  });
  console.log(this.state.index);
 }

 onChangeEmbedUrl = (e) => {
  this.setState({ embed_url: e.target.value });
 };
 addEmbedBox = () => {
  this.embed_urls.push(this.state.embed_url);
 };

 handleDeleteGllery = (id, index) => {
  const gelleries = this.state.gelleries;

  axios.post(`${API}product/delete/gallery/${id}`).then((response) => {
   console.log(response);
   this.setState({
    gelleries: gelleries.filter((file, ind) => {
     return file.id !== id;
    }),

    stateChanged: true,
   });
  });
 };

 onChangeGallery = ({ target: { files } }) => {
  if (files && files.length > 0) {
   let galleriyFiles = this.state.gelleries;
   const src = URL.createObjectURL(files[0]);
   galleriyFiles.push({
    id: null,
    desc_gallery_files: [src],
   });
   this.setState({ gallery_url: src, startLoading: true });
   this.setState({ gelleries: galleriyFiles });
   console.log(galleriyFiles);
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
    } else {
     this.setState({
      startLoading: false,
     });
    }
   },
  };
  axios
   .post(`${API}desc/${this.state.product_id}`, formData, options)
   .then((response) => {
    console.log(response);
    this.setState({
     gelleries: response.data.product_desc.gallery,
     startLoading: false,
     stateChanged: true,
    });
   })
   .catch((err) => {
    this.setState({
     startLoading: false,
    });
    console.log(err);
   });
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

     this.setState({
      desc_id: response.data.product_desc.description[0].id,
      stateChanged: true,
     });
    })
    .catch((err) => {
     console.log(err);
     reject(err);
    });
  });
 };

 handleNextStep = (e) => {
  if (!this.state.stateChanged) {
   if (this.props.edit) {
    this.props.dispatchNextStep();
   } else {
    this.setState({ skip_modal: true });
    console.log(this.state);
    return;
   }
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

 onEditorStateOverviewChange = (overViewEditorState) => {
  this.setState({
   overViewEditorState,
   stateChanged: true,
   overviewLength: convertToRaw(
    this.state.overViewEditorState.getCurrentContent()
   ).blocks[0].text.length,
  });
  console.log(overViewEditorState);
 };

 onEditorStateMaterialChange = (materialDesceditorState) => {
  this.setState({
   materialDesceditorState,
   stateChanged: true,
   materialLength: convertToRaw(
    this.state.materialDesceditorState.getCurrentContent()
   ).blocks[0].text.length,
  });
 };

 onEditorStateSizeChange = (sizeDescEditorState) => {
  this.setState({
   sizeDescEditorState,
   stateChanged: true,
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
         onChange={() => {
          console.log("Changed");
         }}
         wrapperClassName="rich-editor demo-wrapper"
         editorClassName="demo-editor cs-editor"
         //  style={{ lineHeight: "75%" }}
         onEditorStateChange={this.onEditorStateOverviewChange}
         onContentStateChange={() => {
          console.log("SSSS");
         }}
         placeholder="Add Your Product Description Overview "
         stripPastedStyles={true}
         toolbar={{
          options: [
           "inline",
           "fontSize",
           "fontFamily",
           "list",
           "textAlign",
           "history",
          ],
          fontSize: {
           options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
          },
         }}
        />
       </div>
      </>
      <>
       <Modal
        show={this.state.overview_ex_modal}
        onHide={this.overviewExample_close}
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
        <Modal.Body></Modal.Body>
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
         on={(e) => {
          console.log("Changed");
          console.log(e);
         }}
         editorClassName="demo-editor"
         onEditorStateChange={this.onEditorStateMaterialChange}
         placeholder="Add Your Product Mateial Description "
         toolbar={{
          image: {
           uploadEnabled: true,
           urlEnabled: false,
           uploadCallback: this.uploadSizeCallback,
           previewImage: true,
           alignmentEnabled: "Left",
           inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
           alt: { present: false, mandatory: false },
           defaultSize: {
            height: "auto",
            width: "80%",
           },
          },
         }}
        />
       </div>
      </>
     </TabPanel>
     <TabPanel forceRender>
      <>
       <div className="text-editor">
        <Editor
         editorState={this.state.sizeDescEditorState}
         wrapperClassName="rich-editor demo-wrapper"
         editorClassName="demo-editor"
         onEditorStateChange={this.onEditorStateSizeChange}
         placeholder="Add Your Product Size Description"
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
            width: "80%",
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
        {this.state.gelleries?.map((file, index) => {
         return (
          <>
           <div style={{ position: "relative" }} key={index}>
            <img
             src={file?.desc_gallery_files[0]}
             alt=""
             style={{
              filter:
               !file.id && this.state.startLoading ? "blur(5px)" : "none",
             }}
            />
            {file.id && (
             <>
              <p
               onClick={() => this.handleDeleteGllery(file.id, index)}
               style={{ cursor: "pointer" }}
              >
               <DeleteOutlined />
              </p>
             </>
            )}
            {this.state.startLoading && !file?.id && (
             <>
              <Progress
               style={{
                position: "absolute",
                top: "24%",
                bottom: 0,
                maxWidth: "130px",
                left: "31%",
                display: this.state.loaded >= 100 ? "none" : "",
               }}
               type="circle"
               width={38}
               percent={this.state.loaded}
               strokeWidth={12}
               trailColor="#fff"
               strokeColor="#000"
               success={{
                percent: 0,
                strokeColor: "transparent",
               }}
              />
             </>
            )}
           </div>
          </>
         );
        })}

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
         <span
          className="red-bg"
          style={{
           position: "relative",
           visibility: this.state.startLoading ? "hidden" : "visible",
          }}
         >
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
     {/* <Modal.Header closeButton></Modal.Header> */}
     <Modal.Body>
      <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
       <h6
        style={{
         padding: "15px 5px 35px",
         fontSize: "1.2rem",
        }}
       >
        Skip without adding product description?
       </h6>
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
