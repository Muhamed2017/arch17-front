import React, { Component, createRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Modal } from "antd";
import ShareModal from "../../components/Modals/ShareModal";
import { connect } from "react-redux";
import * as htmlToImage from 'html-to-image';

import {
 OPEN_SHARE_COLLECTION_MODAL,
 CLOSE_SHARE_COLLECTION_MODAL,
} from "./../../redux/constants";
import { API } from "../../utitlties";
import axios from 'axios'


const { TabPane } = Tabs;
class CollectionsTab extends Component {
 constructor(props) {
  super(props);
  this.domEl= createRef()
  this.state = {
   share_modal: false,
   sharable: "",
  };
 }
 openShareModal = () => {
  this.props.dispatch({
   type: OPEN_SHARE_COLLECTION_MODAL,
   
  });
 };


  filter =(node) => {
  return (node.tagName !== 'button');
}
  setCollectionPreviewForShare = (id, rect_0, rect_1, rect_2, type) => {
  // const dataBlob = await htmlToImage.toBlob(this.domEl.current);
  this.setState({
    rect_0,
    rect_1,
    rect_2,
  }, async ()=>{
    // const dataBlob = await htmlToImage.toBlob(document.getElementById(id), { filter: this.filter });
   const dataBlob = await htmlToImage.toBlob(this.domEl.current);

    const fd = new FormData()
    fd.append('cover', dataBlob)
   if(type==='products'){
    axios.post(`${API}folder-cover/${id}`, fd).then((res)=>{
      console.log(res)
    })
   }else{
    axios.post(`${API}board-cover/${id}`, fd).then((res)=>{
      console.log(res)
    })
   }
    console.log(dataBlob)
  })

 
}

