// import React, { useContext, useState, useEffect, useRef } from "react";
// import { Table, Input, Popconfirm, Form, Tabs, Progress } from "antd";

// import {
//  Button as BButton,
//  Form as FormB,
//  Col,
//  Row,
//  Modal,
// } from "react-bootstrap";
// import { toast, Flip } from "react-toastify";
// import { CloseCircleFilled } from "@ant-design/icons";
// import {
//  FaCloudUploadAlt,
//  FaPlus,
//  FaTrashAlt,
//  FaCube,
//  FaArrowRight,
//  FaArrowLeft,
//  FaArrowDown,
//  FaArrowUp,
//  FaPencilAlt,
// } from "react-icons/fa";
// import ClipLoader from "react-spinners/ClipLoader";
// import { API } from "./../utitlties";
// import axios from "axios";
// import { connect } from "react-redux";
// import {
//  addProductPrices,
//  nextTab,
//  saveOptions,
//  addProductModalCodes,
//  resetProductPrices,
//  resetProductModalCodes,
// } from "../redux/actions/addProductActions";
// import { addOptionAction } from "./../redux/actions/addProductActions";
// const { TabPane } = Tabs;
// const EditableContext = React.createContext(null);

// const EditableRow = ({ index, ...props }) => {
//  const [form] = Form.useForm();
//  return (
//   <Form form={form} component={false}>
//    <EditableContext.Provider value={form}>
//     <tr {...props} />
//    </EditableContext.Provider>
//   </Form>
//  );
// };

// const UplpadIcon = (props) => {
//  return (
//   <>
//    {props.index === 0 && <FaCloudUploadAlt />}
//    {props.index === 1 && <FaCube />}
//    {props.index === 2 && <FaArrowUp />}
//    {props.index === 3 && <FaArrowDown />}
//    {props.index === 4 && <FaArrowRight />}
//    {props.index === 5 && <FaArrowLeft />}
//   </>
//  );
// };
// const EditableCell = ({
//  title,
//  editable,
//  children,
//  dataIndex,
//  record,
//  handleSave,
//  ...restProps
// }) => {
//  const [editing, setEditing] = useState(false);
//  const inputRef = useRef(null);
//  const form = useContext(EditableContext);
//  useEffect(() => {
//   if (editing) {
//    inputRef.current.focus();
//   }
//  }, [editing]);

//  const toggleEdit = () => {
//   setEditing(!editing);
//   form.setFieldsValue({
//    [dataIndex]: record[dataIndex],
//   });
//  };

//  const save = async () => {
//   try {
//    const values = await form.validateFields();
//    toggleEdit();
//    handleSave({ ...record, ...values });
//   } catch (errInfo) {
//    console.log("Save failed:", errInfo);
//   }
//  };

//  let childNode = children;

//  if (editable) {
//   childNode = editing ? (
//    <Form.Item
//     focused={true}
//     style={{
//      width: "100px",
//      margin: "auto",
//     }}
//     name={dataIndex}
//    >
//     <Input
//      ref={inputRef}
//      onPressEnter={save}
//      onBlur={save}
//      className="table-editing-input"
//      style={{ maxWidth: "100px", margin: "auto" }}
//     />
//    </Form.Item>
//   ) : (
//    <div
//     style={{
//      width: "100px",
//      margin: "auto",
//      height: "32px",
//      border: "1px solid #ced4da",
//      borderRadius: "10px",
//      fontSize: ".8rem",
//      fontWeight: "600",
//      padding: "5px 0 0 10px",
//      textAlign: "left",
//     }}
//     onClick={toggleEdit}
//    >
//     {children}
//    </div>
//   );
//  }

//  return (
//   <td
//    //  onClick={() => {
//    // console.log("SSSS");
//    // save();
//    //  }}
//    //  onClick={save}
//    {...restProps}
//   >
//    {childNode}
//   </td>
//  );
// };

