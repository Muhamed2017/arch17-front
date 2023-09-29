import React, { Component } from "react";
import logo from "../../src/logo-gray.png";
import { toast, Flip } from "react-toastify";
import { auth } from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { GiHamburgerMenu } from "react-icons/gi";
import { TreeSelect, Spin, Input, Button } from "antd";
import {
 LoadingOutlined,
 //  SearchOutlined,
 CloseOutlined,
} from "@ant-design/icons";
import "./Nav.css";

import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

import {
 Container,
 Navbar,
 Nav,
 Form,
 FormControl,
 NavDropdown,
 Modal,
 Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
 logginOut,
 phoneSignupSuccess,
 setUserInfoAction,
 updateInfo,
} from "../redux/actions/authActions";
import axios from "axios";
import { presistInfo } from "./../redux/actions/authActions";
import { setMenu } from "./../redux/actions/componentActions";
import { API } from "./../utitlties";
import {
 setSearchTerm,
 setAllBrands,
} from "./../redux/actions/addProductActions";
import Notifications from "./Notifications";
import SearchMobileSideMenu from "./SearchMobileSideMenu";
import { setProjectTypeSearch } from "../redux/actions/addProjectActions";
// const { Search } = Input;
export const furniture = [
 "Cabinets",
 "Beds",
 "Bencheds",
 "Blindes",
 "Benches",
 "Chairs",
 "Sofa",
 "Table",
 "Chests",
 "Poufs",
 "Office",
 "Wall Decorations",
 "Wall Shelves",
 "Window Shades",
 "Chaise Lounges",
 "Sitting Ball",
 "Furniture Component and Hardware",
 "Wardrobes",
 "Walk-in Wardrobes",
 "religious art",
 "sculptures",
 "Storage walls",
 "Shelves",
 "specialty casework",
 "Tatami",
 "Food trolleys",
];
export const lightings = [
 "Bollard lights",
 "Pendant lamps",
 "Chandeliers",
 "Ceiling fan light fixture",
 "Ceiling lamps",
 "Decorative & artistic lights",
 "Emergency Light",
 "Floor lamps",
];

export const treeData = [
 {
  title: "All Items",
  value: "all",
 },
 {
  title: "Products",
  value: "Products",
 },
 {
  title: "Brands",
  value: "Brands",
 },
 {
  title: "Magazine",
  value: "Projects",
 },
 {
  title: "Designers",
  value: "Designers",
 },
];

class NavigationBar extends Component {
 constructor(props) {
  super(props);
  this.state = {
   photoURL: this.props.photoURL ?? this.props.userInfo.info?.photoUrl,
   user: auth.currentUser ?? null,
   displayName: this.props.displayName ?? "",
   vCode: "",
   verifying: false,
   validate_modal: false,
   sendingVcode: false,
   verified: this.props.userInfo?.info?.emailVerified,
   search_list: false,
   searchValue: "",
   searchData: {},
   filteredFurniture: [],
   furniture: [],
   filteredBrands: [],
   filteredDesigners: [],
   filteredCompanies: [],
   filterProjects: [],
   filteredLightings: [],
   lightings: [],
   search_mobile: false,
   searchDataLoaded: false,
   selected_search: "",
   selected: false,
   typeSelected: "",
   //  value: "all",
   value: window.location.pathname.includes("/design-selected")
    ? "Projects"
    : "all",
   search_list_loading: false,
   status: "process",
   projects: [
    "Airport",
    "Animal & Hospital and Clinic",
    "Apartmant",
    "Bus Station",
    "Café",
    "Cathedral",
    "Chapal",
    "Churches",
    "Cinema",
    "City Planning",
    "Clinic",
    "Club",
    "Coffee shop",
    "Dorms",
    "Exhibit Design",
    "Football Stadium",
    "Furniture Design",
    "Garden & Plaza",
    "Grocery Store",
    "Gym & Fitness Design",
    "Home Design",
    "Hospital",
    "Hostel",
    "Hotel",
    "Restaurant",
    "House",
    "Housing",
    "Kid Garden",
    "Loft Appartment",
    "Lighting Design",
    "Material Design",
    "Master Plan",
    "Monastery",
    "Mosque",
    "Motel",
    "Mueseum",
    "Night Club",
    "Office",
    "Opera House",
    "Pavilion",
    "Penthouse",
    "Parmacy",
    "Port",
    "Praying Room",
    "Residence",
    "Sales Center",
    "Schoole",
    "Shopping Mall",
    "Show Room",
    "Spa & Sauna",
    "Store",
    "Super Market",
    "Swimming Pool",
    "Synagogue",
    "Tea House",
    "Tea Shop",
    "Temple",
    "Temporary Store",
    "Theater",
    "University & Institute",
   ],

   myBrands: [],
  };
 }
 handleLogout = () => {
  auth.signOut().then(() => {
   this.props.dispatchLogOut();
  });
 };

