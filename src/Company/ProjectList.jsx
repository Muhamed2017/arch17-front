import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
  Spin,
  DatePicker,
} from "antd";
import ReactFlagsSelect from "react-flags-select";
import { customLabels } from "../pages/CreateBrandFinish";
import axios from "axios";
import { regionNames } from "./../redux/constants";
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
import ProjectListItem from "./ProjectListItem";
import moment from "moment";
import { API } from "../utitlties";
import { CSVLink } from "react-csv";
import "./pom.css";
import { currency } from "../contexts/currencies";

const { Option } = Select;
const { confirm } = Modal;

const headers = [
  { label: "Name", key: "name" },
  { label: "No", key: "pi_ci" },
  { label: "Customer", key: "client_name" },
  { label: "Country", key: "country" },
  { label: "City", key: "city" },
  { label: "Start Date", key: "start_date" },
  { label: "statue", key: "status" },
  { label: "Total Value", key: "total" },
  { label: "Currency", key: "currency" },
];

const bussiness_types = ["Sales & Purchases", "Sales Only", "Purchases Only"];

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add_modal: false,
      row_modal: false,
      country: "",
      project_id: null,
      selectedTypes: "",
      project_rows: [],
      client_filter: "",
      name_filter: "",
      status: "open",
      client_name: "",
      status_filter: "",
      search_text_value: "",
      year_filter: "",
      country_filter: "",
      client_filter: "",
      search_loading: false,
      start_date: "",
      loading: true,
      entity_name: this.props.entity_name,
      entity_id: this.props.entity_id,
      cvData: [],
      clients_option: [],
      share_modal: false,
    };
  }

  openProjectListAddModal = () => {
    this.setState({
      add_modal: true,
    });
  };

  handleTypesChange = (selectedTypes) => {
    this.setState({ selectedTypes }, () => {
      console.log(this.state.selectedTypes);
    });
  };

  handleDeleteProject = (id) => {
    axios.post(`${API}project-list-delete/${id}`).then((response) => {
      console.log(response);
      this.setState({
        project_rows: this.state.project_rows?.filter((r) => {
          return r.id !== id;
        }),
      });
    });
  };

  onFinish = (values) => {
    values["country"] = this.state.country;
    values["start_date"] = this.state.start_date;
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("country", values.country);
    fd.append("city", values.city);
    fd.append("business_type", values.business_type);
    fd.append("start_date", values.start_date);
    fd.append("base_currency", values.base_currency);
    fd.append("pi_ci", values.pi_ci);
    const clients = this.state.clients_option;
    const index = clients.findIndex(
      (client) => values.client_name == client.id
    );
    values["total"] = 0;

    if (values.business_type !== "Purchases Only") {
      values["client_name"] = clients[index]?.name;
      values["client_id"] = clients[index]?.id;
      values["currency"] = clients[index]?.currency;
    }
    if (values.business_type !== "Purchases Only") {
      fd.append("client_name", values?.client_name);
      fd.append("client_id", values?.client_id);
      fd.append("currency", values?.currency);
    }
    fd.append("status", "open");
    console.log(values);
    axios
      .post(
        `${API}add-project-list/${this.state.entity_name}/${this.state.entity_id}`,
        fd
      )
      .then((response) => {
        values["id"] = response.data.project.id;
        values["status"] = "open";
        this.setState(
          {
            project_rows: [...this.state.project_rows, values],
          },
          () => {
            this.setState({
              add_modal: false,
            });
          }
        );
      });
  };

  updateProjectStatus = (row, status) => {
    const fd = new FormData();
    fd.append("status", status);
    axios.post(`${API}project-list-update-status/${row?.id}`, fd).then((re) => {
      const rows = this.state.project_rows;
      const index = rows.findIndex((item) => row.id === item.id);
      rows[index].status = status;
      this.setState({
        project_rows: rows,
      });
    });
  };

  onChange = (d, start_date) => {
    console.log(d, start_date);
    this.setState({
      start_date,
    });
  };

  componentDidMount() {
    axios
      .get(
        `${API}${this.state.entity_name}-projects-list/${this.state.entity_id}`
      )
      .then((response) => {
        this.setState(
          {
            project_rows: response.data.projects,
            clients_option: response.data.clients,
            project_names: response.data.projects?.map((p) => {
              return p.name;
            }),
            loading: false,
          },
          () => {}
        );
      });
  }

  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.project_to_delete?.name}  project? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        const id = this.state.project_to_delete?.id;
        axios.post(`${API}project-list-delete/${id}`).then((response) => {
          console.log(response);
          this.setState({
            project_rows: this.state.project_rows?.filter((r) => {
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
    let endpoint_start = this.state.entity_name === "company" ? "" : "user-";
    const {
      year_filter,
      status_filter,
      country_filter,
      name_filter,
      client_filter,
    } = this.state;
    axios
      .get(
        `${API}${endpoint_start}projectlists-filter/${this.state.entity_id}?filter[status]=${status_filter}&filter[country]=${country_filter}&filter[name]=${name_filter}&filter[client_name]=${client_filter}&filter[start_date]=${year_filter}`
      )
      .then((response) => {
        this.setState({
          project_rows: response.data.projects,
          loading: false,
          search_loading: false,
        });
      });
  };

  filterStatus = (status_filter) => {
    this.setState(
      {
        status_filter,
      },
      () => {
        this.filterList();
      }
    );
  };

  statusChange = (status_filter) => {
    this.setState(
      {
        status_filter: status_filter ?? "",
      },
      () => {
        this.filterList();
        console.log(status_filter);
      }
    );
  };
  onYearChange = (d, year_filter) => {
    console.log(d);

    this.setState(
      {
        year_filter,
      },
      () => {
        this.filterList();
      }
    );
  };
  onChangeEdit = (d, start_date_edit) => {
    console.log(d, start_date_edit);
    this.setState({
      start_date_edit,
      edited_date: start_date_edit,
    });
  };

  onFinishEdit = (values) => {
    const id = this.state.project_to_edit?.id;
    const fd = new FormData();

    values["country"] = this.state.edited_country;

    values["start_date"] = this.state.edited_date;
    fd.append("name", values.name);
    fd.append("country", values.country);
    fd.append("business_type", values.business_type);
    fd.append("city", values.city);
    fd.append("start_date", values.start_date);
    fd.append("pi_ci", values.pi_ci);
    fd.append("base_currency", values.base_currency);

    const clients = this.state.clients_option;
    const _index = clients.findIndex(
      (client) => values.client_name == client.id
    );
    if (values.business_type !== "Purchases Only") {
      values["currency"] = clients[_index]?.currency;
      fd.append("client_name", clients[_index]?.name);
      fd.append("client_id", values.client_name);
      fd.append("currency", values.currency);
    }
    const project_rows = this.state.project_rows;
    const index = project_rows.findIndex(
      (p) => this.state.project_to_edit?.id === p.id
    );
    project_rows[index].name = values?.name;
    project_rows[index].country = values.country;
    project_rows[index].base_currency = values.base_currency;
    project_rows[index].start_date = values.start_date;
    project_rows[index].pi_ci = values.pi_ci;
    project_rows[index].client_name = clients[_index].name;
    axios.post(`${API}edit-projectlist/${id}`, fd).then((response) => {
      console.log(response);
      this.setState({
        project_rows,
        edit_modal: false,
      });
    });
  };

  handleSearchProjects = (e) => {
    console.log(e.target.value);
    this.setState(
      {
        search_set: false,
        search_text_value: e.target.value,
        search_loading: true,
        clients_list_search: this.state.clients_option?.filter((c) => {
          return c.name?.toLowerCase()?.includes(e.target.value?.toLowerCase());
        }),
        projects_list_search: this.state.project_names?.filter((p) => {
          return p?.toLowerCase()?.includes(e.target.value?.toLowerCase());
        }),
      },
      () => {}
    );
  };

  editProjectValuesChange = (changedValues, allValues) => {
    let project_to_edit = this.state.project_to_edit;
    project_to_edit.business_type = changedValues.business_type;

    this.setState({
      edit_client_disabled: changedValues.business_type === "Purchases Only",
    });
  };
  addProjectValuesChange = (changedValues, allValues) => {
    this.setState({
      client_disabled: changedValues.business_type == "Purchases Only",
    });
  };
  setClientFilter = (client_filter) => {
    this.setState(
      {
        client_filter,
        search_text_value: client_filter,
        search_set: true,
      },
      () => {
        this.filterList();
      }
    );
  };
  setProjectFilter = (name_filter) => {
    this.setState(
      {
        name_filter,
        search_text_value: name_filter,
        search_set: true,
      },
      () => {
        this.filterList();
      }
    );
  };

  formateNumber = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };
  render() {
    const { share_modal } = this.state;
    return (
      <>
        <div className="tables-page">
          <div className="btns-actions">
            <button>
              Download{" "}
              <span>
                <DownloadOutlined />
              </span>
            </button>

            <button onClick={this.openProjectListAddModal}>
              Add Project +
            </button>
          </div>
          <div id="project-lists">
            <div id="clinetlist-table" className="clientlist-table pom-table">
              <div className="filters filter-table">
                <Row align={"top"} gutter={1} justify={"space-between"}>
                  <Col md={17}>
                    <div className="list-head search-box">
                      {this.state.search_text_value?.length > 0 &&
                        !this.state.search_set && (
                          <div className="search_list">
                            {this.state.clients_list_search?.length > 0 && (
                              <p className="sep">Clients</p>
                            )}
                            <div className="items-list">
                              {this.state.clients_list_search?.map((c) => {
                                return (
                                  <p
                                    onClick={() => {
                                      this.setClientFilter(c?.name);
                                    }}
                                    className="item pointer"
                                  >
                                    {c.name}
                                  </p>
                                );
                              })}
                            </div>

                            {this.state.projects_list_search?.length > 0 && (
                              <p className="sep">Projects</p>
                            )}
                            <div className="items-list">
                              {this.state.projects_list_search?.map((p) => {
                                return (
                                  <p
                                    className="item  pointer"
                                    onClick={() => {
                                      this.setProjectFilter(p);
                                    }}
                                  >
                                    {p}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      <Input
                        autoFocus
                        id="search_clients"
                        className="search_projects"
                        size="large"
                        placeholder="Type to search projects by project name or client name"
                        bordered={false}
                        value={this.state.search_text_value}
                        suffix={
                          this.state.search_text_value?.length > 0 && (
                            <CloseCircleOutlined
                              onClick={() => {
                                this.setState(
                                  {
                                    search_text_value: "",
                                    client_filter: "",
                                    name_filter: "",
                                  },
                                  () => {
                                    this.setState({ search_list: true });
                                    this.filterList();
                                  }
                                );
                              }}
                            />
                          )
                        }
                        onChange={(e) => this.handleSearchProjects(e)}
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
                  <Col md={2}>
                    <DatePicker
                      bordered={false}
                      allowClear
                      placeholder="Year"
                      size="large"
                      picker="year"
                      style={{ width: "100%" }}
                      onChange={this.onYearChange}
                      suffixIcon={<CaretDownOutlined />}
                    />
                  </Col>
                  <Col md={2}>
                    <Select
                      className="filter-table"
                      bordered={false}
                      suffixIcon={<CaretDownOutlined />}
                      size="large"
                      placeholder="Statue"
                      style={{
                        width: "100%",
                      }}
                      onChange={this.statusChange}
                    >
                      <Option value={""}>Statue</Option>

                      {["open", "done", "running"].map((s) => {
                        return (
                          <>
                            <Option value={s}>{s}</Option>
                          </>
                        );
                      })}
                    </Select>
                  </Col>
                </Row>
              </div>
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
                <div className="table-wrapper">
                  <table id="client-lists">
                    <tr>
                      <th className="width-200">
                        <p className="main">Project</p>
                        <p className="main">No / Date / Country</p>
                      </th>
                      <th className="width-200">
                        <p className="main">Total Sales</p>
                        <p className="main">Received / Balance</p>
                      </th>
                      <th className="width-200">
                        <p className="main">Deliveries</p>
                        <p className="main">Left / Over Payment</p>
                      </th>
                      <th className="width-200">
                        <p className="main">Total Purchases</p>
                        <p className="main">Made Payment / Balance</p>
                      </th>
                      <th className="width-200">Statue</th>
                    </tr>
                    {this.state.project_rows?.map((row, index) => {
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
                                          project_id: row?.id,
                                        },
                                        () => {
                                          this.setState({
                                            row_modal: true,
                                          });
                                        }
                                      );
                                    }}
                                  />
                                </Col>
                                <Col md={6}>
                                  <CSVLink
                                    data={this.state.cvData}
                                    filename={`${row?.name}_Project`}
                                    headers={headers}
                                    asyncOnClick={true}
                                    onClick={(event, done) => {
                                      this.setState(
                                        {
                                          cvData: [
                                            {
                                              name: row.name,
                                              pi_ci: row?.pi_ci,
                                              client_name: row?.client_name,
                                              country: row?.country
                                                ? regionNames.of(row?.country)
                                                : "",
                                              city: row?.city,
                                              phone: row?.phone,
                                              start_date: row?.start_date,
                                              status: row?.status,
                                              total: row?.total,
                                              currency: row?.currency,
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
                                    onClick={(e) => {
                                      e.preventDefault();
                                      this.setState(
                                        {
                                          row_index: index,
                                          project_to_edit: row,
                                        },
                                        () => {
                                          this.setState(
                                            {
                                              edit_modal: true,
                                            },
                                            () => {
                                              this.setState({
                                                edited_country: row?.country,
                                                edited_date: row?.start_date,
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
                                    onClick={(e) => {
                                      e.preventDefault();
                                      this.setState(
                                        {
                                          project_to_delete: row,
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
                            <p
                              className="sale"
                              onClick={() => {
                                this.setState(
                                  {
                                    project_id: row?.id,
                                  },
                                  () => {
                                    this.setState({
                                      row_modal: true,
                                    });
                                  }
                                );
                              }}
                            >
                              {row?.name}
                            </p>
                            <p className="sec">{row?.pi_ci}</p>
                            <p className="sec">{row?.start_date}</p>
                            <p className="sec">{row?.country&&`${regionNames.of(row?.country)},${row?.city}`}</p>
                            <p className="sec">{row?.client_name}</p>
                           
                          </td>
                          <td
                            onClick={() => {
                              this.setState(
                                {
                                  project_id: row?.id,
                                },
                                () => {
                                  this.setState({
                                    row_modal: true,
                                  });
                                }
                              );
                            }}
                          >
                            {/* <p className="main">{row?.client_name}</p> */}
                            <p className="sale">
                              {this.formateNumber(row?.overview?.total_sales)}
                            </p>
                            <p className="sec">
                              {this.formateNumber(
                                row?.overview?.total_received_payment
                              )}
                            </p>
                            <p className="sec">
                              {this.formateNumber(
                                row?.overview?.total_sales -
                                  row?.overview?.total_received_payment
                              )}
                            </p>
                            <p className="sec">{row?.currency}</p>
                          </td>
                          <td
                            onClick={() => {
                              this.setState(
                                {
                                  project_id: row?.id,
                                },
                                () => {
                                  this.setState({
                                    row_modal: true,
                                  });
                                }
                              );
                            }}
                          >
                            {/* <p className="main">
                              {Number(
                                parseFloat(row?.total).toFixed(2)
                              ).toLocaleString()}
                            </p>
                            <p className="sec">{row?.currency}</p> */}

                            <p className="sale">
                              {this.formateNumber(
                                row?.overview?.total_deliveries
                              )}
                            </p>
                            <p className="sec">
                              {this.formateNumber(
                                row?.overview?.total_sales -
                                  row?.overview?.total_deliveries
                              )}
                            </p>
                            <p
                              className={
                                row?.overview?.total_deliveries >
                                row?.overview?.total_received_payment
                                  ? "sec red"
                                  : "sec"
                              }
                            >
                              {this.formateNumber(
                                row?.overview?.total_received_payment -
                                  row?.overview?.total_deliveries
                              )}
                            </p>
                            <p className="sec">{row?.currency}</p>
                          </td>
                          <td>
                            <p className="sale">
                              {this.formateNumber(
                                row?.overview?.purchases_total_with_exchange
                              )}
                            </p>
                            <p className="sec">
                              {this.formateNumber(
                                row?.overview?.payments_total_with_exchange
                              )}
                            </p>
                            <p className="sec">
                              {this.formateNumber(
                                row?.overview?.purchases_total_with_exchange -
                                  row?.overview?.payments_total_with_exchange
                              )}
                            </p>
                            <p className="sec">{row?.base_currency}</p>
                          </td>
                          <td>
                            <div
                              className="project-status-action"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.updateProjectStatus(row, "open", e);
                                }}
                                className={
                                  row.status === "open" ? "active" : "sec"
                                }
                              >
                                open
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.updateProjectStatus(row, "running");
                                }}
                                className={
                                  row.status === "running" ? "active" : "sec"
                                }
                              >
                                running
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.updateProjectStatus(row, "done");
                                }}
                                className={
                                  row.status === "done" ? "active" : "sec"
                                }
                              >
                                done
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal
          footer={false}
          centered
          destroyOnClose
          className="file-modal border-radius"
          open={this.state.add_modal}
          onCancel={() => {
            this.setState({
              add_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Add Project</p>
          <Form
            onFinish={this.onFinish}
            onValuesChange={this.addProjectValuesChange}
            size="large"
            layout="vertical"
          >
            <Form.Item name="name" label="Name">
              <Input placeholder="input name" />
            </Form.Item>
            <Form.Item label="PI/CI" name="pi_ci">
              <Input placeholder="input number" />
            </Form.Item>
            <Form.Item
              label="Base Currency"
              name="base_currency"
              className="form-label mb-4"
            >
              <Select
                showSearch
                placeholder="Select Project Base Currency not editable"
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
            <Form.Item
              label="Bussiness Type"
              name="business_type"
              className="form-label mb-4"
            >
              <Select
                showSearch
                // onChange={this.handleTypesChange}
                // value={this.state.selectedBussiness}
                placeholder="Pleas Bussiness Type"
                style={{
                  fontSize: "13px",
                }}
              >
                {bussiness_types.map((b) => {
                  return <>{<Option value={b}>{b}</Option>}</>;
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Client"
              name="client_name"
              className="form-label mb-4"
            >
              <Select
                showSearch
                onChange={this.handleTypesChange}
                value={this.state.selectedTypes}
                disabled={this.state.client_disabled}
                notFoundContent={
                  <p style={{ fontSize: "15px" }}>
                    no clients, please client in the client list
                  </p>
                }
                placeholder="Please select Client"
                style={{
                  fontSize: "13px",
                }}
              >
                {this.state.clients_option.map((p) => {
                  return (
                    <>
                      {
                        /* <Option value={p?.name}>{p?.name}</Option> */
                        <Option value={p?.id}>
                          {" "}
                          {`${p?.name} | ${p?.currency}`}
                        </Option>
                      }
                    </>
                  );
                })}
              </Select>
            </Form.Item>
            <Row gutter={10}>
              <Col md={12}>
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
                <div
                  style={{ visibility: "hidden" }}
                  className="ant-form-item-label"
                >
                  <label>Country, city</label>
                </div>
                <Form.Item name={"city"}>
                  <Input placeholder="City *" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Start Date" name="start_date">
              <DatePicker style={{ width: "100%" }} onChange={this.onChange} />
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
          style={{
            top: "50px",
          }}
          destroyOnClose
          className="file-modal border-radius"
          open={this.state.edit_modal}
          onCancel={() => {
            this.setState({
              edit_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Edit Project</p>
          <Form
            onFinish={this.onFinishEdit}
            onValuesChange={this.editProjectValuesChange}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Name"
              initialValue={this.state.project_to_edit?.name}
            >
              <Input placeholder="input name" />
            </Form.Item>
            <Form.Item
              label="PI/CI"
              name="pi_ci"
              initialValue={this.state.project_to_edit?.pi_ci}
            >
              <Input placeholder="input number" />
            </Form.Item>
            <Form.Item
              label="Base Currency"
              name="base_currency"
              initialValue={this.state.project_to_edit?.base_currency}
              className="form-label mb-4"
            >
              <Select
                disabled={this.state.project_to_edit?.base_currency != null}
                showSearch
                placeholder="Select Project Base Currency not editable"
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
                <div className="ant-form-item-label">
                  <label>Country, city</label>
                </div>
                <Form.Item>
                  <ReactFlagsSelect
                    selected={this.state.edited_country}
                    selectedSize={14}
                    optionsSize={18}
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
                <div
                  style={{ visibility: "hidden" }}
                  className="ant-form-item-label"
                >
                  <label>Country, city</label>
                </div>
                <Form.Item
                  initialValue={this.state.project_to_edit?.city}
                  name={"city"}
                >
                  <Input placeholder="City *" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Bussiness Type"
              name="business_type"
              className="form-label mb-4"
              initialValue={this.state.project_to_edit?.business_type}
            >
              <Select
                showSearch
                placeholder="Pleas Bussiness Type"
                style={{
                  fontSize: "13px",
                }}
              >
                {bussiness_types.map((b) => {
                  return <>{<Option value={b}>{b}</Option>}</>;
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Client"
              name="client_name"
              className="form-label mb-4"
              initialValue={this.state.project_to_edit?.client_id}
            >
              <Select
                disabled={
                  this.state.project_to_edit?.business_type ==
                    "Purchases Only" || this.state.edit_client_disabled
                }
                showSearch
                notFoundContent={
                  <p style={{ fontSize: "15px" }}>
                    no clients, please client in the client list
                  </p>
                }
                placeholder="Please select Client"
                style={{
                  fontSize: "13px",
                }}
              >
                {this.state.clients_option.map((p) => {
                  return (
                    <>
                      <Option value={p?.id}>
                        {" "}
                        {`${p?.name} | ${p?.currency}`}
                      </Option>
                    </>
                  );
                })}
              </Select>
            </Form.Item>
            {/* <ConfigProvider > */}

            <Form.Item
              name="start_date"
              initialValue={moment(
                this.state.project_to_edit?.start_date,
                "YYYY. MM. DD"
              )}
            >
              <DatePicker
                style={{ width: "100%" }}
                onChange={this.onChangeEdit}
              />
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
          className="fullscreen"
          closable
          destroyOnClose
          open={this.state.row_modal}
          onCancel={() => {
            this.setState({
              row_modal: false,
            });
          }}
        >
          <ProjectListItem
            company_id={this.state.entity_id}
            entity_id={this.state.entity_id}
            entity_name={this.state.entity_name}
            project_id={this.state.project_id}
          />
        </Modal>
      </>
    );
  }
}

export default ProjectList;
