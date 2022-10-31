import React, { Component } from "react";
// import { steps } from "./AddProjectWrapper";
import { Steps, Row, Col, Spin } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import { API } from "./../../utitlties";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

import InfoStep from "./InfoStep";
import RoleStep from "./RoleStep";
import ProductsTagsStep from "./ProductsTagsStep";
import CoverStep from "./CoverStep";
import TextEditor from "../TextEditor";
import {
 GO_TO_PROJECT_STEP,
 NEXT_STEP,
 PREV_STEP,
 SET_INTITIAL_PROJECT_FOR_EDIT,
} from "./../../redux/constants";

const { Step } = Steps;
class EditProjectWrapper extends Component {
 constructor(props) {
  super(props);
  this.state = {
   projectId: this.props.match.params.id,
   fetched: false,
   brands: this.props.brands,
  };
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

 //  gotoStep = (step) => {};
 componentDidMount() {
  const { projectId } = this.state;
  axios
   .get(`${API}project/${projectId}`)
   .then((response) => {
    const { name, country, type, year, city } = response.data.project;
    console.log(response);
    this.setState({
     brands: response.data.brands,
    });
    this.props.dispatch({
     type: SET_INTITIAL_PROJECT_FOR_EDIT,
     payload: {
      projectId,
      info: {
       country,
       city,
       name,
       year: moment({ year, month: 1, day: 1 }),
       type,
       category: response.data.project.kind,
       blogType: response.data.project.article_type,
      },
      content: response.data.project?.content,
      role_brands: response.data.brands,
      project_covers: response.data.project.images,
      role_designers: response.data.designers,
      role_companies: response.data.project?.company_roles,
      project_tags: response.data.products_tags?.map((p) => {
       return p.id;
      }),
     },
    });
    this.setState({
     fetched: true,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }
 steps = [
  {
   title: (
    <div
     className="edit-step-title"
     onClick={() => {
      console.log("info");
      this.props.dispatch({
       type: GO_TO_PROJECT_STEP,
       payload: 0,
      });
     }}
    >
     1.Project Info
    </div>
   ),
   content: <InfoStep />,
  },
  {
   title: (
    <div
     className="edit-step-title"
     onClick={() => {
      console.log("info");
      this.props.dispatch({
       type: GO_TO_PROJECT_STEP,
       payload: 1,
      });
     }}
    >
     2.Content
    </div>
   ),
   content: <TextEditor />,
  },
  {
   title: (
    <div
     className="edit-step-title"
     onClick={() => {
      console.log("info");
      this.props.dispatch({
       type: GO_TO_PROJECT_STEP,
       payload: 2,
      });
     }}
    >
     3.Role
    </div>
   ),
   content: <RoleStep />,
  },

  {
   //  title: "4.Tag Products",
   title: (
    <div
     className="edit-step-title"
     onClick={() => {
      console.log("info");
      this.props.dispatch({
       type: GO_TO_PROJECT_STEP,
       payload: 3,
      });
     }}
    >
     4.Tag Products
    </div>
   ),
   content: <ProductsTagsStep />,
   step_key: 3,
  },
  {
   title: (
    <div
     className="edit-step-title"
     onClick={() => {
      console.log("info");
      this.props.dispatch({
       type: GO_TO_PROJECT_STEP,
       payload: 4,
      });
     }}
    >
     5.Cover
    </div>
   ),
   content: <CoverStep />,
  },
 ];
 render() {
  const current = this.props.step;
  const steps = this.steps;
  if (!this.state.fetched)
   return (
    <Spin
     style={{
      minWidth: "120px",
     }}
     size="large"
     indicator={
      <LoadingOutlined style={{ fontSize: "25px", color: "#fff" }} spin />
     }
    />
   );
  return (
   <>
    <div className="addprojectwrapper">
     <Row span={24} gutter>
      <Col md={24} className="bg-white mb-2 py-3 static-bar">
       <div className="wrapper-inner">
        <Steps current={current} icon="">
         {steps.map((item) => (
          <Step
           disabled={this.state.brands?.length < 1 && item.step_key === 3}
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

      {/* <Col md={24}>
       <div className="steps-content custom-content wrapper-inner">
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
        </div>
       </div>
      </Col> */}
     </Row>
    </div>
   </>
  );
 }
}
// const mapDispatchToProps = (dispatch) => ({
//  //  dispatchSetProject: (project) => dispatch(editProject(project)),
// });
const mapStateToProps = (state) => {
 return {
  step: state.project.step,
  project: state.project,
  brands: state.project?.role_brands,
 };
};
export default connect(mapStateToProps, null)(EditProjectWrapper);
