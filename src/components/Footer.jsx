import { Component } from "react";
import { Row as AntRow, Col as AntCol,  Input, Button as AntButton, Checkbox, Spin,
  Collapse
} from "antd";
import Modal from "react-bootstrap/Modal";

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
import qrcode from '../../src/qrcode.jpeg'

const { Panel } = Collapse;

class Footer extends Component {
 constructor(props) {
  super(props);
  this.state = {
   wechatqr_modal: false,
   subscribe_email: "",
   subscribing: false,
   subscribe_checked: false,
   lightgray: this.props.lightgray ?? true,
  };
 }

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
    {/* {this.state.lightgray && <div className="lightgray-footer"></div>}
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
        <p>{`© 2017-2022, ARCH17 TECHNOLOGY CO., LTD. SZ .    粤ICP备19015731号-1`}</p>
       </Col>
       <Col md={8}>
        <div className="footer-terms">
         <span>Privacy</span>
         <span>Cookies</span>
         <span>Terms and Conditions of Use</span>
        </div>
       </Col>
      </Row>
     </div>
    </div> */}
     <div className="wide-view">
     

     <div className="darkgray-footer">
      <div className="px-3 pt-4 container">
       <AntRow gutter={24}>
        <AntCol md={8} className="mb-3">
         <p className="substext">
          Keep Updated with the Latest Design News, Projects and products
         </p>
        </AntCol>
        <AntCol md={10}>
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
          <AntButton
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
          </AntButton>
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
        </AntCol>
       </AntRow>
      </div>
     </div>
     <div className="black-footer">
      <div className="px-3 container w-90">
       <AntRow gutter={24}>
        <AntCol md={4} sm={12} xs={12}>
         <div className="footer-links">
          <p>Arch17</p>
          <p>
          <a href="/aboutarch17" className="white">About arch17</a>
          </p>
          <p>
           <a className="white" href="/procurementservice">
            Procurement Service
           </a>
          </p>
          <p><a href="/designaccountintro" className="white">Design club</a></p>
          <p><a href="/arch17com" className="white">arch17.com</a></p>
         </div>
        </AntCol>
        <AntCol md={4} sm={12} xs={12}>
         <div className="footer-links">
          <p>Arch17 Business</p>
          <p>Create New Store</p>
          <p>
          <a href="#">Sell Products</a>
          {/* <a href="/sellproducts">Sell Products</a> */}
          </p>
         </div>
        </AntCol>
        <AntCol md={4} sm={12} xs={12}>
         <div className="footer-links">
          <p>Explore</p>
          <p>
            <a href="/categories">
            Products
            </a>
            </p>
          <p>
            <a href="/brands">
            Brands
            </a>
            </p>
          <p>
            <a href="/design-selected?&featuredBy=design-selected">
            Magazine
            </a>
            </p>
          <p>
            <a href="/designers?">
            Designers
            </a>
          </p>
         </div>
        </AntCol>
        <AntCol md={4} sm={12} xs={12}>
         <div className="footer-links">
          <p>For Designer</p>
          <p>How to create store on arch17</p>
          <p>Contact Us</p>
         </div>
        </AntCol>
        <AntCol md={7} sm={24} xs={24}>
         <div>
          <p>Follow Us On</p>
          <AntRow gutter={10} className="footer-social">
           <AntCol >
            <a href="https://www.facebook.com/Arch17Inc/" target="_blank">
            <FaFacebookF />
            </a>
           </AntCol>
           <AntCol >
            <a href="https://www.linkedin.com/company/arch17/" target="_blank">
            <FaLinkedinIn />
            </a>
           </AntCol>
           <AntCol >
            <a href="https://www.pinterest.com/arch17_design/" target="_blank">
            <FaPinterestP />
            </a>
           </AntCol>
           <AntCol >
            <a href="https://vimeo.com/393447284" target="_blank">
            <FaVimeoV />