// class TableStep extends React.Component {
//  constructor(props) {
//   super(props);
//   this.cropperRef = React.createRef();
//   this.columns = [
//    {
//     title: "Code",
//     dataIndex: "code",
//     editable: true,
//    },
//    {
//     title: "Pictures",
//     dataIndex: "covers",
//     render: (_, record) => {
//      return (
//       <>
//        <div className="row-img-grid">
//         {record?.covers?.map((cover, index) => {
//          if (cover?._src != "" && cover?._src != null) {
//           cover.src = cover._src;
//          }
//          return (
//           <div
//            style={{
//             width: "28px",
//             height: "28px",
//             display: "inline-block",
//             margin: "0 1px",
//            }}
//           >
//            {cover?.src !== "" && cover?._src !== "" && (
//             <>
//              {record.option_id ? (
//               <>
//                <img
//                 style={{ display: "block", width: "100%", height: "100%" }}
//                 alt=""
//                 src={cover._src}
//                 // src={cover._src}
//                />
//               </>
//              ) : (
//               <>
//                <img
//                 style={{ display: "block", width: "100%", height: "100%" }}
//                 alt=""
//                 src={cover.src}
//                />
//               </>
//              )}
//             </>
//            )}
//           </div>
//          );
//         })}
//        </div>
//        <div className="edit-add-row-btn">
//         {record.covers?.length < 1 ? (
//          <>
//           <button
//            onClick={() => {
//             this.setState(
//              {
//               editing_row: record.key,
//              },
//              () => this.handleAddCover(record.key, record?.covers)
//             );
//            }}
//            className="upload-pic-row-btn"
//           >
//            <FaCloudUploadAlt />
//            <span>Upload Pictures</span>
//           </button>
//          </>
//         ) : (
//          <>
//           <button
//            style={{ padding: "5px 0" }}
//            onClick={() => {
//             this.setState(
//              {
//               editing_row: record.key,
//              },
//              () => {
//               this.handleEditCover(record.key, record.covers);
//              }
//             );
//            }}
//           >
//            <FaPencilAlt />
//           </button>
//          </>
//         )}
//        </div>
//       </>
//      );
//     },
//    },
//    {
//     title: "Material",
//     dataIndex: "material",
//     render: (_, record) => {
//      return (
//       <>
//        {!record.material?.name && (
//         <FaPlus
//          onClick={() => {
//           this.setState(
//            {
//             editing_row: record.key,
//            },
//            () => {
//             this.material_modal_open(record.key, record.material);
//            }
//           );
//          }}
//         />
//        )}
//        {record.material?.image && record?.material_name != "null" && (
//         <>
//          <div className="material-cell option-cell">
//           <img src={record.material?.image} alt="" />
//           {record.material?.name}

//           <FaPencilAlt
//            className="edit-pencil"
//            onClick={() => {
//             console.log([this.state.material_name, this.state.material_image]);
//             this.material_modal_open(record.key, record?.material);
//            }}
//           />
//          </div>
//         </>
//        )}
//       </>
//      );
//     },
//    },
//    {
//     title: "Size",
//     dataIndex: "size",

//     render: (_, record) => {
//      return (
//       <>
//        {record?.size?.l === null &&
//         record?.size?.w === null &&
//         record?.size?.h === null && (
//          <FaPlus
//           onClick={() => {
//            this.setState({ editing_row: record.key }, () => {
//             this.size_modal_open(record.key, record.size);
//            });
//           }}
//          />
//         )}
//        {record?.size?.l > 0 && record?.size?.w > 0 && record?.size?.h > 0 && (
//         <>
//          <FaPencilAlt
//           onClick={() => {
//            console.log(record.size);
//            this.size_modal_open(record.key, record.size);
//           }}
//          />
//          <div>{`${record.size.l} ${record.size.w} ${record.size.h}`}</div>
//         </>
//        )}
//       </>
//      );
//     },
//    },
//    {
//     title: "Price",
//     dataIndex: "price",
//     render: (_, record) => {
//      return (
//       <>
//        {record.price < 1 && (
//         <FaPlus
//          onClick={() => this.price_modal_open(record.key, record.price)}
//         />
//        )}
//        {record.price > 0 && (
//         <>
//          {record.price}
//          <FaPencilAlt
//           onClick={() => this.price_modal_open(record.key, record.price)}
//          />
//         </>
//        )}
//       </>
//      );
//     },
//    },
//    {
//     title: "Offer Price",
//     dataIndex: "offer_price",
//     render: (_, record) => {
//      return (
//       <>
//        {record.offer_price < 1 && <FaPlus />}
//        {record.offer_price > 1 && (
//         <>
//          {record.offer_price}
//          <FaPencilAlt />
//         </>
//        )}
//       </>
//      );
//     },
//    },
//    {
//     title: (
//      <div>
//       <div>CBM</div>
//       <small className="lower-word">Package Volume</small>
//      </div>
//     ),
//     dataIndex: "quantity",
//     editable: true,
//    },
//    {
//     title: "",
//     dataIndex: "operation",
//     render: (_, record) =>
//      this.state.dataSource?.length >= 1 ? (
//       <Popconfirm
//        title="Sure to delete?"
//        onConfirm={() => this.handleDelete(record.key, record.option_id)}
//       >
//        <a>
//         <FaTrashAlt />
//        </a>
//       </Popconfirm>
//      ) : null,
//    },
//   ];

