import React, { Component } from "react";
import axios from "axios";
import { API } from "./../../utitlties";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

class UserNotificationsTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   user_id: this.props.user_id,
   projects: [],
   products: [],
   companies: [],
   loading: true,
  };
 }
 componentDidMount() {
  axios
   .get(`${API}company/members/${this.state.user_id}`)
   .then((response) => {
    console.log(response);
    const { companies, projects, products } = response.data;
    this.setState({
     loading: false,
     companies,
     projects,
     products,
    });
   })
   .catch((err) => {
    this.setState({
     loading: false,
    });
   });
 }

 handleReject = (company_id, user_id) => {
  const fd = new FormData();
  fd.append("user_id", user_id);
  fd.append("company_id", company_id);
  axios
   .post(`${API}company/remove-member`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     companies: this.state.companies?.filter((co) => {
      return co.id !== company_id;
     }),
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };

 handleConfirm = (company_id, user_id) => {
  const fd = new FormData();
  fd.append("user_id", user_id);
  fd.append("company_id", company_id);
  axios
   .post(`${API}company/confirm-member`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     companies: this.state.companies?.filter((co) => {
      return co.id !== company_id;
     }),
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };
 render() {
  return (
   <>
    {this.state.loading ? (
     <Spin
      size="large"
      indicator={
       <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
      }
      style={{
       width: "100%",
       margin: "100px auto",
      }}
     />
    ) : (
     <div className="notifications-tab">
      <p className="notif-head">
       You have been invited to join items below as designer/ team member,
       please confirm or reject
      </p>
      <div className="notif-list">
       {this.state.companies?.map((company) => {
        return (
         <div className="notif-item" key={company?.id}>
          <div className="notif-info">
           <div
            className="notif-img"
            style={{ backgroundImage: `url("${company.profile}")` }}
           ></div>
           <div className="name-title">
            <p className="name">{company?.name}</p>
            <p className="title">
             {company.name} aded you in their team members as
             <span className="px-2">{company.member_position}</span>
            </p>
           </div>
          </div>
          <button
           className="notif-btn reject"
           onClick={() => {
            this.handleReject(company.id, this.props.user_id);
           }}
          >
           Reject
          </button>
          <button
           onClick={() => {
            this.handleConfirm(company.id, this.props.user_id);
           }}
           className="notif-btn confirm"
          >
           Confirm
          </button>
         </div>
        );
       })}

       {this.state.products?.map((product) => {
        return (
         <div className="notif-item" key={product?.id}>
          <div className="notif-info">
           <div
            className="notif-img"
            style={{ backgroundImage: `url("${product.preview_cover}")` }}
           ></div>
           <div className="name-title">
            <p className="name">{product?.name}</p>
            <p className="title">
             {product.name} aded you in their team members as
             <span className="px-2">Designer</span>
            </p>
           </div>
          </div>
          <button className="notif-btn reject">Reject</button>
          <button className="notif-btn confirm">Confirm</button>
         </div>
        );
       })}
      </div>
     </div>
    )}
   </>
  );
 }
}
export default UserNotificationsTab;