            </a>
           </AntCol>
           <AntCol >
            <a href="https://www.youtube.com/@arch1779" target="_blank">
            <AiFillYoutube />
            </a>
           </AntCol>
           <AntCol >
            <AiFillWechat 
             onClick={() => {
              this.setState({ wechatqr_modal: true });
             }}
            />
           </AntCol>
          </AntRow>
         </div>
        </AntCol>
       </AntRow>
      </div>
     </div>
     <div className="dark-footer">
      <div className="px-3 container">
       <AntRow className="pt-2">
        <AntCol md={12}>
         <p>
          © 2017-2022, ARCH17 TECHNOLOGY CO., LTD. SZ .
          <span
           style={{
            marginLeft: "5rem",
           }}
          >
           粤ICP备19015731号-1
          </span>
         </p>
        </AntCol>
        <AntCol md={12}>
         <div className="footer-terms">
          <span>Privacy</span>
          <span>Cookies</span>
          <span>Terms and Conditions of Use</span>
         </div>
        </AntCol>
       </AntRow>
      </div>
     </div>
     <div className="home-layer"></div>
    </div>
    <div className="mobile-view">
    <div className="darkgray-footer">
      <div className="px-3 pt-4 container">
       <AntRow gutter={24}>
        <AntCol md={8} className="mb-3">
         <p className="substext">
          Keep Updated with the Latest Design News, Projects and products
         </p>
        </AntCol>
        <AntCol md={10}>
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
          <AntButton
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
          </AntButton>
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
        </AntCol>
       </AntRow>
      </div>
     </div>
     <div className="socials-links">
         <p className="social-head">Follow us on</p>
         <AntRow className="text-center" justify={"center"}  >
         <AntCol xs={4} sm={4}  >
          <a href="https://www.facebook.com/Arch17Inc/" target="_blank" rel="noreferrer">
          <FaFacebookF />
          </a>
           </AntCol>
           <AntCol xs={4} sm={4} >
            <a href="https://www.linkedin.com/company/arch17/" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
            </a>
           </AntCol>
           <AntCol xs={4} sm={4} >
            <a href="https://www.pinterest.com/arch17_design/" target="_blank" rel="noreferrer">
            <FaPinterestP />
            </a>
           </AntCol>
           <AntCol xs={4} sm={4} >
            <a href="https://vimeo.com/393447284" target="_blank" rel="noreferrer">
            <FaVimeoV />

            </a>
           </AntCol>
           <AntCol xs={4} sm={4} >
            <a href="https://www.youtube.com/@arch1779" target="_blank" rel="noreferrer">
            <AiFillYoutube />
            </a>
           </AntCol>
           <AntCol xs={4} sm={4} >
            <AiFillWechat 
             onClick={() => {
              this.setState({ wechatqr_modal: true });
             }}
            />
            
           </AntCol>
         </AntRow>
       </div>
     <div className="black-footer">
     
      <Collapse
      className="footer-collapse"
       expandIconPosition="right"

      >
       <Panel
       header="Arch17"
      >
       <a href="/aboutarch17">
         <p>
       About Arch17
         </p>
       </a>
       <a href="/procurementservice">
         <p>
         Procurement Service
         </p>
       </a>
       <a href="/designaccountintro">
         <p>
         Design club
         </p>
       </a>
       
       <a href="/arch17com">
         <p>arch17.com</p>
       </a>
      </Panel>
      <Panel
       header="Arch17 Business"
      >
       <a href="#">
         <p>
         Create New Store
         </p>
       </a>
       {/* <a href="/sellproducts"> */}
       <a href="#">
         <p>
         Sell Products
         </p>
       </a>
      
      </Panel>
      <Panel
       header="Explore"
      >
       <a href="/categories">
         <p>
       Products
         </p>
       </a>
       <a href="/brands">
         <p>
         Brands
         </p>
       </a>
       <a href="/design-selected?&featuredBy=design-selected">
         <p>
         Magazine
         </p>
       </a>
       <a href="/designers?">
         <p>
         Designers
         </p>
       </a>
      
      </Panel>
      <Panel
       header="For Designers"
      >
       <a href="#">
         <p>
         How to create store on arch17?
         </p>
       </a>
       {/* <a href="#">
         <p>
         How to sell products?
         </p>
       </a> */}
       <a href="#">
         <p>
         Contact Us
         </p>
       </a>
      
      
      </Panel>
      </Collapse>
     </div>
     <div className="dark-footer">
      <div className="px-0 container bg-black">
       <AntRow className="pt-2">
        <AntCol md={12}>
         <p>
          © 2017-2022, ARCH17 TECHNOLOGY CO., LTD. SZ .
          <span
           style={{
            marginLeft: "5rem",
           }}
          >
           粤ICP备19015731号-1
          </span>
         </p>
        </AntCol>
        <AntCol md={12}>
         <div className="footer-terms">
          <span>Privacy</span>
          <span>Cookies</span>
          <span>Terms and Conditions of Use</span>
         </div>
        </AntCol>
       </AntRow>
      </div>
     </div>
    </div>

    <Modal
       id="wechatqrcodemodal"
       size="sm"
       centered
       show={this.state.wechatqr_modal}
       onHide={() => {
        this.setState({ wechatqr_modal: false });
       }}
       aria-labelledby="example-modal-sizes-title-lg"
      >
       <Modal.Body>
        <div className="scan-wrapper">
         <div className="contact-box">
          <h6>Arch17</h6>
          <p>Official Wechat Contact</p>
          <div className="qrimgwrapper">
           <img src={qrcode} alt="scan to get touch via WeChat" />
          </div>
          <p style={{ fontSize: ".75rem" }}>
           Scan this code using WeChat, to get to direct contact with Arch17 on
           WeChat
          </p>
         </div>
        </div>
       </Modal.Body>
      </Modal>
   </>
  );
 }
}
export default Footer;
