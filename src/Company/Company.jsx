import React, { Component } from "react";
import {
 Row as AntRow,
 Col as AntCol,
 Modal as AntModal,
 Input,
 Button,
 Spin,
 Select,
} from "antd";
import { Link } from "react-router-dom";

import { Container, Row, Col, Modal } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import { connect } from "react-redux";
import "./company.css";
import { API } from "./../utitlties";
import { regionNames } from "./../redux/constants";
import { AiOutlinePlus } from "react-icons/ai";
import { EnvironmentFilled } from "@ant-design/icons";
import ReactFlagsSelect from "react-flags-select";
import { customLabels } from "./../pages/CreateBrandFinish";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
import Cropper from "react-cropper";
import { IoMdCloudUpload } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import { company_services } from "../pages/addProduct/ProductClassifications";
import { Redirect } from "react-router-dom";

// import CompanySettingTab from "./CompanySettingTab";
import CompanyOverviewTab from "./CompanyOverviewTab";
import { LoadingOutlined } from "@ant-design/icons";
const { Option } = Select;

const { TextArea } = Input;
const src =
 "https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_960_720.png";

class Company extends Component {
 constructor(props) {
  super(props);
  this.state = {
   team_modal: false,
   adding_member: false,
   transfer_modal: false,
   transfered: false,
   transfering: false,
   company_id: this.props.match.params.id,
   company: null,
   users: [],
   userName: "",
   selectedUser: null,
   member_position: "",
   addingMember: false,
   isOwner: false,
   members: [],
   loading: true,
   products: [],
   projects: [],
   saving: false,
   profile_modal: false,
   selectedServices: [],
   website: "",
   email: "",
   name: "",
   country: "",
   city: "",
   phone_code: 86,
   phone: "",
   bio: "",
   about: "",
   profile: null,
  };
 }
 //  }

 _crop() {
  setTimeout(() => {
   const imageElement = this.cropperRef?.current;
   const cropper = imageElement?.cropper;
   let cropped = cropper.getCroppedCanvas().toDataURL();

   this.setState({ cropped_profile: cropped });
  });
 }

 dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
   mime = arr[0].match(/:(.*?);/)[1],
   bstr = atob(arr[1]),
   n = bstr.length,
   u8arr = new Uint8Array(n);
  while (n--) {
   u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
 };
 handleServicesChange = (selectedServices) => {
  this.setState({ selectedServices }, () => {
   console.log(this.state.selectedServices);
  });
 };
 handleSaveSetting = () => {
  this.setState({
   saving: true,
  });
  console.log(this.state);
  const {
   name,
   country,
   city,
   email,
   bio,
   about,
   website,
   selectedServices,
   phone,
   phone_code,
  } = this.state;
  const fd = new FormData();
  fd.append("name", name);
  fd.append("country", country);
  fd.append("city", city);
  fd.append("email", email);
  fd.append("bio", bio);
  fd.append("about", about);
  fd.append("website", website);
  fd.append("phone", phone);
  fd.append("phone_code", phone_code);
  selectedServices?.forEach((s) => {
   fd.append("services[]", s);
  });

  axios
   .post(`${API}company/update/${this.state.company_id}`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     saving: false,
     company: response.data.company,
    });
   })
   .catch((error) => {
    console.log(error);
    this.setState({
     saving: false,
    });
   });
 };

 onChangeProfile = (e) => {
  const file = e.target.files[0];
  const src = URL.createObjectURL(file);
  this.setState({ profile: src });
 };
 handleUpdateLogo = async () => {
  const fd = new FormData();
  fd.append(
   "company_profile",
   this.dataURLtoFile(this.state.cropped_profile, "company_profile")
  );
  axios
   .post(`${API}company/logo/${this.state.company_id}`, fd)
   .then((response) => {
    this.setState({
     logo: response.data.company_profile,
     profile_modal: false,
    });
   });
 };
 componentDidMount() {
  axios
   .get(`${API}comapny/${this.state.company_id}`)
   .then((response) => {
    const { company } = response.data;
    console.log(response);
    this.setState({
     company,
     blogs: company.projects?.filter((p) => {
      return p.article_type === "blog";
     }),
     projects: company.projects?.filter((p) => {
      return p.article_type === "project";
     }),
     loading: false,
     members: company.members,
     products: company?.products,
     isOwner:
      this.props.info?.uid === company?.user_uid &&
      this.props.info?.id === company?.user_id,
     selectedServices:
      company?.services && company?.services !== "null"
       ? company?.services
       : [],
     website:
      company?.website && company?.website !== "null" ? company?.website : "",
     email: company?.email && company?.email !== "null" ? company?.email : "",
     name: company?.name && company?.name !== "null" ? company?.name : "",
     country:
      company?.country && company?.country !== "null" ? company?.country : "",
     city: company?.city && company?.city !== "null" ? company?.city : "",
     phone_code:
      company?.code && company?.code !== "null" ? parseInt(company?.code) : 86,
     phone: company?.phone && company?.phone !== "null" ? company?.phone : "",
     bio: company?.bio && company?.bio !== "null" ? company?.bio : "",
     about: company?.about && company?.about !== "null" ? company?.about : "",
     profile:
      company?.profile && company?.profile !== "null" ? company?.profile : null,
    });
   })
   .catch((error) => {
    console.log(error);
   });
 }

 handleInviteMember = (member) => {
  if (!member) {
   console.log("NOT REGISTERED!");
   const fd = new FormData();
   fd.append("email", this.state.userName);
   fd.append("company_name", this.state.company?.name);
   fd.append("member_position", this.state.member_position);
   axios
    .post(`${API}company/add-unmember/${this.state.company_id}`, fd)
    .then((response) => {
     console.log(response);
     this.setState({
      addingMember: false,
      team_modal: false,
     });
    });
  } else {
   const fd = new FormData();
   this.setState({
    addingMember: true,
   });
   fd.append("user_id", member.id);
   fd.append("email", member.email);
   fd.append("member_position", this.state.member_position);
   axios
    .post(`${API}comapny/add-member/${this.state.company_id}`, fd)
    .then((rsponse) => {
     let members = this.state.members;
     members.push(member);
     console.log(rsponse);
     this.setState({
      addingMember: false,
      team_modal: false,
      members,
     });
    });
  }
 };

 handleSearchUsers = (e) => {
  const keyword = e.target.value;
  this.setState({
   userName: keyword,
   selectedUser: null,
  });
  if (keyword.length < 2) return;
  axios.get(`${API}comapny/search-users/${keyword}`).then((response) => {
   console.log(response);
   this.setState({
    users: response.data.users.data,
   });
  });
 };

 handleReject = (company_id, user_id) => {
  const fd = new FormData();
  fd.append("user_id", user_id);
  fd.append("company_id", company_id);
  axios
   .post(`${API}company/remove-member`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     members: this.state.members?.filter((user) => {
      return user.id !== user_id;
     }),
    });
   })
   .catch((err) => {
    console.log(err);
   });
 };
 handleTransferOwnerShip = (user) => {
  this.setState({
   transfering: true,
  });
  const fd = new FormData();
  fd.append("user_id", user?.id);
  axios
   .post(`${API}transfercompany/${this.state.company_id}`, fd)
   .then((response) => {
    console.log(response);
    this.setState({
     transfering: false,
     transfered: true,
    });
   });
 };
 render() {
  const {
   users,
   team_modal,
   userName,
   member_position,
   addingMember,
   selectedUser,
  } = this.state;

  return (
   <React.Fragment>
    {this.state.transfered && <Redirect to={"/profile"} />}
    {this.state.loading ? (
     <Spin
      size="large"
      indicator={
       <LoadingOutlined style={{ fontSize: "36px", color: "#000" }} spin />
      }
      style={{ position: "absolute", top: "40%", right: "50%" }}
     />
    ) : (
     <div id="user-profile" className="bg-white company-page">
      <Container fluid>
       <Row className="justify-content-md-center">
        <Col md={{ span: 12 }}>
         <div className="profile-section">
          <div
           className="profile-img"
           style={{
            backgroundImage: `url(${this.state.company?.profile})`,
            backgroundColor: "#ddd",
           }}
          >
           <span>
            {(!this.state.company?.profile ||
             this.state.company?.profile?.length <= 4) &&
             `${this.state.company?.name[0]}`}
           </span>
          </div>
          <div className="profile-heading">
           <h2 className="name mb-0">{this.state.company?.name}</h2>
           <p className="ctype mb-2 pt-0">Design Company</p>

           {this.state.company?.country &&
            this.state.company?.country !== "null" && (
             <p className="loc">
              <EnvironmentFilled />
              <span>{regionNames.of(this.state.company?.country)}</span>
              <span className="mx-2">{this.state.company?.city}</span>
             </p>
            )}
           {this.state.company?.bio && this.state.company?.bio !== "null" && (
            <p className="bio">{this.state.company?.bio}</p>
           )}
           <p className="mt-4 mb-1 proff-head">Services</p>
           <div className="professions">
            {this.state.company?.services?.map((p) => {
             return (
              <div>
               <p>{p}</p>
              </div>
             );
            })}
           </div>
          </div>
         </div>
        </Col>
        <Col md={{ span: 12 }}>
         <div className="profile-tabs">
          <Tabs>
           <TabList>
            {(this.state.company?.about?.length > 4 ||
             this.state.company?.categories?.length > 0) && <Tab>Overview</Tab>}
            {this.state.isOwner ? (
             <Tab>Projects</Tab>
            ) : (
             <>{this.state.projects?.length > 0 && <Tab>Projects</Tab>}</>
            )}
            {this.state.isOwner ? (
             <Tab>Blogs</Tab>
            ) : (
             <>{this.state.blogs?.length > 0 && <Tab>Blogs</Tab>}</>
            )}
            <Tab>Team</Tab>
            {this.state.products?.length > 0 && <Tab>Products</Tab>}
            {this.state.isOwner && this.props.isLoggedIn ? (
             <Tab>Settings</Tab>
            ) : (
             <Tab>Contacts</Tab>
            )}
           </TabList>
           {(this.state.company?.about?.length > 4 ||
            this.state.company?.categories?.length > 0) && (
            <TabPanel>
             <CompanyOverviewTab
              categories={this.state.company?.categories}
              about={this.state.company?.about}
             />
            </TabPanel>
           )}
           {this.state.isOwner ? (
            <TabPanel forceRender>
             <AntRow span={24} gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}>
              {this.state.isOwner && this.props.isLoggedIn && (
               <AntCol xs={12} sm={12} md={8} className="my-4 add-col">
                <div className="add-project-icon">
                 <a href={`/addproject/company/${this.state.company?.id}`}>
                  <AiOutlinePlus />
                  Add Project
                 </a>
                </div>
               </AntCol>
              )}
              {this.state?.projects?.map((p, index) => {
               return (
                <AntCol xs={12} sm={12} md={8} className="my-4" key={index}>
                 {this.state.isOwner ? (
                  <>
                   <a href={`/project/${p.id}`} className="box-link">
                    <div className="project-col bg-white">
                     {this.state.isOwner && (
                      <>
                       <a
                        href={`/editproject/${p.id}`}
                        className="box-link project-edit-btn project-btn"
                       >
                        Edit
                       </a>
                      </>
                     )}
                     {this.state.isOwner && (
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
                     {!this.state.isOwner && this.props.isLoggedIn && (
                      <button
                       className="project-btn project-delete-btn"
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
             </AntRow>
            </TabPanel>
           ) : (
            <>
             {this.state.projects?.length > 0 && (
              <TabPanel forceRender>
               <AntRow span={24} gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}>
                {this.state.isOwner && this.props.isLoggedIn && (
                 <AntCol xs={12} sm={12} md={8} className="my-4 add-col">
                  <div className="add-project-icon">
                   <a href={`/addproject/company/${this.state.company?.id}`}>
                    <AiOutlinePlus />
                    Add Project
                   </a>
                  </div>
                 </AntCol>
                )}
                {this.state?.projects?.map((p, index) => {
                 return (
                  <AntCol xs={12} sm={12} md={8} className="my-4" key={index}>
                   {this.state.isOwner ? (
                    <>
                     <a href={`/project/${p.id}`} className="box-link">
                      <div className="project-col bg-white">
                       {this.state.isOwner && (
                        <>
                         <a
                          href={`/editproject/${p.id}`}
                          className="box-link project-edit-btn project-btn"
                         >
                          Edit
                         </a>
                        </>
                       )}
                       {this.state.isOwner && (
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
                       {!this.state.isOwner && this.props.isLoggedIn && (
                        <button
                         className="project-btn project-delete-btn"
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
               </AntRow>
              </TabPanel>
             )}
            </>
           )}
           {this.state.isOwner ? (
            <>
             <TabPanel forceRender>
              <AntRow span={24} gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}>
               {this.state.isOwner && this.props.isLoggedIn && (
                <AntCol xs={12} sm={12} md={8} className="my-4 add-col">
                 <div className="add-project-icon">
                  <a href={`/addproject/company/${this.state.company?.id}`}>
                   <AiOutlinePlus />
                   Add Blog
                  </a>
                 </div>
                </AntCol>
               )}
               {this.state?.blogs?.map((p, index) => {
                return (
                 <AntCol xs={12} sm={12} md={8} className="my-4" key={index}>
                  {this.state.isOwner ? (
                   <>
                    <a href={`/project/${p.id}`} className="box-link">
                     <div className="project-col bg-white">
                      {this.state.isOwner && (
                       <>
                        <a
                         href={`/editproject/${p.id}`}
                         className="box-link project-edit-btn project-btn"
                        >
                         Edit
                        </a>
                       </>
                      )}
                      {this.state.isOwner && (
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
                      {!this.state.isOwner && this.props.isLoggedIn && (
                       <button
                        className="project-btn project-delete-btn"
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
              </AntRow>
             </TabPanel>
            </>
           ) : (
            <>
             {this.state.blogs?.length > 0 && (
              <TabPanel forceRender>
               <AntRow span={24} gutter={{ xs: 12, sm: 12, md: 24, lg: 24 }}>
                {this.state.isOwner && this.props.isLoggedIn && (
                 <AntCol xs={12} sm={12} md={8} className="my-4 add-col">
                  <div className="add-project-icon">
                   <a href={`/addproject/company/${this.state.company?.id}`}>
                    <AiOutlinePlus />
                    Add Blog
                   </a>
                  </div>
                 </AntCol>
                )}
                {this.state?.blogs?.map((p, index) => {
                 return (
                  <AntCol xs={12} sm={12} md={8} className="my-4" key={index}>
                   {this.state.isOwner ? (
                    <>
                     <a href={`/project/${p.id}`} className="box-link">
                      <div className="project-col bg-white">
                       {this.state.isOwner && (
                        <>
                         <a
                          href={`/editproject/${p.id}`}
                          className="box-link project-edit-btn project-btn"
                         >
                          Edit
                         </a>
                        </>
                       )}
                       {this.state.isOwner && (
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
                       {!this.state.isOwner && this.props.isLoggedIn && (
                        <button
                         className="project-btn project-delete-btn"
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
               </AntRow>
              </TabPanel>
             )}
            </>
           )}
           <TabPanel forceRender>
            <div className="teams">
             <AntRow gutter={{ lg: 50, md: 16, sm: 12, xs: 24 }} span={24}>
              {this.state?.members?.map((user) => {
               return (
                <AntCol
                 lg={6}
                 md={6}
                 sm={8}
                 xs={12}
                 key={user.id}
                 className="mb-5 member-col"
                >
                 <div
                  className="member-box pointer"
                  style={{ backgroundImage: `url("${user.photoURL}")` }}
                 >
                  {(!user.photoURL || user.photoURL?.length < 4) &&
                   `${user.displayName[0]}`}
                 </div>
                 <div className="member-name">{user.displayName}</div>
                 <div className="member-title">
                  {user?.professions?.slice(0, 1)}
                 </div>
                 {this.state.isOwner && this.props.isLoggedIn && (
                  <p
                   onClick={() => {
                    this.handleReject(this.state.company_id, user?.id);
                   }}
                   className="deletecompany"
                  >
                   Remove
                  </p>
                 )}
                </AntCol>
               );
              })}
              {this.state.isOwner && (
               <AntCol
                lg={6}
                className="mb-5"
                md={6}
                sm={8}
                xs={12}
                onClick={() => {
                 this.setState(
                  {
                   userName: "",
                   selectedUser: null,
                  },
                  () => {
                   this.setState({
                    team_modal: true,
                   });
                  }
                 );
                }}
               >
                <div className="member-box pointer add">+</div>
                <div className="member-name add">ADD MEMBER</div>
               </AntCol>
              )}
             </AntRow>
            </div>
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
                      <p className="product-name">
                       {product?.identity[0].name}
                      </p>
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
           {this.state.isOwner && this.props.isLoggedIn ? (
            <TabPanel forceRender>
             {/* <CompanySettingTab company={this.state.company} /> */}
             <div
              id="company-setting"
              className="company-setting-tab company-tab py-5"
             >
              <div className="mb-5">
               <p className="bold form-underline">Edit Profile</p>
               <div className="setting-form">
                <AntRow span={24}>
                 <AntCol md={6}>
                  <div className="company-profile">
                   <div
                    className="company-logo"
                    style={{
                     backgroundImage: `url("${this.state.profile || src}")`,
                    }}
                   ></div>
                   <p
                    className="upprof"
                    onClick={() => this.setState({ profile_modal: true })}
                   >
                    Update company profile
                   </p>
                  </div>
                 </AntCol>
                 <AntCol md={18}>
                  <p className="lbl">Company Name</p>
                  <Input
                   size="large"
                   className="mb-3"
                   value={this.state.name}
                   onChange={(e) => {
                    this.setState({
                     name: e.target.value,
                    });
                   }}
                  />
                  <p className="lbl mt-4 mb-3">
                   Bio -{" "}
                   <span>
                    Write short intro about your company in 155 letter
                   </span>
                  </p>
                  <TextArea
                   rows={3}
                   maxLength={155}
                   showCount
                   value={this.state.bio}
                   onChange={(e) =>
                    this.setState({
                     bio: e.target.value,
                    })
                   }
                  />
                  <p className="lbl my-5">About</p>
                  <TextArea
                   rows={15}
                   value={this.state.about}
                   onChange={(e) =>
                    this.setState({
                     about: e.target.value,
                    })
                   }
                  />
                 </AntCol>
                </AntRow>
               </div>
              </div>
              <div className="mb-5">
               <p className="bold form-underline">Edit Company</p>
               <div className="setting-form">
                <p className="lbl">Services</p>
                <AntRow span={24}>
                 <AntCol md={24}>
                  <Select
                   size="large"
                   showSearch
                   mode="tags"
                   onChange={this.handleServicesChange}
                   value={this.state.selectedServices}
                   placeholder="Please select Service"
                   style={{
                    fontSize: "13px",
                    width: "50%",
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
                 </AntCol>
                </AntRow>
                <AntRow span={24} gutter={12} align="middle" className="mt-5">
                 <AntCol md={12}>
                  <p className="lbl">Country</p>
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
                 </AntCol>
                 <AntCol md={12}>
                  <p className="lbl">City</p>
                  <Input
                   size="large"
                   value={this.state.city}
                   onChange={(e) => {
                    this.setState({
                     city: e.target.value,
                    });
                   }}
                  />
                 </AntCol>
                </AntRow>
               </div>
              </div>
              <div className="mb-3">
               <p className="bold form-underline">Contacts</p>
               <div className="setting-form">
                <AntRow gutter={12} span={24}>
                 <AntCol md={12}>
                  <p className="lbl">Website</p>
                  <Input
                   placeholder="https://"
                   size="large"
                   value={this.state.website}
                   onChange={(e) => {
                    this.setState({
                     website: e.target.value,
                    });
                   }}
                  />
                 </AntCol>
                 <AntCol md={12}>
                  <p className="lbl">Phone</p>
                  <ConfigProvider locale={en}>
                   <CountryPhoneInput
                    value={{
                     code: this.state.phone_code,
                     phone: this.state.phone,
                    }}
                    onChange={(e) =>
                     this.setState({ phone: e.phone, phone_code: e.code }, () =>
                      console.log(this.state)
                     )
                    }
                   />
                  </ConfigProvider>
                 </AntCol>
                 <AntCol md={24} className="mt-4">
                  <p className="lbl">Email</p>
                  <Input
                   value={this.state.email}
                   onChange={(e) => {
                    this.setState({ email: e.target.value });
                   }}
                   type="email"
                   size="large"
                   placeholder="Company Email"
                   style={{
                    width: "50%",
                   }}
                  />
                 </AntCol>
                </AntRow>
               </div>
              </div>
              <AntRow justify="end">
               <AntCol md={24}>
                <Button
                 className="invite-btn"
                 onClick={this.handleSaveSetting}
                 loading={this.state.saving}
                >
                 Save
                </Button>
               </AntCol>
              </AntRow>
              <AntRow span={24} className="mt-5">
               <AntCol md={24}>
                <p
                 onClick={() => {
                  this.setState(
                   {
                    userName: "",
                    selectedUser: null,
                   },
                   () => {
                    this.setState({
                     transfer_modal: true,
                    });
                   }
                  );
                 }}
                 className="transfer"
                >
                 Transfer Company Ownership
                </p>
               </AntCol>
              </AntRow>
             </div>

             <Modal
              id="price-request-modal"
              className="arch-wide-modal product-modal material-modal"
              size="lg"
              show={this.state.profile_modal}
              onHide={() => this.setState({ profile_modal: false })}
              aria-labelledby="example-modal-sizes-title-lg"
             >
              <Modal.Header closeButton />
              <Modal.Body>
               <div className="option-add-label">Profile</div>
               <div className="cropper-box">
                <Cropper
                 src={this.state.profile}
                 style={{ height: "100%", width: "100%" }}
                 ref={this.cropperRef}
                 initialAspectRatio="free"
                 guides={true}
                 cropend={this._crop.bind(this)}
                 ready={this._crop.bind(this)}
                 crossOrigin="anonymous"
                 preview=".image-preview"
                 scalable={false}
                 aspectRatio={1}
                 autoCropArea={1}
                 viewMode={1}
                 dragMode="move"
                 rotatable={false}
                 zoomOnWheel={true}
                 cropBoxMovable={true}
                 cropBoxResizable={true}
                 center={false}
                />
               </div>
               <div
                style={{
                 position: "relative",
                 width: "80px",
                 height: "80px",
                }}
               >
                <IoMdCloudUpload
                 style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  fontSize: "5rem",
                  zIndex: 1,
                  background: "#e8e8e84a",
                  textAlign: "left",
                 }}
                />
                <input
                 type="file"
                 onChange={this.onChangeProfile}
                 style={{
                  position: "absolute",
                  background: "red",
                  opacity: 0,
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  width: "100%",
                  fontSize: "5rem",
                  zIndex: "2",
                 }}
                />
               </div>

               <div as={Row} className="add-btn">
                <div column md={12}>
                 <Button variant="danger" onClick={this.handleUpdateLogo}>
                  {this.state.addProfileLoad ? (
                   <ClipLoader
                    style={{ height: "20px" }}
                    color="#ffffff"
                    size={20}
                   />
                  ) : (
                   <>Change</>
                  )}
                 </Button>
                </div>
               </div>
              </Modal.Body>
             </Modal>
            </TabPanel>
           ) : (
            <TabPanel forceRender>
             <div className="contacts">
              {this.state.company?.website &&
               this.state.company?.website?.length > 4 && (
                <p>
                 website: <span>{this.state.company?.website}</span>
                </p>
               )}
              <p>
               Email: <span>{this.state.company?.email ?? "-"}</span>
              </p>

              <p>
               phone:{" "}
               <span>{`${this.state.company?.code} ${this.state.company?.phone}`}</span>
              </p>
             </div>
            </TabPanel>
           )}
          </Tabs>
         </div>
        </Col>
       </Row>
      </Container>
     </div>
    )}

    {/* add member to company team modal */}
    <AntModal
     onCancel={() => {
      this.setState({ team_modal: false });
     }}
     visible={team_modal}
     footer={null}
     width={400}
     closable
    >
     <div className="form-member-wrapper my-4">
      <AntRow span={24} justify="space-between">
       <AntCol md={24}>
        <Input
         type="email"
         value={userName}
         placeholder="Search Users"
         onChange={this.handleSearchUsers}
         size="large"
        />
       </AntCol>
      </AntRow>
      {!this.state.selectedUser && (
       <div className="users mt-5">
        {users.map((user) => {
         return (
          <div
           className="user-row"
           onClick={() => {
            console.log(user);
            this.setState({
             userName: user.email,
             selectedUser: user,
            });
           }}
          >
           <div
            className="user-img"
            style={{
             backgroundImage: `url("${user.photoURL}")`,
            }}
           >
            {(!user.photoURL || user.photoURL?.length < 4) && (
             <p>{user.displayName[0]}</p>
            )}
           </div>
           <div className="user-name">
            <p>{user.displayName}</p>
           </div>
          </div>
         );
        })}
       </div>
      )}
      {(this.state.selectedUser || this.state.userName.endsWith(".com")) && (
       <>
        <AntRow>
         <AntCol md={24} className="my-4">
          <Input
           placeholder="Position"
           value={member_position}
           onChange={(e) =>
            this.setState({
             member_position: e.target.value,
            })
           }
           size="large"
          />
         </AntCol>
        </AntRow>
        <AntRow justify="end">
         <AntCol md={6} className="my-2">
          <Button
           className="invite-btn"
           loading={addingMember}
           onClick={() => this.handleInviteMember(selectedUser)}
          >
           Invite
          </Button>
         </AntCol>
        </AntRow>
       </>
      )}
     </div>
    </AntModal>

    {/* transfer ownership of company modal */}
    <AntModal
     onCancel={() => {
      this.setState({ transfer_modal: false });
     }}
     visible={this.state.transfer_modal}
     footer={null}
     width={400}
     closable
    >
     <div className="form-member-wrapper my-4">
      <AntRow span={24} justify="space-between">
       <AntCol md={24}>
        <Input
         value={userName}
         placeholder="Search Users"
         onChange={this.handleSearchUsers}
         size="large"
        />
       </AntCol>
      </AntRow>
      {!this.state.selectedUser && (
       <div className="users mt-5">
        {users.map((user) => {
         return (
          <div
           className="user-row"
           onClick={() => {
            console.log(user);
            this.setState({
             userName: user.displayName,
             selectedUser: user,
            });
           }}
          >
           <div
            className="user-img"
            style={{
             backgroundImage: `url("${user.photoURL}")`,
            }}
           >
            {(!user.photoURL || user.photoURL?.length < 4) && (
             <p>{user.displayName[0]}</p>
            )}
           </div>
           <div className="user-name">
            <p>{user.displayName}</p>
           </div>
          </div>
         );
        })}
       </div>
      )}
      {this.state.selectedUser && (
       <>
        <AntRow justify="end">
         <AntCol md={6} className="my-2">
          <Button
           className="invite-btn"
           loading={this.state.transfering}
           //  onClick={() => this.handleInviteMember(selectedUser)}
           onClick={() => {
            this.handleTransferOwnerShip(selectedUser);
           }}
          >
           Transfer
          </Button>
         </AntCol>
        </AntRow>
       </>
      )}
     </div>
    </AntModal>
   </React.Fragment>
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

export default connect(mapStateToProps, null)(Company);
