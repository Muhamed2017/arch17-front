import React, { Component } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Spin,
  Collapse,
} from "antd";

import ReactFlagsSelect from "react-flags-select";
import {
  EditOutlined,
  ExclamationCircleFilled,
  DeleteOutlined,
  LoadingOutlined,
  DownloadOutlined,
  CloseCircleOutlined,
  CaretDownOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

import { customLabels } from "../../pages/CreateBrandFinish";
import { API, VAT_TAX_OPTIONS } from "../../utitlties";
import axios from "axios";
import { currency } from "../../contexts/currencies";

const { Option } = Select;
const { confirm } = Modal;
const { Panel } = Collapse;

const text = "MSNAMMSN";
class PurchasesOrdersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers_with_pos: [],
      suppliers_options: [],
      pos_sup_rows: [],
      pos_rows: [],
      project_id: this.props.project_id,
      pos_rows: [],
      add_modal: false,
      selectedCurrency: "",
      disable: false,
      total_cost_curr_1: 0,
      total_cost_curr_2: 0,
      pos_currencies: {},
      payments_currencies: {},
      total_coast_converted: 0,
      coast_factore: 1,
      paid_factore: 1,
      company_id: this.props.company_id,
      cur_1: null,
      cur_2: null,
      total_coast_1: 0,
      total_paid_2: 0,
      total_coast_2: 0,
      total_paid_1: 0,
      total_balance_1: 0,
      total_balance_2: 0,
      active_vendor: "",
      products_filter: "",
      country_filter: "",
      city_filter: "",
      name_filter: "",
      year_filter: "",
      currency_filter: "",
      base_currency: this.props?.base_currency ?? "",
      exchange_rates: {},
    };
  }
  componentDidMount() {
    console.log(this.props.contract_currency);
    this.getData();
  }
  updateBaseCurrencyToParent = () => {
    this.props.updateBaseCurrency(this.state.base_currency);
  };

  getData = async () => {
    await axios
      .get(
        `${API}suppliers-pos/${this.state.company_id}/${this.state.project_id}`
      )
      .then((response) => {
        console.log(response);
        this.setState(
          {
            suppliers_options: response.data.suppliers_options,
            pos_sup_rows: Object.keys(response.data.suppliers_pos),
            pos_rows: Object.values(response.data.suppliers_pos),
            payments_rows: response.data.payments_pos,
            pos_currencies: response.data.pos_currencies,
            payments_currencies: response.data.payments_currencies,
            exchange_rates: response.data.exchange_rates,
            services: Object.values(response.data.suppliers_pos)
              ?.map((s) => {
                return s?.map((ss) => {
                  return ss.items[0];
                });
              })
              .flat(),
          },
          () => {
            this.updateTotalSuppliers(this.state.pos_rows);
            console.log(this.state.services_filter_options);
            this.setState({
              services_filter_options: [...new Set(this.state.services)],
            });
          }
        );
      });
    console.log(this.state.project_id);
  };

  getKeyValue = (name, obj, type) => {
    let total = 0;
    obj[name]?.map((p) => {
      total += parseFloat(p.value);
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
  openSupplierListAddModal = () => {
    this.setState({
      add_modal: true,
    });
  };

  onFinish = (values) => {
    console.log(values);
    let subtotal, total, vat_tax_value;
    if (values.vat_tax_type === "in") {
      subtotal =
        parseFloat(values.pos_value) /
        parseFloat(1 + parseFloat(values.vat_tax_percentage) / 100);
      total = values.pos_value;
      vat_tax_value = total - subtotal;
    }
    // if (values.vat_tax_type === "not") {
    //   total = values.pos_value;
    //   values["vat_tax_percentage"] = 0;
    //   subtotal = values.pos_value;
    //   vat_tax_value = 0;
    // }

    if (values.vat_tax_type === "not") {
      if (parseFloat(values.vat_tax_percentage) === 0) {
       total = values.pos_value;
       subtotal = values.pos_value;
       vat_tax_value = 0;
      }
      if (parseFloat(values.vat_tax_percentage) > 0) {
       vat_tax_value = ( parseFloat(values.vat_tax_percentage) /100 ) *  parseFloat(values.pos_value)
       subtotal= values.pos_value;
       total=parseFloat(values.pos_value) + vat_tax_value
      }
     }
    values["subtotal"] = subtotal;
    values["vat_tax_value"] = vat_tax_value;
    values["total"] = total;

    values["currency"] = this.state.selectedCurrency;

    console.log(values);

    const { pos_sup_rows, pos_rows } = this.state;
    const index = pos_sup_rows.findIndex((d) => values.pos_supplier === d);

    const _index = this.state.suppliers_options.findIndex(
      (d) => values.pos_supplier === d.name
    );
    const supplier_id = this.state.suppliers_options[_index]?.id;
    const currency = this.state.suppliers_options[_index]?.currency;
    const fd = new FormData();
    fd.append("supplier_name", values.pos_supplier);
    fd.append("supplier_id", supplier_id);
    fd.append("projectlist_id", this.state.project_id);
    fd.append("vat_tax_percentage", values.vat_tax_percentage);
    fd.append("vat_tax_value", values.vat_tax_value);
    fd.append("vat_tax_type", values.vat_tax_type);
    fd.append("subtotal", values.subtotal);
    fd.append("total", values.total);
    fd.append("items[0]", values.items[0]);
    fd.append("value", values.pos_value);
    fd.append("order_number", values.pos_order_number);
    fd.append("referance", values.pos_referance);
    fd.append("currency", currency);
    axios.post(`${API}add-po/${this.state.project_id}`, fd).then((response) => {
      console.log(response);
      this.setState({ pos_rows, pos_sup_rows, add_modal: false }, () => {
        this.updateTotalSuppliers(this.state.pos_rows);
        this.updateCurrencyValue(currency, values.pos_value);
      });
      this.getData();
    });
  };
  onFinishEdit = (values) => {
    const id = this.state.po_to_edit?.id;
    console.log(values);
    let subtotal, total, vat_tax_value;
    if (values.vat_tax_type === "in") {
      subtotal =
        parseFloat(values.pos_value) /
        parseFloat(1 + parseFloat(values.vat_tax_percentage) / 100);
      total = values.pos_value;
      vat_tax_value = total - subtotal;
    }
    if (values.vat_tax_type === "not") {
      if (parseFloat(values.vat_tax_percentage) === 0) {
       total = values.pos_value;
       subtotal = values.pos_value;
       vat_tax_value = 0;
      }
      if (parseFloat(values.vat_tax_percentage) > 0) {
       vat_tax_value = ( parseFloat(values.vat_tax_percentage) /100 ) *  parseFloat(values.pos_value)
       subtotal= values.pos_value;
       total=parseFloat(values.pos_value) + vat_tax_value
      }
     }
    values["subtotal"] = subtotal;
    values["vat_tax_value"] = vat_tax_value;
    values["total"] = total;

    console.log(values)
    const _index = this.state.suppliers_options.findIndex(
      (d) => values.pos_supplier === d.name
    );
    const supplier_id = this.state.suppliers_options[_index]?.id;
    const currency = this.state.suppliers_options[_index]?.currency;

    const fd = new FormData();
    fd.append("supplier_name", values.pos_supplier);
    fd.append("supplier_id", supplier_id);
    fd.append("currency", currency);
    fd.append("projectlist_id", this.state.project_id);
    fd.append("items[0]", values.items[0]);
    fd.append("value", values.pos_value);
    fd.append("order_number", values.pos_order_number);
    fd.append("referance", values.pos_referance);
    fd.append("subtotal", values.subtotal);
    fd.append("vat_tax_type", values.vat_tax_type);
    fd.append("vat_tax_value", values.vat_tax_value);
    fd.append("vat_tax_percentage", values.vat_tax_percentage);
    fd.append("total", values.total);

    axios.post(`${API}edit-po/${id}`, fd).then((response) => {
      console.log(response);
      this.getData().then(() => {
        this.setState({
          edit_po_modal: false,
        });
      });
    });
  };
  updateCurrencyValue = (currency, value) => {
    const { pos_currencies } = this.state;
    const rows = pos_currencies[currency] ?? [];
    rows.push({ value });
    pos_currencies[currency] = rows;
    this.setState({
      pos_currencies,
    });
  };

  SupplierChange = (selected_supplier) => {
    const { pos_sup_rows, pos_rows } = this.state;
    const index = pos_sup_rows.findIndex((d) => selected_supplier === d);
    if (index !== -1) {
      const selectedCurrency = pos_rows[index][0].currency;
      this.setState({ selectedCurrency }, () => {
        console.log(this.state.selectedCurrency);
      });
    } else {
      this.setState({ disable: false }, () => {
        this.setState({ selectedCurrency: "" });
      });
    }
    this.setState({ selected_supplier }, () => {
      console.log(this.state.selected_supplier);
    });
  };

  handleCurrencyChange = (selectedCurrency) => {
    this.setState({ selectedCurrency }, () => {
      console.log(this.state.selectedCurrency);
    });
  };

  handleItemsChange = (selectedItems) => {
    this.setState({ selectedItems }, () => {
      console.log(this.state.selectedItems);
    });
  };

  updateTotalSuppliers = (totalSuppliers) => {
    this.props.changeTotalSupplirs(totalSuppliers);
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
        `${API}pos-filter/${this.state.project_id}?filter[country]=${country_filter}&filter[currency]=${currency_filter}&filter[created_at]=${year_filter}&filter[items]=${products_filter}&filter[supplier_name]=${name_filter}`
      )
      .then((response) => {
        this.setState({
          supplier_rows: response.data.suppliers,
          loading: false,
          pos_sup_rows: Object.keys(response.data.suppliers_pos),
          pos_rows: Object.values(response.data.suppliers_pos),
          pos_currencies: response.data.pos_currencies,
        });
      });
  };

  formatNumbers = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };

  deleteModal = () => {
    confirm({
      title: `Do you Want to delete ${this.state.po_to_delete?.supplier_name}  with order number ${this.state.po_to_delete?.order_number}? `,
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        const id = this.state.po_to_delete?.id;
        axios.post(`${API}po-delete/${id}`).then((response) => {
          console.log(response);
          this.getData().then(() => {});
        });
      },
      onCancel() {
        console.log("Cancel");
      },
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
  baseCurrencyChange = (base_currency) => {
    this.setState(
      {
        base_currency,
      },
      () => {
        if (base_currency && base_currency?.length > 0) {
          const fd = new FormData();
          fd.append("base_currency", base_currency);
          const _fd = new FormData();
          _fd.append("currency", base_currency);
          _fd.append("vlaue", 1);
          axios
            .post(`${API}add-basecurrency/${this.state.project_id}`, fd)
            .then((response) => {
              console.log(response);
              axios
                .post(`${API}add-rate/${this.state.project_id}`, _fd)
                .then((res) => {
                  this.setState({
                    exchange_rates: res.data.exchange_rates,
                  });
                  this.updateBaseCurrencyToParent();
                });
            });
        }
      }
    );
  };
  calculateTotalValueBaseCurrency = (currencies, rates) => {
    let total = 0;
    Object.values(currencies)?.map((c) => {
      total +=
        c?.reduce((accumulator, object) => {
          return parseFloat(
            parseFloat(accumulator) + parseFloat(object.total)
          ).toFixed(2);
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
          this.state.payments_currencies,
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
          this.setState({
            exchange_rates: response.data.exchange_rates,
          });
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
  addPoValuesChange = (changedValues, allValues) => {
    this.setState(
      {
        tax_disabled: allValues.vat_tax_type === "not",
      },
      () => {
        console.log(this.state.po_to_edit);
      }
    );
  };

  onValuesEditing = (changedValues, allValues) => {
    const { po_to_edit } = this.state;
    po_to_edit.vat_tax_type = allValues.vat_tax_type;
    this.setState(
      {
        po_to_edit,
      },
      () => {
        console.log(this.state.po_to_edit);
      }
    );
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

            <button onClick={this.openSupplierListAddModal}>
              Add Purchase Order +
            </button>
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
            <div className="customized-table purchases-table">
              <div className="header-row table-row">
                <div>Vendor</div>
                <div>Product/Service Type</div>
                <div>Order NO, Date</div>
                <div>Referance</div>
                <div>Value</div>
                <div>Paid</div>
                <div>Balance</div>
              </div>
              {this.state.pos_sup_rows?.map((p, index) => {
                return (
                  <>
                    {this.state.pos_rows[index]?.length > 1 ? (
                      <>
                        <Collapse
                          onChange={() => this.onCollapseChange(p)}
                          activeKey={this.state.active_vendor}
                        >
                          <Panel
                            header={
                              <div className="table-row data-row collabser-row">
                                <div>
                                  <p className="main">{p}</p>
                                  <p className="sec">
                                    {this.state.pos_rows[index][0]?.currency}
                                  </p>
                                </div>
                                <div>
                                  {p === this.state.active_vendor ? (
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
                                <div></div>
                                <div>
                                  <p className="main total">
                                    {this.formatNumbers(
                                      parseFloat(
                                        this.state.pos_rows[index].reduce(
                                          (accumulator, object) => {
                                            return (
                                              parseFloat(accumulator) +
                                              parseFloat(object.total)
                                              
                                              // parseFloat(object.value)
                                            );
                                          },
                                          0
                                        )
                                      ).toFixed(2)
                                    )}
                                  </p>
                                  <p className="sec">
                                    {this.state.pos_rows[index][0]?.currency}
                                  </p>
                                </div>
                                <div>
                                  {this.state.payments_rows[p] ? (
                                    <>
                                      <p className="main">
                                        {this.formatNumbers(
                                          this.getKeyValue(
                                            p,
                                            this.state.payments_rows,
                                            "value"
                                          )
                                        )}
                                      </p>
                                      <p className="sec">
                                        {
                                          this.state.payments_rows[p][0]
                                            ?.currency
                                        }
                                      </p>
                                    </>
                                  ) : (
                                    <p className="main">{0}</p>
                                  )}
                                </div>
                                <div>
                                  {this.state.payments_rows[p] ? (
                                    <>
                                      <p className="main">
                                        {this.formatNumbers(
                                          parseFloat(
                                            this.state.pos_rows[index].reduce(
                                              (accumulator, object) => {
                                                return (
                                                  parseFloat(accumulator) +
                                                  parseFloat(object.total)
                                                );
                                              },
                                              0
                                            ) -
                                              this.getKeyValue(
                                                p,
                                                this.state.payments_rows,
                                                "value"
                                              )
                                          ).toFixed(2)
                                        )}
                                      </p>
                                      <p className="sec"></p>
                                      <p className="sec">
                                        {
                                          this.state.payments_rows[p][0]
                                            ?.currency
                                        }
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="main">
                                        {this.state.pos_rows[index].reduce(
                                          (accumulator, object) => {
                                            return (
                                              <>
                                                <p className="main">
                                                  {parseFloat(
                                                    parseFloat(accumulator) +
                                                      parseFloat(object.value)
                                                  ).toFixed(2)}
                                                </p>
                                                <p className="sec">
                                                  {object?.currency}
                                                </p>
                                              </>
                                            );
                                          },
                                          0
                                        )}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            }
                            key={p}
                            showArrow={false}
                          >
                            {this.state.pos_rows[index]?.map((t) => {
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
                                                po_to_edit: t,
                                              },
                                              () => {
                                                this.setState({
                                                  edit_po_modal: true,
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
                                                po_to_delete: t,
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
                                    <p className="main">{t.items[0]}</p>
                                  </div>
                                  <div>
                                    <p className="main">{t.order_number}</p>
                                  </div>
                                  <div>
                                    <p className="main">{t.referance}</p>
                                  </div>
                                  <div>
                                    <p className="main">{t.total}</p>
                                    <p className="sec">
                                      {this.state.pos_rows[index][0]?.currency}
                                    </p>
                                  </div>
                                  <div></div>
                                  <div></div>
                                </div>
                              );
                            })}
                          </Panel>
                        </Collapse>
                      </>
                    ) : (
                      <>
                        {this.state.pos_rows[index]?.map((o) => {
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
                                            po_to_edit: o,
                                          },
                                          () => {
                                            this.setState({
                                              edit_po_modal: true,
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
                                            po_to_delete: o,
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
                                <p className="main">{p}</p>
                                <p className="sec">
                                  {this.state.pos_rows[index][0]?.currency}
                                </p>
                              </div>
                              <div>
                                <p className="main">{o.items[0]}</p>
                              </div>
                              <div>
                                <p className="main">{o.order_number}</p>
                              </div>
                              <div>
                                <p className="main">{o.referance}</p>
                              </div>
                              <div>
                                <p className="main total">
                                  {this.formatNumbers(
                                    parseFloat(
                                      this.state.pos_rows[index].reduce(
                                        (accumulator, object) => {
                                          return (
                                            parseFloat(accumulator) +
                                            parseFloat(object.total)
                                          );
                                        },
                                        0
                                      )
                                    ).toFixed(2)
                                  )}
                                </p>
                                <p className="sec">
                                  {this.state.pos_rows[index][0]?.currency}
                                </p>
                              </div>
                              <div>
                                {this.state.payments_rows[p] ? (
                                  <>
                                    <p className="main">
                                      {this.formatNumbers(
                                        this.getKeyValue(
                                          p,
                                          this.state.payments_rows,
                                          "value"
                                        )
                                      )}
                                    </p>
                                    <p className="sec">
                                      {this.state.payments_rows[p][0]?.currency}
                                    </p>
                                  </>
                                ) : (
                                  <p className="main">{0}</p>
                                )}
                              </div>
                              <div>
                                {this.state.payments_rows[p] ? (
                                  <>
                                    <p className="main">
                                      {this.formatNumbers(
                                        parseFloat(
                                          this.state.pos_rows[index].reduce(
                                            (accumulator, object) => {
                                              return (
                                                parseFloat(accumulator) +
                                                parseFloat(object.total)
                                              );
                                            },
                                            0
                                          ) -
                                            this.getKeyValue(
                                              p,
                                              this.state.payments_rows,
                                              "value"
                                            )
                                        ).toFixed(2)
                                      )}
                                    </p>
                                    <p className="sec"></p>
                                    <p className="sec">
                                      {this.state.payments_rows[p][0]?.currency}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="main">
                                      {this.state.pos_rows[index].reduce(
                                        (accumulator, object) => {
                                          return (
                                            <>
                                              <p className="main">
                                                {parseFloat(
                                                  parseFloat(accumulator) +
                                                    parseFloat(object.value)
                                                ).toFixed(2)}
                                              </p>
                                              <p className="sec">
                                                {object?.currency}
                                              </p>
                                            </>
                                          );
                                        },
                                        0
                                      )}
                                    </p>
                                  </>
                                )}
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
          {Object.values(this.state.pos_currencies)?.length > 0 && (
            <div className="pom-table clientlist-table  base-currency">
              {this.state.base_currency && (
                <span className="select-label">Total in </span>
              )}
              <Select
                defaultValue={this.state.base_currency}
                value={this.state.base_currency}
                size="large"
                placeholder="Select your base currency"
                bordered={false}
                style={{
                  width: "250px",
                }}
                onChange={this.baseCurrencyChange}
              >
                {!this.state.base_currency && (
                  <Option value="">Select your base currency</Option>
                )}

                {currency.map((p) => {
                  return <Option value={p.code}>{p.code}</Option>;
                })}
              </Select>
              <table>
                <tr>
                  <th className="width-50">Currency</th>
                  <th className="width-100">Purcahse Orders Value</th>
                  <th className="width-100">Total Paid</th>
                  <th className="width-100">Total Balance</th>
                  <th className="width-300">
                    {" "}
                    EX.Rate to {this.state.base_currency}
                  </th>
                </tr>
                {Object.values(this.state.pos_currencies)?.map((c, index) => {
                  return (
                    <tr>
                      <td>
                        <p className="sale">{c[0]?.currency}</p>
                      </td>
                      <td>
                        <p className="main">
                          {this.formatNumbers(
                            c?.reduce((accumulator, object) => {
                              return (
                                parseFloat(accumulator) +
                                parseFloat(object.total)
                                // parseFloat(object.value)
                              ).toFixed(2);
                            }, 0)
                          )}
                        </p>
                        <p className="sec">{c[0]?.currency}</p>
                      </td>
                      <td>
                        <p className="main">
                          {this.formatNumbers(
                            this.getKeyValue(
                              c[0]?.currency,
                              this.state.payments_currencies,
                              "coast"
                            )
                          )}
                        </p>
                        <p className="sec">{c[0]?.currency}</p>
                      </td>
                      <td>
                        <p className="main">
                          {this.formatNumbers(
                            parseFloat(
                              c?.reduce((accumulator, object) => {
                                return (
                                  parseFloat(accumulator) +
                                  parseFloat(object.total)
                                );
                              }, 0) -
                                this.getKeyValue(
                                  c[0]?.currency,
                                  this.state.payments_currencies,
                                  "coast"
                                )
                            ).toFixed(2)
                          )}
                        </p>
                        <p className="sec">{c[0]?.currency}</p>
                      </td>
                      <td>
                        {this.state.base_currency === c[0]?.currency ? (
                          <Input
                            bordered={false}
                            className="factor-input"
                            disabled
                            size="large"
                            placeholder="Type Exchange Rate"
                            maxLength={16}
                            value={1}
                            defaultValue={1}
                          />
                        ) : (
                          <Input
                            bordered={false}
                            className="factor-input"
                            size="large"
                            placeholder="Type Exchange Rate"
                            maxLength={16}
                            onChange={(e) => this.rateChange(e, c[0]?.currency)}
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
                })}
                {this.state.base_currency && (
                  <tr>
                    <td>
                      <p className="sale">Total in</p>
                      <p className="sec">{this.state.base_currency}</p>
                    </td>
                    <td>
                      <p className="main">
                        {this.formatNumbers(
                          parseFloat(
                            this.calculateTotalValueBaseCurrency(
                              this.state.pos_currencies,
                              this.state.exchange_rates
                            )
                          ).toFixed(2)
                        )}
                      </p>
                      <p className="sec">{this.state.base_currency}</p>
                    </td>
                    <td>
                      <p className="main">
                        {this.formatNumbers(
                          parseFloat(
                            this.calculateTotalPaidBaseCurrency(
                              this.state.pos_currencies,
                              this.state.exchange_rates
                            )
                          ).toFixed(2)
                        )}
                      </p>
                      <p className="sec">{this.state.base_currency}</p>
                    </td>
                    <td>
                      <p className="main">
                        {this.formatNumbers(
                          parseFloat(
                            this.calculateTotalValueBaseCurrency(
                              this.state.pos_currencies,
                              this.state.exchange_rates
                            ) -
                              this.calculateTotalPaidBaseCurrency(
                                this.state.pos_currencies,
                                this.state.exchange_rates
                              )
                          )
                        )}
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
          <p className="modal-header">Add Purchase Order</p>
          <Form
            onFinish={this.onFinish}
            onValuesChange={this.addPoValuesChange}
            size="large"
            layout="vertical"
          >
            <Form.Item
              label="Supplier / Factory"
              name="pos_supplier"
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
                onChange={this.SupplierChange}
              >
                {this.state.suppliers_options.map((p) => {
                  return (
                    <>
                      <Option
                        value={p.name}
                      >{`${p.name} | ${p?.currency}`}</Option>
                    </>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="items"
              label="Items"
              className="form-label mb-4"
              rules={[
                {
                  required: true,
                  message: "One Item at least is required!",
                },
              ]}
            >
              <Select
                showSearch
                mode="tags"
                onChange={this.handleItemsChange}
                value={this.state.selectedItems}
                placeholder="Please select Items"
                style={{
                  fontSize: "13px",
                }}
              >
                {[].map((p) => {
                  return <Option value={p}>{p}</Option>;
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
              name="pos_referance"
              label="Referance"
            >
              <Input placeholder="type  payment referance" />
            </Form.Item>

            <Form.Item
              label="Order NO"
              name="pos_order_number"
              rules={[
                {
                  required: true,
                  message: "Order number is required!",
                },
              ]}
            >
              <Input placeholder="order number" />
            </Form.Item>
            <Row gutter={25}>
              <Col md={24}>
                <Form.Item
                  label="Value"
                  name="pos_value"
                  rules={[
                    {
                      required: true,
                      message: "Purchase value is required!",
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="vat_tax_type" label="Vat Tax" size="large">
              <Select
                placeholder="Select whether tax included or not"
                style={{
                  width: "100%",
                }}
                // onChange={this.SupplierChange}
              >
                {VAT_TAX_OPTIONS.map((v) => {
                  return <Option value={v.value}>{v.label}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item name="vat_tax_percentage" label="Add Tax %">
              <Input
                placeholder="Please add the Tax % of the total Contract"
                suffix="%"
                max={100}
                min={0}
                type="number"
                // disabled={this.state.tax_disabled}
              />
            </Form.Item>
            <p className="sec">
              If ‘tax included’ is selected, your contract value already
              incorporates the special VAT. If ‘not included’ is selected, the
              assigned percentage will supplement the contract’s total value.
              Maintain tax at 0% if it won’t be appended later. Remember, this
              applies only to the special VAT that could be refundable or
              non-refundable.
            </p>

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
          open={this.state.edit_po_modal}
          onCancel={() => {
            this.setState({
              edit_po_modal: false,
            });
          }}
          closable
        >
          <p className="modal-header">Edit Purchase Order</p>
          <Form
            onFinish={this.onFinishEdit}
            onValuesChange={this.onValuesEditing}
            size="large"
            layout="vertical"
          >
            <Form.Item
              label="Supplier / Factory"
              name="pos_supplier"
              className="form-label mb-4"
              initialValue={this.state.po_to_edit?.supplier_name}
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
                onChange={this.SupplierChange}
              >
                {this.state.suppliers_options.map((p) => {
                  return (
                    <Option
                      value={p.name}
                    >{`${p.name} | ${p?.currency}`}</Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="items"
              label="Items"
              initialValue={this.state.po_to_edit?.items}
              className="form-label mb-4"
              rules={[
                {
                  required: true,
                  message: "One Item at least is required!",
                },
              ]}
            >
              <Select
                showSearch
                mode="tags"
                onChange={this.handleItemsChange}
                value={this.state.selectedItems}
                placeholder="Please select Items"
                style={{
                  fontSize: "13px",
                }}
              >
                {[].map((p) => {
                  return <Option value={p}>{p}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item
              initialValue={this.state.po_to_edit?.referance}
              rules={[
                {
                  required: true,
                  message: "Referance is required!",
                },
              ]}
              name="pos_referance"
              label="Referance"
            >
              <Input placeholder="type  payment referance" />
            </Form.Item>

            <Form.Item
              label="Order NO"
              name="pos_order_number"
              initialValue={this.state.po_to_edit?.order_number}
              rules={[
                {
                  required: true,
                  message: "Order number is required!",
                },
              ]}
            >
              <Input placeholder="order number" />
            </Form.Item>
            <Row gutter={25}>
              <Col md={24}>
                <Form.Item
                  label="Value"
                  name="pos_value"
                  initialValue={this.state.po_to_edit?.value}
                  rules={[
                    {
                      required: true,
                      message: "Purchase value is required!",
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="vat_tax_type"
              label="Vat Tax"
              size="large"
              initialValue={this.state.po_to_edit?.vat_tax_type ?? ""}
            >
              <Select
                placeholder="Select whether tax included or not"
                style={{
                  width: "100%",
                }}
                // onChange={this.SupplierChange}
              >
                {VAT_TAX_OPTIONS.map((v) => {
                  return <Option value={v.value}>{v.label}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="vat_tax_percentage"
              label="Add Tax %"
              initialValue={this.state.po_to_edit?.vat_tax_percentage ?? 0}
            >
              <Input
                placeholder="Please add the Tax % of the total Contract"
                suffix="%"
                max={100}
                min={0}
                type="number"
                // disabled={this.state.po_to_edit?.vat_tax_type === "not"}
              />
            </Form.Item>
            <p className="sec">
                    If ‘tax included’ is selected, your contract value already
                    incorporates the special VAT. If ‘not included’ is selected,
                    the assigned percentage will supplement the contract’s total
                    value. Maintain tax at 0% if it won’t be appended later.
                    Remember, this applies only to the special VAT that could be
                    refundable or non-refundable.
                  </p>

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

export default PurchasesOrdersTab;
