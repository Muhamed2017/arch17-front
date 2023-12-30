import React, { Component } from "react";
import { connect } from "react-redux";
import "../../src/App.css";
import "../../src/pages/css/Collection.css";
import axios from "axios";

import {
 Row,
 Col,
 Spin,
 Drawer,
 Input,
 Checkbox,
 Button,
 Modal,
 Tooltip,
} from "antd";
import { API } from "./../utitlties";
import { Link } from "react-router-dom";
import {
 LoadingOutlined,
 EditFilled,
 CopyOutlined,
 ShareAltOutlined,
} from "@ant-design/icons";
import { Redirect } from "react-router";
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
class UserCollection extends Component {
 constructor(props) {
  super(props);
  this.state = {
   save_to_collection_modal: false,
   to_save_cover: null,
   to_save_productId: null,
   removing: false,
   collection_name: "",
  //  shareUrl: `https://www.arch17.com/usercollection/${this.props.match.params.id}`,
   shareUrl: `https://www.arch17.com/usercollection/${this.props.match.params.id}`,
   collection: {
    id: this.props.match.params.id,
    creator_name:this.props.match.params.username
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

 handleRemoveFromCollection = (product_id, collection_id) => {
  this.setState({
   removing: true,
  });
  const fd = new FormData();
  fd.append("product_id", product_id);
  fd.append("folder_id", collection_id);
  axios
   .post(`${API}unsave`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     removing: false,
     products: this.state.products.filter((p) => {
      return p.id !== product_id;
     }),
    });
   })
   .catch((err) => {});
 };

 handleCopy = async (text) => {
  if ("clipboard" in navigator) {
   return await navigator.clipboard.writeText(text);
  } else {
   return document.execCommand("copy", true, text);
  }
 };
 componentDidMount() {
  console.log(this.props.uid);
  axios.get(`${API}folder/${this.state.collection.id}`).then((response) => {
   console.log(response);
   this.setState((state) => ({
    products: response.data.products,
    collection_name: response.data.collection.name,
    collection_user_uid: response.data.collection.user_id,
    fetched: true,
   }));
  });
 }

