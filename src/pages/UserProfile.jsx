import React, { Component } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoMdSettings } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import CollectionsTab from "./user_profile_tabs/CollectionsTab";
import CompaniesTab from "./user_profile_tabs/CompaniesTab.jsx";
import FollwingTab from "./user_profile_tabs/FollwingTab";
import { connect } from "react-redux";
import { auth } from "./../firebase";
import { setUserInfoAction } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../utitlties";
import ClipLoader from "react-spinners/ClipLoader";
import { IoWarning } from "react-icons/io5";
import SaveToBoard from "./../components/Modals/SaveToBoard";
import ShareSocialModal from "./../components/Modals/ShareSocialModal";
import Footer from "./../components/Footer";
import "./user_profile_tabs/profile.css";
import "../Company/company.css";

import {
 LoadingOutlined,
 CopyOutlined,
 EnvironmentFilled,
 ShareAltOutlined,
} from "@ant-design/icons";

import {
 Spin,
 Tooltip,
 Button,
 Col as AntCol,
 Row as AntRow,
 Modal as AntModal,
 Select,
} from "antd";
import { regionNames } from "./../redux/constants";
import AuthModalContent from "./../components/AuthModalContent";
import UserNotificationsTab from "./user_profile_tabs/UserNotificationsTab";

class UserProfile extends Component {
 constructor(props) {
  super(props);
  this.state = {
   user_uid: auth.currentUser?.uid,
   collections: [],
   selectedIndex: 0,
   from_filter: false,
   share_modal: false,
   product_solutions: [],
   project_solutions: [],
   boards: [],
   projects: [],
   selectedCategory: "all",
   selectedType: "all",
   removing_project: false,
   save_to_board_modal: false,
   delete_project_modal: false,
   authModal: false,
   to_save_project_cover: null,
   to_save_projectId: null,
   copied: false,
   followStateLoading: true,
   is_a_follower: false,
   followed_stores: [],
   is_designer: false,
   deletingProject: false,
   visitor: this.props?.match?.params?.uid ? true : false,
   visited_uid: this.props?.match?.params?.uid,
   fetched: false,
   shared: [],
   taggedProjects: [],
   projectsIds: [],
   to_delete_project: null,
   uid: this.props?.match?.params?.uid
    ? this.props.match?.params?.uid
    : this.props.info?.uid,
   user: null,
   hasNotifications: false,
   hasCompanies: false,
   bio_status_full: false,
  };
 }

