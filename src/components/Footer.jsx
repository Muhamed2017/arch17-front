import { Component } from "react";
import { Row, Col, Input, Button, Checkbox, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import {
 FaPinterestP,
 FaLinkedinIn,
 FaFacebookF,
 FaVimeoV,
} from "react-icons/fa";
import { AiFillYoutube, AiFillWechat } from "react-icons/ai";
import { API } from "./../utitlties";
import SuccessModal from "../components/Modals/SuccessModal";

class Footer extends Component {
 state = {
  subscribe_email: "",
  subscribing: false,
  subscribe_checked: false,
 };
 subscribe = (email, checked) => {
  this.setState({
   subscribing: true,
  });
  console.log(email);
  console.log(checked);
  const fd = new FormData();
  fd.append("email", email);
  fd.append("proccessing_personal_data_approval", checked ? "yes" : "no");
  axios
   .post(`${API}subscribe`, fd)
   .then((response) => {
    this.setState({
     subscribing: false,
     subscribe_email: "",
    });
    SuccessModal(
     <>
      <h2 className="success-head">Subscribed</h2>
      <p className="success-msg">Thank you for subscribtion</p>
     </>
    );
    console.log(response);
   })
   .catch((error) => {
    this.setState({
     subscribing: false,
     subscribe_email: "",
    });
    console.log(error);
   });
 };
 render() {
  return (
   <>
    <div className="lightgray-footer"></div>
    <div className="darkgray-footer">
     <div className="px-0 pt-4 container">
      <Row gutter={24}>
       <Col md={8}>
        <p className="substext">
         Keep Updated with the Latest Design News, Projects and products
        </p>
       </Col>
       <Col md={10}>
        <Input.Group compact className="mb-4">
         <Input
          rules={[
           {
            required: true,
            message: "Please input your name",
           },
          ]}
          size="large"
          type="email"
          value={this.state.subscribe_email}
          style={{ width: "calc(100% - 200px)" }}
          placeholder="insert your email address"
          onChange={(e) => this.setState({ subscribe_email: e.target.value })}
         />
         <Button
          size="large"
          className="subsricbtn"
          type="submit"
          onClick={() =>
           this.subscribe(
            this.state.subscribe_email,
            this.state.subscribe_checked
           )
          }
         >
          {!this.state.subscribing ? (
           "Subscribe"
          ) : (
           <>
            <Spin
             indicator={
              <LoadingOutlined
               style={{
                fontSize: 18,
                margin: "1px 3px 3px 8px",
                color: "#fff",
               }}
               spin
              />
             }
            />
           </>
          )}
         </Button>
        </Input.Group>
        <Checkbox
         value="yes"
         style={{ fontSize: ".75rem", color: "#2b2d3a" }}
         onChange={(e) =>
          this.setState({ subscribe_checked: e.target.checked })
         }
        >
         I hereby consent to the processing of my personal data to receive
         offers and commercial communication from ARCH17.COM (Privacy Policy).
        </Checkbox>
       </Col>
      </Row>
     </div>
    </div>
    <div className="black-footer">
     <div className="px-0 container">
      <Row gutter={24}>
       <Col md={4}>
        <div className="footer-links">
         <p>Arch17</p>
         <p>About arch17</p>
         <p>17 Roomcraft</p>
         <p>Join our team</p>
        </div>
       </Col>
       <Col md={4}>
        <div className="footer-links">
         <p>Arch17 Business</p>
         <p>Create New Store</p>
         <p>Add Products</p>
         <p>Pricing</p>
        </div>
       </Col>
       <Col md={4}>
        <div className="footer-links">
         <p>Explore</p>
         <p>Furniture</p>
         <p>Projects & News</p>
        </div>
       </Col>
       <Col md={5}>
        <div className="footer-links">
         <p>Let Us Help</p>
         <p>How to create store on arch17</p>
         <p>How to add products</p>
         <p>Contact Us</p>
        </div>
       </Col>
       <Col md={7}>
        <div>
         <p>Follow Us On</p>
         <Row gutter={10} className="footer-social">
          <Col id="fb">
           <FaFacebookF />
          </Col>
          <Col id="linkdin">
           <FaLinkedinIn />
          </Col>
          <Col id="pinterest">
           <FaPinterestP />
          </Col>
          <Col id="vimo">
           <FaVimeoV />
          </Col>
          <Col id="ytb">
           <AiFillYoutube />
          </Col>
          <Col id="wechat">
           <AiFillWechat />
          </Col>
         </Row>
        </div>
       </Col>
      </Row>
     </div>
    </div>
    <div className="dark-footer">
     <div className="px-0 container">
      <Row className="pt-2">
       <Col md={8}>
        <p>© 2017-2019, ARCH17 TECHNOLOGY CO., LTD. SZ </p>
       </Col>
      </Row>
     </div>
    </div>
   </>
  );
 }
}
export default Footer;
