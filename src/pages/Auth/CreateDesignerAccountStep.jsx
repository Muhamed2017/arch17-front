import { Container, Col, Row, Form } from "react-bootstrap";
import React, { Component } from "react";
import club from "../../../src/club-logo.png";
import { Form as FormAnt, Input, Select, Spin } from "antd";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
// import en from "world_countries_lists/data/en/world.json";
import ReactFlagsSelect from "react-flags-select";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { API } from "./../../utitlties";
import { connect } from "react-redux";
import { Redirect } from "react-router";
// import en from "world_countries_lists/";
import en from "world_countries_lists/data/countries/en/world.json";

const Proffessions = [
 "Engineer",
 "Designer",
 "Archetict",
 "Interiour Designer",
];

class CreateDesignerAccountStep extends Component {
 constructor(props) {
  super(props);
  this.state = {
   selectedProfessions: [],
   country: "",
   code: "",
   phoneNumber: "",
   city: "",
   creating: false,
   created: false,
  };
 }
 handleProfessionChange = (selectedProfessions) => {
  this.setState({ selectedProfessions }, () => {
   console.log(this.state.selectedProfessions);
  });
 };

 handleCreatingDesignerAccount = () => {
  const { selectedProfessions } = this.state;
  this.setState({ creating: true });
  const fd = new FormData();
  selectedProfessions.map((p) => {
   fd.append("professions[]", p);
  });
  fd.append("country", this.state.country);
  fd.append("city", this.state.city);
  fd.append("phoneCode", this.state.code);
  fd.append("phoneNumber", Number(this.state.phoneNumber));
  console.log(this.state);
  axios.post(`${API}user-designer/${this.props.user.uid}`, fd).then((resp) => {
   console.log(resp);
   console.log(this.props.user);
   this.setState({ creating: false, created: true });
  });
 };
 render() {
  const { selectedProfessions } = this.state;
  const filteredOptions = Proffessions.filter(
   (o) => !selectedProfessions.includes(o)
  );

  return (
   <React.Fragment>
    {this.state.created && <Redirect to={{ pathname: "/profile" }} />}
    <div id="wrapper" className="auth-form mt-1">
     <Container fluid>
      <Row className="justify-content-md-center">
       <Col
        lg={{ span: 6 }}
        md={{ span: 8 }}
        sm={{ span: 10 }}
        className="m-auto p-5 bg-white rounded"
        style={{ position: "relative" }}
       >
        <div className="heading">
         <img
          src={club}
          alt=""
          style={{
           width: "110px",
           display: "block",
           margin: "auto",
          }}
         />
         <h2
          style={{
           letterSpacing: "-2.5px",
           fontFamily: "Roboto",
          }}
         >
          designclub
         </h2>

         <h6
          style={{
           color: "#a1a1a1",
           fontSize: "1.4rem",
           fontFamily: "Roboto",
          }}
         >
          For architecture & designers club and get the best of Arch17
         </h6>
        </div>
        <Form noValidate>
         <Form.Group style={{ marginBottom: "0" }}>
          <FormAnt>
           <Row>
            <Col>
             <Select
              size="large"
              mode="multiple"
              maxTagCount={1}
              placeholder="Profession *"
              showArrow
              allowClear
              value={selectedProfessions}
              onChange={this.handleProfessionChange}
              style={{ width: "100%" }}
             >
              {filteredOptions.map((item) => (
               <Select.Option key={item} value={item}>
                {item}
               </Select.Option>
              ))}
             </Select>
            </Col>
            <Col>
             <ReactFlagsSelect
              selected={this.state.country}
              selectedSize={14}
              optionsSize={18}
              searchable
              placeholder="Select Country *"
              onSelect={(code) => {
               this.setState({ country: code });
              }}
             />
            </Col>
           </Row>
          </FormAnt>
         </Form.Group>
         <Form.Group className="my-3">
          <FormAnt>
           <Row>
            <Col>
             <FormAnt.Item name="city">
              <Input
               onChange={(e) => this.setState({ city: e.target.value })}
               placeholder="City"
               size="large"
              />
             </FormAnt.Item>
            </Col>
            <Col>
             <ConfigProvider
              locale={en}
              areaMapper={(area) => {
               return {
                ...area,
                emoji: <span className={`fp ${area.short.toLowerCase()}`} />,
               };
              }}
             >
              <CountryPhoneInput
               size="large"
               placeholder="Phone *"
               value={{
                code: this.state.code,
                phone: this.state.phoneNumber,
               }}
               onChange={(e) => {
                this.setState({
                 phoneNumber: e.phone,
                 code: e.code,
                });
               }}
              />
             </ConfigProvider>
            </Col>
           </Row>
          </FormAnt>
         </Form.Group>
         <button
          className="coninue-btn designer"
          onClick={(e) => {
           e.preventDefault();
           this.handleCreatingDesignerAccount();
          }}
         >
          {this.state.creating ? (
           <>
            <Spin
             size="large"
             indicator={
              <LoadingOutlined
               style={{ fontSize: "30px", color: "#fff" }}
               spin
              />
             }
            />
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

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  user: state.regularUser.info,
 };
};
export default connect(mapStateToProps, null)(CreateDesignerAccountStep);
