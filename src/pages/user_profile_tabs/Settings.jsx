import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import blank from "../../../src/blank.jpg";
import { auth } from "./../../firebase";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast, Flip } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Cropper from "react-cropper";
import { IoWarning } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import "cropperjs/dist/cropper.css";
import { compressImage } from "../addProduct/OptionsPrice";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { logginOut } from "./../../redux/actions/authActions";
import { API } from "./../../utitlties";
import { Spin, Select } from "antd";
import ReactFlagsSelect from "react-flags-select";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";

import en from "world_countries_lists/data/countries/en/world.json";
import {
 signinEmailPassword,
 setUserInfoAction,
 updateInfo,
 presistInfo,
} from "../../redux/actions/authActions";
const Proffessions = [
 "Engineer",
 "Designer",
 "Archetict",
 "Interiour Designer",
];
class Settings extends Component {
 constructor(props) {
  super(props);

  this.cropperRef = React.createRef();
  this.state = {
   fname: "",
   lname: "",
   //  email: "",
   phone: "",
   password: "",
   new_password: "",
   deletePassword: "",
   provider: null,
   signgedin: false,
   pswrd_loading: false,
   prfl_loading: false,
   change_password_modal: false,
   delete_acc_modal: false,
   profile_modal: false,
   profile_src: "",
   deletingAcc: false,
   cropped_profile: null,
   addProfileLoad: false,
   confResult: "",
   phoneModal: false,
   status: "process",
   changing: false,
   selectedProfessions: this.props.location?.state?.user?.professions ?? [],
   user: this.props.location?.state?.user ?? null,
   is_designer: this.props.location?.state?.user
    ? this.props.location?.state?.user?.is_designer
    : 0,
   fetched: this.props.location?.state?.user ? true : false,
   country: this.props.location?.state?.user?.country,
   city: this.props.location?.state?.user?.city,
   providerId: this.props.location?.state?.user?.providerId,
   code: this.props.location?.state?.user?.phoneCode,
   phoneNumber: this.props.location?.state?.user?.phoneNumber,
   email: this.props.location?.state?.user?.email,
   isChanged: false,
  };
 }
 handleProfessionChange = (selectedProfessions) => {
  this.setState({ selectedProfessions, isChanged: true });
 };
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
  console.log(this.props.location?.state?.user?.is_designer);
  console.log(`is designer is ${this.state.is_designer}`);
  if (!this.state.fetched) {
   axios.get(`${API}user/folders/${this.state.uid}`).then((response) => {
    console.log(response);
    const { user } = response.data;
    this.setState({
     user,
     is_designer: user?.is_designer,
     fetched: true,
     country: user?.country,
     city: user?.city,
     selectedProfessions: user?.professions,
     phoneNumber: user?.phoneNumber,
     code: user?.phoneCode,
     providerId: user?.providerId,
     email: user?.email,
    });
   });
  }
  this.setState({
   fname: this.props.displayName?.split(" ")[0],
   lname: this.props.displayName?.split(" ")[1],
   photoURL: this.props.photoURL,
   email: this.props.email,
   //  phone: this.props.userInfo?.info?.phoneNumber ?? "",
   //  email: this.props.userInfo.info?.email?.includes("+")
   //   ? "No Email"
   //   : this.props.userInfo?.info?.email,
  });
 }

 handleDeleteSubmit = () => {
  this.setState({ deletingAcc: true });
  if (this.state.providerId === "password") {
   auth
    .signInWithEmailAndPassword(
     this.props.userInfo?.email,
     this.state.deletePassword
    )
    .then((userCreds) => {
     console.log(userCreds.user);
     axios
      .post(`${API}deleteuser/${this.props.userInfo?.info?.uid}`)
      .then(() => {
       this.setState({ deletingAcc: false });
       this.props.dispatchLogOut();
      });
    });
  } else {
   axios.post(`${API}deleteuser/${this.props.userInfo?.info?.uid}`).then(() => {
    this.setState({ deletingAcc: false });

    this.props.dispatchLogOut();
   });
  }
 };
 changePassword = () => {
  this.setState({ pswrd_loading: true });
  auth
   .signInWithEmailAndPassword(auth.currentUser.email, this.state.password)
   .then((userCreds) => {
    userCreds.user
     .updatePassword(this.state.new_password)
     .then(() => {
      console.log("Password Changed");
      this.setState({ pswrd_loading: false });
      this.setState({ change_password_modal: false });
      toast.success("Password Updated Successfully", {
       position: toast.POSITION.BOTTOM_LEFT,
       theme: "colored",
       transition: Flip,
      });
     })
     .catch((err) => {
      console.log(err);
     });
   })
   .catch((err) => console.log(err));
 };
 changePasswordOpen = () => {
  this.setState({ change_password_modal: true });
 };
 deleteAccountOpen = () => {
  this.setState({ delete_acc_modal: true });
 };
 deleteAccClose = () => {
  this.setState({ delete_acc_modal: false });
 };

 handleUpdateProfile = () => {
  this.setState({ prfl_loading: true });
  const fd = new FormData();
  fd.append("displayName", `${this.state.fname} ${this.state.lname}`);
  fd.append("email", this.state.email);
  if (this.state.city.length > 0) fd.append("city", this.state.city);
  if (this.state.country.length > 0) fd.append("country", this.state.country);
  if (this.state.phoneNumber > 0)
   fd.append("phoneNumber", Number(this.state.phoneNumber));
  if (this.state.code > 0) fd.append("phoneCode", this.state.code);
  if (this.state.selectedProfessions.length > 0)
   this.state.selectedProfessions.map((p) => fd.append("professions[]", p));

  if (this.props.isLoggedIn) {
   axios
    .post(`${API}updateuser/${this.props.userInfo?.info?.uid}`, fd)
    .then((response) => {
     console.log(response.data);
     this.props.updateInfo(response.data.fb);
     presistInfo(response.data.fb, true);
     toast.success("Pofile Updated Successfully", {
      position: toast.POSITION.BOTTOM_LEFT,
      theme: "colored",
      transition: Flip,
      hideProgressBar: true,
     });
     this.setState({
      prfl_loading: false,
     });
    });
  } else {
   console.log("not signed in, please sign in and try again");
  }
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
    "img",
    await compressImage(this.dataURLtoFile(this.state.cropped_profile, "file"))
   );
   axios
    .post(`${API}useravatar/${this.props.userInfo?.info?.uid}`, fd)
    .then((response) => {
     this.props.updateInfo(response.data.fb);
     console.log(response.data.fb);
     console.log(this.props);
     presistInfo(response.data.fb, true);
     this.setState({ addProfileLoad: false });
     this.setState({ profile_modal: false });
     toast.success("Your Picture Updated Successfully", {
      position: toast.POSITION.BOTTOM_LEFT,
      theme: "colored",
      transition: Flip,
     });
    })
    .catch((error) => console.log(error));
  }
  console.log(fd);
 };
 handleFnameChange = (e) => {
  this.setState({
   fname: e.target.value,
   isChanged:
    `${e.target.value} ${this.state.lname}` !== this.state.user?.displayName,
  });
 };
 handleLnameChange = (e) => {
  this.setState({
   lname: e.target.value,
   isChanged:
    `${this.state.fname} ${e.target.value}` !== this.state.user?.displayName,
  });
 };

 handleEmailChange = (e) => {
  this.setState({
   email: e.target.value,
   isChanged: e.target.value !== this.state.user?.email,
  });
 };

 handlePasswordChange = (e) => {
  this.setState({ password: e.target.value });
 };

 handleDeletePasswordChange = (e) => {
  this.setState({ deletePassword: e.target.value });
 };

 handleNewPasswordChange = (e) => {
  this.setState({ new_password: e.target.value });
 };

 render() {
  const { selectedProfessions, isChanged } = this.state;

  const filteredOptions = Proffessions.filter(
   (o) => !selectedProfessions.includes(o)
  );
  if (!this.props.isLoggedIn || !this.props.userInfo?.info)
   return <Redirect to="/" />;
  if (!this.state.fetched)
   return (
    <>
     <Spin
      size="large"
      indicator={
       <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
      }
      style={{ position: "absolute", top: "40%", right: "50%" }}
     />
    </>
   );
  return (
   <>
    <div id="user-settings">
     <Container fluid>
      <Row md={{ span: 12 }} style={{ marginBottom: "70px" }}>
       <Col sm={4}>
        <h2
         style={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#000",
          fontFamily: "Roboto",
          textDecoration: "underline",
          textAlign: "center",
         }}
        >
         Settings
        </h2>
       </Col>
      </Row>
      <Row md={{ span: 12 }}>
       <Col sm={4}>
        <h6
         style={{
          textAlign: "center",
          padding: "5px 0 12px 0",
          fontSize: "1.2rem",
          fontWeight: 400,
          color: "#000",
         }}
        >
         Profile Picture
        </h6>
        <div className="profile-container">
         {/* {this.props.info?.photoURL ? ( */}
         {/* {this.props.photoURL || this.state.user?.avatar ? (
          <>
           <img
            // src={this.props.info?.photoURL}
            src={this.props.photoURL ?? this.state.user?.avatar}
            alt={this.props.displayName}
           />
          </>
         ) : (
          <>
           <img src={blank} alt={this.props.info?.displayName} />
          </>
         )} */}
         <img
          src={
           this.props?.photoURL ??
           this.props.info?.photoUrl ??
           this.state.user?.avatar ??
           blank
          }
          alt=""
         />
        </div>
        <h2
         onClick={() => {
          this.setState({ profile_modal: true });
         }}
         style={{
          textDecoration: "underline",
          cursor: "pointer",
          padding: "10px 0",
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: 400,
         }}
        >
         Change Picture
        </h2>
       </Col>
       <Col sm={8}>
        <div className="profile-form">
         <Form.Group as={Row} md={{ span: 12 }}>
          <Col md={6}>
           <Form.Label>First Name</Form.Label>
           <Form.Control
            placeholder="First Name"
            onChange={this.handleFnameChange}
            value={this.state.fname}
           />
          </Col>
          <Col md={6}>
           <Form.Label>Last Name</Form.Label>
           <Form.Control
            placeholder="Last Name"
            onChange={this.handleLnameChange}
            value={this.state.lname}
           />
          </Col>
         </Form.Group>
         {this.state.is_designer && (
          <>
           <Form.Group as={Row}>
            <Form.Label>Profession</Form.Label>
            <Col md={12}>
             <Select
              size="large"
              mode="multiple"
              placeholder="Profession *"
              showArrow
              allowClear
              value={selectedProfessions}
              onChange={this.handleProfessionChange}
              style={{ width: "100%" }}
             >
              {filteredOptions.map((item) => (
               <Select.Option key={item} value={item}>
                {item}
               </Select.Option>
              ))}
             </Select>
            </Col>
           </Form.Group>
           <Form.Group as={Row}>
            <Col md={6}>
             <Form.Label>Country</Form.Label>
             <ReactFlagsSelect
              selected={this.state.country}
              selectedSize={17}
              optionsSize={16}
              searchable
              placeholder="Select Country *"
              onSelect={(code) => {
               this.setState({
                country: code,
                isChanged: code !== this.state.user?.country,
               });
              }}
             />
            </Col>
            <Col md={6}>
             <Form.Label>City</Form.Label>
             <Form.Control
              placeholder="City"
              onChange={(e) =>
               this.setState({
                city: e.target.value,
                isChanged: e.target.value !== this.state.user?.city,
               })
              }
              value={this.state.city}
             />
            </Col>
           </Form.Group>
           <Form.Group as={Row}>
            <Col md={12}>
             <Form.Label>Phone Number</Form.Label>
             <ConfigProvider
              locale={en}
              areaMapper={(area) => {
               return {
                ...area,
                emoji: <span className={`fp ${area.short.toLowerCase()}`} />,
               };
              }}
             >
              <CountryPhoneInput
               size="large"
               placeholder="Phone *"
               value={{
                code: this.state.code,
                phone: this.state.phoneNumber,
               }}
               onChange={(e) => {
                this.setState({
                 phoneNumber: e.phone,
                 code: e.code,
                 isChanged:
                  e.phone != this.state.user?.phoneNumber ||
                  e.code != this.state.user?.phoneCode,
                });
               }}
              />
             </ConfigProvider>
            </Col>
           </Form.Group>
          </>
         )}

         {!this.props.userInfo.info?.email?.includes("+") ? (
          <>
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
          </>
         ) : (
          <></>
         )}

         <Row md={{ span: 12 }}>
          {!this.props.userInfo.info?.email?.includes("+") ? (
           <>
            {this.state.providerId === "password" && (
             <>
              <Col md={6}>
               <button
                href="#"
                style={{
                 textAlign: "right",
                 textDecoration: "underline",
                 fontWeight: "600",
                 color: "#000",
                 background: "transparent",
                 outline: "none",
                 border: "none",
                }}
                // onClick={this.changePasswordOpen}
                onClick={this.changePasswordOpen}
               >
                Change Password
               </button>
              </Col>
             </>
            )}
           </>
          ) : (
           <></>
          )}
          <Col md={6} style={{ textAlign: "right" }}>
           <button
            style={{
             textAlign: "right",
             textDecoration: "underline",
             fontWeight: "600",
             color: "#000",
             background: "transparent",
             outline: "none",
             border: "none",
            }}
            onClick={this.deleteAccountOpen}
           >
            Delete Account
           </button>
          </Col>
         </Row>
         <Row span={{ span: 12 }} className="py-3">
          <Col md={3}></Col>
          <Col md={3}></Col>
          <Col md={3} style={{ padding: "0" }}>
           <Link to="/profile">
            <Button
             style={{
              display: "block",
              float: "right",
              marginRight: "12px",
              padding: "7px 0",
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
          <Col md={3}>
           {!isChanged ? (
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
                <ClipLoader
                 style={{ height: "20px" }}
                 color="#ffffff"
                 size={20}
                />
               </>
              ) : (
               <>Save</>
              )}
             </Button>
            </>
           )}
          </Col>
         </Row>
        </div>
       </Col>
      </Row>
      <>
       <Modal
        show={this.state.change_password_modal}
        onHide={this.password_modal_close}
        className="example-modals"
        keyboard={false}
       >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
         <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
          <Form.Row as={Row} style={{ margin: "20px 0" }}>
           <Form.Label column md={4}>
            Old Password
           </Form.Label>
           <Col md={8}>
            <Form.Control
             type="password"
             value={this.state.password}
             placeholder="Old Password"
             onChange={this.handlePasswordChange}
            />
           </Col>
          </Form.Row>
          <Form.Row as={Row} style={{ margin: "20px 0" }}>
           <Form.Label column md={4}>
            New Password
           </Form.Label>
           <Col md={8}>
            <Form.Control
             type="password"
             placeholder="New Password"
             onChange={this.handleNewPasswordChange}
             value={this.state.new_password}
            />
           </Col>
          </Form.Row>
          <Button
           variant="danger"
           onClick={() => {
            this.changePassword();
            this.setState({ embed_modal: false });
           }}
           type="submit"
           style={{
            textAlign: "right",
            background: "#E41E15",
            display: "block",
            float: "right",
            marginRight: "12px",
           }}
          >
           {this.state.pswrd_loading ? (
            <>
             <ClipLoader
              style={{ height: "20px" }}
              color="#ffffff"
              loading={this.state.loadCovers}
              size={20}
             />
            </>
           ) : (
            <>Change</>
           )}
          </Button>
         </div>
        </Modal.Body>
       </Modal>
       <Modal
        show={this.state.delete_acc_modal}
        onHide={this.deleteAccClose}
        closeButton
        keyboard={false}
        size="md"
       >
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body>
         <div className="modal-wrapper" style={{ padding: "15px", margin: "" }}>
          <Row as={Row} style={{ margin: "0px 0" }}>
           <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
            Delete Account
           </p>
           <Col md={8}></Col>
          </Row>
          <Row as={Row} style={{ margin: "30px 0" }}>
           <Col md={12}>
            <div
             className="warning-danger"
             style={{
              background: "#fbe9e7",
              padding: "15px",
              color: "#E41E15",
             }}
            >
             <span
              style={{
               display: "inline-block",
               fontSize: "2.5rem",
               verticalAlign: "center",
               padding: "0 10px",
              }}
             >
              <IoWarning />
             </span>
             <p
              style={{
               color: "#c62828",
               fontWeight: "600",
               width: "80%",
               fontSize: ".9rem",
               display: "inline-block",
              }}
             >
              After you deleting your account, it's permanently deleted.
             </p>
            </div>
           </Col>
          </Row>
          {this.state.providerId === "password" && (
           <Form.Group as={Row} className="mb-2 px-3">
            <Col>
             <Form.Label>Password</Form.Label>
             <Form.Control
              placeholder="Type your password"
              onChange={this.handleDeletePasswordChange}
              type="password"
              value={this.state.deletePassword}
             />
            </Col>
           </Form.Group>
          )}
          <Button
           variant="danger"
           onClick={this.handleDeleteSubmit}
           type="submit"
           style={{
            textAlign: "right",
            background: "#E41E15",
            display: "block",
            float: "right",
            marginRight: "12px",
           }}
          >
           {this.state.deletingAcc ? (
            <>
             <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
            </>
           ) : (
            <>Delete</>
           )}
          </Button>
         </div>
        </Modal.Body>
       </Modal>
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
 signin: (email, password, newName, newEmail, phone) =>
  dispatch(signinEmailPassword(email, password, newName, newEmail, phone)),
 setNav: (info) => dispatch(setUserInfoAction(info)),
 updateInfo: (information) => dispatch(updateInfo(information)),
 dispatchLogOut: () => dispatch(logginOut()),
});

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  loading: state.regularUser.loading,
  userInfo: state.regularUser,
  info: state.regularUser.user,
  displayName: state.regularUser.displayName,
  photoURL: state.regularUser?.photoURL,
  email: state.regularUser?.email,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
