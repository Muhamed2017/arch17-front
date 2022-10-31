import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Row, Col, Select, Checkbox } from "antd";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Cropper from "react-cropper";
import { compressImage } from "./OptionsPrice";
import axios from "axios";
import { API } from "./../../utitlties";
import { connect } from "react-redux";
import { FaCloudUploadAlt } from "react-icons/fa";

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
   cropped_cover: null,
   cropped_previews: [],
   published: false,
   covers: this.props.covers?.map((cover) => {
    return cover.covers;
   }),
   prices:
    this.props.pricesOptions?.length > 0
     ? this.props.pricesOptions
     : this.props.covers?.map((cover) => {
        if (cover.price > 0) return cover.price;
       }),
   displayName:
    this.props?.identity?.name.length > 0
     ? this.props.identity.name
     : this.props.initialDisplayName,
   displayPrice: this.props.edit ? this.props.initialDisplayPrice : null,
   preview_src: this.props.edit ? this.props.initialPreviewCover : null,
   inputValue: 0,
   aspectRatio: "free",
   edit: this.props?.edit ?? false,
   options_covers: this.props?.options_covers,
   selected_index: 0,
  };
 }

 handleChangeAspRtio = (e) => {
  const imageElement = this.cropperRef?.current;
  const cropper = imageElement?.cropper;

  if (e.target.checked) {
   cropper.setAspectRatio(1);
  } else {
   cropper.setAspectRatio("free");
  }
  let cropped = cropper?.getCroppedCanvas()?.toDataURL();

  this.setState({ cropped_cover: cropped });
 };

 onZoomChange = (value) => {
  this.setState({
   inputValue: value,
  });
 };

 handleDisplayNameChange = (e) => {
  if (e.target.value === "") {
   this.setState({ displayName: "" });
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
   this.setState({ preview_src: URL.createObjectURL(file) });
  }
 };

 componentDidMount() {
  console.log(this.props);
  this.setState({
   active: this.props?.options[0]?.url,
   covers:
    this.props.options_covers?.length > 0 ? this.props.options_covers : [],
  });
 }

 _crop() {
  const imageElement = this.cropperRef?.current;
  const cropper = imageElement?.cropper;
  let cropped = cropper.getCroppedCanvas()?.toDataURL();
  this.setState({ cropped_cover: cropper.getCroppedCanvas()?.toDataURL() });

  this.setState({ cropped_cover: cropped });
  cropped_imgs.push(cropped);
  this.setState({ cropped_previews: cropped_imgs });
 }
 replaceImg(src, selected_index) {
  const imageElement = this.cropperRef?.current;
  const cropper = imageElement?.cropper;
  cropper.replace(src);
  this.setState({
   selected_index,
  });
 }

 handlePreview = (c) => {
  this.setState({ active: c.target.currentSrc });
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
 handlePublishProduct = async (e) => {
  e.preventDefault();
  if (this.state.cropped_cover) {
   this.setState({ loading: true });

   const fd = new FormData();
   fd.append("preview_price", this.state.displayPrice);
   fd.append("identity_id", this.state.product_identity?.id ?? this.props.id);
   fd.append("display_name", this.state.displayName);
   fd.append(
    "preview_cover",
    await compressImage(
     this.dataURLtoFile(this.state.cropped_cover, "preview_cover")
    )
    // this.dataURLtoFile(this.state.cropped_cover, "preview_cover")
   );

   axios
    .post(`${API}preview`, fd)
    .then((response) => {
     this.setState({ published: true, loading: false });
    })
    .catch((err) => {
     this.setState({ published: true, loading: false });
    });
  } else {
   return;
  }
 };

 handleDisplayPriceChange = (e) => {
  this.setState({ displayPrice: e });
 };
 render() {
  if (this.state.published && !this.state.loading) {
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
      <div className="next-wrapper">
       <div
        className="next-inner"
        style={{
         maxWidth: "1000px",
        }}
       >
        <button
         className="next-btn"
         style={{
          top: "-110px",
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
       </div>
      </div>

      <Row>
       <Col span={10} className="pt-4">
        <>
         <div className="preview-wrapper">
          <div className={"preview image-preview"}></div>
         </div>
         <div className="preview-store">
          {this.props?.identity?.store_name?.store_name}
         </div>
         <div className="preview-name">
          {this.state.displayName ?? this.props?.identity?.name}
         </div>
         <div className="product-price">
          <span>
           {this.state.displayPrice > 0 ? (
            <span
             style={{
              color: "red",
              padding: "0 0 0 5px",
             }}
            >
             ¥ {this.state.displayPrice}
            </span>
           ) : (
            ""
           )}
          </span>
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
           src={this.state.preview_src}
           viewMode={1}
           style={{ height: "100%", width: "94%" }}
           ref={this.cropperRef}
           cropend={this._crop.bind(this)}
           ready={this._crop.bind(this)}
           crossOrigin="Anonymous"
           checkCrossOrigin={false}
           checkOrientation={false}
           preview=".image-preview"
           aspectRatio={this.state.aspectRatio}
           autoCropArea={1}
           dragMode="move"
           cropBoxMovable={false}
           cropBoxResizable={true}
           zoom={this.state.inputValue}
          />
         </div>
        </>
        <div className="preview-options">
         {this.state.covers?.map((option, index) => {
          if (option.src) {
           return (
            <>
             <div
              onClick={() => this.replaceImg(option.src, index)}
              className={`preview-box ${
               this.state.selected_index === index ? "selected" : ""
              }`}
              style={{
               backgroundImage: `url("${option?.src}")`,
              }}
             >
              {/* <img
               src={option.src}
               alt="preview"
              /> */}
             </div>
            </>
           );
          }
         })}
         <div className="upload-side-box">
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
            ? this.props?.identity?.name
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
          showArrow={true}
          size="large"
          value={
           this.state.displayPrice != "null" ? this.state.displayPrice : ""
          }
          onChange={this.handleDisplayPriceChange}
          optionLabelProp="label"
         >
          {this.state.prices?.length > 0 && (
           <>
            {this.state.prices?.map((price) => {
             return <Option value={price} label={price} key={price}></Option>;
            })}
           </>
          )}
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

const mapStateToProps = (state) => ({
 loading: state.addProduct.loading,
 rows: state.optionsPrice.rows,
 options: state?.optionsPrice?.rows?.productPictures ?? [],
 displayPrice: state.optionsPrice?.rows?.price ?? "",
 identity: state.addProduct?.identity,
 options_covers: state.addProduct?.covers,
 pricesOptions: state.addProduct.prices,
});
export default connect(mapStateToProps, null)(Preview);
