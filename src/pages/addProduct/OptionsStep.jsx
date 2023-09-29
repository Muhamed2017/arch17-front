import React, { useContext, useState, useEffect, useRef } from "react";
import "./addproduct.css";
import { Table, Input, Popconfirm, Form, Progress, Dropdown, Menu } from "antd";
import {
 Button as BButton,
 Form as FormB,
 Col,
 Row,
 Modal,
} from "react-bootstrap";
import { toast, Flip } from "react-toastify";
import {
 FaCloudUploadAlt,
 FaPlus,
 FaTrashAlt,
 FaCube,
 FaArrowRight,
 FaArrowLeft,
 FaArrowDown,
 FaArrowUp,
 FaPencilAlt,
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { API } from "../../utitlties";
import axios from "axios";
import { connect } from "react-redux";
import {
 addProductPrices,
 nextTab,
 saveOptions,
 addProductModalCodes,
 resetProductPrices,
 resetProductModalCodes,
 addOptionAction,
} from "../../redux/actions/addProductActions";
// const { TabPane } = Tabs;
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
 const [form] = Form.useForm();
 return (
  <Form form={form} component={false}>
   <EditableContext.Provider value={form}>
    <tr {...props} />
   </EditableContext.Provider>
  </Form>
 );
};

const UploadIcon = (props) => {
 return (
  <>
   {props.index === 0 && <FaCloudUploadAlt />}
   {props.index === 1 && <FaCube />}
   {props.index === 2 && <FaArrowUp />}
   {props.index === 3 && <FaArrowDown />}
   {props.index === 4 && <FaArrowRight />}
   {props.index === 5 && <FaArrowLeft />}
  </>
 );
};
const EditableCell = ({
 title,
 editable,
 children,
 dataIndex,
 record,
 handleSave,
 ...restProps
}) => {
 const [editing, setEditing] = useState(false);
 const inputRef = useRef(null);
 const form = useContext(EditableContext);
 useEffect(() => {
  if (editing) {
   inputRef.current.focus();
  }
 }, [editing]);

 const toggleEdit = () => {
  setEditing(!editing);
  form.setFieldsValue({
   [dataIndex]: record[dataIndex],
  });
 };

 const save = async () => {
  try {
   const values = await form.validateFields();
   toggleEdit();
   handleSave({ ...record, ...values });
  } catch (errInfo) {
   console.log("Save failed:", errInfo);
  }
 };

 let childNode = children;

 if (editable) {
  childNode = editing ? (
   <Form.Item
    focused={true}
    style={{
     width: "100px",
     margin: "auto",
    }}
    name={dataIndex}
   >
    <Input
     ref={inputRef}
     onPressEnter={save}
     onBlur={save}
     className="table-editing-input"
     style={{ maxWidth: "100px", margin: "auto" }}
    />
   </Form.Item>
  ) : (
   <div
    style={{
     width: "100px",
     margin: "auto",
     height: "32px",
     border: "1px solid #ced4da",
     borderRadius: "10px",
     fontSize: ".8rem",
     fontWeight: "600",
     padding: "5px 0 0 10px",
     textAlign: "left",
    }}
    onClick={toggleEdit}
   >
    {children}
   </div>
  );
 }

 return <td {...restProps}>{childNode}</td>;
};