 handleDeleteSubmit = () => {
  // const fd = new FormData();
  // fd.append("project_id", this.state.to_delete_project);
  this.setState({
   deletingProject: true,
  });
  axios
   .post(`${API}deleteproject/${this.state.to_delete_project}`)
   .then((response) => {
    console.log(response);
    this.setState({
     deletingProject: false,
     delete_project_modal: false,
     projects: this.state.projects?.filter((p) => {
      return p.id !== this.state.to_delete_project;
     }),
    });
   });
 };
 componentDidMount() {
  if (this.state?.uid) {
   axios
    .get(`${API}user/folders/${this.state.uid}`)
    .then((response) => {
     console.log(response);
     const {
      followed_stores,
      collections,
      user,
      projects,
      boards,
      products,
      hasNotifications,
      hasCompanies,
     } = response.data;
     this.setState({
      collections,
      boards,
      followed_stores,
      user,
      is_designer: parseInt(user?.is_designer),
      fetched: true,
      projects,
      products,
      projectsIds: projects?.map((p) => {
       return p.id;
      }),
      product_solutions: user?.categories?.filter((c) => {
       return c.title === "product";
      }),
      project_solutions: user?.categories?.filter((c) => {
       return c.title === "project";
      }),
      hasNotifications,
      hasCompanies,
      taggedProjects: user?.tagged,
      shared: user?.shared,
     });
     axios
      .get(`${API}is-dfollower/${user?.id}/${this.props.info?.id}`)
      .then((response) => {
       console.log(response);
       this.setState({
        followStateLoading: false,
        is_a_follower: response.data.is_a_follower,
       });
      });
    })
    .catch((err) => {
     console.log(err);
     this.setState({ fetched: false });
    });
  }
 }
 handleCopy = async (text) => {
  if ("clipboard" in navigator) {
   return await navigator.clipboard.writeText(text);
  } else {
   return document.execCommand("copy", true, text);
  }
 };
 handleRemoveTaggedProject = (project_id, user_id) => {
  this.setState({
   removing_project: true,
  });
  const fd = new FormData();
  fd.append("project_id", project_id);
  fd.append("user_id", user_id);
  axios
   .post(`${API}designerremoverole`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     removing_project: false,
     taggedProjects: this.state.taggedProjects?.filter((p) => {
      return p.id !== project_id;
     }),
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };
 saveToBoard = () => {
  if (!this.props.isLoggedIn) {
   this.setState({ authModal: true });
  } else {
   console.log("OPEN SAVE MODAL");
   this.setState({
    save_to_board_modal: true,
   });
  }
 };
 handleBioShow = () => {
  const status = this.state.bio_status_full;
  this.setState({
   bio_status_full: !status,
  });
 };
 handleFollowingAction = () => {
  const { is_a_follower } = this.state;
  this.setState({
   followStateLoading: true,
  });
  if (is_a_follower) {
   axios
    .post(
     `${API}unfollow-designer/${this.props.info?.id}/${this.state.user?.id}`
    )
    .then((response) => {
     console.log(response);
     this.setState({
      is_a_follower: false,
      followStateLoading: false,
     });
    });
  } else {
   axios
    .post(`${API}follow-designer/${this.props.info?.id}/${this.state.user?.id}`)
    .then((response) => {
     console.log(response);
     this.setState({
      is_a_follower: true,
      followStateLoading: false,
     });
    });
  }
 };
 handleFilterChange = () => {
  axios
   .get(
    `${API}user/moredesignerprojects/${this.state.user?.id}/${this.state.selectedCategory}/${this.state.selectedType}`
   )
   .then((response) => {
    this.setState({
     projects: response.data.projects,
     taggedProjects: response.data.tagged_projects,
     from_filter: true,
    });
   });
 };
 handleCategoryChange = (selectedCategory) => {
  this.setState(
   {
    selectedCategory,
    filter: true,
    selectedType: "all",
   },
   () => {
    this.handleFilterChange();
   }
  );
 };
 handleTypeChange = (selectedType) => {
  this.setState(
   {
    selectedType,
    filter: true,
   },
   () => {
    this.handleFilterChange();
   }
  );
 };
 render() {
  // if (!this.props.isLoggedIn || !this.props.info) return <Redirect to="/" />;
  if (!this.state.fetched)
   return (
    <>
     <Spin
      size="large"
      indicator={
       <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
      }
      style={{ position: "absolute", top: "40%", right: "50%" }}
     />
    </>
   );
  return (
   <React.Fragment>
    <div id="user-profile" className="bg-white">
     <Container fluid>
      <Row className="justify-content-md-center">
       <Col md={{ span: 12 }}>
        <div className="profile-section">
         <div
          className="profile-img"
          style={{
           backgroundImage: `url(${this.state.user?.photoURL})`,
           backgroundColor: "#ddd",
          }}
         >
          {!this.state.user?.photoURL && (
           //  this.state.user?.photoURL?.length < 10 && (
           <span>{this.state.user?.displayName[0].toUpperCase()}</span>
          )}
         </div>
         <div className="profile-heading">
          <h2 className="name">{this.state.user?.displayName}</h2>
          {!parseInt(this.state.is_designer) ? (
           <a href="/designeraccount" className="arch-link">
            {!this.state.visitor && (
             <p className="join-design">Join 17Designclub</p>
            )}
           </a>
          ) : (
           <>
            <p className="dc mb-0">
             DC-125541
             <span>
              <Tooltip title={this.state.copied ? "Copied" : "Copy Code"}>
               <Button
                onClick={() =>
                 this.handleCopy("RXDSSSSS").then(() => {
                  this.setState({ copied: true });
                  setTimeout(() => {
                   this.setState({ copied: false });
                  }, 3500);
                 })
                }
                icon={<CopyOutlined />}
               />
              </Tooltip>
             </span>
            </p>
            {this.state.user?.country && this.state.user?.country?.length > 0 && (
             <p className="loc">
              <EnvironmentFilled />
              {regionNames.of(this.state.user.country)},
              {this.state.user.city && <span>{this.state.user.city}</span>}
             </p>
            )}

            {this.state.user?.user_description?.length > 4 && (
             <p className="bio">
              {!this.state.bio_status_full
               ? this.state.user?.user_description?.slice(0, 151)
               : this.state.user?.user_description?.slice(0)}
              <span onClick={this.handleBioShow} className="pointer px-2">
               {this.state.bio_status_full ? "See more" : "See less"}
              </span>
             </p>
            )}

            <p className="mt-4 mb-1 proff-head">Professions</p>
            <div className="professions">
             {this.state.user?.professions?.map((p) => {
              return (
               <div>
                <a href={`/designers?filterBy=designer&profession=${p}`}>
                <p>{p}</p>
                </a>
               
               </div>
              );
             })}
            </div>
           </>
          )}
         </div>
         <Row className="mobile-profile-btns">
          {this.state.visitor ? (
           <>
            <Col md={{ span: 4 }}>
             <button
              onClick={this.handleFollowingAction}
              type="button"
              style={{
               backgroundColor: this.state.is_a_follower ? "#e8e8e8" : "",
              }}
              title={this.state.is_a_follower ? "Unfollow" : "Follow"}
              className="profile-follow-btn profile-action-btn mx-1"
             >
              {this.state.followStateLoading ? (
               <Spin
                size="small"
                indicator={
                 <LoadingOutlined
                  style={{ fontSize: "15px", color: "#000" }}
                  spin
                 />
                }
               />
              ) : (
               <>
                {this.state.is_a_follower ? (
                 <svg
                  width="18"
                  height="auto"
                  class="mf_US"
                  viewBox="0 0 32 32"
                  version="1.1"
                  aria-hidden="false"
                 >
                  <desc lang="en-US">A user with a checkmark</desc>
                  <path d="M10.3 22.7l4-3.9c-.5-.1-.9-.1-1.3-.1-3.6 0-10.7 1.8-10.7 5.3v2.7h12l-4-4zM13 16c2.9 0 5.3-2.4 5.3-5.3S15.9 5.3 13 5.3s-5.3 2.4-5.3 5.3S10.1 16 13 16m8.6 11.3L17 22.7l1.9-1.9 2.8 2.8 6.8-6.9 1.9 1.9-8.8 8.7z"></path>
                 </svg>
                ) : (
                 <svg
                  width="18"
                  height="auto"
                  class="mf_US"
                  viewBox="0 0 32 32"
                  version="1.1"
                  aria-hidden="false"
                 >
                  <path d="M23.7 24v2.7H2.3V24c0-3.5 7.1-5.3 10.7-5.3s10.7 1.8 10.7 5.3zM13 16c2.9 0 5.3-2.4 5.3-5.3S15.9 5.3 13 5.3s-5.3 2.4-5.3 5.3S10.1 16 13 16zm14.7-2.7v-4H25v4h-4V16h4v4h2.7v-4h4v-2.7h-4z"></path>
                 </svg>
                )}
               </>
              )}
             </button>
            </Col>
            <Col md={{ span: 4 }}>
             <button className="profile-follow-btn profile-action-btn mx-1">
              <ShareAltOutlined
               onClick={() => {
                this.setState({
                 share_modal: true,
                });
               }}
              />
             </button>
            </Col>
           </>
          ) : (
           <>
            <Col md={{ span: 4 }} className="mx-1">
             <Link
              to={{
               pathname: "/profile/settings",
               state: {
                user: this.state.user,
               },
              }}
             >
              <button className="profile-settings-btn profile-action-btn">
               <IoMdSettings /> <span>Settings</span>
              </button>
             </Link>
            </Col>
            <Col md={{ span: 4 }}>
             <button className="profile-follow-btn profile-action-btn">
              <ShareAltOutlined
               onClick={() => {
                this.setState({
                 share_modal: true,
                });
               }}
              />
             </button>
            </Col>
           </>
          )}
         </Row>
        </div>
       </Col>
       <Col md={{ span: 12 }}>
        <div className="profile-tabs">
         <Tabs
          selectedIndex={this.state.selectedIndex}
          onSelect={(selectedIndex) => this.setState({ selectedIndex })}
         >
          <TabList>
           {this.state.user?.categories?.length > 0 && <Tab>Solutions</Tab>}
           {this.state.is_designer === 1 && (
            <Tab tabIndex={1}>Projects & Blogs</Tab>
           )}
           <Tab>Collection</Tab>
           <Tab>Following</Tab>
           {this.state.products?.length > 0 && <Tab tabIndex={4}>Products</Tab>}
           {!this.state.visitor && (
            <Tab>
             Company Pages <span className="tab-icon tab-icon-info">i</span>
            </Tab>
           )}
           {!this.state.visitor && this.state.hasNotifications && (
            <Tab>
             Notifications <span className="tab-icon tab-icon-red">i</span>
            </Tab>
           )}
          </TabList>
          {this.state.user?.categories?.length > 0 && (
           <TabPanel>
            {this.state.project_solutions?.length > 0 && (
             <h6 className="mb-5 tab-heading">Projects</h6>
            )}
            <AntRow span={24} gutter={{ md: 24, lg: 24, xs: 12, sm: 12 }}>
             {this.state.project_solutions?.map((cat) => {
              return (
               <>
                <AntCol md={6} xs={12} sm={12} lg={6} className="mb-4">
                 <div
                  className="cat"
                  onClick={() => this.setState({ selectedIndex: 1 })}
                 >
                  <div
                   className="cat-img"
                   style={{
                    backgroundImage: `url("${cat?.cover}")`,
                   }}
                  ></div>
                  <p className="cat-name">{cat.name}</p>
                 </div>
                </AntCol>
               </>
              );
             })}
            </AntRow>

            {this.state.product_solutions?.length > 0 && (
             <h6 className="mb-5 tab-heading">Product</h6>
            )}
            <AntRow span={24} gutter={{ md: 24, lg: 24, xs: 12, sm: 12 }}>
             {this.state.product_solutions?.map((cat) => {
              return (
               <>
                <AntCol md={6} xs={12} sm={12} lg={6} className="mb-4">
                 <div
                  className="cat"
                  onClick={() => {
                   this.setState({ selectedIndex: 4 });
                  }}
                  //  onClick={() => this.handleSelectCatName(cat.name)}
                 >
                  <div
                   className="cat-img"
                   style={{
                    backgroundImage: `url("${cat?.cover}")`,
                   }}
                  ></div>
                  <p className="cat-name">{cat.name}</p>
                 </div>
                </AntCol>
               </>
              );
             })}
            </AntRow>
           </TabPanel>
          )}

          {this.state.is_designer === 1 && (
           <TabPanel forceRender>
            {(this.state.projects?.length + this.state.taggedProjects?.length >
             0 ||
             this.state.from_filter) && (
             <AntRow span={24} className="mb-4" gutter={16}>
              <AntCol md={6}>
               <Select
                size="large"
                value={this.state.selectedCategory}
                onChange={this.handleCategoryChange}
                style={{ width: "100%" }}
               >
                <Select.Option key="All" value="all">
                 All
                </Select.Option>
                {[
                 "Architecture",
                 "Interior Design",
                 "Landscape",
                 "Blog",
                 "Product Design",
                ].map((item) => (
                 <Select.Option key={item} value={item}>
                  {item}
                 </Select.Option>
                ))}
               </Select>
              </AntCol>
              <AntCol md={6}>
               <Select
                size="large"
                value={this.state.selectedType}
                onChange={this.handleTypeChange}
                style={{ width: "100%" }}
               >
                <Select.Option key="All" value="all">
                 All
                </Select.Option>
                {/* {project_cats?.map((item) => (
                 <Select.Option key={item} value={item}>
                  {item}
                 </Select.Option>
                ))} */}
                {this.state.project_solutions?.map((sol) => {
                 return (
                  <>
                   {sol?.title === "project" && (
                    <Select.Option key={sol?.name} value={sol?.name}>
                     {sol?.name}
                    </Select.Option>
                   )}{" "}
                  </>
                 );
                })}
               </Select>
              </AntCol>
             </AntRow>
            )}
            <AntRow
             span={24}
             gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}
             justify=""
            >
             {!this.state.visitor && (
              <AntCol xs={12} sm={12} md={8} className="my-4 add-col">
               <div className="add-project-icon">
                <a href={`/addproject/designer/${this.state.user?.id}`}>
                 <AiOutlinePlus />
                 Add Project
                </a>
               </div>
              </AntCol>
             )}

             {this.state.projects?.length + this.state.taggedProjects?.length >
              0 && (
              <>
               {this.state.projects?.map((p, index) => {
                return (
                 <AntCol xs={12} sm={12} md={8} className="my-4" key={index}>
                  {!this.state.visitor ? (
                   <>
                    <a href={`/project/${p.id}`} className="box-link">
                     <div className="project-col bg-white">
                      {!this.state.visitor && (
                       <>
                        <a
                         href={`/editproject/${p.id}`}
                         className="box-link project-edit-btn project-btn"
                        >
                         Edit
                        </a>
                       </>
                      )}
                      {!this.state.visitor && (
                       <>
                        <button
                         className="project-btn project-delete-btn"
                         onClick={(e) => {
                          e.preventDefault();
                          this.setState(
                           {
                            to_delete_project: p.id,
                           },
                           () => {
                            this.setState({
                             delete_project_modal: true,
                            });
                           }
                          );
                         }}
                        >
                         Delete
                        </button>
                       </>
                      )}
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
                   </>
                  ) : (
                   <>
                    <a href={`/project/${p.id}`} className="box-link">
                     <div className="project-col bg-white">
                      {this.state.visitor && this.props.isLoggedIn && (
                       <button
                        className="project-btn project-edit-btn"
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
                        Save
                       </button>
                      )}
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
                   </>
                  )}
                 </AntCol>
                );
               })}
               {this.state.taggedProjects?.map((p, index) => {
                return (
                 <>
                  {!this.state.projectsIds?.includes(p.id) && (
                   <AntCol xs={12} sm={12} md={8} className="my-4" key={index}>
                    <a href={`/project/${p.id}`} className="box-link">
                     <div className="project-col bg-white">
                      {!this.state.visitor ? (
                       <Button
                        loading={this.state.removing_project}
                        className="project-btn project-remove-btn"
                        onClick={(e) => {
                         e.preventDefault();
                         this.handleRemoveTaggedProject(
                          p?.id,
                          this.state.user?.id
                         );
                        }}
                       >
                        Remove
                       </Button>
                      ) : (
                       <>
                        <Button
                         // loading={this.state.removing_project}
                         className="project-btn project-remove-btn"
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
                         Save
                        </Button>
                       </>
                      )}
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
                   </AntCol>
                  )}
                 </>
                );
               })}
              </>
             )}
            </AntRow>
           </TabPanel>
          )}
          <TabPanel forceRender>
           <CollectionsTab
            collections={this.state.collections}
            boards={this.state.boards}
            shared={this.state.shared}
            user_id={this.state.user?.id}
            creator_name={this.state.user?.displayName}
           />
          </TabPanel>
          <TabPanel forceRender>
           <FollwingTab
            followed_stores={this.state.followed_stores}
            user_id={this.state.user?.id}
           />
          </TabPanel>
          {this.state.products?.length > 0 && (
           <TabPanel>
            <div className="products">
             <AntRow
              gutter={{ xs: 8, sm: 12, md: 24, lg: 24 }}
              className="py-3"
             >
              {this.state.products.length > 0 ? (
               <>
                {this.state.products.map((product, index) => {
                 return (
                  <AntCol
                   className="gutter-row mb-3"
                   lg={6}
                   md={6}
                   xs={12}
                   sm={12}
                  >
                   <a href={`/product/${product.id}`}>
                    <div className="product">
                     <div
                      className="p-img"
                      style={{
                       background: `url(${product?.identity[0].preview_cover})`,
                      }}
                     >
                      <div className="prlayer"></div>

                      {product?.files?.length > 0 ? (
                       <>
                        <div className="actns-btn file-btn cad">CAD</div>
                        <div className="actns-btn file-btn threeD">3D</div>
                       </>
                      ) : (
                       ""
                      )}
                     </div>
                     <h5 className="product-store">{product.stores?.name}</h5>
                     <p className="product-name">{product?.identity[0].name}</p>
                     <div className="product-price">
                      {product.identity[0].preview_price &&
                      product.identity[0].preview_price > 0 ? (
                       <>
                        <span>¥ {product.identity[0].preview_price}</span>
                       </>
                      ) : (
                       <>
                        <Link
                         to={{
                          pathname: `/product/${product?.identity[0].product_id}`,
                          state: {
                           request_price: true,
                          },
                         }}
                        >
                         REQUEST PRICE INFO
                        </Link>
                       </>
                      )}
                     </div>
                    </div>
                   </a>
                  </AntCol>
                 );
                })}
               </>
              ) : (
               <>
                <p className="indicator">
                 You Don't have any products in the collection
                </p>
               </>
              )}
             </AntRow>
            </div>
           </TabPanel>
          )}
          {!this.state.visitor && (
           <TabPanel>
            <CompaniesTab user_id={this.state.user?.id} />
           </TabPanel>
          )}
          {!this.state.visitor && this.state.hasNotifications && (
           <TabPanel>
            <UserNotificationsTab user_id={this.state.user?.id} />
           </TabPanel>
          )}
         </Tabs>
        </div>
       </Col>
      </Row>
     </Container>
    </div>
    <Footer lightgray={false} />
    {/* delte project modal */}
    <Modal
     show={this.state.delete_project_modal}
     onHide={() => {
      this.setState({
       delete_project_modal: false,
      });
     }}
     closeButton
     keyboard={false}
     size="md"
    >
     <Modal.Body>
      <div className="modal-wrapper" style={{ padding: "15px", margin: "" }}>
       <Row as={Row} style={{ margin: "0px 0" }}>
        <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>Delete Project</p>
        <Col md={8}></Col>
       </Row>
       <Row as={Row} style={{ margin: "30px 0" }}>
        <Col md={12}>
         <div
          className="warning-danger"
          style={{
           background: "#fbe9e7",
           padding: "15px",
           color: "#E41E15",
          }}
         >
          <span
           style={{
            display: "inline-block",
            fontSize: "2.5rem",
            verticalAlign: "center",
            padding: "0 10px",
           }}
          >
           <IoWarning />
          </span>
          <p
           style={{
            color: "#c62828",
            fontWeight: "600",
            width: "80%",
            fontSize: ".9rem",
            display: "inline-block",
           }}
          >
           After you deleting project, it's permanently deleted.
          </p>
         </div>
        </Col>
       </Row>

       <Button
        variant="danger"
        onClick={this.handleDeleteSubmit}
        type="submit"
        style={{
         textAlign: "right",
         background: "#E41E15",
         display: "block",
         float: "right",
         marginRight: "12px",
         color: "#fff",
         border: "none",
        }}
       >
        {this.state.deletingProject ? (
         <>
          <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
         </>
        ) : (
         <>Delete</>
        )}
       </Button>
      </div>
     </Modal.Body>
    </Modal>
    <>
     <Modal
      size="lg"
      className="auth-modal"
      show={this.state.authModal && !this.props.isLoggedIn}
      onHide={() => this.setState({ authModal: false })}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
     >
      <Modal.Body>
       <AuthModalContent />
      </Modal.Body>
     </Modal>
    </>
    <AntModal
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
    </AntModal>
    <AntModal
     title={`Share ${this.state.brand?.name}`}
     width={350}
     className="share-modal"
     visible={this.state.share_modal}
     destroyOnClose={true}
     footer={false}
     closeIcon={
      <div onClick={() => this.setState({ share_modal: false })}>X</div>
     }
    >
     <ShareSocialModal
      page_url={`https://www.arch17.com/user/${this.state.user?.uid}`}
      media={this.state.user?.photoURL}
      tags={this.state.user?.professions || []}
      title={this.state.user?.displayName}
      description={"Arch17 Designer"}
     />
    </AntModal>
   </React.Fragment>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 setNav: (info) => dispatch(setUserInfoAction(info)),
});

const mapStateToProps = (state) => {
 return {
  isLoggedIn: state.regularUser.isLoggedIn,
  name: state.regularUser.user?.displayName,
  user: state.regularUser.user,
  info: state.regularUser.info,
  displayName: state.regularUser.displayName,
  photoURL: state.regularUser.photoURL,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
