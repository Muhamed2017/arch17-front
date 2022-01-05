import { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import ReactFlagsSelect from "react-flags-select";
import AsyncSelect from "react-select/async";
import { Select, Divider, Input } from "antd";
import * as productClass from "./../addProduct/ProductClassifications";
import ClipLoader from "react-spinners/ClipLoader";
import * as cnst from "./../addProduct/Identity";
import { productIdentity } from "./../../redux/actions/addProductActions";
import { connect } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { PlusOutlined } from "@ant-design/icons";
import { collectionSelectStyles } from "./../addProduct/Identity";
const { Option } = Select;
const colorOptions = [
 { label: "Muhamed", value: "Muhamed" },
 { label: "Mustafa", value: "Mustafa" },
 { label: "Ahmed", value: "Ahmed" },
];
class EditIdentity extends Component {
 constructor(props) {
  super(props);
  this.state = {
   name: this.props.data.name,
   category: "Furniture",
   type: "",
   styles_label: [],
   collectionValue: "",
   style: [],
   furniture: {},
   collections: [],
   seats_label: [],
   seats: [],
   bases: ["4-base"],
   bases_label: [],
   shapes_label: [],
   shapes: [],
   materials_label: [],
   materials: [],
   types_label: [],
   types: [],
   product_id: this.props.data.product_id ?? this.props.id,
   places_tags_label: [],
   places_tags: [],
   country: this.props.data.country ?? "",
   is_outdoor: "yes",
   brand_id: null,
   product_file_kind: "",
   is_for_kids: "yes",
   styles: [],
   kind: {
    label: this.props.data.kind,
    value: this.props.data.kind,
   },
   selectedMaterials: [],
  };
 }
 places_tags_label = [];
 places_tags = [];
 collections = [];
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
  this.setState(
   {
    kind: selectedOption,
    shapes_label: [],
    bases_label: [],
    seats_label: [],
    types_label: [],
    type: "",
   },
   () => {
    if (this.state.kind?.value === "Chairs") {
     this.setState({ furniture: productClass.chair });
    } else if (this.state.kind?.value === "Beds") {
     this.setState({ furniture: productClass.beds });
    } else if (this.state.kind?.value == "Sofa") {
     console.log(productClass.sofas);
     this.setState({ furniture: productClass.sofas });
    } else if (this.state.kind?.value === "Benches") {
     this.setState({ furniture: productClass.benches });
    } else if (this.state.kind?.value === "Chests") {
     this.setState({ furniture: productClass.chests });
    } else if (this.state.kind?.value === "Cabinets") {
     this.setState({ furniture: productClass.cabinet });
     console.log(productClass.sofas);
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
   }
  );
  console.log(`Option selected:`, selectedOption);
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
  this.setState({
   styles_label: selectedOption,
   styles: Array.isArray(this.state.materials_label)
    ? selectedOption.map((x) => x.value)
    : [],
  });
 };

 //  antd select
 //  handleChange = (value) => {
 //   console.log(`selected ${value}`);
 //  };

 //  handleChange = () =>
 //   newValue: OnChangeValue(colorOptions, true),
 //   actionMeta: ActionMeta(colorOptions)
 //   {
 //    console.group("Value Changed");
 //    console.log(newValue);
 //    console.log(`action: ${actionMeta.action}`);
 //    console.groupEnd();
 //   };

 promiseOptions = (inputValue) =>
  new Promise((resolve) => {
   setTimeout(() => {
    resolve(cnst.filterDesigners(inputValue));
   }, 1000);
  });

 componentDidMount() {
  this.props?.data?.places_tags?.map((m) => {
   this.places_tags_label.push({ label: m, value: m });
   return this.places_tags.push(m);
  });
  this.props?.collections?.map((collection, index) => {
   this.collections.push({
    label: collection.collection_name,
    value: collection.collection_name,
   });
  });

  this.setState({
   places_tags_label: this.places_tags_label,
   materials_label: this.props.data.material,
   materials: this.props.data.material,
   types_label: this.props.data.type,
   types: this.props.data.type,
   seats_label: this.props.data.seats,
   seats: this.props.data.seats,
   shapes_label: this.props.data.shape,
   shapes: this.props.data.shape,
   bases_label: this.props.data.base,
   bases: this.props.data.base,
   styles_label: this.props.data.style,
   styles: this.props.data.style,
   places_tags: this.props.data.places_tags,
  });
  console.log(this.state.selectedMaterials);
  if (this.state.kind?.value === "Chairs") {
   this.setState({ furniture: productClass.chair });
  } else if (this.state.kind?.value === "Beds") {
   this.setState({ furniture: productClass.beds });
  } else if (this.state.kind?.value == "Sofa") {
   console.log(productClass.sofas);
   this.setState({ furniture: productClass.sofas });
  } else if (this.state.kind?.value === "Benches") {
   this.setState({ furniture: productClass.benches });
  } else if (this.state.kind?.value === "Chests") {
   this.setState({ furniture: productClass.chests });
  } else if (this.state.kind?.value === "Cabinets") {
   this.setState({ furniture: productClass.cabinet });
   console.log(productClass.sofas);
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
 }
 handleIdentitySubmit = (e) => {
  this.props.dispatchAddIdentity(
   this.state.name,
   this.state.category,
   JSON.stringify(this.state.types_label),
   JSON.stringify(this.state.materials_label),
   this.state.country,
   JSON.stringify(this.state.seats_label),
   JSON.stringify(this.state.bases_label),
   JSON.stringify(this.state.shapes_label),
   this.state.kind.value,
   JSON.stringify(this.state.styles_label),
   this.state.places_tags,
   this.state.is_outdoor,
   this.state.is_for_kids,
   this.state.product_file_kind,
   this.state.product_id
  );
 };

 render() {
  const collections = this.props.collections;
  return (
   <>
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
          value={this.state.kind}
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
          value={this.state.styles_label}
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
          value={this.state.materials_label}
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
        {this.state.furniture?.bases?.length > 0 ? (
         <>
          <Form.Label column md={2} className="sub-label">
           Base
          </Form.Label>
          <Col md={4}>
           {/* <Select */}
           <ReactSelect
            isMulti
            options={this.state.furniture.bases}
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
            options={this.state.furniture.seats}
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
          checked={this.state.is_for_kids === "yes" ? true : false}
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
          checked={this.state.is_for_kids === "no" ? true : false}
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
       <Col md={5}>
        <Form.Label>Collections / Sereies</Form.Label>
        <div>
         <CreatableSelect
          isMulti
          styles={collectionSelectStyles}
          // onChange={this.handleChange}
          createOptionPosition={"first"}
          formatCreateLabel={(input) => {
           return (
            <>
             <div
              style={{
               position: "relative",
               paddingTop: "4px",
               marginBottom: "30px",
               paddingBottom: "10px",
               borderBottom: "1px solid #666",
              }}
             >
              Create:
              <span
               style={{
                display: "inline",
                fontWeight: "900",
                position: "relative",
               }}
              >
               {` ${input}`}
              </span>
              <button className="collect-new">
               <PlusOutlined />
              </button>
             </div>

             <Divider />
            </>
           );
          }}
          options={this.collections}
         />
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
         Search and tag the product’s designer, If you can’t in find the
         designer click here to invite.
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
         //  selected={}
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
   </>
  );
 }
}

// export default EditIdentity;
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
export default connect(mapStateToProps, mapDispatchToProps)(EditIdentity);
