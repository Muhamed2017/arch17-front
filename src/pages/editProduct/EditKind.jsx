import React, { Component } from "react";
import { BiChevronRight } from "react-icons/bi";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "./../../utitlties";
import { Link } from "react-router-dom";
class EditKind extends Component {
 constructor(props) {
  super(props);
  this.state = {
   loading: false,
   product: null,
   product_id: this.props.match.params.id,
   kind_edited: false,
  };
 }

 componentDidMount() {
  axios
   .get(`${API}product/${this.state.product_id}`)
   .then((res) => {
    console.log(res);
    this.setState({ product: res.data.product });
   })
   .catch((err) => {
    console.log(err);
   });
 }

 render() {
  return (
   this.state.product && (
    <React.Fragment>
     <div id="add-product-one">
      <div className="add-wrapper">
       <h3 className="light-head">
        What Category of product you want to add ?
       </h3>
       <div className="product-kinds">
        <a
         href="/identity"
         // onClick={this.addProduct}
         style={{
          //   backgroundColor: this.state.loading ? "#898989" : "",
          backgroundColor: this.state.product.kind === "Furniture" ? "red" : "",
          color: this.state.product.kind === "Furniture" ? "#fff" : "",
          position: "relative",
         }}
        >
         {this.state.loading ? (
          <>
           Furniture
           <span style={{ position: "absolute", right: "35px", top: "7px" }}>
            <ClipLoader
             color="#fff"
             loading={this.state.loading}
             size={22}
             style={{
              height: "1px",
             }}
            />
           </span>
          </>
         ) : (
          <>
           Furniture <span>✓</span>
          </>
         )}
         {/* <BiChevronRight /> */}
        </a>
        <a href="#" onClick={(e) => e.preventDefault}>
         Lighting
         <span>
          <BiChevronRight />
         </span>
        </a>
        <a href="#">
         Decore
         <span>
          <BiChevronRight />
         </span>
        </a>
        <a href="#">
         Bathroom
         <span>
          <BiChevronRight />
         </span>
        </a>
        <a href="#">
         Wellness
         <span>
          <BiChevronRight />
         </span>
        </a>
        <a href="#">
         Kitchen
         <span>
          <BiChevronRight />
         </span>
        </a>
        <a href="#">
         Finishes Materials
         <span>
          <BiChevronRight />
         </span>
        </a>
        <a href="#">
         Construction Products
         <span>
          <BiChevronRight />
         </span>
        </a>
       </div>
       <Link
        to={{
         pathname: "/edit",
         state: {
          product: this.state.product,
         },
        }}
        style={{
         margin: "45px 0",
         backgroundColor: "#000",
         color: "#fff",
         padding: "10px 25px",
        }}
       >
        Conitnue
       </Link>
      </div>
     </div>
    </React.Fragment>
   )
  );
 }
}

export default EditKind;
