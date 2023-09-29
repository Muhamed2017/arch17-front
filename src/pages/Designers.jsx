import React, { Component } from "react";
import axios from "axios";
import { API } from "./../utitlties";
import { Row, Col, Spin, Select, Drawer } from "antd";
import { regionNames } from "../redux/constants";
import ReactFlagsSelect from "react-flags-select";
import { HiAdjustments } from "react-icons/hi";
import Footer from "../components/Footer";
import { customLabels } from "./CreateBrandFinish";
import { LoadingOutlined } from "@ant-design/icons";
import {
 products_categories,
 kind_options,
 lighting_kind_optios,
 decore_kind_options,
 finishes_kind_options,
 kitchen_kind_options,
 wellness_kind_options,
 constructions_kind_options,
 bathroom_kind_options,
} from "./addProduct/ProductClassifications";
import "./Brand.css";

const testIds = [14, 15, 19, 21, 29];
class Designers extends Component {
 constructor(props) {
  super(props);
  this.urlString = new URLSearchParams(window.location.search);
  this.state = {
   designers: [],
   visible: false,
   project_category: this.urlString?.get("project") ?? "",
   filterType: this.urlString?.get("filterBy") ?? "",
   fetching: true,
   country: this.urlString?.get("country") ?? "",
   product_design_category: this.urlString?.get("solutions") ?? "",
   product_design_kind: this.urlString?.get("products") ?? "",
   selectedProfession: this.urlString?.get("profession") ?? "",
   selectedService: this.urlString?.get("services") ?? "",
   product_kind_options: [],
  };
 }

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
 fetchAll = () => {
  this.setState({
   fetching: true,
   product_design_kind: this.state.product_design_category
    ? this.state.product_design_kind
    : "",
  });
  this.setRightkindOption(this.state.product_design_category);

  this.setURL();
  if(this.state.filterType==='designer') {
    this.fetchFilteredDesigners()
  }
  
  else if(this.state.filterType==='company'){
   this.fetchFilteredCompanies();

  }
  else{
  axios
   .get(
    `${API}dcfilter?filter[country]=${this.state.country}
    &filter[product_design_category]=${this.state.product_design_category}
    &filter[product_design_kind]=${this.state.product_design_kind}
    &filter[project_categories]=${this.state.project_category}`
   )
   .then((response) => {
    console.log(response);
    this.setState({
     designers: response.data.designers,
     fetching: false,
    });
   });   
  }
 
 };

 fetchFilteredDesigners = () => {
  this.setState({ fetching: true });
  this.setURL();
  axios
   .get(
    `${API}dfilter?filter[country]=${this.state.country}
    &filter[professions]=${this.state.selectedProfession}
    &filter[product_design_category]=${this.state.product_design_category}
    &filter[product_design_kind]=${this.state.product_design_kind}
    &filter[project_categories]=${this.state.project_category}`
   )
   .then((response) => {
    console.log(response);
    this.setState({ designers: response.data.designers, fetching: false });
   });
 };
 fetchFilteredCompanies = () => {
  this.setState({ fetching: true });
  this.setURL();

  axios
   .get(
    `${API}cfilter?filter[country]=${this.state.country}
    &filter[services]=${this.state.selectedService}
    &filter[product_design_category]=${this.state.product_design_category}
    &filter[project_categories]=${this.state.project_category}
    &filter[product_design_kind]=${this.state.product_design_kind}`
   )
   .then((response) => {
    console.log(response);
    this.setState({ designers: response.data.designers, fetching: false });
   });
 };
 componentDidMount() {
  this.fetchAll();
 }

