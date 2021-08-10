import React, { Component } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners/PulseLoader";
import { ADD_PRODUCT_NEXT_TAB } from "../../redux/constants";

class UploadFiles extends Component {
 state = {};
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
        <div id="uploaded-files"></div>
        <div className="upload-action">
         <input
          className="file-upload"
          //   onChange={handleUpload}
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
       <div id="" className="upload-btns">
        <div id="3d-files"></div>
        <div className="upload-action">
         <input
          className="file-upload"
          //    onChange={handle3DUpload}
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
        <div id="pdf-files"></div>
        <div className="upload-action">
         <input
          className="file-upload"
          //    onChange={handlePDFUpload}
          type="file"
         />
         <div className="upload-icon">
          <FaCloudUploadAlt />
         </div>
         <p>Upload Files</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </>
  );
 }
}

const mapStateToProps = (state) => ({ OptionsPrice: state.optionsPrice });
export default connect(mapStateToProps)(UploadFiles);
