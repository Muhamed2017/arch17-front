import React, { Component } from "react";
import { Button, Modal, Input, Spin, Form, Row, Col, Select } from "antd";
import ReactFlagsSelect from "react-flags-select";
import { customLabels } from "../pages/CreateBrandFinish";
import { pom_client_list_types } from "../pages/addProduct/ProductClassifications";
import axios from "axios";
import { currency } from "../contexts/currencies";
import { CSVLink } from "react-csv";
import {
  LoadingOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import { regionNames } from "./../redux/constants";

import "./pom.css";
import { API } from "../utitlties";

const { Option } = Select;
const { confirm } = Modal;
const headers = [
  { label: "Name", key: "name" },
  { label: "Currency", key: "currency" },
  { label: "Country", key: "country" },
  { label: "City", key: "city" },
  { label: "Attn", key: "attn" },
  { label: "Phone", key: "phone" },
  { label: "E-mail", key: "email" },
  { label: "Type", key: "type" },
  { label: "Total Sell", key: "totalsell" },
];
class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add_modal: false,
      loading: true,
      country: "",
      code: "",
      phone: "",
      selectedTypes: "",
      edit_modal: false,
      client_rows: [],
      cvData: [],
      search_text_value: "",
      country_filter: "",
      entity_id: this.props.entity_id,
      entity_name: this.props.entity_name,
      client_with_currency: false,
    };
  }

  openClientListAddModal = () => {
    this.setState({
      add_modal: true,
      client_with_currency: false,
    });
  };

  handleTypesChange = (selectedTypes) => {
    this.setState({ selectedTypes }, () => {
      console.log(this.state.selectedTypes);
    });
  };

  handleDeleteClient = (id) => {
    axios.post(`${API}client-list-delete/${id}`).then((response) => {
      console.log(response);
      this.setState({
        client_rows: this.state.client_rows?.filter((r) => {
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
    fd.append("country", values.country);
    fd.append("city", values.city);
    fd.append("attn", values.attn);
    fd.append("type", values.type);
    fd.append("currency", values.currency);
    fd.append("email", values.email);
    fd.append("code", values.code);
    fd.append("phone", values.phone);
    axios
      .post(
        `${API}add-client-list/${this.state.entity_name}/${this.state.entity_id}`,
        fd
      )
      .then((response) => {
        if (response.data.code == 1) {
          values["id"] = response.data.client.id;
          this.setState(
            {
              client_rows: [...this.state.client_rows, values],
            },
            () => {
              this.setState({
                add_modal: false,
              });
            }
          );
        } else if (response.data.code == 2) {
          this.setState({
            client_with_currency: true,
          });
        }
      });
  };

  componentDidMount() {
    this.getData().then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  getData = async () => {
    await axios
      .get(
        `${API}${this.state.entity_name}-clients-list/${this.state.entity_id}`
      )
      .then((response) => {
        this.setState({
          client_rows: response.data.clients,
          // loading:false
        });
      });
  };

  onFinishEdit = (values) => {
    const id = this.state.client_to_edit?.id;
    values["phone"] = this.state.edited_phone;
    values["code"] = this.state.edited_code;
    values["country"] = this.state.edited_country;
    const fd = new FormData();
    const { name, city, country, attn, type, code, phone, email, currency } =
      values;
    fd.append("name", name);
    fd.append("phone", phone);
    fd.append("code", code);
    fd.append("type", type);
    fd.append("attn", attn);
    fd.append("email", email);
    fd.append("city", city);
    fd.append("currency", currency);
    fd.append("country", country);
    console.log(values);
    axios.post(`${API}edit-client/${id}`, fd).then((response) => {
      console.log(response);
      this.getData().then(() => {
        this.setState({
          edit_modal: false,
        });
      });
    });
  };

  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.client_to_delete?.name}  client? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        // console.log('OK');
        // handleDeleteClient(this.state.client_to_delete?.id)
        const id = this.state.client_to_delete?.id;
        axios.post(`${API}client-list-delete/${id}`).then((response) => {
          console.log(response);
          this.setState({
            client_rows: this.state.client_rows?.filter((r) => {
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

  filterList = () => {
    const { country_filter, search_text_value } = this.state;
    let endpoint_start= this.state.entity_name==='company'?"":'user-'
    this.setState({
    });
    axios
      .get(
        `${API}${endpoint_start}clients-filter/${this.state.entity_id}?filter[country]=${country_filter}&filter[name]=${search_text_value}`
      )
      .then((response) => {
        this.setState({
          client_rows: response.data.clients,
          loading: false,
        });
      });
  };

  handleSearchClients = (e) => {
    console.log(e.target.value);
    this.setState(
      {
        search_text_value: e.target.value,
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
                      cvData: this.state.client_rows?.map((row)=>{
                        return  {
                          name: row.name,
                          currency: row?.currency,
                          country: row?.country
                            ? regionNames.of(row?.country)
                            : "",
                          city: row?.city,
                          attn: row?.attn,
                          phone: row?.phone,
                          email: row?.email,
                          type: row?.type,
                          totalsell: row?.total,
                        }
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

            <button onClick={this.openClientListAddModal}>
              Add Customer +
            </button>
          </div>
          <div id="clientlis">
            <div id="clinetlist-table" className="clientlist-table pom-table">
              <div className="filters">
                <Row align={"top"} justify="space-between" gutter={25}>
                  <Col md={12}>
                    <div className="list-head search-box">
                      <Input
                        autoFocus
                        id="search_clients"
                        size="large"
                        placeholder="Type to search clients"
                        bordered={false}
                        value={this.state.search_text_value}
                        suffix={
                          this.state.search_text_value?.length > 0 && (
                            <CloseCircleOutlined
                              onClick={() => {
                                this.setState(
                                  {
                                    search_text_value: "",
                                  },
                                  () => {
                                    this.filterList();
                                  }
                                );
                              }}
                            />
                          )
                        }
                        onChange={(e) => this.handleSearchClients(e)}
                      />
                    </div>
                  </Col>
                  <Col md={4}>
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
                        {/* RESET */}
                        <CloseCircleOutlined />
                      </p>
                    )}
                  </Col>
                </Row>
              </div>
              {this.state.loading ? (
                <>
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
                </>
              ) : (
                <>
                  <table id="client-lists">
                    <tr>
                      <th className="width-300">Name, Currency</th>
                      <th className="width-250">Country, City</th>
                      <th className="width-250">Contacts</th>
                      <th className="width-250">Type</th>
                      <th className="width-200">Total sell</th>
                    </tr>

                    {this.state.client_rows?.map((row, index) => {
                      return (
                        <tr className="white light-hover">
                          <td>
                            <div className="edit-delete">
                              <Row gutter={5}>
                                <Col md={8}>
                                  <CSVLink
                                    data={this.state.cvData}
                                    filename={`${row?.name}_Customer.csv`}
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
                                              type: row?.type,
                                              totalsell:row?.total
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
                                <Col md={8}>
                                  <EditOutlined
                                    onClick={() => {
                                      this.setState(
                                        {
                                          row_index: index,
                                          client_to_edit: row,
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
                                <Col md={8}>
                                  <DeleteOutlined
                                    onClick={() => {
                                      this.setState(
                                        {
                                          client_to_delete: row,
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
                                  {regionNames?.of(row?.country)}
                                </p>
                                <p className="sec">{row.city}</p>
                              </>
                            )}
                          </td>
                          <td>
                            <p className="main">{row.attn}</p>
                            <p className="sec">{`+ ${row.phone}`}</p>
                            <p className="sec">{row.email}</p>
                          </td>
                          <td>
                            <p className="main">{row.type}</p>
                          </td>
                          <td>
                            <p className="main">{Number(row?.total)?.toLocaleString()}</p>
                            <p className="sec">{row?.currency}</p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </>
              )}
            </div>
          </div>
          <Modal
            footer={false}
            destroyOnClose
            centered
            className="file-modal border-radius"
            open={this.state.add_modal}
            onCancel={() => {
              this.setState({
                add_modal: false,
              });
            }}
            closable
          >
            <p className="modal-header">Add Client</p>
            <Form onFinish={this.onFinish} size="large" layout="vertical">
              <Form.Item name="name" label="Name">
                <Input
                  placeholder="input placeholder"
                  onChange={() => {
                    this.setState({
                      client_with_currency: false,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Currency"
                name="currency"
                className="form-label mb-4"
              >
                <Select
                  showSearch
                  onChange={() => {
                    this.setState({
                      client_with_currency: false,
                    });
                  }}
                  // onChange={this.handleCurrencyChange}
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
              {this.state.client_with_currency && (
                <p className="error">
                  Client has been already added with the same currency, please
                  change currency
                </p>
              )}
              <Row gutter={10}>
                <Col md={12}>
                  {/* <span>Country, city</span> */}
                  <div className="ant-form-item-label">
                    <label>Country, city</label>
                  </div>
                  <Form.Item>
                    <ReactFlagsSelect
                      selected={this.state.country}
                      selectedSize={14}
                      optionsSize={18}
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
                  {/* <span style={{ visibility: "hidden" }}>city</span> */}
                  <div
                    style={{ visibility: "hidden" }}
                    className="ant-form-item-label"
                  >
                    <label>Country, city</label>
                  </div>
                  <Form.Item
                    name="city"
                    // label=""
                    rules={[{ required: true, message: "city is required" }]}
                  >
                    <Input placeholder="City *" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Attn" name="attn">
                <Input placeholder="input placeholder" />
              </Form.Item>
              <PhoneInput
                specialLabel="Phone Number"
                enableSearch
                value={this.state.phone}
                onChange={(phone, code) =>
                  this.setState({ phone, code: code?.dialCode }, () => {})
                }
              />
              <Form.Item label="Email" name="email">
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="type"
                label="Types"
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
                  onChange={this.handleTypesChange}
                  value={this.state.selectedTypes}
                  placeholder="Please select Types"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {pom_client_list_types.map((p) => {
                    return (
                      <>
                        <Option value={p}>{p}</Option>
                      </>
                    );
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
            footer={false}
            destroyOnClose
            centered
            className="file-modal border-radius"
            open={this.state.edit_modal}
            onCancel={() => {
              this.setState({
                edit_modal: false,
              });
            }}
            // title="Add Client"
            closable
          >
            <p className="modal-header">Edit Client</p>
            <Form onFinish={this.onFinishEdit} size="large" layout="vertical">
              <Form.Item
                name="name"
                label="Name"
                initialValue={this.state.client_to_edit?.name}
              >
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item
                label="Currency"
                name="currency"
                initialValue={this.state.client_to_edit?.currency}
                className="form-label mb-4"
              >
                <Select
                  showSearch
                  // onChange={this.handleCurrencyChange}
                  value={this.state.selectedCurrency}
                  placeholder="Please select Currency"
                  // disabled
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
              <Row gutter={10}>
                <Col md={12}>
                  <span>Country, city</span>
                  <Form.Item>
                    <ReactFlagsSelect
                      // selected={this.state.client_to_edit?.country}
                      selected={this.state.edited_country}
                      selectedSize={14}
                      optionsSize={18}
                      searchable
                      customLabels={customLabels}
                      placeholder="Country"
                      onSelect={(code) => {
                        this.setState({ edited_country: code });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <span style={{ visibility: "hidden" }}>city</span>
                  <Form.Item
                    initialValue={this.state.client_to_edit?.city}
                    name="city"
                    // rules={[{ required: true, message: "city is required" }]}
                  >
                    <Input placeholder="City *" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Attn"
                name="attn"
                initialValue={this.state.client_to_edit?.attn}
              >
                <Input placeholder="input placeholder" />
              </Form.Item>

              {/* <Form.Item name="phone_number"
            initialValue={{
              short: 'cn',
            }}
            >
              <CountryPhoneInput
              placeholder="phone number"
                onChange={(e) =>
                  this.setState({ phone: e.phone, code: e.code })
                }
              />
            </Form.Item> */}
              <PhoneInput
                specialLabel="Phone"
                enableSearch
                value={this.state.edited_phone}
                // value={`${this.state.edited_code}${this.state.edited_phone}`}
                onChange={(edited_phone, code) =>
                  this.setState(
                    { edited_phone, edited_code: code?.dialCode },
                    () => {
                      console.log(this.state.edited_phone);
                      console.log(this.state.edited_code);
                    }
                  )
                }
              />
              <Form.Item
                label="Email"
                name="email"
                initialValue={this.state.client_to_edit?.email}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="type"
                className="form-label mb-4"
                initialValue={this.state.client_to_edit?.type}
                rules={[
                  {
                    // required: true,
                    // message: "One Service at least is required!",
                  },
                ]}
              >
                <Select
                  showSearch
                  // onChange={this.handleTypesChange}
                  // value={this.state.selectedTypes}
                  placeholder="Please select Types"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {pom_client_list_types.map((p) => {
                    return (
                      <>
                        <Option value={p}>{p}</Option>
                      </>
                    );
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
        </div>
      </>
    );
  }
}

export default ClientList;