 render() {
  return (
   <>
    <div className="user-collection-tab user-tab profile-tab" style={{
      // zIndex:"1"
    }}>
     <Container fluid>
      <Tabs type="" defaultActiveKey="">
       <TabPane tab="Products" key="productscollections">
        <Row className="mt-5">
         {Object.values(this.props.collections)?.length > 0 ? (
          <>
           {Object.values(this.props.collections).map((collection) => {
            return (
             <>
              <Col md={4} lg={4} sm={6} xs={6} className="collection-col" > 
               {collection.pics.ids.length > 0 ? (
                <>
                 <a href={`/${this.props.creator_name?.replace(" ","")}/${collection?.name?.replaceAll(" ","")}/collections/${collection.id}`}>
                  <div className="collection-box"
    // ref={this.domEl} 
    // id={`${collection.id}`}
                  
                  >
                   <div
                    className="rect rect-0"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[0]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-1"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[1]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-2"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[2]})`,
                    }}
                   ></div>
                   {/* </div> */}
                   <button
                    className="sharebtn"
                    onClick={(e) => {
                     e.preventDefault();
                     this.setState(
                      {
                       shareUrl: `https://www.arch17.com/${this.props?.creator_name?.replaceAll(" ","")}/${collection?.name?.replaceAll(" ","")}/${collection.id}`,
                       collection,
                       sharable: "folder",
                      },
                      () => {
                      //  this.setCollectionPreviewForShare(collection.id, collection.pics.pics[0], collection.pics.pics[1], collection.pics.pics[2])
                       this.setCollectionPreviewForShare(collection.id, collection.pics.pics[0], collection.pics.pics[1], collection.pics.pics[2], 'products')
                       this.openShareModal();

                      }
                     );
                    }}
                   >
                    Share
                   </button>
                  </div>

                  <div className="collection-text">
                   <h5>{collection.name}</h5>
                   <p>
                   {collection.pics.count} Products | 
                    Created By <span className="bold">{this.props.creator_name}</span>,
                   </p>
                  </div>
                 </a>
                </>
               ) : (
                <>
                 <div className="collection-box">
                  <div
                   className="rect rect-0"
                   style={{
                    backgroundImage: `url(${collection.pics.pics[0]})`,
                   }}
                  ></div>
                  <div
                   className="rect rect-1"
                   style={{
                    backgroundImage: `url(${collection.pics.pics[1]})`,
                   }}
                  ></div>
                  <div
                   className="rect rect-2"
                   style={{
                    backgroundImage: `url(${collection.pics.pics[2]})`,
                   }}
                  ></div>
                 </div>
                 <div className="collection-text">
                  <h5>{collection.name}</h5>
                  <p>EMPTY COLLECTION</p>
                 </div>
                </>
               )}
              </Col>
             </>
            );
           })}
          </>
         ) : (
          <p className="indicator py-5">You don't have any collection yet!</p>
         )}
        </Row>
       </TabPane>
       <TabPane tab="Projects" key="projectscollections">
        <Row className="mt-5">
         {Object.values(this.props.boards)?.length > 0 ? (
          <>
           {Object.values(this.props.boards).map((collection) => {
            return (
             <>
              <Col md={4} lg={4} sm={6} xs={6} className="collection-col">
               {collection.pics.ids.length > 0 ? (
                <>
                 {/* <a href={`/projectcollection/${collection.id}`}> */}
                 <a href={`/${this.props.creator_name?.replaceAll(" ", "")}/${collection?.name?.replaceAll(" ", "")}/sets/${collection.id}`}>
                  <div className="collection-box">
                   <div
                    className="rect rect-0 rect-project-0"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[0]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-1 rect-project-1"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[1]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-2 rect-project-2"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[2]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-3 rect-project-3"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[3]})`,
                    }}
                   ></div>
                   <button
                    className="sharebtn"
                    onClick={(e) => {
                     e.preventDefault();
                     this.setState(
                      {
                       shareUrl: `https://www.arch17.com/${this.props.creator_name?.replaceAll(" ","")}/${collection?.name.replaceAll(" ","")}/${collection.id}`,
                       collection,
                       sharable: "board",
                      },
                      () => {
                        this.setCollectionPreviewForShare(collection.id, collection.pics.pics[0], collection.pics.pics[1], collection.pics.pics[2], 'projects')
                       this.openShareModal();
                      }
                     );
                    }}
                   >
                    Share
                   </button>
                  </div>
                  <div className="collection-text">
                   <h5>{collection.name}</h5>
                   {/* <p>
                    NO Topics . Created By Creator of the collection,
                    {collection.pics.count} Projects
                   </p> */}
                    <p>
                     {collection.pics.count} Projects | 
                     Created By <span className="bold">{this.props.creator_name}</span> 
                    </p>
                  </div>
                 </a>
                </>
               ) : (
                <>
                 <div className="collection-box">
                  <div
                   className="rect rect-0 rect-project-0"
                   style={{
                    backgroundImage: `url(${collection.pics.pics[0]})`,
                   }}
                  ></div>
                  <div
                   className="rect rect-1 rect-project-1"
                   style={{
                    backgroundImage: `url(${collection.pics.pics[1]})`,
                   }}
                  ></div>
                  <div
                   className="rect rect-2 rect-project-2"
                   style={{
                    backgroundImage: `url(${collection.pics.pics[2]})`,
                   }}
                  ></div>
                  <div
                   className="rect rect-3 rect-project-3"
                   style={{
                    backgroundImage: `url(${collection.pics.pics[2]})`,
                   }}
                  ></div>
                 </div>
                 <div className="collection-text">
                  <h5>{collection.name}</h5>
                  <p>EMPTY COLLECTION</p>
                 </div>
                </>
               )}
              </Col>
             </>
            );
           })}
          </>
         ) : (
          <p className="indicator py-5">You don't have any collection yet!</p>
         )}
        </Row>
       </TabPane>
       {this.props.shared?.shared_folders?.length +
        this.props.shared?.shared_boards.length >
        0 && (
        <TabPane tab="Shared" key="shared">
         {this.props.shared?.shared_folders?.length > 0 && (
          <>
           <p className="mt-5">Products Collections</p>
           <Row className="mt-2">
            {this.props.shared?.shared_folders?.map((collection) => {
             return (
              <>
               <Col md={4} lg={4} sm={6} xs={6} className="collection-col">
                {collection.pics.ids.length > 0 ? (
                 <>
                  {/* <a href={`/usercollection/${collection.id}`}> */}
                  <a href={`/${this.props.creator_name?.replace(" ","")}/${collection?.name?.replaceAll(" ","")}/collections/${collection.id}`}>
                   <div className="collection-box">
                    <div
                     className="rect rect-0"
                     style={{
                      backgroundImage: `url(${collection.pics.pics[0]})`,
                     }}
                    ></div>
                    <div
                     className="rect rect-1"
                     style={{
                      backgroundImage: `url(${collection.pics.pics[1]})`,
                     }}
                    ></div>
                    <div
                     className="rect rect-2"
                     style={{
                      backgroundImage: `url(${collection.pics.pics[2]})`,
                     }}
                    ></div>
                   </div>
                   <div className="collection-text">
                    <h5>{collection.name}</h5>
                    {/* <p>
                     NO Topics . Created By Creator of the collection,
                     {collection.pics.count} Products
                    </p> */}
                     <p>
                     {collection.pics.count} Products | 
                     Created By <span className="bold">{this.props.creator_name}</span> 
                    </p>
                   </div>
                  </a>
                 </>
                ) : (
                 <>
                  <div className="collection-box">
                   <div
                    className="rect rect-0"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[0]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-1"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[1]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-2"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[2]})`,
                    }}
                   ></div>
                  </div>
                  <div className="collection-text">
                   <h5>{collection.name}</h5>
                   <p>EMPTY COLLECTION</p>
                  </div>
                 </>
                )}
               </Col>
              </>
             );
            })}
           </Row>
          </>
         )}
         {this.props.shared?.shared_boards?.length > 0 && (
          <>
           <p className="mt-5">Project Collections</p>
           <Row className="mt-2">
            {this.props.shared?.shared_boards?.map((collection) => {
             return (
              <>
               <Col md={4} lg={4} sm={6} xs={6} className="collection-col">
                {collection.pics.ids.length > 0 ? (
                 <>
                  {/* <a href={`/projectcollection/${collection.id}`}> */}
                  <a href={`/${this.props.creator_name?.replaceAll(" ", "")}/${collection?.name?.replaceAll(" ", "")}/sets/${collection.id}`}>
                   <div className="collection-box">
                    <div
                     className="rect rect-0 rect-project-0"
                     style={{
                      backgroundImage: `url(${collection.pics.pics[0]})`,
                     }}
                    ></div>
                    <div
                     className="rect rect-1 rect-project-1"
                     style={{
                      backgroundImage: `url(${collection.pics.pics[1]})`,
                     }}
                    ></div>
                    <div
                     className="rect rect-2 rect-project-2"
                     style={{
                      backgroundImage: `url(${collection.pics.pics[2]})`,
                     }}
                    ></div>
                    <div
                     className="rect rect-3 rect-project-3"
                     style={{
                      backgroundImage: `url(${collection.pics.pics[3]})`,
                     }}
                    ></div>
                    <button
                     className="sharebtn"
                     onClick={(e) => {
                      e.preventDefault();
                      this.setState(
                       {
                        shareUrl: `https://www.arch17.com/${this.props.creator_name?.replaceAll(" ","")}/${collection?.name?.replaceAll(" ","")}/${collection.id}`,
                        collection,
                       },
                       () => {
                        this.setState({
                         share_modal: true,
                        });
                       }
                      );
                     }}
                    >
                     Share
                    </button>
                   </div>
                   <div className="collection-text">
                    <h5>{collection.name}</h5>
                   
                     <p>
                     {collection.pics.count} Projects | 
                     Created By <span className="bold">{this.props.creator_name}</span> 
                    </p>
                   </div>
                  </a>
                 </>
                ) : (
                 <>
                  <div className="collection-box">
                   <div
                    className="rect rect-0 rect-project-0"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[0]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-1 rect-project-1"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[1]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-2 rect-project-2"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[2]})`,
                    }}
                   ></div>
                   <div
                    className="rect rect-3 rect-project-3"
                    style={{
                     backgroundImage: `url(${collection.pics.pics[2]})`,
                    }}
                   ></div>
                  </div>
                  <div className="collection-text">
                   <h5>{collection.name}</h5>
                   <p>EMPTY COLLECTION</p>
                  </div>
                 </>
                )}
               </Col>
              </>
             );
            })}
           </Row>
          </>
         )}
        </TabPane>
       )}
      </Tabs>
     </Container>
    </div>
    <Modal
     title="Share Collection"
     destroyOnClose
     className="sharemodal"
     visible={this.props.share_modal}
     style={{ top: 20 }}
     footer={false}
     closeIcon={
      <div
       className="mb-0"
       onClick={() => {
        this.props.dispatch({
         type: CLOSE_SHARE_COLLECTION_MODAL,
        });
       }}
      >
       X
      </div>
     }
    >
     <ShareModal
      shareUrl={this.props.share_modal}
      collection={this.state.collection}
      sharable={this.state.sharable}
      creator_name={this.props?.creator_name?.replaceAll(" ","")}
      user_id={this.state.user_id}
      sharer_id={this.props.user_id}
      cl
     />
    </Modal>
    <>
    <div className="py-2" 
      style={{
        // width:"600px",
        // height:"315px",
        width:"600px",
        height:"315px",
        background:"#fff",
        position:"sticky",
        zIndex:-1
      }}
    ref={this.domEl} 
    >
    <div className="collection-box sects"
   
    style={{
      // height:"100%",
      paddingTop:"unset"
    }}
    >
                   <div
                    className="sect sect-0"
                    style={{
                     backgroundImage: `url(${this.state.rect_0})`,
                     backgroundSize:"cover"
                    }}
                   >
                    <div className="lyr"></div>
                   </div>
                   <div
                    className="sect sect-1"
                    style={{
                     backgroundImage: `url(${this.state.rect_1})`,
                     backgroundSize:"cover"

                    }}
                   >
                    <div className="lyr"></div>
                   </div>
                   <div
                    className="sect sect-2"
                    style={{
                     backgroundImage: `url(${this.state.rect_2})`,
                     backgroundSize:"cover"

                    }}
                   >
                    <div className="lyr"></div>
                   </div>
    </div>
    </div>
    </>
   </>
  );
 }
}
const mapStateToProps = (state) => {
 return {
  share_modal: state.addProduct.share_modal,
 };
};
export default connect(mapStateToProps, null)(CollectionsTab);
