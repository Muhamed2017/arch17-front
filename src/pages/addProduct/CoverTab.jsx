import React, { Component } from "react";
import firebase from "firebase/app";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { VerificationPin } from "react-verification-pin";
export default class CoverTab extends Component {
 fileObj = [];
 fileArray = [];

 constructor(props) {
  super(props);
  this.state = {
   file: [null],
   status: "process",
   codeModal: false,
  };
 }

 codeModal_close = () => {
  this.setState({ codeModal: false });
 };
 codeModal_open = () => {
  this.setState({ codeModal: true });
 };

 handleOnFinish = (code) => {
  this.setState({ status: "wait" });
  if (code === "111111") {
   setTimeout(() => {
    this.setState({ status: "error" });
   }, 3000);
  } else {
   setTimeout(() => {
    this.setState({ status: "success" });
   }, 3000);
  }
 };
 setUpRecaptch = () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
   "recaptch-container",
   {
    size: "invisible",
    callback: (response) => {
     // reCAPTCHA solved, allow signInWithPhoneNumber.
     this.onSignInSubmit();
     console.log(response);
    },
   }
  );
 };
 onSignInSubmit = (e) => {
  e.preventDefault();
  this.setUpRecaptch();
  const phoneNumber = "+201015862559";
  const appVerifier = window.recaptchaVerifier;

  firebase
   .auth()
   .signInWithPhoneNumber(phoneNumber, appVerifier)
   .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    console.log(confirmationResult);
    window.confirmationResult = confirmationResult;
    // ...
   })
   .catch((error) => {
    // Error; SMS not sent
    // ...
   });
 };

 uploadMultipleFiles = (e) => {
  this.fileObj.push(e.target.files);
  for (let i = 0; i < this.fileObj[0].length; i++) {
   this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
  }
  this.setState({ file: this.fileArray });
 };

 uploadFiles = (e) => {
  e.preventDefault();
  console.log(this.state.file);
 };

 render() {
  return (
   <>
    <form>
     <div className="form-group multi-preview">
      {(this.fileArray || []).map((url) => (
       <img src={url} alt="..." />
      ))}
     </div>

     <div className="form-group">
      <input
       type="file"
       className="form-control"
       onChange={this.uploadMultipleFiles}
       multiple
      />
     </div>
     <button
      type="button"
      className="btn btn-danger btn-block"
      onClick={this.uploadFiles}
     >
      Upload
     </button>
     <button
      type="button"
      className="btn btn-danger btn-block"
      onClick={this.codeModal_open}
     >
      Validate Code
     </button>
    </form>
    <button
     type="button"
     className="btn btn-danger btn-block"
     onClick={this.onSignInSubmit}
    >
     Signin phone
    </button>
    <div id="recaptch-container"></div>
    <Modal
     id="price-request-modal"
     className="arch-wide-modal product-modal pics-modal"
     size="xl"
     show={this.state.codeModal}
     onHide={this.codeModal_close}
     aria-labelledby="example-modal-sizes-title-lg"
    >
     <Modal.Header closeButton></Modal.Header>
     <Modal.Body>
      <div className="modal-wrapper" style={{ padding: "0px", margin: "0" }}>
       <VerificationPin
        type="number"
        inputsNumber={6}
        status={this.state.status}
        title="Your title here"
        subTitle="Your subtitle here"
        onFinish={this.handleOnFinish}
       />
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
        Continue
       </Button>
      </div>
     </Modal.Body>
    </Modal>
   </>
  );
 }
}
