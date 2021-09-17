import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import blank from "../../../src/blank.jpg";
import { auth } from "./../../firebase";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast, Flip } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Cropper from "react-cropper";
import { IoWarning } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import "cropperjs/dist/cropper.css";
import { compressImage } from "../addProduct/OptionsPrice";
import { VerificationPin } from "react-verification-pin";

import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { logginOut } from "./../../redux/actions/authActions";
import {
 signinEmailPassword,
 setUserInfoAction,
 updateInfo,
 presistInfo,
} from "../../redux/actions/authActions";
class Settings extends Component {
 constructor(props) {
  super(props);

  this.cropperRef = React.createRef();
  this.state = {
   fname: "",
   lname: "",
   email: "",
   phone: "",
   password: "",
   new_password: "",
   deletePassword: "",
   provider: null,
   signgedin: false,
   pswrd_loading: false,
   prfl_loading: false,
   change_password_modal: false,
   delete_acc_modal: false,
   profile_modal: false,
   profile_src: "",
   deletingAcc: false,
   cropped_profile: null,
   addProfileLoad: false,
   confResult: "",
   phoneModal: false,
   status: "process",
  };
 }
 profile_close = () => {
  this.setState({ profile_modal: false });
 };
 password_modal_close = () => {
  this.setState({ change_password_modal: false });
 };
 onChangeProfile = (e) => {
  const file = e.target.files[0];
  const src = URL.createObjectURL(file);
  // this.setState({ profile_img: file });
  this.setState({ profile_src: src });
  console.log(file);
  console.log(src);
 };
 componentDidMount() {
  this.setState({
   fname: this.props.displayName?.split(" ")[0],
   lname: this.props.displayName?.split(" ")[1],
   photoURL: this.props.photoURL,
   phone: this.props.userInfo?.info?.phoneNumber ?? "",
   email: this.props.userInfo.info?.email?.includes("+")
    ? "No Email"
    : this.props.userInfo?.info?.email,
  });
 }

