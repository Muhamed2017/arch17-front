import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Tabs } from "antd";
import { API } from "../../utitlties";
// import
const { TabPane } = Tabs;

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
class BrandDesignersTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   designers: [],
   companies: [],
  };
 }
 componentDidMount() {
  axios.get(`${API}store-designers/${this.props.store_id}`).then((response) => {
   this.setState({
    designers: response.data.designers,
    companies: response.data.companies,
   });
  });
 }
 render() {
  const { designers, companies } = this.state;
  return (
   <Row span={24} gutter={25} className="mt-5">
    {this.state.designers?.brand_designers?.map((designer, index) => {
     return (
      <>
       <Col
        md={8}
        sm={12}
        xs={12}
        lg={8}
        className="collection-col"
        key={index}
       >
        <a href={`/designerproducts/${designer?.id}`}>
         <div className="collection-box">
          <div
           className="rect rect-0"
           style={{
            backgroundImage: `url(${this.state.designers?.pics[index][0]?.identity[0]?.preview_cover})`,
           }}
          ></div>
          <div
           className="rect rect-1"
           style={{
            backgroundImage: `url(${this.state.designers?.pics[index][1]?.identity[0]?.preview_cover})`,
           }}
          ></div>
          <div
           className="rect rect-2"
           style={{
            backgroundImage: `url(${this.state.designers?.pics[index][2]?.identity[0]?.preview_cover})`,
           }}
          ></div>
         </div>
         <a href={`/user/${designer?.uid}`}>
          <div className="designer-text">
           <div
            className="d-avatar"
            style={{
             backgroundImage: `url(${designer?.photoURL})`,
            }}
           ></div>
           <div className="d-info">
            <p style={{ marginBottom: "3px" }}>
             <span className="d-name">{designer?.displayName}</span>
             {designer?.country && designer.country !== "null" && (
              <span className="d-loc">{`| ${regionNames
               .of(designer?.country)
               .replace(/mainland/gi, "")}`}</span>
             )}
            </p>
            <p>
             {" "}
             <span className="d-count">
              {designer?.professions?.length > 0 && (
               <>{designer?.professions[0]}</>
              )}
             </span>
            </p>
           </div>
          </div>
         </a>
        </a>
       </Col>
      </>
     );
    })}
    {this.state.companies?.map((company) => {
     return (
      <Col
       md={8}
       sm={12}
       xs={12}
       lg={8}
       className="collection-col"
       key={company.id}
      >
       <a href={`/companyproducts/${company?.id}`}>
        <div className="collection-box">
         <div
          className="rect rect-0"
          style={{
           backgroundImage: `url(${company?.box?.pics[0]})`,
          }}
         ></div>
         <div
          className="rect rect-1"
          style={{
           backgroundImage: `url(${company?.box?.pics[1]})`,
          }}
         ></div>
         <div
          className="rect rect-2"
          style={{
           backgroundImage: `url(${company?.box?.pics[2]})`,
          }}
         ></div>
        </div>
        <a href={`/company/${company?.id}`}>
         <div className="designer-text">
          <div
           className="d-avatar"
           style={{
            backgroundImage: `url(${company?.profile})`,
           }}
          >
           {(!company?.profile || company.profile?.length < 5) &&
            `${company?.name[0]}`}
          </div>
          <div className="d-info">
           <p style={{ marginBottom: "3px" }}>
            <span className="d-name">{company?.name}</span>
            <span className="d-loc">{`| ${regionNames.of(
             company?.country
            )}`}</span>
           </p>
           <p>
            {" "}
            <span className="d-count">Design Compeny</span>
           </p>
          </div>
         </div>
        </a>
       </a>
      </Col>
     );
    })}
   </Row>
  );
 }
}

export default BrandDesignersTab;
