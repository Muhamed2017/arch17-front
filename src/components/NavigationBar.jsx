import React, { Component } from "react";
import logo from "../../src/logo-gray.png";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { toast, Flip, Bounce } from "react-toastify";
import { auth } from "../firebase";
import {
 Container,
 Navbar,
 Nav,
 Form,
 FormControl,
 NavDropdown,
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
import UserProfile from "./../pages/UserProfile";
class NavigationBar extends Component {
 constructor(props) {
  super(props);
  this.state = {
   photoURL: auth.currentUser?.photoURL,
   user: auth.currentUser ?? null,
   displayName: this.props.displayName ?? "",
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
 componentDidMount() {
  this.setState({ photoURL: auth.currentUser?.photoURL });
  // comment or no
  //   this.props.setNav(this.props.userInfo?.user);

  //   auth.onAuthStateChanged((user) => {
  //    if (user && this.props.isLoggedIn) {
  //     this.props.setNav(user);
  //     console.log(user);

  //     this.setState({
  //      signgedin: true,
  //      provider: user.providerData[0].providerId,
  //      user,
  //     });
  //    } else {
  //     this.setState({
  //      signgedin: false,
  //      provider: null,
  //     });
  //    }
  //   });
 }
 render() {
  return (
   <div className="w-100 bg-white navbar-border-bottom sticky-top">
    <Container>
     <Navbar bg="white" expand="md" sticky="top">
      <Navbar.Brand>
       <Router>
        <a href="/">
         {/* <Link to="/" href="/"> */}
         <img id="nav-logo" src={logo} alt="Logo" />
        </a>
        {/* </Lin/k> */}
       </Router>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
       <Form
        inline
        className="nav-search rounded col-md-7"
        style={{ display: "inherit" }}
       >
        <NavDropdown
         title="Dropdown"
         id="basic-nav-dropdown"
         style={{ padding: "10px" }}
        >
         <NavDropdown.Item href="action/3.1">Products</NavDropdown.Item>
         <NavDropdown.Item href="#action/3.2">Magazine</NavDropdown.Item>
        </NavDropdown>
        <FormControl
         type="text"
         placeholder="Search"
         className="mr-sm-2 border-0"
        />
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
           {/* {this.state.user?.photoURL ? ( */}
           {this.props.photoURL ? (
            <>
             <img
              style={{ display: "block", borderRadius: "50%" }}
              src={this.props.photoURL}
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
           )}
          </div>

          <NavDropdown
           className="test-name"
           //    title={this.props.userInfo.user?.displayName}
           title={
            // this.props.userInfo?.user?.displayName ??
            // this.props.displayName ?? this.props.userInfo?.user?.phoneNumber
            // this.props.userInfo.info.phoneNumber
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
           <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
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
   </div>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 dispatchLogOut: () => dispatch(logginOut()),
 setNav: (info) => dispatch(setUserInfoAction(info)),
 loggingin: (user) => dispatch(phoneSignupSuccess(user)),
 updateInfo: (information) => dispatch(updateInfo(information)),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  loading: state.regularUser.loading,
  userInfo: state.regularUser,
  info: state.regularUser.info,
  user: state.regularUser.user,
  displayName: state.regularUser.displayName,
  photoURL: state.regularUser.photoURL,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
