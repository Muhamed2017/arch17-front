import React, { useState } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { connect } from "react-redux";
import { Form as FormAnt, Input } from "antd";
import club from "../../../src/club-logo.png";
import "./../auth.css";
import {
 signupEmailPassword,
 signupFacebook,
 signupGoogle,
 normalSignupRequest,
 setUserInfoAction,
 logginOut,
 updateInfo,
 emailPasswordSignupSuccess,
} from "../../redux/actions/authActions";
import HashLoader from "react-spinners/HashLoader";
import {
 phoneSigninRequest,
 phoneSignupSuccess,
} from "../../redux/actions/authActions";

const hasCapital = new RegExp("^(?=.*[a-z])");
const hasLower = new RegExp("^(?=.*[A-Z])");
const hasNumeric = new RegExp("^(?=.*[0-9])");
const hasSpecial = new RegExp("^(?=.[!@#$%^&])|(?=.*[!@#$%^&*])");
const RegisterDesignerAccount = (props) => {
 const [fname, setFname] = useState("");
 const [lname, setLname] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const hadleEmailPhoneContinueButton = () => {
  handleRegularSignup();
 };

 const handleRegularSignup = () => {
  props.dispatchRegularSignup(fname, lname, email, password, "firebase");
  // props.dispatchRegularSignup(fname, lname, email, password, "regular");
  console.log(props.isLoggedIn);
 };

 return (
  <React.Fragment>
   <div id="wrapper" className="auth-form mt-1">
    <Container fluid>
     <Row className="justify-content-md-center">
      <Col
       lg={{ span: 6 }}
       md={{ span: 8 }}
       sm={{ span: 10 }}
       className="m-auto p-5 bg-white rounded"
       style={{ position: "relative" }}
      >
       {!props.for_company && (
        <>
         <div className="heading">
          <img
           src={club}
           alt=""
           style={{
            width: "110px",
            display: "block",
            margin: "auto",
           }}
          />
          <h2
           className="design-form-head"
           style={{
            letterSpacing: "-1.9px",
            fontFamily: "Roboto",
           }}
          >
           <span>design</span>
           <span>club</span>
          </h2>

          <h6
           style={{
            color: "#a1a1a1",
            fontSize: "1.4rem",
            fontFamily: "Roboto",
           }}
          >
           For architecture & designers club and get the best of Arch17
          </h6>
         </div>
        </>
       )}
       <Form noValidate>
        <Form.Group style={{ marginBottom: "0" }}>
         <FormAnt>
          <Row>
           <Col
            lg={{ span: 6 }}
            md={{ span: 6 }}
            sm={{ span: 12 }}
            xs={{ span: 12 }}
           >
            <FormAnt.Item
             name="fname"
             rules={[
              {
               required: true,
               message: "first name is required",
              },
              () => ({
               validator(_, value) {
                if (value.length < 2) {
                 return Promise.reject(new Error("Too short"));
                }
                return Promise.resolve();
               },
              }),
             ]}
            >
             <Input
              onChange={(e) => setFname(e.target.value)}
              placeholder="First Name"
              size="large"
             />
            </FormAnt.Item>
           </Col>
           <Col
            lg={{ span: 6 }}
            md={{ span: 6 }}
            sm={{ span: 12 }}
            xs={{ span: 12 }}
           >
            <FormAnt.Item
             name="lname"
             rules={[
              {
               required: true,
               message: "last name is required",
              },
              () => ({
               validator(_, value) {
                if (value.length < 2) {
                 return Promise.reject(new Error("Too short"));
                }
                return Promise.resolve();
               },
              }),
             ]}
            >
             <Input
              onChange={(e) => setLname(e.target.value)}
              placeholder="Last Name"
              size="large"
             />
            </FormAnt.Item>
           </Col>
          </Row>
         </FormAnt>
        </Form.Group>

        <Form.Group style={{ marginBottom: "0" }}>
         <FormAnt>
          <FormAnt.Item
           name="email"
           style={{ marginBottom: "18px" }}
           rules={[
            {
             type: "email",
             message: "The input is not valid E-mail!",
            },
            {
             required: true,
             message: "Please input your E-mail!",
            },
           ]}
          >
           <Input
            size="large"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
           />
          </FormAnt.Item>
          <FormAnt.Item
           name="password"
           hasFeedback
           rules={[
            {
             required: true,
             message: "Please Type a strong password!",
            },
            () => ({
             validator(_, value) {
              if (value.length < 8) {
               return Promise.reject(
                new Error("Should be at least 8 charcters")
               );
              } else if (!hasCapital.test(value)) {
               return Promise.reject(new Error("Should have Lower Letter"));
              } else if (!hasLower.test(value)) {
               return Promise.reject(new Error("Should have Capital Letter"));
              } else if (!hasNumeric.test(value)) {
               return Promise.reject(new Error("Should have Numeric Letter"));
              } else if (!hasSpecial.test(value)) {
               return Promise.reject(new Error("Should have Special Letter"));
              }
              return Promise.resolve();
             },
            }),
           ]}
          >
           <Input.Password
            size="large"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
           />
          </FormAnt.Item>
         </FormAnt>
        </Form.Group>

        <button
         className="coninue-btn regular-auth"
         onClick={(e) => {
          e.preventDefault();
          hadleEmailPhoneContinueButton();
         }}
        >
         {props.loading ? (
          <>
           <>Creating New Account</>
           <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
          </>
         ) : (
          <>Continue</>
         )}
        </button>
        <div id="recaptch-container"></div>
        <div className="form-separator"></div>

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
        <div className="terms mt-3">
         <p>
          By clicking on Continue you agreed to <span>Terms of use</span> and
          <span> Privacy</span> policy.
         </p>
        </div>
        <div className="switch">
         <p>
          Create regular account
          <a href="/signup">
           <span> Signup</span>
          </a>
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
const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignup: (fname, lname, email, password, method) =>
  dispatch(signupEmailPassword(fname, lname, email, password, method)),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
 dispatchNormalSignup: (fname, lname, email, password) =>
  dispatch(normalSignupRequest(fname, lname, email, password)),
 setNav: (info) => dispatch(setUserInfoAction(info)),
 dispatchPhoneSigninRequest: () => dispatch(phoneSigninRequest()),
 dispatchPhoneSigninSuccess: (info) => dispatch(phoneSignupSuccess(info)),
 dispatchLogOut: () => dispatch(logginOut()),
 updateInfo: (info) => dispatch(updateInfo(info)),
 authenicated: (info) => dispatch(emailPasswordSignupSuccess(info)),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  loading: state.regularUser.loading,
 };
};
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(RegisterDesignerAccount);
