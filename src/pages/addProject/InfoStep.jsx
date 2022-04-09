import React, { Component } from "react";
import { Form, Input, Checkbox, Row, Col, Select, DatePicker } from "antd";
import { connect } from "react-redux";

import ReactFlagsSelect from "react-flags-select";
import { addProjectInfo } from "./../../redux/actions/addProjectActions";
import { project_cats } from "../addProduct/ProductClassifications";
// import moment from "moment";

const { Option } = Select;
const config = {
 rules: [{ required: true, message: "Please select time!" }],
};
class InfoStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   country: this.props.info?.country ?? "",
   missed: false,
   selectedCats: [],
   selectedTypes: [],
  };
 }

 onFinish = (values) => {
  values.country = this.state.country;
  if (!values.country) {
   this.setState({ missed: true });
  } else {
   console.log("Success:", values);
   this.props.dispatchProjectInfo(values);
  }
 };

 onFinishFailed = (errorInfo) => {
  //   values.country = this.state.country;
  if (!this.state.country) {
   this.setState({ missed: true });
  }
  console.log("Failed:", errorInfo);
 };
 handleCatsChange = (selectedCats) => {
  this.setState({ selectedCats }, () => {
   console.log(this.state.selectedCats);
  });
 };
 handleTypesChange = (selectedTypes) => {
  this.setState({ selectedTypes }, () => {
   console.log(this.state.selectedTypes);
  });
 };
 render() {
  return (
   <>
    <div className="project-step-info p-5">
     <Form
      name="basic"
      size="large"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 12 }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
      autoComplete="off"
     >
      <Form.Item
       className="form-label mb-5"
       label="Project Name"
       initialValue={this.props.info?.name}
       // in
       name="name"
       rules={[{ required: true, message: "Project Name is required" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       name="blogType"
       initialValue={this.props.info?.blogType ?? ""}
       label="Article Type"
       className="form-label mb-5"
       rules={[{ required: true, message: "Kind is required" }]}
       wrapperCol={{ offset: 0, span: 24 }}
      >
       <Checkbox.Group>
        <Row span={24} gutter={12}>
         <Col md={10}>
          <Checkbox value="project" style={{ lineHeight: "32px" }}>
           Project
          </Checkbox>
         </Col>
         <Col md={14}>
          <Checkbox value="blog" style={{ lineHeight: "32px" }}>
           Design Blog
          </Checkbox>
         </Col>
        </Row>
       </Checkbox.Group>
      </Form.Item>
      <Form.Item
       name="category"
       label="Type"
       className="form-label mb-4"
       labelCol={{ span: 3, offset: 0 }}
       wrapperCol={{ span: 8, offset: 0 }}
       //    initialValue={this.props.info?.category ?? ""}
       rules={[{ required: true, message: "Please select your country!" }]}
      >
       <Select
        placeholder="Please select "
        size="large"
        mode="multiple"
        value={this.state.selectedCats}
        onChange={this.handleCatsChange}
        defaultValue={this.props.info?.category ?? []}
        showArrow
        style={{
         fontSize: "13px",
        }}
       >
        <Option value="Architecture">Architecture</Option>
        <Option value="Interior Design">Interior Design</Option>
        <Option value="Landscape">Landscape</Option>
        <Option value="Product Design">Product Design</Option>
        <Option value="Blog">Blog</Option>
       </Select>
      </Form.Item>
      <Form.Item
       name="type"
       label="Project"
       labelCol={{ span: 3 }}
       wrapperCol={{
        span: 8,
       }}
       className="form-label mb-5"
       rules={[{ required: true, message: "Please select your country!" }]}
      >
       <Select
        showSearch
        mode="multiple"
        onChange={this.handleTypesChange}
        defaultValue={this.props.info?.type ?? []}
        value={this.state.selectedTypes}
        placeholder="Please select a country"
        style={{
         fontSize: "13px",
        }}
       >
        {project_cats.map((p) => {
         return (
          <>
           <Option value={p}>{p}</Option>
          </>
         );
        })}
       </Select>
      </Form.Item>
      <Row span={24} gutter={15} justify="start">
       <Col md={24} className="my-3">
        <p className="form-label">Project Country & City </p>
       </Col>
       <Col md={6}>
        <ReactFlagsSelect
         selected={this.state.country}
         selectedSize={14}
         optionsSize={18}
         searchable
         placeholder="Select Country *"
         onSelect={(code) => {
          this.setState({ country: code });
         }}
        />
        {!this.state.country && this.state.missed && (
         <>
          <p style={{ color: "red" }}>country is required</p>
         </>
        )}
       </Col>
       <Col md={12}>
        <Form.Item
         initialValue={this.props.info?.city ?? ""}
         name="city"
         rules={[{ required: true, message: "City" }]}
        >
         <Input placeholder="City" />
        </Form.Item>
       </Col>
      </Row>
      <Form.Item
       wrapperCol={{ span: 6 }}
       name="year"
       label="Year"
       className="form-label mt-4"
       initialValue={this.props.info?.year}
       {...config}
      >
       <DatePicker
        size="large"
        picker="year"
        style={{
         width: "100%",
        }}
       />
      </Form.Item>

      <button
       className="next-btn"
       htmlType="submit"
       onClick={() => {
        console.log(this.state);
       }}
      >
       Save & Continue
      </button>
     </Form>
    </div>
   </>
  );
 }
}
// export default InfoStep;
const mapDispatchToProps = (dispatch) => ({
 dispatchProjectInfo: (info) => dispatch(addProjectInfo(info)),
});
const mapStateToProps = (state) => {
 return {
  loading: state.addProduct.loading,
  identity: state.addProduct.identity,
  tabIndex: state.addProduct.tabIndex,
  info: state.project.project_info,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoStep);
