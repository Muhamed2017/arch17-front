import React, { Component } from "react";

import axios from "axios";

import { API } from "./../utitlties";

class POMOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company_id: this.props.company_id,
      projects: [],
      poinvoices: [],
    };
  }

  componentDidMount() {
    const { company_id } = this.state;
    axios.get(`${API}pom-overview/${company_id}`).then((response) => {
      console.log(response);
      this.setState({
        projects: response.data.projects?.filter((p)=>{
          return p?.status==='running'
        }),
        poinvoices: response.data.projects?.filter((p) => {
          return p.overview?.refundable_invoices?.length > 0;
        }),
      },()=>{
        console.log(this.state.poinvoices)
      });
    });
  }

  formateNumber = (number) => {
    return Number(parseFloat(number).toFixed(2))?.toLocaleString();
  };
  render() {
    return (
      <div className="tables-page pom-overview">
        <div id="clientlis">
          <div id="clinetlist-table" className="clientlist-table pom-table overview-tables">
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
                    <td>
                      <p className="sale">{p.name}</p>
                      <p className="sec">{p.pi_ci}</p>
                      <p className="sec">{p.start_date}</p>
                      <p className="sec">{p.country}</p>
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

          <div id="clinetlist-table" className="clientlist-table pom-table">
          <span className="table-name">Tax Refund</span>
            <table id="client-lists">
              <tr>
                <th className="width-200">
                  <p className="main">Project Name</p>
                </th>
                <th className="width-200">
                  <p className="main">Tag</p>
                </th>
                <th className="width-200">
                  <p className="main">Refundable Value</p>
                </th>
                <th className="width-200">
                  <p className="main">Currency</p>
                </th>
                <th className="width-200">
                  <p className="main">Status</p>
                </th>
              </tr>
              {this.state.poinvoices?.map((p) => {
                return  p?.overview?.refundable_invoices?.map((po) => {
                  return (
                    <tr className="white light-hover">
                      <td>
                        <p className="main">{p.name}</p>
                      </td>
                      <td>
                        <p className="main">{po?.tag}</p>
                      </td>
                      <td>
                        <p className="main">{this.formateNumber(po?.total)}</p>
                      </td>
                      <td>
                        <p className="main">{po?.currency}</p>
                      </td>
                      <td>
                      <p className="main">Processing</p>
                      </td>
                    </tr>
                  );
                });
              })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default POMOverview;
