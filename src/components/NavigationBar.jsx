import React, { Component } from "react";
import logo from "../../src/logo-gray.png";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { toast, Flip, Bounce } from "react-toastify";
import { auth } from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";

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
class NavigationBar extends Component {
 constructor(props) {
  super(props);
  this.state = {
   photoURL: auth.currentUser?.photoURL,
   user: auth.currentUser ?? null,
   displayName: this.props.displayName ?? "",
   vCode: "",
   verifying: false,
   validate_modal: false,
   sendingVcode: false,
   verified: this.props.userInfo?.info?.emailVerified,
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
 }
 onChangeVcode = (e) => {
  this.setState({ vCode: e.target.value });
 };

 validate_modal_close = () => {
  this.setState({ validate_modal: false });
 };
 sendVerificationCode = () => {
  if (auth.currentUser) {
   this.setState({ sendingVcode: true });
   this.setState({ verifying: true });
   const fd = new FormData();
   fd.append("uid", auth.currentUser.uid);
   axios
    .post("https://arch17-apis.herokuapp.com/api/user", fd)
    .then((response) => {
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
  if (auth.currentUser) {
   let code = this.state.vCode;
   this.setState({ verifying: true });
   const fd = new FormData();
   fd.append("uid", auth.currentUser.uid);
   fd.append("code", code);
   axios
    .post("https://arch17-apis.herokuapp.com/api/validate-code", fd)
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
 verifyNotification = () => {};

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
