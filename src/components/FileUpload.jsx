import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
const FileUpload = () => {
 //  const [SubmittedFiles, setSubmittedFiles] = useState([]);
 const fileParams = ({ meta }) => {
  return { url: "http://127.0.0.1:8000/api/upload" };
 };

 const onFileChange = ({ meta, file }, status) => {
  //   console.log(status, meta, file);
  //   console.log(typeof formData.getAll("img"));
 };

 var formData = new FormData();
 const onSubmit = (files, allFiles) => {
  allFiles.forEach((f) => {
   f.remove();
  });

  axios
   .post("http://127.0.0.1:8000/api/upload", formData)
   .then((response) => {
    console.log(response);
   })
   .catch((err) => {
    console.log(err);
   });
 };

 const getFilesFromEvent = (e) => {
  return new Promise((resolve) => {
   getDroppedOrSelectedFiles(e).then((chosenFiles) => {
    resolve(chosenFiles.map((f) => f.fileObject));
   });
  });
 };

 const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
  const textMsg = files.length > 0 ? "Upload Again" : "Select Files";

  return (
   <label className="btn btn-danger mt-4">
    {textMsg}
    <input
     style={{ display: "none" }}
     type="file"
     accept={accept}
     multiple
     onChange={(e) => {
      getFilesFromEvent(e).then((chosenFiles) => {
       onFiles(chosenFiles);
       formData.append("img[]", e.target.files[0]);
      });
     }}
    />
   </label>
  );
 };

 const djsConfig = () => {
  return (
   //  <>
   <div className="dz-preview dz-file-preview">
    <div className="dz-details">
     <div className="dz-filename">
      <span data-dz-name="true"></span>
     </div>
     <img data-dz-thumbnail="true" />
    </div>
    <div className="dz-progress">
     <span className="dz-upload" data-dz-uploadprogress="true"></span>
    </div>
    <div className="dz-success-mark">
     <span>✔</span>
    </div>
    <div className="dz-error-mark">
     <span>✘</span>
    </div>
    <div className="dz-error-message">
     <span data-dz-errormessage="true"></span>
    </div>
   </div>
   //  </>
  );
 };
 return (
  <>
   <Dropzone
    onSubmit={onSubmit}
    onChangeStatus={onFileChange}
    InputComponent={selectFileInput}
    getUploadParams={fileParams}
    getFilesFromEvent={getFilesFromEvent}
    accept="image/*,audio/*,video/*"
    maxFiles={5}
    inputContent="Drop A File"
    styles={{
     dropzone: { width: 600, height: 400 },
     dropzoneActive: { borderColor: "green" },
    }}
    PreviewComponent={djsConfig}
   />
  </>
 );
};

export default FileUpload;

//  1 - upload files
//  2 - finishing the cycle
//  3 - testing it arefully..
//  4 - product page ...
