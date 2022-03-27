import React, { Component } from "react";
import "./Porject.css";
import { Steps, Button, message, Row, Col } from "antd";
import InfoStep from "./InfoStep";
import ContentStep from "./ContentStep";
import RoleStep from "./RoleStep";
import ProductsTagsStep from "./ProductsTagsStep";
import { connect } from "react-redux";
import {
 NEXT_STEP,
 PREV_STEP,
 SET_PROJECT_PARAMS,
} from "./../../redux/constants";
import CoverStep from "./CoverStep";
import axios from "axios";
import { convertToRaw } from "draft-js";

import { API } from "../../utitlties";
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
 handleSubmitAddPrject = () => {
  const {
   name,
   blogType,
   category,
   type,
   country,
   city,
   year,
  } = this.props?.project.project_info;
  const fd = new FormData();
  fd.append("name", name);
  fd.append("article_type", blogType[0]);
  fd.append("kind", category);
  fd.append("type", type);
  fd.append("country", country);
  fd.append("city", city);
  fd.append("title", "TITLE");
  fd.append("year", year);
  fd.append("cover", year);
  fd.append(
   "content",
   JSON.stringify(
    convertToRaw(this.project?.project_content?.getCurrentContent())
   )
  );

  this.props.project.role_designers?.map((p) => {
   fd.append("users[]", p.id);
  });
  this.props.project.role_brands?.map((s) => {
   fd.append("stores[]", s.id);
  });
  this.props.project.project_tags?.map((p) => {
   fd.append("products[]", p);
  });

  axios.post();
 };
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
