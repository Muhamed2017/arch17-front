import React, { Component } from "react";
import { auth } from "./../firebase";
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export class Home extends Component {
 constructor(props) {
  super(props);
  this.state = {
   vCode: "",
   verifying: false,
   validate_modal: false,
   sendingVcode: false,
  };
 }
 onChangeVcode = (e) => {
  this.setState({ vCode: e.target.value });
 };

 validate_modal_close = () => {
  this.setState({ validate_modal: false });
 };
 sendVerificationCode = () => {
  if (auth.currentUser) {
   this.setState({ sendingVcode: true });
   this.setState({ verifying: true });
   const fd = new FormData();
   fd.append("uid", auth.currentUser.uid);
   axios
    .post("https://arch17-apis.herokuapp.com/api/user", fd)
    .then((response) => {
     console.log(response);
     this.setState({ validate_modal: true });
     this.setState({ verifying: false });
     this.setState({ sendingVcode: false });
    });
  }
 };
 verify = () => {
  if (auth.currentUser) {
   let code = this.state.vCode;
   this.setState({ verifying: true });
   const fd = new FormData();
   fd.append("uid", auth.currentUser.uid);
   fd.append("code", code);
   axios
    .post("https://arch17-apis.herokuapp.com/api/validate-code", fd)
    .then((response) => {
     console.log(response);
     this.setState({ verifying: false });
    })
    .catch((error) => console.log(error));
  }
 };
 render() {
  if (auth.currentUser?.emailVerified == false) {
   return (
    <>
     {/* <button
      style={{
       width: "100%",
       background: "#E41E15",
       color: "#fff",
       padding: "5px 0",
       fontFamily: "Roboto",
       fontSize: ".8rem",
      }}
      onClick={this.sendVerificationCode}
     >
      Your account is not activated.
      <span
       style={{
        textDecoration: "underline",
        textAlign: "center",
        padding: "0 3px",
       }}
      >
       Click here
      </span>
      to activate it{" "}
      {this.sendingVcode ? (
       <>
        <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
       </>
      ) : (
       ""
      )}
     </button>
     <Modal
      show={this.state.validate_modal}
      onHide={this.validate_modal_close}
      className="example-modals"
      keyboard={false}
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
        <Form.Row as={Row} style={{ margin: "20px 0" }}>
         <Form.Label column md={4}>
          6-digit code
         </Form.Label>
         <Col md={8}>
          <Form.Control
           value={this.state.vCode}
           placeholder="Six digit code"
           onChange={this.onChangeVcode}
          />
         </Col>
        </Form.Row>

        <Button
         variant="danger"
         onClick={this.verify}
         type="submit"
         style={{
          textAlign: "right",
          background: "#E41E15",
          display: "block",
          float: "right",
          marginRight: "12px",
         }}
        >
         {this.state.verifying ? (
          <>
           <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
          </>
         ) : (
          <>Verify</>
         )}
        </Button>
       </div>
      </Modal.Body>
     </Modal> */}
    </>
   );
  }
  return <></>;
 }
}

export default Home;
