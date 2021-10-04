import React, { Component } from "react";
import { Row, Col, Tabs } from "antd";
import "../../src/pages/Brand.css";
import axios from "axios";
import * as utility from "../utitlties";
import { connect } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { IoEarthSharp, IoShareSocial } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import BrandSettingTab from "./BrandSettingTab";
import collection1 from "../../src/collection-1.png";
import collection2 from "../../src/collection-2.jpg";
import collection3 from "../../src/collection-3.jpg";
// import {
//  presistInfo,
//  updateInfo,
//  emailPasswordSignupSuccess,
// } from "../redux/actions/authActions";
const { TabPane } = Tabs;
function callback(key) {
 console.log(key);
}
class Brand extends Component {
 constructor(props) {
  super(props);
  this.state = {
   profile: false,
   brand_id: this.props.match.params.id,
   brand: null,
   isOwner: false,
   collections: null,
  };
 }
 componentDidMount() {
  // console.log(this.state.brand_id);
  // console.log(this.props.userInfo);
  axios
   .get(`${utility.API}brand/${this.state.brand_id}`)
   .then((response) => {
    console.log(response);
    // this.setState({collection})
    this.setState({
     brand: response.data,
     isOwner:
      this.props.isLoggedIn &&
      this.props.userInfo.uid === response.data.store.user_id,
     collections: response.data.store.collections,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }
 render() {
  const { brand, isOwner } = this.state;
  return (
   this.state.brand && (
    <React.Fragment>
     <div id="brand-container">
      <Row>
       <Col span={24}>
        <div className="brand-cover">
         <img src="" alt="" />
        </div>
       </Col>
      </Row>
      <Row>
       <Col md={5} sm={24} className="px-5">
        <div className="brand-profile">
         {this.state.profile ? (
          <>
           <img src="" alt="" />
          </>
         ) : (
          <>
           <span>{brand.store.name[0]}</span>
          </>
         )}
        </div>
       </Col>
       <Col md={4} sm={24}>
        <div className="brand-info">
         <p className="name">{brand.store.name}</p>
         <p className="entity">{brand.store.type}</p>
         <p className="location">{`${brand.store.country} ${
          brand.store.city ?? ""
         }`}</p>
        </div>
       </Col>
       <Col md={15} sm={24} style={{ textAlign: "right" }}>
        <div className="actions-btns">
         <button className="wb">
          <span style={{ display: "inline-block", margin: "-2px 3px" }}>
           <IoEarthSharp />
          </span>
          Website
         </button>
         <button className="shr">
          <span>
           <IoShareSocial />
          </span>
          Share
         </button>
         {!isOwner && (
          <>
           <button className="cnt">
            <span>
             <IoIosMail />
            </span>
            Contact
           </button>
           <button className="follow">
            <span>
             <AiOutlinePlus />
            </span>
            Follow
           </button>
          </>
         )}
        </div>
       </Col>
      </Row>
      <Row span={24}>
       <Col md={24}>
        <div className="content">
         <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Overview" key="1">
           <div className="overview-tab">
            {/* {brand.store.about ? ( */}
            <>
             <Row>
              <h6 className="bold">About</h6>
              <Col md={24}>
               <p className="py-3">
                Arper is an Italian company born in 1989 in the Treviso area,
                thanks to the entrepreneurial wit of the Feltrin family. This
                brand produces seating, tables and furnishing complements for
                the house, hospitality and office, while merging aesthetics with
                quality and high performances. The company has developed a
                strong inclination towards contract design and an international
                breath, also thanks to the collaboration with renowned designers
                coming from
                {brand.store.about}
                <span className="bold underline">SEE MORE</span>
               </p>
              </Col>
             </Row>
            </>
            {/* ) : ( */}
            {/* "" */}
            {/* )} */}
            <Row span={24} className="types-row mb-4">
             <Col md={24}>
              <h6 className="bold">Product Types</h6>
             </Col>
             {this.state.brand.store?.products?.map((product, index) => {
              return (
               <>
                <Col md={4} sm={12}>
                 <div className="box"></div>
                 <span>{product.identity[0]?.kind}</span>
                </Col>
               </>
              );
             })}
             {/* <Col md={4} sm={12}>
              <div className="box"></div>
              <span>Sofas</span>
             </Col> */}
             {/* <Col md={4} sm={12}>
              <div className="box"></div>
              <span>{brand.store.product_types[0]}</span>
             </Col> */}
             {/* <Col md={4} sm={12}>
              <div className="box"></div>
              <span>Beanches</span>
             </Col> */}
             {/* <Col md={4} sm={12}>
              <div className="box"></div>
              <span>Offices</span>
             </Col>
             <Col md={4} sm={12}>
              <div className="box"></div>
              <span>Stool</span>
             </Col> */}
            </Row>
            <Row span={24}>
             {/* <Col lg={4} sm={6} xs={12} className="collection-col">
              <div className="collection-box">
               <div
                className="rect rect-0"
                style={{ backgroundImage: `url(${collection1})` }}
               ></div>
               <div
                className="rect rect-1"
                style={{ backgroundImage: `url(${collection2})` }}
               ></div>
               <div
                className="rect rect-2"
                style={{ backgroundImage: `url(${collection3})` }}
               ></div>
              </div>
              <div className="collection-text">
               <h5>Collection Name</h5>
              </div>
             </Col> */}
             {this.state.collections?.map((col, index) => {
              return (
               <>
                <Col md={7} className="collection-col" key={index}>
                 <div className="collection-box">
                  <div
                   className="rect rect-0"
                   //  style={{ backgroundImage: `url(${collection1})` }}
                  ></div>
                  <div
                   className="rect rect-1"
                   //  style={{ backgroundImage: `url(${collection2})` }}
                  ></div>
                  <div
                   className="rect rect-2"
                   //  style={{ backgroundImage: `url(${collection3})` }}
                  ></div>
                 </div>
                 <div className="collection-text">
                  {/* <h5>Collection Name</h5> */}
                  {col.collection_name}
                 </div>
                </Col>
               </>
              );
             })}
            </Row>
           </div>
          </TabPane>
          <TabPane tab="Products" key="2">
           <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="py-5">
            {isOwner && (
             <>
              <Col className="gutter-row" span={6}>
               <a href={`/add-product/${this.state.brand_id}`}>
                <div className="product">
                 <div className="p-img"></div>
                 <div className="plus-icon">
                  <AiOutlinePlus />
                  Add Product
                 </div>
                </div>
               </a>
              </Col>
             </>
            )}
            {this.state.brand.store?.products?.map((product, index) => {
             return (
              <>
               <Col className="gutter-row" span={6}>
                <a href={`/product/${product.id}`}>
                 <div className="product">
                  <div
                   className="p-img"
                   style={{
                    background: `url(${product.options[1]?.cover[0]})`,
                   }}
                  ></div>
                  <h5 className="product-store">{brand.store.name}</h5>
                  <p className="product-name">{product.identity[0]?.name}</p>
                  <div className="product-price">
                   {/* <span>¥ {product.options[1]?.price}</span> */}
                   {product.options[1]?.price && (
                    <>
                     <span>¥ {product.options[1]?.price}</span>
                    </>
                   )}
                  </div>
                 </div>
                </a>
               </Col>
              </>
             );
            })}
           </Row>
          </TabPane>
          <TabPane tab="Projects" key="3">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Blogs" key="4">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Reseller" key="5">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Shworooms" key="6">
           Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Designers" key="7">
           Content of Tab Pane 3
          </TabPane>
          {isOwner ? (
           <>
            <TabPane tab="Settings" key="8">
             <BrandSettingTab />
            </TabPane>
           </>
          ) : (
           ""
          )}
         </Tabs>
        </div>
       </Col>
      </Row>
     </div>
    </React.Fragment>
   )
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 //  updateInfo: (info) => dispatch(updateInfo(info)),
 //  sigupSuccess: (info) => dispatch(emailPasswordSignupSuccess(info)),
});
const mapStateToProps = (state) => {
 return {
  userInfo: state.regularUser.info,
  isLoggedIn: state.regularUser.isLoggedIn,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(Brand);
