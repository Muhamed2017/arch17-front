import React, { Component } from "react";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";

class Overview extends Component {
 constructor(props) {
  super(props);
  this.state = {
   editorState: EditorState.createEmpty(),
   saveContentState: this.props.saveContentState,
  };
 }
 submitOverviewContent = () => {
  console.log(convertToRaw(this.state.editorState.getCurrentContent()));
  const formData = new FormData();
  formData.append(
   "overview_content",
   JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
  );
  axios
   .post(
    `https://arch17-apis.herokuapp.com/api/overviewContnet/${this.props.id}`,
    formData
   )
   .then((response) => {
    console.log(response);
   })
   .catch((error) => console.log(error));
 };

 componentDidMount() {
  if (this.state.saveContentState) {
  }
 }

 onEditorStateChange = (editorState) => {
  this.setState({
   editorState,
  });
 };

 render() {
  const { editorState } = this.state;
  return (
   <>
    <div className="text-editor">
     <Editor
      editorState={editorState}
      wrapperClassName="rich-editor demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={this.onEditorStateChange}
      placeholder="Add Your Product Description Overview "
     />
    </div>
    <button
     className="save-product-step-btn"
     style={{ position: "relative", top: "10px" }}
     onClick={this.submitOverviewContent}
    >
     Save
    </button>
   </>
  );
 }
}
export default Overview;
