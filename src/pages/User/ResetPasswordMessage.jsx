import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./User.css";
class ResetPasswordMessage extends Component {
 render() {
  return (
   <div>
    <Container fluid="md m-t-global">
     <Row className="justify-content-center">
      <Col xs={12} sm={12} md={8} lg={6} xl={6} className="box-container p-5">
       <div className="box-header text-center py-3">
        <h1>Reset Password</h1>
       </div>
       <div className="box-body text-center">
        <p>
         An E-mail with add new password link has been sent to
         example@example.com
        </p>
       </div>
       <div className="box-footer py-3 text-center">
        <p>
         <span className="box-strong"> Didn’t receive the email? </span>
         Check your spam filter for an email from support@arch17.com. or
         <span className="box-red"> Resend code </span>
        </p>
       </div>
      </Col>
     </Row>
    </Container>
   </div>
  );
 }
}

export default ResetPasswordMessage;
