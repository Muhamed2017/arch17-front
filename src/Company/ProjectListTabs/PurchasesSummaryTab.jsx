import React, { Component } from "react";
import { Alert } from "antd";
import { Row, Col, Select } from "antd";

import { CaretDownOutlined } from "@ant-design/icons";
import axios from "axios";
import { API } from "../../utitlties";
const { Option } = Select;

class PurchasesSummaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base_currency: this.props?.base_currency,
      project_id: this.props?.project_id,
      company_id: this.props?.company_id,
      supplier_name: "",
      ex_rates_valus: [],
      _tpu: 0,
      _tpa: 0,
      _td: 0,
      _tl: 0,
      suppliers_options: [],
      suppliers: [],
    };
  }

  percentage = (base, part) => {
    return `${parseFloat((parseFloat(part) / parseFloat(base)) * 100).toFixed(
      2
    )} %`;
  };
  getValue = (name, obj) => {
    let total = 1;
    obj[name]?.map((p) => {
      total = parseFloat(p.vlaue);
    });
    return total;
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
  componentDidMount() {
    this.getData(0);
  }

  getData = (flag) => {
    const fd = new FormData();
    fd.append("supplier_name", this.state.supplier_name);
    fd.append("company_id", this.state.company_id);
    axios
      .post(`${API}pos-summary/${this.state.project_id}`, fd)
      .then((response) => {
        console.log(response);
        if (flag === 0) {
          this.setState({
            suppliers_options: response.data.suppliers_options,
            suppliers: response.data.pos,
          });
        }
        this.setState(
          {
            exchange_rates: response.data.exchange_rates,
            deliveries_currencies: response.data.deliveries_currencies,
            payments_currencies: response.data.payments_currencies,
            pos_currencies: response.data.pos_currencies,
          },
          () => {
            this.composeRates();
            this.setState({}, () => {
              // console.log(this.calculateTotalValueBaseCurrency(this.state.pos_currencies,this.state.exchange_rates))
              // console.log(this.calculateTotalPaidBaseCurrency(this.state.pos_currencies,this.state.exchange_rates))
              // console.log(this.calculateTotalValueBaseCurrency(this.state.deliveries_currencies,this.state.exchange_rates))
              // console.log(this.calculateTotalDeliveredValueBaseCurrency(this.state.deliveries_currencies,this.state.exchange_rates))
              // console.log(this.calculateTotaLeftBaseCurrency())

              this.setState(
                {
                  _tpu: parseFloat(
                    this.calculateTotalValueBaseCurrency(
                      this.state.pos_currencies,
                      this.state.exchange_rates
                    )
                  ),
                  _tpa: parseFloat(
                    this.calculateTotalPaidBaseCurrency(
                      this.state.pos_currencies,
                      this.state.exchange_rates
                    )
                  ),
                  _td: parseFloat(
                    // this.calculateTotalValueBaseCurrency(
                    //   this.state.deliveries_currencies,
                    //   this.state.exchange_rates
                    // )
                    this.calculateTotalDeliveredValueBaseCurrency(
                        this.state.deliveries_currencies,
                        this.state.exchange_rates
                      )
                  ),
                  _tl: parseFloat(
                    this.calculateTotalLeftProductsBaseCurrency(
                      this.state.deliveries_currencies,
                      this.state.exchange_rates
                    )
                  ),
                },
                () => {
                  console.log(this.state._tpu);
                  console.log(this.state._tpa);
                  console.log(this.state._td);
                  console.log(this.state._tl);
                }
              );
            });
          }
        );
      });
  };
  calculateTotaLeftBaseCurrency = () => {
    let total = 0;
    let _r = this.state.ex_rates_valus;

    Object.values(this.state.deliveries_currencies)?.forEach((c) => {
      total +=
        this.getTotalLeft(c[0].currency, c[0]?.supplier_name) *
        _r[_r?.findIndex((r) => r.currency === c[0]?.currency)]?.vlaue;
    });
    return total;
  };

  calculateTotalDeliveredValueBaseCurrency = (currencies, rates) => {
    // let total = 0;
    // Object.values(currencies)?.map((c) => {
    //   total +=
    //     c?.reduce((accumulator, object) => {
    //       return parseFloat(parseFloat(accumulator) + parseFloat(object.value));
    //     }, 0) * this.getValue(c[0]?.currency, rates);
    // });

    // return total;
    let total = 0;
    Object.values(currencies)?.map((c) => {
      total +=
        c?.reduce((accumulator, object) => {
          return parseFloat(
            parseFloat(accumulator) + parseFloat(object.value)
          ).toFixed(2);
        }, 0) * this.getValue(c[0]?.currency, rates);
    });

    return total;
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

  calculateTotalLeftProductsBaseCurrency = (currencies, rates) => {
    let total = 0;
    Object.values(currencies)?.map((c) => {
      total +=
        c
          ?.filter(
            (obj, index) =>
              c.findIndex((item) => item.supplier_id === obj.supplier_id) ===
              index
          )
          ?.reduce((accumulator, object) => {
            return parseFloat(
              parseFloat(accumulator) + parseFloat(object.leftp)
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
  getKeyValue = (name, obj, type) => {
    let total = 0;
    obj[name]?.map((p) => {
      total += parseFloat(p.value);
    });
    return total;
  };

  formatNumner = (number) => {
    return Number(parseFloat(number).toFixed(2)).toLocaleString();
  };

  onVendorChange = (supplier_name) => {
    this.setState(
      {
        supplier_name,
      },
      () => {
        this.getData(1);
      }
    );
  };
  render() {
    const { _tpu, _tpa, _td, _tl, base_currency } = this.state;
    return (
      <div className="summary sales-summary tables-page">
        <div className="pom-table">
          <div className="filters pos-tabs">
            <Row align={"top"} justify={"end"}>
              <Col md={21}>
                <div className="list-head search-box">
                  <p className="text-left light">
                    The summary is based on base currency you specified in the
                    purchase orders
                  </p>
                </div>
              </Col>
              <Col md={3}>
                <Select
                  style={{
                    width: "100%",
                  }}
                  className="right  px-0"
                  bordered={false}
                  size="large"
                  suffixIcon={<CaretDownOutlined />}
                  placeholder="All Vendors"
                  onChange={this.onVendorChange}
                >
                  <Option value="">All Vendors</Option>
                  {this.state.suppliers?.map((p) => {
                    return (
                      <>
                        <Option value={p.supplier_name}>
                          {p.supplier_name}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Col>
            </Row>
          </div>
          <div className="table-wrapper">
            {this.state.base_currency ? (
              <table>
                <tr>
                  <th className="width-350">Item</th>
                  <th className="width-300">Value, Currency</th>
                  <th className="width-550">% Of total Purchases</th>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Purchases Value</p>
                  </td>
                  <td>
                    <p className="main">{this.formatNumner(_tpu)}</p>
                    <p className="sec">{base_currency}</p>
                  </td>
                  <td>
                    <p className="main"></p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Made Payments</p>
                  </td>
                  <td>
                    <p className="main">{this.formatNumner(_tpa)}</p>
                    <p className="sec">{base_currency}</p>
                  </td>
                  <td>
                    <p className="main"></p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Balance</p>
                  </td>
                  <td>
                    <p className="main">{this.formatNumner(_tpu - _tpa)}</p>
                    <p className="sec">{base_currency}</p>
                  </td>
                  <td>
                    <p className="main">{this.percentage(_tpu, _tpu - _tpa)}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Deliveries Value</p>
                  </td>
                  <td>
                    {_td < _tpa && (
                      <p className="main red">{this.formatNumner(_td)}</p>
                    )}
                    {_td >= _tpa && (
                      <p className="main">{this.formatNumner(_td)}</p>
                    )}
                    <p className="sec">{base_currency}</p>
                  </td>
                  <td>
                    <p className="main">{`${this.percentage(_tpu, _td)}`}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Left Products Value</p>
                  </td>
                  <td>
                    {_tl === 0 && (
                      <p className="main green">{this.formatNumner(_tl)}</p>
                    )}
                    {_tl < 0 && (
                      <p className="main red">{this.formatNumner(_tl)}</p>
                    )}
                    {_tl > 0 && (
                      <p className="main">{this.formatNumner(_tl)}</p>
                    )}
                    <p className="sec">{base_currency}</p>
                    <p className="main"></p>
                  </td>
                  <td>
                    <p className="main">{this.percentage(_tpu, _tl)}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Made Payments vs Deliveries Value</p>
                  </td>
                  <td>
                    {_tpa - _td < 0 && (
                      <p className="main red">
                        {this.formatNumner(_tpa - _td)}
                      </p>
                    )}
                    {_tpa - _td >= 0 && (
                      <p className="main">{this.formatNumner(_tpa - _td)}</p>
                    )}
                    <p className="sec">{base_currency}</p>
                  </td>
                  <td></td>
                </tr>
              </table>
            ) : (
              <div>
                <Alert
                  className="arch-alert"
                  type="info"
                  showIcon
                  message="Please specify base currency at first in purchase orders tab."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PurchasesSummaryTab;
