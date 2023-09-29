import React, { Component } from "react";
import { Form, Input, Row, Col, Select, DatePicker, Radio } from "antd";
import { connect } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import { addProjectInfo } from "./../../redux/actions/addProjectActions";
import { project_cats } from "../addProduct/ProductClassifications";
import { customLabels } from "../CreateBrandFinish";
import {
 products_categories,
 kind_options,
 lighting_kind_optios,
 decore_kind_options,
 finishes_kind_options,
 kitchen_kind_options,
 wellness_kind_options,
 constructions_kind_options,
 bathroom_kind_options,
} from "../addProduct/ProductClassifications";
// import {}
const { Option } = Select;
const config = {
 rules: [{ required: true, message: "Please select time!" }],
};
class InfoStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   country: this.props.info?.country ?? "",
   missed: false,
   selectedProdyctType: this.props.info?.product_type ?? [],
   selectedCats: this.props.info?.category ?? [],
   product_category: this.props.info?.product_design_category ?? "",
   product_kind: this.props.info?.product_design_kind ?? [],
   productSelect:
    this.props.info?.category &&
    this.props.info?.category?.indexOf("Product Design") !== -1,
   product_kind_options: [],
   selectedTypes: this.props.info?.type,
   _cat: this.props.info?.blogType ?? "",
  };
 }

 onFinish = (values) => {
  values.country = this.state.country;
  if (!values.country) {
   this.setState({ missed: true });
  } else {
   console.log("Success:", values);
   this.props.dispatchProjectInfo(values);
  }
 };

 onFinishFailed = (errorInfo) => {
  if (!this.state.country) {
   this.setState({ missed: true });
  }
  console.log("Failed:", errorInfo);
 };
 handleCatsChange = (selectedCats) => {
  this.setState(
   {
    selectedCats,
    productSelect: selectedCats?.indexOf("Product Design") !== -1,
   },
   () => {
    console.log(this.state.selectedCats);
   }
  );
 };
 handleTypesChange = (selectedTypes) => {
  this.setState({ selectedTypes }, () => {
   console.log(this.state.selectedTypes);
  });
 };
 setRightkindOption = (cat) => {
  if (!cat) return;

  let kind_option;
  switch (cat) {
   case "Furniture":
    kind_option = kind_options;
    break;

   case "Lighting":
    kind_option = lighting_kind_optios;
    break;

   case "Decore":
    kind_option = decore_kind_options;
    break;

   case "Construction":
    kind_option = constructions_kind_options;
    break;

   case "Wellness":
    kind_option = wellness_kind_options;
    break;

   case "Kitchen":
    kind_option = kitchen_kind_options;
    break;

   case "Bathroom":
    kind_option = bathroom_kind_options;
    break;

   case "Finishes":
    kind_option = finishes_kind_options;
    break;

   default:
    kind_option = [];
    break;
  }

  this.setState({
   product_kind_options: kind_option,
  });
 };
 handleProductCategoryChange = (seletedCategory) => {
  this.setState(
   {
    product_category: seletedCategory,
   },
   () => this.setRightkindOption(seletedCategory)
  );
 };
 handleProductTypeChange = (selectedProdyctType) => {
  this.setState({
   selectedProdyctType,
  });
 };
 componentDidMount() {
  this.setRightkindOption(this.state.product_category);
 }
 render() {
  return (
   <>
    <div className="project-step-info p-5">
     <Form
      name="basic"
      size="large"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 12 }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
      autoComplete="off"
     >
      <Form.Item
       className="form-label mb-5"
       label="Project Name"
       initialValue={this.props.info?.name}
       name="name"
       rules={[{ required: true, message: "Project Name is required" }]}
      >
       <Input />
      </Form.Item>
      <Form.Item
       name="blogType"
       label="Article Type"
       initialValue={this.props.info?.blogType ?? ""}
       className="form-label mb-5"
       rules={[{ required: true, message: "Kind is required" }]}
       wrapperCol={{ offset: 0, span: 24 }}
      >
       <Radio.Group
        value={this.state._cat}
        onChange={(e) => {
         this.setState({
          _cat: e.target.value,
         });
        }}
       >
        <Radio value="project">Project</Radio>
        <Radio value="blog">Design Blog</Radio>
       </Radio.Group>
      </Form.Item>

      <Form.Item
       name="category"
       label="Type"
       className="form-label mb-4"
       labelCol={{ span: 3, offset: 0 }}
       wrapperCol={{ span: 8, offset: 0 }}
       initialValue={this.state.selectedCats ?? []}
       rules={[
        {
         required: this.state._cat === "project",
         message: "Category is required!",
        },
       ]}
      >
       <Select
        placeholder="Please select "
        size="large"
        mode="multiple"
        value={this.state.selectedCats}
        // onChange={this.handleProductCategoryChange}
        onChange={this.handleCatsChange}
        showArrow
        style={{
         fontSize: "13px",
        }}
       >
        <Option value="Architecture">Architecture</Option>
        <Option value="Interior Design">Interior Design</Option>
        <Option value="Landscape">Landscape</Option>
        <Option value="Product Design">Product Design</Option>
        <Option value="Blog">Blog</Option>
       </Select>
      </Form.Item>

      <Form.Item
       name="type"
       label="Project"
       initialValue={this.state.selectedTypes}
       labelCol={{ span: 3 }}
       wrapperCol={{
        span: 8,
       }}
       className="form-label mb-5"
       rules={[
        {
         required: false,
         //  required: this.state._cat === "project"  && this.state.selectedCats?.indexOf("Product Design") === -1,
         message: "Project kind is required!",
        },
       ]}
      >
       <Select
        showSearch
        onChange={this.handleTypesChange}
        value={this.state.selectedTypes}
        placeholder="Please select a category"
        style={{
         fontSize: "13px",
        }}
       >
        {project_cats.map((p) => {
         return (
          <>
           <Option value={p}>{p}</Option>
          </>
         );
        })}
       </Select>
      </Form.Item>
      {this.state.productSelect && (
       <>
        <Form.Item
         name="product_design_category"
         label="Product"
         className="form-label mb-4"
         labelCol={{ span: 3, offset: 0 }}
         wrapperCol={{ span: 8, offset: 0 }}
         initialValue={this.state.product_category}
         rules={[
          {
           required: false,
           //  required: this.state.selectedCats?.indexOf("Product Design") !== -1,
           message: "Product Category is required!",
          },
         ]}
        >
         <Select
          showSearch
          placeholder="Please select Product"
          size="large"
          value={this.state.product_category}
          onChange={this.handleProductCategoryChange}
          showArrow
          style={{
           fontSize: "13px",
          }}
         >
          {products_categories.map((cat) => {
           return <Option value={cat}>{cat}</Option>;
          })}
         </Select>
        </Form.Item>
        {this.state.productSelect &&
         this.state.product_kind_options?.length > 0 && (
          <Form.Item
           name="product_design_kind"
           label="Product Kind"
           className="form-label mb-4"
           labelCol={{ span: 3, offset: 0 }}
           wrapperCol={{ span: 8, offset: 0 }}
           initialValue={this.state.product_kind}
           rules={[
            {
             required: false,
             //  required:
             // this.state.selectedCats?.indexOf("Product Design") !== -1,
             message: "Product Type is required!",
            },
           ]}
          >
           <Select
            mode="multiple"
            placeholder="Please select Product Type"
            size="large"
            value={this.state.selectedProdyctType}
            onChange={this.handleProductTypeChange}
            showArrow
            showSearch
            style={{
             fontSize: "13px",
            }}
           >
            {this.state.product_kind_options.map((type) => {
             return <Option value={type.value}>{type.value}</Option>;
            })}
           </Select>
          </Form.Item>
         )}
       </>
      )}
      <Row span={24} gutter={15} justify="start">
       <Col md={24} className="my-3">
        <p className="form-label">Project Country & City </p>
       </Col>
       <Col md={6}>
        <ReactFlagsSelect
         selected={this.state.country}
         selectedSize={14}
         optionsSize={18}
         searchable
         customLabels={customLabels}
         placeholder="Select Country *"
         onSelect={(code) => {
          this.setState({ country: code });
         }}
        />
        {!this.state.country && this.state.missed && (
         <>
          <p style={{ color: "red" }}>country is required</p>
         </>
        )}
       </Col>
       <Col md={12}>
        <Form.Item
         initialValue={this.props.info?.city ?? ""}
         name="city"
         rules={[{ required: true, message: "City" }]}
        >
         <Input placeholder="City" />
        </Form.Item>
       </Col>
      </Row>
      <Form.Item
       wrapperCol={{ span: 6 }}
       name="year"
       label="Year"
       className="form-label mt-4"
       initialValue={this.props.info?.year}
       {...config}
      >
       <DatePicker
        size="large"
        picker="year"
        style={{
         width: "100%",
        }}
       />
      </Form.Item>

      <div className="next-wrapper">
       <div className="next-inner">
        <button
         className="next-btn"
         htmlType="submit"
         onClick={() => {
          console.log(this.state);
         }}
        >
         Save & Continue
        </button>
       </div>
      </div>
     </Form>
    </div>
   </>
  );
 }
}
// export default InfoStep;
const mapDispatchToProps = (dispatch) => ({
 dispatchProjectInfo: (info) => dispatch(addProjectInfo(info)),
});
const mapStateToProps = (state) => {
 return {
  loading: state.addProduct.loading,
  identity: state.addProduct.identity,
  tabIndex: state.addProduct.tabIndex,
  info: state.project.project_info,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoStep);
