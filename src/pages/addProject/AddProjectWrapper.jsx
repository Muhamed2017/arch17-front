import React, { Component } from "react";
import "./Porject.css";
import { Steps, Button, Row, Col } from "antd";
import InfoStep from "./InfoStep";
// import ContentStep from "./ContentStep";
import RoleStep from "./RoleStep";
import ProductsTagsStep from "./ProductsTagsStep";
import { connect } from "react-redux";
import {
 NEXT_STEP,
 PREV_STEP,
 SET_PROJECT_PARAMS,
 //  GO_TO_PROJECT_STEP,
} from "./../../redux/constants";
import CoverStep from "./CoverStep";
import TextEditor from "../TextEditor";

const { Step } = Steps;

export const steps = [
 {
  title: (
   <div
    onClick={() => {
     console.log("info");
     //  this.props.dispatch({})
    }}
   >
    1.Project Info
   </div>
  ),
  content: <InfoStep />,
 },
 {
  title: "2.Content",
  //   content: <ContentStep />,
  content: <TextEditor />,
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
   creatorType: this.props.match.params.type,
   creatorId: this.props.match.params.id,
  };
 }
 componentDidMount() {
  this.props.dispatch({
   type: SET_PROJECT_PARAMS,
   payload: {
    creatorType: this.props.match.params.type,
    creatorId: this.props.match.params.id,
   },
  });
  console.log("MMMMM");
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
  //   const current = 1;
  return (
   <>
    <div className="addprojectwrapper">
     <Row span={24} gutter>
      <Col md={24} className="bg-white mb-2 py-3 static-bar">
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
       <div
        className={`steps-content custom-content wrapper-inner step${current}`}
       >
        {steps[current].content}

        <div className="steps-action">
         {current > 0 && (
          <button
           className="prev-btn"
           style={{ margin: "0 0px", position: "relative" }}
           onClick={() => this.prev()}
          >
           Previous
          </button>
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
  project: state.project,
 };
};
export default connect(mapStateToProps)(AddProjectWrapper);
