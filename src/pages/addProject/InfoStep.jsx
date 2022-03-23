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
import ReactFlagsSelect from "react-flags-select";

const { Option } = Select;
const config = {
 rules: [{ type: "object", required: true, message: "Please select time!" }],
};
class InfoStep extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }

 onFinish = (values) => {
  console.log("Success:", values);
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
       name="name"
       rules={[{ required: true, message: "Project Name is required" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       name="checkbox-group"
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
       rules={[{ required: true, message: "Please select your country!" }]}
      >
       <Select placeholder="Please select ">
        <Option value="type1">Type1</Option>
        <Option value="type2">Type2</Option>
       </Select>
      </Form.Item>
      <Form.Item
       name="type"
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
      <Form.Item name="month-picker" label="MonthPicker" {...config}>
       <DatePicker picker="month" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
       Submit
      </Button>
     </Form>
    </div>
   </>
  );
 }
}
export default InfoStep;
