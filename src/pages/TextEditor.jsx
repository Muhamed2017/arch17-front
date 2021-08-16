import React, { Component } from "react";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { resolve } from "q";
class TextEditor extends Component {
 constructor(props) {
  super(props);
  this.state = {
   editorState: EditorState.createEmpty(),
  };
 }
 url;
 uploadCallback = (file) => {
  return new Promise((resolve, reject) => {
   const formData = new FormData();
   formData.append("desc_gallery_files[]", file);

   axios
    .post("https://arch17-apis.herokuapp.com/api/desc/385", formData)
    .then((response) => {
     //  console.log(response.data.product_desc.desc_gallery_files[0]);
     //  resolve(res)
     resolve({
      data: { link: response.data.product_desc.desc_gallery_files[0] },
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
   <div className="text-editor">
    <Editor
     editorState={editorState}
     wrapperClassName="rich-editor demo-wrapper"
     editorClassName="demo-editor"
     onEditorStateChange={this.onEditorStateChange}
     placeholder="The message goes here..."
     toolbar={{
      //   options: ["image", "colorPicker"],
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
  );
 }
}

export default TextEditor;
