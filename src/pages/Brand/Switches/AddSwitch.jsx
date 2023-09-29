import React, { Component } from "react";
import { Row, Col, Modal, Input, Progress } from "antd";
import axios from "axios";
import { API } from "./../../../static/constant";
class AddSwitch extends Component {
 constructor(props) {
  super(props);
  this.state = {
   add_modal: false,
   switch_code: "",
   switch_color: "",
   uploading: false,
   switch_preview: "",
   uploaded: 0,
  };
 }
 openAddSwitchModal = () => {
  this.setState({
   add_modal: true,
  });
 };
 addSwitch = () => {
  this.setState({
   add_modal: false,
  });
 };

 uploadSwitchImage = (e) => {
  let file = e.target.files[0];
  if (!file) return;

  this.setState({ switch_preview: URL.createObjectURL(file) });
  const fd = new FormData();
  fd.append("switch_image", file);
  const options = {
   onUploadProgress: (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    console.log(`${loaded} kb of ${total} | ${percent}%`);
    if (percent <= 100) {
     console.log(percent);
     this.setState({
      uploaded: percent,
     });
    }
   },
  };
  axios
   .post(`${API}upload-switch-photo`, fd, options)
   .then((response) => {
    this.setState({
     switch_path: response.data.path,
     uploading: false,
    });
   })
   .catch((err) => {
    console.log(err);
    this.setState({
     uploading: false,
    });
   });
 };
 render() {
  return (
   <>
    <Col md={4} onClick={this.openAddSwitchModal}>
     <div className="add-switch-btn"></div>
     <p>Add Switch </p>
    </Col>

    {/* add modal */}
    <Modal
     visible={this.state.add_modal}
     onCancel={() => {
      this.setState({
       add_modal: false,
      });
     }}
     title="Add Switch"
     closable
    >
     <Row span={24}>
      <Col md={12}>
       <div className="add-switch-btn">
        <span>+</span>
        <input type="file" onChange={this.uploadSwitchImage} />
        {this.state.switch_preview && this.state.uploaded > 100 && (
         <Progress
          style={{
           position: "absolute",
           top: "50%",
           right: "50%",
           transform: "translate(-50%, -50%)",
           zIndex: 6,
          }}
         />
        )}
       </div>

       <p className="upload-switch-photo">Upload Switch Photo</p>
      </Col>
      <Col md={24}>
       <Input
        placeholder="Switch Code"
        size="large"
        onChange={(e) => {
         this.setState({ switch_code: e.target.value });
        }}
        value={this.state.switch_code}
       />
      </Col>
      <Col md={24}>
       <Input
        size="large"
        placeholder="Switch Color"
        onChange={(e) => {
         this.setState({ switch_color: e.target.value });
        }}
        value={this.state.switch_color}
       />
      </Col>
      <span>Yellow, Green, Blue, ...</span>
      <button onClick={this.addSwitch}>Add</button>
     </Row>
    </Modal>
   </>
  );
 }
}

export default AddSwitch;
