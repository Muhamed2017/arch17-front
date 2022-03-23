import React, { Component } from "react";
import "./Porject.css";
import { Steps, Button, message, Row, Col } from "antd";
import InfoStep from "./InfoStep";
// import ContentStep from "./ContentStep";
import Edit from "./Edit";
// import CustomeEditor from "./CustomEditor";

const { Step } = Steps;

const steps = [
 {
  title: "1.Project Info",
  //   content: "Basic Project info",
  content: <InfoStep />,
 },
 {
  title: "2.Content",
  //   content: "Text Editor",
  //   content: <ContentStep />,
  content: <Edit />,
 },
 {
  title: "3.Role",
  content: "Designer & Brands",
 },

 {
  title: "4.Tag Products",
  content: "Products boxes",
 },
 {
  title: "5.Cover",
  content: "Cropper",
 },
];
class AddProjectWrapper extends Component {
 constructor(props) {
  super(props);
  this.state = {
   current: 0,
  };
 }
 next = () => {
  this.setState({ current: this.state.current + 1 });
 };

 prev = () => {
  this.setState({ current: this.state.current - 1 });
 };
 render() {
  const { current } = this.state;
  return (
   <>
    <div className="addprojectwrapper">
     <Row span={24} gutter>
      <Col md={24} className="bg-white mb-2 py-3">
       <div className="wrapper-inner">
        <Steps current={current} icon="">
         {steps.map((item) => (
          <Step
           key={item.title}
           title={item.title}
           icon={() => {
            return "";
           }}
          />
         ))}
        </Steps>
       </div>
      </Col>

      <Col md={24}>
       <div className="steps-content custom-content wrapper-inner">
        {steps[current].content}

        <div className="steps-action">
         {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
           Previous
          </Button>
         )}
         {current === steps.length - 1 && (
          <Button
           type="primary"
           onClick={() => message.success("Processing complete!")}
          >
           Done
          </Button>
         )}
         {current < steps.length - 1 && (
          <Button type="primary" onClick={() => this.next()}>
           Next
          </Button>
         )}
        </div>
       </div>
      </Col>
     </Row>
    </div>
   </>
  );
 }
}

export default AddProjectWrapper;
