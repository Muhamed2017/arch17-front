import React, { Component } from "react";
import { Row, Col, Checkbox, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "./../../utitlties";
import { addProjectTags } from "../../redux/actions/addProjectActions";
import { connect } from "react-redux";
class ProductsTagsStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   products: [],
   ids: this.props.tags ?? [],
  };
 }
 componentDidMount() {
  axios
   .get(`${API}home/products`)
   .then((response) => {
    console.log(response);
    this.setState({
     products: response.data.products,
     fetching: false,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }
 render() {
  return (
   <>
    <div id="product-tags-step" className="p-5">
     <Row span={24} gutter={24}>
      {this.state.products?.map((product, index) => {
       return (
        <>
         <Col className="gutter-row mb-3 pointer" md={6}>
          <div className="product">
           <div
            className="p-img"
            style={{
             background: `url(${product.preview_cover})`,
            }}
           >
            <div className="prlayer"></div>

            <div className="checkbox-tag p-2">
             <Checkbox
              value={product.product_id}
              checked={this.state?.ids?.includes(product.product_id)}
              // checked={this.state.tags?.includes(product.product_id)}
              onChange={(e) => {
               this.setState(
                {
                 ids: e.target.checked
                  ? [...this.state.ids, product.product_id]
                  : this.state.ids.filter((id) => {
                     return id !== product.product_id;
                    }),
                },
                () => {
                 console.log(this.state.ids);
                }
               );
              }}
             />
            </div>
            {product.file.length > 0 ? (
             <>
              <div className="actns-btn file-btn cad">CAD</div>
              <div className="actns-btn file-btn threeD">3D</div>
             </>
            ) : (
             ""
            )}
           </div>

           <h5 className="product-store">{product.store_name.store_name}</h5>

           <p className="product-name">{product.name}</p>
           <div className="product-price">
            {product.preview_price && product.preview_price > 0 ? (
             <>
              <span>¥ {product.preview_price}</span>
             </>
            ) : (
             <>
              <Link
               to={{
                pathname: `/product/${product.product_id}`,
                state: {
                 request_price: true,
                },
               }}
              >
               REQUEST PRICE INFO
              </Link>
             </>
            )}
           </div>
          </div>
         </Col>
        </>
       );
      })}
     </Row>
    </div>
    <button
     className="next-btn"
     onClick={() => {
      this.props.dispatchProjectTags(this.state.ids);
     }}
    >
     Save & Continue
    </button>
   </>
  );
 }
}
// export default ProductsTagsStep;

const mapDispatchToProps = (dispatch) => ({
 dispatchProjectTags: (tags) => dispatch(addProjectTags(tags)),
});
const mapStateToProps = (state) => {
 return {
  tags: state.project.project_tags,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsTagsStep);
