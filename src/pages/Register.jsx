import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
import { Container, Col, Row, Form, Modal, Button } from "react-bootstrap";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { connect } from "react-redux";
import { isNotEmptyString } from "@formiz/validations";
import firebase from "firebase/app";
// import {auth} from ''
import { auth } from "./../firebase";
import {
 signupEmailPassword,
 signupFacebook,
 signupGoogle,
 normalSignupRequest,
 setUserInfoAction,
} from "../redux/actions/authActions";
import HashLoader from "react-spinners/HashLoader";
import {
 phoneSigninRequest,
 phoneSignupSuccess,
} from "./../redux/actions/authActions";
const Register = (props) => {
 const [fname, setFname] = useState("");
 const [lname, setLname] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [phone, setPhone] = useState("");
 const [vCode, setVCode] = useState("");
 const [confResult, setConfResult] = useState("");
 const [phoneLoading, setPhoneLoading] = useState(false);
 const [phoneCodeMoadl, setPhoneCodeModal] = useState(false);

 const phoneModal_close = () => {
  setPhoneCodeModal(false);
 };
 const setUpRecaptch = () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
   "recaptch-container",
   {
    size: "invisible",
    callback: (response) => {
     onSignInSubmit();
     console.log(response);
    },
   }
  );
 };
 const onSignInSubmit = () => {
  //   if (auth.currentUser) {
  //    props.setNav(auth.currentUser);
  //    console.log(auth.currentUser);
  //    auth.currentUser.reload().then(() => {
  //     console.log("logged out");
  //    });
  //    return;
  //   }
  setUpRecaptch();

  props.dispatchPhoneSigninRequest();
  setPhoneLoading(true);
  const phoneNumber = phone;
  const appVerifier = window.recaptchaVerifier;
  firebase
   .auth()
   .signInWithPhoneNumber(phoneNumber, appVerifier)
   .then((confirmationResult) => {
    setConfResult(confirmationResult);
    setPhoneCodeModal(true);
    console.log(confirmationResult);
    window.confirmationResult = confirmationResult;
   })
   .catch((error) => {
    console.log(`SMS not sent, try again ${error}`);
   });
 };
 const validateCode = () => {
  confResult
   .confirm(vCode)
   .then((userCredentials) => {
    props.dispatchPhoneSigninSuccess(userCredentials.user);
    props.setNav(userCredentials.user);
    console.log(userCredentials.user);
   })
   .catch((err) => {
    console.log(err);
   });
 };
 const handleRegularSignup = () => {
  props.dispatchRegularSignup(`${fname} ${lname}`, email, password);
  console.log(props.isLoggedIn);
 };
 return (
  <React.Fragment>
   <div id="wrapper" className="auth-form">
    <Container fluid>
     <Row className="justify-content-md-center">
      <Col
       lg={{ span: 6 }}
       md={{ span: 8 }}
       sm={{ span: 10 }}
       className="m-auto p-5 bg-white rounded"
       style={{ position: "relative" }}
      >
       <div className="heading">
        <h2>Welcome to Arch17</h2>
        <h6>The world platform for architecture & design</h6>
       </div>
       <Form noValidate>
        <Form.Group>
         <Form.Control
          id="phone"
          name="phone"
          type="phone"
          placeholder="Enter Phone"
          onChange={(e) => setPhone(e.target.value)}
         />
        </Form.Group>

        <Form.Group>
         <Row>
          <Col>
           <Form.Control
            placeholder="First name"
            id="fname"
            name="fname"
            type="text"
            onChange={(e) => setFname(e.target.value)}
           />
          </Col>
          <Col>
           <Form.Control
            id="lname"
            type="text"
            name="lname"
            validation={[
             {
              rule: isNotEmptyString(),
              message: "This field is required",
             },
            ]}
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
           />
          </Col>
         </Row>
        </Form.Group>
        <Form.Group>
         <Form.Control
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
         />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
         <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
         />
        </Form.Group>
        <button
         className="coninue-btn regular-auth"
         onClick={(e) => {
          e.preventDefault();
          handleRegularSignup();
          props.dispatchNormalSignup(fname, lname, email, password);
         }}
        >
         {props.loading ? (
          <>
           Logging
           <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
          </>
         ) : (
          <>Continue</>
         )}
        </button>
        <button
         style={{ background: "rgb(25 22 22)" }}
         className="coninue-btn regular-auth my-3"
         onClick={(e) => {
          e.preventDefault();
          onSignInSubmit();
         }}
        >
         {props.loading ? (
          <>
           Sending SMS Confirmation Code
           <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
          </>
         ) : (
          <>Signup With Phone</>
         )}
        </button>
        <div id="recaptch-container"></div>

        <div className="form-separator"></div>
        <button
         className="coninue-btn facebook-auth"
         onClick={(e) => {
          e.preventDefault();
          props.dispatchFacebookSignup();
         }}
        >
         <span>
          <FaFacebookF />
         </span>
         Continue With Facebook
        </button>
        <button
         className="coninue-btn linkedin-auth"
         disabled={true}
         onClick={(e) => {
          //   e.preventDefault();
          //   props.dispatchLinkedinSignup();
         }}
        >
         <span>
          <FaLinkedinIn />
         </span>{" "}
         Continue With Linkedin
        </button>

        <button
         className="coninue-btn google-auth"
         onClick={(e) => {
          e.preventDefault();
          props.dispatchGoogleSignup();
         }}
        >
         <span>
          <FcGoogle />
         </span>
         Continue With Google {props.cout}
        </button>
        <div className="terms">
         <p>
          By clicking on Continue you agreed to <span>Terms of use</span> and
          <span> Privacy</span> policy.
         </p>
        </div>
        <div className="switch">
         <p>
          Already have an Arch17 ID?
          <span> Sign in</span>
         </p>
        </div>
        <div></div>
        <div className="sign-footer">
         Create a Designer Account <span>i</span>
        </div>
       </Form>
      </Col>
     </Row>
    </Container>
   </div>
   <Modal
    id="price-request-modal"
    className="arch-wide-modal product-modal pics-modal"
    size="md"
    show={phoneCodeMoadl}
    onHide={phoneModal_close}
    aria-labelledby="example-modal-sizes-title-lg"
   >
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
     <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
      <h6>Enter Code</h6>
      <Form.Row as={Row} style={{ margin: "20px 0" }}>
       <Form.Label column md={2}>
        Code
       </Form.Label>
       <Col md={10}>
        <Form.Control
         placeholder="SMS CODE"
         onChange={(e) => setVCode(e.target.value)}
        />
       </Col>
      </Form.Row>
      <Button
       variant="danger"
       onClick={() => validateCode()}
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
  </React.Fragment>
 );
};
const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignup: (fullName, email, password) =>
  dispatch(signupEmailPassword(fullName, email, password)),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
 dispatchNormalSignup: (fname, lname, email, password) =>
  dispatch(normalSignupRequest(fname, lname, email, password)),
 setNav: (info) => dispatch(setUserInfoAction(info)),
 dispatchPhoneSigninRequest: () => dispatch(phoneSigninRequest()),
 dispatchPhoneSigninSuccess: (info) => dispatch(phoneSignupSuccess(info)),
 //  dispatchLogOut: () => dispatch(logginOut()),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  loading: state.regularUser.loading,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
