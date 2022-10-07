import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiCodeSSlashFill } from "react-icons/ri";
import { Modal, Button } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactPlayer from "react-player";

import { connect } from "react-redux";
import axios from "axios";
import { Popover, Input, Progress } from "antd";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
 nextTab,
 productDescription,
} from "../../redux/actions/addProductActions";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "./../../utitlties";
function uploadAdapter(loader) {
 return {
  upload: () => {
   return new Promise((resolve, reject) => {
    const fd = new FormData();
    loader.file.then((file) => {
     fd.append("cover", file);
     axios
      .post(`${API}uploadimg`, fd)
      .then((res) => {
       resolve({
        default: res.data.src,
       });
      })
      .catch((err) => {
       reject(err);
       console.log(err);
      });
    });
   });
  },
 };
}
function uploadPlugin(editor) {
 editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  return uploadAdapter(loader);
 };
}
class ProductFiles extends Component {
 constructor(props) {
  super(props);
  console.log(this.props);
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
   vidoes: [],
   url: "",
   galleryItmes: this.props?.edit
    ? this.props.galleries?.map((g) => {
       if (
        g.desc_gallery_files[0]?.includes("api.arch17.com") ||
        g.desc_gallery_files[0]?.includes("/upload/")
       ) {
        return {
         type: "image",
         src: g.desc_gallery_files[0],
         loaded: 100,
         gallery_id: g?.id,
        };
       }
      })
    : this.props._description?.galleryItmes ?? [],
   visible: false,
   overViewEditorState:
    this.props?.edit && this.props.description
     ? this.props?.description?.overview_content
     : this.props._description?.overViewEditorState ?? "",
   materialDesceditorState:
    this.props?.edit && this.props.description
     ? this.props?.description?.mat_desc_content
     : this.props._description?.materialDesceditorState ?? "",
   sizeDescEditorState:
    this.props?.edit && this.props.description
     ? this.props?.description?.size_content
     : this.props._description?.sizeDescEditorState ?? "",
   overviewLength: 0,
   sizeLength: 0,
   materialLength: 0,
   skip_modal: false,
   desc_id: "",
   embed_url: "",
   startLoading: false,
  };
 }
 uploadAdapter = (loader) => {
  return {
   upload: () => {
    // setUploading(true);
    return new Promise((resolve, reject) => {
     //  IncrementFilesCounter(filesCounter + 1);

     const fd = new FormData();
     loader.file.then((file) => {
      fd.append("cover", file);
      axios
       .post(`${API}uploadimg`, fd)
       .then((res) => {
        resolve({
         default: res.data.src,
        });
       })
       .catch((err) => {
        reject(err);
        console.log(err);
       });
     });
    });
   },
  };
 };

 uploadPlugin = (editor) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
   return uploadAdapter(loader);
  };
 };
 fd = new FormData();
 overviewExample_open = () => {
  this.setState({ overview_ex_modal: true });
 };

 skip_modal_close = () => {
  this.setState({ skip_modal: false });
 };

 overviewExample_close = () => {
  this.setState({ overview_ex_modal: false });
 };
 componentDidMount() {
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

 skip = () => {
  this.props.dispatchNextStep();
 };

 handleNextStep = (e) => {
  if (!this.state.stateChanged && this.state.galleryItmes?.length < 1) {
   if (this.props.edit) {
    this.props.dispatchNextStep();
   } else {
    this.setState({ skip_modal: true });
    console.log(this.state);
    return;
   }
  } else {
   this.setState({ loading: true });
   const videos = [];
   const images = [];
   const { galleryItmes } = this.state;
   for (let i = 0; i < this.state.galleryItmes?.length; i++) {
    if (galleryItmes[i].type === "video") {
     videos.push(galleryItmes[i].src);
    } else {
     images.push(galleryItmes[i].file);
    }
   }

   const fdGallery = new FormData();

   images.map((i) => {
    fdGallery.append("desc_gallery_files[]", i);
   });
   videos.map((v) => {
    fdGallery.append("desc_gallery_srcs[]", v);
   });

   //
   const {
    overViewEditorState,
    sizeDescEditorState,
    materialDesceditorState,
   } = this.state;
   const description = {
    overViewEditorState,
    sizeDescEditorState,
    materialDesceditorState,
    galleryItmes,
   };

   const formDataOverview = new FormData();
   formDataOverview.append("overview_content", this.state.overViewEditorState);
   formDataOverview.append("size_content", this.state.sizeDescEditorState);
   formDataOverview.append(
    "mat_desc_content",
    this.state.materialDesceditorState
   );
   formDataOverview.append("desc_id", this.state.desc_id);
   axios
    .post(`${API}overviewContnet/${this.state.product_id}`, formDataOverview)
    .then((response) => {
     this.props.dispatchDescriptionStep(description);
     this.setState({
      loading: false,
     });
     this.props.dispatchNextStep();
    })
    .catch((error) => console.log(error));
  }
 };

 // gallery hooks and function
 addImages = (e) => {
  const { galleryItmes } = this.state;
  const previews = [...e.target.files]?.map((file) => {
   return {
    src: URL.createObjectURL(file),
    type: "image",
    file,
    loaded: 0,
   };
  });
  this.setState({
   galleryItmes: [...galleryItmes, ...previews],
  });

  [...e.target.files]?.map((file, index) => {
   const options = {
    onUploadProgress: (progressEvent) => {
     const { loaded, total } = progressEvent;
     let percent = Math.floor((loaded * 100) / total);
     console.log(`${loaded} kb of ${total} | ${percent}%`);
     if (percent <= 100) {
      console.log(percent);
      previews[index].loaded = percent;
      this.setState({
       galleryItmes: [...galleryItmes, ...previews],
      });
      // tempCovers[img_index].loaded = percent;
      // this.setState({ dataSource: tempDataSource });
     }
    },
   };
   this.setState({
    galleryItmes: [...galleryItmes, ...previews],
   });
   const fdGImages = new FormData();
   fdGImages.append("desc_gallery_files[]", file);
   axios
    .post(`${API}desc/${this.state.product_id}`, fdGImages, options)
    .then((response) => {
     console.log(response);
     //  previews[index].gallery_id= response.data
    })
    .catch((err) => {
     console.log(err);
    });
  });

  console.log(previews);
 };
 addVideoUrl = () => {
  let { url } = this.state;
  // videos.push(url);
  this.setState({
   url: "",
   visible: false,
  });

  const fd = new FormData();
  fd.append("src", url);
  axios
   .post(`${API}video/${this.state.product_id}`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     vidoes: [...this.state.vidoes, url],
    });
   })
   .catch((er) => {
    console.log(er);
   });
 };

 handleSaveGallery = () => {
  const videos = [];
  const images = [];
  const { galleryItmes } = this.state;
  for (let i = 0; i < this.state.galleryItmes.length; i++) {
   if (galleryItmes[i].type === "video") {
    videos.push(galleryItmes[i].src);
   } else {
    images.push(galleryItmes[i].file);
   }
  }

  const fd = new FormData();

  images.map((i) => {
   fd.append("desc_gallery_files[]", i);
  });
  videos.map((v) => {
   fd.append("desc_gallery_srcs[]", v);
  });

  axios
   .post(`${API}desc/${5}`, fd)
   .then((response) => {
    console.log(response);
   })
   .catch((err) => {
    console.log(err);
   });
 };
 handleRemoveGalleryItem = (index) => {
  const removeSrc = this.state.galleryItmes[index].src;
  this.setState({
   galleryItmes: this.state.galleryItmes.filter((item) => {
    return item?.src !== removeSrc;
   }),
  });
 };
 hide = () => {
  this.setState({
   visible: false,
  });
 };
 handleVisibleChange = (visible) => {
  this.setState({
   visible,
  });
 };

 render() {
  return (
   <div id="product-files-step">
    <div className="next-wrapper">
     <div
      className="next-inner"
      style={{
       maxWidth: "1000px",
      }}
     >
      <button
       onClick={this.skip}
       className="prev-btn"
       style={{ margin: "0 0px", position: "relative" }}
      >
       Skip
      </button>
      <button
       className="next-btn"
       style={{
        top: "-110px",
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
     </div>
    </div>

    <Tabs
     forceRenderTabPanel={true}
     onSelect={(index) => this.setState({ index })}
     selectedIndex={this.state.index}
     //  selectedIndex={3}
    >
     <div id="tabs-desc-wrapper">
      <TabList>
       <Tab>Overview *</Tab>
       <Tab>Material Description</Tab>
       <Tab>Dimensions</Tab>
       <Tab>Photo Gallery</Tab>
       <Tab>Videos</Tab>
       <span className="learn-more">Learn how to add description</span>
      </TabList>
     </div>

     <TabPanel forceRender>
      <>
       <div className="text-editor">
        <CKEditor
         config={{
          initialData:
           this.state.overViewEditorState?.length > 0
            ? this.state.overViewEditorState
            : "",

          toolbarLocation: "bottom",
          toolbar: {
           location: "bottom",
           items: [
            "Heading",
            "|",
            "Autoformat",
            "|",
            "bold",
            "italic",
            "Indent",
            "|",
            "Link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "BlockQuote",
            "|",
            "insertTable",
            "|",
            "undo",
            "redo",
           ],
          },
         }}
         editor={ClassicEditor}
         onChange={(event, editor) => {
          console.log(editor.getData());
          this.setState({
           overViewEditorState: editor.getData(),
           stateChanged: true,
          });
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
      <>
       <div className="text-editor">
        <CKEditor
         config={{
          initialData:
           this.state.materialDesceditorState?.length > 0
            ? this.state.materialDesceditorState
            : "",
          extraPlugins: [uploadPlugin],
          toolbarLocation: "bottom",
          toolbar: {
           location: "bottom",
          },
         }}
         editor={ClassicEditor}
         onChange={(event, editor) => {
          this.setState({
           materialDesceditorState: editor.getData(),
           stateChanged: true,
          });
          console.log(editor.getData());
         }}
        />
       </div>
      </>
     </TabPanel>
     <TabPanel forceRender>
      <>
       <div className="text-editor">
        <CKEditor
         config={{
          initialData:
           this.state.sizeDescEditorState?.length > 0
            ? this.state.sizeDescEditorState
            : "",
          extraPlugins: [uploadPlugin],
          toolbarLocation: "bottom",
          toolbar: {
           location: "bottom",
          },
         }}
         editor={ClassicEditor}
         onChange={(event, editor) => {
          console.log(editor.getData());
          this.setState({
           sizeDescEditorState: editor.getData(),
           stateChanged: true,
          });
         }}
        />
       </div>
      </>
     </TabPanel>

     <TabPanel forceRender>
      {/* <DescGallery /> */}
      <div
       className="tab-form-content"
       style={{ position: "relative", padding: "135px 0px 75px 126px" }}
       id="gallery"
      >
       <div
        className="files-previews"
        style={{
         gridTemplateColumns: "repeat(4, 25%) ",
        }}
       >
        {this.state.galleryItmes?.map((item, index) => {
         return (
          <>
           {item?.type !== "video" && (
            <div className="gallery-item">
             <img src={item?.src} alt="" />
             <button
              className="delbutton"
              onClick={() => {
               this.handleRemoveGalleryItem(index);
              }}
             >
              Delete
             </button>
             {item?.loaded >= 0 && item?.loaded < 100 && (
              <Progress
               style={{
                position: "absolute",
                top: "33px",
                left: "22px",
               }}
               type="circle"
               percent={item?.loaded}
               width={item?.loaded < 100 ? 35 : 1}
               strokeWidth={12}
               trailColor="#666666"
               strokeColor="#fff"
               success={{
                percent: 0,
                strokeColor: "transparent",
               }}
              />
             )}
            </div>
           )}
          </>
         );
        })}
       </div>
       <div className="tab-head">
        <h2>Add product Gallery</h2>
        <div className="tip">
         Add photos of the product or projects where the product featured.
        </div>
        <div className="bold-tip">
         You can skip if informations not available
        </div>
        <div className="file-icons-tabs" style={{ position: "relative" }}>
         <span
          className="red-bg"
          style={{
           position: "relative",
          }}
         >
          <FaCloudUploadAlt className="m-auto" />

          <Input
           type="file"
           accept="image/*"
           multiple
           onChange={this.addImages}
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
        </div>
       </div>
      </div>
     </TabPanel>
     <TabPanel forceRender>
      <div
       className="tab-form-content"
       style={{ position: "relative", padding: "135px 0px 75px 126px" }}
       id="gallery"
      >
       <div
        className="files-previews"
        style={{
         gridTemplateColumns: "repeat(4, 25%) ",
        }}
       >
        {this.state.vidoes?.map((item, index) => {
         return (
          <div className="gallery-item">
           <ReactPlayer url={item} width={"100%"} height={"100%"} />
           <button
            className="delbutton"
            onClick={() => {
             this.handleRemoveGalleryItem(index);
            }}
           >
            Delete
           </button>
          </div>
         );
        })}
       </div>
       <div className="tab-head">
        <h2>Add products videos</h2>
        <div className="tip">
         You can embed videos from YouTube, Vimeo, DailyMotion, Tencent Video
         (QQ), Youku, iQiyi
        </div>
        <div className="bold-tip">
         You can skip if informations not available
        </div>
        <div className="file-icons-tabs" style={{ position: "relative" }}>
         <span className="gray-bg">
          <Popover
           content={
            <Input
             value={this.state.url}
             onChange={(e) => {
              this.setState({ url: e.target.value });
             }}
            />
           }
           title={
            <>
             <button onClick={this.addVideoUrl}>ADD</button>
            </>
           }
           trigger="click"
           visible={this.state.visible}
           onVisibleChange={this.handleVisibleChange}
          >
           <RiCodeSSlashFill
            className="m-auto"
            onClick={this.embedModal_open}
           />
          </Popover>
         </span>
        </div>
       </div>
      </div>
     </TabPanel>
    </Tabs>
    <Modal
     id="price-request-modal"
     className="arch-wide-modal product-modal pics-modal"
     size="md"
     show={this.state.skip_modal}
     onHide={this.skip_modal_close}
     aria-labelledby="example-modal-sizes-title-lg"
    >
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
   </div>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 //  dispatchDescriptionStep: (data, id) => dispatch(productDescription(data, id)),
 dispatchDescriptionStep: (description) =>
  dispatch(productDescription(description)),
 dispatchNextStep: () => dispatch(nextTab()),
});
const mapStateToProps = (state) => ({
 loading: state.addProduct.loading,
 _description: state.addProduct.description,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductFiles);
