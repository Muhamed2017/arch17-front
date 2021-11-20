import React, { Component } from "react";
import {
 FaCloudUploadAlt,
 FaPlus,
 FaTrashAlt,
 FaCube,
 FaArrowRight,
 FaArrowLeft,
 FaArrowDown,
 FaArrowUp,
 FaPencilAlt,
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { store } from "react-notifications-component";
import { MdError } from "react-icons/md";
import "react-notifications-component/dist/theme.css";
import { Form, Col, Row, Modal, Button } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import slide4 from "./../../../../src/slide4.jpg";
import { connect } from "react-redux";
import axios from "axios";
import { compressImage } from "./../../addProduct/OptionsPrice";
import { API } from "./../../../utitlties";

import {
 ADD_INIT_PRICE,
 ADD_MATERIAL,
 ADD_OFFER_PRICE,
 ADD_SIZE,
 ADD_QUANTITY,
 ADD_CODE,
 ADD_OPTION_ID,
 DELETE_ROW,
 ADD_PRODUCT_PICTURES,
} from "../../../redux/constants";

class OptionStep extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();
  this.state = {
   productPictures: [],
   selected_product_pic: {},
   ...this.props.row_data,
   pics_modal: false,
   pics_modal_edit: false,
   material_modal: false,
   material_modal_edit: false,
   size_modal: false,
   size_modal_edit: false,
   price_modal: false,
   offer_modal: false,
   cropDelay: 3000,
   loadCovers: false,
   option_id: null,
  };
 }

 //  onCrop = () => {};
 dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
   mime = arr[0].match(/:(.*?);/)[1],
   bstr = atob(arr[1]),
   n = bstr.length,
   u8arr = new Uint8Array(n);

  while (n--) {
   u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
 };
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
 onChange(e) {
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
   files = e.dataTransfer.files;
  } else if (e.target) {
   files = e.target.files;
  }
  const reader = new FileReader();
  reader.onload = () => {
   //   this.setState({ src: reader.result });
   this.setState({ src: slide4 });
  };
  reader.readAsDataURL(files[0]);
 }

 static getDerivedStateFromProps(props, state) {
  if (props.OptionsPrice.rows[state.row_index]?.ver !== state.ver)
   return {
    ...state,
    ...props.OptionsPrice.rows[state.row_index],
   };
  else return state;
 }
 pics_open = () => {
  this.setState({ pics_modal: true });
 };

 pics_close = () => {
  this.setState({ pics_modal: false, pics_modal_edit: false });
 };

 material_open = () => {
  this.setState({ material_modal: true });
 };

 size_open = () => {
  this.setState({ size_modal: true });
 };

 size_close = () => {
  if (this.state.size_modal_edit) {
   this.setState({
    size_modal: false,
    size_modal_edit: false,
    temp_size: {},
   });
  } else {
   this.setState({
    size_modal: false,
    size_modal_edit: false,
    temp_size: {},
    size: {
     L: null,
     W: null,
     H: null,
    },
   });
  }
 };

 price_open = () => {
  this.setState({ price_modal: true });
 };

 price_close = () => {
  if (this.state.price_modal_edit) {
   this.setState({
    price_modal: false,
    price_modal_edit: false,
    temp_price: null,
   });
  } else {
   this.setState({
    price_modal: false,
    price_modal_edit: false,
    temp_price: null,
    price: null,
   });
  }
 };

 offer_open = () => {
  this.setState({ offer_modal: true });
 };

 offer_close = () => {
  if (this.state.offer_modal_edit) {
   this.setState({
    offer_modal: false,
    offer_modal_edit: false,
    temp_offerPrice: null,
   });
  } else {
   this.setState({
    offer_modal: false,
    offer_modal_edit: false,
    temp_offerPrice: null,
    offerPrice: null,
   });
  }
 };
 options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
 };
 setMaterialThumbnail = (e) => {
  this.setState({
   temp_material: {
    ...this.state.temp_material,
    thumbnail: URL.createObjectURL(e.target.files[0]),
    imageValidation: true,
   },
  });
 };
 addNotification = () => {
  store.addNotification({
   message: (
    <>
     <div className="file-error-notification">
      <MdError />
      <span>Maximum size is 1MB for each image</span>
     </div>
    </>
   ),
   type: "danger",
   backgroundColor: "blue",
   insert: "bottom",
   container: "center",
   animationIn: ["animate__animated", "animate__fadeIn"],
   animationOut: ["animate__animated", "animate__fadeOut"],
   showIcon: true,
   dismiss: {
    duration: 3000,
   },
  });
 };
 setProductPictures = async (e, index) => {
  if (!e.target.files[0]) {
   return;
  }
  if (e.target.files[0].size > 1048576 * 1.5) {
   this.addNotification();
   return;
  } else {
   const copyPicturesState = this.state.productPictures;
   let file = e.target.files[0];
   copyPicturesState[index] = {
    url: URL.createObjectURL(file),
    cropped: null,
   };
   this.setState({
    productPictures: copyPicturesState,
    selected_product_pic: {
     url: URL.createObjectURL(file),
     index,
    },
   });
  }
 };

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

 setPriceValue = (e) => {
  this.setState({
   temp_price: Number(e.target.value.trim()),
  });
 };
 setMaterialName = (e) => {
  if (e.target.value.trim().length < 1) {
   this.setState({
    temp_material: {
     ...this.state.temp_material,
     name: "",
     nameValidation: false,
    },
   });
   return;
  }
  this.setState({
   temp_material: {
    ...this.state.temp_material,
    // name: e.target.value.trim(),
    name: e.target.value,
    nameValidation: true,
   },
  });
 };

 onSizeSubmit = (e) => {
  e.preventDefault();
  const [L, W, H] = e.target;
  if (!Number(L.value) || !Number(W.value) || !Number(H.value)) return;

  this.size_close();
  this.props.dispatch({
   type: ADD_SIZE,
   data: {
    H: Number(H.value),
    L: Number(L.value),
    W: Number(W.value),
   },
   row_index: this.state.row_index,
  });
 };

 onMaterialSubmit = async (e) => {
  e.preventDefault();
  const [fileInput, nameField] = e.target;
  const name = nameField?.value.trim();
  if (
   !this.state.temp_material?.nameValidation ||
   !this.state.temp_material?.imageValidation
  )
   return;

  let image;
  if (fileInput?.files[0]) image = URL.createObjectURL(fileInput?.files[0]);
  else image = this.state.temp_material?.image;

  this.material_close();
  this.props.dispatch({
   type: ADD_MATERIAL,
   data: {
    name,
    image: image,
    thumbnail: image,
    nameValidation: true,
    imageValidation: true,
   },
   row_index: this.state.row_index,
  });
 };

 editForm(modal, state) {
  this.setState({ [modal]: true, ...state });
 }

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

 displayButtonText(isEdit) {
  if (isEdit) return "Edit";
  return "Add";
 }

 displayInputValidation(isValid) {
  if (isValid) return;
  return "red";
 }

 displayUploadField(fieldName, setThumbnail, thumbnail, icon) {
  // console.log("Micro");
  return (
   <React.Fragment>
    <label for={fieldName}>
     {!thumbnail ? (
      <div className="upload-box">{icon}</div>
     ) : (
      <img src={thumbnail} alt="" />
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
 componentDidMount() {
  console.log(this.props.initialRows);
 }
 selectProductToCrop = (index) => {
  if (this.state.productPictures[index]?.url)
   this.setState({
    selected_product_pic: {
     index,
     url: this.state.productPictures[index]?.url,
    },
   });
 };
 onPriceSubmit = (e) => {
  e.preventDefault();
  const [priceInput] = e.target;
  const price = Number(priceInput.value);
  if (!price) return;

  this.price_close();
  this.props.dispatch({
   type: ADD_INIT_PRICE,
   data: {
    price,
   },
   row_index: this.state.row_index,
  });
 };
 onSubmitOfferPrice = (e) => {
  e.preventDefault();
  const [offerPriceInput] = e.target;
  const offerPrice = Number(offerPriceInput.value);
  if (!offerPrice || offerPrice >= this.state?.price) return;

  this.offer_close();
  this.props.dispatch({
   type: ADD_OFFER_PRICE,
   data: {
    offerPrice,
   },
   row_index: this.state.row_index,
  });
 };
 onSizeInput(dimension, e) {
  this.setState({
   temp_size: {
    ...this.state?.temp_size,
    [dimension]: Number(e.target.value.trim()),
   },
  });
 }

 displayPriceValue(value, Icon, onclick) {
  if (value) {
   return (
    <div>
     <FaPencilAlt
      style={{ fontSize: ".8rem", position: "relative", top: "-18px" }}
      onClick={() => this.editForm("price_modal_edit", { temp_price: value })}
     />
     <p style={{ fontSize: ".85rem" }}>¥ {value}</p>
    </div>
   );
  } else {
   return <Icon onClick={onclick} />;
  }
 }

 displaySizeValue() {
  //   const { L, W, H } = this.state?.size;
  const size = {
   L: 500,
   W: 300,
   H: 100,
  };
  const { L, W, H } = size;

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

 displayOfferPrice() {
  const offerPrice = this.state?.offerPrice;
  if (offerPrice) {
   return (
    <div>
     <FaPencilAlt
      style={{ fontSize: ".8rem", position: "relative", top: "-18px" }}
      onClick={() =>
       this.editForm("offer_modal_edit", {
        temp_offerPrice: this.state?.offerPrice,
       })
      }
     />
     <p style={{ fontSize: ".85rem" }}>¥ {offerPrice}</p>
    </div>
   );
  } else {
   return <FaPlus onClick={this.offer_open} />;
  }
 }
 setOfferPrice(e) {
  this.setState({
   temp_offerPrice: Number(e.target.value.trim()),
  });
 }

 setQuantity = (e) => {
  this.props.dispatch({
   type: ADD_QUANTITY,
   data: {
    quantity: Number(e.target.value.trim()),
   },
   row_index: this.state.row_index,
  });
 };

 setCode = (e) => {
  this.props.dispatch({
   type: ADD_CODE,
   data: {
    code: e.target.value,
   },
   row_index: this.state.row_index,
  });
 };
 setOptionId = (id) => {
  this.props.dispatch({
   type: ADD_OPTION_ID,
   data: {
    option_id: id,
   },
   row_index: this.state.row_index,
  });
 };

 removeRow = () => {
  const validRows = this.props.OptionsPrice.rows.filter((row) => !!row);
  if (validRows.length - 1 <= 0) return;
  this.props.dispatch({
   type: DELETE_ROW,
   row_index: this.state.row_index,
  });
 };

 onSubmitProductPictures = async (e) => {
  e.preventDefault();
  this.setState({ loadCovers: true });

  const fd = new FormData();
  const files = [];
  for (let i = 0; i < this.state.productPictures.length; i++) {
   if (!this.state.productPictures[i]) files[i] = null;
   else {
    files[i] = this.state.productPictures[i];
    fd.append(
     "cover[]",
     await compressImage(this.dataURLtoFile(files[i]?.cropped, "file"))
    );
   }
  }
  this.pics_close();

  console.log(files);
  if (files.length > 0) {
   axios
    .post(`${API}option-covers/${this.props.id}`, fd, {
     headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
     this.setState({ loadCovers: false });
     //  this.setState({ option_id: response.data.option_id });
     this.setOptionId(response.data.option_id);
     console.log(response);
    })
    .catch((err) => console.log(err));
   //  this.pics_close();
   this.props.dispatch({
    type: ADD_PRODUCT_PICTURES,
    data: files,
    row_index: this.state.row_index,
   });
  } else {
   return;
  }
 };
 displayProductImages = () => {
  if (this.state.productPictures.length) {
   return (
    <div className="option-row-img-grid row-box">
     {this.state.productPictures.map((p) => (
      <img
       src={p?.cropped || p?.url}
       alt=""
       style={{ width: "28px", height: "28px" }}
      />
     ))}
     <FaPencilAlt style={{ width: "10px" }} className="edit-icon-pincel" />
    </div>
   );
  } else {
   return (
    <>
     <FaCloudUploadAlt style={{ fontSize: "22px" }} />
     <div className="under-link underline">Upload Images</div>
    </>
   );
  }
 };
 render() {
  return (
   <React.Fragment>
    <tr style={{ position: "relative" }}>
     <td>
      <Form.Control
       placeholder="Code"
       onChange={this.setCode}
       value={this.state?.code}
       style={
        {
         // borderColor: this.displayInputValidation(this.state?.code > 0),
        }
       }
      />
     </td>
     <td onClick={this.pics_open}>{this.displayProductImages()}</td>
     <td>
      {this.displayImage(
       this.state.material?.name,
       this.state.material?.image,
       this.material_open
      )}
     </td>
     <td>{this.displaySizeValue()}</td>
     <td>
      {this.displayPriceValue(this.state.price, FaPlus, this.price_open)}
     </td>
     <td>{this.displayOfferPrice()}</td>
     <td>
      <Form.Control
       placeholder="QY"
       onChange={this.setQuantity}
       value={this.state?.quantity > 0 ? this.state.quantity : ""}
       style={{
        width: "54px",
       }}
      />
     </td>
     <div
      className="trash-icon"
      style={{ position: "absolute", right: "-20px", top: "76px" }}
     >
      <FaTrashAlt onClick={this.removeRow} />
     </div>
    </tr>

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
      onHide={() => this.price_close()}
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

    <>
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
    </>
   </React.Fragment>
  );
 }
}

const mapStateToProps = (state) => ({ OptionsPrice: state.optionsPrice });
export default connect(mapStateToProps)(OptionStep);
