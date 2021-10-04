import React, { Component } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Form as FormAnt, Input } from "antd";
import { connect } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { API } from "./../utitlties";
import {
 createBrandBrandNext,
 presistInfo,
 updateInfo,
} from "./../redux/actions/authActions";
class CreateBrandVerify extends Component {
 constructor(props) {
  super(props);
  this.state = {
   code: "",
   validated: false,
  };
 }
 componentDidMount() {
  if (this.state.validated) {
   this.props.brandNext();
  } else {
   const fdata = new FormData();
   fdata.append("uid", this.props.userInfo?.uid);
   axios.post(`${API}user`, fdata).then((response) => {
    console.log(response);
    console.log("validation code sent");
   });
  }
 }
 verifyAccount = (e) => {
  e.preventDefault();
  const fd = new FormData();
  fd.append("uid", this.props.userInfo.uid);
  fd.append("code", this.state.code);
  axios
   .post(`${API}validate-code`, fd)
   .then((response) => {
    this.setState({ validated: true });
    this.props.brandNext();
    console.log(response);
    // this.props.updateInfo(response.data.user);
    presistInfo(response.data.user, true);
   })
   .catch((err) => {
    console.log(err);
   });
 };
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
         <h2>Verify Your Account</h2>
         <h6>An e-mail with a verify code has been sent to your e-mail box</h6>
        </div>
        <Form noValidate>
         <Form.Group style={{ marginBottom: "0" }}>
          <FormAnt>
           <FormAnt.Item
            name="code"
            style={{ marginBottom: "18px" }}
            rules={[
             {
              type: "text",
              message: "Code must be 6 digits",
             },
             {
              required: true,
              message: "please Enter 6-digits sent to your email",
             },
            ]}
           >
            <Input
             size="large"
             onChange={(e) => this.setState({ code: e.target.value })}
             placeholder="Enter 6-digit code "
            />
           </FormAnt.Item>
          </FormAnt>
         </Form.Group>
         <button
          className="coninue-btn regular-auth mb-3"
          onClick={this.verifyAccount}
         >
          {this.props.loading ? (
           <>
            Verifing your email
            <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
           </>
          ) : (
           <>Verify</>
          )}
         </button>
         <div className="terms">
          <p>
           Didn’t receive the email? Check your spam filter for an email from
           support@arch17.com. or <span>Resend code</span>
          </p>
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
 brandNext: () => dispatch(createBrandBrandNext()),
 //  brandNext: () => dispatch(createBrandVerifyNext()),

 updateInfo: (info) => dispatch(updateInfo(info)),
});
const mapStateToProps = (state) => {
 return {
  userInfo: state.regularUser.info,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateBrandVerify);
