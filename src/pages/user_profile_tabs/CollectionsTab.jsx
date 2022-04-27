import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Modal } from "antd";
import ShareModal from "../../components/Modals/ShareModal";
import { connect } from "react-redux";
import { OPEN_SHARE_COLLECTION_MODAL } from "./../../redux/constants";

const { TabPane } = Tabs;
class CollectionsTab extends Component {
 constructor(props) {
  super(props);
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
 render() {
  return (
   <>
    <div className="user-collection-tab user-tab profile-tab">
     <Container fluid>
      <Tabs type="" defaultActiveKey="productscollections">
       <TabPane tab="Products" key="productscollections">
        <Row md={{ span: 12 }} className="mt-5">
         {Object.values(this.props.collections)?.length > 0 ? (
          <>
           {Object.values(this.props.collections).map((collection) => {
            return (
             <>
              <Col lg={4} sm={6} xs={12} className="collection-col">
               {collection.pics.ids.length > 0 ? (
                <>
                 <a href={`/usercollection/${collection.id}`}>
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
                   <button
                    className="sharebtn"
                    onClick={(e) => {
                     e.preventDefault();
                     this.setState(
                      {
                       shareUrl: `https://www.arch17test.live/usercollections/${collection.id}`,
                       collection,
                       sharable: "folder",
                      },
                      () => {
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
                    NO Topics . Created By Creator of the collection,
                    {collection.pics.count} Products
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
        <Row md={{ span: 12 }} className="mt-5">
         {Object.values(this.props.collections)?.length > 0 ? (
          <>
           {Object.values(this.props.boards).map((collection) => {
            return (
             <>
              <Col lg={4} sm={6} xs={12} className="collection-col">
               {collection.pics.ids.length > 0 ? (
                <>
                 <a href={`/projectcollection/${collection.id}`}>
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
                       shareUrl: `https://www.arch17test.live/projectcollections/${collection.id}`,
                       collection,
                       sharable: "board",
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
                    NO Topics . Created By Creator of the collection,
                    {collection.pics.count} Projects
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

           <Row md={{ span: 12 }} className="mt-2">
            {this.props.shared?.shared_folders?.map((collection) => {
             return (
              <>
               <Col lg={4} sm={6} xs={12} className="collection-col">
                {collection.pics.ids.length > 0 ? (
                 <>
                  <a href={`/usercollection/${collection.id}`}>
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
                    <p>
                     NO Topics . Created By Creator of the collection,
                     {collection.pics.count} Products
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
           <Row md={{ span: 12 }} className="mt-2">
            {this.props.shared?.shared_boards?.map((collection) => {
             return (
              <>
               <Col lg={4} sm={6} xs={12} className="collection-col">
                {collection.pics.ids.length > 0 ? (
                 <>
                  <a href={`/projectcollection/${collection.id}`}>
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
                        shareUrl: `https://www.arch17test.live/projectcollections/${collection.id}`,
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
                     NO Topics . Created By Creator of the collection,
                     {collection.pics.count} Projects
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
     className="sharemodal"
     visible={this.props.share_modal}
     style={{ top: 40 }}
     on
     onCancel={() => this.setState({ share_modal: false })}
    >
     <ShareModal
      shareUrl={this.props.share_modal}
      collection={this.state.collection}
      sharable={this.state.sharable}
      user_id={this.state.user_id}
      sharer_id={this.props.user_id}
     />
    </Modal>
   </>
  );
 }
}
const mapStateToProps = (state) => {
 return {
  //   uid: state?.regularUser?.info?.uid,
  //   displayName: state?.regularUser?.info?.displayName,
  share_modal: state.addProduct.share_modal,
 };
};
export default connect(mapStateToProps, null)(CollectionsTab);
