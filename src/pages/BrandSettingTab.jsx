import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import blank from "../../src/blank.jpg";
import { Link } from "react-router-dom";

import { auth } from "../firebase";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast, Flip } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Cropper from "react-cropper";
import { IoMdCloudUpload } from "react-icons/io";
import "cropperjs/dist/cropper.css";
import { compressImage } from "./addProduct/OptionsPrice";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { logginOut } from "../redux/actions/authActions";
import { updateInfo, presistInfo } from "../redux/actions/authActions";
import { API } from "./../utitlties";
class BrandSettingsTab extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();
  this.state = {
   name: this.props.brand?.store?.name,
   email: this.props.brand?.store?.email,
   about: this.props.brand?.store?.about ?? "",
   city: this.props.brand?.store?.city ?? "",
   prfl_loading: false,
   profile_modal: false,
   profile_src: "",
   cropped_profile: null,
   addProfileLoad: false,
   status: "process",
   changing: false,
  };
 }
 profile_close = () => {
  this.setState({ profile_modal: false });
 };
 password_modal_close = () => {
  this.setState({ change_password_modal: false });
 };
 onChangeProfile = (e) => {
  const file = e.target.files[0];
  const src = URL.createObjectURL(file);
  this.setState({ profile_src: src });
  console.log(file);
  console.log(src);
 };
 componentDidMount() {
  this.setState({
   name: this.props.brand?.store?.name,
   email: this.props.brand?.store?.email,
   about: this.props.brand?.store?.about,
   city: this.props.brand?.store?.city,
  });
 }

 handleUpdateProfile = () => {
  const fd = new FormData();
  fd.append("name", this.state.name);
  fd.append("email", this.state.email);
  fd.append("about", this.state.about);
  fd.append("city", this.state.city);
  axios
   .post(`${API}brand/update/${this.props.brand.store.id}`, fd)
   .then((response) => {
    console.log(response);
    const { store } = response.data;
    this.setState({ name: store.name });
   })
   .catch((err) => {
    console.log(err);
   });
 };

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
   let cropped = cropper.getCroppedCanvas().toDataURL();
   this.setState({ cropped_profile: cropped });
   console.log(this.state.cropped_profile);
  });
 }
 onProfilePicSubmit = async (e) => {
  e.preventDefault();
  this.setState({ addProfileLoad: true });

  const fd = new FormData();
  if (this.state.cropped_profile) {
   fd.append(
    "img[]",
    await compressImage(this.dataURLtoFile(this.state.cropped_profile, "file"))
   );
   axios
    .post(`${API}upload/5`, fd)
    .then((response) => {
     console.log(response.data.img[response.data.lastIndex].file_url);
     auth.currentUser
      .updateProfile({
       photoURL: response.data.img[response.data.lastIndex].file_url,
      })
      .then(() => {
       //  this.props.setNav(auth.currentUser);
       this.props.updateInfo(auth.currentUser);
       presistInfo(auth.currentUser, true);
       console.log("updated");
       this.setState({ addProfileLoad: false });
       this.setState({ profile_modal: false });
       toast.success("Your Picture Updated Successfully", {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "colored",
        transition: Flip,
       });
      });
    })
    .catch((error) => console.log(error));
   // };
  }
  console.log(fd);
 };
 handleCityChange = (e) => {
  this.setState({ city: e.target.value });
 };
 handleNameChange = (e) => {
  this.setState({ name: e.target.value });
 };
 handlePhoneChange = (e) => {
  this.setState({ phone: e.target.value });
 };
 handleEmailChange = (e) => {
  this.setState({ email: e.target.value });
 };
 handleAboutChange = (e) => {
  this.setState({ about: e.target.value });
 };

 handlePasswordChange = (e) => {
  this.setState({ password: e.target.value });
 };

 handleNewPasswordChange = (e) => {
  this.setState({ new_password: e.target.value });
 };

 render() {
  return (
   <>
    <div id="user-settings">
     <Container fluid>
      <Row md={{ span: 12 }} style={{ marginBottom: "70px" }}>
       <Col sm={4}>
        <h2 className="edit-head">Edit Profile</h2>
       </Col>
      </Row>
      <Row md={{ span: 12 }}>
       <Col sm={3}>
        <h6
         style={{
          padding: "5px 0 12px 0",
          fontSize: "1.2rem",
          fontWeight: 400,
          color: "#000",
         }}
        >
         Brand Logo
        </h6>
        <div className="profile-container">
         {this.props.photoURL ? (
          <>
           <img src={this.props.photoURL} alt={this.props.displayName} />
          </>
         ) : (
          <>
           <img src={blank} alt={this.props.info?.displayName} />
          </>
         )}
        </div>
        <h2
         onClick={() => {
          this.setState({ profile_modal: true });
         }}
         style={{
          textDecoration: "underline",
          cursor: "pointer",
          padding: "10px 0",
          fontSize: "1.2rem",
          fontWeight: 400,
         }}
        >
         Change Picture
        </h2>
       </Col>
       <Col md={5}>
        <div className="profile-form">
         <Form.Group as={Row}>
          <Col>
           <Form.Label>Email</Form.Label>
           <Form.Control
            placeholder="Email"
            onChange={this.handleEmailChange}
            value={this.state.email}
           />
          </Col>
         </Form.Group>
         <Form.Group as={Row} md={{ span: 12 }}>
          <Col md={6}>
           <Form.Label>Name</Form.Label>
           <Form.Control
            placeholder="Name"
            onChange={this.handleNameChange}
            value={this.state.name}
           />
          </Col>
          <Col md={6}>
           <Form.Label>City</Form.Label>
           <Form.Control
            placeholder="City"
            onChange={this.handleCityChange}
            value={this.state.city == "null" ? "" : this.state.city}
           />
          </Col>
         </Form.Group>
        </div>
       </Col>
      </Row>

      <Row md={{ span: 12 }} style={{ marginBottom: "70px" }}>
       <Col>
        <Form.Group as={Row}>
         <Col>
          <Form.Label>About</Form.Label>
          <Form.Control
           as="textarea"
           placeholder="About"
           onChange={this.handleAboutChange}
           //  value={this.state.about}
           value={this.state.about == "null" ? "" : this.state.about}
           style={{ height: "300px" }}
          />
         </Col>
        </Form.Group>
       </Col>
      </Row>
      <Row span={{ span: 12 }} className="py-3">
       <Col md={4}></Col>
       <Col md={4}></Col>
       <Col md={2} style={{ padding: "0" }}>
        <Link to="/user">
         <Button
          style={{
           display: "block",
           float: "right",
           width: "120px",
           background: "rgb(167 167 167)",
           textAlign: "center",
           border: "none",
          }}
         >
          Cancel
         </Button>
        </Link>
       </Col>
       <Col md={2}>
        {this.state.name === this.props.brand.store.name &&
        this.state.email === this.props.brand.store.email &&
        this.state.about === this.props.brand.store.about ? (
         <>
          <Button
           disabled
           style={{
            background: "#797979",
            display: "block",
            float: "right",
            width: "120px",
            textAlign: "center",
            border: "none",
           }}
          >
           Save
          </Button>
         </>
        ) : (
         <>
          <Button
           variant="danger"
           onClick={this.handleUpdateProfile}
           type="submit"
           style={{
            background: "#E41E15",
            display: "block",
            float: "right",
            width: "120px",
            textAlign: "center",
           }}
          >
           {this.state.prfl_loading ? (
            <>
             <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
            </>
           ) : (
            <>Save</>
           )}
          </Button>
         </>
        )}
       </Col>
      </Row>
      <Row span={{ span: 12 }}>
       <Col sm={4}>
        <h2 className="edit-head">Edit Profile</h2>
       </Col>
      </Row>
      <>
       <Modal
        id="price-request-modal"
        className="arch-wide-modal product-modal material-modal"
        size="lg"
        show={this.state.profile_modal}
        onHide={() => this.profile_close()}
        aria-labelledby="example-modal-sizes-title-lg"
       >
        <Modal.Header closeButton />
        <Modal.Body>
         <div className="option-add-label">Profile</div>
         <div className="cropper-box">
          <Cropper
           src={this.state.profile_src}
           style={{ height: "100%", width: "100%" }}
           ref={this.cropperRef}
           initialAspectRatio="free"
           guides={true}
           cropend={this._crop.bind(this)}
           ready={this._crop.bind(this)}
           crossOrigin="anonymous"
           preview=".image-preview"
           scalable={false}
           aspectRatio={1}
           autoCropArea={1}
           viewMode={1}
           dragMode="move"
           rotatable={false}
           zoomOnWheel={true}
           cropBoxMovable={true}
           cropBoxResizable={true}
           center={false}
          />
         </div>
         <div style={{ position: "relative", width: "80px", height: "80px" }}>
          <IoMdCloudUpload
           style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            fontSize: "5rem",
            zIndex: 1,
            background: "#e8e8e84a",
            textAlign: "left",
           }}
          />
          <input
           type="file"
           onChange={this.onChangeProfile}
           style={{
            position: "absolute",
            background: "red",
            opacity: 0,
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            width: "100%",
            fontSize: "5rem",
            zIndex: "2",
           }}
          />
         </div>

         <div as={Row} className="add-btn">
          <div column md={12}>
           <Button variant="danger" onClick={this.onProfilePicSubmit}>
            {this.state.addProfileLoad ? (
             <>
              <ClipLoader
               style={{ height: "20px" }}
               color="#ffffff"
               size={20}
              />
             </>
            ) : (
             <>Change</>
            )}
           </Button>
          </div>
         </div>
        </Modal.Body>
       </Modal>
      </>
     </Container>
    </div>
   </>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 updateInfo: (information) => dispatch(updateInfo(information)),
 dispatchLogOut: () => dispatch(logginOut()),
});

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  userInfo: state.regularUser,
 };
};
// export default Settings;
export default connect(mapStateToProps, mapDispatchToProps)(BrandSettingsTab);
