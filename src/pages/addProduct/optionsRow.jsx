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
import { Form, Col, Row, Modal, Button } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import slide4 from "../../../src/slide4.jpg";
import { connect } from "react-redux";
import {
 ADD_INIT_PRICE,
 ADD_MATERIAL,
 ADD_OFFER_PRICE,
 ADD_SIZE,
 ADD_QUANTITY,
 DELETE_ROW,
 ADD_PRODUCT_PICTURES,
} from "../../redux/constants";
// import memoize from "memoize-one";

// const API = "https://arch17-apis.herokuapp.com/api/option-price/5";

class OptionRow extends Component {
 state = {
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
 };
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();
 }
 _crop() {
  const imageElement = this.cropperRef?.current;
  const cropper = imageElement?.cropper;
  const copyPicturesState = this.state.productPictures;
  copyPicturesState[this.state.selected_product_pic.index][
   "cropped"
  ] = cropper.getCroppedCanvas().toDataURL();

  this.setState({
   productPictures: copyPicturesState,
  });
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

 setMaterialThumbnail = (e) => {
  this.setState({
   temp_material: {
    ...this.state.temp_material,
    thumbnail: URL.createObjectURL(e.target.files[0]),
    imageValidation: true,
   },
  });
 };

 setProductPictures = (e, index) => {
  if (!e.target.files[0]) return;
  const copyPicturesState = this.state.productPictures;
  copyPicturesState[index] = {
   url: URL.createObjectURL(e.target.files[0]),
   cropped: null,
  };
  this.setState({
   productPictures: copyPicturesState,
   selected_product_pic: {
    url: URL.createObjectURL(e.target.files[0]),
    index,
   },
  });
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
    name: e.target.value.trim(),
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

 onMaterialSubmit = (e) => {
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

 displayImage(name, image, fatPlusFunction) {
  if (image)
   return (
    <div>
     <img src={image} style={{ maxWidth: "52px" }} alt="" />
     <FaPencilAlt
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
     <p style={{ marginBottom: 0 }}>{name}</p>
    </div>
   );
  else return <FaPlus onClick={fatPlusFunction} />;
 }

 displayButtonText(isEdit) {
  if (isEdit) return "Edit";
  return "Add";
 }

 displayInputValidation(isValid) {
  if (isValid) return;
  return "red";
 }

 displayUploadField(fieldName, setThumbnail, thumbnail, icon) {
  return (
   <React.Fragment>
    <label for={fieldName}>
     {!thumbnail ? (
      <div className="upload-box">{icon}</div>
     ) : (
      <img src={thumbnail} alt="" height={"70px"} />
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
   <div>
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
        height={"70px"}
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
      onClick={() => this.editForm("price_modal_edit", { temp_price: value })}
     />
     <p>¥ {value}</p>
    </div>
   );
  } else {
   return <Icon onClick={onclick} />;
  }
 }

 displaySizeValue() {
  const { L, W, H } = this.state?.size;
  if (L && W && H) {
   return (
    <div>
     <FaPencilAlt
      onClick={() =>
       this.editForm("size_modal_edit", { temp_size: this.state?.size })
      }
     />
     <p>{`L ${L} W ${W} H ${H}`}</p>
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
      onClick={() =>
       this.editForm("offer_modal_edit", {
        temp_offerPrice: this.state?.offerPrice,
       })
      }
     />
     <p>¥ {offerPrice}</p>
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

 removeRow = () => {
  const validRows = this.props.OptionsPrice.rows.filter((row) => !!row);
  if (validRows.length - 1 <= 0) return;
  this.props.dispatch({
   type: DELETE_ROW,
   row_index: this.state.row_index,
  });
 };

 onSubmitProductPictures = (e) => {
  e.preventDefault();
  const productsPicturesInputs = Array.from(
   document.querySelectorAll(".productsPicturesInputs")
  );
  // const files = productsPicturesInputs.filter((e) => e.files[0]);
  const files = [];
  for (let i = 0; i < productsPicturesInputs.length; i++) {
   if (!productsPicturesInputs[i]?.files[0]) continue;
   files.push(this.state.productPictures[i].cropped);
  }
  if (files.length > 0) {
   this.pics_close();
   this.props.dispatch({
    type: ADD_PRODUCT_PICTURES,
    // data: files.map((e) => URL.createObjectURL(e.files[0])),
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
    <div>
     {this.state.productPictures.map((p) => (
      // <img src={p.url} width={"70px"} alt="" />
      <img src={p?.cropped || p?.url} width={"70px"} alt="" />
     ))}
     {/* <FaPencilAlt style={{ width: "10px" }} /> */}
     <FaPencilAlt style={{ width: "10px" }} />
    </div>
   );
  } else {
   return (
    <>
     <FaCloudUploadAlt />
     <div className="under-link underline">Upload Images</div>
    </>
   );
  }
 };
 render() {
  return (
   <React.Fragment>
    <tr>
     {/* <td onClick={this.pics_open}>{this.displayProductImages()}</td> */}
     <td onClick={this.pics_open}>{this.displayProductImages()}</td>
     <td>
      {this.displayImage(
       this.state.material.name,
       this.state.material.image,
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
       placeholder=""
       onChange={this.setQuantity}
       style={{
        borderColor: this.displayInputValidation(this.state?.quantity > 0),
       }}
      />
     </td>
     <td className="trash-icon">
      <FaTrashAlt onClick={this.removeRow} />
     </td>
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
         initialAspectRatio={16 / 9}
         guides={false}
         crop={this._crop.bind(this)}
         onInitialized={this.onCropperInit}
         crossOrigin="anonymous"
         preview=".image-preview"
         aspectRatio={1.5 / 1}
         autoCropArea={1}
         viewMode={2}
         rotatable={false}
         scalable={false}
         zoomOnWheel={true}
         dragMode="move"
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
          <Button variant="danger" type="submit">
           ADD
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
export default connect(mapStateToProps)(OptionRow);