import React, { Component } from "react";
import { Row, Col } from "antd";
class CompanyOverviewTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   about: this.props.about,
   categories: this.props.categories,
  };
 }
 render() {
  return (
   <div className="company-overview">
    {this.state.about?.length > 4 && (
     <div className="overview-block">
      <p className="overview-head">About</p>
      <p className="overview-content">{this.state.about}</p>
     </div>
    )}
    {this.state.categories?.length > 0 && (
     <div className="overview-block">
      <p className="overview-head">Solutions</p>

      <Row span={24} gutter={16}>
       {this.state.categories?.map((cat) => {
        return (
         <Col md={6}>
          <div className="cat">
           <div
            className="cat-img"
            style={{
             backgroundImage: `url("${cat?.cover}")`,
            }}
           ></div>
           <p className="cat-name">{cat.name}</p>
          </div>
         </Col>
        );
       })}
      </Row>
     </div>
    )}
   </div>
  );
 }
}

export default CompanyOverviewTab;
