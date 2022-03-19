import React, { Component } from "react";
// import "cropperjs/dist/cropper.css";
import imageCompression from "browser-image-compression";

import {
 Row,
 Col,
 //  Form as AntForm,
 Input as AntInput,
} from "antd";
import en from "world_countries_lists/data/en/world.json";
import "../../src/pages/Brand.css";
import * as utility from "../utitlties";
import axios from "axios";
import Cropper from "react-cropper";
import { API } from "./../utitlties";

const compressImage = async (imageFile) => {
 const options = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 500,
  useWebWorker: true,
 };
 try {
  const compressedFile = await imageCompression(imageFile, options);
  console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
  console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
  return compressedFile;
 } catch (error) {
  throw new Error(error);
 }
};

class TestCrop extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();

  this.state = {
   fileSelected: null,
   brand_cover: "",
   setting_cover: false,
   loading_cover: false,
   cropper_src: "",
   cover: "",
   brand_id: 35,
  };
 }
 handleChangeCover = async () => {
  const fd = new FormData();
  fd.append("store_id", this.state.brand_id);
  fd.append(
   "brand_cover",
   await compressImage(this.dataURLtoFile(this.state.brand_cover, "file"))
  );
  axios
   .post(`${API}brandcover`, fd)
   .then((resp) => {
    this.setState({
     loading_cover: false,
     cover: resp.data.brand.cover,
     setting_cover: false,
    });
    this.setState((state) => ({
     store: { ...state.store, cover: resp.data.brand.cover },
    }));
    console.log(resp);
   })
   .catch((err) => {
    console.log(err);
   });
 };
 _crop() {
  setTimeout(() => {
   const imageElement = this.cropperRef?.current;
   const cropper = imageElement?.cropper;
   let cropped = cropper.getCroppedCanvas().toDataURL();

   this.setState({ brand_cover: cropped });
  });
 }
 onChangeInput = (e) => {
  console.log(e.target.files[0].size);
  this.setState({ fileSelected: e.target.files[0] });
 };
 async uploadFile(event) {
  const imageFile = event.target.files[0];
  // const imageFile = this.state.fileSelected;
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
   maxSizeMB: 1,
   maxWidthOrHeight: 1920,
   useWebWorker: true,
  };
  try {
   const compressedFile = await imageCompression(imageFile, options);
   console.log(
    "compressedFile instanceof Blob",
    compressedFile instanceof Blob
   ); // true
   console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

   console.log(compressedFile);
  } catch (error) {
   console.log(error);
  }
 }
 hanldleUploadBrandCover = (e) => {
  console.log(e);
  let file = e.target.files[0];
  if (!file) {
   return;
  }
  if (file.size > 1048576 * 1.5) {
   console.log("Size is to Large");
   return;
  } else {
   this.setState({
    cropper_src: URL.createObjectURL(file),
    setting_cover: true,
   });
  }
 };
 //  }
 render() {
  return (
   <>
    <div style={{ maxWidth: "1300px", margin: "auto" }}>
     <Row>
      <Col span={24}>
       <div className="brand-cover-new">
        {this.state.setting_cover && (
         <>
          <Cropper
           id="brandcovercropper"
           src={this.state.cropper_src ?? ""}
           viewMode={0}
           style={{
            height: "100%",
            width: "100%",
           }}
           // Cropper.js options
           ref={this.cropperRef}
           cropend={this._crop.bind(this)}
           ready={this._crop.bind(this)}
           crossOrigin="anonymous"
           aspectRatio={16 / 6}
           autoCropArea={1}
           //  v
           responsive
           dragMode="move"
           //  zoom={3}
           movable={true}
           data={{
            x: 0,
            y: 0,
            //  width: 1290,
            //  height: 1000,
           }}
           toggleDragModeOnDblclick={false}
           cropBoxMovable={true}
           // cropBoxResizable={true}
           // wheelZoomRatio
          />
         </>
        )}
        {this.state.cover && (
         <>
          <img src={this.state.cover} alt="" />
         </>
        )}
        {!this.cover && (
         <>
          <div className="uplpoadbrandcover">
           <button>
            UPLODA COVER
            <input
             type="file"
             onChange={(e) => this.hanldleUploadBrandCover(e)}
            />
           </button>
          </div>
         </>
        )}
       </div>

       {this.state.setting_cover ? (
        <>
         <button
          className="setbrandcover"
          onClick={() => this.handleChangeCover()}
         >
          SET
         </button>
        </>
       ) : //  <button>Change</button>
       this.state.cropper_src ? (
        <>
         <button className="changebrandcover">CHANGE</button>
        </>
       ) : (
        ""
       )}
      </Col>
     </Row>
    </div>
   </>
  );
 }
}

export default TestCrop;
