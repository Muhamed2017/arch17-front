import React, { Component } from "react";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { API } from "./../../utitlties";
class ContentStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   editorState: EditorState.createEmpty(),
   files: [],
  };
 }
 onEditorStateChange = (editorState) => {
  this.setState({
   editorState,
  });
  console.log(convertToRaw(this.state.editorState.getCurrentContent()));
 };
 submitDescriptionContent = () => {
  console.log(convertToRaw(this.state.editorState.getCurrentContent()));
 };
 uploadCallback = (file = this.state.files[0]) => {
  console.log(file);
  return new Promise((resolve, reject) => {
   const formData = new FormData();
   formData.append("img[]", file);
   axios
    .post(`${API}upload/${5}`, formData)
    .then((response) => {
     resolve({
      // data: { link: response.data.img[response.data.lastIndex].file_url },
      data: {
       link:
        "https://res.cloudinary.com/azharuniversity/image/upload/v1647872838/hmwdygpuwz97cnpxyqqh.jpg",
      },
     });
    })
    .catch((err) => {
     console.log(err);
     reject(err);
    });
  });
 };
 handleUploadImage = (e) => {
  const file = e.target.files[0];
  this.setState({ file: e.target.files[1] });
  const formData = new FormData();
  formData.append("img[]", file);
  axios
   .post(`${API}upload/${5}`, formData)
   .then((response) => {
    console.log(response.data);
    //  resolve({
    //   data: { link: response.data.img[response.data.lastIndex].file_url },
    //  });
   })
   .catch((err) => {
    console.log(err);
    //  reject(err);
   });
 };
 render() {
  const { editorState } = this.state;

  return (
   <>
    <div className="text-editor">
     <input
      type="file"
      multiple
      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
      onChange={this.handleUploadImage}
      // onChange={(e) => this.uploadCallback(e.target.files[0])}
     />
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
        // urlEnabled: false,
        alignmentEnabled: "LEFT",
        modalHandler: false,
        // multiple: "multiple",
        inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
        alt: { present: false, mandatory: false },
        defaultSize: {
         height: "auto",
         width: "80%",
        },
       },
      }}
     />
    </div>
   </>
  );
 }
}
export default ContentStep;
