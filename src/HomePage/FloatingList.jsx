import React, { Component } from "react";
import { Row, Col } from "antd";
import m5 from "./../images/HomePage/MediaSection/m5.jpg";
import s2 from "./../images/HomePage/HomePageSlides/s2.jpg";
import s6 from "./../images/HomePage/HomePageSlides/s6.jpg";
class FloatingList extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }

 render() {
  return (
   <div className="floating-list">
    <Row span={24}>
     <Col md={15}>
      <Row span={24} gutter={10}>
       <Col md={6}>
        <ul>
         <li>Sofa & Chair</li>
         <li>Armchairs</li>
         <li>Office Chair</li>
         <li>Dining Chair</li>
         <li>Loveseats Sofa</li>
         <li>L Shape Sofa</li>
        </ul>
       </Col>
       <Col md={6}>
        <ul>
         <li>Table</li>
         <li>Accent Table</li>
         <li>Dining Table</li>
         <li>Coffee Table</li>
         <li>Bedside Table</li>
        </ul>
       </Col>
       <Col md={6}>
        <ul>
         <li>Storage & Units</li>
         <li>Cabinet</li>
         <li>Sideboard</li>
         <li>Shelves</li>
         <li>Coffee Table</li>
         <li>Bedside Table</li>
        </ul>
       </Col>
       <Col md={6}>
        <ul>
         <li>Dining Room</li>
         <li>Dining Chair</li>
         <li>Dining Table</li>
         <li>Sideboard</li>
         <li>Bar Chair</li>
        </ul>
       </Col>
      </Row>
     </Col>
     <Col md={9}>
      <div className="img-list">
       <div className="inner-img-list">
        <img src={s2} alt="" />
        <img src={s6} alt="" />
       </div>
       <div>
        <img src={m5} alt="" />
       </div>
      </div>
     </Col>
    </Row>
    <div className="mt-5">
     <a className="arch-color" href="/search">
      View All Products
     </a>
    </div>
   </div>
  );
 }
}

export default FloatingList;