const style = {
 width: "35px",
 height: "35px",
 borderRadius: "4px",
};
class OptionsStep extends React.Component {
 constructor(props) {
  super(props);
  this.MaterialsMenu = (props) => {
   return (
    <Menu>
     <p className="menu-p">Choose from added materials</p>
     {this.state.unique_materials?.map((row, index) => {
      return (
       row.name &&
       row.image &&
       row?.name !== null && (
        <Menu.Item
         key={row?.name}
         onClick={() => {
          this.setState(
           {
            material_name: row?.name,
            material_image: row?.image,
           },
           () => {
            this.AddMaterialToOption(props.row_key);
           }
          );
         }}
        >
         <img style={style} alt="" src={row?.image} />
         <p>{row?.name}</p>
        </Menu.Item>
       )
      );
     })}

     <Menu.Item>
      <button
       onClick={(e) => {
        e.preventDefault();
        console.log(props)
        // this.material_modal_open(props.row_key);
       }}
      >
       OR ADD NEW MATERIAL
      </button>
     </Menu.Item>
    </Menu>
   );
  };
  this.SizesMenu = (props) => {
   return (
    <Menu>
     <p className="menu-p">Choose from added sizes</p>
     {this.state.unique_sizes?.map((size, index) => {
      return (
       size?.l + size?.h + size?.w > 0 && (
        <Menu.Item
         key={`${size.l} | ${size.w} | ${size.h}`}
         onClick={() => {
          this.setState(
           {
            size_l: size.l,
            size_w: size.w,
            size_h: size.h,
           },
           () => {
            this.AddSizeToOption(props.row_key);
           }
          );
         }}
        >
         <p>{`${size.l} L | ${size.w} W | ${size.h} H `}</p>
        </Menu.Item>
       )
      );
     })}
     <Menu.Item>
      <button
       onClick={(e) => {
        e.preventDefault();
        console.log(props)
        this.size_modal_open(props.row_key);
       }}
      >
       OR ADD NEW SIZE
      </button>
     </Menu.Item>
    </Menu>
   );
  };
  this.PriceMenu = (props) => {
   return (
    <Menu>
     <p className="menu-p">Choose from added prices</p>
     {this.state.unique_prices?.map((price, index) => {
      return (
       price > 0 && (
        <Menu.Item
         key={price}
         onClick={() => {
          this.setState(
           {
            price,
           },
           () => {
            this.AddPriceToOption(props.row_key);
           }
          );
         }}
        >
         <p>{`${price} $`}</p>
        </Menu.Item>
       )
      );
     })}
     <Menu.Item>
      <button
       onClick={(e) => {
        e.preventDefault();
        this.price_modal_open(props.row_key);
       }}
      >
       OR ADD NEW PRICE
      </button>
     </Menu.Item>
    </Menu>
   );
  };
  this.cropperRef = React.createRef();
  this.columns = [
   {
    title: "Code",
    dataIndex: "code",
    editable: true,
   },
   {
    title: "Pictures",
    dataIndex: "covers",
    render: (_, record) => {
     return (
      <>
       <div className="row-img-grid">
        {record?.covers?.map((cover) => {
         if (cover?._src !== "" && cover?._src !== null) {
          cover.src = cover._src;
         }
         return (
          <div
           style={{
            width: "28px",
            height: "28px",
            display: "inline-block",
            margin: "0 1px",
           }}
          >
           {cover?.src !== "" && cover?._src !== "" && (
            <>
             {record.option_id ? (
              <>
               <img
                style={{ display: "block", width: "100%", height: "100%" }}
                alt=""
                src={cover._src}
               />
              </>
             ) : (
              <>
               <img
                style={{ display: "block", width: "100%", height: "100%" }}
                alt=""
                src={cover.src}
               />
              </>
             )}
            </>
           )}
          </div>
         );
        })}
       </div>
       <div className="edit-add-row-btn">
        {record.covers?.length < 1 ? (
         <>
          <button
           onClick={() => {
            this.setState(
             {
              editing_row: record.key,
             },
             () => this.handleAddCover(record.key, record?.covers)
            );
           }}
           className="upload-pic-row-btn"
          >
           <FaCloudUploadAlt />
           <span>Upload Pictures</span>
          </button>
         </>
        ) : (
         <>
          <button
           style={{ padding: "5px 0" }}
           onClick={() => {
            this.setState(
             {
              editing_row: record.key,
             },
             () => {
              this.handleEditCover(record.key, record.covers);
             }
            );
           }}
          >
           <FaPencilAlt />
          </button>
         </>
        )}
       </div>
      </>
     );
    },
   },
   {
    title: "Material",
    dataIndex: "material",
    render: (_, record) => {
     return (
      <>
       {!record.material?.name && (
        <>
         {this.state.unique_materials?.length > 0 &&
         ((this.state.unique_materials[0]?.image &&
          this.state.unique_materials[0]?.name) ||
          (this.state.unique_materials[1]?.image &&
           this.state.unique_materials[1]?.name)) ? (
          <Dropdown
           //  className="options-dropdown"

           //  overlay={<this.MaterialsMenu row_key={record.key} />}
           overlay={() => (
            <Menu className="options-dropdown">
             <p className="menu-p">Choose from added materials</p>
             {this.state.unique_materials?.map((row, index) => {
              return (
               row.name &&
               row.image &&
               row?.name !== null && (
                <Menu.Item
                 key={row?.name}
                 onClick={() => {
                  this.setState(
                   {
                    material_name: row?.name,
                    material_image: row?.image,
                   },
                   () => {
                    this.AddMaterialToOption(record.key);
                   }
                  );
                 }}
                >
                 <img style={style} alt="" src={row?.image} />
                 <p>{row?.name}</p>
                </Menu.Item>
               )
              );
             })}

             <Menu.Item>
              <button
               onClick={(e) => {
                e.preventDefault();
                this.material_modal_open(record?.key);
               }}
              >
               OR ADD NEW MATERIAL
              </button>
             </Menu.Item>
            </Menu>
           )}
           placement="topLeft"
           trigger="click"
          >
           <FaPlus
            onClick={() => {
             this.setState(
              {
               editing_row: record.key,
              },
              () => {
               //  this.material_modal_open(record.key, record.material);
              }
             );
            }}
           />
          </Dropdown>
         ) : (
          <>
           <FaPlus
            onClick={() => {
             this.setState(
              {
               editing_row: record.key,
              },
              () => {
               this.material_modal_open(record.key, record.material);
              }
             );
            }}
           />
          </>
         )}
        </>
       )}
       {record.material?.image && record?.material_name !== "null" && (
        <>
         <div className="material-cell option-cell">
          <img src={record.material?.image} alt="" />
          {record.material?.name}

          <FaPencilAlt
           className="edit-pencil"
           onClick={() => {
            console.log([this.state.material_name, this.state.material_image]);
            this.material_modal_open(record.key, record?.material);
           }}
          />
         </div>
        </>
       )}
      </>
     );
    },
   },
   {
    title: "Size",
    dataIndex: "size",

    render: (_, record) => {
     return (
      <>
       {record?.size?.l === null &&
        record?.size?.w === null &&
        record?.size?.h === null && (
         <>
          {this.state.unique_sizes?.length > 0 &&
          (this.state.unique_sizes[0]?.w > 0 ||
           this.state.unique_sizes[1]?.w > 0) ? (
           <Dropdown
            // overlay={<this.SizesMenu row_key={record.key} />}
            overlay={() => (
             <Menu className="options-dropdown">
              <p className="menu-p">Choose from added sizes</p>
              {this.state.unique_sizes?.map((size, index) => {
               return (
                size?.l + size?.h + size?.w > 0 && (
                 <Menu.Item
                  key={`${size.l} | ${size.w} | ${size.h}`}
                  onClick={() => {
                   this.setState(
                    {
                     size_l: size.l,
                     size_w: size.w,
                     size_h: size.h,
                    },
                    () => {
                     this.AddSizeToOption(record?.key);
                    }
                   );
                  }}
                 >
                  <p>{`${size.l} L | ${size.w} W | ${size.h} H `}</p>
                 </Menu.Item>
                )
               );
              })}
              <Menu.Item>
               <button
                onClick={(e) => {
                 e.preventDefault();
                 this.size_modal_open(record.key);
                }}
               >
                OR ADD NEW SIZE
               </button>
              </Menu.Item>
             </Menu>
            )}
            placement="topLeft"
            trigger="click"
           >
            <FaPlus />
           </Dropdown>
          ) : (
           <>
            <FaPlus
             onClick={() => {
              this.setState({ editing_row: record.key }, () => {
               this.size_modal_open(record.key, record.size);
              });
             }}
            />
           </>
          )}
         </>
        )}
       {record?.size?.l > 0 && record?.size?.w > 0 && record?.size?.h > 0 && (
        <>
         <FaPencilAlt
          onClick={() => {
           console.log(record.size);
           this.size_modal_open(record.key, record.size);
          }}
         />
         <div>{`${record.size.l} ${record.size.w} ${record.size.h}`}</div>
        </>
       )}
      </>
     );
    },
   },
   {
    title: "Price",
    dataIndex: "price",
    render: (_, record) => {
     return (
      <>
       {record.price < 1 && (
        <>
         {this.state.unique_prices?.length > 0 ? (
          <Dropdown
           //  overlay={<this.PriceMenu row_key={record.key} />}
           overlay={() => (
            <Menu className="options-dropdown">
             <p className="menu-p">Choose from added prices</p>
             {this.state.unique_prices?.map((price, index) => {
              return (
               price > 0 && (
                <Menu.Item
                 key={price}
                 onClick={() => {
                  this.setState(
                   {
                    price,
                   },
                   () => {
                    this.AddPriceToOption(record.key);
                   }
                  );
                 }}
                >
                 <p>{`${price} ¥`}</p>
                </Menu.Item>
               )
              );
             })}
             <Menu.Item>
              <button
               onClick={(e) => {
                e.preventDefault();
                this.price_modal_open(record.key);
               }}
              >
               OR ADD NEW PRICE
              </button>
             </Menu.Item>
            </Menu>
           )}
           placement="topLeft"
           trigger="click"
          >
           <FaPlus
           // onClick={() => this.price_modal_open(record.key, record.price)}
           />
          </Dropdown>
         ) : (
          <FaPlus
           onClick={() => this.price_modal_open(record.key, record.price)}
          />
         )}
        </>
       )}
       {record.price > 0 && (
        <>
         {record.price}
         <FaPencilAlt
          onClick={() => this.price_modal_open(record.key, record.price)}
         />
        </>
       )}
      </>
     );
    },
   },
   {
    title: "Offer Price",
    dataIndex: "offer_price",
    render: (_, record) => {
     return (
      <>
       {record.offer_price < 1 && <FaPlus />}
       {record.offer_price > 1 && (
        <>
         {record.offer_price}
         <FaPencilAlt />
        </>
       )}
      </>
     );
    },
   },
   {
    title: (
     <div>
      <div>CBM</div>
      <small className="lower-word">Package Volume</small>
     </div>
    ),
    dataIndex: "quantity",
    editable: true,
   },
   {
    title: "",
    dataIndex: "operation",
    render: (_, record) =>
     this.state.dataSource?.length >= 1 ? (
      <Popconfirm
       title="Sure to delete?"
       onConfirm={() => this.handleDelete(record.key, record.option_id)}
      >
       <span>
        <FaTrashAlt />
       </span>
      </Popconfirm>
     ) : null,
   },
  ];

  this.state = {
   modalCovers: [],
   unique_materials: this.props?.edit
    ? [
       ...this.props.rows
        .map((r) => ({ image: r.material.image, name: r.material.name }))
        .reduce((map, { name, image }) => {
         return map.set(`${name}-${image}`, { name, image });
        }, new Map())
        .values(),
      ]
    : [
       ...this.props.options
        .map((r) => ({ image: r.material.image, name: r.material.name }))
        .reduce((map, { name, image }) => {
         return map.set(`${name}-${image}`, { name, image });
        }, new Map())
        .values(),
      ],

   unique_sizes: this.props?.edit
    ? [
       ...this.props.rows
        .map((r) => ({ l: r.size.l, w: r.size.w, h: r.size.h }))
        .reduce((map, { l, w, h }) => {
         return map.set(`${l}-${w}-${h}`, { l, w, h });
        }, new Map())
        .values(),
      ]
    : [
       ...this.props.options
        .map((r) => ({ l: r.size.l, w: r.size.w, h: r.size.h }))
        .reduce((map, { l, w, h }) => {
         return map.set(`${l}-${w}-${h}`, { l, w, h });
        }, new Map())
        .values(),
      ],

   unique_prices: this.props?.edit
    ? this.props.rows
       ?.map((r) => r.price)
       .filter((p, index, self) => {
        return p && p > 0 && self.indexOf(p) === index;
       })
    : this.props.options
       ?.map((r) => r.price)
       .filter((p, index, self) => {
        return p && p > 0 && self.indexOf(p) === index;
       }),
   modalUploadBoxes: [],
   loading: false,
   selectedRowKeys: [], // Check here to configure the default column
   items: [],
   pics_modal: false,
   covers_modal: false,
   cover_box_index: 0,
   tempCover: "",
   dataSource: this.props.edit ? this.props.rows : this.props.options,
   count: !this.props.edit ? this.props.options?.length - 1 : 0,
   modal_covers: [],
   editing_row: null,
   material_modal: false,
   material_name: null,
   material_image: null,
   price_modal: false,
   price: 0,
   size_modal: false,
   size_w: 0,
   size_l: 0,
   size_h: 0,
   size: {},
   adding_material: false,
   upload_boxes: [],
  };
 }

