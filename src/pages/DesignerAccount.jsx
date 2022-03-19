import React, { Component } from "react";
import { Steps, Button } from "antd";
import RegisterDesignerAccount from "./Auth/RegisterDesignerAccount";
import { auth } from "./../firebase";
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

  auth.onAuthStateChanged((user) => {
   this.setState({
    current: user ? 1 : 0,
   });
  });
 }
 next = () => {
  this.setState({ current: this.state.current + 1 });
 };

 prev = () => {
  this.setState({ current: this.state.current - 1 });
 };
 //  componentDidMount() {}
 render() {
  return (
   <>
    <div className="step-container">
     <div className="custom-auth-steps" style={{}}>
      <Steps current={this.state.current}>
       {steps.map((item) => (
        <Step key={item.title} title={item.title} icon={<></>} />
       ))}
      </Steps>
     </div>
     <div className="steps-content">{steps[this.state.current].content}</div>
     <div className="steps-action">
      {this.state.current < steps.length - 1 && (
       <Button type="primary" onClick={() => this.next()}>
        Next
       </Button>
      )}
      {/* {this.state.current === steps.length - 1 && (
       <Button
        type="primary"
        onClick={() => message.success("Processing complete!")}
       >
        Done
       </Button>
      )} */}
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
export default connect(mapStateToProps)(DesignerAccount);
