import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import ReactFlagsSelect from "react-flags-select";
import { productIdentity } from "../../redux/actions/addProductActions";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";
import { API } from "./../../utitlties";
import { Select, Divider, Input } from "antd";
import * as productClass from "./ProductClassifications";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import * as cnst from "./Identity";
const { Option } = Select;

class IdentityStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   name: props.identity.name ?? "",
   category: "Furniture",
   type: "",
   styles_label: [],
   collectionValue: "",
   style: [],
   furniture: {},
   collections: [],
   seats_label: [],
   seats: ["1-seater"],
   bases: ["4-base"],
   bases_label: [],
   shapes_label: [],
   shapes: [],
   materials_label: [],
   materials: [],
   types_label: [],
   types: [],
   product_id: props.id,
   places_tags_label: [],
   places_tags: [],
   country: "",
   is_outdoor: "yes",
   brand_id: null,
   product_file_kind: "",
   is_for_kids: "yes",
   styles: [],
   kind: "",
   identity: {},
  };
 }

 filterDesigners = (inputValue = "") => {
  return cnst.desingersOptions.filter((i) =>
   i.value.toLowerCase().includes(inputValue.toLowerCase())
  );
 };

 onChangeCategory = (selectedOption) => {
  this.setState({ category: selectedOption });
  console.log(`Option selected:`, selectedOption);
 };

 onChangeKind = (selectedOption) => {
  this.setState({
   kind: selectedOption,
   shapes_label: [],
   bases_label: [],
   seats_label: [],
   types_label: [],
  });

  console.log(`Option selected:`, selectedOption);
  this.setState({ type: "" });
 };

 onChangeBase = (selectedOption) => {
  this.setState({
   bases_label: selectedOption,
   bases: Array.isArray(this.state.bases_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeSeats = (selectedOption) => {
  this.setState({
   seats_label: selectedOption,
   seats: Array.isArray(this.state.seats_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeShape = (selectedOption) => {
  this.setState({
   shapes_label: selectedOption,
   shapes: Array.isArray(this.state.shapes_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeMaterial = (selectedOption) => {
  this.setState({
   materials_label: selectedOption,
   materials: Array.isArray(this.state.materials_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeForKids = (value) => {
  this.setState({ kids: value });
 };

 onChangeFileType = (value) => {
  this.setState({ product_file_kind: value });
 };

 onChangeProductTags = (selectedOption) => {
  //   setTagsLabel(selectedOption);
  //   setTags(
  //    Array.isArray(places_tags_label) ? selectedOption.map((x) => x.value) : []
  //   );
  //   console.log(`Option selected:`, places_tags);
  this.setState({
   places_tags_label: selectedOption,
   places_tags: Array.isArray(this.state.places_tags_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeProductTypes = (selectedOption) => {
  this.setState({
   types_label: selectedOption,
   types: Array.isArray(this.state.types_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 onChangeStyle = (selectedOption) => {
  //   setStyle(selectedOption);
  this.setState({ style: selectedOption });
  console.log(`Option selected:`, selectedOption);
 };
 handleChange = (value) => {
  console.log(`selected ${value}`);
 };
 collectionSelectFilter = (inputValue = "") => {
  return cnst.collectionsOptions.filter((i) =>
   i.value.toLowerCase().includes(inputValue.toLowerCase())
  );
 };
 promiseOptions = (inputValue) =>
  new Promise((resolve) => {
   setTimeout(() => {
    resolve(cnst.filterDesigners(inputValue));
   }, 1000);
  });

 componentDidMount() {
  if (this.state.kind?.value === "Chairs") {
   this.setState({ furniture: productClass.chair });
  } else if (this.state.kind?.value === "Beds") {
   this.setState({ furniture: productClass.beds });
  } else if (this.state.kind?.value === "Sofa") {
   this.setState({ furniture: productClass.sofas });
  } else if (this.state.kind?.value === "Benches") {
   this.setState({ furniture: productClass.benches });
  } else if (this.state.kind?.value === "Chests") {
   this.setState({ furniture: productClass.chests });
  } else if (this.state.kind?.value === "Cabinets") {
   this.setState({ furniture: productClass.cabinet });
  } else if (this.state.kind?.value === "Table") {
   this.setState({ furniture: productClass.table });
  } else if (this.state.kind?.value === "Poufs") {
   this.setState({ furniture: productClass.poufs });
  } else if (this.state.kind?.value === "Office") {
   this.setState({ furniture: productClass.office });
  } else if (this.state.kind?.value === "Furniture components and hardware") {
   this.setState({ furniture: productClass.components_hardware });
  } else {
   this.setState({ furniture: productClass.empty });
  }

  axios
   .get(`${API}product/${this.props.id}`)
   .then((response) => {
    const identitye = response.data.product.identity[0];
    this.setState({
     identity: identitye,
     name: identitye.name,
     kind: [{ label: identitye?.kind, value: identitye?.kind }],
    });
    console.log(identitye);
   })
   .catch((err) => console.log(err));
 }
 handleIdentitySubmit = (e) => {
  this.props.dispatchAddIdentity(
   this.state.name,
   this.state.category,
   this.state.types,
   this.state.materials,
   this.state.country,
   this.state.seats,
   this.state.bases,
   this.state.shapes,
   this.state.kind.value,
   this.state.styles,
   this.state.places_tags,
   this.state.is_outdoor,
   this.state.is_for_kids,
   this.state.product_file_kind,
   this.state.product_id
  );
 };
 render() {
  return (
   <div className="step-form identity">
    <button
     className="save-product-step-btn"
     style={{
      top: "-110px",
      height: "20px",
      background: this.props.loading ? "#898989" : "",
     }}
     onClick={this.handleIdentitySubmit}
    >
     {this.props.loading ? (
      <ClipLoader
       style={{ height: "20px" }}
       color="#ffffff"
       loading={this.props.loading}
       size={18}
      />
     ) : (
      "Save & Continue"
     )}
    </button>
    <Form>
     <div className="form-block">
      <Form.Group>
       <Form.Row>
        <Col>
         <Form.Label>Product Name</Form.Label>
         <Form.Control
          className="py-3"
          placeholder="Product name"
          value={this.state.name}
          onChange={(e) => {
           this.setState({ name: e.target.value });
          }}
         />
        </Col>
       </Form.Row>
      </Form.Group>
     </div>
     <div className="form-block">
      <Form.Group as={Row}>
       <Form.Label column md={12} className="mb-4">
        Product Category
       </Form.Label>
       <Form.Label column md={2} className="sub-label">
        Category *
       </Form.Label>
       <Col md={4}>
        <ReactSelect
         value="Furniture"
         placeholder="Furniture"
         isDisabled
         onChange={this.onChangeCategory}
         theme={(theme) => ({
          ...theme,
          colors: {
           ...theme.colors,
           primary25: "#f5f0f0",
           primary: "#e41e15",
           primary50: "#f5f0f0",
          },
         })}
        />
       </Col>
       <Form.Label column md={2} className="sub-label">
        Kind
       </Form.Label>
       <Col md={4}>
        {/* <Select */}
        <ReactSelect
         options={productClass.kind_options}
         value={this.state.kind ?? ""}
         onChange={this.onChangeKind}
         theme={(theme) => ({
          ...theme,
          colors: {
           ...theme.colors,
           primary25: "#f5f0f0",
           primary: "#e41e15",
           primary50: "#f5f0f0",
          },
         })}
        />
       </Col>
       {this.state.furniture.types?.length > 0 ? (
        <>
         <Form.Label
          column
          md={2}
          className="sub-label"
          onClick={() =>
           console.log(
            this.state.product_file_kind,
            this.state.is_for_kids,
            this.state.places_tags
           )
          }
         >
          Type
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           // options={rightType}
           options={this.state.furniture.types}
           value={this.state.types_label}
           // onChange={onChangeType}
           onChange={this.onChangeProductTypes}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       {this.state.furniture?.shapes?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Shape
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           // options={rightShape}
           options={this.state.furniture.shapes}
           value={this.state.shapes_label}
           onChange={this.onChangeShape}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       <Form.Label column md={2} className="sub-label">
        Style
       </Form.Label>
       <Col md={4}>
        {/* <Select */}
        <ReactSelect
         isMulti
         options={productClass.furniture_styles}
         value={this.state.style}
         onChange={this.onChangeStyle}
         theme={(theme) => ({
          ...theme,
          colors: {
           ...theme.colors,
           primary25: "#f5f0f0",
           primary: "#e41e15",
           primary50: "#f5f0f0",
          },
         })}
        />
       </Col>
       <Form.Label column md={2} className="sub-label">
        Material
       </Form.Label>
       <Col md={4}>
        {/* <Select */}
        <ReactSelect
         isMulti
         options={productClass.furniture_materials}
         //  selectedOption={["fabric"]}
         value={this.state.materials_label}
         //  value={["Fabric", "SSSS"]}
         onChange={this.onChangeMaterial}
         styles={this.state.material_styles}
         theme={(theme) => ({
          ...theme,
          colors: {
           ...theme.colors,
           primary25: "#f5f0f0",
           primary: "#e41e15",
           primary50: "#f5f0f0",
          },
         })}
        />
       </Col>
       {this.state.furniture.bases?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Base
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           options={this.furniture.bases}
           value={this.state.bases_label}
           onChange={this.onChangeBase}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
       {this.state.furniture.seats?.length > 0 ? (
        <>
         <Form.Label column md={2} className="sub-label">
          Seats
         </Form.Label>
         <Col md={4}>
          {/* <Select */}
          <ReactSelect
           isMulti
           options={this.stata.furniture.seats}
           value={this.state.seats_label}
           onChange={this.onChangeSeats}
           theme={(theme) => ({
            ...theme,
            colors: {
             ...theme.colors,
             primary25: "#f5f0f0",
             primary: "#e41e15",
             primary50: "#f5f0f0",
            },
           })}
          />
         </Col>
        </>
       ) : (
        <></>
       )}
      </Form.Group>
     </div>
     <div className="form-blc">
      <Form.Group as={Row}>
       <Col md={12}>
        <Form.Label>Is this Product made for kids ? (Required)</Form.Label>
       </Col>
       <Col md={1}>
        <Form.Check
         type="radio"
         label="yes"
         value="yes"
         name="formHorizontalRadios1"
         id="formHorizontalRadios1"
         onChange={(e) => this.onChangeForKids(e.target.value)}
        />
       </Col>
       <Col md={1}>
        <Form.Check
         type="radio"
         label="No"
         value="no"
         onChange={(e) => this.onChangeForKids(e.target.value)}
         name="formHorizontalRadios1"
         id="formHorizontalRadios2"
        />
       </Col>
       <Col md={12}>
        <p className="light">
         Please check on yes if this products made spicily for kids.
        </p>
       </Col>
      </Form.Group>
     </div>
     <Form.Group as={Row}>
      <Col md={7}>
       <Form.Label>Collections / Sereies</Form.Label>
       <div>
        <Select
         mode="tags"
         style={{ width: "100%" }}
         placeholder="Add to an existing collection or create a new one "
         onChange={this.handleChange}
         onSearch={(e) => console.log(e, this.state.collections)}
         //  onSelect={(e) => collect(e)}
         filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
         }
         size="large"
        >
         {this.state.collections.map((collection) => {
          return (
           <Option key={collection.id} value={collection.id}>
            {collection.collection_name}
           </Option>
          );
         })}
        </Select>
       </div>
       {/* ,mountNode */}
       <p className="light">
        Collect each series’s products in one collection.
       </p>
      </Col>
     </Form.Group>
     <Form.Group as={Row}>
      <Col md={7}>
       <Form.Label>Designer</Form.Label>
       <AsyncSelect
        isMulti
        defaultOptions
        placeholder="Search"
        loadOptions={this.promiseOptions}
       />

       <p className="light">
        Search and tag the product’s designer, If you can’t in find the designer
        click here to invite.
       </p>
      </Col>
     </Form.Group>
     <Form.Group as={Row}>
      <Col md={12}>
       <Form.Label>Product Files</Form.Label>
      </Col>
      <Col md={1}>
       <Form.Check
        type="radio"
        label="CAD"
        value="cad"
        name="formHorizontalRadios3"
        id="formHorizontalRadios3"
        onChange={(e) => this.onChangeFileType(e.target.value)}
       />
      </Col>
      <Col md={1}>
       <Form.Check
        type="radio"
        label="3D"
        value="3d"
        name="formHorizontalRadios3"
        id="formHorizontalRadios4"
        onChange={(e) => this.onChangeFileType(e.target.value)}
       />
      </Col>
      <Col md={12}>
       <p className="light">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti!
       </p>
      </Col>
     </Form.Group>
     <Form.Group>
      <Form.Row>
       <Col md={8}>
        <Form.Label>Product Tags </Form.Label>
        {/* <Select */}
        <ReactSelect
         closeMenuOnSelect={false}
         isMulti
         onChange={this.onChangeProductTags}
         value={this.state.places_tags_label}
         options={cnst.TagsOptions}
         styles={cnst.colourStyles}
        />
       </Col>
      </Form.Row>
     </Form.Group>
     <Form.Group as={Row}>
      <Col md={6} style={{ marginBottom: "100px" }}>
       <Form.Label>Product Country or Origin</Form.Label>
       <ReactFlagsSelect
        selected={this.state.country}
        selectedSize={20}
        optionsSize={20}
        searchable
        onSelect={(code, value) => {
         this.setState({ country: code });
         console.log(code, value);
        }}
       />
      </Col>
     </Form.Group>
    </Form>
   </div>
  );
 }
}

// export default IdentityStep;

const mapDispatchToProps = (dispatch) => ({
 dispatchAddIdentity: (
  name,
  category,
  type,
  material,
  country,
  seats,
  bases,
  shape,
  kind,
  style,
  places_tags,
  // productTags,
  is_outdoor,
  is_for_kids,
  product_file_kind,
  id
 ) =>
  dispatch(
   productIdentity(
    name,
    category,
    type,
    material,
    country,
    seats,
    bases,
    shape,
    kind,
    style,
    places_tags,
    is_outdoor,
    is_for_kids,
    product_file_kind,
    id
   )
  ),
});
const mapStateToProps = (state) => {
 return {
  loading: state.addProduct.loading,
  identity: state.addProduct.identity,
  tabIndex: state.addProduct.tabIndex,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(IdentityStep);
