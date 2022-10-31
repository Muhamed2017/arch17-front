import React, { Component } from "react";
import { Row, Col, Checkbox, Select, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "./../../utitlties";
import {
 addProjectTags,
 goToProjectStep,
} from "../../redux/actions/addProjectActions";
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
const { Option } = Select;
class ProductsTagsStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   products: [],
   noTypes: false,
   ids: this.props.tags ?? [],
   //  selectedBrand: "",
   selectedBrand: this.props.brands[0]?.id ?? [0],
   brands: this.props.brands?.map((b) => {
    return b.id;
   }),
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
   case "":
    right = [];
    break;
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
 handleBrandChange = (selectedBrand) => {
  this.setState(
   {
    selectedBrand,
    selectedType: "",
    selectedCategory: [selectedBrand],
   },
   () => {
    this.getProducts();
   }
  );
 };

 handleCategoryChange = (selectedCategory) => {
  this.setState(
   {
    selectedCategory,
    selectedType: "",
    typeOptions: this.rightType(selectedCategory),
   },
   () => {
    this.getProducts();
   }
  );
 };
 handleTypeChange = (selectedType) => {
  this.setState(
   {
    selectedType,
   },
   () => {
    this.getProducts();
   }
  );
 };
 componentDidMount() {
  if (this.state.brands?.length > 0) {
   axios
    .get(`${API}tags?filter[store_id]=${this.state.brands}`)
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
  console.log(this.state.brands);
 }
 render() {
  return (
   <>
    <div id="product-tags-step" className="p-5">
     <Row span={24} gutter={12} className="mt-3 mb-5">
      <Col md={5}>
       <Select
        className="w-100"
        size="large"
        showSearch
        value={this.state.selectedBrand[0]}
        onChange={this.handleBrandChange}
       >
        <Option value="" key="All">
         All Brands
        </Option>

        {this.state.brandsOptions?.map((brand) => {
         return (
          <Option value={brand.id} key={brand.id}>
           {brand.name}
          </Option>
         );
        })}
       </Select>
      </Col>
      <>
       <Col md={5}>
        <Select
         className="w-100"
         size="large"
         value={this.state.selectedCategory}
         onChange={this.handleCategoryChange}
        >
         <Option value="" key="">
          All Categories
         </Option>
         <Option value="Furniture" key="Furniture">
          Furniture
         </Option>
         <Option value="Lighting" key="Lighting">
          Lighting
         </Option>
         <Option value="Decore" key="Decore">
          Decore
         </Option>
         <Option value="Bathroom" key="Bathroom">
          Bathroom
         </Option>
         <Option value="Wellness" key="Wellness">
          Wellness
         </Option>
         <Option value="Kitchen" key="Kitchen">
          Kitchen
         </Option>
         <Option value="Finishes" key="Finishes">
          Finishes
         </Option>
         <Option value="Constructions" key="Constructions"></Option>
        </Select>
       </Col>
      </>
      <>
       <Col md={5}>
        {this.state.typeOptions.length > 0 &&
         this.state.selectedCategory?.length > 0 && (
          <Select
           className="w-100"
           size="large"
           showSearch
           value={this.state.selectedType}
           onChange={this.handleTypeChange}
          >
           <Option value="" key="All">
            All Types
           </Option>

           {this.state.typeOptions?.map((t) => {
            return (
             <Option value={t.value} key={t.value}>
              {t.value}
             </Option>
            );
           })}
          </Select>
         )}
       </Col>
      </>
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
    {/* <button
     className="next-btn"
     onClick={() => {
      this.props.dispatchProjectTags(this.state.ids);
     }}
    >
     Save & Continue
    </button> */}
    <div className="next-wrapper">
     <div className="next-inner">
      <button
       className="prev-btn"
       style={{ margin: "0 0px", position: "relative" }}
       onClick={() => this.props.dispatchGoStep(2)}
      >
       Previous
      </button>
      <button
       className="next-btn"
       onClick={() => {
        this.props.dispatchProjectTags(this.state.ids);

        //  this.props.dispatchGoStep(2);
       }}
      >
       Save & Continue
      </button>
     </div>
    </div>
   </>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 dispatchProjectTags: (tags) => dispatch(addProjectTags(tags)),
 dispatchGoStep: (step) => dispatch(goToProjectStep(step)),
});
const mapStateToProps = (state) => {
 return {
  tags: state.project.project_tags,
  // brands: state.addProduct.brands,
  brands: state.project.role_brands,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsTagsStep);
