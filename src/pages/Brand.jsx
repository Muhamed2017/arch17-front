import React, { Component } from "react";
import { Row, Col, Tabs } from "antd";
import "../../src/pages/Brand.css";
import axios from "axios";
import * as utility from "../utitlties";
import { connect } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { Container, Form, Button } from "react-bootstrap";
// import { Form, Button } from "react-bootstrap";
// import { Col as setCol } from "react-bootstrap";
import blank from "../../src/blank.jpg";
import { Link } from "react-router-dom";
import { IoEarthSharp, IoShareSocial } from "react-icons/io5";
import { API } from "./../utitlties";
import { compressImage } from "./addProduct/OptionsPrice";
import { auth } from "../firebase";
import { toast, Flip } from "react-toastify";
import { Modal } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import Cropper from "react-cropper";
import { IoMdCloudUpload } from "react-icons/io";

import { IoIosMail } from "react-icons/io";
import { updateInfo, presistInfo } from "../redux/actions/authActions";

const { TabPane } = Tabs;
function callback(key) {
 console.log(key);
}
class Brand extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();

  this.state = {
   profile: false,

   brand_id: this.props.match.params.id,
   brand: null,
   isOwner: false,
   collections: null,
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
   brand_name: "",
   loading: false,
  };
 }
 componentDidMount() {
  axios
   .get(`${utility.API}brand/${this.state.brand_id}`)
   .then((response) => {
    console.log(response);
    this.setState({
     brand: response.data,
     brand_name: response.data.store.name[0],
     name: response.data.store.name,
     email: response.data.store.email,
     city: response.data.store.city,
     about: response.data.store.about,
     isOwner:
      this.props.isLoggedIn &&
      this.props.userInfo.uid === response.data.store.user_id,
     collections: response.data.store.collections,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }
 handleUpdateProfile = () => {
  const fd = new FormData();
  fd.append("name", this.state.name);
  fd.append("email", this.state.email);
  fd.append("about", this.state.about);
  fd.append("city", this.state.city);
  this.setState({ loading: true });
  axios
   .post(`${API}brand/update/${this.state.brand_id}`, fd)
   .then((response) => {
    console.log(response);
    const { store } = response.data;
    this.setState({ name: store.name, loading: false });
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
 profile_close = () => {
  this.setState({ profile_modal: false });
 };
 render() {
  const { brand, isOwner } = this.state;
  return (
   this.state.brand && (
    <React.Fragment>
     <div id="brand-container">
      <Row>
       <Col span={24}>
        <div className="brand-cover">
         <img src="" alt="" />
        </div>
       </Col>
      </Row>
      <Row>
       <Col md={5} sm={24} className="px-5">
        <div className="brand-profile">
         {this.state.profile ? (
          <>
           <img src="" alt="" />
          </>
         ) : (
          <>
           {/* <span>{brand.store.name[0]}</span> */}
           {/* <span>{this.state.brand_name}</span> */}
           <span>{this.state.name[0]}</span>
          </>
         )}
        </div>
       </Col>
       <Col md={4} sm={24}>
        <div className="brand-info">
         <p className="name">{this.state.name}</p>
         <p className="entity">{brand.store.type}</p>
         {/* <p className="location">
           {`${brand.store.country}
            ${brand.store.city ?? ""
         }`}</p> */}
         {/* <p className="location">{`${brand.store.city ?? ""}`}</p> */}
         <p className="location">{`${this.state.city ?? ""}`}</p>
        </div>
       </Col>
       <Col md={15} sm={24} style={{ textAlign: "right" }}>
        <div className="actions-btns">
         <button className="wb">
          <span style={{ display: "inline-block", margin: "-2px 3px" }}>
           <IoEarthSharp />
          </span>
          Website
         </button>
         <button className="shr">
          <span>
           <IoShareSocial />
          </span>
          Share
         </button>
         {!isOwner && (
          <>
           <button className="cnt">
            <span>
             <IoIosMail />
            </span>
            Contact
           </button>
           <button className="follow">
            <span>
             <AiOutlinePlus />
            </span>
            Follow
           </button>
          </>
         )}
        </div>
       </Col>
      </Row>
      <Row span={24}>
       <Col md={24}>
        <div className="content">
         <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Overview" key="1">
           <div className="overview-tab">
            {brand.store.about ? (
             <>
              <Row>
               <h6 className="bold">About</h6>
               <Col md={24}>
                <p className="py-3">
                 {/* Arper is an Italian company born in 1989 in the Treviso area,
                thanks to the entrepreneurial wit of the Feltrin family. This
                brand produces seating, tables and furnishing complements for
                the house, hospitality and office, while merging aesthetics with
                quality and high performances. The company has developed a
                strong inclination towards contract design and an international
                breath, also thanks to the collaboration with renowned designers
                coming from */}
                 {this.state.about}
                 <span className="bold underline">SEE MORE</span>
                </p>
               </Col>
              </Row>
             </>
            ) : (
             ""
            )}
            <Row span={24} className="types-row mb-4">
             {this.state.brand.store?.products?.length > 0 && (
              <>
               <Col md={24}>
                <h6 className="bold">Product Types</h6>
               </Col>
              </>
             )}

             {/* {this.state.brand.store?.products?.map((product, index) => { */}
             {["Benches"].map((type, index) => {
              return (
               <>
                <Col md={4} sm={12}>
                 <div className="box"></div>
                 {/* <span>{product.identity[0]?.kind}</span> */}
                 <span>{type}</span>
                </Col>
               </>
              );
             })}
            </Row>
            <Row span={24}>
             {this.state.collections?.map((col, index) => {
              return (
               <>
                <Col md={7} className="collection-col" key={index}>
                 <div className="collection-box">
                  <div
                   className="rect rect-0"
                   //  style={{ backgroundImage: `url(${collection1})` }}
                  ></div>
                  <div
                   className="rect rect-1"
                   //  style={{ backgroundImage: `url(${collection2})` }}
                  ></div>
                  <div
                   className="rect rect-2"
                   //  style={{ backgroundImage: `url(${collection3})` }}
                  ></div>
                 </div>
                 <div className="collection-text">
                  {/* <h5>Collection Name</h5> */}
                  {col.collection_name}
                 </div>
                </Col>
               </>
              );
             })}
            </Row>
           </div>
          </TabPane>
          <TabPane tab="Products" key="2">
           <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="py-5">
            {isOwner && (
             <>
              <Col className="gutter-row" span={6}>
               <a href={`/add-product/${this.state.brand_id}`}>
                <div className="product">
                 <div className="p-img"></div>
                 <div className="plus-icon">
                  <AiOutlinePlus />
                  Add Product
                 </div>
                </div>
               </a>
              </Col>
             </>
            )}
            {this.state.brand.store?.products?.map((product, index) => {
             return (
              <>
               <Col className="gutter-row" span={6}>
                <a href={`/product/${product.id}`}>
                 <div className="product">
                  <div
                   className="p-img"
                   style={{
                    // background: `url(${product.options[1]?.cover[0]})`,
                    background: `url(${product.identity[0]?.preview_cover})`,
                   }}
                  ></div>
                  <h5 className="product-store">{brand.store.name}</h5>
                  <p className="product-name">{product.identity[0]?.name}</p>
                  <div className="product-price">
                   {product.identity[0]?.preview_price ?? (
                    <>
                     <span>¥ {product.options[1]?.price}</span>
                    </>
                   )}
                  </div>
                 </div>
                </a>
               </Col>
              </>
             );
            })}
           </Row>
          </TabPane>
          <TabPane tab="Projects" key="3">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Blogs" key="4">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Reseller" key="5">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Shworooms" key="6">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Designers" key="7">
           Content of Tab Pane 3
          </TabPane>
          {isOwner ? (
           <>
            <TabPane tab="Settings" key="8">
             {/* <BrandSettingTab brand={this.state.brand} /> */}
             <>
              <div id="user-settings">
               {/* <Container fluid> */}
               <Row gutter={16} style={{ marginBottom: "70px" }}>
                <Col span={12}>
                 <h2
                  style={{
                   fontSize: "2rem",
                   fontWeight: "600",
                   color: "#000",
                   fontFamily: "Roboto",
                   textDecoration: "underline",
                   //   textAlign: "center",
                  }}
                 >
                  Edit Profile
                 </h2>
                </Col>
               </Row>
               {/* <Row md={{ span: 12 }}> */}
               <Row gutter={16} style={{ marginBottom: "70px" }}>
                <Col span={8}>
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
                    <img
                     src={this.props.photoURL}
                     alt={this.props.displayName}
                    />
                   </>
                  ) : (
                   <>
                    <img src={blank} alt={this.props.info?.displayName} />
                   </>
                  )}
                 </div>
                 <h2
                  onClick={() => {
                   //  this.setState({ profile_modal: true });
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
                <Col md={8}>
                 <div className="profile-form">
                  {/* <Form.Group as={Row}> */}
                  {/* <Col> */}
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                   placeholder="Email"
                   onChange={this.handleEmailChange}
                   value={this.state.email}
                  />
                  {/* </Col> */}
                  {/* </Form.Group> */}
                  {/* <Form.Group as={Row} md={{ span: 24 }}> */}
                  <Col span={24}>
                   <Form.Label>Name</Form.Label>
                   <Form.Control
                    placeholder="Name"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                   />
                  </Col>
                  <Col span={24}>
                   <Form.Label>City</Form.Label>
                   <Form.Control
                    placeholder="City"
                    onChange={this.handleCityChange}
                    value={this.state.city == "null" ? "" : this.state.city}
                   />
                  </Col>
                  {/* </Form.Group> */}
                 </div>
                </Col>
               </Row>

               {/* <Row md={{ span: 12 }} style={{ marginBottom: "70px" }}> */}
               <Row gutter={16} style={{ marginBottom: "70px" }}>
                <Col span={16}>
                 {/* <Form.Group as={Row}> */}
                 {/* <Col> */}
                 <Form.Label>About</Form.Label>
                 <Form.Control
                  as="textarea"
                  placeholder="About"
                  onChange={this.handleAboutChange}
                  //  value={this.state.about}
                  value={this.state.about == "null" ? "" : this.state.about}
                  style={{ height: "300px" }}
                 />
                 {/* </Col> */}
                 {/* </Form.Group> */}
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
                 {this.state.name === brand.store.name &&
                 this.state.city === brand.store.city &&
                 this.state.email === brand.store.email &&
                 this.state.about === brand.store.about ? (
                  <>
                   <Button
                    disabled
                    style={{
                     background: "#797979",
                     display: "block",
                     //  float: "right",
                     width: "120px",
                     textAlign: "center",
                     border: "none",
                     margin: "0 8px",
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
                     //  float: "right",
                     width: "120px",
                     textAlign: "center",
                     margin: "0 10px",
                    }}
                   >
                    {this.state.loading ? (
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
                  <div
                   style={{
                    position: "relative",
                    width: "80px",
                    height: "80px",
                   }}
                  >
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
               {/* </Container> */}
              </div>
             </>
            </TabPane>
           </>
          ) : (
           ""
          )}
         </Tabs>
        </div>
       </Col>
      </Row>
     </div>
    </React.Fragment>
   )
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 //  updateInfo: (info) => dispatch(updateInfo(info)),
 //  sigupSuccess: (info) => dispatch(emailPasswordSignupSuccess(info)),
});
const mapStateToProps = (state) => {
 return {
  userInfo: state.regularUser.info,
  isLoggedIn: state.regularUser.isLoggedIn,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(Brand);
