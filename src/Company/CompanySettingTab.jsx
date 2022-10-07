import React, { Component } from "react";
import { Input, Row, Col, Select, Button } from "antd";
import { Modal } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { customLabels } from "./../pages/CreateBrandFinish";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import Cropper from "react-cropper";
import { IoMdCloudUpload } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "./../utitlties";
import axios from "axios";
import { company_services } from "../pages/addProduct/ProductClassifications";
const { Option } = Select;

const { TextArea } = Input;
const src =
 "https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_960_720.png";
//  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
class CompanySettingTab extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();
  this.state = {
   saving: false,
   profile_modal: false,
   selectedServices:
    this.props.company?.services && this.props.company?.services !== "null"
     ? this.props.company?.services
     : [],
   website:
    this.props.company?.website && this.props.company?.website !== "null"
     ? this.props.company?.website
     : "",
   email:
    this.props.company?.email && this.props.company?.email !== "null"
     ? this.props.company?.email
     : "",
   name:
    this.props.company?.name && this.props.company?.name !== "null"
     ? this.props.company?.name
     : "",
   country:
    this.props.company?.country && this.props.company?.country !== "null"
     ? this.props.company?.country
     : "",
   city:
    this.props.company?.city && this.props.company?.city !== "null"
     ? this.props.company?.city
     : "",
   phone_code:
    this.props.company?.code && this.props.company?.code !== "null"
     ? parseInt(this.props.company?.code)
     : 86,
   phone:
    this.props.company?.phone && this.props.company?.phone !== "null"
     ? this.props.company?.phone
     : "",
   bio:
    this.props.company?.bio && this.props.company?.bio !== "null"
     ? this.props.company?.bio
     : "",
   about:
    this.props.company?.about && this.props.company?.about !== "null"
     ? this.props.company?.about
     : "",
   profile:
    this.props.company?.profile && this.props.company?.profile !== "null"
     ? this.props.company?.profile
     : null,

   company_id: this.props.company?.id,
  };
 }
 _crop() {
  setTimeout(() => {
   const imageElement = this.cropperRef?.current;
   const cropper = imageElement?.cropper;
   let cropped = cropper.getCroppedCanvas().toDataURL();

   this.setState({ cropped_profile: cropped });
  });
 }

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
 handleServicesChange = (selectedServices) => {
  this.setState({ selectedServices }, () => {
   console.log(this.state.selectedServices);
  });
 };
 handleSaveSetting = () => {
  this.setState({
   saving: true,
  });
  console.log(this.state);
  const {
   name,
   country,
   city,
   email,
   bio,
   about,
   website,
   selectedServices,
   phone,
   phone_code,
  } = this.state;
  const fd = new FormData();
  fd.append("name", name);
  fd.append("country", country);
  fd.append("city", city);
  fd.append("email", email);
  fd.append("bio", bio);
  fd.append("about", about);
  fd.append("website", website);
  fd.append("phone", phone);
  fd.append("phone_code", phone_code);
  selectedServices?.forEach((s) => {
   fd.append("services[]", s);
  });

  axios
   .post(`${API}company/update/${this.state.company_id}`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     saving: false,
    });
   })
   .catch((error) => {
    console.log(error);
    this.setState({
     saving: false,
    });
   });
 };

 onChangeProfile = (e) => {
  const file = e.target.files[0];
  const src = URL.createObjectURL(file);
  this.setState({ profile: src });
 };
 handleUpdateLogo = async () => {
  const fd = new FormData();
  fd.append(
   "company_profile",
   this.dataURLtoFile(this.state.cropped_profile, "company_profile")
  );
  axios
   .post(`${API}company/logo/${this.state.company_id}`, fd)
   .then((response) => {
    this.setState({
     logo: response.data.company_profile,
     profile_modal: false,
    });
   });
 };

 render() {
  return (
   <>
    <div id="company-setting" className="company-setting-tab company-tab py-5">
     <div className="mb-5">
      <p className="bold form-underline">Edit Profile</p>
      <div className="setting-form">
       <Row span={24}>
        <Col md={6}>
         <div className="company-profile">
          <div
           className="company-logo"
           style={{
            backgroundImage: `url("${this.state.profile || src}")`,
           }}
          ></div>
          <p
           className="upprof"
           onClick={() => this.setState({ profile_modal: true })}
          >
           Update company profile
          </p>
         </div>
        </Col>
        <Col md={18}>
         <p className="lbl">Company Name</p>
         <Input
          size="large"
          className="mb-3"
          value={this.state.name}
          onChange={(e) => {
           this.setState({
            name: e.target.value,
           });
          }}
         />
         <p className="lbl mt-4 mb-3">
          Bio - <span>Write short intro about your company in 155 letter</span>
         </p>
         <TextArea
          rows={3}
          maxLength={155}
          showCount
          value={this.state.bio}
          onChange={(e) =>
           this.setState({
            bio: e.target.value,
           })
          }
         />
         <p className="lbl my-5">About</p>
         <TextArea
          rows={15}
          value={this.state.about}
          onChange={(e) =>
           this.setState({
            about: e.target.value,
           })
          }
         />
        </Col>
       </Row>
      </div>
     </div>
     <div className="mb-5">
      <p className="bold form-underline">Edit Company</p>
      <div className="setting-form">
       <p className="lbl">Services</p>
       <Row span={24}>
        <Col md={24}>
         <Select
          size="large"
          showSearch
          mode="tags"
          onChange={this.handleServicesChange}
          value={this.state.selectedServices}
          placeholder="Please select Service"
          style={{
           fontSize: "13px",
           width: "50%",
          }}
         >
          {company_services.map((p) => {
           return (
            <>
             <Option value={p}>{p}</Option>
            </>
           );
          })}
         </Select>
        </Col>
       </Row>
       <Row span={24} gutter={12} align="middle" className="mt-5">
        <Col md={12}>
         <p className="lbl">Country</p>
         <ReactFlagsSelect
          selected={this.state.country}
          selectedSize={14}
          optionsSize={18}
          searchable
          customLabels={customLabels}
          placeholder="Select Country *"
          onSelect={(code) => {
           this.setState({ country: code });
          }}
         />
        </Col>
        <Col md={12}>
         <p className="lbl">City</p>
         <Input
          size="large"
          value={this.state.city}
          onChange={(e) => {
           this.setState({
            city: e.target.value,
           });
          }}
         />
        </Col>
       </Row>
      </div>
     </div>
     <div className="mb-3">
      <p className="bold form-underline">Contacts</p>
      <div className="setting-form">
       <Row gutter={12} span={24}>
        <Col md={12}>
         <p className="lbl">Website</p>
         <Input
          placeholder="https://"
          size="large"
          value={this.state.website}
          onChange={(e) => {
           this.setState({
            website: e.target.value,
           });
          }}
         />
        </Col>
        <Col md={12}>
         <p className="lbl">Phone</p>
         <ConfigProvider locale={en}>
          <CountryPhoneInput
           value={{
            code: this.state.phone_code,
            phone: this.state.phone,
           }}
           onChange={(e) =>
            this.setState({ phone: e.phone, phone_code: e.code }, () =>
             console.log(this.state)
            )
           }
          />
         </ConfigProvider>
        </Col>
        <Col md={24} className="mt-4">
         <p className="lbl">Email</p>
         <Input
          value={this.state.email}
          onChange={(e) => {
           this.setState({ email: e.target.value });
          }}
          type="email"
          size="large"
          placeholder="Company Email"
          style={{
           width: "50%",
          }}
         />
        </Col>
       </Row>
      </div>
     </div>
     <Row justify="end">
      <Col md={24}>
       <Button
        className="invite-btn"
        onClick={this.handleSaveSetting}
        loading={this.state.saving}
       >
        Save
       </Button>
      </Col>
     </Row>
     <Row span={24} className="mt-5">
      <Col md={24}>
       <p className="transfer">Transfer Company Ownership</p>
      </Col>
     </Row>
    </div>

    <Modal
     id="price-request-modal"
     className="arch-wide-modal product-modal material-modal"
     size="lg"
     show={this.state.profile_modal}
     onHide={() => this.setState({ profile_modal: false })}
     aria-labelledby="example-modal-sizes-title-lg"
    >
     <Modal.Header closeButton />
     <Modal.Body>
      <div className="option-add-label">Profile</div>
      <div className="cropper-box">
       <Cropper
        src={this.state.profile}
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
        <Button variant="danger" onClick={this.handleUpdateLogo}>
         {this.state.addProfileLoad ? (
          <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
         ) : (
          <>Change</>
         )}
        </Button>
       </div>
      </div>
     </Modal.Body>
    </Modal>
   </>
  );
 }
}

export default CompanySettingTab;
