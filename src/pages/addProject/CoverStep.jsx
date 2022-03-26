import React, { Component } from "react";
import { Row, Col, Input } from "antd";
import { connect } from "react-redux";
import Cropper from "react-cropper";
import slide from "../../../src/slide1.jpg";
import "cropperjs/dist/cropper.css";
import { ImLocation } from "react-icons/im";

class CoverStep extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();

  this.state = {
   slides: this.props.covers,
   cropped_cover: "",
   active: slide,
   displayName: this.props.info?.name,
  };
 }

 _crop() {
  const imageElement = this.cropperRef?.current;
  let cropper = imageElement?.cropper;

  let cropped = cropper.getCroppedCanvas().toDataURL();
  this.setState({ cropped_cover: cropped });
 }
 changeImg = (index) => {
  const imageElement = this.cropperRef?.current;
  let cropper = imageElement?.cropper;

  cropper.replace(this.state.slides[index], true);
 };
 onChange = (a, b, c) => {
  console.log(a, b, c);
 };
 componentDidMount() {
  console.log(this.props.covers);
  console.log(this.props.info?.year?._d.getFullYear());
 }
 render() {
  return (
   <>
    <div id="project-cover-step" className="p-3 py-5">
     <Row span={24} gutter={25}>
      <Col md={8}>
       <div className="border">
        <div className="prev"></div>
        <div className="project-desc text-left" style={{ textAlign: "left" }}>
         <div className="project-name mb-2 mt-2">
          <h4>{this.state.displayName}</h4>
         </div>
         <div className="project-category">
          <p className="mb-1">
           <ImLocation
            style={{
             display: "inline-block",
             verticalAlign: "center",
             margin: "2px 3px 3px -2px ",
            }}
           />
           {`${this.props.info?.country}, ${
            this.props.info?.city
           } | ${this.props.info?.year?._d.getFullYear()}`}
          </p>
         </div>
         <div className="pl-3" style={{ width: "95%", margin: "auto" }}>
          <hr className="m-0 p-0 " />
         </div>
         <div className="project-type d-flex justify-content-start align-items-center">
          <p className="mr-1"> Interior design </p>
          <p className="mr-1 ml-1"> Architecture </p>
          <p className="mr-1 ml-1"> Restaurant </p>
         </div>
        </div>
       </div>
       {/* <div className="prev"></div> */}
      </Col>
      <Col md={16}>
       <div className="cropper-side">
        <Cropper
         aspectRatio={1.5}
         //   src={this.state.preview_src ?? ""}
         src={this.state.slides[0]}
         viewMode={1}
         style={{ height: "100%", width: "94%" }}
         // Cropper.js options
         ref={this.cropperRef}
         cropend={this._crop.bind(this)}
         ready={this._crop.bind(this)}
         crossOrigin="anonymous"
         preview=".prev"
         autoCropArea={1}
         dragMode="move"
         cropBoxMovable={false}
         cropBoxResizable={true}
        />
       </div>
       <div className="cover-thumbs">
        {this.state.slides.map((c, index) => {
         return (
          <div
           onClick={() => {
            this.changeImg(index);
           }}
           style={{
            backgroundImage: `url(${c})`,
           }}
          ></div>
         );
        })}
       </div>
       <div className="my-5 py-3">
        <Row justify="center" gutter={25}>
         <Col md={4}>
          <span className="form-label">Project Name</span>
         </Col>
         <Col md={12}>
          <Input
           size="large"
           value={this.state.displayName}
           placeholder="Display Name"
           onChange={(e) => this.setState({ displayName: e.target.value })}
          />
         </Col>
        </Row>
       </div>
      </Col>
     </Row>
    </div>
   </>
  );
 }
}

const mapStateToProps = (state) => {
 return {
  covers: state.project.project_covers,
  info: state.project.project_info,
 };
};
export default connect(mapStateToProps)(CoverStep);
