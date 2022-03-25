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
    <div className="project-step-content p-5">
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
       label="Project Kind"
       rules={[{ required: true, message: "Kind is required" }]}
       wrapperCol={{ offset: 0, span: 24 }}
      >
       <Checkbox.Group>
        <Row span={24}>
         <Col md={16}>
          <Checkbox value="project" style={{ lineHeight: "32px" }}>
           Project
          </Checkbox>
         </Col>
         <Col md={8}>
          <Checkbox value="blog" style={{ lineHeight: "32px" }}>
           Blog
          </Checkbox>
         </Col>
        </Row>
       </Checkbox.Group>
      </Form.Item>
      <Form.Item
       name="category"
       label="Project Category"
       initialValue={this.props.info?.category ?? ""}
       rules={[{ required: true, message: "Please select your country!" }]}
      >
       <Select placeholder="Please select ">
        <Option value="type1">Type1</Option>
        <Option value="type2">Type2</Option>
       </Select>
      </Form.Item>
      <Form.Item
       name="type"
       initialValue={this.props.info?.type ?? ""}
       label="Project Type"
       rules={[{ required: true, message: "Please select your country!" }]}
      >
       <Select placeholder="Please select a country">
        <Option value="china">China</Option>
        <Option value="usa">U.S.A</Option>
       </Select>
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
      <Form.Item
       name="monthPicker"
       label="MonthPicker"
       {...config}
       initialValue={this.props.info?.monthPicker}
      >
       <DatePicker picker="month" />
      </Form.Item>

      <Button
       type="primary"
       className="next-btn"
       htmlType="submit"
       onClick={() => {
        console.log(this.state);
       }}
      >
       Save & Continue
      </Button>
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