//   this.state = {
//    loading: false,
//    selectedRowKeys: [], // Check here to configure the default column
//    items: [],
//    pics_modal: false,
//    covers_modal: false,
//    cover_box_index: 0,
//    tempCover: "",
//    dataSource: this.props.edit ? this.props.rows : this.props.options,
//    count: !this.props.edit ? this.props.options?.length - 1 : 0,
//    modal_covers: [],
//    editing_row: null,
//    material_modal: false,
//    material_name: null,
//    material_image: null,
//    price_modal: false,
//    price: 0,
//    size_modal: false,
//    size_w: 0,
//    size_l: 0,
//    size_h: 0,
//    size: {},
//    adding_material: false,
//   };
//  }
//  material_modal_open = (editing_row, material) => {
//   this.setState({
//    material_modal: true,
//    editing_row,
//    material_name: material?.name,
//    material_image: material?.image,
//   });
//   console.log(this.state.editing_row);
//  };

//  size_modal_open = (editing_row, size) => {
//   this.setState({
//    size_modal: true,
//    size_l: size.l,
//    size_w: size.w,
//    size_h: size.h,
//    editing_row,
//   });
//   console.log(this.state.size_modal);
//  };
//  onSizeInput = (d, e) => {
//   if (d === "w") {
//    this.setState({ size_w: e.target.value });
//   }
//   if (d === "l") {
//    this.setState({ size_l: e.target.value });
//   }
//   if (d === "h") {
//    this.setState({ size_h: e.target.value });
//   }
//  };

//  price_modal_open = (editing_row, price) => {
//   this.setState({ price_modal: true, editing_row, price });
//   console.log(this.state.editing_row);
//  };
//  AddMaterialToOption = (row_index) => {
//   const tempDataSource = [...this.state.dataSource];
//   const index = tempDataSource.findIndex((item) => row_index === item.key);
//   const item = tempDataSource[index];
//   item["material"].name = this.state.material_name;
//   item["material"].image = this.state.material_image;
//   const row = tempDataSource[index];
//   tempDataSource.splice(index, 1, { ...item, ...row });
//   this.setState({
//    dataSource: tempDataSource,
//    material_modal: false,
//   });
//  };

//  AddSizeToOption = (row_index) => {
//   const tempDataSource = [...this.state.dataSource];
//   const index = tempDataSource.findIndex((item) => row_index === item.key);
//   const item = tempDataSource[index];
//   item["size"].l = this.state.size_l;
//   item["size"].h = this.state.size_h;
//   item["size"].w = this.state.size_w;
//   const row = tempDataSource[index];
//   tempDataSource.splice(index, 1, { ...item, ...row });
//   this.setState({
//    dataSource: tempDataSource,
//    size_modal: false,
//   });
//  };

//  AddPriceToOption = (row_index) => {
//   const tempDataSource = [...this.state.dataSource];
//   const index = tempDataSource.findIndex((item) => row_index === item.key);
//   const item = tempDataSource[index];
//   item.price = this.state.price;
//   const row = tempDataSource[index];
//   tempDataSource.splice(index, 1, { ...item, ...row });
//   this.setState({
//    dataSource: tempDataSource,
//    price_modal: false,
//   });
//  };

//  dataURLtoFile = (dataurl, filename) => {
//   var arr = dataurl.split(","),
//    mime = arr[0].match(/:(.*?);/)[1],
//    bstr = atob(arr[1]),
//    n = bstr.length,
//    u8arr = new Uint8Array(n);

//   while (n--) {
//    u8arr[n] = bstr.charCodeAt(n);
//   }

//   return new File([u8arr], filename, { type: mime });
//  };

//  //edit option picture modal
//  handleAddCover = (row_key, covers) => {
//   const boxes = [];
//   for (let i = covers?.length; i < 6; i++) {
//    boxes.push({
//     src: null,
//     cropping_data: {},
//     cover_id: null,
//    });
//   }
//   this.setState({
//    covers_modal: true,
//    modal_covers: [...covers, ...boxes],
//    editing_row: row_key,
//   });
//  };
//  handleEditCover = (row_key, covers) => {
//   const boxes = [];

