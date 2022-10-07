import React, { Component } from "react";
// import { Container, Modal } from "react-bootstrap";
import {
 Col as AntCol,
 Row as AntRow,
 //  Spin,
 Button as AntButton,
 Input,
 //  Checkbox,
 //  Modal as AntModal,
} from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import SuccessModal from "../components/Modals/SuccessModal";
// import { AiFillYoutube, AiFillWechat } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";

// import "./HomePage.css";
import { FcGoogle } from "react-icons/fc";
// import SaveToCollection from "./../components/Modals/SaveToCollection";
// import SaveToBoard from "./../components/Modals/SaveToBoard";

// import axios from "axios";
// import { API } from "./../utitlties";
import { connect } from "react-redux";
import {
 signupEmailPassword,
 signupFacebook,
 signupGoogle,
 vanillaSigninEmailPassword,
} from "./../redux/actions/authActions";

class AuthModalContent extends Component {
 constructor(props) {
  super(props);
  this.state = {
   authFace: "",
   signingEmail: "",
   signinPassword: "",
   signupFname: "",
   signupLname: "",
   signupPassword: "",
   signupEmail: "",
  };
 }

 handleSigningIn = (email, password) => {
  this.setState({ signingIn: !this.props.isLoggedIn });
  this.props.dispatchRegularSignin(email, password);
 };
 handleRegularSignup = (fname, lname, email, password) => {
  // this.props.dispatchRegularSignup(fname, lname, email, password, "regular");
  this.props.dispatchRegularSignup(fname, lname, email, password, "firebase");
 };
 flipToRegiseterFace = () => {
  this.setState({ authFace: "register-face" });
  console.log(this.state.authFace);
 };
 flipToSigninFace = () => {
  this.setState({ authFace: "signin-face" });
  console.log(this.state.authFace);
 };
 //  state = {};
 render() {
  return (
   <div className={`flip-box`}>
    <div className={`flip-box-inner ${this.state.authFace}`}>
     <div className="flip-box-front p-5">
      <h2 className="auth-modal-head">Sign in</h2>
      <AntRow gutter>
       <AntCol span={24} className="gutter-row my-1">
        <AntButton
         className="w-100 f-auth-modal"
         size="large"
         onClick={() => {
          this.props.dispatchFacebookSignup();
          this.setState({ authModal: false });
         }}
        >
         <div className="auth-btn-cntr">
          <div className="auth-icon" style={{ color: "#1256ad" }}>
           <FaFacebookF />
          </div>
          <p>Login with Facebook</p>
         </div>
        </AntButton>
       </AntCol>
      </AntRow>
      <AntRow className="gutter-row my-1">
       <AntCol span={24}>
        <AntButton
         className="w-100 g-auth-modal"
         size="large"
         onClick={() => {
          this.props.dispatchGoogleSignup();
          this.setState({ authModal: false });
         }}
        >
         <div className="auth-btn-cntr">
          <div className="auth-icon">
           <FcGoogle />
          </div>
          <p>Login with Google</p>
         </div>
        </AntButton>
       </AntCol>
      </AntRow>
      <div className="form-separator"></div>
      <AntRow className="gutter-row mb-2">
       <AntCol span={24} style={{ background: "" }}>
        <Input
         placeholder="email"
         size="large"
         onChange={(e) => this.setState({ signingEmail: e.target.value })}
        />
       </AntCol>
      </AntRow>
      <AntRow className="gutter-row">
       <AntCol span={24} style={{ background: "" }}>
        <Input
         placeholder="password"
         size="large"
         type="password"
         onChange={(e) => this.setState({ signinPassword: e.target.value })}
        />
       </AntCol>
      </AntRow>
      <AntRow>
       <AntCol span={24}>
        <AntButton
         size="large"
         className="w-100 r-auth-modal"
         onClick={() => {
          this.handleSigningIn(
           this.state.signingEmail,
           this.state.signinPassword
          );
         }}
        >
         {this.state.signingIn && !this.props.isLoggedIn ? (
          <>
           <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
          </>
         ) : (
          <>Login</>
         )}
         {/* Login */}
        </AntButton>
       </AntCol>
       <AntCol span={24}>
        <div className="w-100 link-bold">forget your password?</div>
       </AntCol>
      </AntRow>
      <AntRow>
       <AntCol span={24}>
        <div className="auth-modal-footer">
         Don't have an account yet?
         <span className="link-bold black" onClick={this.flipToRegiseterFace}>
          Subscribe
         </span>
        </div>
       </AntCol>
      </AntRow>
     </div>
     <div className={`flip-box-back p-5 ${this.state.authFace}`}>
      <h2 className="auth-modal-head">Sign up</h2>
      <AntRow gutter>
       <AntCol span={24} className="gutter-row my-1">
        <AntButton
         className="w-100 f-auth-modal"
         size="large"
         onClick={() => {
          this.props.dispatchFacebookSignup();
          this.setState({ authModal: false });
         }}
        >
         <div className="auth-btn-cntr">
          <div className="auth-icon" style={{ color: "#1256ad" }}>
           <FaFacebookF />
          </div>
          <p>Signup with Facebook</p>
         </div>
        </AntButton>
       </AntCol>
      </AntRow>
      <AntRow className="gutter-row my-1">
       <AntCol span={24}>
        <AntButton
         className="w-100 g-auth-modal"
         size="large"
         onClick={() => {
          this.props.dispatchGoogleSignup();
          this.setState({ authModal: false });
         }}
        >
         <div className="auth-btn-cntr">
          <div className="auth-icon">
           <FcGoogle />
          </div>
          <p>Signup with Google</p>
         </div>
        </AntButton>
       </AntCol>
      </AntRow>
      <div className="form-separator"></div>
      <AntRow gutter={16} span={24} className="gutter-row mb-2">
       <AntCol span={12}>
        <Input
         placeholder="First Name"
         size="large"
         onChange={(e) => this.setState({ signupFname: e.target.value })}
        />
       </AntCol>
       <AntCol span={12} style={{ background: "" }}>
        <Input
         placeholder="Last name"
         size="large"
         onChange={(e) => this.setState({ signupLname: e.target.value })}
        />
       </AntCol>
      </AntRow>
      <AntRow className="gutter-row mb-2">
       <AntCol span={24} style={{ background: "" }}>
        <Input
         placeholder="email"
         size="large"
         onChange={(e) => this.setState({ signupEmail: e.target.value })}
        />
       </AntCol>
      </AntRow>
      <AntRow className="gutter-row">
       <AntCol span={24} style={{ background: "" }}>
        <Input
         placeholder="password"
         size="large"
         type="password"
         onChange={(e) => this.setState({ signupPassword: e.target.value })}
        />
       </AntCol>
      </AntRow>
      <AntRow>
       <AntCol span={24}>
        <AntButton
         size="large"
         className="w-100 r-auth-modal"
         onClick={() => {
          this.handleRegularSignup(
           this.state.signupFname,
           this.state.signupLname,
           this.state.signupEmail,
           this.state.signupPassword
          );
         }}
        >
         Create an Account
        </AntButton>
       </AntCol>
      </AntRow>
      <AntRow>
       <AntCol span={24}>
        <div className="auth-modal-footer">
         Already have an account?
         <span className="link-bold black" onClick={this.flipToSigninFace}>
          Login
         </span>
        </div>
       </AntCol>
      </AntRow>
     </div>
    </div>
   </div>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignup: (fname, lname, email, password, method) =>
  dispatch(signupEmailPassword(fname, lname, email, password, method)),
 dispatchRegularSignin: (email, password) =>
  dispatch(vanillaSigninEmailPassword(email, password)),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthModalContent);
