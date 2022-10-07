import React, { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { IoNotifications } from "react-icons/io5";
import "./componentsStyle/Notifications.css";
import { connect } from "react-redux";
import { API } from "./../utitlties";
import axios from "axios";

class Notifications extends Component {
 constructor(props) {
  super(props);
  this.state = {
   notifications: [],
  };
 }
 componentDidMount() {
  console.log("OPEN");
  axios
   .get(`${API}mynotifications/${this.props.info?.uid}`)
   .then((res) => {
    console.log(res);
    this.setState({
     notifications: res.data.notifications,
     loaded: true,
    });
   })
   .catch((err) => {
    this.setState({ loaded: true });
   });
 }
 render() {
  return (
   <NavDropdown
    className="notifications-list"
    title={<IoNotifications />}
    onChange={(e) => {
     console.log(e);
    }}
   >
    <NavDropdown.Header>
     <div className="notifications-header mb-2">
      <p>Notifications</p>
      <span>Mark all as read</span>
     </div>
    </NavDropdown.Header>

    {this.state.notifications?.map((n, index) => {
     return (
      <NavDropdown.Item href={n.link} key={index}>
       <div className="notification-item">
        {n.image && n.image?.length >= 10 ? (
         <div
          className="n-img"
          style={{
           backgroundImage: `url(${n.image})`,
          }}
         ></div>
        ) : (
         <div className="n-img">{n?.head[0]}</div>
        )}
        <div className="n-content">
         <p>
          <span className="bold">{n.head}</span>
          <span> {n.body}</span>
          <p className="decorated">{n.sub_body}</p>
         </p>
         <span>{n.published}</span>
        </div>
       </div>
      </NavDropdown.Item>
     );
    })}
    {this.state.notifications.length > 8 && (
     <>
      <NavDropdown.ItemText>See All</NavDropdown.ItemText>
     </>
    )}
   </NavDropdown>
  );
 }
}

// export default Notifications;
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  user: state.regularUser.user,
  info: state.regularUser.info,
 };
};

export default connect(mapStateToProps, null)(Notifications);
