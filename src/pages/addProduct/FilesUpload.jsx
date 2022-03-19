import React, { Component } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { RiFilePdfFill } from "react-icons/ri";
import { IoIosCube } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import {
 nextTab,
 productDescription,
} from "../../redux/actions/addProductActions";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Row, Col, Form, Input, Button as AntButton } from "antd";
import { API } from "./../../utitlties";
import { SiGoogledrive, SiBaidu } from "react-icons/si";
import { GrOnedrive } from "react-icons/gr";
import { AiOutlineDropbox } from "react-icons/ai";
import { Select, Space, Typography, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
let index = 0;

class FilesUpload extends Component {
 _pdfFiles = [];

 constructor(props) {
  super(props);
  this.state = {
   loaded: 0,
   _pdfFiles: [],
   published: false,
   loading: false,
   skip_modal: false,
   files_modal: false,
   edit_file_modal: false,
   pdfModal: false,
   file_name: null,
   file_type: null,
   file_software: null,
   ggldrive: "",
   onedrive: "",
   drpbox: "",
   baidu: "",
   file_links: [],
   file_adding: false,
   pdf_files:
    this.props?.files?.filter((file) => {
     return file.file_type === "PDF";
    }) ?? [],
   files:
    this.props?.files?.filter((file) => {
     return file.file_type !== "PDF";
    }) ?? [],
   file: {},
   file_id: null,
   name: "",
   //  items: ["Item 1", "Item 2"],
   modal_codes: this.props.modal_codes,
  };
 }
 onNameChange = (e) => {
  this.setState({
   name: e.target.value,
  });
 };
 addItem = (e) => {
  e.preventDefault();
  this.setState({
   modal_codes: [
    ...this.state.modal_codes,
    this.state.name || `New item ${index++}`,
   ],
   name: "",
  });
 };
 handleEditFile = () => {
  this.setState({
   edit_file_modal: false,
  });
 };
 openPdfModal = () => {
  this.setState(
   {
    ggldrive: "",
    onedrive: "",
    baidu: "",
    drpbox: "",
   },
   () => {
    this.setState({
     pdfModal: true,
    });
   }
  );
 };
 //  dataSource: dataSource.filter((item) => item.key !== key),

 handleAddFile = (kind) => {
  if (kind === "PDF") {
   console.log(this.state);
   const fd = new FormData();
   fd.append("file_name", this.state.file_name);
   fd.append("file_type", "PDF");
   fd.append("software", "PDF VIEWR");
   fd.append("ggldrive", this.state.ggldrive);
   fd.append("dropbox", this.state.drpbox);
   fd.append("onedrive", this.state.onedrive);
   fd.append("baidu", this.state.baidu);
   axios
    .post(`${API}addfile/${this.props.id}`, fd)
    .then((response) => {
     this.setState(
      {
       pdf_files: [...this.state.pdf_files, response.data.file],
       ggldrive: "",
       drpbox: "",
       baidu: "",
       onedrive: "",
      },
      () => {
       this.setState({ file_adding: false, pdfModal: false });
      }
     );
    })
    .catch((err) => {
     console.log(err);
     this.setState({ file_adding: false });
    });
  } else {
   this.setState({ file_adding: true });
   console.log(this.state);
   const fd = new FormData();
   fd.append("file_name", this.state.file_name);
   fd.append("file_type", this.state.file_type);
   fd.append("software", this.state.file_software);
   fd.append("ggldrive", this.state.ggldrive);
   fd.append("dropbox", this.state.drpbox);
   fd.append("onedrive", this.state.onedrive);
   fd.append("baidu", this.state.baidu);
   axios
    .post(`${API}addfile/${this.props.id}`, fd)
    .then((response) => {
     console.log(response);

     this.setState(
      {
       files: [...this.state.files, response.data.file],
       ggldrive: "",
       drpbox: "",
       baidu: "",
       onedrive: "",
      },
      () => {
       console.log(this.state.files);
       this.setState({ file_adding: false, files_modal: false });
      }
     );
    })
    .catch((err) => {
     console.log(err);
     this.setState({ file_adding: false });
    });
   //  });
  }

  console.log(this.state);
 };
 deleteFile = (id, type) => {
  const { files, pdf_files } = this.state;
  axios
   .post(`${API}product/delete/file/${id}`)
   .then((response) => {
    console.log(response);
    if (type === "PDF") {
     this.setState({
      pdf_files: pdf_files.filter((file) => {
       return file.id !== id;
      }),
     });
    } else {
     this.setState({
      files: files.filter((file) => {
       return file.id !== id;
      }),
     });
    }
   })
   .catch((error) => {
    console.log(error);
   });
 };
 handleChange = (value) => {
  console.log(`selected ${value}`);
 };
 skip = () => {
  this.props.dispatchNextStep();
 };

 fd = new FormData();

 skip_modal_close = () => {
  this.setState({ skip_modal: false });
 };
 handleNextStep = (e) => {
  if (
   this.state.files.length + this.state.pdf_files?.length < 1 &&
   !this.props.edit
  ) {
   this.setState({ skip_modal: true });
   return;
  } else {
   this.setState({ loading: true });
   setTimeout(() => {
    this.props.dispatchNextStep();
   }, 2000);
  }
 };
 render() {
  return (
   <>
    <div className="step-form">
     <button className="product-skip-btn" onClick={this.skip}>
      Skip
     </button>
     <button
      className="save-product-step-btn"
      style={{
       top: "-110px",
       height: "20px",
       background: this.state.loading ? "#898989" : "",
      }}
      onClick={this.handleNextStep}
     >
      {this.state.loading ? (
       <ClipLoader
        style={{ height: "20px" }}
        color="#ffffff"
        loading={this.state.loading}
        size={20}
       />
      ) : (
       "Save & Continue"
      )}
     </button>
     <div className="step-head">
      <h2>Upload Product Files</h2>
      <p>CAD / 3D, and PDF files</p>
     </div>
     <div className="upload-container">
      <div className="upload-block">
       <div className="upload-head">
        <h6>Add Product Files 2D, 3D and Catalogues</h6>
       </div>
       <div id="" className="upload-btns">
        {this.state.files.map((file, indx) => {
         return (
          <>
           <div className="upload-action">
            <div
             className="upload-icon"
             style={{
              borderRadius: "0",
              border: "1px dashed #b7b7b7",
              fontWeight: "900",
              color: "#000",
             }}
             onClick={() =>
              this.setState(
               {
                file_name: file?.file_name,
                file_type: file?.file_type,
                file_software: file?.software,
                onedrive: file?.onedrive,
                ggldrive: file?.ggldrive,
                drpbox: file?.dropbox,
                baidu: file?.baidu,
               },
               () => {
                this.setState({ edit_file_modal: true });
                console.log(this.state);
               }
              )
             }
            >
             {file?.file_type}
            </div>
            <p>{file?.file_name}</p>
            <button onClick={() => this.deleteFile(file.id, "CAD|3D")}>
             Delete
            </button>
           </div>
          </>
         );
        })}
        <div className="upload-action">
         <div
          className="upload-icon"
          onClick={() =>
           this.setState(
            {
             ggldrive: "",
             onedrive: "",
             baidu: "",
             drpbox: "",
            },
            () => {
             this.setState({ files_modal: true });
            }
           )
          }
         >
          <FaCloudUploadAlt />
         </div>
         <p>Upload Files</p>
        </div>
       </div>
      </div>
      <div className="upload-block">
       <div className="upload-head">
        <h6>Upload PDF and Catalogue files</h6>
       </div>
       <div id="" className="upload-btns">
        {this.state.pdf_files.map((file, indx) => {
         return (
          <>
           <div className="upload-action">
            <div
             className="upload-icon"
             style={{
              borderRadius: "0",
              border: "1px dashed #b7b7b7",
              fontWeight: "900",
              color: "#000",
             }}
             onClick={() =>
              this.setState(
               {
                file_name: file?.file_name,
                file_type: file?.file_type,
                file_software: file?.software,
                onedrive: file?.onedrive,
                ggldrive: file?.ggldrive,
                drpbox: file?.dropbox,
                baidu: file?.baidu,
               },
               () => {
                this.setState({ edit_file_modal: true });
                console.log(this.state);
               }
              )
             }
            >
             {file?.file_type}
            </div>
            <p>{file?.file_name}</p>
            <button onClick={() => this.deleteFile(file?.id, "PDF")}>
             Delete
            </button>
           </div>
          </>
         );
        })}

        <div className="upload-action">
         <div className="upload-icon" onClick={this.openPdfModal}>
          <FaCloudUploadAlt />
         </div>
         <p>Upload Files</p>
        </div>
       </div>
      </div>
     </div>
     {/* add 3d | cad file modal */}
     <Modal
      id="price-request-modal"
      className="upload-file-modal"
      size="lg"
      centered
      show={this.state.files_modal}
      onHide={() => {
       this.setState({ files_modal: false });
      }}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Body>
       <div className="modal-wrapper" style={{ padding: "10px", margin: "" }}>
        <p style={{ width: "100%", fontWeight: "600", fontFamily: "Roboto" }}>
         Add Product Files
        </p>

        <Row gutter={16} className="my-4">
         <Col className="gutter-row" span={12}>
          <Select
           style={{ width: 300 }}
           size="large"
           onSelect={(e) => this.setState({ file_name: e })}
           placeholder="Select or Add Modal Code"
           getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
           }}
           dropdownRender={(menu) => (
            <>
             {menu}
             <Divider style={{ margin: "8px 0" }} />
             <Space align="center" style={{ padding: "0 8px 4px" }}>
              <Input
               placeholder="Please enter item"
               value={this.state.name}
               size="large"
               onChange={this.onNameChange}
              />
              <Typography.Link
               onClick={this.addItem}
               style={{ whiteSpace: "nowrap" }}
              >
               <PlusOutlined /> Add New
              </Typography.Link>
             </Space>
            </>
           )}
          >
           {this.state.modal_codes?.map((item) => (
            <Option key={item}>{item}</Option>
           ))}
          </Select>
         </Col>
         <Col className="gutter-row" span={6}>
          <Select
           getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
           }}
           dropdownClassName="antd-select-dropdown"
           size="large"
           placeholder="File Type"
           style={{ width: "100%" }}
           onSelect={(e) => this.setState({ file_type: e })}
           defaultOpen={true}
          >
           <Option value="2D">2D</Option>
           <Option value="3D">3D</Option>
          </Select>
         </Col>
         <Col className="gutter-row" span={6}>
          <Select
           getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
           }}
           size="large"
           placeholder="Software"
           style={{ width: "100%" }}
           onSelect={(e) => this.setState({ file_software: e })}
          >
           <Option value="AutoCad">AutoCad</Option>
           <Option value="Rivet">Rivet</Option>
           <Option value="Sketch Up">Sketch Up</Option>
           <Option value="3D Max">3D Max</Option>
           <Option value="OBJ">OBJ</Option>
           <Option value="3DS">3DS</Option>
          </Select>
         </Col>
        </Row>
        <p style={{ width: "100%", fontWeight: "500", fontFamily: "Roboto" }}>
         Add File Download Link
        </p>

        <Row gutter={16} className="mb-3 mt-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           className="drivebtn"
           icon={<SiGoogledrive />}
           style={{ width: "100%" }}
           size="large"
          >
           OneDrive
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           placeholder=""
           size="large"
           value={this.state.onedrive}
           onChange={(e) => {
            this.setState({ onedrive: e.target.value });
            console.log(e.target.value);
           }}
          />
         </Col>
        </Row>

        <Row gutter={16} className="mb-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           style={{ width: "100%" }}
           size="large"
           className="drivebtn"
           icon={<SiGoogledrive />}
          >
           Google Drive
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           placeholder=""
           size="large"
           value={this.state.ggldrive}
           onChange={(e) => {
            this.setState({ ggldrive: e.target.value });
            console.log(e.target.value);
           }}
          />
         </Col>
        </Row>
        <Row gutter={16} className="mb-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           style={{ width: "100%" }}
           icon={<AiOutlineDropbox />}
           size="large"
           className="drivebtn"
          >
           Dropbox
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           placeholder=""
           size="large"
           value={this.state.drpbox}
           onChange={(e) => this.setState({ drpbox: e.target.value })}
          />
         </Col>
        </Row>
        <Row gutter={16} className="mb-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           style={{ width: "100%" }}
           icon={<SiBaidu />}
           size="large"
           className="drivebtn"
          >
           Baidu Drive
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           placeholder=""
           size="large"
           value={this.state.baidu}
           onChange={(e) => this.setState({ baidu: e.target.value })}
          />
         </Col>
        </Row>
        <div
         className="add-file-btn"
         style={{ width: "100%", textAlign: "right" }}
        >
         <Button
          onClick={() => this.handleAddFile("CAD|3D")}
          // onClick={() =>
          //  this.setState(
          //   {
          //    file_adding: true,
          //    ggldrive: "",
          //    drpbox: "",
          //    baidu: "",
          //    onedrive: "",
          //   },
          //   () => {
          //    this.handleAddFile("CAD|3D");
          //   }
          //  )
          // }
          style={{ width: "60px", padding: "8px 5px", textAlign: "center" }}
         >
          Add
          {this.state.file_adding && (
           <>
            <ClipLoader
             style={{ height: "20px", padding: "2px 5px" }}
             color="#ffffff"
             loading={this.state.file_adding}
             size={18}
            />
           </>
          )}
         </Button>
        </div>
       </div>
      </Modal.Body>
     </Modal>
     <Modal
      id="price-request-modal"
      className="arch-wide-modal product-modal pics-modal"
      size="md"
      show={this.state.skip_modal}
      onHide={this.skip_modal_close}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      {/* <Modal.Header closeButton></Modal.Header> */}
      <Modal.Body>
       <div className="modal-wrapper" style={{ padding: "30px", margin: "" }}>
        <h6
         style={{
          padding: "15px 5px 35px",
          fontSize: "1.2rem",
         }}
        >
         Skip without adding product description?
        </h6>
        <Button
         variant="danger"
         type="submit"
         onClick={() => {
          this.setState({ skip_modal: false });
          // this.setState({ published: true });
          this.props.dispatchNextStep();
         }}
         style={{
          textAlign: "right",
          background: "#E41E15",
          display: "block",
          float: "right",
          marginRight: "12px",
         }}
        >
         Skip
        </Button>
       </div>
      </Modal.Body>
     </Modal>
     {/* edit 3d or cad file modal  */}
     <Modal
      id="price-request-modal"
      className="upload-file-modal"
      size="lg"
      centered
      show={this.state.edit_file_modal}
      onHide={() => {
       this.setState({ edit_file_modal: false });
      }}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Body>
       <div className="modal-wrapper" style={{ padding: "10px", margin: "" }}>
        <p style={{ width: "100%", fontWeight: "600", fontFamily: "Roboto" }}>
         Add Product Files
        </p>

        <Row gutter={16} className="my-4">
         <Col className="gutter-row" span={12}>
          {/* <Input
           placeholder="Input Modal Code"
           onChange={(e) => this.setState({ file_name: e.target.value })}
           size="large"
           value={this.state.file_name}
          /> */}
          <Select
           style={{ width: 300 }}
           size="large"
           onSelect={(e) => this.setState({ file_name: e })}
           placeholder="Select or Add Modal Code"
           value={this.state.file_type}
           getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
           }}
           dropdownRender={(menu) => (
            <>
             {menu}
             <Divider style={{ margin: "8px 0" }} />
             <Space align="center" style={{ padding: "0 8px 4px" }}>
              <Input
               placeholder="Please enter item"
               value={this.state.name}
               size="large"
               onChange={this.onNameChange}
              />
              <Typography.Link
               onClick={this.addItem}
               style={{ whiteSpace: "nowrap" }}
              >
               <PlusOutlined /> Add New
              </Typography.Link>
             </Space>
            </>
           )}
          >
           {this.state.modal_codes?.map((item) => (
            <Option key={item}>{item}</Option>
           ))}
          </Select>
         </Col>
         <Col className="gutter-row" span={6}>
          <Select
           getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
           }}
           dropdownClassName="antd-select-dropdown"
           size="large"
           placeholder="File Type"
           style={{ width: "100%" }}
           onSelect={(e) => this.setState({ file_type: e })}
           defaultValue={this.state.file_type}
          >
           <Option value="2D">2D</Option>
           <Option value="3D">3D</Option>
          </Select>
         </Col>
         <Col className="gutter-row" span={6}>
          <Select
           defaultValue={this.state.file_software}
           getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
           }}
           size="large"
           placeholder="Software"
           style={{ width: "100%" }}
           onSelect={(e) => this.setState({ file_software: e })}
          >
           <Option value="AutoCad">AutoCad</Option>
           <Option value="Rivet">Rivet</Option>
           <Option value="Sketch Up">Sketch Up</Option>
           <Option value="3D Max">3D Max</Option>
           <Option value="OBJ">OBJ</Option>
           <Option value="3DS">3DS</Option>
          </Select>
         </Col>
        </Row>
        <p style={{ width: "100%", fontWeight: "500", fontFamily: "Roboto" }}>
         Add File Download Link
        </p>

        <Row gutter={16} className="mb-3 mt-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           className="drivebtn"
           icon={<SiGoogledrive />}
           style={{ width: "100%" }}
           size="large"
          >
           OneDrive
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           value={this.state.onedrive}
           placeholder=""
           size="large"
           onChange={(e) => this.setState({ onedrive: e.target.value })}
          />
         </Col>
        </Row>

        <Row gutter={16} className="mb-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           style={{ width: "100%" }}
           size="large"
           className="drivebtn"
           icon={<SiGoogledrive />}
          >
           Google Drive
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           value={this.state.ggldrive}
           size="large"
           onChange={(e) => this.setState({ ggldrive: e.target.value })}
          />
         </Col>
        </Row>
        <Row gutter={16} className="mb-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           style={{ width: "100%" }}
           icon={<AiOutlineDropbox />}
           size="large"
           className="drivebtn"
          >
           Dropbox
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17}>
          <Input
           placeholder=""
           value={this.state.drpbox}
           size="large"
           onChange={(e) => this.setState({ drpbox: e.target.value })}
          />
         </Col>
        </Row>
        <Row gutter={16} className="mb-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           style={{ width: "100%" }}
           icon={<SiBaidu />}
           size="large"
           className="drivebtn"
          >
           Baidu Drive
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           placeholder=""
           value={this.state.baidu}
           size="large"
           onChange={(e) => this.setState({ baidu: e.target.value })}
          />
         </Col>
        </Row>
        <div
         className="add-file-btn"
         style={{ width: "100%", textAlign: "right" }}
        >
         <Button
          onClick={this.handleEditFile}
          style={{ width: "60px", padding: "8px 5px", textAlign: "center" }}
         >
          Edit
         </Button>
        </div>
       </div>
      </Modal.Body>
     </Modal>

     {/* add pdf file modal */}
     <Modal
      id="price-request-modal"
      className="upload-file-modal"
      size="lg"
      centered
      show={this.state.pdfModal}
      onHide={() => {
       this.setState({ pdfModal: false });
      }}
      aria-labelledby="example-modal-sizes-title-lg"
     >
      {/* <Modal.Header closeButton></Modal.Header> */}
      <Modal.Body>
       <div className="modal-wrapper" style={{ padding: "10px", margin: "" }}>
        <p style={{ width: "100%", fontWeight: "600", fontFamily: "Roboto" }}>
         Add Product Files
        </p>

        <Row gutter={16} className="my-4">
         <Col className="gutter-row" span={12}>
          <Select
           style={{ width: 300 }}
           size="large"
           onSelect={(e) => this.setState({ file_name: e })}
           placeholder="Select or Add Modal Code"
           getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
           }}
           dropdownRender={(menu) => (
            <>
             {menu}
             <Divider style={{ margin: "8px 0" }} />
             <Space align="center" style={{ padding: "0 8px 4px" }}>
              <Input
               placeholder="Please enter item"
               value={this.state.name}
               size="large"
               onChange={this.onNameChange}
              />
              <Typography.Link
               onClick={this.addItem}
               style={{ whiteSpace: "nowrap" }}
              >
               <PlusOutlined /> Add New
              </Typography.Link>
             </Space>
            </>
           )}
          >
           {this.state.modal_codes?.map((item) => (
            <Option key={item}>{item}</Option>
           ))}
          </Select>
         </Col>
         <Col className="gutter-row" span={12}>
          <Select
           getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
           }}
           dropdownClassName="antd-select-dropdown"
           size="large"
           placeholder="File Type"
           style={{ width: "100%" }}
           onSelect={(e) => this.setState({ file_type: e })}
           value="PDF"
           disabled
          >
           <Option value="PDF">PDF</Option>
          </Select>
         </Col>
         {/* <Col className="gutter-row" span={6}></Col> */}
        </Row>
        <p style={{ width: "100%", fontWeight: "500", fontFamily: "Roboto" }}>
         Add File Download Link
        </p>

        <Row gutter={16} className="mb-3 mt-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           className="drivebtn"
           icon={<SiGoogledrive />}
           style={{ width: "100%" }}
           size="large"
          >
           OneDrive
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           value={this.state.onedrive}
           placeholder=""
           size="large"
           onChange={(e) => this.setState({ onedrive: e.target.value })}
          />
         </Col>
        </Row>

        <Row gutter={16} className="mb-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           style={{ width: "100%" }}
           size="large"
           className="drivebtn"
           icon={<SiGoogledrive />}
          >
           Google Drive
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           placeholder=""
           value={this.state.ggldrive}
           size="large"
           onChange={(e) => this.setState({ ggldrive: e.target.value })}
          />
         </Col>
        </Row>
        <Row gutter={16} className="mb-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           style={{ width: "100%" }}
           icon={<AiOutlineDropbox />}
           size="large"
           className="drivebtn"
          >
           Dropbox
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           placeholder=""
           value={this.state.drpbox}
           size="large"
           onChange={(e) => this.setState({ drpbox: e.target.value })}
          />
         </Col>
        </Row>
        <Row gutter={16} className="mb-3">
         <Col className="gutter-row" span={7}>
          <AntButton
           type="primary"
           style={{ width: "100%" }}
           icon={<SiBaidu />}
           size="large"
           className="drivebtn"
          >
           Baidu Drive
          </AntButton>
         </Col>
         <Col className="gutter-row" span={17} style={{ background: "" }}>
          <Input
           placeholder=""
           value={this.state.baidu}
           size="large"
           onChange={(e) => this.setState({ baidu: e.target.value })}
          />
         </Col>
        </Row>
        <div
         className="add-file-btn"
         style={{ width: "100%", textAlign: "right" }}
        >
         <Button
          // onClick={this.handleEditFile}
          onClick={() => this.handleAddFile("PDF")}
          style={{ width: "60px", padding: "8px 5px", textAlign: "center" }}
         >
          Add
          {this.state.file_adding && (
           <>
            <ClipLoader
             style={{ height: "20px", padding: "2px 5px" }}
             color="#ffffff"
             loading={this.state.file_adding}
             size={18}
            />
           </>
          )}
         </Button>
        </div>
       </div>
      </Modal.Body>
     </Modal>
    </div>
   </>
  );
 }
}
const mapDispatchToProps = (dispatch) => ({
 dispatchDescriptionStep: (data, id) => dispatch(productDescription(data, id)),
 dispatchNextStep: () => dispatch(nextTab()),
});
const mapStateToProps = (state) => ({
 OptionsPrice: state.optionsPrice,
 modal_codes: state.addProduct.modal_codes,
});
export default connect(mapStateToProps, mapDispatchToProps)(FilesUpload);
