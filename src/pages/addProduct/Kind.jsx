import { Component } from "react";
import { BiChevronRight } from "react-icons/bi";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "./../../utitlties";

class Kind extends Component {
 constructor(props) {
  super(props);
  this.state = {
   added: false,
   loading: false,
   id: null,
   brand_id: this.props.match.params.id,
  };
 }
 addProduct = (e) => {
  e.preventDefault();
  this.setState({ loading: true });
  axios
   .post(`${API}addproduct/${this.state.brand_id}`, {
    kind: "Furniture",
   })
   .then((response) => {
    this.setState({ loading: false });
    this.setState({ id: response.data.product.id });
    this.setState({ added: true });
   })
   .catch((err) => this.setState({ loading: false }));
 };
 render() {
  if (this.state.added) {
   return (
    <Redirect
     to={{
      pathname: `/identity/${this.state.id}`,
      state: { brand_id: this.state.brand_id },
     }}
    />
   );
  } else {
   return (
    <>
     <div id="add-product-one">
      <div className="add-wrapper">
       <h3 className="light-head">
        What Category of product you want to add ?
       </h3>
       <div className="product-kinds">
        <a
         href="/identity"
         onClick={this.addProduct}
         style={{
          backgroundColor: this.state.loading ? "#898989" : "",
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
          "Furniture"
         )}
         <BiChevronRight />
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
      </div>
     </div>
    </>
   );
  }
 }
}
export default Kind;
