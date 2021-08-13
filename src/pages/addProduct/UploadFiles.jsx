import React, { Component } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners/PulseLoader";
import { ADD_PRODUCT_NEXT_TAB } from "../../redux/constants";
import { RiFilePdfFill } from "react-icons/ri";
import { IoIosCube } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";
class UploadFiles extends Component {
 _2dcadFiles = [];
 _3dFiles = [];
 _pdfFiles = [];
 _2d_files_submit = [];
 _pdf_files_submit = [];
 _3d_files_submit = [];

 constructor(props) {
  super(props);
  this.state = {
   loaded: 0,
   _2dcadFiles: [],
   _3dFiles: [],
   _pdfFiles: [],
   _2d_files_submit: [],
   _pdf_files_submit: [],
   _3d_files_submit: [],
  };
 }

 fd = new FormData();
 onChange2dcadFiles = ({ target: { files } }) => {
  const reader = new FileReader();

  if (files && files.length > 0) {
   this.fd.append("files_cad_2d[]", files[0]);
   this._2d_files_submit.push(files[0]);

   this.setState({ _2d_files_submit: this._2d_files_submit });
   const file_src = URL.createObjectURL(files[0]);
   this._2dcadFiles.push(file_src);
   console.log(this._2dcadFiles);
   this.setState({ _2dcadFiles: this._2dcadFiles });
   reader.addEventListener("load", () => {});
  }
 };

 onChange3dFiles = ({ target: { files } }) => {
  const reader = new FileReader();
  if (files && files.length > 0) {
   this.fd.append("files_3d[]", files[0]);
   const file_src = URL.createObjectURL(files[0]);
   this._3dFiles.push(file_src);
   console.log("SSSSS");
   console.log(this._3dFiles);
   this.setState({ _3dFiles: this._3dFiles });
   reader.addEventListener("load", () => {
    this.setState({ o_image: files[0] });
   });
  }
 };

 onChangePDF = ({ target: { files } }) => {
  const reader = new FileReader();
  if (files && files.length > 0) {
   this.fd.append("files_pdf_cats[]", files[0]);
   const file_src = URL.createObjectURL(files[0]);
   this._pdfFiles.push(file_src);
   console.log("SSSSS");
   console.log(this._pdfFiles);
   this.setState({ _pdfFiles: this._pdfFiles });
   reader.addEventListener("load", () => {
    this.setState({ o_image: files[0] });
   });
  }
 };
 onSubmitFiles = () => {
  axios
   .post(`http://127.0.0.1:8000/api/files/${this.props.id}`, this.fd, {
    headers: {
     "Content-Type": "multipart/form-data",
    },
   })
   .then((response) => {
    this.props.dispatch({ type: ADD_PRODUCT_NEXT_TAB });

    console.log(response);
   });
 };
 handleNextStep = (e) => {
  this.props.dispatch({ type: ADD_PRODUCT_NEXT_TAB });
 };
 render() {
  return (
   <>
    <div className="step-form">
     <button
      className="save-product-step-btn"
      style={{ top: "-110px", height: "20px" }}
      onClick={this.handleNextStep}
     >
      {this.props.loading ? (
       <PulseLoader
        style={{ height: "20px" }}
        color="#ffffff"
        loading={this.props.loading}
        size={10}
       />
      ) : (
       "Save & Continue"
      )}
     </button>
     <div className="step-head">
      <h2>Upload Product Files</h2>
      <p>CAD / 3D, and PDF files</p>
     </div>
     <div className="upload-container">
      <div className="upload-block">
       <div className="upload-head">
        <h6>CAD / 2D Drawings Files</h6>
       </div>
       <div id="" className="upload-btns">
        <div className="uploaded-files">
         {this.state._2dcadFiles?.map((file, index) => {
          return (
           <div style={{ background: "#fff" }}>
            <RiFilePdfFill style={{ color: "red", fontSize: "4.5rem" }} />
           </div>
          );
         })}
        </div>
        <div className="upload-action">
         <input
          className="file-upload"
          onChange={this.onChange2dcadFiles}
          type="file"
         />
         <div className="upload-icon">
          <FaCloudUploadAlt />
         </div>
         <p>Upload Files</p>
        </div>
       </div>
      </div>
      <div className="upload-block">
       <div className="upload-head">
        <h6>3D Files</h6>
       </div>
       <div className="upload-btns">
        <div className="uploaded-files">
         {this.state._3dFiles?.map((file, index) => {
          return (
           <div style={{ background: "#fff" }}>
            <IoIosCube style={{ color: "red", fontSize: "4.5rem" }} />
           </div>
          );
         })}
        </div>
        <div className="upload-action">
         <input
          className="file-upload"
          onChange={this.onChange3dFiles}
          type="file"
         />
         <div className="upload-icon">
          <FaCloudUploadAlt />
         </div>
         <p>Upload Files</p>
        </div>
       </div>
      </div>
      <div className="upload-block">
       <div className="upload-head">
        <h6>Upload PDF and Catalogue files</h6>
       </div>
       <div id="" className="upload-btns">
        <div className="uploaded-files">
         {this.state._pdfFiles?.map((file, index) => {
          return (
           <div style={{ background: "#fff" }}>
            <FaFilePdf style={{ color: "red", fontSize: "4.5rem" }} />
           </div>
          );
         })}
        </div>
        <div className="upload-action">
         <input
          className="file-upload"
          onChange={this.onChangePDF}
          type="file"
         />
         <div className="upload-icon">
          <FaCloudUploadAlt />
         </div>
         <p>Upload Files</p>
        </div>
       </div>
      </div>
      <button onClick={this.onSubmitFiles}>Submit</button>
     </div>
    </div>
   </>
  );
 }
}

const mapStateToProps = (state) => ({ OptionsPrice: state.optionsPrice });
export default connect(mapStateToProps)(UploadFiles);
