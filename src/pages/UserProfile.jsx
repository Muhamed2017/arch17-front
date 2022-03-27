import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoMdSettings } from "react-icons/io";
import CollectionsTab from "./user_profile_tabs/CollectionsTab";
import FollwingTab from "./user_profile_tabs/FollwingTab";
import BocList from "./user_profile_tabs/BoqList";
import blank from "../../src/blank.jpg";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { auth } from "./../firebase";
import { setUserInfoAction } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../utitlties";
import {
 LoadingOutlined,
 CopyOutlined,
 EnvironmentFilled,
 ShareAltOutlined,
} from "@ant-design/icons";
import { Spin, Tooltip, Button } from "antd";

class UserProfile extends Component {
 constructor(props) {
  super(props);
  this.state = {
   user_uid: auth.currentUser?.uid,
   collections: [],
   copied: false,
   followed_stores: [],
   is_designer: false,
   visitor: this.props?.match?.params?.uid ? true : false,
   visited_uid: this.props?.match?.params?.uid,
   fetched: false,
   uid: this.props?.match?.params?.uid
    ? this.props.match?.params?.uid
    : this.props.info.uid,
  };
 }
 componentDidMount() {
  // console.log(this.state.user);
  console.log(`visitor is ${this.state.visitor}`);
  console.log(auth.currentUser);
  console.log(this.state.uid);
  if (this.props.info.uid) {
   axios
    .get(`${API}user/folders/${this.state.uid}`)
    .then((response) => {
     console.log(response);
     const { followed_stores, collections, user } = response.data;
     this.setState({
      collections,
      followed_stores,
      user,
      is_designer: user?.is_designer,
      fetched: true,
     });
    })
    .catch((err) => {
     console.log(err);
     this.setState({ fetched: false });
    });
  }
 }
 handleCopy = async (text) => {
  if ("clipboard" in navigator) {
   return await navigator.clipboard.writeText(text);
  } else {
   return document.execCommand("copy", true, text);
  }
 };
 render() {
  if (!this.props.isLoggedIn || !this.props.info) return <Redirect to="/" />;
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
   <React.Fragment>
    <div id="user-profile" className="bg-white">
     <Container fluid>
      <Row className="justify-content-md-center">
       <Col md={{ span: 12 }}>
        <div className="profile-section">
         <div
          className="profile-img"
          style={{
           backgroundImage: `url(${this.state.user?.avatar})`,
           backgroundColor: "#ddd",
          }}
         >
          {this.state.is_designer === 1 && (
           <>
            <Tooltip placement="top" title="Verified Designer">
             <svg
              class="VZmsM"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="32"
              height="32"
             >
              <path
               d="M29.8954 13.2925L29.8954 13.2925L29.9017 13.2987C31.3613 14.7317 31.3642 17.2192 29.9218 18.6838L29.9079 18.6979L29.9056 18.7004L29.9028 18.7032C29.8975 18.7083 29.889 18.7165 29.8794 18.7261L28.7426 19.8622C28.1085 20.4958 27.7449 21.3575 27.7449 22.2672V23.9136C27.7449 26.0173 26.0313 27.7315 23.9254 27.7315H22.2762C21.3695 27.7315 20.5071 28.092 19.8721 28.7265L18.7193 29.8786L18.7187 29.8792C17.2246 31.3748 14.8134 31.3677 13.3091 29.8933L12.1437 28.727L12.1432 28.7265C11.5082 28.092 10.6459 27.7315 9.73911 27.7315H8.08991C5.98405 27.7315 4.2704 26.0173 4.2704 23.9136V22.2672C4.2704 21.3546 3.90521 20.5005 3.28506 19.8587L3.27653 19.8498L3.26779 19.8412L2.11962 18.7098C2.11892 18.7091 2.11822 18.7084 2.11753 18.7077C0.635192 17.2254 0.623838 14.8017 2.10553 13.3085C2.10589 13.3081 2.10625 13.3078 2.10661 13.3074L3.27276 12.1405C3.90906 11.5046 4.2704 10.642 4.2704 9.72103V8.08896C4.2704 5.9862 5.98318 4.27435 8.08991 4.27435H9.73911C10.6493 4.27435 11.5106 3.90819 12.1432 3.27607L13.296 2.12402L13.2987 2.1213C14.7794 0.630261 17.2041 0.625524 18.7051 2.11139C18.7055 2.1118 18.7059 2.11221 18.7063 2.11262L19.8721 3.27607C20.5047 3.90819 21.3661 4.27435 22.2762 4.27435H23.9254C26.0321 4.27435 27.7449 5.9862 27.7449 8.08896V9.73863C27.7449 10.6459 28.109 11.5073 28.7426 12.1405L29.8954 13.2925ZM29.9125 18.6938L29.9124 18.6938L29.9125 18.6938Z"
               // fill="#007fff"
               fill="#1c1c1c"
               stroke="white"
               stroke-width="2"
              ></path>
              <path
               d="M14 20.9829L9.71716 16.7001L11.4 15.0172L14 17.6172L20.6 11.0172L22.2828 12.7001L14 20.9829Z"
               fill="white"
              ></path>
             </svg>
            </Tooltip>
           </>
          )}
          {this.state.user?.avatar && this.state.user.avatar?.length < 10 && (
           <>{this.state.user?.displayName[0].toUpperCase()}</>
          )}
          {/* <img src={this.state.user?.avatar ?? blank} alt="profile" /> */}
         </div>
         <div className="profile-heading">
          <h2 className="name">{this.state.user?.displayName}</h2>
          {!this.state.is_designer ? (
           <>
            <a href="/designeraccount" className="arch-link">
             {!this.state.visitor && (
              <p className="join-design">Join 17Designclub</p>
             )}
            </a>
           </>
          ) : (
           <>
            <p className="dc">
             DC-125541
             <span>
              <Tooltip title={this.state.copied ? "Copied" : "Copy Code"}>
               <Button
                onClick={() =>
                 this.handleCopy("RXDSSSSS").then(() => {
                  this.setState({ copied: true });
                  setTimeout(() => {
                   this.setState({ copied: false });
                  }, 3500);
                 })
                }
                icon={<CopyOutlined />}
               />
              </Tooltip>
             </span>
            </p>
            {this.state.user.country && (
             <p className="loc">
              <EnvironmentFilled />
              {this.state.user.country},
              {this.state.user.city && <span>{this.state.user.city}</span>}
             </p>
            )}
            <p className="mt-4">Professions</p>
            <div className="professions">
             {this.state.user?.professions?.map((p) => {
              return (
               <div>
                <p>{p}</p>
               </div>
              );
             })}
            </div>
           </>
          )}
         </div>
         <Row>
          {this.state.visitor ? (
           <>
            <Col md={{ span: 4 }}>
             <button
              type="button"
              title="Follow"
              class="profile-follow-btn profile-action-btn"
             >
              <svg
               width="18"
               height="auto"
               class="mf_US"
               viewBox="0 0 32 32"
               version="1.1"
               aria-hidden="false"
              >
               <path d="M23.7 24v2.7H2.3V24c0-3.5 7.1-5.3 10.7-5.3s10.7 1.8 10.7 5.3zM13 16c2.9 0 5.3-2.4 5.3-5.3S15.9 5.3 13 5.3s-5.3 2.4-5.3 5.3S10.1 16 13 16zm14.7-2.7v-4H25v4h-4V16h4v4h2.7v-4h4v-2.7h-4z"></path>
              </svg>
             </button>
            </Col>
            <Col md={{ span: 4 }}>
             <button className="profile-follow-btn profile-action-btn">
              <ShareAltOutlined />
             </button>
            </Col>
           </>
          ) : (
           <>
            <Col>
             <Link
              to={{
               pathname: "/profile/settings",
               state: {
                user: this.state.user,
               },
              }}
             >
              <button className="profile-settings-btn profile-action-btn">
               <IoMdSettings /> Settings
              </button>
             </Link>
            </Col>
           </>
          )}
         </Row>
        </div>
       </Col>
       <Col md={{ span: 12 }}>
        <div className="profile-tabs">
         <Tabs>
          <TabList>
           {this.state.is_designer === 1 && <Tab>Projects & Blogs</Tab>}
           <Tab>Collection</Tab>
           <Tab>Following</Tab>
           <Tab>BOQ Lists</Tab>
          </TabList>
          {this.state.is_designer === 1 && (
           <TabPanel forceRender>
            {!this.state.visitor && (
             <a href={`/addproject/designer/${this.state.user?.id}`}>
              Add Project
             </a>
            )}
           </TabPanel>
          )}
          <TabPanel forceRender>
           <CollectionsTab collections={this.state.collections} />
          </TabPanel>
          <TabPanel forceRender>
           <FollwingTab followed_stores={this.state.followed_stores} />
          </TabPanel>
          <TabPanel>
           <BocList />
          </TabPanel>
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
