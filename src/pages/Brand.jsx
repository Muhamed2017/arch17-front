import React, { Component } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col, Tabs, Spin, Input, Select } from "antd";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/en/world.json";
import "../../src/pages/Brand.css";
import axios from "axios";
import * as utility from "../utitlties";
import { connect } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { Form, Button } from "react-bootstrap";
import blank from "../../src/blank.jpg";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { IoEarthSharp, IoShareSocial } from "react-icons/io5";
import { API } from "./../utitlties";
import ReactFlagsSelect from "react-flags-select";
import { Link } from "react-router-dom";
import {
 vanillaSigninEmailPassword,
 signupFacebook,
 signupGoogle,
 signupEmailPassword,
} from "../redux/actions/authActions";
import { toast as toastifing, Flip } from "react-toastify";
import { Modal } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import Cropper from "react-cropper";
import { IoMdCloudUpload } from "react-icons/io";
import HashLoader from "react-spinners/HashLoader";
import { IoIosMail } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import * as constants from "./addProduct/ProductClassifications";
import TypesSection from "./Brand/TypesSection";
import CollectionsSection from "./Brand/CollectionsSection";
const compressImage = async (imageFile) => {
 const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1500,
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

const { TabPane } = Tabs;
function callback(key) {
 console.log(key);
}
class Brand extends Component {
 constructor(props) {
  super(props);
  this.cropperRef = React.createRef();

  this.state = {
   signinPassword: "",
   signingEmail: "",
   signupEmail: "",
   signupPassword: "",
   signupFname: "",
   signupLname: "",
   authFace: "",
   authModal: false,
   profile: false,
   brand_id: this.props.match.params.id,
   brand: null,
   isOwner: false,
   collections: null,
   name: this.props.brand?.store?.name,
   email: this.props.brand?.store?.email,
   about: this.props.brand?.store?.about ?? "",
   city: this.props.brand?.store?.city ?? "",
   country: this.props.brand?.store?.country ?? "",
   prfl_loading: false,
   profile_modal: false,
   profile_src: "",
   cropped_profile: null,
   addProfileLoad: false,
   status: "process",
   changing: false,
   brand_cover: "",
   brand_name: "",
   collabsed_about: "",
   extended_about: "",
   loading: false,
   phone: "",
   selectedTags: [],
   full_about: "",
   store_ownerUid: "",
   official_website: "",
   aboutIsCollabsed: true,
   phone_code: "",
   followers: [],
   follow_loading: false,
   is_A_Follower: false,
   phone_number: "",
   setting_cover: false,
   cover_loader: false,
   cropper_src: "",
   loading_cover: false,
   types: [],
   productLoading: true,
   products: [],
   store: {
    name: "",
    email: "",
    about: "",
    phone: "",
    city: "",
    phone_code: "",
    official_website: "",
    logo: "",
    cover: "",
    product_types: [],
    type: "",
   },
   selectedTypes: [],
   selectedCategory: "",
   selectedKind: "",
   addedKinds: [],
   addedCategories: [],
   addedTypes: [],
   filter: false,
  };
 }

 onChangeProfile = (e) => {
  const file = e.target.files[0];
  const src = URL.createObjectURL(file);
  this.setState({ profile_img: file });
  this.setState({ profile_src: src });
 };

 flipToRegiseterFace = () => {
  this.setState({ authFace: "register-face" });
 };

 flipToSigninFace = () => {
  this.setState({ authFace: "signin-face" });
 };

 handleSigningIn = (email, password) => {
  this.setState({ signingIn: !this.props.isLoggedIn });
  this.props.dispatchRegularSignin(email, password);
 };

 handleRegularSignup = (fname, lname, email, password) => {
  this.props.dispatchRegularSignup(fname, lname, email, password, "regular");
 };

 handleContact = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
  } else return;
 };

 handleFollowStore = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
  } else {
   this.setState({ follow_loading: true });
   const fd = new FormData();
   fd.append("user_id", this.props.userInfo?.uid);
   axios
    .post(`${API}brand/follow/${this.state.brand_id}`, fd)
    .then((response) => {
     console.log(response);
     this.setState({
      is_A_Follower: response.data.message?.followers?.includes(
       auth?.currentUser?.uid
      ),
      followers: response.data.message.followers,
      follow_loading: false,
     });
    });
  }
 };

 handleUnfollowStore = async () => {
  this.setState({ follow_loading: true });
  const fd = new FormData();
  fd.append("user_id", this.props.userInfo.uid);
  await axios
   .post(`${API}brand/unfollow/${this.state.brand_id}`, fd)
   .then((response) => {
    console.log(response);

    this.setState({
     is_A_Follower: response.data.message?.followers?.includes(
      auth.currentUser.uid
     ),

     follow_loading: false,
     followers: response.data.message.followers,
    });
   });
 };

 fetchStoreData = () => {
  axios
   .get(`${utility.API}brand/${this.state.brand_id}`)
   .then((response) => {
    const {
     name,
     email,
     country,
     city,
     official_website,
     phone,
     logo,
     phone_code,
     cover,
     about,
     collections,
     followers,
    } = response.data.store;
    console.log(response.data);
    this.setState({
     productLoading: false,
     brand: response.data,
     products: response.data.store?.products,
     brand_name: name[0],
     name,
     email,
     country,
     city,
     official_website,
     phone_code: Number(phone_code),
     phone,
     store_ownerUid: response.data.store.user_id,
     about: about && about.length > 450 ? about.slice(0, 450) : about,
     full_about: about,
     collabsed_about: about && about.length > 450 ? about.slice(0, 450) : about,
     isOwner: this.props.userInfo?.uid === response.data.store.user_id,
     collections: collections,
     logo,
     cover,
     brand_cover: cover,
     followers: followers,
     is_A_Follower: followers?.includes(this.props.userInfo?.uid),
     types: response.data.types,
     addedKinds: [],
     addedCategories: response.data.store?.products?.map((product) => {
      return product.identity[0].category;
     }),
     addedTypes: response.data.store?.products?.map((product) => {
      return product.identity[0].type;
     }),
    });
   })
   .catch((error) => {});
 };

 //  set is returning only unique valuse from an array
 componentDidMount() {
  console.log(constants);
  this.fetchStoreData();
  auth.onAuthStateChanged((userAuth) => {
   if (userAuth) {
    this.setState({
     isOwner: userAuth.uid === this.state.store_ownerUid,
     is_A_Follower: this.state.followers.includes(userAuth.uid),
     isLoggedIn: true,
    });
   } else {
    this.setState({ isOwner: false, is_A_Follower: false, isLoggedIn: false });
   }
  });
 }
 handleFilterChange = () => {
  this.setState({ productLoading: true });
  axios
   .get(
    `${API}brandproductsfilter/${this.state.brand_id}?filter[category]=${this.state.selectedCategory}&filter[kind]=${this.state.selectedKind}`
   )
   .then((response) => {
    console.log(response.data.products.data);
    this.setState({
     products: response.data.products.data,
     productLoading: false,
     addedTypes: response.data.products?.data?.map((product) => {
      return product.type;
     }),
    });
   })
   .catch((error) => {
    console.log(error);
   });
 };
 seeMoreAbout = () => {
  const about = this.state.full_about;
  this.setState({
   about,
   aboutIsCollabsed: false,
  });
 };

 seLessAbout = () => {
  const about = this.state.collabsed_about;
  this.setState({
   about,
   aboutIsCollabsed: true,
  });
 };

 handleUpdateLogo = async () => {
  const fd = new FormData();
  fd.append(
   "logo",
   await compressImage(this.dataURLtoFile(this.state.cropped_profile, "logo"))
  );
  axios.post(`${API}brandlogo/${this.state.brand_id}`, fd).then((response) => {
   //  console.log(response);
   this.setState({ logo: response.data.brand.logo, profile_modal: false });
  });
 };

 handleUpdateProfile = () => {
  const fd = new FormData();
  fd.append("name", this.state.name);
  fd.append("email", this.state.email);
  fd.append("about", this.state.about);
  fd.append("city", this.state.city);
  fd.append("country", this.state.country);
  fd.append("phone", this.state.phone);
  fd.append("phone_code", this.state.phone_code);
  fd.append("official_website", this.state.official_website);

  this.setState({ loading: true });
  axios
   .post(`${API}brand/update/${this.state.brand_id}`, fd)
   .then((response) => {
    const { store } = response.data;
    this.setState({
     loading: false,
     name: store.name,
     about:
      response.data.store?.about?.slice(0, 450).length > 450
       ? response.data.store?.about?.slice(0, 450).slice(0, 450)
       : response.data.store?.about?.slice(0, 450),

     full_about: store.about,
     logo: store.logo,
     collabsed_about:
      response.data.store?.about?.slice(0, 450).length > 450
       ? response.data.store?.about?.slice(0, 450).slice(0, 450)
       : response.data.store?.about?.slice(0, 450),
     aboutIsCollabsed: true,
    });
    toastifing.success("Brand Info Updated", {
     position: toast.POSITION.BOTTOM_LEFT,
     theme: "colored",
     transition: Flip,
    });
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

   this.setState({ brand_cover: cropped });

   this.setState({ cropped_profile: cropped });
   //  console.log(this.state.cropped_profile);
  });
 }
 onProfilePicSubmit = async (e) => {
  e.preventDefault();
  this.setState({
   // addProfileLoad: true,
   profile_modal: false,
   logo: this.state.cropped_profile,
  });
 };
 handleCategoryChange = (selectedCategory) => {
  this.setState(
   {
    selectedCategory,
    filter: true,
    selectedKind: selectedCategory.length === 0 ? "" : this.state.selectedKind,
   },
   () => {
    this.handleFilterChange();
   }
  );
 };
 handleKindChange = (selectedKind) => {
  this.setState({ selectedKind, filter: true }, () => {
   this.handleFilterChange();
  });
 };
 handleTypeChange = (selectedTypes) => {
  this.setState({ selectedTypes, filter: true }, () => {
   this.handleFilterChange();
  });
 };
 handleChangeCover = async () => {
  this.setState({
   cover: this.state.brand_cover,
   cover_loader: true,
  });
  const toastId = toast.loading(
   <>
    Saving <b className="px-1"> {this.state.name} </b> cover
   </>
  );

  const fd = new FormData();
  fd.append("store_id", this.state.brand_id);
  fd.append(
   "brand_cover",
   await compressImage(this.dataURLtoFile(this.state.brand_cover, "file"))
  );

  await axios
   .post(`${API}brandcover`, fd)
   .then((resp) => {
    toast.success("Cover Saved Succseffully ", {
     id: toastId,
    });
    this.setState({
     loading_cover: false,
     cover: resp.data.brand.cover,
     setting_cover: false,
    });
    this.setState((state) => ({
     store: { ...state.store, cover: resp.data.brand.cover },
     cover_loader: false,
    }));
   })
   .catch((err) => {
    toast.error("Error in saving cover, try again ", {
     id: toastId,
    });
   });
 };
 handleCityChange = (e) => {
  this.setState({ city: e.target.value });
  this.setState((state) => ({
   store: { ...state.store, city: e.target.value },
  }));
 };
 handleCountryChange = (e) => {
  this.setState({ country: e.target.value });
  this.setState((state) => ({
   store: { ...state.store, country: e.target.value },
  }));
 };
 handleNameChange = (e) => {
  this.setState({ name: e.target.value });
  this.setState((state) => ({
   store: {
    ...state.store,
    name: e.target.value,
   },
  }));
 };
 handlePhoneChange = (e) => {
  this.setState({ phone: e.target.value });
  this.setState((state) => ({
   store: { ...state.store, phone: e.target.value },
  }));
 };
 handleEmailChange = (e) => {
  this.setState({ email: e.target.value });
 };
 handleAboutChange = (e) => {
  this.setState({ about: e.target.value, full_about: e.target.value });
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
 hanldleUploadBrandCover = (e) => {
  // console.log(e);
  let file = e.target.files[0];
  if (!file) {
   return;
  }
  if (file.size > 1048576 * 1.5) {
   console.log("Size is to Large");
   return;
  } else {
   this.setState({
    cropper_src: URL.createObjectURL(file),
    setting_cover: true,
   });
  }
 };
 render() {
  const { brand } = this.state;
  const categories = [...new Set(this.state.addedCategories)];
  const types = this.state.addedTypes?.flat(1);
  let types_unique = [];

  return (
   this.state.brand && (
    <React.Fragment>
     <Toaster
      containerStyle={{
       top: 100,
      }}
      position="top-center"
      duration={1}
     />
     <div id="brand-container">
      <div className="section">
       <Row className="brand-cover-border-loader glowing">
        <Col span={24}>
         <div className="brand-cover">
          {this.state.setting_cover && (
           <>
            <Cropper
             id="brandcovercropper"
             src={this.state.cropper_src ?? ""}
             viewMode={1}
             dragMode={"move"}
             style={{
              height: "100%",
              width: "100%",
              position: "relative",
             }}
             // Cropper.js options
             ref={this.cropperRef}
             cropend={this._crop.bind(this)}
             ready={this._crop.bind(this)}
             crossOrigin="anonymous"
             aspectRatio={16 / 6}
             autoCropArea={1}
             responsive
             rotatable={false}
             movable={true}
             data={{
              x: 0,
              y: 0,
             }}
             toggleDragModeOnDblclick={false}
             cropBoxMovable={true}
             cropBoxResizable={true}
            />
           </>
          )}
          {this.state.cover && (
           <>
            <img src={this.state.cover} alt="" />
           </>
          )}
          {!this.cover && this.state.isOwner && (
           <>
            <div className="uplpoadbrandcover">
             <button>
              UPLODA COVER
              <input
               type="file"
               onChange={(e) => this.hanldleUploadBrandCover(e)}
              />
             </button>
            </div>
           </>
          )}
         </div>

         {this.state.isOwner && (
          <>
           {this.state.setting_cover ? (
            <>
             <button
              className="setbrandcover"
              onClick={() => this.handleChangeCover()}
             >
              {this.state.cover_loader ? (
               <Spin
                size="large"
                indicator={
                 <LoadingOutlined
                  style={{ fontSize: "30px", color: "#000" }}
                  spin
                 />
                }
               />
              ) : (
               "SET"
              )}
             </button>
            </>
           ) : this.state.cropper_src || this.state?.brand_cover?.length > 0 ? (
            <>
             <button
              className="changebrandcover"
              onClick={() => {
               // console.log(this.state);
              }}
             >
              {this.state.cover_loader ? (
               <Spin
                size="large"
                indicator={
                 <LoadingOutlined
                  style={{ fontSize: "30px", color: "#000" }}
                  spin
                 />
                }
               />
              ) : (
               "CHANGE"
              )}
              <input
               type="file"
               onChange={(e) => this.hanldleUploadBrandCover(e)}
              />
             </button>
            </>
           ) : (
            ""
           )}
          </>
         )}
        </Col>
       </Row>
       <Row>
        <Col md={5} sm={24} className="px-5">
         <div className="brand-profile">
          {this.state.logo ? (
           <>
            <img src={this.state.logo} alt="" />
           </>
          ) : (
           <>
            <span>{this.state.name[0]}</span>
           </>
          )}
         </div>
        </Col>
        <Col md={4} sm={24}>
         <div className="brand-info">
          <p className="name">{this.state.name}</p>
          <p className="entity">{brand.store.type}</p>
          <p className="location">{`${this.state.city ?? ""}`}</p>
         </div>
        </Col>
        <Col md={15} sm={24} style={{ textAlign: "right" }}>
         <div className="actions-btns">
          {this.state.official_website?.length > 5 && (
           <a
            href={this.state.official_website}
            rel="noreferrer"
            target="_blank"
           >
            <button className="wb">
             <span style={{ display: "inline-block", margin: "-2px 3px" }}>
              <IoEarthSharp />
             </span>
             Website
            </button>
           </a>
          )}
          <button className="shr">
           <span>
            <IoShareSocial />
           </span>
           Share
          </button>
          {!this.state.isOwner && (
           <>
            <button className="cnt" onClick={this.handleContact}>
             <span>
              <IoIosMail />
             </span>
             Contact
            </button>
            {this.state.is_A_Follower &&
             !this.state.isOwner &&
             this.state.isLoggedIn && (
              <button
               className="follow followed"
               onClick={() => this.handleUnfollowStore()}
              >
               {this.state.follow_loading ? (
                <>
                 <Spin
                  size="large"
                  indicator={
                   <LoadingOutlined
                    style={{ fontSize: "13px", color: "#000" }}
                    spin
                   />
                  }
                 />
                </>
               ) : (
                "Unfollow"
               )}
              </button>
             )}
           </>
          )}

          {this.state.isLoggedIn ? (
           <>
            {!this.state.is_A_Follower && !this.state.isOwner && (
             <>
              <button
               className="follow"
               onClick={() => this.handleFollowStore()}
              >
               {this.state.follow_loading ? (
                <Spin
                 size="large"
                 indicator={
                  <LoadingOutlined
                   style={{ fontSize: "13px", color: "#000" }}
                   spin
                  />
                 }
                />
               ) : (
                "Follow"
               )}
              </button>
             </>
            )}
           </>
          ) : (
           <>
            <button className="follow" onClick={() => this.handleFollowStore()}>
             Follow
            </button>
           </>
          )}
         </div>
        </Col>
       </Row>
      </div>
      <Row span={24}>
       <Col md={24}>
        <div className="content">
         <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Overview" key="1">
           <div className="overview-tab section">
            {this.state.about && this.state.about?.length > 15 ? (
             <>
              <Row className="mt-3 mb-4">
               <h6 className="bold">About</h6>
               <Col md={24}>
                <p className="py-3">
                 {this.state.aboutIsCollabsed &&
                  this.state.collabsed_about?.length > 10 && (
                   <>
                    {this.state.collabsed_about}
                    {this.state.collabsed_about < this.state.full_about && (
                     <>
                      <span
                       className="bold underline see"
                       onClick={() => {
                        this.seeMoreAbout();
                       }}
                      >
                       SEE MORE
                      </span>
                     </>
                    )}
                   </>
                  )}
                 {!this.state.aboutIsCollabsed &&
                  this.state.full_about.length > 10 && (
                   <>
                    {this.state.full_about}
                    {this.state.full_about &&
                     this.state.full_about.length > 450 && (
                      <>
                       <span
                        className="bold underline see"
                        onClick={() => {
                         this.seLessAbout();
                        }}
                       >
                        SEE LESS
                       </span>
                      </>
                     )}
                   </>
                  )}
                </p>
               </Col>
              </Row>
             </>
            ) : (
             ""
            )}
            {this.state.types.length > 0 && (
             <TypesSection
              types={this.state.types}
              brand_id={this.state.brand_id}
             />
            )}
            {this.state.collections?.length > 0 && (
             <CollectionsSection collections={this.state.collections} />
            )}
           </div>
          </TabPane>

          <TabPane
           tab="Products"
           key="2"
           className="section"
           style={{ position: "relative" }}
          >
           <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="py-5">
            <Col className="gutter-row" span={5}>
             <Select
              size="large"
              value={this.state.selectedCategory}
              onChange={this.handleCategoryChange}
              style={{ width: "100%" }}
             >
              <Select.Option key="All" value="">
               All
              </Select.Option>
              {categories.map((item) => (
               <Select.Option key={item} value={item}>
                {item}
               </Select.Option>
              ))}
             </Select>
            </Col>

            <Col className="gutter-row" span={5}>
             {this.state.selectedCategory.length > 0 && (
              <>
               <Select
                showSearch
                size="large"
                aria-placeholder={`All ${this.state.selectedCategory}`}
                value={this.state.selectedKind}
                onChange={this.handleKindChange}
                style={{ width: "100%" }}
               >
                {this.state.types.map((item) => (
                 <Select.Option key={item.id} value={item.name}>
                  {item.name}
                 </Select.Option>
                ))}
               </Select>
              </>
             )}
            </Col>

            <Col className="gutter-row" span={5}>
             {this.state.selectedKind.length > 0 &&
              this.state.selectedCategory.length > 0 && (
               <>
                <Select
                 showSearch
                 size="large"
                 value={this.state.selectedTypes}
                 onChange={this.handleTypeChange}
                 style={{ width: "100%" }}
                >
                 {types.map((item) => {
                  if (!types_unique.includes(item.value)) {
                   types_unique.push(item.value);
                   return (
                    <Select.Option key={item.value} value={item.value}>
                     {item.value}
                    </Select.Option>
                   );
                  }
                 })}
                </Select>
               </>
              )}
            </Col>

            <Col className="gutter-row" md={9}>
             <p className="count">
              <span>{this.state.products.length}</span> Products
             </p>
            </Col>
           </Row>
           <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="py-5">
            {this.state.isOwner && this.props.isLoggedIn && (
             <>
              <Col className="gutter-row" span={6}>
               <a
                href={`/add-product/${this.state.brand_id}`}
                className="arch-link"
               >
                <div className="product">
                 <div className="p-img" style={{ opacity: "0.03" }}></div>
                 <div className="plus-icon">
                  <AiOutlinePlus />
                  Add Product
                 </div>
                </div>
               </a>
              </Col>
             </>
            )}

            {this.state.productLoading && (
             <>
              <Spin
               size="large"
               indicator={
                <LoadingOutlined
                 style={{ fontSize: "36px", color: "#000" }}
                 spin
                />
               }
               style={{
                position: "absolute",
                top: "20%",
                right: "35%",

                minHeight: 400,
               }}
              />
             </>
            )}
            {!this.state.productLoading && (
             <>
              {this.state.products?.map((product, index) => {
               if (!this.state.filter) {
                return (
                 <>
                  <Col className="gutter-row" span={6}>
                   <a href={`/product/${product.id}`}>
                    <div className="product">
                     <div
                      className="p-img"
                      style={{
                       background: `url(${product.identity[0]?.preview_cover})`,
                      }}
                     >
                      <div className="prlayer"></div>
                      {product?.files?.length > 0 ? (
                       <>
                        <div className="actns-btn file-btn cad">CAD</div>
                        <div className="actns-btn file-btn threeD">3D</div>
                       </>
                      ) : (
                       ""
                      )}
                     </div>
                     <h5 className="product-store">{brand.store.name}</h5>
                     <p className="product-name">{product.identity[0]?.name}</p>
                     <div className="product-price">
                      {product.identity[0].preview_price &&
                      product.identity[0].preview_price > 0 ? (
                       <>
                        <span>¥ {product.identity[0].preview_price}</span>
                       </>
                      ) : (
                       <>
                        <Link
                         to={{
                          pathname: `/product/${product?.identity[0].product_id}`,
                          state: {
                           request_price: true,
                          },
                         }}
                        >
                         REQUEST PRICE INFO
                        </Link>
                       </>
                      )}
                     </div>
                    </div>
                   </a>
                  </Col>
                 </>
                );
               } else {
                return (
                 <>
                  <Col className="gutter-row" span={6}>
                   <a href={`/product/${product.product_id}`}>
                    <div className="product">
                     <div
                      className="p-img"
                      style={{
                       background: `url(${product.preview_cover})`,
                      }}
                     ></div>
                     <h5 className="product-store">{brand.store.name}</h5>
                     <p className="product-name">{product.name}</p>
                     <div className="product-price">
                      {product.preview_price ?? (
                       <>
                        <span>¥ {product.preview_price}</span>
                       </>
                      )}
                     </div>
                    </div>
                   </a>
                  </Col>
                 </>
                );
               }
              })}
             </>
            )}
           </Row>
          </TabPane>

          <TabPane tab="Projects" key="3" className="section">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Blogs" key="4" className="section">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Reseller" key="5" className="section">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Shworooms" key="6" className="section">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Designers" key="7" className="section">
           Content of Tab Pane 3
          </TabPane>
          {this.state.isOwner && this.props.isLoggedIn ? (
           <>
            <TabPane tab="Settings" key="8" className="section">
             <>
              <div id="user-settings">
               <Row gutter={16} style={{ marginBottom: "70px" }}>
                <Col span={12}>
                 <h2 className="edit-head">Edit Profile</h2>
                </Col>
               </Row>
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
                  {this.state.logo ? (
                   <>
                    <img src={this.state.logo} alt={this.state.name} />
                   </>
                  ) : (
                   <>
                    <img src={blank} alt="" />
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
                <Col md={8}>
                 <div className="profile-form">
                  <Col span={24} className="mb-3">
                   <Form.Label>Name</Form.Label>
                   <Form.Control
                    placeholder="Name"
                    onChange={this.handleNameChange}
                    value={this.state.name}
                   />
                  </Col>
                  <Col span={24} className="mb-3">
                   <Form.Label>Country</Form.Label>

                   <ReactFlagsSelect
                    selected={this.state.country}
                    selectedSize={20}
                    optionsSize={20}
                    searchable
                    onSelect={(country) => {
                     this.setState({ country });
                     console.log(country);
                    }}
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
                 </div>
                </Col>
               </Row>
               <Row gutter={16} style={{ marginBottom: "70px" }}>
                <Col span={16}>
                 <Form.Label>About</Form.Label>
                 <Form.Control
                  as="textarea"
                  placeholder="About"
                  onChange={this.handleAboutChange}
                  value={
                   this.state.full_about == "null" ? "" : this.state.full_about
                  }
                  style={{ height: "300px" }}
                 />
                </Col>
               </Row>
               <Row
                gutter={16}
                className="mt-3"
                style={{ marginBottom: "70px" }}
               >
                <Col span={12}>
                 <h2 className="edit-head mb-5">Contact</h2>
                 <Row gutter={12}>
                  <Col span={12}>
                   <div style={{ width: "100%" }} className="bold">
                    Website
                   </div>
                   <div>
                    <Input
                     style={{ width: "100%", height: 48 }}
                     className="py-1"
                     size="large"
                     value={this.state.official_website}
                     onChange={(e) => {
                      this.setState({ official_website: e.target.value });
                     }}
                    />
                   </div>
                  </Col>
                  <Col span={12}>
                   <div style={{ width: "100%" }} className="bold">
                    Phone
                   </div>
                   <div>
                    <ConfigProvider
                     locale={en}
                     areaMapper={(area) => {
                      return {
                       ...area,
                       emoji: (
                        <span className={`fp ${area.short.toLowerCase()}`} />
                       ),
                      };
                     }}
                    >
                     <CountryPhoneInput
                      size="large"
                      value={{
                       code: this.state.phone_code,
                       phone: this.state.phone,
                      }}
                      onChange={(e) => {
                       this.setState({
                        phone: e.phone,
                        phone_number: e.phone,
                        phone_code: e.code,
                       });
                      }}
                     />
                    </ConfigProvider>
                   </div>
                  </Col>
                  <Col span={12}>
                   <Col className="mt-2 px-0">
                    <div style={{ width: "100%" }} className="bold">
                     Email
                    </div>
                    <div>
                     <Input
                      style={{ width: "100%", height: 48 }}
                      size="large"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                     />
                    </div>
                   </Col>
                  </Col>
                 </Row>
                </Col>
               </Row>
               <Row span={{ span: 24 }} className="py-3">
                <Col md={3} style={{ padding: "0" }}>
                 <Button
                  style={{
                   display: "block",
                   width: "120px",
                   background: "rgb(167 167 167)",
                   textAlign: "center",
                   border: "none",
                  }}
                 >
                  Cancel
                 </Button>
                </Col>
                <Col md={3}>
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
                     width: "120px",
                     textAlign: "center",
                     border: "none",
                     //  margin: "0 8px",
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
     {/* signup/signin modals */}
     <Modal
      size="lg"
      className="auth-modal"
      show={this.state.authModal}
      onHide={() => this.setState({ authModal: false })}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
     >
      <Modal.Body>
       <div className={`flip-box`}>
        <div className={`flip-box-inner ${this.state.authFace}`}>
         <div className="flip-box-front p-5">
          <h2 className="auth-modal-head">Sign in</h2>
          <Row gutter>
           <Col span={24} className="gutter-row my-1">
            <Button
             className="w-100 f-auth-modal"
             size="large"
             onClick={() => {
              this.props.dispatchFacebookSignup();
              this.setState({ authModal: false });
             }}
            >
             <div className="auth-btn-cntr">
              <div className="auth-icon" style={{ color: "#1256ad" }}>
               <FaFacebookF />
              </div>
              <p>Login with Facebook</p>
             </div>
            </Button>
           </Col>
          </Row>
          <Row className="gutter-row my-1">
           <Col span={24}>
            <Button
             className="w-100 g-auth-modal"
             size="large"
             onClick={() => {
              this.props.dispatchGoogleSignup();
              this.setState({ authModal: false });
             }}
            >
             <div className="auth-btn-cntr">
              <div className="auth-icon">
               <FcGoogle />
              </div>
              <p>Login with Google</p>
             </div>
            </Button>
           </Col>
          </Row>
          <div className="form-separator"></div>
          <Row className="gutter-row mb-2">
           <Col span={24} style={{ background: "" }}>
            <Input
             placeholder="email"
             size="large"
             onChange={(e) => this.setState({ signingEmail: e.target.value })}
            />
           </Col>
          </Row>
          <Row className="gutter-row">
           <Col span={24} style={{ background: "" }}>
            <Input
             placeholder="password"
             size="large"
             type="password"
             onChange={(e) => this.setState({ signinPassword: e.target.value })}
            />
           </Col>
          </Row>
          <Row>
           <Col span={24}>
            <Button
             size="large"
             className="w-100 r-auth-modal"
             onClick={() => {
              this.handleSigningIn(
               this.state.signingEmail,
               this.state.signinPassword
              );
             }}
            >
             {this.state.signingIn && !this.props.isLoggedIn ? (
              <>
               <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
              </>
             ) : (
              <>Login</>
             )}
             {/* Login */}
            </Button>
           </Col>
           <Col span={24}>
            <div className="w-100 link-bold">forget your password?</div>
           </Col>
          </Row>
          <Row>
           <Col span={24}>
            <div className="auth-modal-footer">
             Don't have an account yet?
             <span
              className="link-bold black"
              onClick={this.flipToRegiseterFace}
             >
              Subscribe
             </span>
            </div>
           </Col>
          </Row>
         </div>
         <div className={`flip-box-back p-5 ${this.state.authFace}`}>
          {/* <h2>JOIN ARCH17</h2> */}
          <h2 className="auth-modal-head">Sign up</h2>
          <Row gutter>
           <Col span={24} className="gutter-row my-1">
            <Button
             className="w-100 f-auth-modal"
             size="large"
             onClick={() => {
              this.props.dispatchFacebookSignup();
              this.setState({ authModal: false });
             }}
            >
             <div className="auth-btn-cntr">
              <div className="auth-icon" style={{ color: "#1256ad" }}>
               <FaFacebookF />
              </div>
              <p>Signup with Facebook</p>
             </div>
            </Button>
           </Col>
          </Row>
          <Row className="gutter-row my-1">
           <Col span={24}>
            <Button
             className="w-100 g-auth-modal"
             size="large"
             onClick={() => {
              this.props.dispatchGoogleSignup();
              this.setState({ authModal: false });
             }}
            >
             <div className="auth-btn-cntr">
              <div className="auth-icon">
               <FcGoogle />
              </div>
              <p>Signup with Google</p>
             </div>
            </Button>
           </Col>
          </Row>
          <div className="form-separator"></div>
          <Row gutter={16} span={24} className="gutter-row mb-2">
           <Col span={12}>
            <Input
             placeholder="First Name"
             size="large"
             // value={this.state.signupFname}
             onChange={(e) => this.setState({ signupFname: e.target.value })}
            />
           </Col>
           <Col span={12} style={{ background: "" }}>
            <Input
             placeholder="Last name"
             size="large"
             onChange={(e) => this.setState({ signupLname: e.target.value })}
            />
           </Col>
          </Row>
          <Row className="gutter-row mb-2">
           <Col span={24} style={{ background: "" }}>
            <Input
             placeholder="email"
             size="large"
             onChange={(e) => this.setState({ signupEmail: e.target.value })}
            />
           </Col>
          </Row>
          <Row className="gutter-row">
           <Col span={24} style={{ background: "" }}>
            <Input
             placeholder="password"
             size="large"
             type="password"
             onChange={(e) => this.setState({ signupPassword: e.target.value })}
            />
           </Col>
          </Row>
          <Row>
           <Col span={24}>
            <Button
             size="large"
             className="w-100 r-auth-modal"
             onClick={() => {
              this.handleRegularSignup(
               this.state.signupFname,
               this.state.signupLname,
               this.state.signupEmail,
               this.state.signupPassword
              );
             }}
            >
             Create an Account
            </Button>
           </Col>
          </Row>
          <Row>
           <Col span={24}>
            <div className="auth-modal-footer">
             Already have an account?
             <span className="link-bold black" onClick={this.flipToSigninFace}>
              Login
             </span>
            </div>
           </Col>
          </Row>
          {/* <AntButton onClick={this.flipToSigninFace}>Join</AntButton> */}
         </div>
        </div>
       </div>
      </Modal.Body>
     </Modal>
     <>
      {/* profile modal */}
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
          <Button variant="danger" onClick={this.handleUpdateLogo}>
           {this.state.addProfileLoad ? (
            <>
             <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
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
    </React.Fragment>
   )
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 dispatchRegularSignup: (fname, lname, email, password, method) =>
  dispatch(signupEmailPassword(fname, lname, email, password, method)),
 dispatchRegularSignin: (email, password) =>
  dispatch(vanillaSigninEmailPassword(email, password)),
 dispatchFacebookSignup: () => dispatch(signupFacebook()),
 dispatchGoogleSignup: () => dispatch(signupGoogle()),
});
const mapStateToProps = (state) => {
 return {
  userInfo: state.regularUser.info,
  isLoggedIn: state.regularUser.isLoggedIn,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(Brand);