 setURL = () => {
  const {
   country,
   product_design_category,
   product_design_kind,
   selectedProfession,
   selectedService,
   project_category,
   filterType,
  } = this.state;
  const hasParams =
   (country?.length > 0 && product_design_category !== "") ||
   product_design_kind !== "" ||
   selectedProfession !== "" ||
   filterType !== "" ||
   selectedService !== "";

  // const searchMark = hasParams ? `&` : `?`;
  const countryParam = country?.length > 0 ? `country=${country}&` : ``;
  const categoryParam =
   product_design_category?.length > 0
    ? `solutions=${product_design_category}&`
    : ``;
  const typesParam =
   product_design_kind?.length > 0 && product_design_category?.length > 0
    ? `products=${product_design_kind}&`
    : ``;
  const filterTypeParam =
   filterType?.length > 0 ? `filterBy=${filterType}&` : ``;
  const servicesParam =
   selectedService?.length > 0 && filterType === "company"
    ? `services=${selectedService}&`
    : ``;
  const professionParam =
   selectedProfession?.length > 0 && filterType === "designer"
    ? `profession=${selectedProfession}&`
    : ``;

  const projectParam =
   project_category?.length > 0 ? `project=${project_category}&` : ``;

  console.log(hasParams);
  window.history.pushState(
   {},
   null,
   `/designers?${countryParam}${categoryParam}${typesParam}${filterTypeParam}${servicesParam}${professionParam}${projectParam}`
  );
 };
 selectProductCategory = (product_design_category) => {
  this.setRightkindOption(product_design_category);

  this.setState(
   {
    product_design_category,
    product_design_kind: "",
   },
   () => {
    this.detectFilterType();
   }
  );
 };

 handleFilterTypeChange = (filterType) => {
  this.setState(
   {
    filterType,
   },
   () => {
    this.detectFilterType();
   }
  );
 };

 detectFilterType = () => {
  if (this.state.filterType === "designer") {
   this.fetchFilteredDesigners();
  } else if (this.state.filterType === "company") {
   this.fetchFilteredCompanies();
  } else {
   this.fetchAll();
  }
 };
 handleProfessionChange = (selectedProfession) => {
  this.setState({ selectedProfession }, () => {
   this.fetchFilteredDesigners();
  });
 };
 handleServiceChange = (selectedService) => {
  this.setState({ selectedService }, () => {
   this.fetchFilteredCompanies();
  });
 };
 setRightkindOption = (cat) => {
  if (!cat) return;

  let kind_option;
  switch (cat) {
   case "Furniture":
    kind_option = kind_options;
    break;

   case "Lighting":
    kind_option = lighting_kind_optios;
    break;

   case "Decore":
    kind_option = decore_kind_options;
    break;

   case "Construction":
    kind_option = constructions_kind_options;
    break;

   case "Wellness":
    kind_option = wellness_kind_options;
    break;

   case "Kitchen":
    kind_option = kitchen_kind_options;
    break;

   case "Bathroom":
    kind_option = bathroom_kind_options;
    break;

   case "Finishes":
    kind_option = finishes_kind_options;
    break;

   default:
    kind_option = [];
    break;
  }

  this.setState({
   product_kind_options: kind_option,
  });
 };
 selectProductKind = (product_design_kind) => {
  this.setState(
   {
    product_design_kind,
   },
   () => this.detectFilterType()
  );
 };
 resetAll = () => {
  this.setState(
   {
    filterType: "",
    selectedProfession: "",
    selectedService: "",
    country: "",
    product_design_category: "",
    product_design_kind: "",
    project_category: "",
   },
   () => {
    this.fetchAll();
   }
  );
 };

