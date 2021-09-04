import React, { Component } from "react";
import "react-notifications-component/dist/theme.css";
import { FaPlus } from "react-icons/fa";
import { Row, Modal, Button } from "react-bootstrap";
// import ReactNotification,
// import { store } from "react-notifications-component";

import "cropperjs/dist/cropper.css";
import { connect } from "react-redux";
import OptionsRow from "./optionsRow";
import {
 ADD_PRODUCT_NEXT_TAB,
 ADD_ROW,
 OPTIONS_STORED,
} from "../../redux/constants";
import axios from "axios";
import imageCompression from "browser-image-compression";
import ClipLoader from "react-spinners/ClipLoader";

export const API = "https://arch17-apis.herokuapp.com/api/option-price/";
export const compressImage = async (imageFile) => {
 const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 850,
  useWebWorker: true,
 };
 try {
  const compressedFile = await imageCompression(imageFile, options);
  console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
  console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
  return compressedFile;
 } catch (error) {
  throw new Error(error);
 }
};
class OptionsPrice extends Component {
 state = {
  src: "",
  productPictures: [],
  pics_modal: false,
  material_modal: false,
  size_modal: false,
  price_modal: false,
  offer_modal: false,
  validation_modal: false,
  validation_messages: [],
  validate_size: false,
  validate_price: false,
  validate_offerPrice: false,
  loading: false,
 };
 //  addNotification = () => {
 //   store.addNotification({
 //    title: "Option and price Notification",
 //    message: "Hello from Option and price step",
 //    type: "danger",
 //    insert: "bottom",
 //    container: "top-left",
 //    animationIn: ["animate__animated", "animate__fadeIn"],
 //    //  animationOut: ["animate__animated", "animate__fadeOut"],
 //    dismiss: {
 //     duration: 1500,
 //     // onScreen: false,
 //    },
 //   });
 //  };
 componentDidUpdate() {
  console.log(this.props);
 }
 displayUploadField(fieldName, setThumbnail, thumbnail, icon) {
  return (
   <React.Fragment>
    <label for={fieldName}>
     {!thumbnail ? (
      <div className="upload-box">{icon}</div>
     ) : (
      <img src={thumbnail} width={100} alt="" />
     )}
    </label>
    <input
     id={fieldName}
     type="file"
     style={{ display: "none" }}
     onChange={setThumbnail}
    />
   </React.Fragment>
  );
 }
 componentDidMount() {
  const validRows = this.props.OptionsPrice.rows.filter((row) => !!row);
  if (validRows.length < 1) this.props.dispatch({ type: ADD_ROW });
 }
 async addNewOptionRow() {
  const validation_messages = [];

  this.props.OptionsPrice.rows.map((row) => {
   if (!row) return;
   const { quantity, price, offerPrice, code, productPictures } = row;
   const { L, W, H } = row?.size;
   const { nameValidation, imageValidation } = row?.material;
   if (!nameValidation)
    validation_messages.push("material name at row#" + row.row_number);

   if (!imageValidation)
    validation_messages.push("material image at row#" + row.row_number);

   //  if (!quantity) validation_messages.push("quantity at row#" + row.row_number);
   //  if (!price && this.state.validate_price)
   // validation_messages.push("initial price at row#" + row.row_number);
   //  if (!offerPrice && this.state.validate_offerPrice)
   // validation_messages.push("offer price at row#" + row.row_number);
   if (!productPictures?.length)
    validation_messages.push(
     "upload at least one image of the product at row#" + row.row_number
    );

   //  if (!L && !W && !H && this.state.validate_size)
   //   validation_messages.push(
   //    "size (Length, Width, Height) at row#" + row.row_number
   //   );
  });

  if (validation_messages.length > 0) {
   this.setState({ validation_modal: true, validation_messages });
   return;
  } else {
   this.props.dispatch({ type: ADD_ROW });
  }
 }

 async saveAndContinue() {
  const validation_messages = [];

  this.props.OptionsPrice.rows.map((row) => {
   if (!row) return;
   const { quantity, price, offerPrice, productPictures } = row;
   const { L, W, H } = row?.size;
   const { option_id } = row;
   const { nameValidation, imageValidation } = row?.material;
   if (!nameValidation)
    validation_messages.push("material name at row#" + row.row_number);

   if (!imageValidation)
    validation_messages.push("material image at row#" + row.row_number);

   //  if (!quantity) validation_messages.push("quantity at row#" + row.row_number);
   //  if (!price && this.state.validate_price)
   //   validation_messages.push("initial price at row#" + row.row_number);
   //  if (!offerPrice && this.state.validate_offerPrice)
   //   validation_messages.push("offer price at row#" + row.row_number);
   if (!productPictures?.length)
    validation_messages.push(
     "upload at least one image of the product at row#" + row.row_number
    );

   //  if (!L && !W && !H && this.state.validate_size)
   // validation_messages.push(
   //  "size (Length, Width, Height) at row#" + row.row_number
   // );
  });

  if (validation_messages.length > 0) {
   this.setState({ validation_modal: true, validation_messages });
   return;
  } else {
   this.setState({ loading: true });
   setTimeout(() => {
    this.props.dispatch({ type: ADD_PRODUCT_NEXT_TAB });
    this.setState({ loading: false });
   }, 3000);
   for (let row of this.props.OptionsPrice.rows) {
    if (!row) continue;
    await this.saveRow(row);
   }
   this.props.dispatch({ type: OPTIONS_STORED });
  }
 }

