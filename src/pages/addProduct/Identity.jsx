import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import Select from "react-select";
// import axios from "axios";
import ReactFlagsSelect from "react-flags-select";
import PulseLoader from "react-spinners/PulseLoader";
import { productIdentity } from "../../redux/actions/addProductActions";
import { connect } from "react-redux";

//select tags
const colourStyles = {
 control: (styles) => ({ ...styles, backgroundColor: "white" }),
 option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  return {
   ...styles,
  };
 },
 multiValue: (styles, { data }) => {
  return {
   ...styles,
   color: "#fff",
   backgroundColor: "#e41e15",
  };
 },
 multiValueLabel: (styles, { data }) => ({
  ...styles,
  color: "#fff",

  ":hover": {
   backgroundColor: "#000",
  },
 }),
 multiValueRemove: (styles, { data }) => ({
  ...styles,
  color: "#fff",
  ":hover": {
   backgroundColor: "#e8736f",
   color: "#fff",
  },
 }),
};

//end of select tags
const SelectOptions = [
 { value: "chocolate", label: "Chocolate" },
 { value: "strawberry", label: "Strawberry" },
 { value: "vanilla", label: "Vanilla" },
];

const Identity = (props) => {
 const [name, setName] = useState(props.identity.name ?? "");
 const [category, setCategory] = useState("");
 const [type, setType] = useState("");
 const [kind, setKind] = useState("");
 const [material, setMaterial] = useState("");
 const [base, setBase] = useState("");
 const [shape, setShape] = useState("");
 const [seats, setSeats] = useState("");
 const [style, setStyle] = useState("");
 const [productTags, setProductTags] = useState([""]);
 const [country, setCountry] = useState("");
 const [is_outdoor, setOutdoor] = useState("yes");
 const [product_file_kind, setFileType] = useState("");
 const [is_for_kids, setForKids] = useState("");
 const [places_tags, setTags] = useState([]);
 const [places_tags_label, setTagsLabel] = useState([]);
 const onChangeCategory = (selectedOption) => {
  setCategory(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };
 const onChangeType = (selectedOption) => {
  setType(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };
 const onChangeKind = (selectedOption) => {
  setKind(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };
 const onChangeStyle = (selectedOption) => {
  setStyle(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };
 const onChangeBase = (selectedOption) => {
  setBase(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };
 const onChangeSeats = (selectedOption) => {
  setSeats(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };
 const onChangeShape = (selectedOption) => {
  setShape(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };
 const onChangeMaterial = (selectedOption) => {
  setMaterial(selectedOption);
  console.log(`Option selected:`, selectedOption);
 };

 const onChangeForKids = (value) => {
  setForKids(value);
 };

 const onChangeFileType = (value) => {
  setFileType(value);
 };

 const onChangeProductTags = (selectedOption) => {
  setTagsLabel(selectedOption);
  setTags(
   Array.isArray(places_tags_label) ? selectedOption.map((x) => x.value) : []
  );

  console.log(`Option selected:`, places_tags);
 };

 const handleIdentitySubmit = (e) => {
  props.dispatchAddIdentity(
   name,
   category.value,
   type.value,
   material.value,
   country,
   seats.value,
   shape.value,
   kind.value,
   style.value,
   //  productTags,
   places_tags,
   is_outdoor,
   is_for_kids
  );
 };

 return (
  <div className="step-form identity">
   <button
    className="save-product-step-btn"
    style={{ top: "-110px", height: "20px" }}
    onClick={handleIdentitySubmit}
   >
    {props.loading ? (
     <PulseLoader
      style={{ height: "20px" }}
      color="#ffffff"
      loading={props.loading}
      size={10}
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
         value={name}
         onChange={(e) => {
          setName(e.target.value);
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
       <Select
        options={SelectOptions}
        value={category}
        onChange={onChangeCategory}
        theme={(theme) => ({
         ...theme,
         colors: {
          ...theme.colors,
          primary25: "#f5f0f0",
          primary: "#e41e15",
          primary50: "#f5f0f0",
         },
        })}
        // style={customStyles}
       />
      </Col>
      <Form.Label column md={2} className="sub-label">
       Kind
      </Form.Label>
      <Col md={4}>
       <Select
        options={SelectOptions}
        value={kind ?? ""}
        onChange={onChangeKind}
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
     </Form.Group>
     <Form.Group as={Row}>
      <Form.Label
       column
       md={2}
       className="sub-label"
       onClick={() => console.log(product_file_kind, is_for_kids, places_tags)}
      >
       Type
      </Form.Label>
      <Col md={4}>
       <Select
        options={SelectOptions}
        value={type}
        onChange={onChangeType}
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
       Shape
      </Form.Label>
      <Col md={4}>
       <Select
        options={SelectOptions}
        value={shape}
        onChange={onChangeShape}
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
     </Form.Group>
     <Form.Group as={Row}>
      <Form.Label column md={2} className="sub-label">
       Style
      </Form.Label>
      <Col md={4}>
       <Select
        options={SelectOptions}
        value={style}
        onChange={onChangeStyle}
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
       <Select
        options={SelectOptions}
        value={material}
        onChange={onChangeMaterial}
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
     </Form.Group>
     <Form.Group as={Row}>
      <Form.Label column md={2} className="sub-label">
       Base
      </Form.Label>
      <Col md={4}>
       <Select
        options={SelectOptions}
        value={base}
        onChange={onChangeBase}
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
       Seats
      </Form.Label>
      <Col md={4}>
       <Select
        options={SelectOptions}
        value={seats}
        onChange={onChangeSeats}
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
     </Form.Group>
    </div>
    <div className="form-blc">
     <Form.Group as={Row}>
      <Col md={12}>
       <Form.Label>Is this Video made for kids ? (Required)</Form.Label>
      </Col>
      <Col md={1}>
       <Form.Check
        type="radio"
        label="yes"
        value="yes"
        name="formHorizontalRadios1"
        id="formHorizontalRadios1"
        onChange={(e) => onChangeForKids(e.target.value)}
       />
      </Col>
      <Col md={1}>
       <Form.Check
        type="radio"
        label="No"
        value="no"
        onChange={(e) => onChangeForKids(e.target.value)}
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
     <Col md={6}>
      <Form.Label>Collections / Sereies</Form.Label>
      <Form.Control placeholder="Search or create a new series" />
      <p className="light">Collect each series’s products in one collection.</p>
     </Col>
    </Form.Group>
    <Form.Group as={Row}>
     <Col md={6}>
      <Form.Label>Designer</Form.Label>
      <Form.Control placeholder="Search Designers by name or email" />
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
       onChange={(e) => onChangeFileType(e.target.value)}
      />
     </Col>
     <Col md={1}>
      <Form.Check
       type="radio"
       label="3D"
       value="3d"
       name="formHorizontalRadios3"
       id="formHorizontalRadios4"
       onChange={(e) => onChangeFileType(e.target.value)}
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
      <Col>
       <Form.Label>Product Tags </Form.Label>
       <Select
        closeMenuOnSelect={false}
        isMulti
        onChange={onChangeProductTags}
        value={places_tags_label}
        options={SelectOptions}
        styles={colourStyles}
       />
      </Col>
     </Form.Row>
    </Form.Group>
    <Form.Group as={Row}>
     <Col md={6}>
      <Form.Label>Product Country or Origin</Form.Label>
      <ReactFlagsSelect
       selected={country}
       selectedSize={18}
       optionsSize={18}
       onSelect={(code) => setCountry(code)}
      />
     </Col>
    </Form.Group>
   </Form>
  </div>
 );
};

// export default Identity;

const mapDispatchToProps = (dispatch) => ({
 dispatchAddIdentity: (
  name,
  category,
  type,
  material,
  country,
  seats,
  shape,
  kind,
  style,
  places_tags,
  // productTags,
  is_outdoor,
  is_for_kids,
  product_file_kind
 ) =>
  dispatch(
   productIdentity(
    name,
    category,
    type,
    material,
    country,
    seats,
    shape,
    kind,
    style,
    places_tags,
    is_outdoor,
    is_for_kids,
    product_file_kind
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
export default connect(mapStateToProps, mapDispatchToProps)(Identity);
