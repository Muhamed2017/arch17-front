import React, { Component } from "react";
import { Row, Col } from "antd";
class CollectionsSection extends Component {
 constructor(props) {
  super(props);
  this.state = {
   collections: this.props.collections,
  };
 }
 render() {
  return (
   <>
    <>
     <Row span={24} gutter={25} className="mt-5">
      <Col md={24}>
       <h6 className="bold py-3">Collections</h6>
      </Col>
      {this.state.collections?.map((col, index) => {
       return (
        <>
         <Col md={8} className="collection-col" key={index}>
          <div className="collection-box">
           <div
            className="rect rect-0"
            style={{
             backgroundImage: `url(${col.products.products_info.pics[0]})`,
            }}
           ></div>
           <div
            className="rect rect-1"
            style={{
             backgroundImage: `url(${col.products.products_info.pics[1]})`,
            }}
           ></div>
           <div
            className="rect rect-2"
            style={{
             backgroundImage: `url(${col.products.products_info.pics[2]})`,
            }}
           ></div>
          </div>
          <div className="collection-text">
           <a href={`/collection/${col.id}`} className="arch-link">
            {col.collection_name}
           </a>
           <p className="products-count">{col.products.count} Products</p>
          </div>
         </Col>
        </>
       );
      })}
     </Row>
    </>
   </>
  );
 }
}

export default CollectionsSection;
