import React, { Component } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { API } from "./../../utitlties";
import { message } from "antd";
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

 uploadCallback = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
   const formData = new FormData();
   formData.append("cover", file);
   axios
    .post(`${API}uploadimg`, formData)
    .then((response) => {
     const url = response.data.src;
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
   el[0]?.classList?.add("sticky-editor");
  } else {
   el[0]?.classList?.remove("sticky-editor");
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
         width: "100%",
        },
       },
      }}
     />
    </div>
    <button
     className="next-btn"
     onClick={() => {
      if (this.state.covers.length > 0) {
       this.props.dispatchGoStep(2);
      } else {
       message.error("Please Upload at least one image");
      }
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
