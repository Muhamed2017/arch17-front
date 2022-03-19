import React, { Component } from "react";
import logo from "../../src/logo-gray.png";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import { auth } from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { TreeSelect, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
 //  Redirect,
 BrowserRouter as Router,
 Link,
 //  Switch,
} from "react-router-dom";

import {
 Container,
 Navbar,
 Nav,
 Form,
 FormControl,
 NavDropdown,
 Modal,
 Col,
 Row,
 Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
 logginOut,
 phoneSignupSuccess,
 setUserInfoAction,
 updateInfo,
} from "../redux/actions/authActions";
import { BsChatFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import axios from "axios";
import { presistInfo } from "./../redux/actions/authActions";
import { API } from "./../utitlties";
import { setSearchTerm } from "./../redux/actions/addProductActions";
const furniture = [
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
const lightings = [
 "Bollard lights",
 "Pendant lamps",
 "Chandeliers",
 "Ceiling fan light fixture",
 "Ceiling lamps",
 "Decorative & artistic lights",
 "Emergency Light",
 "Floor lamps",
];
const treeData = [
 {
  title: "All Items",
  value: "all",
 },
 {
  title: "Products",
  value: "Products",
  children: [
   {
    title: "Furniture",
    value: "Furniture",
   },
   {
    title: "Lighting",
    value: "Ligthing",
   },
  ],
 },
 {
  title: "Brands",
  value: "Brands",
 },
 {
  title: "Projects",
  value: "Projects",
 },
];

class NavigationBar extends Component {
 constructor(props) {
  super(props);
  this.state = {
   //  photoURL: auth.currentUser?.photoURL,
   //  photoURL:
   // auth.currentUser?.photoURL ??
   // this.props.photoURL ??
   // this.props.userInfo?.info?.photoUrl,

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
   filterProjects: [],
   filteredLightings: [],
   lightings: [],
   searchDataLoaded: false,
   selected_search: "",
   selected: false,
   typeSelected: "",
   search_list_loading: false,
   projects: [
    "Hyatt Place Frankfurt Airport",
    "Rheingold Bushwick",
    "Arch House",
    "A Neighborhood Candy-Sweet Bakery",
    "Pearl House",
    "Annex Coach House",
   ],
  };
 }

 handleLogout = () => {
  auth.signOut().then(() => {
   this.props.dispatchLogOut();
  });
 };

 handleNotify = () => {
  toast.success(
   <h style={{ color: "#000" }}>
    Welcome Muhamed ,
    <a
     style={{ color: "#000", textDecoration: "underline" }}
     href="/user/settings"
    >
     Update Your profile Now
    </a>
   </h>,
   {
    position: toast.POSITION.BOTTOM_CENTER,
    theme: "white",
    transition: Flip,
    pauseOnHover: true,
    closeOnClick: false,
    style: {
     fontFamily: "Roboto",
     color: "#fff",
     backgroundColor: "#EAEAEA",
     padding: "25px 0",
     margin: "auto",
    },
    autoClose: 20000,
    className: "welcome-notify",
   }
  );
 };

 onChange = (value) => {
  console.log(value);
  this.setState({ value, selected_search: value });
 };

 searching = (value) => {
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
  // this.setState({ photoURL: auth.currentUser?.photoURL, value: "all" });
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
      });
     }
    );

    console.log(response);
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
   //  fd.append("uid", auth.currentUser.uid);
   fd.append("uid", this.props.info.uid);
   fd.append("code", code);
   axios
    .post(`${API}validate-code`, fd)
    .then((response) => {
     console.log(response);
     this.props.updateInfo(response.data.user);
     presistInfo(response.data.user, true);
     this.setState({ verifying: false, validate_modal: false, verified: true });
     toast.success("Your email has been verified", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
      transition: Flip,
      autoClose: 3000,
      toastId: "nav-msg",
     });
    })
    .catch((error) => console.log(error));
  }
 };

 render() {
  return (
   <div
    id="navigation-component"
    className="w-100 bg-white navbar-border-bottom sticky-top"
   >
    <Container>
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
        className="nav-search rounded col-md-6"
        style={{ display: "inherit", position: "relative" }}
       >
        <TreeSelect
         style={{
          width: 130,
          fontSize: "1rem",
          fontWeight: 600,
          backgroundColor: "#F7F8FA",
          display: "none",
         }}
         value={this.state.value}
         size={"large"}
         bordered={false}
         dropdownStyle={{
          maxHeight: 600,
          minHeight: 300,
          overflow: "auto",
          minWidth: 200,
         }}
         treeData={treeData}
         defaultValue={"all"}
         treeDefaultExpandAll
         onChange={this.onChange}
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
          placeholder={`Search ${this.state.selected_search}`}
          className="mr-sm-2 border-0"
          onChange={(e) => this.searching(e.target.value)}
         />
         {this.state.search_list_loading && (
          <Spin
           size="large"
           indicator={
            <LoadingOutlined style={{ fontSize: "16px", color: "#555" }} spin />
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
                   const lower = product.toLowerCase();

                   return (
                    <>
                     <Link
                      to={{
                       pathname: `/products/furniture/${lower}`,
                       state: {
                        selected_kind: product,
                        selected_category: "Furniture",
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
                  if (index <= 15) {
                   return (
                    <>
                     <Link
                      to={{
                       pathname: `/products/sofa/table`,
                       state: {
                        selected_kind: product,
                        selected_category: "Lighting",
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
                   <>
                    <li>{project}</li>
                   </>
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
             {this.state.filteredBrands?.length > 0 && (
              <>
               <li>
                Products
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
            </ul>
           )}
           {this.state.value === "Projects" && this.state.searchDataLoaded && (
            <ul>
             <li>
              Projects
              <ul className="inner-list">
               <li>Project 1</li>
               <li>Project 2</li>
               <li>Chair Project</li>
               <li>4-base Project</li>
               <li>Outdoor Desk Project</li>
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
           style={{ fontSize: "1.7rem", paddingTop: "1px", color: "#797979" }}
          >
           <IoNotifications
            style={{ width: "60px", display: "inline-block" }}
           />
           <BsChatFill style={{ width: "60px", display: "inline-block" }} />
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
            paddingTop: "8px",
            borderRadius: "50%",
            alignItems: "flex-end",
           }}
          >
           {/* {this.state.photoURL ? (
            <>
             <img
              style={{ display: "block", borderRadius: "50%" }}
              // src={this.props.photoURL}
              src={this.state.photoURL}
              alt=""
             />
            </>
           ) : (
            <>
             <div
              style={{
               width: "38px",
               height: "38px",
               background: "#797979",
               borderRadius: "50%",
              }}
             ></div>
            </>
           )} */}
           <img
            style={{ display: "block", borderRadius: "50%" }}
            // src={this.props.photoURL}
            src={this.props?.photoURL ?? this.props.userInfo?.info?.photoUrl}
            alt=""
           />
          </div>

          <NavDropdown
           className="test-name"
           title={
            this.props.displayName ?? this.props.userInfo.user?.displayName
           }
           style={{
            paddingTop: "5px",
            fontWeight: "500",
            fontFamily: "Roboto",
            color: "#000",
           }}
           id="basic-nav-dropdown"
          >
           <NavDropdown.Item href="/product/5">Action</NavDropdown.Item>
           <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
           <NavDropdown.Divider />
           <NavDropdown.Item onClick={this.handleLogout}>
            Logout
           </NavDropdown.Item>
           <NavDropdown.Item onClick={this.handleNotify}>
            Notify
           </NavDropdown.Item>
          </NavDropdown>
         </>
        )}
       </Nav>
      </Navbar.Collapse>
     </Navbar>
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
          <Form.Label column md={4}>
           6-digit code
          </Form.Label>
          <Col md={8}>
           <Form.Control
            value={this.state.vCode}
            placeholder="Six digit code"
            onChange={this.onChangeVcode}
           />
          </Col>
         </Form.Row>

         <Button
          variant="danger"
          onClick={this.verify}
          type="submit"
          style={{
           textAlign: "right",
           background: "#E41E15",
           display: "block",
           float: "right",
           marginRight: "12px",
          }}
         >
          {this.state.verifying ? (
           <>
            <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
           </>
          ) : (
           <>Verify</>
          )}
         </Button>
        </div>
       </Modal.Body>
      </Modal>
     </>
    ) : (
     ""
    )}
   </div>
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
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
