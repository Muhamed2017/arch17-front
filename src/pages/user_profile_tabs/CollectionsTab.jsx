import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tab, Tabs, TabList } from "react-tabs";
import collection1 from "../../../src/collection-1.png";
import collection2 from "../../../src/collection-2.jpg";
import collection3 from "../../../src/collection-3.jpg";
import collection4 from "../../../src/h-1.png";
import collection5 from "../../../src/h-2.png";
// import slide1 from "../../../src/slide1.jpg";
// import slide1 from "../../../src/slide1.jpg";

class CollectionsTab extends Component {
 state = {};
 render() {
  return (
   <div id="user-collection-tab user-tab profile-tab">
    <Container fluid>
     <Row md={{ span: 12 }}>
      <Col sm={12}>
       {/* <h2>Fuck Collections</h2> */}
       <div className="sub-user-tabs">
        <Tabs>
         <TabList>
          <Tab>All</Tab>
          <Tab>Products</Tab>
          <Tab>Projects & Blogs</Tab>
          <Tab>Shared</Tab>
         </TabList>
        </Tabs>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div
         className="rect rect-0"
         style={{ backgroundImage: `url(${collection1})` }}
        ></div>
        <div
         className="rect rect-1"
         style={{ backgroundImage: `url(${collection2})` }}
        ></div>
        <div
         className="rect rect-2"
         style={{ backgroundImage: `url(${collection3})` }}
        ></div>
       </div>
       <div className="collection-text">
        <h5>Collection Name</h5>
        <p>NO Topics . Created By Creator of the collection</p>
       </div>
      </Col>
      <Col lg={4} sm={6} xs={12} className="collection-col">
       <div className="collection-box">
        <div
         className="rect rect-0"
         style={{ backgroundImage: `url(${collection5})` }}
        ></div>
        <div
         className="rect rect-1"
         style={{ backgroundImage: `url(${collection4})` }}
        ></div>
        <div
         className="rect rect-2"
         style={{ backgroundImage: `url(${collection2})` }}
        ></div>
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
   </div>
  );
 }
}

export default CollectionsTab;
