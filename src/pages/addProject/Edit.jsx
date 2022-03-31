import React, { Component } from "react";

class Edit extends Component {
 constructor(props) {
  super(props);
  this.editorRef = React.createRef();
  this.state = {
   model: {},
  };
 }

 render() {
  return (
   <>
    <div id="editor"></div>
   </>
  );
 }
}

export default Edit;
