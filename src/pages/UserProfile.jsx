import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoMdSettings } from "react-icons/io";
import profile from "../../src/profiles.jpg";
import CollectionsTab from "./user_profile_tabs/CollectionsTab";
import FollwingTab from "./user_profile_tabs/FollwingTab";
import BocList from "./user_profile_tabs/BoqList";
import firebase from "firebase/app";
import Settings from "./user_profile_tabs/Settings";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { auth } from "./../firebase";
import { setUserInfoAction } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router";

class UserProfile extends Component {
 constructor(props) {
  super(props);
  this.state = {};
 }
 componentDidMount() {
  //   this.props.setNav(auth.currentUser);
  //     console.log()
  //     const creds = firebase.auth.PhoneAuthProvider.PHONE_SIGN_IN_METHOD;
  //     console.log(creds);
  //     auth.currentUser.linkWithCredential({});
  //   var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
  //     if (auth.currentUser) {
  //      auth.currentUser.linkWithPhoneNumber(auth.currentUser.providerId).then(() => {
  //       console.log("linked");
  //      });
  //     }
 }
 render() {
  if (!this.props.isLoggedIn && !auth.currentUser) return <Redirect to="/" />;
  return (
   <React.Fragment>
    <div id="user-profile" className="bg-white">
     <Container fluid>
      <Row className="justify-content-md-center">
       <Col md={{ span: 12 }}>
        <div className="profile-section">
         <div className="profile-img">
          <img src={this.props.photoURL ?? ""} alt="profile" />
         </div>
         <div className="profile-heading">
          <h2 className="name">{this.props.displayName}</h2>
          <p className="join-design">Join 17Designclub</p>
         </div>
         <Link to="/user/settings">
          <button className="profile-settings-btn">
           <IoMdSettings /> Settings
          </button>
         </Link>
        </div>
       </Col>
       <Col md={{ span: 12 }}>
        <div className="profile-tabs">
         <Tabs>
          <TabList>
           <Tab>Collection</Tab>
           <Tab>Follwing</Tab>
           <Tab>BOQ Lists</Tab>
           {/* <Tab>Setting</Tab> */}
          </TabList>
          <TabPanel>
           <CollectionsTab />
          </TabPanel>
          <TabPanel>
           <FollwingTab />
          </TabPanel>
          <TabPanel>
           <BocList />
          </TabPanel>
          {/* <TabPanel> */}
          {/* <Settings /> */}
          {/* </TabPanel> */}
         </Tabs>
        </div>
       </Col>
      </Row>
     </Container>
    </div>
   </React.Fragment>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 setNav: (info) => dispatch(setUserInfoAction(info)),
});

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  name: state.regularUser.user?.displayName,
  user: state.regularUser.user,
  info: state.regularUser.info,
  displayName: state.regularUser.displayName,
  photoURL: state.regularUser.photoURL,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
