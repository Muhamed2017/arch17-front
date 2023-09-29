import React, { Component } from "react";
import {
 Modal,
 Select,
 Input,
 Form,
 // InputNumber,
 Col,
 Button,
 Row,
} from "antd";
// const { Option } = Select;
const { TextArea } = Input;

const areas = [
 {
  label: "Fabric",
  value: "Fabric",
 },
];

class AddSwitchGroup extends Component {
 constructor(props) {
  super(props);
  this.state = {
   visible: true,
  };
 }
 openModal = () => {
  this.setState({
   visible: true,
  });
 };

 onFinish = (values) => {
  console.log("Received values of form:", values);
 };
 render() {
  const { visible } = this.state;
  return (
   <>
    <button onClick={this.openModal}>Add Switch Group</button>
    <Modal
     footer={false}
     width={580}
     className="switch-group-modal"
     style={{
      top: 25,
     }}
     centered={false}
     closable
     visible={visible}
     destroyOnClose
     onCancel={() => {
      this.setState({
       visible: false,
      });
     }}
     title="Add Switch Group"
    >
     <div className="form-wrapper">
      <Form
       size="large"
       name="dynamic_form_complex"
       onFinish={this.onFinish}
       autoComplete="off"
       style={{
        textAlign: "left",
       }}
      >
       <Form.Item
        name={"name"}
        rules={[
         {
          required: true,
         },
        ]}
       >
        <Input placeholder="Switch Name" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 24,
        }}
        name="switch_type"
        rules={[
         {
          required: true,
          message: "Switch Type is required",
         },
        ]}
       >
        <Select options={areas} placeholder="Switch Type" />
       </Form.Item>
       {/* -- Switch info are optional, You can add the available data */}
       {/* ------------------------------------------- */}
       <Row span={24} className="my-3">
        <Col md={4}>
         <span>Switch Info</span>
        </Col>
        <Col md={20}>
         <span>are optional, You can add the available data </span>
        </Col>
       </Row>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        label="Composition"
        name={"composition"}
       >
        <Input />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        label="Origin"
        name={"origin"}
       >
        <Input placeholder="Select Switch country of origin" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"width"}
        label="Width"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 6,
        }}
        labelCol={{
         span: 5,
        }}
        name={"weight"}
        label="Weight"
        style={{
         display: "inline-block",
         //   width: 'calc(50% - 8px)'
        }}
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        labelCol={{
         offset: 12,
         span: 5,
        }}
        wrapperCol={{
         span: 6,
         offset: 18,
        }}
        name={"per"}
        label="Grams per"
        style={{
         display: "inline-block",
         //   width: 'calc(50% - 8px)'
        }}
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"lightfastness"}
        label="Lightfastness"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"rubbing"}
        label="Rubbing"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"pilling"}
        label="Pilling"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"cleaning"}
        label="Cleaning"
       >
        <Input placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"flammabitiy"}
        label="Flammabitiy"
       >
        <TextArea placeholder="" />
       </Form.Item>
       <Form.Item
        wrapperCol={{
         span: 19,
        }}
        labelCol={{
         span: 5,
        }}
        name={"notes"}
        label="Notes"
       >
        <TextArea placeholder="" />
       </Form.Item>
       <Form.Item>
        <Button type="primary" htmlType="submit">
         Submit
        </Button>
       </Form.Item>
      </Form>
     </div>
    </Modal>
   </>
  );
 }
}

export default AddSwitchGroup;
