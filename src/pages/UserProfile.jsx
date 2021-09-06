import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoMdSettings } from "react-icons/io";
import profile from "../../src/profiles.jpg";
import CollectionsTab from "./user_profile_tabs/CollectionsTab";
import FollwingTab from "./user_profile_tabs/FollwingTab";
import BocList from "./user_profile_tabs/BoqList";

class UserProfile extends Component {
 state = {};
 render() {
  return (
   <React.Fragment>
    <div id="user-profile" className="bg-white">
     <Container fluid>
      <Row className="justify-content-md-center">
       <Col md={{ span: 12 }}>
        <div className="profile-section">
         <div className="profile-img">
          <img src={profile} alt="profile" />
         </div>
         <div className="profile-heading">
          <h2 className="name">Muhamed Mahdy</h2>
          <p className="join-design">Join 17Designclub</p>
         </div>
         <button className="profile-settings-btn">
          <IoMdSettings /> Settings
         </button>
        </div>
       </Col>
       <Col md={{ span: 12 }}>
        <div className="profile-tabs">
         <Tabs>
          <TabList>
           <Tab>Collection</Tab>
           <Tab>Follwing</Tab>
           <Tab>BOQ Lists</Tab>
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

export default UserProfile;
