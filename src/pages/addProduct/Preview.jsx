import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Row, Col, Divider, Tabs, Select } from "antd";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Cropper from "react-cropper";

import axios from "axios";
import { API } from "./../../utitlties";
import { connect } from "react-redux";

// import { Tabs, Radio, Space } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

class Preview extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();

  this.state = {
   loading: false,
   product_options: null,
   active: 0,
   product_covers: [],
   cropper_imgs: this.props.options,
   product_identity: this.props.identity,
   cropped_cover: "",
   published: false,
   displayName: this.props.identity.name,
   displayPrice: this.props.displayPrice,
   img: null,
   initialized: false,
   covers: this.props.options,
  };
 }
 onCropperInit = (cropper) => {
  this.cropper = cropper;
 };
 handleDisplayNameChange = (e) => {
  if (e.target.value === "") {
   this.setState({ displayName: " " });
  } else {
   this.setState({ displayName: e.target.value });
  }
 };
 componentDidMount() {
  console.log(this.props.displayPrice);
  axios
   .get(`${API}product/${this.props.id}`)
   .then((response) => {
    console.log(response);
    const product = response.data.product;
    this.setState({
     product_identity: product.identity[0],
     covers: product.option[1]?.cover,
     displayName: product.identity[0].name,
     //  product_covers: product.options[1].cover,
     //  product_options: product.options,
     //  img: product.options[1].cover[0],
     //  displayPrice: product.options[1].price ?? "",
    });
   })
   .catch((err) => {
    console.log(err);
   });

  // console.log(this.props.identity);
  // console.log(this.props.options);
  // console.log(this.props.options);

  this.setState({
   active: this.props?.options[0]?.url,
   covers: this.props.options,
  });
  console.log(this.props.options);
 }

 onCropChange = (crop) => {
  this.setState({ crop });
 };
 _crop() {
  const imageElement = this.cropperRef?.current;
  const cropper = imageElement?.cropper;
  let cropped = cropper.getCroppedCanvas()?.toDataURL();
  this.setState({ cropped_cover: cropped });
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
    this.setState({ published: true });
   })
   .catch((err) => console.log(err));
 };
 handleClickThumb = (index) => {
  console.log(this.state.img);
  this.setState({ active: this.props.options[index].url });
  // console.log()
 };
 handleDisplayPriceChange = (e) => {
  this.setState({ displayPrice: e });
 };
 render() {
  const covers = this.props.options;
  if (this.state.published) {
   return <Redirect to={{ pathname: `/product/${this.props.id}` }} />;
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
        <ClipLoader
         style={{ height: "20px" }}
         color="#ffffff"
         loading={this.state.loading}
         size={18}
        />
       ) : (
        "Publish"
       )}
      </button>

      <Tabs tabPosition="bottom">
       {covers?.map((cover, index) => {
        return (
         <>
          <TabPane
           tab={
            <>
             <div key={index} onClick={() => this.handleClickThumb(index)}>
              <img
               src={cover.url}
               alt=""
               style={{ width: "100%", height: "100%", display: "block" }}
              />
             </div>
            </>
           }
           key={index}
          >
           <Row span={24}>
            <Col md={9} id="right-side">
             <div id="preview-wrapper">
              <div className={"preview image-preview-" + index}></div>
             </div>
             <div className="preview-store">Kelly Wearstler</div>
             <div className="preview-name">
              {this.state.displayName ?? this.props.identity.name}
             </div>
             <div className="preview-price">¥ {this.state.displayPrice}</div>
            </Col>
            <Col md={1}>
             <Divider type="vertical" style={{ height: "200px" }} />
            </Col>
            <Col md={13} id="left-side">
             <div id="preview-cropper">
              <div className="img-box" style={{ background: "transparent" }}>
               <Cropper
                src={cover.url}
                image={cover.url}
                style={{ height: "100%", width: "100%", minWidth: "350px" }}
                // Cropper.js options
                ref={this.cropperRef}
                initialAspectRatio="free"
                // guides={false}
                cropend={this._crop.bind(this)}
                ready={this._crop.bind(this)}
                crossOrigin="anonymous"
                preview={`.image-preview-${index}`}
                aspectRatio={"free"}
                autoCropArea={1}
                viewMode={1}
                dragMode="move"
               />
              </div>
             </div>
            </Col>
           </Row>
          </TabPane>
         </>
        );
       })}
      </Tabs>
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
          {/* {this.state.product_options?.map((option, index) => { */}
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
 rows: state.optionsPrice.rows,
 options: state.optionsPrice?.rows[0]?.productPictures ?? [],
 displayPrice: state.optionsPrice?.rows[0]?.price ?? "",
 identity: state.addProduct?.identity,
});
export default connect(mapStateToProps, null)(Preview);
