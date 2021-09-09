import { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import grado from "../../../src/grado.jpg";
import app, { auth, fire } from "./../../firebase";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast, Flip } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import {
 signinEmailPassword,
 setUserInfoAction,
} from "../../redux/actions/authActions";
class Settings extends Component {
 constructor(props) {
  super(props);
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
  };
 }

 password_modal_close = () => {
  this.setState({ change_password_modal: false });
 };
 componentDidMount() {
  auth.onAuthStateChanged((user) => {
   if (user) {
    console.log(this.props);
    console.log(user);
    this.setState({
     signgedin: true,
     provider: user.providerData[0].providerId,
    });
   } else {
    this.setState({
     signgedin: false,
     provider: null,
    });
   }
  });

  this.setState({
   fname: this.props.userInfo?.info?.displayName?.split(" ")[0],
   lname: this.props.userInfo?.info?.displayName?.split(" ")[1],
   email: this.props.userInfo?.info?.email ?? "",
   phone: this.props.userInfo?.user?.phoneNumber ?? "",
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
  auth
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
  if (this.state.provider === "google.com") {
   auth.currentUser
    .updateProfile({
     displayName: `${this.state.fname} ${this.state.lname}`,
    })
    .then(() => {
     console.log("profile google updated");
     console.log(auth.currentUser);
     this.props.setNav(auth.currentUser);
     this.setState({ prfl_loading: false });
    });
   console.log(auth.currentUser);
   this.props.setNav(auth.currentUser);
   //    this.setState({ prfl_loading: false });
  } else {
   console.log("not signed in, please sign in and try again");
   //    this.setState({ prfl_loading: false });
  }
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
      <Col sm={12}>
       <h2>Edit Profile</h2>
      </Col>
      <Col sm={3}>
       <h6>Profile Picture</h6>
       <div className="profile-container">
        <img src={grado} alt="" />
       </div>
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
       <Modal.Header closeButton>
        {/* <Modal.Title>
        </Modal.Title> */}
       </Modal.Header>
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
