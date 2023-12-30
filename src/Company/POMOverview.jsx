import React, { Component } from "react";

import axios from "axios";

import { API } from "./../utitlties";
import { Input, Row, Col, Select, Modal, Collapse } from "antd";
import { currency } from "../contexts/currencies";
import ProjectListItem from "./ProjectListItem";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EyeOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { regionNames, returnCountryName } from "./../redux/constants";

const { Option } = Select;
const { Panel } = Collapse;

class POMOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company_id: this.props.company_id,
      company_cashflow_base_currency: this.props.company_cashflow_base_currency,
      projects: [],
      poinvoices: [],
      cashflows: [],
      collapsed: false,
      project_id: null,
      entity_name: this.props.entity_name,
      entity_id: this.props.entity_id,
      allProjects: [],
      flat_poinvoices: [],
      active_project: "",
    };
  }

  calculateInFlow = (cash_currency) => {
    const { allProjects } = this.state;
    let values = allProjects
      ?.filter((pr) => {
        return pr.currency === cash_currency;
      })
      ?.map((p) => {
        return p.overview?.total_sales - p?.overview?.total_received_payment;
      });

    if (values?.length > 0) {
      return values.reduce((acc, item) => {
        return acc + item;
      });
    } else {
      return 0;
    }
  };

  calculateRefundableInFlow = (cash_currency) => {
    let values = this.state.flat_poinvoices?.filter((p) => {
      return p.currency === cash_currency;
    });

    if (values?.length > 0) {
      return values.reduce((acc, item) => {
        return acc + parseFloat(item.vat_tax_value);
      }, 0);
    } else {
      return 0;
    }
  };

  calculateOutFlow = (cash_currency) => {
    const { _allprojects } = this.state;
    let values = _allprojects
      ?.filter((pr) => {
        return pr.base_currency === cash_currency;
      })
      ?.map((p) => {
        return (
          p.overview?.purchases_total_with_exchange -
          p?.overview?.payments_total_with_exchange
        );
      });

    if (values?.length > 0) {
      return values?.reduce((acc, item) => {
        return acc + item;
      });
    } else {
      return 0;
    }
  };

  calculateNetflowInBaseCurrency = () => {
    return this.state.cashflows.reduce((accumulator, object) => {
      let inflow =
        parseFloat(this.calculateInFlow(object.currency_name)) +
        parseFloat(this.calculateRefundableInFlow(object.currency_name));
      let outflow = parseFloat(this.calculateOutFlow(object.currency_name));
      let exchange_rate = object.exchange_rate ?? 1;
      return parseFloat(
        parseFloat(accumulator) + parseFloat(inflow - outflow) * exchange_rate
      );
    }, 0);
  };
  getData = async () => {
    const { company_id, entity_id, entity_name } = this.state;
    let api_endpoint;

    if (entity_name === "company") {
      api_endpoint = `pom-overview/${entity_id}`;
      console.log(api_endpoint);
    } else {
      api_endpoint = `user-pom-overview/${entity_id}`;
      console.log(api_endpoint);
    }
    await axios.get(`${API}${api_endpoint}`).then((response) => {
      console.log(response);
      this.setState(
        {
          projects: response.data.projects?.filter((p) => {
            return p?.status === "running";
          }),
          allProjects: response.data.projects,
          _allprojects: response.data.projects,
          poinvoices: response.data.projects?.filter((p) => {
            return p.overview?.refundable_invoices?.length > 0;
          }),
          flat_poinvoices: response.data.projects
            ?.filter((p) => {
              return p.overview?.refundable_invoices?.length > 0;
            })
            .map((inv) => {
              return inv.overview?.refundable_invoices;
            })
            .flat(),
          cashflows: response.data.cashflow?.filter((c) => {
            return (
              (c.total_sales && parseFloat(c.total_sales) > 0) ||
              (c.total_purchases && parseFloat(c.total_purchases) > 0) ||
              (c.total_done_payments &&
                parseFloat(c.total_done_payments) > 0) ||
              (c.total_received_payments &&
                parseFloat(c.total_received_payments) > 0)
            );
          }),
        },
        () => {
          // console.log(this.calculateInFlow("RMB"))
          // console.log(this.calculateOutFlow("USD"))
          console.log(this.calculateRefundableInFlow("RMB"));
          console.log(this.state.flat_poinvoices);
        }
      );
    });
  };

  componentDidMount() {
    this.getData();
  }

  formateNumber = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };

  alterCollapse = () => {
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed,
    });
  };

  handleExchangeRateChange = (e, index) => {
    console.log(e.target.value);
    const id = this.state.cashflows[index]?.id;
    const cashflows = this.state.cashflows;
    let value;
    if (e.target.value <= 0) {
      value = 1;
    } else {
      value = e.target.value;
    }
    cashflows[index].exchange_rate = value;
    this.setState({
      cashflows,
    });
    if (e.target.value && e.target.value > 0) {
      const fd = new FormData();
      fd.append("exchange_rate", e.target.value);
      axios
        .post(`${API}edit-cashflow-exchangerate/${id}`, fd)
        .then((response) => {
          console.log(response);
        });
    }
  };

  handleCompanyCashflowBaseCurrency = (company_cashflow_base_currency) => {
    const fd = new FormData();
    fd.append("cashflow_base_currency", company_cashflow_base_currency);
    axios
      .post(
        `${API}edit-${this.state.entity_name}-cahsflow-base-currency/${this.state.entity_id}`,
        fd
      )
      .then((response) => {
        console.log(response);
        this.setState({ company_cashflow_base_currency });
      });
  };
  onCollapseChange = (active_project) => {
    if (active_project === this.state.active_project) {
      this.setState({
        active_project: "",
      });
    } else {
      this.setState({
        active_project,
      });
    }
    console.log(active_project);
  };

  render() {
    return (
      <>
        <div className="tables-page pom-overview">
          <div id="clientlis">
            <div
              id="clinetlist-table"
              className="clientlist-table pom-table overview-tables"
            >
              <span className="table-name">On Going</span>
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
                  <th className="width-400">
                    <p className="main">Total Purchases</p>
                    <p className="main">Made Payment / Balance</p>
                  </th>
                </tr>
                {this.state.projects?.map((p) => {
                  return (
                    <tr className="white light-hover">
                      <td
                        onClick={() => {
                          this.setState(
                            {
                              project_id: p?.id,
                            },
                            () => {
                              this.setState({
                                row_modal: true,
                              });
                            }
                          );
                        }}
                      >
                        <div className="edit-delete">
                          <Row gutter={5}>
                            <Col md={6}>
                              <EyeOutlined
                                onClick={() => {
                                  this.setState(
                                    {
                                      project_id: p?.id,
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
                          </Row>
                        </div>

                        <p className="sale">{p.name}</p>
                        <p className="sec">{p.pi_ci}</p>
                        <p className="sec">{p.start_date}</p>
                        <p className="sec">
                          {returnCountryName(p?.country, p?.city)}
                        </p>
                        <p className="sec">{p?.client_name}</p>
                      </td>
                      <td>
                        <p className="sale">
                          {this.formateNumber(p?.overview?.total_sales)}
                        </p>
                        <p className="sec">
                          {this.formateNumber(
                            p?.overview?.total_received_payment
                          )}
                        </p>
                        <p className="sec">
                          {this.formateNumber(
                            p?.overview?.total_sales -
                              p?.overview?.total_received_payment
                          )}
                        </p>
                        <p className="sec">{p?.currency}</p>
                      </td>
                      <td>
                        <p className="sale">
                          {this.formateNumber(p?.overview?.total_deliveries)}
                        </p>
                        <p className="sec">
                          {this.formateNumber(
                            p?.overview?.total_sales -
                              p?.overview?.total_deliveries
                          )}
                        </p>
                        <p
                          className={
                            p?.overview?.total_deliveries >
                            p?.overview?.total_received_payment
                              ? "sec red"
                              : "sec"
                          }
                        >
                          {this.formateNumber(
                            p?.overview?.total_received_payment -
                              p?.overview?.total_deliveries
                          )}
                        </p>
                        <p className="sec">{p?.currency}</p>
                      </td>
                      <td>
                        <p className="sale">
                          {this.formateNumber(
                            p?.overview?.purchases_total_with_exchange
                          )}
                        </p>
                        <p className="sec">
                          {this.formateNumber(
                            p?.overview?.payments_total_with_exchange
                          )}
                        </p>
                        <p className="sec">
                          {this.formateNumber(
                            p?.overview?.purchases_total_with_exchange -
                              p?.overview?.payments_total_with_exchange
                          )}
                        </p>
                        <p className="sec">{p?.base_currency}</p>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>

            {/* <div id="clinetlist-table" className="clientlist-table pom-table">
              <span className="table-name">Tax Refund</span>
              <table id="client-lists">
                <tr>
                  <th className="width-200">
                    <p className="main">Project Name</p>
                  </th>
                  <th className="width-200">
                    <p className="main">Tag</p>
                  </th>
                  <th className="width-220">
                    <p className="main">Refundable Value</p>
                  </th>
                  <th className="width-200">
                    <p className="main">Currency</p>
                  </th>
                  <th className="width-50">
                    <p className="main">Status</p>
                  </th>
                  <th className="width-150 text-right pointer">
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
                  this.state.poinvoices?.map((p) => {
                    return p?.overview?.refundable_invoices?.map((po) => {
                      return (
                        <tr className="white light-hover">
                          <td>
                            <p className="main">{p.name}</p>
                          </td>
                          <td>
                            <p className="main">{po?.tag}</p>
                          </td>
                          <td>
                            <p className="main">
                              {this.formateNumber(po?.vat_tax_value)}
                            </p>
                          </td>
                          <td>
                            <p className="main">{po?.currency}</p>
                          </td>
                          <td>
                            <p className="main">Processing</p>
                          </td>
                          <td></td>
                        </tr>
                      );
                    });
                  })}
              </table>
            </div> */}

            <span className="table-name">Tax Refund</span>
            <div className={"customized-table purchases-table"}>
              <div className="header-row table-row">
                <div>Project</div>
                <div>Tag</div>
                <div>Refundable Value</div>
                <div>Currency</div>
                <div>Status</div>
                <div></div>
              </div>
              {this.state.poinvoices?.map((p, index) => {
                return (
                  <>
                    {p?.overview?.refundable_invoices?.length > 0 &&
                    p?.overview?.refundable_invoices?.length > 1 ? (
                      <>
                        <Collapse
                          onChange={() => this.onCollapseChange(p?.name)}
                          activeKey={this.state.active_project}
                        >
                          <Panel
                            header={
                              <div className="table-row data-row collabser-row relative">
                                <div>
                                  <p className="main">{p?.name}</p>
                                </div>
                                <div>
                                  {p?.name === this.state.active_project ? (
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
                                <div></div>
                                <div></div>
                              </div>
                            }
                            key={p?.name}
                            showArrow={false}
                          >
                            {p?.overview?.refundable_invoices?.map((r) => {
                              return (
                                <div className="data-row relative table-row">
                                  <div>
                                    <p className="main"></p>
                                  </div>
                                  <div>
                                    <p className="main">{r?.tag}</p>
                                  </div>
                                  <div>
                                    <p className="main">{this.formateNumber(r?.vat_tax_value)}</p>
                                  </div>

                                  <div>
                                    <p className="main">{r?.currency}</p>
                                  </div>

                                  <div>
                                    <p className="main">Processing</p>
                                  </div>
                                  <div></div>
                                </div>
                              );
                            })}
                          </Panel>
                        </Collapse>
                      </>
                    ) : (
                      <>
                        {p?.overview?.refundable_invoices.map((r) => {
                          return (
                            <div className="data-row table-row  relative">
                              <div>
                                <p className="main">{r.name}</p>
                              </div>
                              <div>
                                <p className="main">{r?.tag}</p>
                              </div>
                              <div>
                                <p className="main">{this.formateNumber(r?.vat_tax_value)}</p>
                              </div>
                              <div>
                                <p className="main">{r?.currency}</p>
                              </div>

                              <div>Processing</div>

                              <div></div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })}
            </div>

            <div id="clinetlist-table" className="clientlist-table pom-table">
              <Row justify={"space-between"}>
                <Col>
                  <span className="table-name">Cash flow by Currency</span>
                </Col>
                <Col>
                  <Select
                    bordered={false}
                    defaultValue={this.state.company_cashflow_base_currency}
                    suffixIcon={<CaretDownOutlined />}
                    onChange={this.handleCompanyCashflowBaseCurrency}
                    size="large"
                    showSearch
                    placeholder="Select Project Base Currency not editable"
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      width: 80,
                    }}
                  >
                    {currency?.map((p) => {
                      return <Option value={p.code}>{p.code}</Option>;
                    })}
                  </Select>
                </Col>
              </Row>
              <table id="client-lists">
                <tr>
                  <th className="width-200">
                    <p className="main">Currency</p>
                  </th>
                  <th className="width-200">
                    <p className="main">Inflow</p>
                  </th>
                  <th className="width-200">
                    <p className="main">Outflow</p>
                  </th>
                  <th className="width-200">
                    <p className="main">Net Cash Flow</p>
                  </th>
                  <th className="width-200">
                    <p className="main">
                      Ex.Rate to{" "}
                      <b>{this.state.company_cashflow_base_currency}</b>
                    </p>
                  </th>
                </tr>
                {this.state.cashflows?.map((c, index) => {
                  return (
                    <tr>
                      <td>
                        <p className="main">{c.currency_name}</p>
                      </td>
                      <td>
                        <p className="main">
                          {this.formateNumber(
                            this.calculateInFlow(c?.currency_name) +
                              this.calculateRefundableInFlow(c?.currency_name)
                          )}
                        </p>
                      </td>
                      <td>
                        <p className="main">
                          {this.formateNumber(
                            this.calculateOutFlow(c?.currency_name)
                          )}
                        </p>
                      </td>
                      <td>
                        <p className="main">
                          {this.formateNumber(
                            this.calculateInFlow(c.currency_name) +
                              this.calculateRefundableInFlow(c.currency_name) -
                              this.calculateOutFlow(c.currency_name)
                          )}
                        </p>
                      </td>
                      <td>
                        <Input
                          type="float"
                          size="large"
                          defaultValue={c?.exchange_rate ?? 1}
                          style={{
                            width: 120,
                          }}
                          onChange={(e) => {
                            this.handleExchangeRateChange(e, index);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}

                <tr className="border-bottom-0">
                  <td>
                    <p className="main">
                      Total Net Cash Flow in{" "}
                      <b>{this.state.company_cashflow_base_currency}</b>
                    </p>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <p className="main">
                      {/* {this.formateNumber(
                        this.state.cashflows?.reduce((accumulator, object) => {
                          let inflow = parseFloat(
                            parseFloat(object.total_sales) -
                              parseFloat(object.total_received_payments) +
                              parseFloat(object?.total_refundable)
                          );
                          let outflow = parseFloat(
                            parseFloat(object.total_purchases) -
                              parseFloat(object.total_done_payments)
                          );
                          let exchange_rate = object.exchange_rate ?? 1;
                          return parseFloat(
                            parseFloat(accumulator) +
                              parseFloat(inflow - outflow) * exchange_rate
                          );
                        }, 0)
                      )} */}
                      {this.formateNumber(
                        this.calculateNetflowInBaseCurrency()
                      )}
                    </p>
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <Modal
          className="fullscreen"
          closable
          destroyOnClose
          open={this.state.row_modal}
          onCancel={() => {
            this.setState(
              {
                row_modal: false,
              },
              () => {
                this.getData();
              }
            );
          }}
        >
          <ProjectListItem
            entity_name={this.state.entity_name}
            entity_id={this.state.entity_id}
            project_id={this.state.project_id}
          />
        </Modal>
      </>
    );
  }
}

export default POMOverview;
