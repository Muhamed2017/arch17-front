import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import { Row, Modal, Button } from "react-bootstrap";
import "cropperjs/dist/cropper.css";
import { connect } from "react-redux";
import OptionsRow from "./optionsRow";
import PulseLoader from "react-spinners/PulseLoader";

// import { ADD_ROW } from "./";
import { ADD_PRODUCT_NEXT_TAB, ADD_ROW } from "../../redux/constants";
import { nextTab } from "../../redux/actions/addProductActions";
import axios from "axios";
import imageCompression from "browser-image-compression";

// const API = "https://arch17-apis.herokuapp.com/api/option-price/5";
const API = "https://arch17-apis.herokuapp.com/api/option-price/";

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
  in_progress: false,
  is_saved: false,
  product_id: null,
 };

 options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
 };

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
      <img src={thumbnail} alt="" width={100} />
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
  // this.props.dispatch({ type: ADD_ROW });
  const validRows = this.props.OptionsPrice.rows.filter((row) => !!row);
  if (validRows.length < 1) {
   this.props.dispatch({ type: ADD_ROW });
   //  this.setState({ is_saved: false });
  }
 }
 async addNewOptionRow() {
  const validation_messages = [];
  this.props.OptionsPrice.rows.map((row) => {
   if (!row) return;
   const { quantity, price, offerPrice, product_pics } = row;
   const { L, W, H } = row?.size;
   const { nameValidation, imageValidation } = row?.material;
   if (!nameValidation)
    validation_messages.push("material name at row#" + row.row_number);

   if (!imageValidation)
    validation_messages.push("material image at row#" + row.row_number);

   if (!quantity) validation_messages.push("quantity at row#" + row.row_number);
   if (!price && this.state.validate_price)
    validation_messages.push("initial price at row#" + row.row_number);
   if (!offerPrice && this.state.validate_offerPrice)
    validation_messages.push("offer price at row#" + row.row_number);
   if (!product_pics?.length)
    validation_messages.push(
     "upload at least one image of the product at row#" + row.row_number
    );

   if (!L && !W && !H && this.state.validate_size)
    validation_messages.push(
     "size (Length, Width, Height) at row#" + row.row_number
    );
  });

  if (validation_messages.length > 0) {
   this.setState({ validation_modal: true, validation_messages });
   return;
  } else {
   this.setState({ is_saved: false });
   this.props.dispatch({ type: ADD_ROW });
   for (let row of this.props.OptionsPrice.rows) {
    if (!row) continue;
    await this.saveRow(row);
   }
  }
 }

 async saveAndContinue() {
  const validation_messages = [];
  console.log(this.state.in_progress);
  console.log(this.state.is_saved);

  this.props.OptionsPrice.rows.map((row) => {
   if (!row) return;
   const { quantity, price, offerPrice, product_pics } = row;
   const { L, W, H } = row?.size;
   const { nameValidation, imageValidation } = row?.material;
   if (!nameValidation)
    validation_messages.push("material name at row#" + row.row_number);

   if (!imageValidation)
    validation_messages.push("material image at row#" + row.row_number);

   if (!quantity) validation_messages.push("quantity at row#" + row.row_number);
   if (!price && this.state.validate_price)
    validation_messages.push("initial price at row#" + row.row_number);
   if (!offerPrice && this.state.validate_offerPrice)
    validation_messages.push("offer price at row#" + row.row_number);
   if (!product_pics?.length)
    validation_messages.push(
     "upload at least one image of the product at row#" + row.row_number
    );

   if (!L && !W && !H && this.state.validate_size)
    validation_messages.push(
     "size (Length, Width, Height) at row#" + row.row_number
    );
  });

  if (validation_messages.length > 0) {
   this.setState({ validation_modal: true, validation_messages });
   return;
  }
  if (this.state.is_saved === false) {
   //  this.props.dispatch({ type: ADD_ROW });
   for (let row of this.props.OptionsPrice.rows) {
    if (!row) continue;
    await this.saveRow(row).then(() => {
     this.props.dispatch({ type: ADD_PRODUCT_NEXT_TAB });
    });
    // this.props.dispatch({ type: ADD_PRODUCT_NEXT_TAB });
   }
  } else {
   this.props.dispatch({ type: ADD_PRODUCT_NEXT_TAB });
  }
 }
 //   {
 //     "row_index": 1,
 //     "row_number": 2,
 //     "ver": 8,
 //     "size": {
 //         "H": 123,
 //         "L": 123,
 //         "W": 231
 //     },
 //     "material": {
 //         "name": "123",
 //         "image": "blob:http://localhost:3000/21af0a4f-3e7a-4cfa-ac30-09612c6d0a01",
 //         "thumbnail": "blob:http://localhost:3000/21af0a4f-3e7a-4cfa-ac30-09612c6d0a01",
 //         "nameValidation": true,
 //         "imageValidation": true
 //     },
 //     "offerPrice": 12,
 //     "price": 32,
 //     "quantity": 312,
 //     "product_pics": [
 //         "blob:http://localhost:3000/e2436fc5-9026-4902-b92a-1bbf063514a7"
 //     ]
 // }
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
  return new File([u8arr], filename, { type: mime });;
 }

 saveRow = async (row) => {
  console.log(row);
  this.setState({ in_progress: true });
  const formData = new FormData();
  for (let i = 0; i < row.product_pics.length; i++) {
   formData.append(
    `cover[${i}]`,
    //  await this.convertImage(row.product_pics[i]));
    this.dataURLtoFile(row.product_pics[i], "file")
   );
  }
  formData.append(
   `material_image`,
   await this.convertImage(row.material.image)
  );
  formData.append(`material_name`, row.material.name);
  if (row.size)
   formData.append(`size`, `${row.size.L}L ${row.size.W}W ${row.size.H}H`);
  if (row.price) formData.append(`price`, row.price);
  formData.append(`quantity`, row.quantity);
  if (row.offerPrice) formData.append(`offer_price`, row.offerPrice);
  for (var pair of formData.entries()) {
   console.log(pair[0] + ", " + pair[1]);
  }
  return await axios
   .post(API + this.props.id, formData, {
    headers: { "Content-Type": "multipart/form-data" },
   })
   .then((data) => {
    console.log(data);
    this.setState({ in_progress: false });
    this.setState({ is_saved: true });
   })
   .catch((err) => {
    this.setState({ in_progress: false });
    this.setState({ is_saved: false });
   });
 };

 hideValidationMessage() {
  this.setState({ validation_messages: [], validation_modal: false });
 }

 setValidation = (field) => {
  this.setState({ [field]: !this.state[field] });
 };
 handleNextStep = (e) => {
  this.props.dispatch({ type: ADD_PRODUCT_NEXT_TAB });
 };
 render() {
  return (
   <React.Fragment>
    <div className="step-form">
     <button
      className="save-product-step-btn"
      style={{
       top: "-110px",
       height: "20px",
       background: this.state.in_progress ? "#B4B4B4" : "#E41E15",
      }}
      onClick={this.saveAndContinue.bind(this)}
     >
      {this.state.in_progress ? (
       <PulseLoader
        style={{ height: "20px" }}
        color="#ffffff"
        loading={this.state.in_progress}
        size={10}
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
         <th>Picture</th>
         <th>Material</th>
         <th>
          {" "}
          <span>
           <input
            type="checkbox"
            onClick={() => this.setValidation("validate_size")}
           />
          </span>
          Size
         </th>
         <th>
          <span>
           <input
            type="checkbox"
            onClick={() => this.setValidation("validate_price")}
           />
          </span>
          Price
         </th>
         <th>
          <span>
           <input
            type="checkbox"
            onClick={() => this.setValidation("validate_offerPrice")}
           />
          </span>
          Offer Price
         </th>
         <th>Quantity</th>
         <th>Delete</th>
        </tr>
       </thead>
       {this.props.OptionsPrice.rows.map((row) => {
        if (!row) return;
        return (
         <tbody>
          <OptionsRow row_data={row} />
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

const mapStateToProps = (state) => ({
 OptionsPrice: state.optionsPrice,
 loading_option: state.optionsPrice.loading_option,
});
export default connect(mapStateToProps)(OptionsPrice);
