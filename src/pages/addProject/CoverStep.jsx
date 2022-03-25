import React, { Component } from "react";
import { Row, Col, Input } from "antd";
import { connect } from "react-redux";
import Cropper from "react-cropper";
import slide from "../../../src/slide1.jpg";
import "cropperjs/dist/cropper.css";

class CoverStep extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();

  this.state = {
   //    slides: [slide, slide2, slide3],
   slides: this.props.covers,
   cropped_cover: "",
   active: slide,
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

  cropper.replace(this.state.slides[index]);
 };
 onChange = (a, b, c) => {
  console.log(a, b, c);
 };
 componentDidMount() {
  console.log(this.props.covers);
 }
 render() {
  return (
   <>
    <div id="project-cover-step" className="p-3 py-5">
     <Row span={24} gutter={25}>
      <Col md={8}>
       <div className="prev"></div>
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
      </Col>
     </Row>
     <Row justify="end" className="my-5">
      <Col md={8}>
       <Input size="large" placeholder="Display Name" />
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
 };
};
export default connect(mapStateToProps)(CoverStep);
