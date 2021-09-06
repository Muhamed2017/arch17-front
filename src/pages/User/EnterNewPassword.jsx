import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import "../../css/forms.css";
class EnterNewPassword extends Component {
 render() {
  return (
   <div>
    <Container fluid="md m-t-global">
     <Row className="justify-content-center">
      <Col xs={12} sm={12} md={8} lg={6} xl={6} className="form-container p-5">
       <div className="form-header text-center py-2">
        <h1>Enter new Password</h1>
       </div>
       <Form.Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
         <Form.Group className="my-1 py-4">
          <Form.Control
           type="password"
           placeholder="Pleas Input your new password"
          />
         </Form.Group>
        </Col>
       </Form.Row>
       <Col xs={12} sm={12} md={12} lg={12} xl={12} className="px-0">
        <Button type="submit" className="w-100 btn-submit">
         Save
        </Button>
       </Col>
      </Col>
     </Row>
    </Container>
   </div>
  );
 }
}

export default EnterNewPassword;
