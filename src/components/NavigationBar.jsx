import React, { Component } from "react";
import logo from "../../src/logo-gray.png";
import { BrowserRouter as Router } from "react-router-dom";
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
import { logginOut, setUserInfoAction } from "../redux/actions/authActions";
import { BsChatFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
class NavigationBar extends Component {
 constructor(props) {
  super(props);

  this.state = {
   //    displayName: this.props.userInfo.user.displayName,
   user: null,
  };
 }
 handleLogout = () => {
  this.props.dispatchLogOut();
  window.location.reload();
 };
 handleNotify = () => {
  toast.success("Success Notification !", {
   position: toast.POSITION.BOTTOM_LEFT,
   theme: "colored",
   transition: Flip,
  });
 };
 componentDidMount() {
  auth.onAuthStateChanged((user) => {
   if (user) {
    this.setState({ user });
    this.props.setNav(user);
   } else {
    this.props.setNav(null);
   }
  });
 }
 render() {
  return (
   <div className="w-100 bg-white navbar-border-bottom sticky-top">
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
           {this.props.userInfo.user.photoURL ? (
            <>
             <img
              style={{ display: "block", borderRadius: "50%" }}
              src={this.props.userInfo.user.photoURL}
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
           title={this.props.userInfo?.info?.displayName}
           style={{
            paddingTop: "5px",
            fontWeight: "500",
            fontFamily: "Roboto",
            color: "#000",
           }}
           id="basic-nav-dropdown"
          >
           <NavDropdown.Item href="/product/5">Action</NavDropdown.Item>
           <NavDropdown.Item href="/user">Another action</NavDropdown.Item>
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
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  loading: state.regularUser.loading,
  userInfo: state.regularUser,
  info: state.regularUser.info,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
