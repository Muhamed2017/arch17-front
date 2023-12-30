import React, { useState } from "react";
import { Container, Col, Row, Form, Modal } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { connect } from "react-redux";
import axios from "axios";
import firebase from "firebase/app";
import { VerificationPin } from "react-verification-pin";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import { auth } from "./../firebase";
import { Form as FormAnt, Input } from "antd";
import "./auth.css";
import {
 signupEmailPassword,
 signupFacebook,
 signupGoogle,
 normalSignupRequest,
 setUserInfoAction,
 logginOut,
 presistInfo,
 updateInfo,
 emailPasswordSignupSuccess,
} from "../redux/actions/authActions";
import HashLoader from "react-spinners/HashLoader";
import {
 phoneSigninRequest,
 phoneSignupSuccess,
} from "./../redux/actions/authActions";
import en from "world_countries_lists/data/countries/en/world.json";

const hasCapital = new RegExp("^(?=.*[a-z])");
const hasLower = new RegExp("^(?=.*[A-Z])");
const hasNumeric = new RegExp("^(?=.*[0-9])");
const hasSpecial = new RegExp("^(?=.[!@#$%^&])|(?=.*[!@#$%^&*])");

const Register = (props) => {
 const [fname, setFname] = useState("");
 const [lname, setLname] = useState("");
 const [email, setEmail] = useState("");
 const [phonePassword, setPhonePassword] = useState("");
 const [password, setPassword] = useState("");
 const [phone, setPhone] = useState("");
 const [vCode, setVCode] = useState("");
 const [confResult, setConfResult] = useState("");
 const [phoneLoading, setPhoneLoading] = useState(false);
 const [phoneCodeMoadl, setPhoneCodeModal] = useState(false);
 const [status, setStatus] = useState("process");
 const [phoneSelected, setPhoneSelected] = useState(false);
 const [emailSelected, setEmailSelected] = useState(true);

 const handleOnFinish = (code) => {
  confResult
   .confirm(code)
   .then((userCredentials) => {
    setTimeout(() => {
     setStatus("success");
     props.updateInfo(userCredentials.user);
     presistInfo(userCredentials.user, true);
    }, 1000);
    props.dispatchPhoneSigninSuccess(userCredentials.user);
    setPhoneCodeModal(false);
   })
   .catch((err) => {
    console.log(err);
    setStatus("error");
    auth.signOut().then(() => {
     props.dispatchLogOut();
    });
   });
 };
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
     //  handleSignupPhoneHack();
     console.log(response);
    },
   }
  );
 };
 const onSignInSubmit = () => {
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

 const hadleEmailPhoneContinueButton = () => {
  if (phoneSelected) {
   handleSignupPhoneHack();
  }
  if (emailSelected) {
   handleRegularSignup();
   //  props.dispatchNormalSignup(fname, lname, email, password);
  }
 };
 const handleSignupPhoneHack = () => {
  setUpRecaptch();
  props.dispatchPhoneSigninRequest();

  const appVerifier = window.recaptchaVerifier;
  const phoneNumber = phone;
  const tail = "@arch17.com";
  auth
   .createUserWithEmailAndPassword(`${phone}${tail}`, phonePassword)
   .then((userCredentials) => {
    console.log("user.created");
    userCredentials.user
     .updateProfile({
      displayName: `${fname} ${lname}`,
     })
     .then(() => {
      userCredentials.user
       .linkWithPhoneNumber(phoneNumber, appVerifier)
       .then((confirmationResult) => {
        setConfResult(confirmationResult);
        window.confirmationResult = confirmationResult;
        setPhoneCodeModal(true);
        console.log("sms Sent");
       });
     });
   })
   .catch((error) => {
    console.log(error);
   });
 };
 const handleRegularSignup = () => {
  props.dispatchRegularSignup(fname, lname, email, password, "firebase");
  // props.dispatchRegularSignup(fname, lname, email, password, "regular");
  console.log(props.isLoggedIn);
 };
 const handleSuccess = (data) => {
  console.log(data);

  axios
   .get("https://www.linkedin.com/oauth/v2/authorization", {
    params: {
     grand_type: "authorization_code",
     client_id: "78elnnx8q5k0w5",
     code: data.code,
     redirect_uri: "http://localhost:3000/callback",
     scope: "r_liteprofile",
     response_type: "code",
     state: "DCEeFWf45A53525e1125e",
    },
    headers: {
     "Content-Type": "application/x-www-form-urlencoded",
    },
   })
   .then((response) => {
    console.log(response);
   });
 };

 return (
  <React.Fragment>
   <div id="wrapper" className="auth-form signup-form">
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
        <nav>
         <div
          className="nav nav-tabs"
          id="nav-tab"
          role="tablist"
          style={{
           alignItems: "center",
           fontFamily: "Roboto",
           marginBottom: "5px",
          }}
         ></div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
         <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
         >
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
         </div>
         <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
         >
          <Form.Group>
           <ConfigProvider locale={en}>
            <CountryPhoneInput
             onChange={(e) => setPhone(`+${e.code}${e.phone}`)}
            />
           </ConfigProvider>
          </Form.Group>
          <Form.Group>
           <FormAnt.Item
            name="phonePassword"
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
             onChange={(e) => setPhonePassword(e.target.value)}
             placeholder="Enter Password"
            />
           </FormAnt.Item>
          </Form.Group>
         </div>
        </div>
        <button
         className="coninue-btn regular-auth"
         onClick={(e) => {
          e.preventDefault();
          hadleEmailPhoneContinueButton();
         }}
        >
         {props.loading ? (
          <>
           {phoneSelected ? (
            <>Sending SMS with Verification code </>
           ) : (
            <>Creating New Account</>
           )}
           <HashLoader color="#ffffff" loading={true} size={35} />
          </>
         ) : (
          <>Continue</>
         )}
        </button>
        <div id="recaptch-container"></div>
        <div className="form-separator"></div>
        <button
         className="coninue-btn google-auth mb-4"
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
        <div className="terms mb-3">
         <p>
          By clicking on Continue you agreed to <span>Terms of use</span> and
          <span> Privacy</span> policy.
         </p>
        </div>
        <div className="switch mb-3">
         <p>
          Already have an Arch17 ID?
          <a href="/signin">
           <span> Sign in</span>
          </a>
         </p>
        </div>
        <div></div>
        <div className="sign-footer">
         <a href="/designeraccount">
          Create a Designer Account
          {/* <span className="undered">Learn More About Designer Account</span> */}
          <a href="designaccountintro">
           <span className="undered">Learn More About Designer Account</span>
          </a>
         </a>
        </div>
        <a href="designaccountintro">
         <p className="underiled-footer">Learn More About Designer Account</p>
        </a>
       </Form>
      </Col>
     </Row>
    </Container>
   </div>
   <Modal
    id="price-request-modal"
    className="arch-wide-modal product-modal pics-modal"
    size="lg"
    show={phoneCodeMoadl}
    onHide={phoneModal_close}
    aria-labelledby="example-modal-sizes-title-lg"
   >
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
     <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
      <h6>Enter Code</h6>
      <VerificationPin
       type="number"
       inputsNumber={6}
       status={status}
       title="Your title here"
       subTitle="Your subtitle here"
       onFinish={handleOnFinish}
      />
      
     </div>
    </Modal.Body>
   </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);
