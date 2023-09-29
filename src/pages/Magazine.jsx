import React, { Component } from "react";
import {
 Row,
 Col,
 Form,
 DatePicker,
 Spin,
 message,
 Modal,
 Select,
 Drawer,
 Input,
} from "antd";
import "./css/Magazine.css";
import ReactFlagsSelect from "react-flags-select";
import { API } from "./../utitlties";
import axios from "axios";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { HiAdjustments } from "react-icons/hi";
// import {customLabel}
// customLabel
import { customLabels } from "./CreateBrandFinish";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import moment from "moment";
import {
 products_categories,
 project_cats,
} from "./../pages/addProduct/ProductClassifications";
import SaveToBoard from "../components/Modals/SaveToBoard";
import { setProjectTypeSearch } from "../redux/actions/addProjectActions";
import { VscTriangleDown } from "react-icons/vsc";
class Magazine extends Component {
 constructor(props) {
  super(props);
  this.urlString = new URLSearchParams(window.location.search);
  this.state = {
   visible: false,
   sticky_btn_top: true,
   selectedTab: this.urlString.get("featuredBy") ?? "design-selected",
   country: this.urlString.get("country") ?? "",
   year: this.urlString.get("year") ?? "",
   offset: 0,
   _type: this.urlString.get("types") ?? this.props.type,
   fetching: true,
   creator: this.urlString.get("kind") ?? "",
   project_type: this.urlString.get("kind") ?? "",
   projects: [],
   filteredOptions: project_cats,
   moreExist: true,
   cat: this.urlString.get("category") ?? "all",
   kind: this.urlString.get("kind") ?? "all",
   selectedTypes: this.urlString.get("types")
    ? this.urlString.get("types")?.split(",")
    : [],
   save_to_board_modal: false,
   initialYear: this.urlString.get("year")
    ? moment({ year: this.urlString.get("year"), month: 1, day: 1 })
    : "",

   searchValue: "",
   search_list: false,
   productCategory: this.urlString.get("productCategory") ?? "all",
  };
 }
 selectTab = (tab) => {
  console.log(tab);
  this.setState(
   {
    selectedTab: tab === "All" ? "" : tab,
   },
   () => {
    this.getProjects();
   }
  );
 };
 selectCategory = (cat) => {
  this.setState(
   {
    cat: cat === "all" ? "" : cat,
   },
   () => {
    this.getProjects();
   }
  );
 };
 componentDidUpdate(prevProps) {
  console.log(prevProps.type);
  console.log(this.props.type);
  if (prevProps.type !== this.props.type) {
   this.setState(
    {
     _type: this.props.type,
     cat: "all",
     selectedTab: "",
     kind: "all",
     country: "",
     productCategory: "all",
    },
    () => {
     this.setURL();
     this.getProjects();
    }
   );
  }
 }
 selectCreator = (tab) => {
  console.log(tab);

  this.setState(
   {
    project_type: tab === "All" ? "" : tab,
   },
   () => {
    this.getProjects();
   }
  );
 };
 selectKind = (kind) => {
  this.setState(
   {
    kind: kind === "all" ? "" : kind,
   },
   () => {
    this.getProjects();
   }
  );
 };
 selectProductCategory = (productCategory) => {
  this.setState(
   {
    productCategory: productCategory === "all" ? "" : productCategory,
   },
   () => {
    this.getProjects();
   }
  );
 };
 getProjects = (more = "") => {
  this.setURL();
  const current_offset = this.state.offset;
  this.setState(
   {
    fetching: more === "more" ? false : true,
    offset: more !== "more" ? 0 : current_offset,
    loadingmore: more === "more" ? true : false,
    kind: this.state.kind !== "all" ? this.state.kind : "",
   },
   () => {
    const {
     year,
     country,
     cat,
     selectedTab,
     offset,
     kind,
     productCategory,
     //  selectedTypes,
    } = this.state;
    axios
     .get(
      `${API}projects/${offset}?filter[year]=${year}&filter[country]=${country}&filter[kind]=${
       cat && cat !== "all" ? cat : ""
      }&filter[article_type]=${kind ?? ""}&filter[type]=${
       this.state._type
      }&filter[featured_by]=${
       selectedTab ?? ""
      }&filter[product_design_category]=${
       productCategory && productCategory !== "all" ? productCategory : ""
      }`
     )
     .then((response) => {
      this.setState({
       fetching: false,
       loadingmore: false,
       moreExist: response.data.projects.length >= 15,
       projects: more
        ? [...this.state.projects, ...response.data.projects]
        : response.data.projects,
      });
      console.log(response);
     });
   }
  );
 };
 saveToBoard = () => {
  if (!this.props.isLoggedIn) {
   message.warning("Login or register to save project");
  } else {
   this.setState({
    save_to_board_modal: true,
   });
  }
 };
 setURL = () => {
  const {
   selectedTab,
   year,
   cat,
   productCategory,
   kind,
   country,
   _type,
  } = this.state;
  const catParam = cat && cat !== "all" ? `category=${cat}` : "";
  const kindParam = kind && kind !== "all" ? `&kind=${kind}` : "";
  const productParam =
   productCategory && productCategory !== "all"
    ? `&kind=${productCategory}`
    : "";
  const countryParam = country ? `&country=${country}` : "";
  const yearParam = year ? `&year=${year}` : "";
  const featParam = selectedTab ? `&featuredBy=${selectedTab}` : "";
  const typeParam = _type?.length > 0 ? `&types=${this.state._type}` : "";
  const params = cat || kind || country || year || typeParam ? "?" : "";

  window.history.pushState(
   {},
   null,
   `/design-selected${params}${catParam}${kindParam}${countryParam}${yearParam}${typeParam}${featParam}${productParam}`
  );
 };

