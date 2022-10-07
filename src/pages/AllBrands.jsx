import React, { Component } from "react";
import { Row, Col, Spin } from "antd";
import axios from "axios";
import { API } from "./../utitlties";
import ReactFlagsSelect from "react-flags-select";
import { LoadingOutlined } from "@ant-design/icons";

class AllBrands extends Component {
 constructor(props) {
  super(props);
  this.urlString = new URLSearchParams(window.location.search);

  this.state = {
   fetching: false,
   brands: [],
   country: this.urlString.get("country"),
  };
 }
 componentDidMount() {
  this.getBrands();
 }
 setURL = () => {
  const { country } = this.state;
  const countryParam = country ? `?country=${country}` : ``;

  window.history.pushState({}, null, `/brands${countryParam}`);
 };
 getBrands = () => {
  this.setState({
   fetching: true,
  });
  this.setURL();
  const country = this.state.country ? `/${this.state.country}` : ``;
  axios.get(`${API}brands${country}`).then((response) => {
   console.log(response);
   this.setState(
    {
     brands: Object.values(response.data.brands),
     fetching: false,
    },
    () => {
     console.log(this.state.brands);
    }
   );
  });
 };
 render() {
  return (
   <div className="arch17-page">
    <div id="brands-filter" className="mb-3 py-5">
     <Row span={24} gutter={50}>
      <Col md={5}>
       <div className="left-filter">Filter</div>
       <ReactFlagsSelect
        selected={this.state.country}
        selectedSize={13}
        optionsSize={12}
        searchable
        placeholder="Country"
        onSelect={(code) => {
         this.setState({ country: code }, () => {
          this.getBrands();
         });
        }}
       />
       {this.state.country && (
        <p
         className=""
         style={{
          cursor: "pointer",
          fontSize: "9px",
          color: "red",
          fontWeight: "bold",
         }}
         onClick={() => {
          this.setState({ country: "" }, () => {
           this.getBrands();
          });
         }}
        >
         RESET
        </p>
       )}
      </Col>
      <Col md={19}>
       <div className="brands-wrapper">
        <Row span={24} gutter={25} className="mt-0">
         <Col md={24}>
          <h6 className="bold py-2">Stores</h6>
         </Col>
         {this.state.fetching ? (
          <>
           <Spin
            size="large"
            indicator={
             <LoadingOutlined
              style={{ fontSize: "36px", color: "#000" }}
              spin
             />
            }
            style={{ width: "100%", margin: "100px auto" }}
           />
          </>
         ) : (
          <>
           {this.state.brands?.map((brand, index) => {
            return (
             <>
              <Col md={8} className="collection-col" key={index}>
               <a
                href={`/brand/${brand[0].id}`}
                className="arch-link"
                key={index}
               >
                <div>
                 <div className="collection-box mb-3">
                  <div
                   className="rect rect-0"
                   style={{
                    backgroundImage: `url(${
                     brand[brand?.length - 1]?.preview_cover
                    })`,
                    backgroundColor: brand[brand?.length - 1]?.preview_cover
                     ? "transparent"
                     : "rgb(237 237 237 / 70%)",

                    filter: brand[brand?.length - 1]?.preview_cover
                     ? "brightness(.96)"
                     : "none",
                   }}
                  ></div>
                  <div
                   className="rect rect-1"
                   style={{
                    backgroundImage: `url(${
                     brand[brand?.length - 2]?.preview_cover
                    })`,
                    backgroundColor: brand[brand?.length - 2]?.preview_cover
                     ? "transparent"
                     : "rgb(237 237 237 / 70%)",
                    filter: brand[brand?.length - 2]?.preview_cover
                     ? "brightness(.96)"
                     : "none",
                   }}
                  ></div>
                  <div
                   className="rect rect-2"
                   style={{
                    backgroundImage: `url(${
                     brand[brand?.length - 3]?.preview_cover
                    })`,
                    backgroundColor: brand[brand?.length - 3]?.preview_cover
                     ? "transparent"
                     : "rgb(237 237 237 / 70%)",
                    filter: brand[brand?.length - 3]?.preview_cover
                     ? "brightness(.96)"
                     : "none",
                   }}
                  ></div>
                 </div>
                 <div
                  className="brand-img"
                  style={{
                   backgroundSize: "contain",
                   backgroundRepeat: "no-repeat",
                   backgroundImage: brand[0].logo ? `url(${brand[0].logo}` : "",
                   fontSize: "2rem",
                   textAlign: "center",
                   fontWeight: "600",
                  }}
                 >
                  {!brand[0].logo && <>{brand[0].name[0]}</>}
                 </div>

                 <div className="collection-text">
                  <h5>{brand[0].name}</h5>
                 </div>
                </div>
               </a>
              </Col>
             </>
            );
           })}
          </>
         )}
        </Row>
       </div>
      </Col>
     </Row>
    </div>
   </div>
  );
 }
}

export default AllBrands;
