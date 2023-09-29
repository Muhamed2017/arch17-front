import React, { Component } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Row, Col } from "antd";
import { API } from "../../utitlties";

class ProjectSalesPurchasesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: this.props?.project_id,
      tc: 0,
      tp: 0,
      tcvt: 0,
      tpvt: 0,
      sub_profit: 0,
      total_profit: 0,
      tpbc:0,
      tpvtbc:0,
      deductible: true,
      base_currency:  this.props?.base_currency,
      currency:  this.props?.currency
    };
  }

 

  percentage = (base, part) => {
    return `${parseFloat((parseFloat(part) / parseFloat(base)) * 100).toFixed(
      2
    )} %`;
  };

  componentDidMount() {
    axios
      .get(`${API}salespos-summary/${this.state.project_id}`)
      .then((response) => {
        console.log(response);
        this.setState(
          {
            exchange_rates: response.data.exchange_rates,
            tc: parseFloat(response.data.contracts_total_with_tax).toFixed(2),
            tp: parseFloat(response.data.purchases_total_with_tax).toFixed(2),
            tcvt: parseFloat(response.data.contracts_total_vat_tax).toFixed(2),
            tpvt: parseFloat(response.data.purchases_total_vat_tax).toFixed(2),
            // sub_profit: parseFloat(
            //   response.data.contracts_total_with_tax -
            //     (response.data.purchases_total_with_tax +
            //       response.data.contracts_total_vat_tax)
            // ).toFixed(2),

            tpbc: parseFloat(
              this.calculateTotalValueBaseCurrency(
                response.data.purchases_total_with_tax_currencies,
                response.data.exchange_rates
              )
            ),
            tpvtbc: this.calculateTotalVatTaxeBaseCurrency(
              response.data.purchases_total_with_tax_currencies,
              response.data.exchange_rates
            ),
          },
          () => {
            console.log(this.state.tpbc);
            console.log(this.state.tpvtbc);
            this.setState({
              sub_profit: parseFloat(
                parseFloat(this.state.tc )  - (parseFloat(this.state.tpbc) + parseFloat(this.state.tcvt))
              ).toFixed(2),
            },()=>{
              console.log(this.state.sub_profit)
              console.log(this.state.base_currency)
            });
          }
        );
      });
  }

  digiting = (num) => {
    return Number(num).toLocaleString();
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
          return parseFloat(
            parseFloat(accumulator) + parseFloat(object.total)
          ).toFixed(2);
        }, 0) * this.getValue(c[0]?.currency, rates);
    });

    return total;
  };

  calculateTotalVatTaxeBaseCurrency = (currencies, rates) => {
    let total = 0;
    Object.values(currencies)?.map((c) => {
      total +=
        c?.reduce((accumulator, object) => {
          return parseFloat(
            parseFloat(accumulator) + parseFloat(object.vat_tax_value)
          ).toFixed(2);
        }, 0) * this.getValue(c[0]?.currency, rates);
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

  render() {
    const { tc, tp, tcvt, tpvt, sub_profit, total_profit ,tpbc,tpvtbc, base_currency,currency} = this.state;
    return (
      <div className="summary sales-summary tables-page">
        <div className="btns-actions">
          <button>
            Download{" "}
            <span>
              <DownloadOutlined />
            </span>
          </button>
        </div>
        <div className="deductible">
          <Row justify={"end"} gutter={20}>
            <Col>
              <span className="fw-500">Purchases Vat Tax:</span>
            </Col>
            <Col>
              <span
                className={
                  this.state.deductible ? "fw-900" : "fw-400 light-arch pointer"
                }
                onClick={() => {
                  this.setState({
                    deductible: true,
                  });
                }}
              >
                Deductible
              </span>
            </Col>
            <Col>
              <span
                className={
                  !this.state.deductible
                    ? "fw-900"
                    : "fw-400 light-arch pointer"
                }
                onClick={() => {
                  this.setState({
                    deductible: false,
                  });
                }}
              >
                Non Deductible
              </span>
            </Col>
          </Row>
        </div>
        <div className="pom-table">
          <div className="table-wrapper">
            <table>
              <tr>
                <th className="width-350">Item</th>
                <th className="width-300">Value in {base_currency}</th>
                <th className="width-550">% Of total sales contract</th>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Sales Contract Value</p>
                </td>
                <td>
                  <p className="main">{this.digiting(tc)}</p>
                  <p className="sec">{currency}</p>
                </td>
                <td>
                  <p className="main"></p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Purchases Contract Value</p>
                </td>
                <td>
                  <p className="main">{this.digiting(tpbc)}</p>
                  <p className="sec">{base_currency}</p>
                </td>
                <td>
                  <p className="main">{this.percentage(tc, tpbc)}</p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Sales Vat Tax Value</p>
                </td>
                <td>
                  <p className="main">{this.digiting(tcvt)}</p>
                  <p className="sec">{currency}</p>
                </td>
                <td>
                  <p className="main">{this.percentage(tc, tcvt)}</p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Purchases Vat Tax Value</p>
                </td>
                <td>
                  <p className="main">{this.digiting(tpvtbc)}</p>
                  <p className="sec">{base_currency}</p>
                </td>
                <td>
                  <p className="main">{`${this.percentage(tc, tpvtbc)}`}</p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="high">Subtotal Profit Value</p>
                </td>
                <td>
                  <p className="high">{this.digiting(sub_profit)}</p>

                  <p className="sec">{base_currency}</p>
                </td>
                <td>
                  <p className="high">{`${this.percentage(tc, sub_profit)}`}</p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="high">
                    Total Profit Value ( After Tax Calculation )
                  </p>
                </td>
                <td>
                  <p className="high">
                    {this.state.deductible ? (
                      <>
                        {this.digiting(
                          parseFloat(
                            parseFloat(this.state.sub_profit) +
                              parseFloat(this.state.tpvtbc)
                          ).toFixed(2)
                        )}
                      </>
                    ) : (
                      <>
                        {this.digiting(
                          parseFloat(this.state.sub_profit).toFixed(2)
                        )}
                      </>
                    )}
                  </p>
                  <p className="sec">{base_currency}</p>
                </td>
                <td>
                  <p className="high">
                    {this.state.deductible ? (
                      <>
                        {this.percentage(
                          tc,
                          parseFloat(
                            parseFloat(this.state.sub_profit) +
                              parseFloat(this.state.tpvtbc)
                          ).toFixed(2)
                        )}
                      </>
                    ) : (
                      <>{this.percentage(tc, this.state.sub_profit)}</>
                    )}
                  </p>
                </td>
              </tr>
            </table>
            <p className="table-tail">
              Purchases Vat Tax Value Add to the total Profit depending weather
              you selected it is Deductible or Non Deductible, and you get the
              tax refund as cash or company tax value based on your business
              Type and your country regulations.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectSalesPurchasesTab;
