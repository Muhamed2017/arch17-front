import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { API } from "../../utitlties";

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
class BrandDesignersTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   designers: [],
  };
 }
 componentDidMount() {
  axios.get(`${API}store-designers/${this.props.store_id}`).then((response) => {
   this.setState({
    designers: response.data.designers,
   });
  });
 }
 render() {
  return (
   <Row span={24} gutter={25} className="mt-5">
    {this.state.designers?.brand_designers?.map((designer, index) => {
     return (
      <>
       <Col
        md={8}
        sm={12}
        xs={12}
        lg={8}
        className="collection-col"
        key={index}
       >
        <a href={`/designerproducts/${designer?.id}`}>
         <div className="collection-box">
          <div
           className="rect rect-0"
           style={{
            backgroundImage: `url(${this.state.designers?.pics[index][0]?.identity[0]?.preview_cover})`,
            backgroundColor: this.state.designers?.pics[index][0]?.identity[0]
             ?.preview_cover
             ? "transparent"
             : "rgb(237 237 237 / 70%)",
            filter: this.state.designers?.pics[index][0]?.identity[0]
             ?.preview_cover
             ? "brightness(.97)"
             : "none",
           }}
          ></div>
          <div
           className="rect rect-1"
           style={{
            backgroundImage: `url(${this.state.designers?.pics[index][1]?.identity[0]?.preview_cover})`,
            backgroundColor: this.state.designers?.pics[index][1]?.identity[0]
             ?.preview_cover
             ? "transparent"
             : "rgb(237 237 237 / 70%)",
            filter: this.state.designers?.pics[index][1]?.identity[0]
             ?.preview_cover
             ? "brightness(.97)"
             : "none",
           }}
          ></div>
          <div
           className="rect rect-2"
           style={{
            backgroundImage: `url(${this.state.designers?.pics[index][2]?.identity[0]?.preview_cover})`,
            backgroundColor: this.state.designers?.pics[index][2]?.identity[0]
             ?.preview_cover
             ? "transparent"
             : "rgb(237 237 237 / 70%)",
            filter: this.state.designers?.pics[index][2]?.identity[0]
             ?.preview_cover
             ? "brightness(.97)"
             : "none",
           }}
          ></div>
         </div>
         <div className="designer-text">
          <div
           className="d-avatar"
           style={{
            backgroundImage: `url(${designer?.photoURL})`,
           }}
          ></div>
          <div className="d-info">
           <p style={{ marginBottom: "3px" }}>
            <span className="d-name">{designer?.displayName}</span>
            <span className="d-loc">{`| ${regionNames.of(
             designer?.country
            )}`}</span>
           </p>
           <p>
            {" "}
            <span className="d-count">
             {/* {50} Products . Designed for {this.state.name} */}
             {designer?.professions[0]}
            </span>
           </p>
          </div>
         </div>
        </a>
       </Col>
      </>
     );
    })}
   </Row>
  );
 }
}

export default BrandDesignersTab;
