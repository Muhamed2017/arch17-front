import React, { Component } from "react";
import { Steps } from "antd";
import RegisterDesignerAccount from "./Auth/RegisterDesignerAccount";
import { connect } from "react-redux";
import CreateDesignerAccountStep from "./Auth/CreateDesignerAccountStep";

const { Step } = Steps;

const steps = [
 {
  title: "1. Create an account",
  content: <RegisterDesignerAccount />,
 },
 {
  title: "|  2. Join Design Club",
  content: <CreateDesignerAccountStep />,
 },
];

class DesignerAccount extends Component {
 constructor(props) {
  super(props);
  this.state = {
   current: this.props.isLoggedIn ? 1 : 0,
  };
 }
 next = () => {
  this.setState({ current: this.state.current + 1 });
 };

 prev = () => {
  this.setState({ current: this.state.current - 1 });
 };
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
export default connect(mapStateToProps)(DesignerAccount);
