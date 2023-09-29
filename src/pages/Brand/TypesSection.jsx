import React, { Component } from "react";
import { Col, Row } from "antd";

export const responsive = {
 superLargeDesktop: {
  breakpoint: { max: 4000, min: 3000 },
  items: 6,
 },
 desktop: {
  breakpoint: { max: 3000, min: 1024 },
  items: 6,
  slidesToShow: 4,
 },
 tablet: {
  breakpoint: { max: 1024, min: 464 },
  items: 6,
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
   expand: false,
   lessTypes: this.props.types?.slice(0, 4),
   lessTypesWide:this.props.types?.slice(0,6)
  };
 }

 switchExpand = () => {
  this.setState({
   expand: !this.state.expand,
  });
 };
 handleClick = (name) => {
  this.props.handleClick(name);
 };
 handleGoToProductsTab=()=>{
    this.props.handleNavigateToProductsTab()
 }
 render() {
  return (
   <>
    <div className="wide-view brand-wide">
<Col md={24} sm={24} xs={24} className="mt-5">
        <h6>Products</h6>
       </Col>
     <Row gutter={16}>
      {this.state.expand ? (
       <>
        {this.state.types.map((type) => {
         return (
          <Col lg={4} md={4} className="mb-4">
           <div
            onClick={() => this.handleClick(type.name)}
            style={{
             backgroundImage: `url(${type.preview})`,
            }}
            className="type-item"
           ></div>
           <a href={`/types/${this.state.brand_id}/${type.name}`}>
            <span className="py-3">{type.name}</span>
           </a>
          </Col>
         );
        })}
       </>
      ) : (
       <>
        {this.state.lessTypesWide.map((type) => {
         return (
          <Col lg={4} md={4} className="mb-4">
           <div
            onClick={() => this.handleClick(type.name)}
            style={{
             backgroundImage: `url(${type.preview})`,
            }}
            className="type-item"
           ></div>
           <a href={`/types/${this.state.brand_id}/${type.name}`}>
            <span className="py-3">{type.name}</span>
           </a>
          </Col>
         );
        })}
       </>
      )}
     </Row>
     {this.state.types?.length > 6 && (
      <button className="switch-expand seemore brandmore m-auto block mt-3 mb-5 pt-1" onClick={this.switchExpand}>
       {this.state.expand ? "SEE LESS" : "All types"}
      </button>
     )}
    </div>
    <div className="mobile-view">
      
     <Row gutter={16}>
      {this.state.expand ? (
       <>
        {this.state.types.map((type) => {
         return (
          <Col xs={12} sm={12} className="mb-4">
           <div
            onClick={() => this.handleClick(type.name)}
            style={{
             backgroundImage: `url(${type.preview})`,
            }}
            className="type-item"
           ></div>
           <a href={`/types/${this.state.brand_id}/${type.name}`}>
            <span className="py-3">{type.name}</span>
           </a>
          </Col>
         );
        })}
       </>
      ) : (
       <>
        {this.state.lessTypes.map((type) => {
         return (
          <Col xs={12} sm={12} className="mb-4">
           <div
            onClick={() => this.handleClick(type.name)}
            style={{
             backgroundImage: `url(${type.preview})`,
            }}
            className="type-item"
           ></div>
           <a href={`/types/${this.state.brand_id}/${type.name}`}>
            <span className="py-3">{type.name}</span>
           </a>
          </Col>
         );
        })}
       </>
      )}
     </Row>
     {this.state.types?.length > 4 && (
      <p className="switch-expand" onClick={this.switchExpand}>
       {this.state.expand ? "SEE LESS" : "SEE MORE"}
      </p>
     )}
    </div>
   </>
  );
 }
}

export default TypesSection;
