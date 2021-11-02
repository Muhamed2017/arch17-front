import React, { Component } from "react";
import Select from "react-select";
import { components } from "react-select";
import { FaCheck } from "react-icons/fa";
class CustomeSelect extends Component {
 state = {
  close: false,
 };
 styles = {
  control: (base, { isFocused, isSelected }) => ({
   ...base,
   color: "#000",
   borderRadius: "10px",
   boxShadow: "none",
   borderColor: isFocused ? "#000" : "#ced4da",
   cursor: "pointer",
   "&:hover": {
    color: "#000",
    boxShadow: "none",
    borderColor: isFocused ? "#000" : "#ced4da",
   },
  }),
  indicatorSeparator: (base) => ({
   ...base,
   display: "none",
  }),
  option: (base, { isFocused, isSelected }) => ({
   ...base,
   padding: "5px",
   background: "none",
   color: "#000",
   fontWeight: isSelected ? "bold" : "normal",
   fontSize: "16px",
   cursor: "pointer",
   marginLeft: isSelected ? "0px" : "-22px",
   "&:hover": {
    color: "#000",
    boxShadow: "none",
    background: "#fff6f6",
    fontWeight: "bold",
   },
  }),
 };

 newOptions = (props) => (
  <components.Option {...props}>
   <FaCheck style={{ marginRight: "10px" }} />
   {props.data.label}
  </components.Option>
 );

 menuHeaderStyle = {
  padding: "8px 12px",
  color: "#A0A0A0",
 };
 MenuList = (props) => (
  <React.Fragment>
   <components.MenuList {...props} style={{ position: "relative" }}>
    {props.children}
   </components.MenuList>
   <div className="done-btn" style={this.menuHeaderStyle}>
    You can choose several items
    <button className="btn btn-sm btn-dark"> Done </button>
   </div>
  </React.Fragment>
 );

 render() {
  return (
   <Select
    name={this.props.name}
    options={this.props.options}
    onChange={this.props.handleChange}
    placeholder={this.props.placeholder}
    isMulti={this.props.isMulti}
    styles={this.styles}
    closeMenuOnSelect={this.props.closeMenuOnSelect}
    components={
     this.props.isMulti
      ? { Option: this.newOptions, MenuList: this.MenuList }
      : { Option: this.newOptions }
    }
    controlShouldRenderValue={this.props.isMulti ? false : true}
    {...this.props}
   />
  );
 }
}
export default CustomeSelect;
