import React, { Component } from "react";
import {
 FacebookShareButton,
 LinkedinShareButton,
 TwitterShareButton,
 PinterestShareButton,
 TumblrShareButton,
 EmailShareButton,
 PinterestIcon,
 FacebookIcon,
 LinkedinIcon,
 TwitterIcon,
 TumblrIcon,
 EmailIcon,
} from "react-share";

import { Row, Col, Spin, message } from "antd";
import axios from "axios";
import { CopyOutlined, LoadingOutlined } from "@ant-design/icons";
import { Input, Button, Tooltip } from "antd";
import { API } from "./../../utitlties";
import { connect } from "react-redux";
import { CLOSE_SHARE_COLLECTION_MODAL } from "./../../redux/constants";

class ShareModal extends Component {
 constructor(props) {
  super(props);
  this.state = {
    search_designer_word:"",
   shsareUrl: this.props.shareUrl,
   collection: this.props.collection,
   designers: [],
   shareing: false,
   gettingdesigners: true,
  };
 }
 handleCopy = async (text) => {
  if ("clipboard" in navigator) {
   return await navigator.clipboard.writeText(text);
  } else {
   return document.execCommand("copy", true, text);
  }
 };

 handleShareWithUser = (id, name, type) => {
  this.setState({
   sharing: true,
  });

  const fd = new FormData();
  fd.append("user_id", id);
  fd.append("sharer_id", this.props.sharer_id);
  if (this.props.sharable === "board") {
   fd.append("board_id", this.props.collection.id);
  }
  if (this.props.sharable === "folder") {
   fd.append("folder_id", this.props.collection.id);
  }
  fd.append("sharer_name", this.props.displayName);
  axios
   .post(`${API}sharecollection`, fd)
   .then((response) => {
    this.props.dispatch({
     type: CLOSE_SHARE_COLLECTION_MODAL,
    });
    console.log(response);

    this.setState({
     sharing: false,
    });
    message.success("Shared Successfully");
   })
   .catch((err) => {
    console.log(err);
    this.setState({
     sharing: false,
    });
    message.error("Error occured, try later");
   });
 };

