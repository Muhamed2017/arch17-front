import React, { Component } from "react";
import { Steps, Button } from "antd";
import { connect } from "react-redux";
import CreateCompanyStep from "./CreateCompanyStep";
import RegisterDesignerAccount from "../pages/Auth/RegisterDesignerAccount";
const { Step } = Steps;

const steps = [
 {
  title: "1. Create an account",
  content: <RegisterDesignerAccount for_company={true} />,
 },
 {
  title: "|  2. Create Company",
  content: <CreateCompanyStep />,
 },
];
class CreateDesignCompanyWrapper extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }
 render() {
  let current = this.props.isLoggedIn ? 1 : 0;
  return (
   <>
    <div className="step-container">
     <div className="custom-auth-steps" style={{}}>
      <Steps current={current} vertical={false}>
       {steps.map((item) => (
        <Step key={item.title} title={item.title} icon={<></>} />
       ))}
      </Steps>
     </div>
     <div className="steps-content">{steps[current].content}</div>
     <div className="steps-action">
      {this.state.current < steps.length - 1 && (
       <Button type="primary" onClick={() => this.next()}>
        Next
       </Button>
      )}
     </div>
    </div>
   </>
  );
 }
}
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  uid: state.regularUser?.info?.uid,
  requesting: state.addProduct.requesting,
 };
};
export default connect(mapStateToProps)(CreateDesignCompanyWrapper);
