import React, { Component } from "react";
import { FaFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { Dropdown } from "antd";
import { API } from "../../utitlties";

import { DownloadOutlined } from "@ant-design/icons";

class SalesSummaryTab extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    _tc: parseFloat(this.props?.total_contracts_value).toFixed(2),
    _td: parseFloat(this.props?.deliveries_total_value).toFixed(2),
    _trp: parseFloat(this.props?.received_payment_total).toFixed(2),

    changeTotalContract: this.props?.changeTotalContract,
    changeTotalPayment: this.props?.changeTotalPayment,
    _tb: (
      parseFloat(this.props?.total_contracts_value) -
      parseFloat(this.props?.received_payment_total)
    ).toFixed(2),
    _tl: (
      parseFloat(this.props?.total_contracts_value) -
      parseFloat(this.props?.deliveries_total_value)
    ).toFixed(2),
    _currency: this.props?._currency,
    base_currency: this.props?.base_currency,
    contract_rows: this.props?.contract_rows,
    received_payment_rows: this.props?.received_payment_rows,
    // uninvoiced_tax: this.props.uninvoicedvalue,
    issued_tax: this.props.issued_tax_invoice_value,
  };

  percentage = (base, part) => {
    return `${parseFloat((parseFloat(part) / parseFloat(base)) * 100).toFixed(
      2
    )} %`;
  };
  items = [
    {
      key: "1",
      label: (
        <div className="menu-download-item">
          <span>With EX.Rate</span>
          <a href={`${API}export-sales/${this.props.id}`}>
            <SiMicrosoftexcel />
          </a>
          <a href={`${API}sales-pdf/${this.props.id}`}>
            <FaFilePdf />
          </a>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="menu-download-item">
          <span>Without EX.Rate</span>
          <a href={`${API}export-salesw/${this.props.id}`}>
            <SiMicrosoftexcel />
          </a>
          <a href={`${API}sales-pdfw/${this.props.id}`}>
            <FaFilePdf />
          </a>
        </div>
      ),
      // icon: <SmileOutlined />,
      // disabled: true,
    },
  ];
  render() {
    const { _tc, _td, _trp, _tb, _tl, _currency, uninvoiced_tax, issued_tax } =
      this.state;

    return (
      <>
        <div className="summary sales-summary tables-page">
          <div className="btns-actions">
            <button>
              <Dropdown
                overlayClassName="download-tables-menu"
                placement="bottomLeft"
                menu={{
                  items: this.items,
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
            <div className="table-wrapper">
              <table>
                <tr>
                  <th className="width-350">Item</th>
                  <th className="width-300">Value, Currency</th>
                  {this.state.base_currency &&
                    this.state.base_currency !== this.state._currency && (
                      <th className="width-250">{`Value in / ${this.state.base_currency}`}</th>
                    )}
                  <th className="width-450">{`% Of total contract as per ${this.state._currency}`}</th>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Contract Value</p>
                  </td>
                  <td>
                    <p className="main">{Number(_tc)?.toLocaleString()}</p>
                    <p className="sec">{_currency}</p>
                  </td>
                  {this.state.base_currency &&
                    this.state.base_currency !== this.state._currency && (
                      <td>
                        <p className="main">
                          {Number(
                            parseFloat(
                              this.state.contract_rows?.reduce(
                                (accumulator, object) => {
                                  return (
                                    parseFloat(accumulator) +
                                    parseFloat(object.total) *
                                      parseFloat(object.exchange_rate)
                                  );
                                },
                                0
                              )
                            ).toFixed(2)
                          )?.toLocaleString()}
                        </p>
                        <p className="sec">{this.state.base_currency}</p>
                      </td>
                    )}

                  <td>
                    <p className="main"></p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Recieved Payments</p>
                  </td>
                  <td>
                    <p className="main">{Number(_trp)?.toLocaleString()}</p>
                    <p className="sec">{_currency}</p>
                  </td>
                  {this.state.base_currency &&
                    this.state.base_currency !== this.state._currency && (
                      <td>
                        <p className="main">
                          {Number(
                            parseFloat(
                              this.state.received_payment_rows?.reduce(
                                (accumulator, object) => {
                                  return (
                                    parseFloat(accumulator) +
                                    parseFloat(object.value) *
                                      parseFloat(object.exchange_rate)
                                  );
                                },
                                0
                              )
                            ).toFixed(2)
                          )?.toLocaleString()}
                        </p>
                        <p className="sec">{this.state.base_currency}</p>
                      </td>
                    )}
                  <td>
                    <p className="main">{this.percentage(_tc, _trp)}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Balance</p>
                  </td>
                  <td>
                    <p className="main">{Number(_tb)?.toLocaleString()}</p>
                    <p className="sec">{_currency}</p>
                  </td>
                  {this.state.base_currency &&
                    this.state.base_currency !== this.state._currency && (
                      <td>
                        <p className="main"></p>
                      </td>
                    )}
                  <td>
                    <p className="main">{this.percentage(_tc, _tb)}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Deliveries Value</p>
                  </td>
                  <td>
                    {_td < _trp && (
                      <p className="main red">
                        {Number(_td)?.toLocaleString()}
                      </p>
                    )}
                    {_td >= _trp && (
                      <p className="main">{Number(_td)?.toLocaleString()}</p>
                    )}
                    <p className="sec">{_currency}</p>
                  </td>
                  {this.state.base_currency &&
                    this.state.base_currency !== this.state._currency && (
                      <td>
                        <p className="main"></p>
                      </td>
                    )}
                  <td>
                    <p className="main">{`${this.percentage(_tc, _td)}`}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Total Left Value</p>
                  </td>
                  <td>
                    {_tl === 0 && (
                      <p className="main green">
                        {Number(_tl)?.toLocaleString()}
                      </p>
                    )}
                    {_tl < 0 && (
                      <p className="main red">
                        {Number(_tl)?.toLocaleString()}
                      </p>
                    )}
                    {_tl > 0 && (
                      <p className="main">{Number(_tl)?.toLocaleString()}</p>
                    )}
                    <p className="sec">{_currency}</p>
                    <p className="main"></p>
                  </td>
                  {this.state.base_currency &&
                    this.state.base_currency !== this.state._currency && (
                      <td>
                        <p className="main"></p>
                      </td>
                    )}
                  <td>
                    <p className="main">{this.percentage(_tc, _tl)}</p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">
                      Recieved Payments vs Deliveries Value
                    </p>
                  </td>
                  <td>
                    {_trp - _td < 0 && (
                      <p className="main red">
                        {Number(_trp - _td)?.toLocaleString()}
                      </p>
                    )}
                    {_trp - _td >= 0 && (
                      <p className="main">
                        {Number(_trp - _td)?.toLocaleString()}
                      </p>
                    )}
                    <p className="sec">{_currency}</p>
                  </td>
                  {this.state.base_currency &&
                    this.state.base_currency !== this.state._currency && (
                      <td>
                        <p className="main"></p>
                      </td>
                    )}
                  <td></td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Issued Tax Invoice Value</p>
                  </td>
                  <td>
                    <p className="main">
                      {Number(
                        parseFloat(issued_tax).toFixed(2)
                      )?.toLocaleString()}
                    </p>
                     <p className="sec">
                    {_currency}
                    </p>
                  </td>
                </tr>
                <tr className="white light-hover">
                  <td>
                    <p className="main">Uninvoiced value</p>
                  </td>
                  <td>
                    <p className="main">
                    {Number(
                        parseFloat(parseFloat(_trp) - parseFloat(issued_tax)).toFixed(2)
                      )?.toLocaleString()}
                    </p>
                    <p className="sec">
                    {_currency}
                    </p>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SalesSummaryTab;