 onSearchMenuChange = (value) => {
  console.log(value);
  this.setState({ value, selected_search: value });
 };

 searching = (value) => {
  console.log(this.state.search_list);
  console.log(value);
  this.setState({ searchValue: value });
  console.log(value);
  if (value.length > 0) {
   this.setState({ search_list: true });
   if (!this.state.searchDataLoaded) {
    this.setState({
     search_list_loading: true,
    });
   } else {
    console.log(this.state.searchData);
    this.setState({
     filteredFurniture: this.state.furniture?.filter((product) => {
      return product?.toLowerCase().includes(value.toLowerCase());
     }),
     filteredLightings: this.state.lightings?.filter((product) => {
      return product?.toLowerCase().includes(value.toLowerCase());
     }),
     filteredBrands: this.state.searchData?.brands?.filter((brand) => {
      return brand?.name?.toLowerCase().includes(value.toLowerCase());
     }),
     filteredDesigners: this.state.searchData?.designers?.filter((d) => {
      return d?.displayName?.toLowerCase().includes(value.toLowerCase());
     }),
     filteredCompanies: this.state.searchData?.companies?.filter((c) => {
      return c?.name?.toLowerCase().includes(value.toLowerCase());
     }),
     filterProjects: this.state.projects?.filter((project) => {
      return project?.toLowerCase().includes(value.toLowerCase());
     }),
    });
    return;
   }
  } else {
   this.setState({ search_list: false });
  }
 };

 componentDidMount() {
  console.log(this.props);
  console.log(window.location.pathname);
  axios
   .get(`${API}searchbar`)
   .then((response) => {
    this.setState(
     {
      searchDataLoaded: true,
      searchData: response.data,
      furniture,
      lightings,
      filteredFurniture: furniture,
      filteredLightings: lightings,
      filteredBrands: response.data.brands,
      search_list_loading: false,
     },
     () => {
      this.setState({
       filteredFurniture: this.state.furniture?.filter((product) => {
        return product
         ?.toLowerCase()
         .includes(this.state.searchValue.toLowerCase());
       }),
       filteredLightings: this.state.lightings?.filter((product) => {
        return product
         ?.toLowerCase()
         .includes(this.state.searchValue.toLowerCase());
       }),
       filteredBrands: this.state.searchData?.brands?.filter((brand) => {
        return brand?.name
         ?.toLowerCase()
         .includes(this.state.searchValue.toLowerCase());
       }),
       filteredDesigners: this.state.searchData?.designers?.filter((d) => {
        return d?.displayName
         ?.toLowerCase()
         .includes(this.state.searchValue.toLowerCase());
       }),
       filteredCompanies: this.state.searchData?.companies?.filter((c) => {
        return c?.name
         ?.toLowerCase()
         .includes(this.state.searchValue.toLowerCase());
       }),

       myBrands: this.props.isLoggedIn
        ? this.state.searchData?.brands?.filter((brand) => {
           return brand.user_id === this.props.info?.uid;
          })
        : [],
      });
     }
    );
    console.log(response);
    this.props.setAllBrands(response.data.brands);
   })
   .catch((error) => {
    console.log(error);
   });
 }
 onChangeVcode = (e) => {
  this.setState({ vCode: e.target.value });
 };

 validate_modal_close = () => {
  this.setState({ validate_modal: false });
 };

 sendVerificationCode = () => {
  if (auth.currentUser || this.props.info) {
   this.setState({ sendingVcode: true });
   this.setState({ verifying: true });
   const fd = new FormData();
   fd.append("uid", this.props.info?.uid);
   axios.post(`${API}user`, fd).then((response) => {
    console.log(response);
    this.setState({
     validate_modal: true,
     verifying: false,
     sendingVcode: false,
    });
   });
  }
 };

