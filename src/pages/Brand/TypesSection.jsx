import React, { Component } from "react";
import { Col, Row } from "antd";
import Carousel, { consts } from "react-elastic-carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import DraggingCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
 superLargeDesktop: {
  // the naming can be any, depends on you.
  breakpoint: { max: 4000, min: 3000 },
  items: 8,
 },
 desktop: {
  breakpoint: { max: 3000, min: 1024 },
  items: 6,
 },
 tablet: {
  breakpoint: { max: 1024, min: 464 },
  items: 4,
 },
 mobile: {
  breakpoint: { max: 464, min: 0 },
  items: 2.5,
 },
};
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
    <Row className="product-types my-2" gutter={8}>
     {this.state.types.length > 0 && (
      <Col md={24} sm={24} xs={24}>
       <h6>Solutions</h6>
      </Col>
     )}
     {/* <Carousel
      breakPoints={[
       { width: 550, itemsToShow: 2.4, itemsToScroll: 1, pagination: false },
       { width: 850, itemsToShow: 6 },
       { width: 1150, itemsToShow: 6, itemsToScroll: 1, itemPosition: "start" },
       { width: 1450, itemsToShow: 6 },
       { width: 1750, itemsToShow: 6 },
      ]}
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
      //   enableAutoPlay
      //   autoPlaySpeed={2500}
      itemsToShow={6}
      itemsToScroll={1}
      renderPagination={() => {
       return <></>;
      }}
     >
      {this.state.types.map((type) => {
       return (
        <>
         <Col xs={10} sm={10} lg={4} md={4}>
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
     </Carousel> */}
     <DraggingCarousel
      swipeabl
      draggable
      rewind={false}
      rewindWithAnimation={false}
      additionalTransfrom={0}
      //   draggable={false}
      //   showDots={true}
      responsive={responsive}
      //   ssr={true} // means to render carousel on server-side.
      infinite={true}
      //   autoPlay={this.props.deviceType !== "mobile" ? true : false}
      autoPlay={false}
      //   autoPlaySpeed={1000}
      keyBoardControl={true}
      //   customTransition="all .5"
      //   transitionDuration={600}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      //   responsive={responsive}
     >
      {this.state.types.map((type) => {
       return (
        <>
         {/* <Col xs={10} sm={10} lg={4} md={4}> */}
         <div
          style={{
           backgroundImage: `url(${type.preview})`,
          }}
          className="type-item"
         ></div>
         <a href={`/types/${this.state.brand_id}/${type.name}`}>
          <span className="py-3">{type.name}</span>
         </a>
         {/* </Col> */}
        </>
       );
      })}
     </DraggingCarousel>
    </Row>
   </>
  );
 }
}

export default TypesSection;
