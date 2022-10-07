import React, { Component } from "react";
import { Modal, Input, Button } from "antd";
import axios from "axios";
import { API } from "../../../utitlties";

const { Search } = Input;

class SearchUsersModal extends Component {
 constructor(props) {
  super(props);
  this.state = {
   search_user: "",
   visible: false,
   searching: false,
   allUsers: [],
   resusltUsers: [],
   selectedUser: {},
   loadingUsers: false,
   confirmationModal: false,
   confirmLoading: false,
  };
 }
 componentDidMount() {
  console.log("Opened");
 }
 confirmTransferSelctedUser = (user) => {
  this.setState({
   confirmLoading: true,
  });
  console.log(user);
  const fd = new FormData();
  fd.append("user_id", user.uid);
  axios
   .post(`${API}transferbrand/${this.props.store_id}`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     confirmLoading: false,
     confirmationModal: false,
     visible: false,
    });
    window.location.reload();
   })
   .catch((err) => {
    console.log(err);
    this.setState({
     confirmLoading: true,
    });
   });
 };
 showModal = () => {
  this.setState({
   loadingUsers: true && this.state.search_user.length > 2,
   visible: true,
  });

  axios.get(`${API}allusers`).then((response) => {
   console.log(response);
   this.setState({
    loadingUsers: false,
    allUsers: response.data.users,
   });
  });
 };
 closeConfirmModal = () => {
  this.setState({ confirmationModal: false });
 };
 closeModal = () => {
  this.setState({ visible: false });
 };
 render() {
  let { visible, search_user } = this.state;
  return (
   <>
    <p
     onClick={this.showModal}
     className="decorated py-1 px-0 pointer fw-400"
     style={{
      fontSize: "1.2rem",
     }}
    >
     Transfer page Ownership
    </p>
    <Modal
     className="transfer-modal"
     title="Transfer Brand Ownership"
     visible={visible}
     onOk={() => {
      this.setState({
       confirmationModal: true,
      });
     }}
     onCancel={this.closeModal}
    >
     <div className="modal-form-wrapper">
      <Search
       placeholder="Search People"
       value={search_user}
       loading={this.state.loadingUsers}
       size="large"
       className="mb-3"
       onChange={(e) => {
        this.setState({
         search_user: e.target.value,
         searching: e.target.value.length > 0,
         resusltUsers: this.state.allUsers.filter((user) => {
          return user.displayName
           .toLowerCase()
           .includes(e.target.value.toLowerCase());
         }),
        });
       }}
      />
      {this.state.searching && (
       <ul>
        {this.state.resusltUsers.map((user) => {
         return (
          <li
           onClick={() => {
            this.setState({
             selectedUser: user,
             search_user: user.displayName,
             searching: false,
            });
           }}
          >
           <div
            style={{
             backgroundImage: `url(${user.photoURL})`,
            }}
           >
            {user?.photoURL &&
             user?.photoURL?.length < 7 &&
             `${user.displayName[0]}`}
           </div>
           <div>
            {user.displayName}
            <span className="user-email">{user.email}</span>
           </div>
          </li>
         );
        })}
       </ul>
      )}
     </div>
     <p className="mb-0 modal-p">
      New page owner have to be user at Arch17.com
     </p>
     <p className="modal-p">
      After you transfer the ownership, you will no longer the authority of this
      page.
     </p>
    </Modal>
    <Modal
     className="transfer-modal"
     title="Confirmation"
     visible={this.state.confirmationModal}
     onOk={() => {
      console.log(this.state.selectedUser);
     }}
     onCancel={this.closeConfirmModal}
     footer={[
      <Button type="default" onClick={this.closeConfirmModal}>
       Cancel
      </Button>,
      <Button
       type="primary"
       loading={this.state.confirmLoading}
       onClick={() => this.confirmTransferSelctedUser(this.state.selectedUser)}
      >
       Confirm {this.state.confirmLoading ?? "ing"}
      </Button>,
      <p className="modal-footer-p mt-4">
       In case you transfer the page by mistake please contact arch17 support
       team at <span className="bold">support@arch17.co</span>
      </p>,
     ]}
    >
     <p>
      Are you sure you want to transfer your page ownership to the user below:
     </p>
     <div className="user-row">
      <div
       className="row-avatar"
       style={{
        backgroundImage: `url(${this.state.selectedUser?.photoURL})`,
       }}
      >
       {this.state.selectedUser?.photoURL &&
       this.state.selectedUser?.photoURL?.length > 4 ? (
        <></>
       ) : (
        <p>{this.state.selectedUser?.displayName}`</p>
       )}
      </div>
      <div>
       {this.state.selectedUser?.displayName}
       <span className="user-email">{this.state.selectedUser?.email}</span>
      </div>
     </div>
    </Modal>
   </>
  );
 }
}

export default SearchUsersModal;
