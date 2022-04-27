import React, { Component } from "react";
import { Row, Col, Form, DatePicker, Spin, message, Modal } from "antd";
import "./css/Magazine.css";
import ReactFlagsSelect from "react-flags-select";
import { API } from "./../utitlties";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import SaveToBoard from "../components/Modals/SaveToBoard";
class Magazine extends Component {
 constructor(props) {
  super(props);
  this.state = {
   selectedTab: "",
   country: "",
   year: "",
   offset: 0,
   fetching: true,
   creator: "",
   project_type: "",
   projects: [],
   moreExist: true,
   save_to_board_modal: false,
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
 getProjects = (more = "") => {
  const current_offset = this.state.offset;
  this.setState(
   {
    fetching: more === "more" ? false : true,
    offset: more !== "more" ? 0 : current_offset,
    loadingmore: more === "more" ? true : false,
   },
   () => {
    const { year, country, selectedTab, offset, project_type } = this.state;
    axios
     .get(
      `${API}projects/${offset}?filter[year]=${year}&filter[country]=${country}&filter[kind]=${selectedTab}&filter[article_type]=${project_type}`
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
   //  this.setState({ authModal: true });
   message.warning("Login or register to save project");
  } else {
   this.setState({
    save_to_board_modal: true,
   });
  }
 };
 componentDidMount() {
  this.getProjects();
 }
 render() {
  const { selectedTab, project_type } = this.state;
  return (
   <React.Fragment>
    <div id="magazine-page">
     <div className="filter-wrapper">
      <div className="wrapper">
       <Row span={24}>
        <Col md={7}>
         <Row span={24} justify="start" align="middle">
          <Col md={13}>
           <Form name="basic" size="large" autoComplete="off">
            <Form.Item name="year" className="form-label">
             <DatePicker
              size="middle"
              onChange={(e) => {
               this.setState(
                {
                 year: e ? e?._d?.getFullYear() : "",
                },
                () => this.getProjects()
               );
              }}
              placeholder="Year"
              picker="year"
              suffixIcon={false}
              style={{
               width: 160,
              }}
             />
            </Form.Item>
           </Form>
          </Col>
          <Col md={11}>
           <ReactFlagsSelect
            selected={this.state.country}
            selectedSize={13}
            optionsSize={12}
            searchable
            placeholder="Country"
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
         </Row>
        </Col>
        <Col md={11}>
         <div className="magazine-tabs first">
          <p
           className={selectedTab === "" ? "active" : ""}
           onClick={() => this.selectTab("All")}
          >
           All
          </p>
          <p
           className={selectedTab === "Architecture" ? "active" : ""}
           onClick={() => this.selectTab("Architecture")}
          >
           Architecture
          </p>
          <p
           className={selectedTab === "Interior design" ? "active" : ""}
           onClick={() => this.selectTab("Interior design")}
          >
           Interior design
          </p>
          <p
           className={selectedTab === "Landscape" ? "active" : ""}
           onClick={() => this.selectTab("Landscape")}
          >
           Landscape
          </p>
          <p
           className={selectedTab === "Product Design" ? "active" : ""}
           onClick={() => this.selectTab("Product Design")}
          >
           Product Design
          </p>
         </div>
        </Col>
        <Col md={6}>
         <div className="magazine-tabs sec">
          <p
           className={project_type === "" ? "active" : ""}
           onClick={() => this.selectCreator("All")}
          >
           All
          </p>
          {/* <p
           className={creator.includes("User") ? "active" : ""}
           onClick={() => this.selectCreator("User")}
          >
           Designers
          </p>
          <p
           className={creator.includes("Store") ? "active" : ""}
           onClick={() => this.selectCreator("Store")}
          >
           Brands
          </p> */}
          <p
           className={project_type === "project" ? "active" : ""}
           onClick={() => this.selectCreator("project")}
          >
           Project
          </p>
          <p
           className={project_type === "blog" ? "active" : ""}
           onClick={() => this.selectCreator("blog")}
          >
           Design Blog
          </p>
         </div>
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
         <Row span={24} gutter={24}>
          {this.state.projects.length > 0 &&
           this.state.projects.map((p, index) => {
            return (
             <Col xs={24} sm={12} md={8} className="mb-4" key={index}>
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
           })}
          {this.state.projects.length >= 15 && (
           <Col md={24}>
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

    <div className="magazine-footer">
     <Footer />
    </div>

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

// export default Magazine;
const mapStateToProps = (state) => {
 return {
  isLoggedIn: state?.regularUser?.isLoggedIn,
  uid: state?.regularUser?.info?.uid,
  user: state?.regularUser?.user,
 };
};

export default connect(mapStateToProps, null)(Magazine);
