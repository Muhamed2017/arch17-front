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
   selected_collections: [],
   category: "",
  };
 }
 componentDidMount() {
  axios
   .get(`${API}product/${this.state.product_id}`)
   .then((res) => {
    console.log(res);
    this.setState({
     product: res.data.product,
     category: res.data.product.kind,
    });
    const { collections } = res.data.product;
    collections.map((col) => {
     return this.setState({
      selected_collections: [
       ...this.state.selected_collections,
       { label: col.collection_name, value: col.collection_name },
      ],
     });
    });
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
         style={{
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
           Furniture
           {this.state.product.kind === "Furniture" ? <span>✓</span> : ""}
          </>
         )}
        </a>
        <a
         href="#1"
         onClick={(e) => e.preventDefault}
         style={{
          backgroundColor: this.state.product.kind === "Lighting" ? "red" : "",
          color: this.state.product.kind === "Lighting" ? "#fff" : "",
          position: "relative",
         }}
        >
         Lighting {this.state.product.kind === "Lighting" ? <span>✓</span> : ""}
         <span>
          <BiChevronRight />
         </span>
        </a>

        <a
         href="#1"
         onClick={(e) => e.preventDefault}
         style={{
          backgroundColor: this.state.product.kind === "Decore" ? "red" : "",
          color: this.state.product.kind === "Decore" ? "#fff" : "",
          position: "relative",
         }}
        >
         Decore {this.state.product.kind === "Decore" ? <span>✓</span> : ""}
         <span>
          <BiChevronRight />
         </span>
        </a>

        <a
         href="#1"
         onClick={(e) => e.preventDefault}
         style={{
          backgroundColor: this.state.product.kind === "Bathroom" ? "red" : "",
          color: this.state.product.kind === "Bathroom" ? "#fff" : "",
          position: "relative",
         }}
        >
         Bathroom {this.state.product.kind === "Bathroom" ? <span>✓</span> : ""}
         <span>
          <BiChevronRight />
         </span>
        </a>

        <a
         href="#1"
         onClick={(e) => e.preventDefault}
         style={{
          backgroundColor: this.state.product.kind === "Wellness" ? "red" : "",
          color: this.state.product.kind === "Wellness" ? "#fff" : "",
          position: "relative",
         }}
        >
         Wellness {this.state.product.kind === "Wellness" ? <span>✓</span> : ""}
         <span>
          <BiChevronRight />
         </span>
        </a>

        <a
         href="#1"
         onClick={(e) => e.preventDefault}
         style={{
          backgroundColor: this.state.product.kind === "Kitchen" ? "red" : "",
          color: this.state.product.kind === "Kitchen" ? "#fff" : "",
          position: "relative",
         }}
        >
         Kitchen {this.state.product.kind === "Kitchen" ? <span>✓</span> : ""}
         <span>
          <BiChevronRight />
         </span>
        </a>

        <a
         href="#1"
         onClick={(e) => e.preventDefault}
         style={{
          backgroundColor: this.state.product.kind === "Finishes" ? "red" : "",
          color: this.state.product.kind === "Finishes" ? "#fff" : "",
          position: "relative",
         }}
        >
         Finishes {this.state.product.kind === "Finishes" ? <span>✓</span> : ""}
         <span>
          <BiChevronRight />
         </span>
        </a>

        <a
         href="#1"
         onClick={(e) => e.preventDefault}
         style={{
          backgroundColor:
           this.state.product.kind === "Construction" ? "red" : "",
          color: this.state.product.kind === "Construction" ? "#fff" : "",
          position: "relative",
         }}
        >
         Construction
         {this.state.product.kind === "Construction" ? <span>✓</span> : ""}
         <span>
          <BiChevronRight />
         </span>
        </a>
       </div>
       <Link
        to={{
         pathname: `/edit/${this.state.product.id}`,
         state: {
          product: this.state.product,
          selected_collections: this.state.selected_collections ?? [],
          category: this.state.category,
         },
        }}
        style={{
         margin: "48px 0",
         backgroundColor: "rgb(125 125 125)",
         color: "#fff",
         padding: "10px 25px",
         display: "inline-block",
        }}
        onClick={() => this.setState({ loading: true })}
       >
        Conitnue
        {this.state.loading && (
         <>
          <ClipLoader
           style={{ height: "20px" }}
           color="#ffffff"
           loading={this.state.loading}
           size={20}
          />
         </>
        )}
       </Link>
      </div>
     </div>
    </React.Fragment>
   )
  );
 }
}

export default EditKind;