 handlePhoneFinish = (code) => {
  const fd = new FormData();
  this.state.confResult
   .confirm(code)
   .then((userCredentials) => {
    fd.append("uid", userCredentials.user.uid);
    fd.append("phone", this.state.phone);
    axios
     .post("https://arch17-apis.herokuapp.com/api/update-phone", fd)
     .then((response) => {
      console.log(response.data);
      this.props.updateInfo(response.data.user);
      presistInfo(response.data.user, true);
     });
    this.setState({ phoneModal: false });
   })
   .catch((err) => {
    console.log(err);
    this.setState({ status: "error" });
    auth.signOut().then(() => {
     this.props.dispatchLogOut();
    });
   });
 };
 setUpRecaptch = () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
   "recaptch-setting-container",
   {
    size: "invisible",
    callback: (response) => {
     console.log(response);
    },
   }
  );
 };

 phoneModal_close = () => {
  this.setState({ phoneModal: false });
 };

 handleDeleteSubmit = () => {
  this.setState({ deletingAcc: true });
  auth
   .signInWithEmailAndPassword(
    auth.currentUser.email,
    this.state.deletePassword
   )
   .then((userCreds) => {
    console.log(userCreds.user);
    auth.currentUser.delete().then(() => {
     this.props.dispatchLogOut();
    });
   });
 };
 changePassword = () => {
  this.setState({ pswrd_loading: true });
  auth
   .signInWithEmailAndPassword(auth.currentUser.email, this.state.password)
   .then((userCreds) => {
    userCreds.user
     .updatePassword(this.state.new_password)
     .then(() => {
      console.log("Password Changed");
      this.setState({ pswrd_loading: false });
      this.setState({ change_password_modal: false });
      toast.success("Password Updated Successfully", {
       position: toast.POSITION.BOTTOM_LEFT,
       theme: "colored",
       transition: Flip,
      });
     })
     .catch((err) => {
      console.log(err);
     });
   })
   .catch((err) => console.log(err));
 };
 changePasswordOpen = () => {
  this.setState({ change_password_modal: true });
 };
 deleteAccountOpen = () => {
  this.setState({ delete_acc_modal: true });
 };
 deleteAccClose = () => {
  this.setState({ delete_acc_modal: false });
 };
 handleUpdateProfile = () => {
  this.setState({ prfl_loading: true });
  if (this.props.isLoggedIn) {
   auth.currentUser
    .updateProfile({
     displayName: `${this.state.fname} ${this.state.lname}`,
    })
    .then(() => {
     console.log("profile updated");
     this.props.updateInfo(auth.currentUser);
     presistInfo(auth.currentUser, true);
     toast.success("Pofile Updated Successfully", {
      position: toast.POSITION.BOTTOM_LEFT,
      theme: "colored",
      transition: Flip,
      hideProgressBar: true,
     });
    });

   setTimeout(() => {
    this.setState({ prfl_loading: false });
   }, 500);
  }
  if (
   this.state.provider === "google.com" ||
   this.state.provider === "facebook.com"
  ) {
   auth.currentUser
    .updateProfile({
     displayName: `${this.state.fname} ${this.state.lname}`,
    })
    .then(() => {
     console.log("profile face or google updated updated");
     console.log(auth.currentUser);
     this.props.updateInfo(auth.currentUser);
     presistInfo(auth.currentUser, true);
     this.setState({ prfl_loading: false });
    });
   console.log(auth.currentUser);
   //  this.props.setNav(auth.currentUser);
  } else {
   console.log("not signed in, please sign in and try again");
  }
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
 _crop() {
  setTimeout(() => {
   const imageElement = this.cropperRef?.current;
   const cropper = imageElement?.cropper;
   let cropped = cropper.getCroppedCanvas().toDataURL();
   this.setState({ cropped_profile: cropped });
   console.log(this.state.cropped_profile);
  });
 }
 updateEmail = () => {
  // auth.currentUser.verify);
 };
 onProfilePicSubmit = async (e) => {
  e.preventDefault();
  this.setState({ addProfileLoad: true });

  const fd = new FormData();
  if (this.state.cropped_profile) {
   fd.append(
    "img[]",
    await compressImage(this.dataURLtoFile(this.state.cropped_profile, "file"))
   );
   axios
    .post("https://arch17-apis.herokuapp.com/api/upload/5", fd)
    .then((response) => {
     console.log(response.data.img[response.data.lastIndex].file_url);
     auth.currentUser
      .updateProfile({
       photoURL: response.data.img[response.data.lastIndex].file_url,
      })
      .then(() => {
       //  this.props.setNav(auth.currentUser);
       this.props.updateInfo(auth.currentUser);
       presistInfo(auth.currentUser, true);
       console.log("updated");
       this.setState({ addProfileLoad: false });
       this.setState({ profile_modal: false });
       toast.success("Your Picture Updated Successfully", {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "colored",
        transition: Flip,
       });
      });
    })
    .catch((error) => console.log(error));
   // };
  }
  console.log(fd);
 };
 handleFnameChange = (e) => {
  this.setState({ fname: e.target.value });
 };
 handleLnameChange = (e) => {
  this.setState({ lname: e.target.value });
 };
 handlePhoneChange = (e) => {
  this.setState({ phone: e.target.value });
 };
 handleEmailChange = (e) => {
  this.setState({ email: e.target.value });
 };

 handlePasswordChange = (e) => {
  this.setState({ password: e.target.value });
 };

 handleDeletePasswordChange = (e) => {
  this.setState({ deletePassword: e.target.value });
 };

 handleNewPasswordChange = (e) => {
  this.setState({ new_password: e.target.value });
 };
 changePhoneNumber = () => {
  this.setUpRecaptch();
  const appVerifier = window.recaptchaVerifier;
  auth
   .signInWithPhoneNumber(auth.currentUser.phoneNumber, appVerifier)
   .then((confirmationResult) => {
    window.confirmationResult = confirmationResult;
    this.setState({ confResult: confirmationResult, phoneModal: true });
    console.log(confirmationResult);
   })
   .catch((err) => console.log(err));
 };
 render() {
  if (!this.props.isLoggedIn || !auth.currentUser) return <Redirect to="/" />;
  return (
   <>
    <div id="user-settings">
     <Container fluid>
      <Row md={{ span: 12 }} style={{ marginBottom: "70px" }}>
       <Col sm={4}>
        <h2
         style={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#000",
          fontFamily: "Roboto",
          textDecoration: "underline",
          textAlign: "center",
         }}
        >
         Settings
        </h2>
       </Col>
      </Row>
      <Row md={{ span: 12 }}>
       <Col sm={4}>
        <h6
         style={{
          textAlign: "center",
          padding: "5px 0 12px 0",
          fontSize: "1.2rem",
          fontWeight: 400,
          color: "#000",
         }}
        >
         Profile Picture
        </h6>
        <div className="profile-container">
         {/* {this.props.info?.photoURL ? ( */}
         {this.props.photoURL ? (
          <>
           <img
            // src={this.props.info?.photoURL}
            src={this.props.photoURL}
            alt={this.props.displayName}
           />
          </>
         ) : (
          <>
           <img src={blank} alt={this.props.info?.displayName} />
          </>
         )}
        </div>
        <h2
         onClick={() => {
          this.setState({ profile_modal: true });
         }}
         style={{
          textDecoration: "underline",
          cursor: "pointer",
          padding: "10px 0",
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: 400,
         }}
        >
         Change Picture
        </h2>
       </Col>
       <Col sm={8}>
        <div className="profile-form">
         <Form.Group as={Row} md={{ span: 12 }}>
          <Col md={6}>
           <Form.Label>First Name</Form.Label>
           <Form.Control
            placeholder="First Name"
            onChange={this.handleFnameChange}
            value={this.state.fname}
           />
          </Col>
          <Col md={6}>
           <Form.Label>Last Name</Form.Label>
           <Form.Control
            placeholder="Last Name"
            onChange={this.handleLnameChange}
            value={this.state.lname}
           />
          </Col>
         </Form.Group>
         {/* <Form.Group as={Row} className=""></Form.Group> */}
         <Form.Group as={Row} className="">
          <Col md={12}>
           <Form.Label>Phone</Form.Label>
           <Form.Control
            placeholder="Phone"
            onChange={this.handlePhoneChange}
            value={this.state.phone}
           />
          </Col>
          {/* <p>Change</p> */}
          {!this.props.userInfo.info?.phoneNumber ? (
           <>
            <p className="change-label">Add Phone</p>
           </>
          ) : (
           <>
            {this.state.phone != this.props.userInfo.info?.phoneNumber && (
             <>
              <p className="change-label" onClick={this.changePhoneNumber}>
               Change
              </p>
              <div id="recaptch-setting-container"></div>
             </>
            )}
           </>
          )}
         </Form.Group>
         {!this.props.userInfo.info?.email?.includes("+") ? (
          <>
           <Form.Group as={Row}>
            <Col>
             <Form.Label>Email</Form.Label>
             <Form.Control
              placeholder="Email"
              onChange={this.handleEmailChange}
              value={this.state.email}
             />
            </Col>
           </Form.Group>
          </>
         ) : (
          <></>
         )}

         <Row md={{ span: 12 }}>
          {!this.props.userInfo.info?.email?.includes("+") ? (
           // this.props.userInfo.info?.providerData[0].providerId !=
           //  "google.com" ||
           // this.props.userInfo.info?.providerData[0].providerId !=
           //  "facebook.com" ?
           <>
            <Col md={6}>
             <button
              href="#"
              style={{
               textAlign: "right",
               textDecoration: "underline",
               fontWeight: "600",
               color: "#000",
               background: "transparent",
               outline: "none",
               border: "none",
              }}
              // onClick={this.changePasswordOpen}
              onClick={this.changePasswordOpen}
             >
              Change Password
             </button>
            </Col>
           </>
          ) : (
           <></>
          )}
          <Col md={6} style={{ textAlign: "right" }}>
           <button
            style={{
             textAlign: "right",
             textDecoration: "underline",
             fontWeight: "600",
             color: "#000",
             background: "transparent",
             outline: "none",
             border: "none",
            }}
            onClick={this.deleteAccountOpen}
           >
            Delete Account
           </button>
          </Col>
         </Row>
         <Row span={{ span: 12 }} className="py-3">
          <Col md={3}></Col>
          <Col md={3}></Col>
          <Col md={3} style={{ padding: "0" }}>
           <Link to="/user">
            <Button
             style={{
              display: "block",
              float: "right",
              marginRight: "12px",
              padding: "7px 0",
              width: "120px",
              background: "rgb(167 167 167)",
              textAlign: "center",
              border: "none",
             }}
            >
             Cancel
            </Button>
           </Link>
          </Col>
          <Col md={3}>
           {this.state.fname == this.props.displayName?.split(" ")[0] &&
           this.state.lname == this.props.displayName?.split(" ")[1] ? (
            <>
             <Button
              disabled
              style={{
               background: "#797979",
               display: "block",
               float: "right",
               width: "120px",
               textAlign: "center",
               border: "none",
              }}
             >
              Save
             </Button>
            </>
           ) : (
            <>
             <Button
              variant="danger"
              onClick={this.handleUpdateProfile}
              type="submit"
              style={{
               background: "#E41E15",
               display: "block",
               float: "right",
               width: "120px",
               textAlign: "center",
              }}
             >
              {this.state.prfl_loading ? (
               <>
                <ClipLoader
                 style={{ height: "20px" }}
                 color="#ffffff"
                 size={20}
                />
               </>
              ) : (
               <>Save</>
              )}
             </Button>
            </>
           )}
          </Col>
         </Row>
        </div>
       </Col>
      </Row>
      <>
       <Modal
        show={this.state.change_password_modal}
        onHide={this.password_modal_close}
        className="example-modals"
        keyboard={false}
       >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
         <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
          <Form.Row as={Row} style={{ margin: "20px 0" }}>
           <Form.Label column md={4}>
            Old Password
           </Form.Label>
           <Col md={8}>
            <Form.Control
             type="password"
             value={this.state.password}
             placeholder="Old Password"
             onChange={this.handlePasswordChange}
            />
           </Col>
          </Form.Row>
          <Form.Row as={Row} style={{ margin: "20px 0" }}>
           <Form.Label column md={4}>
            New Password
           </Form.Label>
           <Col md={8}>
            <Form.Control
             type="password"
             placeholder="New Password"
             onChange={this.handleNewPasswordChange}
             value={this.state.new_password}
            />
           </Col>
          </Form.Row>
          <Button
           variant="danger"
           onClick={() => {
            this.changePassword();
            this.setState({ embed_modal: false });
           }}
           type="submit"
           style={{
            textAlign: "right",
            background: "#E41E15",
            display: "block",
            float: "right",
            marginRight: "12px",
           }}
          >
           {this.state.pswrd_loading ? (
            <>
             <ClipLoader
              style={{ height: "20px" }}
              color="#ffffff"
              loading={this.state.loadCovers}
              size={20}
             />
            </>
           ) : (
            <>Change</>
           )}
          </Button>
         </div>
        </Modal.Body>
       </Modal>
       <Modal
        show={this.state.delete_acc_modal}
        onHide={this.deleteAccClose}
        closeButton
        keyboard={false}
        size="md"
       >
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body>
         <div className="modal-wrapper" style={{ padding: "15px", margin: "" }}>
          <Row as={Row} style={{ margin: "0px 0" }}>
           <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
            Delete Account
           </p>
           <Col md={8}></Col>
          </Row>
          <Row as={Row} style={{ margin: "30px 0" }}>
           <Col md={12}>
            <div
             className="warning-danger"
             style={{
              background: "#fbe9e7",
              padding: "15px",
              color: "#E41E15",
             }}
            >
             <span
              style={{
               display: "inline-block",
               fontSize: "2.5rem",
               verticalAlign: "center",
               padding: "0 10px",
              }}
             >
              <IoWarning />
             </span>
             <p
              style={{
               color: "#c62828",
               fontWeight: "600",
               width: "80%",
               fontSize: ".9rem",
               display: "inline-block",
              }}
             >
              After you deleting your account, it's permanently deleted.
             </p>
            </div>
           </Col>
          </Row>
          <Form.Group as={Row} className="mb-2 px-3">
           <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
             placeholder="Type your password"
             onChange={this.handleDeletePasswordChange}
             type="password"
             value={this.state.deletePassword}
            />
           </Col>
          </Form.Group>
          <Button
           variant="danger"
           onClick={this.handleDeleteSubmit}
           type="submit"
           style={{
            textAlign: "right",
            background: "#E41E15",
            display: "block",
            float: "right",
            marginRight: "12px",
           }}
          >
           {this.state.deletingAcc ? (
            <>
             <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
            </>
           ) : (
            <>Delete</>
           )}
          </Button>
         </div>
        </Modal.Body>
       </Modal>
       <Modal
        id="price-request-modal"
        className="arch-wide-modal product-modal material-modal"
        size="lg"
        show={this.state.profile_modal}
        onHide={() => this.profile_close()}
        aria-labelledby="example-modal-sizes-title-lg"
       >
        <Modal.Header closeButton />
        <Modal.Body>
         <div className="option-add-label">Profile</div>
         <div className="cropper-box">
          <Cropper
           src={this.state.profile_src}
           style={{ height: "100%", width: "100%" }}
           ref={this.cropperRef}
           initialAspectRatio="free"
           guides={true}
           cropend={this._crop.bind(this)}
           ready={this._crop.bind(this)}
           crossOrigin="anonymous"
           preview=".image-preview"
           scalable={false}
           aspectRatio={1}
           autoCropArea={1}
           viewMode={1}
           dragMode="move"
           rotatable={false}
           zoomOnWheel={true}
           cropBoxMovable={true}
           cropBoxResizable={true}
           center={false}
          />
         </div>
         <div style={{ position: "relative", width: "80px", height: "80px" }}>
          <IoMdCloudUpload
           style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            fontSize: "5rem",
            zIndex: 1,
            background: "#e8e8e84a",
            textAlign: "left",
           }}
          />
          <input
           type="file"
           onChange={this.onChangeProfile}
           style={{
            position: "absolute",
            background: "red",
            opacity: 0,
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            width: "100%",
            fontSize: "5rem",
            zIndex: "2",
           }}
          />
         </div>

         <div as={Row} className="add-btn">
          <div column md={12}>
           <Button variant="danger" onClick={this.onProfilePicSubmit}>
            {this.state.addProfileLoad ? (
             <>
              <ClipLoader
               style={{ height: "20px" }}
               color="#ffffff"
               size={20}
              />
             </>
            ) : (
             <>Change</>
            )}
           </Button>
          </div>
         </div>
        </Modal.Body>
       </Modal>
      </>
     </Container>
     <Modal
      id="price-request-modal"
      className="arch-wide-modal product-modal pics-modal"
      size="lg"
      show={this.state.phoneModal}
      onHide={this.phoneModal_close}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
        <h6>Enter Code</h6>
        <VerificationPin
         type="number"
         inputsNumber={6}
         status={this.state.status}
         title="Your title here"
         subTitle="Your subtitle here"
         onFinish={this.handlePhoneFinish}
        />
       </div>
      </Modal.Body>
     </Modal>
    </div>
   </>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 signin: (email, password, newName, newEmail, phone) =>
  dispatch(signinEmailPassword(email, password, newName, newEmail, phone)),
 setNav: (info) => dispatch(setUserInfoAction(info)),
 updateInfo: (information) => dispatch(updateInfo(information)),
 dispatchLogOut: () => dispatch(logginOut()),
});

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  loading: state.regularUser.loading,
  userInfo: state.regularUser,
  info: state.regularUser.user,
  displayName: state.regularUser.displayName,
  photoURL: state.regularUser.photoURL,
 };
};
// export default Settings;
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
