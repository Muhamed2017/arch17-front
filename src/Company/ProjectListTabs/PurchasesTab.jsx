import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Row, Col, Select } from "antd";
import PurchasesOrdersTab from "./PurchasesOrdersTab";
import PaymentTab from "./PaymentTab";
import PoDeliveryTab from "./PoDeliveryTab";
import PurchasesSummaryTab from "./PurchasesSummaryTab";

const { Option } = Select;
class PurchasesTab extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    // base_currency={this.state.project?.base_currency}
    base_currency: this.props?.base_currency,
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
                <TabList
                  style={{
                    textALign: "left",
                  }}
                >
                  <Tab>Purchases Orders</Tab>
                  <Tab>Payments</Tab>
                  <Tab>Deliveries</Tab>
                  <Tab>Summary</Tab>
                </TabList>
                <TabPanel>
                  <PurchasesOrdersTab
                    contract_currency={this.props.contract_currency}
                    project_id={this.props.project_id}
                    changeTotalSupplirs={this.props?.changeTotalSupplirs}
                    company_id={this.props?.company_id}
                    base_currency={this.state.base_currency}
                    updateBaseCurrency={(base_currency) =>
                      this.updateBaseCurrency(base_currency)
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <PaymentTab
                    suppliers_options={this.props?.suppliers_options}
                    id={this.props?.project_id}
                    base_currency={this.state.base_currency}

                  />
                </TabPanel>
                <TabPanel>
                  <PoDeliveryTab
                    project_id={this.props?.project_id}
                    company_id={this.props?.company_id}
                    base_currency={this.state.base_currency}
                    updateBaseCurrency={(base_currency) =>
                      this.updateBaseCurrency(base_currency)
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <PurchasesSummaryTab 
                  project_id={this.props.project_id}
                  company_id={this.props?.company_id}
                  base_currency={this.state.base_currency} />
                  
                </TabPanel>
              </Tabs>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default PurchasesTab;
