import React, { Component } from "react";

class TestCrop extends Component {
 constructor(props) {
  super(props);

  this.state = {
   fileSelected: null,
   brand_cover: "",
   setting_cover: false,
   loading_cover: false,
   cropper_src: "",
   cover: "",
   brand_id: 35,
  };
 }

 render() {
  return (
   <>
    <div style={{ maxWidth: "1300px", margin: "auto" }}></div>
   </>
  );
 }
}

export default TestCrop;
