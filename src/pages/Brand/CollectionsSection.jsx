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
     <Row span={24} gutter={{ lg: 25, md: 25, sm: 8, xs: 8 }} className="">
      <Col md={24} sm={24} xs={24}>
       <h6 className="">Collections</h6>
      </Col>
      {this.state.collections?.map((col, index) => {
       return (
        <>
         <Col
          lg={8}
          md={8}
          sm={12}
          xs={12}
          className="collection-col"
          key={index}
         >
          <a href={`/collection/${col.id}`} className="arch-link">
           <div>
            <div className="collection-box">
             <div
              className="rect rect-0"
              style={{
               backgroundImage: `url(${col.products.products_info.pics[0]})`,
               //  backgroundColor: col.products.products_info.pics[0]
               //   ? "transparent"
               //   : "rgb(237 237 237 / 70%)",
               //  filter: col.products.products_info.pics[0]
               //   ? "brightness(.97)"
               //   : "none",
              }}
             ></div>
             <div
              className="rect rect-1"
              style={{
               backgroundImage: `url(${col.products.products_info.pics[1]})`,
               //  backgroundColor: col.products.products_info.pics[1]
               //   ? "transparent"
               //   : "rgb(237 237 237 / 70%)",
               //  filter: col.products.products_info.pics[1]
               //   ? "brightness(.97)"
               //   : "none",
              }}
             ></div>
             <div
              className="rect rect-2"
              style={{
               backgroundImage: `url(${col.products.products_info.pics[2]})`,
               //  backgroundColor: col.products.products_info.pics[2]
               //   ? "transparent"
               //   : "rgb(237 237 237 / 70%)",
               //  filter: col.products.products_info.pics[2]
               //   ? "brightness(.97)"
               //   : "none",
              }}
             ></div>
            </div>
            <div className="collection-text">
             {col.collection_name}
             <p className="products-count">{col.products.count} Products</p>
            </div>
           </div>
          </a>
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