//   for (let i = covers?.length; i < 6; i++) {
//    boxes.push({
//     src: null,
//     cropping_data: {},
//     cover_id: null,
//    });
//   }
//   this.setState({
//    covers_modal: true,
//    active_covers: covers,
//    modal_covers: [...covers, ...boxes],
//    editing_row: row_key,
//   });
//  };

//  //remove pic from product add picture modal
//  removePiceFromOption = (cover_id, tab_index) => {
//   let tempCovers = this.state.modal_covers;
//   tempCovers.map((cover) => {
//    if (cover.cover_id === cover_id) {
//     tempCovers[tab_index] = {
//      cover_id: "",
//      src: "",
//      cropping_data: {},
//      loaded: 0,
//     };
//    }
//   });
//   this.setState({ modal_covers: tempCovers });
//  };

//  handleAddOrUpdatePicture = (row_index) => {
//   const tempDataSource = [...this.state.dataSource];
//   const index = tempDataSource.findIndex((item) => row_index === item.key);
//   const item = tempDataSource[index];
//   item["covers"] = this.state.modal_covers;
//   const row = tempDataSource[index];
//   tempDataSource.splice(index, 1, { ...item, ...row });
//   this.setState(
//    {
//     dataSource: tempDataSource,
//     covers_modal: false,
//     // still_uploading_covers: true,
//    },
//    () => {
//     console.log(tempDataSource);
//    }
//   );
//  };

//  componentDidMount() {
//   console.log(this.props);
//   if (this.props.rows?.length < 1) {
//   }

//   this.props.rows.map((item, index) => {
//    this.setState(
//     (prevState) => ({
//      items: [
//       ...prevState.items,
//       {
//        key: index,
//        option_id: item.id,
//        covers: item?.covers,
//        material:
//         item.material?.name != "null"
//          ? item.material
//          : { name: null, image: null },
//        code: item.code != "null" ? item.code : null,
//        price: item.price,
//        offer_price: item.offer_price,
//        quantity:
//         item.quantity && item.quantity != "null" ? item.quantity : null,
//        size:
//         item.size.l + item.size.h + item.size.w > 0
//          ? item.size
//          : { l: null, h: null, w: null },
//       },
//      ],
//     }),
//     () => {
//      this.setState({
//       dataSource: this.state.items,
//       count: this.state.items?.length - 1,
//      });
//     }
//    );
//   });
//  }

//  onSelectChange = (selectedRowKeys) => {
//   console.log("selectedRowKeys changed: ", selectedRowKeys);
//   this.setState({ selectedRowKeys });
//  };

//  // new delete option api
//  handleDelete = (key, option_id) => {
//   const dataSource = [...this.state.dataSource];
//   if (option_id) {
//    axios
//     .post(`${API}product/delete/option/${option_id}`)
//     .then((response) => {
//      console.log(response);
//      this.setState({
//       dataSource: dataSource.filter((item) => item.key !== key),
//      });
//     })
//     .catch((err) => {
//      console.log(err);
//     });
//   } else {
//    this.setState({
//     dataSource: dataSource.filter((item) => item.key !== key),
//    });
//   }

//   console.log(dataSource);
//  };

//  async saveAndContinue() {
//   this.setState({ loading: true });

//   this.props.dispatchResetPrices();
//   this.props.dispatchResetCodes();

//   let _previews = [];
//   for (let row of this.state.dataSource) {
//    if (!row) continue;
//    await this.saveRow(row);
//    _previews.push(...row.covers);
//   }

//   // this.props.dispatchNextStep();
//   this.props.dispatchSaveOptions(this.state.dataSource);

//   this.setState({ loading: false });
//  }

//  saveRow = async (row) => {
//   const formData = new FormData();
//   formData.append(`option_id`, row.option_id);
//   formData.append(`material_image`, row.material.image);
//   formData.append(`material_name`, row.material.name);
//   formData.append(`covers`, JSON.stringify(row.covers));
//   formData.append(`price`, Number(row.price));
//   formData.append(`offer_price`, Number(row.offer_price));
//   formData.append(`size_l`, Number(row.size.l));
//   formData.append(`size_w`, Number(row.size.w));
//   formData.append(`size_h`, Number(row.size.h));
//   formData.append(`code`, row.code);
//   formData.append(`quantity`, row.quantity);
//   this.addPriceForPreview(Number(row.price), row.code);

