import React, { Component } from "react";
import { steps } from "./AddProjectWrapper";
import { Steps, Button, Row, Col, Spin } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import { API } from "./../../utitlties";
import moment from "moment";
// import { editProject } from "./../../redux/actions/addProjectActions";
import { LoadingOutlined } from "@ant-design/icons";

import {
 NEXT_STEP,
 PREV_STEP,
 SET_INTITIAL_PROJECT_FOR_EDIT,
} from "./../../redux/constants";
// import { EditorState } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

const { Step } = Steps;
class EditProjectWrapper extends Component {
 constructor(props) {
  super(props);
  this.state = {
   projectId: this.props.match.params.id,
   fetched: false,
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
 componentDidMount() {
  const { projectId } = this.state;

  axios
   .get(`${API}project/${projectId}`)
   .then((response) => {
    const { name, country, type, year, city } = response.data.project;
    console.log(response);
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
      // content: EditorState.createWithContent(
      //  convertFromRaw(JSON.parse(response.data.project.content))
      // ),
      role_brands: response.data.brands,
      project_covers: response.data.project.images,
      role_designers: response.data.designers,
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
 render() {
  const current = this.props.step;
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
// const mapDispatchToProps = (dispatch) => ({
//  //  dispatchSetProject: (project) => dispatch(editProject(project)),
// });
const mapStateToProps = (state) => {
 return {
  step: state.project.step,
  project: state.project,
 };
};
export default connect(mapStateToProps, null)(EditProjectWrapper);
