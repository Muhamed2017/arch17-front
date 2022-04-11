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
   collections: [],
   selected_collections: [],
   category: "Furniture",
  };
 }
 addProduct = (e, category) => {
  e.preventDefault();

  this.setState(
   {
    category,
   },
   () => {
    this.setState({ loading: true });
    axios
     .post(`${API}addproduct/${this.state.brand_id}`, {
      kind: category,
     })
     .then((response) => {
      this.setState({ loading: false, category });
      this.setState({ id: response.data.product.id });
      this.setState({
       collections: response.data.product.store?.collections,
       selected_collections: response.data.product.collections,
      });
      this.setState({ added: true });
     })
     .catch((err) => this.setState({ loading: false }));
   }
  );
 };
 render() {
  if (this.state.added) {
   return (
    <Redirect
     to={{
      pathname: `/identity/${this.state.id}`,
      state: {
       brand_id: this.state.brand_id,
       collections: this.state.collections,
       selected_collections: this.state.selected_collections,
       category: this.state.category,
      },
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
         onClick={(e) => this.addProduct(e, "Furniture")}
         style={{
          backgroundColor:
           this.state.loading && this.state.category === "Furniture"
            ? "#898989"
            : "",
          position: "relative",
         }}
        >
         {this.state.loading ? (
          <>
           Furniture
           <span style={{ position: "absolute", right: "35px", top: "7px" }}>
            <ClipLoader
             color="#fff"
             loading={this.state.loading && this.state.category === "Furniture"}
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
        <a
         href="/identity"
         onClick={(e) => this.addProduct(e, "Lighting")}
         style={{
          backgroundColor:
           this.state.loading && this.state.category === "Lighting"
            ? "#898989"
            : "",
          position: "relative",
         }}
        >
         {this.state.loading && this.state.category === "Lighting" ? (
          <>
           Lighting
           <span style={{ position: "absolute", right: "35px", top: "7px" }}>
            <ClipLoader
             color="#fff"
             loading={this.state.loading && this.state.category === "Lighting"}
             size={22}
             style={{
              height: "1px",
             }}
            />
           </span>
          </>
         ) : (
          "Lighting"
         )}
         <BiChevronRight />
        </a>
        <a
         href="/identity"
         onClick={(e) => this.addProduct(e, "Decore")}
         style={{
          backgroundColor:
           this.state.loading && this.state.category === "Decore"
            ? "#898989"
            : "",
          position: "relative",
         }}
        >
         {this.state.loading ? (
          <>
           Decore
           <span style={{ position: "absolute", right: "35px", top: "7px" }}>
            <ClipLoader
             color="#fff"
             loading={this.state.loading && this.state.category === "Decore"}
             size={22}
             style={{
              height: "1px",
             }}
            />
           </span>
          </>
         ) : (
          "Decore"
         )}
         <BiChevronRight />
        </a>
        <a
         //  Bathroom
         //  <span>
         //   <BiChevronRight />
         //  </span>
         href="#0"
         onClick={(e) => this.addProduct(e, "Bathroom")}
         style={{
          backgroundColor:
           this.state.loading && this.state.category === "Bathroom"
            ? "#898989"
            : "",
          position: "relative",
         }}
        >
         {this.state.loading ? (
          <>
           Bathroom
           <span style={{ position: "absolute", right: "35px", top: "7px" }}>
            <ClipLoader
             color="#fff"
             loading={this.state.loading && this.state.category === "Bathroom"}
             size={22}
             style={{
              height: "1px",
             }}
            />
           </span>
          </>
         ) : (
          "Bathroom"
         )}
         <span>
          <BiChevronRight />
         </span>
        </a>
        <a
         href="#0"
         onClick={(e) => this.addProduct(e, "Wellness")}
         style={{
          backgroundColor:
           this.state.loading && this.state.category === "Wellness"
            ? "#898989"
            : "",
          position: "relative",
         }}
        >
         {this.state.loading ? (
          <>
           Wellness
           <span style={{ position: "absolute", right: "35px", top: "7px" }}>
            <ClipLoader
             color="#fff"
             loading={this.state.loading && this.state.category === "Wellness"}
             size={22}
             style={{
              height: "1px",
             }}
            />
           </span>
          </>
         ) : (
          "Wellness"
         )}
         <span>
          <BiChevronRight />
         </span>
        </a>
        <a
         href="#0"
         onClick={(e) => this.addProduct(e, "Kitchen")}
         style={{
          backgroundColor:
           this.state.loading && this.state.category === "Kitchen"
            ? "#898989"
            : "",
          position: "relative",
         }}
        >
         {this.state.loading ? (
          <>
           Kitchen
           <span style={{ position: "absolute", right: "35px", top: "7px" }}>
            <ClipLoader
             color="#fff"
             loading={this.state.loading && this.state.category === "Kitchen"}
             size={22}
             style={{
              height: "1px",
             }}
            />
           </span>
          </>
         ) : (
          "Kitchen"
         )}
         {/* <BiChevronRight /> */}
         <span>
          <BiChevronRight />
         </span>
        </a>

        <a
         href="/identity"
         onClick={(e) => this.addProduct(e, "Finishes")}
         style={{
          backgroundColor:
           this.state.loading && this.state.category === "Finishes"
            ? "#898989"
            : "",
          position: "relative",
         }}
        >
         {this.state.loading ? (
          <>
           Finishes
           <span style={{ position: "absolute", right: "35px", top: "7px" }}>
            <ClipLoader
             color="#fff"
             loading={this.state.loading && this.state.category === "Finishes"}
             size={22}
             style={{
              height: "1px",
             }}
            />
           </span>
          </>
         ) : (
          "Finishes"
         )}
         <BiChevronRight />
        </a>
        <a
         href="#0"
         //  href="/identity"
         onClick={(e) => this.addProduct(e, "Construction")}
         style={{
          backgroundColor:
           this.state.loading && this.state.category === "Construction"
            ? "#898989"
            : "",
          position: "relative",
         }}
        >
         {this.state.loading ? (
          <>
           Construction
           <span style={{ position: "absolute", right: "35px", top: "7px" }}>
            <ClipLoader
             color="#fff"
             loading={
              this.state.loading && this.state.category === "Construction"
             }
             size={22}
             style={{
              height: "1px",
             }}
            />
           </span>
          </>
         ) : (
          "Construction"
         )}
         <BiChevronRight />
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
