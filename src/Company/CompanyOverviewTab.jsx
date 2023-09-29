import React, { Component } from "react";
import { Row, Col } from "antd";
class CompanyOverviewTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   about: this.props.about,
   categories: this.props.categories?.filter((c) => {
    return c.name && c.name !== "undefined";
   }),
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

      <Row span={24} gutter={{ sm: 16, lg: 16, md: 16, xs: 16 }}>
       {this.state.categories?.map((cat) => {
        return (
         <Col md={6} xs={12} sm={12} lg={6} className="mb-4">
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
