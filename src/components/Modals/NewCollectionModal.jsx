import { Form, Space, Col, Row, Button, Input, Divider, Spin } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";

import {
 openProductRequestAction,
 closeProductRequestAction,
} from "../../redux/actions/addProductActions";
import { API } from "../../utitlties";
// import { VscFolderActive } from "react-icons/vsc";
// import { AiFillPlusCircle, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import toast, { Toaster, resolveValue } from "react-hot-toast";
import { useSpring, animated, config, easings } from "react-spring";

const NewCollectionModal = (props) => {
 const [form] = Form.useForm();
 //  const [newCollection, setNewCollection] = useState("");
 const [boardCreated, setBoardCreated] = useState(false);
 const [creatingCollection, setCreatingCollection] = useState(false);
 const textfade = useSpring({
  from: {
   opacity: 0,
  },
  to: {
   opacity: boardCreated ? 1 : 0,
  },
  delay: 1500,
 });
 const transitions = useSpring({
  to: {
   x: boardCreated ? 100 : 0,
   //  background: "transparent",
  },
  from: { x: 0 },
  delay: 500,
  config: {
   duration: 700,
   easing: easings.easeInOutQuart,
  },
 });
 const showUp1 = useSpring({
  to: {
   opacity: boardCreated ? 1 : 0,
   y: boardCreated ? -280 : -380,
  },
  from: {
   y: -380,
   opacity: 0,
  },
  delay: 1000,
 });
 const showUp2 = useSpring({
  to: {
   opacity: boardCreated ? 1 : 0,
   y: boardCreated ? -290 : 80,
  },
  from: {
   opacity: 0,
   y: 80,
  },
  delay: 1000,
 });

 const onFinish = (values) => {
  console.log(values);
  if (values.name !== "") {
   setCreatingCollection(true);
   const fd = new FormData();
   fd.append("user_id", props.user.uid);
   fd.append("name", values.name);
   axios
    .post(`${API}collection`, fd)
    .then((res) => {
     console.log(res);
     setBoardCreated(true);
     toast("Product Placed into Board!", {
      icon: "👏",
      style: {
       borderRadius: "10px",
       background: "#333",
       color: "#fff",
      },
     });
    })
    .catch((err) => {
     setCreatingCollection(false);
    });
  }
 };

 const onCheck = async () => {
  try {
   const values = await form.validateFields();
   console.log("Success:", values);
   setBoardCreated(true);
   toast("Product Placed into Board!", {
    // icon: "👏",
    icon: "&#9989;",
    style: {
     borderRadius: "10px",
     background: "#333",
     color: "#fff",
     height: "50px  !important",
     //  padding: "20px 0",
    },
   });
  } catch (errorInfo) {
   console.log("Failed:", errorInfo);
  }
 };

 return (
  <>
   <Toaster position="bottom-center" duration={1} />
   <div
    style={{
     minHeight: 300,
    }}
   >
    <Row className="collections-modal">
     <Col flex="300px">
      <>
       <animated.div
        style={{
         borderRadius: "5px",
         background: "transparent",
         ...transitions,
        }}
       >
        <div
         className="cover-wrapper collected"
         style={{
          backgroundImage: `url(${props.cover})`,
          backgroundColor: !boardCreated ? "rgb(0, 26, 113, 0.02)" : "",
          backgroundSize: boardCreated ? "cover" : "",
          borderRadius: !boardCreated ? "3px" : "10px 0 0 10px",
         }}
        ></div>
        <animated.div style={showUp1}>
         <div className="collbox"></div>
        </animated.div>
        <animated.div style={showUp2}>
         <div className="collbox collbox-2"></div>
        </animated.div>
       </animated.div>
      </>
     </Col>
     {!boardCreated ? (
      <>
       <Col flex="10px">
        <Divider type="vertical" style={{ height: "100%" }} />
       </Col>
       <Col flex="auto">
        <Form layout={"vertical"} size="large" form={form} onFinish={onFinish}>
         <Form.Item
          label="Name"
          name="name"
          tooltip="This is a required field"
          rules={[
           {
            required: true,
            message: "Please input your name",
           },
          ]}
         >
          <Input placeholder="Board Name" />
         </Form.Item>
         <Form.Item>
          <Button
           type="primary"
           htmlType="submit"
           style={{
            borderColor: "#ff0433",
            background: "#fc0c24",
           }}
          >
           CREATE
           {creatingCollection && (
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
         </Form.Item>
        </Form>
       </Col>
      </>
     ) : (
      ""
     )}
    </Row>
    <Row className="my-4">
     <Col md={24}>
      <animated.div style={{ ...textfade }}>
       <h1
        style={{
         width: "100%",
         fontSize: "1.5rem",
         fontWeight: "600",
         display: "block",
         textAlign: "center",
        }}
       >
        You Saved Product to the board
       </h1>
      </animated.div>
     </Col>
    </Row>
   </div>
  </>
 );
};

const mapDispatchToProps = (dispatch) => ({
 dispatchRequestOpen: () => dispatch(openProductRequestAction()),
 dispatchRequestClose: () => dispatch(closeProductRequestAction()),
});
const mapStateToProps = (state) => {
 return {
  requesting: state.addProduct.requesting,
  user: state.regularUser.info,
  isLoggedIn: state.regularUser.isLoggedIn,
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCollectionModal);
