import React, { Component } from "react";
import { auth } from "./../firebase";
import { API } from "./../utitlties";
import axios from "axios";

export class Home extends Component {
 constructor(props) {
  super(props);
  this.state = {
   vCode: "",
   verifying: false,
   validate_modal: false,
   sendingVcode: false,
  };
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
   axios.post(`${API}user`, fd).then((response) => {
    console.log(response);
    this.setState({ validate_modal: true });
    this.setState({ verifying: false });
    this.setState({ sendingVcode: false });
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
    .post(`${API}validate-code`, fd)
    .then((response) => {
     console.log(response);
     this.setState({ verifying: false });
    })
    .catch((error) => console.log(error));
  }
 };
 render() {
  if (auth.currentUser?.emailVerified === false) {
   return <></>;
  }
  return <></>;
 }
}

export default Home;
