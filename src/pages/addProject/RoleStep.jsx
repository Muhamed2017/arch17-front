import React, { Component } from "react";
import { Row, Col, Button, Modal, Input } from "antd";
import Draggable from "react-draggable";
import { DeleteOutlined } from "@ant-design/icons";
import { IoLocation } from "react-icons/io5";
import { connect } from "react-redux";
import axios from "axios";
import {
 addProjectRoles,
 addProjectRoleDesigner,
 addProjectRoleBrand,
 deleteProjectRoleBrand,
 deleteProjectRoleDesigner,
 goToProjectStep,
} from "./../../redux/actions/addProjectActions";
import { API } from "../../utitlties";
class RoleStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   designesModal: false,
   brandsModal: false,
   designers: [],
   brands: [],
   addedDesigners: this.props.designers ?? [],
   addedBrands: this.props.brands ?? [],
   addedDesIDs: this.props.designers?.map((des) => {
    return des.id;
   }),
   addedBraIDs: this.props.brands?.map((b) => {
    return b.id;
   }),

   disabled: true,
   bounds: { left: 0, top: 0, bottom: 0, right: 0 },
   filteredBrands: [],
  };
 }
 draggleRef = React.createRef();

 onStart = (event, uiData) => {
  const { clientWidth, clientHeight } = window.document.documentElement;
  const targetRect = this.draggleRef.current?.getBoundingClientRect();
  if (!targetRect) {
   return;
  }
  this.setState({
   bounds: {
    left: -targetRect.left + uiData.x,
    right: clientWidth - (targetRect.right - uiData.x),
    top: -targetRect.top + uiData.y,
    bottom: clientHeight - (targetRect.bottom - uiData.y),
   },
  });
 };
 showModal = () => {
  this.setState({
   designesModal: true,
   //  filteredDesigners: this.state.designers,
  });
 };
 showBrandModal = () => {
  this.setState({
   brandsModal: true,
   //  filteredBrands: this.state.brands,
  });
 };
 handleOk = (e) => {
  console.log(e);
  this.setState({
   designesModal: false,
  });
 };
 handleBrandOk = (e) => {
  console.log(e);
  this.setState({
   brandsModal: false,
  });
 };
 handleCancel = (e) => {
  console.log(e);
  this.setState({
   designesModal: false,
  });
 };
 handleBrandCancel = (e) => {
  console.log(e);
  this.setState({
   brandsModal: false,
  });
 };
 handleAddDesigner = (d) => {
  this.setState(
   {
    designesModal: false,
    addedDesIDs: [...this.state.addedDesIDs, d.id],
    addedDesigners: [...this.state.addedDesigners, d],
   },
   () => {
    this.props.dispatchAddDesigner(d);
   }
  );
 };
 handleAddBrand = (d) => {
  this.setState(
   {
    brandsModal: false,
    addedBraIDs: [...this.state.addedBraIDs, d.id],
    addedBrands: [...this.state.addedBrands, d],
   },
   () => {
    this.props.dispatchAddBrand(d);
   }
  );
 };
 componentDidMount() {
  window.scrollTo({
   top: 0,
  });
  axios
   .get(`${API}rolestepdata`)
   .then((response) => {
    this.setState({
     brands: response.data.brands,
     designers: Object.values(response.data.users),
    });
    console.log(response);
   })
   .catch((e) => {
    console.log(e);
   });
 }
 render() {
  const { designesModal, disabled, bounds, brandsModal } = this.state;

  return (
   <>
    <div id="rolestep">
     <div className="designers-section section">
      <Row span={24} gutter={10}>
       <Col md={24} className="mt-3 mb-5 bold">
        <p className="text-center py-2">Designer / Design company</p>
       </Col>
      </Row>
      {this.state.addedDesigners.length > 0 && (
       <>
        <Row span={24} className="mb-4 pl-70">
         <Col md={12}>Name</Col>
         <Col md={12} className="text-right pr-70">
          Delete
         </Col>
        </Row>
        <hr className="w-90 m-auto" />
       </>
      )}
      <Row span={24}>
       {this.state.addedDesigners?.map((d) => {
        return (
         <>
          <Col md={20} className="my-3">
           <Row span={24} align="middle" gutter={70}>
            <Col md={4}>
             <div className="wraprow">
              <div
               className="d-img inline-block"
               style={{
                backgroundImage: `url(${d.photoURL})`,
               }}
              >
               {d?.photoURL?.length < 10 && <>{d?.displayName[0]}</>}
              </div>
             </div>
            </Col>
            <Col md={20}>
             <div className="d-info">
              <span className="inline-block">{d?.displayName}</span>
              {/* <div className="d-professions">
               {d.professions.map((p, index) => {
                return <p key={index}>{p}</p>;
               })}
              </div> */}

              <p className="d-loc">
               {d.country && (
                <>
                 <IoLocation />
                 {d.country}
                 {d.city && <>, {d.city}</>}
                </>
               )}
              </p>
             </div>
            </Col>
           </Row>
          </Col>
          <Col md={4} className="my-3 text-right pr-70">
           <p
            className="pointer"
            onClick={() => {
             this.setState(
              {
               addedDesigners: this.state.addedDesigners?.filter((des) => {
                return des.id !== d.id;
               }),
               addedDesIDs: this.state.addedDesIDs?.filter((id) => {
                return id !== d.id;
               }),
              },
              () => {
               this.props.dispatchDeleteDesigner(d);
              }
             );
            }}
           >
            <DeleteOutlined />
           </p>
          </Col>
          <Col md={24}>
           <hr className="w-90 m-auto block" />
          </Col>
         </>
        );
       })}
      </Row>
      <Row className="text-center my-3 mt-5">
       <Col md={24}>
        <Button
         danger
         size="large"
         color="#000"
         className="px-4"
         onClick={this.showModal}
        >
         Add
        </Button>
       </Col>
      </Row>
     </div>
     {/* <hr className="w-50 text-center m-auto mb-5" /> */}

     <div className="brands-sections section">
      <Row span={24} gutter={10}>
       <Col md={24} className="mt-3 mb-5 bold">
        <p className="text-center py-2">Brand</p>
       </Col>
      </Row>
      {this.state.addedBrands.length > 0 && (
       <>
        <Row span={24} className="mb-4 pl-70">
         <Col md={12}>Name</Col>
         <Col md={12} className="text-right pr-70">
          Delete
         </Col>
        </Row>
        <hr className="w-90 m-auto" />
       </>
      )}
      <Row span={24}>
       {this.state.addedBrands?.map((b) => {
        return (
         <>
          <Col md={20} className="my-3">
           <Row span={24} align="middle" gutter={70}>
            <Col md={4}>
             <div className="wraprow">
              <div
               className="d-img inline-block"
               style={{
                backgroundImage: `url(${b.cover})`,
               }}
              >
               {!b.cover && <>{b?.name[0]}</>}
              </div>
             </div>
            </Col>
            <Col md={20} className="">
             <div className="d-info">
              <span className="inline-block">{b?.name}</span>
              <p className="mb-0 b-type">Brand</p>
              <p className="mb-0 b-count">
               <span>{b.followers?.length}</span>Followers
              </p>
              <p className="d-loc">
               {b.country && (
                <>
                 <IoLocation />
                 {b.country}
                 {b.city && <>, {b.city}</>}
                </>
               )}
              </p>
             </div>
            </Col>
           </Row>
          </Col>
          <Col md={4} className="my-3 text-right pr-70">
           <p
            className="pointer"
            onClick={() => {
             this.setState(
              {
               addedBrands: this.state.addedBrands?.filter((brand) => {
                return brand.id !== b.id;
               }),
               addedBraIDs: this.state.addedBraIDs?.filter((id) => {
                return id !== b.id;
               }),
              },
              () => {
               this.props.dispatchDeleteBrand(b);
              }
             );
            }}
           >
            <DeleteOutlined />
           </p>
          </Col>
          <Col md={24}>
           <hr className="w-90 m-auto block" />
          </Col>
         </>
        );
       })}
      </Row>
      <Row className="text-center my-3 mt-5">
       <Col md={24}>
        <Button
         danger
         size="large"
         color="#000"
         className="px-4"
         onClick={this.showBrandModal}
        >
         Add
        </Button>
       </Col>
      </Row>
     </div>

     <div className="next-wrapper">
      <div className="next-inner">
       <button
        className="prev-btn"
        style={{ margin: "0 0px", position: "relative" }}
        onClick={() => this.props.dispatchGoStep(1)}
       >
        Previous
       </button>
       <button
        className="next-btn"
        onClick={() => {
         //  this.props.dispatchGoStep(3);
         if (this.props.brands?.length > 0) {
          this.props.dispatchGoStep(3);
         } else {
          this.props.dispatchGoStep(4);
         }
        }}
       >
        Save & Continue
       </button>
      </div>
     </div>
    </div>

    <Modal
     className="designers-modal"
     width={350}
     title={
      <div
       style={{
        width: "100%",
        cursor: "move",
       }}
       onMouseOver={() => {
        if (disabled) {
         this.setState({
          disabled: false,
         });
        }
       }}
       onMouseOut={() => {
        this.setState({
         disabled: true,
        });
       }}
      >
       Designers
      </div>
     }
     visible={designesModal}
     onOk={this.handleOk}
     footer={null}
     onCancel={this.handleCancel}
     modalRender={(modal) => (
      <Draggable
       disabled={disabled}
       bounds={bounds}
       onStart={(event, uiData) => this.onStart(event, uiData)}
      >
       <div ref={this.draggleRef}>{modal}</div>
      </Draggable>
     )}
    >
     <Input
      placeholder="Search Desigers"
      size="large"
      onChange={(e) => {
       console.log(e);
       this.setState({
        filteredDesigners:
         e.target.value.length > 0
          ? this.state.designers?.filter((d) => {
             return d.displayName
              .toLowerCase()
              ?.includes(e.target.value.toLowerCase());
            })
          : [],
       });
      }}
     />
     {this.state?.filteredDesigners?.map((d, key) => {
      if (!this.state.addedDesIDs?.includes(d.id)) {
       return (
        <Row span={24} key={key}>
         <Col
          md={24}
          className="designers-row"
          onClick={() => this.handleAddDesigner(d)}
         >
          <div
           style={{ background: `url(${d.photoURL})` }}
           className="d-img inline-block middle"
          >
           {d?.photoURL?.length < 10 && <>{d?.displayName?.slice(0, 1)} </>}
           {/* {d?.displayName?.slice(0, 1)} */}
          </div>
          <span className="inline-block middle">{d?.displayName}</span>
         </Col>
        </Row>
       );
      }
     })}
    </Modal>
    <Modal
     className="designers-modal"
     width={450}
     footer={null}
     title={
      <div
       style={{
        width: "100%",
        cursor: "move",
       }}
       onMouseOver={() => {
        if (disabled) {
         this.setState({
          disabled: false,
         });
        }
       }}
       onMouseOut={() => {
        this.setState({
         disabled: true,
        });
       }}
      >
       Brands
      </div>
     }
     visible={brandsModal}
     onOk={this.handleBrandOk}
     onCancel={this.handleBrandCancel}
     modalRender={(modal) => (
      <Draggable
       disabled={disabled}
       bounds={bounds}
       onStart={(event, uiData) => this.onStart(event, uiData)}
      >
       <div ref={this.draggleRef}>{modal}</div>
      </Draggable>
     )}
    >
     <Input
      placeholder="Search Brands"
      size="large"
      onChange={(e) => {
       console.log(e);
       this.setState({
        filteredBrands:
         e.target.value.length > 0
          ? this.state.brands?.filter((d) => {
             return d.name
              .toLowerCase()
              ?.includes(e.target.value.toLowerCase());
            })
          : [],
       });
      }}
     />
     {this.state?.filteredBrands?.map((d) => {
      if (!this.state.addedBraIDs?.includes(d.id)) {
       return (
        <Row span={24}>
         <Col
          md={24}
          className="designers-row "
          onClick={() => this.handleAddBrand(d)}
         >
          <div className="d-img inline-block middle">
           {d?.name?.slice(0, 1)}
          </div>
          <span className="inline-block middle">{d?.name}</span>
         </Col>
        </Row>
       );
      }
     })}
    </Modal>
   </>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 dispatchProjectRole: (roles) => dispatch(addProjectRoles(roles)),
 dispatchAddDesigner: (designer) => dispatch(addProjectRoleDesigner(designer)),
 dispatchAddBrand: (brand) => dispatch(addProjectRoleBrand(brand)),
 dispatchDeleteBrand: (brand) => dispatch(deleteProjectRoleBrand(brand)),
 dispatchGoStep: (step) => dispatch(goToProjectStep(step)),

 dispatchDeleteDesigner: (designer) =>
  dispatch(deleteProjectRoleDesigner(designer)),
});
const mapStateToProps = (state) => {
 return {
  roles: state.project.project_roles,
  designers: state.project.role_designers,
  brands: state.project.role_brands,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(RoleStep);
