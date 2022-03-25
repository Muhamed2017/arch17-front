import React, { Component } from "react";
import { Row, Col, Button, Modal, Input } from "antd";
import Draggable from "react-draggable";
import { DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { addProjectRoles } from "./../../redux/actions/addProjectActions";
class RoleStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   designesModal: false,
   brandsModal: false,
   designers: [
    { id: 1, name: "Muhamed Gomaa", img: null },
    { id: 2, name: "Kareem Salah", img: null },
    { id: 3, name: "Sayed Fathy", img: null },
    { id: 4, name: "Islam Ussef", img: null },
    { id: 5, name: "Alaa Seleem", img: null },
    { id: 6, name: "Rania Ra'afat", img: null },
    { id: 7, name: "Dalia Ussef", img: null },
    { id: 8, name: "Ola Fahmy", img: null },
    { id: 9, name: "Layla Taher", img: null },
    { id: 10, name: "Hassan Akram", img: null },
   ],
   brands: [
    { id: 1, name: "Muhamed Brand", img: null },
    { id: 2, name: "Kareem Brand", img: null },
    { id: 3, name: "Sayed Brand", img: null },
    { id: 4, name: "Islam Brand", img: null },
    { id: 5, name: "Alaa Brand", img: null },
    { id: 6, name: "Rania Brand", img: null },
    { id: 7, name: "Dalia Brand", img: null },
    { id: 8, name: "Ola Brand", img: null },
    { id: 9, name: "Layla Brand", img: null },
    { id: 10, name: "Hassan Brand", img: null },
   ],
   addedDesigners: this.props.roles?.addedDesigners ?? [],
   addedDesIDs: this.props.roles?.addedDesIDs ?? [],
   addedBraIDs: this.props.roles?.addedBraIDs ?? [],
   addedBrands: this.props.roles?.addedBrands ?? [],

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
   filteredDesigners: this.state.designers,
  });
 };
 showBrandModal = () => {
  this.setState({
   brandsModal: true,
   filteredBrands: this.state.brands,
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
  this.setState({
   designesModal: false,
   addedDesIDs: [...this.state.addedDesIDs, d.id],
   addedDesigners: [...this.state.addedDesigners, d],
  });
 };
 handleAddBrand = (d) => {
  this.setState({
   brandsModal: false,
   addedBraIDs: [...this.state.addedBraIDs, d.id],
   addedBrands: [...this.state.addedBrands, d],
  });
 };
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
       {this.state.addedDesigners.map((d) => {
        return (
         <>
          <Col md={12} className="my-3">
           <div className="wraprow">
            <div className="d-img inline-block">{d?.name[0]}</div>
            <span className="inline-block">{d?.name}</span>
           </div>
          </Col>
          <Col md={12} className="my-3 text-right pr-70">
           <p
            className="pointer"
            onClick={() => {
             this.setState({
              addedDesigners: this.state.addedDesigners.filter((des) => {
               return des.id !== d.id;
              }),
              addedDesIDs: this.state.addedDesIDs.filter((id) => {
               return id !== d.id;
              }),
             });
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
      <Row className="text-center my-3">
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
       {this.state.addedBrands.map((b) => {
        return (
         <>
          <Col md={12} className="my-3">
           <div className="wraprow">
            <div className="d-img inline-block">{b?.name[0]}</div>
            <span className="inline-block">{b?.name}</span>
           </div>
          </Col>
          <Col md={12} className="my-3 text-right pr-70">
           <p
            className="pointer"
            onClick={() => {
             this.setState({
              addedBrands: this.state.addedBrands.filter((brand) => {
               return brand.id !== b.id;
              }),
              addedBraIDs: this.state.addedBraIDs.filter((id) => {
               return id !== b.id;
              }),
             });
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
      <Row className="text-center my-3">
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
     <Button
      type="primary"
      className="next-btn"
      onClick={() => {
       console.log(this.state);
       this.props.dispatchProjectRole({
        addedDesigners: this.state.addedDesigners,
        addedBrands: this.state.addedBrands,
        addedBraIDs: this.state.addedBraIDs,
        addedDesIDs: this.state.addedDesIDs,
       });
      }}
     >
      Save & Continue
     </Button>
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
        filteredDesigners: this.state.designers.filter((d) => {
         return d.name.toLowerCase()?.includes(e.target.value.toLowerCase());
        }),
       });
      }}
     />
     {this.state?.filteredDesigners?.map((d, key) => {
      if (!this.state.addedDesIDs.includes(d.id)) {
       return (
        <Row span={24} key={key}>
         <Col
          md={24}
          className="designers-row "
          onClick={() => this.handleAddDesigner(d)}
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
        filteredBrands: this.state.brands.filter((d) => {
         return d.name.toLowerCase()?.includes(e.target.value.toLowerCase());
        }),
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
});
const mapStateToProps = (state) => {
 return {
  roles: state.project.project_roles,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(RoleStep);
