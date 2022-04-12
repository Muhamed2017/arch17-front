import React, { Component } from "react";
import { Row, Col, Checkbox, Select, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "./../../utitlties";
import { addProjectTags } from "../../redux/actions/addProjectActions";
import { connect } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
 constructions_kind_options,
 finishes_kind_options,
 decore_kind_options,
 wellness_kind_options,
 lighting_kind_optios,
 kitchen_kind_options,
 bathroom_kind_options,
 kind_options,
} from "../addProduct/ProductClassifications";
// export const constructions_kind_options= [
// import {}
// export const constructions_kind_options= [
// constructions_kind_options
const { Option } = Select;
class ProductsTagsStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   products: [],
   ids: this.props.tags ?? [],
   selectedBrand: "",
   selectedCategory: "",
   selectedType: "",
   fetching: true,
   brandsOptions: this.props.brands,
   typeOptions: [],
  };
 }

 getProducts = () => {
  this.setState({
   fetching: true,
  });
  axios
   .get(
    `${API}tags?filter[category]=${this.state.selectedCategory}&filter[store_id]=${this.state.selectedBrand}&filter[kind]=${this.state.selectedType}`
   )
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
 };

 rightType = (type) => {
  let right = [];
  switch (type) {
   case "Furniture":
    right = kind_options;
    break;

   case "Lighting":
    right = lighting_kind_optios;
    break;

   case "Finishes":
    right = finishes_kind_options;
    break;

   case "Kitchen":
    right = kitchen_kind_options;
    break;

   case "Bathroom":
    right = bathroom_kind_options;
    break;

   case "Construction":
    right = constructions_kind_options;
    break;

   case "Wellnewss":
    right = wellness_kind_options;
    break;

   case "Decore":
    right = decore_kind_options;
    break;

   default:
    break;
  }

  return right;
 };
 componentDidMount() {
  axios
   .get(`${API}tags`)
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
  console.log(this.state.brands);
 }
 render() {
  return (
   <>
    <div id="product-tags-step" className="p-5">
     <Row span={24} gutter={12} className="mt-3 mb-5">
      <Col md={5}>
       <Select
        labelInValue
        className="w-100"
        size="large"
        showSearch
        onChange={(e) => {
         this.setState(
          {
           selectedBrand: e.key,
          },
          () => {
           this.getProducts();
          }
         );
         console.log(e);
        }}
        allowClear
        defaultValue=""
       >
        <Option value="" key="" label="">
         <div className="demo-option-label-item">All Brands</div>
        </Option>

        {this.state.brandsOptions?.map((brand) => {
         return (
          <Option value={brand.name} key={brand.id} label={brand.id}>
           <div className="demo-option-label-item">{brand.name}</div>
          </Option>
         );
        })}
       </Select>
      </Col>
      <Col md={5}>
       <Select
        labelInValue
        className="w-100"
        size="large"
        onChange={(e) => {
         this.setState(
          {
           selectedCategory: e.value,
           typeOptions: this.rightType(e.value),
          },
          () => {
           this.getProducts();
           console.log(this.state.typeOptions);
          }
         );
         console.log(e);
        }}
        // allowClear
        defaultValue=""
       >
        <Option value="" label="All Categories">
         <div className="demo-option-label-item">All Categories</div>
        </Option>
        <Option value="Furniture" label="Furniture">
         <div className="demo-option-label-item">Furniture</div>
        </Option>
        <Option value="Lighting" label="Lighting">
         <div className="demo-option-label-item">Lighting</div>
        </Option>
        <Option value="Decore" label="Decore">
         <div className="demo-option-label-item">Decore</div>
        </Option>
        <Option value="Bathroom" label="Bathroom">
         <div className="demo-option-label-item">Bathroom</div>
        </Option>
        <Option value="Wellness" label="Wellness">
         <div className="demo-option-label-item">Wellness</div>
        </Option>
        <Option value="Kitchen" label="Kitchen">
         <div className="demo-option-label-item">Kitchen</div>
        </Option>
        <Option value="Finishes" label="Finishes">
         <div className="demo-option-label-item">Finishes</div>
        </Option>
        <Option value="Constructions" label="Constructions">
         <div className="demo-option-label-item">Construction</div>
        </Option>
       </Select>
      </Col>
      <Col md={5}>
       {this.state.typeOptions.length > 0 && (
        <Select
         labelInValue
         className="w-100"
         size="large"
         showSearch
         allowClear
         onChange={(e) =>
          this.setState(
           {
            selectedType: e.value,
           },
           () => {
            this.getProducts();
           }
          )
         }
         defaultValue=""
        >
         <Option value="" label="All Types">
          <div className="demo-option-label-item">All Types</div>
         </Option>

         {this.state.typeOptions?.map((t) => {
          return (
           <Option value={t.value} label={t.value}>
            <div className="demo-option-label-item">{t.value}</div>
           </Option>
          );
         })}
        </Select>
       )}
      </Col>
      <Col md={9}>
       <p className="text-right">{`${this.state.ids.length} Selected`} </p>
      </Col>
     </Row>
     {this.state.fetching ? (
      <Spin
       size="large"
       indicator={
        <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
       }
       style={{ position: "absolute", top: "40%", right: "50%" }}
      />
     ) : (
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
     )}
     {this.state.products?.length < 1 && !this.state.fetching && (
      <p
       className="w-100 text-center py-5 bolder block"
       style={{ position: "relative", top: "100px", fontSize: "2rem" }}
      >
       0 Result
      </p>
     )}
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

const mapDispatchToProps = (dispatch) => ({
 dispatchProjectTags: (tags) => dispatch(addProjectTags(tags)),
});
const mapStateToProps = (state) => {
 return {
  tags: state.project.project_tags,
  brands: state.addProduct.brands,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsTagsStep);
