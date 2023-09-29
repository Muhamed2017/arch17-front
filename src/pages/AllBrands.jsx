import React, { Component } from "react";
import { Row, Col, Spin, Select, Drawer } from "antd";
import axios from "axios";
import { API } from "./../utitlties";
import { regionNames } from "../redux/constants";
import { HiAdjustments } from "react-icons/hi";
import Footer from "../components/Footer";
import { customLabels } from "./CreateBrandFinish";
import ReactFlagsSelect from "react-flags-select";
import { LoadingOutlined } from "@ant-design/icons";
import { products_categories } from "./addProduct/ProductClassifications";
import "./Brand.css";
class AllBrands extends Component {
 constructor(props) {
  super(props);
  this.urlString = new URLSearchParams(window.location.search);

  this.state = {
   fetching: false,
   brands: [],
   country: this.urlString.get("country") ?? "",
   category: this.urlString.get("category") ?? "",
   page: 1,
  };
 }
 componentDidMount() {
  this.getBrands();
 }
 setURL = () => {
  const { country, category } = this.state;
  const countryParam = country?.length > 0 ? `?country=${country}` : ``;
  const categoryParam =
   category?.length > 0
    ? `${country?.length > 0 ? "&" : "?"}category=${category}`
    : ``;
  window.history.pushState({}, null, `/brands${countryParam}${categoryParam}`);
 };
 getBrands = () => {
  this.setState({
   fetching: true,
  });
  this.setURL();
  const { country, category, page } = this.state;
  axios
   .get(
    `${API}brands?filter[country]=${country}&filter[cats]=${category}&page=${page}`
   )
   .then((response) => {
    this.setState(
     {
      brands: response.data.stores.data,
      fetching: false,
      categoryOptions: response.data.categoryOptions,
     },
     () => {
      console.log(this.state.brands);
     }
    );
   });
 };
 selectCategory = (category) => {
  console.log(category);
  this.setState({ category }, () => {
   this.getBrands();
  });
 };
 closeDrawer = () => {
  this.setState({ visible: false }, () => {
   if (typeof window != "undefined" && window.document) {
    document.body.style.overflow = "unset";
    document.body.style.height = "unset";
    console.log("SET HIDDEN");
   }
  });
 };
 openDrawer = () => {
  this.setState({ visible: true }, () => {
   if (typeof window != "undefined" && window.document) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    console.log("SET HIDDEN");
   }
  });
 };
 resetAll = () => {
  this.setState(
   {
    category: "",
    country: "",
   },
   () => {
    this.getBrands();
   }
  );
 };
 render() {
  return (
   <div className="arch17-page">
    <div id="brands-filter" className="mb-3 py-5">
     <Row span={24} gutter={50}>
      <Col md={5} sm={0} xs={0} className="mb-4">
       <div className="left-filter wide-view mb-2 py-2">Filter</div>
       <ReactFlagsSelect
        selected={this.state.country}
        selectedSize={13}
        optionsSize={12}
        searchable
        customLabels={customLabels}
        className="brands-select first"
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
       <Select
        size="large"
        showSearch
        value={this.state.category}
        showArrow
        placeholder="select project type"
        onChange={this.selectCategory}
        className="brands-select last"
        dropdownClassName="brands-dropdown"
        style={{
         width: "100%",
        }}
       >
        <Select.Option key="" value="">
         <span>All</span> <span>Solutions</span>
        </Select.Option>
        {products_categories?.map((cat) => (
         <Select.Option key={cat} value={cat}>
          {cat}
         </Select.Option>
        ))}
       </Select>
      </Col>
      <Col md={19} sm={24} xs={24}>
       <div className="brands-wrapper">
        <Row
         span={24}
         gutter={{ lg: 25, md: 24, sm: 16, xs: 16 }}
         className="mt-0"
        >
         <Col md={24} sm={24} xs={24}>
          <h6 className="bold py-2 wide-view">Stores</h6>
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
            style={{ width: "100vw", margin: "135px auto" }}
           />
          </>
         ) : (
          <>
           {this.state.brands?.map((brand) => {
            return (
             <>
              <Col
               md={8}
               sm={12}
               xs={12}
               className="collection-col"
               key={brand.id}
              >
               <a
                href={`/brand/${brand?.id}`}
                className="arch-link"
                key={brand.id}
               >
                <div>
                 <div className="collection-box mb-3">
                  <div
                   className="rect rect-0"
                   style={{
                    backgroundImage: `url(${brand.box?.pics[0]})`,
                   }}
                  ></div>
                  <div
                   className="rect rect-1"
                   style={{
                    backgroundImage: `url(${brand.box?.pics[1]})`,
                   }}
                  ></div>
                  <div
                   className="rect rect-2"
                   style={{
                    backgroundImage: `url(${brand.box?.pics[2]})`,
                   }}
                  ></div>
                 </div>
                 <div
                  className="brand-img"
                  style={{
                   backgroundSize: "contain",
                   backgroundRepeat: "no-repeat",
                   backgroundImage: brand?.logo ? `url(${brand?.logo}` : "",
                   fontSize: "2rem",
                   textAlign: "center",
                   fontWeight: "600",
                  }}
                 >
                  {!brand?.logo && <>{brand?.name[0]}</>}
                 </div>

                 <div className="collection-text">
                  <h5>
                   {brand?.name}{" "}
                   {brand?.country && (
                    <span className="fs-11">
                     {regionNames.of(brand.country).replace(/mainland/gi, "")}
                    </span>
                   )}
                   {brand?.city && (
                    <span className="city">{`| ${brand?.city}`}</span>
                   )}
                  </h5>
                  <p className="products-count">
                   {brand.cats?.map((c, index) => {
                    return (
                     <span
                      className="mr-10 inline-block fs-12"
                      key={index}
                     >{`${c}`}</span>
                    );
                   })}
                  </p>
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

    <button
     id="sticky-magazine"
     className="sticky-filter-btn Filters"
     onClick={this.openDrawer}
    >
     <HiAdjustments /> Filters
    </button>
    <div className="magazine-footer">
     <Footer lightgray={false} />
    </div>
    <Drawer
     id="designers-drawer-filter"
     placement="left"
     closable={true}
     destroyOnClose
     title={
      <span
       onClick={() => {
        this.resetAll();
       }}
      >
       Clear all
      </span>
     }
     onClose={this.closeDrawer}
     visible={this.state.visible}
     key="left"
     mask={false}
     width={"100%"}
     height={"100vw"}
    >
     <div className="left-filter wide-view mb-2 py-2">Filter</div>
     <Row span={24}>
      <Col sm={24} xs={24}>
       <ReactFlagsSelect
        selected={this.state.country}
        selectedSize={13}
        optionsSize={12}
        searchable
        customLabels={customLabels}
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
      <Col xs={24} sm={24} className="my-2">
       <Select
        size="large"
        showSearch
        value={this.state.category}
        showArrow
        placeholder="select project type"
        onChange={this.selectCategory}
        style={{
         width: "100%",
        }}
       >
        <Select.Option key="" value="">
         <span>All Solutions</span> <span></span>
        </Select.Option>
        {products_categories?.map((cat) => (
         <Select.Option key={cat} value={cat}>
          <span>{cat}</span>
         </Select.Option>
        ))}
       </Select>
      </Col>
      <Col xs={24} className="mt-4 align-right">
       <button className="apply" onClick={this.closeDrawer}>
        Apply
       </button>
      </Col>
     </Row>
    </Drawer>
   </div>
  );
 }
}

export default AllBrands;