 componentDidMount() {
  axios
   .get(`${API}rolestepdata`)
   .then((response) => {
    this.setState(
     {
      designers: Object.values(response.data.users),
      gettingdesigners: false,
     },
     () => {
      this.setState({
       filteredDesigners: this.state.designers,
      });
     }
    );
   })

   .catch((e) => {
    console.log(e);
    this.setState({
     gettingdesigners: false,
    });
   });
 }
 render() {
  let SHARE_URL= this.props.sharable==='folder'?  `http://www.arch17.com/${this.props.creator_name}/${this.state.collection?.name?.replaceAll(" ","")}/collections/${this.state.collection?.id}`:
  `http://www.arch17.com/${this.props.creator_name}/${this.state.collection?.name?.replaceAll(" ","")}/sets/${this.state.collection?.id}`
  

  return (
   <>
    <div id="user_shares">
     <p className="mb-0 sharetype">Users</p>
     <Input
      className="my-3"
      style={{
       margin: "10px auto",
      }}
      placeholder="search users to share collection with"
      size="middle"
      onChange={(e) => {
       console.log(e);
       this.setState({
        search_designer_word:e.target.value,
        filteredDesigners: e.target.value?.length>1 ? this.state.designers?.filter((d) => {
         return d.displayName
          .toLowerCase()
          ?.includes(e.target.value.toLowerCase());
        }):[],
       });
      }}
     />
     {this.state.gettingdesigners  && this.state.search_designer_word >1 ? (
      <div className="py-5">
       <Spin
        size="large"
        indicator={
         <LoadingOutlined style={{ fontSize: "25px", color: "#000" }} spin />
        }
        style={{
         position: "absolute",
         right: "50%",
        }}
       />
      </div>
     ) : (
      <>
       <div className="d-share-rows">
        {this.state.search_designer_word?.length>1 && this.state?.filteredDesigners?.map((d, key) => {
         if (!this.state.addedDesIDs?.includes(d.id)) {
          return (
           <Row span={24} key={key}>
            <Col
             md={24}
             className="designers-row"
             onClick={() => {
              this.handleShareWithUser(d.id, d.name, "projects");
              this.props.dispatch({
               type: CLOSE_SHARE_COLLECTION_MODAL,
              });
             }}
            >
             <div
              style={{ background: `url(${d.avatar})` }}
              className="d-img inline-block middle"
             >
              {d?.avatar?.length < 10 && <>{d?.displayName?.slice(0, 1)} </>}
             </div>
             <span className="inline-block middle">{d?.displayName}</span>
            </Col>
           </Row>
          );
         }
        })}
       </div>
      </>
     )}
    </div>

    <div id="social_shares">
     <p className="mb-2 sharetype">Social</p>
     <div className="share-grids">
     <div className="share-row mt-1">
      <FacebookShareButton 
      // url={this.state.shareUrl}
      url={SHARE_URL}
       hashtag={"#Arch17"}>
       <FacebookIcon size={35} />
       {/* Facebook */}
      </FacebookShareButton>
     </div>
     <div className="share-row">
      <TwitterShareButton
      //  url={this.state.shareUrl}
        title="Share"
      url={SHARE_URL}
      
      >
       <TwitterIcon size={35} />
       {/* Twitter */}
      </TwitterShareButton>
     </div>
     <div className="share-row">
      <PinterestShareButton
      url={SHARE_URL}
      //  url={this.state.shareUrl}
       title="Share"
       media="https://res.cloudinary.com/azharuniversity/image/upload/v1639859531/ewhbtrqgav8xxoobzbyo.jpg"
      >
       <PinterestIcon size={35} />
       {/* Pinterest */}
      </PinterestShareButton>
     </div>
     <div className="share-row">
      <LinkedinShareButton url={this.state.shareUrl} title="Share">
       <LinkedinIcon size={35} />
       {/* Linkedin */}
      </LinkedinShareButton>
     </div>
     <div className="share-row">
      <TumblrShareButton
      //  url={this.state.shareUrl}
       url={SHARE_URL}
       title="Share"
       tags={["Arch17", "Arch155"]}
       caption="Arch17 Product Name with skneknekn"
      >
       <TumblrIcon size={35} />
       {/* Tumblr */}
      </TumblrShareButton>
     </div>
     <div className="share-row">
      <EmailShareButton
      //  url={this.state.shareUrl}
       url={SHARE_URL}
       title="Share"
       tags={["Arch17", "Arch155"]}
       caption="Arch17 Product Name with skneknekn"
      >
       <EmailIcon size={35} />
       {/* Email */}
       {" "}
      </EmailShareButton>
     </div>
     <div className="share-row">
      <Input.Group compact>
       {/* <Input
        style={{ width: "calc(100% - 50px)" }}
        disabled
        defaultValue={SHARE_URL}
        // defaultValue={`http://wwww.arch17.com/${this.props.displayName?.replaceAll(" ","")}/${this.state.collection?.name?.replaceAll(" ","")}/collections/${this.state.collection?.id}`}
        // defaultValue={`https://www.arch17test.live/projectcollections/${this.state.collection?.id}`}
       /> */}
       <Tooltip title={this.state.copied ? "Copied" : "Copy Link"}>
        <Button
         icon={
          <CopyOutlined
           onClick={() =>
            // this.handleCopy(this.state.shareUrl).then(() => {
              this.handleCopy(SHARE_URL).then(() => {
             this.setState({ copied: true });
             setTimeout(() => {
              this.setState({ copied: false });
             }, 3500);
            })
           }
          />
         }
        />
       </Tooltip>
      </Input.Group>
     </div>
     </div>
    </div>
   </>
  );
 }
}
const mapStateToProps = (state) => {
 return {
  uid: state?.regularUser?.info?.uid,
  displayName: state?.regularUser?.info?.displayName,
  share_modal: state.addProduct.share_modal,
  // creator_name:state.addProduct.creator_name
 };
};
export default connect(mapStateToProps, null)(ShareModal);
