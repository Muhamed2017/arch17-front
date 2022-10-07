import React, { Component } from "react";
import { API } from "./../../utitlties";
import { Row, Col, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

class CompaniesTab extends Component {
 constructor(props) {
  super(props);
  this.state = {
   companies: [],
   loading: true,
  };
 }
 componentDidMount() {
  axios.get(`${API}usercompanies/${this.props?.user_id}`).then((response) => {
   console.log(response);
   this.setState({
    companies: response.data.companies,
    loading: false,
   });
  });
 }
 render() {
  return (
   <>
    {this.state.loading ? (
     <Spin
      size="large"
      indicator={
       <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
      }
      style={{
       width: "100%",
       margin: "100px auto",
      }}
     />
    ) : (
     <div className="companies-tab">
      <Row span={24} gutter={16}>
       {this.state.companies?.map((co) => {
        return (
         <Col lg={4} md={4} sm={4} xs={12} key={co.id} className="mb-5">
          <a href={`/company/${co?.id}`} className="company-box">
           <div
            className="member-box company-box pointer"
            style={{ backgroundImage: `url("${co?.profile}")` }}
           >
            {(!co?.profile || co?.profile?.length < 4) && `${co.name[0]}`}
           </div>
           <div className="member-name">{co?.name}</div>
          </a>
         </Col>
        );
       })}
       <Col lg={4} md={4} sm={4} xs={12}>
        <a href="/createdesigncompany" className="company-box">
         <div className="member-box company-box pointer">+</div>
         <div className="member-name">Create Design Company </div>
        </a>
       </Col>
      </Row>
     </div>
    )}
   </>
  );
 }
}

// export default CompaniesTab;
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  info: state.regularUser.info,
  user: state.regularUser.user,
 };
};

export default connect(mapStateToProps, null)(CompaniesTab);