 items = [
  { label: "item 1", key: "item-1" }, // remember to pass the key prop
  { label: "item 2", key: "item-2" },
 ];
 material_modal_open = (editing_row, material) => {
  this.setState({
   material_modal: true,
   editing_row,
   material_name: material?.name,
   material_image: material?.image,
  });
  console.log(this.state.editing_row);
 };

 size_modal_open = (editing_row, size) => {
  this.setState({
   size_modal: true,
   size_l: size?.l,
   size_w: size?.w,
   size_h: size?.h,
   editing_row,
  });
  console.log(this.state.size_modal);
 };

 onSizeInput = (d, e) => {
  if (d === "w") {
   this.setState({ size_w: e.target.value });
  }
  if (d === "l") {
   this.setState({ size_l: e.target.value });
  }
  if (d === "h") {
   this.setState({ size_h: e.target.value });
  }
 };

 price_modal_open = (editing_row, price) => {
  this.setState({ price_modal: true, editing_row, price });
  console.log(this.state.editing_row);
 };

 MaterialsMenu = (props) => {
  return (
   <Menu>
    <p className="menu-p">Choose from added materials</p>
    {this.state.unique_materials?.map((row, index) => {
     return (
      row.name &&
      row.image &&
      row?.name !== null && (
       <Menu.Item
        key={row?.name}
        onClick={() => {
         this.setState(
          {
           material_name: row?.name,
           material_image: row?.image,
          },
          () => {
           this.AddMaterialToOption(props.row_key);
          }
         );
        }}
       >
        <img style={style} alt="" src={row?.image} />
        <p>{row?.name}</p>
       </Menu.Item>
      )
     );
    })}

    <Menu.Item>
     <button
      onClick={(e) => {
       e.preventDefault();
       this.material_modal_open(props.row_key);
      }}
     >
      OR ADD NEW MATERIAL
     </button>
    </Menu.Item>
   </Menu>
  );
 };