//   return await axios
//    .post(`${API}upcrop/${this.props.id}`, formData, {})
//    .then((data) => {
//     console.log(data);
//    });
//  };

//  addPriceForPreview = (price, code) => {
//   this.props.dispatchPricesForPreview(price);
//   this.props.dispatchModalCodesForFileUpload(code);
//  };
//  handleAdd = () => {
//   console.log(this.props.id);

//   // message.info("Maximum size for single image 2MB");

//   const { count, dataSource } = this.state;
//   const newData = {
//    key: count + 1,
//    code: null,
//    covers: [],
//    size: {
//     l: null,
//     h: null,
//     w: null,
//    },
//    price: null,
//    offer_price: null,
//    material: {
//     name: null,
//     image: null,
//    },
//    quantity: null,
//    option_id: null,
//   };
//   this.setState({
//    dataSource: [...dataSource, newData],
//    count: count + 1,
//   });
//   console.log(this.state.dataSource);
//  };
//  sizeExceeded = () => {
//   toast.error("Maximum size allowed is 1MB", {
//    position: "bottom-center",
//    autoClose: 1500,
//    progress: undefined,
//    theme: "colored",
//    transition: Flip,
//   });
//  };
//  handleUploadMaterialImage = (e, row_index) => {
//   let file = e.target.files[0];
//   if (!file) return;
//   if (file.size > 1048576 * 1.5) {
//    console.log("Size is to Large");
//    this.sizeExceeded();

//    return;
//   } else {
//    this.setState({ adding_material: true });
//    const fd = new FormData();
//    this.setState({ material_image: URL.createObjectURL(file) });
//    fd.append("cover", file);
//    axios.post(`${API}cover-upload-new`, fd).then((response) => {
//     this.setState({
//      material_image: response.data.cover.src,
//      adding_material: false,
//     });
//    });
//   }
//  };


//  handleUploadProductImg = async (e, img_index) => {
//   let file = e.target.files[0];
//   if (!file) {
//    return;
//   }
//   if (file.size > 1048576 * 1.5) {
//    console.log("Size is to Large");
//    this.sizeExceeded();
//    return;
//   } else {
//    this.setState({ cover_box_index: img_index });
//    const tempCovers = this.state.modal_covers;
//    tempCovers[img_index].src = URL.createObjectURL(file);
//    const fd = new FormData();
//    fd.append("cover", file);
//    const options = {
//     onUploadProgress: (progressEvent) => {
//      const { loaded, total } = progressEvent;
//      let percent = Math.floor((loaded * 100) / total);
//      console.log(`${loaded} kb of ${total} | ${percent}%`);
//      if (percent <= 100) {
//       console.log(percent);
//       console.log(tempCovers);
//       tempCovers[img_index].loaded = percent;
//       this.setState({ dataSource: tempDataSource });
//      }
//     },
//    };
//    //
//    axios.post(`${API}cover-upload-new`, fd, options).then((response) => {
//     console.log(response.data);
//     tempCovers[img_index]._src = response.data.cover.src;
//     tempCovers[img_index].src = response.data.cover.src;
//     tempCovers[img_index].cover_id = response.data.cover.id;
//     this.props.dispatchAddOptionsforPreview({
//      src: response.data.cover.src,
//      data: response.data.cover.cropping_data,
//     });
//     const covers = this.props.options_covers;
//     localStorage.setItem("covers", JSON.stringify(covers));
//    });

//    const tempDataSource = this.state.dataSource;
//    tempDataSource[this.state.editing_row].covers = tempCovers;
//    this.setState({ dataSource: tempDataSource });
//   }
//  };
//  handleSave = (row) => {
//   const newData = [...this.state.dataSource];
//   const index = newData.findIndex((item) => row.key === item.key);
//   const item = newData[index];
//   newData.splice(index, 1, { ...item, ...row });
//   this.setState({
//    dataSource: newData,
//   });
//   console.log(row);
//  };

//  render() {
//   const { selectedRowKeys, dataSource } = this.state;
//   const rowSelection = {
//    selectedRowKeys,
//    onChange: this.onSelectChange,
//   };
//   const hasSelected = selectedRowKeys.length > 0;
//   const components = {
//    body: {
//     row: EditableRow,
//     cell: EditableCell,
//    },
//   };
//   const columns = this.columns.map((col) => {
//    if (!col.editable) {
//     return col;
//    }

