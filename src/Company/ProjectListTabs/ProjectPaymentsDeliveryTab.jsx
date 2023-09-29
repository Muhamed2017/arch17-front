import React, { Component } from "react";

import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

import { API } from "../../utitlties";

class ProjectPaymentsDeliveryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: this.props?.project_id,
      base_currency:  this.props?.base_currency,
      trpc: 0,
      tbpc: 0,
      tmpv: 0,
      tbpv: 0,
      tdc: 0,
      tlpc: 0,
      tdv: 0,
      tlpv: 0,
      tpucv:0,
      tcc:0
    };
  }

  componentDidMount() {
    axios
      .get(`${API}paymentdeliveries-summary/${this.state.project_id}`)
      .then((response) => {
        this.setState({
          loading: false,
          pos_currencies:response.data.pos_currencies,
          exchange_rates:response.data.exchange_rates,
          trpc: parseFloat(response.data.received_payment_total),
          tcc:response.data.contracts_total_with_tax,
          tbpc:
            parseFloat(response.data.contracts_total_with_tax) -
            parseFloat(response.data.received_payment_total),
          tdc: parseFloat(response.data.deliveries_total),
          tdv: parseFloat(response.data.podeliveries_total),
          payments_currencies:response.data.payments_currencies,
          deliveries_currencies:response.data.deliveries_currencies,
          

        },()=>{
          console.log(this.state.pos_currencies)
          console.log(this.state.payments_currencies)
          console.log(this.calculateTotalPaidBaseCurrency(this.state.pos_currencies,  this.state.exchange_rates))
          console.log(this.calculateTotalValueBaseCurrency(this.state.pos_currencies,this.state.exchange_rates))
          console.log(this.calculateTotalDeliveredValueBaseCurrency(this.state.deliveries_currencies,this.state.exchange_rates))
          console.log(this.calculateTotalLeftProductsBaseCurrency(this.state.deliveries_currencies,this.state.exchange_rates))

          this.setState({
            tmpv:this.calculateTotalPaidBaseCurrency(this.state.pos_currencies,  this.state.exchange_rates),
           tpucv:this.calculateTotalValueBaseCurrency(this.state.pos_currencies,this.state.exchange_rates),
           tdv:this.calculateTotalDeliveredValueBaseCurrency(this.state.deliveries_currencies,this.state.exchange_rates),
           tlpv:this.calculateTotalLeftProductsBaseCurrency(this.state.deliveries_currencies,this.state.exchange_rates)
          })
        });
      });
  }
  digiting = (num) => {
    return Number(parseFloat(num).toFixed(2)).toLocaleString();
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
   calculateTotalDeliveredValueBaseCurrency = (currencies, rates) => {

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

  percentage = (base, part) => {
    return `${parseFloat((parseFloat(part) / parseFloat(base)) * 100).toFixed(
      2
    )} %`;
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
  }


  render() {
    const { trpc, tbpc, tmpv, tbpv, tdc, tlpc, tdv, tlpv ,tcc,base_currency} = this.state;
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
        <div className="pom-table">
          <span className="table-name">Payments</span>

          <div className="table-wrapper">
            <table>
              <tr>
                <th className="width-350">Item</th>
                <th className="width-300">Value in {base_currency}</th>
                <th className="width-550">% Of total sales contract</th>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Received Payments From Customer</p>
                </td>
                <td>
                  <p className="main">
                   {this.digiting(trpc)}
                  </p>
                  <p className="sec">
                    {base_currency}
                  </p>
                </td>
                <td>
                  <p className="main">
                    {this.percentage(tcc,trpc)}
                  </p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Balance Payment From customer</p>
                </td>
                <td>
                  <p className="main">
                  {this.digiting(tbpc)}
                  </p>
                  <p className="sec">
                    {base_currency}
                  </p>
                </td>
                <td>
                  <p className="main">{this.percentage(tcc,tbpc)}</p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Made Payments To Vendors</p>
                </td>
                <td>
                  <p className="main">
                    {this.digiting(tmpv)}
                  </p>
                  <p className="sec">{base_currency}
                  </p>
                </td>
                <td>
                  <p className="main">
                    {this.percentage(tcc,tmpv)}
                  </p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Balance Payments To Vendors</p>
                </td>
                <td>
                  <p className="main">
                  {this.digiting(parseFloat(this.state.tpucv)-parseFloat(tmpv))}
                  </p>
                  <p className="sec">
                    {base_currency}
                  </p>
                </td>
                <td>
                  <p className="main">
                   
                    {this.percentage(tcc,parseFloat(this.state.tpucv)-parseFloat(tmpv))}
                  </p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Received VS Paid Payments</p>
                  <p className="sec">In account current value</p>
                </td>
                <td>
                  <p className="main">
                    {this.digiting(parseFloat(trpc)-parseFloat(tmpv))}
                    </p>

                  <p className="sec">
                    {base_currency}
                  </p>
                </td>
                <td>
                  <p className="main">
                    {/* {this.percentage(tcc,parseFloat(trpc)-parseFloat(tmpv))} */}
                  </p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Customer VS Vendors Balance</p>
                </td>
                <td>
                  <p className="main">
                    {this.digiting(
                      parseFloat(tbpc)-parseFloat(parseFloat(this.state.tpucv)-parseFloat(tmpv))
                    )}
                  </p>

                  <p className="sec">
                    {base_currency}
                  </p>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>

        <div className="pom-table my-5">
          <span className="table-name">Deliveries</span>

          <div className="table-wrapper">
            <table>
              <tr>
                <th className="width-350">Item</th>
                <th className="width-300">Value in {base_currency}</th>
                <th className="width-550">% Of total sales contract</th>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Deliveries To Customer</p>
                </td>
                <td>
                  <p className="main">
                    {this.digiting(tdc)}
                  </p>
                  <p className="sec">
                    {base_currency}
                  </p>
                </td>
                <td>
                  <p className="main">
                    {this.percentage(tcc,tdc)}
                  </p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Left Products Value To Customer</p>
                </td>
                <td>
                  <p className="main">
                    {this.digiting(parseFloat(tcc)-parseFloat(tdc))}
                  </p>
                  <p className="sec">
                    {base_currency}
                  </p>
                </td>
                <td>
                  <p className="main">{this.percentage(tcc,parseFloat(tcc)-parseFloat(tdc))}</p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Received Payment VS Delivers</p>
                </td>
                <td>
                  <p className="main">
                    {this.digiting(parseFloat(trpc)-parseFloat(tdc))}
                  </p>
                  <p className="sec">{base_currency}</p>
                </td>
                <td>
                  <p className="main">
                    {this.digiting(this.percentage(tcc,parseFloat(trpc)-parseFloat(tdc)))}

                  </p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Deliveries From Vendors</p>
                </td>
                <td>
                  <p className="main">

                    {this.digiting(tdv)}
                  </p>
                  <p className="sec">{base_currency}</p>

                </td>
                <td>
                  <p className="main">
                    {this.percentage(tcc,tdv)}
                  </p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Left Products Value From Vendors</p>
                </td>
                <td>
                  <p className="main">
                    {this.digiting(tlpv)}
                  </p>
                  <p className="sec">
                    {base_currency}
                  </p>
                </td>
                <td>
                  <p className="main">
                  {this.percentage(tcc,tlpv)}

                  </p>
                </td>
              </tr>
              <tr className="white light-hover">
                <td>
                  <p className="main">Total Made Payment VS Delivers</p>
                </td>
                <td>
                  <p className="main">
                    {this.digiting(parseFloat(tmpv)-parseFloat(tdv))}
                  </p>
                  <p className="sec">
                    {base_currency}
                  </p>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectPaymentsDeliveryTab;
