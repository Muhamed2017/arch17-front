import React, { Component } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import { API } from "../utitlties";
import { Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
import AuthModalContent from "./../components/AuthModalContent";
import { Modal as AntModal } from "antd";
import { connect } from "react-redux";
import SaveToBoard from "./../components/Modals/SaveToBoard";
class HomeProjects extends Component {
 constructor(props) {
  super(props);
  this.state = {
   projects: [],
   to_save_projectId: null,
   save_to_board_modal: false,
   authModal: false,
  };
 }
 saveToBoard = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
  } else {
   this.setState({
    save_to_board_modal: true,
   });
  }
 };
 componentDidMount() {
  const { innerWidth, innerHeight } = window;

  console.log(`width:${innerWidth} - height:${innerHeight}`);

  axios.get(`${API}dashboard/homepage/projectss`).then((response) => {
   console.log(response);
   const { projects } = response.data;
   this.setState({
    projects,
   });
  });
 }
 render() {
  return (
   <>
    <h2 className="home-center mb-0 home-heading">
     <span className="compressed bold-compressed">design</span>
     <span className="compressed light-compressed">selected</span>
    </h2>
    <p className="mb-4">Explore Design Projects, News & trends</p>

    <div className="innertab pt-5">
     <Row span={24} gutter={24}>
      {this.state.projects?.map((p, index) => {
       return (
        <>
         <Col xs={12} sm={12} md={8} className="mb-4" key={index}>
          <a href={`/project/${p.id}`} className="box-link">
           <div className="project-col bg-white">
            <button
             className="project-btn svbtn svprojectbtn"
             onClick={(e) => {
              e.preventDefault();
              this.setState(
               {
                to_save_project_cover: p.cover,
                to_save_projectId: p,
               },
               () => {
                this.saveToBoard();
               }
              );
             }}
            >
             <span className="wide">SAVE</span>
             <span className="mobile">+</span>
            </button>
            <div className="project-image-wrapper">
             <div
              className="project-image"
              style={{
               backgroundImage: `url(${p.cover})`,
              }}
             ></div>
            </div>
            <div className="info p-3 left mb-0">
             {window?.innerWidth > 500 ? (
              <>
               {p?.name?.length < 85 ? (
                <p className="project-name left">{p?.name}</p>
               ) : (
                <p className="project-name left">{`${p?.name?.slice(
                 0,
                 82
                )}...`}</p>
               )}
              </>
             ) : (
              <>
               {p?.name?.length < 47 ? (
                <p className="project-name left">{p?.name}</p>
               ) : (
                <p className="project-name left">{`${p?.name?.slice(
                 0,
                 44
                )}...`}</p>
               )}
              </>
             )}
             <div className="project-cover-footer">
              <p>
               {JSON.parse(p?.kind)?.map((k, index) => {
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
        </>
       );
      })}
     </Row>
     <Row>
      <a
       href="/design-selected"
       className="btn mt-4 seemore"
       style={{ paddingTop: "17px !important" }}
      >
       Go to Magazine
      </a>
     </Row>
    </div>

    <AntModal
     title={this.state.save_to_board_modal}
     width={700}
     className="request-modal"
     visible={this.state.save_to_board_modal}
     destroyOnClose={true}
     footer={false}
     closeIcon={
      <>
       <div onClick={() => this.setState({ save_to_board_modal: false })}>
        X
       </div>
      </>
     }
     okButtonProps={{ hidden: true }}
     cancelButtonProps={{ hidden: true }}
    >
     <SaveToBoard
      cover={this.state.to_save_project_cover}
      project={this.state.to_save_projectId}
     />
    </AntModal>

    <Modal
     size="lg"
     className="auth-modal"
     show={this.state.authModal && !this.props.isLoggedIn}
     onHide={() => this.setState({ authModal: false })}
     aria-labelledby="example-modal-sizes-title-lg"
     centered
    >
     <Modal.Body>
      <AuthModalContent />
     </Modal.Body>
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
export default connect(mapStateToProps, null)(HomeProjects);
// export default HomeProjects;
