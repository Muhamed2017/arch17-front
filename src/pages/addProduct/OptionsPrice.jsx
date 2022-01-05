import React, { Component } from "react";
import "react-notifications-component/dist/theme.css";
import {
 FaPlus,
 FaTrashAlt,
 FaPencilAlt,
 FaCloudUploadAlt,
 FaCube,
 FaArrowRight,
 FaArrowLeft,
 FaArrowDown,
 FaArrowUp,
} from "react-icons/fa";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Row, Modal, Button, Form, Col } from "react-bootstrap";

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
import { API } from "./../../utitlties";

export const END_POINT = `${API}option-price/`;
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
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();
  this.state = {
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
   selected_product_pic: {},
   // ...this.props.row_data,
   pics_modal_edit: false,
   material_modal_edit: false,
   size_modal_edit: false,
   cropDelay: 3000,
   loadCovers: false,
   option_id: null,
   valids: this.props.rows,
  };
 }

 componentDidUpdate() {
  console.log(this.props);
  // const inits = this.props.rows.filter((v) => {
  //  return v.cover != null;
  // });
  // this.setState({ valids: inits });
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
  console.log(this.props.rows);

  const validRows = this.props.OptionsPrice.rows.filter((row) => !!row);
  if (validRows.length < 1 && this.props.OptionsPrice.rows.length < 1) {
   this.props.dispatch({ type: ADD_ROW });
  } else {
   console.log(validRows);

   //  this.setState(valid)
  }
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
   if (!productPictures?.length)
    validation_messages.push(
     "upload at least one image of the product at row#" + row.row_number
    );
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
   //  console.log(this.props.OptionsPrice.rows[0]?.productPictures[0].cropped);
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
   .post(`${END_POINT}${this.props.id}/${row.option_id}`, formData, {
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
 displayImage = (name, image, fatPlusFunction) => {
  if (image)
   return (
    <div className="material-box">
     <img src={image} style={{ maxWidth: "30px", margin: "auto" }} alt="" />
     <FaPencilAlt
      className="edit-icon-pincel"
      onClick={() =>
       this.editForm("material_modal_edit", {
        temp_material: {
         ...this.state.material, // this is correct
         nameValidation: true,
         imageValidation: true,
        },
       })
      }
     />
     <p
      style={{
       marginBottom: 0,
       padding: "3px 0",
       fontSize: "0.73rem",
       fontWeight: "400",
      }}
     >
      {name}
     </p>
    </div>
   );
  else return <FaPlus onClick={fatPlusFunction} />;
 };
 displaySizeValue(size) {
  const { L, W, H } = size ?? "";
  if (L && W && H) {
   return (
    <div>
     <FaPencilAlt
      style={{ fontSize: ".8rem", position: "relative", top: "-18px" }}
      onClick={() =>
       this.editForm("size_modal_edit", { temp_size: this.state?.size })
      }
     />
     <p style={{ fontSize: ".85rem" }}>{`L ${L} W ${W} H ${H}`}</p>
    </div>
   );
  } else {
   return <FaPlus onClick={this.size_open} />;
  }
 }
 displayPriceValue(value, Icon, onclick) {
  if (value) {
   return (
    <div>
     <FaPencilAlt
      style={{ fontSize: ".8rem", position: "relative", top: "-18px" }}
      onClick={() => this.editForm("price_modal_edit", { temp_price: value })}
     />
     {/* <p style={{ fontSize: ".85rem" }}>¥ {value}</p> */}
    </div>
   );
  } else {
   return <Icon onClick={onclick} />;
  }
 }
 editForm(modal, state) {
  this.setState({ [modal]: true, ...state });
 }
 displayProductPicturesUploadField(fieldName, setThumbnail, index, icon) {
  return (
   <div style={{ position: "relative" }}>
    <label
     for={fieldName}
     style={{
      maxHeight: "70px",
      maxWidth: "72px",
      overflow: "hidden",
     }}
    >
     {!this.state.productPictures[index] ? (
      <span className="product-pic-icon">{icon}</span>
     ) : (
      <React.Fragment>
       <img
        src={this.state.productPictures[index].cropped}
        style={{ height: "70px", width: "70px" }}
        alt=""
       />
      </React.Fragment>
     )}
    </label>
    <input
     className="productsPicturesInputs"
     id={fieldName}
     type="file"
     style={{ display: "none" }}
     onChange={setThumbnail}
    />
    <Button
     className="select-btn"
     onClick={() => this.selectProductToCrop(index)}
    >
     Select
    </Button>
   </div>
  );
 }
 displayButtonText(isEdit) {
  if (isEdit) return "Edit";
  return "Add";
 }
 _crop() {
  setTimeout(() => {
   const imageElement = this.cropperRef?.current;
   const cropper = imageElement?.cropper;
   const copyPicturesState = this.state.productPictures;
   if (copyPicturesState[this.state.selected_product_pic.index]) {
    copyPicturesState[this.state.selected_product_pic.index][
     "cropped"
    ] = cropper.getCroppedCanvas().toDataURL();
   } else {
    copyPicturesState[this.state.selected_product_pic.index] = {
     url: this.state.selected_product_pic.url,
     cropped: cropper.getCroppedCanvas().toDataURL(),
    };
   }

   this.setState({
    productPictures: copyPicturesState,
   });
  }, 500);
 }
 onCropperInit = (cropper) => {
  this.cropper = cropper;
 };

 displayInputValidation(isValid) {
  if (isValid) return;
  return "red";
 }
 material_close = () => {
  if (this.state.material_modal_edit) {
   this.setState({
    material_modal: false,
    material_modal_edit: false,
    temp_material: {},
   });
  } else {
   this.setState({
    material_modal: false,
    material_modal_edit: false,
    temp_material: {},
    material: {
     image: null,
     name: "",
     thumbnail: null,
     nameValidation: false,
     imageValidation: false,
    },
   });
  }
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
     <div className="options-wrapper">
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

    <>
     <Modal
      id="price-request-modal"
      className="arch-wide-modal product-modal pics-modal"
      size="lg"
      show={this.state.pics_modal}
      onHide={() => this.pics_close()}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       {/* <ReactNotification /> */}
       <div className="option-add-label">Product Picuters</div>
       <div className="sub-head">
        Choose the corresponding view of the photo you want to upload
       </div>

       <div className="img-box">
        <Cropper
         src={this.state.selected_product_pic?.url}
         style={{ height: "100%", width: "100%" }}
         // Cropper.js options
         ref={this.cropperRef}
         initialAspectRatio="free"
         guides={false}
         cropend={this._crop.bind(this)}
         ready={this._crop.bind(this)}
         //  onInitialized={this.onCropperInit}
         crossOrigin="anonymous"
         preview=".image-preview"
         scalable={false}
         aspectRatio={"free"}
         autoCropArea={1}
         viewMode={1}
         dragMode="move"
         // onDragEndCapture={this._crop.bind(this)}
         rotatable={false}
         zoomOnWheel={true}
         cropBoxMovable={false}
         cropBoxResizable={true}
         center={false}
         //  crop={this.onCrop}
        />
       </div>
       <div as={Row} className="hr">
        <div column md={12}>
         <hr></hr>
        </div>
       </div>
       <form onSubmit={this.onSubmitProductPictures}>
        <div id="upload-directions">
         {this.displayProductPicturesUploadField(
          "pic-1",
          (e) => this.setProductPictures(e, 0),
          0,
          <FaCube />
         )}
         {this.displayProductPicturesUploadField(
          "pic-2",
          (e) => this.setProductPictures(e, 1),
          1,
          <FaCube />
         )}
         {this.displayProductPicturesUploadField(
          "pic-3",
          (e) => this.setProductPictures(e, 2),
          2,
          <FaArrowUp />
         )}
         {this.displayProductPicturesUploadField(
          "pic-4",
          (e) => this.setProductPictures(e, 3),
          3,
          <FaArrowRight />
         )}
         {this.displayProductPicturesUploadField(
          "pic-5",
          (e) => this.setProductPictures(e, 4),
          4,
          <FaArrowDown />
         )}
         {this.displayProductPicturesUploadField(
          "pic-6",
          (e) => this.setProductPictures(e, 5),
          5,
          <FaArrowLeft />
         )}
        </div>
        <p className="option-tip">Upload at least one picture of this option</p>
        <div as={Row} className="add-btn">
         <div column md={12}>
          <Button
           variant="transparen"
           type="submit"
           style={{
            backgroundColor: this.state.loadCovers ? "#898989" : "#e41e15",
            color: "#fff",
           }}
          >
           {!this.state.loadCovers ? (
            "ADD"
           ) : (
            <>
             <ClipLoader
              style={{ height: "20px" }}
              color="#ffffff"
              loading={this.state.loadCovers}
              size={20}
             />
            </>
           )}
          </Button>
         </div>
        </div>
       </form>
      </Modal.Body>
     </Modal>
    </>
    <>
     {/* material modal */}

     <Modal
      id="price-request-modal"
      className="arch-wide-modal product-modal material-modal"
      size="lg"
      show={this.state.material_modal || this.state.material_modal_edit}
      onHide={() => this.material_close()}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton />
      <Modal.Body>
       <div className="option-add-label">Material</div>
       <form onSubmit={this.onMaterialSubmit}>
        <div className="modal-upload">
         {this.displayUploadField(
          "fileInput",
          this.setMaterialThumbnail,
          this.state.temp_material?.thumbnail,
          <FaCloudUploadAlt />
         )}
         <p>Upload Picture</p>
        </div>
        <Form.Row>
         <Form.Group as={Col} md={12} controlId="formGridState">
          <Form.Control
           placeholder="Material's Name"
           value={this.state?.temp_material?.name}
           onChange={this.setMaterialName}
           style={{
            borderColor: this.displayInputValidation(
             this.state.temp_material?.nameValidation
            ),
           }}
          />
         </Form.Group>
        </Form.Row>
        <div as={Row} className="add-btn">
         <div column md={12}>
          <Button variant="danger" type="submit">
           {this.displayButtonText(this.state.material_modal_edit)}
          </Button>
         </div>
        </div>
       </form>
      </Modal.Body>
     </Modal>
    </>

    <>
     {/* size modal */}

     <Modal
      id="size_modal"
      className="arch-wide-modal product-modal"
      size="lg"
      show={this.state.size_modal || this.state.size_modal_edit}
      onHide={() => this.size_close()}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       <div className="option-add-label">Add Size</div>
       <form onSubmit={this.onSizeSubmit}>
        <Form.Row>
         <Form.Group as={Col} controlId="formGridState">
          <span md={2}>L: </span>
          <Form.Control
           type="number"
           md={10}
           value={this.state?.temp_size?.L}
           style={{
            borderColor: this.displayInputValidation(
             !!this.state?.temp_size?.L
            ),
           }}
           onChange={(e) => this.onSizeInput("L", e)}
          />
         </Form.Group>
         <Form.Group as={Col} controlId="formGridState">
          <span>W: </span>
          <Form.Control
           type="number"
           value={this.state?.temp_size?.W}
           style={{
            borderColor: this.displayInputValidation(
             !!this.state?.temp_size?.W
            ),
           }}
           onChange={(e) => this.onSizeInput("W", e)}
          />
         </Form.Group>
         <Form.Group as={Col} controlId="formGridState">
          <span>H: </span>
          <Form.Control
           type="number"
           value={this.state?.temp_size?.H}
           style={{
            borderColor: this.displayInputValidation(
             !!this.state?.temp_size?.H
            ),
           }}
           onChange={(e) => this.onSizeInput("H", e)}
          />
         </Form.Group>
        </Form.Row>
        <div as={Row}>
         <div column md={12}>
          <div className="option-tip">Tips: add the size in mm</div>
         </div>
        </div>
        <div as={Row} className="add-btn">
         <div column md={12}>
          <Button variant="danger" type="submit">
           {this.displayButtonText(this.state.size_modal_edit)}
          </Button>
         </div>
        </div>
       </form>
      </Modal.Body>
     </Modal>
    </>

    <>
     {/* price modal */}

     <Modal
      id="price_modal"
      className="arch-wide-modal product-modal"
      size="lg"
      show={this.state.price_modal || this.state.price_modal_edit}
      // onHide={() => this.price_close()}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
       <div className="option-add-label">Price</div>
       <form onSubmit={this.onPriceSubmit}>
        <Form.Row>
         <Form.Group as={Col} md={8} controlId="formGridState">
          <Form.Control
           type="number"
           value={this.state?.temp_price}
           onChange={this.setPriceValue}
           style={{
            borderColor: this.displayInputValidation(this.state?.temp_price),
           }}
          />
          <span className="currency">¥</span>
         </Form.Group>
        </Form.Row>
        <div as={Row}>
         <div column md={12}>
          <div className="option-tip">
           Tips: Initial price must be higher than offer price
          </div>
         </div>
        </div>
        <div as={Row} className="add-btn">
         <div column md={12}>
          <Button variant="danger" type="submit">
           {this.displayButtonText(this.state.price_modal_edit)}
          </Button>
         </div>
        </div>
       </form>
      </Modal.Body>
     </Modal>
    </>

    {/* offer modal */}

    <Modal
     id="offer_modal"
     className="arch-wide-modal product-modal"
     size="lg"
     show={this.state.offer_modal || this.state.offer_modal_edit}
     onHide={() => this.offer_close()}
     aria-labelledby="example-modal-sizes-title-lg"
    >
     <Modal.Header closeButton></Modal.Header>
     <Modal.Body>
      <div className="option-add-label">Offer Price</div>
      <form onSubmit={this.onSubmitOfferPrice}>
       <Form.Row>
        <Form.Group as={Col} md={8} controlId="formGridState">
         <Form.Control
          type="number"
          onChange={this.setOfferPice}
          style={{
           borderColor: this.displayInputValidation(
            this.state?.offerPrice >= this.state?.price
           ),
          }}
         />
         <span className="currency">¥</span>
        </Form.Group>
       </Form.Row>
       <div as={Row}>
        <div column md={12}>
         <div className="option-tip">
          Tips: Initial price must be higher than offer price
         </div>
        </div>
       </div>
       <div as={Row} className="add-btn">
        <div column md={12}>
         <Button variant="danger" type="submit">
          {this.displayButtonText(this.state.offer_modal_edit)}
         </Button>
        </div>
       </div>
      </form>
     </Modal.Body>
    </Modal>
   </React.Fragment>
  );
 }
}
const mapStateToProps = (state) => ({ OptionsPrice: state.optionsPrice });
export default connect(mapStateToProps)(OptionsPrice);
