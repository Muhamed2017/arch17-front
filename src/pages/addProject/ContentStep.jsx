import React, { Component } from "react";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { API } from "./../../utitlties";
import {
 addProjectContent,
 addProjectCover,
 goToProjectStep,
} from "./../../redux/actions/addProjectActions";
import { connect } from "react-redux";
class ContentStep extends Component {
 constructor(props) {
  super(props);

  this.state = {
   nav: false,
   //  editorState: EditorState.createEmpty(),
   editorState: this.props?.content ?? EditorState.createEmpty(),
   files: [],
   covers: [],
  };
 }
 listener = null;

 onEditorStateChange = (editorState) => {
  this.setState({
   editorState,
  });
  this.props.dispatchProjectContent(editorState);
 };
 submitDescriptionContent = () => {
  // console.log(convertToRaw(this.state.editorState.getCurrentContent()));
 };

 uploadCallback = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
   const formData = new FormData();
   formData.append("img[]", file);
   axios
    .post(`${API}upload/${5}`, formData)

    .then((response) => {
     const url = response.data.img[response.data.lastIndex].file_url;
     resolve({
      data: { link: url },
     });
     this.setState(
      {
       covers: [...this.state.covers, url],
      },
      () => {
       this.props.dispatchProjectCover(url);
      }
     );
    })
    .catch((err) => {
     console.log(err);
     reject(err);
    });
  });
 };

 componentDidMount() {
  window.addEventListener("scroll", this.handleScroll);
 }

 handleScroll = () => {
  const el = document.getElementsByClassName("rdw-editor-toolbar");
  if (window.pageYOffset > 108) {
   el[0]?.classList?.add("sticky");
  } else {
   el[0]?.classList?.remove("sticky");
  }
 };
 render() {
  const { editorState } = this.state;

  return (
   <>
    <div className="text-editor" onClick={() => {}}>
     <Editor
      editorState={editorState}
      wrapperClassName="rich-editor demo-wrapper"
      editorClassName="demo-editor"
      defaultContentState={this.props.content}
      onEditorStateChange={this.onEditorStateChange}
      placeholder="Add Your Product Mateial Description "
      toolbar={{
       image: {
        uploadEnabled: true,
        urlEnabled: true,
        uploadCallback: (file) => this.uploadCallback(file),
        previewImage: true,
        alignmentEnabled: "LEFT",
        modalHandler: false,
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
    <button
     className="next-btn"
     onClick={() => {
      this.props.dispatchGoStep(2);
      // this.props.dispatchProjectCover(this.state.covers);
     }}
    >
     Save & Continue
    </button>
   </>
  );
 }
}
// export default ContentStep;
const mapDispatchToProps = (dispatch) => ({
 dispatchProjectContent: (content) => dispatch(addProjectContent(content)),
 dispatchProjectCover: (cover) => dispatch(addProjectCover(cover)),
 dispatchGoStep: (step) => dispatch(goToProjectStep(step)),
});
const mapStateToProps = (state) => {
 return {
  content: state.project.project_content,
  covers: state.project.project_covers,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentStep);
