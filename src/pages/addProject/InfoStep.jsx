import React, { Component } from "react";
import {
 Form,
 Input,
 Button,
 Checkbox,
 Row,
 Col,
 Select,
 DatePicker,
} from "antd";
import { connect } from "react-redux";

import ReactFlagsSelect from "react-flags-select";
import { addProjectInfo } from "./../../redux/actions/addProjectActions";

const { Option } = Select;
const config = {
 rules: [{ type: "object", required: true, message: "Please select time!" }],
};
class InfoStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   country: this.props.info?.country ?? "",
  };
 }

 onFinish = (values) => {
  values.country = this.state.country;
  console.log("Success:", values);
  this.props.dispatchProjectInfo(values);
 };

 onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
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
       initialValue={this.props.info?.name ?? ""}
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
       initialValue={this.props.info?.category ?? ""}
       rules={[{ required: true, message: "Please select your country!" }]}
      >
       <Select
        placeholder="Please select "
        size="large"
        showArrow
        style={{
         fontSize: "13px",
        }}
       >
        <Option value="type1">Type1</Option>
        <Option value="type2">Type2</Option>
       </Select>
      </Form.Item>
      <Form.Item
       name="type"
       initialValue={this.props.info?.type ?? ""}
       label="Project"
       labelCol={{ span: 3 }}
       wrapperCol={{
        span: 8,
       }}
       className="form-label mb-5"
       rules={[{ required: true, message: "Please select your country!" }]}
      >
       <Select
        placeholder="Please select a country"
        style={{
         fontSize: "13px",
        }}
       >
        <Option value="china">China</Option>
        <Option value="usa">U.S.A</Option>
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
       {...config}
       initialValue={this.props.info?.year}
      >
       <DatePicker
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
