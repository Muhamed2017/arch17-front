import React, { Component } from "react";
import { Button, Modal, Input, Form, Row, Col, Select, Spin } from "antd";
import ReactFlagsSelect from "react-flags-select";
import { customLabels } from "../pages/CreateBrandFinish";
import PhoneInput from "react-phone-input-2";
import { CSVLink } from "react-csv";
import { currency } from "../contexts/currencies";
import ViewVendorModal from "./ViewVendorModal";
import {
  LoadingOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  DownloadOutlined,
  CloseCircleOutlined,
  CaretDownOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { regionNames } from "./../redux/constants";

import axios from "axios";
import { API } from "../utitlties";
import "react-phone-input-2/lib/style.css";

import "./pom.css";

const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
const headers = [
  { label: "Name", key: "name" },
  { label: "Currency", key: "currency" },
  { label: "Country", key: "country" },
  { label: "City", key: "city" },
  { label: "Attn", key: "attn" },
  { label: "Phone", key: "phone" },
  { label: "Bank Account", key: "bank_account" },
  { label: "Products/Services", key: "products" },
  { label: "Total Order Value", key: "total" },
];
class SupplierList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add_modal: false,
      country: "",
      code: 86,
      phone: "",
      selectedTypes: "",
      supplier_rows: [],
      country_filter: "",
      products_filter: "",
      loading: true,
      supplier_rows: [],
      search_text_value: "",
      entity_id: this.props.entity_id,
      entity_name: this.props.entity_name,
      name_filter:"",
      cvData: [],
    };
  }

  openSupplierListAddModal = () => {
    this.setState({
      add_modal: true,
    });
  };

  handleTypesChange = (selectedTypes) => {
    this.setState({ selectedTypes }, () => {
      console.log(this.state.selectedTypes);
    });
  };

  handleDeleteSupplier = (id) => {
    axios.post(`${API}supplier-list-delete/${id}`).then((response) => {
      console.log(response);
      this.setState({
        supplier_rows: this.state.supplier_rows?.filter((r) => {
          return r.id !== id;
        }),
      });
    });
  };

  onFinish = (values) => {
    values["country"] = this.state.country;
    values["phone"] = this.state.phone;
    values["code"] = this.state.code;
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("currency", values.currency);
    fd.append("country", values.country);
    fd.append("city", values.city);
    fd.append("address", values.address);
    fd.append("email", values.email);
    fd.append("attn", values.attn);
    values["products"]?.forEach((p) => {
      fd.append("products[]", p);
    });
    fd.append("bank_account", values.bank_account);
    fd.append("code", values.code);
    fd.append("phone", values.phone);
    axios
      .post(
        `${API}add-supplier-list/${this.state.entity_name}/${this.state.entity_id}`,
        fd
      )
      .then((response) => {
        values["id"] = response.data.supplier.id;
        this.setState(
          {
            supplier_rows: [...this.state.supplier_rows, values],
          },
          () => {
            this.setState({
              add_modal: false,
            });
          }
        );
      });
  };

  getData = async () => {
    // let api_endpoint;
    // if(this.state.entity_name==='company'){
    //   api_endpoint=`user-`
    // }
    await axios
      .get(
        `${API}${this.state.entity_name}-suppliers-list/${this.state.entity_id}`
      )
      .then((response) => {
        this.setState(
          {
            supplier_rows: response.data.suppliers,
            _products: response.data.suppliers?.map((s) => {
              return s.products;
            }),
          },
          () => {
            this.setState({
              products_options: [...new Set(this.state._products?.flat())],
            });
          }
        );
      });
  };

  componentDidMount() {
    this.getData().then(() => {
      this.setState({
        loading: false,
      });
    });
  }
  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.supplier_to_delete?.name}  factory? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        const id = this.state.supplier_to_delete?.id;
        axios.post(`${API}supplier-list-delete/${id}`).then((response) => {
          console.log(response);
          this.setState({
            supplier_rows: this.state.supplier_rows?.filter((r) => {
              return r.id !== id;
            }),
          });
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  onFinishEdit = (values) => {
    const id = this.state.supplier_to_edit?.id;
    values["phone"] = this.state.edited_phone;
    values["code"] = this.state.edited_code;
    values["country"] = this.state.edited_country;
    const fd = new FormData();
    const {
      name,
      city,
      country,
      attn,
      products,
      code,
      phone,
      bank_account,
      currency,
      address,
      email,
    } = values;
    console.log(values);
    fd.append("name", name);
    fd.append("phone", phone);
    fd.append("code", code);
    fd.append("currency", currency);
    fd.append("attn", attn);
    fd.append("bank_account", bank_account);
    fd.append("address", address);
    fd.append("email", email);
    fd.append("city", city);
    fd.append("country", country);
    values["products"]?.forEach((p) => {
      fd.append("products[]", p);
    });
    console.log(values);
    axios.post(`${API}edit-supplier/${id}`, fd).then((response) => {
      console.log(response);
      this.getData().then(() => {
        this.setState({
          edit_modal: false,
        });
      });
    });
  };
  productsChange = (products_filter) => {
    this.setState(
      {
        products_filter,
      },
      () => {
        this.filterList();
      }
    );
  };

  filterList = () => {
    const country_filter = this.state.country_filter;
    const products_filter = this.state.products_filter;
    const name_filter = this.state.name_filter;
    let endpoint_start= this.state.entity_name==='company'?"":'user-'
    axios
      .get(
        `${API}${endpoint_start}suppliers-filter/${this.state.entity_id}?filter[country]=${country_filter}&filter[products]=${products_filter}&filter[name]=${name_filter}`
      )
      .then((response) => {
        this.setState({
          supplier_rows: response.data.suppliers,
          loading: false,
        });
      });
  };
  handleSearchSuppliers = (e) => {
    console.log(e.target.value);
    this.setState(
      {
        search_text_value: e.target.value,
        name_filter: e.target.value,
      },
      () => {
        this.filterList();
      }
    );
  };
  render() {
    return (
      <>
        <div className="tables-page">
          {this.state.loading ? (
            <Spin
              size="large"
              indicator={
                <LoadingOutlined
                  style={{ fontSize: "36px", color: "#000" }}
                  spin
                />
              }
              style={{
                width: "100%",
                margin: "150px auto",
              }}
            />
          ) : (
            <>
              <div className="btns-actions">
                <button>
                  <CSVLink
                    data={this.state.cvData}
                    headers={headers}
                    asyncOnClick={true}
                    filename="All_Customers.csv"
                    onClick={(event, done) => {
                      this.setState(
                        {
                          cvData: this.state.supplier_rows?.map((row) => {
                            return {
                              name: row.name,
                              currency: row?.currency,
                              country: row?.country
                                ? regionNames.of(row?.country)
                                : "",
                              city: row?.city,
                              attn: row?.attn,
                              phone: row?.phone,
                              email: row?.email,
                              products: row?.products,
                              bank_account: row?.bank_account,
                              total: row?.total,
                            };
                          }),
                        },
                        () => {
                          console.log(this.state.cvData);
                          done();
                        }
                      );
                    }}
                  >
                    Download{" "}
                    <span>
                      <DownloadOutlined />
                    </span>
                  </CSVLink>
                </button>

                <button onClick={this.openSupplierListAddModal}>
                  Add Vendor +
                </button>
              </div>
              <div id="clientlis">
                <div
                  id="clinetlist-table"
                  className="clientlist-table pom-table suppliers-list"
                >
                  <div className="filters">
                    <Row align={"top"} justify={"space-between"} gutter={1}>
                      <Col md={17}>
                        <div className="list-head search-box">
                          <Input
                            autoFocus
                            id="search_clients"
                            size="large"
                            placeholder="Type to search vendors"
                            bordered={false}
                            value={this.state.search_text_value}
                            suffix={
                              this.state.search_text_value?.length > 0 && (
                                <CloseCircleOutlined
                                  onClick={() => {
                                    this.setState(
                                      {
                                        search_text_value: "",
                                        name_filter: "",
                                      },
                                      () => {
                                        this.filterList();
                                      }
                                    );
                                  }}
                                />
                              )
                            }
                            onChange={(e) => this.handleSearchSuppliers(e)}
                          />
                        </div>
                      </Col>

                      <Col md={3}>
                        <ReactFlagsSelect
                          placeholder="All Countries"
                          selected={this.state.country_filter}
                          selectedSize={13}
                          optionsSize={16}
                          searchable
                          customLabels={customLabels}
                          onSelect={(country_filter) => {
                            this.setState({ country_filter }, () => {
                              this.filterList();
                            });
                          }}
                        />
                        {this.state.country_filter && (
                          <p
                            className="reset-contry"
                            onClick={() => {
                              this.setState({ country_filter: "" }, () => {
                                this.filterList();
                              });
                            }}
                          >
                            <CloseCircleOutlined />
                          </p>
                        )}
                      </Col>
                      <Col md={4}>
                        <Select
                          className="right  px-0"
                          bordered={false}
                          size="large"
                          suffixIcon={<CaretDownOutlined />}
                          placeholder="All Products/Services"
                          style={{
                            width: "190px",
                          }}
                          value={this.state.products_filter}
                          onChange={this.productsChange}
                        >
                          <Option value="">All Products/Services</Option>
                          {this.state.products_options?.map((p) => {
                            return (
                              <>
                                <Option value={p}>{p}</Option>
                              </>
                            );
                          })}
                        </Select>
                      </Col>
                    </Row>
                  </div>
                  <div className="table-wrapper">
                    <table id="client-lists">
                      <tr>
                        <th className="width-250">Name, Currency</th>
                        <th className="width-100">Country, City</th>
                        <th className="width-150">Contacts</th>
                        {/* <th className="width-250">Bank Account</th> */}
                        <th className="width-200">Products/Services</th>
                        <th className="width-150">Total Orders Value</th>
                      </tr>
                      {this.state.supplier_rows?.map((row, index) => {
                        return (
                          <tr className="white light-hover">
                            <td>
                              <div className="edit-delete">
                                <Row gutter={5}>
                                  <Col md={6}>
                                    <EyeOutlined
                                      onClick={() => {
                                        this.setState(
                                          {
                                            vendor_to_view: row,
                                          },
                                          () => {
                                            this.setState({
                                              view_modal: true,
                                            });
                                          }
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col md={6}>
                                    <CSVLink
                                      data={this.state.cvData}
                                      filename={`${row?.name}_Supplier.csv`}
                                      headers={headers}
                                      asyncOnClick={true}
                                      onClick={(event, done) => {
                                        this.setState(
                                          {
                                            cvData: [
                                              {
                                                name: row.name,
                                                currency: row?.currency,
                                                country: row?.country
                                                  ? regionNames.of(row?.country)
                                                  : "",
                                                city: row?.city,
                                                attn: row?.attn,
                                                phone: row?.phone,
                                                email: row?.email,
                                                products: row?.products,
                                                bank_account: row?.bank_account,
                                                total: row?.total,
                                              },
                                            ],
                                          },
                                          () => {
                                            console.log(this.state.cvData);
                                            done();
                                          }
                                        );
                                      }}
                                    >
                                      <span>
                                        <DownloadOutlined />
                                      </span>
                                    </CSVLink>
                                  </Col>
                                  <Col md={6}>
                                    <EditOutlined
                                      onClick={() => {
                                        this.setState(
                                          {
                                            row_index: index,
                                            supplier_to_edit: row,
                                          },
                                          () => {
                                            this.setState(
                                              {
                                                edit_modal: true,
                                              },
                                              () => {
                                                this.setState({
                                                  edited_country: row?.country,
                                                  edited_code: row?.code,
                                                  edited_phone: row.phone,
                                                });
                                              }
                                            );
                                          }
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col md={6}>
                                    <DeleteOutlined
                                      onClick={() => {
                                        this.setState(
                                          {
                                            supplier_to_delete: row,
                                          },
                                          () => {
                                            this.deleteModal();
                                          }
                                        );
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </div>
                              <p className="sale">{row.name}</p>
                              <p className="sec">{row?.currency}</p>
                            </td>
                            <td>
                              {row?.country && (
                                <>
                                  <p className="main">
                                    {row?.country &&
                                      row?.country?.length < 4 && (
                                        <> {regionNames?.of(row?.country)}</>
                                      )}
                                  </p>
                                  <p className="sec">{row.city}</p>
                                </>
                              )}
                            </td>
                            <td>
                              {row?.attn && row?.attn != "null" && (
                                <p className="main">{row.attn}</p>
                              )}
                              {row?.phone && row?.phone != "null" && (
                                <p className="sec">{`+ ${row.phone}`}</p>
                              )}
                              {row?.email && row?.email != "null" && (
                                <p className="sec">{`${row.email}`}</p>
                              )}
                            </td>
                            {/* <td>
                              <p className="main">{row.bank_account}</p>
                            </td> */}
                            <td>
                              {row.products?.map((p) => {
                                return (
                                  <p className="main">
                                    - <span>{p}</span>
                                    <br />
                                  </p>
                                );
                              })}
                            </td>
                            <td>
                              {" "}
                              <p className="main">
                                {Number(row?.total)?.toLocaleString()}
                              </p>
                              <p className="sec">{row?.currency}</p>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
              <Modal
                centered
                destroyOnClose
                footer={false}
                className="file-modal border-radius"
                open={this.state.add_modal}
                onCancel={() => {
                  this.setState({
                    add_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Add Supplier</p>
                <Form onFinish={this.onFinish} size="large" layout="vertical">
                  <Form.Item name="name" label="Name">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                  <Form.Item
                    label="Currency"
                    name="currency"
                    className="form-label mb-4"
                  >
                    <Select
                      showSearch
                      placeholder="Please select Currency"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {currency.map((p) => {
                        return (
                          <>
                            <Option value={p.code}>{p.code}</Option>
                          </>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Row gutter={10} className="country-city">
                    <Col md={12}>
                      <div className="ant-form-item-label">
                        <label>Country, city</label>
                      </div>
                      <Form.Item>
                        <ReactFlagsSelect
                          selected={this.state.country}
                          selectedSize={12}
                          optionsSize={14}
                          searchable
                          customLabels={customLabels}
                          placeholder="Country *"
                          onSelect={(code) => {
                            this.setState({ country: code });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <span style={{ visibility: "hidden" }}>city</span>

                      <Form.Item name="city">
                        <Input placeholder="City *" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Add" name="address">
                    <TextArea placeholder="Address" rows={2} />
                  </Form.Item>
                  <Form.Item className="mb-5" label="Attn" name="attn">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                  <PhoneInput
                    specialLabel="Phone"
                    enableSearch
                    value={this.state.phone}
                    onChange={(phone, code) =>
                      this.setState({ phone, code: code?.dialCode }, () => {})
                    }
                  />
                  <Form.Item name="email" label="E-mail">
                    <Input placeholder="input email" type="email" />
                  </Form.Item>
                  <Form.Item label="Bank Account" name="bank_account">
                    <TextArea placeholder="bank acc" rows={2} />
                  </Form.Item>
                  <Form.Item
                    name="products"
                    label="Products/Services"
                    className="form-label mb-4"
                    rules={[
                      {
                        required: true,
                        message: "One Service at least is required!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      mode="tags"
                      onChange={this.handleTypesChange}
                      value={this.state.selectedTypes}
                      placeholder="Please select Types"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {this.state.products_options?.map((p) => {
                        return <Option value={p}>{p}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                  <Row justify={"end"}>
                    <Col>
                      <Button htmlType="submit" className="arch-btn">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal>
              <Modal
                centered
                destroyOnClose
                footer={false}
                className="file-modal border-radius"
                open={this.state.edit_modal}
                onCancel={() => {
                  this.setState({
                    edit_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Edit Supplier</p>
                <Form
                  onFinish={this.onFinishEdit}
                  size="large"
                  layout="vertical"
                >
                  <Form.Item
                    name="name"
                    label="Name"
                    initialValue={this.state.supplier_to_edit?.name}
                  >
                    <Input placeholder="input Name" />
                  </Form.Item>
                  <Form.Item
                    label="Currency"
                    name="currency"
                    initialValue={this.state.supplier_to_edit?.currency}
                    className="form-label mb-4"
                  >
                    <Select
                      showSearch
                      value={this.state.selectedCurrency}
                      placeholder="Please select Currency"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {currency.map((p) => {
                        return (
                          <>
                            <Option value={p.code}>{p.code}</Option>
                          </>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Row gutter={10} className="country-city">
                    <Col md={12}>
                      <div className="ant-form-item-label">
                        <label>Country, city</label>
                      </div>
                      <Form.Item>
                        <ReactFlagsSelect
                          selected={this.state.edited_country}
                          selectedSize={12}
                          optionsSize={14}
                          searchable
                          customLabels={customLabels}
                          placeholder="Country *"
                          onSelect={(code) => {
                            this.setState({ edited_country: code });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12}>
                      <span style={{ visibility: "hidden" }}>city</span>
                      <Form.Item
                        name="city"
                        initialValue={this.state.supplier_to_edit?.city}
                      >
                        <Input placeholder="City " />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    label="Add"
                    name="address"
                    initialValue={this.state.supplier_to_edit?.address}
                  >
                    <TextArea placeholder="Address" rows={2} />
                  </Form.Item>
                  <Form.Item
                    className="mb-5"
                    label="Attn"
                    name="attn"
                    initialValue={this.state.supplier_to_edit?.attn}
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                  <PhoneInput
                    specialLabel="Phone"
                    enableSearch
                    value={this.state.edited_phone}
                    onChange={(edited_phone, code) =>
                      this.setState(
                        { edited_phone, edited_code: code?.dialCode },
                        () => {}
                      )
                    }
                  />
                  <Form.Item
                    name="email"
                    label="E-mail"
                    initialValue={this.state.supplier_to_edit?.email}
                  >
                    <Input placeholder="input email" />
                  </Form.Item>
                  <Form.Item
                    label="Bank Account"
                    name="bank_account"
                    initialValue={this.state.supplier_to_edit?.bank_account}
                  >
                    <TextArea placeholder="bank acc" rows={2} />
                  </Form.Item>

                  <Form.Item
                    name="products"
                    label="Products/Services"
                    className="form-label mb-4"
                    initialValue={this.state.supplier_to_edit?.products}
                  >
                    <Select
                      showSearch
                      mode="tags"
                      onChange={this.handleTypesChange}
                      value={this.state.selectedTypes}
                      placeholder="Please select Types"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {[].map((p) => {
                        return <Option value={p}>{p}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                  <Row justify={"end"}>
                    <Col>
                      <Button htmlType="submit" className="arch-btn">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal>
              <Modal
                open={this.state.view_modal}
                centered
                destroyOnClose
                width={350}
                footer={false}
                className="file-modal border-radius"
                onCancel={() => {
                  this.setState({
                    view_modal: false,
                  });
                }}
              >
                <ViewVendorModal vendor={this.state.vendor_to_view} />
              </Modal>
            </>
          )}
        </div>
      </>
    );
  }
}

export default SupplierList;
