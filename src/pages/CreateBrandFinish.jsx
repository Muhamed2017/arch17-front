import React, { Component } from "react";
import { connect } from "react-redux";
import { updateInfo } from "../redux/actions/authActions";
import { Container, Form, Row, Col } from "react-bootstrap";
import { Form as FormAnt, Input, Select } from "antd";
import HashLoader from "react-spinners/HashLoader";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import axios from "axios";
import * as utility from "../utitlties";
import ReactFlagsSelect from "react-flags-select";
import { Redirect } from "react-router-dom";
import en from "world_countries_lists/data/countries/en/world.json";
const { Option } = Select;
export const customLabels = {
 TW: { primary: "China Taiwan" },
 MO: { primary: "China Macao" },
 HK: { primary: "China Hong Kong" },
};
class CreateBrandFinish extends Component {
 constructor(props) {
  super(props);
  this.state = {
   name: "",
   email: "",
   phone: "",
   country: "",
   phone_code: "",
   product_types: [],
   type: "",
   brand_created: false,
   brand_id: "",
  };
 }
 handleProductTypesChange = (value) => {
  console.log(`selected ${value}`);
  this.setState({ product_types: value });
 };

 handleTypeChange = (value) => {
  this.setState({ type: value });
 };

 createBrand = () => {
  const fd = new FormData();
  console.log(this.state.product_types);
  const {
   name,
   email,
   phone,
   country,
   type,
   product_types,
   phone_code,
  } = this.state;
  fd.append("uid", this.props.userInfo.uid);
  fd.append("name", name);
  fd.append("email", email);
  fd.append("phone", phone);
  fd.append("country", country);
  fd.append("type", type);
  fd.append("phone_code", phone_code);
  fd.append("product_types[]", product_types);
  axios
   .post(`${utility.API}brand`, fd)
   .then((response) => {
    console.log(response);
    this.setState({ brand_created: true, brand_id: response.data.store.id });
   })
   .catch((error) => {
    console.log(error);
   });
 };
 render() {
  if (this.state.brand_created) {
   return <Redirect to={{ pathname: `/brand/${this.state.brand_id}` }} />;
  }
  return (
   <React.Fragment>
    <div id="wrapper" className="auth-form">
     <Container fluid>
      <Row className="justify-content-md-center">
       <Col
        className="m-auto p-5 bg-white rounded"
        style={{ position: "relative" }}
       >
        <div className="heading">
         <h2>Create Brand / Store</h2>
         <h6>
          Reach Designers world wide to promote and sell your products and
          services
         </h6>
        </div>
        <Form noValidate>
         <Form.Group style={{ marginBottom: "0" }}>
          <FormAnt>
           <Row>
            <Col>
             <FormAnt.Item
              name="name"
              rules={[
               {
                required: true,
                message: "name is required",
               },
               () => ({
                validator(_, value) {
                 if (value.length < 2) {
                  return Promise.reject(new Error("Too short"));
                 }
                 return Promise.resolve();
                },
               }),
              ]}
             >
              <Input
               onChange={(e) => this.setState({ name: e.target.value })}
               placeholder="Brand Name"
               size="large"
              />
             </FormAnt.Item>
            </Col>
           </Row>
          </FormAnt>
         </Form.Group>
         <Form.Group>
          <Row className="mb-4">
           <Col>
            <Select
             style={{ width: "100%" }}
             showArrow={true}
             placeholder="Type"
             size="large"
             onChange={this.handleTypeChange}
             optionLabelProp="label"
            >
             <Option value="brand" label="Brand">
              <div className="demo-option-label-item">Brand</div>
             </Option>
             <Option
              value="Brand Multi-brand Store / Retailer"
              label="Brand Multi-brand Store / Retailer"
             >
              <div className="demo-option-label-item">
               Brand Multi-brand Store / Retailer
              </div>
             </Option>
            </Select>
           </Col>
          </Row>
         </Form.Group>
         <Form.Group>
          <Row>
           <Col>
            <FormAnt>
             <FormAnt.Item
              name="email"
              style={{ marginBottom: "18px" }}
              rules={[
               {
                type: "email",
                message: "The input is not valid E-mail!",
               },
               {
                required: true,
                message: "Please input your E-mail!",
               },
              ]}
             >
              <Input
               size="large"
               onChange={(e) => this.setState({ email: e.target.value })}
               placeholder="Email"
              />
             </FormAnt.Item>
            </FormAnt>
           </Col>
          </Row>
         </Form.Group>
         <Form.Group>
          <ConfigProvider locale={en}>
           <CountryPhoneInput
            onChange={(e) =>
             this.setState({ phone: e.phone, phone_code: e.code }, () =>
              console.log(this.state)
             )
            }
           />
          </ConfigProvider>
         </Form.Group>
         <Form.Group>
          <Row>
           <Col>
            <ReactFlagsSelect
             selected={this.state.country}
             selectedSize={20}
             showOptionLabel
             customLabels={customLabels}
             optionsSize={20}
             searchable
             onSelect={(code) => {
              this.setState({ country: code }, () => {
               console.log(this.state.country);
              });
             }}
            />
           </Col>
          </Row>
         </Form.Group>
         {/* </Form.Group> */}

         <button
          className="coninue-btn regular-auth"
          onClick={(e) => {
           e.preventDefault();
           this.createBrand();
          }}
         >
          {this.props.loading ? (
           <>
            Creating New Account
            <HashLoader color="#ffffff" loading={true} css={{}} size={35} />
           </>
          ) : (
           <>Continue</>
          )}
         </button>
        </Form>
       </Col>
      </Row>
     </Container>
    </div>
   </React.Fragment>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 updateInfo: (info) => dispatch(updateInfo(info)),
 //  brandNext: () => dispatch(createBrandNext()),
});
const mapStateToProps = (state) => {
 return {
  userInfo: state.regularUser.info,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateBrandFinish);
