import React, { Component } from "react";
import firebase from "firebase/app";
export default class CoverTab extends Component {
 fileObj = [];
 fileArray = [];

 constructor(props) {
  super(props);
  this.state = {
   file: [null],
  };
 }
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
    </form>
    <button
     type="button"
     className="btn btn-danger btn-block"
     onClick={this.onSignInSubmit}
    >
     Signin phone
    </button>
    <div id="recaptch-container"></div>
   </>
  );
 }
}