 handleEditCollection = () => {
  const fd = new FormData();
  fd.append("name", this.state.collection_name);
  this.setState({
   editing: true,
  });
  axios
   .post(`${API}update-collection/${this.state.collection.id}`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     visible: false,
     editing: false,
    });
   })

   .catch((err) => {
    console.log(err);
   });
 };

 handleDeleteCollection = () => {
  this.setState({
   deleting: true,
  });
  axios
   .post(`${API}delete-collection/${this.state.collection.id}`)
   .then((response) => {
    console.log(response);
    this.setState({
     deleting: false,
     deleted: true,
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };


 render() {
  if (this.state.deleted) return <Redirect to="/profile" />;
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
  //  defaultValue={`https://www.arch17.com/${this.state.collection?.creator_name?.replaceAll(" ", "")}${this.state.collection_name}/${this.state.collection.id}`}

  let ShareURL=`https://www.arch17.com/${this.state.collection?.creator_name?.replaceAll(" ", "")}/${this.state.collection_name?.replaceAll(" ","")}/collections/${this.state.collection.id}`
  return (
   <>
    <div id="collection-page">
     <div className="head-container">
      <div className="head-wrapper">
       <p className="name">{this.state.collection.name}</p>
       <p className="col-name">
        Products in
        <span className="px-2 pr-5">
         {this.state.collection_name}
         {this.state.collection_user_uid === this.props.uid && (
          <EditFilled onClick={() => this.setState({ visible: true })} />
         )}
        </span>
       </p>
       <p
        className="share-btn"
        onClick={() => this.setState({ share_modal: true })}
       >
        <ShareAltOutlined />
       </p>
       {this.props.uid === this.state.collection_user_uid && (
        <>
         <p className="delete-p" onClick={this.handleDeleteCollection}>
          {this.state.deleting ? (
           <>
            <Spin
             size="large"
             indicator={
              <LoadingOutlined
               style={{ fontSize: "15px", color: "#000" }}
               spin
              />
             }
            />
           </>
          ) : (
           "Delete Collection"
          )}
         </p>
        </>
       )}
      </div>
     </div>

     <>
      <div className="products">
       <Row gutter={{ xs: 15, sm: 16, md: 24, lg: 24 }} className="py-5">
        {this.state.products?.length > 0 ? (
         <>
          {this.state.products?.map((product, index) => {
           return (
            <Col className="gutter-row mb-3" lg={6} md={6} sm={12} xs={12}>
             <a href={`/product/${product.id}`}>
              <div className="product">
               <div
                className="p-img"
                style={{
                 background: `url(${product?.preview_cover})`,
                }}
               >
                <div className="prlayer"></div>
                {this.state.collection_user_uid === this.props.uid && (
                 <>
                  <div
                   className="actns-btn svbtn"
                   style={{
                    background: "red",
                    color: "#fff",
                    border: "none",
                    minHeight: "29px",
                    textAlign: "center",
                    fontSize: ".8rem",
                    fontWeight: "600",
                    width: "80px",
                   }}
                   onClick={(e) => {
                    e.preventDefault();
                    this.handleRemoveFromCollection(
                     product.id,
                     this.state.collection.id
                    );
                   }}
                  >
                   {this.state.removing ? (
                    <>
                     <Spin
                      size="large"
                      indicator={
                       <LoadingOutlined
                        style={{ fontSize: "20px", color: "#000" }}
                        spin
                       />
                      }
                     />
                    </>
                   ) : (
                    "REMOVE -"
                   )}
                  </div>
                 </>
                )}
                {product?.files?.length > 0 ? (
                 <>
                  <div className="actns-btn file-btn cad">CAD</div>
                  <div className="actns-btn file-btn threeD">3D</div>
                 </>
                ) : (
                 ""
                )}
               </div>
               <h5 className="product-store">{product.stores?.name}</h5>
               {/* <p className="product-name">{product?.identity[0].name}</p> */}
               <p className="product-name">{product?.name}</p>
               <div className="product-price">
                {product?.preview_price &&
                product?.preview_price > 0 ? (
                 <>
                  {/* <span>¥ {product.identity[0].preview_price}</span> */}
                  <span>¥ {product?.preview_price}</span>
                 </>
                ) : (
                 <>
                  <Link
                   to={{
                    // pathname: `/product/${product?.identity[0].product_id}`,
                    pathname: `/product/${product?.product_id}`,
                    state: {
                     request_price: true,
                    },
                   }}
                  >
                   REQUEST PRICE INFO
                  </Link>
                 </>
                )}
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
           You Don't have any products in the collection
          </p>
         </>
        )}
       </Row>
      </div>
     </>
     <Drawer
      title="Edit Collection"
      placement={"left"}
      width={350}
      onClose={() => this.setState({ visible: false })}
      visible={this.state.visible}
     >
      <Input
       //  allowClear
       value={this.state.collection_name}
       size="large"
       style={{ width: "100%", margin: "10px auto" }}
       placeholder={`Rename Collection`}
       onChange={(e) => this.setState({ collection_name: e.target.value })}
      />
      <Checkbox
       onChange={(e) => {
        this.setState({ Ispublic: e.target.checked });
       }}
      >
       Visible
      </Checkbox>

      <Row className="mt-5" justify="right">
       <Col>
        <Button onClick={this.handleEditCollection}>
         {this.state.editing ? (
          <>
           <Spin
            size="large"
            indicator={
             <LoadingOutlined
              style={{ fontSize: "15px", color: "#000" }}
              spin
             />
            }
           />
          </>
         ) : (
          "Save"
         )}
        </Button>
       </Col>
      </Row>
     </Drawer>
    </div>

    {/* Share Modal */}
    <Modal
     title="Sahre Via"
     visible={this.state.share_modal}
     width={350}
     style={{ top: 40 }}
     onCancel={() => this.setState({ share_modal: false })}
    >
    <div className="share-grids">
    <div className="share-row">
      {/* <FacebookShareButton url={this.state.shareUrl} hashtag={"#Arch17"}> */}
      <FacebookShareButton url={ShareURL} hashtag={"#Arch17"}>
       <FacebookIcon size={35} />
       {/* Facebook */}
      </FacebookShareButton>
     </div>
     <div className="share-row">
      {/* <TwitterShareButton url={this.state.shareUrl} title="Share"> */}
      <TwitterShareButton url={ShareURL} title="Share">
       <TwitterIcon size={35} />
       {/* Twitter */}
      </TwitterShareButton>
     </div>
     <div className="share-row">
      <PinterestShareButton
      //  url={this.state.shareUrl}
       url={ShareURL}
       title="Share"
       media="https://res.cloudinary.com/azharuniversity/image/upload/v1639859531/ewhbtrqgav8xxoobzbyo.jpg"
      >
       <PinterestIcon size={35} />
       {/* Pinterest */}
      </PinterestShareButton>
     </div>
     <div className="share-row">
      {/* <LinkedinShareButton url={this.state.shareUrl} title="Share"> */}
      <LinkedinShareButton url={ShareURL} title="Share">
       <LinkedinIcon size={35} />
       {/* Linkedin */}
      </LinkedinShareButton>
     </div>
     <div className="share-row">
      <TumblrShareButton
      //  url={this.state.shareUrl}
       url={ShareURL}
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
       url={ShareURL}
       title="Share"
       tags={["Arch17", "Arch155"]}
       caption="Arch17 Product Name with skneknekn"
      >
       <EmailIcon size={35} />
       {/* Email */}
      </EmailShareButton>
     </div>
     <div className="share-row">
      <Input.Group compact>
       {/* <Input
        style={{ width: "calc(100% - 50px)" }}
        disabled
        defaultValue={ShareURL}
        // defaultValue={`https://www.arc17.com/${this.state.collection?.creator_name?.replaceAll(" ", "")}${this.state.collection_name}/${this.state.collection.id}`}
       /> */}
       <Tooltip title={this.state.copied ? "Copied" : "Copy Link"}>
        <Button
         icon={
          <CopyOutlined
           onClick={() =>
            // this.handleCopy(this.state.shareUrl).then(() => {
              this.handleCopy(ShareURL).then(() => {
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
    </Modal>
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
export default connect(mapStateToProps, null)(UserCollection);
