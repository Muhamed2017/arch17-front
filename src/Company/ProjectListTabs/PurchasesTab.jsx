import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Row, Col } from "antd";
import PurchasesOrdersTab from "./PurchasesOrdersTab";
import PaymentTab from "./PaymentTab";
import PoDeliveryTab from "./PoDeliveryTab";
import PurchasesSummaryTab from "./PurchasesSummaryTab";
import PoInvoicesTab from "./PoInvoicesTab";

// const { Option } = Select;
class PurchasesTab extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    base_currency: this.props?.base_currency,
    po_deliveries: this.props.po_deliveries,
    has_poinvoice_tab: this.props?.has_poinvoice_tab,
    entity_name: this.props.entity_name,
    entity_id: this.props.entity_id,
    shared: this.props.shared,
    scope: this.props.scope,
    permission: this.props.permission,
    vendor_id: this.props.vendor_id,
    vendor_name: this.props.vendor_name,

  };

  componentDidMount() {}

  updateBaseCurrency = (base_currency) => {
    this.setState({
      base_currency,
    });
  };
  render() {
    return (
      <>
        <div className="sales-tab  po-tab  profile-tabs" id="po-tab">
          <Row justify="start">
            <Col md={24}>
              <Tabs
              // selectedIndex={3}
              >
                {(!this.state.shared || this.state.scope == "purchases" ||this.state.scope=='vendor') && (
                  <TabList
                    style={{
                      textALign: "left",
                    }}
                  >
                    <Tab>Purchases Orders</Tab>
                    <Tab>Payments</Tab>
                    <Tab>Deliveries</Tab>
                    {this.state.has_poinvoice_tab && <Tab>Tax Invoice</Tab>}
                    <Tab>Summary</Tab>
                  </TabList>
                )}
                {this.state.scope=='poinvoices'&&(
                  <>
                    {this.state.has_poinvoice_tab && <Tab>Tax Invoice</Tab>}
                  </>
                )}
                {this.state.scope !== "poinvoices" && (
                  <TabPanel>
                    <PurchasesOrdersTab
                      contract_currency={this.props.contract_currency}
                      project_id={this.props.project_id}
                      changeTotalSupplirs={this.props?.changeTotalSupplirs}
                      company_id={this.props?.company_id}
                      entity_name={this.state.entity_name}
                      entity_id={this.state.entity_id}
                      base_currency={this.state.base_currency}
                      updateBaseCurrency={(base_currency) =>
                        this.updateBaseCurrency(base_currency)
                      }
                      po_deliveries={this.state.po_deliveries}
                      shared={this.state.shared}
                      scope={this.state.scope}
                      permission={this.state.permission}
                      vendor_id={this.state.vendor_id}
                      vendor_name={this.state.vendor_name}
                    />
                  </TabPanel>
                )}
                {this.state.scope !== "poinvoices" && (
                  <TabPanel>
                    <PaymentTab
                      suppliers_options={this.props?.suppliers_options}
                      id={this.props?.project_id}
                      base_currency={this.state.base_currency}
                      shared={this.state.shared}
                      scope={this.state.scope}
                      permission={this.state.permission}
                      vendor_id={this.state.vendor_id}
                      vendor_name={this.state.vendor_name}
                    />
                  </TabPanel>
                )}
                {this.state.scope != "poinvoices" && (
                  <TabPanel>
                    <PoDeliveryTab
                      project_id={this.props?.project_id}
                      company_id={this.props?.company_id}
                      entity_name={this.state.entity_name}
                      entity_id={this.state.entity_id}
                      base_currency={this.state.base_currency}
                      updateBaseCurrency={(base_currency) =>
                        this.updateBaseCurrency(base_currency)
                      }
                      shared={this.state.shared}
                      scope={this.state.scope}
                      permission={this.state.permission}
                      vendor_id={this.state.vendor_id}
                      vendor_name={this.state.vendor_name}
                    />
                  </TabPanel>
                )}
                {this.state.has_poinvoice_tab && (
                  <TabPanel>
                    <PoInvoicesTab
                      company_id={this.props?.company_id}
                      project_id={this.props.project_id}
                      entity_name={this.state.entity_name}
                      entity_id={this.state.entity_id}
                      base_currency={this.state.base_currency}
                      shared={this.state.shared}
                      scope={this.state.scope}
                      permission={this.state.permission}
                      vendor_id={this.state.vendor_id}
                      vendor_name={this.state.vendor_name}
                    />
                  </TabPanel>
                )}
                {this.state.scope !== "poinvoices" && (
                  <TabPanel>
                    <PurchasesSummaryTab
                      project_id={this.props.project_id}
                      company_id={this.props?.company_id}
                      base_currency={this.state.base_currency}
                      shared={this.state.shared}
                      scope={this.state.scope}
                      permission={this.state.permission}
                      vendor_id={this.state.vendor_id}
                      vendor_name={this.state.vendor_name}
                    />

                  </TabPanel>
                )}
              </Tabs>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default PurchasesTab;
