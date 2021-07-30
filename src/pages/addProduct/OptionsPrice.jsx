import React, { Component, useRef } from "react";
import {
 FaCloudUploadAlt,
 FaPlus,
 FaTrashAlt,
 FaCube,
 FaArrowRight,
 FaArrowLeft,
 FaArrowDown,
 FaArrowUp,
} from "react-icons/fa";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import slide4 from "../../../src/slide4.jpg";

class OptionsPrice extends Component {
 state = {
  src: "",
 };

 _crop() {
  // image in dataUrl
  console.log(this.cropper.getData());
 }
 onCropperInit = (cropper) => {
  this.cropper = cropper;
 };
 onChange(e) {
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
   files = e.dataTransfer.files;
  } else if (e.target) {
   files = e.target.files;
  }
  const reader = new FileReader();
  reader.onload = () => {
   //   this.setState({ src: reader.result });
   this.setState({ src: slide4 });
  };
  reader.readAsDataURL(files[0]);
 }
 state = {
  modals: {
   pics_modal: false,
   material_modal: false,
   size_modal: false,
   price_modal: false,
   offer_modal: false,
  },
 };

 pics_open = () => {
  this.setState({ pics_modal: true });
 };

 pics_close = () => {
  this.setState({ pics_modal: false });
 };

 material_open = () => {
  this.setState({ material_modal: true });
 };

 material_close = () => {
  this.setState({ material_modal: false });
 };

 size_open = () => {
  this.setState({ size_modal: true });
 };

 size_close = () => {
  this.setState({ size_modal: false });
 };

 price_open = () => {
  this.setState({ price_modal: true });
 };

 price_close = () => {
  this.setState({ price_modal: false });
 };

 offer_open = () => {
  this.setState({ offer_modal: true });
 };

 offer_close = () => {
  this.setState({ offer_modal: false });
 };

 render() {
  return (
   <React.Fragment>
    <div className="step-form">
     <div className="step-head">
      <h5>Options & Price</h5>
     </div>
     <div id="options-wrapper">
      <table>
       <thead>
        <tr>
         <th>Picture</th>
         <th>Material</th>
         <th>
          {" "}
          <span>
           <input type="checkbox" />
          </span>
          Size
         </th>
         <th>
          <span>
           <input type="checkbox" />
          </span>
          Price
         </th>
         <th>
          <span>
           <input type="checkbox" />
          </span>
          Offer Price
         </th>
         <th>Quantity</th>
         <th>Delete</th>
        </tr>
       </thead>
       <tbody>
        <tr>
         <td onClick={this.pics_open}>
          <FaCloudUploadAlt />
          <div className="under-link underline">Upload Images</div>
         </td>
         <td>
          <FaPlus onClick={this.material_open} />
         </td>
         <td>
          <FaPlus onClick={this.size_open} />
         </td>
         <td>
          <FaPlus onClick={this.price_open} />
         </td>
         <td>
          <FaPlus onClick={this.offer_open} />
         </td>
         <td>
          <Form.Control placeholder="" />
         </td>
         <td className="trash-icon">
          <FaTrashAlt />
         </td>
        </tr>
       </tbody>
      </table>
      <div className="add-option-btn">
       <div className="icon">
        <FaPlus />
       </div>
       <div className="under-link">Add Option</div>
      </div>
     </div>
    </div>

    <>
     <Modal
      id="price-request-modal"
      className="arch-wide-modal product-modal pics-modal"
      size="lg"
      show={this.state.pics_modal}
      onHide={() => this.pics_close()}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       <div className="option-add-label">Product Picuters</div>
       <div className="sub-head">
        Choose the corresponding view of the photo you want to upload
       </div>

       <div className="img-box">
        {/* <Cropper
         src={slide4}
         style={{ height: "100%", width: "100%" }}
         // Cropper.js options
         initialAspectRatio={16 / 9}
         guides={false}
         crop={this._crop.bind(this)}
         onInitialized={this.onCropperInit}
         crossOrigin="anonymous"
         preview=".image-preview"
         aspectRatio={1.5 / 1}
         autoCropArea={1}
         viewMode={2}
         rotatable={false}
         scalable={false}
         zoomOnWheel={false}
         dragMode="move"
        /> */}
       </div>
       <div as={Row} className="hr">
        <div column md={12}>
         <hr></hr>
        </div>
       </div>
       <div id="upload-directions">
        <div>
         {/* <input
          className="file-upload"
          //   onChange={this.onChange()}
          type="file"
         /> */}
         <FaCube />
        </div>
        <div className="rotated">
         <FaCube />
        </div>
        <div>
         <FaArrowUp />
        </div>
        <div>
         <FaArrowRight />
        </div>
        <div>
         <FaArrowDown />
        </div>
        <div>
         <FaArrowLeft />
        </div>
       </div>
       <p className="option-tip">Upload at least one picture of this option</p>
       <div as={Row} className="add-btn">
        <div column md={12}>
         <Button variant="danger">ADD</Button>
        </div>
       </div>
      </Modal.Body>
     </Modal>
    </>
    <>
     {/* material modal */}

     <Modal
      id="price-request-modal"
      className="arch-wide-modal product-modal material-modal"
      size="lg"
      show={this.state.material_modal}
      onHide={() => this.material_close()}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton />
      <Modal.Body>
       <div className="option-add-label">Material</div>
       <div className="modal-upload">
        <div className="upload-box">
         <FaCloudUploadAlt />
        </div>
        <p>Upload Picture</p>
       </div>
       <Form.Row>
        <Form.Group as={Col} md={12} controlId="formGridState">
         <Form.Control placeholder="Material's Name" />
        </Form.Group>
       </Form.Row>
       <div as={Row} className="add-btn">
        <div column md={12}>
         <Button variant="danger">ADD</Button>
        </div>
       </div>
      </Modal.Body>
     </Modal>
    </>

    <>
     {/* size modal */}

     <Modal
      id="size_modal"
      className="arch-wide-modal product-modal"
      size="lg"
      show={this.state.size_modal}
      onHide={() => this.size_close()}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       <div className="option-add-label">Add Size</div>
       <Form.Row>
        <Form.Group as={Col} controlId="formGridState">
         <span md={2}>L: </span>
         <Form.Control md={10} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
         <span>W: </span>
         <Form.Control />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
         <span>H: </span>
         <Form.Control />
        </Form.Group>
       </Form.Row>
       <div as={Row}>
        <div column md={12}>
         <div className="option-tip">Tips: add the size in mm</div>
        </div>
       </div>
       <div as={Row} className="add-btn">
        <div column md={12}>
         <Button variant="danger">ADD</Button>
        </div>
       </div>
      </Modal.Body>
     </Modal>
    </>

    <>
     {/* price modal */}

     <Modal
      id="price_modal"
      className="arch-wide-modal product-modal"
      size="lg"
      show={this.state.price_modal}
      onHide={() => this.price_close()}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       <div className="option-add-label">Price</div>
       <Form.Row>
        <Form.Group as={Col} md={8} controlId="formGridState">
         <Form.Control />
         <span className="currency">¥</span>
        </Form.Group>
       </Form.Row>
       <div as={Row}>
        <div column md={12}>
         <div className="option-tip">
          Tips: Initial price must be higher than offer price
         </div>
        </div>
       </div>
       <div as={Row} className="add-btn">
        <div column md={12}>
         <Button variant="danger">ADD</Button>
        </div>
       </div>
      </Modal.Body>
     </Modal>
    </>

    <>
     {/* offer modal */}

     <Modal
      id="offer_modal"
      className="arch-wide-modal product-modal"
      size="lg"
      show={this.state.offer_modal}
      onHide={() => this.offer_close()}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       <div className="option-add-label">Offer Price</div>
       <Form.Row>
        <Form.Group as={Col} md={8} controlId="formGridState">
         <Form.Control />
         <span className="currency">¥</span>
        </Form.Group>
       </Form.Row>
       <div as={Row}>
        <div column md={12}>
         <div className="option-tip">
          Tips: Initial price must be higher than offer price
         </div>
        </div>
       </div>
       <div as={Row} className="add-btn">
        <div column md={12}>
         <Button variant="danger">ADD</Button>
        </div>
       </div>
      </Modal.Body>
     </Modal>
    </>
   </React.Fragment>
  );
 }
}

export default OptionsPrice;
