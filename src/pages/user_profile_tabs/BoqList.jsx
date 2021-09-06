import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class BocList extends Component {
 state = {};
 render() {
  return (
   <div id="user-collection-tab user-tab profile-tab">
    <Container fluid>
     <Row md={{ span: 12 }}>
      <Col sm={12}>{/* <h2>BocList Collections</h2> */}</Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="collection-text">
        <h5>Project Name</h5>
        <p>China, Shenzhen | 2021 - 2 - 2</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="collection-text">
        <h5>Project Name</h5>
        <p>China, Shenzhen | 2021 - 2 - 2</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="collection-text">
        <h5>Collection Name</h5>
        <p>NO Topics . Created By Creator of the collection</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="collection-text">
        <h5>Project Name</h5>
        <p>China, Shenzhen | 2021 - 2 - 2</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="collection-text">
        <h5>Project Name</h5>
        <p>China, Shenzhen | 2021 - 2 - 2</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="collection-text">
        <h5>Project Name</h5>
        <p>China, Shenzhen | 2021 - 2 - 2</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="collection-text">
        <h5>Project Name</h5>
        <p>China, Shenzhen | 2021 - 2 - 2</p>
       </div>
      </Col>
     </Row>
    </Container>
   </div>
  );
 }
}

export default BocList;
