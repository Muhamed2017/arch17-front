import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { API } from "../utitlties";
import "../pages/addProject/Porject.css";
import {
 goToProjectStep,
 addProjectCover,
 addProjectContent,
} from "../redux/actions/addProjectActions";
import { connect } from "react-redux";

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
      toolbarLocation: "bottom",
      toolbar: {
       location: "bottom",
      },
     }}
     editor={ClassicEditor}
     onChange={(event, editor) => {
      props.dispatchProjectContent(editor.getData());
      console.log(editor);
     }}
    />
   </div>

   <div className="next-wrapper">
    <div className="next-inner">
     <button
      className="prev-btn"
      style={{ margin: "0 0px", position: "relative" }}
      onClick={() => props.dispatchGoStep(0)}
     >
      Previous
     </button>
     <button
      className="next-btn"
      onClick={() => {
       props.dispatchGoStep(2);
      }}
     >
      Save & Continue
     </button>
    </div>
   </div>
  </>
 );
};
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
