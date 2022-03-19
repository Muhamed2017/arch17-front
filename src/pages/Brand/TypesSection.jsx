import React, { Component } from "react";
import { Col, Row } from "antd";
import Carousel, { consts } from "react-elastic-carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
class TypesSection extends Component {
 constructor(props) {
  super(props);
  this.state = {
   types: this.props.types,
   brand_id: this.props.brand_id,
  };
 }
 render() {
  return (
   <>
    <Row className="mb-5 mt-5 product-types" gutter={8}>
     {this.state.types.length > 0 && (
      <Col md={24}>
       <h6 className="bold mb-4 py-3">Product Types</h6>
      </Col>
     )}
     <Carousel
      onChange={(e) => console.log(e)}
      renderArrow={({ type, onClick, isEdge }) => {
       const pointer =
        type === consts.PREV ? <LeftOutlined /> : <RightOutlined />;
       return this.state.types.length <= 6 ? (
        <></>
       ) : (
        <>
         <button
          style={{ height: 175 }}
          className="arrow-btn"
          onClick={onClick}
          disabled={isEdge}
         >
          {pointer}
         </button>
        </>
       );
      }}
      showEmptySlots
      itemPosition="start"
      enableAutoPlay
      autoPlaySpeed={2500}
      itemsToShow={6}
      itemsToScroll={1}
      renderPagination={() => {
       return <></>;
      }}
     >
      {this.state.types.map((type) => {
       return (
        <>
         <Col md={{ lg: 4 }}>
          <div
           style={{
            backgroundImage: `url(${type.preview})`,
           }}
           className="type-item"
          ></div>
          <a href={`/types/${this.state.brand_id}/${type.name}`}>
           <span className="py-3">{type.name}</span>
          </a>
         </Col>
        </>
       );
      })}
     </Carousel>
    </Row>
   </>
  );
 }
}

export default TypesSection;
