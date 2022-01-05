import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
 Row,
 Col,
 Divider,
 Tabs,
 Select,
 Slider,
 InputNumber,
 Checkbox,
} from "antd";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Cropper from "react-cropper";

import axios from "axios";
import { API } from "./../../utitlties";
import { connect } from "react-redux";

// import { Tabs, Radio, Space } from 'antd';
import { FaCloudUploadAlt } from "react-icons/fa";

const { TabPane } = Tabs;
const { Option } = Select;
const cropped_imgs = [];

class Preview extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();

  this.state = {
   loading: false,
   product_options: null,
   product_identity: this.props.identity,
   cropped_cover: "",
   cropped_previews: [],
   published: false,
   displayName: this.props.identity.name,
   displayPrice: this.props.displayPrice,
   preview_src: null,
   inputValue: 0,
   aspectRatio: "free",
  };
 }

 //  onCropperInit = (cropper) => {
 //   this.cropper = cropper;
 //  };

 handleChangeAspRtio = (e) => {
  const imageElement = this.cropperRef?.current;
  const cropper = imageElement?.cropper;
  if (e.target.checked) {
   cropper.setAspectRatio(1);
  } else {
   cropper.setAspectRatio("free");
  }
 };
 onZoomChange = (value) => {
  this.setState({
   inputValue: value,
  });
  // const imageElement = this.cropperRef?.current;
  // const cropper = imageElement?.cropper;
  // cropper.zoom(value * 0.1);
  console.log(value);
 };
 handleDisplayNameChange = (e) => {
  if (e.target.value === "") {
   this.setState({ displayName: " " });
  } else {
   this.setState({ displayName: e.target.value });
  }
 };

 handleOnChangePreviewCover = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 1048576 * 1.5) {
   console.log("Size is to Large");
   return;
  } else {
   const fd = new FormData();
   this.setState({ preview_src: URL.createObjectURL(file) });
  }
 };
 componentDidMount() {
  console.log(this.state.previews);
  console.log(this.props.options_covers);
  console.log(this.props);

  this.setState({
   active: this.props?.options[0]?.url,
   covers: this.props.options,
  });
 }

 onCropChange = (crop) => {
  this.setState({ crop });
 };
 _crop() {
  const imageElement = this.cropperRef?.current;
  const cropper = imageElement?.cropper;
  let cropped = cropper.getCroppedCanvas()?.toDataURL();

  this.setState({ cropped_cover: cropped });
  cropped_imgs.push(cropped);
  this.setState({ cropped_previews: cropped_imgs });
 }
 replaceImg(src) {
  const imageElement = this.cropperRef?.current;
  const cropper = imageElement?.cropper;
  cropper.replace(src);
 }
 onCropComplete = (croppedArea, croppedAreaPixels) => {
  console.log(croppedArea, croppedAreaPixels);
 };

 handlePreview = (c) => {
  this.setState({ active: c.target.currentSrc });
  console.log(c);
 };

 dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
   mime = arr[0].match(/:(.*?);/)[1],
   bstr = atob(arr[1]),
   n = bstr.length,
   u8arr = new Uint8Array(n);

  while (n--) {
   u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
 };
 handlePublishProduct = (e) => {
  this.setState({ loading: true });

  e.preventDefault();
  const fd = new FormData();

  fd.append("prreview_price", this.state.displayPrice);
  fd.append("identity_id", this.state.product_identity.id);
  fd.append("display_name", this.state.displayName);
  fd.append(
   "preview_cover",
   this.dataURLtoFile(this.state.cropped_cover, "file")
  );
  axios
   .post(`${API}preview`, fd)
   .then((response) => {
    console.log(response);
    this.setState({ published: true, loading: false });
   })
   .catch((err) => {
    this.setState({ published: true, loading: false });
   });
  this.setState({ loading: false });
 };
 handleClickThumb = (index) => {
  console.log(this.state.img);
  // this.setState({ active: this.props.options[index].url });
  // console.log()
 };
 handleDisplayPriceChange = (e) => {
  this.setState({ displayPrice: e });
 };
 render() {
  if (this.state.published) {
   return (
    <Redirect
     to={{
      pathname: `/product/${this.props.id ?? this.props.identity.product_id}`,
     }}
    />
   );
  } else {
   return (
    <React.Fragment>
     <div className="step-form preview">
      <button
       className="save-product-step-btn"
       style={{
        top: "-110px",
        height: "20px",
        background: this.state.loading ? "#898989" : "",
       }}
       onClick={this.handlePublishProduct}
      >
       {this.state.loading ? (
        <ClipLoader color="#ffffff" loading={true} size={18} />
       ) : (
        "Publish"
       )}
      </button>

      <Row>
       <Col span={12} className="pt-4">
        {/* {this.state.preview_src && ( */}
        <>
         <div id="preview-wrapper">
          <div className={"preview image-preview"}></div>
         </div>
         <div className="preview-store">Kelly Wearstler</div>
         <div className="preview-name">
          {this.state.displayName ?? this.props.identity.name}
         </div>
        </>
       </Col>

       <Col span={12}>
        <>
         <Checkbox onChange={(e) => this.handleChangeAspRtio(e)}>
          Square
         </Checkbox>

         <div className="img-box">
          <Cropper
           src={this.state.preview_src ?? ""}
           viewMode={1}
           style={{ height: "100%", width: "100%" }}
           // Cropper.js options
           ref={this.cropperRef}
           //  initialAspectRatio="free"
           //  guides={false}
           cropend={() => {
            this._crop.bind(this);
           }}
           ready={this._crop.bind(this)}
           crossOrigin="anonymous"
           preview=".image-preview"
           //  scalable={false}
           // aspectRatio={"free"}
           aspectRatio={this.state.aspectRatio}
           autoCropArea={1}
           dragMode="move"
           //  rotatable={false}
           cropBoxMovable={false}
           cropBoxResizable={true}
           // zoomable
           zoom={this.state.inputValue}
           //  zoom={this.state.inputValue}
          />
         </div>
         {/* <Slider
          min={-10}
          max={10}
          // current={0}
          onChange={(value) => this.onZoomChange(value)}
          value={
           typeof this.state.inputValue === "number" ? this.state.inputValue : 0
          }
         /> */}
        </>
        {/* )} */}
        <div className="preview-options">
         {this.props.options_covers?.map((option, index) => {
          return (
           <>
            <div>
             <img
              src={option.src}
              alt="preview"
              onClick={() => this.replaceImg(option.src)}
             />
            </div>
           </>
          );
         })}
         <div
          className="upload-side-box"
          style={{
           background: "#ccc",
           border: "1px dashed #666",
           color: "#666",
           textAlign: "center",
           padding: "10px",
           position: "relative",
          }}
         >
          <input
           type="file"
           style={{
            position: "absolute",
            top: "0",
            right: "0",
            left: "0",
            bottom: "0",
            width: "100%",
            height: "100%",
            opacity: "0",
            cursor: "pointer",
           }}
           onChange={(e) => this.handleOnChangePreviewCover(e)}
          />
          <FaCloudUploadAlt />
         </div>
        </div>
       </Col>
      </Row>
      <div className="p-5">
       <Row md={12} style={{ justifyContent: "flex-end" }}>
        <Col md={4}>
         <Form.Label>Display Name</Form.Label>
        </Col>
        <Col md={8}>
         <Form.Control
          placeholder="Display Name"
          onChange={this.handleDisplayNameChange}
          value={
           !this.state.displayName
            ? this.props.identity.name
            : this.state.displayName
          }
         />
        </Col>
       </Row>
       <Row md={12} className="my-5" style={{ justifyContent: "flex-end" }}>
        <Col md={4}>
         <Form.Label>Display Price</Form.Label>
        </Col>
        <Col md={8}>
         <Select
          listHeight={350}
          style={{ width: "100%" }}
          allowClear={true}
          showArrow={true}
          // placeholder="Available Prices"
          size="large"
          value={this.state.displayPrice}
          onChange={this.handleDisplayPriceChange}
          optionLabelProp="label"
         >
          {this.props.rows?.map((option, index) => {
           //  if (option.cover) {
           return (
            <>
             <Option
              value={option.price ?? ""}
              label={option.price ?? ""}
              key={index}
             >
              <div className="demo-option-label-item">
               <span role="img" aria-label={option?.price}></span>
               {option?.price}
              </div>
             </Option>
            </>
           );
           //  }
          })}
         </Select>
        </Col>
       </Row>
      </div>
     </div>
    </React.Fragment>
   );
  }
 }
}

// const mapDispatchToProps = (dispatch) => ({});
const mapStateToProps = (state) => ({
 loading: state.addProduct.loading,
 //  test: state,
 rows: state.optionsPrice.rows,
 options: state?.optionsPrice?.rows?.productPictures ?? [],
 displayPrice: state.optionsPrice?.rows?.price ?? "",
 identity: state.addProduct?.identity,
 options_covers: state.optionsPrice?.covers,
});
export default connect(mapStateToProps, null)(Preview);