//    return {
//     ...col,
//     onCell: (record) => ({
//      record,
//      editable: col.editable,
//      dataIndex: col.dataIndex,
//      title: col.title,
//      handleSave: this.handleSave,
//     }),
//    };
//   });
//   return (
//    <React.Fragment>
//     <div className="step-form">
//      <div
//       className="next-wrapper"
//       style={{
//        top: "80px",
//       }}
//      >
//       <div
//        className="next-inner"
//        style={{
//         maxWidth: "1010px",
//        }}
//       >
//        <button
//         className="next-btn"
//         style={{
//          top: "-110px",
//          backgroundColor: this.state.loading ? "#898989" : "",
//         }}
//         onClick={this.saveAndContinue.bind(this)}
//        >
//         {this.state.loading ? (
//          <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
//         ) : (
//          "Save & Continue"
//         )}
//        </button>
//       </div>
//      </div>
//      <div className="step-head">
//       <h5
//        style={{
//         minHeight: "51px",
//        }}
//       >
//        Options & Price
//       </h5>
//      </div>
//      <div className="options-wrapper">
//       <div>
//        <span style={{ marginLeft: 8 }}>
//         {hasSelected ? `Selected ${selectedRowKeys?.length} Options` : ""}
//        </span>
//        <Table
//         className="option-table"
//         bordered={false}
//         pagination={false}
//         components={components}
//         rowClassName="editable-row"
//         dataSource={dataSource}
//         columns={columns}
//         rowSelection={rowSelection}
//        />
//        <div className="add-option-btn" onClick={this.handleAdd}>
//         <div className="icon">
//          <FaPlus />
//         </div>
//         <div className="under-link">Add Option</div>
//        </div>

//        <>
//         {/* offer modal */}

//         <Modal
//          id="offer_modal"
//          className="arch-wide-modal product-modal"
//          size="lg"
//          show={this.state.pics_modal}
//          onHide={() => this.setState({ pics_modal: false })}
//          aria-labelledby="example-modal-sizes-title-lg"
//         >
//          <Modal.Header closeButton></Modal.Header>
//          <Modal.Body>
//           <div className="option-add-label">Offer Price</div>
//           <form>
//            <FormB.Row>
//             <FormB.Group as={Col} md={8} controlId="formGridState">
//              <FormB.Control
//               type="number"
//               value={this.state.tempCover}
//               onChange={(e) => {
//                this.setState({ tempCover: e.target.value });
//               }}
//              />
//              <span className="currency">¥</span>
//             </FormB.Group>
//            </FormB.Row>
//            <div as={Row}>
//             <div column md={12}>
//              <div className="option-tip">
//               Tips: Initial price must be higher than offer price
//              </div>
//              <div>{this.state.active_covers}</div>
//             </div>
//            </div>
//            <div as={Row} className="add-btn">
//             <div column md={12}>
//              <BButton
//               variant="danger"
//               onClick={(e) => {
//                e.preventDefault();
//                this.setState({ pics_modal: false });
//                this.handleSave({ key: "1", age: this.state.tempCover });
//                console.log(this.state.tempCover);
//               }}
//              >
//               Click
//              </BButton>
//             </div>
//            </div>
//           </form>
//          </Modal.Body>
//         </Modal>