 SizesMenu = (props) => {
  return (
   <Menu>
    <p className="menu-p">Choose from added sizes</p>
    {this.state.unique_sizes?.map((size, index) => {
     return (
      size?.l + size?.h + size?.w > 0 && (
       <Menu.Item
        key={`${size.l} | ${size.w} | ${size.h}`}
        onClick={() => {
         this.setState(
          {
           size_l: size.l,
           size_w: size.w,
           size_h: size.h,
          },
          () => {
           this.AddSizeToOption(props.row_key);
          }
         );
        }}
       >
        <p>{`${size.l} L | ${size.w} W | ${size.h} H `}</p>
       </Menu.Item>
      )
     );
    })}
    <Menu.Item>
     <button
      onClick={(e) => {
       e.preventDefault();
       this.size_modal_open(props.row_key);
      }}
     >
      OR ADD NEW SIZE
     </button>
    </Menu.Item>
   </Menu>
  );
 };

 PriceMenu = (props) => {
  return (
   <Menu>
    <p className="menu-p">Choose from added prices</p>
    {this.state.unique_prices?.map((price, index) => {
     return (
      price > 0 && (
       <Menu.Item
        key={price}
        onClick={() => {
         this.setState(
          {
           price,
          },
          () => {
           this.AddPriceToOption(props.row_key);
          }
         );
        }}
       >
        <p>{`${price}  ¥`}</p>
       </Menu.Item>
      )
     );
    })}
    <Menu.Item>
     <button
      onClick={(e) => {
       e.preventDefault();
       this.price_modal_open(props.row_key);
      }}
     >
      OR ADD NEW PRICE
     </button>
    </Menu.Item>
   </Menu>
  );
 };

 AddMaterialToOption = (row_index) => {
  const tempDataSource = [...this.state.dataSource];
  let unique_materials = this.state.unique_materials;
  const index = tempDataSource.findIndex((item) => row_index === item.key);
  let item = tempDataSource[index];
  console.log(row_index)
  console.log(item)
  
  item["material"].name = this.state.material_name;
  item["material"].image = this.state.material_image;

  const row = tempDataSource[index];
  tempDataSource.splice(index, 1, { ...item, ...row });
  const _index = unique_materials.findIndex(
   (mat) =>
    mat.name === this.state.material_name &&
    mat.image === this.state.material_image
  );
  if (_index === -1) {
   unique_materials.push({
    image: this.state.material_image,
    name: this.state.material_name,
   });
  }

  this.setState({
   dataSource: tempDataSource,
   unique_materials,
   material_modal: false,
  });
 };

 AddSizeToOption = (row_index) => {
  const tempDataSource = [...this.state.dataSource];
  let unique_sizes = this.state.unique_sizes;
  const index = tempDataSource.findIndex((item) => row_index === item.key);
  const item = tempDataSource[index];
  item["size"].l = this.state.size_l;
  item["size"].h = this.state.size_h;
  item["size"].w = this.state.size_w;
  const row = tempDataSource[index];
  const _index = unique_sizes.findIndex(
   (size) =>
    size.l === this.state.size_l &&
    size.w === this.state.size_w &&
    size.h === this.state.size_h
  );
  if (_index === -1) {
   unique_sizes.push({
    l: this.state.size_l,
    w: this.state.size_w,
    h: this.state.size_h,
   });
  }
  tempDataSource.splice(index, 1, { ...item, ...row });
  this.setState({
   dataSource: tempDataSource,
   size_modal: false,
   unique_sizes,
  });
 };

