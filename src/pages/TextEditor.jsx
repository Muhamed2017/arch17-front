import React, { useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
// import axios from "axios";
import { API } from "../utitlties";
import "../pages/addProject/Porject.css";
import {
 goToProjectStep,
 addProjectCover,
 addProjectContent,
} from "../redux/actions/addProjectActions";
import { connect } from "react-redux";
import { message } from "antd";
// import { Mentions } from "@ckeditor/ckeditor5-mention/src/mention";

const TextEditor = (props) => {
 const [uploading, setUploading] = useState(false);
 const [images, setImages] = useState([]);
 const [filesCounter, IncrementFilesCounter] = useState(0);
 const [loaders, setLoaders] = useState([]);
 function uploadAdapter(loader) {
  return {
   upload: () => {
    setUploading(true);
    return new Promise((resolve, reject) => {
     IncrementFilesCounter(filesCounter + 1);

     const fd = new FormData();
     loader.file.then((file) => {
      fd.append("cover", file);
      axios
       .post(`${API}uploadimg`, fd)
       .then((res) => {
        resolve({
         default: res.data.src,
        });
        props.dispatchProjectCover(res.data.src);
        setUploading(false);
        setImages([...images, res.data.src]);
        // console.log(loader);
        setLoaders([...loaders, loader]);
       })
       .catch((err) => {
        setUploading(false);
        reject(err);
        console.log(err);
       });
     });
    });
   },
  };
 }

 function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
   return uploadAdapter(loader);
  };
 }
 return (
  <>
   <div
    className=""
    style={{
     maxWidth: "1250px",
     margin: "35px auto",
    }}
   >
    <CKEditor
     config={{
      initialData: props?.content?.length > 0 ? props.content : "",
      extraPlugins: [uploadPlugin],
     }}
     editor={ClassicEditor}
     //  onReady={(editor) => {}}
     //  onBlur={(event, editor) => {}}
     //  onFocus={(event, editor) => {}}
     onChange={(event, editor) => {
      props.dispatchProjectContent(editor.getData());
      console.log(editor);
     }}
    />
   </div>
   <button
    className="next-btn"
    onClick={() => {
     console.log(loaders);
     if (images.length > 0) {
      if (images.length < filesCounter) {
       images.length < filesCounter && message.error("Stil uploading images");
      } else {
       props.dispatchGoStep(2);
      }
     } else {
      console.log("Upload at least one image");
      message.error("Upload at least one image ");
     }
    }}
   >
    Save & Continue
   </button>
  </>
 );
};
//  export default ContentStep;
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
export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
