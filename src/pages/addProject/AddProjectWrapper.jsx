import React, { Component } from "react";
import "./Porject.css";
import { Steps, Row, Col } from "antd";
import InfoStep from "./InfoStep";
import RoleStep from "./RoleStep";
import ProductsTagsStep from "./ProductsTagsStep";
import { connect } from "react-redux";
import {
 NEXT_STEP,
 PREV_STEP,
 SET_PROJECT_PARAMS,
 ADD_PROJECT_ROLE_DESIGNER,
 ADD_PROJECT_ROLE_COMPANY,
 ADD_PROJECT_ROLE_BRAND,
} from "./../../redux/constants";
import CoverStep from "./CoverStep";
import TextEditor from "../TextEditor";
import { API } from "../../utitlties";
import axios from "axios";

const { Step } = Steps;

export const steps = [
 {
  title: (
   <div
    onClick={() => {
     console.log("info");
    }}
   >
    1.Project Info
   </div>
  ),
  content: <InfoStep />,
 },
 {
  title: "2.Content",
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
   creator: null,
  };
 }
 componentDidMount() {
  if (this.props.match.params.type && this.props.match.params.id) {
   axios
    .get(`${API}${this.props.match.params.type}/${this.props.match.params.id}`)
    .then((response) => {
     console.log(response);
     if (this.props.match.params.type === "company") {
      this.props.dispatch({
       type: ADD_PROJECT_ROLE_COMPANY,
       payload: response.data.company,
      });
     }
     if (this.props.match.params.type === "designer") {
      this.props.dispatch({
       type: ADD_PROJECT_ROLE_DESIGNER,
       payload: response.data.designer,
      });
     }
     if (this.props.match.params.type === "store") {
      this.props.dispatch({
       type: ADD_PROJECT_ROLE_BRAND,
       payload: response.data.store[0],
      });
     }
    });
  }
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
  //   const current = 3;
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
       </div>
      </Col>
     </Row>
    </div>
   </>
  );
 }
}
// const mapDispatchToProps = (dispatch) => ({
//  dispatchAddDesigner: (designer) => dispatch(addProjectRoleDesigner(designer)),
//  dispatchAddCompany: (company) => dispatch(addProjectRoleCompany(company)),
// });
const mapStateToProps = (state) => {
 return {
  step: state.project.step,
  project: state.project,
 };
};
export default connect(mapStateToProps, null)(AddProjectWrapper);