 AddPriceToOption = (row_index) => {
  const tempDataSource = [...this.state.dataSource];
  let unique_prices = this.state.unique_prices;
  const index = tempDataSource.findIndex((item) => row_index === item.key);
  const item = tempDataSource[index];
  item.price = this.state.price;
  const row = tempDataSource[index];
  tempDataSource.splice(index, 1, { ...item, ...row });

  const _index = unique_prices.findIndex(
   (p) => Number(p) === Number(this.state.price)
  );
  if (_index === -1) {
   unique_prices.push(this.state.price);
  }

  this.setState({
   dataSource: tempDataSource,
   price_modal: false,
   unique_prices,
  });
 };

 //edit option picture modal
 handleAddCover = (row_key, covers) => {
  console.log(covers);
  const boxes = [];
  this.setState({
   cover_preview: "",
  });
  for (let i = covers?.length; i < 6; i++) {
   boxes.push({
    src: null,
    cropping_data: {},
    cover_id: null,
   });
  }
  this.setState(
   {
    covers_modal: true,
    active_covers: covers,
    modal_covers: [...covers, ...boxes],
    editing_row: row_key,
    modalCovers: covers,
    modalUploadBoxes: boxes,
   },
   () => {
    console.log(covers, this.state.modal_covers, boxes);
    this.setState({
     modalUploadBoxes: boxes,
    });
   }
  );
 };
 handleEditCover = (row_key, covers) => {
  console.log(covers);
  this.setState({
   cover_preview: covers[0]?.src,
  });
  const boxes = [];
  for (let i = covers?.length; i < 6; i++) {
   boxes.push({
    src: null,
    cropping_data: {},
    cover_id: null,
   });
  }
  this.setState({
   covers_modal: true,
   active_covers: covers,
   modal_covers: [...covers, ...boxes],
   editing_row: row_key,
   modalUploadBoxes: boxes,
   modalCovers: covers,
  });
 };

 //remove pic from product add picture modal
 removePiceFromOption = (cover_id, tab_index) => {
  let tempCovers = this.state.modal_covers;
  //   tempCovers.map((cover) => {
  tempCovers.forEach((cover) => {
   if (cover.cover_id === cover_id) {
    tempCovers[tab_index] = {
     cover_id: "",
     src: "",
     cropping_data: {},
     loaded: 0,
    };
   }
  });
  this.setState({ modal_covers: tempCovers });
 };

 handleAddOrUpdatePicture = (row_index) => {
  const tempDataSource = [...this.state.dataSource];
  const index = tempDataSource.findIndex((item) => row_index === item.key);
  const item = tempDataSource[index];
  // item["covers"] = this.state.modal_covers;
  item["covers"] = this.state.modalCovers;

  const row = tempDataSource[index];
  tempDataSource.splice(index, 1, { ...item, ...row });
  this.setState({
   dataSource: tempDataSource,
   covers_modal: false,
  });
 };

 handleUploadCovers = (e) => {
  const uploadedCovers = this.state.modalCovers;
  const files = Object.values(e.target.files).slice(
   0,
   6 - uploadedCovers.length
  );

  console.log(files);
  let newUploaded = files?.map((file) => {
   return {
    src: URL.createObjectURL(file),
    _src: URL.createObjectURL(file),
    preview: URL.createObjectURL(file),
    loaded: 0,
    file,
   };
  });

  console.log(newUploaded);
  this.setState(
   {
    modalCovers: [...this.state.modalCovers, ...newUploaded],
   },
   () => {
    this.setState({
     modalUploadBoxes: this.state.modalUploadBoxes.slice(
      this.state.modalCovers.length - 6,
     ),
     cover_preview:newUploaded[0]?.preview||newUploaded[0]._src||newUploaded[0].src
    });
    this.uploadCovers(this.state.modalCovers);
   }
  );
 };

