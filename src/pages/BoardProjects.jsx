import React, { Component } from "react";
import { connect } from "react-redux";
import "../../src/App.css";
import "../../src/pages/css/Collection.css";
import axios from "axios";

import { Row, Col, Spin } from "antd";
import { API } from "./../utitlties";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

class BoardProjects extends Component {
 constructor(props) {
  super(props);
  this.state = {
   save_to_collection_modal: false,
   to_save_cover: null,
   to_save_productId: null,
   removing: false,
   collection_name: "",
   shareUrl: `https://www.arch17test.live/usercollection/${this.props.match.params.id}`,
   board: {
    id: this.props.match.params.id,
   },
   authModal: false,
   brand: null,
   products: [],
   followers: [],
   visible: false,
   editing: false,
   deleting: false,
   deleted: false,
   fetched: false,
   share_modal: false,
   copied: false,
  };
 }

 handleCopy = async (text) => {
  if ("clipboard" in navigator) {
   return await navigator.clipboard.writeText(text);
  } else {
   return document.execCommand("copy", true, text);
  }
 };
 componentDidMount() {
  console.log(this.props.uid);
  axios.get(`${API}board/${this.state.board?.id}`).then((response) => {
   console.log(response);
   this.setState((state) => ({
    board: response.data.board,
    projects: response.data.projects,
    fetched: true,
   }));
  });
 }

 render() {
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
   <>
    <div id="collection-page">
     <div className="head-container">
      <p className="col-name">
       Projects in
       <span className="px-2 pr-5">{this.state.board?.name}</span>
      </p>
     </div>

     <>
      <div className="products">
       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} className="py-5">
        {this.state.projects.length > 0 ? (
         <>
          {this.state.projects?.map((p, index) => {
           return (
            <Col xs={24} sm={12} md={8} className="my-4" key={index}>
             <a href={`/project/${p.id}`} className="box-link">
              <div className="project-col bg-white">
               <div className="project-image-wrapper">
                <div
                 className="project-image"
                 style={{
                  backgroundImage: `url(${p.cover})`,
                 }}
                ></div>
               </div>

               <div className="info p-3 left">
                <p className="project-name left">{p.name}</p>

                <div className="project-cover-footer">
                 <p>
                  {p.kind?.map((k) => {
                   return <span className="px-1">{k}</span>;
                  })}
                 </p>
                 <hr className="my-1 w-20" />
                 <p>
                  <span className="px-1">{p.type}</span>
                 </p>
                </div>
               </div>
              </div>
             </a>
            </Col>
           );
          })}
         </>
        ) : (
         <>
          <p className="indicator">
           You Don't have any Projects in the collection
          </p>
         </>
        )}
       </Row>
      </div>
     </>
    </div>
   </>
  );
 }
}
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
 };
};
export default connect(mapStateToProps, null)(BoardProjects);
