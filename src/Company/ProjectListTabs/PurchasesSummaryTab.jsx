import React, { Component } from "react";
import { Alert } from "antd";
import { Row, Col, Select,Dropdown } from "antd";
import { FaFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { CaretDownOutlined } from "@ant-design/icons";
import axios from "axios";
import { API } from "../../utitlties";
import {
  DownloadOutlined,
} from "@ant-design/icons";
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
      currency:this.props?.base_currency,
    };
  }

  percentage = (base, part) => {
    return `${parseFloat((parseFloat(part) / parseFloat(base)) * 100).toFixed(
      2
    )} %`;
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

            total_paids: Object.keys(response.data.pos_sub)?.map((p) => {
              return parseFloat(
                this.getKeyValue(p, response.data.payments_pos, "value")
              );
            }),

            total_currency_paids: Object.values(
              response.data.pos_currencies
            )?.map((c, index) => {
              return parseFloat(
                this.getKeyValue(
                  c[0]?.currency,
                  response.data.payments_currencies,
                  "coast"
                )
              );
            }),
            total_currency_balances: Object.values(
              response.data.pos_currencies
            )?.map((c, index) => {
              return parseFloat(
                c?.reduce((accumulator, object) => {
                  return parseFloat(accumulator) + parseFloat(object.total);
                }, 0) -
                  this.getKeyValue(
                    c[0]?.currency,
                    response.data.payments_currencies,
                    "coast"
                  )
              );
            }),
          });
        }
        this.setState(
          {
            deliveries_currencies: response.data.deliveries_currencies,
            payments_currencies: response.data.payments_currencies,
            pos_currencies: response.data.pos_currencies,
            all_vendors:response.data.name? false:true,
            purchases:response.data.purchases,
            payments:response.data.payments,
            deliveries:response.data.deliveries,
            po_deliveries_values:
            Object.values(response.data.po_deliveries) ?? [],
            purchases_with_exchange: response.data.purchases?.reduce(
              (accumulator, object) => {
                return (
                  parseFloat(accumulator) +
                  parseFloat(object.total) * parseFloat(object.exchange_rate)
                );
              },
              0
            ),
          },
          () => {
            this.setState({
              deliveries_percentages: Object.keys(
                response.data.po_deliveries
              )?.map((vendor, index) => {
                return (
                  (parseFloat(
                    this.state.po_deliveries_values[index].reduce(
                      (accumulator, object) => {
                        return parseFloat(
                          parseFloat(accumulator) + parseFloat(object.value)
                        );
                      },
                      0
                    )
                  ) /
                    (parseFloat(
                      this.state.po_deliveries_values[index][0]?.leftp
                    ) +
                      parseFloat(
                        this.state.po_deliveries_values[index].reduce(
                          (accumulator, object) => {
                            return parseFloat(
                              parseFloat(accumulator) +
                                parseFloat(object.value)
                            );
                          },
                          0
                        )
                      ))) *
                  (this.state.purchases
                    ?.filter((p) => {
                      return p.supplier_name == vendor;
                    })
                    .reduce((accumulator, object) => {
                      return parseFloat(
                        parseFloat(accumulator) +
                          parseFloat(object.total) *
                            parseFloat(object.exchange_rate)
                      );
                    }, 0) /
                    this.state.purchases_with_exchange)
                );
              }),
            }, () => {
              this.setState(
                {
                  currency:this.state.all_vendors?this.state.base_currency:response.data.suppliers_options[0]?.currency,
                  _tpu: this.state.all_vendors? this.state.purchases?.reduce(
                    (accumulator, object) => {
                      return (
                        parseFloat(accumulator) +
                        parseFloat(object.total) *
                          parseFloat(object.exchange_rate)
                      );
                    },
                    0
                  ):this.state.purchases?.reduce(
                    (accumulator, object) => {
                      return (
                        parseFloat(accumulator) +
                        parseFloat(object.total)
                      );
                    },
                    0
                  ),
                  _tpa:this.state.all_vendors? this.state.payments?.reduce(
                    (accumulator, object) => {
                      return (
                        parseFloat(accumulator) +
                        parseFloat(object.value) *
                          parseFloat(object.exchange_rate)
                      );
                    },
                    0
                  ):this.state.payments?.reduce(
                    (accumulator, object) => {
                      return (
                        parseFloat(accumulator) +
                        parseFloat(object.value)
                      );
                    },
                    0
                  ),
                   _td:this.state.deliveries?.reduce(
                    (accumulator, object) => {
                      return (
                        parseFloat(accumulator) +
                        parseFloat(object.value)
                      );
                    },
                    0
                  ),

                   _tl: this.state.purchases?.reduce(
                    (accumulator, object) => {
                      return (
                        parseFloat(accumulator) +
                        parseFloat(object.total)
                      );
                    },
                    0
                  ) - this.state.deliveries?.reduce(
                    (accumulator, object) => {
                      return (
                        parseFloat(accumulator) +
                        parseFloat(object.value)
                      );
                    },
                    0
                  ),
                }
              );
            });
          }
        );

        if(flag===0){
          this.setState({
            dvp:this.formatNumner(
              100*this.state.deliveries_percentages?.reduce(
                (accumulator, object) => {
                  return parseFloat(
                    parseFloat(accumulator) + parseFloat(object)
                  );
                },
                0
              )
            ),
            dlp:this.formatNumner(
              100- 100*this.state.deliveries_percentages?.reduce(
                (accumulator, object) => {
                  return parseFloat(
                    parseFloat(accumulator) + parseFloat(object)
                  );
                },
                0
              )
            )
          })
         }
      });
     
  }
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
    const { _tpu, _tpa, _td, _tl, base_currency ,currency} = this.state;
    return (
      <div className="summary sales-summary tables-page">
        <div className="btns-actions">
          <button>
          <Dropdown
              overlayClassName="download-tables-menu"
              placement="bottomLeft"
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <div>
                        <div className="menu-download-item">
                          <a
                            href={`${API}purchases-statement-xls/${
                              this.state.project_id
                            }?p=${[this.state.total_paids]}&cb=${
                              this.state.total_currency_balances
                            }&cp=${this.state.total_currency_paids}&dvp=${
                              this.state.dvp
                            }&dlp=${this.state.dlp}`}
                          >
                            <SiMicrosoftexcel />
                          </a>
                        </div>
                        <div className="menu-download-item">
                          <a
                            href={`${API}purchases-statement-pdf/${
                              this.state.project_id
                            }?p=${[this.state.total_paids]}&cb=${
                              this.state.total_currency_balances
                            }&cp=${this.state.total_currency_paids}&dvp=${
                              this.state.dvp
                            }&dlp=${this.state.dlp}`}
                          >
                            <FaFilePdf />
                          </a>
                        </div>
                      </div>
                    ),
                  },
                ],
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                Download{" "}
                <span>
                  <DownloadOutlined />
                </span>
              </a>
            </Dropdown>
          </button>
        </div>
        <div className="pom-table">
          <div className="filters pos-tabs">
            <Row align={"top"} justify={"end"}>
              <Col md={21}>
                <div className="list-head search-box">
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
                    <p className="sec">{currency}</p>
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
                    <p className="sec">{currency}</p>
                  </td>
                  <td>
                    <p className="main"></p>
                  </td>
                </tr>
               {this.state.all_vendors&&(
                <>
                 <tr>
                  <td><p className="main">Total Deliveries Value</p></td>
                  <td></td>
                  <td><p className="main">
                  {this.formatNumner(
                100*this.state.deliveries_percentages?.reduce(
                  (accumulator, object) => {
                    return parseFloat(
                      parseFloat(accumulator) + parseFloat(object)
                    );
                  },
                  0
                )
              )}
               {" %"}
                    </p>
                    <p className="sec">Of total contracts</p>
                    </td>
                </tr>
                <tr>
                  <td><p className="main">Total Left Products Value</p></td>
                  <td></td>
                  <td><p className="main">
                  {this.formatNumner(
                100- 100*this.state.deliveries_percentages?.reduce(
                  (accumulator, object) => {
                    return parseFloat(
                      parseFloat(accumulator) + parseFloat(object)
                    );
                  },
                  0
                )
              )}
              {" %"}
                    </p>
                    <p className="sec">Of total contracts</p>
                    
                    </td>
                </tr>
                </>
               )}
               {!this.state.all_vendors&&(
                <>
                 <tr className="white light-hover">
                  <td>
                    <p className="main">Total Balance</p>
                  </td>
                  <td>
                    <p className="main">{this.formatNumner(_tpu - _tpa)}</p>
                    <p className="sec">{currency}</p>
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
                    <p className="sec">{currency}</p>
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
                    <p className="sec">{currency}</p>
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
                    <p className="sec">{currency}</p>
                  </td>
                  <td></td>
                </tr>
                </>
               )}
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