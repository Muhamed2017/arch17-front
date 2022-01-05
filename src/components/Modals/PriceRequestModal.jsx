import { Form, Space, Col, Row, Button, Input, Divider, Spin } from "antd";
import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/en/world.json";
import "antd/dist/antd.css";
import "antd-country-phone-input/dist/index.css";
import "flagpack/dist/flagpack.css";
import axios from "axios";
import { connect } from "react-redux";
import SuccessModal from "./SuccessModal";

import {
 openProductRequestAction,
 closeProductRequestAction,
} from "../../redux/actions/addProductActions";
const PriceRequestModal = (props) => {
 const [form] = Form.useForm();
 const [phone, setPhone] = useState("");
 const [requesting, setRequesting] = useState(false);

 const { TextArea } = Input;

 const onFinish = (values) => {
  setRequesting(true);
  console.log(values);
  axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
   console.log(res);
   setRequesting(false);
   props.dispatchRequestClose();
   SuccessModal(
    <>
     <h2 className="success-head">Thank You</h2>
     <p className="success-msg">
      Your Request has been received, and our team will get in touch with you
      shortly.
     </p>
    </>
   );
  });
  console.log(phone);
 };

 const onFinishFailed = () => {
  console.log("Failed");
 };

 return (
  <>
   <Row>
    <Col flex="200px">
     <div
      className="cover-wrapper"
      style={{ backgroundImage: `url(${props.cover})` }}
     ></div>
     <div className="name">{props?.name}</div>
     <p>{props.store}</p>
    </Col>
    <Col flex="10px">
     <Divider type="vertical" style={{ height: "340px" }} />
    </Col>
    <Col flex="auto">
     <Form
      className="px-3"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
     >
      <Form.Item
       name="email"
       label="Email"
       initialValue={props.user.email ?? ""}
       rules={[{ required: true }, { type: "email", warningOnly: true }]}
      >
       <Input placeholder="Enter Email" size="large" />
      </Form.Item>
      <Form.Item label="Phone Number">
       <ConfigProvider
        locale={en}
        areaMapper={(area) => {
         return {
          ...area,
          emoji: <span className={`fp ${area.short.toLowerCase()}`} />,
         };
        }}
       >
        <CountryPhoneInput
         size="large"
         onChange={(e) => setPhone(`+${e.code}${e.phone}`)}
        />
       </ConfigProvider>
      </Form.Item>
      <Form.Item
       name="message"
       label="Message"
       rules={[{ required: true }, { type: "string", warningOnly: true }]}
      >
       <TextArea
        placeholder="Type your message"
        allowClear
        autoSize={{ minRows: 4 }}
        size="large"
       />
      </Form.Item>

      <Form.Item>
       <Space>
        <Button type="danger" htmlType="submit">
         Send
         {requesting && (
          <>
           <Spin
            indicator={
             <LoadingOutlined
              style={{ fontSize: 18, margin: "1px 3px 3px 8px" }}
              spin
             />
            }
           />
          </>
         )}
        </Button>
       </Space>
      </Form.Item>
     </Form>
    </Col>
   </Row>
  </>
 );
};

// export default PriceRequestModal;
const mapDispatchToProps = (dispatch) => ({
 dispatchRequestOpen: () => dispatch(openProductRequestAction()),
 dispatchRequestClose: () => dispatch(closeProductRequestAction()),
});
const mapStateToProps = (state) => {
 return {
  requesting: state.addProduct.requesting,
  user: state.regularUser.info,
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceRequestModal);
