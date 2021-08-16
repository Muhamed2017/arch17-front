import React, { Component } from "react";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { resolve } from "q";

class MaterialDescription extends Component {
 constructor(props) {
  super(props);
  this.state = {
   editorState: EditorState.createEmpty(),
  };
 }

 submitDescriptionContent = () => {
  console.log(convertToRaw(this.state.editorState.getCurrentContent()));
  const formData = new FormData();
  formData.append(
   "mat_desc_content",
   JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
  );
  axios
   .post(
    `https://arch17-apis.herokuapp.com/api/descContent/${this.props.id}`,
    formData
   )
   .then((response) => {
    console.log(response);
   })
   .catch((error) => console.log(error));
 };

 uploadCallback = (file) => {
  return new Promise((resolve, reject) => {
   const formData = new FormData();
   formData.append("img[]", file);

   axios
    .post(
     `https://arch17-apis.herokuapp.com/api/upload/${this.props.id}`,

     formData
    )
    .then((response) => {
     resolve({
      data: { link: response.data.img[response.data.lastIndex].file_url },
     });
    })
    .catch((err) => {
     console.log(err);
     reject(err);
    });
  });
 };
 onEditorStateChange = (editorState) => {
  this.setState({
   editorState,
  });
  console.log(convertToRaw(this.state.editorState.getCurrentContent()));
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
      placeholder="Add Your Product Mateial Description "
      toolbar={{
       image: {
        uploadEnabled: true,
        urlEnabled: true,
        uploadCallback: this.uploadCallback,
        previewImage: true,
        alignmentEnabled: "LEFT",
        inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
        alt: { present: false, mandatory: false },
        defaultSize: {
         height: "auto",
         width: "400",
        },
       },
      }}
     />
    </div>
    <button
     className="save-product-step-btn"
     style={{ position: "relative", top: "10px" }}
     onClick={this.submitDescriptionContent}
    >
     Save
    </button>
   </>
  );
 }
}

export default MaterialDescription;
