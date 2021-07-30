import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Container, Col, Row } from "react-bootstrap";
import {
 FaLinkedinIn,
 FaFacebookF,
 FaAppleAlt,
 FaGoogle,
} from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";
import { connect } from "react-redux";
import {
 signinEmailPassword,
 signupFacebook,
 signupGoogle,
} from "../redux/actions/authActions";
import HashLoader from "react-spinners/HashLoader";

// import { loginUser } from "./../../redux/actions/AuthActionCreator";
const Login = (props) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleRegularSignup = () => {
  props.dispatchRegularSignup(email, password);
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
      >
       <div className="heading">
        <h2>Welcome to Arch17</h2>
        <h6>The world platform for architecture & design</h6>
       </div>
       <Form noValidate>
        <Form.Group>
         <Form.Control
          type="email"
          name="email"
          id="email"
          noValidate
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
         />
        </Form.Group>
        <Form.Group>
         <Form.Control
          type="password"
          name="password"
          id="password"
          noValidate
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
         />
        </Form.Group>
        <button
         className="coninue-btn regular-auth"
         type="submit"
         onClick={(e) => {
          e.preventDefault();
          handleRegularSignup();
         }}
        >
         {/* Continue */}
         {props.loading ? (
          <>
           Logging
           <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
          </>
         ) : (
          <>Continue</>
         )}
        </button>

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
        <button className="coninue-btn linkedin-auth" type="submit">
         <span>
          <FaLinkedinIn />
         </span>{" "}
         Continue With Linkedin
        </button>
        {/* <button className="coninue-btn wechat-auth" type="submit">
         <span>
          <AiFillWechat />
         </span>
         Continue With WeChat
        </button> */}
        <button className="coninue-btn apple-auth">
         <span>
          <FaAppleAlt />
         </span>
         Continue With Apple
        </button>
        <button
         className="coninue-btn google-auth"
         onClick={(e) => {
          e.preventDefault();
          props.dispatchGoogleSignup();
         }}
        >
         <span>
          <FaGoogle />
         </span>
         Continue With Google
        </button>

        <div className="terms">
         <p>
          By clicking on Continue you agreed to <span>Terms of use</span> and
          <span> Privacy</span> policy.
         </p>
        </div>
        <div className="switch">
         <p>
          Don’t have an Arch17 ID?
          <span> Register Now </span>
         </p>
        </div>
       </Form>
      </Col>
     </Row>
    </Container>
   </div>
  </React.Fragment>
 );
};

// export default Signin;
const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignup: (email, password) =>
  dispatch(signinEmailPassword(email, password)),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
});
export default connect(null, mapDispatchToProps)(Login);
