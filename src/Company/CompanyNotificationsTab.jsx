import React, { Component } from "react";
import axios from "axios";
import { API } from "./../utitlties";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

class CompanyNotificationaTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   company_id: this.props.company_id,
   product_notifications: [],
   project_notifications: [],
   loading: true,
  };
 }
 componentDidMount() {
  axios
   .get(`${API}company/getNotifications/${this.state.company_id}`)
   .then((response) => {
    console.log(response);
    const { product_notifications, project_notifications } = response.data;
    this.setState({
     loading: false,
     product_notifications,
     project_notifications,
    });
   })
   .catch((err) => {
    this.setState({
     loading: false,
    });
   });
 }

 handleRejectProduct = (product_id, company_id) => {
  const fd = new FormData();
  fd.append("product_id", product_id);
  fd.append("company_id", company_id);
  axios
   .post(`${API}company/remove-product`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     product_notifications: this.state.product_notifications?.filter((p) => {
      return p.id !== product_id;
     }),
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };

 handleConfirmProduct = (product_id, company_id) => {
  const fd = new FormData();
  fd.append("product_id", product_id);
  fd.append("company_id", company_id);
  axios
   .post(`${API}company/confirm-product`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     product_notifications: this.state.product_notifications?.filter((p) => {
      return p.id !== product_id;
     }),
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };
 handleConfirmProject = (project_id, company_id) => {
  const fd = new FormData();
  fd.append("project_id", project_id);
  fd.append("company_id", company_id);
  axios
   .post(`${API}company/confirm-project`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     project_notifications: this.state.project_notifications?.filter((p) => {
      return p.id !== project_id;
     }),
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };
 handleRejectProject = (project_id, company_id) => {
  const fd = new FormData();
  fd.append("project_id", project_id);
  fd.append("company_id", company_id);
  axios
   .post(`${API}company/remove-project`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     project_notifications: this.state.project_notifications?.filter((p) => {
      return p.id !== project_id;
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
      {this.state.project_notifications?.length +
       this.state.product_notifications?.length >
       0 && (
       <p className="notif-head">
        You have been invited to join items below as designer/ team member,
        please confirm or reject
       </p>
      )}
      <div className="notif-list">
       {this.state.product_notifications?.map((product) => {
        return (
         <div className="notif-item" key={product?.id}>
          <div className="notif-info">
           <div
            className="notif-img"
            style={{ backgroundImage: `url("${product?.preview_cover}")` }}
           ></div>
           <div className="name-title">
            <p className="name">{product?.name}</p>
            <p className="title">{product?.name} aded you as a Designer</p>
           </div>
          </div>
          <button
           className="notif-btn reject"
           onClick={() => {
            this.handleRejectProduct(
             product?.product_id,
             this.props.company_id
            );
           }}
          >
           Reject
          </button>
          <button
           onClick={() => {
            this.handleConfirmProduct(
             product?.product_id,
             this.props.company_id
            );
           }}
           className="notif-btn confirm"
          >
           Confirm
          </button>
         </div>
        );
       })}
       {this.state.project_notifications?.map((project) => {
        return (
         <div className="notif-item" key={project?.id}>
          <div className="notif-info">
           <div
            className="notif-img"
            style={{ backgroundImage: `url("${project?.cover}")` }}
           ></div>
           <div className="name-title">
            <p className="name">{project?.name}</p>
            <p className="title">{project?.name} Tagged you</p>
           </div>
          </div>
          <button
           className="notif-btn reject"
           onClick={() => {
            this.handleRejectProject(project?.id, this.props.company_id);
           }}
          >
           Reject
          </button>
          <button
           onClick={() => {
            this.handleConfirmProject(project?.id, this.props.company_id);
           }}
           className="notif-btn confirm"
          >
           Confirm
          </button>
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
export default CompanyNotificationaTab;