//         {/* pic modal */}
//         <>
//          <Modal
//           id="price-request-modal"
//           className="arch-wide-modal product-modal pics-modal covers-modal"
//           size="lg"
//           show={this.state.covers_modal}
//           onHide={() => this.setState({ covers_modal: false })}
//           aria-labelledby="example-modal-sizes-title-lg"
//          >
//           <Modal.Header closeButton></Modal.Header>
//           <Modal.Body>
//            <div className="option-add-label">Product Picuters</div>
//            <div className="sub-head">
//             Choose the corresponding view of the photo you want to upload
//            </div>
//            <Tabs tabPosition="bottom">
//             {this.state.modal_covers?.map((cover, index) => {
//              return (
//               <TabPane
//                tab={
//                 cover.src ? (
//                  <>
//                   <div key={index} style={{ width: "70px", height: "68px" }}>
//                    <img
//                     src={cover.src}
//                     alt="cover"
//                     style={{
//                      width: "100%",
//                      height: "100%",
//                      display: "block",
//                      position: "relative",
//                     }}
//                    />
//                    {(cover.loaded > 0 || cover.loaed < 100) && (
//                     <Progress
//                      style={{
//                       position: "absolute",
//                       top: "33px",
//                       left: "22px",
//                      }}
//                      type="circle"
//                      percent={cover.loaded}
//                      width={cover.loaded < 100 ? 35 : 1}
//                      strokeWidth={12}
//                      trailColor="#666666"
//                      strokeColor="#fff"
//                      success={{
//                       percent: 0,
//                       strokeColor: "transparent",
//                      }}
//                     />
//                    )}
//                   </div>
//                   {(cover.loaded >= 100 || cover.cover_id > 0) && (
//                    <>
//                     <div class="delete-btn">
//                      <button
//                       onClick={() =>
//                        this.removePiceFromOption(cover.cover_id, index)
//                       }
//                      >
//                       <CloseCircleFilled />
//                      </button>
//                     </div>
//                    </>
//                   )}
//                  </>
//                 ) : (
//                  <>
//                   <div className="up-btn">
//                    <UplpadIcon className="option-upload-icon" index={index} />
//                    <input
//                     type="file"
//                     className="option-upload-icon hide"
//                     multiple
//                     onChange={(e) => this.handleUploadProductImg(e, index)}
//                    />
//                   </div>
//                  </>
//                 )
//                }
//                key={index}
//               >
//                <div className="img-box" style={{ marginBottom: "30px" }}>
//                 {cover?.src !== "" && (
//                  <>
//                   <div
//                    style={{
//                     height: "100%",
//                     width: "100%",
//                     backgroundImage: `url(${cover?.src})`,
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                     backgroundSize: "contain",
//                    }}
//                   ></div>
//                  </>
//                 )}
//                </div>
//               </TabPane>
//              );
//             })}
//            </Tabs>
//            <div
//             style={{
//              margin: "0px 45px",
//              position: "relative",
//              bottom: "17px",
//              fontSize: ".85rem",
//             }}
//            >
//             <sub>Upload at least one picture of this option</sub>
//            </div>
//            <div className="modal-side">
//             <button
//              style={{
//               background: "red",
//               color: "#fff",
//               margin: "10px",
//               textAlign: "right",
//               padding: "10px 15px",
//               borderRadius: "3px",
//              }}
//              onClick={() => {
//               this.handleAddOrUpdatePicture(this.state.editing_row);
//              }}
//             >
//              ADD
//             </button>
//            </div>
//           </Modal.Body>
//          </Modal>
//         </>
//        </>

//        <>
//         {/* material modal */}

//         <Modal
//          id="price-request-modal"
//          className="arch-wide-modal product-modal material-modal"
//          size="lg"
//          show={this.state.material_modal}
//          onHide={() => this.setState({ material_modal: false })}
//          aria-labelledby="example-modal-sizes-title-lg"
//         >
//          <Modal.Header closeButton />
//          <Modal.Body>
//           <div className="option-add-label">Material</div>
//           <form
//            onSubmit={(e) => {
//             e.preventDefault();
//             if (!this.state.adding_material) {
//              this.AddMaterialToOption(this.state.editing_row);
//             }
//            }}
//           >
//            <div className="modal-upload">
//             <div className="upload-box">
//              {this.state.material_image ? (
//               <img
//                src={this.state.material_image}
//                alt=""
//                style={{ width: "80px", height: "80px" }}
//               />
//              ) : (
//               <>
//                <FaCloudUploadAlt />
//                <input
//                 type="file"
//                 id="material-file"
//                 onChange={(e) => this.handleUploadMaterialImage(e)}
//                />
//               </>
//              )}
//              <p>Upload Picture</p>
//             </div>
//            </div>
//            <FormB.Row>
//             <FormB.Group as={Col} md={12} controlId="formGridState">
//              <FormB.Control
//               placeholder="Material's Name"
//               value={this.state.material_name}
//               onChange={(e) => this.setState({ material_name: e.target.value })}
//              />
//             </FormB.Group>
//            </FormB.Row>
//            <div as={Row} className="add-btn">
//             <div column md={12}>
//              <BButton variant="danger" type="submit">
//               {this.state.adding_material ? (
//                <ClipLoader
//                 style={{ height: "20px" }}
//                 color="#ffffff"
//                 loading={this.state.adding_material}
//                 size={20}
//                />
//               ) : (
//                "Add Material"
//               )}
//              </BButton>
//             </div>
//            </div>
//           </form>
//          </Modal.Body>
//         </Modal>
//        </>
//        <>
//         {/* price modal */}