 async convertImage(url) {
  return new Promise((r, j) => {
   fetch(url)
    .then((res) => res.blob())
    .then((imgFile) => {
     r(imgFile);
    });
  });
 }

 dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
   mime = arr[0].match(/:(.*?);/)[1],
   bstr = atob(arr[1]),
   n = bstr.length,
   u8arr = new Uint8Array(n);

  while (n--) {
   u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
 }

 saveRow = async (row) => {
  const formData = new FormData();
  // for (let i = 0; i < row.productPictures.length; i++) {
  //  formData.append(
  //   `cover[${i}]`,
  //   await compressImage(
  //    this.dataURLtoFile(row.productPictures[i]?.cropped, "file")
  //   )
  //  );
  // }
  formData.append(
   `material_image`,
   await compressImage(await this.convertImage(row.material.image))
  );
  formData.append(`material_name`, row.material.name);
  if (row.size)
   formData.append(`size`, `${row.size.L}L ${row.size.W}W ${row.size.H}H`);
  if (row.price) formData.append(`price`, row.price);
  formData.append(`quantity`, row.quantity);

  if (row.code) formData.append(`code`, row.code);

  if (row.offerPrice) formData.append(`offer_price`, row.offerPrice);
  for (var pair of formData.entries()) {
   console.log(pair[0] + ", " + pair[1]);
  }
  return await axios
   .post(`${API}${this.props.id}/${row.option_id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
   })
   .then((data) => {
    console.log(data);
   });
 };

 hideValidationMessage() {
  this.setState({ validation_messages: [], validation_modal: false });
 }

 setValidation = (field) => {
  this.setState({ [field]: !this.state[field] });
 };

 render() {
  return (
   <React.Fragment>
    {/* <ReactNotification /> */}
    <div className="step-form">
     <button
      className="save-product-step-btn"
      style={{
       top: "-110px",
       height: "20px",
       backgroundColor: this.state.loading ? "#898989" : "",
      }}
      onClick={this.saveAndContinue.bind(this)}
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
     <div className="step-head">
      <h5>Options & Price</h5>
     </div>
     <div id="options-wrapper">
      <table>
       <thead>
        <tr>
         <th>Code</th>
         <th>Picture</th>
         <th>Material</th>
         <th>
          <span>
           <input
            type="checkbox"
            style={{ visibility: "hidden" }}
            onClick={() => this.setValidation("validate_size")}
           />
          </span>
          Size
         </th>
         <th>
          <span>
           <input
            type="checkbox"
            style={{ visibility: "hidden" }}
            onClick={() => this.setValidation("validate_price")}
           />
          </span>
          Price
         </th>
         <th>
          <span>
           <input
            style={{ visibility: "hidden" }}
            type="checkbox"
            onClick={() => this.setValidation("validate_offerPrice")}
           />
          </span>
          Offer Price
         </th>
         <th>Quantity</th>
         {/* <th>Delete</th> */}
        </tr>
       </thead>
       {this.props.OptionsPrice.rows.map((row) => {
        if (!row) return;
        return (
         <tbody>
          <OptionsRow row_data={row} id={this.props.id} />
         </tbody>
        );
       })}
      </table>
      <div className="add-option-btn" onClick={this.addNewOptionRow.bind(this)}>
       <div className="icon">
        <FaPlus />
       </div>
       <div className="under-link">Add Option</div>
      </div>
     </div>
    </div>

    <Modal
     id="price-request-modal"
     className="arch-wide-modal product-modal pics-modal"
     size="lg"
     show={this.state.validation_modal}
     onHide={this.hideValidationMessage.bind(this)}
     aria-labelledby="example-modal-sizes-title-lg"
    >
     <Modal.Header closeButton></Modal.Header>
     <Modal.Body>
      <div className="warning-text">WARNING!</div>
      <div class="m-t-10 m-b-30"></div>
      <div className="sub-head">
       These options are missing, please complete them.
      </div>
      <ul className="sub-head">
       {this.state?.validation_messages.map((msg) => (
        <li>{msg}</li>
       ))}
      </ul>
      <div as={Row} className="add-btn">
       <div column md={12}>
        <Button
         variant="danger"
         onClick={this.hideValidationMessage.bind(this)}
        >
         Okay!
        </Button>
       </div>
      </div>
     </Modal.Body>
    </Modal>
   </React.Fragment>
  );
 }
}
const mapStateToProps = (state) => ({ OptionsPrice: state.optionsPrice });
export default connect(mapStateToProps)(OptionsPrice);
