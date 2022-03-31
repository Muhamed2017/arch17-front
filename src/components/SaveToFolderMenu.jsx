import React, { Component } from "react";
import { Menu, Modal, Spin, Row, Col } from "antd";
import NewCollectionModal from "./Modals/NewCollectionModal";
import axios from "axios";
import { AiFillPlusCircle, AiFillHeart } from "react-icons/ai";
import { VscFolderActive } from "react-icons/vsc";
import { API } from "./../utitlties";

class SaveToFolderMenu extends Component {
 constructor(props) {
  super(props);
  this.state = {
   save_modal: false,
   name: this.props.name,
   cover: this.props.cover,
   id: this.props.id,
   user_id: this.props.user_id,
   menueVisible: false,
   collections: [],
   saving: false,
   loaded: false,
   embeded_collections: [
    "Classic",
    "Modern",
    "Default",
    // "Chairs",
    // "Sofas",
    // "Oriantal",
   ],
  };
 }
 saveToCollectionRequest = (product_id, folder_id, index) => {
  this.setState({ saving: true });
  const fd = new FormData();
  fd.append("product_id", product_id);
  fd.append("folder_id", folder_id);
  // const _collections = collections;
  const _collections = this.state.collections;
  _collections[index].saved = true;
  axios
   .post(`${API}save`, fd)
   .then((response) => {
    console.log(response);
    this.setState({ collections: _collections, saving: false });
   })
   .catch((err) => {
    this.setState({ saving: false });
   });
 };
 componentDidMount() {
  axios
   .get(`${API}allcollections/${this.state.user_id}`)
   .then((res) => {
    console.log(res);
    this.setState({
     collections: res.data.products,
     //  collections: this.state.embeded_collections,
     loaded: true,
    });
   })
   .catch((err) => {
    this.setState({ loaded: true });
   });
 }
 render() {
  if (!this.state.loaded) {
   return (
    <>
     <div style={{ maxHeight: "100px" }}>
      <Spin
       size="large"
       style={{ position: "absolute", top: "50%", right: "50%" }}
      />
     </div>
    </>
   );
  } else {
   return (
    <>
     <Menu className="homedropdown">
      {this.state.collections.map((collection, index) => {
       return (
        <>
         <Menu.Item key={index}>
          <Row gutter={24} align="middle" key={index}>
           <Col
            md={4}
            style={{
             fontSize: "1.5rem",
            }}
           >
            <VscFolderActive />
           </Col>
           <Col
            md={16}
            style={{
             fontSize: "1rem",
             fontWeight: "600",
             fontFamily: "Roboto",
            }}
           >
            {collection.name}
           </Col>
           <Col
            md={4}
            style={{
             fontSize: "1.5rem",
             //  color: "#ccc",
             color: collection.saved ? "red" : "#ccc",
            }}
           >
            <AiFillHeart
             onClick={() =>
              this.saveToCollectionRequest(this.state.id, collection.id, index)
             }
            />
           </Col>
          </Row>
         </Menu.Item>
        </>
       );
      })}
      <Menu.Item key="addcoll">
       <Row
        justify="center"
        gutter={1}
        style={{
         background: "#f2f2f2",
        }}
        onClick={() => {
         this.setState({
          save_modal: true,
          menueVisible: false,
         });
        }}
       >
        <Col
         md={12}
         style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          fontFamily: "Roboto",
         }}
        >
         Create Board
        </Col>
        <Col
         md={10}
         style={{
          fontSize: "2rem",
         }}
        >
         <button>
          <AiFillPlusCircle />
         </button>
        </Col>
       </Row>
      </Menu.Item>
     </Menu>
     <>
      <Modal
       title={"Create Board"}
       width={700}
       centered
       className="request-modal save-board"
       visible={this.state.save_modal}
       destroyOnClose
       footer={false}
       closeIcon={
        <>
         <div onClick={() => this.setState({ save_modal: false })}>X</div>
        </>
       }
       okButtonProps={{ hidden: true }}
       cancelButtonProps={{ hidden: true }}
      >
       <NewCollectionModal cover={this.state.cover} />
      </Modal>
     </>
    </>
   );
  }
 }
}

export default SaveToFolderMenu;
