import React, { Component } from "react";
import { Menu } from "antd";

class MenuDropdown extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }
 render() {
  return (
   <Menu>
    {/* <p className="menu-p">Choose from added materials</p>
     {this.state.unique_materials?.map((row, index) => {
      return (
       row.name &&
       row.image &&
       row?.name !== null && (
        <Menu.Item
         key={row?.name}
         onClick={() => {
          this.setState(
           {
            material_name: row?.name,
            material_image: row?.image,
           },
           () => {
            this.AddMaterialToOption(this.prprops.row_key);
           }
          );
         }}
        >
         <img style={style} alt="" src={row?.image} />
         <p>{row?.name}</p>
        </Menu.Item>
       )
      );
     })}

     <Menu.Item>
      <button
       onClick={(e) => {
        e.preventDefault();
        this.material_modal_open(props.row_key);
       }}
      >
       OR ADD NEW MATERIAL
      </button>
     </Menu.Item> */}
   </Menu>
  );
 }
}

export default MenuDropdown;