 componentDidMount() {
  this.getProjects();
  console.log(this.state._type);
  window.addEventListener("scroll", () => {
   console.log(window.scrollY);
  });
 }

 selectTypes = (type) => {
  console.log(type);
  this.setState(
   {
    selectedTypes: type,
    _type: type,
   },
   () => {
    this.getProjects();
   }
  );
 };

 resetAll = () => {
  this.setState(
   {
    _type: "",
    cat: "all",
    year: "",
    kind: "all",
    country: "",
   },
   () => {
    this.getProjects();
   }
  );
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

 searching = (value) => {
  console.log(this.state.search_list);
  console.log(value);
  this.setState({ searchValue: value });
  console.log(value);
  if (value.length > 0) {
   this.setState({ search_list: true });
   this.setState({
    filterProjects: project_cats?.filter((project) => {
     return project?.toLowerCase().includes(value.toLowerCase());
    }),
   });
  } else {
   this.setState({ search_list: false });
  }
 };

 render() {
  const { selectedTab } = this.state;
  return (
   <React.Fragment>
    <div id="magazine-page">
     <div className="filter-wrapper only-wide">
      <div className="wrapper">
       <Row span={24} align="middle">
        <Col md={13}>
         <Row span={24} justify="start" align="bottom">
          <Col md={3}>
           <Form name="basic" size="large" autoComplete="off">
            <Form.Item
             name="year"
             className="form-label"
             initialValue={this.state.initialYear}
            >
             <DatePicker
              bordered={false}
              size="middle"
              onChange={(e) => {
               this.setState(
                {
                 year: e ? e?._d?.getFullYear() : "",
                },
                () => {
                 this.getProjects();
                }
               );
              }}
              placeholder="Year"
              picker="year"
              suffixIcon={<VscTriangleDown />}
              style={{
               width: 85,
              }}
             />
            </Form.Item>
           </Form>
          </Col>
          <Col md={5}>
           <ReactFlagsSelect
            selected={this.state.country}
            selectedSize={13}
            optionsSize={12}
            searchable
            customLabels={customLabels}
            placeholder={<>Country</>}
            onSelect={(code) => {
             this.setState({ country: code }, () => {
              this.getProjects();
             });
            }}
           />
           {this.state.country && (
            <p
             className=""
             style={{
              position: "absolute",
              left: 20,
              cursor: "pointer",
              top: "32px",
              fontSize: "9px",
              color: "red",
              fontWeight: "bold",
             }}
             onClick={() => {
              this.setState({ country: "" }, () => {
               this.getProjects();
              });
             }}
            >
             RESET
            </p>
           )}
          </Col>
          <Col md={5}>
           <Select
            dropdownClassName="wide-dropdown"
            bordered={false}
            size="large"
            allowClear
            defaultValue={this.state.cat !== "all" ? this.state.cat : undefined}
            onChange={this.selectCategory}
            suffixIcon={false}
            placeholder={
             <>
              Category <VscTriangleDown />
             </>
            }
            style={{
             width: "100%",
            }}
           >
            <Select.Option key="all" value="all">
             All Categories
            </Select.Option>
            <Select.Option key="Architecture" value="Architecture">
             Architecture
            </Select.Option>
            <Select.Option value="Interior Design" key="Interior Design">
             Interior Design
            </Select.Option>
            <Select.Option value="Landscape" key="Landscape">
             Landscape
            </Select.Option>
            <Select.Option key="Product Design" value="Product Design">
             Product Design
            </Select.Option>
           </Select>
          </Col>
          <Col md={3}>
           <Form.Item>
            <Select
             dropdownClassName="wide-dropdown"
             bordered={false}
             suffixIcon={false}
             size="large"
             allowClear
             clearIcon={false}
             defaultValue={
              this.state.kind !== "all" ? this.state.kind : undefined
             }
             placeholder={
              <>
               Type <VscTriangleDown />
              </>
             }
             onChange={this.selectKind}
             style={{
              width: "100%",
             }}
            >
             <Select.Option key="all" value="all">
              All Types
             </Select.Option>
             <Select.Option key="blog" value="blog">
              Blog
             </Select.Option>
             <Select.Option key="project" value="project">
              Project
             </Select.Option>
            </Select>
           </Form.Item>
          </Col>
          {this.state.cat === "Product Design" && (
           <Col md={7}>
            <Form.Item>
             <Select
              dropdownClassName="wide-dropdown"
              bordered={false}
              suffixIcon={false}
              size="large"
              allowClear
              clearIcon={false}
              defaultValue={
               this.state.productCategory !== "all"
                ? this.state.productCategory
                : undefined
              }
              placeholder={
               <>
                Product design category <VscTriangleDown />
               </>
              }
              onChange={this.selectProductCategory}
              style={{
               width: "100%",
              }}
             >
              <Select.Option key="all" value="all">
               All
              </Select.Option>
              {products_categories?.map((p) => {
               return (
                <Select.Option key={p} value={p}>
                 {p}
                </Select.Option>
               );
              })}
             </Select>
            </Form.Item>
           </Col>
          )}
         </Row>
        </Col>
        <Col md={8}>
         <div className="magazine-tabs first">
          <p className="tab-head">Featured By:</p>
          <p
           className={selectedTab === "design-selected" ? "active" : ""}
           onClick={() => this.selectTab("design-selected")}
          >
           <span className="compressed bold-compressed">design</span>
           <span className="compressed light-compressed">selected</span>
          </p>
          <p
           className={selectedTab === "designers" ? "active" : ""}
           onClick={() => this.selectTab("designers")}
          >
           Designers
          </p>
          <p
           className={selectedTab === "brands" ? "active" : ""}
           onClick={() => this.selectTab("brands")}
          >
           Brands
          </p>
          <p
           className={selectedTab === "" ? "active" : ""}
           onClick={() => this.selectTab("All")}
          >
           All
          </p>
         </div>
        </Col>
        <Col md={3}>
         {this.state._type?.length > 0 && (
          <p className="magazine-tag">
           <span>{this.state._type}</span>
           <span
            onClick={() => {
             this.setState(
              {
               _type: "",
              },
              () => {
               this.getProjects();
               this.props.dispatchSetMagazineType("");
              }
             );
            }}
           >
            X
           </span>
          </p>
         )}
        </Col>
       </Row>
      </div>
     </div>
     <div>
      <div className="wrapper pt-5">
       <h5 className="magazine-head">17 Magazine</h5>
       <p className="magazine-p mb-5">
        Source Design Projects, Blogs, News and more & Get In Touch With
        Designers and Brands.
       </p>
       <div className="my-3">
        {this.state.fetching ? (
         <Spin
          size="large"
          indicator={
           <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
          }
          style={{ width: "100%", margin: "100px auto" }}
         />
        ) : (
         <Row span={24} gutter={{ md: 24, lg: 24, sm: 10, xs: 10 }}>
          {this.state.projects.length > 0 &&
           this.state.projects.map((p, index) => {
            return (
             <Col xs={12} sm={12} md={8} className="mb-4" key={index}>
              <a href={`/project/${p.id}`} className="box-link">
               <div className="project-col bg-white">
                <button
                 className="project-btn svbtn svprojectbtn"
                 onClick={(e) => {
                  e.preventDefault();
                  this.setState(
                   {
                    to_save_project_cover: p.cover,
                    to_save_projectId: p,
                   },
                   () => {
                    this.saveToBoard();
                   }
                  );
                 }}
                >
                 SAVE
                </button>
                <div className="project-image-wrapper">
                 <div
                  className="project-image"
                  style={{
                   backgroundImage: `url(${p.cover})`,
                  }}
                 ></div>
                </div>
                <div className="info p-3 left">
                 <p className="project-name left">{p.name}</p>
                 <div className="project-cover-footer">
                  <p>
                   {p.kind?.map((k) => {
                    return <span className="px-1">{k}</span>;
                   })}
                  </p>
                  <hr className="my-1 w-20" />
                  <p>
                   <span className="px-1">{p.type}</span>
                  </p>
                 </div>
                </div>
               </div>
              </a>
             </Col>
            );

            // 95485
           })}
          {this.state.projects.length >= 15 && (
           <Col md={24} xs={24} sm={24}>
            {this.state.loadingmore ? (
             <Spin
              size="large"
              indicator={
               <LoadingOutlined
                style={{ fontSize: "36px", color: "#000" }}
                spin
               />
              }
              style={{ width: "100%", margin: "auto" }}
             />
            ) : (
             this.state.moreExist && (
              <>
               <p
                className="w-100 text-center pb-3 pt-5 underline bold large arch-color"
                onClick={() => {
                 this.setState(
                  {
                   offset: this.state.offset + 15,
                  },
                  () => {
                   this.getProjects("more");
                  }
                 );
                }}
               >
                SEE MORE
               </p>
              </>
             )
            )}
           </Col>
          )}
          {this.state.projects?.length <= 0 && <p>0 Result</p>}
         </Row>
        )}
       </div>
      </div>
     </div>
    </div>

    <button
     id="sticky-magazine"
     className="sticky-filter-btn"
     onClick={() => {
      this.openDrawer();
     }}
    >
     <HiAdjustments /> Filters
    </button>
    <div className="magazine-footer">
     <Footer lightgray={false} />
    </div>
    <Drawer
     id="filter-mobile-drawer"
     placement="left"
     closable={true}
     destroyOnClose
     title={
      <span
       onClick={() => {
        this.resetAll();
        this.closeDrawer();
       }}
      >
       Clear all
      </span>
     }
     onClose={() => {
      this.closeDrawer();
     }}
     visible={this.state.visible}
     key="left"
     mask={false}
     width={"100%"}
     height={"100vw"}
    >
     <div className="form-inne">
      <Row>
       <Col xs={24} className="mb-3">
        <Input
         size="large"
         placeholder="Search Office, Hotel, Cafe"
         onChange={(e) => this.searching(e.target.value)}
         prefix={<SearchOutlined />}
        />
        {this.state.search_list && (
         <div
          className="col-md-5"
          id="search-list"
          style={{
           position: "absolute !important",
           top: "40px !important",
           width: "100%",
           right: 0,
           left: 0,
           minHeight: "250px",
           borderTopRightRadius: "2px",
           borderTopLeftRadius: "2px",
           background: "#fff",
           border: "1px solid #ddd",
           borderTop: "0",
           zIndex: 500,
           //  paddingLeft: "20px",
          }}
         >
          {this.state.filterProjects.length > 0 && (
           <>
            <ul className="inner-list">
             {this.state.filterProjects.map((project, index) => {
              return (
               <a href={`/design-selected?types=${project}`}>
                <li>{project}</li>
               </a>
              );
             })}
            </ul>
           </>
          )}
         </div>
        )}
       </Col>
       <Col xs={24} className="mb-3">
        <Select
         //  dropdownClassName="wide-dropdown"
         size="large"
         allowClear
         //  value={this.state.cat}
         defaultValue={
          this.state.cat !== "all" && this.state.cat ? this.state.cat : "all"
         }
         onChange={this.selectCategory}
         suffixIcon={false}
         placeholder="Category"
         style={{
          width: "100%",
         }}
        >
         <Select.Option key="all" value="all">
          <span>All Solutions</span>
         </Select.Option>
         <Select.Option key="Architecture" value="Architecture">
          <span>Architecture</span>
         </Select.Option>
         <Select.Option value="Interior Design" key="Interior Design">
          <span>Interior Design</span>
         </Select.Option>
         <Select.Option value="Landscape" key="Landscape">
          <span>Landscape</span>
         </Select.Option>
         <Select.Option key="Product Design" value="Product Design">
          <span>Product Design</span>
         </Select.Option>
        </Select>
       </Col>
       {this.state.cat === "Product Design" && (
        <Col xs={24} className="mb-0">
         <Form.Item>
          <Select
           //  dropdownClassName="wide-dropdown"
           suffixIcon={false}
           size="large"
           allowClear
           clearIcon={false}
           defaultValue={
            this.state.productCategory !== "all" && this.state.productCategory
             ? this.state.productCategory
             : "all"
           }
           placeholder={
            <>
             Product design category
             {/* <VscTriangleDown /> */}
            </>
           }
           onChange={this.selectProductCategory}
           style={{
            width: "100%",
           }}
          >
           <Select.Option key="all" value="all">
            <span>All Products</span>
           </Select.Option>
           <Select.Option key="Furniture" value="Furniture">
            <span>Furniture</span>
           </Select.Option>
           <Select.Option key="Lighting" value="Lighting">
            <span>Lighting</span>
           </Select.Option>
          </Select>
         </Form.Item>
        </Col>
       )}
       <Col xs={24} className="mb-3">
        <Select
         //  dropdownClassName="wide-dropdown"
         suffixIcon={false}
         size="large"
         allowClear
         clearIcon={false}
         defaultValue={
          this.state.kind !== "all" && this.state.kind ? this.state.kind : "all"
         }
         placeholder="Type"
         onChange={this.selectKind}
         style={{
          width: "100%",
         }}
        >
         <Select.Option key="all" value="all">
          <span> All Types</span>
         </Select.Option>
         <Select.Option key="blog" value="blog">
          <span>Blog</span>
         </Select.Option>
         <Select.Option key="project" value="project">
          <span>Project</span>
         </Select.Option>
        </Select>
       </Col>
       <Col xs={24} className="mb-2">
        <Form.Item
         name="year"
         className="form-label"
         initialValue={this.state.initialYear}
        >
         <DatePicker
          size="large"
          onChange={(e) => {
           this.setState(
            {
             year: e ? e?._d?.getFullYear() : "",
            },
            () => {
             this.getProjects();
            }
           );
          }}
          picker="year"
          suffixIcon={<VscTriangleDown />}
          style={{
           width: "100%",
          }}
         />
        </Form.Item>
       </Col>
       <Col xs={24} className="mb-3">
        <ReactFlagsSelect
         selected={this.state.country}
         selectedSize={13}
         optionsSize={12}
         searchable
         customLabels={customLabels}
         placeholder={<>Country</>}
         onSelect={(code) => {
          this.setState({ country: code }, () => {
           this.getProjects();
          });
         }}
        />
        {this.state.country && (
         <p
          className="reset-contry"
          style={{
           position: "absolute",
           left: 20,
           cursor: "pointer",
           top: "35px",
           fontSize: "9px",
           color: "red",
           fontWeight: "bold",
          }}
          onClick={() => {
           this.setState({ country: "" }, () => {
            this.getProjects();
           });
          }}
         >
          RESET
         </p>
        )}
       </Col>
       <Col xs={24} className="mt-4 align-right">
        <button
         className="apply"
         onClick={() => {
          this.closeDrawer();
         }}
        >
         Apply
        </button>
       </Col>
      </Row>
     </div>
    </Drawer>
    <Modal
     title={this.state.save_to_board_modal}
     width={700}
     className="request-modal"
     visible={this.state.save_to_board_modal}
     destroyOnClose={true}
     footer={false}
     closeIcon={
      <>
       <div onClick={() => this.setState({ save_to_board_modal: false })}>
        X
       </div>
      </>
     }
     okButtonProps={{ hidden: true }}
     cancelButtonProps={{ hidden: true }}
    >
     <SaveToBoard
      cover={this.state.to_save_project_cover}
      project={this.state.to_save_projectId}
     />
    </Modal>
   </React.Fragment>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 dispatchSetMagazineType: (type) => dispatch(setProjectTypeSearch(type)),
});
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
  type: state?.project?.magazine_type,
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(Magazine);
