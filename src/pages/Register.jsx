import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Container, Col, Row } from "react-bootstrap";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";

// import { connect } from "react-redux";
// import { initFacebookSdk } from "../../facebook";
// import { registerUser } from "./../../redux/actions/AuthActionCreator";

const Register = ({ dispatchRegisterAction }) => {
 const [fname, setFname] = useState("");
 const [lname, setLname] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [password_confirmation, setPasswordConfirmation] = useState("");

 const handleSubmit = (event) => {
  dispatchRegisterAction(
   fname,
   lname,
   email,
   password,
   password_confirmation,
   () => {
    console.warn("Created");
   },

   (message) => console.log("Error: " + message)
  );
 };

 return (
  <React.Fragment>
   {/* <Navigation /> */}
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
         <Form.Row>
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
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
           />
          </Col>
         </Form.Row>
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
        <Form.Group>
         <Form.Control
          name="password_confirmation"
          id="password_confirmation"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
         />
        </Form.Group>
        <button
         className="coninue-btn regular-auth"
         type="submit"
         onClick={(e) => {
          e.preventDefault();
          handleSubmit();
         }}
        >
         Continue
        </button>

        <div className="form-separator"></div>
        <button
         className="coninue-btn facebook-auth"
         //   onClick={this.facebook}
         //   type="submit"
         //   onClick={this.handleFacebookAuth}
        >
         <span>
          <FaFacebookF />
         </span>
         Continue With Facebook
        </button>
        <button
         className="coninue-btn linkedin-auth"
         //   onClick={}
         type="submit"
        >
         <span>
          <FaLinkedinIn />
         </span>{" "}
         Continue With Linkedin
        </button>
        <button className="coninue-btn wechat-auth" type="submit">
         <span>
          <AiFillWechat />
         </span>
         Continue With WeChat
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
  </React.Fragment>
 );
};

// const mapDispatchToProps = (dispatch) => ({
//  dispatchRegisterAction: (
//   fname,
//   lname,
//   email,
//   password,
//   password_confirmation,
//   onSuccess,
//   onError
//  ) =>
//   dispatch(
//    registerUser(
//     { fname, lname, email, password, password_confirmation },
//     onSuccess,
//     onError
//    )
//   ),
// });
// export default connect(null, mapDispatchToProps)(Signup);
export default Register;
