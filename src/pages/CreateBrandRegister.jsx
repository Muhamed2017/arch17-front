import React, { Component } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Form as FormAnt, Input } from "antd";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { connect } from "react-redux";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import * as utility from "../utitlties";
import {
 presistInfo,
 signupGoogle,
 updateInfo,
 emailPasswordSignupSuccess,
 signupEmailPassword,
 createBrandVerifyNext,
} from "../redux/actions/authActions";
class CreateBrandRegister extends Component {
 constructor(props) {
  super(props);
  this.state = {
   fname: "",
   lname: "",
   email: "",
   password: "",
   method: "",
  };
 }
 signupEmailPassword = () => {
  const fd = new FormData();
  fd.append("fname", this.state.fname);
  fd.append("lname", this.state.lname);
  fd.append("email", this.state.email);
  fd.append("password", this.state.password);
  axios.post(`${utility.API}user/register`, fd).then((response) => {
   console.log(response);
   this.props.brandNext();
   this.props.sigupSuccess(response.data.user);
   presistInfo(response.data.user, true);
   const fdata = new FormData();
   fdata.append("uid", response.data.user.uid);
   axios.post(`${utility.API}user`, fdata).then((response) => {
    console.log(response);
    console.log("validation code sent");
   });
  });
 };
 //  componentDidMount
 render() {
  return (
   <>
    <div id="wrapper" className="auth-form">
     <Container fluid>
      <Row className="justify-content-md-center">
       <Col
        className="m-auto p-5 bg-white rounded"
        style={{ position: "relative" }}
       >
        <div className="heading">
         <h2>Create Brand / Store</h2>
         <h6>
          Reach Designers world wide to promote and sell your products and
          services
         </h6>
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
               onChange={(e) => this.setState({ fname: e.target.value })}
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
               onChange={(e) => this.setState({ lname: e.target.value })}
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
          >
           <span style={{ padding: "0px 10px 0px 0" }}>Signup By:</span>
           <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            onClick={() => {
             console.log("email selected");
            }}
           >
            E-mail
           </button>
          </div>
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
               onChange={(e) => this.setState({ email: e.target.value })}
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
                 } else if (!utility.hasCapital.test(value)) {
                  return Promise.reject(new Error("Should have Lower Letter"));
                 } else if (!utility.hasLower.test(value)) {
                  return Promise.reject(
                   new Error("Should have Capital Letter")
                  );
                 } else if (!utility.hasNumeric.test(value)) {
                  return Promise.reject(
                   new Error("Should have Numeric Letter")
                  );
                 } else if (!utility.hasSpecial.test(value)) {
                  return Promise.reject(
                   new Error("Should have Special Letter")
                  );
                 }
                 return Promise.resolve();
                },
               }),
              ]}
             >
              <Input.Password
               size="large"
               onChange={(e) => this.setState({ password: e.target.value })}
               placeholder="Enter Password"
              />
             </FormAnt.Item>
            </FormAnt>
           </Form.Group>
          </div>
         </div>
         <button
          className="coninue-btn regular-auth"
          onClick={(e) => {
           e.preventDefault();
           this.signupEmailPassword();
          }}
         >
          {this.props.loading ? (
           <>
            Creating New Account
            <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
           </>
          ) : (
           <>Continue</>
          )}
         </button>
         <div id="recaptch-container"></div>
         <div className="form-separator"></div>
         <button
          className="coninue-btn facebook-auth"
          onClick={(e) => {
           e.preventDefault();
           this.props.dispatchFacebookSignup();
          }}
         >
          <span>
           <FaFacebookF />
          </span>
          Continue With Facebook
         </button>
         <LinkedIn
          disabled={{ disabled: true }}
          clientId="78elnnx8q5k0w5"
          redirectUri="http://localhost:3000/callback"
          scope="r_emailaddress"
          className="coninue-btn linkedin-auth"
          redirectPath="http://localhost:3000/callback"
         >
          <button
           className="coninue-btn linkedin-auth"
           disabled={{ disabled: true }}
          >
           <span>
            <FaLinkedinIn />
           </span>
           Continue With Linkedin
          </button>
         </LinkedIn>
         <button
          className="coninue-btn google-auth"
          onClick={(e) => {
           e.preventDefault();
           this.props.dispatchGoogleSignup();
          }}
         >
          <span>
           <FcGoogle />
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
           Already have an Arch17 ID?
           <a href="/signin">
            <span> Sign in</span>
           </a>
          </p>
         </div>
         <div></div>
         <div className="sign-footer">
          <a href="designeraccount">Create a Designer Account</a>
         </div>
        </Form>
       </Col>
      </Row>
     </Container>
    </div>
   </>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignup: (fname, lname, email, password, method) =>
  dispatch(signupEmailPassword(fname, lname, email, password, method)),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),

 updateInfo: (info) => dispatch(updateInfo(info)),
 sigupSuccess: (info) => dispatch(emailPasswordSignupSuccess(info)),
 brandNext: () => dispatch(createBrandVerifyNext()),
});
const mapStateToProps = (state) => {
 return {
  userInfo: state.userInfo,
 };
};
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(CreateBrandRegister);
