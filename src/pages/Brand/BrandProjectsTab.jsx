import React, { Component } from "react";
import { Col, Modal } from "antd";
import SaveToBoard from "./../../components/Modals/SaveToBoard";

class BrandProjectsTab extends Component {
 state = {
  save_to_board_modal: false,
 };

 render() {
  return (
   <>
    {this.props.projects?.map((p, index) => {
     return (
      //   <Col xs={12} sm={12} md={8} className="mb-4" key={index}>
      //    <a href={`/project/${p.id}`} className="box-link">
      //     <div className="project-col bg-white">
      //      {this.props.isOwner && (
      //       <>
      //        <a
      //         href={`/editproject/${p.id}`}
      //         className="box-link project-edit-btn project-btn"
      //        >
      //         Edit
      //        </a>
      //        <button
      //         className="project-btn project-delete-btn"
      //         onClick={(e) => {
      //          e.preventDefault();
      //         }}
      //        >
      //         Delete
      //        </button>
      //       </>
      //      )}
      //      <div
      //       className="project-image"
      //       style={{
      //        backgroundImage: `url(${p.cover})`,
      //       }}
      //      ></div>
      //      <div className="info p-3">
      //       <p className="project-name">{p.name}</p>

      //       <div className="project-cover-footer">
      //        <p className="m-0">{p.kind}</p>
      //        <hr className="my-1 w-20" />
      //        <p className="m-0">{p.type}</p>
      //       </div>
      //      </div>
      //     </div>
      //    </a>
      //   </Col>

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
          <span className="wide-view">SAVE</span>
          <span className="mobile-view mt-0">+</span>
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
          {/* <p className="project-name left">{p.name}</p> */}

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
            {/* {p?.kind?.slice(0, 2)?.map((k, index) => {
             return <span className="px-1">{k}</span>;
            })} */}
           </p>
           <hr className="my-1 w-20" />
           <p>
            <span className="px-1">{p?.type}</span>
           </p>
          </div>
         </div>
        </div>
       </a>
      </Col>
     );
    })}

    <Modal
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
    </Modal>
   </>
  );
 }
}

export default BrandProjectsTab;
