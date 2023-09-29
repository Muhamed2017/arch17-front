import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
  Collapse,
  DatePicker,
} from "antd";
import moment from "moment";

import {
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  CaretDownOutlined,
  CloseCircleOutlined,
  DownOutlined,
  UpOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { currency } from "../../contexts/currencies";
import { API } from "../../utitlties";
import axios from "axios";
import ReactFlagsSelect from "react-flags-select";
import { customLabels } from "../../pages/CreateBrandFinish";
const { Option } = Select;
const { confirm } = Modal;
const { Panel } = Collapse;
const text = "MSNAMMSN";

class PoDeliveryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company_id: this.props.company_id,
      project_id: this.props.project_id,
      po_deliveries: {},
      po_deliveries_values: [],
      add_modal: false,
      base_currency: this.props?.base_currency ?? "",
      exchange_rates: {},
      po_deliveries_currencies: {},
      suppliers_options: [],
      products_filter: "",
      country_filter: "",
      city_filter: "",
      name_filter: "",
      year_filter: "",
      currency_filter: "",
      ex_rates_valus: [],
      suppliers: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  onFinishEdit = (values) => {
    const id = this.state.del_to_edit?.id;
    console.log(values);
    const fd = new FormData();
    fd.append("projectlist_id", this.state.project_id);
    fd.append("supplier_id", values.supplier_id);
    fd.append("value", values.value);
    fd.append("referance", values.referance);
    fd.append("loading_date", this.state.edited_loading_date);
    fd.append("referance", values.referance);
    axios.post(`${API}edit-podelivey/${id}`, fd).then((response) => {
      console.log(response);
      this.getData().then(() => {
        this.setState({
          edit_del_modal: false,
        });
      });
    });
  };
  onChangeEdit = (d, edited_loading_date) => {
    console.log(d, edited_loading_date);
    this.setState({
      edited_loading_date,
    });
  };
  getData = async () => {
    await axios
      .get(
        `${API}get-podelivery/${this.state.company_id}/${this.state.project_id}`
      )
      .then((response) => {
        console.log(response);
        this.setState(
          {
            po_deliveries: response.data.po_deliveries,
            po_deliveries_values:
              Object.values(response.data.po_deliveries) ?? [],
            exchange_rates: response.data.exchange_rates,
            po_deliveries_currencies: response.data.po_deliveries_currencies,
            suppliers_options: response.data.suppliers_options,
            suppliers: response.data.pos,
            services_filter_options: Object.values(response.data.po_deliveries)
              ?.map((s) => {
                return s?.map((ss) => {
                  // return JSON.parse(ss?.products_services);
                  return ss?.products_services;
                });
              })
              .filter((p) => {
                return p != null;
              })
              .flat(),
          },
          () => {
            console.log(this.state.left_products_currencies);
            console.log(this.state.exchange_rates);
            this.composeRates();
          }
        );
      });
  };

  onCollapseChange = (active_vendor) => {
    if (active_vendor === this.state.active_vendor) {
      this.setState({
        active_vendor: "",
      });
    } else {
      this.setState({
        active_vendor,
      });
    }
    console.log(active_vendor);
  };

  formatNumbers = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };

  openDeliveryAddModal = () => {
    this.setState({
      add_modal: true,
    });
  };

  onChangeDate = (d, loading_date) => {
    console.log(d, loading_date);
    this.setState({
      loading_date,
    });
  };

  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.del_to_delete?.referance}  Delivery? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        const id = this.state.del_to_delete?.id;
        axios.post(`${API}podelivery-delete/${id}`).then((response) => {
          console.log(response);
          this.getData();
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  onFinish = (values) => {
    console.log(values);
    values["loading_date"] = this.state.loading_date;
    const fd = new FormData();
    fd.append("value", values.value);
    fd.append("supplier_id", values.supplier_id);
    fd.append("referance", values.referance);
    fd.append("loading_date", values.loading_date);
    axios
      .post(`${API}add-podelivery/${this.state.project_id}`, fd)
      .then((response) => {
        console.log(response);
        this.setState({ add_modal: false }, () => {});
        this.getData();
      });
  };

  getKeyValue = (name, obj, type) => {
    let total = 0;
    obj[name]?.map((p) => {
      total += parseFloat(p.value);
    });
    return total;
  };
  getKeyValueLeft = (name, obj, type) => {
    let total = 0;
    obj[name]?.map((p) => {
      total += parseFloat(p.left);
    });
    return total;
  };

  getValue = (name, obj) => {
    let total = 1;
    obj[name]?.map((p) => {
      total = parseFloat(p.vlaue);
    });
    return total;
  };

  calculateTotalValueBaseCurrency = (currencies, rates) => {
    let total = 0;
    Object.values(currencies)?.map((c) => {
      total +=
        c?.reduce((accumulator, object) => {
          return parseFloat(parseFloat(accumulator) + parseFloat(object.value));
        }, 0) * this.getValue(c[0]?.currency, rates);
    });

    return total;
  };
  calculateTotalLeftProductsBaseCurrency = (currencies, rates) => {

    // c.filter(
    //   (obj, index) =>
    //     c.findIndex((item) => item.supplier_id === obj.supplier_id) === index
    // ).reduce((accumulator, object)=>{
    //   return (
    //     parseFloat(accumulator) +
    //     parseFloat(object.leftp)
    //   );           
    // },0)
    let total = 0;
    Object.values(currencies)?.map((c) => {
      total +=
        c?.filter(
            (obj, index) =>
              c.findIndex((item) => item.supplier_id === obj.supplier_id) === index
          ).reduce((accumulator, object) => {
          return parseFloat(parseFloat(accumulator) + parseFloat(object.leftp));
        }, 0) * this.getValue(c[0]?.currency, rates);
    });

    return total;
  };
  calculateTotalPaidBaseCurrency = (currencies, rates) => {
    let total = 0;
    Object.values(currencies)?.map((c) => {
      total +=
        this.getKeyValue(
          c[0]?.currency,
          this.state.po_deliveries_currencies,
          "coast"
        ) * this.getValue(c[0]?.currency, rates);
    });

    return total;
  };

  rateChange = (e, currency) => {
    const value = e?.target?.value;
    const fd = new FormData();
    fd.append("vlaue", value);
    fd.append("currency", currency);
    if (value > 0) {
      axios
        .post(`${API}add-rate/${this.state.project_id}`, fd)
        .then((response) => {
          this.setState(
            {
              exchange_rates: response.data.exchange_rates,
            },
            () => {
              this.composeRates();
            }
          );
        });
    }
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

  currencyChange = (currency_filter) => {
    this.setState(
      {
        currency_filter,
      },
      () => {
        this.filterList();
      }
    );
  };

  getTotalLeft = (currency, supplier_name) => {
    let total = 0;
    this.state.suppliers_options?.forEach((s) => {
      if (s.currency == currency && s.name === supplier_name) {
        total += s.left;
      }
    });
    return total;
  };

  composeRates = () => {
    let _flat_rates = [];

    Object.values(this.state.exchange_rates)?.forEach((r) => {
      _flat_rates.push(r);
    });
    this.setState(
      {
        ex_rates_valus: _flat_rates.flat(),
      },
      () => {
        console.log(this.state.ex_rates_valus);
      }
    );
  };

  filterList = () => {
    const {
      name_filter,
      year_filter,
      country_filter,
      products_filter,
      currency_filter,
    } = this.state;

    axios
      .get(
        `${API}podelivery-filter/${this.state.project_id}?filter[country]=${country_filter}&filter[currency]=${currency_filter}&filter[loading_date]=${year_filter}&filter[products_services]=${products_filter}&filter[supplier_name]=${name_filter}`
      )
      .then((response) => {
        this.setState(
          {
            loading: false,
            po_deliveries: response.data.po_deliveries,
            po_deliveries_values:
              Object.values(response.data.po_deliveries) ?? [],
            po_deliveries_currencies: response.data.po_deliveries_currencies,
          },
          () => {}
        );
      });
  };

  calculateTotaLeftBaseCurrency = () => {
    let total = 0;
    let _r = this.state.ex_rates_valus;

    Object.values(this.state.po_deliveries_currencies)?.forEach((c) => {
      total +=
        this.getTotalLeft(c[0].currency, c[0]?.supplier_name) *
        _r[_r?.findIndex((r) => r.currency === c[0]?.currency)]?.vlaue;
    });
    return total;
  };

  render() {
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

            <button onClick={this.openDeliveryAddModal}>Add Delivery +</button>
          </div>
          <div className="pom-table pos pos-table">
            <div className="filters pos-tabs">
              <Row align={"top"} justify={"end"}>
                <Col md={14}>
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
                    {this.state.services_filter_options?.map((p) => {
                      return (
                        <>
                          <Option value={p}>{p}</Option>
                        </>
                      );
                    })}
                  </Select>
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
                    // style={{ width: "100%" }}
                    onChange={this.onYearChange}
                    suffixIcon={<CaretDownOutlined />}
                  />
                </Col>

                <Col md={2}>
                  <Select
                    className="right  px-0"
                    bordered={false}
                    size="large"
                    suffixIcon={<CaretDownOutlined />}
                    placeholder="Currency"
                    value={this.state.currency_filter}
                    onChange={this.currencyChange}
                  >
                    <Option value="">Currency</Option>
                    {currency.map((p) => {
                      return (
                        <>
                          <Option value={p.code}>{p.code}</Option>
                        </>
                      );
                    })}
                  </Select>
                </Col>
              </Row>
            </div>

            <div className="customized-table deliveries-table">
              <div className="header-row table-row">
                <div>Vendor</div>
                <div>Referance</div>
                <div>Loading Date</div>
                <div>Value</div>
                <div>Total Left Products Value</div>
              </div>
              {Object.keys(this.state.po_deliveries)?.map((d, index) => {
                return (
                  <>
                    {this.state.po_deliveries_values[index]?.length > 1 ? (
                      <>
                        <Collapse
                          onChange={() => this.onCollapseChange(d)}
                          activeKey={this.state.active_vendor}
                        >
                          <Panel
                            header={
                              <div className="table-row data-row collabser-row">
                                <div>
                                  <p className="main">{d}</p>
                                  <p className="sec">
                                    {
                                      this.state.po_deliveries_values[index][0]
                                        ?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  {d === this.state.active_vendor ? (
                                    <p className="expand-btn open">
                                      <span className="txt">Hide Content</span>
                                      <span>
                                        <DownOutlined />
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="expand-btn close">
                                      <span className="txt">Show Content</span>{" "}
                                      <span>
                                        <UpOutlined />
                                      </span>
                                    </p>
                                  )}
                                </div>
                                <div></div>
                                <div>
                                  <p className="main total">
                                    {this.formatNumbers(
                                      parseFloat(
                                        this.state.po_deliveries_values[
                                          index
                                        ].reduce((accumulator, object) => {
                                          return parseFloat(
                                            parseFloat(accumulator) +
                                              parseFloat(object.value)
                                          );
                                        }, 0)
                                      ).toFixed(2)
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state.po_deliveries_values[index][0]
                                        ?.currency
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="main">
                                    {this.formatNumbers(
                                      this.state.po_deliveries_values[index][0]
                                        ?.leftp
                                    )}
                                  </p>
                                  <p className="sec">
                                    {
                                      this.state.po_deliveries_values[index][0]
                                        ?.currency
                                    }
                                  </p>
                                </div>
                                <div></div>
                                <div></div>
                              </div>
                            }
                            key={d}
                            showArrow={false}
                          >
                            {this.state.po_deliveries_values[index]?.map(
                              (de) => {
                                return (
                                  <div className="data-row relative table-row">
                                    <div className="edit-delete">
                                      <Row align={"middle"}>
                                        <Col md={8}>
                                          <span>
                                            <DownloadOutlined />
                                          </span>
                                        </Col>
                                        <Col md={8}>
                                          <EditOutlined
                                            onClick={() => {
                                              this.setState(
                                                {
                                                  del_to_edit: de,
                                                },
                                                () => {
                                                  this.setState({
                                                    edit_del_modal: true,
                                                  });
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
                                                  del_to_delete: de,
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
                                    <div></div>
                                    <div>
                                      <p className="main">{de.referance}</p>
                                    </div>
                                    <div>
                                      <p className="main">{de.loading_date}</p>
                                    </div>
                                    <div>
                                      <p className="main">{de.value}</p>
                                      <p className="sec">
                                        {
                                          this.state.po_deliveries_values[
                                            index
                                          ][0]?.currency
                                        }
                                      </p>
                                    </div>
                                    <div></div>
                                  </div>
                                );
                              }
                            )}
                          </Panel>
                        </Collapse>
                      </>
                    ) : (
                      <>
                        {this.state.po_deliveries_values[index]?.map((de) => {
                          return (
                            <div className="data-row table-row  relative">
                              <div className="edit-delete">
                                <Row align={"middle"}>
                                  <Col md={8}>
                                    <span>
                                      <DownloadOutlined />
                                    </span>
                                  </Col>
                                  <Col md={8}>
                                    <EditOutlined
                                      onClick={() => {
                                        this.setState(
                                          {
                                            del_to_edit: de,
                                          },
                                          () => {
                                            this.setState({
                                              edit_del_modal: true,
                                            });
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
                                            del_to_delete: de,
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
                              <div>
                                <p className="main">{de.supplier_name}</p>
                                <p className="sec">
                                  {
                                    this.state.po_deliveries_values[index][0]
                                      ?.currency
                                  }
                                </p>
                              </div>
                              <div>
                                <p className="main">{de.referance}</p>
                              </div>
                              <div>
                                <p className="main">{de.loading_date}</p>
                              </div>
                              <div>
                                <p className="main total">{de.value}</p>
                                <p className="sec">
                                  {
                                    this.state.po_deliveries_values[index][0]
                                      ?.currency
                                  }
                                </p>
                              </div>

                              <div>
                                <p className="main">
                                  {this.formatNumbers(
                                    this.state.po_deliveries_values[index][0]
                                      ?.leftp
                                  )}
                                </p>
                                <p className="sec">
                                  {
                                    this.state.po_deliveries_values[index][0]
                                      ?.currency
                                  }
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })}
            </div>
          </div>

          {Object.values(this.state.po_deliveries_currencies)?.length > 0 && (
            <div className="pom-table clientlist-table base-currency">
              {`Total in ${this.state.base_currency}`}
              <table>
                <tr>
                  <th className="width-80">Currency</th>
                  <th className="width-200">Total Delivered Products</th>
                  <th className="width-200">Total Left Products</th>
                  <th className="width-300">
                    {" "}
                    EX.Rate to {this.state.base_currency}
                  </th>
                </tr>
                {Object.values(this.state.po_deliveries_currencies)?.map(
                  (c, index) => {
                    return (
                      <tr>
                        <td>
                          <p className="sale">{c[0]?.currency}</p>
                        </td>
                        <td>
                          <p className="main">
                            {this.formatNumbers(
                              parseFloat(
                                c?.reduce((accumulator, object) => {
                                  return (
                                    parseFloat(accumulator) +
                                    parseFloat(object.value)
                                  );
                                }, 0)
                              ).toFixed(2)
                            )}
                          </p>
                          <p className="sec">{c[0]?.currency}</p>
                        </td>
                        <td>
                          <p className="main">
                            {/* {parseFloat(this.getTotalLeft(c[0].currency,c[0]?.supplier_name)).toFixed(2)} */}
                            {/* {this.formatNumbers(
                              parseFloat(
                                c?.reduce((accumulator, object) => {
                                  return (
                                    parseFloat(accumulator) +
                                    parseFloat(object.leftp)
                                  );              
                                }, 0)
                                // c[0]?.leftp

                              ).toFixed(2)
                            )} */}
                            {
                              
                             this.formatNumbers(
                              c.filter(
                                (obj, index) =>
                                  c.findIndex((item) => item.supplier_id === obj.supplier_id) === index
                              ).reduce((accumulator, object)=>{
                                return (
                                  parseFloat(accumulator) +
                                  parseFloat(object.leftp)
                                );           
                              },0)
                             )
                            }
                          </p>
                          <p className="sec">{c[0]?.currency}</p>
                        </td>
                        <td>
                          {this.state.base_currency === c[0]?.currency ? (
                            <Input
                              // bordered={false}
                              disabled
                              className="factor-input"
                              size="large"
                              placeholder="Type Exchange Rate"
                              maxLength={16}
                              value={1}
                              defaultValue={1}
                            />
                          ) : (
                            <Input
                              // bordered={false}
                              className="factor-input"
                              size="large"
                              placeholder="Type Exchange Rate"
                              maxLength={16}
                              onChange={(e) =>
                                this.rateChange(e, c[0]?.currency)
                              }
                              defaultValue={
                                this.getValue(
                                  c[0]?.currency,
                                  this.state.exchange_rates
                                ) ?? 1
                              }
                            />
                          )}
                        </td>
                      </tr>
                    );
                  }
                )}
                {this.state.base_currency && (
                  <tr>
                    <td>
                      <p className="mian">Total in</p>
                      <p className="sec">{this.state.base_currency}</p>
                    </td>
                    <td>
                      <p className="main">
                        {Number(
                          parseFloat(
                            this.calculateTotalValueBaseCurrency(
                              this.state.po_deliveries_currencies,
                              this.state.exchange_rates
                            )
                          ).toFixed(2)
                        ).toLocaleString()}
                      </p>
                      <p className="sec">{this.state.base_currency}</p>
                    </td>
                    <td>
                      <p className="main">
                        {
                          //  parseFloat(this.calculateTotaLeftBaseCurrency()).toFixed(2)

                          Number(
                            parseFloat(
                              this.calculateTotalLeftProductsBaseCurrency(
                                this.state.po_deliveries_currencies,
                                this.state.exchange_rates
                              )
                            ).toFixed(2)
                          ).toLocaleString()
                        }
                      </p>
                      <p className="sec">{this.state.base_currency}</p>
                    </td>
                  </tr>
                )}
              </table>
            </div>
          )}
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
          <p className="modal-header">Add Delivery</p>
          <Form onFinish={this.onFinish} size="large" layout="vertical">
            <Form.Item
              label="Supplier / Factory"
              name="supplier_id"
              className="form-label mb-4"
              rules={[
                {
                  required: true,
                  message: "Supplier name is required!",
                },
              ]}
            >
              <Select
                allowClear
                size="large"
                placeholder="Supplier/  Factory"
                style={{
                  width: "100%",
                }}
              >
                {this.state.suppliers?.map((p) => {
                  return (
                    <>
                      {/* <Option value={p.id}>{p.name}</Option> */}
                      {/* <Option value={p.id}>{`${p.name} | ${p?.currency}`}</Option> */}
                      <Option
                        value={p.supplier_id}
                      >{`${p.supplier_name} | ${p?.currency}`}</Option>
                    </>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Referance is required!",
                },
              ]}
              name="referance"
              label="Referance"
            >
              <Input placeholder="type referance" />
            </Form.Item>
            <Row>
              <Col md={24}>
                <Form.Item
                  label="Value"
                  name="value"
                  rules={[
                    {
                      required: true,
                      message: "Delivery value is required!",
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="loading_date"
              label="Loading Date"
              rules={[
                {
                  required: true,
                  message: "Loading Date is required!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                onChange={this.onChangeDate}
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
          centered
          destroyOnClose
          footer={false}
          className="file-modal border-radius"
          open={this.state.edit_del_modal}
          onCancel={() => {
            this.setState({
              edit_del_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Edit Delivery</p>
          <Form onFinish={this.onFinishEdit} size="large" layout="vertical">
            <Form.Item
              label="Supplier / Factory"
              name="supplier_id"
              className="form-label mb-4"
              initialValue={this.state.del_to_edit?.supplier_id}
              rules={[
                {
                  required: true,
                  message: "Supplier name is required!",
                },
              ]}
            >
              <Select
                allowClear
                size="large"
                placeholder="Supplier/  Factory"
                style={{
                  width: "100%",
                }}
              >
                {this.state.suppliers?.map((p) => {
                  return (
                    <>
                      {/* <Option value={p.id}>{p.name}</Option> */}
                      {/* <Option value={p.id}>{`${p.name} | ${p?.currency}`}</Option> */}
                      <Option
                        value={p.supplier_id}
                      >{`${p.supplier_name} | ${p?.currency}`}</Option>
                    </>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Referance is required!",
                },
              ]}
              name="referance"
              label="Referance"
              initialValue={this.state.del_to_edit?.referance}
            >
              <Input placeholder="type referance" />
            </Form.Item>
            <Row>
              <Col md={24}>
                <Form.Item
                  initialValue={this.state.del_to_edit?.value}
                  label="Value"
                  name="value"
                  rules={[
                    {
                      required: true,
                      message: "Delivery value is required!",
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Loading Date is required!",
                },
              ]}
              name="loading_date"
              label="Loading Date"
              initialValue={moment(
                this.state.del_to_edit?.loading_date,
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
      </>
    );
  }
}

export default PoDeliveryTab;