 uploadCovers = (covers) => {
  const modalCovers = covers;
  covers.forEach((cover, index) => {
   if (cover.file) {
    const options = {
     onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      console.log(`${loaded} kb of ${total} | ${percent}%`);
      if (percent <= 100) {
       modalCovers[index].loaded = percent;
       this.setState({
        modalCovers,
       });
      }
     },
    };
    const fd = new FormData();
    fd.append("photo", cover.file);
    axios.post(`${API}photo`, fd, options).then((response) => {
     console.log(response);
     modalCovers[index].file = null;
     modalCovers[index].src = response.data.path;
     modalCovers[index]._src = response.data.path;
    });
    this.setState({
     modalCovers,
    });
   }
  });
 };
 replaceCover = (e, index) => {
  const modalCovers = this.state.modalCovers;
  const file = e.target.files[0];
  modalCovers[index].src = URL.createObjectURL(file);
  modalCovers[index]._src = URL.createObjectURL(file);
  modalCovers[index].preview = URL.createObjectURL(file);
  modalCovers[index].file = file;
  const options = {
   onUploadProgress: (progressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    console.log(`${loaded} kb of ${total} | ${percent}%`);
    if (percent <= 100) {
     modalCovers[index].loaded = percent;
     this.setState({
      modalCovers,
      cover_preview: modalCovers[index]?.preview ||  modalCovers[index]._src || modalCovers[index].src
     });
    }
   },
  };
  const fd = new FormData();
  fd.append("photo", file);
  axios.post(`${API}photo`, fd, options).then((response) => {
   modalCovers[index].src = response.data.path;
   modalCovers[index]._src = response.data.path;
   modalCovers[index].file = null;
   this.setState({
    modalCovers,
   });
  });
 };
 componentDidMount() {
  console.log(this.props);
  if (this.props.rows?.length < 1) {
  }

  //   this.props.rows.map((item, index) => {
  this.props.rows.forEach((item, index) => {
   this.setState(
    (prevState) => ({
     items: [
      ...prevState.items,
      {
       key: index,
       option_id: item.id,
       covers: item?.covers,
       material:
        item.material?.name !== "null"
         ? item.material
         : { name: null, image: null },
       code: item.code !== "null" ? item.code : null,
       price: item.price,
       offer_price: item.offer_price,
       quantity:
        item.quantity && item.quantity !== "null" ? item.quantity : null,
       size:
        item.size.l + item.size.h + item.size.w > 0
         ? item.size
         : { l: null, h: null, w: null },
      },
     ],
    }),
    () => {
     this.setState({
      dataSource: this.state.items,
      count: this.state.items?.length - 1,
     });
    }
   );
  });
 }

 onSelectChange = (selectedRowKeys) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  this.setState({ selectedRowKeys });
 };

 // new delete option api
 handleDelete = (key, option_id) => {
  const dataSource = [...this.state.dataSource];
  if (option_id) {
   axios
    .post(`${API}product/delete/option/${option_id}`)
    .then((response) => {
     console.log(response);
     this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
     });
    })
    .catch((err) => {
     console.log(err);
    });
  } else {
   this.setState({
    dataSource: dataSource.filter((item) => item.key !== key),
   });
  }

  console.log(dataSource);
 };

 async saveAndContinue() {
  this.setState({ loading: true });

  this.props.dispatchResetPrices();
  this.props.dispatchResetCodes();

  let _previews = [];
  for (let row of this.state.dataSource) {
   if (!row) continue;
   await this.saveRow(row);
   _previews.push(...row.covers);
  }

  // this.props.dispatchNextStep();
  this.props.dispatchSaveOptions(this.state.dataSource);
  this.setState({ loading: false });
 }

 saveRow = async (row) => {
  const formData = new FormData();
  formData.append(`option_id`, row.option_id);
  formData.append(`material_image`, row.material.image);
  formData.append(`material_name`, row.material.name);
  formData.append(`covers`, JSON.stringify(row.covers));
  formData.append(`price`, Number(row.price));
  formData.append(`offer_price`, Number(row.offer_price));
  formData.append(`size_l`, Number(row.size.l));
  formData.append(`size_w`, Number(row.size.w));
  formData.append(`size_h`, Number(row.size.h));
  formData.append(`code`, row.code);
  formData.append(`quantity`, row.quantity);

  this.addPriceForPreview(Number(row.price), row.code);
  row.covers?.forEach((cover) => {
   this.props.dispatchAddOptionsforPreview({
    src: cover.src,
    data: cover?.cropping_data,
   });
  });
  return await axios
   .post(`${API}upcrop/${this.props.id}`, formData, {})
   .then((response) => {
    console.log(response);
    const tempDataSource = [...this.state.dataSource];
    const index = tempDataSource.findIndex((item) => row.key === item.key);
    const item = tempDataSource[index];
    item["option_id"] = response.data?.option?.id;
    const _row = tempDataSource[index];
    tempDataSource.splice(index, 1, { ...item, ..._row });
    // row['option_id']= response.data.option.id
   });
 };

 addPriceForPreview = (price, code) => {
  this.props.dispatchPricesForPreview(price);
  this.props.dispatchModalCodesForFileUpload(code);
 };
 handleAdd = () => {
  console.log(this.props.id);
  const { count, dataSource } = this.state;
  const newData = {
   key: count + 1,
   code: null,
   covers: [],
   size: {
    l: null,
    h: null,
    w: null,
   },
   price: null,
   offer_price: null,
   material: {
    name: null,
    image: null,
   },
   quantity: null,
   option_id: null,
  };
  this.setState({
   dataSource: [...dataSource, newData],
   count: count + 1,
  });
  console.log(this.state.dataSource);
 };
 sizeExceeded = () => {
  toast.error("Maximum size allowed is 1MB", {
   position: "bottom-center",
   autoClose: 1500,
   progress: undefined,
   theme: "colored",
   transition: Flip,
  });
 };
 handleUploadMaterialImage = (e) => {
  let file = e.target.files[0];
  if (!file) return;
  if (file.size > 1048576 * 1.5) {
   console.log("Size is to Large");
   this.sizeExceeded();

   return;
  } else {
   this.setState({ adding_material: true });
   const fd = new FormData();
   this.setState({ material_image: URL.createObjectURL(file) });
   fd.append("photo", file);
   axios.post(`${API}photo`, fd).then((response) => {
    this.setState({
     material_image: response.data.path,
     adding_material: false,
    });
   });
  }
 };

 handleSave = (row) => {
  const newData = [...this.state.dataSource];
  const index = newData.findIndex((item) => row.key === item.key);
  const item = newData[index];
  newData.splice(index, 1, { ...item, ...row });
  this.setState({
   dataSource: newData,
  });
  console.log(row);
 };

 render() {
  const { selectedRowKeys, dataSource } = this.state;
  const rowSelection = {
   selectedRowKeys,
   onChange: this.onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const components = {
   body: {
    row: EditableRow,
    cell: EditableCell,
   },
  };
  const columns = this.columns.map((col) => {
   if (!col.editable) {
    return col;
   }

   return {
    ...col,
    onCell: (record) => ({
     record,
     editable: col.editable,
     dataIndex: col.dataIndex,
     title: col.title,
     handleSave: this.handleSave,
    }),
   };
  });
  return (
   <React.Fragment>
    <div className="step-form">
     <div
      className="next-wrapper"
      style={{
       top: "80px",
      }}
     >
      <div
       className="next-inner"
       style={{
        maxWidth: "1010px",
       }}
      >
       <button
        className="next-btn"
        style={{
         top: "-110px",
         backgroundColor: this.state.loading ? "#898989" : "",
        }}
        onClick={this.saveAndContinue.bind(this)}
       >
        {this.state.loading ? (
         <ClipLoader style={{ height: "20px" }} color="#ffffff" size={20} />
        ) : (
         "Save & Continue"
        )}
       </button>
      </div>
     </div>
     <div className="step-head">
      <h5
       style={{
        minHeight: "51px",
       }}
      >
       Options & Price
      </h5>
     </div>
     <div className="options-wrapper">
      <div>
       <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Selected ${selectedRowKeys?.length} Options` : ""}
       </span>
       <Table
        className="option-table"
        bordered={false}
        pagination={false}
        components={components}
        rowClassName="editable-row"
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
       />
       <div className="add-option-btn" onClick={this.handleAdd}>
        <div className="icon">
         <FaPlus />
        </div>
        <div className="under-link">Add Option</div>
       </div>

       <>
        {/* offer modal */}

        <Modal
         id="offer_modal"
         className="arch-wide-modal product-modal"
         size="lg"
         show={this.state.pics_modal}
         onHide={() => this.setState({ pics_modal: false })}
         aria-labelledby="example-modal-sizes-title-lg"
        >
         <Modal.Header closeButton></Modal.Header>
         <Modal.Body>
          <div className="option-add-label">Offer Price</div>
          <form>
           <FormB.Row>
            <FormB.Group as={Col} md={8} controlId="formGridState">
             <FormB.Control
              type="number"
              value={this.state.tempCover}
              onChange={(e) => {
               this.setState({ tempCover: e.target.value });
              }}
             />
             <span className="currency">¥</span>
            </FormB.Group>
           </FormB.Row>
           <div as={Row}>
            <div column md={12}>
             <div className="option-tip">
              Tips: Initial price must be higher than offer price
             </div>
             <div>{this.state.active_covers}</div>
            </div>
           </div>
           <div as={Row} className="add-btn">
            <div column md={12}>
             <BButton
              variant="danger"
              onClick={(e) => {
               e.preventDefault();
               this.setState({ pics_modal: false });
               this.handleSave({ key: "1", age: this.state.tempCover });
               console.log(this.state.tempCover);
              }}
             >
              Click
             </BButton>
            </div>
           </div>
          </form>
         </Modal.Body>
        </Modal>

        {/* pic modal */}
        <>
         <Modal
          id="price-request-modal"
          className="arch-wide-modal product-modal pics-modal covers-modal"
          size="lg"
          show={this.state.covers_modal}
          onHide={() => this.setState({ covers_modal: false })}
          aria-labelledby="example-modal-sizes-title-lg"
         >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
           <div className="option-add-label">Product Picuters</div>
           <div className="sub-head">
            Choose the corresponding view of the photo you want to upload
           </div>
           <div
            className="cover-main-preview"
            style={{
             backgroundImage: `url(${this.state.cover_preview})`,
            }}
           >
            {/* MAIN PREIVEW */}
           </div>
           <div className="cover-previews-boxs">
            {this.state.modalCovers?.map((cover, index) => {
             return (
              <div
               className="cover-box"
               style={{
                backgroundImage: `url("${cover?.src || cover?.preview}")`,
               }}
               onClick={() => {
                this.setState({ cover_preview: cover.preview || cover?.src || cover?._src  });
               }}
              >
               {cover.file && cover.loaded < 100 && (
                <Progress
                 style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                 }}
                 type="circle"
                 percent={cover.loaded}
                 width={cover.loaded < 100 ? 35 : 1}
                 strokeWidth={12}
                 trailColor="#666666"
                 strokeColor="#fff"
                 success={{
                  percent: 0,
                  strokeColor: "transparent",
                 }}
                />
               )}
               {/* {cover.loaded >= 100 && !cover?.file && ( */}
               {cover.loaded >= 100 && (
                <div className="edit-cover-icon">
                 <FaPencilAlt />
                 <input
                  type="file"
                  onChange={(e) => this.replaceCover(e, index)}
                 />
                </div>
               )}
              </div>
             );
            })}
            {this.state.modalCovers?.length < 6 &&
             this.state.modalUploadBoxes?.map((box, index) => {
              return (
               <div className="cover-box">
                <UploadIcon index={this.state.modalCovers?.length + index} />
                <input
                 type="file"
                 multiple
                 onChange={(e) => this.handleUploadCovers(e)}
                />
               </div>
              );
             })}
           </div>
           <div className="sub-add-cover">
            <sub>Upload at least one picture of this option</sub>
           </div>
           <div className="modal-side">
            <button
             onClick={() => {
              this.handleAddOrUpdatePicture(this.state.editing_row);
             }}
            >
             ADD
            </button>
           </div>
          </Modal.Body>
         </Modal>
        </>
       </>

       <>
        {/* material modal */}

        <Modal
         id="price-request-modal"
         className="arch-wide-modal product-modal material-modal"
         size="lg"
         show={this.state.material_modal}
         onHide={() => this.setState({ material_modal: false })}
         aria-labelledby="example-modal-sizes-title-lg"
        >
         <Modal.Header closeButton />
         <Modal.Body>
          <div className="option-add-label">Material</div>
          <form
           onSubmit={(e) => {
            e.preventDefault();
            if (!this.state.adding_material) {
             this.AddMaterialToOption(this.state.editing_row);
            }
           }}
          >
           <div className="modal-upload">
            <div className="upload-box">
             {this.state.material_image ? (
              <img
               src={this.state.material_image}
               alt=""
               style={{ width: "80px", height: "80px" }}
              />
             ) : (
              <>
               <FaCloudUploadAlt />
               <input
                type="file"
                id="material-file"
                onChange={(e) => this.handleUploadMaterialImage(e)}
               />
              </>
             )}
             <p>Upload Picture</p>
            </div>
           </div>
           <FormB.Row>
            <FormB.Group as={Col} md={12} controlId="formGridState">
             <FormB.Control
              placeholder="Material's Name"
              value={this.state.material_name}
              onChange={(e) => this.setState({ material_name: e.target.value })}
             />
            </FormB.Group>
           </FormB.Row>
           <div as={Row} className="add-btn">
            <div column md={12}>
             <BButton variant="danger" type="submit">
              {this.state.adding_material ? (
               <ClipLoader
                style={{ height: "20px" }}
                color="#ffffff"
                loading={this.state.adding_material}
                size={20}
               />
              ) : (
               "Add Material"
              )}
             </BButton>
            </div>
           </div>
          </form>
         </Modal.Body>
        </Modal>
       </>
       <>
        {/* price modal */}

        <Modal
         id="price_modal"
         className="arch-wide-modal product-modal"
         size="lg"
         show={this.state.price_modal}
         onHide={() => this.setState({ price_modal: false })}
         aria-labelledby="example-modal-sizes-title-lg"
        >
         <Modal.Header closeButton></Modal.Header>
         <Modal.Body>
          <div className="option-add-label">Price</div>
          <form
           onSubmit={(e) => {
            e.preventDefault();
            this.AddPriceToOption(this.state.editing_row);
           }}
          >
           <FormB.Row>
            <FormB.Group as={Col} md={8} controlId="formGridState">
             <FormB.Control
              type="number"
              value={this.state.price <= 0 ? "" : this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
             />
             <span className="currency">¥</span>
            </FormB.Group>
           </FormB.Row>
           <div as={Row}>
            <div column md={12}>
             <div className="option-tip">
              Tips: Initial price must be higher than offer price
             </div>
            </div>
           </div>
           <div as={Row} className="add-btn">
            <div column md={12}>
             <BButton variant="danger" type="submit">
              Add Price
             </BButton>
            </div>
           </div>
          </form>
         </Modal.Body>
        </Modal>

        {/* size modal */}

        <Modal
         id="size_modal"
         className="arch-wide-modal product-modal"
         size="lg"
         show={this.state.size_modal}
         onHide={() => this.setState({ size_modal: false })}
         aria-labelledby="example-modal-sizes-title-lg"
        >
         <Modal.Header closeButton></Modal.Header>
         <Modal.Body>
          <div className="option-add-label">Add Size</div>
          <form
           onSubmit={(e) => {
            e.preventDefault();
            this.AddSizeToOption(this.state.editing_row);
           }}
          >
           <FormB.Row>
            <FormB.Group as={Col} controlId="formGridState">
             <span md={2}>L: </span>
             <FormB.Control
              type="number"
              md={10}
              value={this.state?.size_l}
              onChange={(e) => this.onSizeInput("l", e)}
             />
            </FormB.Group>
            <FormB.Group as={Col} controlId="formGridState">
             <span>W: </span>
             <FormB.Control
              type="number"
              value={this.state?.size_w}
              onChange={(e) => this.onSizeInput("w", e)}
             />
            </FormB.Group>
            <FormB.Group as={Col} controlId="formGridState">
             <span>H: </span>
             <FormB.Control
              type="number"
              value={this.state?.size_h}
              onChange={(e) => this.onSizeInput("h", e)}
             />
            </FormB.Group>
           </FormB.Row>
           <div as={Row}>
            <div column md={12}>
             <div className="option-tip">Tips: add the size in mm</div>
            </div>
           </div>
           <div as={Row} className="add-btn">
            <div column md={12}>
             <BButton variant="danger" type="submit">
              Add Size
             </BButton>
            </div>
           </div>
          </form>
         </Modal.Body>
        </Modal>
       </>
      </div>
     </div>
    </div>
   </React.Fragment>
  );
 }
}

const mapDispatchToProps = (dispatch) => ({
 dispatchNextStep: () => dispatch(nextTab()),
 dispatchAddOptionsforPreview: (rows) => dispatch(addOptionAction(rows)),
 dispatchPricesForPreview: (price) => dispatch(addProductPrices(price)),
 dispatchSaveOptions: (options) => dispatch(saveOptions(options)),
 dispatchModalCodesForFileUpload: (code) =>
  dispatch(addProductModalCodes(code)),
 dispatchResetPrices: () => dispatch(resetProductPrices()),
 dispatchResetCodes: () => dispatch(resetProductModalCodes()),
});
const mapStateToProps = (state) => {
 return {
  options: state.addProduct.options,
  options_covers: state.addProduct?.covers,
 };
};
export default connect(mapStateToProps, mapDispatchToProps)(OptionsStep);
