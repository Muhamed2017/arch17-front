import React, { Component } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Form as FormAnt, Input, Button, message, Steps } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import * as utility from "../utitlties";
import {
 presistInfo,
 updateInfo,
 emailPasswordSignupSuccess,
} from "../redux/actions/authActions";
import CreateBrandRegister from "./CreateBrandRegister";
import CreateBrandVerify from "./CreateBrandVerify";
import CreateBrandFinish from "./CreateBrandFinish";
const { Step } = Steps;

class CreateBrand extends Component {
 constructor(props) {
  super(props);
  this.state = {
   current: this.props.brandStep ?? 0,
   steps: this.steps,
  };
 }

 componentDidMount() {
  //   console.log(this.props.userInfo);
  if (this.props.isLoggedIn) {
   if (this.props.userInfo?.emailVerified) {
    this.setState({ steps: this.authenticated_verified_steps });
   } else {
    this.setState({ steps: this.authenticated_unverified_steps });
   }
  } else {
   this.setState({ steps: this.unauthenticated_steps });
  }
 }
 steps = [
  {
   title: "Create Account",
   content: <CreateBrandRegister />,
  },
  {
   title: "Verify Account",
   content: <CreateBrandVerify />,
  },
  {
   title: "Create Brand / Store step",
   content: <CreateBrandFinish />,
  },
 ];
 authenticated_verified_steps = [
  {
   title: "Create Brand",
   content: <CreateBrandFinish />,
  },
 ];
 authenticated_unverified_steps = [
  {
   title: "Verify Your Account",
   content: <CreateBrandVerify />,
  },
  {
   title: "Create Brand",
   content: <CreateBrandFinish />,
  },
 ];
 unauthenticated_steps = [
  {
   title: "Create Account",
   content: <CreateBrandRegister />,
  },
  {
   title: "Verify Account",
   content: <CreateBrandVerify />,
  },
  {
   title: "Create Brand",
   content: <CreateBrandFinish />,
  },
 ];

 render() {
  return (
   <>
    <div id="create-brand">
     <Row>
      <Col span={24}>
       <Steps current={this.props.brandStep}>
        {/* <Steps current={2}> */}
        {this.state.steps.map((item) => (
         <Step key={item.title} title={item.title} />
        ))}
       </Steps>
       <div className="steps-content">
        {this.state.steps[this.props.brandStep ?? this.state.current].content}
       </div>
      </Col>
     </Row>
    </div>
   </>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 updateInfo: (info) => dispatch(updateInfo(info)),
 sigupSuccess: (info) => dispatch(emailPasswordSignupSuccess(info)),
});
const mapStateToProps = (state) => {
 return {
  userInfo: state.regularUser.info,
  brandStep: state.regularUser.brandStep,
  isLoggedIn: state.regularUser.isLoggedIn,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateBrand);
