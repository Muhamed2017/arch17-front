import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import grado from "../../../src/grado.jpg";
import { auth } from "./../../firebase";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast, Flip } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { compressImage } from "../addProduct/OptionsPrice";
import axios from "axios";

import {
 signinEmailPassword,
 setUserInfoAction,
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
   provider: null,
   signgedin: false,
   pswrd_loading: false,
   prfl_loading: false,
   change_password_modal: false,
   profile_modal: false,
   profile_src: "",
   //  profile_img: null,
   cropped_profile: null,
   addProfileLoad: false,
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
  // auth.onAuthStateChanged((user) => {
  //  if (user) {
  //   console.log(this.props.info);
  //   this.props.setNav(user);
  //   console.log(user);
  //   this.setState({
  //    signgedin: true,
  //    provider: user.providerData[0].providerId,
  //   });
  //  } else {
  //   this.setState({
  //    signgedin: false,
  //    provider: null,
  //   });
  //  }
  // });

  this.setState({
   fname: this.props.userInfo?.info?.displayName?.split(" ")[0],
   lname: this.props.userInfo?.info?.displayName?.split(" ")[1],
   email: this.props.userInfo?.info?.email ?? "",
   phone: this.props.userInfo?.info?.phoneNumber ?? "",
   photoURL: this.props.userInfo?.info?.photoURL ?? "",
  });
 }

 handleCancel = () => {
  //   this.setState({ change_password_modal: true });
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

 handleVerify = () => {
  auth.currentUser.sendEmailVerification().then(() => {
   console.log("email sent");
  });
  //   auth
  //    .applyActionCode(`eD-dgxUCBypUD1Otsz0ldw45ag37ZgdVQn5trfse12oAAAF7yuyWDQ`)
  //    .then(() => {
  //     console.log("valid");
  //    });
  //   auth.currentUser.updatePassword()
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
 handleUpdateProfile = () => {
  this.setState({ prfl_loading: true });

  if (this.state.signgedin && this.state.provider === "password") {
   this.props.signin(
    auth.currentUser.email,
    "Muhamed10",
    `${this.state.fname} ${this.state.lname}`,
    this.state.email,
    this.state.phone
   );
   this.props.setNav(auth.currentUser);
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
     this.props.setNav(auth.currentUser);
     this.setState({ prfl_loading: false });
    });
   console.log(auth.currentUser);
   this.props.setNav(auth.currentUser);
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
       this.props.setNav(auth.currentUser);
       console.log("updated");
       this.setState({ addProfileLoad: false });
       this.setState({ profile_modal: false });
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
 handleNewPasswordChange = (e) => {
  this.setState({ new_password: e.target.value });
 };
 render() {
  return (
   <>
    <Container fluid>
     <Row md={{ span: 12 }}>
      <Col sm={12}></Col>
      <Col sm={3}>
       <h6>Profile Picture</h6>
       <div className="profile-container">
        {this.props.info?.photoURL ? (
         <>
          <img
           src={this.props.info.photoURL}
           alt={this.props.info.displayName}
          />
         </>
        ) : (
         <>
          <img src={grado} alt={this.props.info.displayName} />
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
         padding: "5px 0",
        }}
       >
        Edit Profile
       </h2>
      </Col>
      <Col sm={3}>
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
        <Form.Group as={Row} className=""></Form.Group>
        <Form.Group as={Row} className="">
         <Form.Label>Phone</Form.Label>
         <Form.Control
          placeholder="Phone"
          onChange={this.handlePhoneChange}
          value={this.state.phone}
         />
        </Form.Group>
        <Form.Group as={Row}>
         <Form.Label>Email</Form.Label>
         <Form.Control
          placeholder="Email"
          onChange={this.handleEmailChange}
          value={this.state.email}
         />
        </Form.Group>
        <Row span={{ span: 12 }} className="py-3">
         <Col md={3}>
          <Button
           variant="danger"
           onClick={this.handleUpdateProfile}
           type="submit"
           style={{
            textAlign: "right",
            background: "#E41E15",
            display: "block",
            float: "right",
            marginRight: "12px",
           }}
          >
           {this.state.prfl_loading ? (
            <>
             <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
            </>
           ) : (
            <>Update</>
           )}
          </Button>
         </Col>
         <Col md={3}>
          <Button
           //   onClick={this.handleCancel  }
           onClick={this.onSignInSubmit}
          >
           Cancel
          </Button>
          <div id="recaptch-container"></div>
         </Col>
         <Col md={6}>
          <Button onClick={this.handleVerify}>Test Verify</Button>
         </Col>
        </Row>
        <Row md={{ span: 12 }}>
         <Col md={12}>
          <a href="#" onClick={this.changePasswordOpen}>
           Change Password
          </a>
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
            value={this.state.password}
            placeholder="Enter Your Old Password"
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
            placeholder="Enter Your New Password"
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
        <input type="file" onChange={this.onChangeProfile} />
        <div as={Row} className="add-btn">
         <div column md={12}>
          <Button variant="danger" onClick={this.onProfilePicSubmit}>
           {this.state.addProfileLoad ? (
            <>
             <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
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
   </>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 signin: (email, password, newName, newEmail, phone) =>
  dispatch(signinEmailPassword(email, password, newName, newEmail, phone)),
 setNav: (info) => dispatch(setUserInfoAction(info)),
});

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  loading: state.regularUser.loading,
  userInfo: state.regularUser,
  info: state.regularUser.info,
 };
};
// export default Settings;
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
