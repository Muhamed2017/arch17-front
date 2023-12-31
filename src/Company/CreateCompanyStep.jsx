import React, { Component } from "react";
import { Form, Select, Input, Spin } from "antd";
import ReactFlagsSelect from "react-flags-select";
import { customLabels } from "../pages/CreateBrandFinish";
import "./company.css";
import { API } from "./../utitlties";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { company_services } from "../pages/addProduct/ProductClassifications";
import { LoadingOutlined } from "@ant-design/icons";
const { Option } = Select;

class CreateCompanyStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   selectedServices: [],
   country: "",
   phone_code: "",
   phone: "",
   missed_country: false,
   missed_code: false,
   missed_phone: false,
   saving_company: false,
   company_id: null,
   email: "",
  };
 }
 onFinish = (values) => {
  values.country = this.state.country;
  values.phone_code = this.state.phone_code;
  values.phone = this.state.phone;
  if (!values.country) {
   this.setState({ missed_country: true });
  } else {
   this.setState({
    missed_country: false,
   });
   console.log("Success:", values);
   this.setState({
    saving_company: true,
   });
   const fd = new FormData();
   fd.append("name", values.name);
   fd.append("city", values.city);

   values.services?.forEach((s) => {
    fd.append("services[]", s);
   });
   fd.append("country", this.state.country);

   if (this.state.email && this.state.email?.length > 0) {
    fd.append("email", this.state.email);
   }
   //  fd.append("user_id", this.props.info?.id);
   fd.append("user_uid", this.props.info?.uid);
   axios
    .post(`${API}comapny`, fd)
    .then((response) => {
     console.log(response);
     this.setState({
      saving_company: false,
      company_id: response.data.company?.id,
     });
    })
    .catch((error) => {
     console.log(error);
     this.setState({
      saving_company: false,
      company_id: null,
     });
    });
  }
 };

 onFinishFailed = (errorInfo) => {
  if (!this.state.country) {
   this.setState({ missed: true });
  }
  console.log("Failed:", errorInfo);
 };
 handleServicesChange = (selectedServices) => {
  this.setState({ selectedServices }, () => {
   console.log(this.state.selectedServices);
  });
 };
 render() {
  const { country, missed_country } = this.state;

  return (
   <>
    {this.state.company_id && (
     <Redirect to={{ pathname: `/company/${this.state.company_id}` }} />
    )}
    <div className="company-form">
     <div className="heading my-3 mb-5">
      <h2>Create Company Page</h2>
      <h6>Showcase your company works and get your team connected</h6>
     </div>
     <Form
      name="company"
      size="large"
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
      autoComplete="off"
     >
      <Form.Item
       className="form-label mb-4"
       name="name"
       rules={[{ required: true, message: "Company Name is required" }]}
      >
       <Input placeholder="Company Name *" />
      </Form.Item>

      <Form.Item
       name="services"
       className="form-label mb-4"
       rules={[
        {
         required: true,
         message: "One Service at least is required!",
        },
       ]}
      >
       <Select
        showSearch
        mode="tags"
        onChange={this.handleServicesChange}
        value={this.state.selectedServices}
        placeholder="Please select Service"
        style={{
         fontSize: "13px",
        }}
       >
        {company_services.map((p) => {
         return (
          <>
           <Option value={p}>{p}</Option>
          </>
         );
        })}
       </Select>
      </Form.Item>
      <ReactFlagsSelect
       selected={this.state.country}
       selectedSize={14}
       optionsSize={18}
       searchable
       customLabels={customLabels}
       placeholder="Select Country *"
       onSelect={(code) => {
        this.setState({ country: code });
       }}
      />
      {!country && missed_country && (
       <p style={{ color: "red" }}>country is required</p>
      )}
      <Form.Item
       name="city"
       rules={[{ required: true, message: "city is required" }]}
      >
       <Input placeholder="City *" />
      </Form.Item>
      <Form.Item
       name="email"
       rules={[
        {
         message: "Valid email is required",
         type: "email",
        },
       ]}
      >
       <Input
        placeholder="Email"
        onChange={(e) => {
         this.setState({ email: e.target.value });
        }}
       />
      </Form.Item>

      <button className="coninue-btn regular-auth my-3" htmlType="submit">
       {!this.state.saving_company ? (
        "Continue"
       ) : (
        <Spin
         size="large"
         indicator={
          <LoadingOutlined style={{ fontSize: "24px", color: "#000" }} spin />
         }
        />
       )}
      </button>
     </Form>
    </div>
   </>
  );
 }
}

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  info: state.regularUser.info,
  user: state.regularUser.user,
 };
};

export default connect(mapStateToProps, null)(CreateCompanyStep);
