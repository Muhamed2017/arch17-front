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
  Menu,
  Dropdown,

} from "antd";
import axios from "axios";
import { API, MONTHS } from "../../utitlties";
import ReactFlagsSelect from "react-flags-select";
import dayjs from "dayjs";
import { FaFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  DownloadOutlined,
  CloseCircleOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { currency } from "../../contexts/currencies";
import { customLabels } from "../../pages/CreateBrandFinish";
const { Option } = Select;

class PaymentTab extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    add_done_payment_modal: false,
    add_request_payment_modal: false,
    selectedCurrency: "",
    paid_date: "",
    done_payment_rows: [],
    loading: true,
    request_payment_rows: [],
    suppliers_options: this.props.suppliers_options?.flat() ?? [],
    disable: false,
    search_text_value: "",
    products_filter: "",
    country_filter: "",
    city_filter: "",
    name_filter: "",
    year_filter: "",
    vendor_filter:"",
    month_filter: "",
    currency_filter: "",
    project_id: this.props.id,
    payments_suppliers: [],
    collapsed: false,
    base_currency: this.props?.base_currency,
  };

  
  onFinish = (values) => {
    console.log(values);
    const fd = new FormData();
    values["paid_date"] = this.state.paid_date;
    values["currency"] = this.state.selectedCurrency;
    values["name"] = this.state.selectedSupplier;

    fd.append("referance", values.referance);
    fd.append("value", values.value);
    // fd.append("currency", values.currency);
    fd.append("name", values.name);

    const { suppliers_options } = this.state;
    const index = suppliers_options?.findIndex(
      (s) => s.supplier_name === values.name
    );

    fd.append("supplier_id", suppliers_options[index]?.supplier_id);

    fd.append("paid_date", values.paid_date);
    fd.append("status", "done");
    axios.post(`${API}add-payment/${this.props.id}`, fd).then((response) => {
      values["id"] = response.data.payment.id;
      this.setState(
        {
          done_payment_rows: [...this.state.done_payment_rows, values],
        },
        () => {
          this.setState({
            add_done_payment_modal: false,
          });
        }
      );
    });
  };


  onFinishRequest = (values) => {
    console.log(values);
    console.log(values);
    const fd = new FormData();
    fd.append("referance", values.referance);
    fd.append("value", values.value);
    // fd.append("currency", this.state.selectedCurrency);
    fd.append("name", this.state.selectedSupplier);
    // fd.append("paid_date", values.paid_date);
    fd.append("status", "pending");
    const { suppliers_options } = this.state;
    const index = suppliers_options?.findIndex(
      (s) => s.supplier_name === this.state.selectedSupplier
    );

    fd.append("supplier_id", suppliers_options[index]?.supplier_id);
    axios.post(`${API}add-payment/${this.props.id}`, fd).then((response) => {
      values["id"] = response.data.payment.id;
      values["currency"] = response.data.payment.currency;
      values["name"] = response.data.payment.name;
      this.setState(
        {
          request_payment_rows: [...this.state.request_payment_rows, values],
        },
        () => {
          this.setState({
            add_request_payment_modal: false,
          });
        }
      );
    });
  };

  onFinishCompletingPayment = (values) => {
    const id = this.state.payment_to_be_compteted.id;
    console.log(values);
    const fd = new FormData();
    values["paid_date"] = this.state.complete_paid_date;
    fd.append("paid_date", this.state.complete_paid_date);
    axios.post(`${API}done-payment/${id}`, fd).then((response) => {
      this.getData().then(() => {
        this.setState({
          complete_modal: false,
        });
      });
    });
  };

  handleMoveToPending = (values) => {
    const id = this.state.payment_to_be_deleted.id;
    console.log(values);
    axios.post(`${API}pending-payment/${id}`).then((response) => {
      this.setState({
        request_payment_rows: [
          ...this.state.request_payment_rows,
          ...this.state.done_payment_rows.filter((p) => {
            return p.id === id;
          }),
        ],

        done_payment_rows: this.state.request_payment_rows?.filter((p) => {
          return p.id === id;
        }),
        delete_modal: false,
        warning_delete: false,
      });
    });
  };
  openRequestPaymentModal = () => {
    this.setState({
      add_request_payment_modal: true,
    });
  };

  openDonePaymentModal = () => {
    this.setState({
      add_done_payment_modal: true,
    });
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

  handleCurrencyChange = (selectedCurrency) => {
    this.setState({ selectedCurrency }, () => {
      console.log(this.state.selectedCurrency);
    });
  };
  onChange = (d, paid_date) => {
    console.log(d, paid_date);
    this.setState({
      paid_date,
    });
  };
  onChangeEdit = (d, paid_edit_date) => {
    console.log(d, paid_edit_date);
    this.setState({
      paid_edit_date,
      edited_date: paid_edit_date,
    });
  };

  handleDeletePayment = () => {
    const id = this.state.payment_to_be_deleted?.id;
    axios.post(`${API}payment-delete/${id}`).then((response) => {
      console.log(response);
      this.setState({
        request_payment_rows: this.state.request_payment_rows?.filter((r) => {
          return r.id !== id;
        }),
        done_payment_rows: this.state.done_payment_rows?.filter((r) => {
          return r.id !== id;
        }),
        delete_modal: false,
      });
    });
  };

  componentDidMount() {
    console.log(dayjs("2015-01-01", "YYYY-MM-DD"));

    console.log(this.props.suppliers_options?.flat());
    this.setState({
      suppliers_options: this.props.suppliers_options?.flat(),
    });
    this.getData().then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  getData = async () => {
    await axios.get(`${API}get-payments/${this.props.id}`).then((response) => {
      this.setState(
        {
          done_payment_rows: response.data.payments.filter((p) => {
            return p.status === "done";
          }),
          vendors_options : [...new Set(response.data.payments.map((v)=>{
            return  v.name
          }))],
          // [...new Set(this.state.services_filter)]
          exchange_rates: response.data.exchange_rates,
          request_payment_rows: response.data.payments.filter((p) => {
            return p.status === "pending";
          }),
          unique_supp: response.data.pos?.map((p) => {
            // return p.supplier_name;
            return p;
          }),
          services_filter: response.data.payments
            ?.map((p) => {
              return JSON.parse(p?.products_services);
            })
            .filter((p) => {
              return p != null;
            })
            .flat(),
        },
        () => {
          this.setState({
            services_filter_options: [...new Set(this.state.services_filter)],
          });
          console.log(this.state.vendors_options)
        }
      );
    });
  };

  updatePaymentStatus = (id) => {
    axios.post(`${API}done-payment/${id}`).then((response) => {
      this.setState({
        done_payment_rows: [
          ...this.state.request_payment_rows.filter((p) => {
            return p.id === id;
          }),
          ...this.state.done_payment_rows,
        ],
        request_payment_rows: this.state.request_payment_rows?.filter((p) => {
          return p.id !== id;
        }),
      });
    });
  };

  handleCopy = async (text) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text).then((r) => {
        toast("Copied");
      });
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  handleSupplierChange = (selectedSupplier) => {
   
    this.setState({ selectedSupplier }, () => {

      const total_payments_requests=this.state.request_payment_rows?.filter((s)=>{
        return  s.name===selectedSupplier
      }).reduce(
        (accumulator, object) => {
          return parseFloat(accumulator) + parseFloat(object.value);
        },
        0
      )
      const { suppliers_options } = this.state;
      const index = suppliers_options?.findIndex(
        (s) => s.supplier_name === selectedSupplier
      );
      axios.get(`${API}supplier-balance/${this.state.project_id}/${selectedSupplier}`).then((response)=>{
        this.setState({
          total_balance:response.data.supplier_balance,
          left_balance_to_pay:response.data.supplier_balance  - parseFloat(total_payments_requests),
          other_payment_in_raw:this.state.request_payment_rows?.filter((s)=>{
            return  s.name===selectedSupplier
          }).length>0
        })
      })
      this.setState({
        selectedCurrency: suppliers_options[index]?.currency,
        supplier_id: suppliers_options[index]?.supplier_id,
        disable: true,
      });
    });
  };

  onPaidDateChange = (d, complete_paid_date) => {
    console.log(d, complete_paid_date);
    this.setState({
      complete_paid_date,
    });
  };

  onFinishEdit = (values) => {
    const id = this.state.payment_to_edit?.id;
    // values["paid_date"] = this.state.paid_edit_date;
    console.log(values);
    const { name, paid_date, referance, value, currency } = values;
    const fd = new FormData();
    // fd.append("paid_date", paid_date);
    fd.append("name", name);
    values["paid_date"] = this.state.edited_date;
    fd.append("paid_date", values.paid_date);
    fd.append("referance", referance);
    fd.append("value", value);
    const { suppliers_options } = this.state;
    const index = suppliers_options?.findIndex((s) => s.supplier_name === name);

    fd.append("supplier_id", suppliers_options[index]?.supplier_id);

    axios.post(`${API}edit-payment/${id}`, fd).then((response) => {
      console.log(response);
      this.getData().then(() => {
        this.setState({
          edit_payment_modal: false,
        });
      });
    });
  };

  onFinishRequestEdit = (values) => {
    const id = this.state.request_payment_to_edit?.id;
    console.log(values);
    const { name, referance, value, currency } = values;
    const fd = new FormData();
    fd.append("name", name);
    fd.append("referance", referance);
    fd.append("value", value);
    // fd.append("currency", currency);
    const { suppliers_options } = this.state;
    const index = suppliers_options?.findIndex((s) => s.supplier_name === name);
    fd.append("supplier_id", suppliers_options[index]?.supplier_id);
    axios.post(`${API}edit-request-payment/${id}`, fd).then((response) => {
      console.log(response);
      this.getData().then(() => {
        this.setState({
          edit_request_payment_modal: false,
        });
      });
    });
  };

  addPaymentValuesChange = (changedValues,allValues) =>{
    const total_balance=this.state.total_balance
    const total_payments_requests=this.state.request_payment_rows?.filter((s)=>{
      return  s.name===this.state.selectedSupplier
    }).reduce(
      (accumulator, object) => {
        return parseFloat(accumulator) + parseFloat(object.value);
      },
      0
    )

    if (parseFloat(allValues?.value)>0) {
        this.setState({
          left_balance_to_pay:  parseFloat(this.state.total_balance)  - (parseFloat(allValues.value) + parseFloat(total_payments_requests))
        })
    }
    if ((!allValues?.value)||allValues.value=='') {
      this.setState({
        left_balance_to_pay:  parseFloat(this.state.total_balance) -parseFloat(total_payments_requests)
      })
    }
    this.setState({
      other_payment_in_raw:this.state.request_payment_rows?.filter((s)=>{
        return  s.name===this.state.selectedSupplier
      }).length>0
    })
 
 
  }

  filterList = () => {
    const {
      name_filter,
      year_filter,
      country_filter,
      products_filter,
      currency_filter,
      month_filter,
      vendor_filter
    } = this.state;
    const _date = this.state.year_filter.concat(month_filter);
    console.log(_date);
    axios
      .get(
        `${API}payments-filter/${this.state.project_id}?filter[country]=${country_filter}&filter[currency]=${currency_filter}&filter[paid_date]=${_date}&filter[products_services]=${products_filter}&filter[name]=${vendor_filter}`
      )
      .then((response) => {
        this.setState(
          {
            loading: false,
            done_payment_rows: response.data.payments.filter((p) => {
              return p.status === "done";
            }),

            payments_suppliers: [
              ...new Set(
                response.data.payments.map((p) => {
                  return p.name;
                })
              ),
            ],
            request_payment_rows: response.data.payments.filter((p) => {
              return p.status === "pending";
            }),
          },
          () => {
            this.setState(
              {
                total_done_value: this.state.done_payment_rows?.reduce(
                  (accumulator, object) => {
                    return parseFloat(accumulator) + parseFloat(object.value);
                  },
                  0
                ),
              },
              () => {
                console.log(this.state.total_done_value);
              }
            );
            console.log(this.state.payments_suppliers);
          }
        );
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
  vendorChange = (vendor_filter) => {
    this.setState(
      {
        vendor_filter,
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
        // year_filter,
        year_filter: year_filter ? `${year_filter}-` : year_filter,
      },
      () => {
        this.filterList();
      }
    );
  };
  onMonthChange = (month_filter) => {
    this.setState(
      {
        month_filter,
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

  alterCollapse = () => {
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed,
    });
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
              <Toaster
                containerStyle={{
                  top: 100,
                }}
                position="top-center"
                duration={1}
              />
              <div className="btns-actions payments">
                <button>
                  Download{" "}
                  <span>
                    <DownloadOutlined />
                  </span>
                </button>
                <button onClick={this.openDonePaymentModal}>
                  Add Done Payment +
                </button>
                <button onClick={this.openRequestPaymentModal}>
                  Add Payment Request +
                </button>
              </div>
              <div>
                {/* <span className="table-name">Done Payments</span> */}
                <div id="clientlis">
                  <div className="clientlist-table pom-table suppliers-list">
                    <div className="filters pos-tabs">
                      <Row align={"top"} justify={"end"}
                      gutter={20}
                      >
                        <Col md={3}>
                          <Select
                            className="right  px-0"
                            bordered={false}
                            size="large"
                            suffixIcon={<CaretDownOutlined />}
                            placeholder="All Vendors"
                            style={{
                              width: "170px",
                              textAlign:"right"
                            }}
                            value={this.state.vendor_filter}
                            onChange={this.vendorChange}
                          >
                            <Option value="">All Vendors</Option>
                            {this.state.vendors_options?.map((p) => {
                              if (p) {
                                return (
                                  <>
                                    <Option value={p}>{p}</Option>
                                  </>
                                );
                              }
                            })}
                          </Select>
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
                            placeholder="Month"
                            value={this.state.month_filter}
                            onChange={this.onMonthChange}
                          >
                            <Option value="">Month</Option>
                            {MONTHS.map((p) => {
                              return (
                                <>
                                  <Option value={p.value}>{p.label}</Option>
                                </>
                              );
                            })}
                          </Select>
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
                        ``{" "}
                      </Row>
                    </div>
                    <div className="table-wrapper">
                      <table id="client-lists">
                        <tr>
                          <th className="width-220">Vendor</th>
                          <th className="width-300">Referance</th>
                          <th className="width-150">Value</th>
                          <th className="width-200">Paid Date</th>
                          <th className="width-300  text-right pointer">
                            <span onClick={this.alterCollapse}>
                              {this.state.collapsed ? (
                                <>
                                  Show
                                  <CaretDownOutlined />
                                </>
                              ) : (
                                <>
                                  Hide
                                  <CaretUpOutlined />
                                </>
                              )}
                            </span>
                          </th>
                        </tr>
                        {!this.state.collapsed &&
                          this.state.done_payment_rows?.map((p, index) => {
                            return (
                              <tr className="white light-hover">
                                <td>
                                  <div className="edit-delete">
                                    <Row gutter={5}>
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
                                                row_index: index,
                                                payment_to_edit: p,
                                                edited_date: p?.paid_date,
                                              },
                                              () => {
                                                this.setState({
                                                  edit_payment_modal: true,
                                                });
                                              }
                                            );
                                          }}
                                        />
                                      </Col>
                                      <Col md={8}>
                                        <DeleteOutlined
                                          onClick={() => {
                                            this.setState({
                                              delete_modal: true,
                                              payment_to_be_deleted: p,
                                            });
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                  </div>

                                  <p className="main">{p.name}</p>
                                </td>
                                <td>
                                  <p className="main">{p.referance}</p>
                                </td>
                                <td>
                                  <p className="main">
                                    {Number(
                                      parseFloat(p.value)?.toFixed(2)
                                    )?.toLocaleString()}
                                  </p>
                                  <p className="sec">{p.currency}</p>
                                </td>
                                <td>
                                  <p className="main">{p?.paid_date}</p>
                                </td>
                                <td></td>
                              </tr>
                            );
                          })}
                        {this.state.payments_suppliers?.length === 1 && (
                          <>
                            <tr className="white light-hover">
                              <td>
                                <p className="sale">
                                  Total {this.state.payments_suppliers[0]}
                                  {"  Payments"}
                                </p>
                              </td>
                              <td>
                                <p className="main">
                                  {this.state.total_done_value}
                                </p>
                                <p className="sec">
                                  {this.state.done_payment_rows[0]?.currency}
                                </p>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr className="white light-hover">
                              <td>
                                <p className="sale">
                                  Total {this.state.base_currency}
                                </p>
                                <p className="sec">Base Currency</p>
                              </td>
                              <td>
                                <p className="main">
                                  {this.state.total_done_value *
                                    this.state.exchange_rates[
                                      this.state.exchange_rates?.findIndex(
                                        (e) => {
                                          return (
                                            e.currency ===
                                            this.state.done_payment_rows[0]
                                              ?.currency
                                          );
                                        }
                                      )
                                    ]?.vlaue}
                                </p>
                                <p className="sec">
                                  {this.state.base_currency}
                                </p>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <span className="table-name">Payments Requests</span>

                <div className="clientlist-table pom-table suppliers-list relative">
                  <div className="btns-actions req">
                    <button>
                      DOWNLOAD ALL PAYMENTS REQUEST
                      <span>
                        <DownloadOutlined />
                      </span>
                    </button>
                  </div>
                  <div className="table-wrapper">
                    <table id="client-lists" className="">
                      <tr>
                        <th className="width-220">Vendor</th>
                        <th className="width-300">Referance</th>
                        <th className="width-150">Value</th>
                        <th className="width-200">Status</th>
                        <th className="width-300 ">ACTION</th>
                      </tr>
                      {this.state.request_payment_rows?.map((p, index) => {
                        return (
                          <tr className="white light-hover">
                            <td>
                              <div className="edit-delete">
                                <Row gutter={5}>
                                  <Col md={6}>
                                    <span>
                                      <a
                                        href={`https://api.arch17.com/api/export-suppliers/${p.id}`}
                                      >
                                        <SiMicrosoftexcel />
                                      </a>
                                    </span>
                                  </Col>
                                  <Col md={6}>
                                    <span>
                                      <a
                                        href={`https://api.arch17.com/api/payment-pdf/${p.id}`}
                                      >
                                        <FaFilePdf />
                                      </a>
                                    </span>
                                  </Col>
                                  <Col md={6}>
                                    <EditOutlined
                                      onClick={() => {
                                        this.setState(
                                          {
                                            row_index: index,
                                            request_payment_to_edit: p,
                                            edited_date: p?.paid_date,
                                          },
                                          () => {
                                            this.setState({
                                              edit_request_payment_modal: true,
                                            });
                                          }
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col md={6}>
                                    <DeleteOutlined
                                      onClick={() => {
                                        this.setState({
                                          warning_delete: true,
                                          payment_to_be_deleted: p,
                                        });
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </div>

                              <p className="main">{p.name}</p>
                            </td>
                            <td>
                              <p className="main">{p.referance}</p>
                            </td>
                            <td>
                              <p className="main">
                                {Number(
                                  parseFloat(p.value).toFixed(2)
                                )?.toLocaleString()}
                              </p>
                              <p className="sec">{p.currency}</p>
                            </td>
                            <td>
                              <p className="main">PENDING</p>
                            </td>
                            <td>
                              <p
                                onClick={() => {
                                  this.setState({
                                    complete_modal: true,
                                    payment_to_be_compteted: p,
                                  });
                                }}
                                className="main pointer"
                              >
                                MARK AS DONE
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>

              <Modal
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
                open={this.state.add_done_payment_modal}
                onCancel={() => {
                  this.setState({
                    add_done_payment_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Add Done Payment</p>
                <Form onFinish={this.onFinish}
                size="large" layout="vertical">
                  <Form.Item label="Supplier">
                    <Select
                      showSearch
                      onChange={this.handleSupplierChange}
                      value={this.state.selectedSupplier}
                      placeholder="Supplier / Factory"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {this.state.unique_supp.map((p) => {
                        return (
                          <>
                            <Option
                              value={p.supplier_name}
                            >{`${p.supplier_name} | ${p?.currency}`}</Option>
                          </>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item name="referance" label="Referance">
                    <Input placeholder="input referance" />
                  </Form.Item>
                  <Row gutter={25}>
                    <Col md={24}>
                      <Form.Item label="Value" name="value">
                        <Input placeholder="Payment Value" 
                        
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    label="Paid Date"
                    // name='paid_date'
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={this.onChange}
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
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
                open={this.state.edit_payment_modal}
                onCancel={() => {
                  this.setState({
                    edit_payment_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Edit Done Payment</p>
                <Form
                  onFinish={this.onFinishEdit}
                  size="large"

                  layout="vertical"
                >
                  <Form.Item
                    label="Supplier"
                    name="name"
                    initialValue={this.state.payment_to_edit?.name}
                  >
                    <Select
                      showSearch
                      placeholder="Supplier / Factory"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {this.state.unique_supp.map((p) => {
                        // return <Option value={p}>{p}</Option>;
                        return (
                          <Option
                            value={p.supplier_name}
                          >{`${p.supplier_name} | ${p?.currency}`}</Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="referance"
                    label="Referance"
                    initialValue={this.state.payment_to_edit?.referance}
                  >
                    <Input placeholder="input referance" />
                  </Form.Item>

                  <Row gutter={25}>
                    <Col md={24}>
                      <Form.Item
                        label="Value"
                        name="value"
                        initialValue={this.state.payment_to_edit?.value}
                      >
                        <Input placeholder="Payment Value" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    name="paid_date"
                    initialValue={moment(
                      this.state.payment_to_edit?.paid_date,
                      "YYYY. MM. DD"
                    )}
                    label="Paid Date"
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
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
                open={this.state.edit_request_payment_modal}
                onCancel={() => {
                  this.setState({
                    edit_request_payment_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Edit Request Payment</p>
                <Form
                  onFinish={this.onFinishRequestEdit}
                  size="large"
                  layout="vertical"
                >
                  <Form.Item
                    label="Supplier"
                    name="name"
                    initialValue={this.state.request_payment_to_edit?.name}
                  >
                    <Select
                      showSearch
                      placeholder="Supplier / Factory"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {this.state.unique_supp.map((p) => {
                        return (
                          <>
                            {/* <Option value={p}>{p}</Option> */}
                            <Option
                              value={p.supplier_name}
                            >{`${p.supplier_name} | ${p?.currency}`}</Option>
                          </>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="referance"
                    label="Referance"
                    initialValue={this.state.request_payment_to_edit?.referance}
                  >
                    <Input placeholder="input referance" />
                  </Form.Item>

                  <Row gutter={25}>
                    <Col md={24}>
                      <Form.Item
                        label="Value"
                        name="value"
                        initialValue={this.state.request_payment_to_edit?.value}
                      >
                        <Input placeholder="Payment Value" />
                      </Form.Item>
                    </Col>
                  </Row>

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
                className="file-modal border-radius"
                open={this.state.add_request_payment_modal}
                onCancel={() => {
                  this.setState({
                    add_request_payment_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Add Payment Request</p>
                <Form
                  onFinish={this.onFinishRequest}
                  size="large"
                  layout="vertical"
                onValuesChange={this.addPaymentValuesChange}

                >
                  <Form.Item label="Supplier">
                    <Select
                      showSearch
                      onChange={this.handleSupplierChange}
                      value={this.state.selectedSupplier}
                      placeholder="Supplier / Factory"
                      style={{
                        fontSize: "13px",
                      }}
                    >
                      {this.state.unique_supp?.map((p) => {
                        return (
                          <>
                            <Option
                              value={p.supplier_name}
                            >{`${p.supplier_name} | ${p?.currency}`}</Option>
                          </>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item name="referance" label="Referance">
                    <Input placeholder="input referance" />
                  </Form.Item>

                  <Row gutter={25}>
                    <Col md={24}>
                      <Form.Item label="Value" name="value">
                        <Input placeholder="Payment Value" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <p className="sec">
                  {this.state.left_balance_to_pay&&(
                    <>
                    {Number(parseFloat(this.state.left_balance_to_pay).toFixed(2)).toLocaleString()
                    }
                    {"  "}{this.state.selectedCurrency}
                    {/* {"  "}{this.state.unique_supp?.findIndex((s)=>{
                      return  s.supplier_name===this.state.selectedCurrency
                    })} */}
                    </>
                  )}
                  </p>
                  <p className="sec my-2">
                    {this.state.other_payment_in_raw&&(
                      <p>Other Payment Requests in the raw</p>
                    )}
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
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
                open={this.state.complete_modal}
                onCancel={() => {
                  this.setState({
                    complete_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Add Paid Date</p>
                <Form
                  onFinish={this.onFinishCompletingPayment}
                  size="large"
                  layout="vertical"
                >
                  <Form.Item name="paid_date" label="Paid Date">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={this.onPaidDateChange}
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
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
                open={this.state.delete_modal}
                onCancel={() => {
                  this.setState({
                    delete_modal: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Delete</p>
                <Form
                  // onFinish={this.onFinishCompletingPayment}
                  size="large"
                  layout="vertical"
                >
                  <Row justify="center" align={"middle"}>
                    <Col md={24} className="my-3">
                      <Button
                        className="arch-btn"
                        onClick={this.handleMoveToPending}
                      >
                        Move Payment to Payment Request
                      </Button>
                    </Col>
                    <Col md={24}>
                      <Button
                        className="arch-btn"
                        onClick={this.handleDeletePayment}
                      >
                        Delete Permanently
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Modal>

              <Modal
                footer={false}
                destroyOnClose
                className="file-modal border-radius"
                open={this.state.warning_delete}
                onCancel={() => {
                  this.setState({
                    warning_delete: false,
                  });
                }}
                closable
              >
                <p className="modal-header">Warning</p>

                <p className="warning-msg">
                  Are you sure you want to permanently delete payment?
                </p>
                <Row justify="center" align={"middle"}>
                  <Col>
                    <Button
                      className="arch-btn"
                      onClick={this.handleDeletePayment}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Modal>
            </>
          )}
        </div>
      </>
    );
  }
}

export default PaymentTab;
