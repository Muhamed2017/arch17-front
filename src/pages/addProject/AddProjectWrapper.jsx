import React, { Component } from "react";
import "./Porject.css";
import { Steps, Button, message, Row, Col } from "antd";
import InfoStep from "./InfoStep";
import ContentStep from "./ContentStep";
import RoleStep from "./RoleStep";
import ProductsTagsStep from "./ProductsTagsStep";
import { connect } from "react-redux";
import { NEXT_STEP, PREV_STEP } from "./../../redux/constants";
import CoverStep from "./CoverStep";
const { Step } = Steps;

const steps = [
 {
  title: "1.Project Info",
  content: <InfoStep />,
 },
 {
  title: "2.Content",
  content: <ContentStep />,
 },
 {
  title: "3.Role",
  content: <RoleStep />,
 },

 {
  title: "4.Tag Products",
  content: <ProductsTagsStep />,
 },
 {
  title: "5.Cover",
  content: <CoverStep />,
 },
];

class AddProjectWrapper extends Component {
 constructor(props) {
  super(props);
  this.state = {
   current: this.props.step,
  };
 }
 componentDidMount() {
  this.setState({
   current: this.props.step,
  });
 }
 next = () => {
  this.props.dispatch({
   type: NEXT_STEP,
  });
 };

 prev = () => {
  this.props.dispatch({
   type: PREV_STEP,
  });
 };
 render() {
  const current = this.props.step;
  return (
   <>
    <div className="addprojectwrapper">
     <Row span={24} gutter>
      <Col md={24} className="bg-white mb-2 py-3">
       <div className="wrapper-inner">
        <Steps forceRender current={current} icon="">
         {steps.map((item) => (
          <Step
           forceRender
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
          <Button
           style={{ margin: "0 8px", position: "relative", left: "-114px" }}
           onClick={() => this.prev()}
          >
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
          <Button
           type="primary"
           onClick={() => this.next()}
           style={{
            display: "none",
           }}
          >
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

const mapStateToProps = (state) => {
 return {
  step: state.project.step,
 };
};
export default connect(mapStateToProps)(AddProjectWrapper);
