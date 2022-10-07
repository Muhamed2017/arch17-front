import React, { Component } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { RiFilePdfFill } from "react-icons/ri";
import { IoIosCube } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
 nextTab,
 productDescription,
} from "../../redux/actions/addProductActions";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "./../../utitlties";
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
   published: false,
   loading: false,
   skip_modal: false,
  };
 }
 skip = () => {
  this.props.dispatchNextStep();
  // this.setState({ published: true });
 };

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
   //  const file_src = URL.createObjectURL(files[0]);
   //  this._3dFiles.push(file_src);
   console.log(this._3dFiles);
   //  this.setState({ _3dFiles: this._3dFiles });
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
   console.log(this._pdfFiles);
   this.setState({ _pdfFiles: this._pdfFiles });
   reader.addEventListener("load", () => {
    this.setState({ o_image: files[0] });
   });
  }
 };
 skip_modal_close = () => {
  this.setState({ skip_modal: false });
 };
 handleNextStep = (e) => {
  if (this.state._pdfFiles.length < 1) {
   this.setState({ skip_modal: true });
   return;
  } else {
   this.setState({ loading: true });

   setTimeout(() => {
    axios
     .post(`${API}files/${this.props.id}`, this.fd, {
      headers: {
       "Content-Type": "multipart/form-data",
      },
     })
     .then((response) => {
      // this.setState({ published: true });
      this.props.dispatchNextStep();
      console.log(response);
     });
   }, 2000);
  }
 };
 render() {
  return (
   <>
    <div className="step-form">
     {/* <button className="product-skip-btn" onClick={this.skip}>
      Skip
     </button>
     <button
      className="save-product-step-btn"
      style={{
       top: "-110px",
       height: "20px",
       background: this.state.loading ? "#898989" : "",
      }}
      onClick={this.handleNextStep}
     >
      {this.state.loading ? (
       <ClipLoader
        style={{ height: "20px" }}
        color="#ffffff"
        loading={this.state.loading}
        size={20}
       />
      ) : (
       "Save & Continue"
      )}
     </button> */}
     <div className="next-wrapper">
      <div
       className="next-inner"
       style={{
        maxWidth: "1000px",
       }}
      >
       <button
        onClick={this.skip}
        className="prev-btn"
        style={{ margin: "0 0px", position: "relative" }}
       >
        Skip
       </button>
       <button
        className="next-btn"
        style={{
         top: "-110px",

         background: this.state.loading ? "#898989" : "",
        }}
        onClick={this.handleNextStep}
       >
        {this.state.loading ? (
         <ClipLoader
          style={{ height: "20px" }}
          color="#ffffff"
          loading={this.state.loading}
          size={20}
         />
        ) : (
         "Save & Continue"
        )}
       </button>
      </div>
     </div>
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
     </div>
     <Modal
      id="price-request-modal"
      className="arch-wide-modal product-modal pics-modal"
      size="md"
      show={this.state.skip_modal}
      onHide={this.skip_modal_close}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
        <h6>Skip Modal</h6>
        <Button
         variant="danger"
         type="submit"
         onClick={() => {
          this.setState({ skip_modal: false });
          // this.setState({ published: true });
          this.props.dispatchNextStep();
         }}
         style={{
          textAlign: "right",
          background: "#E41E15",
          display: "block",
          float: "right",
          marginRight: "12px",
         }}
        >
         Skip
        </Button>
       </div>
      </Modal.Body>
     </Modal>
    </div>
   </>
  );
 }
}
// }
const mapDispatchToProps = (dispatch) => ({
 dispatchDescriptionStep: (data, id) => dispatch(productDescription(data, id)),
 dispatchNextStep: () => dispatch(nextTab()),
});
const mapStateToProps = (state) => ({ OptionsPrice: state.optionsPrice });

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);
