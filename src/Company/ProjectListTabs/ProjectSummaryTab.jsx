import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProjectPaymentsDeliveryTab from "./ProjectPaymentsDeliveryTab";
import ProjectSalesPurchasesTab from "./ProjectSalesPurchasesTab";
import SummaryOverview from "./SummaryOverview";
import { API } from "../../utitlties";
import axios from "axios";

class ProjectSummaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: this.props?.project_id,
      base_currency: this.props?.base_currency,
      currency: this.props?.currency,
      budget: 0,
      project_currency: null,
      tc: 0,
      tp: 0,
      tcvt: 0,
      tpvt: 0,
      tpbc: 0,
      tpvtbc: 0,
      sub_profit: 0,
      trpc: 0,
      tmpv: 0,
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get(`${API}total-summary/${this.state.project_id}`)
      .then((response) => {
        console.log(response);
        this.setState(
          {
            purchases: response.data.purchases,
            tc: response.data.contracts?.reduce((accumulator, object) => {
              return (
                parseFloat(accumulator) +
                parseFloat(object.total) * parseFloat(object.exchange_rate)
              );
            }, 0),
            tcvt: response.data.contracts?.reduce((accumulator, object) => {
              return (
                parseFloat(accumulator) +
                parseFloat(object.vat_tax_value) *
                  parseFloat(object.exchange_rate)
              );
            }, 0),
            tp: response.data.purchases?.reduce((accumulator, object) => {
              return (
                parseFloat(accumulator) +
                parseFloat(object.total) * parseFloat(object.exchange_rate)
              );
            }, 0),
            tpvt: response.data.purchases?.reduce((accumulator, object) => {
              return (
                parseFloat(accumulator) +
                parseFloat(object.vat_tax_value) *
                  parseFloat(object.exchange_rate)
              );
            }, 0),
            trpc: response.data.received_payments?.reduce(
              (accumulator, object) => {
                return (
                  parseFloat(accumulator) +
                  parseFloat(object.value) * parseFloat(object.exchange_rate)
                );
              },
              0
            ),

            tmpv: response.data.done_payments?.reduce((accumulator, object) => {
              return (
                parseFloat(accumulator) +
                parseFloat(object.value) * parseFloat(object.exchange_rate)
              );
            }, 0),
            tissued:response.data.project?.base_currency === response.data.project?.currency? response.data.sales_invoices?.reduce(
              (accumulator, object) => {
                if (object.exchange_rate) {
                  return (
                    parseFloat(accumulator) +
                    parseFloat(object.total) * parseFloat(object.exchange_rate)
                  );
                } else {
                  return parseFloat(accumulator) + parseFloat(object.total) * 1;
                }
              },
              0
            ):0,
            all_purchases_tax:response.data.purchases_invoices
            ?.filter((p) => {
              return (
                p.currency === this.state.base_currency
              )
            }),
            detuct: response.data.purchases_invoices
              ?.filter((p) => {
                return (
                  p.type?.includes("Deducted") &&
                  p.currency === this.state.base_currency
                );
              })
              .reduce((accumulator, object) => {
                return parseFloat(accumulator) + parseFloat(object.total) * 1;
              }, 0),
            refunded: response.data.purchases_invoices
              ?.filter((p) => {
                return p.type === "refunded";
              })
              .reduce((accumulator, object) => {
                return (
                  parseFloat(accumulator) +
                  parseFloat(object.total) * parseFloat(object.exchange_rate)
                );
              }, 0),
            tdc: response.data.deliveries?.reduce((accumulator, object) => {
              return parseFloat(accumulator) + parseFloat(object.value) * 1;
            }, 0),
            tc_per_currency: response.data.contracts?.reduce(
              (accumulator, object) => {
                return parseFloat(accumulator) + parseFloat(object.total);
              },
              0
            ),
            budget: response.data.project?.budget,
            project_currency: response.data.project?.currency,
            purchases_with_exchange: response.data.purchases?.reduce(
              (accumulator, object) => {
                return (
                  parseFloat(accumulator) +
                  parseFloat(object.total) * parseFloat(object.exchange_rate)
                );
              },
              0
            ),
            po_deliveries_values:
              Object.values(response.data.po_deliveries) ?? [],
          },
          () => {
            this.setState(
              {
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
              },
              () => {
                this.setState(
                  {
                    dvp:
                      100 *
                      this.state.deliveries_percentages?.reduce(
                        (accumulator, object) => {
                          return parseFloat(
                            parseFloat(accumulator) + parseFloat(object)
                          );
                        },
                        0
                      ),
                    loading: false,
                  },
                  () => {
                    console.log(this.state.dvp);
                  }
                );
              }
            );
          }
        );
      });
  }
  render() {
    return (
      <>
        {!this.state.loading && (
          <div className="sales-tab  po-tab  profile-tabs">
            <SummaryOverview
              budget={this.state.budget}
              project_currency={this.state.project_currency}
              project_id={this.state.project_id}
              tc={this.state.tc}
              tp={this.state.tp}
              tcvt={this.state.tcvt}
              tpvt={this.state.tpvt}
              tpbc={this.state.tpbc}
              tpvtbc={this.state.tpvtbc}
              sub_profit={this.state.sub_profit}
              tcwvt={this.state.tc - this.state.tcvt}
              tpwvt={this.state.tp - this.state.tpvt}
              trpc={this.state.trpc}
              tmpv={this.state.tmpv}
              tissued={this.state.tissued}
              detuct={this.state.detuct}
              refunded={this.state.refunded}
              tdc={this.state.tdc}
              tc_per_currency={this.state.tc_per_currency}
              dvp={this.state.dvp}
              dlp={100 - this.state.dvp}
            />
          </div>
        )}
      </>
    );
  }
}

export default ProjectSummaryTab;