//         <Modal
//          id="price_modal"
//          className="arch-wide-modal product-modal"
//          size="lg"
//          show={this.state.price_modal}
//          onHide={() => this.setState({ price_modal: false })}
//          aria-labelledby="example-modal-sizes-title-lg"
//         >
//          <Modal.Header closeButton></Modal.Header>
//          <Modal.Body>
//           <div className="option-add-label">Price</div>
//           <form
//            onSubmit={(e) => {
//             e.preventDefault();
//             this.AddPriceToOption(this.state.editing_row);
//            }}
//           >
//            <FormB.Row>
//             <FormB.Group as={Col} md={8} controlId="formGridState">
//              <FormB.Control
//               type="number"
//               value={this.state.price <= 0 ? "" : this.state.price}
//               onChange={(e) => this.setState({ price: e.target.value })}
//              />
//              <span className="currency">¥</span>
//             </FormB.Group>
//            </FormB.Row>
//            <div as={Row}>
//             <div column md={12}>
//              <div className="option-tip">
//               Tips: Initial price must be higher than offer price
//              </div>
//             </div>
//            </div>
//            <div as={Row} className="add-btn">
//             <div column md={12}>
//              <BButton variant="danger" type="submit">
//               Add Price
//              </BButton>
//             </div>
//            </div>
//           </form>
//          </Modal.Body>
//         </Modal>

//         {/* size modal */}

//         <Modal
//          id="size_modal"
//          className="arch-wide-modal product-modal"
//          size="lg"
//          show={this.state.size_modal}
//          onHide={() => this.setState({ size_modal: false })}
//          aria-labelledby="example-modal-sizes-title-lg"
//         >
//          <Modal.Header closeButton></Modal.Header>
//          <Modal.Body>
//           <div className="option-add-label">Add Size</div>
//           <form
//            onSubmit={(e) => {
//             e.preventDefault();
//             this.AddSizeToOption(this.state.editing_row);
//            }}
//           >
//            <FormB.Row>
//             <FormB.Group as={Col} controlId="formGridState">
//              <span md={2}>L: </span>
//              <FormB.Control
//               type="number"
//               md={10}
//               value={this.state?.size_l}
//               onChange={(e) => this.onSizeInput("l", e)}
//              />
//             </FormB.Group>
//             <FormB.Group as={Col} controlId="formGridState">
//              <span>W: </span>
//              <FormB.Control
//               type="number"
//               value={this.state?.size_w}
//               onChange={(e) => this.onSizeInput("w", e)}
//              />
//             </FormB.Group>
//             <FormB.Group as={Col} controlId="formGridState">
//              <span>H: </span>
//              <FormB.Control
//               type="number"
//               value={this.state?.size_h}
//               onChange={(e) => this.onSizeInput("h", e)}
//              />
//             </FormB.Group>
//            </FormB.Row>
//            <div as={Row}>
//             <div column md={12}>
//              <div className="option-tip">Tips: add the size in mm</div>
//             </div>
//            </div>
//            <div as={Row} className="add-btn">
//             <div column md={12}>
//              <BButton variant="danger" type="submit">
//               Add Size
//              </BButton>
//             </div>
//            </div>
//           </form>
//          </Modal.Body>
//         </Modal>
//        </>
//       </div>
//      </div>
//     </div>
//    </React.Fragment>
//   );
//  }
// }

// const mapDispatchToProps = (dispatch) => ({
//  dispatchNextStep: () => dispatch(nextTab()),
//  dispatchAddOptionsforPreview: (rows) => dispatch(addOptionAction(rows)),
//  dispatchPricesForPreview: (price) => dispatch(addProductPrices(price)),
//  dispatchSaveOptions: (options) => dispatch(saveOptions(options)),
//  dispatchModalCodesForFileUpload: (code) =>
//   dispatch(addProductModalCodes(code)),
//  dispatchResetPrices: () => dispatch(resetProductPrices()),
//  dispatchResetCodes: () => dispatch(resetProductModalCodes()),
// });
// const mapStateToProps = (state) => {
//  return {
//   options: state.addProduct.options,
//   options_covers: state.addProduct?.covers,
//  };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(TableStep);
