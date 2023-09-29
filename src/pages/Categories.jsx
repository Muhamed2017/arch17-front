import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import axios from "axios";
import { API } from "./../utitlties";
import { LoadingOutlined } from "@ant-design/icons";
import "./categories.css";
import Footer from "./../components/Footer";
class Categories extends Component {
 constructor(props) {
  super(props);
  this.state = {
   categories: [],
  };
 }
 componentDidMount() {
  axios.get(`${API}genres`).then((response) => {
   console.log(response.data);
   const categories = response.data.genres;
   this.setState({
    categories,
   });
  });
 }
 render() {
  return (
   <div id="categories-page">
    <div className="wrapper mb-4">
     <p className="page-head">Products Categories</p>
     <div className="categories-wrapper">
      <Row gutter={{ md: 50, lg: 50, sm: 16, xs: 16 }}>
       {this.state.categories?.length > 0 ? (
        <>
         {this.state.categories?.map((category) => {
          return (
           <Col
            md={6}
            sm={12}
            xs={12}
            lg={6}
            key={category.id}
            className="mb-5"
           >
            <a href={`/products?category=${category.title.toLowerCase()}`}>
             <div
              style={{ backgroundImage: `url("${category.cover}")` }}
              className="category-box"
             ></div>
             <p className="category-title">{category.title}</p>
            </a>
           </Col>
          );
         })}
        </>
       ) : (
        <>
         <Spin
          size="large"
          indicator={
           <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
          }
          style={{ position: "absolute", top: "40%", right: "50%" }}
         />
        </>
       )}
      </Row>
     </div>
    </div>
    <Footer lightgray={false} />
   </div>
  );
 }
}

export default Categories;