 verify = () => {
  if (auth.currentUser || this.props.isLoggedIn) {
   let code = this.state.vCode;
   this.setState({ verifying: true });
   const fd = new FormData();
   fd.append("uid", this.props.info.uid);
   fd.append("code", code);
   axios
    .post(`${API}validate-code`, fd)
    .then((response) => {
     console.log(response);
     this.props.updateInfo(response.data.user);
     presistInfo(response.data.user, true);
     this.setState({
      verifying: false,
      validate_modal: false,
      verified: true,
      status: "success",
     });
     toast.success("Your email has been verified", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
      transition: Flip,
      autoClose: 3000,
      toastId: "nav-msg",
     });
    })

    .catch((error) => {
     this.setState({
      status: "success",
     });
     console.log(error);
    });
  }
 };

 handleSearchMobileField = () => {
  const { search_mobile } = this.state;
  this.setState({
   search_mobile: !search_mobile,
   searchValue: "",
  });
 };
 onSearch = () => {};
 render() {
  const { page_url } = window.location.pathname;
  return (
   <>
    {/* {this.state.value === "Products" && <Redirect to="/products" />} */}
    {this.state.value === "Products" && <Redirect to="/categories" />}
    {this.state.value === "Projects" && <Redirect to="/design-selected" />}
    {this.state.value === "Brands" && <Redirect to="/brands" />}
    {this.state.value === "Designers" && <Redirect to="/designers" />}
    <div
     id="navigation-component"
     className="w-100 bg-white navbar-border-bottom sticky-top"
    >
     <Container>
      <div className="wide-nav-view">
       <Navbar bg="white" expand="md" sticky="top">
        <Navbar.Brand>
         <Router>
          <a href="/">
           <img id="nav-logo" src={logo} alt="Logo" />
          </a>
         </Router>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         <Form
          inline
          className="nav-search rounded col-md-6 search-dropdown"
          style={{ display: "inherit", position: "relative" }}
         >
          <TreeSelect
           style={{
            width: 165,
            textAlign: "center",
            fontWeight: 600,
            backgroundColor: "rgb(242 242 242)",
            borderTopLeftRadius: "7px",
            borderBottomLeftRadius: "7px",
           }}
           value={
            page_url?.includes("/design-selected")
             ? "Projects"
             : this.state.value
           }
           //  value={this.state.value}
           size={"large"}
           bordered={false}
           dropdownStyle={{
            paddingTop: "20px",
            overflow: "auto",
            minWidth: 145,
           }}
           treeData={treeData}
           //  defaultValue={
           //   page_url?.includes("/design-selected") ? "Projects" : "all"
           //  }
           treeDefaultExpandAll
           onChange={this.onSearchMenuChange}
          />
          <div
           className={
            this.state.search_list_loading
             ? "search-bar-input search-loading"
             : "search-bar-input"
           }
          >
           <FormControl
            value={this.state.searchValue}
            type="text"
            placeholder={`Search ${
             this.state.value === "Projects"
              ? `Office, Hotel, Cafe`
              : `${this.state.value}`
            }`}
            className="mr-sm-2 border-0"
            onChange={(e) => this.searching(e.target.value)}
           />
           {this.state.search_list_loading && (
            <Spin
             size="large"
             indicator={
              <LoadingOutlined
               style={{ fontSize: "16px", color: "#555" }}
               spin
              />
             }
             style={{
              position: "absolute",
              top: "12px",
              right: "8px",
              width: "50px",
              zIndex: 5,
             }}
            />
           )}
          </div>
          {this.state.search_list && (
           <>
            <div
             className="col-md-5"
             id="search-list"
             style={{
              position: "absolute",
              top: 45,
              width: "100%",
              right: 0,
              left: 0,
              maxHeight:'550px',
              overflowY:'auto',
              minHeight: "250px",
              borderTopRightRadius: "2px",
              borderTopLeftRadius: "2px",
              background: "#fff",
              border: "1px solid #ddd",
              borderTop: "0",
             }}
            >
             {this.state.value === "all" && this.state.searchDataLoaded && (
              <ul>
               {this.state.filteredFurniture?.length > 0 && (
                <>
                 <li>
                  Furniture
                  <ul className="inner-list">
                   {this.state.filteredFurniture.map((product, index) => {
                    if (index <= 13) {
                     return (
                      <>
                       <a
                        href={`/products?category=furniture&kinds=${product}`}
                       >
                        <li
                         onClick={() => {
                          this.setState({
                           search_list: false,
                           searchValue: product,
                          });
                          console.log(product);
                          this.props.setSearchTerm(product);
                         }}
                        >
                         {product}
                        </li>
                       </a>
                      </>
                     );
                    }
                   })}
                  </ul>
                 </li>
                </>
               )}
               {this.state.filteredLightings.length > 0 && (
                <>
                 <li>
                  Lightings
                  <ul className="inner-list">
                   {this.state.filteredLightings.map((product, index) => {
                    if (index <= 15) {
                     return (
                      <>
                       <a href={`/products?category=lighting&kinds=${product}`}>
                        <li
                         onClick={() => {
                          this.setState({
                           search_list: false,
                           searchValue: product,
                          });
                          console.log(product);
                          this.props.setSearchTerm(product);
                         }}
                        >
                         {product}
                        </li>
                       </a>
                      </>
                     );
                    }
                   })}
                  </ul>
                 </li>
                </>
               )}
               {this.state.filteredBrands?.length > 0 && (
                <>
                 <li>
                  Brands
                  <ul className="inner-list">
                   {this.state.filteredBrands.map((brand, index) => {
                    return (
                     <>
                      <li>
                       <a href={`/brand/${brand.id}`}>{brand.name}</a>
                      </li>
                     </>
                    );
                   })}
                  </ul>
                 </li>
                </>
               )}
               <li>
                {this.state.filterProjects.length > 0 && (
                 <>
                  Projects
                  <ul className="inner-list">
                   {this.state.filterProjects.map((project, index) => {
                    return (
                     <a href={`/design-selected?types=${project}`}>
                      <li>{project}</li>
                     </a>
                    );
                   })}
                  </ul>
                 </>
                )}
               </li>
               {this.state.filteredDesigners?.length > 0 && (
                <>
                 <li>
                  Designers
                  <ul className="inner-list">
                   {this.state.filteredDesigners.map((designer, index) => {
                    return (
                     <>
                      <li>
                       <a href={`/user/${designer.uid}`}>
                        {designer.displayName}
                       </a>
                      </li>
                     </>
                    );
                   })}
                  </ul>
                 </li>
                </>
               )}
               {this.state.filteredCompanies?.length > 0 && (
                <>
                 <li>
                  Design Companies
                  <ul className="inner-list">
                   {this.state.filteredCompanies.map((company, index) => {
                    return (
                     <>
                      <li>
                       <a href={`/company/${company.id}`}>{company.name}</a>
                      </li>
                     </>
                    );
                   })}
                  </ul>
                 </li>
                </>
               )}
              </ul>
             )}
             {this.state.value === "Brands" && this.state.searchDataLoaded && (
              <ul>
               {this.state.filteredBrands?.length > 0 && (
                <>
                 <li>
                  Brands
                  <ul className="inner-list">
                   {this.state.filteredBrands.map((brand, index) => {
                    return (
                     <>
                      <li>
                       <a href={`/brand/${brand.id}`}>{brand.name}</a>
                      </li>
                     </>
                    );
                   })}
                  </ul>
                 </li>
                </>
               )}
              </ul>
             )}
             {this.state.value === "Products" && this.state.searchDataLoaded && (
              <ul>
               {this.state.filteredFurniture?.length > 0 && (
                <>
                 <li>
                  Furnitures
                  <ul className="inner-list">
                   {this.state.filteredFurniture.map((product, index) => {
                    if (index <= 9) {
                     return (
                      <>
                       <Link
                        to={{
                         pathname: `/products/furniture/${product}`,
                         state: {
                          selected_kind: product,
                         },
                        }}
                       >
                        <li
                         onClick={() => {
                          this.setState({
                           search_list: false,
                           searchValue: product,
                          });
                          console.log(product);
                          this.props.setSearchTerm(product);
                         }}
                        >
                         {product}
                        </li>
                       </Link>
                      </>
                     );
                    }
                   })}
                  </ul>
                 </li>
                </>
               )}
               {this.state.filteredLightings.length > 0 && (
                <>
                 <li>
                  Lightings
                  <ul className="inner-list">
                   {this.state.filteredLightings.map((product, index) => {
                    if (index <= 9) {
                     return (
                      <>
                       <Link
                        to={{
                         pathname: `/products/furniture/${product}`,
                         state: {
                          selected_kind: product,
                         },
                        }}
                       >
                        <li
                         onClick={() => {
                          this.setState({
                           search_list: false,
                           searchValue: product,
                          });
                          console.log(product);
                          this.props.setSearchTerm(product);
                         }}
                        >
                         {product}
                        </li>
                       </Link>
                      </>
                     );
                    }
                   })}
                  </ul>
                 </li>
                </>
               )}
              </ul>
             )}
             {this.state.value === "Projects" && (
              <ul>
               <li>
                Projects
                <ul className="inner-list">
                 {this.state.filterProjects?.map((project, index) => {
                  return (
                   <li
                    className="pointer"
                    onClick={() => {
                     console.log("TYPE ADDED");
                     this.setState(
                      {
                       search_list: false,
                       searchValue: "",
                      },
                      () => {
                       this.props.dispatchSetMagazineType(project);
                      }
                     );
                    }}
                    key={index}
                   >
                    {project}
                   </li>
                  );
                 })}
                </ul>
               </li>
              </ul>
             )}
             {this.state.value === "Designers" && (
              <ul>
               <li>
                Designers
                <ul className="inner-list">
                 {this.state.filteredDesigners?.map((designer, index) => {
                  return (
                   <li className="pointer" key={index}>
                    {/* {designer?.displayName} */}
                    <a href={`/user/${designer?.uid}`}>
                     {designer?.displayName}
                    </a>
                   </li>
                  );
                 })}
                </ul>
               </li>
               <li>
                Design Companies
                <ul className="inner-list">
                 {this.state.filteredCompanies?.map((company, index) => {
                  return (
                   <li className="pointer" key={index}>
                    <a href={`/company/${company?.id}`}>{company?.name}</a>
                   </li>
                  );
                 })}
                </ul>
               </li>
              </ul>
             )}
            </div>
           </>
          )}
         </Form>
         <Nav className="ml-auto">
          {this.props.userInfo.isLoggedIn === false ? (
           <React.Fragment>
            <a href="/signup" className="nav-link">
             Register
            </a>
            <a href="/signin" className="nav-link">
             Login
            </a>
           </React.Fragment>
          ) : (
           <>
            <div
             style={{
              fontSize: "1.7rem",
              paddingTop: "1px",
              color: "#797979",
             }}
            >
             <Notifications />
            </div>
            <div
             style={{
              margin: "0 20px",
              width: "1px",
              height: "50px",
              borderRight: "1px solid #EAEAEA",
             }}
            ></div>
            <div
             style={{
              width: "38px",
              height: "38px",
              paddingTop: "5px",
              borderRadius: "50%",
              alignItems: "center",
              textAlign: "center",
              display: "grid",
              fontSize: "1.5rem",
              fontWeight: "600",

              background:
               this.props.userInfo?.info?.photoURL &&
               this.props.userInfo?.info?.photoURL?.length > 5
                ? "transparent"
                : "#ddd",
             }}
            >
             {this.props?.userInfo?.info?.photoURL &&
             this.props?.userInfo?.info?.photoURL?.length > 5 ? (
              <img
               style={{ display: "block", borderRadius: "50%" }}
               src={this.props?.photoURL ?? this.props.userInfo?.info?.photoUrl}
               alt=""
              />
             ) : (
              <span>{this.props.userInfo.info?.displayName[0]}</span>
             )}
            </div>

            <NavDropdown
             alignRight
             className="archnav-dropdown"
             title={
              this.props.displayName ?? this.props.userInfo.user?.displayName
              // this.props.userInfo.user?.displayName
             }
             style={{
              paddingTop: "5px",
              fontWeight: "600",
              fontFamily: "Roboto",
              color: "#000",
              fontSize: "1.1rem",
             }}
             id="basic-nav-dropdown"
            >
             <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

             <NavDropdown.Divider />
             {this.state.myBrands?.length > 0 && (
              <p className="strs">Brands/ Stores</p>
             )}
             {this.state.myBrands?.map((brand, index) => {
              return (
               <>
                {index < 3 && (
                 <NavDropdown.Item href={`/brand/${brand?.id}`} key={index}>
                  {brand?.logo && brand?.logo?.length > 10 ? (
                   <span
                    className="br-img"
                    style={{
                     backgroundImage: `url(${brand.logo})`,
                    }}
                   ></span>
                  ) : (
                   <span className="br-img">{brand?.name[0]}</span>
                  )}
                  <span className="br-name">{brand?.name}</span>
                 </NavDropdown.Item>
                )}
               </>
              );
             })}

             {this.state.myBrands?.length > 2 && (
              <>
               <a href="/profile" className="navanchor">
                See all
               </a>
              </>
             )}
             {this.state.myBrands?.length > 0 && <NavDropdown.Divider />}

             <NavDropdown.Item onClick={this.handleLogout}>
              Logout
             </NavDropdown.Item>
            </NavDropdown>
           </>
          )}
         </Nav>
        </Navbar.Collapse>
       </Navbar>
      </div>
      <div className="mobile-nav-view">
       <Navbar bg="white" expand="md" sticky="top">
        <Navbar.Brand>
         <Router>
          <a href="/">
           <img id="nav-logo" src={logo} alt="Logo" />
          </a>
         </Router>
        </Navbar.Brand>
        <div></div>
        <Button
         style={{
          fontSize: "26px",
          color: "#000000d1",
         }}
         className="search-nav-btn"
         //  onClick={this.handleSearchMobileField}
         onClick={() => {
          this.props.dispatchSetMenu(true);
          if (typeof window != "undefined" && window.document) {
           document.body.style.overflow = "hidden";
           document.body.style.height = "100vh";
           console.log("SET HIDDEN");
          }
          console.log("MMMMME");
         }}
        >
         {/* <SearchOutlined /> */}
         <GiHamburgerMenu />
        </Button>
        {this.props.isLoggedIn ? (
         <NavDropdown
          alignRight
          className="archnav-dropdown"
          title={
           this.props.userInfo?.info?.photoURL &&
           this.props.userInfo?.info?.photoURL?.length > 5 ? (
            <img
             style={{
              display: "block",
              borderRadius: "50%",
              width: "38px",
              height: "38px",
             }}
             src={this.props?.photoURL ?? this.props.userInfo?.info?.photoUrl}
             alt=""
            />
           ) : (
            <div
             className="nav-avatar"
             style={{
              width: "38px",
              height: "38px",
              paddingTop: "5px",
              borderRadius: "50%",
              alignItems: "center",
              textAlign: "center",
              display: "grid",
              fontSize: "1.5rem",
              fontWeight: "600",

              background:
               this.props.userInfo?.info?.photoURL &&
               this.props.userInfo?.info?.photoURL?.length > 5
                ? "transparent"
                : "#ddd",
             }}
            >
             {this.props.userInfo?.info?.displayName[0]}
            </div>
           )
          }
          style={{
           paddingTop: "5px",
           fontWeight: "600",
           fontFamily: "Roboto",
           color: "#000",
           fontSize: "1.1rem",
          }}
          id="basic-nav-dropdown"
         >
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

          <NavDropdown.Divider />
          {this.state.myBrands?.length > 0 && (
           <p className="strs">Brands/ Stores</p>
          )}
          {this.state.myBrands?.map((brand, index) => {
           return (
            <>
             {index < 3 && (
              <NavDropdown.Item href={`/brand/${brand?.id}`} key={index}>
               {brand?.logo && brand?.logo?.length > 10 ? (
                <span
                 className="br-img"
                 style={{
                  backgroundImage: `url(${brand.logo})`,
                 }}
                ></span>
               ) : (
                <span className="br-img">{brand?.name[0]}</span>
               )}
               <span className="br-name">{brand?.name}</span>
              </NavDropdown.Item>
             )}
            </>
           );
          })}

          {this.state.myBrands?.length > 2 && (
           <>
            <a href="/profile" className="navanchor">
             See all
            </a>
           </>
          )}
          {this.state.myBrands?.length > 0 && <NavDropdown.Divider />}

          <NavDropdown.Item onClick={this.handleLogout}>
           Logout
          </NavDropdown.Item>
         </NavDropdown>
        ) : (
         <NavDropdown
          alignRight
          className="archnav-dropdown"
          title={
           this.props.userInfo?.info?.photoURL &&
           this.props.userInfo?.info?.photoURL?.length > 5 ? (
            <img
             style={{ display: "block", borderRadius: "50%" }}
             src={this.props?.photoURL ?? this.props.userInfo?.info?.photoUrl}
             alt=""
            />
           ) : (
            <div
             className="nav-avatar"
             style={{
              width: "38px",
              height: "38px",
              paddingTop: "5px",
              borderRadius: "50%",
              alignItems: "center",
              textAlign: "center",
              display: "grid",
              fontSize: "1.5rem",
              fontWeight: "600",

              background:
               this.props.userInfo?.info?.photoURL &&
               this.props.userInfo?.info?.photoURL?.length > 5
                ? "transparent"
                : "#ddd",
             }}
            ></div>
           )
          }
          style={{
           paddingTop: "5px",
           fontWeight: "600",
           fontFamily: "Roboto",
           color: "#000",
           fontSize: "1.1rem",
          }}
          id="basic-nav-dropdown"
         >
          <NavDropdown.Item href="/signin">Login</NavDropdown.Item>
          <NavDropdown.Item href="/signup">Register</NavDropdown.Item>
         </NavDropdown>
        )}
       </Navbar>
      </div>

      {this.state.search_mobile && (
       <div className="search-mobile-container">
        <Input
         onClear={() => {
          this.props.dispatchSetMagazineType("");
         }}
         size="large"
         suffix={
          <CloseOutlined
           onClick={() => {
            this.setState({
             search_mobile: false,
            });
           }}
          />
         }
         placeholder="Search Products, Brands and Magazine"
         onChange={(e) => this.searching(e.target.value)}
        />
        {this.state.search_list && this.state.search_mobile && (
         <>
          <div
           className="col-md-5"
           id="search-list"
           style={{
            position: "absolute",
            top: 45,
            width: "100%",
            right: 0,
            left: 0,
            minHeight: "250px",
            borderTopRightRadius: "2px",
            borderTopLeftRadius: "2px",
            background: "#fff",
            border: "1px solid #ddd",
            borderTop: "0",
           }}
          >
           {this.state.value === "all" && this.state.searchDataLoaded && (
            <ul>
             {this.state.filteredFurniture?.length > 0 && (
              <>
               <li>
                Furniture
                <ul className="inner-list">
                 {this.state.filteredFurniture.map((product, index) => {
                  if (index <= 13) {
                   return (
                    <>
                     <a href={`/products?category=furniture&kinds=${product}`}>
                      <li
                       onClick={() => {
                        this.setState({
                         search_list: false,
                         searchValue: product,
                        });
                        console.log(product);
                        this.props.setSearchTerm(product);
                       }}
                      >
                       {product}
                      </li>
                     </a>
                    </>
                   );
                  }
                 })}
                </ul>
               </li>
              </>
             )}
             {this.state.filteredLightings.length > 0 && (
              <>
               <li>
                Lightings
                <ul className="inner-list">
                 {this.state.filteredLightings.map((product, index) => {
                  if (index <= 15) {
                   return (
                    <>
                     <a href={`/products?category=lighting&kinds=${product}`}>
                      <li
                       onClick={() => {
                        this.setState({
                         search_list: false,
                         searchValue: product,
                        });
                        console.log(product);
                        this.props.setSearchTerm(product);
                       }}
                      >
                       {product}
                      </li>
                     </a>
                    </>
                   );
                  }
                 })}
                </ul>
               </li>
              </>
             )}
             {this.state.filteredBrands?.length > 0 && (
              <>
               <li>
                Brands
                <ul className="inner-list">
                 {this.state.filteredBrands.map((brand, index) => {
                  return (
                   <>
                    <li>
                     <a href={`/brand/${brand.id}`}>{brand.name}</a>
                    </li>
                   </>
                  );
                 })}
                </ul>
               </li>
              </>
             )}
             <li>
              {this.state.filterProjects.length > 0 && (
               <>
                Projects
                <ul className="inner-list">
                 {this.state.filterProjects.map((project, index) => {
                  return (
                   <a href={`/design-selected?types=${project}`}>
                    <li>{project}</li>
                   </a>
                  );
                 })}
                </ul>
               </>
              )}
             </li>
            </ul>
           )}
           {this.state.value === "Brands" && this.state.searchDataLoaded && (
            <ul>
             {this.state.filteredBrands?.length > 0 && (
              <>
               <li>
                Brands
                <ul className="inner-list">
                 {this.state.filteredBrands.map((brand, index) => {
                  return (
                   <>
                    <li>
                     <a href={`/brand/${brand.id}`}>{brand.name}</a>
                    </li>
                   </>
                  );
                 })}
                </ul>
               </li>
              </>
             )}
            </ul>
           )}
           {this.state.value === "Products" && this.state.searchDataLoaded && (
            <ul>
             {this.state.filteredFurniture?.length > 0 && (
              <>
               <li>
                Furnitures
                <ul className="inner-list">
                 {this.state.filteredFurniture.map((product, index) => {
                  if (index <= 9) {
                   return (
                    <>
                     <Link
                      to={{
                       pathname: `/products/furniture/${product}`,
                       state: {
                        selected_kind: product,
                       },
                      }}
                     >
                      <li
                       onClick={() => {
                        this.setState({
                         search_list: false,
                         searchValue: product,
                        });
                        console.log(product);
                        this.props.setSearchTerm(product);
                       }}
                      >
                       {product}
                      </li>
                     </Link>
                    </>
                   );
                  }
                 })}
                </ul>
               </li>
              </>
             )}
             {this.state.filteredLightings.length > 0 && (
              <>
               <li>
                Lightings
                <ul className="inner-list">
                 {this.state.filteredLightings.map((product, index) => {
                  if (index <= 9) {
                   return (
                    <>
                     <Link
                      to={{
                       pathname: `/products/furniture/${product}`,
                       state: {
                        selected_kind: product,
                       },
                      }}
                     >
                      <li
                       onClick={() => {
                        this.setState({
                         search_list: false,
                         searchValue: product,
                        });
                        console.log(product);
                        this.props.setSearchTerm(product);
                       }}
                      >
                       {product}
                      </li>
                     </Link>
                    </>
                   );
                  }
                 })}
                </ul>
               </li>
              </>
             )}
            </ul>
           )}
           {this.state.value === "Projects" && (
            <ul>
             <li>
              Projects
              <ul className="inner-list">
               {this.state.filterProjects?.map((project, index) => {
                return <li key={index}>{project}</li>;
               })}
              </ul>
             </li>
            </ul>
           )}
          </div>
         </>
        )}
       </div>
      )}
     </Container>
     {this.props.isLoggedIn &&
     !this.props.userInfo.info?.emailVerified &&
     !this.props.userInfo.info?.phoneNumber &&
     !this.state.verified ? (
      <>
       <button
        style={{
         width: "100%",
         background: "#E41E15",
         color: "#fff",
         padding: "5px 0",
         fontFamily: "Roboto",
         fontSize: ".8rem",
        }}
        onClick={this.sendVerificationCode}
       >
        Your account is not activated.
        <span
         style={{
          textDecoration: "underline",
          textAlign: "center",
          padding: "0 3px",
         }}
        >
         Click here
        </span>
        to activate it
        {this.state.sendingVcode ? (
         <>
          <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
         </>
        ) : (
         ""
        )}
       </button>
       <Modal
        show={this.state.validate_modal}
        onHide={this.validate_modal_close}
        className="example-modals"
        keyboard={false}
       >
        <Modal.Body>
         <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
          <Form.Row as={Row} style={{ margin: "20px 0" }}>
           <Input
            size="large"
            placeholder="Enter 6 digits sent to your email"
            value={this.state.vCode}
            onChange={(e) => {
             this.setState({
              vCode: e.target.value,
             });
            }}
           />
          </Form.Row>
          <Button color="red" onClick={this.verify}>
           Verify
          </Button>
         </div>
        </Modal.Body>
       </Modal>
      </>
     ) : (
      ""
     )}
    </div>

    {this.state.searchDataLoaded && (
     <SearchMobileSideMenu data={this.state.searchData} />
    )}
   </>
  );
 }
 //  }
}

const mapDispatchToProps = (dispatch) => ({
 dispatchLogOut: () => dispatch(logginOut()),
 setNav: (info) => dispatch(setUserInfoAction(info)),
 loggingin: (user) => dispatch(phoneSignupSuccess(user)),
 updateInfo: (information) => dispatch(updateInfo(information)),
 setSearchTerm: (term) => dispatch(setSearchTerm(term)),
 setAllBrands: (brands) => dispatch(setAllBrands(brands)),
 dispatchSetMenu: (visible) => dispatch(setMenu(visible)),
 dispatchSetMagazineType: (type) => dispatch(setProjectTypeSearch(type)),

 //  setHomepage: (homepage) => dispatch(loadHomepage(homepage)),
});

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  loading: state.regularUser.loading,
  userInfo: state.regularUser,
  info: state.regularUser.info,
  user: state.regularUser.user,
  displayName: state.regularUser.displayName,
  photoURL: state.regularUser?.photoURL,
  magazine_type: state.project?.magazine_type,
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
