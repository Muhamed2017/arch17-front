import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import grado from "../../../src/grado.jpg";

class FollwingTab extends Component {
 state = {};
 render() {
  return (
   <div id="user-collection-tab user-tab profile-tab">
    <Container fluid>
     <Row md={{ span: 12 }}>
      <Col sm={12}>
       <div className="sub-user-tabs">
        <Tabs>
         <TabList>
          <Tab>All</Tab>
          <Tab>Brands</Tab>
          <Tab>People</Tab>
          <Tab>Company</Tab>
         </TabList>
        </Tabs>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div
        className="brand-img"
        style={{ backgroundImage: `url(${grado})` }}
       ></div>
       <div className="collection-text">
        <h5>Name</h5>
        <p>Type . No Items</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="brand-img"></div>
       <div className="collection-text">
        <h5>Brand Name</h5>
        <p>Brand . 50 Product</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="brand-img"></div>
       <div className="collection-text">
        <h5>Store Name</h5>
        <p>multi brand store . 50 Product</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="brand-img"></div>
       <div className="collection-text">
        <h5>Company Name</h5>
        <p>Company . 50 Project & Blog</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="brand-img"></div>
       <div className="collection-text">
        <h5>Store Name</h5>
        <p>multi brand store . 50 Product</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="brand-img"></div>
       <div className="collection-text">
        <h5>Name</h5>
        <p>Type . No Items</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div className="rect rect-0"></div>
        <div className="rect rect-1"></div>
        <div className="rect rect-2"></div>
       </div>
       <div className="brand-img"></div>
       <div className="collection-text">
        <h5>Name</h5>
        <p>Type . No Items</p>
       </div>
      </Col>
     </Row>
    </Container>
   </div>
  );
 }
}

export default FollwingTab;
<div id="user-collection-tab user-tab profile-tab">
 <Container fluid>
  <Row md={{ span: 12 }}>
   <Col sm={12}>
    <h2>Fuck Collections</h2>
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
     <h5>Collection Name</h5>
     <p>NO Topics . Created By Creator of the collection</p>
    </div>
   </Col>
  </Row>
 </Container>
</div>;