 selecteProjectCategory = (project_category) => {
  this.setState(
   {
    project_category,
   },
   () => {
    this.detectFilterType();
   }
  );
 };
 render() {
  return (
   <div className="arch17-page">
    <div id="brands-filter" className="mb-3 py-5">
     <Row span={24} gutter={20}>
      <Col md={5} sm={0} xs={0} className="mb-4 only-wide">
       <div className="left-filter wide-view mb-2 py-2">Filter</div>
       <Select
        size="large"
        showSearch
        value={this.state.filterType}
        showArrow
        placeholder="select project type"
        onChange={this.handleFilterTypeChange}
        className="brands-select last mb-4"
        dropdownClassName="brands-dropdown"
        style={{
         width: "100%",
        }}
       >
        <Select.Option key="" value="">
         <span>All Designers</span> <span></span>
        </Select.Option>
        <Select.Option key={"designer"} value="designer">
         Designer
        </Select.Option>
        <Select.Option key={"company"} value="company">
         Design Company
        </Select.Option>
       </Select>
       {this.state.filterType === "designer" && (
        <Select
         size="large"
         showSearch
         value={this.state.selectedProfession}
         showArrow
         placeholder="Profession"
         onChange={this.handleProfessionChange}
         className="brands-select last mb-4"
         dropdownClassName="brands-dropdown"
         style={{
          width: "100%",
         }}
        >
         <Select.Option key={""} value={""}>
          All Professions
         </Select.Option>
         <Select.Option key={"Designer"} value={"Designer"}>
          Designer
         </Select.Option>
         <Select.Option key={"Engineer"} value={"Engineer"}>
          Engineer
         </Select.Option>
         <Select.Option key={"Architect"} value={"Architect"}>
          Architect
         </Select.Option>
         <Select.Option key={"Interior Designer"} value={"Interior Designer"}>
          Interior Designer
         </Select.Option>
        </Select>
       )}
       {this.state.filterType === "company" && (
        <Select
         size="large"
         showSearch
         value={this.state.selectedService}
         showArrow
         placeholder="Services"
         onChange={this.handleServiceChange}
         className="brands-select last mb-4"
         dropdownClassName="brands-dropdown"
         style={{
          width: "100%",
         }}
        >
         <Select.Option key={""} value={""}>
          All Services
         </Select.Option>
         <Select.Option key={"Product Design"} value={"Product Design"}>
          Product Design
         </Select.Option>
         <Select.Option key={"Architecture"} value={"Architecture"}>
          Architecture
         </Select.Option>
         <Select.Option key={"Interior Design"} value={"Interior Design"}>
          Interior Design
         </Select.Option>
         <Select.Option key={"Landscape"} value={"Landscape"}>
          Landscape
         </Select.Option>
         <Select.Option key={"Urpan Plan"} value={"Urpan Plan"}>
          Urpan Plan
         </Select.Option>
         <Select.Option key={"Construction"} value={"Construction"}>
          Construction
         </Select.Option>
         <Select.Option key={"Home Decoration"} value={"Home Decoration"}>
          Home Decoration
         </Select.Option>
        </Select>
       )}
       <ReactFlagsSelect
        selected={this.state.country}
        selectedSize={13}
        customLabels={customLabels}
        optionsSize={12}
        searchable
        className="brands-select first"
        placeholder="Country"
        onSelect={(code) => {
         this.setState({ country: code }, () => {
          this.detectFilterType();
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
           this.detectFilterType();
          });
         }}
        >
         RESET
        </p>
       )}
       {/* <Select
        size="large"
        showSearch
        value={this.state.project_category}
        showArrow
        placeholder="select project category"
        onChange={this.selecteProjectCategory}
        className="brands-select last mb-4"
        dropdownClassName="brands-dropdown"
        style={{
         width: "100%",
        }}
       >
        <Select.Option key="" value="">
         <span>All</span> <span></span>
        </Select.Option>
        {project_cats?.map((cat) => (
         <Select.Option key={cat} value={cat}>
          {cat}
         </Select.Option>
        ))}
       </Select> */}
       {/* {this.state.project_category === "Product Design" && ( */}
       <Select
        size="large"
        showSearch
        value={this.state.product_design_category}
        showArrow
        placeholder="select project type"
        onChange={this.selectProductCategory}
        className="brands-select last mb-4"
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
       {/* //  )} */}
       {/* {this.state.product_kind_options?.length > 0 &&
        this.state.product_design_category !== "" && (
         <Select
          size="large"
          showSearch
          value={this.state.product_design_kind}
          showArrow
          placeholder={`select ${this.state.product_design_category?.toLowerCase()} type`}
          onChange={this.selectProductKind}
          className="brands-select last"
          dropdownClassName="brands-dropdown"
          style={{
           width: "100%",
          }}
         >
          <Select.Option key={""} value={""}>
           {`All ${this.state.product_design_category?.toLowerCase()} types`}
          </Select.Option>
          {this.state.product_kind_options?.map((k) => {
           return (
            <Select.Option key={k.value} value={k.value}>
             {k.value}
            </Select.Option>
           );
          })}
         </Select>
        )} */}
      </Col>
      <Col md={19} sm={24} xs={24}>
       <div className="brands-wrapper">
        <Row
         span={24}
         gutter={{ lg: 18, md: 18, sm: 16, xs: 16 }}
         className="mt-0"
        >
         <Col md={24} sm={24} xs={24}>
          <h6 className="bold py-2 wide-view">
           Designers and Design Companies
          </h6>
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
           {this.state.designers?.map((designer, index) => {
            return (
             <>
              {designer?.type !== "company" &&
              testIds?.includes(designer?.id) ? (
               ""
              ) : (
               <Col
                md={8}
                sm={12}
                xs={12}
                className="collection-col"
                key={designer.id + index}
               >
                <a
                 href={
                  designer?.type === "company"
                   ? `/company/${designer?.id}`
                   : `/user/${designer?.uid}`
                 }
                 className="arch-link"
                 key={designer.id + index}
                >
                 <div>
                  <div className="collection-box mb-3">
                   <div
                    className="rect rect-0 designer-rect"
                    style={{
                     backgroundImage:
                      designer?.type === "company"
                       ? `url(${
                          designer?.box?.pics[0] ||
                          designer?.box?.projects_covers[0]?.cover
                         })`
                       : `url(${
                          designer?.box?.products_covers[0] ||
                          designer?.box?.projects[0]?.cover
                         })`,
                    }}
                   ></div>
                   <div
                    className="rect rect-1 designer-rect"
                    style={{
                     backgroundImage:
                      designer?.type === "company"
                       ? `url(${
                          designer?.box?.projects_covers[1]?.cover ||
                          designer?.box?.pics[1]
                         })`
                       : `url(${
                          designer?.box?.projects[1]?.cover ||
                          designer?.box?.products_covers[1]
                         })`,
                    }}
                   ></div>
                   <div
                    className="rect rect-2 designer-rect"
                    style={{
                     // backgroundImage: `url(${brand.box?.pics[2]})`,
                     backgroundImage:
                      designer?.type === "company"
                       ? `url(${
                          designer?.box?.projects_covers[2]?.cover ||
                          designer?.box?.pics[2]
                         })`
                       : `url(${
                          designer?.box?.projects[2]?.cover ||
                          designer?.box?.products_covers[2]
                         })`,
                    }}
                   ></div>
                  </div>
                  <div
                   className="brand-img"
                   style={{
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${
                     designer?.photoURL || designer?.profile
                    }`,
                    fontSize: "2rem",
                    textAlign: "center",
                    fontWeight: "600",
                   }}
                  >
                   {/* {!brand?.logo && <>{brand?.name[0]}</>} */}
                  </div>

                  <div className="collection-text">
                   <h5>
                    {designer?.name ?? designer?.displayName}

                    {designer && designer?.country && (
                     <>
                      <p className="py-1">
                       {designer?.type === "company"
                        ? `Design Company | ${regionNames
                           .of(designer?.country)
                           ?.replace(/mainland/gi, "")} ,  ${
                           designer?.city ?? ""
                          }`
                        : `Designer | ${regionNames
                           .of(designer?.country)
                           ?.replace(/mainland/gi, "")} , ${
                           designer?.city ?? ""
                          }`}
                      </p>
                     </>
                    )}
                   </h5>
                   <p className="products-count"></p>
                  </div>
                 </div>
                </a>
               </Col>
              )}
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
     <div>
      <Row span={24}>
       <Col sm={24} xs={24}>
        <Select
         size="large"
         showSearch
         value={this.state.filterType}
         showArrow
         placeholder="select project type"
         onChange={this.handleFilterTypeChange}
         className="designers-select last mb-4"
         dropdownClassName="brands-dropdown"
         style={{
          width: "100%",
         }}
        >
         <Select.Option key="" value="">
          <span>All Designers</span> <span></span>
         </Select.Option>
         <Select.Option key={"designer"} value="designer">
          <span>Designer</span>
         </Select.Option>
         <Select.Option key={"company"} value="company">
          <span>Design Company</span>
         </Select.Option>
        </Select>
       </Col>
       {this.state.filterType === "designer" && (
        <Col sm={24} xs={24}>
         <Select
          size="large"
          showSearch
          value={this.state.selectedProfession}
          showArrow
          placeholder="Profession"
          onChange={this.handleProfessionChange}
          className="designers-select last mb-4"
          dropdownClassName="brands-dropdown"
          style={{
           width: "100%",
          }}
         >
          <Select.Option key={""} value={""}>
           <span>All Professions</span>
          </Select.Option>
          <Select.Option key={"Designer"} value={"Designer"}>
           <span>Designer</span>
          </Select.Option>
          <Select.Option key={"Engineer"} value={"Engineer"}>
           <span>Engineer</span>
          </Select.Option>
          <Select.Option key={"Architect"} value={"Architect"}>
           <span>Architect</span>
          </Select.Option>
         </Select>
        </Col>
       )}
       {this.state.filterType === "company" && (
        <Col sm={24} xs={24}>
         <Select
          size="large"
          showSearch
          value={this.state.selectedService}
          showArrow
          placeholder="Services"
          onChange={this.handleServiceChange}
          className="designers-select last mb-4"
          dropdownClassName="brands-dropdown"
          style={{
           width: "100%",
          }}
         >
          <Select.Option key={""} value={""}>
           <span>All Services</span>
          </Select.Option>
          <Select.Option key={"Product Design"} value={"Product Design"}>
           <span>Product Design</span>
          </Select.Option>
          <Select.Option key={"Architecture"} value={"Architecture"}>
           <span>Architecture</span>
          </Select.Option>
          <Select.Option key={"Interior Design"} value={"Interior Design"}>
           <span>Interior Design</span>
          </Select.Option>
          <Select.Option key={"Landscape"} value={"Landscape"}>
           <span>Landscape</span>
          </Select.Option>
          <Select.Option key={"Urpan Plan"} value={"Urpan Plan"}>
           <span>Urpan Plan</span>
          </Select.Option>
          <Select.Option key={"Construction"} value={"Construction"}>
           <span>Construction</span>
          </Select.Option>
          <Select.Option key={"Home Decoration"} value={"Home Decoration"}>
           <span>Home Decoration</span>
          </Select.Option>
         </Select>
        </Col>
       )}
       <Col sm={24} xs={24} className="mb-3">
        <ReactFlagsSelect
         selected={this.state.country}
         selectedSize={13}
         customLabels={customLabels}
         optionsSize={12}
         searchable
         className="designers-select first"
         placeholder="Country"
         onSelect={(code) => {
          this.setState({ country: code }, () => {
           this.detectFilterType();
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
            this.detectFilterType();
           });
          }}
         >
          RESET
         </p>
        )}
       </Col>

       {/* <Col sm={24} xs={24}>
        <Select
         size="large"
         showSearch
         value={this.state.project_category}
         showArrow
         placeholder="select project category"
         onChange={this.selecteProjectCategory}
         className="designers-select last mb-4"
         dropdownClassName="brands-dropdown"
         style={{
          width: "100%",
         }}
        >
         <Select.Option key="" value="">
          <span>All</span> <span></span>
         </Select.Option>
         {project_cats?.map((cat) => (
          <Select.Option key={cat} value={cat}>
           <span>{cat}</span>
          </Select.Option>
         ))}
        </Select>
       </Col> */}
       {/* {this.state.project_category === "Product Design" && ( */}
       <>
        <Col sm={24} xs={24}>
         <Select
          size="large"
          showSearch
          value={this.state.product_design_category}
          showArrow
          placeholder="select project type"
          onChange={this.selectProductCategory}
          className="designers-select last mb-4"
          dropdownClassName="brands-dropdown"
          style={{
           width: "100%",
          }}
         >
          <Select.Option key="" value="">
           <span>All</span> <span>Products</span>
          </Select.Option>
          {products_categories?.map((cat) => (
           <Select.Option key={cat} value={cat}>
            <span>{cat}</span>
           </Select.Option>
          ))}
         </Select>
        </Col>
        {this.state.product_kind_options?.length > 0 &&
         this.state.product_design_category !== "" && (
          <Col sm={24} xs={24}>
           <Select
            size="large"
            showSearch
            value={this.state.product_design_kind}
            showArrow
            placeholder={`select ${this.state.product_design_category?.toLowerCase()} type`}
            onChange={this.selectProductKind}
            className="designers-select last"
            dropdownClassName="brands-dropdown"
            style={{
             width: "100%",
            }}
           >
            <Select.Option key={""} value={""}>
             {`All ${this.state.product_design_category?.toLowerCase()} types`}
            </Select.Option>
            {this.state.product_kind_options?.map((k) => {
             return (
              <Select.Option key={k.value} value={k.value}>
               <span>{k.value}</span>
              </Select.Option>
             );
            })}
           </Select>
          </Col>
         )}
       </>
       {/* )} */}
       <Col xs={24} className="mt-4 align-right">
        <button className="apply" onClick={this.closeDrawer}>
         Apply
        </button>
       </Col>
      </Row>
     </div>
    </Drawer>
   </div>
  );
 }
}

export default Designers;
